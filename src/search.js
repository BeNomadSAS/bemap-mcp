/* ======================================================================
 * SEARCH
 *
 * One ranked index over everything the snapshot holds: operations and their
 * query parameters, schemas, fields, enum values and guides. Built on first
 * use and kept for the life of the process.
 *
 * The ranking favours identifiers over prose, because the question behind
 * most searches is "what is this called and where does it go": a field or an
 * enum value whose name *is* the query outranks a guide that mentions it
 * forty times. Guides are long, so their term counts are damped by length —
 * otherwise the longest page wins every query it touches.
 *
 * A query written as a task — "convert an address to coordinates" — is read
 * as its content words, each folded to its stem: its "an" and "to" were
 * found inside every long guide, "stations" never matched "station", and the
 * forward geocoding operation, whose own description says exactly that,
 * ranked forty-second.
 * ====================================================================== */

import { enumOf, fieldsOf, guideLinks, loadSnapshot, readGuide, refName, resolveIncludes, supersededGuides, typeOf } from './spec.js';

export { supersededGuides };

/** @typedef {'operation'|'schema'|'field'|'value'|'guide'} Kind */

/** How much each kind weighs when scores tie on the text alone. */
const KIND_WEIGHT = { operation: 1.4, schema: 1.2, field: 1.1, value: 1.0, guide: 0.8 };

/** @type {Array<object>|null} */
let index = null;

/**
 * At most this many terms and phrases are ranked. A pasted 20 000-word log
 * took 17 seconds, during which the server answered nothing else; the first
 * words of an error message are the ones that find it.
 */
const MAX_TERMS = 32;
const MAX_PHRASES = 8;

/**
 * English words that carry no subject. A query made of nothing else keeps
 * them. Generic language, not a fact about BeMap.
 */
const STOP_WORDS = new Set(
  'a an the to of in on at by for from with into onto as and or but is are was be been it its this that these those how what which who whom why when where can could do does did will would should my me i we you your our their'.split(' ')
);

/**
 * Split a query into terms and verbatim phrases.
 *
 * @param {string} query - E.g. `"departure time" routing`.
 * @returns {{terms: string[], phrases: string[]}} lower-cased, at most
 *   {@link MAX_TERMS} terms and {@link MAX_PHRASES} phrases; stop words
 *   dropped when any other term remains.
 */
export function parseQuery(query) {
  const phrases = [];
  const rest = String(query ?? '').replace(/"([^"]+)"/g, (_, phrase) => {
    phrases.push(phrase.toLowerCase());
    return ' ';
  });
  const all = rest
    .toLowerCase()
    .split(/[^a-z0-9_]+/)
    .filter((term) => term.length >= 2);
  const content = all.filter((term) => !STOP_WORDS.has(term));
  const terms = content.length || phrases.length ? content : all;
  return { terms: [...new Set(terms)].slice(0, MAX_TERMS), phrases: phrases.slice(0, MAX_PHRASES) };
}

/**
 * A term's stem, for matching text: a trailing `ing`, `es`, `s` or `e`
 * removed while four letters or more remain — "stations" finds "station",
 * "route" and "routing" find each other, "geocode" finds "geocoding".
 *
 * @param {string} term - Lower-cased.
 * @returns {string}
 */
export function stemOf(term) {
  for (const suffix of ['ing', 'es', 's', 'e']) {
    if (term.endsWith(suffix) && term.length - suffix.length >= 4) return term.slice(0, -suffix.length);
  }
  return term;
}

/** The API version a document's path names — `/2.0/evsmartrouting` → 2 — or 0. */
function versionOf(doc) {
  const m = doc.kind === 'operation' ? String(doc.id).match(/\/(\d+)\.(\d+)(?:\/|\.|$)/) : null;
  return m ? Number(m[1]) + Number(m[2]) / 100 : 0;
}

/** Build the index from the snapshot. */
function build(snapshot) {
  const docs = [];
  const superseded = supersededGuides(snapshot.guides);
  const schemas = snapshot.spec.components?.schemas ?? {};
  const resolve = (node) => (node?.$ref ? schemas[refName(node.$ref)] ?? {} : node ?? {});

  for (const op of snapshot.operations) {
    /* The key every tool prints — `POST /routing/1.0` — and the endpoint are
       keys too: searched for, the operation ranked sixteenth. */
    docs.push({
      kind: 'operation',
      id: op.key,
      name: `${op.method} ${op.endpoint}`,
      title: op.summary || op.key,
      keys: [op.key, op.endpoint, op.path, op.operationId ?? '', ...op.tags],
      text: `${op.method} ${op.summary} ${op.description} ${op.tags.join(' ')} ${op.path.replace(/[/.]/g, ' ')}`,
      deprecated: op.deprecated,
    });
    /* A GET's query parameters were indexed nowhere: `geoServer` found ten
       body fields spelled `geoserver`, and none of the GETs that take it. */
    for (const parameter of op.parameters ?? []) {
      if (parameter.in !== 'query') continue;
      const node = resolve(parameter.schema);
      docs.push({
        kind: 'field',
        id: `${op.key}?${parameter.name}`,
        name: parameter.name,
        title: `${op.key} ?${parameter.name}`,
        keys: [parameter.name],
        text: String(parameter.description ?? node.description ?? ''),
        operation: op.key,
        type: typeOf(parameter.schema ?? {}),
        required: Boolean(parameter.required),
        deprecated: Boolean(parameter.deprecated),
      });
      const values = enumOf(node.type === 'array' ? { items: resolve(node.items) } : node);
      for (const value of values?.values ?? []) {
        docs.push({
          kind: 'value',
          id: `${op.key}?${parameter.name}=${value}`,
          name: value,
          title: `${op.key} ?${parameter.name} = ${value}`,
          keys: [value],
          text: values.descriptions[value] ?? '',
          operation: op.key,
          field: parameter.name,
        });
      }
    }
  }

  for (const [name, schema] of Object.entries(schemas)) {
    docs.push({ kind: 'schema', id: name, name, title: name, keys: [name], text: schema.description ?? '' });
    for (const field of fieldsOf(schema, snapshot)) {
      docs.push({
        kind: 'field',
        id: `${name}.${field.name}`,
        name: field.name,
        title: `${name}.${field.name}`,
        keys: [field.name],
        text: field.description,
        schema: name,
        type: field.type,
        required: field.required,
        deprecated: field.deprecated,
      });
      for (const value of field.enum?.values ?? []) {
        docs.push({
          kind: 'value',
          id: `${name}.${field.name}=${value}`,
          name: value,
          title: `${name}.${field.name} = ${value}`,
          keys: [value],
          text: field.enum.descriptions[value] ?? '',
          schema: name,
          field: field.name,
        });
      }
    }
  }

  for (const guide of snapshot.guides) {
    let text;
    try {
      /* As bemap_read_guide serves it: excerpts showed raw include lines and
         links into BeMap's documentation site. */
      text = guideLinks(resolveIncludes(readGuide(guide.id), snapshot), snapshot);
    } catch {
      continue;
    }
    /* BeMap marks its own retired pages in their title: "REST API, BND version 0.9 (Deprecate see API v1.x)". */
    docs.push({
      kind: 'guide',
      id: guide.id,
      name: guide.id,
      title: guide.title,
      keys: [],
      text,
      family: guide.family,
      deprecated: /\bdeprecat/i.test(guide.title),
      superseded: superseded.has(guide.id),
    });
  }

  for (const doc of docs) {
    doc.lowerText = doc.text.toLowerCase();
    doc.lowerTitle = doc.title.toLowerCase();
    doc.lowerKeys = doc.keys.map((key) => key.toLowerCase());
  }
  return docs;
}

/** Occurrences of `needle` in `hay`, capped — a term's tenth mention adds nothing. */
function count(hay, needle, cap = 12) {
  let n = 0;
  for (let at = hay.indexOf(needle); at !== -1 && n < cap; at = hay.indexOf(needle, at + needle.length)) n++;
  return n;
}

/** A short excerpt around the first hit. */
function excerpt(text, needles, width = 140) {
  const lower = text.toLowerCase();
  const hits = needles.map((needle) => lower.indexOf(needle)).filter((at) => at !== -1);
  if (hits.length === 0) return text.replace(/\s+/g, ' ').trim().slice(0, width * 2);
  const at = Math.min(...hits);
  const start = Math.max(0, at - width);
  const end = Math.min(text.length, at + width);
  return `${start > 0 ? '…' : ''}${text.slice(start, end).replace(/\s+/g, ' ').trim()}${end < text.length ? '…' : ''}`;
}

/**
 * The words an identifier is made of: `ChargeEvent` → `Charge Event`,
 * `stepPointPluggingTime` → `step Point Plugging Time`, `EV_TRIP` → `EV TRIP`.
 *
 * @param {string} query
 * @returns {string} The query with its identifiers split into words.
 */
export function identifierWords(query) {
  return String(query ?? '')
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2')
    .replace(/_/g, ' ');
}

/**
 * Search the snapshot.
 *
 * A query that finds nothing is tried again as the words its identifiers are
 * made of, and every hit then says so in `via`. A model guessing a name —
 * `ChargeEvent` — searched for one word no document contains and got nothing,
 * where the same words apart, `charge event`, found fifteen.
 *
 * @param {string} query - Terms, optionally with `"quoted phrases"`.
 * @param {{limit?: number, kind?: Kind, family?: string, snapshot?: object}} [options]
 * @returns {Array<object>} ranked hits, each with `kind`, `id`, `title`,
 *   `score`, `excerpt` and kind-specific fields — `operation` for a query
 *   parameter — and `via`, the words searched instead, when the query itself
 *   matched nothing.
 */
export function search(query, options = {}) {
  const hits = rank(query, options);
  const words = identifierWords(query);
  if (hits.length > 0 || words === String(query ?? '')) return hits;
  return rank(words, options).map((hit) => ({ ...hit, via: words }));
}

/** One ranking pass; see {@link search}. */
function rank(query, { limit = 10, kind, family, snapshot = loadSnapshot() } = {}) {
  index ??= build(snapshot);
  const { terms, phrases } = parseQuery(query);
  if (terms.length === 0 && phrases.length === 0) return [];
  const typed = String(query ?? '').replace(/"/g, '').trim();
  const whole = typed.toLowerCase();
  const stems = terms.map(stemOf);

  const hits = [];
  for (const doc of index) {
    if (kind && doc.kind !== kind) continue;
    if (family && doc.kind === 'guide' && doc.family !== family) continue;
    if (family && doc.kind !== 'guide') continue;

    let score = 0;
    let matched = 0;
    terms.forEach((term, i) => {
      const stem = stems[i];
      const inKey = doc.lowerKeys.some((key) => key === term);
      const inKeyPart = !inKey && doc.lowerKeys.some((key) => key.includes(stem));
      const inTitle = doc.lowerTitle.includes(stem);
      const inText = count(doc.lowerText, stem);
      if (inKey || inKeyPart || inTitle || inText) matched++;
      score += (inKey ? 12 : 0) + (inKeyPart ? 5 : 0) + (inTitle ? 4 : 0);
      /* Damped by length, so a 60 KB guide does not outrank a precise field.
         An operation's one-sentence description is worth its title: one hit
         there scored one point, against a guide's dozens. */
      score +=
        doc.kind === 'guide'
          ? (inText * 2) / Math.log2(8 + doc.text.length / 2000)
          : doc.kind === 'operation'
            ? (inText ? 4 : 0) + Math.min(inText, 2)
            : Math.min(inText, 4);
    });
    for (const phrase of phrases) {
      if (doc.lowerText.includes(phrase) || doc.lowerTitle.includes(phrase)) {
        score += 15;
        matched++;
      } else {
        score = 0;
        break;
      }
    }
    if (score <= 0) continue;
    /* A document holding every term beats one that holds a single term many
       times; one holding none of a multi-term query's words but the first is
       barely relevant. */
    const wanted = terms.length + phrases.length;
    score *= matched === wanted ? 1.6 : matched / wanted;
    if (doc.lowerKeys.includes(whole) || doc.name.toLowerCase() === whole) score += 40;
    /* Spelt exactly as typed, case included: `geoServer` is the query
       parameter, `geoserver` ten body fields. */
    if (doc.keys.includes(typed)) score += 20;
    if (doc.deprecated) score *= 0.7;
    if (doc.superseded) score *= 0.75;
    score *= KIND_WEIGHT[doc.kind];
    hits.push({ doc, score });
  }

  /* Equal scores go to the newer API version: v1 and v2 of EV smart routing
     share a title, and v1 came first. */
  hits.sort((a, b) => b.score - a.score || versionOf(b.doc) - versionOf(a.doc));
  return hits.slice(0, limit).map(({ doc, score }) => ({
    kind: doc.kind,
    id: doc.id,
    title: doc.title,
    score: Math.round(score * 10) / 10,
    excerpt: excerpt(doc.text, [...phrases, ...terms, ...stems]),
    ...(doc.schema ? { schema: doc.schema } : {}),
    ...(doc.operation ? { operation: doc.operation } : {}),
    ...(doc.field ? { field: doc.field } : {}),
    ...(doc.type ? { type: doc.type } : {}),
    ...(doc.kind === 'field' ? { required: doc.required } : {}),
    ...(doc.family ? { family: doc.family } : {}),
  }));
}
