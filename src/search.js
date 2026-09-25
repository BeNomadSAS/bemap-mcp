/* ======================================================================
 * SEARCH
 *
 * One ranked index over everything the snapshot holds: operations, schemas,
 * fields, enum values and guides. Built on first use and kept for the life
 * of the process.
 *
 * The ranking favours identifiers over prose, because the question behind
 * most searches is "what is this called and where does it go": a field or an
 * enum value whose name *is* the query outranks a guide that mentions it
 * forty times. Guides are long, so their term counts are damped by length —
 * otherwise the longest page wins every query it touches.
 * ====================================================================== */

import { fieldsOf, loadSnapshot, readGuide } from './spec.js';

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
 * Split a query into terms and verbatim phrases.
 *
 * @param {string} query - E.g. `"departure time" routing`.
 * @returns {{terms: string[], phrases: string[]}} lower-cased, at most
 *   {@link MAX_TERMS} terms and {@link MAX_PHRASES} phrases.
 */
export function parseQuery(query) {
  const phrases = [];
  const rest = String(query ?? '').replace(/"([^"]+)"/g, (_, phrase) => {
    phrases.push(phrase.toLowerCase());
    return ' ';
  });
  const terms = rest
    .toLowerCase()
    .split(/[^a-z0-9_]+/)
    .filter((term) => term.length >= 2);
  return { terms: [...new Set(terms)].slice(0, MAX_TERMS), phrases: phrases.slice(0, MAX_PHRASES) };
}

/** Build the index from the snapshot. */
function build(snapshot) {
  const docs = [];
  const schemas = snapshot.spec.components?.schemas ?? {};

  for (const op of snapshot.operations) {
    docs.push({
      kind: 'operation',
      id: op.key,
      name: `${op.method} ${op.endpoint}`,
      title: op.summary || op.key,
      keys: [op.path, op.operationId ?? '', ...op.tags],
      text: `${op.summary} ${op.description} ${op.tags.join(' ')} ${op.path.replace(/[/.]/g, ' ')}`,
      deprecated: op.deprecated,
    });
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
      text = readGuide(guide.id);
    } catch {
      continue;
    }
    docs.push({ kind: 'guide', id: guide.id, name: guide.id, title: guide.title, keys: [], text, family: guide.family });
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
 *   `score`, `excerpt` and kind-specific fields — and `via`, the words
 *   searched instead, when the query itself matched nothing.
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
  const whole = String(query ?? '').replace(/"/g, '').trim().toLowerCase();

  const hits = [];
  for (const doc of index) {
    if (kind && doc.kind !== kind) continue;
    if (family && doc.kind === 'guide' && doc.family !== family) continue;
    if (family && doc.kind !== 'guide') continue;

    let score = 0;
    let matched = 0;
    for (const term of terms) {
      const inKey = doc.lowerKeys.some((key) => key === term);
      const inKeyPart = !inKey && doc.lowerKeys.some((key) => key.includes(term));
      const inTitle = doc.lowerTitle.includes(term);
      const inText = count(doc.lowerText, term);
      if (inKey || inKeyPart || inTitle || inText) matched++;
      score += (inKey ? 12 : 0) + (inKeyPart ? 5 : 0) + (inTitle ? 4 : 0);
      /* Damped by length, so a 60 KB guide does not outrank a precise field. */
      score += doc.kind === 'guide' ? (inText * 2) / Math.log2(8 + doc.text.length / 2000) : Math.min(inText, 4);
    }
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
    if (doc.deprecated) score *= 0.7;
    score *= KIND_WEIGHT[doc.kind];
    hits.push({ doc, score });
  }

  hits.sort((a, b) => b.score - a.score);
  return hits.slice(0, limit).map(({ doc, score }) => ({
    kind: doc.kind,
    id: doc.id,
    title: doc.title,
    score: Math.round(score * 10) / 10,
    excerpt: excerpt(doc.text, [...phrases, ...terms]),
    ...(doc.schema ? { schema: doc.schema } : {}),
    ...(doc.field ? { field: doc.field } : {}),
    ...(doc.type ? { type: doc.type } : {}),
    ...(doc.kind === 'field' ? { required: doc.required } : {}),
    ...(doc.family ? { family: doc.family } : {}),
  }));
}
