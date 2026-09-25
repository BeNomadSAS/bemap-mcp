<span class="bemap-tag">Mapping</span>

# Backgrounds &amp; basemaps

<p class="bemap-tagline">What is underneath everything else: the BeMap WMS basemap, alternative geoservers, third-party raster tiles, and the overlays that sit between the basemap and your data.</p>

## Try it

```
{"bemap":{"language":"javascript","mapid":"mapV2_bg","run":true,"hide":true}}
$(document).ready(function() {
    bemap.docs.attachDemo('mapV2_bg', {
        onMapReady: function(map) {
            map.defaultLayers().move(2.35, 48.85, 11);

            function on(id, fn) {
                var el = document.getElementById(id);
                if (el) el.onclick = fn;
            }

            var extra = null;

            on('mapV2_bg_default', function() {
                if (extra) { map.removeLayer(extra); extra = null; }
            });

            on('mapV2_bg_osm', function() {
                if (extra) map.removeLayer(extra);
                // Third-party raster tiles as an ordinary layer.
                extra = new bemap.OsmLayer({
                    name: 'osmBackground',
                    url:  'https://tile.openstreetmap.org/{z}/{x}/{y}.png'
                });
                map.addLayer(extra);
            });

            on('mapV2_bg_refresh', function() {
                if (extra) map.refreshLayer(extra);
            });
        }
    });
});
```

<button type="button" class="btn btn-primary" id="mapV2_bg_default">BeMap basemap</button>
<button type="button" class="btn btn-primary" id="mapV2_bg_osm">Add OSM raster</button>
<button type="button" class="btn btn-primary" id="mapV2_bg_refresh">Refresh tiles</button>

<p class="bemap-demo-caption">The BeMap basemap is created by <code>defaultLayers()</code>. Adding a raster layer on top is the same <code>addLayer</code> call you use for any other layer.</p>

## At a glance

<ul class="bemap-glance">
<li><code>map.defaultLayers()</code> creates the standard stack, including the <code>BACKGROUND</code> layer. Call it once.</li>
<li><code>bemap.BemapLayer</code> — a BeMap WMS layer. This is what the default background is.</li>
<li><code>bemap.OsmLayer</code>, <code>bemap.WmsLayer</code>, <code>bemap.RasterLayer</code> — third-party and custom tile sources.</li>
<li><code>map.backgroundLayers([…])</code> + <code>map.switchBackgroundLayer(name)</code> — pre-create several geoserver backgrounds and swap between them.</li>
<li>On MapLibre the background is not a WMS layer at all — it is the vector-tile style. See <a href="index.html#subpage-jsapi_2_0_0-js-tiles-styles.md">Styles &amp; BeMaputnik</a>.</li>
</ul>

## Usage

### The default background

```js
map.defaultLayers();
```

That single call creates the whole standard stack: a `BACKGROUND` layer plus the
named overlay layers for markers, polylines, polygons, circles and routes. The
background is a `bemap.BemapLayer` pointed at the Context's `geoserver`.

It is **idempotent** — calling it twice does not stack a second opaque background over
your markers.

### Choosing a geoserver

Different geoservers give different cartography and different coverage. Which ones your
account may use is an ACL question, not a code question.

```js
var ctx = new bemap.Context({
    host: 'bemap.benomad.com',
    secure: true,
    geoserver: 'here'          // or 'osm', 'default', …
});
```

To switch at runtime, pre-create the backgrounds and swap:

```js
map.backgroundLayers(['default', 'here']);
map.switchBackgroundLayer('here');
```

Discover what the account actually holds rather than hard-coding a list:

```js
bemap.helpers.listGeoservers(ctx).then(function(list) {
    map.backgroundLayers(list);
});
```

### A custom WMS

```js
var wms = new bemap.WmsLayer({
    name:   'cadastre',
    url:    'https://wms.example.com/geoserver/wms',
    layers: 'cadastre:parcels',
    styles: '',
    format: 'image/png',
    transparent: true
});
map.addLayer(wms);
```

Set `transparent: true` for anything meant to sit **over** the basemap. Without it the
layer is opaque and hides everything below.

### Raster tiles

```js
var raster = new bemap.RasterLayer({
    url:         'https://tiles.example.com/{z}/{x}/{y}.png',
    tileSize:    256,
    opacity:     0.8,
    attribution: '© Example'
});
map.addRasterLayer(raster);        // MapLibre
```

`addRasterLayer` is MapLibre-only. On Leaflet and OpenLayers use `bemap.OsmLayer` with
a URL template and add it through the ordinary `map.addLayer(layer)`.

Respect the attribution terms of whatever tiles you point at — the public OpenStreetMap
tile servers in particular have a usage policy that forbids heavy application traffic.

### Refreshing

WMS tiles are cached by the browser. When the underlying data changes — traffic being
the obvious case — force a reload:

```js
map.refreshLayer(trafficLayer);
```

### Overlay ordering

```js
map.zIndexLayer(layer, 500);       // higher draws on top
map.visibleLayer(layer, false);    // hide without removing
```

## Reference

### `bemap.BemapLayer`

The BeMap WMS basemap.

```js
new bemap.BemapLayer({ name, geoserver, layers, styles, format, transparent })
```

| Option | Type | Notes |
| --- | --- | --- |
| `name` | String | Layer identifier. |
| `geoserver` | String | Which BeMap geoserver renders it. |
| `layers` | String | Comma-separated layer names. Default `'default'`. |
| `styles` | String | Comma-separated style names — `'traffic'` for the live-traffic colouring. |
| `format` | String | Tile MIME type, e.g. `'image/png24'`. |
| `transparent` | Boolean | Set for overlays. |

### `bemap.WmsLayer`

A third-party WMS.

| Option | Type | Notes |
| --- | --- | --- |
| `url` | String | WMS endpoint. |
| `layers` | String | Comma-separated. |
| `styles` | String | Comma-separated. |
| `format` | String | |
| `transparent` | Boolean | |

### `bemap.OsmLayer`

| Option | Type | Notes |
| --- | --- | --- |
| `url` | String | `{z}/{x}/{y}` tile template. |
| `name` | String | |

### `bemap.RasterLayer` — MapLibre

| Option | Type | Default |
| --- | --- | --- |
| `url` | String | — |
| `tileSize` | Number | `256` |
| `opacity` | Number | `1` |
| `attribution` | String | `''` |

### Map methods

| Method | Notes |
| --- | --- |
| `map.defaultLayers(options)` | Creates the standard stack. `{ markerAsCluster: true }` makes the marker layer a cluster layer. |
| `map.defaultOverlayLayers(options)` | The overlay layers only, without a background. |
| `map.backgroundLayers(names, options)` | Pre-create one background per geoserver name. |
| `map.switchBackgroundLayer(name)` | Swap the visible background. |
| `map.addLayer(layer)` / `map.removeLayer(layer)` | |
| `map.addRasterLayer(layer)` | **MapLibre only.** |
| `map.refreshLayer(layer)` | Force a tile reload. |
| `map.visibleLayer(layer, visible)` | |
| `map.zIndexLayer(layer, z)` | |
| `map.getLayerByName(name)` | |

### Default layer names

`bemap.Map.DEFAULT_LAYER.*`

| Constant | Value |
| --- | --- |
| `BACKGROUND` | `'background'` |
| `MARKER` | `'marker'` |
| `POLYLINE` | `'polyline'` |
| `POLYGON` | `'polygon'` |
| `CIRCLE` | `'circle'` |
| `ROUTE` | `'route'` |

## Notes

**MapLibre works differently.** There is no WMS background. The basemap is the vector
tile style, changed with `map.setStyle(...)` or centrally in BeMaputnik. `defaultLayers()`
still creates the overlay layers, and `backgroundLayers()` / `switchBackgroundLayer()`
have no WMS to switch. If you are on MapLibre, [Styles &amp; BeMaputnik](index.html#subpage-jsapi_2_0_0-js-tiles-styles.md)
is the page you want.

**Hillshade.** `map.setHillshade(options)` adds a relief-shading raster overlay, and
`map.removeHillshade()` takes it away. Implemented on **Leaflet and OpenLayers only** —
on MapLibre the call warns *"only available with bemap.MapLibreMap"* and does nothing,
which is exactly backwards. Verified against 2.0.2. On MapLibre, use a terrain-aware
style or `setTerrain` instead.

### Gotchas

- **Calling `defaultLayers()` after adding your own layers.** It is idempotent for the background, but ordering still matters for anything you added by hand. Call it first.
- **A custom WMS overlay hiding the map.** Missing `transparent: true`. This is the single most common WMS mistake.
- **`addRasterLayer` doing nothing on Leaflet/OpenLayers.** It is MapLibre-only and warns once. Use `bemap.OsmLayer` there.
- **`switchBackgroundLayer` to a geoserver the account cannot use.** Produces empty or 403 tiles. Check with `bemap.helpers.listGeoservers(ctx)` first.
- **Stale WMS tiles.** The browser caches them. `refreshLayer()` is the escape hatch; without it a traffic overlay can look frozen.
- **Public OSM tiles in production.** Against the OpenStreetMap Foundation's tile usage policy. Use your own tile server or a commercial provider.

## See also

- [Layers](index.html#subpage-jsapi_2_0_0-js-map-layers.md) — grouping and managing overlays
- [Traffic overlay](index.html#subpage-jsapi_2_0_0-js-mapping-display-traffic.md) — the `styles: 'traffic'` basemap in full
- [Styles &amp; BeMaputnik](index.html#subpage-jsapi_2_0_0-js-tiles-styles.md) — the MapLibre equivalent
- [Geoserver info](index.html#subpage-jsapi_2_0_0-js-geoserver-info.md) — what each geoserver offers
- [ACL service](index.html#subpage-jsapi_2_0_0-js-acl-service.md) — which geoservers your account holds
- [3D &amp; terrain](index.html#subpage-jsapi_2_0_0-js-map-3d.md) — `setTerrain` on MapLibre
