# REST API, Service version 1.0.0


## Traffic service
To get the traffic information by country or an restricted area.

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
URI: `/bgis/service/traffic/1.0`

POST data:
```
{"bemap":{"language":"javascript"}}
{
	"boundingBox" : {
		"minLon" : 2.24801,
		"minLat" : 48.80938,
		"maxLon" : 2.42045,
		"maxLat" : 48.90529
	},
	"outputLanguage" : "fr"
}
```

All coordinates are defined by longitude and latitude, see the [coordinate system](index.html#page-glossary-coordinate_system.md) glossary for more details.

#### __Parameters__
The parameters `bbox` and `countryCode` can used alternately, but the presence of one of them in the request is mandatory.

<a target="_blank" rel="noopener" href="scheme.html?className=com.benomad.bgis.fe.protocol.service.v1_0_0.model.traffic.TrafficRequest">Show the class diagram</a>

```
{"bemap":{"language":"!include","url":"/bgis/service/documentation/1.0/buildclass.md?className=com.benomad.bgis.fe.protocol.service.v1_0_0.model.traffic.TrafficRequest"}}
```


### Response

#### Details of fields

<a target="_blank" rel="noopener" href="scheme.html?className=com.benomad.bgis.fe.protocol.service.v1_0_0.model.traffic.TrafficResponse">Show the class diagram</a>

```
{"bemap":{"language":"!include","url":"/bgis/service/documentation/1.0/buildclass.md?className=com.benomad.bgis.fe.protocol.service.v1_0_0.model.traffic.TrafficResponse"}}
```


#### Response samples
JSON Sample:
```
{"bemap":{"language":"javascript"}}
```
