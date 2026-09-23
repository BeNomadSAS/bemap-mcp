# Different graphic styles with OpenLayers 4

Current available graphic styles are 
* `default`: default graphic style.
* `nopoi`: same as default graphic style but without any POI.
* `poi`: only the POI. The tiles are transparent.
* `traffic`: only the traffic. The tiles are transparent.
* `roads`: only the roads are rendered. The tiles are transparent.
* `roadsTruckAttributes`: only the roads with truck restrictions are rendered. The tiles are transparent.
* `alternative`: alternative style is also used by the BeNomad embedded devices. 
* `alternative2`: another alternative style.
* `darkblue`: Graphics style.


To change the graphic style in OpenLayer you can used the `STYLES` parameter. See the complete OpenLayer [example](index.html#page-examples-mapping-display-ol4.md).

See the API of [WMS 1.1.1](index.html#page-mapping-wms-1-1-1-getmap.md), [WMS 1.3.0](index.html#page-mapping-wms-1-3-0-getmap.md) or [BND 1.0.0](index.html#page-mapping-bnd.md) for more details on the protocols parameters.



## Default graphic style
Default graphic style.
```
{"bemap":{"language":"javascript","mapid":"mapDefault","run":true,"hide":true}}
var mapDefault = new ol.Map({
  target: 'mapDefault',
  view: new ol.View({
    projection: 'EPSG:3857',
    center: ol.proj.transform([2.5, 47.0], 'EPSG:4326', 'EPSG:3857'),
    zoom: 3,
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
```



## Gmap POI
Gmap graphic style with POI.
```
{"bemap":{"language":"javascript","mapid":"mapDefaultGmapPoi","run":true,"hide":true}}
var mapDefaultGmapPoi = new ol.Map({
  target: 'mapDefaultGmapPoi',
  view: new ol.View({
    projection: 'EPSG:3857',
    center: ol.proj.transform([2.3412, 48.85693], 'EPSG:4326', 'EPSG:3857'),
    zoom: 18,
    minZoom: 3,
    maxZoom: 20
  })
});

var layerDefaultGmapPoi = new ol.layer.Tile({
  source: new ol.source.TileWMS({
    // If an authentication is required use this URL url: 'https://[BeMap host]/bgis/wms?appid=[your BeMap login]&appcode=[your BeMap password]',
    url: '/bgis/wms',
    params: {
      'geoserver': bemap.miniweb.getGeoserver(), // You can set the geoserver with a simple String value like 'default'.
      'LAYERS': 'default',
      'STYLES': 'gmap',
      'TILED': true,
      'TRANSPARENT': false
    }
  })
});

mapDefaultGmapPoi.addLayer(layerDefaultGmapPoi);
```



## Gmap no POI
Gmap graphic style but without any POI.
```
{"bemap":{"language":"javascript","mapid":"mapDefaultNoPoi","run":true,"hide":true}}
var mapDefaultNoPoi = new ol.Map({
  target: 'mapDefaultNoPoi',
  view: new ol.View({
    projection: 'EPSG:3857',
    center: ol.proj.transform([2.3412, 48.85693], 'EPSG:4326', 'EPSG:3857'),
    zoom: 18,
    minZoom: 3,
    maxZoom: 20
  })
});

var layerDefaultNoPoi = new ol.layer.Tile({
  source: new ol.source.TileWMS({
    // If an authentication is required use this URL url: 'https://[BeMap host]/bgis/wms?appid=[your BeMap login]&appcode=[your BeMap password]',
    url: '/bgis/wms',
    params: {
      'geoserver': bemap.miniweb.getGeoserver(), // You can set the geoserver with a simple String value like 'default'.
      'LAYERS': 'default',
      'STYLES': 'nopoi',
      'TILED': true,
      'TRANSPARENT': false
    }
  })
});

mapDefaultNoPoi.addLayer(layerDefaultNoPoi);
```



## POI
Only the POI. The tiles are transparent.
```
{"bemap":{"language":"javascript","mapid":"mapDefaultPoi","run":true,"hide":true}}
var mapDefaultPoi = new ol.Map({
  target: 'mapDefaultPoi',
  view: new ol.View({
    projection: 'EPSG:3857',
    center: ol.proj.transform([2.3412, 48.85693], 'EPSG:4326', 'EPSG:3857'),
    zoom: 18,
    minZoom: 3,
    maxZoom: 20
  })
});

var layerDefaultPoi = new ol.layer.Tile({
  source: new ol.source.TileWMS({
    // If an authentication is required use this URL url: 'https://[BeMap host]/bgis/wms?appid=[your BeMap login]&appcode=[your BeMap password]',
    url: '/bgis/wms',
    params: {
      'geoserver': bemap.miniweb.getGeoserver(), // You can set the geoserver with a simple String value like 'default'.
      'LAYERS': 'default',
      'STYLES': 'poi',
      'TILED': true,
      'TRANSPARENT': true,
      'FORMAT': "image/png24"
    }
  })
});

mapDefaultPoi.addLayer(layerDefaultPoi);
```



## Alternative graphic style
Alternative style is also used by the BeNomad embedded devices. 
```
{"bemap":{"language":"javascript","mapid":"mapAlt","run":true,"hide":true}}
var mapAlt = new ol.Map({
  target: 'mapAlt',
  view: new ol.View({
    projection: 'EPSG:3857',
    center: ol.proj.transform([2.5, 47.0], 'EPSG:4326', 'EPSG:3857'),
    zoom: 3,
    minZoom: 3,
    maxZoom: 20
  })
});

var layerAlt = new ol.layer.Tile({
  source: new ol.source.TileWMS({
    // If an authentication is required use this URL url: 'https://[BeMap host]/bgis/wms?appid=[your BeMap login]&appcode=[your BeMap password]',
    url: '/bgis/wms',
    params: {
      'geoserver': bemap.miniweb.getGeoserver(), // You can set the geoserver with a simple String value like 'default'.
      'LAYERS': 'default',
      'STYLES': 'alternative2',
      'TILED': true,
      'TRANSPARENT': false
    }
  })
});

mapAlt.addLayer(layerAlt);
```



## Alternative 2 graphic style
Another alternative style.
```
{"bemap":{"language":"javascript","mapid":"mapAlt2","run":true,"hide":true}}
var mapAlt2 = new ol.Map({
  target: 'mapAlt2',
  view: new ol.View({
    projection: 'EPSG:3857',
    center: ol.proj.transform([2.5, 47.0], 'EPSG:4326', 'EPSG:3857'),
    zoom: 3,
    minZoom: 3,
    maxZoom: 20
  })
});

var layerAlt2 = new ol.layer.Tile({
  source: new ol.source.TileWMS({
    // If an authentication is required use this URL url: 'https://[BeMap host]/bgis/wms?appid=[your BeMap login]&appcode=[your BeMap password]',
    url: '/bgis/wms',
    params: {
      'geoserver': bemap.miniweb.getGeoserver(), // You can set the geoserver with a simple String value like 'default'.
      'LAYERS': 'default',
      'STYLES': 'alternative',
      'TILED': true,
      'TRANSPARENT': false
    }
  })
});

mapAlt2.addLayer(layerAlt2);
```



## Roads graphic style
Only the roads are rendered. The tiles are transparent.
```
{"bemap":{"language":"javascript","mapid":"mapRoads","run":true,"hide":true}}
var mapRoads = new ol.Map({
  target: 'mapRoads',
  view: new ol.View({
    projection: 'EPSG:3857',
    center: ol.proj.transform([2.5, 47.0], 'EPSG:4326', 'EPSG:3857'),
    zoom: 10,
    minZoom: 3,
    maxZoom: 20
  })
});

var layerRoads = new ol.layer.Tile({
  source: new ol.source.TileWMS({
    // If an authentication is required use this URL url: 'https://[BeMap host]/bgis/wms?appid=[your BeMap login]&appcode=[your BeMap password]',
    url: '/bgis/wms',
    params: {
      'geoserver': bemap.miniweb.getGeoserver(), // You can set the geoserver with a simple String value like 'default'.
      'LAYERS': 'default',
      'STYLES': 'roads',
      'TILED': true,
      'TRANSPARENT': true,
      'FORMAT': "image/png24"
    }
  })
});

mapRoads.addLayer(layerRoads);
```



## Roads truck attributes graphic style
Only the roads with truck restrictions are rendered. The tiles are transparent.
```
{"bemap":{"language":"javascript","mapid":"mapRoadsTruackAtt","run":true,"hide":true}}
var mapRoadsTruackAtt = new ol.Map({
  target: 'mapRoadsTruackAtt',
  view: new ol.View({
    projection: 'EPSG:3857',
    center: ol.proj.transform([2.5, 47.0], 'EPSG:4326', 'EPSG:3857'),
    zoom: 10,
    minZoom: 3,
    maxZoom: 20
  })
});

var layerRoadsTruackAtt = new ol.layer.Tile({
  source: new ol.source.TileWMS({
    // If an authentication is required use this URL url: 'https://[BeMap host]/bgis/wms?appid=[your BeMap login]&appcode=[your BeMap password]',
    url: '/bgis/wms',
    params: {
      'geoserver': bemap.miniweb.getGeoserver(), // You can set the geoserver with a simple String value like 'default'.
      'LAYERS': 'default',
      'STYLES': 'roadsTruckAttributes',
      'TILED': true,
      'TRANSPARENT': true,
      'FORMAT': "image/png24"
    }
  })
});

mapRoadsTruackAtt.addLayer(layerRoadsTruackAtt);
```



## BeNomad Light graphic style.
Graphics style.
```
{"bemap":{"language":"javascript","mapid":"mapBenomadLight","run":true,"hide":true}}
var mapBenomadLight = new ol.Map({
  target: 'mapBenomadLight',
  view: new ol.View({
    projection: 'EPSG:3857',
    center: ol.proj.transform([2.5, 47.0], 'EPSG:4326', 'EPSG:3857'),
    zoom: 3,
    minZoom: 3,
    maxZoom: 20
  })
});

var layerBenomadLight = new ol.layer.Tile({
  source: new ol.source.TileWMS({
    // If an authentication is required use this URL url: 'https://[BeMap host]/bgis/wms?appid=[your BeMap login]&appcode=[your BeMap password]',
    url: '/bgis/wms',
    params: {
      'geoserver': bemap.miniweb.getGeoserver(), // You can set the geoserver with a simple String value like 'default'.
      'LAYERS': 'default',
      'STYLES': 'benomadLight',
      'TILED': true,
      'TRANSPARENT': false
    }
  })
});

mapBenomadLight.addLayer(layerBenomadLight);
```



## BeNomad Gray Level graphic style.
Graphics style.
```
{"bemap":{"language":"javascript","mapid":"mapBenomadGrayLevel","run":true,"hide":true}}
var mapBenomadGrayLevel = new ol.Map({
  target: 'mapBenomadGrayLevel',
  view: new ol.View({
    projection: 'EPSG:3857',
    center: ol.proj.transform([2.5, 47.0], 'EPSG:4326', 'EPSG:3857'),
    zoom: 3,
    minZoom: 3,
    maxZoom: 20
  })
});

var layerBenomadGrayLevel = new ol.layer.Tile({
  source: new ol.source.TileWMS({
    // If an authentication is required use this URL url: 'https://[BeMap host]/bgis/wms?appid=[your BeMap login]&appcode=[your BeMap password]',
    url: '/bgis/wms',
    params: {
      'geoserver': bemap.miniweb.getGeoserver(), // You can set the geoserver with a simple String value like 'default'.
      'LAYERS': 'default',
      'STYLES': 'benomadGrayLevel',
      'TILED': true,
      'TRANSPARENT': false
    }
  })
});

mapBenomadGrayLevel.addLayer(layerBenomadGrayLevel);
```



## Dark blue graphic style.
Graphics style.
```
{"bemap":{"language":"javascript","mapid":"mapDarkblue","run":true,"hide":true}}
var mapDarkblue = new ol.Map({
  target: 'mapDarkblue',
  view: new ol.View({
    projection: 'EPSG:3857',
    center: ol.proj.transform([2.5, 47.0], 'EPSG:4326', 'EPSG:3857'),
    zoom: 3,
    minZoom: 3,
    maxZoom: 20
  })
});

var layerDarkblue = new ol.layer.Tile({
  source: new ol.source.TileWMS({
    // If an authentication is required use this URL url: 'https://[BeMap host]/bgis/wms?appid=[your BeMap login]&appcode=[your BeMap password]',
    url: '/bgis/wms',
    params: {
      'geoserver': bemap.miniweb.getGeoserver(), // You can set the geoserver with a simple String value like 'default'.
      'LAYERS': 'default',
      'STYLES': 'darkblue',
      'TILED': true,
      'TRANSPARENT': false
    }
  })
});

mapDarkblue.addLayer(layerDarkblue);
```
