# Map display using BeMap JS API

Same API, three engines. The BeMap JS API ships three engine classes — `bemap.LeafletMap`, `bemap.OlMap`, `bemap.MapLibreMap` — you can plug interchangeably onto a BeMap deployment. The overlay API (`addMarker`, `addPolyline`, `addPopup`, `addLayer`) is identical across all three.

The three demos below all build the same map (France at zoom 6 + a marker on Paris) — only the constructor changes.

## Leaflet

```
{"bemap":{"language":"javascript","mapid":"mapBemapApi_leaflet","run":true,"hide":false}}
$(document).ready(function() {
    var map = new bemap.LeafletMap(bemapMainCtx, 'mapBemapApi_leaflet')
        .defaultLayers()
        .move(2.5, 46.5, 6);

    map.addMarker(new bemap.Marker(new bemap.Coordinate(2.35, 48.85)));
});
```

## OpenLayers

```
{"bemap":{"language":"javascript","mapid":"mapBemapApi_ol","run":true,"hide":false}}
$(document).ready(function() {
    var map = new bemap.OlMap(bemapMainCtx, 'mapBemapApi_ol')
        .defaultLayers()
        .move(2.5, 46.5, 6);

    map.addMarker(new bemap.Marker(new bemap.Coordinate(2.35, 48.85)));
});
```

## MapLibre

`bemap.MapLibreMap` uses BeNomad **vector tiles** (PMTiles) instead of WMS raster — set `tilesHost` on the Context and the lib handles the JWT + PMTiles fetch + tile cache. The demo below uses `bemapTilesCtx` (declared in `context.js`); the portal fills in its `tilesHost` at startup from the BeMap session. Customer applications use the production host `mptiles-api.benomad.net`. For 3D / globe / atmosphere / animation knobs see the [dedicated MapLibre playground](index.html#page-examples-mapping-display-maplibre.md).

```
{"bemap":{"language":"javascript","mapid":"mapBemapApi_ml","run":true,"hide":false}}
$(document).ready(function() {
    // bemapTilesCtx carries tilesHost so MapLibre renders BeNomad vector
    // tiles. Use bemapMainCtx if you want the WMS raster fallback instead.
    var map = new bemap.MapLibreMap(bemapTilesCtx, 'mapBemapApi_ml');

    // MapLibre defers source/layer ops until the style is loaded —
    // bemap.docs.whenReady wraps that with a 250 ms safety net for
    // cached style.json resolves that don't re-fire the 'load' event.
    bemap.docs.whenReady(map, function() {
        map.move(2.5, 46.5, 6);
        map.addMarker(new bemap.Marker(new bemap.Coordinate(2.35, 48.85)));
    });
});
```

## What the three demos prove

- **One overlay API.** `map.addMarker(marker)` works the same on every engine. Same for `addPolyline`, `addPolygon`, `addPopup`, `addLayer`, `removeMarker`, `setVisible`, `on(EventType.CLICK, fn)`, …
- **One Context.** All three demos use the same `bemapMainCtx` — credentials, host, and active geoserver live in one place.
- **One service surface.** Promise-based services (`bemap.RoutingV2`, `bemap.Geocoder`, `bemap.NearPoiSearch`, …) work against any map — see [Quick start](index.html#subpage-jsapi_2_0_0-quick-start.md).

## HTML

Include the engine bundle that matches the class you instantiate. Loading all three is fine for a playground; production apps load only the one they use.

```
{"bemap":{"language":"xml"}}
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>

    <!-- Engine bundles — pick the one(s) you need -->
    <link rel="stylesheet" href="dist/leaflet.css">
    <link rel="stylesheet" href="dist/ol.css">
    <link rel="stylesheet" href="dist/maplibre-gl.css">
    <link rel="stylesheet" href="dist/bemap-js-api.css">

    <script src="dist/leaflet.js"></script>
    <script src="dist/ol.js"></script>
    <script src="dist/maplibre-gl.js"></script>
    <script src="dist/pmtiles.js"></script>     <!-- Only needed for MapLibre + BeNomad vector tiles -->

    <script src="dist/bemap-js-api.min.js"></script>
    <script src="context.js"></script>
</head>
<body>
    <div id="map_leaflet"  style="height: 400px;"></div>
    <div id="map_ol"       style="height: 400px;"></div>
    <div id="map_maplibre" style="height: 400px;"></div>
</body>
</html>
```

## See also

- [`bemap.LeafletMap` reference](index.html#subpage-jsapi_2_0_0-js-map-leaflet.md) — constructor, methods, events.
- [`bemap.OlMap` reference](index.html#subpage-jsapi_2_0_0-js-map-openlayers.md).
- [`bemap.MapLibreMap` reference](index.html#subpage-jsapi_2_0_0-js-map-maplibre.md) — 3D, globe, vector tiles.
- [3D map with MapLibre + BeNomad vector tiles](index.html#page-examples-mapping-display-maplibre.md) — the dedicated MapLibre playground with PMTiles + browser cache.
- [The Context](index.html#subpage-jsapi_2_0_0-the-context.md) — `bemapMainCtx`, `bemapTilesCtx`, per-call overrides.
- BeMap WMS — [WMS 1.1.1](index.html#page-mapping-wms-1-1-1-getmap.md) · [WMS 1.3.0](index.html#page-mapping-wms-1-3-0-getmap.md) · [BND 1.0.0](index.html#page-mapping-bnd.md).
- [Authentication](index.html#page-authentication.md).

For a raw integration without the BeMap JS API: [Leaflet (raw)](index.html#page-examples-mapping-display-leaflet-raw.md) · [OpenLayers (raw)](index.html#page-examples-mapping-display-ol4.md).
