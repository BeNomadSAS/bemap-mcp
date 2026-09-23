/* ======================================================================
 * FULL-TEXT SEARCH
 *
 * A developer's question is usually a field name or a concept ("how do I get
 * toll costs?", "departureTime format", "EVT_TRAFFIC"), not a page name. This
 * module searches the whole corpus — pages and parameter schemas alike — and
 * returns matching excerpts rather than whole documents, so an answer costs a
 * few hundred tokens instead of tens of thousands.
 *
 * The index is built lazily on first search and kept in memory (~3 MB of
 * text). No external search dependency: the corpus is small enough that a
 * scan with term scoring is both fast and predictable.
 * ====================================================================== */

import { parseSchemaRow } from './format.js';
import { loadManifest, readPage, readSchema } from './snapshot.js';

/** @type {Array<{type:'page'|'schema', id:string, title:string, meta:object, text:string, lower:string}>|null} */
let index = null;

/**
 * Build the in-memory index over every page and schema in the snapshot.
 *
 * @returns {Promise<Array<object>>} The index; memoized after the first call.
 */
async function buildIndex() {
  if (index) return index;
  const manifest = await loadManifest();
  const documents = [];

  for (const page of manifest.pages) {
    try {
      const text = await readPage(page.id);
      documents.push({
        type: 'page',
        id: page.id,
        title: page.title,
        meta: {
          family: page.family,
          isRest: Boolean(page.isRest),
          kind: page.kind,
          service: page.service,
          endpoint: page.endpoint,
          role: page.role,
          isLatest: page.isLatest,
        },
        text,
        lower: text.toLowerCase(),
      });
    } catch {
      // A manifest entry without a file on disk is skipped rather than fatal —
      // an incomplete snapshot should still be searchable.
    }
  }

  for (const schema of manifest.schemas) {
    try {
      const text = await readSchema(schema.className);
      documents.push({
        type: 'schema',
        id: schema.className,
        title: schema.simpleName,
        meta: { referencedBy: schema.referencedBy },
        text,
        lower: text.toLowerCase(),
      });
    } catch {
      // Same rationale as above.
    }
  }

  index = documents;
  return index;
}

/**
 * Split a query into searchable terms, honouring "quoted phrases".
 *
 * @param {string} query
 * @returns {string[]} Lower-cased terms.
 */
function tokenize(query) {
  const terms = [];
  const pattern = /"([^"]+)"|(\S+)/g;
  let match;
  while ((match = pattern.exec(query)) !== null) {
    const term = (match[1] ?? match[2]).toLowerCase().trim();
    if (term.length > 1) terms.push(term);
  }
  return terms;
}

/**
 * Extract a readable excerpt centred on a hit, collapsing whitespace.
 *
 * `taken` exists because a multi-term query usually hits the same paragraph
 * once per term — a page whose title contains every word then answered with
 * three near-identical excerpts, paying three times for one sentence. An
 * occurrence inside an already-quoted window is skipped in favour of the next
 * one, and only then given up on.
 *
 * @param {string} text - Full document.
 * @param {string} term - Term to centre on.
 * @param {number} [radius] - Characters of context on each side.
 * @param {Array<{start:number, end:number}>} [taken] - Windows already quoted.
 * @returns {{text:string, start:number, end:number}|null}
 */
function excerpt(text, term, radius = 180, taken = []) {
  const lower = text.toLowerCase();
  let at = lower.indexOf(term);
  while (at !== -1) {
    const start = Math.max(0, at - radius);
    const end = Math.min(text.length, at + term.length + radius);
    if (!taken.some((window) => start < window.end && end > window.start)) {
      const body = text.slice(start, end).replace(/\s+/g, ' ').trim();
      return {
        text: `${start > 0 ? '…' : ''}${body}${end < text.length ? '…' : ''}`,
        start,
        end,
      };
    }
    at = lower.indexOf(term, at + term.length);
  }
  return null;
}

/**
 * Search the corpus.
 *
 * Scoring favours documents matching more distinct terms, then title hits,
 * then raw frequency — and nudges current REST reference pages above older
 * versions and tutorials, since that is what a developer usually wants.
 *
 * @param {string} query - Free text; supports "quoted phrases".
 * @param {object} [options]
 * @param {number} [options.limit] - Maximum results. Default 10.
 * @param {'page'|'schema'} [options.type] - Restrict to one document type.
 * @param {boolean} [options.restOnly] - Restrict pages to the REST corpus (`isRest`),
 *   which includes the root-level pages, not only the versioned `rest_*` families.
 * @returns {Promise<Array<{type:string, id:string, title:string, score:number, meta:object, excerpts:string[]}>>}
 */
export async function search(query, options = {}) {
  const { limit = 10, type, restOnly = false } = options;
  const terms = tokenize(query);
  if (terms.length === 0) return [];

  const documents = await buildIndex();
  const results = [];

  for (const doc of documents) {
    if (type && doc.type !== type) continue;
    /* `isRest`, not a `rest_` family prefix. The REST corpus is not all under a
       versioned family: authentication, the six WMS pages and three glossaries
       are served from the documentation root and filed under the synthetic
       family `general`. Filtering on the prefix drops 13 REST pages — including
       the authentication reference — from a search that asked for REST only,
       and reports the remainder as the whole answer. This is also the test
       `listServices` applies, so the flag means one thing across both tools. */
    if (restOnly && doc.type === 'page' && !doc.meta.isRest) continue;

    let score = 0;
    let matchedTerms = 0;
    const excerpts = [];
    /** @type {Array<{start:number, end:number}>} */
    const quoted = [];

    for (const term of terms) {
      const occurrences = doc.lower.split(term).length - 1;
      if (occurrences === 0) continue;
      matchedTerms += 1;
      score += Math.min(occurrences, 12);
      if (doc.title.toLowerCase().includes(term)) score += 25;
      if (doc.id.toLowerCase().includes(term)) score += 10;
      if (excerpts.length < 3) {
        const snippet = excerpt(doc.text, term, 180, quoted);
        if (snippet) {
          excerpts.push(snippet.text);
          quoted.push({ start: snippet.start, end: snippet.end });
        }
      }
    }

    if (matchedTerms === 0) continue;
    // Reward covering the whole query far more than repeating one term.
    score += matchedTerms * 40;
    if (matchedTerms === terms.length) score += 60;
    if (doc.type === 'page') {
      if (doc.meta.kind === 'reference') score += 20;
      if (doc.meta.isLatest) score += 15;
    }

    results.push({
      type: doc.type,
      id: doc.id,
      title: doc.title,
      score,
      meta: doc.meta,
      excerpts,
    });
  }

  return results.sort((a, b) => b.score - a.score).slice(0, limit);
}

/**
 * Search only within parameter tables, returning the matching table rows.
 *
 * This is the precise tool for "does field X exist, and what is its type?" —
 * it answers with the row itself instead of a paragraph of prose.
 *
 * Each hit carries the section that declares it, because requiredness is a
 * property of the declaring class and not of the document: a row inside
 * `#### __VehicleFeatureFront__` belongs to a class no probe ever removed a
 * field from, even when the document's root class was probed. Returning the
 * parsed row rather than the raw line is what lets this tool and
 * `bemap_get_parameters` reach the same verdict for the same field — printing
 * the line verbatim here was how the two came to disagree.
 *
 * @param {string} fieldName - Field name or fragment.
 * @param {object} [options]
 * @param {number} [options.limit] - Maximum rows. Default 25.
 * @returns {Promise<Array<{className:string, simpleName:string, section:string,
 *   isRoot:boolean, field:string, optional:boolean, description:string,
 *   deprecated:boolean}>>}
 */
export async function searchFields(fieldName, options = {}) {
  const { limit = 25 } = options;
  const needle = fieldName.trim().toLowerCase();
  if (needle.length < 2) return [];

  const documents = await buildIndex();
  const rows = [];

  for (const doc of documents) {
    if (doc.type !== 'schema') continue;
    let section = '(root)';
    for (const line of doc.text.split('\n')) {
      const heading = line.match(/^####\s+__(.+?)__\s*$/);
      if (heading) {
        section = heading[1];
        continue;
      }
      if (!line.startsWith('|')) continue;
      // Field name is the first cell, wrapped in __bold__ by the generator.
      const cell = line.split('|')[1] ?? '';
      const name = cell.replace(/[_*<>\s]|<\/?s>/g, '').toLowerCase();
      if (!name.includes(needle)) continue;
      const parsed = parseSchemaRow(line.replace(/\s+/g, ' ').trim());
      if (!parsed) continue;
      rows.push({
        className: doc.id,
        simpleName: doc.title,
        section,
        isRoot: section === '(root)',
        ...parsed,
      });
      if (rows.length >= limit) return rows;
    }
  }

  return rows;
}
