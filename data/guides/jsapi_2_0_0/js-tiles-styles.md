<span class="bemap-tag">BeNomad Tiles</span>

# Styles &amp; BeMaputnik

<p class="bemap-tagline">A BeNomad Tiles map paints a tiny bundled fallback instantly, then swaps in the live cartographic charte published on the worker — so the map you author in BeMaputnik reaches every application without a single redeploy.</p>

<div class="bemap-callout">
<strong>The bundled style is not the source of truth.</strong> <code>bemap.fallbackStyle</code> exists only to fill the canvas during the first few hundred milliseconds and to survive an offline start. The real style is fetched from the worker after login (<code>/api/default-style</code> &rarr; <code>/styles/&lt;name&gt;</code>). Change the charte server-side and every app picks it up on its next load — no library rebuild, no client release.
</div>

## At a glance

<ul class="bemap-glance">
<li>Four shapes of the <code>style</code> option: omitted / <code>'default'</code>, a bare name, a full URL, an inline object.</li>
<li>All four flow through <code>bemap.TilesStyle.fetch()</code> &rarr; <code>resolvePlaceholders()</code> &rarr; <code>hardenSymbolCollisions()</code> before MapLibre sees them.</li>
<li><code>bemap.fallbackStyle</code> — <em>"BeMap Fallback (charte 2026, no fonts)"</em>: fill/line only, no symbol layers, no <code>glyphs</code>, so it never requests a font.</li>
<li>Discovery: <code>map.fetchAvailableStyles()</code> &rarr; <code>{ styles, defaultStyle }</code>; runtime swap: <code>map.setStyle('&lt;name&gt;')</code>.</li>
<li>Two placeholders: <code>TILES_SOURCE</code> (rewritten to <code>pmtiles://&lt;tilesHost&gt;/&lt;tilesFile&gt;</code>) and <code>__BILINGUAL_PLACE__</code> (a MapLibre <code>format</code> expression).</li>
<li><strong>Localized names are <code>name_fr</code> / <code>name_en</code> — underscore</strong>, not the <code>name:fr</code> OpenMapTiles convention.</li>
<li>The library ships <strong>no fonts</strong>. A root-relative <code>glyphs</code> is absolutised against the tiles host; override with <code>ctx.glyphsUrl</code>.</li>
<li><code>setStyle()</code> is overlay-preserving — <code>bemap.TilesOverlayCatalog</code> replays your shapes, including on the <code>401</code> &rarr; refresh &rarr; reload path.</li>
<li>Styles are authored in <strong>BeMaputnik</strong>, the BeNomad style editor at <code>https://bemaputnik.benomad.net</code>.</li>
</ul>

## Usage

The default path — pin nothing, and the map tracks whatever the worker publishes:

```js
var ctx = new bemap.Context({
    login:     'YOUR_LOGIN',
    password:  'YOUR_PASSWORD',
    secure:    true,
    host:      'bemap.benomad.com',
    tilesHost: 'mptiles-api.benomad.net'
});

// No `style` option → tiny fallback now, live server charte right after login.
var map = new bemap.MapLibreMap(ctx, 'map').move(2.35, 48.85, 12);
// Style-load failures are reported in the browser console — 2.0.2 has no
// public error subscription. See "Map errors" on the Events page.
```

List what the worker allows for your account, then swap at runtime:

```js
map.fetchAvailableStyles().then(function (cfg) {
    // cfg.styles      → ['openfreemap_graylevel', 'charte_2026', …]
    // cfg.defaultStyle → the name applied when you pin none
    cfg.styles.forEach(function (name) { console.log(name, name === cfg.defaultStyle); });
});

map.setStyle('openfreemap_graylevel');   // bare name → <tilesHost>/styles/openfreemap_graylevel
```

Pin a style explicitly when you do *not* want the server default — a name, a URL on your tiles host, or an inline object:

```js
new bemap.MapLibreMap(ctx, 'map', { style: 'openfreemap_graylevel' });
new bemap.MapLibreMap(ctx, 'map', { style: 'https://mptiles-api.benomad.net/styles/charte_2026.json' });
new bemap.MapLibreMap(ctx, 'map', {
    style: {
        version: 8,
        metadata: { source_placeholder: 'TILES_SOURCE' },
        sources: { 'TILES_SOURCE': { type: 'vector', url: '' } },
        layers: [ { id: 'bg', type: 'background', paint: { 'background-color': '#f4f1ea' } } ]
    }
});
```

Point the font server somewhere other than the tiles host — this overrides every style's `glyphs`:

```js
var ctx = new bemap.Context({
    tilesHost: 'mptiles-api.benomad.net',
    glyphsUrl: 'https://my-host.example.com/fonts/{fontstack}/{range}.pbf'
});
```

## Reference

### Style resolution precedence

| `style` option | Resolution |
| --- | --- |
| *omitted* or `'default'` | `bemap.fallbackStyle` paints **immediately** (no network, no fonts), then — once login completes — `GET /api/default-style` names the live style and `GET /styles/<name>` loads it through an overlay-preserving `setStyle()`. A failure is swallowed: the fallback simply stays, never a blank canvas. |
| `'<name>'` | Fallback first, then `<tilesHost>/styles/<name>`. A value already carrying a path (`'styles/foo.json'`, as returned by `/api/styles`) resolves against the host root instead of being re-nested. |
| `'<url>'` | Fetched as-is. Auth is injected only when the URL contains `ctx.tilesHost` — session cookie by default, `X-Session-Token` header or `?token=` per `tilesAuth`. Other origins get a plain `fetch`, so nothing leaks cross-origin. |
| `{ …json… }` | Deep-cloned and used as-is. Placeholders are still resolved, so an inline style can carry `TILES_SOURCE`. |

### Map methods

| Member | Returns | Behaviour |
| --- | --- | --- |
| `fetchAvailableStyles()` | `Promise<Object>` | `GET /api/styles` &rarr; `{ styles, defaultStyle }`. Waits for login. Rejects with `MAPLIBRE_ONLY` on Leaflet / OpenLayers |
| `fetchDefaultStyle()` | `Promise<Object>` | `GET /api/default-style` &rarr; the name of the style applied when you pin none |
| `setStyle(urlOrObject, [options])` | `this` | Name, URL or inline object. Returns synchronously for chaining; the URL path resolves asynchronously and reports failures as `STYLE_LOAD_FAILED` on the map error channel. Marks the map as explicitly styled |
| `getStyle()` | `Object` | The **resolved** spec the library applied — placeholders substituted, glyphs absolutised |
| `setPaintProperty` / `setLayoutProperty` / `setFilter` / `setLayerZoomRange` | `this` | Surgical passthroughs for one-off tweaks; no-ops (warn once) on Leaflet and OpenLayers |

### Context URL helpers

| Member | Result |
| --- | --- |
| `ctx.getTilesBaseUrl()` | `https://<tilesHost><tilesPath>` |
| `ctx.getTilesStylesUrl()` | `<base>/api/styles` — the allow-listed style names for this environment |
| `ctx.getTilesDefaultStyleUrl()` | `<base>/api/default-style` — the default-style pointer |
| `ctx.getTilesStyleUrl(name)` | `<base>/styles/<name>`, or `<base>/<path>` when `name` already contains a `/`. `null` without a `tilesHost` |

### `bemap.TilesStyle`

Pure functions, unit-testable without instantiating MapLibre. You rarely call them yourself — `setStyle()` and the constructor already do.

| Member | Signature | Purpose |
| --- | --- | --- |
| `SOURCE_PLACEHOLDER` | `String` | `'TILES_SOURCE'` — override per style via `metadata.source_placeholder` |
| `PLACE_LABEL_PLACEHOLDER` | `String` | `'__BILINGUAL_PLACE__'` — override via `metadata.place_label_placeholder` |
| `fetch(ctx, urlOrObject, [options])` | `Promise<Object>` | Coerces input to a deep-cloned style object. Objects resolve immediately; strings are fetched with the tiles auth applied when the URL matches `ctx.tilesHost`. `options.getToken` supplies the JWT for `header` / `query` modes |
| `resolvePlaceholders(rawStyle, ctx, [tilesFile])` | `Object` | Absolutises `glyphs`, rewrites the source to `pmtiles://<tilesHost>/<tilesFile>` under the key `tiles`, repoints every layer, and substitutes the bilingual `text-field`. **Mutates and returns** the input |
| `buildBilingualExpr()` | `Array` | Emits the MapLibre `format` expression used for place labels |
| `hardenSymbolCollisions(styleObject)` | `Object` | Sets `symbol-avoid-edges` on every symbol layer, plus `text-padding: 200` and `text-optional: true` on layers whose id starts with `road_shield`, so the OSM tileset stops fighting itself at low zoom |

### Placeholders

| Placeholder | Where | Replaced with |
| --- | --- | --- |
| `TILES_SOURCE` | A source key, and `source:` on each layer | A vector source named `tiles` with `url: 'pmtiles://<tilesHost>/<tilesFile>'`. The style's own `url` / `tiles` template is deliberately discarded, so every BeNomad style routes through the worker for auth, gating and edge cache. Only the placeholder key or `tiles` is rewritten — a source keyed anything else is left untouched |
| `__BILINGUAL_PLACE__` | `layout['text-field']` | A `format` expression: `coalesce(name_<browserLang>, name_en, name)` in `Noto Sans Bold`, and — only when it differs — the local `name` on a second line at `font-scale` 0.75 in `Noto Sans Regular` |

### BeMaputnik — the style editor

| Item | Value |
| --- | --- |
| URL | `https://bemaputnik.benomad.net` |
| What it is | A MapLibre/Maputnik-based visual style editor, hosted by BeNomad, previewing live against BeNomad Tiles |
| Auth | The same tiles session — it logs in and carries the JWT on the style, glyph and PMTiles requests |
| Style markers | BeNomad styles carry `"maputnik:renderer": "mlgljs"` and `metadata.source_placeholder` (plus `place_label_placeholder` on label-bearing styles) |
| No service worker | Every reload re-fetches, so an edit is visible immediately |

**Workflow.** Open a style in BeMaputnik and edit it against a live preview &rarr; the reviewed style is published server-side into the worker's allow-list &rarr; applications pick it up automatically through `/api/default-style`, or explicitly with `map.setStyle('<name>')`. Keep the placeholders intact when saving: strip `TILES_SOURCE` and the style stops routing through the worker; strip `__BILINGUAL_PLACE__` and labels fall back to the raw local name.

## Notes

**Why the fallback-then-live dance matters.** It is the single most important idea on this page. Shipping the charte inside the bundle would mean a library rebuild and a customer redeploy for every cartographic change. Instead the bundle carries only a ~10-layer fill/line style for the first frame, and the authoritative charte lives on the worker — versioned, cached at the edge, and swapped in a few hundred milliseconds later. The swap is skipped if you call `setStyle()` yourself during that async gap, so an explicit choice always wins.

**`bemap.fallbackStyle`.** Frozen object, name *"BeMap Fallback (charte 2026, no fonts)"*: background, `earth`, `landcover`, `water`, river lines and major roads / highways, with colours lifted from the charte so the transition is barely visible. No symbol layers and no `glyphs` key at all — it can never trigger a font request or a font 404. `bemap.defaultStyle` is a deprecated back-compat alias of the same object.

**Glyphs.** The library ships no fonts and there is no `dist/fonts/` to deploy. Server styles declare their own `glyphs`; a **root-relative** one such as `/fonts/{fontstack}/{range}.pbf` is absolutised against the tiles host, because MapLibre resolves a relative `glyphs` in an *object* style against the page origin — which 404s and blanks every label. An absolute (`https://…`) or protocol-relative (`//host/…`) value is left alone. `ctx.glyphsUrl` overrides all of them.

**Overlay preservation.** Native `setStyle()` wipes user-added sources and layers. `bemap.TilesOverlayCatalog` stores a factory per overlay and replays them once MapLibre fires `'idle'` — polylines, polygons, circles, raster layers, heatmaps and 3D buildings. This covers the internal `401` &rarr; refresh &rarr; `setStyle` renewal path, so a session timeout cannot destroy a customer's overlays. Markers, multimarkers and popups are DOM overlays that live outside the style: `setStyle()` never touches them, and they are deliberately excluded from the replay set (replaying would duplicate them).

**Projection.** The SDK owns the root `projection`: your `setProjection('globe')` choice is remembered and re-asserted on every subsequent style swap, and a server style shipping `"projection": {"type": "globe"}` is overridden back to the SDK value with a one-time `console.info`. Opt in explicitly if you want a globe.

### Gotchas

- **Localized names use an underscore: `name_fr`, `name_en` — not `name:fr`.** BeNomad OSM PMTiles do not follow the OpenMapTiles colon convention. A `['get', 'name:fr']` in a hand-written expression silently misses on every feature and collapses the label to the local name — or to nothing. Verified in `bemap-tiles-style.js`, `buildBilingualExpr()`.
- **An unreachable glyph server makes labels vanish silently.** No exception, no error event — just an empty-looking map. If a label-heavy style renders as bare geometry, check the `fonts/{fontstack}/{range}.pbf` requests in the network panel before anything else.
- **Custom MapLibre layers added straight to `map.native` are wiped by every style swap.** They are not in the catalogue. Re-add them from a `map.native.on('style.load', …)` handler so they survive the server-default swap and any token-renewal reload.
- **Cluster layers created with `addClusterPoints()` are not replayed either** — unlike polylines and polygons, they are not registered in the overlay catalogue. Re-add them after a style change.
- **The style's own tile source is ignored, by design.** Some third-party styles ship a hardcoded archive URL that would 404; the SDK always repoints the conventional source at your configured tileset on the worker.
- **Calling `setStyle()` during startup cancels the server-default swap.** That is intentional, but it means a style you set in a `load` handler can look like "the default never arrived".
- **`resolvePlaceholders()` mutates its argument.** Pass a clone if you keep a reference to the raw style.
- **`fetchAvailableStyles()` is MapLibre-only.** On Leaflet and OpenLayers it rejects with `MAPLIBRE_ONLY` — those engines render WMS raster, where `setStyle('<name>')` re-applies a WMS `STYLES` value instead.

## See also

- [Overview &amp; access](index.html#subpage-jsapi_2_0_0-js-tiles-overview.md) — the BeNomad Tiles chapter, environments and integration paths
- [Web — PMTiles](index.html#subpage-jsapi_2_0_0-js-tiles-web-pmtiles.md) — how the `pmtiles://` source the placeholder produces is actually served
- [Sessions &amp; tokens](index.html#subpage-jsapi_2_0_0-js-tiles-auth.md) — the auth injected into style, glyph and tile requests
- [Cache &amp; slices](index.html#subpage-jsapi_2_0_0-js-tiles-cache.md) — why a style swap is cheap on a warm cache
- [Troubleshooting](index.html#subpage-jsapi_2_0_0-js-tiles-troubleshooting.md) — blank map, missing labels, `401` / `403` symptoms
- [MapLibre maps](index.html#subpage-jsapi_2_0_0-js-map-maplibre.md) — the engine, `setStyle()` in context, projection and camera
