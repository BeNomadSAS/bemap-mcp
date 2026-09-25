# BeMap JS API

## Polyline display


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
<button type="button" class="btn btn-primary" id="create"><span></span> Create</button>
<button type="button" class="btn btn-primary" id="remove"><span></span> Remove</button>

```
{"bemap":{"language":"javascript","run":true,"hide":true}}

var coordinates = [{
  "lon": -74.00637112662494,
  "lat": 40.60472725243717
}, {
  "lon": -74.02285061881244,
  "lat": 40.64746127680724
}, {
  "lon": -73.98027859732807,
  "lat": 40.61984363010138
}, {
  "lon": -73.99744473502338,
  "lat": 40.66204711973139
}, {
  "lon":-73.95967923209369,
  "lat": 40.651628985875554
}, {
  "lon":-73.94731961295307,
  "lat": 40.630787837673296
}, {
  "lon": -73.9603658776015,
  "lat": 40.65214993120704
}, {
  "lon": -73.95555935904682,
  "lat": 40.67819201191371
}]

$("#create").click(function(){
  var polyline = new bemap.Polyline(
    coordinates, {
      style: new bemap.LineStyle({
        width: 10,
        color: new bemap.Color(2, 208, 255, 0.8),
        //type: bemap.LineStyle.TYPE.DASH
      })
    }
  );

  if (!bemap.polylines) {
    bemap.polylines = polyline;
    bemap.map.addPolyline(bemap.polylines);
  }
})

$("#remove").click(function(){
  bemap.map.removePolyline(bemap.polylines);
  bemap.polylines = null;
})

```
#### __Add polyline__
```
{"bemap":{"language":"javascript","run":false}}
var polyline = new bemap.Polyline(
  coordinates, {
    style: new bemap.LineStyle({
      width: 10,
      color: new bemap.Color(2, 208, 255, 0.3),
      //type: bemap.LineStyle.TYPE.DASH
    })
  }
);

bemap.map.addPolyline(polyline);

```

#### __Remove polyline__
```
{"bemap":{"language":"javascript","run":false}}

bemap.map.removePolyline(polyline);
```

##Working example:
In this example polyline is added to layer created by us
```
{"bemap":{"language":"javascript"}}

var coordinates = [{
  "lon": 1.6965986963880653,
  "lat": 48.063724227979826
}, {
  "lon": 0.6199385401380653,
  "lat": 48.2688954949421
}, {
  "lon": -0.45672161611193474,
  "lat": 47.97554237462046
}]

//is recomended to keep layers and polylines in global object
bemap.layers = {};
bemap.polylines = {};

$("#create").click(function(){
  var polyline = new bemap.Polyline(
    coordinates, {
      style: new bemap.LineStyle({
        width: 10,
        color: new bemap.Color(2, 208, 255, 0.8)
      })
    }
  );
  if (!bemap.layers.polylineLayerNameObj) {
    bemap.layers.polylineLayerNameObj = new bemap.VectorLayer({
      name: 'polylineLayerName'
    });
    bemap.polylines = polyline;
    //add layer on map  
    bemap.map.addLayer(bemap.layers.polylineLayerNameObj);
    //add layer on layer choosen by you (optional)
    //bemap.map.addPolyline(bemap.polylines, {layer: bemap.layers.polylineLayerNameObj});
  }
})

$("#remove").click(function(){
  //remove layer from map
  bemap.map.removePolyline(bemap.polylines);
  //remove layer with polyline on it (optional)
  //bemap.map.removeLayer(bemap.layers.polylineLayerNameObj);
  //clear polyline object (optional)
  //bemap.layers.polylineLayerNameObj = null;
})
```


See the complete feature of [OpenLayers](https://leafletjs.com//).
