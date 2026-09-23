<span class="bemap-tag">Mapping</span>

# Choosing an engine

<p class="bemap-tagline">One API, three renderers. <code>bemap.LeafletMap</code>, <code>bemap.OlMap</code> and <code>bemap.MapLibreMap</code> take the same Context and answer the same calls — but they are not interchangeable, and this page says exactly where they diverge.</p>

<div class="bemap-callout">
<strong>New application? Use <code>bemap.MapLibreMap</code>.</strong> It is the only engine with vector tiles, 3D, globe, native clustering, client-side styling and the browser tile cache. The other two remain fully supported for existing WMS deployments.
</div>

## Try it

The same demo, on whichever engine the selector above the map is set to. Switch it and
watch the code stay identical.

```
{"bemap":{"language":"javascript","mapid":"mapV2_engines","run":true,"hide":true}}
$(document).ready(function() {
    bemap.docs.attachDemo('mapV2_engines', {
        onMapReady: function(map, engine) {
            map.defaultLayers().move(2.35, 48.85, 11);

            // Everything below is engine-agnostic: identical source on
            // Leaflet, OpenLayers and MapLibre.
            map.addMarker(new bemap.Marker(new bemap.Coordinate(2.3522, 48.8566)));

            var el = document.getElementById('mapV2_engines_engine');
            if (el) el.textContent = engine;
        }
    });
});
```

<p class="bemap-demo-caption">Rendering with: <b><span id="mapV2_engines_engine">…</span></b>. The marker, the centring and the default layers are the same three calls on every engine — only the renderer underneath changes.</p>

## At a glance

<ul class="bemap-glance">
<li><code>bemap.LeafletMap</code> — lightest, raster/WMS, huge plugin ecosystem. Leaflet 1.9.</li>
<li><code>bemap.OlMap</code> — richest 2D feature set, projections, precise vector handling. OpenLayers 10.</li>
<li><code>bemap.MapLibreMap</code> — vector tiles, 3D, globe, GPU rendering. MapLibre GL 5. <span data-right="ROLE_MAPPING and ROLE_MAPPING_MPTILES"><strong>The only engine that supports BeNomad Tiles.</strong></span></li>
<li>The shared surface is <code>bemap.Map</code>: <strong>113 methods</strong>. Leaflet implements 73, OpenLayers 91, MapLibre all of them plus extras.</li>
<li><strong>34 methods are MapLibre-only.</strong> None of them throw on the other engines: 25 warn once, the remaining 9 fail <em>silently</em>.</li>
<li>Swapping engines is a one-line change: the constructor. Everything else is portable, within the limits below.</li>
</ul>

## Usage

### Constructing

All three take the same two arguments — a Context and the id of a container element.

```js
var map = new bemap.LeafletMap(ctx, 'map');    // Leaflet
var map = new bemap.OlMap(ctx, 'map');         // OpenLayers
var map = new bemap.MapLibreMap(ctx, 'map');   // MapLibre
```

Each needs its own peer library on the page — see [Install &amp; setup](index.html#subpage-jsapi_2_0_0-install.md).
`bemap.Ol3Map` is the legacy alias kept for v1 compatibility; new code should use
`bemap.OlMap`.

### Writing portable code

Stay inside the shared surface and your application runs unchanged on all three:

```js
map.defaultLayers()
   .move(2.35, 48.85, 11);

map.addMarker(new bemap.Marker(coord));
map.addPolyline(new bemap.Polyline(coords));
map.addPopup(popup);
map.on(bemap.Map.EventType.CLICK, function(evt) { /* … */ });
```

Cameras, layers, markers, polylines, polygons, circles, popups, events and drawing are
all common ground.

### When you need a MapLibre-only feature

Feature-detect rather than assuming. The engine you built is knowable at runtime:

```js
if (map instanceof bemap.MapLibreMap) {
    map.setProjection('globe');
    map.add3DBuildings();
}
```

`instanceof` is the reliable test. The library also logs a one-time
`console.warn` naming the method when you call an unsupported one, which is how you
find these during development — but there is no public API to subscribe to that
notification programmatically in 2.0.2. See
[Map errors](index.html#subpage-jsapi_2_0_0-js-map-events.md).

## Reference

### Capability matrix

Counts and classifications below are read from the shipping 2.0.2 bundle, not from prose.

<table>
<thead><tr><th>Capability</th><th>Leaflet</th><th>OpenLayers</th><th>MapLibre</th></tr></thead>
<tbody>
<tr><td>WMS / raster basemaps</td><td>yes</td><td>yes</td><td>yes</td></tr>
<tr><td>Markers, polylines, polygons, circles, popups</td><td>yes</td><td>yes</td><td>yes</td></tr>
<tr><td>Interactive drawing &amp; editing</td><td>yes</td><td>yes</td><td>yes</td></tr>
<tr><td>Marker clustering</td><td>via plugin</td><td>yes</td><td>native</td></tr>
<tr><td>Heatmap</td><td>via plugin</td><td>yes</td><td>native</td></tr>
<tr><td>Camera: <code>move</code>, <code>flyTo</code>, <code>easeTo</code>, <code>jumpTo</code></td><td>yes</td><td>yes</td><td>yes</td></tr>
<tr><td>Rotation / bearing</td><td>yes</td><td>yes</td><td>yes</td></tr>
<tr><td>Pitch (tilt)</td><td>limited</td><td>limited</td><td>yes</td></tr>
<tr data-right="ROLE_MAPPING and ROLE_MAPPING_MPTILES"><td><strong>BeNomad Tiles (PMTiles)</strong></td><td>no</td><td>no</td><td><strong>yes</strong></td></tr>
<tr><td><strong>3D buildings, terrain, sky, light</strong></td><td>no</td><td>no</td><td><strong>yes</strong></td></tr>
<tr><td><strong>Globe projection</strong></td><td>no</td><td>no</td><td><strong>yes</strong></td></tr>
<tr><td><strong>Client-side style mutation</strong> (<code>setPaintProperty</code>, <code>setFilter</code>, …)</td><td>no</td><td>no</td><td><strong>yes</strong></td></tr>
<tr><td><strong>Browser tile cache</strong></td><td>no</td><td>no</td><td><strong>yes</strong></td></tr>
<tr><td>Hillshade</td><td>yes</td><td>yes</td><td><strong>no</strong> — see below</td></tr>
</tbody>
</table>

### The 34 MapLibre-only methods

None of these throw on `LeafletMap` or `OlMap` — your code does not crash. But they
split into two groups with very different debugging stories, and the second one is the
reason this section exists.

**25 that warn once.** The base class routes them through a guard that prints a
one-time `console.warn` naming the method. It also builds a `bemap.Error` with code
`MAPLIBRE_ONLY`, but 2.0.2 offers no public way to receive it, so the console line is
the signal you actually get.

<table>
<thead><tr><th>Area</th><th>Methods</th></tr></thead>
<tbody>
<tr data-right="ROLE_MAPPING and ROLE_MAPPING_MPTILES"><td>BeNomad Tiles</td><td><code>loadPMTiles</code>, <code>loadBeMapTiles</code>, <code>getToken</code>, <code>isTokenValid</code>, <code>refreshToken</code></td></tr>
<tr><td>Browser cache</td><td><code>enableBrowserCache</code>, <code>disableBrowserCache</code>, <code>getBrowserCacheStats</code>, <code>clearBrowserCache</code></td></tr>
<tr><td>3D</td><td><code>add3DBuildings</code>, <code>remove3DBuildings</code>, <code>setLight</code></td></tr>
<tr><td>Globe</td><td><code>spinGlobe</code>, <code>stopSpinGlobe</code></td></tr>
<tr><td>Animation</td><td><code>animateLine</code>, <code>animateCameraOrbit</code>, <code>animatePulse</code></td></tr>
</tbody>
</table>
| Style mutation | `setPaintProperty`, `setLayoutProperty`, `setFilter`, `setLayerZoomRange` |
| Layers | `addRasterLayer`, `addClusterPoints`, `updateHeatmap` |
| Camera | `setPitch` |

**9 that fail silently.** No warning, no error, no return value to test — the call
simply does nothing. These are the ones that cost an afternoon.

| Area | Methods |
| --- | --- |
| Projection | `setProjection` |
| Terrain &amp; sky | `setTerrain`, `removeTerrain`, `setSky` |
| GeoJSON sources | `addGeoJsonSource`, `updateGeoJsonSource` |
| Sprites | `addImage`, `removeImage` |
| Feature query | `queryRenderedFeatures` |

Guard with `map instanceof bemap.MapLibreMap` rather than relying on the console.

### Methods that exist everywhere but behave differently

These are implemented on all three engines with real — not stub — code, but the
signature or the requirements differ. Read the linked page before relying on them
cross-engine.

| Method | Divergence |
| --- | --- |
| `addHeatmap` | MapLibre takes a `bemap.HeatmapLayer`; Leaflet and OpenLayers take a raw data array plus options. See [Heatmap](index.html#subpage-jsapi_2_0_0-js-map-heatmap.md). |
| `removeHeatmap` | MapLibre takes the layer; the other two take an id. |
| `animateAlongRoute` | Implemented on all three, with engine-specific smoothness. |
| `cameraTour` | Implemented on all three. |
| `setHillshade` / `removeHillshade` | Implemented on Leaflet and OpenLayers only — **not** on MapLibre. |

### Engine-specific extras

Present on one or two engines and absent from the shared `bemap.Map` surface.

| Method | Engines |
| --- | --- |
| `setKeyboard` / `getKeyboard` | Leaflet, OpenLayers, MapLibre |
| `removeListener` | Leaflet, OpenLayers, MapLibre |
| `fetchAvailableMaps`, `fetchAvailableStyles`, `fetchDefaultMap`, `fetchDefaultStyle` | **MapLibre only in practice.** Defined on all three, but the Leaflet and OpenLayers versions return a *rejected* promise with code `MAPLIBRE_ONLY` — attach a `.catch()` or you get an unhandled rejection. |
| `getXYFromCoordinate` | OpenLayers only |
| `buildTextStyle`, `buildPolygonStyle`, `buildCircleStyle` | **OpenLayers only in practice.** MapLibre defines them as no-ops that ignore their arguments; Leaflet does not define them at all. |
| `getStyle`, `getTilesConfig`, `setTilesSliceMode`, `setTileGateActive` | MapLibre only |
| `onCacheStats` / `offCacheStats` | MapLibre only |

## Notes

**How the fallback works.** `bemap.Map` declares every method. Where an engine cannot
implement one, the base class version calls an internal guard that warns exactly once
per method per map instance and builds a `bemap.Error` with code `MAPLIBRE_ONLY`. The
design choice is deliberate: a portable application degrades instead of breaking, and
the developer still gets a clear signal in the console. Note that the console warning is
in practice the only signal — 2.0.2 has no public subscription for that internal error
channel.

**`setHillshade` on MapLibre.** Leaflet and OpenLayers both implement hillshade;
MapLibre does not, so it falls through to the base-class guard and emits
*"setHillshade() is only available with bemap.MapLibreMap"* — a message that is exactly
backwards for this method. Verified against 2.0.2. Treat hillshade as unavailable on
MapLibre and use a raster overlay or a terrain-aware style instead.

**Leaflet plugin dependencies.** `addHeatmap` on Leaflet needs `L.heatLayer` from the
`leaflet.heat` plugin; without it the call warns and no-ops. Clustering needs
`leaflet.markercluster`, drawing needs `leaflet.draw`. Both ship in the package.

### Gotchas

- **Assuming MapLibre-only calls throw.** They do not. A missing globe on Leaflet produces one console warning and otherwise silent success. There is no public event to subscribe to, so guard with `instanceof` rather than expecting to be told at runtime.
- **`bemap.Ol3Map` vs `bemap.OlMap`.** The former is the v1-compatibility alias. Both exist; prefer `OlMap`.
- **Switching engines with a stale container.** Tearing down and rebuilding into the same `<div>` needs the previous map's `remove()` called first, or the new engine inherits leftover DOM and classes.
- **Expecting pitch to work on Leaflet.** `setPitch` exists on Leaflet and OpenLayers but a 2D renderer cannot really tilt; the effect is limited. Real pitch is MapLibre.
- **Counting on a plugin being loaded.** The MapLibre-only guard is not the same thing as a missing Leaflet plugin — the latter also warns, but only at call time and only from the engine's own code.

## See also

<ul>
<li><a href="index.html#subpage-jsapi_2_0_0-js-map-leaflet.md">Display map (Leaflet)</a></li>
<li><a href="index.html#subpage-jsapi_2_0_0-js-map-openlayers.md">Display map (OpenLayers)</a></li>
<li><a href="index.html#subpage-jsapi_2_0_0-js-map-maplibre.md">Display map (MapLibre)</a></li>
<li><a href="index.html#subpage-jsapi_2_0_0-install.md">Install &amp; setup</a> — the peer library each engine needs</li>
<li><a href="index.html#subpage-jsapi_2_0_0-js-map-camera.md">Camera &amp; viewport</a></li>
<li><a href="index.html#subpage-jsapi_2_0_0-error-handling.md">Error handling</a> — the <code>MAPLIBRE_ONLY</code> code and the error channels</li>
<li data-right="ROLE_MAPPING and ROLE_MAPPING_MPTILES"><a href="index.html#subpage-jsapi_2_0_0-js-tiles-overview.md">BeNomad Tiles — overview</a> — MapLibre only</li>
</ul>
