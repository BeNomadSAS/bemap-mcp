# BeMap JS API

## bemap.Routing object


## Response of Bemap JSAPI Routing
Result of routing computations.

### Summary
1. Response
 1. Details of fields
 2. Response samples

### Response
All coordinates are defined by longitude and latitude, see the [coordinate system](index.html#page-glossary-coordinate_system.md) glossary for more details.

#### Details of fields


##### __ctx__: context object.
* protocol
* host
* path
* login
* password
* cacheBaseUrl
* cacheAuth
* authInPost
* geoserver

##### __routes__: List of routes `bemap.Route`.

* __route__:
  * extent: `bemap.BoundingBox` object
  * events: if `EVENT` option is called. Find the details of fields events on the [dedicated page](index.html#subpage-rest_0_9_0-routing-bnd-response.md).
  * length: length of route in meters.
  * duration: duration of travel in seconds.
  * averageSpeed: average speed in km/h.
  * polyline: if `POLYLINE` option is called.

##### __markerMapObject__: List of markers `bemap.Marker` only when `showOnMapMarkers` or `createMarker` called.

##### __stopPoints__: List of `stopPoints`.
* used: if the coordinate is used in the routing calculation or not. Available values are `true` and `false`.
* usedOrder: order used by the routing calculation.
* usedX: longitude coordinate of road match performed by the reverse-geocoding to snap the input coordinate to the road.
* usedY: latitude coordinate of road match performed by the reverse-geocoding to snap the input coordinate to the road.
* confidenceValue: confidence value of road match performed by the reverse geocoding to snap the input coordinate to the road.
* inputOrder: Order number of input coordinates (`xy` parameters).
* x: longitude coordinate of input (`xy` parameters).
* y: latitude coordinate of input (`xy` parameters).
* distanceFromRequest: distance in meters from the input coordinate (if available).
* distanceUnity: measure unit of distanceFromRequest field. By default `m` (meters).
* hourMinute: estimated time from departure time
* dateString: estimated time of arrival

##### __geometryId__: Id added to polyline with number at the end if more polyline.

##### __destinations__: List of ``bemap.Coordinate`` are used by the routing calculation to found the route(s)..

##### __criterias__: List of ``criterias`` used in request.

##### __departureTime__: This parameter is an EPOCH time stamp in milliseconds (UTC) or can take an string with ISO local date time format like '2011-12-03T10:15:30', '2011-12-03T10:15:30+01:00' or '2011-12-03T10:15:30+01:00[Europe/Paris]'. It is used to define the date and time of routing departure. (For traffic support, this method does not have any effect if the loaded SVS map data does not contain either the HERE Traffic Patterns or TomTom Speed Profiles databases).

##### __isoChroneLimit__: The limit of the isochrone.

##### __language__: Define the language that was be used to perform the address lookup.

##### __maxAlter__: Define number of alternative routes that was used.

##### __options__: Define options that was used.

##### __speed__: speed in meters per second..

##### __transportType__: Define transportType that was used.

##### __vf__: Vehicle feature that was used.

##### __xyRadius__: xyRadius that was used.

#### Response samples
XML Sample:

```
{"bemap":{"language":"xml"}}
<?xml version="1.0" encoding="UTF-8"?>
<root>
  <criterias>
    <element>SHORTEST</element>
  </criterias>
  <ctx>
    <authInPost>false</authInPost>
    <cacheAuth>cacheAuth</cacheAuth>
    <cacheBaseUrl>cacheBaseUrl</cacheBaseUrl>
    <geoserver>geoserver</geoserver>
    <host>bemap-beta.benomad.com</host>
    <login>login</login>
    <password>password</password>
    <path>/bgis/</path>
    <protocol>https</protocol>
  </ctx>
  <departureTime>1579863843974</departureTime>
  <destinations>
    <element>
      <lat>46.66209</lat>
      <lon>1.61466</lon>
    </element>
    <element>
      <lat>46.66231</lat>
      <lon>1.61506</lon>
    </element>
  </destinations>
  <evCnnType null="true"/>
  <evRange null="true"/>
  <evf null="true"/>
  <geometryId>routePolyline</geometryId>
  <isoChroneLimit>0</isoChroneLimit>
  <language>xx</language>
  <markerMapObject/>
  <maxAlter>2</maxAlter>
  <nativeBeMapParams null="true"/>
  <options>
    <element>POLYLINE</element>
    <element>DETAILED_POLYLINE</element>
    <element>ROAD_SEGMENTS</element>
    <element>OPTIMIZED_TRIP</element>
    <element>WAYPOINTS_POLYLINE</element>
    <element>POLYLINE_INDEX</element>
    <element>EVT_ROAD_FEATURE</element>
    <element>EVT_SEGMENT_INFO</element>
    <element>EVT_ELEVATION2</element>
    <element>EVT_ELEVATION</element>
    <element>ROUTESHEET</element>
    <element>STARTSTOPINFO_WITHVIA</element>
    <element>WAYPOINTS</element>
    <element>EVENT</element>
    <element>EVT_POLYLINE</element>
    <element>EVT_LENGTH</element>
    <element>EVT_DURATION</element>
  </options>
  <poylineAsPolygon>false</poylineAsPolygon>
  <routes>
    <element>
      <averageSpeed>34.2</averageSpeed>
      <chargingStationSteps/>
      <duration>
      <unity>second</unity>
      <value>4</value>
      </duration>
    <events>
      <element>
        <countryCode>FRA</countryCode>
        <duration>3.7265625</duration>
        <length>38</length>
        <polyline>
          <element>
            <lat>46.66209</lat>
            <lon>1.61466</lon>
          </element>
          <element>
            <lat>46.66222</lat>
            <lon>1.61489</lon>
          </element>
          <element>
            <lat>46.66231</lat>
            <lon>1.61506</lon>
          </element>
        </polyline>
      </element>
    </events>
    <extent>
      <maxLat>46.662308</maxLat>
      <maxLon>1.6150607</maxLon>
      <minLat>46.66209</minLat>
      <minLon>1.6146572</minLon>
    </extent>
    <length>
      <unity>m</unity>
      <value>38</value>
    </length>
    <polyline>
      <element>
        <lat>46.66209</lat>
        <lon>1.61466</lon>
      </element>
      <element>
        <lat>46.66209</lat>
        <lon>1.6146572</lon>
      </element>
      <element>
        <lat>46.66222</lat>
        <lon>1.61489</lon>
      </element>
      <element>
        <lat>46.66231</lat>
        <lon>1.61506</lon>
      </element>
      <element>
        <lat>46.662308</lat>
        <lon>1.6150607</lon>
      </element>
    </polyline>
    </element>
  </routes>
  <speed>0</speed>
  <speedType null="true"/>
  <stopPoints>
    <element>
      <confidenceValue>0.37337944</confidenceValue>
      <dateString>-</dateString>
      <distanceFromRequest>0.14</distanceFromRequest>
      <distanceUnity>m</distanceUnity>
      <hourMinute>-</hourMinute>
      <inputOrder>0</inputOrder>
      <polylineIndex>0</polylineIndex>
      <used>true</used>
      <usedOrder>0</usedOrder>
      <usedX>1.6146572</usedX>
      <usedY>46.66209</usedY>
      <x>1.61466</x>
      <y>46.66209</y>
    </element>
    <element>
      <confidenceValue>0.29639795</confidenceValue>
      <dateString>24/01/2020 12:04</dateString>
      <distanceFromRequest>0.14</distanceFromRequest>
      <distanceUnity>m</distanceUnity>
      <duration>4</duration>
      <hourMinute>00 min</hourMinute>
      <inputOrder>1</inputOrder>
      <length>38</length>
      <polylineIndex>2</polylineIndex>
      <used>true</used>
      <usedOrder>1</usedOrder>
      <usedX>1.6150607</usedX>
      <usedY>46.662308</usedY>
      <x>1.61506</x>
      <y>46.66231</y>
    </element>
  </stopPoints>
  <transportType>CAR</transportType>
  <vf>380,240,1875,35,10</vf>
  <xyRadius>40</xyRadius>
</root>
```


JSON Sample:
```
{"bemap":{"language":"javascript"}}
{
  "ctx": {
    "protocol": "https",
    "host": "bemap-beta.benomad.com",
    "path": "/bgis/",
    "login": "login",
    "password": "password",
    "cacheBaseUrl": "cacheBaseUrl",
    "cacheAuth": "cacheAuth",
    "authInPost": false,
    "geoserver": "geoserver"
  },
  "nativeBeMapParams": null,
  "routes": [{
    "extent": {
      "minLat": 46.66209125,
      "maxLat": 46.66230875,
      "minLon": 1.6146571106548946,
      "maxLon": 1.6150607395353958
    },
    "events": [{
      "countryCode": "FRA",
      "length": "38",
      "duration": "3.7265625",
      "polyline": [{
        "lon": 1.61466,
        "lat": 46.66209
      }, {
        "lon": 1.61489,
        "lat": 46.66222
      }, {
        "lon": 1.61506,
        "lat": 46.66231
      }]
    }],
    "chargingStationSteps": [],
    "length": {
      "unity": "m",
      "value": 38
    },
    "duration": {
      "unity": "second",
      "value": 4
    },
    "averageSpeed": 34.2,
    "polyline": [{
      "lon": 1.61466,
      "lat": 46.66209
    }, {
      "lon": 1.6146571106548946,
      "lat": 46.66209125
    }, {
      "lon": 1.61489,
      "lat": 46.66222
    }, {
      "lon": 1.61506,
      "lat": 46.66231
    }, {
      "lon": 1.6150607395353958,
      "lat": 46.66230875
    }]
  }],
  "markerMapObject": [],
  "stopPoints": [{
    "used": "true",
    "usedOrder": 0,
    "usedX": 1.6146571106548946,
    "usedY": 46.66209125,
    "confidenceValue": 0.3733794295592049,
    "inputOrder": 0,
    "x": 1.61466,
    "y": 46.66209,
    "distanceFromRequest": 0.14,
    "distanceUnity": "m",
    "polylineIndex": 0,
    "hourMinute": "-",
    "dateString": "-"
  }, {
    "used": "true",
    "usedOrder": 1,
    "usedX": 1.6150607395353958,
    "usedY": 46.66230875,
    "confidenceValue": 0.29639794168096056,
    "inputOrder": 1,
    "x": 1.61506,
    "y": 46.66231,
    "distanceFromRequest": 0.14,
    "distanceUnity": "m",
    "polylineIndex": 2,
    "length": 38,
    "duration": 4,
    "hourMinute": "00 min",
    "dateString": "24/01/2020 12:04"
  }],
  "geometryId": "routePolyline",
  "poylineAsPolygon": false,
  "destinations": [{
    "lon": 1.61466,
    "lat": 46.66209
  }, {
    "lon": 1.61506,
    "lat": 46.66231
  }],
  "criterias": ["SHORTEST"],
  "departureTime": 1579863843974,
  "evCnnType": null,
  "evf": null,
  "evRange": null,
  "isoChroneLimit": 0,
  "language": "xx",
  "maxAlter": "2",
  "options": ["POLYLINE", "DETAILED_POLYLINE", "ROAD_SEGMENTS", "OPTIMIZED_TRIP", "WAYPOINTS_POLYLINE", "POLYLINE_INDEX", "EVT_ROAD_FEATURE", "EVT_SEGMENT_INFO", "EVT_ELEVATION2", "EVT_ELEVATION", "ROUTESHEET", "STARTSTOPINFO_WITHVIA", "WAYPOINTS", "EVENT", "EVT_POLYLINE", "EVT_LENGTH", "EVT_DURATION"],
  "speed": 0,
  "speedType": null,
  "transportType": "CAR",
  "vf": "380,240,1875,35,10",
  "xyRadius": 40
}

```
