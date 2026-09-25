<span class="bemap-tag">Migration</span>

# WMS → BeNomad Tiles

<p class="bemap-tagline">Moving a raster WMS map onto BeNomad vector tiles: what you gain, what you have to change, and the honest list of what you give up.</p>

## At a glance

<ul class="bemap-glance">
<li>WMS sends <strong>images</strong> rendered by the server. Vector tiles send <strong>data</strong> rendered by the browser.</li>
<li>Vector tiles require <code>bemap.MapLibreMap</code> — there is no Leaflet or OpenLayers path.</li>
<li>Authentication changes: WMS rides your BeMap credentials; tiles use a separate <strong>token from the tiles worker</strong>.</li>
<li>Your service calls — routing, geocoding, EV — are <strong>untouched</strong>. Only the basemap changes.</li>
<li>You gain 3D, globe, rotation, client-side restyling, sharper text, and a working browser cache.</li>
<li>You give up server-side <code>GetFeatureInfo</code> and any WMS style your organisation maintains centrally.</li>
</ul>

## Usage

### The two setups side by side

**Before — WMS on Leaflet**

```html
<script src="/bemap/leaflet.js"></script>
<script src="/bemap/bemap-js-api.js"></script>
```

```js
var ctx = new bemap.Context({
    host: 'bemap.benomad.com', secure: true,
    login: 'your-login', password: 'your-password',
    geoserver: 'here'
});

var map = new bemap.LeafletMap(ctx, 'map');
map.defaultLayers();
map.move(2.35, 48.85, 12);
```

**After — vector tiles on MapLibre**

```html
<link rel="stylesheet" href="/bemap/maplibre-gl.css">
<script src="/bemap/maplibre-gl.js"></script>
<script src="/bemap/pmtiles.js"></script>
<script src="/bemap/bemap-js-api.js"></script>
```

```js
var ctx = new bemap.Context({
    host: 'bemap.benomad.com', secure: true,
    login: 'your-login', password: 'your-password',
    tilesHost: 'mptiles-api.benomad.net'      // the one new field
});

var map = new bemap.MapLibreMap(ctx, 'map');
map.move(2.35, 48.85, 12);
```

Three changes: different engine scripts, `pmtiles.js` added, `tilesHost` set on the
Context. Everything below that line — markers, polylines, popups, events, routing — is
identical.

### `defaultLayers()` and the background

On WMS, `defaultLayers()` creates the background raster layer. On MapLibre the basemap
*is* the vector style, so there is no background layer to create — `defaultLayers()`
still makes the overlay layers, but the background half has nothing to do.

`backgroundLayers()` and `switchBackgroundLayer()` likewise have no WMS to switch. The
equivalent is swapping the style:

```js
map.setStyle(styleUrlOrObject);
map.fetchAvailableStyles().then(function(styles) { /* … */ });
```

### Authentication

This is the part that catches people out. The BeMap services and the tiles worker are
**different origins** with different authentication:

| | WMS | BeNomad Tiles |
| --- | --- | --- |
| Host | your BeMap host | `mptiles-api*.benomad.net` |
| Auth | BeMap credentials on every tile URL | one login, then a ~1 h JWT |
| Handled by | the Context | `bemap.TilesAuth`, automatically |

You do not usually write any of this — setting `tilesHost` is enough. But it means an
account can be entitled for WMS and not for tiles, and the failure shows up as a `403`
on the tiles login while every service call keeps working. See
[Tiles authentication](index.html#subpage-jsapi_2_0_0-js-tiles-auth.md).

**Pair the hosts.** A BeMap host on beta with a tiles host on production yields a `403`
that looks like bad credentials and is not.

### Styling

WMS styling is server-side: you request `styles: 'traffic'` and the server renders it.
Vector-tile styling is client-side and live:

```js
map.setPaintProperty('road-primary', 'line-color', '#ff0000');
map.setLayoutProperty('poi-labels', 'visibility', 'none');
map.setFilter('buildings', ['>', 'height', 20]);
```

For organisation-wide changes, edit the style centrally in BeMaputnik instead of in
every application — see [Styles &amp; BeMaputnik](index.html#subpage-jsapi_2_0_0-js-tiles-styles.md).

### Replacing `GetFeatureInfo`

`map.onGetFeatureInfo(layer, options)` asks the WMS server what is at a point. There is
no server to ask with vector tiles — but the data is already in the browser:

```js
// Before
map.onGetFeatureInfo(wmsLayer, {
    beforeCallback: function(data) { showPopup(data); }
});

// After
map.on(bemap.Map.EventType.CLICK, function(evt) {
    var hits = map.queryRenderedFeatures({ x: evt.x, y: evt.y });
    if (hits.length) showPopup(hits[0].properties, evt.getCoordinate());
});
```

Faster — no round trip — but it only sees what the tiles carry and what the style
renders. If your WMS `GetFeatureInfo` returned attributes that are not in the vector
tiles, that data is genuinely not available client-side.

### Caching

Vector tiles cache properly in the browser. At the 2.0.2 default
(`tilesSliceMode: '200'`) tiles are ordinary cacheable HTTP 200 responses with a long
`max-age`, so repeat visits are close to free and **no Service Worker is needed**.

```js
map.enableBrowserCache();
map.getBrowserCacheStats();
```

See [Cache, slices &amp; resilience](index.html#subpage-jsapi_2_0_0-js-tiles-cache.md).

### A staged migration

You do not have to move everything at once.

1. Stand up one screen on `MapLibreMap` with `tilesHost` set, leaving the rest on WMS.
2. Confirm the tiles login works for your account on your environment.
3. Port `onGetFeatureInfo` usage to `queryRenderedFeatures`.
4. Move any server-side style customisation into the vector style.
5. Migrate remaining screens.
6. Drop the Leaflet/OpenLayers scripts once nothing constructs those engines.

Both engines can coexist in one application throughout — they are separate classes over
the same Context.

## Reference

### What changes

| Concern | WMS | BeNomad Tiles |
| --- | --- | --- |
| Engine | Leaflet, OpenLayers | **MapLibre only** |
| Extra scripts | — | `maplibre-gl.js`, `pmtiles.js` |
| Context field | `geoserver` | `tilesHost` (keep `geoserver` for services) |
| Basemap | `bemap.BemapLayer` via `defaultLayers()` | the vector style |
| Restyling | server-side `styles` | `setPaintProperty` / `setFilter` / BeMaputnik |
| Feature info | `onGetFeatureInfo` | `queryRenderedFeatures` |
| Rotation / pitch / 3D | no | yes |
| Caching | HTTP cache of images | tile cache, no Service Worker at the default |

### What does not change

- Every service: routing, traceroute, geocoding, autocomplete, POI, EV, ACL.
- Markers, polylines, polygons, circles, popups.
- Events, drawing, layers, camera.
- `bemap.Context` — you add a field, you do not replace it.

### What you lose

| Capability | Notes |
| --- | --- |
| Server-side `GetFeatureInfo` | Replaced by client-side querying, limited to what the tiles carry. |
| Centrally-rendered WMS styles | Replaced by the vector style — but that is also centrally managed, in BeMaputnik. |
| Leaflet / OpenLayers plugin ecosystem | MapLibre has its own, and it is a different set. |
| Very old browser support | Vector tiles need WebGL. |

## Notes

**WebGL is required.** MapLibre renders on the GPU. Anything without WebGL — some
locked-down corporate environments, some virtualised desktops — cannot show a vector
map at all. If that is part of your estate, keep a WMS fallback path.

**The library still supports WMS.** This is not a deprecation. WMS on Leaflet and
OpenLayers is fully supported in 2.0.2 and is the right choice for plenty of
applications. Migrate because you want what vector tiles offer, not because you have to.

### Gotchas

- **Forgetting `pmtiles.js`.** With `tilesHost` set and PMTiles missing, the library prints a loud red console error naming the tag to add.
- **Loading `pmtiles.js` after `bemap-js-api.js`.** Order matters; it must come first.
- **Mismatched environments.** `host` on beta, `tilesHost` on production → `403`, which reads like a credentials failure.
- **Expecting `switchBackgroundLayer` to work.** There is no WMS background on MapLibre. Use `setStyle`.
- **Expecting `GetFeatureInfo` attributes to survive.** Only what the tiles contain is queryable.
- **Keeping both engine bundles forever.** Loading Leaflet, OpenLayers *and* MapLibre triples the payload. Drop what you no longer construct.
- **Assuming tiles entitlement follows WMS entitlement.** They are separate grants. Verify before migrating a screen.

## See also

- [BeNomad Tiles — overview](index.html#subpage-jsapi_2_0_0-js-tiles-overview.md)
- [Web — PMTiles](index.html#subpage-jsapi_2_0_0-js-tiles-web-pmtiles.md) — the browser path in detail
- [Tiles authentication](index.html#subpage-jsapi_2_0_0-js-tiles-auth.md)
- [Styles &amp; BeMaputnik](index.html#subpage-jsapi_2_0_0-js-tiles-styles.md)
- [Backgrounds &amp; basemaps](index.html#subpage-jsapi_2_0_0-js-map-backgrounds.md) — the WMS side
- [Choosing an engine](index.html#subpage-jsapi_2_0_0-js-map-engines.md)
- [Tiles troubleshooting](index.html#subpage-jsapi_2_0_0-js-tiles-troubleshooting.md)
