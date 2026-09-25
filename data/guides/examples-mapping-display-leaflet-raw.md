# Map display with Leaflet (without BeMap JS API)

A minimal raw Leaflet integration. No `bemap.*` JS classes — just `L.map()` with a `L.tileLayer.wms()` source pointing at the BeMap WMS endpoint.

Use this template when you already have a Leaflet build and only need BeNomad tiles. If you also want overlays, services (routing, geocoding, EV), engine portability, or the browser tile cache, build on [`bemap.LeafletMap`](index.html#subpage-jsapi_2_0_0-js-map-leaflet.md) instead.

## JavaScript

```
{"bemap":{"language":"javascript","mapid":"map1","run":true,"hide":false}}
var map = L.map('map1').setView([46.5, 2.5], 6);

// From outside BGIS, pass Basic-auth params in the URL:
//   L.tileLayer.wms('https://<host>/bgis/wms?appid=<login>&appcode=<password>', { ... })
L.tileLayer.wms('/bgis/wms', {
    layers:      'default',
    styles:      '',
    format:      'image/png',
    transparent: false,
    geoserver:   bemapMainCtx.geoserver,   // e.g. 'default', 'here'
    tiled:       true
}).addTo(map);
```

## HTML

```
{"bemap":{"language":"xml"}}
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <link rel="stylesheet" href="dist/leaflet.css">
    <script src="dist/leaflet.js"></script>
</head>
<body>
    <div id="map1" style="height: 500px;"></div>
</body>
</html>
```

## See also

- [`bemap.LeafletMap` reference](index.html#subpage-jsapi_2_0_0-js-map-leaflet.md) — same WMS basemap with `bemap.*` overlays, markers, polylines, and services.
- [Leaflet documentation](https://leafletjs.com/) — full Leaflet API.
- BeMap WMS — [WMS 1.1.1](index.html#page-mapping-wms-1-1-1-getmap.md) · [WMS 1.3.0](index.html#page-mapping-wms-1-3-0-getmap.md) · [BND 1.0.0](index.html#page-mapping-bnd.md).
- [Authentication](index.html#page-authentication.md) — credentials and request signing.
