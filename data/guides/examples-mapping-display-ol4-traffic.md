# Traffic graphic styles with OpenLayers 4



To change the graphic style in OpenLayer you can used the `STYLES` parameter. See the complete OpenLayer [example](index.html#page-examples-mapping-display-ol4.md).

See the API of [WMS 1.1.1](index.html#page-mapping-wms-1-1-1-getmap.md) or [WMS 1.3.0](index.html#page-mapping-wms-1-3-0-getmap.md) or [BND 1.0.0](index.html#page-mapping-bnd.md) for more details on the protocols parameters.

Here the `STYLES` parameter is set to ``traffic` to display the real time traffic information.
Also the parameter `TRANSPARENT` is set to `true` and parameter `FORMAT` use `image/png24` as value.



```
{"bemap":{"language":"javascript","mapid":"mapDefault","run":true,"hide":true}}
var mapDefault = new ol.Map({
  target: 'mapDefault',
  view: new ol.View({
    projection: 'EPSG:3857',
    center: ol.proj.transform([2.3412, 48.85693], 'EPSG:4326', 'EPSG:3857'),
    zoom: 11,
    minZoom: 3,
    maxZoom: 20
  })
});

var layerDefault = new ol.layer.Tile({
  source: new ol.source.TileWMS({
    // If an authentication is required use this URL url: 'https://[BeMap host]/bgis/wms?appid=[your BeMap login]&appcode=[your BeMap password]',
    url: '/bgis/wms',
    params: {
      'geoserver': bemap.miniweb.getGeoserver(), // You can set the geoserver with a simple String value like 'default'.
      'LAYERS': 'default',
      'STYLES': 'default',
      'TILED': true,
      'TRANSPARENT': false
    }
  })
});

mapDefault.addLayer(layerDefault);

var trafficLayer = new ol.layer.Tile({
  source: new ol.source.TileWMS({
    // If an authentication is required use this URL url: 'https://[BeMap host]/bgis/wms?appid=[your BeMap login]&appcode=[your BeMap password]',
    url: '/bgis/wms',
    params: {
      'geoserver': bemap.miniweb.getGeoserver(), // You can set the geoserver with a simple String value like 'default'.
      'LAYERS': 'default',
      'STYLES': 'traffic',
      'TILED': true,
      'TRANSPARENT': true,
      'FORMAT': "image/png24"
    }
  })
});

mapDefault.addLayer(trafficLayer);
```
