# BeMap JS API

## Geocoding
Geocoding is the process of converting textual postal address to a geographical longitude and latitude coordinates.

_For more details: [Wikipedia](https://en.wikipedia.org/wiki/Geocoding)_

## Sample
For more details see the documentation API of [Geocoding](index.html#subpage-rest_0_9_0-geocoding-bnd.md).

<form class="form-horizontal" role="form">
  <div class="panel panel-default">
    <div class="panel-heading">Please enter valid address elements: Country | City | Postal Code | Street number.</div>
      <div class="panel-body">
        <div class="row">
          <div class="col-md-6">
            <label for="inputType" class="control-label">Country</label>
            <input type="text" class="form-control" id="country" value="USA" placeholder="Country"/>
          </div>
          <div class="col-md-6">
            <label for="inputType" class="control-label">City</label>
            <input type="text" class="form-control" id="city" value="New York" placeholder="City"/>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <label for="inputType" class="control-label">Postal code</label>
            <input type="text" class="form-control" id="postalCode" value="" placeholder="PostalCode"/>
          </div>
          <div class="col-md-6">
            <label for="inputType" class="control-label">Place (street name or POI)</label>
            <input type="text" class="form-control" id="street" value="Brooklyn" placeholder="Street"/>
          </div>
        </div>
        <div class="row form-group">
          <div class="col-md-6">
            <label for="inputType" class="control-label">Language code (fr/en/es/ru...)</label>
            <input type="text" class="form-control" id="language" value="xx" placeholder="Language: fr/en/es/ru..."/>
          </div>
          <div class="col-md-6">
            <label for="selectType" class="control-label">Search type</label><br/>
            <select id="searchType" class="selectpicker" title="Choose one of the following...">
              <option value="CONTAINS">CONTAINS</option>
              <option value="FUZZY" selected>FUZZY</option>
              <option value="KEY_SEARCH">KEY_SEARCH</option>
              <option value="STRICT">STRICT</option>
              <option value="STRICT_BEGINNING">STRICT_BEGINNING</option>
              <option value="WORD_BEGINNING">WORD_BEGINNING</option>
            </select>
          </div>
        </div>
        <div class="row form-group">
          <div class="col-md-6">
            <label for="inputType" class="control-label">Quantity</label>
            <input type="text" class="form-control" id="quantity" value="5" placeholder=""/>
          </div>
        </div>
        <div class="row form-group">
          <div class="col-md-12">
            <button type="button" class="btn btn-primary" id="find"><span></span> Research</button>
            <button type="button" class="btn btn-primary" id="reset"><span></span> Reset</button>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">

```
{"bemap":{"language":"javascript","mapid":"map1","run":true,"hide":true}}

var bemap = bemap || {};

var longitude = 2.3412;
var latitude = 48.85693;
var map = new bemap.LeafletMap(bemapMainCtx, 'map1').backgroundLayers(bemap.miniweb.getGeoservers()).move(-73.896794, 40.696767, 11);
//is recommended to keep map in object
map.switchBackgroundLayer(bemap.miniweb.getGeoserver());

map.refresh();

bemap.map = map;

bemap.miniweb.onChangeGeoserver(function(geoserver) {
  bemap.map.switchBackgroundLayer(geoserver);
});



//call the geocoder class
var geo = new bemap.Geocoder(bemapMainCtx);


$('.selectpicker').selectpicker('render');

//after click clear all markers from map
$('#reset').click(function() {
  geo.cleanMarkers();
  $('#responseContainer').empty();
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
  }
  /*to call function of geocode is required to create object with:
   * geoserver
   * searchInfo - object bemap.GeoSearchInfo with all input fields (id's or var)
   * call success function to get callback (response - parsed, doc - notparsed, object - this, xhr - request)
   */
  var elements = {
    geoserver: bemapMainCtx.geoserver,
    searchInfo: new bemap.GeoSearchInfo({
      searchType: $('#searchType').val(),
      country: $('#country').val(),
      postalCode: $('#postalCode').val(),
      city: $('#city').val(),
      street: $('#street').val(),
      language: $('#language').val(),
      maxResult: $('#quantity').val()
    }),
    success: function(response, doc, object, xhr) {
      console.log("parsed");
      console.log(response);
      console.log("not parsed");
      console.log(doc);
      console.log("this object");
      console.log(object);
      console.log("request");
      console.log(xhr);
      //example of creating markers with bemap-js-api mapping
      /*for (var i = 0; i < response.geocodingItems.length; i++) {
        var res = response.geocodingItems[i]

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
          res.Coordinate, {
            properties: res,
            icon: icon,
            id: res.index
          });
        map.addMarker(marker);

        marker.on(bemap.Map.EventType.CLICK, function(mapEvent) {
          console.log(mapEvent);
        });
      }*/

      //example of creating markers with geocoder solutions
      var container = $('#responseContainer');
      //is required to create object with map, response form server and contaner in which create table optionally icon if want to create markers
      var options = {
        map: bemap.map,
        response: response,
        container: container,
        icone: icone
      }
      //create markers, optionally call function to get click response
      geo.showOnMap(options, function(res) {
        console.log("info after click on marker");
        console.log(res);
      });
      //create table, optionally call function to get click response
      geo.createTable(options, function(res) {
        console.log('info after click on list');
        console.log(res);

        var options1 = {
          map: bemap.map,
          response: res,
          icone: icone
        }
        //create marker from click on table, optionally call function to get click response
        geo.showOnMap(options1, function(data) {
          console.log('info after click on marker made by list');
          console.log(data);
        })
      });

    }
  }
  //call geocode method
  geo.geocode(elements);

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
  //is recommended to put class call into object
  bemap.geo = geo;
```

#### __Geocode method__
Call `geocoding` method and use `elements` like a parameter.

See below for more details on how to create `elements` object:

##### __geoserver__ : map geoserver (in example used `bemapMainCtx` object)

##### __searchInfo__ : `bemap.GeoSearchInfo` object with all request data


Examples : `searchType` ,`country`, `postalCode`, `city`, `street`, `language`, `maxResult`
Defines all the possible types of research (`searchType`) that can be applied to a textual pattern :

* ``CONTAINS``: Means that the pattern must be contained in the required strings.
* ``FUZZY``: Means that the pattern will be used to perform a fuzzy search based on the pattern. (Fuzzy searching can be useful when you are searching text that may contain misspelled words).
* ``KEY_SEARCH``: Specifies a search on key ids. This criteria can be used for retrieving an item by its numerical key.
* ``STRICT``: Means that the required string must be strictly equal to the pattern.
* ``STRICT_BEGINNING``: Means that the required strings must begin with the pattern.
* ``WORD_BEGINNING``: Means that one word of required strings must begin with the pattern (characters ' ', '-' and '/' are considered as word separators).

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
  searchInfo: new bemap.GeoSearchInfo({
    searchType: $('#searchType').val(),
    country: $('#country').val(),
    postalCode: $('#postalCode').val(),
    city: $('#city').val(),
    street: $('#street').val(),
    language: $('#language').val(),
    maxResult: $('#quantity').val()
  }),
  success: function(response, doc, object, xhr) {

  }
}

bemap.geo.geocode(elements);
```

#### __createTable method__

Method to create a table with all geocoding results

Call `createTable` method and use `options` like a parameter, optionally use callback function to get data from table click.


See below for more details how to create `options` object:

##### __map__ : bemap.map object

##### __response__ : parsed response from `geocoding` method

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

##### __response__ : parsed response from `geocoding` method or from `createTable` method

##### __icone__ : icon object

##### __layer__ : ``layer`` optional object, to add marker on chosen layer

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

#### Example using `Geocoding` methods to build table and show markers


```
{"bemap":{"language":"javascript","hide":false}}
//call the geocoding class
var geo = new bemap.Geocoder(bemapMainCtx);

//after click clear all markers from map
$('#reset').click(function() {
  geo.cleanMarkers()
})

//call geocoding functions
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
  }
  /*to call function of geocoding is required to create object with:
   * geoserver
   * searchInfo - object bemap.GeoSearchInfo with all input fields (id's or var)
   * call success function to get callback (response - parsed, doc - notparsed, object - this, xhr - request)
   */
  var elements = {
    geoserver: bemapMainCtx.geoserver,
    searchInfo: new bemap.GeoSearchInfo({
      searchType: $('#searchType').val(),
      country: $('#country').val(),
      postalCode: $('#postalCode').val(),
      city: $('#city').val(),
      street: $('#street').val(),
      language: $('#language').val(),
      maxResult: $('#quantity').val()
    }),
    success: function(response, doc, object, xhr) {
      console.log("parsed");
      console.log(response);
      console.log("not parsed");
      console.log(doc);
      console.log("this object");
      console.log(object);
      console.log("request");
      console.log(xhr);
      //example of creating markers with geocoding solutions
      var container = $('#responseContainer');
      //is required to create object with map, response form server and container in which create table, optionally icon if want to create markers
      var options = {
        map: bemap.map,
        response: response,
        container: container,
        icone: icone
      }
      //create markers, optionally call function to get click response
      geo.showOnMap(options, function(res) {
        console.log("info after click on marker");
        console.log(res);
      });
      //create table, optionally call function to get click response
      geo.createTable(options, function(res) {
        console.log('info after click on list');
        console.log(res);

        var options1 = {
          map: bemap.map,
          response: res,
          icone: icone
        }
        //create marker from click on table, optionally call function to get click response
        geo.showOnMap(options1, function(data) {
          console.log('info after click on marker made by list');
          console.log(data);
        })
      });
    }
  }
  //call geocoding method
  geo.geocode(elements);

});
```




#### Example using ``mapping`` methods to show markers

```
{"bemap":{"language":"javascript","hide":false}}
//call the geocoder class
var geo = new bemap.Geocoder(bemapMainCtx);

//after click clear all markers from map
$('#reset').click(function() {
  geo.cleanMarkers();
  $('#responseContainer').empty();
})

//call geocoder methods
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
  }
  /*to call function of geocode is required to create object with:
   * geoserver
   * searchInfo - object bemap.GeoSearchInfo with all input fields (id's or var)
   * call success function to get callback (response - parsed, doc - notparsed, object - this, xhr - request)
   */
  var elements = {
    geoserver: bemapMainCtx.geoserver,
    searchInfo: new bemap.GeoSearchInfo({
      searchType: $('#searchType').val(),
      country: $('#country').val(),
      postalCode: $('#postalCode').val(),
      city: $('#city').val(),
      street: $('#street').val(),
      language: $('#language').val(),
      maxResult: $('#quantity').val()
    }),
    success: function(response, doc, object, xhr) {
      console.log("parsed");
      console.log(response);
      console.log("not parsed");
      console.log(doc);
      console.log("this object");
      console.log(object);
      console.log("request");
      console.log(xhr);
      //example of creating markers with bemap-js-api mapping

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

      for (var i = 0; i < response.geocodingItems.length; i++) {
        var res = response.geocodingItems[i]

        var marker = new bemap.Marker(
          res.Coordinate, {
            properties: res,
            icon: icon,
            id: res.index
          });
        map.addMarker(marker);

        marker.on(bemap.Map.EventType.CLICK, function(mapEvent) {
          console.log(mapEvent);
        });
      }
    }
  }
  //call geocode method
  geo.geocode(elements);

});
```



See the [authentication page](index.html#page-authentication.md) for the login, password process.
