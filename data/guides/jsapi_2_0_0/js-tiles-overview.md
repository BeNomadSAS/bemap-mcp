<span class="bemap-tag">BeNomad Tiles</span>

# Overview &amp; access

<p class="bemap-tagline">BeNomad Tiles is BeNomad's hosted vector map data — MVT tiles served over HTTPS from a JWT-authenticated worker, consumed either as a PMTiles archive in the browser or as individual <code>{z}/{x}/{y}.pbf</code> tiles on mobile and fleet back-ends.</p>

<div class="bemap-callout">
<strong>Current scope — cartographic data only.</strong> BeNomad Tiles delivers the map <em>data</em> (vector tiles, styles, glyphs) and the access mechanism described on this page. The BeMap map server comes later; until then, routing, geocoding and EV services keep running on the BeMap API host (<code>host</code>), while tiles come from the tiles host (<code>tilesHost</code>). Two backends, one BeMap account.
</div>

## At a glance

<ul class="bemap-glance">
<li>One BeMap account gives access to both backends — no separate tiles subscription or API key.</li>
<li>Access in one line: <code>POST /api/login</code> with HTTP Basic &rarr; a JWT valid <strong>~1 hour</strong> &rarr; every tile, style, glyph and discovery request carries it. Detail: <a href="index.html#subpage-jsapi_2_0_0-js-tiles-auth.md">Sessions &amp; tokens</a>.</li>
<li>Three integration paths — Web SDK (recommended), raw MapLibre + <code>pmtiles.js</code>, or mobile/fleet z/x/y. Pick one from the table below.</li>
<li>Vector tiles are <strong>MapLibre-only</strong>: <code>bemap.MapLibreMap</code>. Leaflet and OpenLayers stay on the WMS raster background and silently ignore <code>tilesHost</code>.</li>
<li>Three public environments (production, preprod, beta) — always pair a BeMap host with its matching tiles host.</li>
<li>Address tiles through the alias <code>default</code>; the worker resolves the real tileset server-side.</li>
</ul>

## Usage

Set `tilesHost` on the Context and instantiate `bemap.MapLibreMap`. The SDK logs in, caches the JWT, renews it before expiry, attaches it to every tile request, loads the live BeNomad style and caches tiles in the browser.

```js
var ctx = new bemap.Context({
    login:     'YOUR_LOGIN',
    password:  'YOUR_PASSWORD',
    secure:    true,
    host:      'bemap.benomad.com',        // BeMap API — routing, geocoding, EV
    tilesHost: 'mptiles-api.benomad.net'   // BeNomad Tiles — vector basemap
});

var map = new bemap.MapLibreMap(ctx, 'map').move(2.3412, 48.85693, 12);
```

`pmtiles.js` is required alongside MapLibre whenever `tilesHost` is set — the library prints the exact missing tag in the console if you forget it.

```html
<link rel="stylesheet" href="dist/maplibre-gl.css">
<script src="dist/maplibre-gl.js"></script>
<script src="dist/pmtiles.js"></script>
<script src="dist/bemap-js-api.js"></script>
```

### Pick your integration path

| Path | Who it's for | How tiles are fetched | Where to go next |
| --- | --- | --- | --- |
| **A — Web SDK** *(recommended)* | Web apps that want the map plus geocoding / routing / EV from one library | The SDK owns login, JWT, `transformRequest` and cache; nothing to wire | [Web — PMTiles](index.html#subpage-jsapi_2_0_0-js-tiles-web-pmtiles.md), [MapLibre map](index.html#subpage-jsapi_2_0_0-js-map-maplibre.md) |
| **B — Web raw** | Apps already running MapLibre GL that only want the BeNomad basemap | `pmtiles://` on `/default.pmtiles` via HTTP Range, or cacheable `?r=` 200 slices | [Web — PMTiles](index.html#subpage-jsapi_2_0_0-js-tiles-web-pmtiles.md), [Cache & slices](index.html#subpage-jsapi_2_0_0-js-tiles-cache.md) |
| **C — Mobile / fleet** | Native mobile apps and server-to-server consumers | Individual `GET /default/{z}/{x}/{y}.pbf` MVT tiles, token in the query string | [Mobile & fleet z/x/y](index.html#subpage-jsapi_2_0_0-js-tiles-mobile-zxy.md) |

If you are unsure, take **path A** — least code, fewest ways to get it wrong.

## Reference

### Environments

Never mix a BeMap host with the tiles host of another environment; credentials and tilesets are per-environment.

| Environment | `host` (BeMap API) | `tilesHost` (BeNomad Tiles) | Use for |
| --- | --- | --- | --- |
| **Production** *(default)* | `bemap.benomad.com` | `mptiles-api.benomad.net` | Live customer traffic |
| **Preprod** | `bemap-preprod.benomad.com` | `mptiles-api-preprod.benomad.net` | Staging, pre-release validation |
| **Beta** | `bemap-beta.benomad.com` | `mptiles-api-beta.benomad.net` | Integration testing |

### Access contract

| Item | Value |
| --- | --- |
| Login | `POST https://<tilesHost>/api/login`, header `Authorization: Basic base64(login:password)` &rarr; `{ ok, username, token }` |
| Token lifetime | ~1 hour; the SDK renews 5 minutes before expiry, and a `401` triggers a transparent re-login |
| Token transport | Cookie (default, no preflight), `X-Session-Token` header, or `?token=` query — see [Sessions & tokens](index.html#subpage-jsapi_2_0_0-js-tiles-auth.md) |
| Discovery | `GET /api/maps`, `/api/default-style`, `/api/styles` — authenticated, not rate-limited |
| Rate limit | 100 req/s per user (`429` above it) |
| Range reads | ≤ 10 MB per request; a `.pmtiles` request without a `Range` header is rejected with `403` |
| Transport | HTTPS only; browser origins must be CORS-allowlisted by BeNomad |

### Resources

| Resource | Link | What it is |
| --- | --- | --- |
| GitHub repository | [BeNomadSAS/bemap-js-api](https://github.com/BeNomadSAS/bemap-js-api) | Source, `dist/` bundle, install guide, release tags |
| Live demo dashboard | [benomadsas.github.io/bemap-js-api](https://benomadsas.github.io/bemap-js-api/) | Every feature runnable, with copy-paste code and an environment switcher |
| BeMaputnik | [bemaputnik.benomad.net](https://bemaputnik.benomad.net) | Browser style editor for the BeNomad charte — see [Styles & BeMaputnik](index.html#subpage-jsapi_2_0_0-js-tiles-styles.md) |
| JSDoc reference | [API reference](../dist/doc/index.html) | Generated documentation for every class and method |
| AI integration skill | `benomad-tiles-integration/` in the repo | Path templates (web SDK, raw MapLibre, native mobile, backend proxy) for Claude / Cursor / Copilot |

## Notes

<div class="bemap-callout">
<strong>Demo-only credentials.</strong> The live demos on this portal authenticate with a shared account configured in <code>documentation/context.js</code>. It is deliberately public, provisioned for <em>map tiles on beta only</em>, and grants nothing else — it exists so the demo blocks on this site render. It is not a customer credential, carries no guarantee of availability, and must never be used by a customer application. Use your own BeMap account, and see <a href="index.html#subpage-jsapi_2_0_0-the-context.md">The Context</a> for keeping it out of the browser in production.
</div>

### WMS vs BeNomad Tiles

Migration is opt-in and non-breaking — a v1 app that never sets `tilesHost` keeps rendering WMS unchanged.

| Concern | WMS (raster) | BeNomad Tiles (vector) |
| --- | --- | --- |
| Engines | Leaflet, OpenLayers, MapLibre | MapLibre only |
| Rendering | Raster PNG/JPG, pixelated between zooms | Vector — fluid pan/zoom, crisp at every scale |
| 3D buildings, terrain, globe | Not supported | First-class |
| Labels | Static, server-rendered | Bilingual, resolved per browser language at runtime |
| Branding | Server-side style only | Client-side style swap at runtime |
| Caching | Browser default | Browser HTTP cache on 200 slices, or Service Worker on classic Range |

### Gotchas

- **Coordinates are longitude first.** `new bemap.Coordinate(lon, lat)` and `map.move(lon, lat, zoom)`. Reversing them is the classic "my marker is in the Atlantic" bug.
- **`tilesHost` on a Leaflet or OpenLayers map is ignored** — silently. The map class is the switch, not the Context field.
- **Never ship credentials in client code for production.** Inline `login` / `password` is for demos and evaluations; production keeps them server-side behind a token provider or the `proxy` option.
- **Never patch `window.fetch` to inject the token.** The SDK uses MapLibre's `transformRequest`; raw integrations use `transformRequest` or `?token=`.
- **A `403` from a non-browser client is usually the User-Agent.** The gateway filters bot-like agents (`Python-urllib` and friends) — send an explicit, realistic `User-Agent`.
- **Tiles are gzipped by content negotiation.** Browsers negotiate and decompress transparently — do not gunzip again. Native and server clients that do not send `Accept-Encoding: gzip` may receive raw gzip (`1f 8b`) and must decompress before parsing the MVT.
- **A `400 "Access Denied"` on a service is an entitlement, not a bug.** Roles are provisioned per account; ask BeNomad rather than debugging your code.

## See also

- [Sessions & tokens](index.html#subpage-jsapi_2_0_0-js-tiles-auth.md) — login, TTL, the four token wire modes, renewal
- [Web — PMTiles](index.html#subpage-jsapi_2_0_0-js-tiles-web-pmtiles.md) — paths A and B in full, script order, raw MapLibre setup
- [Mobile & fleet z/x/y](index.html#subpage-jsapi_2_0_0-js-tiles-mobile-zxy.md) — path C, MVT, `204` on empty tiles, gzip matrix
- [Styles & BeMaputnik](index.html#subpage-jsapi_2_0_0-js-tiles-styles.md) — style precedence, placeholders, glyphs, the style editor
- [Cache & slices](index.html#subpage-jsapi_2_0_0-js-tiles-cache.md) — 200-slice vs Range, browser cache, resilience knobs
- [Troubleshooting](index.html#subpage-jsapi_2_0_0-js-tiles-troubleshooting.md) — 401 / 403 / CORS / gzip / blank map, symptom to fix
- [The Context](index.html#subpage-jsapi_2_0_0-the-context.md) — every Context option, including `tilesHost` and `tilesFile`
- [MapLibre map](index.html#subpage-jsapi_2_0_0-js-map-maplibre.md) — the map class that renders BeNomad Tiles
