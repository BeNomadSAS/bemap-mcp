# REST API, Service version 1.0.0


## TraceRoute service
Performs a road-matching of GPS coordinates and routing process for a specified type of vehicle. Road-matching consists in correcting uncertainties related to GPS measurements by repositioning a vehicle on the most accurate segment of neighboring roads. This service assumes that an input position corresponds to a chronological sequence of positions of a given vehicle driving on the road network.

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

URI: `/bgis/service/routing/1.0/traceroute`

POST data:
```
{"bemap":{"language":"javascript"}}
{
	"destinations" : [
		{
			"coordinateSat" : {
				"lon" : 7.066,
				"lat" : 43.616,
				"heading" : 17.6,
				"speed" : 23.1,
				"time" : 1396241966000,
				"sat" : 11
			}
		},
		{
			"coordinateSat" : {
				"lon" : 7.0664,
				"lat" : 43.6162,
				"heading" : 95.0,
				"speed" : 29.3,
				"time" : 1396241972000,
				"sat" : 11
			}
		},
				{
			"coordinateSat" : {
				"lon" : 7.0786,
				"lat" : 43.6153,
				"heading" : 119.0,
				"speed" : 61.9,
				"time" : 1396242062000,
				"sat" : 11
			}
		},
		{
			"coordinateSat" : {
				"lon" : 7.0805,
				"lat" : 43.6147,
				"heading" : 200.9,
				"speed" : 50.6,
				"time" : 1396242077000,
				"sat" : 11
			}
		},
		{
			"coordinateSat" : {
				"lon" : 7.0785,
				"lat" : 43.6117,
				"heading" : 115.8,
				"speed" : 38.1,
				"time" : 1396242104000,
				"sat" : 11
			}
		},
		{
			"coordinateSat" : {
				"lon" : 7.0787,
				"lat" : 43.6118,
				"heading" : 15.6,
				"speed" : 26.0,
				"time" : 1396242107000,
				"sat" : 11
			}
		},
		{
			"coordinateSat" : {
				"lon" : 7.0793,
				"lat" : 43.6128,
				"heading" : 76.0,
				"speed" : 26.6,
				"time" : 1396242128000,
				"sat" : 11
			}
		},
		{
			"coordinateSat" : {
				"lon" : 7.0814,
				"lat" : 43.6116,
				"heading" : 269.9,
				"speed" : 5.6,
				"time" : 1396242172000,
				"sat" : 11
			}
		},
		{
			"coordinateSat" : {
				"lon" : 7.0811,
				"lat" : 43.6117,
				"heading" : 338.7,
				"speed" : 7.5,
				"time" : 1396242182000,
				"sat" : 11
			}
		},
		{
			"coordinateSat" : {
				"lon" : 7.0812,
				"lat" : 43.6119,
				"heading" : 47.3,
				"speed" : 14.9,
				"time" : 1396241966000,
				"sat" : 11
			}
		},
		{
			"coordinateSat" : {
				"lon" : 7.0815,
				"lat" : 43.6119,
				"heading" : 127.1,
				"speed" : 8.5,
				"time" : 1396242198000,
				"sat" : 11
			}
		},
		{
			"coordinateSat" : {
				"lon" : 7.0816,
				"lat" : 43.6118,
				"heading" : 0.0,
				"speed" : 0.0,
				"time" : 1396242288000,
				"sat" : 11
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
	"options": ["ROUTESHEET","POLYLINE","POLYLINE_INDEX"]
}
```

All coordinates are defined by longitude and latitude, see the [coordinate system](index.html#page-glossary-coordinate_system.md) glossary for more details.

#### __Parameters__

<a target="_blank" rel="noopener" href="scheme.html?className=com.benomad.bgis.fe.protocol.service.v1_0_0.model.routing.TraceRouteRequest">Show the class diagram</a>

```
{"bemap":{"language":"!include","url":"/bgis/service/documentation/1.0/buildclass.md?className=com.benomad.bgis.fe.protocol.service.v1_0_0.model.routing.TraceRouteRequest"}}
```


### Response

#### Details of fields

<a target="_blank" rel="noopener" href="scheme.html?className=com.benomad.bgis.fe.protocol.service.v1_0_0.model.routing.RoutingResponse">Show the class diagram</a>

```
{"bemap":{"language":"!include","url":"/bgis/service/documentation/1.0/buildclass.md?className=com.benomad.bgis.fe.protocol.service.v1_0_0.model.routing.RoutingResponse"}}
```


#### Response samples
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
                "lon": 7.065868896076492,
                "lat": 43.616005
            },
            "confidenceValue": 0.2072894015379406,
            "distanceFromRequest": 0.2072894015379406,
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
                "lon": 7.066398283397998,
                "lat": 43.616205
            },
            "confidenceValue": 0.3909592926804005,
            "distanceFromRequest": 0.3909592926804005,
            "polylineIndex": -1,
            "duration": 17,
            "length": 56
        },
        {
            "inputOrder": 2,
            "used": true,
            "usedOrder": 0,
            "matchedCoordinateGps": {
                "time": 0,
                "lon": 7.078628713869563,
                "lat": 43.61534125
            },
            "confidenceValue": 0.9983651054630179,
            "distanceFromRequest": 0.9983651054630179,
            "polylineIndex": -1,
            "duration": 120,
            "length": 1154
        },
        {
            "inputOrder": 3,
            "used": true,
            "usedOrder": 0,
            "matchedCoordinateGps": {
                "time": 0,
                "lon": 7.080403748959592,
                "lat": 43.6147275
            },
            "confidenceValue": 0.5836206092537323,
            "distanceFromRequest": 0.5836206092537323,
            "polylineIndex": -1,
            "duration": 138,
            "length": 1350
        },
        {
            "inputOrder": 4,
            "used": true,
            "usedOrder": 0,
            "matchedCoordinateGps": {
                "time": 0,
                "lon": 7.07845,
                "lat": 43.61179
            },
            "confidenceValue": 0.23959387567291845,
            "distanceFromRequest": 0.23959387567291845,
            "polylineIndex": -1,
            "duration": 176,
            "length": 1746
        },
        {
            "inputOrder": 5,
            "used": true,
            "usedOrder": 0,
            "matchedCoordinateGps": {
                "time": 0,
                "lon": 7.07866,
                "lat": 43.61185
            },
            "confidenceValue": 0.28812487861800623,
            "distanceFromRequest": 0.28812487861800623,
            "polylineIndex": -1,
            "duration": 178,
            "length": 1764
        },
        {
            "inputOrder": 6,
            "used": true,
            "usedOrder": 0,
            "matchedCoordinateGps": {
                "time": 0,
                "lon": 7.079119995852384,
                "lat": 43.6128825
            },
            "confidenceValue": 0.41855910191836315,
            "distanceFromRequest": 0.41855910191836315,
            "polylineIndex": -1,
            "duration": 192,
            "length": 1892
        },
        {
            "inputOrder": 7,
            "used": true,
            "usedOrder": 0,
            "matchedCoordinateGps": {
                "time": 0,
                "lon": 7.08141,
                "lat": 43.61161
            },
            "confidenceValue": 1.0,
            "distanceFromRequest": 1.0,
            "polylineIndex": -1,
            "duration": 223,
            "length": 2148
        },
        {
            "inputOrder": 8,
            "used": true,
            "usedOrder": 0,
            "matchedCoordinateGps": {
                "time": 0,
                "lon": 7.0811,
                "lat": 43.6117
            },
            "confidenceValue": 1.0,
            "distanceFromRequest": 1.0,
            "polylineIndex": -1,
            "duration": 227,
            "length": 2175
        },
        {
            "inputOrder": 9,
            "used": true,
            "usedOrder": 0,
            "matchedCoordinateGps": {
                "time": 0,
                "lon": 7.0812,
                "lat": 43.6119
            },
            "confidenceValue": 1.0,
            "distanceFromRequest": 1.0,
            "polylineIndex": -1,
            "duration": 230,
            "length": 2199
        },
        {
            "inputOrder": 10,
            "used": true,
            "usedOrder": 0,
            "matchedCoordinateGps": {
                "time": 0,
                "lon": 7.081468042538314,
                "lat": 43.61183298936542
            },
            "confidenceValue": 1.0,
            "distanceFromRequest": 1.0,
            "polylineIndex": -1,
            "duration": 233,
            "length": 2221
        },
        {
            "inputOrder": 11,
            "used": true,
            "usedOrder": 0,
            "matchedCoordinateGps": {
                "time": 0,
                "lon": 7.0814,
                "lat": 43.61162
            },
            "confidenceValue": 1.0,
            "distanceFromRequest": 1.0,
            "polylineIndex": -1,
            "duration": 238,
            "length": 2258
        }
    ],
    "routingRoutes": [
        {
            "length": 2258,
            "duration": 238,
            "trafficDelay": 0,
            "averageSpeed": 34.15462,
            "maximumSpeed": 0.0,
            "startUTurnThreshold": 3000,
            "startStopInfo": {
                "start": {
                    "lon": 7.06587,
                    "lat": 43.61601
                },
                "stop": {
                    "lon": 7.0814,
                    "lat": 43.61162
                },
                "distanceFirstMatched": 0.56,
                "distanceLastMatched": 0.0,
                "interDests": null
            }
        }
    ]
}
```

