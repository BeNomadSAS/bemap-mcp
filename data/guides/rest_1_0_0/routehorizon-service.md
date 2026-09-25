# REST API, Service version 1.0.0


## Route Horizon service
Return the information about immediate or nearly event on road.


### Summary
1. Request
 1. Mandatory parameters
 2. Optional parameters
2. Response
 1. Details of fields
 2. Response samples


### Request
The request must be sent with the HTTP method `POST` and the HTTP header `Content-Type` set to `application/json`.

Sample:
URI: `/bgis/service/routeHorizon/1.0`

POST data:
```
{"bemap":{"language":"javascript"}}
{
   "gps": [
      {"lon": 4.87425, "lat": 46.45534, "heading": 160, "time": 11354654, "sat": 3},
      {"lon": 4.8747, "lat": 46.4564, "heading": 160, "time": 11354654, "sat": 4},
      {"lon": 4.87523, "lat": 46.45756, "heading": 160, "time": 11354654, "sat": 2},
      {"lon": 4.87624, "lat": 46.4596, "heading": 160, "time": 11354654, "sat": 1},
      {"lon": 4.87727, "lat": 46.46148, "heading": 160, "time": 11354654, "sat": 3}
   ]
}
```

All coordinates are defined by longitude and latitude, see the [coordinate system](index.html#page-glossary-coordinate_system.md) glossary for more details.



#### __Parameters__

The default transport type is `CAR`.

<a target="_blank" rel="noopener" href="scheme.html?className=com.benomad.bgis.fe.protocol.service.v1_0_0.model.routeHorizon.RouteHorizonRequest">Show the class diagram</a>

```
{"bemap":{"language":"!include","url":"/bgis/service/documentation/1.0/buildclass.md?className=com.benomad.bgis.fe.protocol.service.v1_0_0.model.routeHorizon.RouteHorizonRequest"}}
```



### Response

#### Details of fields

<a target="_blank" rel="noopener" href="scheme.html?className=com.benomad.bgis.fe.protocol.service.v1_0_0.model.routeHorizon.RouteHorizonResponse">Show the class diagram</a>

```
{"bemap":{"language":"!include","url":"/bgis/service/documentation/1.0/buildclass.md?className=com.benomad.bgis.fe.protocol.service.v1_0_0.model.routeHorizon.RouteHorizonResponse"}}
```


#### Response samples

JSON Sample:
```
{"bemap":{"language":"javascript"}}
{
  "spdRange": 124,
  "spdLim": 130.0
}
```
