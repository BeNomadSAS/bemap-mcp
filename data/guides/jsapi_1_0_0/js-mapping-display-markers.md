# BeMap JS API

## Marker display
```
{"bemap":{"language":"javascript","mapid":"map1","run":true,"hide":true}}

var map = new bemap.LeafletMap(bemapMainCtx, 'map1').backgroundLayers(bemap.miniweb.getGeoservers()).move(-73.896794, 40.696767, 12);
//is recommended to keep map in object
map.switchBackgroundLayer(bemap.miniweb.getGeoserver());

map.refresh();

bemap.map = map;

bemap.miniweb.onChangeGeoserver(function(geoserver) {
  bemap.map.switchBackgroundLayer(geoserver);
});

```
<button type="button" class="btn btn-primary" id="add"><span></span> Add</button>
<button type="button" class="btn btn-primary" id="remove"><span></span> Remove</button>

#### __JavaScript source code:__
```
{"bemap":{"language":"javascript","run":true}}
var icon = new bemap.Icon({
  src: 'images/map-marker-blue.svg',
  anchorX: 0.26,
  anchorY: 0.9,
  height: 36,
  width: 32,
  anchorXUnits: 'fraction',
  anchorYUnits: 'fraction',
  scale: 1.3
});

var coord = new bemap.Coordinate(-73.896794, 40.696767);

var marker = new bemap.Marker(coord, {
  icon: icon,
  id: 1,
  properties: {
    html: "<p>html</p>",
    longitude: -74.00381,
    latitude: 40.75325,
    info: "info"
  }
});

bemap.map.addMarker(marker);

```

```
{"bemap":{"language":"javascript","run":true, "hide":true}}
$("#add").click(function(){
  if(marker.map == null){
    bemap.map.addMarker(marker);
    marker.on(bemap.Map.EventType.CLICK, function(mapEvent) {

      console.log(mapEvent.bemapObject);  
      console.log(mapEvent.coordinate);  

    });
  }
})
$("#remove").click(function(){
  bemap.map.removeMarker(marker);
})
```
#### __Click on marker event__
Click on marker and find the result in JavaScript console
```
{"bemap":{"language":"javascript","run":true}}

marker.on(bemap.Map.EventType.CLICK, function(mapEvent) {

  console.log(mapEvent.bemapObject);  
  console.log(mapEvent.coordinate);  

});
```
#### __Add marker__
Example where we add marker on map and specific layer
```
{"bemap":{"language":"javascript","run":false}}

bemap.map.addMarker(marker, {
  layer: bemap.layers.nameOfLayer
});
```
#### __Remove marker__
Example where we remove marker from map and specific layer
```
{"bemap":{"language":"javascript","run":false}}

bemap.map.removeMarker(marker, {
  layer: evmove.layers.nameOfLayer
});
```



See the complete feature of [OpenLayers](https://leafletjs.com//).
