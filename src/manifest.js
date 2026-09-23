/* ======================================================================
 * DOCUMENTATION MANIFEST
 *
 * The BeMap documentation site is a single-page app: `index.html` ships the
 * whole navigation tree, and each entry is a hash of the form
 *
 *   #subpage-<family>-<file>.md      e.g. #subpage-rest_1_0_0-routing-service.md
 *
 * which the SPA resolves to `{base}/bgis/documentation/<family>/<file>.md`.
 *
 * A second, easily-missed anchor kind carries the pages that belong to no API
 * version at all:
 *
 *   #page-<file>.md                  e.g. #page-authentication.md
 *
 * served from the documentation root, `{base}/bgis/documentation/<file>.md`.
 * These are not side material: the REST authentication reference, the WMS
 * protocol pages, the glossaries and the release notes all live there. They
 * are grouped here under the pseudo-family `general`.
 *
 * Two attributes on the enclosing <li> carry information a developer needs
 * and that is nowhere else:
 *   - data-right="ROLE_ROUTING"  → the entitlement required to call the service
 *   - class="… apiVer-rest_latest" → this entry is the current version
 *
 * This module turns that HTML into a structured manifest. It is a regex
 * parser on purpose: the HTML is server-generated and stable, and pulling in
 * a DOM library for one file would not earn its keep.
 * ====================================================================== */

/** Families whose pages describe the REST API (as opposed to SDK wrappers). */
const REST_FAMILIES = /^rest_/;

/**
 * Classify a page by what it is for, based on its filename.
 *
 * @param {string} file - e.g. `examples-routing-service-v1_0_0.md`.
 * @returns {'reference'|'example'|'tutorial'|'glossary'|'other'}
 */
function classify(file) {
  if (file.startsWith('examples-')) return 'example';
  if (file.startsWith('tutorials-')) return 'tutorial';
  if (file.startsWith('glossary-')) return 'glossary';
  if (file.endsWith('-service.md') || /-service-v\d/.test(file)) return 'reference';
  // Root-level pages carry no `-service` suffix but are references all the
  // same: authentication, and the WMS/BND protocol pages.
  if (/^(authentication|mapping-wms-|mapping-bnd)/.test(file)) return 'reference';
  return 'other';
}

/**
 * The pseudo-family for pages served from the documentation root.
 *
 * @type {string}
 */
export const GENERAL_FAMILY = 'general';

/**
 * Whether a root-level page documents the platform (and so belongs with the
 * REST material) rather than the JavaScript SDK.
 *
 * Authentication, WMS, BND, the glossaries and the release notes all apply to
 * anyone calling the API. The exclusions are the JS viewer's own pages, which
 * happen to sit in the same directory: the OpenLayers display examples and the
 * JSIV class-id list.
 *
 * @param {string} file
 * @returns {boolean}
 */
function generalPageIsRest(file) {
  return !/(display|jsiv|^samples\.md$|^index\.md$|^credits\.md$|^contact\.md$)/.test(file);
}

/**
 * The HTTP method(s) a reference page declares for its endpoint.
 *
 * The 4.1.0 documentation pass made this phrasing consistent — "The request
 * must be sent with the HTTP method `POST`", "HTTP method `GET`", "HTTP method
 * `GET` or `POST`" — which makes it worth parsing: sending POST to a GET-only
 * endpoint returns a bare Tomcat 405 with no hint of the cause.
 *
 * Beware that the declaration is not always complete: `getlevelvehicleinfo`
 * v1.1 is documented as GET yet also answers POST.
 *
 * @param {string} markdown - Raw page content.
 * @returns {string[]} e.g. `['GET']`, `['GET','POST']`; empty when undeclared.
 */
export function extractHttpMethods(markdown) {
  const found = [];
  // Only look at the sentence introducing the method, not the whole page:
  // response samples and prose mention verbs in passing.
  const pattern = /HTTP methods?\s+`(GET|POST|PUT|DELETE)`(?:\s*(?:;\s*)?or\s+`(GET|POST|PUT|DELETE)`)?/gi;
  let match;
  while ((match = pattern.exec(markdown)) !== null) {
    for (const verb of [match[1], match[2]]) {
      if (verb && !found.includes(verb.toUpperCase())) found.push(verb.toUpperCase());
    }
  }
  return found;
}

/**
 * Derive the REST endpoint path a reference page documents, when it can be
 * inferred from the page body. Returns null when the page has no URI sample.
 *
 * @param {string} markdown - Raw page content.
 * @returns {string|null} e.g. `/bgis/service/routing/1.0`.
 */
export function extractEndpoint(markdown) {
  const match = markdown.match(/URI:\s*`([^`]*\/bgis\/service\/[^`]+)`/);
  if (match) return match[1].trim();

  // The WMS pages predate the "URI:" convention and show a full sample query
  // string instead. They are the only reference pages served from `/bgis/wms`,
  // so recognising them here is what lets them resolve as a service at all.
  // The BND pages (`/bgis/bnd?action=…`) are deliberately left alone: one
  // endpoint serves every BND action, and collapsing all of rest_0_9_0 into a
  // single "bnd" service would lose the per-service grouping.
  if (/^\/bgis\/wms\?/m.test(markdown)) return '/bgis/wms';

  return null;
}

/**
 * Extract every fully-qualified class name referenced by a page, whether via
 * the `!include` documentation directive or a class-diagram link.
 *
 * @param {string} markdown - Raw page content.
 * @returns {string[]} Unique class names, in order of appearance.
 */
export function extractClassNames(markdown) {
  const found = new Set();
  const pattern = /className=([A-Za-z0-9_.$]+)/g;
  let match;
  while ((match = pattern.exec(markdown)) !== null) {
    found.add(match[1]);
  }
  return [...found];
}

/**
 * The service a page's endpoint belongs to, or null when it declares none.
 *
 * Usually the segment after `/bgis/service/`: `/bgis/service/routing/1.0` →
 * `routing`. But BeMap is not consistent — EV smart routing v2 puts the
 * version first (`/bgis/service/2.0/evsmartrouting`), so a leading
 * version-like segment is skipped rather than mistaken for the service name.
 * WMS lives outside `/bgis/service` entirely and is special-cased.
 *
 * @param {{endpoint?:string|null}} page
 * @returns {string|null} Lower-case service key.
 */
export function serviceFromEndpoint(page) {
  if (page.endpoint === '/bgis/wms') return 'wms';
  const segments = page.endpoint?.match(/\/bgis\/service\/([^/]+)(?:\/([^/]+))?/);
  if (!segments) return null;
  const [, first, second] = segments;
  if (/^\d+(\.\d+)*$/.test(first) && second) return second.toLowerCase();
  return first.toLowerCase();
}

/**
 * Strip a filename down to comparable letters and digits.
 *
 * Naming is inconsistent across page kinds — references use `chargingstation`
 * while examples use `charging-station` — so separators are removed before
 * matching rather than trusted as boundaries.
 *
 * @param {string} file
 * @returns {string}
 */
function normalizeFile(file) {
  return file.replace(/\.md$/, '').replace(/[-_]/g, '').toLowerCase();
}

/**
 * Reduce a page filename to the subject it documents.
 *
 * `examples-` and `tutorials-` filenames encode their subject between the
 * prefix and the `-service` / version suffix, and that segment is authoritative:
 * `tutorials-traceroute-service-v1_0_0-vehicleprofile.md` documents traceroute,
 * not vehicles, even though "vehicle" also appears in the name.
 *
 * @param {string} file - Bare filename, e.g. `examples-charging-station-service-v1_0_0.md`.
 * @returns {string} Normalized subject, separators removed.
 */
export function pageSubject(file) {
  return normalizeFile(
    file
      .replace(/\.md$/, '')
      .replace(/^(examples|tutorials)-/, '')
      .replace(/-service\b.*$/, '')
      .replace(/-v\d+_\d+_\d+.*$/, '')
  );
}

/** True for filenames whose subject segment is authoritative. See {@link pageSubject}. */
function hasAuthoritativeSubject(file) {
  return /^(examples|tutorials)-/.test(file);
}

/**
 * Assign every page to a service.
 *
 * Endpoints are the source of truth, so the set of real service names is
 * derived from them first; pages without an endpoint (examples, tutorials) are
 * then matched against that vocabulary, longest name first so that
 * `chargingstation` wins over `charging`. Pages matching nothing keep a key
 * derived from their own filename.
 *
 * Example and tutorial filenames are matched on their subject segment only
 * (see {@link pageSubject}), never on the whole name: matching the whole name
 * filed the traceroute vehicle-profile tutorial under `vehicle`, which then
 * spread `ROLE_TRACEROUTE` across every vehicle page. Other page kinds keep
 * whole-name matching, which is what lets `js-ev-vehicles.md` reach `vehicle`.
 *
 * Mutates and returns the given entries.
 *
 * @param {Array<{file:string, endpoint?:string|null, service?:string}>} entries
 * @returns {Array<object>} The same array.
 */
export function assignServices(entries) {
  const vocabulary = new Set();
  for (const entry of entries) {
    const service = serviceFromEndpoint(entry);
    if (service) vocabulary.add(service);
  }
  const known = [...vocabulary].sort((a, b) => b.length - a.length);

  for (const entry of entries) {
    const fromEndpoint = serviceFromEndpoint(entry);
    if (fromEndpoint) {
      entry.service = fromEndpoint;
      continue;
    }
    const subject = pageSubject(entry.file);
    const haystack = hasAuthoritativeSubject(entry.file) ? subject : normalizeFile(entry.file);
    entry.service = known.find((service) => haystack.includes(service)) ?? subject;
  }

  // Second pass: services that exist only in filenames fragment badly, because
  // each tutorial names its own topic — `tutorials-evtrip-conditions-…` and
  // `tutorials-evtrip-truck-…` produced `evtripconditions` and `evtriptruck`
  // next to `evtrip`. Fold a filename-derived key into a shorter one it starts
  // with, when that shorter key also exists. Endpoint-derived keys are left
  // alone: they are the source of truth, not a guess.
  const fromEndpoint = new Set(
    entries.map((entry) => serviceFromEndpoint(entry)).filter(Boolean)
  );
  const roots = [...new Set(entries.map((entry) => entry.service))]
    .filter((service) => service.length >= 4)
    .sort((a, b) => a.length - b.length);
  for (const entry of entries) {
    if (fromEndpoint.has(entry.service)) continue;
    const root = roots.find((candidate) => candidate !== entry.service && entry.service.startsWith(candidate));
    if (root) entry.service = root;
  }
  return entries;
}

/** Page kinds ranked by how reliably their `data-right` describes the service. */
const ROLE_SOURCE_RANK = ['example', 'reference', 'other', 'glossary', 'tutorial'];

/**
 * Fill in missing entitlement roles by propagating within a service group.
 *
 * Only some pages carry `data-right` in the source HTML, yet the role applies
 * to the whole service. Pages that receive a role this way are flagged
 * `roleInferred` so the distinction stays visible to callers.
 *
 * Two real cases stop this from being a plain "first role wins":
 *
 *  - A service group can legitimately hold several roles, because roles are
 *    granted per operation, not per service: `geocoding` covers both
 *    `/geocoding/1.0` (`ROLE_GEOCODING`) and `/geocoding/1.0/reverse`
 *    (`ROLE_REVERSEGEOCODING`). So a candidate whose subject appears in the
 *    target filename wins — `reversegeocoding-service.md` takes
 *    `ROLE_REVERSEGEOCODING`, `geocoding-service.md` takes `ROLE_GEOCODING`.
 *  - Failing that, the most authoritative page kind wins (see
 *    {@link ROLE_SOURCE_RANK}), then the most frequent. If the best tier is
 *    still tied between different roles, nothing is propagated: an empty cell
 *    is honest, a coin flip is not.
 *
 * Mutates and returns the given entries.
 *
 * @param {Array<{file:string, kind:string, service:string, role:string|null, roleInferred?:boolean}>} entries - Pages with services resolved.
 * @returns {Array<object>} The same array.
 */
export function propagateRoles(entries) {
  /** @type {Map<string, Array<{role:string, kind:string, subject:string}>>} */
  const declaredByService = new Map();
  for (const entry of entries) {
    if (!entry.role) continue;
    if (!declaredByService.has(entry.service)) declaredByService.set(entry.service, []);
    declaredByService.get(entry.service).push({
      role: entry.role,
      kind: entry.kind,
      subject: pageSubject(entry.file),
    });
  }

  for (const entry of entries) {
    entry.roleInferred = false;
    if (entry.role) continue;
    const candidates = declaredByService.get(entry.service);
    if (!candidates || candidates.length === 0) continue;

    const inherited = chooseRole(candidates, normalizeFile(entry.file));
    if (inherited) {
      entry.role = inherited;
      entry.roleInferred = true;
    }
  }
  return entries;
}

/**
 * Pick which declared role a page should inherit. See {@link propagateRoles}.
 *
 * @param {Array<{role:string, kind:string, subject:string}>} candidates - Declared roles in the page's service.
 * @param {string} target - Normalized filename of the page inheriting a role.
 * @returns {string|null} The role, or null when the choice would be arbitrary.
 */
function chooseRole(candidates, target) {
  const distinct = new Set(candidates.map((candidate) => candidate.role));
  if (distinct.size === 1) return candidates[0].role;

  // Subject affinity: the longest declared subject contained in this filename.
  const matching = candidates
    .filter((candidate) => candidate.subject.length >= 4 && target.includes(candidate.subject))
    .sort((a, b) => b.subject.length - a.subject.length);
  if (matching.length > 0) {
    // Only the closest subjects count: `reversegeocoding-service.md` contains
    // both `reversegeocoding` and `geocoding`, and the longer one is the answer.
    const closest = matching.filter((c) => c.subject.length === matching[0].subject.length);
    if (closest.every((c) => c.role === closest[0].role)) return closest[0].role;
  }

  // Most authoritative page kind, then most frequent role within it.
  for (const kind of ROLE_SOURCE_RANK) {
    const tier = candidates.filter((candidate) => candidate.kind === kind);
    if (tier.length === 0) continue;
    const counts = new Map();
    for (const candidate of tier) counts.set(candidate.role, (counts.get(candidate.role) ?? 0) + 1);
    const ranked = [...counts.entries()].sort((a, b) => b[1] - a[1]);
    if (ranked.length === 1 || ranked[0][1] > ranked[1][1]) return ranked[0][0];
    return null;
  }
  return null;
}

/**
 * Decode the handful of HTML entities the navigation labels actually contain.
 *
 * The index is server-generated and escapes ampersands, so a title arrives as
 * `Install &amp; setup`. Left alone it shows up that way in every tool result.
 *
 * @param {string} value
 * @returns {string}
 */
function decodeEntities(value) {
  return value
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;|&apos;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&');
}

/**
 * Parse the documentation index into a flat list of pages.
 *
 * @param {string} html - Body of `/bgis/documentation/index.html`, authenticated.
 * @returns {Array<{id:string, family:string, file:string, path:string, title:string, kind:string, role:string|null, isLatest:boolean, isRest:boolean}>}
 */
export function parseManifest(html) {
  const pages = new Map();
  // Both anchor kinds in one pass, so a page keeps whichever menu branch
  // reaches it first: `#subpage-<family>-<file>` and `#page-<file>`.
  const anchor = /<a\s+href="#(sub)?page-([^"]+\.md)"[^>]*>([\s\S]*?)<\/a>/g;

  let match;
  while ((match = anchor.exec(html)) !== null) {
    const [, isSubpage, hash, rawLabel] = match;

    let family;
    let file;
    if (isSubpage) {
      // Split `rest_1_0_0-routing-service.md` into family + file.
      const split = hash.match(/^([a-z]+_\d+_\d+_\d+)-(.+\.md)$/);
      if (!split) continue;
      [, family, file] = split;
    } else {
      family = GENERAL_FAMILY;
      file = hash;
    }

    const title = decodeEntities(rawLabel.replace(/<[^>]*>/g, '')).replace(/\s+/g, ' ').trim();

    // Walk back to the enclosing <li> to pick up its attributes.
    const before = html.slice(Math.max(0, match.index - 400), match.index);
    const liStart = before.lastIndexOf('<li');
    const liTag = liStart === -1 ? '' : before.slice(liStart);
    const role = liTag.match(/data-right="([^"]+)"/)?.[1] ?? null;
    const isLatest = /apiVer-[a-z]+_latest/.test(liTag);

    const id = `${family}/${file}`;
    // The same page can appear under several menu branches; keep the first
    // label but let any branch mark it as latest.
    if (pages.has(id)) {
      const existing = pages.get(id);
      existing.isLatest = existing.isLatest || isLatest;
      if (!existing.role && role) existing.role = role;
      continue;
    }

    pages.set(id, makePage(family, file, { title, role, isLatest }));
  }

  return [...pages.values()];
}

/**
 * Build one manifest entry.
 *
 * Shared by the two discovery passes — the navigation menu, and the inline
 * links of `parseInlinePageRefs` — so a page found either way is described
 * identically.
 *
 * @param {string} family - Documentation family, or `GENERAL_FAMILY` for root pages.
 * @param {string} file - File name, e.g. `routing-service.md`.
 * @param {{title?: string|null, role?: string|null, isLatest?: boolean}} [attrs]
 * @returns {{id:string, family:string, file:string, path:string, title:string, kind:string, role:string|null, isLatest:boolean, isRest:boolean}}
 */
export function makePage(family, file, attrs = {}) {
  const { title = null, role = null, isLatest = false } = attrs;
  return {
    id: `${family}/${file}`,
    family,
    file,
    // Where the page is actually fetched from; root-level pages have no
    // family segment in their URL.
    path:
      family === GENERAL_FAMILY
        ? `/bgis/documentation/${file}`
        : `/bgis/documentation/${family}/${file}`,
    title: title || file.replace(/\.md$/, ''),
    kind: classify(file),
    role,
    isLatest,
    isRest:
      family === GENERAL_FAMILY ? generalPageIsRest(file) : REST_FAMILIES.test(family),
  };
}

/**
 * Pages that the navigation menu never lists, found by following the links
 * inside a page body.
 *
 * `chargingstation-filter-v1.md` is the case that revealed this: it is the
 * reference for the whole `csfs` / `filters` filter language — operators, the
 * `/i` case-insensitive delimiter, the `prefCoeff` action — and both the
 * charging-station and EV-smart-routing schemas link to it by name. It appears
 * in no menu branch, so a manifest built from `index.html` anchors alone misses
 * it, and every tool then answers that the page does not exist.
 *
 * The link form is the same as the menu's, inside a markdown target:
 * `index.html#page-<file>.md` for a root page, `#subpage-<family>-<file>.md`
 * otherwise. Anchors after the file name (`…md#filtersparameter`) are dropped.
 *
 * @param {string} markdown - Body of one documentation page.
 * @returns {Array<{family: string, file: string}>} Referenced pages, deduplicated.
 */
export function parseInlinePageRefs(markdown) {
  const found = new Map();
  const link = /#(sub)?page-([A-Za-z0-9_.-]+\.md)/g;
  let match;
  while ((match = link.exec(markdown ?? '')) !== null) {
    const [, isSubpage, hash] = match;
    let family = GENERAL_FAMILY;
    let file = hash;
    if (isSubpage) {
      const split = hash.match(/^([a-z]+_\d+_\d+_\d+)-(.+\.md)$/);
      if (!split) continue;
      [, family, file] = split;
    }
    found.set(`${family}/${file}`, { family, file });
  }
  return [...found.values()];
}
