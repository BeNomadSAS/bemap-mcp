<span class="bemap-tag">Mapping</span>

# Map display with OpenLayers — `bemap.OlMap`

<p class="bemap-tagline">2D map engine with rich vector-layer styling. Same overlay + service API as Leaflet and MapLibre — switch only the map constructor.</p>

## Try it

```
{"bemap":{"language":"javascript","mapid":"mapV2_ol_demo","run":true,"hide":true}}
var map = new bemap.OlMap(bemapMainCtx, 'mapV2_ol_demo')
    .defaultLayers()
    .move(2.5, 46.5, 6);
map.addMarker(new bemap.Marker(new bemap.Coordinate(2.35, 48.85)));
```
<p class="bemap-demo-caption">Always OpenLayers on this page — the sidebar engine selector doesn't apply here. To see Leaflet or MapLibre, open their dedicated pages.</p>

## At a glance

<ul class="bemap-glance">
<li>Class: <code>bemap.OlMap(ctx, target, options?)</code>.</li>
<li>Same overlay + service API as <a href="index.html#subpage-jsapi_2_0_0-js-map-leaflet.md">Leaflet</a> / <a href="index.html#subpage-jsapi_2_0_0-js-map-maplibre.md">MapLibre</a> — swap the constructor, keep the rest.</li>
<li>Native attribution: <code>.ol-attribution</code> hidden by default when <code>bemap.AttributionWidget</code> is on.</li>
<li>2D only. Need 3D / globe / vector tiles? Use <a href="index.html#subpage-jsapi_2_0_0-js-map-maplibre.md">MapLibre</a>.</li>
</ul>

## Usage

```html
<link rel="stylesheet" href="dist/ol.css">
<link rel="stylesheet" href="dist/bemap-js-api.css">
<script src="dist/ol.js"></script>
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

var map = new bemap.OlMap(ctx, 'map')
    .defaultLayers()
    .move(2.5, 46.5, 6);
```

### Engine-agnostic overlays

```js
// Same code as Leaflet — see Markers / Polyline / Popup pages
map.addMarker(new bemap.Marker(new bemap.Coordinate(2.35, 48.85)));
map.addPolyline(new bemap.Polyline([...], { style: new bemap.LineStyle({...}) }));
```

### Switch from Leaflet → OL

```js
// var map = new bemap.LeafletMap(ctx, 'map');
   var map = new bemap.OlMap(ctx, 'map');
// Everything else — addMarker, addPolyline, service calls — unchanged.
```

## Reference

### Constructor

```js
new bemap.OlMap(context, target, options?)
```

| Option | Default | Notes |
| --- | --- | --- |
| `attribution` | `true` | Enable the BeMap `AttributionWidget`. See [Attribution widget](index.html#subpage-jsapi_2_0_0-js-map-attribution.md). |
| `nativeAttribution` | `false` when the widget is on; else `true` | Show / hide OL's own `.ol-attribution`. |
| `zoomControl` | `'top-left'` | `false` / `true` / position string / `{ position }`. |

Shared overlay methods: see [Leaflet — Reference](index.html#subpage-jsapi_2_0_0-js-map-leaflet.md#reference).

## See also

- [Display map (Leaflet)](index.html#subpage-jsapi_2_0_0-js-map-leaflet.md)
- [Display map (MapLibre)](index.html#subpage-jsapi_2_0_0-js-map-maplibre.md) — for 3D / globe / vector tiles
- [Attribution widget](index.html#subpage-jsapi_2_0_0-js-map-attribution.md)
- [Markers](index.html#subpage-jsapi_2_0_0-js-map-markers.md), [Polyline](index.html#subpage-jsapi_2_0_0-js-map-shapes.md), [Popup](index.html#subpage-jsapi_2_0_0-js-map-popup.md), [Layers](index.html#subpage-jsapi_2_0_0-js-map-layers.md)
