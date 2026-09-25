/* ======================================================================
 * SPEC
 *
 * The snapshot the server answers from: BeMap's OpenAPI specification as the
 * build wrote it to `data/openapi.json`, plus the documentation pages under
 * `data/guides/`. Everything here is read-only and offline.
 *
 * The specification is the contract. Nothing in this module corrects it,
 * infers a field it does not declare, or reorders what it says is required —
 * the build fetched it, added what the Java source knows and the format
 * cannot yet hold (enum value descriptions, endpoint roles), and wrote it
 * down. Whatever is wrong in it is reported in BeMap's bug list and fixed in
 * BeMap.
 *
 * Operations are keyed on `METHOD path`. springdoc's `operationId`s are
 * auto-numbered (`search_8`) and renumber whenever a controller is added, so
 * they are accepted as input but never used as an identity.
 * ====================================================================== */

import { existsSync, readFileSync } from 'node:fs';
import { dirname, join, normalize, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const DATA = join(dirname(fileURLToPath(import.meta.url)), '..', 'data');
const HTTP_METHODS = ['get', 'post', 'put', 'delete', 'patch'];

/** The snapshot is missing or unreadable — the install is incomplete. */
export class SnapshotMissingError extends Error {
  constructor(detail) {
    super(
      'No specification snapshot under data/ — the package is incomplete. ' +
        `Reinstall it, or contact bgis-support@benomad.com. (${detail})`
    );
    this.name = 'SnapshotMissingError';
  }
}

/** @type {object|null} */
let cache = null;

/**
 * Load the snapshot once per process.
 *
 * @returns {{spec: object, manifest: object, guides: Array<{id: string, family: string, title: string, bytes: number}>,
 *   operations: Array<object>, basePath: string}}
 * @throws {SnapshotMissingError}
 */
export function loadSnapshot() {
  if (cache) return cache;
  const read = (name) => {
    const file = join(DATA, name);
    if (!existsSync(file)) throw new SnapshotMissingError(`${name} is missing`);
    try {
      return JSON.parse(readFileSync(file, 'utf8'));
    } catch (error) {
      throw new SnapshotMissingError(`${name} is unreadable: ${error.message}`);
    }
  };
  const spec = read('openapi.json');
  const manifest = read('manifest.json');
  const guides = read('guides.json');
  const basePath = manifest.specification?.basePath ?? '';
  cache = { spec, manifest, guides, basePath, operations: listOperations(spec, basePath) };
  return cache;
}

/** The name a `$ref` points at. */
export const refName = (ref) => (ref ? ref.slice(ref.lastIndexOf('/') + 1) : null);

/** The schema name a body's content points at, directly or as an array's items. */
function bodySchema(content) {
  for (const [mediaType, media] of Object.entries(content ?? {})) {
    const schema = media.schema;
    if (!schema) continue;
    const name = refName(schema.$ref) ?? refName(schema.items?.$ref);
    return { mediaType, name, array: !schema.$ref && Boolean(schema.items?.$ref), inline: name ? null : schema };
  }
  return null;
}

/**
 * Every operation, in the specification's order.
 *
 * @param {object} spec - OpenAPI document.
 * @param {string} basePath - Path every operation is relative to.
 * @returns {Array<object>}
 */
export function listOperations(spec, basePath) {
  const out = [];
  for (const [path, item] of Object.entries(spec.paths ?? {})) {
    for (const method of HTTP_METHODS) {
      const operation = item[method];
      if (!operation) continue;
      const success = Object.entries(operation.responses ?? {}).find(([code]) => /^2/.test(code));
      out.push({
        key: `${method.toUpperCase()} ${path}`,
        method: method.toUpperCase(),
        path,
        endpoint: `${basePath}${path}`,
        tags: operation.tags ?? [],
        summary: operation.summary ?? '',
        description: operation.description ?? '',
        operationId: operation.operationId ?? null,
        deprecated: operation.deprecated === true,
        parameters: [...(item.parameters ?? []), ...(operation.parameters ?? [])],
        request: bodySchema(operation.requestBody?.content),
        requestRequired: operation.requestBody?.required === true,
        response: success ? { status: success[0], ...(bodySchema(success[1].content) ?? {}) } : null,
        errors: Object.entries(operation.responses ?? {})
          .filter(([code]) => !/^2/.test(code))
          .map(([status, response]) => ({ status, description: response.description ?? '', ...(bodySchema(response.content) ?? {}) })),
        roles: operation['x-bemap-roles'] ?? null,
      });
    }
  }
  return out;
}

/** Lower-case and drop everything but letters and digits: `EV smart-routing` → `evsmartrouting`. */
export const squash = (text) => String(text ?? '').toLowerCase().replace(/[^a-z0-9]/g, '');

/**
 * Find the operation a caller means.
 *
 * Accepts, in order of precedence: `METHOD /path`, a full endpoint
 * (`/bgis/service/routing/1.0`), a path relative to the service root
 * (`/routing/1.0`), an `operationId`, and finally words (`reverse geocoding`)
 * matched against summaries, tags and path segments.
 *
 * @param {string} query - What the caller typed.
 * @param {{operations: Array<object>, basePath: string}} [snapshot]
 * @returns {{match: object|null, candidates: Array<object>}} `match` is set
 *   only when one operation is clearly meant; `candidates` otherwise lists
 *   the plausible ones, best first.
 */
export function findOperation(query, snapshot = loadSnapshot()) {
  const { operations, basePath } = snapshot;
  const raw = String(query ?? '').trim();
  if (!raw) return { match: null, candidates: [] };

  const verb = raw.match(/^(GET|POST|PUT|DELETE|PATCH)\s+(\S+)$/i);
  const pathOf = (text) => {
    let path = text.split('?')[0].replace(/^https?:\/\/[^/]+/i, '');
    if (basePath && path.startsWith(basePath)) path = path.slice(basePath.length);
    return path.startsWith('/') ? path : `/${path}`;
  };

  if (verb) {
    const key = `${verb[1].toUpperCase()} ${pathOf(verb[2])}`;
    const exact = operations.find((op) => op.key === key);
    if (exact) return { match: exact, candidates: [exact] };
    /* The path under another method: offered, never substituted — a GET
       named explicitly used to be sent as the POST. */
    const others = operations.filter((op) => op.path.toLowerCase() === pathOf(verb[2]).toLowerCase());
    if (others.length) return { match: null, candidates: others };
  }

  /* An endpoint written out — with a method, a leading slash or a host — is
     matched exactly, or not at all. */
  const explicit = Boolean(verb) || /^\/|^[a-z0-9]+\/[\w./-]+$/i.test(raw) || raw.startsWith('http');
  if (explicit && !verb) {
    const path = pathOf(raw);
    const byPath = operations.filter((op) => op.path === path || op.path.toLowerCase() === path.toLowerCase());
    if (byPath.length === 1) return { match: byPath[0], candidates: byPath };
    /* GET and POST on one path are two operations. When they share a body
       and a purpose, POST is the one that takes a payload; the caller is shown
       both either way. */
    if (byPath.length > 1) return { match: byPath.find((op) => op.method === 'POST') ?? byPath[0], candidates: byPath };
  }

  /* An id names one operation when springdoc numbered it — `search_8` — or
     numbered none of its namesakes: `getRate`. A plain id beside numbered
     ones is a Java method name springdoc gave whichever controller it
     registered first: "evsmartrouting" was answered as v1 alone, "convert" as
     OpenLR, and a GET query checked against the POST. That one is a word. */
  const stem = (id) => String(id ?? '').replace(/_\d+$/, '').toLowerCase();
  const byId = operations.filter((op) => op.operationId && op.operationId.toLowerCase() === raw.toLowerCase());
  if (byId.length === 1) {
    const numbered = /_\d+$/.test(byId[0].operationId);
    const namesakes = operations.filter((op) => op !== byId[0] && stem(op.operationId) === stem(byId[0].operationId));
    if (numbered || namesakes.length === 0) return { match: byId[0], candidates: byId };
  }

  const subject = verb ? verb[2] : raw;
  const needle = squash(subject);
  /* Nothing left to match on — "маршрут", "??" — matched everything: an
     empty needle is contained in every path. */
  if (!needle) return { match: null, candidates: [] };
  /* Version numbers are in every path, so as words they matched everything:
     `/no/such/1.0` was "close" to eight real operations. */
  const words = subject.toLowerCase().split(/[^a-z0-9]+/).filter((word) => word && !/^\d+$/.test(word));
  const scored = operations
    .map((op) => {
      const segments = op.path.split('/').filter(Boolean).map(squash);
      const tags = op.tags.map(squash);
      /* Summaries are compared as words, not as squashed strings: squashed,
         "currency rate" is a prefix of "currency rates" and matches the wrong
         operation. */
      const summaryWords = op.summary.toLowerCase().split(/[^a-z0-9]+/).filter(Boolean);
      let score = 0;
      if (squash(op.summary) === needle) score += 100;
      else if (words.length > 0 && words.every((word) => summaryWords.includes(word))) score += 40;
      if (segments[0] === needle || segments.includes(needle)) score += 60;
      if (tags.includes(needle)) score += 30;
      if (squash(op.path).includes(needle)) score += 20;
      const haystack = `${op.summary} ${op.description} ${op.path} ${op.tags.join(' ')}`.toLowerCase();
      score += words.filter((word) => haystack.includes(word)).length * 5;
      /* A word that *is* a path segment says more than one the path merely
         contains: "currency rate" is `/currency/1.0/rate`, not `/rates`. */
      score += words.filter((word) => segments.includes(word)).length * 10;
      if (op.deprecated) score -= 10;
      /* A shorter path is the more general operation: `routing` means
         `/routing/1.0`, not `/routing/1.0/traceroute/rnc`. */
      score -= segments.length;
      return { op, score };
    })
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score);

  const candidates = scored.slice(0, 8).map((entry) => entry.op);
  /* A path that exists nowhere is not rounded to the nearest one that does:
     `POST /routing/2.0` would have been answered, and sent, as `/routing/1.0`. */
  if (scored.length === 0 || explicit) return { match: null, candidates };
  if (scored.length === 1 || scored[0].score >= scored[1].score + 10) return { match: scored[0].op, candidates };

  /* A tie between an operation and variants of its own path —
     `/routing/1.0` against `/routing/1.0.csv` — is settled by structure: the
     path the others extend is the general operation, and the variants are
     listed beside it. */
  const top = scored.filter((entry) => entry.score >= scored[0].score - 10);
  const general = top.find((entry) => top.every((other) => other === entry || other.op.path.startsWith(entry.op.path)));
  return { match: general ? general.op : null, candidates };
}

/**
 * Find a schema by name — exact, then case-insensitive, then as a fragment —
 * or by the fully-qualified Java class it was built from.
 *
 * @param {string} name - E.g. `RoutingRequest`, `routingrequest`, `Routing`,
 *   `com.benomad….v2_0_0….EvSmartRoutingRequest`.
 * @param {{spec: object}} [snapshot]
 * @returns {{name: string|null, schema: object|null, candidates: string[]}}
 */
export function findSchema(name, snapshot = loadSnapshot()) {
  const schemas = snapshot.spec.components?.schemas ?? {};
  const raw = String(name ?? '').trim().replace(/^#\/components\/schemas\//, '');
  const wanted = raw.split('.').pop();
  /* A Java class, as the guides and the `Java:` line name it. Two API
     versions share simple names, so the simple name gave the v1 schema for a
     v2 class; the class each schema was built from settles it. */
  if (raw.includes('.')) {
    const byClass = Object.keys(schemas).find((candidate) => schemas[candidate]?.['x-javaClass'] === raw);
    if (byClass) return { name: byClass, schema: schemas[byClass], candidates: [byClass] };
    if (Object.hasOwn(schemas, wanted) && schemas[wanted]?.['x-javaClass']) return { name: null, schema: null, candidates: [wanted] };
  }
  /* Own properties only: `constructor` or `toString` would otherwise be
     answered as schemas with no fields. */
  if (Object.hasOwn(schemas, wanted)) return { name: wanted, schema: schemas[wanted], candidates: [wanted] };
  const names = Object.keys(schemas);
  const folded = names.filter((candidate) => candidate.toLowerCase() === wanted.toLowerCase());
  if (folded.length === 1) return { name: folded[0], schema: schemas[folded[0]], candidates: folded };
  const partial = names
    .filter((candidate) => candidate.toLowerCase().includes(wanted.toLowerCase()))
    .sort((a, b) => a.length - b.length);
  return { name: null, schema: null, candidates: partial.slice(0, 12) };
}

/**
 * A property schema written as a type a developer reads: `RoutingDest[]`,
 * `string (date-time)`, `map<string, Tariff>`.
 *
 * @param {object} node - A property schema.
 * @returns {string}
 */
export function typeOf(node) {
  if (!node || typeof node !== 'object') return 'any';
  if (node.$ref) return refName(node.$ref);
  for (const key of ['oneOf', 'anyOf']) if (node[key]) return node[key].map(typeOf).join(' | ');
  if (node.allOf) return node.allOf.map(typeOf).join(' & ');
  if (node.type === 'array') return `${typeOf(node.items)}[]`;
  if (node.type === 'object' && node.additionalProperties && typeof node.additionalProperties === 'object') {
    return `map<string, ${typeOf(node.additionalProperties)}>`;
  }
  const types = Array.isArray(node.type) ? node.type.filter((t) => t !== 'null') : [node.type ?? 'any'];
  let label = types.join(' | ');
  if (node.enum) label = `enum ${label}`.trim();
  /* `format: byte` is a single base64 string, never an array of numbers —
     the Java declaration says `byte[]`, the wire says otherwise. Unless the
     source declares a single `byte`, which springdoc publishes the same way
     and Jackson reads from a JSON number. */
  if (node.format === 'byte' && /^(?:byte|Byte)$/.test(node['x-javaType'] ?? '')) return 'integer (Java byte)';
  if (node.format === 'byte' || node.contentEncoding === 'base64') return 'string (base64)';
  if (node.format) label += ` (${node.format})`;
  return label;
}

/** The schema names a property refers to, through arrays and compositions. */
export function refsOf(node) {
  if (!node || typeof node !== 'object') return [];
  const out = [];
  if (node.$ref) out.push(refName(node.$ref));
  if (node.items) out.push(...refsOf(node.items));
  for (const key of ['oneOf', 'anyOf', 'allOf']) for (const part of node[key] ?? []) out.push(...refsOf(part));
  if (node.additionalProperties && typeof node.additionalProperties === 'object') out.push(...refsOf(node.additionalProperties));
  return [...new Set(out)];
}

/**
 * The enum a property carries, with the description of each value, whether
 * the enum sits on the property itself or on its array items.
 *
 * @param {object} node - A property schema.
 * @returns {null|{values: string[], descriptions: Record<string, string>, source: string|null}}
 */
export function enumOf(node) {
  const carrier = Array.isArray(node?.enum) ? node : Array.isArray(node?.items?.enum) ? node.items : null;
  if (!carrier) return null;
  return {
    values: carrier.enum,
    descriptions: carrier['x-enumDescriptions'] ?? {},
    source: carrier['x-enumSource'] ?? null,
  };
}

/**
 * The fields a schema declares, in declaration order, with inherited ones
 * (`allOf`) folded in.
 *
 * @param {object} schema - A component schema.
 * @param {{spec: object}} [snapshot]
 * @param {number} [depth] - Composition levels already followed.
 * @returns {Array<{name: string, type: string, required: boolean, description: string, deprecated: boolean,
 *   enum: object|null, refs: string[], node: object}>}
 */
export function fieldsOf(schema, snapshot = loadSnapshot(), depth = 0) {
  if (!schema || depth > 5) return [];
  const schemas = snapshot.spec.components?.schemas ?? {};
  const inherited = (schema.allOf ?? []).flatMap((part) =>
    part.$ref ? fieldsOf(schemas[refName(part.$ref)], snapshot, depth + 1) : fieldsOf(part, snapshot, depth + 1)
  );
  const required = new Set(schema.required ?? []);
  const own = Object.entries(schema.properties ?? {}).map(([name, node]) => ({
    name,
    type: typeOf(node),
    required: required.has(name),
    description: String(node.description ?? (node.items?.description && !node.items?.enum ? node.items.description : '')).trim(),
    deprecated: node.deprecated === true,
    readOnly: node.readOnly === true,
    defaultValue: node.default,
    enum: enumOf(node),
    refs: refsOf(node),
    node,
  }));
  const seen = new Set(own.map((field) => field.name));
  return [...inherited.filter((field) => !seen.has(field.name)), ...own];
}

/**
 * The services — the specification's tags — with their operations.
 *
 * @param {{spec: object, operations: Array<object>}} [snapshot]
 * @returns {Array<{name: string, description: string, operations: Array<object>}>}
 */
export function services(snapshot = loadSnapshot()) {
  const described = new Map((snapshot.spec.tags ?? []).map((tag) => [tag.name, tag.description ?? '']));
  const byTag = new Map();
  for (const op of snapshot.operations) {
    for (const tag of op.tags.length ? op.tags : ['(untagged)']) {
      if (!byTag.has(tag)) byTag.set(tag, []);
      byTag.get(tag).push(op);
    }
  }
  return [...byTag.entries()]
    .map(([name, ops]) => ({ name, description: described.get(name) ?? '', operations: ops }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

/**
 * Find a guide by id, title or words.
 *
 * @param {string} query - `rest_1_0_0/routing-service.md`, a title, or words.
 * @param {{guides: Array<object>}} [snapshot]
 * @returns {{match: object|null, candidates: Array<object>}}
 */
export function findGuide(query, snapshot = loadSnapshot()) {
  const raw = String(query ?? '').trim();
  const { guides } = snapshot;
  const byId = guides.find((guide) => guide.id === raw || guide.id === `${raw}.md`);
  if (byId) return { match: byId, candidates: [byId] };
  const needle = raw.toLowerCase();
  const byTitle = guides.filter((guide) => guide.title.toLowerCase() === needle);
  if (byTitle.length === 1) return { match: byTitle[0], candidates: byTitle };
  const words = needle.split(/[^a-z0-9]+/).filter(Boolean);
  const scored = guides
    .map((guide) => {
      const hay = `${guide.id} ${guide.title}`.toLowerCase();
      const hits = words.filter((word) => hay.includes(word)).length;
      return { guide, score: hits === words.length ? hits * 10 - guide.id.length / 100 : hits };
    })
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score);
  const candidates = scored.slice(0, 10).map((entry) => entry.guide);
  const clear = scored.length > 0 && (scored.length === 1 || scored[0].score > scored[1].score);
  return { match: clear ? scored[0].guide : null, candidates };
}

/**
 * The text of a guide, verbatim.
 *
 * @param {string} id - Guide id from `data/guides.json`.
 * @returns {string}
 * @throws {Error} when the id escapes the guides directory or does not exist.
 */
export function readGuide(id) {
  const root = join(DATA, 'guides');
  const file = normalize(join(root, id));
  if (!file.startsWith(root + sep)) throw new Error(`Not a guide: ${id}`);
  if (!existsSync(file)) throw new SnapshotMissingError(`guide ${id} is listed but missing`);
  return readFileSync(file, 'utf8');
}

/**
 * The schemas a guide's text names, by the documentation site's own link form
 * (`buildclass.md?className=com.benomad…RoutingRequest`), mapped to the
 * specification's schema names. Derived from the text, never assumed.
 *
 * @param {string} text - Guide body.
 * @param {{spec: object}} [snapshot]
 * @returns {string[]} schema names present in the specification.
 */
export function schemasNamedIn(text, snapshot = loadSnapshot()) {
  const toSchema = classToSchema(snapshot);
  const found = new Set();
  for (const m of text.matchAll(/className=([A-Za-z0-9_.$]+)/g)) {
    const name = toSchema(m[1]);
    if (name) found.add(name);
  }
  return [...found];
}

/**
 * The schema a Java class is published as, by its fully-qualified name.
 *
 * By fully-qualified name first: two API versions share simple names, and
 * mapping `v2_0_0…EvSmartRoutingRequest` by its simple name lands on the v1
 * schema. The simple name is used only when no schema claims the class and
 * one schema carries that name with no other class behind it.
 *
 * @param {object} snapshot
 * @returns {(fqn: string) => string|null}
 */
function classToSchema(snapshot) {
  const schemas = snapshot.spec.components?.schemas ?? {};
  const byClass = new Map();
  for (const [name, schema] of Object.entries(schemas)) {
    if (schema['x-javaClass']) byClass.set(schema['x-javaClass'], name);
  }
  return (fqn) => {
    const exact = byClass.get(fqn);
    if (exact) return exact;
    const simple = fqn.split('.').pop();
    return Object.hasOwn(schemas, simple) && !schemas[simple]['x-javaClass'] ? simple : null;
  };
}

/**
 * Replace the instructions BeMap's pages leave for their own documentation
 * site with something a reader of the text can use.
 *
 * A page embeds a field table as a fenced `{"bemap":{"language":"!include",
 * "url":"…/buildclass.md?className=<class>"}}`, which only the site's
 * JavaScript expands — so served as written, the table a reader came for is a
 * line of JSON pointing at an internal URL. 78 such tables sit in 47 pages. Each
 * becomes a pointer to the schema its class is published as; an include this
 * snapshot cannot expand says so instead of showing the raw instruction.
 *
 * @param {string} text - A guide, as BeMap wrote it.
 * @param {object} [snapshot]
 * @returns {string}
 */
export function resolveIncludes(text, snapshot = loadSnapshot()) {
  const toSchema = classToSchema(snapshot);
  return text.replace(/^(`{3,}|~{3,})[^\n]*\n\s*(\{"bemap":\{"language":"!include"[^\n]*\})\s*\n\1[ \t]*$/gm, (_, fence, include) => {
    const fqn = include.match(/className=([A-Za-z0-9_.$]+)/)?.[1];
    if (!fqn) return '> _A part of this page that BeMap\'s documentation site generates when it is displayed — not in this snapshot._';
    const name = toSchema(fqn);
    return name
      ? `> **Field table of \`${name}\`** — the specification's contract: \`bemap_get_schema "${name}"\`.`
      : `> **Field table of \`${fqn.split('.').pop()}\`** — this class is not in the specification.`;
  });
}
