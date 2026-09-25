<span class="bemap-tag">Mapping</span>

# Map display with Leaflet — `bemap.LeafletMap`

<p class="bemap-tagline">The lightest map engine BeMap ships. 2D, DOM-overlay markers, ideal for raster basemaps. For 3D / globe / vector tiles, see <a href="index.html#subpage-jsapi_2_0_0-js-map-maplibre.md">MapLibre</a>.</p>

## Try it

```
{"bemap":{"language":"javascript","mapid":"mapV2_leaflet","run":true,"hide":true}}
var miniweb = bemap['miniweb'];
var map = new bemap.LeafletMap(bemapMainCtx, 'mapV2_leaflet')
    .backgroundLayers(miniweb.getGeoservers())
    .defaultOverlayLayers()
    .move(2.5, 46.5, 6);
map.switchBackgroundLayer(miniweb.getGeoserver());
map.addMarker(new bemap.Marker(new bemap.Coordinate(2.35, 48.85)));

miniweb.onChangeGeoserver(function(geoserver) {
    map.switchBackgroundLayer(geoserver);
});
```
<p class="bemap-demo-caption">Always Leaflet on this page — the sidebar engine selector doesn't apply here. To see OpenLayers or MapLibre, open their dedicated pages.</p>

## At a glance

<ul class="bemap-glance">
<li>Class: <code>bemap.LeafletMap(ctx, target, options?)</code>.</li>
<li>Default basemap: <code>.defaultLayers()</code> registers the WMS layers from the active geoserver.</li>
<li>Same overlay API as OL / MapLibre: <code>addMarker</code>, <code>addPolyline</code>, <code>addPolygon</code>, <code>addPopup</code>.</li>
<li>Native attribution: <code>.leaflet-control-attribution</code> shown alongside <code>bemap.AttributionWidget</code> by default — see <a href="index.html#subpage-jsapi_2_0_0-js-map-attribution.md">Attribution widget</a>.</li>
<li>2D only. Need 3D / globe / vector tiles? Use <a href="index.html#subpage-jsapi_2_0_0-js-map-maplibre.md">MapLibre</a>.</li>
</ul>

## Usage

```html
<link rel="stylesheet" href="dist/leaflet.css">
<link rel="stylesheet" href="dist/bemap-js-api.css">
<script src="dist/leaflet.js"></script>
<script src="dist/bemap-js-api.min.js"></script>

<div id="map" style="height:500px;"></div>
```

```js
var ctx = new bemap.Context({
    login: 'your-login',
    password: 'your-password',
    host: 'bemap-beta.benomad.com',
    secure: true,
    geoserver: 'here'
});

var map = new bemap.LeafletMap(ctx, 'map')
    .defaultLayers()
    .move(2.5, 46.5, 6);          // centre of France

// Markers, polylines, popups — engine-agnostic
map.addMarker(new bemap.Marker(new bemap.Coordinate(2.35, 48.85)));
```

### Switching basemap

```js
map.switchBackgroundLayer('osm');
```

### Listening to clicks

```js
map.on(bemap.Map.EventType.CLICK, function(ev) {
    console.log('clicked:', ev.coordinate);
});
```

## Reference

### Constructor

```js
new bemap.LeafletMap(context, target, options?)
```

| Option | Default | Notes |
| --- | --- | --- |
| `attribution` | `true` | Enable the BeMap `AttributionWidget` — see [Attribution widget](index.html#subpage-jsapi_2_0_0-js-map-attribution.md). |
| `nativeAttribution` | `true` for Leaflet | Show / hide Leaflet's `.leaflet-control-attribution` flag. |
| `zoomControl` | `'top-left'` | `false` / `true` / position string / `{ position }`. |

### Common methods (all map engines)

| Method | Notes |
| --- | --- |
| `map.defaultLayers()` | Register the WMS basemaps from the active geoserver. Chainable. |
| `map.move(lon, lat, zoom)` | |
| `map.switchBackgroundLayer(name)` | |
| `map.addMarker(marker, opts?)`, `removeMarker(marker)` | |
| `map.addPolyline(p, opts?)`, `removePolyline(p)` | |
| `map.addPolygon(p, opts?)`, `removePolygon(p)` | |
| `map.addPopup(p)`, `removePopup(p)`, `clearPopup()` | |
| `map.addLayer(layer)`, `removeLayer(layer)`, `refreshLayer(layer)` | |
| `map.on(EventType, callback)` | |

### Events

| Event | Payload |
| --- | --- |
| `bemap.Map.EventType.CLICK` | `{ coordinate, bemapObject? }` |
| `bemap.Map.EventType.MOVEEND` | |
| `bemap.Map.EventType.DRAG` | |

## See also

- [Display map (OpenLayers)](index.html#subpage-jsapi_2_0_0-js-map-openlayers.md)
- [Display map (MapLibre)](index.html#subpage-jsapi_2_0_0-js-map-maplibre.md) — for 3D / globe / vector tiles
- [Attribution widget](index.html#subpage-jsapi_2_0_0-js-map-attribution.md)
- [Markers](index.html#subpage-jsapi_2_0_0-js-map-markers.md), [Polyline](index.html#subpage-jsapi_2_0_0-js-map-shapes.md), [Popup](index.html#subpage-jsapi_2_0_0-js-map-popup.md), [Layers](index.html#subpage-jsapi_2_0_0-js-map-layers.md)
