# Map display with OpenLayers (without BeMap JS API)

A minimal raw OpenLayers integration. No `bemap.*` JS classes — just `ol.Map` with a `TileWMS` source pointing at the BeMap WMS endpoint.

Use this template when you already have an OpenLayers build and only need BeNomad tiles. If you also want overlays, services (routing, geocoding, EV), engine portability, or the browser tile cache, build on [`bemap.OlMap`](index.html#subpage-jsapi_2_0_0-js-map-openlayers.md) instead.

## JavaScript

```
{"bemap":{"language":"javascript","mapid":"map1","run":true,"hide":true}}
var map = new ol.Map({
    target: 'map1',
    view: new ol.View({
        projection: 'EPSG:3857',
        center: ol.proj.transform([2.5, 46.5], 'EPSG:4326', 'EPSG:3857'),
        zoom: 6,
        minZoom: 3,
        maxZoom: 20
    })
});

var layer = new ol.layer.Tile({
    source: new ol.source.TileWMS({
        // From outside BGIS, pass Basic-auth params in the URL:
        // url: 'https://<host>/bgis/wms?appid=<login>&appcode=<password>',
        url: '/bgis/wms',
        params: {
            'geoserver': bemap.miniweb.getGeoserver(),   // follows the sidebar Geo-server selector
            'LAYERS':    'default',
            'STYLES':    '',
            'TILED':     true,
            'TRANSPARENT': false
        }
    })
});

map.addLayer(layer);
```

```
{"bemap":{"language":"javascript","run":false,"hide":false}}
var map = new ol.Map({
    target: 'map1',
    view: new ol.View({
        projection: 'EPSG:3857',
        center: ol.proj.fromLonLat([2.5, 46.5]),
        zoom: 6
    })
});

map.addLayer(new ol.layer.Tile({
    source: new ol.source.TileWMS({
        url: 'https://<host>/bgis/wms?appid=<login>&appcode=<password>',
        params: {
            geoserver: 'here',
            LAYERS: 'default',
            STYLES: '',
            TILED: true,
            TRANSPARENT: false
        }
    })
}));
```

## HTML

```
{"bemap":{"language":"xml"}}
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <link rel="stylesheet" href="dist/ol.css">
    <script src="dist/ol.js"></script>
</head>
<body>
    <div id="map1" style="height: 500px;"></div>
</body>
</html>
```

## See also

- [`bemap.OlMap` reference](index.html#subpage-jsapi_2_0_0-js-map-openlayers.md) — same WMS basemap with `bemap.*` overlays, markers, polylines, and services.
- [OpenLayers documentation](http://openlayers.org/) — full OL API.
- BeMap WMS — [WMS 1.1.1](index.html#page-mapping-wms-1-1-1-getmap.md) · [WMS 1.3.0](index.html#page-mapping-wms-1-3-0-getmap.md) · [BND 1.0.0](index.html#page-mapping-bnd.md).
- [Authentication](index.html#page-authentication.md) — credentials and request signing.
