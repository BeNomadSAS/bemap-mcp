<span class="bemap-tag">BeNomad Tiles</span>

# Cache, slices &amp; resilience

<p class="bemap-tagline">By default the SDK reads the PMTiles archive as cacheable HTTP 200 slices that the browser's own HTTP cache stores — so tile caching works out of the box, with no Service Worker to install.</p>

<div class="bemap-callout">
<strong>The Service Worker is no longer the default path.</strong> Earlier documentation implied you had to copy <code>bemap-sw-tiles.js</code> to your site root before tiles were cached. Since v2.0 that is only true for <code>tilesSliceMode: 'range'</code>. Under the default <code>'200'</code> mode the SDK deliberately <em>skips</em> the Service Worker and even unregisters a stale one left by a previous deploy. Most integrators need to do nothing at all.
</div>

## At a glance

<ul class="bemap-glance">
<li><strong><code>tilesSliceMode: '200'</code> is the default.</strong> The archive is read as <code>&lt;archive&gt;?r=&lt;start&gt;-&lt;end&gt;</code> GETs with <em>no</em> <code>Range</code> header; the worker answers with a plain <strong>200</strong> + <code>Cache-Control: public, max-age=2592000, immutable</code> and an <code>ETag</code>, which the browser HTTP cache stores at a stable URL.</li>
<li>HTTP <strong>206</strong> partials are not reliably cached by browsers — that is the entire reason the Service Worker exists, and why it only matters on the <code>'range'</code> path.</li>
<li>The Service Worker registers only when <code>tilesSliceMode</code> is <code>'range'</code>, or when you force it with <code>serviceWorker: true</code>. It requires HTTPS (or <code>localhost</code>) and a same-origin file.</li>
<li><code>bemap.RangeGate</code> wraps every slice read: a pre-header TTFB timeout, <strong>3 retries</strong> spaced <code>[200, 500, 1000]</code> ms, and smart-abort so a streaming body is never killed mid-flight.</li>
<li>A rebuilt archive can no longer poison your cache: the <code>?v=</code> version token from <code>GET /api/maps</code> plus a mid-session ETag guard make the tab self-heal.</li>
<li><code>bemap.RecoverablePromiseCache</code> (on by default) evicts a <em>rejected</em> pmtiles header/directory promise so a failed read retries instead of leaving a permanent blank region.</li>
</ul>

## Usage

Nothing to configure. A `MapLibreMap` on a Context with `tilesHost` already runs 200-slice mode with the browser HTTP cache, the resilience gate and the self-healing pmtiles cache.

```js
var ctx = new bemap.Context({
    login:     'YOUR_LOGIN',
    password:  'YOUR_PASSWORD',
    secure:    true,
    host:      'bemap.benomad.com',
    tilesHost: 'mptiles-api.benomad.net'
});

var map = new bemap.MapLibreMap(ctx, 'map');   // tilesSliceMode: '200', no Service Worker
```

Verify it in DevTools &rarr; **Network**: the archive appears as repeated `?r=…` requests returning **200**, and on a second visit their *Size* column reads `(disk cache)`.

### When you do want the Service Worker

Only on the classic Range path, or when you explicitly ask for it. Copy the worker next to your `index.html` (or to the site root) — it must be served **same-origin**, because a Service Worker can never be loaded cross-origin.

```bash
cp node_modules/bemap-js-api/dist/bemap-sw-tiles.js ./public/bemap-sw-tiles.js
```

```js
var map = new bemap.MapLibreMap(ctx, 'map', {
    tilesSliceMode: 'range',        // classic HTTP Range → 206
    serviceWorker: true,            // implicit under 'range'; explicit here for clarity
    serviceWorkerPath: '/bemap-sw-tiles.js'
});
```

Registration succeeds **silently**. What you get instead is a `bemap-tiles-v3` bucket under DevTools &rarr; **Application** &rarr; **Cache Storage**, and an `X-SW-Cache` response header on tile requests (`MISS` cold, `HIT` once served from disk). Every failure mode *does* log — see [Gotchas](#gotchas).

### Toggling and reading stats

```js
map.enableBrowserCache();       // persisted in localStorage under 'bemap_browser_cache'
map.disableBrowserCache();
map.clearBrowserCache();        // wipes the Cache Storage bucket
map.getBrowserCacheStats();     // { enabled, hits, misses, entries, bytesEstimated }

map.onCacheStats(function (stats) { /* ~250 ms while tiles are moving */ });

map.getTilesConfig();           // resolved config, incl. { serviceWorker: { enabled, path } }
```

## Reference

### Options

| Option | Default | Effect |
| --- | --- | --- |
| `tilesSliceMode` | `'200'` | `'200'` &rarr; cacheable `?r=` 200 slices. `'range'` &rarr; pmtiles' stock HTTP-Range source (`'206'` is an accepted alias). `?noslice` in the page URL forces `'range'`. |
| `serviceWorker` | *(auto)* | `true` / `false` force the tile Service Worker. Unset &rarr; **off** under `'200'`, **on** under `'range'`. |
| `serviceWorkerPath` | *(unset)* | Pin the worker URL. Setting it **disables** the auto-discovery chain below; `/bemap-sw-tiles.js` is merely the first candidate that chain tries, not a pinned default. |
| `browserCache` | *(unset)* | Legacy opt-out: `false` skips the worker everywhere. Any other value is treated as an explicit *force-on* — see the note in [Gotchas](#gotchas). |
| `recoverableCache` | `true` | Self-healing pmtiles header/directory cache. `false` &rarr; pmtiles' stock `SharedPromiseCache`. |
| `rangeCacheMode` | `'auto'` | Desktop-Chromium `Range` `no-store` fix. Never applies to 200 slices (they carry no `Range` header). |
| `tilesErrorRefreshMs` | `4000` | Debounced source refresh after a recoverable tile error. `0` disables. |

When `serviceWorkerPath` is **not** pinned, `bemap.BrowserCache` tries, in order: `/bemap-sw-tiles.js`, then `<page directory>/bemap-sw-tiles.js`, then the bundle's parent directory, then the bundle's own directory. The first path that registers wins.

### `bemap.RangeGate`

Per-attempt resilience around every slice read. Tunable at construction; `?nogate` in the page URL disables it entirely.

| Option | Default | Effect |
| --- | --- | --- |
| `tileGate` | `true` | Master switch. `false` &rarr; raw `fetch`, no timeout, no retry. |
| `tilesSliceTimeoutMs` | `3500` | Per-attempt **TTFB** timeout. May abort the socket only *before* response headers arrive. Keep it above the worker's ~3000 ms tile deadline so its `504` is received and retried. `0` = none. |
| `tilesSliceBodyTimeoutMs` | `20000` | Post-header body safety cap. Deliberately generous — killing a streaming body poisons the shared H2/H3 connection. `0` = none. |
| `tilesSliceMaxRetries` | `3` | Retries on a transient failure. Raised from 1 in 2026-07: a single retry left roughly 1 tile in 25 permanently grey under pan bursts. |
| `tilesSliceRetryBackoffMs` | `[200, 500, 1000]` | Backoff before retries #1/#2/#3; the last entry repeats if `maxRetries` is raised. |
| `tilesSliceConcurrency` | `0` | In-flight cap, FIFO. `0` = uncapped (the tile origin is fast, so uncapped is smoother). |

A failure is retried only when it is genuinely transient: HTTP **429**, any **5xx**, a network `TypeError`, or the gate's own timeout `AbortError`. A caller cancel (pan/zoom) is **never** retried, and a status-less programming error is never masked by a retry. Live control: `map.setTileGateActive(false)` / `map.getTileGateActive()`, plus the `onTileGateChange` callback.

### `bemap.PMTilesSliceSource`

The custom pmtiles `Source` behind `'200'` mode. It builds `?r=<offset>-<offset+length-1>` (inclusive), sends no `Range` header, rejects a non-2xx with the real `status` attached (so the gate can judge retryability), and verifies the returned slice is *exactly* the requested byte length before handing it to pmtiles. Auth composes for free — reads go through `window.fetch`, so `bemap.TilesAuth` injects the cookie, header or `?token=` you configured.

### Service Worker internals

Verified against `dist/bemap-sw-tiles.js` at v2.0.2.

| Item | Value |
| --- | --- |
| Cache Storage bucket | `bemap-tiles-v3` — on activation the worker deletes every other `bemap-tiles-*` bucket |
| Entry cap | **2000** entries; past the cap it deletes the oldest-inserted plus a batch of 200. Insertion-order (FIFO) eviction — there is no access-time tracking, so a frequently-read tile is not promoted. |
| Host registry | **4** distinct `tilesHost` values, accumulated across maps and tabs. The **5th** is rejected with a `CACHE_HOST_CONFLICT` message &rarr; `bemap.Error.CACHE_HOST_CONFLICT`, reported in the console |
| Cache key | The request URL with `token`, `jwt` and `X-Session-Token` **stripped**, so rotating a token does not orphan the cache; the `Range` header is re-encoded into the key as `_range` |
| What it skips | Anything under `/api/`, any host not registered, requests with neither a `Range` header nor a `/{z}/{x}/{y}.pbf` path, and `cache: 'reload'` |
| Stored status | Always normalised to **200** in Cache Storage; replayed as **206** when the incoming request carried a `Range` header |
| Response tag | `X-SW-Cache: HIT` (from cache) or `MISS` (network passthrough, real status preserved) |
| Live stats | `{ type: 'CACHE_STATS_LIVE', stats: { hits, misses, entries, bytesEstimated, enabled } }`, broadcast to all clients, debounced to one message per **250 ms** |
| One-shot stats | `CACHE_STATS` &rarr; `CACHE_STATS_RESULT` over a `MessageChannel`, 3 s timeout |

In the **live** broadcast, `entries` and `bytesEstimated` are sentinel `-1` — counting them would mean walking the whole bucket on the hot path. `bemap.BrowserCache` discards the sentinels and keeps the last real values, which come from the one-shot `CACHE_STATS` round-trip.

## Notes

### Archive versioning and stale-cache self-heal

Slices are cached as immutable 200s for up to 30 days. If BeNomad rebuilds an archive under the same name every internal offset moves, so a browser mixing month-old slices with fresh bytes would render a blank map. Three layers, all automatic since 2.0.1:

1. **Version token.** After login the SDK asks `GET /api/maps` for the map's token and appends it: `/osm?v=3f9a1c2d`. A rebuild changes the token, so the URL changes and every old cached slice is simply never asked for again. The lookup is best-effort and time-capped — a slow or token-less worker can never delay the style swap. Pin one yourself with `ctx.setTilesVersion('osm', '<token>')`.
2. **Header revalidation.** With no token available, only the archive header (offset 0) is fetched `cache: 'no-cache'` once per load, so a rebuild is still noticed. If that revalidation fails for any reason other than a real caller cancel — offline, a blip, the gate's timeout — it falls back to `cache: 'force-cache'` and serves the cached header. Data slices stay immutable-cached either way.
3. **Mid-session ETag guard.** Every slice's `ETag` is compared with the header's. Two **strong**, different validators mean the archive was swapped while the tab was open: the source throws `pmtiles.EtagMismatch`, pmtiles re-reads the header fresh, and a sticky flag makes every subsequent read on that source use `cache: 'reload'`. Weak (`W/"…"`) or missing validators are treated as absent, so an ETag-less origin can never trigger a reload loop.

### Offline behaviour

| Works offline | Does not |
| --- | --- |
| Regions already visited in 200-slice mode — the immutable slices are served from the browser HTTP cache | The first visit to any region: a cache miss is a network fetch, and it fails |
| Regions already visited in `'range'` mode with the Service Worker installed and controlling the page | `POST /api/login` and JWT renewal — an expired session cannot be re-established offline |
| The archive header, via the `force-cache` fallback described above | `GET /api/maps` version discovery — the map simply stays unversioned |
| Styles, glyphs and sprites the browser already cached | Anything not previously fetched; there is no prefetch or offline-pack API |

The cache is a strictly technical one — map chunks only, no personal data, no identifiers, no cookies. If your legal review still wants an explicit opt-in, wire the consent banner to `enableBrowserCache()` / `disableBrowserCache()`.

### Gotchas

- **`browserCache: 'auto'` does not mean "let the SDK decide".** The SDK's auto behaviour is what you get by **omitting** the option. Any non-`false` value — including the string `'auto'` — is read as an explicit force-on and registers the Service Worker even in 200-slice mode, where it is redundant. Omit the option, or use `serviceWorker: true | false`.
- **A successful registration prints nothing.** Silence means it worked. Every failure is loud: not supported (plain HTTP), file unreachable, scope not covering the page, registered but not controlling, or `bemap.BrowserCache` missing from a stale bundle.
- **The worker must be same-origin, and its scope must cover your page.** A worker at `/app/bemap-sw-tiles.js` controls `/app/*` only. Serving it from a CDN cannot work.
- **200-slice mode needs a worker that serves the `?r=` route.** BeNomad Tiles does on every environment. Against a third-party PMTiles origin that does not, set `tilesSliceMode: 'range'` — a slice read there fails with a clear `HTTP <status>` error rather than corrupting tiles.
- **Switching an existing app from `'range'` to the `'200'` default leaves a stale worker behind.** The SDK calls `bemap.BrowserCache.unregisterStale()` for you, removing any `bemap-sw-tiles` registration and every `bemap-tiles-*` bucket on the origin — otherwise it would keep intercepting and replaying 206 data.
- **A first-visit worker activates after the page loaded**, so it does not control that load. The SDK posts a `CLAIM` message to recover without a refresh; the whole `INIT` / `CLAIM` handshake is non-blocking and can never delay first paint.
- **`tilesSliceMode` and the gate are page-level**, not per-map. `map.setTilesSliceMode()` applies to archives wired *after* the call — reload the style for a clean A/B.

## See also

- [Overview & access](index.html#subpage-jsapi_2_0_0-js-tiles-overview.md) — what BeNomad Tiles is, environments, integration paths
- [Web — PMTiles](index.html#subpage-jsapi_2_0_0-js-tiles-web-pmtiles.md) — script order, raw MapLibre setup, the `pmtiles://` protocol
- [Sessions & tokens](index.html#subpage-jsapi_2_0_0-js-tiles-auth.md) — login, TTL, and the wire mode the cache key strips
- [Styles & BeMaputnik](index.html#subpage-jsapi_2_0_0-js-tiles-styles.md) — style, glyph and sprite loading
- [Troubleshooting](index.html#subpage-jsapi_2_0_0-js-tiles-troubleshooting.md) — blank map, grey tiles, 401 / 403 / CORS
- [Error handling](index.html#subpage-jsapi_2_0_0-error-handling.md) — the map error channel and its filtered variants
- [Error codes](index.html#subpage-jsapi_2_0_0-glossary-error-codes.md) — including `CACHE_HOST_CONFLICT`
