<span class="bemap-tag">Mapping</span>

# Map display with MapLibre — `bemap.MapLibreMap`

<p class="bemap-tagline">BeMap's path to 3D, globe view, vector tiles, heatmap, native clustering, and runtime style swap. The service API stays the same — only the renderer changes.</p>

## Try it

```
{"bemap":{"language":"javascript","mapid":"mapV2_maplibre_demo","run":true,"hide":true}}
var map = new bemap.MapLibreMap(bemapTilesCtx, 'mapV2_maplibre_demo');
bemap['miniweb'].onChangeGeoserver(function(gs) { map.switchBackgroundLayer(gs); });

// move / setPitch / setBearing race the style-loaded state on a fresh
// MapLibre instance. Also patch the BeNomad default style's background
// minzoom so the soft grey-blue paints at country-level zooms instead of
// leaving the canvas transparent.
bemap.docs.whenReady(map, function() {
    try {
        if (map.native.getLayer('background')) {
            map.native.setLayerZoomRange('background', 0, 24);
        }
    } catch (e) {}
    try { map.native._fadeDuration = 50; } catch (e) {}
    map.move(2.5, 46.5, 6);
    map.setPitch(45);
    map.setBearing(-15);
});
```
<p class="bemap-demo-caption">Always MapLibre on this page, with a 45° pitch and -15° bearing for a 3D view of France.<span data-right="ROLE_MAPPING and ROLE_MAPPING_MPTILES"> The basemap is drawn from BeNomad vector tiles via <code>bemapTilesCtx</code>, whose <code>tilesHost</code> the portal resolves at startup.</span> The sidebar engine selector doesn't apply here.</p>

## At a glance

<ul class="bemap-glance">
<li>Class: <code>bemap.MapLibreMap(ctx, target, options?)</code>.</li>
<li>Vector-tile renderer — needs <code>maplibre-gl.js</code> loaded before <code>bemap-js-api.js</code>.</li>
<li data-right="ROLE_MAPPING and ROLE_MAPPING_MPTILES">BeNomad vector tiles: set <code>ctx.tilesHost</code> and load <code>pmtiles.js</code> — see <a href="index.html#subpage-jsapi_2_0_0-js-tiles-web-pmtiles.md">Web — PMTiles</a>.</li>
<li>MapLibre-only: 3D pitch, bearing, globe projection, sky, terrain, 3D buildings, heatmap, native clustering, route animation, runtime style swap.</li>
<li>Calling MapLibre-only methods on Leaflet / OL rejects with <code>bemap.Error.MAPLIBRE_ONLY</code>.</li>
</ul>

## Usage

```html
<link rel="stylesheet" href="dist/maplibre-gl.css">
<link rel="stylesheet" href="dist/bemap-js-api.css">
<script src="dist/maplibre-gl.js"></script>
<script src="dist/bemap-js-api.min.js"></script>

<div id="map" style="height:500px;"></div>
```

<div data-right="ROLE_MAPPING and ROLE_MAPPING_MPTILES">

<p>Rendering with BeNomad vector tiles? Add <code>pmtiles.js</code> before the library:</p>

```html
<script src="dist/pmtiles.js"></script>
```

</div>

```js
var ctx = new bemap.Context({
    login: 'your-login',
    password: 'your-password',
    host: 'bemap-beta.benomad.com',
    secure: true,
    geoserver: 'here'
});

var map = new bemap.MapLibreMap(ctx, 'map', {
    pitch: 45,
    bearing: 0,
    projection: 'mercator'
}).move(2.5, 46.5, 6);
```

<div data-right="ROLE_MAPPING and ROLE_MAPPING_MPTILES">

<p>Then point the Context at the tiles host — one more field:</p>

```js
    // REQUIRED for BeNomad vector tiles; bemap.TilesAuth uses login + password
    // to fetch a JWT from `tilesHost/api/login` and injects it on every range request.
    // Without tilesHost, MapLibre falls back to an empty background.
    tilesHost: 'mptiles-api.benomad.net'
```

<blockquote><p><strong>Portal note.</strong> The portal's <code>bemapMainCtx</code> ships <strong>without</strong> <code>tilesHost</code> / <code>login</code> / <code>password</code> because adding Basic-auth creds would log the user out of the BGIS session. The MapLibre demos on this site render the WMS fallback rather than BeNomad vector tiles. Customers deploying their own app see the full vector-tile experience by setting the three fields above.</p></blockquote>

</div>

### MapLibre-only features

```js
// 3D + globe
map.setPitch(60);
map.setBearing(-20);
map.setProjection('globe');
map.setSky({ 'sky-type': 'atmosphere', 'sky-color': '#88c6ff', 'fog-color': '#a3c8ff' });

// Heatmap
var hl = new bemap.HeatmapLayer({ radius: 25, intensity: 1 });
map.addHeatmap(hl);
map.updateHeatmap(hl, geoJsonFeatureCollection);

// Native GeoJSON clustering
var cluster = new bemap.ClusterLayer({ radius: 40, maxZoom: 14 });
map.addClusterPoints(cluster, arrayOfCoordinates);
```

## Reference

### Constructor

```js
new bemap.MapLibreMap(context, target, options?)
```

### Options

<table>
<thead><tr><th>Option</th><th>Default</th><th>Notes</th></tr></thead>
<tbody>
<tr><td><code>zoom</code></td><td><code>2</code></td><td>Initial zoom level.</td></tr>
<tr><td><code>pitch</code></td><td><code>0</code></td><td>Camera tilt 0–85°. <strong>MapLibre only.</strong></td></tr>
<tr><td><code>bearing</code></td><td><code>0</code></td><td>Map rotation. <strong>MapLibre only.</strong></td></tr>
<tr><td><code>minZoom</code> / <code>maxZoom</code></td><td><code>0</code> / <code>22</code></td><td></td></tr>
<tr><td><code>maxBounds</code></td><td><code>null</code></td><td><code>[[swLon, swLat], [neLon, neLat]]</code>.</td></tr>
<tr><td><code>projection</code></td><td><code>'mercator'</code></td><td><code>'globe'</code> for 3D globe. <strong>MapLibre only.</strong></td></tr>
<tr><td><code>style</code></td><td><code>null</code></td><td>MapLibre style spec or URL. If omitted, BeMap loads a minimal background.</td></tr>
<tr data-right="ROLE_MAPPING and ROLE_MAPPING_MPTILES"><td><code>tiles</code></td><td><code>null</code></td><td>PMTiles URL. See <a href="index.html#subpage-jsapi_2_0_0-js-tiles-web-pmtiles.md">Web — PMTiles</a>.</td></tr>
<tr data-right="ROLE_MAPPING and ROLE_MAPPING_MPTILES"><td><code>tilesStyle</code></td><td><code>null</code></td><td>Style URL loaded async after tile init.</td></tr>
<tr><td><code>nativeAttribution</code></td><td><code>!attribution</code></td><td>Show MapLibre's <code>.maplibregl-ctrl-attrib</code>.</td></tr>
<tr><td><code>zoomControl</code></td><td><code>'top-left'</code></td><td><code>false</code> / <code>true</code> / position string / <code>{ position }</code>.</td></tr>
<tr><td><code>attribution</code></td><td><code>true</code></td><td>Enable <code>bemap.AttributionWidget</code>.</td></tr>
<tr><td><code>browserCache</code></td><td><code>'auto'</code></td><td>Service-Worker tile cache.</td></tr>
<tr><td><code>serviceWorkerPath</code></td><td><code>'/bemap-sw-tiles.js'</code></td><td></td></tr>
</tbody>
</table>

### MapLibre-only methods

<table>
<thead><tr><th>Feature</th><th>Method</th></tr></thead>
<tbody>
<tr><td>3D pitch</td><td><code>map.setPitch(degrees)</code></td></tr>
<tr><td>Bearing</td><td><code>map.setBearing(degrees)</code></td></tr>
<tr><td>Globe projection</td><td><code>map.setProjection('globe' | 'mercator')</code></td></tr>
<tr><td>Sky / atmosphere</td><td><code>map.setSky(opts)</code> — call <code>map.setSky()</code> with no argument to remove</td></tr>
<tr><td>3D terrain</td><td><code>map.setTerrain(opts)</code> / <code>map.removeTerrain()</code></td></tr>
<tr><td>3D buildings</td><td><code>map.add3DBuildings(opts)</code> / <code>map.remove3DBuildings()</code></td></tr>
<tr><td>Heatmap</td><td><code>map.addHeatmap</code>, <code>updateHeatmap</code>, <code>removeHeatmap</code></td></tr>
<tr><td>Native clustering</td><td><code>map.addClusterPoints(layer, points, opts)</code></td></tr>
<tr><td>Route animation</td><td><code>map.animateAlongRoute(opts)</code></td></tr>
<tr data-right="ROLE_MAPPING and ROLE_MAPPING_MPTILES"><td>Vector tiles (PMTiles)</td><td><code>map.loadPMTiles(layer, cb)</code></td></tr>
<tr><td>Runtime style swap</td><td><code>map.setStyle(spec)</code> — overlays replayed via overlay catalogue</td></tr>
</tbody>
</table>

## Notes

### Gotchas

<ul>
<li><strong>Globe projection is not persisted across style reloads.</strong> After a manual <code>setStyle()</code><span data-right="ROLE_MAPPING and ROLE_MAPPING_MPTILES"> (or auto-reload triggered by JWT renewal)</span>, re-call <code>map.setProjection('globe')</code>.</li>
<li data-right="ROLE_MAPPING and ROLE_MAPPING_MPTILES"><strong>Async style loading shows a brief blank background</strong> when you pass <code>tilesStyle</code>. Add your own loading UI if it matters.</li>
<li><strong>Overlays survive <code>setStyle()</code></strong> when added via <code>bemap.*</code> model classes — they're tracked in <code>map._overlayCatalog</code>. Custom MapLibre layers added directly to the native map are wiped.</li>
<li><strong>HTTPS or <code>localhost</code> required</strong> for the browser cache (Service Worker security restriction).</li>
<li><strong>Engine events translated for you</strong> — <code>bemap.Map.EventType.CLICK</code> maps to MapLibre <code>'click'</code>, OL <code>'singleclick'</code>, Leaflet <code>'click'</code>.</li>
</ul>

### Live demos in the ZIP

The full set ships with the library — see [the GitHub repository](https://github.com/BeNomadSAS/bemap-js-api):

<table>
<thead><tr><th>Demo file</th><th>Shows</th></tr></thead>
<tbody>
<tr><td><code>examples/example-maplibre-00.html</code></td><td>Markers, polylines, popups, click events.</td></tr>
<tr><td><code>examples/example-maplibre-3d.html</code></td><td>Globe ↔ mercator, pitch, bearing, sun-position.</td></tr>
<tr><td><code>examples/example-maplibre-animation.html</code></td><td><code>animateAlongRoute()</code> Paris → Monaco.</td></tr>
<tr><td><code>examples/example-maplibre-clustering.html</code></td><td>2 000-point native GeoJSON clustering.</td></tr>
<tr><td><code>examples/example-maplibre-heatmap.html</code></td><td>500-point heatmap, radius / intensity sliders.</td></tr>
<tr data-right="ROLE_MAPPING and ROLE_MAPPING_MPTILES"><td><code>examples/example-maplibre-satellite.html</code></td><td>BeNomad Tiles + Esri imagery overlay.</td></tr>
</tbody>
</table>

## See also

<ul>
<li data-right="ROLE_MAPPING and ROLE_MAPPING_MPTILES"><a href="index.html#subpage-jsapi_2_0_0-js-tiles-web-pmtiles.md">Web — PMTiles</a></li>
<li><a href="index.html#subpage-jsapi_2_0_0-js-map-attribution.md">Attribution widget</a></li>
<li><a href="index.html#subpage-jsapi_2_0_0-js-map-markers.md">Markers</a>, <a href="index.html#subpage-jsapi_2_0_0-js-map-shapes.md">Polyline</a>, <a href="index.html#subpage-jsapi_2_0_0-js-map-popup.md">Popup</a>, <a href="index.html#subpage-jsapi_2_0_0-js-map-layers.md">Layers</a></li>
<li><a href="index.html#subpage-jsapi_2_0_0-js-map-leaflet.md">Display map (Leaflet)</a>, <a href="index.html#subpage-jsapi_2_0_0-js-map-openlayers.md">(OpenLayers)</a> — when 3D / vector tiles aren't needed</li>
</ul>
