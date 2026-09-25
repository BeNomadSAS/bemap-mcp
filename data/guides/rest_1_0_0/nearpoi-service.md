# REST API, Service version 1.0.0


## Near POI service
Find POI around a coordinate, limited by distance of travel from coordinate to POI.

![Illustration of near POI service](images/nearpoi-service-map_example.svg)

### Summary
1. Request
 1. Parameters
2. Response
 1. Details of fields
 2. Response samples


### Request
The request must be sent with the HTTP method `POST` and the HTTP header `Content-Type` set to `application/json`.

Sample:
URI: `/bgis/service/nearpoi/1.0`

POST data:
```
{"bemap":{"language":"javascript"}}
{
 "coordinate": {
  "longitude": 2.40552,
  "latitude": 48.85342
 },
 "distance": 70,
 "transportType": "PEDESTRIAN",
 "orderBy": "DISTANCE_ASC"
}
```

#### __Parameters__

<a target="_blank" rel="noopener" href="scheme.html?className=com.benomad.bgis.fe.protocol.service.v1_0_0.model.nearPoi.NearPoiRequest">Show the class diagram</a>

```
{"bemap":{"language":"!include","url":"/bgis/service/documentation/1.0/buildclass.md?className=com.benomad.bgis.fe.protocol.service.v1_0_0.model.nearPoi.NearPoiRequest"}}
```

### Response
Return the list of POI around the input coordinate.

#### Details of fields

<a target="_blank" rel="noopener" href="scheme.html?className=com.benomad.bgis.fe.protocol.service.v1_0_0.model.nearPoi.NearPoiResponse">Show the class diagram</a>

```
{"bemap":{"language":"!include","url":"/bgis/service/documentation/1.0/buildclass.md?className=com.benomad.bgis.fe.protocol.service.v1_0_0.model.nearPoi.NearPoiResponse"}}
```

#### Response samples

JSON Sample:
```
{"bemap":{"language":"javascript"}}
{
	"pois": [{
			"coordinate": {
				"longitude": 2.40595,
				"latitude": 48.85328
			},
			"distance": 54,
			"duration": 61,
			"type": "SHOP",
			"name": "JEAN CARIL",
			"telephone": "+(33)-1-43675352"
		}, {
			"coordinate": {
				"longitude": 2.40577,
				"latitude": 48.85382
			},
			"distance": 64,
			"duration": 67,
			"type": "RESTAURANT",
			"name": "JARDIN D'OR",
			"telephone": "+(33)-1-44649320"
		}, {
			"coordinate": {
				"longitude": 2.40598,
				"latitude": 48.85316
			},
			"distance": 68,
			"duration": 66,
			"type": "RESTAURANT",
			"name": "MAXILIFE",
			"telephone": "+(33)-1-43792928"
		}, {
			"coordinate": {
				"longitude": 2.40575,
				"latitude": 48.85386
			},
			"distance": 68,
			"duration": 71,
			"type": "RESTAURANT",
			"name": "LE MONTANA",
			"telephone": "+(33)-1-43483873"
		}
	]
}
```
