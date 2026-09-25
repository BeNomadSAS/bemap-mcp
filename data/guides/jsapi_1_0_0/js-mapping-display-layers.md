# BeMap JS API

## Layer display

This example show cluster layer with markers on it:
```
{"bemap":{"language":"javascript","mapid":"map1","run":true,"hide":true}}
var map = new bemap.LeafletMap(bemapMainCtx, 'map1').backgroundLayers(bemap.miniweb.getGeoservers()).move(-73.896794, 40.696767, 12);
//is recommended to keep map in object
map.switchBackgroundLayer(bemap.miniweb.getGeoserver());

map.refresh();

bemap.map = map;
bemap.layers = {}

bemap.miniweb.onChangeGeoserver(function(geoserver) {
  bemap.map.switchBackgroundLayer(geoserver);
});

```

```
{"bemap":{"language":"javascript","run":true, "hide":true}}

$('#create').click(function() {
  var array = [{
    "lon": -74.20281383589803,
    "lat": 40.52549777744072
  }, {
    "lon": -74.07990428999959,
    "lat": 40.590185950535066
  }, {
    "lon": -74.18015453414021,
    "lat": 40.63657682862286
  }, {
    "lon": -74.11835643843709,
    "lat": 40.66314584746026
  }, {
    "lon": -74.04488536910115,
    "lat": 40.76307549235242
  }, {
    "lon": -73.97896740035115,
    "lat": 40.76411563679859
  }, {
    "lon": -73.8663575370699,
    "lat": 40.71000654270671
  }, {
    "lon": -73.90824291304646,
    "lat": 40.61833706758392
  }, {
    "lon": -74.01398632124959,
    "lat": 40.63814000490988
  }, {
    "lon": -73.95012828902303,
    "lat": 40.69334873723725
  }, {
    "lon": -73.79803430766964,
    "lat": 40.70827263931205
  }, {
    "lon": -74.07406580181026,
    "lat": 40.717641068083566
  }, {
    "lon": -73.94634973735714,
    "lat": 40.67859725236529
  }, {
    "lon": -73.99990808696651,
    "lat": 40.659327207970264
  }]

  if(!bemap.layers.nameClusterLayerObj){
    bemap.layers.nameClusterLayerObj = new bemap.ClusterLayer({
      name: 'nameClusterLayer'
    });
    bemap.map.addLayer(bemap.layers.nameClusterLayerObj);
  }

  for (var i = 0; i < array.length; i++) {
    array[i]
    var coor = new bemap.Coordinate(array[i].lon, array[i].lat);
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

    var marker = new bemap.Marker(
      coor, {
        icon: icon
      }
    );
    bemap.map.addMarker(marker, {
      layer: bemap.layers.nameClusterLayerObj
    });
  }
})

$("#clear").click(function(){
  if(bemap.layers.nameClusterLayerObj){
    bemap.layers.nameClusterLayerObj.clear();
  }
})

$("#remove").click(function(){
  if(bemap.layers.nameClusterLayerObj){
    bemap.map.removeLayer(bemap.layers.nameClusterLayerObj);
    bemap.layers.nameClusterLayerObj = null;
  }
})

$("#show").click(function(){
  if(bemap.layers.nameClusterLayerObj){
    if(!bemap.layers.nameClusterLayerObj.isVisible()){
      bemap.layers.nameClusterLayerObj.setVisible(true);
    }
  }
})

$("#hide").click(function(){
  if(bemap.layers.nameClusterLayerObj){
    if(bemap.layers.nameClusterLayerObj.isVisible()){
      bemap.layers.nameClusterLayerObj.setVisible(false);
    }
  }
})

```
<button type="button" class="btn btn-primary" id="create"><span></span> Create</button>
<button type="button" class="btn btn-primary" id="clear"><span></span> Clear</button>
<button type="button" class="btn btn-primary" id="remove"><span></span> Remove</button>
<button type="button" class="btn btn-primary" id="show"><span></span> Show</button>
<button type="button" class="btn btn-primary" id="hide"><span></span> Hide</button>

#### __Default layers__


created on the initialization of map
```
{"bemap":{"language":"javascript"}}
bemap.Map.DEFAULT_LAYER.MARKER

bemap.Map.DEFAULT_LAYER.POLYGON

bemap.Map.DEFAULT_LAYER.CIRCLE

bemap.Map.DEFAULT_LAYER.ROUTE

bemap.Map.DEFAULT_LAYER.POLYLINE

```

#### __Add layer__
```
{"bemap":{"language":"javascript","run":false}}

bemap.layers.nameOfLayerObj = new bemap.VectorLayer({
  "name": "nameOfLayer",
});

bemap.layers.nameOfClusterLayerObj = new bemap.ClusterLayer({
  "distance": 1,
  "name": "nameOfClusterLayer"
});

bemap.map.addLayer(bemap.layers.nameOfLayerObj);
bemap.map.addLayer(bemap.layers.nameOfClusterLayerObj);
```

#### __Remove layer__
```
{"bemap":{"language":"javascript","run":false}}

bemap.map.removeLayer(bemap.layers.nameOfLayerObj);

```

#### __Is visible__
Check if layer is visible return `true`
```
{"bemap":{"language":"javascript","run":false}}

bemap.layers.nameOfLayerObj.isVisible();

```

#### __Set visible__
```
{"bemap":{"language":"javascript","run":false}}

bemap.layers.nameOfLayerObj.setVisible(true);
bemap.layers.nameOfLayerObj.setVisible(false);

```

#### __Clear layer__
```
{"bemap":{"language":"javascript","run":false}}

bemap.layers.nameOfLayerObj.clear();
```

## Working example
```
{"bemap":{"language":"javascript","run":false, "hide":false}}
//example array of coordinates
var array = [{
  "lon": -3.2838224134411576,
  "lat": 47.97025690564785
}, {
  "lon": -4.4264005384411576,
  "lat": 48.0437597849886
}, {
  "lon": -3.5474942884411576,
  "lat": 48.69332475046418
}, {
  "lon": -1.1634610853161576,
  "lat": 48.54080328761906
}, {
  "lon": -1.6908048353161576,
  "lat": 49.57742503402188
}, {
  "lon": 0.41857016468384245,
  "lat": 49.148126545503764
}, {
  "lon": 1.3853670396838424,
  "lat": 49.946455303281816
}, {
  "lon": 2.4620271959338424,
  "lat": 51.0229190501593
}]

$('#create').click(function() {
  //check if layer already exist
  if(!bemap.layers.nameClusterLayerObj){
    bemap.layers.nameClusterLayerObj = new bemap.ClusterLayer({
      name: 'nameClusterLayer'
    });
    bemap.map.addLayer(bemap.layers.nameClusterLayerObj);
  };

  for (var i = 0; i < array.length; i++) {
    array[i]
    var coor = new bemap.Coordinate(array[i].lon, array[i].lat);
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

    var marker = new bemap.Marker(
      coor, {
        icon: icon
      }
    );
    bemap.map.addMarker(marker, {
      layer: bemap.layers.nameClusterLayerObj
    });
  }
})

$("#clear").click(function(){
  if(bemap.layers.nameClusterLayerObj){
    bemap.layers.nameClusterLayerObj.clear();
  }
})

$("#remove").click(function(){
  if(bemap.layers.nameClusterLayerObj){
    bemap.map.removeLayer(bemap.layers.nameClusterLayerObj);
    bemap.layers.nameClusterLayerObj = null;
  }
})

$("#show").click(function(){
  if(bemap.layers.nameClusterLayerObj){
    if(!bemap.layers.nameClusterLayerObj.isVisible()){
      bemap.layers.nameClusterLayerObj.setVisible(true);
    }
  }
})

$("#hide").click(function(){
  if(bemap.layers.nameClusterLayerObj){
    if(bemap.layers.nameClusterLayerObj.isVisible()){
      bemap.layers.nameClusterLayerObj.setVisible(false);
    }
  }
})

```


See the complete feature of [OpenLayers](https://leafletjs.com//).
