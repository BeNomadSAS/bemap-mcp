# BeMap JS API

## Live traffic display

```
{"bemap":{"language":"javascript","mapid":"map1","run":true,"hide":true}}
var map = new bemap.LeafletMap(bemapMainCtx, 'map1').backgroundLayers(bemap.miniweb.getGeoservers()).defaultLayers().move(-73.896794, 40.696767, 12);
//is recommended to keep map in object
map.switchBackgroundLayer(bemap.miniweb.getGeoserver());

bemap.map = map;
bemap.layers = {}

bemap.miniweb.onChangeGeoserver(function(geoserver) {
  bemap.map.switchBackgroundLayer(geoserver);
});


```

<button type="button" class="btn btn-primary" id="refresh"><span></span> Refresh</button>
<button type="button" class="btn btn-primary" id="move"><span></span> Move to Paris</button>
#### __Live traffic__
Live traffic is a simple layer, create layer by calling `bemap.BemapLayer` method and create option object with:
* `geoserver` : 'default'
* `styles` : 'traffic'
* `format` : 'image/png24'

```
{"bemap":{"language":"javascript","run":true,"hide":true}}

bemap.layers.trafficWms = new bemap.BemapLayer({
  name: "trafficWms",
  geoserver: bemapMainCtx.geoserver,
  //url : bemapMainCtx.getBaseUrl() + 'wms?',
  //layers : '6913,6912,6911,6910,9990',
  styles : 'traffic',
  format : 'image/png24',
  // attributes : 'FEATURE_CLASS_CODE,TRAFIC_INFO',
  //attributes : '1,21581',
  //transparent : true
});

bemap.map.addLayer(bemap.layers.trafficWms);

bemap.reloadTrafficLayer = function () {
	if (bemap.layers.trafficWms == null || !bemap.layers.trafficWms.isVisible())
		return;
	bemap.map.refreshLayer(bemap.layers.trafficWms);
}

$('#refresh').click(function(){
  bemap.reloadTrafficLayer();
})

$('#move').click(function(){
  bemap.map.move('2.3522241927861565','48.85690725709406' , 12 )
})

```


```
{"bemap":{"language":"javascript","run":false}}
bemap.layers.trafficWms = new bemap.BemapLayer( {
  geoserver: ctx.geoserver,
  styles : 'traffic',
  format : 'image/png24'
});

bemap.map.addLayer(bemap.layers.trafficWms);
```


#### __JavaScript examples__
use `bemap.map.refreshLayer` method to refresh live traffic layer
```
{"bemap":{"language":"javascript","run":false}}
bemap.map.refreshLayer(bemap.layers.trafficWms);
```

Refresh layer every 60s
```
{"bemap":{"language":"javascript","run":false}}

function reloadTrafficLayer() {
	if (bemap.layers.trafficWms == null || !bemap.layers.trafficWms.isVisible())
		return;
	bemap.map.refreshLayer(bemap.layers.trafficWms);
};

setInterval(reloadTrafficLayer(), 60000);
```

## Working example


Example with live traffic refreshed by on button click

```
{"bemap":{"language":"javascript"}}
var map = new bemap.LeafletMap(ctx, 'map1').defaultLayers().move(2.0, 47.0, 5);
//is recommended to keep map and layers in object
bemap.map = map;
bemap.layers = {}

bemap.layers.trafficWms = new bemap.BemapLayer( {
  geoserver: ctx.geoserver,
  styles : 'traffic',
  format : 'image/png24'
});

bemap.map.addLayer(bemap.layers.trafficWms);

function reloadTrafficLayer() {
	if (bemap.layers.trafficWms == null || !bemap.layers.trafficWms.isVisible()){
    return;
  };
  bemap.map.refreshLayer(bemap.layers.trafficWms);
};

$('#refresh').click(function(){
  reloadTrafficLayer();
});
```

See the complete feature of [OpenLayers](https://leafletjs.com//).
