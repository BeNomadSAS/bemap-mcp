<span class="bemap-tag">BeNomad Tiles</span>

# Troubleshooting

<p class="bemap-tagline">Symptom, cause, fix — the HTTP status codes, typed error codes and visual failures that bite BeNomad Tiles integrations, ordered by how often they happen.</p>

<div class="bemap-callout">
<strong>Read the status code before anything else.</strong> The tiles worker is deliberately strict, and three of its rejections look like authentication failures without being one: a <code>403</code> is far more often a malformed <code>Range</code> header than an expired token, and a <code>204</code> is not an error at all. Open the Network tab, sort by status, and start from the table below.
</div>

## At a glance

<ul class="bemap-glance">
<li><code>401</code> = missing or expired token &mdash; the SDK renews and retries on its own; raw integrations must handle it.</li>
<li><code>403</code> has <strong>five</strong> distinct causes: no <code>Range</code>, <code>Range</code> &gt; 10 MB, multi-part <code>Range</code>, a bot-looking <code>User-Agent</code>, or a missing entitlement.</li>
<li><code>204</code> is a legitimately empty tile (ocean, desert). Do not decode it, do not report it.</li>
<li><code>429</code> means you crossed <strong>100 req/s</strong> per user &mdash; cap your concurrency.</li>
<li><code>206</code> is the <code>Range</code> wire, <code>200</code> is the cacheable slice wire. Both return the same bytes.</li>
<li>The SDK builds a typed <code>bemap.Error</code> for every failure &mdash; <strong>22 codes</strong> at v2.0.2, 11 concerning tiles. Service calls hand it to you via promise rejection; map-level failures currently surface in the console only.</li>
<li>Coordinates are <strong>lon, lat</strong> &mdash; longitude first, everywhere in the API.</li>
<li>BeNomad PMTiles use the underscore convention <code>name_fr</code>, never the colon form <code>name:fr</code>.</li>
</ul>

## Usage

Open the console and take a configuration snapshot before you debug anything else. Together they turn a blank map into a named cause:

```js
var map = new bemap.MapLibreMap(ctx, 'map');

// Watch the browser console: the library reports MISSING_DEPENDENCY, tile- and
// style-load failures and CACHE_HOST_CONFLICT there. 2.0.2 has no public
// subscription for the typed error channel — map.on('error', …) does NOT deliver
// a bemap.Error. See "Map errors" on the Events page.
//
// The configuration snapshot is usually more diagnostic than any handler:
console.log(map.getTilesConfig());
console.log('token valid:', map.isTokenValid());
```

Then ask the map what it actually resolved — `getTilesConfig()` returns the merged effective configuration, not what you passed:

```js
console.table(map.getTilesConfig());   // tilesHost, tilesSliceMode, rangeCacheMode, tileGate, tilesAuth, serviceWorker
map.getToken();                        // String | null  — never log this in production
map.isTokenValid();                    // Boolean
map.refreshToken();                    // Promise<String>
map.getBrowserCacheStats();            // { enabled, hits, misses, entries, bytesEstimated }
map.onCacheStats(function (s) { console.log('SW cache', s); });   // live broadcast from the Service Worker
```

Reproduce outside the browser to separate a client bug from a server refusal. Never inline the credentials:

```bash
# 1. Login probe — expect 200 and a JSON body containing "token"
TOKEN=$(curl -s -X POST "https://mptiles-api.benomad.net/api/login" \
  -u "$LOGIN:$PASS" -H "User-Agent: Mozilla/5.0" \
  | sed -n 's/.*"token":"\([^"]*\)".*/\1/p')

# 2. Status probe — expect 200 while valid, 401 once expired
curl -s -o /dev/null -w '%{http_code}\n' -H "User-Agent: Mozilla/5.0" \
  -H "X-Session-Token: $TOKEN" "https://mptiles-api.benomad.net/api/status"

# 3. Range probe on the PMTiles archive — expect 206
curl -s -o /dev/null -w '%{http_code}\n' -H "User-Agent: Mozilla/5.0" \
  -H "X-Session-Token: $TOKEN" -H "Range: bytes=0-16383" \
  "https://mptiles-api.benomad.net/default.pmtiles"

# 4. Slice probe (cacheable 200 wire) — expect 200
curl -s -o /dev/null -w '%{http_code}\n' -H "User-Agent: Mozilla/5.0" \
  -H "X-Session-Token: $TOKEN" "https://mptiles-api.benomad.net/default?r=0-16383"

# 5. A z/x/y MVT tile — expect 200, or 204 if the tile is legitimately empty
curl -s -o /dev/null -w '%{http_code}\n' -H "User-Agent: Mozilla/5.0" \
  -H "X-Session-Token: $TOKEN" "https://mptiles-api.benomad.net/default/12/2074/1409.pbf"
```

Swap the host for `mptiles-api-preprod.benomad.net` or `mptiles-api-beta.benomad.net` to test the other environments.

## Reference

### HTTP status → cause → fix

| Status | Meaning | Cause | Fix |
| --- | --- | --- | --- |
| `200` | OK | Slice wire (`GET /default?r=A-B`), style, glyph or z/x/y tile | Nothing. `Cache-Control: public, max-age=2592000, immutable` plus `ETag` on the slice wire. |
| `204` | Empty tile | The z/x/y tile contains no feature (ocean, desert, out of coverage) | **Not an error.** Skip decoding and render nothing. Reporting `204` as a failure is the single most common false alarm. |
| `206` | Partial content | Range wire (`GET /default.pmtiles` + `Range: bytes=A-B`), issued by `pmtiles.js` | Nothing. Same bytes as the `200` slice; only the transport differs. |
| `401` | Unauthorized | Token missing, expired (~1 h TTL), or not attached on the configured wire | The SDK renews proactively ~5 min before `exp` and retries once reactively on `401`. Raw integrations must re-`POST /api/login` and replay the request. |
| `403` | Forbidden — no `Range` | `GET /default.pmtiles` sent without a `Range` header | Always send `Range: bytes=A-B`. `pmtiles.js` does this for you; a naive `fetch()` of the archive never will. |
| `403` | Forbidden — `Range` too large | A single range spanning more than **10 MB** | Split into requests of ≤ 10 MB. |
| `403` | Forbidden — multi-part `Range` | `Range: bytes=0-99,200-299` | Send one contiguous range per request. Multi-part is rejected outright. |
| `403` | Forbidden — User-Agent | A gateway filter rejected a bot-like UA (`Python-urllib`, `curl/*`, default HTTP-library UAs) | Send an explicit browser-like `User-Agent` on **every** request. Symptom signature: works in a browser, fails from a script or server. Not a credentials problem. |
| `403` | Forbidden — entitlement | The account lacks the role for that tileset or service (`ROLE_MAPPING` and friends) | Provision the role server-side. Not an integration bug — contact BeNomad. |
| `429` | Too many requests | More than **100 req/s** for that user | Throttle and cap concurrency. Bulk or soak clients must rate-limit explicitly; the tile gate helps but does not replace it. |

### `bemap.Error` codes relevant to tiles

Where you receive a `bemap.Error` — a rejected service promise, or your own `bemap.TilesAuth` `onError` — read `e.getCode()` and compare against the constants (`bemap.Error.FORBIDDEN`), never string literals. All eleven exist in the shipped bundle at v2.0.2, and the code names also appear verbatim in the console messages.

| Code | Typical trigger | What to do |
| --- | --- | --- |
| `UNAUTHORIZED` | `401` on login, style, tile or discovery | Check credentials first, then the wire mode. If the SDK owns the session it already retried — a surfaced `UNAUTHORIZED` means the retry also failed. |
| `FORBIDDEN` | `403` from any of the five causes above | Inspect `e.getUrl()` and the request headers. On a `.pmtiles` URL, suspect the `Range` header before the account. |
| `RATE_LIMITED` | `429` | Back off and reduce concurrency. Retrying immediately makes it worse. |
| `OFFLINE` | The browser reports no connectivity | Wait for `online`. The SDK pauses token renewal while offline and resumes on reconnect. |
| `NETWORK` | DNS failure, TLS failure, connection reset, opaque CORS rejection | Distinguish CORS from a genuine outage: an opaque `TypeError: Failed to fetch` with no status is almost always CORS. |
| `STYLE_LOAD_FAILED` | The style JSON could not be fetched, parsed or applied | Fetch the style URL by hand with the token. A `401`/`403` here means auth; a parse error means the placeholder substitution produced invalid JSON. |
| `TILE_LOAD_FAILED` | A tile request failed after the gate exhausted its retries | Check the underlying status. Persistent failures on one tile point at the worker; failures everywhere point at auth or CORS. |
| `CACHE_HOST_CONFLICT` | More than four distinct tile hosts seen by the Service Worker cache | Consolidate on one `tilesHost`. Usually caused by mixing environments in one origin. |
| `MAPLIBRE_ONLY` | A MapLibre-only feature called on `bemap.LeafletMap` or `bemap.OlMap` | Switch to `bemap.MapLibreMap`. PMTiles, globe, 3D buildings, heatmaps and the browser cache have no Leaflet or OpenLayers equivalent. |
| `MISSING_DEPENDENCY` | A required global is absent at construction — most often `pmtiles.js` | **Thrown**, not emitted, so the stack points at the constructor. The console prints the exact `<script>` tag to add. |
| `REQUIRES_GLOBE` | A globe-only call made while the projection is `mercator` | Call `map.setProjection('globe')` first, then re-issue. |

### Symptom → cause → fix

| Symptom | Cause | Fix |
| --- | --- | --- |
| Blank or grey map, no tile requests at all | `pmtiles.js` not loaded — it is **required** whenever `ctx.tilesHost` is set | Add the `pmtiles.js` `<script>` before `bemap-js-api.js`. Signature: `MISSING_DEPENDENCY` thrown from the `bemap.MapLibreMap` constructor. |
| Map renders, but no labels anywhere | Glyph server unreachable, or the style asks for the wrong localized-name field | Verify `GET /fonts/{fontstack}/{range}.pbf` returns `200` with the token. BeNomad PMTiles use **`name_fr` with an underscore**, not `name:fr` — the colon convention silently resolves to nothing. |
| Nothing renders on Leaflet or OpenLayers | PMTiles is **MapLibre-only** | Use `bemap.MapLibreMap`. Signature: `MAPLIBRE_ONLY`. |
| Tiles vanish after roughly one hour | Token expired and was never renewed | Raw integrations only — the SDK renews ~5 min before `exp`. Implement renewal, or move the map to `bemap.MapLibreMap`. |
| Markers and overlays disappear after a style reload | Raw MapLibre drops user-added native layers on `setStyle` | Use the SDK's `setStyle()`, which replays SDK overlays. Custom **native** layers are never replayed — re-add them in a `'style.load'` handler. |
| Globe projection reverts to flat after a style reload | The new stylesheet declares its own projection | Re-apply `map.setProjection('globe')` after the style settles. The SDK warns in the console when a style overrides the projection you chose. |
| Opaque `TypeError: Failed to fetch`, no status, cross-origin | CORS | CORS is a **server and Worker setting, not a library setting**. Both the BeMap host and the tiles host must allowlist your exact origin. Verify the preflight `OPTIONS` returns `Access-Control-Allow-Origin` for your origin and `Access-Control-Allow-Credentials: true`. |
| Service Worker never registers, cache always disabled | Registration preconditions unmet | The SW must be **same-origin**, served as a **standalone file** (it cannot be bundled), over **HTTPS or `localhost`**, and located **at or above the application path** so its scope covers the page — `/app/bemap-sw-tiles.js` correctly controls `/app/*`. Put it at the site root only when you need root scope. |
| Points land in the ocean, or in the wrong country | lat/lon order swapped | The API is **lon, lat** — longitude **first**: `new bemap.Coordinate(lon, lat)`, `map.move(lon, lat, zoom)`. Easily the most frequent single mistake. |
| MVT decode error, or "not in gzip format" | gzip double-decompression | Browsers transparently decompress `Content-Encoding: gzip` — parse the bytes directly, do **not** gunzip. Conversely, a native or server client that did not negotiate encoding receives raw gzip (magic bytes `1f 8b`) and **must** gunzip before decoding. |
| Tile request hangs forever, fixed by panning | Stalled in-flight connection (saturation, or a Worker/CDN read stall) | Check `getTilesConfig().tileGate` — the gate caps concurrency and applies TTFB and body timeouts. If the hang reproduces from `curl` too, escalate to BeNomad. |
| `ETag` missing in browser JS on the `200` slice | `ETag` is not in `Access-Control-Expose-Headers` cross-origin | The header exists server-side; it is simply not exposed to JS. Rely on the HTTP cache rather than reading `ETag` yourself. |

## Notes

Two backends are involved and they fail differently. Tiles live on the tiles host (`mptiles-api*.benomad.net`) behind a JWT; the REST services live on the BeMap host behind HTTP Basic through the Context. A `401` from one says nothing about the other — always check `e.getUrl()` before concluding the account is broken.

The tiles worker returns `403` for malformed requests rather than `400`. This is the root of most misdiagnosis: three of the five `403` causes are entirely client-side and fixable without contacting anyone.

### Gotchas

- **`204` is not a failure.** Treat it as "no features here" and render nothing. Retrying an empty tile burns quota toward the `429` threshold.
- **A `403` on `.pmtiles` is almost never entitlement.** Check the `Range` header first — its absence, its size, and its multi-part form are three separate rejections.
- **`curl` reproduces a browser `403` only with a real `User-Agent`.** Without one you are testing the gateway's bot filter, not your integration.
- **Never log `getToken()`.** Use `isTokenValid()` for diagnostics; the token is a bearer credential for a full hour.
- **CORS cannot be fixed from JavaScript.** No SDK option, header or `mode` setting can grant an origin the server has not allowlisted.
- **The Service Worker cannot be bundled.** It runs in its own global scope and must be served as a standalone same-origin file, at or above your application path so its scope covers the page.
- **`getTilesConfig()` shows the resolved values, not your inputs.** If `tilesAuth.mode` is not what you passed, something overrode it — check for a `proxy` or a per-map option.

**Before you file a bug**, collect: the exact HTTP status and response headers from the Network tab; the console output from the failing load; the output of `map.getTilesConfig()`; the four `curl` probes above with their status codes; the environment (prod, preprod or beta); the browser and version; and whether the failure reproduces outside the browser. A report without a status code and a `curl` reproduction cannot be triaged.

## See also

- [Overview & access](index.html#subpage-jsapi_2_0_0-js-tiles-overview.md) — environments, entitlements, integration paths
- [Sessions & tokens](index.html#subpage-jsapi_2_0_0-js-tiles-auth.md) — the login contract, wire modes, renewal
- [Web — PMTiles](index.html#subpage-jsapi_2_0_0-js-tiles-web-pmtiles.md) — the `pmtiles.js` dependency and the Range wire
- [Mobile & fleet z/x/y](index.html#subpage-jsapi_2_0_0-js-tiles-mobile-zxy.md) — `204`, gzip and the `?token=` query wire
- [Cache & slices](index.html#subpage-jsapi_2_0_0-js-tiles-cache.md) — Service Worker preconditions, `CACHE_HOST_CONFLICT`, cache stats
- [Styles](index.html#subpage-jsapi_2_0_0-js-tiles-styles.md) — placeholders, glyphs, `name_fr` localized labels
- [Error handling](index.html#subpage-jsapi_2_0_0-error-handling.md) — the typed-rejection pattern for service calls
- [Error codes](index.html#subpage-jsapi_2_0_0-glossary-error-codes.md) — all 22 `bemap.Error` constants
