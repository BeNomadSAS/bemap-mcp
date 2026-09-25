# BeMap JS API

## Reverse geocoding
Reverse geocoding is the process of back (reverse) coding of a point location (latitude, longitude) to a readable address or place name. This permits the identification of nearby street addresses, places, and/or areal subdivisions such as neighbourhoods, county, state, or country. Combined with geocoding and routing services, reverse geocoding is a critical component of mobile location-based services and Enhanced 911 to convert a coordinate obtained by GPS to a readable street address which is easier to understand by the end user.

_For more details: [Wikipedia](https://en.wikipedia.org/wiki/Reverse_geocoding)_

## Sample
For more details see the documentation API of [reverse-geocoding](index.html#subpage-rest_0_9_0-reversegeocoding-bnd.md).

<form class="form-horizontal" role="form">
  <div class="panel panel-default">
    <div class="panel-heading">Please enter valid coordinate: Latitude and longitude.</div>
      <div class="panel-body">
        <div class="row">
          <div class="col-md-6">
            <label for="inputType" class="control-label">Longitude</label>
            <input type="text" class="form-control" id="longitude" value="-73.896794" placeholder="Longitude" />
          </div>
          <div class="col-md-6">
            <label for="inputType" class="control-label">Latitude</label>
            <input type="text" class="form-control" id="latitude" value="40.696767" placeholder="Latitude" />
          </div>
        </div>
        <div class="row form-group">
          <div class="col-md-6">
            <label for="inputType" class="control-label">Radius (meters)</label>
            <input type="text" class="form-control" id="radius" value="1000" placeholder="Radius" />
          </div>
          <div class="col-md-6">
            <label for="inputType" class="control-label">Language code (fr/en/es/ru...)</label>
            <input type="text" class="form-control" id="language" value="on" placeholder="Language: fr/en/es/ru..." />
            <i>on = official name, the name used in the country.</i>
          </div>
        </div>
        <div class="row form-group">
          <div class="col-md-12">
            <button type="button" class="btn btn-primary" id="find"><span></span> Research</button>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">


```
{"bemap":{"language":"javascript","mapid":"map1","run":true,"hide":true}}

var bemap = bemap || {};
bemap.sample = bemap.sample || {};

var longitude = 2.3412;
var latitude = 48.85693;
var map = new bemap.LeafletMap(bemapMainCtx, 'map1').backgroundLayers(bemap.miniweb.getGeoservers()).move(-73.896794, 40.696767, 11);
//is recommended to keep map in object
map.switchBackgroundLayer(bemap.miniweb.getGeoserver());

map.refresh();

bemap.sample.map = map;

bemap.miniweb.onChangeGeoserver(function(geoserver) {
  bemap.sample.map.switchBackgroundLayer(geoserver);
});



//call the geocoder class
var geo = new bemap.Geocoder(bemapMainCtx);

//after click clear all markers from map
$('#reset').click(function() {
  geo.cleanMarkers()
})

//call geocoder functions

  $('#find').click(function() {

    var icone = {
      src: 'images/map-marker-blue.svg',
      anchorX: 0.26,
      anchorY: 0.9,
      height: 36,
      width: 32,
      anchorXUnits: 'fraction',
      anchorYUnits: 'fraction',
      scale: 1.3
    };
    /*to call function of revgeocode is required to create object with:
     * geoserver
     * searchInfo - object bemap.GeoSearchInfo with all input fields (id's or var)
     * call success function to get callback (response - parsed, doc - notparsed, object - this, xhr - request)
     */
    var elements = {
      geoserver: bemapMainCtx.geoserver,
      searchInfo: new bemap.RevGeoSearchInfo({
        xy: $('#longitude').val() + ',' + $('#latitude').val(),
        radius: $('#radius').val(),
        language: $('#language').val(),
        maxResult: $('#maxResult').val()
      }),
      success: function(response, doc, object, xhr) {

        var container = $('#responseContainer');
        //is required to create object with map, response form server and contaner in which create table optionally icon if want to create markers
        var options = {
          map: bemap.sample.map,
          response: response,
          container: container,
          icone: icone
        }
        //create marker, optionally call function to get click response
        geo.showOnMap(options);
        //create table, optionally call function to get click response
        geo.createTable(options, function(res) {
          console.log('info after click on list');
          console.log(res);
          var options1 = {
            map: bemap.sample.map,
            response: res,
            icone: icone
          }
          //create marker from table click, optionally call function to get click response
          geo.showOnMap(options1, function(res){
            console.log(res)
          });
        });
      }
    }
    //call revgeocode method
    geo.revGeocode(elements)

  });

```


          </div>
          <div class="col-md-6">
            <div id="responseContainer"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</form>



## Code
#### __Class initialization__
Call `bemap.Geocoder` class and use context `bemapMainCtx` like a parameter.

See the context example creation [page](index.html#subpage-jsapi_1_0_0-js-authentication.md).

```
{"bemap":{"language":"javascript","hide":false}}
  var geo = new bemap.Geocoder(bemapMainCtx);
  //is recomended to put class call into object
  bemap.geo = geo;
```

#### __RevGeocode method__
Call `revGeocode` method and use `elements` like a parameter.

See below for more details how to create `elements` object:

##### __geoserver__ : map geoserver (in example used `bemapMainCtx` object)

##### __searchType__ : `bemap.GeoSearchInfo` object with all request data

##### __success__ : callback function to get response from server
* `response`: parsed response
* `doc`: response from server
* `object`: this object of context
* `xhr`: request

See the JavaScript console to get examples of responses

```
{"bemap":{"language":"javascript","hide":false}}
var elements = {
  geoserver: bemapMainCtx.geoserver,
  searchInfo: new bemap.RevGeoSearchInfo({
    xy: $('#longitude').val() + ',' + $('#latitude').val(),
    radius: $('#radius').val(),
    language: $('#languageRev').val(),
    maxResult: $('#maxResult').val()
  }),
  success: function(response, doc, object, xhr) {

  }
}

bemap.geo.geocode(elements);
```

#### __createTable method__

Method to create table with all geocode results

Call `createTable` method and use `options` like a parameter, optionally use callback function to get data from table click.


See below for more details how to create `options` object:

##### __map__ : bemap.map object

##### __response__ : parsed response from `geocode` method

##### __container__ : div where table must be created

Response `res` from callback you can see in JavaScript console

```
{"bemap":{"language":"javascript","hide":false}}
var container = $('#responseContainer');

var options = {
  map: bemap.map,
  response: response,
  container: container
}

//simple example
geo.createTable(options);

//example with callback function
geo.createTable(options, function(res) {

});
```
#### __showOnMap method__

Method to place marker/markers on map

Call `showOnMap` method and use `options` like a parameter, optionally use callback function to get data from marker click.


See below for more details how to create `options` object:

##### __map__ : bemap.map object

##### __response__ : parsed response from `geocode` method or from `createTable` method

##### __icone__ : icone object

##### __layer__ : ``layer`` object optionally, to add marker on choosen layer

Response `res` from callback you can see in JavaScript console


```
{"bemap":{"language":"javascript","hide":false}}
var icone = {
  src: 'images/map-marker-blue.svg',
  anchorX: 0.26,
  anchorY: 0.9,
  height: 36,
  width: 32,
  anchorXUnits: 'fraction',
  anchorYUnits: 'fraction',
  scale: 1.3
}

var options = {
  map: bemap.map,
  response: response,
  icone: icone,
  layer: nameOfYourLayer
}
//create markers, optionally call function to get click response
geo.showOnMap(options, function(res) {

});
```



#### __cleanMarkers method__

Method to clear marker/markers from map

Call `cleanMarkers` method

```
{"bemap":{"language":"javascript","hide":false}}
geo.cleanMarkers()
```

## Working examples

#### Example using `RevGeocoder` methods to build table and show markers


```
{"bemap":{"language":"javascript","hide":false}}
//call th egeocoder class
var geo = new bemap.Geocoder(bemapMainCtx);

//after click clear all markers from map
$('#reset').click(function() {
  geo.cleanMarkers()
})

$('#find').click(function() {

  var icone = {
    src: 'images/map-marker-blue.svg',
    anchorX: 0.26,
    anchorY: 0.9,
    height: 36,
    width: 32,
    anchorXUnits: 'fraction',
    anchorYUnits: 'fraction',
    scale: 1.3
  };
  /*to call function of revgeocode is required to create object with:
   * geoserver
   * searchInfo - object bemap.GeoSearchInfo with all input fields (id's or var)
   * call success function to get callback (response - parsed, doc - notparsed, object - this, xhr - request)
   */
  var elements = {
    geoserver: bemapMainCtx.geoserver,
    searchInfo: new bemap.RevGeoSearchInfo({
      xy: $('#longitude').val() + ',' + $('#latitude').val(),
      radius: $('#radius').val(),
      language: $('#languageRev').val(),
      maxResult: $('#maxResult').val()
    }),
    success: function(response, doc, object, xhr) {

      var container = $('#responseContainer');
      //is required to create object with map, response form server and contaner in which create table optionally icon if want to create markers
      var options = {
        map: bemap.map,
        response: response,
        container: container,
        icone: icone
      }
      //create marker, optionally call function to get click response
      geo.showOnMap(options);
      //create table, optionally call function to get click response
      geo.createTable(options, function(res) {
        console.log('info after click on list');
        console.log(res);
        var options1 = {
          map: bemap.map,
          response: res,
          icone: icone
        }
        //create marker from table click, optionally call function to get click response
        geo.showOnMap(options1, function(res){
          console.log(res);
        });
      });
    }
  }
  //call revgeocode method
  geo.revGeocode(elements)

});
```




See the [authentication page](index.html#page-authentication.md) for the login, password process.
