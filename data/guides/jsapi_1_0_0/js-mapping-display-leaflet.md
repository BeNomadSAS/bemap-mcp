# BeMap JS API

## Map display with Leaflet

JavaScript source code:
```
{"bemap":{"language":"javascript","mapid":"map1","run":true, "hide":true}}
```

#### __JavaScript source code:__
Create Leaflet map of France
##### __Leaflet map__ : call bemap.LeafletMap() and use
* `bemapMainCtx` from your [context.js](index.html#subpage-jsapi_1_0_0-js-authentication.md) authentification page
* `mapid`: id from div where you want your map to be
like a parameter
then all defaults layers
##### __Defaults layers__ : call all defaultLayers() [example](index.html#subpage-jsapi_1_0_0-js-mapping-display-layers.md)
and move map to the center of France with `move` method
```
{"bemap":{"language":"javascript","run":true, "hide":true}}
var map = new bemap.LeafletMap(bemapMainCtx, 'map1').backgroundLayers(bemap.miniweb.getGeoservers()).defaultLayers().move(-73.896794, 40.696767, 12);
//is recommended to keep map in object
//bemap.miniweb.moveMapToDefault(map);
map.switchBackgroundLayer(bemap.miniweb.getGeoserver());

map.refresh();

bemap.map = map;

bemap.miniweb.onChangeGeoserver(function(geoserver) {
  console.log('ja pierodlejihi')
  bemap.map.switchBackgroundLayer(geoserver);
});
```
```
{"bemap":{"language":"javascript","run":false, "hide":false}}
var map = new bemap.LeafletMap(bemapMainCtx, 'map1').defaultLayers().move(-73.896794, 40.696767, 12);
//is recommended to keep map in object

bemap.map = map;
```

#### __HTML source code "sample.html":__
Put a ``div`` element with a certain ``id`` where you want your map to be:
```
{"bemap":{"language":"xml"}}
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>BeNomad BeMap JS API - Mapping sample</title>
  <link rel="stylesheet" type="text/css" href="dist/bemap-js-api.css" media="screen" />
  <link rel="stylesheet" type="text/css" href="dist/leaflet.css">
  <link rel="stylesheet" type="text/css" href="dist/MarkerCluster.Default.css" />
  <link rel="stylesheet" type="text/css" href="sample.css" />
  <script language="JavaScript" type="text/javascript" src="dist/bemap-js-api.min.js"></script>
  <script language="JavaScript" type="text/javascript" src="dist/leaflet.js"></script>
  <script language="JavaScript" type="text/javascript" src="dist/leaflet.markercluster.js"></script>
  <script language="JavaScript" type="text/javascript" src="context.js"></script>
  <script language="JavaScript" type="text/javascript" src="sample.js"></script>
</head>
<body>
  <div id="map1"></div>
</body>
</html>
```

#### __CSS source code "sample.css":__
Make sure the map container has a defined height and width for example by setting it in CSS:
```
{"bemap":{"language":"css"}}
body, html {
  height: 100.0%;
  margin: 0 0 0 0;
  padding: 0 0 0 0;
}

#map1 {
  width: 100%;
  height: 100%;
}
```

#### __JavaScript source code "sample.js":__
Make sure the map container has a defined height and width for example by setting it in CSS:
```
{"bemap":{"language":"javascript"}}
// See the authentication documentation page to set the Context object.
// In this sample the variable name is bemapMainCtx and
// the Context object is stored into the context.js file.
// example:
// var bemapMainCtx = new bemap.Context({
//   "login": '<your login or set to null if not need>',
//   "password": '<your password or set to null if not need>',
//   "secure": true,
//   "host": '<your host name or IP address>',
// });

// Run when all documents are loaded.
window.addEventListener("DOMContentLoaded", (event) => {
  // Initialize the map1 HTML element with BeMap JS API and Leaflet map browser.
  // Also, define the default layers and make a map move and zoom.
  var map = new bemap.LeafletMap(bemapMainCtx, 'map1').defaultLayers().move(-73.896794, 40.696767, 12);

  // Save map object into bemap package to re-use after (optional).
  bemap.map = map;

  // Here you can add your source code.
});
```

#Examples
Click/scroll/move on map or click on buttons and find the result in JavaScript console

```
{"bemap":{"language":"javascript","mapid":"map2","run":true, "hide":true}}
var map1 = new bemap.LeafletMap(bemapMainCtx, 'map2').backgroundLayers(bemap.miniweb.getGeoservers(), {
  styles: 'darkblue'
}).move(-73.896794, 40.696767, 12);
//is recommended to keep map in object
map1.switchBackgroundLayer(bemap.miniweb.getGeoserver());

map1.refresh();

bemap.map1 = map1;

bemap.miniweb.onChangeGeoserver(function(geoserver) {
  bemap.map1.switchBackgroundLayer(geoserver);
});
```
<button type="button" class="btn btn-primary" id="move"><span></span> Move</button>
<button type="button" class="btn btn-primary" id="zoom"><span></span> Zoom</button>
<button type="button" class="btn btn-primary" id="getZoom"><span></span> Get zoom</button>
<button type="button" class="btn btn-primary" id="getCenter"><span></span> Get center</button>
<button type="button" class="btn btn-primary" id="getBoundingBox"><span></span> Get bounding box</button>
<button type="button" class="btn btn-primary" id="moveToBoundingBox"><span></span> Move to bounding box</button>

```
{"bemap":{"language":"javascript","run":true, "hide":true}}
$("#move").click(function(){
  bemap.map1.move(-73.896794, 40.696767, 10);
})
$("#zoom").click(function(){
  bemap.map1.zoom(15)
})

$("#getZoom").click(function(){
  bemap.map.getZoom()
  console.log("Get zoom");
  console.log(bemap.map1.getZoom())
})

$("#getCenter").click(function(){
  bemap.map.getCenter()
  console.log("Get center");
  console.log(bemap.map1.getCenter())
})

$("#getBoundingBox").click(function(){
  bemap.map.getBoundingBox()
  console.log("Get bounding box");
  console.log(bemap.map1.getBoundingBox())
})

$("#moveToBoundingBox").click(function(){
  bemap.map1.moveToBoundingBox()
  console.log("Move bounding box");

  var minLon = -15.468750000000002
  var minLat = 42.74701217318067
  var maxLon = 74.09179687500001
  var maxLat = 56.80087831233043

  var bbox = new bemap.BoundingBox(minLon, minLat, maxLon, maxLat)

  bemap.map1.moveToBoundingBox(bbox);
})

bemap.map1.on(bemap.Map.EventType.LOAD, function(mapEvent) {
  console.log("load");
  console.log(mapEvent);
});

bemap.map1.on(bemap.Map.EventType.CHANGE, function(mapEvent) {
  console.log("change");
  console.log(mapEvent);
});

bemap.map1.on(bemap.Map.EventType.CHANGE_SIZE, function(mapEvent) {
  console.log("change:size");
  console.log(mapEvent);
});

bemap.map1.on(bemap.Map.EventType.CHANGE_VIEW, function(mapEvent) {
  console.log("change:view");
  console.log(mapEvent);
});

bemap.map1.on(bemap.Map.EventType.RESIZE, function(mapEvent) {
  console.log("resize");
  console.log(mapEvent);
});

bemap.map1.on(bemap.Map.EventType.CLICK, function(mapEvent) {
  console.log("click");
  console.log(mapEvent);
});

bemap.map1.on(bemap.Map.EventType.SINGLECLICK, function(mapEvent) {
  console.log("singleclick");
  console.log(mapEvent);
});

bemap.map1.on(bemap.Map.EventType.DBLCLICK, function(mapEvent) {
  console.log("dblclick");
  console.log(mapEvent);
});

bemap.map1.on(bemap.Map.EventType.MOVESTART, function(mapEvent) {
  console.log("movestart");
  console.log(mapEvent);
});

bemap.map1.on(bemap.Map.EventType.MOVEEND, function(mapEvent) {
  console.log("moveend");
  console.log(mapEvent);
});

bemap.map1.on(bemap.Map.EventType.POINTERUP, function(mapEvent) {
  console.log("pointerup");
  console.log(mapEvent);
});

bemap.map1.on(bemap.Map.EventType.POINTERDOWN, function(mapEvent) {
  console.log("pointerdown");
  console.log(mapEvent);
});

bemap.map1.on(bemap.Map.EventType.POINTERDRAG, function(mapEvent) {
  console.log("pointerdrag");
  console.log(mapEvent);
});

bemap.map1.on(bemap.Map.EventType.POINTERMOVE, function(mapEvent) {
  console.log("pointermove");
  console.log(mapEvent);
});

bemap.map1.on(bemap.Map.EventType.POSTCOMPOSE, function(mapEvent) {
  console.log("postcompose");
  console.log(mapEvent);
});

bemap.map1.on(bemap.Map.EventType.POSTRENDER, function(mapEvent) {
  console.log("postrender");
  console.log(mapEvent);
});

bemap.map1.on(bemap.Map.EventType.PRECOMPOSE, function(mapEvent) {
  console.log("precompose");
  console.log(mapEvent);
});

bemap.map1.on(bemap.Map.EventType.PROPERTYCHANGE, function(mapEvent) {
  console.log("propertychange");
  console.log(mapEvent);
});

bemap.map1.on(bemap.Map.EventType.WHEEL, function(mapEvent) {
  console.log("wheel");
  console.log(mapEvent);
});

bemap.map1.on(bemap.Map.EventType.KEYDOWN, function(mapEvent) {
  console.log("keydown");
  console.log(mapEvent);
});

bemap.map1.on(bemap.Map.EventType.KEYPRESS, function(mapEvent) {
  console.log("keypress");
  console.log(mapEvent);
});

bemap.map1.on(bemap.Map.EventType.TOUCHSTART, function(mapEvent) {
  console.log("touchstart");
  console.log(mapEvent);
});

bemap.map1.on(bemap.Map.EventType.TOUCHMOVE, function(mapEvent) {
  console.log("touchmove");
  console.log(mapEvent);
});

bemap.map1.on(bemap.Map.EventType.TOUCHEND, function(mapEvent) {
  console.log("touchend");
  console.log(mapEvent);
});
```

#### __Move__
```
{"bemap":{"language":"javascript"}}
bemap.map.move(-73.896794, 40.696767, 10);
```
#### __Zoom__
```
{"bemap":{"language":"javascript"}}
bemap.map.zoom(15);
```
#### __Get zoom__
```
{"bemap":{"language":"javascript"}}
bemap.map.getZoom();
```
#### __Get center__
```
{"bemap":{"language":"javascript"}}
bemap.map.getCenter();
```
#### __Get bounding box__
```
{"bemap":{"language":"javascript"}}
bemap.map.getBoundingBox();
```
#### __Move to bounding box__
```
{"bemap":{"language":"javascript"}}
var minLon = -15.468750000000002;
var minLat = 42.74701217318067;
var maxLon = 74.09179687500001;
var maxLat = 56.80087831233043;

var bbox = new bemap.BoundingBox(minLon, minLat, maxLon, maxLat);

bemap.map.moveToBoundingBox(bbox);

```
#### __Event examples__
```
{"bemap":{"language":"javascript"}}

LOAD: 'load',
CHANGE: 'change',
CHANGE_SIZE: 'change:size',
CHANGE_VIEW: 'change:view',
RESIZE: 'resize',
CLICK: 'click',
SINGLECLICK: 'singleclick',
DBLCLICK: 'dblclick',
MOVESTART: 'movestart',
MOVEEND: 'moveend',
POINTERUP: 'pointerup',
POINTERDOWN: 'pointerdown',
POINTERDRAG: 'pointerdrag',
POINTERMOVE: 'pointermove',
POSTCOMPOSE: 'postcompose',
POSTRENDER: 'postrender',
PRECOMPOSE: 'precompose',
PROPERTYCHANGE: 'propertychange',
WHEEL: 'wheel',
KEYDOWN: 'keydown',
KEYPRESS: 'keypress',
TOUCHSTART: 'touchstart',
TOUCHMOVE: 'touchmove',
TOUCHEND: 'touchend'

//example of click event on map
bemap.map.on(bemap.Map.EventType.CLICK, function(mapEvent) {
  console.log(mapEvent);
});
```
See the complete feature of [OpenLayers](https://leafletjs.com//).
