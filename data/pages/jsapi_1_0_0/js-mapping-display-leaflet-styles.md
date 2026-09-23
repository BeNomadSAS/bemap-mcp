# BeMap JS API

## Different graphic styles with BeMap Map

Current available graphic styles are
* `default`: default graphic style.
* `alternative`: alternative style is also used by the BeNomad embedded devices.
* `alternative2`: A simple alternative style.
* `traffic`: only
* `roads`:
* `roadsTruckAttributes`:
* `darkblue`:

__Alternative__ `style` example :
```
{"bemap":{"language":"javascript","run":false,"hide":false}}
var map = new bemap.LeafletMap(bemapMainCtx, 'map').defaultLayers({
  styles: 'alternative'
}).move(2.0, 47.0, 5);

```


## Default graphic style
```
{"bemap":{"language":"javascript","mapid":"mapDefault","run":true,"hide":true}}
//var mapDefault = new bemap.LeafletMap(bemapMainCtx, 'mapDefault').defaultLayers().move(2.0, 47.0, 5);

var mapDefault = new bemap.LeafletMap(bemapMainCtx, 'mapDefault').backgroundLayers(bemap.miniweb.getGeoservers()).defaultLayers().move(-73.896794, 40.696767, 12);

mapDefault.switchBackgroundLayer(bemap.miniweb.getGeoserver());

mapDefault.refresh();

bemap.mapDefault = mapDefault;

bemap.miniweb.onChangeGeoserver(function(geoserver) {
  bemap.mapDefault.switchBackgroundLayer(geoserver);
});
```

## Alternative graphic style
```
{"bemap":{"language":"javascript","mapid":"mapAlt","run":true,"hide":true}}

var mapAlt = new bemap.LeafletMap(bemapMainCtx, 'mapAlt').backgroundLayers(bemap.miniweb.getGeoservers(), {
  styles: 'alternative'
}).move(-73.896794, 40.696767, 12);
mapAlt.switchBackgroundLayer(bemap.miniweb.getGeoserver());

mapAlt.refresh();

bemap.miniweb.onChangeGeoserver(function(geoserver) {
  mapAlt.switchBackgroundLayer(geoserver);
});

```

## Alternative 2 graphic style
```
{"bemap":{"language":"javascript","mapid":"mapAlt2","run":true,"hide":true}}

var mapAlt2 = new bemap.LeafletMap(bemapMainCtx, 'mapAlt2').backgroundLayers(bemap.miniweb.getGeoservers(), {
  styles: 'alternative2'
}).move(-73.896794, 40.696767, 12);
mapAlt2.switchBackgroundLayer(bemap.miniweb.getGeoserver());

mapAlt2.refresh();

bemap.miniweb.onChangeGeoserver(function(geoserver) {
  mapAlt2.switchBackgroundLayer(geoserver);
});
```

## Roads graphic style
```
{"bemap":{"language":"javascript","mapid":"mapRoads","run":true,"hide":true}}

var mapRoads = new bemap.LeafletMap(bemapMainCtx, 'mapRoads').backgroundLayers(bemap.miniweb.getGeoservers(), {
  styles: 'roads'
}).move(-73.896794, 40.696767, 12);
mapRoads.switchBackgroundLayer(bemap.miniweb.getGeoserver());

mapRoads.refresh();

bemap.miniweb.onChangeGeoserver(function(geoserver) {
  mapRoads.switchBackgroundLayer(geoserver);
});
```

## Roads truck attributes graphic style
```
{"bemap":{"language":"javascript","mapid":"mapRoadsTruackAtt","run":true,"hide":true}}

var mapRoadsTruackAtt = new bemap.LeafletMap(bemapMainCtx, 'mapRoadsTruackAtt').backgroundLayers(bemap.miniweb.getGeoservers(), {
  styles: 'roadsTruckAttributes'
}).move(-73.896794, 40.696767, 12);
mapRoadsTruackAtt.switchBackgroundLayer(bemap.miniweb.getGeoserver());

mapRoadsTruackAtt.refresh();

bemap.miniweb.onChangeGeoserver(function(geoserver) {
  mapRoadsTruackAtt.switchBackgroundLayer(geoserver);
});
```

## Dark blue graphic style
```
{"bemap":{"language":"javascript","mapid":"mapDarkblue","run":true,"hide":true}}

var mapDarkblue = new bemap.LeafletMap(bemapMainCtx, 'mapDarkblue').backgroundLayers(bemap.miniweb.getGeoservers(), {
  styles: 'darkblue'
}).move(-73.896794, 40.696767, 12);
mapDarkblue.switchBackgroundLayer(bemap.miniweb.getGeoserver());

mapDarkblue.refresh();

bemap.miniweb.onChangeGeoserver(function(geoserver) {
  mapDarkblue.switchBackgroundLayer(geoserver);
});
```
