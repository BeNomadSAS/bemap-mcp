# BeMap JS API

## Popup display
```
{"bemap":{"language":"javascript","mapid":"map1","run":true,"hide":true}}
var map = new bemap.LeafletMap(bemapMainCtx, 'map1').backgroundLayers(bemap.miniweb.getGeoservers()).move(-73.896794, 40.696767, 12);
//is recommended to keep map in object
map.switchBackgroundLayer(bemap.miniweb.getGeoserver());

map.refresh();

map.on(bemap.Map.EventType.CLICK, function(mapEvent) {
  var p = mapEvent.coordinate;
  popup = new bemap.Popup({
    coordinate: p,
    visible: true,
    information: "<p>lon: "+ p.lon +"</p><p>lat: "+ p.lat +"</p>"
  });

  map.addPopup(popup);
});

bemap.map = map;

bemap.miniweb.onChangeGeoserver(function(geoserver) {
  bemap.map.switchBackgroundLayer(geoserver);
});


```
<button type="button" class="btn btn-primary" id="add"><span></span> Add</button>
<button type="button" class="btn btn-primary" id="remove"><span></span> Remove</button>
<button type="button" class="btn btn-primary" id="clean"><span></span> Clean</button>

#### __JavaScript source code:__
```
{"bemap":{"language":"javascript","run":true}}


var coord = new bemap.Coordinate(-73.896794, 40.696767, 12);

var popup = new bemap.Popup({
  coordinate: coord,
  information: "<p>lon: "+ coord.lon +"</p><p>lat: "+ coord.lat +"</p>"
});
bemap.map.addPopup(popup);


```

```
{"bemap":{"language":"javascript","run":true, "hide":true}}
$("#add").click(function(){
  if(popup.map == null){
    bemap.map.addPopup(popup);
    console.log(popup)
  }
})
$("#remove").click(function(){
  bemap.map.removePopup(popup);
  console.log(popup)
})

$("#clean").click(function(){
  bemap.map.clearPopup();
  console.log(popup)
})


```

#### __Add Popup__
Example where we add popup on map
```
{"bemap":{"language":"javascript","run":false}}

bemap.map.addPopup(popup);
```
#### __Remove Popup__
Example where we remove popup from map
```
{"bemap":{"language":"javascript","run":false}}

bemap.map.removePopup(popup);
```



See the complete feature of [OpenLayers](https://leafletjs.com//).
