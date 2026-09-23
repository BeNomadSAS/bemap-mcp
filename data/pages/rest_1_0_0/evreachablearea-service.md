# REST API, Service version 1.0.0


## EV Reachable Area service
Perform a calculation of reachable area dedicated to electrical vehicle. This service return a geometry of area.

### Summary
1. Request
 1. Parameters
2. Response
 1. Details of fields
 2. Response samples
 3. ErrorResponse object


### Request
The request must be sent with the HTTP method `POST` and the HTTP header `Content-Type` set to `application/json`. 

Sample:
URI: `/bgis/service/evreachablearea/1.0` for JSON output format.
URI: `/bgis/service/evreachablearea/1.0/kml` for KML output format.

POST data:
```
{"bemap":{"language":"javascript"}}
{
  "geoserver": "here",
  "vehicle": "e16f0d0b-964b-4a23-bd78-f5cb438abad6",
  "initBatLvl": 25,
  "temperature": 20,
  "payload": 75,
  "startLon": 2.34494,
  "startLat": 48.78852,
  "geo": true
}
```

All coordinates are defined by longitude and latitude, see the [coordinate system](index.html#page-glossary-coordinate_system.md) glossary for more details.



#### __Parameters__

<a target="_blank" rel="noopener" href="scheme.html?className=com.benomad.bgis.fe.protocol.service.v1_0_0.model.evReachableArea.EvReachableAreaRequest">Show the class diagram</a>

```
{"bemap":{"language":"!include","url":"/bgis/service/documentation/1.0/buildclass.md?className=com.benomad.bgis.fe.protocol.service.v1_0_0.model.evReachableArea.EvReachableAreaRequest"}}
```


### Response

#### Details of fields

<a target="_blank" rel="noopener" href="scheme.html?className=com.benomad.bgis.fe.protocol.service.v1_0_0.model.evReachableArea.EvReachableAreaResponse">Show the class diagram</a>

```
{"bemap":{"language":"!include","url":"/bgis/service/documentation/1.0/buildclass.md?className=com.benomad.bgis.fe.protocol.service.v1_0_0.model.evReachableArea.EvReachableAreaResponse"}}
```

See chapter [Google Encoded Polyline Algorithm Format](index.html#page-glossary-google_encoded_polyline_algorithm_format.md) for full description of encoding format.

#### Response samples

JSON Sample (trunked):
```
{"bemap":{"language":"javascript"}}
{
  "boundingBox": {
    "minLon": 1.74877,
    "minLat": 48.39662,
    "maxLon": 2.9994,
    "maxLat": 49.23037
  },
  "geometry": [
    {
      "lon": 2.10434,
      "lat": 48.55356
    },
  . . .
    {
      "lon": 2.03813,
      "lat": 48.53885
    }
  ]
}
```


#### ErrorResponse object
If an error occurs during the process on server side, only an error object will be returned in the response. See `Error example` chapter.
* `code`: error code. See the Error list chapter. 
* `message`: error message. 
* `coordinate`: coordinate of error (optional). 
   * `lon`: longitude of coordinate in decimal degrees ([WGS84](index.html#page-glossary-coordinate_system.md)). 
   * `lat`: latitude of coordinate in decimal degrees ([WGS84](index.html#page-glossary-coordinate_system.md)). 


##### Error codes
List of all possible error codes:

| Code | Description |
|------|-------------|
| OK | No error. |
| COORDINATE_NOT_MATCH | One of input point cannot be matched on a road. |
| COUNTRY_NOT_AVAILABLE | Start and end addresses coordinates are not in the allowed area. |
| CHARGING_STATION_NOT_FOUND | Cannot find any charging station around the coordinate. |
| NO_REACHABLE_STEP_POINT | No charging stations found can be reached. |
| CANNOT_PERFORM_ROUTING | The routing calculation cannot be performed. |
| OVER_ALLOWED_DISTANCE | The requested travel is over the allowed distance limit. Max distance for journey is 2500 km. |
| INTERNAL_ERROR | The server cannot perform the routing calculation due to internal BeNomad SDK error. |


##### Error example
```
{"bemap":{"language":"javascript"}}
{ 
   "error": { 
      "code": "NO_REACHABLE_STEP_POINT", 
      "message": "All charging stations found cannot be reachable. Around this coordinate.", 
      "coordinate": { 
         "lon": 8.193691832353528, 
         "lat": 45.42630127240513 
      } 
   } 
} 
```


All coordinates are defined by longitude and latitude, see the [coordinate system](index.html#page-glossary-coordinate_system.md) glossary for more details.
