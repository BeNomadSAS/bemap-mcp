# BeMap JS API

## Routing
Perform route computations through an inter-connected road network.

## Sample
For more details see the documentation API of [Routing](index.html#subpage-rest_0_9_0-routing-bnd.md).
<style>
.label-custom {
 display: block;
 margin: 0 0 10px;
 padding: 6px 12px;
 border: 1px solid #ccc;
 border-radius: 4px;
}

.label-custom:hover {
 background: #eee;
 cursor: pointer;
}
</style>

<form class="form-horizontal" role="form">
  <div class="panel panel-default">
    <div class="panel-heading">Click on the map to add your start and destination.</div>
      <div class="panel-body">
        <div class="row">
          <div class="col-md-6">

```
{"bemap":{"language":"javascript","mapid":"map1","run":true,"hide":true}}
var bemap = bemap || {};
bemap.sample = bemap.sample || {};
bemap.sample.layers = {};
bemap.sample.destinations = [];
$(document).ready(function() {
  bemap.sample.init();
document.getElementById('map1').style.height = '500px';
  var map = new bemap.LeafletMap(bemapMainCtx, 'map1').backgroundLayers(bemap.miniweb.getGeoservers()).move(7.133977,43.635860, 9);
  //is recommended to keep map in object
  map.switchBackgroundLayer(bemap.miniweb.getGeoserver());

  map.refresh();

  bemap.sample.geo = new bemap.Geocoder(bemapMainCtx);

  bemap.sample.rou = new bemap.Routing(bemapMainCtx)

  map.on(bemap.Map.EventType.CLICK, function(mapEvent) {
    bemap.sample.reverseGeocoding(mapEvent);
  });

  bemap.sample.markerIcon = new bemap.Icon({
    src: 'images/map-marker-blue.svg',
    anchorX: 0.26,
    anchorY: 0.9,
    height: 36,
    width: 32,
    anchorXUnits: 'fraction',
    anchorYUnits: 'fraction',
    scale: 1.3
  });

  bemap.sample.map = map;

  bemap.miniweb.onChangeGeoserver(function(geoserver) {
    bemap.sample.map.switchBackgroundLayer(geoserver);
  });

});

bemap.sample.reverseGeocoding = function(mapEvent) {
  var p = mapEvent.coordinate;

  var elements = {
    geoserver: bemapMainCtx.geoserver,
    searchInfo: new bemap.RevGeoSearchInfo({
      xy: p.lon + ',' + p.lat,
      radius: "500",
      maxResult: "1"
    }),
    success: function(response, doc, object, xhr) {

      bemap.sample.reverseGeocodingParser(mapEvent, doc, response);
    }
  }
  //call revgeocode method
  bemap.sample.geo.revGeocode(elements)
}

bemap.sample.reverseGeocodingParser = function(mapEvent, jsonDoc, response) {
  var map = bemap.sample.map;
  var popup = bemap.sample.popup;
  var p = mapEvent.coordinate;

  var elements = jsonDoc.BND.Elements.Element;
  popup = new bemap.Popup({
    coordinate: p,
    visible: true,
    information: bemap.sample.buildPopup(elements)
  });

  map.addPopup(popup);

  bemap.sample.popup = popup;

  var container = $('#responseContainer table tbody');

  if (elements.length == 0) {
    return;
  }

  bemap.sample.addPoi(elements[0], container);
};

bemap.sample.resetTable = function() {
  $('#myTable > tbody > tr').remove();
  bemap.sample.rou.reset()
  bemap.sample.map.clearPopup();
  bemap.sample.destinations = []
}



bemap.sample.buildPopup = function(e) {
  if (e.length == 0) {
    var html = '<p style="font-size:22px;color:red;"><span class=""></span> Address not found!</p>';

    console.error("Address not found!");

    return html;
  }

  var el = e[0];
  var p = el.PostalAddress;
  var c = el.Coordinate;

  var html = '<div class="row">';
  html += '<div class="col-md-12">';
  html += '<h4 style="color: blue">Local Data</h4>';
  html += 'City: ' + p.City + '</br>';
  html += 'Country: ' + p.Country + '</br>';
  html += 'Postal Code: ' + p.PostalCode + '</br>';
  html += 'Lon: ' + c.x + '</br>';
  html += 'Lat: ' + c.y + '</br>';
  html += '<div class="row">';
  html += '<div class="col-md-6">';
  html += '</br><button type="button" class="btn btn-primary addInfo" id="addInfo"><span></span> Add POI</button>';
  html += '</div></div></div></div></div>';

  return html;
}

bemap.sample.addPoi = function(element, container) {
  var p = element.PostalAddress;
  var c = element.Coordinate;

  $('.addInfo').on("click", function() {

    bemap.sample.map.clearPopup();

    var destination = {
      city: p.City,
      country: p.Country,
      postalCode: p.PostalCode,
      streetNumber: p.StreetNumber,
      street: p.Street,
      x: c.x,
      y: c.y,
      sl: element.SpeedLimit
    };

    var html = '<tr id="Row" class="cursorPointer">';
    html += '<td>' + destination.city + '</td>';
    html += '<td>' + destination.country + '</td><td>' + destination.postalCode + '</td>';
    html += '<td>' + destination.streetNumber + ' ' + destination.street + '</td>';
    html += '<td id="longitude">' + destination.x + '</td><td id="latitude">' + destination.y + '</td>';
    html += '</tr>';

    container.append(html);
    container.parent().closest('div').show()

    var coord = new bemap.Coordinate(c.x, c.y)
    var markerOptions = {
      map: bemap.sample.map,
      icon: bemap.sample.markerIcon,
      coord: coord,
      properties: html
    }

    bemap.sample.rou.createMarker(markerOptions)

    bemap.sample.destinations.push(coord)
  });
}

bemap.sample.run = function() {
  var elements = {}
  elements.request = {}
  elements.geoserver = bemapMainCtx.geoserver;

  /*
  destinations
  */
  if (bemap.sample.destinations && bemap.sample.destinations !== null) {
    elements.request.destinations = bemap.sample.destinations;
  }
  /*
  CRITERIAS
  */
  var criteriasArray = [];
  var $criteriasBox = $("input[name='criterias']:checked");
  if ($("input[name='criterias']").is(":checked")) {
    $criteriasBox.each(function() {
      criteriasArray.push($(this).val());
    });
    elements.request.criterias = criteriasArray;
    criteriasArray = [];
  }
  /*
  departureTime
  */
  var departureTime = $('#departureDate').val()
  var myDate = new Date(departureTime);
  var myDateMili = myDate.getTime();
  if (departureTime) {
    elements.request.departureTime = myDateMili;
  }
  /*
  maxAlter
  */
  if ($('#maxAlter').val() > 0) {
    elements.request.maxAlter = $('#maxAlter').val();
  }
  /*
  options
  */
  if ($('#options').val().length !== 0) {
    elements.request.options = $('#options').val();
  }
  /*
  transportType
  */
  if ($("input[name='vehicle']").is(":checked")) {
    elements.request.transportType = $("input[name='vehicle']:checked").val()
  }
  /*
  vf
  */
  if ($("input[name='feature']").is(":checked")) {
    elements.request.vf = $("#height").val() + ',' + $("#width").val() + ',' + $("#length").val() + ',' + $("#weight").val() + ',' + $("#axelWeight").val();
  }
  /*
  elements.success
  */
  elements.success = function(response, doc, object, xhr) {

    console.log("parsed");
    console.log(response);
    console.log("not parsed");
    console.log(doc);
    console.log("this object");
    console.log(object);
    console.log("request");
    console.log(xhr);

    var opts = {
      //changeColor : false
    }

    bemap.sample.rou.showOnMap(bemap.sample.map, opts, function(data) {
      console.log("info after click on polyline");
      console.log(data);
    })

    var optionsMarker = {
      map: bemap.sample.map,
      response: response,
      icon: bemap.sample.markerIcon
    }

    var testMarkers = bemap.sample.rou.showOnMapMarkers(optionsMarker, function(res) {
      console.log("info after click on marker");
      console.log(res);
    })

  }
  bemap.sample.rou.compute(elements);
}


bemap.sample.init = function() {

  $('#criteriasFASTEST').click(function() {
    var t = $('#criteriasSHORTEST');
    if ($(this).prop('checked', true) && t.prop('checked', true)) {
      t.prop('checked', false);
    }
  });

  $('#criteriasSHORTEST').click(function() {
    var t = $('#criteriasFASTEST');
    if ($(this).prop('checked', true) && t.prop('checked', true)) {
      t.prop('checked', false);
    }
  });

  $("input[name='vehicle']:checkbox").click(function() {
    $("input[name='vehicle']:checkbox").not(this).prop('checked', false);
  });

  $('#run').click(function() {
    bemap.sample.run();
  });
  $('#clear').click(function() {
    bemap.sample.resetTable();
  });
};

```
        </div>
        <div class="col-md-6">
          <div id="responseContainer" class="row" hidden>
            <table id="myTable" class="table table-hover table-striped">
              <thead>
                <th>City</th>
                <th>Country</th>
                <th>Postal code</th>
                <th>Place</th>
                <th>Longitude</th>
                <th>Latitude</th>
              </thead>
              <tbody></tbody>
            </table>
          </div>
          <div class="panel panel-default">
            <ul class="nav nav-tabs">
              <li class="nav-item active"><a class="nav-link active" data-toggle="tab" role="tab" href="#tab-1">Routing Criterias</a></li>
              <li class="nav-item"><a class="nav-link" data-toggle="tab" role="tab" href="#tab-2">Transport Type</a></li>
              <li class="nav-item"><a class="nav-link" data-toggle="tab" role="tab" href="#tab-3">Vehicle Feature</a></li>
              <li class="nav-item"><a class="nav-link" data-toggle="tab" role="tab" href="#tab-4">Options</a></li>
            </ul>
            <div class="tab-content panel-body">
              <div class="tab-pane fade in active" id="tab-1" role="tabpanel">
                <div class="row form-group">
                  <div class="col-md-4">
                    <label class="label-custom"><input type="checkbox" name="criterias" value="AVOID_FERRIES" /> Avoid Ferries</label>
                  </div>
                  <div class="col-md-4">
                    <label class="label-custom"><input type="checkbox" name="criterias" value="AVOID_MOTORWAYS" /> Avoid Motorways</label>
                  </div>
                  <div class="col-md-4">
                    <label class="label-custom"><input type="checkbox" name="criterias" value="AVOID_TOLLS" /> Avoid Tolls</label>
                  </div>
                  <div class="col-md-4">
                    <label class="label-custom"><input type="checkbox" name="criterias" id="criteriasFASTEST" value="FASTEST" /> Fastest</label>
                  </div>
                  <div class="col-md-4">
                    <label class="label-custom"><input type="checkbox" name="criterias" id="criteriasSHORTEST" value="SHORTEST" /> Shortest</label>
                  </div>
                  <div class="col-md-4">
                    <label class="label-custom"><input type="checkbox" name="criterias" value="AVOID_UNPAVED"/> Avoid Unpaved</label>
                  </div>
                  <div class="col-md-4">
                    <label class="label-custom"><input type="checkbox" name="criterias" value="AVOID_CROSSING_BORDER" /> Avoid Crossing Border</label>
                  </div>
                  <div class="col-md-4">
                    <label class="label-custom"><input type="checkbox" name="criterias" value="CARPOOL" /> Carpool</label>
                  </div>
                  <div class="col-md-4">
                    <label class="label-custom"><input type="checkbox" name="criterias" value="ECO_ENERGY" /> Eco Energy</label>
                  </div>
                </div>
              </div>
              <div class="tab-pane fade" id="tab-2" role="tabpanel">
                <div class="row">
                  <div class="col-md-12">
                    <label class="label-custom"><input type="checkbox" name="vehicle" value="PEDESTRIAN" /> Pedestrian<span style="float:right;" class="fa fa-male"></span></label>
                  </div>
                  <div class="col-md-12">
                    <label class="label-custom"><input type="checkbox" name="vehicle" value="BICYCLE" /> Bicycle<span style="float:right;" class="fa fa-bicycle"></span></label>
                  </div>
                  <div class="col-md-12">
                    <label class="label-custom"><input type="checkbox" name="vehicle" value="MOTORCYCLE" /> Motorcycle<span style="float:right;" class="fa fa-motorcycle"></span></label>
                  </div>
                  <div class="col-md-12">
                    <label class="label-custom"><input type="checkbox" name="vehicle" value="CAR" /> Car<span style="float:right;" class="fa fa-car"></span></label>
                  </div>
                  <div class="col-md-12">
                    <label class="label-custom"><input type="checkbox" name="vehicle" value="TAXI" /> Taxi<span style="float:right;" class="fa fa-taxi"></span></label>
                  </div>
                  <div class="col-md-12">
                    <label class="label-custom"><input type="checkbox" name="vehicle" value="PUBLIC_BUS" /> Public Bus<span style="float:right;" class="fa fa-bus"></span></label>
                  </div>
                  <div class="col-md-12">
                    <label class="label-custom"><input type="checkbox" name="vehicle" value="EMERGENCY" /> Emergency<span style="float:right;" class="fa fa-ambulance"></span></label>
                  </div>
                  <div class="col-md-12">
                    <label class="label-custom"><input type="checkbox" name="vehicle" value="DELIVERY_TRUCK" /> Delivery Truck<span style="float:right;" class="fa fa-truck"></span></label>
                  </div>
                  <div class="col-md-12">
                    <label class="label-custom"><input type="checkbox" name="vehicle" value="TRUCK" /> Truck<span style="float:right;" class="fa fa-truck"></span></label>
                  </div>
                </div>
              </div>
              <div class="tab-pane fade" id="tab-3" role="tabpanel">
                <div class="row">
                  <div class="col-md-6">
                    <label for="inputType" class="control-label">Vehicle Height</label>
                    <input type="text" class="form-control" id="height" value="380" placeholder="Parameter chargingPointPower" />
                  </div>
                  <div class="col-md-6">
                    <label for="inputType" class="control-label">Vehicle Width</label>
                    <input type="text" class="form-control" id="width" value="240" placeholder="Parameter chargingPointPower" />
                  </div>
                  <div class="col-md-6">
                    <label for="inputType" class="control-label">Vehicle Length</label>
                    <input type="text" class="form-control" id="length" value="1875" placeholder="Parameter chargingPointPower" />
                  </div>
                  <div class="col-md-6">
                    <label for="inputType" class="control-label">Vehicle Weight</label>
                    <input type="text" class="form-control" id="weight" value="35" placeholder="Parameter chargingPointPower" />
                  </div>
                  <div class="col-md-6">
                    <label for="inputType" class="control-label">Vehicle Axle Weight</label>
                    <input type="text" class="form-control" id="axelWeight" value="10" placeholder="Parameter chargingPointPower" />
                  </div>
                  <div class="col-md-12">
                    <br>
                    <label for="inputType" class="control-label"><input type="checkbox" name="feature" value="TRUCK" /> Enable Vehicle Features</label>
                  </div>
                </div>
              </div>
              <div class="tab-pane fade" id="tab-4" role="tabpanel">
                <div class="row form-group">
                  <div class="col-md-12">
                    <label for="inputType" class="control-label">Departure :</label>
                    <input type="datetime-local" class="form-control" name="datetime" id="departureDate" value="">
                  </div>
                  <div class="col-md-12">
                    <label for="maxAlter">Alternative routes :</label>
                    <select class="form-control" id="maxAlter">
                      <option value="0">0</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                    </select>
                  </div>
                  <div class="col-md-12">
                      <label for="options">Example multiple select</label>
                      <select id="options" multiple class="form-control" >
                        <option value="POLYLINE">POLYLINE</option>
                        <option value="DETAILED_POLYLINE">DETAILED_POLYLINE</option>
                        <option value="ROAD_SEGMENTS">ROAD_SEGMENTS</option>          
                        <option value="OPTIMIZED_TRIP">OPTIMIZED_TRIP</option>          
                        <option value="WAYPOINTS_POLYLINE">WAYPOINTS_POLYLINE</option>
                        <option value="POLYLINE_INDEX">POLYLINE_INDEX</option>
                        <option value="EVT_ROAD_FEATURE">EVT_ROAD_FEATURE</option>
                        <option value="EVT_SEGMENT_INFO">EVT_SEGMENT_INFO</option>
                        <option value="EVT_ELEVATION2">EVT_ELEVATION2</option>
                        <option value="EVT_ELEVATION">EVT_ELEVATION</option>          
                        <option value="ROUTESHEET">ROUTESHEET</option>
                        <option value="STARTSTOPINFO_WITHVIA">STARTSTOPINFO_WITHVIA</option>
                        <option value="WAYPOINTS">WAYPOINTS</option>
                        <option value="EVENT">EVENT</option>
                        <option value="EVT_POLYLINE">EVT_POLYLINE</option>
                        <option value="EVT_LENGTH">EVT_LENGTH</option>
                        <option value="EVT_DURATION">EVT_DURATION</option>
                      </select>
                      <small id="passwordHelpBlock" class="form-text text-muted">
                        Hold ctrl or shift for multiselect
                      </small>
                    </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-12">
            <button type="button" class="btn btn-primary" id="run"><span></span> Search</button>
            <button type="button" class="btn btn-warning" id="clear"><span></span> Clear</button></br>
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
  var rou = new bemap.Routing(bemapMainCtx);
  //is recomended to put class call into object
  bemap.rou = rou;
```

#### __Compute method__
Call `compute` method and use `elements` like a parameter.

See below for more details how to create `elements` object:

##### __geoserver__ : map geoserver (in example used `bemapMainCtx` object)

##### __request__ :  object with all request data
For more details see the documentation API of [Routing](index.html#subpage-rest_0_9_0-routing-bnd.md).

* __``destinations``__: list (array) of ``bemap.Coordinate(longitude, latitude)`` is mandatory request parameter minimum 2


* __``criterias``__: list (array) of criterias used to perform the routing calculation like shortest, fastest.

   * `AVOID_FERRIES`: Finds a route with no ferry.
   * `AVOID_MOTORWAYS`: Finds a route with no motor way.
   * `AVOID_TOLLS`: Finds a route with no toll.
   * `FASTER`: Optimization on time.
   * `FASTEST`: Optimization on time, same as FASTER.
   * `SHORTEST`: Optimization on distance.
   * `AVOID_UNPAVED`: Finds a route with no unpaved roads.
   * `AVOID_CROSSING_BORDER`: Finds a route without country border crossing (if possible).
   * `CARPOOL`: Finds a route which may go through roads reserved to car-pooling.
   * `ECO_ENERGY`: Optimization on energy consumption.


* __``departureTime``__: This parameter is an EPOCH time stamp in milliseconds (UTC) or can take an string with ISO date time format like '2011-12-03T10:15:30', '2011-12-03T10:15:30+01:00' or '2011-12-03T10:15:30+01:00[Europe/Paris]'. It is used to define the date and time of routing departure. (For traffic support, this method does not have any effect if the loaded SVS map data does not contain either the HERE Traffic Patterns or TomTom Speed Profiles databases).

* __``maxAlter``__: Define the maximum number of alternative routes (in range between 0 to 2). If not 0, routing calculation will try to compute several routes. Routes are ordered by decreasing relevance.


* __``options``__: List (array) of one or more options.

  * `ROUTESHEET`: Return the route sheet.
  * `ROUTESHEET_VERBOSE_LOW`: Low level of verbose for the route sheet (default).
  * `ROUTESHEET_VERBOSE_MEDIUM`: Medium level of verbose for the route sheet.
  * `ROUTESHEET_VERBOSE_HIGH`: High level of verbose for the route sheet.
  * `POLYLINE`: Return the polyline (geometry) of itinerary (By default).
  * `DETAILED_POLYLINE`: Return the polyline (geometry) of itinerary with more information for each sub-segments.
  * `POLYLINE_INDEX`: Enable the index calculation of used destination on the polyline.
  * `TRAFFIC`: Use the traffic info for routing.
  * `TRAFFIC_PREDICTIVE`: Use the predictive traffic info for routing.
  * `TRAFFIC_PATTERNS`: Use the traffic patterns for routing. Require the additional `departureTime` parameter.
  * `REVGEO_STRICT_DISABLE`: Disable the exception event when a coordinate entry is not found.
  * `REVGEO_POSTAL_ADDRESS`: Return the postal address of matched input coordinates.
  * `EVENT`: Enable structure of events on road. See `EVT_` other values.
  * `EVT_ROAD_FEATURE`: Add road feature information.
  * `EVT_ELEVATION`: Add elevation of road segments.
  * `EVT_ELEVATION2`: Add elevation of road segments (other representation of data).
  * `EVT_SEGMENT_INFO`: Add road segments information.
  * `EVT_POLYLINE`: Add polyline geometry of road segments or route.
  * `EVT_ENCODED_POLYLINE`: Add encoded polyline geometry of road segments or route.
  * `EVT_LENGTH`: Enable length calculation.
  * `EVT_DURATION`: Enable duration calculation (ETA).
  * `EVT_TRAFFIC`: Enable the traffic info in event structure.
  * `EVT_TRAFFIC_PREDICTIVE`: Enable the predictive traffic information in event structure.
  * `EVT_TRAFFIC_HISTORICAL`: (Beta) Enable the historical traffic information in event structure.
  * `EVT_ROUTESHEET`: Enable the route-sheet instructions in event structure.
  * `EVT_TRAFFIC_SIGNS`: Enable the traffic sign information in event structure.


* __``transportType``__: List (array) of one or more options.Define the transportation mode: Car, pedestrian, truck, etc.
   * `PEDESTRIAN`: Pedestrian.
   * `BICYCLE`: Bicycle.
   * `MOTORCYCLE`: Motorcycle.
   * `CAR`: Passenger car, tourist car (By default).
   * `TAXI`: Taxi.
   * `PUBLIC_BUS`: Public bus.
   * `EMERGENCY`: Emergency vehicle.
   * `DELIVERY_TRUCK`: Delivery truck.
   * `TRUCK`: Truck.
   * Possible exception is `NotValidTransportTypeParameterException`.

* __``vf``__: Vehicle feature is used to set the information about the vehicle.
This parameter is comma-separated list, see below the details of parameter format in order of fields value:

* ``height``: height of vehicle in centimeters.
* ``width``: width of vehicle in centimeters.
* ``length``: length of vehicle in centimeters.
* ``weight``: weight of vehicle in tens of metric tons, e.i: 3.5t = 35.
* ``axleWeight``: axle weight in tens of metric tons, e.i: 1.2t = 12.


##### __success__ : callback function to get response from server
* `response`: ``bemap.Routing`` object, parsed response in form of object. Find the details of fields response on the [dedicated page](index.html#subpage-jsapi_1_0_0-js-routing-response.md).
* `doc`: not parsed response, find the details of fields doc on the [dedicated page](index.html#subpage-rest_0_9_0-routing-bnd-response.md).
* `object`: not parsed BND response
* `xhr`: request

See the JavaScript console to get examples of responses

```
{"bemap":{"language":"javascript","hide":false}}

var elements = {
  geoserver: bemapMainCtx.geoserver,
  request: {
    destinations: [bemap.Coordinate{lon,lat}, bemap.Coordinate{lon,lat}, bemap.Coordinate{lon,lat}],
    criterias: ['AVOID_MOTORWAYS', 'AVOID_FERRIES'],
    departureTime: 1579872156069,
    maxAlter: 2,
    options: ['EVENT', 'EVT_POLYLINE', 'POLYLINE'],
    transportType: 'CAR',
    vf: 380,240,1875,35,10,NONE
  },
  success: function(response, doc, object, xhr) {

  }
}

bemap.rou.compute(elements);
```
#### __showOnMap method__

Method to place polyline on map

Call `showOnMap` method (after `compute` method) and use `map` and `options` like a parameters, optionally use callback function to get data from polyline click.

##### __map__ : bemap.map object

##### __options__ (optionaly): See below for more details how to create `options` object:

*  __polylineStyle__ : ``polylineStyle`` custom style of polyline

*  __changeColor__ : ``changeColor`` when `true` change the color of alternative road polyline

*  __layer__ : ``layer`` object optionally, to add polyline on choosen layer

Response `res` from callback you can see in JavaScript console


```
{"bemap":{"language":"javascript","hide":false}}
var style =  new bemap.LineStyle({
  width: 10,
  color: new bemap.Color(2, 208, 255, 0.3),
  //type: bemap.LineStyle.TYPE.DASH
})

var options = {
  polylineStyle: style,
  changeColor: true,
  layer: nameOfYourLayer
}
//create polyline, optionally call function to get click response
bemap.rou.showOnMap(map, options, function(res) {
  console.log(res.bemapObject);  
});
```

#### __showOnMapMarkers__

Method to place marker/markers on map

Call `showOnMapMarkers` method and use `options` like a parameter, optionally use callback function to get data from marker click.
`showOnMapMarkers` returns marker array


See below for more details how to create `options` object:

##### __map__ : bemap.map object - mandatory

##### __response__ / __doc__ : parsed/not parsed response from `compute` method - mandatory

##### __icone__ : bemap.Icon object

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
};

var optionsMarker = {
  map: bemap.sample.map,
  response: doc,
  icon: icone
};

bemap.rou.showOnMapMarkers(optionsMarker, function(res) {  
  console.log(res.bemapObject.properties);
});
```

#### __createMarker__

Method to place marker on map

Call `createMarker` method and use `options` like a parameter, optionally use callback function to get data from marker click.
`createMarker` returns marker array

See below for more details how to create `options` object:

##### __map__ : bemap.map object - mandatory

##### __coord__ : `bemap.Coordinate` - mandatory

##### __properties__ : the properties to stock in marker

##### __icone__ : bemap.Icon object

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
};

var options = {
  map: bemap.sample.map,
  properties: '<p>properties</p>',
  icon: icone
};

bemap.rou.createMarker(options, function(res) {  
  console.log(res.bemapObject.properties);
});
```

#### __cleanMarkers method__

Method to clear marker/markers from map

Call `cleanMarkers` method

```
{"bemap":{"language":"javascript","hide":false}}
bemap.rou.cleanMarkers();
```

#### __getRoute method__

Method to get specific route


Call `getRoute` method and use `index` like a parameter


##### __index__ : route index


Method return ``bemap.Route`` object

```
{"bemap":{"language":"javascript","hide":false}}
bemap.rou.getRoute(index);
```

#### __getRoutes method__

Method to get routes array


Call `getRoutes` method


Method return ``bemap.Routes`` array

```
{"bemap":{"language":"javascript","hide":false}}
bemap.rou.getRoutes();
```

#### __resetRoute method__

Method to reset/clar specific route


Call `resetRoute` method and use `route` like a parameter


##### __route__ : ``bemap.Route`` object

```
{"bemap":{"language":"javascript","hide":false}}
bemap.rou.resetRoute(route);
```

#### __reset method__

Reset the Routing object. Clear the previous result.

```
{"bemap":{"language":"javascript","hide":false}}
bemap.rou.reset();
```
## Working examples

#### Example using `Routing` methods to get routing object and show polyline and markers on map
Please watch JavaScript console for on map, marker and polyline click events

```
{"bemap":{"language":"javascript"}}
//initialize bemap object
var bemap = bemap || {};
//for this example I used another subobject sample
bemap.sample = bemap.sample || {};
//initialize destinations array to stock list of destinations
bemap.sample.destinations = [];

$(document).ready(function() {
  //call init function - function created only for tis example
  bemap.sample.init();

  //initialize map see mapping documentation for more details
  var map = new bemap.LeafletMap(bemapMainCtx, 'map1').defaultLayers().move(2.0, 47.0, 5);

  //initialize geocoder class uded to get coordinates for example array
  bemap.sample.geo = new bemap.Geocoder(bemapMainCtx);

  //initialize routing class
  bemap.sample.rou = new bemap.Routing(bemapMainCtx)

  //create on map click event to get coordinates by geocoding
  map.on(bemap.Map.EventType.CLICK, function(mapEvent) {
    //call reverseGeocoding function - function created only for tis example
    bemap.sample.reverseGeocoding(mapEvent);
  });

  //initialize global marker icon
  bemap.sample.markerIcon = new bemap.Icon({
    src: 'images/map-marker-blue.svg',
    anchorX: 0.26,
    anchorY: 0.9,
    height: 36,
    width: 32,
    anchorXUnits: 'fraction',
    anchorYUnits: 'fraction',
    scale: 1.3
  });

  //initialize global object map
  bemap.sample.map = map;

});

//function created to get coordinates by reverse geocoding
bemap.sample.reverseGeocoding = function(mapEvent) {
  var p = mapEvent.coordinate;

  var elements = {
    geoserver: bemapMainCtx.geoserver,
    searchInfo: new bemap.RevGeoSearchInfo({
      xy: p.lon + ',' + p.lat,
      radius: "500",
      maxResult: "1"
    }),
    success: function(response, doc, object, xhr) {
      //call reverseGeocodingParser function to parse data from revGeocode method - function created only for tis example
      bemap.sample.reverseGeocodingParser(mapEvent, doc, response);
    }
  }
  //call revgeocode method see reverse geocoding documentation for more details
  bemap.sample.geo.revGeocode(elements);
}

//function to parse data from revGeocode method
//function add popup with data from revGeocode and gives possibility to add destination to destinations list
bemap.sample.reverseGeocodingParser = function(mapEvent, jsonDoc, response) {
  var map = bemap.sample.map;
  var popup = bemap.sample.popup;
  var p = mapEvent.coordinate;

  var elements = jsonDoc.BND.Elements.Element;
  //for more details how to create popup please see mapping documentation
  popup = new bemap.Popup({
    coordinate: p,
    visible: true,
    information: bemap.sample.buildPopup(elements)//function buildPopup used to build html of popup - function created only for tis example
  });

  map.addPopup(popup);

  bemap.sample.popup = popup;
  //container on which we will show destinations list - create only for this example
  var container = $('#responseContainer table tbody');

  if (elements.length == 0) {
    return;
  }

  //call addPoi function to add destination to destinations array - function created only for tis example
  bemap.sample.addPoi(elements[0], container);
};

//function to clear all routes, clear destinations array and table structure - function created only for tis example
bemap.sample.resetTable = function() {
  $('#myTable > tbody > tr').remove();
  //routing method to clear routes and markers from map
  bemap.sample.rou.reset();
  bemap.sample.map.clearPopup();
  bemap.sample.destinations = [];
}

//function buildPopup servees to create html of popup with result of reverse geocoding - function created only for tis example
bemap.sample.buildPopup = function(e) {
  if (e.length == 0) {
    var html = '<p style="font-size:22px;color:red;"><span class=""></span> Address not found!</p>';

    console.error("Address not found!");

    return html;
  }

  var el = e[0];
  var p = el.PostalAddress;
  var c = el.Coordinate;

  var html = '<div class="row">';
  html += '<div class="col-md-12">';
  html += '<h4 style="color: blue">Local Data</h4>';
  html += 'City: ' + p.City + '</br>';
  html += 'Country: ' + p.Country + '</br>';
  html += 'Postal Code: ' + p.PostalCode + '</br>';
  html += 'Lon: ' + c.x + '</br>';
  html += 'Lat: ' + c.y + '</br>';
  html += '<div class="row">';
  html += '<div class="col-md-6">';
  html += '</br><button type="button" class="btn btn-primary addInfo" id="addInfo"><span></span> Add POI</button>';
  html += '</div></div></div></div></div>';

  return html;
}

//function add destination to destinations array, put marker on map with createMarker Routing method and create html table with all destinations - function created only for tis example
bemap.sample.addPoi = function(element, container) {
  var p = element.PostalAddress;
  var c = element.Coordinate;
  //after click add destination and create row in table
  $('.addInfo').on("click", function() {

    bemap.sample.map.clearPopup();

    var destination = {
      city: p.City,
      country: p.Country,
      postalCode: p.PostalCode,
      streetNumber: p.StreetNumber,
      street: p.Street,
      x: c.x,
      y: c.y,
      sl: element.SpeedLimit
    };

    var html = '<tr id="Row" class="cursorPointer">';
    html += '<td>' + destination.city + '</td>';
    html += '<td>' + destination.country + '</td><td>' + destination.postalCode + '</td>';
    html += '<td>' + destination.streetNumber + ' ' + destination.street + '</td>';
    html += '<td id="longitude">' + destination.x + '</td><td id="latitude">' + destination.y + '</td>';
    html += '</tr>';

    container.append(html);
    container.parent().closest('div').show();

    var coord = new bemap.Coordinate(c.x, c.y);
    var markerOptions = {
      map: bemap.sample.map,
      icon: bemap.sample.markerIcon,
      coord: coord,
      properties: html
    }

    //Roting method to add marker on map and add marker to Routing marker list
    bemap.sample.rou.createMarker(markerOptions);

    bemap.sample.destinations.push(coord);
  });
}

//function run serves to get all data from html interface and from destinations array and create Routing element object - function created only for tis example
bemap.sample.run = function() {
  //initialize elements object - for get more info read this dokumentation
  var elements = {};
  //initialize elements object request
  elements.request = {};
  elements.geoserver = bemapMainCtx.geoserver;

  /*
  destinations
  */
  if (bemap.sample.destinations && bemap.sample.destinations !== null) {
    elements.request.destinations = bemap.sample.destinations;
  }
  /*
  CRITERIAS
  */
  var criteriasArray = [];
  var $criteriasBox = $("input[name='criterias']:checked");
  if ($("input[name='criterias']").is(":checked")) {
    $criteriasBox.each(function() {
      criteriasArray.push($(this).val());
    });
    elements.request.criterias = criteriasArray;
    criteriasArray = [];
  }
  /*
  departureTime
  */
  var departureTime = $('#departureDate').val();
  var myDate = new Date(departureTime);
  var myDateMili = myDate.getTime();
  if (departureTime) {
    elements.request.departureTime = myDateMili;
  }
  /*
  maxAlter
  */
  if ($('#maxAlter').val() > 0) {
    elements.request.maxAlter = $('#maxAlter').val();
  }
  /*
  options
  */
  if ($('#options').val().length !== 0) {
    elements.request.options = $('#options').val();
  }
  /*
  transportType
  */
  if ($("input[name='vehicle']").is(":checked")) {
    elements.request.transportType = $("input[name='vehicle']:checked").val();
  }
  /*
  vf
  */
  if ($("input[name='feature']").is(":checked")) {
    elements.request.vf = $("#height").val() + ',' + $("#width").val() + ',' + $("#length").val() + ',' + $("#weight").val() + ',' + $("#axelWeight").val();
  }
  /*
  elements.success
  */
  elements.success = function(response, doc, object, xhr) {

    console.log("parsed");
    console.log(response);
    console.log("not parsed");
    console.log(doc);
    console.log("this object");
    console.log(object);
    console.log("request");
    console.log(xhr);

    var opts = {
      //changeColor : false
    };

    //call Routing showOnMap method to show polylines on map - for more datails read this dokumentation
    bemap.sample.rou.showOnMap(bemap.sample.map, opts, function(data) {
      console.log("info after click on polyline");
      console.log(data);
    });

    var optionsMarker = {
      map: bemap.sample.map,
      response: response,
      icon: bemap.sample.markerIcon
    };

    //call Routing showOnMapMarkers method to show markers on map - for more datails read this dokumentation
    bemap.sample.rou.showOnMapMarkers(optionsMarker, function(res) {
      console.log("info after click on marker");
      console.log(res);
    });
  };
  //call Routing compute mathode to creating routes objects
  bemap.sample.rou.compute(elements);
};

//initialisation of click and some cosmetic manipulations - function created only for tis example
bemap.sample.init = function() {

  $('#criteriasFASTEST').click(function() {
    var t = $('#criteriasSHORTEST');
    if ($(this).prop('checked', true) && t.prop('checked', true)) {
      t.prop('checked', false);
    }
  });

  $('#criteriasSHORTEST').click(function() {
    var t = $('#criteriasFASTEST');
    if ($(this).prop('checked', true) && t.prop('checked', true)) {
      t.prop('checked', false);
    }
  });

  $("input[name='vehicle']:checkbox").click(function() {
    $("input[name='vehicle']:checkbox").not(this).prop('checked', false);
  });

  $('#run').click(function() {
    bemap.sample.run();
  });

  $('#clear').click(function() {
    bemap.sample.resetTable();
  });
};

```

See the [authentication page](index.html#page-authentication.md) for the login, password process.
