/* ======================================================================
 * SNAPSHOT ACCESS
 *
 * Read-only access to the documentation snapshot committed under `data/`.
 * Everything here works with no credentials and no network — that is the
 * point of the snapshot.
 *
 * The manifest is loaded once and kept in memory (a few hundred KB of JSON);
 * page and schema bodies are read from disk on demand, because the full
 * corpus is ~3 MB and no single question needs all of it.
 * ====================================================================== */

import { readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { correctPage, correctSchema } from './corrections.js';

const HERE = dirname(fileURLToPath(import.meta.url));
const DATA_DIR = join(HERE, '..', 'data');

/** Age past which the snapshot is reported as potentially stale. */
const STALE_AFTER_DAYS = 90;

/** @type {object|null} */
let cachedManifest = null;

/**
 * Thrown when the snapshot is absent — the actionable case being a fresh
 * or partial install of this package.
 */
export class SnapshotMissingError extends Error {
  constructor(cause) {
    super(
      'No documentation snapshot found under data/. The package is incomplete — ' +
        'reinstall it, or contact bgis-support@benomad.com.' +
        (cause ? `\n\nUnderlying error: ${cause}` : '')
    );
    this.name = 'SnapshotMissingError';
  }
}

/**
 * Load and memoize the snapshot manifest.
 *
 * @returns {Promise<object>} Parsed `data/manifest.json`.
 * @throws {SnapshotMissingError}
 */
export async function loadManifest() {
  if (cachedManifest) return cachedManifest;
  try {
    const raw = await readFile(join(DATA_DIR, 'manifest.json'), 'utf8');
    cachedManifest = dropCrossFamilyProductGates(JSON.parse(raw));
    return cachedManifest;
  } catch (error) {
    throw new SnapshotMissingError(error.message);
  }
}

/**
 * Drop entitlement roles that were inherited across product families.
 *
 * `data-right` in the documentation index is a *page visibility* gate, not a
 * statement about an endpoint. The site's own ACL code (`bemap-js-api-acl.js`)
 * reads it as an expression — `A or B`, `A and B`, `A,B` — and gates whole
 * products: `ROLE_EVSMARTROUTING` appears on the EV smart routing, EV trip,
 * EV reachable area, routing *and* vehicle pages. A role declared by more than
 * one service is therefore a product gate, and inheriting one across family
 * kinds turns it into a false claim about an endpoint.
 *
 * That is exactly what happened to the vehicle service: the JS SDK page
 * `jsapi_2_0_0/js-ev-vehicles.md` is gated on `ROLE_EVSMARTROUTING` because EV
 * vehicle lookup is part of the EV-Move product, and the role spread onto all
 * 13 REST `/bgis/service/vehicle/**` pages, which are their own service. The
 * account's entitlement list (`GET /bgis/service/acl/1.0/user/details`) carries
 * separate `ROLE_VEHICLE` and `ROLE_VEHICLE_DATASHEET` entries, and the vehicle
 * reference pages declare `ROLE_VEHICLE_DATASHEET` in their own body — so
 * `ROLE_EVSMARTROUTING` was never the role a caller needs there.
 *
 * Only inherited roles are cleared. A page that carries its own `data-right` is
 * reporting a fact about itself and keeps it. Single-service roles are left
 * alone: `ROLE_GEOSERVERINFO` and `ROLE_TRAFFIC` are declared only on SDK pages
 * yet describe their REST service correctly, and nothing else claims them.
 *
 * @param {object} manifest - Parsed `data/manifest.json`; mutated in place.
 * @returns {object} The same manifest.
 */
function dropCrossFamilyProductGates(manifest) {
  /** @type {Map<string, Set<string>>} role -> services declaring it */
  const declaredBy = new Map();
  /** @type {Map<string, Set<string>>} `service\u0000role` -> family kinds declaring it */
  const declaredIn = new Map();
  const kindOf = (page) => (page.isRest ? 'rest' : 'sdk');

  for (const page of manifest.pages) {
    if (!page.role || page.roleInferred) continue;
    if (!declaredBy.has(page.role)) declaredBy.set(page.role, new Set());
    declaredBy.get(page.role).add(page.service);
    const key = `${page.service}\u0000${page.role}`;
    if (!declaredIn.has(key)) declaredIn.set(key, new Set());
    declaredIn.get(key).add(kindOf(page));
  }

  for (const page of manifest.pages) {
    if (!page.role) continue;
    page.roleIsProductGate = (declaredBy.get(page.role)?.size ?? 0) >= 2;
    if (!page.roleInferred || !page.roleIsProductGate) continue;
    if (declaredIn.get(`${page.service}\u0000${page.role}`)?.has(kindOf(page))) continue;
    page.role = null;
    page.roleInferred = false;
    page.roleIsProductGate = false;
  }
  return manifest;
}

/**
 * Describe how old the snapshot is, for surfacing alongside answers.
 *
 * @returns {Promise<{generatedAt:string, environment:string, ageDays:number, isStale:boolean, notice:string}>}
 */
export async function snapshotStatus() {
  const manifest = await loadManifest();
  const generated = new Date(manifest.generatedAt);
  const ageDays = Math.floor((Date.now() - generated.getTime()) / 86400000);
  const isStale = ageDays > STALE_AFTER_DAYS;
  return {
    generatedAt: manifest.generatedAt,
    environment: manifest.sourceEnvironment,
    ageDays,
    isStale,
    notice: isStale
      ? `This snapshot is ${ageDays} days old (from ${manifest.sourceEnvironment}). ` +
        'It may no longer match the live API — install a newer release of this package.'
      : `Snapshot from ${manifest.sourceEnvironment}, ${ageDays} day(s) old.`,
  };
}

/**
 * All pages, optionally filtered.
 *
 * @param {object} [filter]
 * @param {string} [filter.family] - Exact family, e.g. `rest_1_0_0`.
 * @param {string} [filter.kind] - `reference` | `example` | `tutorial` | `glossary` | `other`.
 * @param {string} [filter.service] - Service key, e.g. `routing`.
 * @param {boolean} [filter.restOnly] - Keep only REST families.
 * @param {boolean} [filter.latestOnly] - Keep only entries flagged as the current version.
 * @returns {Promise<object[]>}
 */
export async function listPages(filter = {}) {
  const manifest = await loadManifest();
  return manifest.pages.filter((page) => {
    if (filter.family && page.family !== filter.family) return false;
    if (filter.kind && page.kind !== filter.kind) return false;
    if (filter.service && page.service !== filter.service) return false;
    if (filter.restOnly && !page.isRest) return false;
    if (filter.latestOnly && !page.isLatest) return false;
    return true;
  });
}

/**
 * Find a page by id, or by a looser human reference.
 *
 * Accepts `rest_1_0_0/routing-service.md`, `routing-service.md`, `routing`,
 * or a service name — preferring the latest REST reference page on ties, so
 * that "routing" resolves to the current reference rather than a tutorial.
 *
 * @param {string} reference
 * @returns {Promise<object|null>} The manifest entry, or null.
 */
export async function resolvePage(reference) {
  const pages = (await loadManifest()).pages;
  const needle = reference.trim().toLowerCase();

  const exact = pages.find((page) => page.id.toLowerCase() === needle);
  if (exact) return exact;

  /* Rank candidates: REST first, then the reference page, then one that
     actually carries an endpoint, and only then the version flag.

     The version flag used to outweigh the page kind, and it decided far more
     often than it looks: 46 of the 59 reference pages are not flagged as the
     current version, while 8 example pages are. So `weather` and `currency`
     resolved to `examples-…-v1_0_0.md` — a page with no endpoint line, no HTTP
     method and, where the sample should be, the empty `<textarea id="request">`
     placeholders the documentation SPA fills in at runtime — in preference to
     `weather-service.md`, which carries all three. Kind now dominates and the
     version flag breaks ties within a kind. */
  const rank = (page) =>
    (page.isRest ? 0 : 100) +
    (page.kind === 'reference' ? 0 : page.kind === 'tutorial' ? 20 : 10) +
    (page.endpoint ? 0 : 4) +
    (page.isLatest ? 0 : 2);

  /* `<name>-service.md` is the reference page for `<name>`, even when its
     endpoint files it under another service key. `traceroute` is the case that
     matters: `/bgis/service/routing/1.0/traceroute` derives the key `routing`,
     so `traceroute-service.md` — the only page carrying the endpoint, the
     method and the parameter schemas — was not a candidate for "traceroute" at
     all, and the name resolved to an example page whose request and response
     are empty `<textarea>` placeholders filled in by the site's JavaScript. */
  const referenceSubject = (file) =>
    file.toLowerCase().replace(/-service(-v\d+_\d+_\d+)?\.md$/, '');

  const candidates = pages.filter(
    (page) =>
      page.file.toLowerCase() === needle ||
      page.file.toLowerCase() === `${needle}.md` ||
      page.service === needle ||
      page.title.toLowerCase() === needle ||
      page.id.toLowerCase().endsWith(`/${needle}`) ||
      (page.kind === 'reference' && referenceSubject(page.file) === needle)
  );
  if (candidates.length > 0) return candidates.sort((a, b) => rank(a) - rank(b))[0];

  // Last resort: substring match on the file name.
  const loose = pages.filter((page) => page.file.toLowerCase().includes(needle));
  return loose.length > 0 ? loose.sort((a, b) => rank(a) - rank(b))[0] : null;
}

/**
 * Read a page body from the snapshot.
 *
 * @param {string} id - Manifest page id, `<family>/<file>`.
 * @returns {Promise<string>} Markdown.
 */
export async function readPage(id) {
  const raw = await readFile(join(DATA_DIR, 'pages', id), 'utf8');
  /* The snapshot is upstream prose, and a handful of its sentences state a
     cause a live probe disproves. Serving those unchanged puts them in front of
     a coding assistant as fact. See `src/corrections.js` for why this cannot
     throw and where the staleness guard lives instead. */
  return correctPage(raw, id);
}

/**
 * Resolve a schema reference to its manifest entry.
 *
 * Accepts a fully-qualified class name or a simple name (`RoutingRequest`).
 * Simple names can be ambiguous across API versions, so all matches are
 * returned for the caller to disambiguate.
 *
 * @param {string} reference
 * @returns {Promise<object[]>} Matching schema entries, best match first.
 */
export async function resolveSchemas(reference) {
  const schemas = (await loadManifest()).schemas;
  const needle = reference.trim().toLowerCase();

  const exact = schemas.filter((schema) => schema.className.toLowerCase() === needle);
  if (exact.length > 0) return exact;

  const bySimple = schemas.filter((schema) => schema.simpleName.toLowerCase() === needle);
  if (bySimple.length > 0) {
    // Prefer the newest protocol version when a simple name spans several.
    return bySimple.sort((a, b) => b.className.localeCompare(a.className));
  }

  return schemas.filter((schema) => schema.simpleName.toLowerCase().includes(needle));
}

/**
 * Read a schema body from the snapshot.
 *
 * @param {string} className - Fully-qualified class name.
 * @returns {Promise<string>} Markdown parameter tables.
 */
export async function readSchema(className) {
  const raw = await readFile(join(DATA_DIR, 'schemas', `${className}.md`), 'utf8');
  /* The introspection is authoritative about field names and types and wrong
     about a few of their meanings — see `src/corrections.js`. This tool
     presents the table as fact, so a wrong cell is copied into a request. */
  return correctSchema(raw, className);
}

/**
 * Pick the endpoint that best represents a service.
 *
 * A service spreads over several endpoints — `/routing/1.0` and
 * `/routing/1.0/traceroute` — and the last page iterated used to win, so the
 * catalogue advertised an operation as if it were the service itself. Reference
 * pages are preferred over examples, then the shortest path, which is the base
 * one; ties break alphabetically so the snapshot renders identically every run.
 *
 * @param {Array<{endpoint:string, kind:string}>} candidates - Endpoints found on the service's pages.
 * @returns {string|null}
 */
function canonicalEndpoint(candidates) {
  if (candidates.length === 0) return null;
  const preferred = candidates.filter((candidate) => candidate.kind === 'reference');
  const pool = (preferred.length > 0 ? preferred : candidates).map((c) => c.endpoint);
  return [...new Set(pool)].sort((a, b) => a.length - b.length || a.localeCompare(b))[0];
}

/**
 * Group pages into a per-service overview.
 *
 * @param {object} [filter] - Same shape as {@link listPages}.
 * @returns {Promise<Array<{service:string, endpoint:string|null, methods:string[], role:string|null, roleInferred:boolean, families:string[], pages:object[]}>>}
 */
export async function listServices(filter = {}) {
  const pages = await listPages(filter);
  /** @type {Map<string, object>} */
  const grouped = new Map();

  for (const page of pages) {
    const key = page.service ?? page.file;
    if (!grouped.has(key)) {
      grouped.set(key, {
        service: key,
        endpoint: null,
        endpointCandidates: [],
        methods: [],
        role: null,
        roleInferred: false,
        roleCandidates: [],
        families: new Set(),
        pages: [],
      });
    }
    const entry = grouped.get(key);
    entry.pages.push(page);
    entry.families.add(page.family);
    if (page.endpoint) {
      entry.endpointCandidates.push({
        endpoint: page.endpoint,
        kind: page.kind,
        // Methods are only meaningful on reference pages; examples repeat them.
        methods: page.kind === 'reference' ? (page.methods ?? []) : [],
      });
    }
    if (page.role) {
      entry.roleCandidates.push({
        role: page.role,
        inferred: Boolean(page.roleInferred),
        isRest: Boolean(page.isRest),
        productGate: Boolean(page.roleIsProductGate),
      });
    }
  }

  /* A catalogue row describes an endpoint, so its role has to come from a page
     that documents that endpoint — or, failing that, from a role only this
     service claims. Without the second half the vehicle row fell back to the
     JS SDK's "EV vehicles" page and advertised `ROLE_EVSMARTROUTING` for
     `/bgis/service/vehicle/**`; with it, vehicle reports no role at all, which
     is what the documentation actually says. `geoserverinfo` and `traffic`
     are the reason the fallback exists: both are declared only on SDK pages,
     and both are claimed by no other service, so they still describe their
     REST endpoint. Declared beats inherited, as before. */
  for (const entry of grouped.values()) {
    const restOnly = entry.roleCandidates.filter((candidate) => candidate.isRest);
    const pool =
      entry.endpointCandidates.length === 0 || restOnly.length > 0
        ? restOnly.length > 0
          ? restOnly
          : entry.roleCandidates
        : entry.roleCandidates.filter((candidate) => !candidate.productGate);
    const chosen = pool.find((candidate) => !candidate.inferred) ?? pool[0];
    if (chosen) {
      entry.role = chosen.role;
      entry.roleInferred = chosen.inferred;
    }
  }

  return [...grouped.values()]
    .map(({ endpointCandidates, roleCandidates, ...entry }) => {
      const endpoint = canonicalEndpoint(endpointCandidates);
      /* The methods have to be those of the endpoint on the same row. Unioning
         them across the service advertised verbs the printed path rejects: the
         currency row showed `/currency/1.0/rate` as `GET / POST`, borrowing the
         POST from `/currency/1.0/convert`, and a POST to `rate` answers
         `405 Method 'POST' is not supported`. Same shape on vehicle and
         chargingstation. */
      const methods = [
        ...new Set(
          endpointCandidates
            .filter((candidate) => candidate.endpoint === endpoint)
            .flatMap((candidate) => candidate.methods)
        ),
      ];
      return { ...entry, endpoint, methods, families: [...entry.families].sort() };
    })
    .sort((a, b) => a.service.localeCompare(b.service));
}
