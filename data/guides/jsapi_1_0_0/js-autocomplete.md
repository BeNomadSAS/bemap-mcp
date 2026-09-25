# BeMap JS API

## Autocomplete
Autocomplete, or word completion, is a feature in which an application predicts the rest of a word a user is typing

_For more details: [Wikipedia](https://en.wikipedia.org/wiki/Autocomplete)_

## Sample
For more details see the documentation API of [Autocomplete](index.html#page-autocompletegeocoding.md).


See the JavaScript console to get examples of responses.
<style media="screen">
  .glyphiconCustom {
    top: 2.6rem;
    right: 1.5rem;
  }
</style>
<form class="form-horizontal" role="form">
  <div class="panel panel-default">
    <div class="panel-heading">Please enter valid address elements: Country | City | Street .</div>

```
{"bemap":{"language":"javascript","mapid":"map1","run":true,"hide":true}}


var miniweb = bemap['miniweb'];
var map = new bemap.LeafletMap(bemapMainCtx, 'map1')
    .backgroundLayers(miniweb.getGeoservers())
    .defaultOverlayLayers()
    .move(2.0, 47.0, 5);
map.switchBackgroundLayer(miniweb.getGeoserver());

bemap.map = map;

miniweb.onChangeGeoserver(function(geoserver) {
    map.switchBackgroundLayer(geoserver);
});

```

      <div class="panel-body">
        <div class="row">
          <div class="col-md-12">
            <label for="inputType" class="control-label">Country - with all autocomplete features</label>
            <span class="glyphicon glyphiconCustom form-control-feedback"></span>
            <input type="text" class="form-control" id="autoInput" value="" placeholder="Country"/>
          </div>

        </div>
        <div class="row">
          <div class="col-md-12">
            <label for="inputType" class="control-label">City - with mapping move method</label>
            <span class="glyphicon glyphiconCustom form-control-feedback"></span>
            <input type="text" class="form-control" id="autoInput1" value="" placeholder="City"/>
          </div>

        </div>

        <div class="row form-group">
          <div class="col-md-12">
            <label for="inputType" class="control-label">Street - with no feature</label>
            <span class="glyphicon glyphiconCustom form-control-feedback"></span>
            <input type="text" class="form-control" id="autoInput2" value="" placeholder="Street"/>
          </div>
        </div>

        <div class="row form-group">
          <div class="col-md-12">
            <label for="inputType" class="control-label">Place - with query method</label>
            <span class="glyphicon glyphiconCustom form-control-feedback"></span>
            <input type="text" class="form-control" id="autoInput3" value="" placeholder="Place"/>
          </div>
        </div>

      </div>
    </div>
  </div>
</form>




```
{"bemap":{"language":"javascript","run":true,"hide":true}}

var ac = new bemap.Autocomplete(bemapMainCtx);

var options = {
  src: 'images/map-marker-blue.svg'
};

var options1 = {
  map : map,
  id: '#autoInput',
  animation : true
};

var options2 = {
  map : map,
  id: '#autoInput1'
};

var options3 = {
  map : map,
  id: '#autoInput2'
};

ac.autocomp(options1, function(result) {
  console.log("Result from autocomplete selected item click");
  console.log(result);
  ac.showOnMap(bemap.map, result.coordinate, options);
  bemap.map.move(result.coordinate.longitude, result.coordinate.latitude, 5);
});

ac.autocomp(options2, function(result) {
  console.log("Result from autocomplete selected item click");
  console.log(result);
  bemap.map.move(result.coordinate.longitude, result.coordinate.latitude, 15);
});

ac.autocomp(options3);


$('#autoInput3').keyup(function() {
  ac.query(bemap.map, this.value, function(result) {
    console.log("Result from autocomplete query method");
    console.log(result);
  });
})

```


## Code
#### __Class initialization__
Call `bemap.Autocomplete` class and use context `bemapMainCtx`, `options` object (optionally for changing geoserver) like a parameter.

* `geoserver`: 'geoserver'

See the context example creation [page](index.html#subpage-jsapi_1_0_0-js-authentication.md).

```
{"bemap":{"language":"javascript","hide":false}}
  var ac = new bemap.Autocomplete(bemapMainCtx, options);
  //is recomended to put class call into object
bemap.ac = ac;
```

#### __Autocomplete method__
Call `autocomp` method and use `options`, `callback` like a parameter.

See below for more details how to create `options` object:

##### __options__ : `options` object

* `map`: bemap.map
* `id`: ``id`` from input where you want your autocomplete to be
* `animation`: bool

##### __callback__ : callback function to get response from server

```
{"bemap":{"language":"javascript","hide":false}}
var options = {
  map : map,
  id: '#autoInput',
  animation : true
};

bemap.ac.autocomp(options, function(result) {

});
```

#### __showOnMap method__

Method to show marker on map from selected autocomplete result

Call `showOnMap` method and use `map`, `coordinates` and `options` like a parameter .

* __map__ : bemap.map object

* __coordinates__ : parsed coordinates from `autocomp` method

See below for more details how to create `options` object:

##### __src__ : marker icon adress required

##### __layer__ : ``layer`` object optionally, to add marker on choosen layer

```
{"bemap":{"language":"javascript","hide":false}}

var options = {
  src: 'images/map-marker-blue.svg',
  layer : yourLayer // optionally
};

bemap.ac.showOnMap(bemap.map, result.coordinate, options);
```
#### __query method__

Method to get result of autocomplete without passing an id

Call `query` method and use `map`, ``query`` and `callback` like a parameter .

##### __map__ : bemap.map object

##### __query__ : searching string

##### __callback__ : function to get result from server

```
{"bemap":{"language":"javascript","hide":false}}
bemap.ac.query(bemap.map, query, function(result) {
  console.log(result);
});
```

## Working examples

#### Example using `Autocomplete` methods to show markers


```
{"bemap":{"language":"javascript","hide":false}}
var ac = new bemap.Autocomplete(bemapMainCtx);
bemap.ac = ac;

/*
*autocomplete with show on map method after call back function
*/
var options1 = {
  map : map,
  id: '#autoInput',
  animation : true
};
//icon options
var options = {
  src: 'images/map-marker-blue.svg'
};

bemap.ac.autocomp(options1, function(result) {
  bemapac.showOnMap(bemap.map, result.coordinate, options);
  //used mapping move method
  bemap.map.move(result.coordinate.longitude, result.coordinate.latitude, 5);
});

/*
*autocomplete with call back function
*/
var options2 = {
  map : map,
  id: '#autoInput1'
};

bemap.ac.autocomp(options2, function(result) {
  //used mapping move method
  bemap.map.move(result.coordinate.longitude, result.coordinate.latitude, 15);
});

/*
*autocomplete without any features
*/
var options3 = {
  map : map,
  id: '#autoInput2'
};

bemap.ac.autocomp(options3);
```

#### Example using ``query`` methods to get result

```
{"bemap":{"language":"javascript","hide":false}}
$('#autoInput').keyup(function() {
  bemap.ac.query(bemap.map, this.value, function(result) {
    console.log(result);
  });
})

```
### __HTML__ : example
```
{"bemap":{"language":"xml","hide":false}}
<style media="screen">
  .glyphicon {
    top: 2.6rem;
    right: 1.5rem;
  }
</style>

<form class="form-horizontal" role="form">
  <div class="panel panel-default">
    <div class="panel-heading">Please enter valid address elements: Country | City | Street .</div>
      <div class="panel-body">

        <div class="row">
          <div class="col-md-12">
            <label for="inputType" class="control-label">Country - with all autocomplete features</label>
            <span class="glyphicon form-control-feedback"></span>
            <input type="text" class="form-control" id="autoInput" value="" placeholder="Country"/>
          </div>
        </div>

        <div class="row">
          <div class="col-md-12">
            <label for="inputType" class="control-label">City - with mapping move method</label>
            <span class="glyphicon form-control-feedback"></span>
            <input type="text" class="form-control" id="autoInput1" value="" placeholder="City"/>
          </div>
        </div>

        <div class="row form-group">
          <div class="col-md-12">
            <label for="inputType" class="control-label">Street - with no feature</label>
            <span class="glyphicon form-control-feedback"></span>
            <input type="text" class="form-control" id="autoInput2" value="" placeholder="Street"/>
          </div>
        </div>

        <div class="row form-group">
          <div class="col-md-12">
            <label for="inputType" class="control-label">Place - with query method</label>
            <span class="glyphicon form-control-feedback"></span>
            <input type="text" class="form-control" id="autoInput3" value="" placeholder="Place"/>
          </div>
        </div>

      </div>
    </div>
  </div>
</form>
```


See the [authentication page](index.html#page-authentication.md) for the login, password process.
