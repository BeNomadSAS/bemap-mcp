<span class="bemap-tag">BeNomad Tiles</span>

# Web — PMTiles

<p class="bemap-tagline">Serve BeNomad vector basemaps to a browser by reading one authenticated PMTiles archive over HTTP, either through the BeMap SDK or through raw MapLibre + <code>pmtiles.js</code>.</p>

<div class="bemap-callout">
<strong>MapLibre-only.</strong> PMTiles needs the vector-tile pipeline that Leaflet and OpenLayers don't have — use <code>bemap.MapLibreMap</code>. <code>pmtiles.js</code> must be loaded on the page whenever <code>ctx.tilesHost</code> is set, otherwise the <code>pmtiles://</code> protocol is never registered and the map stays empty. For native / fleet clients that can't do Range reads, use the ZXY delivery mode instead.
</div>

## Try it

```
{"bemap":{"language":"javascript","mapid":"mapV2_tiles_pmtiles","run":true,"hide":true}}
var miniweb = bemap['miniweb'];
var map = new bemap.MapLibreMap(bemapTilesCtx, 'mapV2_tiles_pmtiles');
map.switchBackgroundLayer(miniweb.getGeoserver());
map.move(2.35, 48.85, 12);

miniweb.onChangeGeoserver(function(geoserver) {
    map.switchBackgroundLayer(geoserver);
});
```
<p class="bemap-demo-caption">A BeNomad Tiles basemap over Paris. Once the Context has a <code>tilesHost</code>, login, JWT renewal, request signing, style resolution and tile caching are all handled by the SDK — this is the whole integration.</p>

## At a glance

<ul class="bemap-glance">
<li>One archive per map: <code>pmtiles://https://&lt;tilesHost&gt;/&lt;map&gt;</code>, read by byte ranges — no tile pyramid to deploy.</li>
<li>Two read modes: cacheable <strong>200-slices</strong> (<code>?r=A-B</code>, the default) or classic HTTP <strong>Range</strong> (206).</li>
<li>The 200-slice default lands in the browser's own HTTP cache, so <strong>no Service Worker is required</strong>.</li>
<li>Path A — <code>bemap.Context</code> + <code>bemap.MapLibreMap</code>: auth, JWT refresh and caching are automatic.</li>
<li>Path B — raw MapLibre + <code>pmtiles.js</code>: you own login, the <code>TILES_SOURCE</code> swap and the ~55 min re-login.</li>
<li>Always address the map by the <code>default</code> alias, never a dated filename.</li>
</ul>

## Usage

### Script load order (required)

The order matters: `bemap-js-api.js` registers the `pmtiles://` protocol at construction time and needs both globals already present.

```html
<link rel="stylesheet" href="/dist/maplibre-gl.css">
<link rel="stylesheet" href="/dist/bemap-js-api.css">
<script src="/dist/maplibre-gl.js"></script>
<script src="/dist/pmtiles.js"></script>
<script src="/dist/bemap-js-api.js"></script>
```

### Path A — the SDK way (recommended)

Set `tilesHost` on the Context. That single field promotes the MapLibre background to BeNomad Tiles and switches on `bemap.TilesAuth` (login, JWT, `transformRequest` signing, silent renewal) and the tile cache.

```js
var ctx = new bemap.Context({
    host:      'bemap-beta.benomad.com',        // BeMap host — services auth
    secure:    true,
    login:     'YOUR_LOGIN',                    // demo / evaluation only
    password:  'YOUR_PASSWORD',                 // production → token provider
    tilesHost: 'mptiles-api-beta.benomad.net'   // tiles backend
});

var map = new bemap.MapLibreMap(ctx, 'map');
map.move(2.35, 48.85, 12);                      // lon, lat, zoom — lon FIRST

// Tile- and style-load failures are logged to the browser console. If you need to
// react in code, MapLibre's own error event is the available hook — note the
// callback receives a bemap.MapEvent, so the native error lives on evt.native.
map.on('error', function (evt) {
    var err = evt && evt.native && evt.native.error;
    console.error('maplibre tiles error:', err && (err.message || err));
});
```

Never ship a login/password to a production browser — swap them for a backend token provider. The two hosts move together — swap `host` and `tilesHost` in the same edit: beta uses `mptiles-api-beta.benomad.net`, preprod `mptiles-api-preprod.benomad.net`, production `mptiles-api.benomad.net`.

### Path B — raw MapLibre + pmtiles.js (no SDK)

Only if you're already committed to raw MapLibre. You take over everything the SDK does for you: the protocol registration, the login call, the style placeholder swap, and the token lifetime.

```js
var TILES = 'https://mptiles-api-beta.benomad.net';
var LOGIN = 'YOUR_LOGIN', PASS = 'YOUR_PASSWORD';   // demo / evaluation only

function b64(s) { return btoa(unescape(encodeURIComponent(s))); }

async function login() {
    var r = await fetch(TILES + '/api/login', {
        method: 'POST',
        headers: { 'Authorization': 'Basic ' + b64(LOGIN + ':' + PASS) }
    });
    if (!r.ok) throw new Error('login HTTP ' + r.status);
    return (await r.json()).token;
}

async function resolveStyle(token) {
    var raw = await (await fetch(TILES + '/api/default-style?token=' + token)).json();
    var srcPh = (raw.metadata && raw.metadata.source_placeholder) || 'TILES_SOURCE';
    raw.sources = raw.sources || {};
    raw.sources['tiles'] = Object.assign({}, raw.sources[srcPh], {
        type: 'vector',
        url: 'pmtiles://' + TILES + '/default.pmtiles?token=' + token,
        maxzoom: 14
    });
    if (srcPh !== 'tiles') delete raw.sources[srcPh];
    (raw.layers || []).forEach(function (l) { if (l.source === srcPh) l.source = 'tiles'; });
    return raw;
}

(async function () {
    var token = await login();
    maplibregl.addProtocol('pmtiles', new pmtiles.Protocol().tile);
    var map = new maplibregl.Map({
        container: 'map', style: await resolveStyle(token),
        center: [2.35, 48.85], zoom: 12
    });
    // The token lives ~1 h — re-login and re-apply the style before it lapses.
    setInterval(async function () {
        try { var t = await login(); map.setStyle(await resolveStyle(t)); }
        catch (e) { console.warn('refresh failed', e); }
    }, 55 * 60 * 1000);
})();
```

This snippet authenticates with `?token=` on the query string, the only method that composes with `pmtiles.js` Range requests without extra plumbing. `X-Session-Token` is more secure but needs a fetch interceptor — which is exactly what Path A gives you.

## Reference

### The two read modes

| Mode | Request | Success | Cacheable |
| --- | --- | --- | --- |
| **200-slice** (default) | `GET /default?r=A-B` | **200** | Yes — `Cache-Control: public, max-age=2592000, immutable` + `ETag` |
| **Range** | `GET /default.pmtiles` + `Range: bytes=A-B` | **206** | No — browsers don't reliably cache partials |

Both return identical bytes. `tilesSliceMode: '200'` is the **default** because a plain 200 with `immutable` is stored by the browser's native HTTP cache: repeat tiles and repeat visits cost nothing and **no Service Worker is needed**. On the 206 path the Service Worker is the only client-side cache, so the SDK turns it back on automatically when you select `'range'` (`'206'` is accepted as a synonym).

### How the archive URL is built

```text
pmtiles://https://<tilesHost>/<map>
```

The map name is **bare** — `.pmtiles` is optional and the `default` alias is resolved server-side, so the client never pins a build. Precedence for `<map>`: `ctx.tilesFile` → `ctx.geoserver` → the literal `'default'`. Use the alias; a raw dated filename (`OSM_250901_WORLD.pmtiles`) breaks the moment the archive is rebuilt.

`bemap.TilesStyle.resolvePlaceholders()` performs the substitution: it replaces the style's `metadata.source_placeholder` source (default `TILES_SOURCE`) with a `pmtiles://` source pointing at the resolved archive, repoints every layer at it, absolutises a root-relative `glyphs` against the tiles host, and expands `__BILINGUAL_PLACE__` into a bilingual label expression.

### Constructor options

| Option | Default | Effect |
| --- | --- | --- |
| `tiles` | — | A custom PMTiles URL (self-hosted / foreign origin) instead of the `tilesHost` archive. |
| `tilesStyle` | server default style | Style URL or style object to apply. |
| `tilesSliceMode` | `'200'` | `'200'` cacheable slices, or `'range'` / `'206'` for classic Range reads. |
| `serviceWorker` | *(auto)* | `true` / `false` force the tile Service Worker. Unset &rarr; **off** under `'200'`, **on** under `'range'`. |
| `browserCache` | *(unset)* | Legacy opt-out. `false` skips the worker everywhere; any other value — including `'auto'` — is an explicit force-on. Omit it. |
| `serviceWorkerPath` | *(unset)* | Pins the worker URL and **disables** auto-discovery. Leave unset unless you serve it from a non-standard path. |

Under the `'200'` default you normally set **none** of these. Tile URLs carry the archive version token (`?v=…`) and slices come back `immutable`, so the browser's own HTTP cache does the job — see [Cache, slices &amp; resilience](index.html#subpage-jsapi_2_0_0-js-tiles-cache.md).

### Discovery

The `fetch*` calls are authenticated, not rate-limited, and return Promises.

```js
map.fetchAvailableMaps();     // { default, defaultStyle, aliases, tilesets, styles }
map.fetchAvailableStyles();   // { styles: [...], defaultStyle }
map.fetchDefaultMap();        // the server-side default map name
map.fetchDefaultStyle();      // the server-side default style
map.getTilesConfig();         // synchronous: tilesHost, tilesSliceMode, tilesAuth,
                              // rangeCacheMode, tileGate, serviceWorker { enabled, path }
```

### Negative cases

| Situation | Status |
| --- | --- |
| `GET` on a `.pmtiles` with no `Range` header | **403** |
| `Range` span larger than 10 MB | **403** |
| Multi-part `Range` (`bytes=0-9,20-29`) | **403** |
| Missing or expired token | **401** |
| Rate limit exceeded (100 req/s per user) | **429** |
| Tile exists in the pyramid but is empty | *(no request)* — emptiness is encoded in the PMTiles directory, so the client never asks. `204` is a **z/x/y** behaviour, see [Mobile &amp; fleet](index.html#subpage-jsapi_2_0_0-js-tiles-mobile-zxy.md). |

## Notes

- The JWT lives ~1 h. On Path A the SDK refreshes it proactively and re-applies the current style; on Path B you re-login yourself.
- HTTPS only. The Service Worker additionally requires HTTPS or `localhost`.
- Discovery endpoints are exempt from the 100 req/s tile budget — poll them freely at startup.
- A `403` on tiles can mean the account lacks the role for that tileset — that is provisioning, not integration. Check the `Range` header first, though: three of the five `403` causes are malformed range requests. (`400 "Access Denied"` is a **BeMap service** entitlement response, not something the tiles worker returns — see [Troubleshooting](index.html#subpage-jsapi_2_0_0-js-tiles-troubleshooting.md).)

### Gotchas

- **Coordinates are `lon, lat`.** `map.move(2.35, 48.85, 12)` is Paris; the reverse is the Indian Ocean.
- **Forgetting `pmtiles.js`** is the most common blank-map cause — the protocol is only registered when the global exists at construction time.
- **Loading the scripts out of order** has the same effect: `bemap-js-api.js` must come last.
- **Don't hardcode a dated archive name.** Address `default` and let the server resolve it.
- **206 responses are not browser-cached.** If you switch to `tilesSliceMode: 'range'`, keep the Service Worker on or every pan re-downloads.
- **Path B and `setStyle()`** wipe custom layers you added by hand — re-add them after each token refresh.

## See also

- [BeNomad Tiles overview](index.html#subpage-jsapi_2_0_0-js-tiles-overview.md) — the chapter entry point, delivery modes compared
- [Tiles authentication](index.html#subpage-jsapi_2_0_0-js-tiles-auth.md) — login, JWT, cookie / header / query modes
- [Tile caching](index.html#subpage-jsapi_2_0_0-js-tiles-cache.md) — browser HTTP cache vs Service Worker
- [Tile styles](index.html#subpage-jsapi_2_0_0-js-tiles-styles.md) — placeholders, bilingual labels, custom styles
- [Mobile — ZXY](index.html#subpage-jsapi_2_0_0-js-tiles-mobile-zxy.md) — the other delivery mode
- [Tiles troubleshooting](index.html#subpage-jsapi_2_0_0-js-tiles-troubleshooting.md) — grey tiles, 401/403/429
- [Display map (MapLibre)](index.html#subpage-jsapi_2_0_0-js-map-maplibre.md) — the map object itself
- [The Context](index.html#subpage-jsapi_2_0_0-the-context.md) — `tilesHost`, `tilesFile`, `tokenStorage`
