# REST API, Service version 1.0.0


## Routing service
Performs route computations through the road network. Also performs isochrone and origin destination matrix calculations.

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
URI: `/bgis/service/routing/1.0` for JSON default format.
Or URI: `/bgis/service/routing/1.0.csv` for CSV output format.

POST data:
```
{"bemap":{"language":"javascript"}}
{
	"destinations": [
		{
			"coordinateSat" : {
				"lon" : 7.41059,
				"lat" : 43.73446
			}
		},
		{
			"coordinateSat" : {
				"lon" : 7.15376,
				"lat" : 43.72189
			}
		},
		{
			"coordinateSat" : {
				"lon" : 7.15092,
				"lat" : 43.66244
			}
		},
		{
			"coordinateSat" : {
				"lon" : 7.12901,
				"lat" : 43.62986
			}
		}
	],
	"routingVehicleProfile" : {
		"transportMode" : "CAR",
		"routingVehicleFeature" : {
			"height" : 380,
			"width" : 40,
			"length" : 1875,
			"weight" : 35,
			"axleWeight" : 10
			
		}
	},
	"routingMode" : "MODE_VIAS",
	"routingCriterias" : [ "FASTEST" ],
	"outputLanguage": "fr"
}
```

All coordinates are defined by longitude and latitude, see the [coordinate system](index.html#page-glossary-coordinate_system.md) glossary for more details.

#### __Parameters__

<a target="_blank" rel="noopener" href="scheme.html?className=com.benomad.bgis.fe.protocol.service.v1_0_0.model.routing.RoutingRequest">Show the class diagram</a>

```
{"bemap":{"language":"!include","url":"/bgis/service/documentation/1.0/buildclass.md?className=com.benomad.bgis.fe.protocol.service.v1_0_0.model.routing.RoutingRequest"}}
```


### Response

#### Details of fields

<a target="_blank" rel="noopener" href="scheme.html?className=com.benomad.bgis.fe.protocol.service.v1_0_0.model.routing.RoutingResponse">Show the class diagram</a>

```
{"bemap":{"language":"!include","url":"/bgis/service/documentation/1.0/buildclass.md?className=com.benomad.bgis.fe.protocol.service.v1_0_0.model.routing.RoutingResponse"}}
```


#### Response sample
JSON Sample:
```
{"bemap":{"language":"javascript"}}
{
    "usedDestinations": [
        {
            "inputOrder": 0,
            "used": true,
            "usedOrder": 0,
            "matchedCoordinateGps": {
                "time": 0,
                "lon": 7.410589515220335,
                "lat": 43.73446
            },
            "confidenceValue": 0.26293365794278756,
            "distanceFromRequest": 0.26293365794278756,
            "polylineIndex": -1,
            "duration": -1,
            "length": -1
        },
        {
            "inputOrder": 1,
            "used": true,
            "usedOrder": 0,
            "matchedCoordinateGps": {
                "time": 0,
                "lon": 7.153760258732184,
                "lat": 43.7218875
            },
            "confidenceValue": 0.2531497216525051,
            "distanceFromRequest": 0.2531497216525051,
            "polylineIndex": -1,
            "duration": 2858,
            "length": 41176
        },
        {
            "inputOrder": 2,
            "used": true,
            "usedOrder": 0,
            "matchedCoordinateGps": {
                "time": 0,
                "lon": 7.150919586466134,
                "lat": 43.66243875
            },
            "confidenceValue": 0.2166680598512079,
            "distanceFromRequest": 0.2166680598512079,
            "polylineIndex": -1,
            "duration": 3697,
            "length": 49898
        },
        {
            "inputOrder": 3,
            "used": true,
            "usedOrder": 0,
            "matchedCoordinateGps": {
                "time": 0,
                "lon": 7.129009195030274,
                "lat": 43.62986375
            },
            "confidenceValue": 0.18562016614150673,
            "distanceFromRequest": 0.18562016614150673,
            "polylineIndex": -1,
            "duration": 4409,
            "length": 55188
        }
    ],
    "routingRoutes": [
        {
            "length": 55188,
            "duration": 4409,
            "trafficDelay": 0,
            "averageSpeed": 45.061646,
            "maximumSpeed": 0.0,
            "startUTurnThreshold": 3000,
            "startStopInfo": {
                "start": {
                    "lon": 7.41059,
                    "lat": 43.73446
                },
                "stop": {
                    "lon": 7.12901,
                    "lat": 43.62986
                },
                "distanceFirstMatched": 0.0,
                "distanceLastMatched": 0.42,
                "interDests": null
            }
        }
    ]
}
```
