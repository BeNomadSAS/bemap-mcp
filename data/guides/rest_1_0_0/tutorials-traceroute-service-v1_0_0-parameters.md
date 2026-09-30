<a name="traceroute_parameters_tutorial"></a>
# 📘 TraceRoute Parameters – Detailed Usage Guide
This document provides an in-depth explanation of the main parameters of the TraceRoute API request. Each field is described with its purpose, usage guidance, and real-world JSON examples. Whether you're building a vehicle tracking application, analyzing driving behavior, or computing travel times, this guide will help you understand how to use each parameter correctly and effectively.
The request's other fields — `allowOffRoad`, `fenceShapes`, `options` (which has its own tutorial), the per-point `keptByMinimalWp` and the root-level `customData` — are not covered here.

We recommend reading each section individually to understand how it affects route matching and ETA estimation.

> ℹ️ In the examples' `routingVehicleFeature`, `height`, `width` and `length` are in centimetres and `weight` in tenths of a tonne: `35` = 3.5 t.<br>
> ℹ️ The sample responses were measured on production on 29 September 2026. A response marked *truncated* shows only the first entries of its long arrays (`polyline`, `corridor` coordinates).

---
<a name="traceroute_adjustEta_tutorial"></a>
## 🧭 adjustEta – Adjust Estimated Time of Arrival (ETA)
✅ **Use Case**

You want the **Estimated Time of Arrival (ETA)** to be refined based on the actual timestamp (`time`) provided at each GPS point. This is useful when replaying real-world vehicle traces to analyze delay, compare actual vs predicted behavior, or align with traffic data.

💡 **What it Does**

When `adjustEta` is set to `true`, the API uses the `time` value in each `coordinateSat` to align the computed ETA with real-world timestamps. It adjusts travel time estimations to better match the vehicle's speed and behavior over time.

> All `coordinateSat` objects must contain a valid `time` field (in milliseconds since Epoch UTC) when `adjustEta` is enabled.

🔧 **How to Enable**

Add the `adjustEta` field to the root of your request payload and set it to `true`.
```
"adjustEta": true
```
📦 **Example**
```
{
  "adjustEta": true,
  "routingVehicleProfile": {
    "transportMode": "CAR",
    "routingVehicleFeature": {
      "height": 380,
      "width": 250,
      "length": 1875,
      "weight": 35
    }
  },
  "options": ["ROUTESHEET", "POLYLINE"],
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
                "time" : 1396242190000,
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
    ]
}
```
**Response (truncated)**
```
{
  "usedDestinations": [
    {
      "inputOrder": 0,
      "used": true,
      "usedOrder": 0,
      "matchedCoordinateGps": {
        "lon": 7.06602,
        "lat": 43.61618
      },
      "confidenceValue": 0.08574764015778809,
      "distanceFromRequest": 20.1,
      "polylineIndex": -1,
      "duration": -1,
      "length": -1
    },
    {
      "inputOrder": 1,
      "used": true,
      "usedOrder": 1,
      "matchedCoordinateGps": {
        "lon": 7.066400317430266,
        "lat": 43.61620682152609
      },
      "confidenceValue": 0.10601713385854422,
      "distanceFromRequest": 0.76,
      "polylineIndex": -1,
      "duration": 6,
      "length": 31
    },
    {
      "inputOrder": 2,
      "used": true,
      "usedOrder": 2,
      "matchedCoordinateGps": {
        "lon": 7.078630465561669,
        "lat": 43.61534202308657
      },
      "confidenceValue": 0.51092712176195,
      "distanceFromRequest": 5.28,
      "polylineIndex": -1,
      "duration": 96,
      "length": 1128
    },
    {
      "inputOrder": 3,
      "used": true,
      "usedOrder": 3,
      "matchedCoordinateGps": {
        "lon": 7.08040384430796,
        "lat": 43.61472713942907
      },
      "confidenceValue": 0.36879436163061363,
      "distanceFromRequest": 8.32,
      "polylineIndex": -1,
      "duration": 111,
      "length": 1324
    },
    {
      "inputOrder": 4,
      "used": true,
      "usedOrder": 4,
      "matchedCoordinateGps": {
        "lon": 7.07845,
        "lat": 43.61179
      },
      "confidenceValue": 0.1570877388041818,
      "distanceFromRequest": 10.8,
      "polylineIndex": -1,
      "duration": 138,
      "length": 1718
    },
    {
      "inputOrder": 5,
      "used": true,
      "usedOrder": 5,
      "matchedCoordinateGps": {
        "lon": 7.07866,
        "lat": 43.61185
      },
      "confidenceValue": 0.17740010014753527,
      "distanceFromRequest": 6.43,
      "polylineIndex": -1,
      "duration": 141,
      "length": 1737
    },
    {
      "inputOrder": 6,
      "used": true,
      "usedOrder": 6,
      "matchedCoordinateGps": {
        "lon": 7.079380021004235,
        "lat": 43.61285888564006
      },
      "confidenceValue": 0.21769057231240393,
      "distanceFromRequest": 9.2,
      "polylineIndex": -1,
      "duration": 162,
      "length": 1896
    },
    {
      "inputOrder": 7,
      "used": true,
      "usedOrder": 7,
      "matchedCoordinateGps": {
        "lon": 7.08118,
        "lat": 43.61169
      },
      "confidenceValue": 0.15771606787125328,
      "distanceFromRequest": 20.37,
      "polylineIndex": -1,
      "duration": 206,
      "length": 2090
    },
    {
      "inputOrder": 8,
      "used": true,
      "usedOrder": 8,
      "matchedCoordinateGps": {
        "lon": 7.08118,
        "lat": 43.61169
      },
      "confidenceValue": 0.15738207601732185,
      "distanceFromRequest": 6.54,
      "polylineIndex": -1,
      "duration": 216,
      "length": 2090
    },
    {
      "inputOrder": 9,
      "used": true,
      "usedOrder": 9,
      "matchedCoordinateGps": {
        "lon": 7.08118,
        "lat": 43.61169
      },
      "confidenceValue": 0.1758813458024068,
      "distanceFromRequest": 23.43,
      "polylineIndex": -1,
      "duration": 224,
      "length": 2090
    },
    {
      "inputOrder": 10,
      "used": true,
      "usedOrder": 10,
      "matchedCoordinateGps": {
        "lon": 7.081305634154667,
        "lat": 43.61164064372495
      },
      "confidenceValue": 0.1620184383434684,
      "distanceFromRequest": 32.85,
      "polylineIndex": -1,
      "duration": 232,
      "length": 2102
    },
    {
      "inputOrder": 11,
      "used": true,
      "usedOrder": 11,
      "matchedCoordinateGps": {
        "lon": 7.081772121283489,
        "lat": 43.61169746672947
      },
      "confidenceValue": 0.1875133785230111,
      "distanceFromRequest": 17.96,
      "polylineIndex": -1,
      "duration": 322,
      "length": 2151
    }
  ],
  "routingRoutes": [
    {
      "length": 2151,
      "duration": 322,
      "totalDuration": 322,
      "trafficDelay": 0,
      "departureTime": 1396241966,
      "arrivalTime": 1396242288,
      "averageSpeed": 24.048447,
      "maximumSpeed": 0,
      "startUTurnThreshold": 3000,
      "routingInstructions": [
        {
          "type": "ENTER_ROUNDABOUT",
          "geoElementType": "ROAD",
          "length": 387,
          "duration": 32,
          "fromName": "Route des Lucioles",
          "manoeuvre": "RIGHT",
          "coordinate": {
            "lon": 7.07047,
            "lat": 43.61731
          },
          "roundAboutExitNumber": 2,
          "toName": "Carrefour du Golf",
          "toOn": "Carrefour du Golf",
          "textDist": "At 387 meters"
        },
        {
          "type": "EXIT_ROUNDABOUT",
          "geoElementType": "ROUNDABOUT",
          "length": 49,
          "duration": 8,
          "fromName": "Carrefour du Golf",
          "manoeuvre": "RIGHT",
          "coordinate": {
            "lon": 7.07093,
            "lat": 43.61741
          },
          "roundAboutExitNumber": 2,
          "toName": "D504",
          "toOn": "Route des Colles",
          "toRn": "D504",
          "textDist": "At 49 meters",
          "text": "From Route des Lucioles at roundabout take 2nd exit on D504"
        },
        {
          "type": "ENTER_ROUNDABOUT",
          "geoElementType": "ROAD",
          "length": 224,
          "duration": 19,
          "fromName": "Route des Colles",
          "manoeuvre": "RIGHT",
          "coordinate": {
            "lon": 7.07357,
            "lat": 43.61703
          },
          "roundAboutExitNumber": 3,
          "toName": "Carrefour Saint-Philippe",
          "toOn": "Carrefour Saint-Philippe",
          "textDist": "At 224 meters"
        },
        {
          "type": "EXIT_ROUNDABOUT",
          "geoElementType": "ROUNDABOUT",
          "length": 104,
          "duration": 17,
          "fromName": "Carrefour Saint-Philippe",
          "manoeuvre": "RIGHT",
          "coordinate": {
            "lon": 7.07463,
            "lat": 43.61674
          },
          "roundAboutExitNumber": 3,
          "toName": "D504",
          "toOn": "Route des Colles",
          "toRn": "D504",
          "textDist": "At 104 meters",
          "text": "From Route des Colles at roundabout take 3rd exit on D504"
        },
        {
          "type": "ENTER_ROUNDABOUT",
          "geoElementType": "ROAD",
          "length": 513,
          "duration": 30,
          "fromName": "Route des Colles",
          "manoeuvre": "STRAIGHT",
          "coordinate": {
            "lon": 7.08045,
            "lat": 43.61509
          },
          "roundAboutExitNumber": 1,
          "toName": "Carrefour des Chappes",
          "toOn": "Carrefour des Chappes",
          "textDist": "At 513 meters"
        },
        {
          "type": "EXIT_ROUNDABOUT",
          "geoElementType": "ROUNDABOUT",
          "length": 8,
          "duration": 2,
          "fromName": "Carrefour des Chappes",
          "manoeuvre": "RIGHT",
          "coordinate": {
            "lon": 7.08053,
            "lat": 43.61505
          },
          "roundAboutExitNumber": 1,
          "toName": "D535",
          "toOn": "Route des Chappes",
          "toRn": "D535",
          "textDist": "At 8 meters",
          "text": "From Route des Colles at roundabout take 1st exit on D535"
        },
        {
          "type": "ENTER_ROUNDABOUT",
          "geoElementType": "ROAD",
          "length": 360,
          "duration": 20,
          "fromName": "Route des Chappes",
          "manoeuvre": "STRAIGHT",
          "coordinate": {
            "lon": 7.07845,
            "lat": 43.61221
          },
          "roundAboutExitNumber": 4,
          "textDist": "At 360 meters"
        },
        {
          "type": "EXIT_ROUNDABOUT",
          "geoElementType": "ROUNDABOUT",
          "length": 122,
          "duration": 18,
          "manoeuvre": "BEAR_RIGHT",
          "coordinate": {
            "lon": 7.07869,
            "lat": 43.61212
          },
          "roundAboutExitNumber": 4,
          "toName": "D535",
          "toOn": "Route des Chappes",
          "toRn": "D535",
          "textDist": "At 122 meters",
          "text": "From Route des Chappes at roundabout take 4th exit on D535"
        },
        {
          "type": "FOLLOW",
          "geoElementType": "ROAD",
          "length": 107,
          "duration": 12,
          "fromName": "Route des Chappes",
          "manoeuvre": "RIGHT",
          "coordinate": {
            "lon": 7.07921,
            "lat": 43.61298
          },
          "roundAboutExitNumber": 0,
          "toName": "Allée Charles-Victor Naudin",
          "toOn": "Allée Charles-Victor Naudin",
          "textDist": "At 107 meters",
          "text": "From Route des Chappes make a right turn on Allée Charles-Victor Naudin"
        },
        {
          "type": "FOLLOW",
          "geoElementType": "ROAD",
          "length": 246,
          "duration": 95,
          "fromName": "Allée Charles-Victor Naudin",
          "manoeuvre": "LEFT",
          "coordinate": {
            "lon": 7.08151,
            "lat": 43.61153
          },
          "roundAboutExitNumber": 0,
          "textDist": "At 246 meters",
          "text": "From Allée Charles-Victor Naudin make a left turn"
        },
        {
          "type": "STOP",
          "geoElementType": "ROAD",
          "length": 29,
          "duration": 68,
          "manoeuvre": "STRAIGHT",
          "coordinate": {
            "lon": 7.08177,
            "lat": 43.6117
          },
          "roundAboutExitNumber": 0,
          "textDist": "At 29 meters",
          "text": "Destination reached"
        }
      ],
      "boundingBox": {
        "minLon": 7.06602,
        "minLat": 43.61153,
        "maxLon": 7.081772121283489,
        "maxLat": 43.6175
      },
      "startStopInfo": {
        "start": {
          "lon": 7.06602,
          "lat": 43.61618
        },
        "stop": {
          "lon": 7.08177,
          "lat": 43.6117
        },
        "distanceFirstMatched": 0,
        "distanceLastMatched": 0.28,
        "interDests": null
      },
      "polyline": [
        {
          "lon": 7.06602,
          "lat": 43.61618
        },
        {
          "lon": 7.06627,
          "lat": 43.61621
        },
        {
          "lon": 7.06668,
          "lat": 43.6162
        },
        {
          "lon": 7.06701,
          "lat": 43.61621
        },
        {
          "lon": 7.06751,
          "lat": 43.61625
        }
      ]
    }
  ]
}
```
> ⏱️ Note: ETA values in the response will reflect actual travel time between GPS points, rather than being estimated from speed limits or routing heuristics — measured with the example above: a duration of 322 s, the span between the first and the last GPS `time`, against 245 s without `adjustEta`.
---
<a name="traceroute_corridorRadius_tutorial"></a>
## 🛣️ corridorRadius – Define a Route Corridor Radius
✅ **Use Case**

You want to create a buffer zone around the route. This is particularly useful when evaluating if the vehicle remained within a defined route corridor.

💡 **What it Does**

When `corridorRadius` is set (in meters), the API creates a corridor of width 2 × `corridorRadius` around the computed route, and returns it as a polygon in the `corridor` field of each route (`routingRoutes[].corridor[].coordinates`).
It is an **output only**: it does not change the matching. Measured with the example below, with a `corridorRadius` of 30, of 500 or none, every matched coordinate, confidence value and distance from the request, and the route itself (2151 m, 245 s), are identical; only the `corridor` field is added.

🔧 **How to Enable**

Add the `corridorRadius` field to the root of your request. The value is in meters.
```
"corridorRadius": 30
```
📦 **Example**
```
{
  "corridorRadius": 30,
  "routingVehicleProfile": {
    "transportMode": "CAR",
    "routingVehicleFeature": {
      "height": 380,
      "width": 250,
      "length": 1875,
      "weight": 35
    }
  },
  "options": ["ROUTESHEET", "POLYLINE"],
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
                "time" : 1396242190000,
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
    ]
}
```
**Response (truncated)**
```
{
  "usedDestinations": [
    {
      "inputOrder": 0,
      "used": true,
      "usedOrder": 0,
      "matchedCoordinateGps": {
        "lon": 7.06602,
        "lat": 43.61618
      },
      "confidenceValue": 0.08574764015778809,
      "distanceFromRequest": 20.1,
      "polylineIndex": -1,
      "duration": -1,
      "length": -1
    },
    {
      "inputOrder": 1,
      "used": true,
      "usedOrder": 1,
      "matchedCoordinateGps": {
        "lon": 7.066400317430266,
        "lat": 43.61620682152609
      },
      "confidenceValue": 0.10601713385854422,
      "distanceFromRequest": 0.76,
      "polylineIndex": -1,
      "duration": 4,
      "length": 31
    },
    {
      "inputOrder": 2,
      "used": true,
      "usedOrder": 2,
      "matchedCoordinateGps": {
        "lon": 7.078630465561669,
        "lat": 43.61534202308657
      },
      "confidenceValue": 0.51092712176195,
      "distanceFromRequest": 5.28,
      "polylineIndex": -1,
      "duration": 118,
      "length": 1128
    },
    {
      "inputOrder": 3,
      "used": true,
      "usedOrder": 3,
      "matchedCoordinateGps": {
        "lon": 7.08040384430796,
        "lat": 43.61472713942907
      },
      "confidenceValue": 0.36879436163061363,
      "distanceFromRequest": 8.32,
      "polylineIndex": -1,
      "duration": 139,
      "length": 1324
    },
    {
      "inputOrder": 4,
      "used": true,
      "usedOrder": 4,
      "matchedCoordinateGps": {
        "lon": 7.07845,
        "lat": 43.61179
      },
      "confidenceValue": 0.1570877388041818,
      "distanceFromRequest": 10.8,
      "polylineIndex": -1,
      "duration": 178,
      "length": 1718
    },
    {
      "inputOrder": 5,
      "used": true,
      "usedOrder": 5,
      "matchedCoordinateGps": {
        "lon": 7.07866,
        "lat": 43.61185
      },
      "confidenceValue": 0.17740010014753527,
      "distanceFromRequest": 6.43,
      "polylineIndex": -1,
      "duration": 180,
      "length": 1737
    },
    {
      "inputOrder": 6,
      "used": true,
      "usedOrder": 6,
      "matchedCoordinateGps": {
        "lon": 7.079380021004235,
        "lat": 43.61285888564006
      },
      "confidenceValue": 0.21769057231240393,
      "distanceFromRequest": 9.2,
      "polylineIndex": -1,
      "duration": 198,
      "length": 1896
    },
    {
      "inputOrder": 7,
      "used": true,
      "usedOrder": 7,
      "matchedCoordinateGps": {
        "lon": 7.08118,
        "lat": 43.61169
      },
      "confidenceValue": 0.15771606787125328,
      "distanceFromRequest": 20.37,
      "polylineIndex": -1,
      "duration": 226,
      "length": 2090
    },
    {
      "inputOrder": 8,
      "used": true,
      "usedOrder": 8,
      "matchedCoordinateGps": {
        "lon": 7.08118,
        "lat": 43.61169
      },
      "confidenceValue": 0.15738207601732185,
      "distanceFromRequest": 6.54,
      "polylineIndex": -1,
      "duration": 226,
      "length": 2090
    },
    {
      "inputOrder": 9,
      "used": true,
      "usedOrder": 9,
      "matchedCoordinateGps": {
        "lon": 7.08118,
        "lat": 43.61169
      },
      "confidenceValue": 0.1758813458024068,
      "distanceFromRequest": 23.43,
      "polylineIndex": -1,
      "duration": 226,
      "length": 2090
    },
    {
      "inputOrder": 10,
      "used": true,
      "usedOrder": 10,
      "matchedCoordinateGps": {
        "lon": 7.081305634154667,
        "lat": 43.61164064372495
      },
      "confidenceValue": 0.1620184383434684,
      "distanceFromRequest": 32.85,
      "polylineIndex": -1,
      "duration": 230,
      "length": 2102
    },
    {
      "inputOrder": 11,
      "used": true,
      "usedOrder": 11,
      "matchedCoordinateGps": {
        "lon": 7.081772121283489,
        "lat": 43.61169746672947
      },
      "confidenceValue": 0.1875133785230111,
      "distanceFromRequest": 17.96,
      "polylineIndex": -1,
      "duration": 245,
      "length": 2151
    }
  ],
  "routingRoutes": [
    {
      "length": 2151,
      "duration": 245,
      "totalDuration": 245,
      "trafficDelay": 0,
      "departureTime": 1396241966,
      "arrivalTime": 1396242211,
      "averageSpeed": 31.606531,
      "maximumSpeed": 0,
      "startUTurnThreshold": 3000,
      "routingInstructions": [
        {
          "type": "ENTER_ROUNDABOUT",
          "geoElementType": "ROAD",
          "length": 387,
          "duration": 37,
          "fromName": "Route des Lucioles",
          "manoeuvre": "RIGHT",
          "coordinate": {
            "lon": 7.07047,
            "lat": 43.61731
          },
          "roundAboutExitNumber": 2,
          "toName": "Carrefour du Golf",
          "toOn": "Carrefour du Golf",
          "textDist": "At 387 meters"
        },
        {
          "type": "EXIT_ROUNDABOUT",
          "geoElementType": "ROUNDABOUT",
          "length": 49,
          "duration": 10,
          "fromName": "Carrefour du Golf",
          "manoeuvre": "RIGHT",
          "coordinate": {
            "lon": 7.07093,
            "lat": 43.61741
          },
          "roundAboutExitNumber": 2,
          "toName": "D504",
          "toOn": "Route des Colles",
          "toRn": "D504",
          "textDist": "At 49 meters",
          "text": "From Route des Lucioles at roundabout take 2nd exit on D504"
        },
        {
          "type": "ENTER_ROUNDABOUT",
          "geoElementType": "ROAD",
          "length": 224,
          "duration": 24,
          "fromName": "Route des Colles",
          "manoeuvre": "RIGHT",
          "coordinate": {
            "lon": 7.07357,
            "lat": 43.61703
          },
          "roundAboutExitNumber": 3,
          "toName": "Carrefour Saint-Philippe",
          "toOn": "Carrefour Saint-Philippe",
          "textDist": "At 224 meters"
        },
        {
          "type": "EXIT_ROUNDABOUT",
          "geoElementType": "ROUNDABOUT",
          "length": 104,
          "duration": 22,
          "fromName": "Carrefour Saint-Philippe",
          "manoeuvre": "RIGHT",
          "coordinate": {
            "lon": 7.07463,
            "lat": 43.61674
          },
          "roundAboutExitNumber": 3,
          "toName": "D504",
          "toOn": "Route des Colles",
          "toRn": "D504",
          "textDist": "At 104 meters",
          "text": "From Route des Colles at roundabout take 3rd exit on D504"
        },
        {
          "type": "ENTER_ROUNDABOUT",
          "geoElementType": "ROAD",
          "length": 513,
          "duration": 39,
          "fromName": "Route des Colles",
          "manoeuvre": "STRAIGHT",
          "coordinate": {
            "lon": 7.08045,
            "lat": 43.61509
          },
          "roundAboutExitNumber": 1,
          "toName": "Carrefour des Chappes",
          "toOn": "Carrefour des Chappes",
          "textDist": "At 513 meters"
        },
        {
          "type": "EXIT_ROUNDABOUT",
          "geoElementType": "ROUNDABOUT",
          "length": 8,
          "duration": 3,
          "fromName": "Carrefour des Chappes",
          "manoeuvre": "RIGHT",
          "coordinate": {
            "lon": 7.08053,
            "lat": 43.61505
          },
          "roundAboutExitNumber": 1,
          "toName": "D535",
          "toOn": "Route des Chappes",
          "toRn": "D535",
          "textDist": "At 8 meters",
          "text": "From Route des Colles at roundabout take 1st exit on D535"
        },
        {
          "type": "ENTER_ROUNDABOUT",
          "geoElementType": "ROAD",
          "length": 360,
          "duration": 29,
          "fromName": "Route des Chappes",
          "manoeuvre": "STRAIGHT",
          "coordinate": {
            "lon": 7.07845,
            "lat": 43.61221
          },
          "roundAboutExitNumber": 4,
          "textDist": "At 360 meters"
        },
        {
          "type": "EXIT_ROUNDABOUT",
          "geoElementType": "ROUNDABOUT",
          "length": 122,
          "duration": 21,
          "manoeuvre": "BEAR_RIGHT",
          "coordinate": {
            "lon": 7.07869,
            "lat": 43.61212
          },
          "roundAboutExitNumber": 4,
          "toName": "D535",
          "toOn": "Route des Chappes",
          "toRn": "D535",
          "textDist": "At 122 meters",
          "text": "From Route des Chappes at roundabout take 4th exit on D535"
        },
        {
          "type": "FOLLOW",
          "geoElementType": "ROAD",
          "length": 107,
          "duration": 9,
          "fromName": "Route des Chappes",
          "manoeuvre": "RIGHT",
          "coordinate": {
            "lon": 7.07921,
            "lat": 43.61298
          },
          "roundAboutExitNumber": 0,
          "toName": "Allée Charles-Victor Naudin",
          "toOn": "Allée Charles-Victor Naudin",
          "textDist": "At 107 meters",
          "text": "From Route des Chappes make a right turn on Allée Charles-Victor Naudin"
        },
        {
          "type": "FOLLOW",
          "geoElementType": "ROAD",
          "length": 246,
          "duration": 38,
          "fromName": "Allée Charles-Victor Naudin",
          "manoeuvre": "LEFT",
          "coordinate": {
            "lon": 7.08151,
            "lat": 43.61153
          },
          "roundAboutExitNumber": 0,
          "textDist": "At 246 meters",
          "text": "From Allée Charles-Victor Naudin make a left turn"
        },
        {
          "type": "STOP",
          "geoElementType": "ROAD",
          "length": 29,
          "duration": 12,
          "manoeuvre": "STRAIGHT",
          "coordinate": {
            "lon": 7.08177,
            "lat": 43.6117
          },
          "roundAboutExitNumber": 0,
          "textDist": "At 29 meters",
          "text": "Destination reached"
        }
      ],
      "boundingBox": {
        "minLon": 7.06602,
        "minLat": 43.61153,
        "maxLon": 7.081772121283489,
        "maxLat": 43.6175
      },
      "corridor": [
        {
          "coordinates": [
            {
              "lon": 7.07767,
              "lat": 43.61622
            },
            {
              "lon": 7.07833,
              "lat": 43.61586
            },
            {
              "lon": 7.07932,
              "lat": 43.6155
            },
            {
              "lon": 7.07957,
              "lat": 43.61544
            },
            {
              "lon": 7.08073,
              "lat": 43.61538
            }
          ]
        }
      ],
      "startStopInfo": {
        "start": {
          "lon": 7.06602,
          "lat": 43.61618
        },
        "stop": {
          "lon": 7.08177,
          "lat": 43.6117
        },
        "distanceFirstMatched": 0,
        "distanceLastMatched": 0.28,
        "interDests": null
      },
      "polyline": [
        {
          "lon": 7.06602,
          "lat": 43.61618
        },
        {
          "lon": 7.06627,
          "lat": 43.61621
        },
        {
          "lon": 7.06668,
          "lat": 43.6162
        },
        {
          "lon": 7.06701,
          "lat": 43.61621
        },
        {
          "lon": 7.06751,
          "lat": 43.61625
        }
      ]
    }
  ]
}
```
> 📏 A wider corridor makes a wider polygon for route adherence analysis; it does not make the matching more tolerant of GPS noise.
---
<a name="traceroute_customData_tutorial"></a>
## 🏷️ customData – Tag Coordinates with Custom Information
✅ **Use Case**

You want to **add metadata to specific coordinates** in your trace—such as labels, sensor IDs, or user-specific flags—that can later be used for debugging, filtering, or analytics.

💡 **What it Does**

The `customData` field allows you to attach custom key-value pairs to each destination point. These values are not used in routing but are returned as-is in the result, letting you trace back information or tag specific events (e.g., `"event": "start_brake"`).

🔧 **How to Enable**

Add a `customData` field inside any destination object. It should be a list of key-value objects (`CustomDt[]`), each with a `key` and a `value`.
```
"customData": [
  { "key": "event", "value": "start_brake" },
  { "key": "sensor", "value": "rear" }
]
```
**📦 Example**
```
{
  "destinations": [
    {
      "coordinateSat": {
        "lat": 43.616,
        "lon": 7.066,
        "speed": 23.1,
        "time": 1396241966000
      },
      "customData": [
        { "key": "event", "value": "start_brake" },
        { "key": "sensor", "value": "rear" }
      ]
    },
    {
      "coordinateSat": {
        "lat": 43.6162,
        "lon": 7.0664,
        "speed": 29.3,
        "time": 1396241972000
      },
      "customData": [
        { "key": "event", "value": "release_brake" },
        { "key": "sensor", "value": "front" }
      ]
    }
  ],
  "routingVehicleProfile": {
    "transportMode": "CAR",
    "routingVehicleFeature": {
      "height": 380,
      "width": 250,
      "length": 1875,
      "weight": 35
    }
  },
  "options": ["ROUTESHEET"]
}
```
**Response**
```
{
  "usedDestinations": [
    {
      "inputOrder": 0,
      "used": true,
      "usedOrder": 0,
      "matchedCoordinateGps": {
        "lon": 7.06602,
        "lat": 43.61618
      },
      "confidenceValue": 0.08437574381641261,
      "distanceFromRequest": 20.1,
      "polylineIndex": -1,
      "duration": -1,
      "length": -1,
      "customData": [
        {
          "key": "event",
          "value": "start_brake"
        },
        {
          "key": "sensor",
          "value": "rear"
        }
      ]
    },
    {
      "inputOrder": 1,
      "used": true,
      "usedOrder": 1,
      "matchedCoordinateGps": {
        "lon": 7.066400317430266,
        "lat": 43.61620682152609
      },
      "confidenceValue": 0.08997517350099854,
      "distanceFromRequest": 0.76,
      "polylineIndex": -1,
      "duration": 4,
      "length": 31,
      "customData": [
        {
          "key": "event",
          "value": "release_brake"
        },
        {
          "key": "sensor",
          "value": "front"
        }
      ]
    }
  ],
  "routingRoutes": [
    {
      "length": 31,
      "duration": 4,
      "totalDuration": 4,
      "trafficDelay": 0,
      "departureTime": 1396241966,
      "arrivalTime": 1396241970,
      "averageSpeed": 27.9,
      "maximumSpeed": 0,
      "startUTurnThreshold": 3000,
      "routingInstructions": [
        {
          "type": "STOP",
          "geoElementType": "ROAD",
          "length": 30,
          "duration": 4,
          "fromName": "Route des Lucioles",
          "manoeuvre": "STRAIGHT",
          "coordinate": {
            "lon": 7.0664,
            "lat": 43.61621
          },
          "roundAboutExitNumber": 0,
          "textDist": "At 30 meters",
          "text": "Destination reached"
        }
      ],
      "startStopInfo": {
        "start": {
          "lon": 7.06602,
          "lat": 43.61618
        },
        "stop": {
          "lon": 7.0664,
          "lat": 43.61621
        },
        "distanceFirstMatched": 0,
        "distanceLastMatched": 0.35,
        "interDests": null
      }
    }
  ]
}
```
> 🧠 Custom data is **preserved in the response**, allowing post-processing or visual tagging in your application.
---
<a name="traceroute_departureTime_tutorial"></a>
## ⏰ departureTime – Specify When the Trip Starts
✅ **Use Case**
You want to simulate a route starting at a specific time to influence results like ETA, traffic-based speeds, or scheduled constraints.

💡 **What it Does**
The `departureTime` defines the starting time of the route. It is meant to be used to:

Adjust time-dependent calculations (e.g., traffic models, toll conditions, time-restricted roads).

Make the ETA of each step relative to a real-world clock.

Sync results with external planning systems.

> ⚠️ Measured on production (29 September 2026): the TraceRoute service reads `departureTime` but does not apply it — the response is identical with or without it. The route's `departureTime` and `arrivalTime` come from the GPS `time` of the points (in seconds: `1396241966` for the example below) and stay `0` when the points carry no `time`; the duration does not change. To place a trace on a real-world clock, send the GPS `time` of each point (see `adjustEta`).

It accepts two formats:

ISO 8601 with time zone, e.g., `2025-07-09T10:00:00+02:00[Europe/Paris]`

Epoch time in milliseconds (UTC), e.g., `1752048000000`

A value it cannot parse answers `400` with the code `INTERNAL_ERROR` and a message that does not name the field, e.g. *"Text 'not-a-date' could not be parsed at index 0"*.

🔧 **How to Enable**
Add the `departureTime` field at the root of your request object.
**Example with ISO format**
```
"departureTime": "2025-07-09T10:00:00+02:00[Europe/Paris]"
```
**Example with Epoch format**
```
"departureTime": 1752048000000
```
📦 **Example**
```
{
  "routingVehicleProfile": {
    "transportMode": "CAR",
    "routingVehicleFeature": {
      "height": 380,
      "width": 250,
      "length": 1875,
      "weight": 35
    }
  },
  "departureTime": "2025-07-09T10:00:00+02:00[Europe/Paris]",
  "options": ["ROUTESHEET", "POLYLINE"],
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
                "time" : 1396242190000,
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
    ]
}
```
**Response (truncated)**
```
{
  "usedDestinations": [
    {
      "inputOrder": 0,
      "used": true,
      "usedOrder": 0,
      "matchedCoordinateGps": {
        "lon": 7.06602,
        "lat": 43.61618
      },
      "confidenceValue": 0.08574764015778809,
      "distanceFromRequest": 20.1,
      "polylineIndex": -1,
      "duration": -1,
      "length": -1
    },
    {
      "inputOrder": 1,
      "used": true,
      "usedOrder": 1,
      "matchedCoordinateGps": {
        "lon": 7.066400317430266,
        "lat": 43.61620682152609
      },
      "confidenceValue": 0.10601713385854422,
      "distanceFromRequest": 0.76,
      "polylineIndex": -1,
      "duration": 4,
      "length": 31
    },
    {
      "inputOrder": 2,
      "used": true,
      "usedOrder": 2,
      "matchedCoordinateGps": {
        "lon": 7.078630465561669,
        "lat": 43.61534202308657
      },
      "confidenceValue": 0.51092712176195,
      "distanceFromRequest": 5.28,
      "polylineIndex": -1,
      "duration": 118,
      "length": 1128
    },
    {
      "inputOrder": 3,
      "used": true,
      "usedOrder": 3,
      "matchedCoordinateGps": {
        "lon": 7.08040384430796,
        "lat": 43.61472713942907
      },
      "confidenceValue": 0.36879436163061363,
      "distanceFromRequest": 8.32,
      "polylineIndex": -1,
      "duration": 139,
      "length": 1324
    },
    {
      "inputOrder": 4,
      "used": true,
      "usedOrder": 4,
      "matchedCoordinateGps": {
        "lon": 7.07845,
        "lat": 43.61179
      },
      "confidenceValue": 0.1570877388041818,
      "distanceFromRequest": 10.8,
      "polylineIndex": -1,
      "duration": 178,
      "length": 1718
    },
    {
      "inputOrder": 5,
      "used": true,
      "usedOrder": 5,
      "matchedCoordinateGps": {
        "lon": 7.07866,
        "lat": 43.61185
      },
      "confidenceValue": 0.17740010014753527,
      "distanceFromRequest": 6.43,
      "polylineIndex": -1,
      "duration": 180,
      "length": 1737
    },
    {
      "inputOrder": 6,
      "used": true,
      "usedOrder": 6,
      "matchedCoordinateGps": {
        "lon": 7.079380021004235,
        "lat": 43.61285888564006
      },
      "confidenceValue": 0.21769057231240393,
      "distanceFromRequest": 9.2,
      "polylineIndex": -1,
      "duration": 198,
      "length": 1896
    },
    {
      "inputOrder": 7,
      "used": true,
      "usedOrder": 7,
      "matchedCoordinateGps": {
        "lon": 7.08118,
        "lat": 43.61169
      },
      "confidenceValue": 0.15771606787125328,
      "distanceFromRequest": 20.37,
      "polylineIndex": -1,
      "duration": 226,
      "length": 2090
    },
    {
      "inputOrder": 8,
      "used": true,
      "usedOrder": 8,
      "matchedCoordinateGps": {
        "lon": 7.08118,
        "lat": 43.61169
      },
      "confidenceValue": 0.15738207601732185,
      "distanceFromRequest": 6.54,
      "polylineIndex": -1,
      "duration": 226,
      "length": 2090
    },
    {
      "inputOrder": 9,
      "used": true,
      "usedOrder": 9,
      "matchedCoordinateGps": {
        "lon": 7.08118,
        "lat": 43.61169
      },
      "confidenceValue": 0.1758813458024068,
      "distanceFromRequest": 23.43,
      "polylineIndex": -1,
      "duration": 226,
      "length": 2090
    },
    {
      "inputOrder": 10,
      "used": true,
      "usedOrder": 10,
      "matchedCoordinateGps": {
        "lon": 7.081305634154667,
        "lat": 43.61164064372495
      },
      "confidenceValue": 0.1620184383434684,
      "distanceFromRequest": 32.85,
      "polylineIndex": -1,
      "duration": 230,
      "length": 2102
    },
    {
      "inputOrder": 11,
      "used": true,
      "usedOrder": 11,
      "matchedCoordinateGps": {
        "lon": 7.081772121283489,
        "lat": 43.61169746672947
      },
      "confidenceValue": 0.1875133785230111,
      "distanceFromRequest": 17.96,
      "polylineIndex": -1,
      "duration": 245,
      "length": 2151
    }
  ],
  "routingRoutes": [
    {
      "length": 2151,
      "duration": 245,
      "totalDuration": 245,
      "trafficDelay": 0,
      "departureTime": 1396241966,
      "arrivalTime": 1396242211,
      "averageSpeed": 31.606531,
      "maximumSpeed": 0,
      "startUTurnThreshold": 3000,
      "routingInstructions": [
        {
          "type": "ENTER_ROUNDABOUT",
          "geoElementType": "ROAD",
          "length": 387,
          "duration": 37,
          "fromName": "Route des Lucioles",
          "manoeuvre": "RIGHT",
          "coordinate": {
            "lon": 7.07047,
            "lat": 43.61731
          },
          "roundAboutExitNumber": 2,
          "toName": "Carrefour du Golf",
          "toOn": "Carrefour du Golf",
          "textDist": "At 387 meters"
        },
        {
          "type": "EXIT_ROUNDABOUT",
          "geoElementType": "ROUNDABOUT",
          "length": 49,
          "duration": 10,
          "fromName": "Carrefour du Golf",
          "manoeuvre": "RIGHT",
          "coordinate": {
            "lon": 7.07093,
            "lat": 43.61741
          },
          "roundAboutExitNumber": 2,
          "toName": "D504",
          "toOn": "Route des Colles",
          "toRn": "D504",
          "textDist": "At 49 meters",
          "text": "From Route des Lucioles at roundabout take 2nd exit on D504"
        },
        {
          "type": "ENTER_ROUNDABOUT",
          "geoElementType": "ROAD",
          "length": 224,
          "duration": 24,
          "fromName": "Route des Colles",
          "manoeuvre": "RIGHT",
          "coordinate": {
            "lon": 7.07357,
            "lat": 43.61703
          },
          "roundAboutExitNumber": 3,
          "toName": "Carrefour Saint-Philippe",
          "toOn": "Carrefour Saint-Philippe",
          "textDist": "At 224 meters"
        },
        {
          "type": "EXIT_ROUNDABOUT",
          "geoElementType": "ROUNDABOUT",
          "length": 104,
          "duration": 22,
          "fromName": "Carrefour Saint-Philippe",
          "manoeuvre": "RIGHT",
          "coordinate": {
            "lon": 7.07463,
            "lat": 43.61674
          },
          "roundAboutExitNumber": 3,
          "toName": "D504",
          "toOn": "Route des Colles",
          "toRn": "D504",
          "textDist": "At 104 meters",
          "text": "From Route des Colles at roundabout take 3rd exit on D504"
        },
        {
          "type": "ENTER_ROUNDABOUT",
          "geoElementType": "ROAD",
          "length": 513,
          "duration": 39,
          "fromName": "Route des Colles",
          "manoeuvre": "STRAIGHT",
          "coordinate": {
            "lon": 7.08045,
            "lat": 43.61509
          },
          "roundAboutExitNumber": 1,
          "toName": "Carrefour des Chappes",
          "toOn": "Carrefour des Chappes",
          "textDist": "At 513 meters"
        },
        {
          "type": "EXIT_ROUNDABOUT",
          "geoElementType": "ROUNDABOUT",
          "length": 8,
          "duration": 3,
          "fromName": "Carrefour des Chappes",
          "manoeuvre": "RIGHT",
          "coordinate": {
            "lon": 7.08053,
            "lat": 43.61505
          },
          "roundAboutExitNumber": 1,
          "toName": "D535",
          "toOn": "Route des Chappes",
          "toRn": "D535",
          "textDist": "At 8 meters",
          "text": "From Route des Colles at roundabout take 1st exit on D535"
        },
        {
          "type": "ENTER_ROUNDABOUT",
          "geoElementType": "ROAD",
          "length": 360,
          "duration": 29,
          "fromName": "Route des Chappes",
          "manoeuvre": "STRAIGHT",
          "coordinate": {
            "lon": 7.07845,
            "lat": 43.61221
          },
          "roundAboutExitNumber": 4,
          "textDist": "At 360 meters"
        },
        {
          "type": "EXIT_ROUNDABOUT",
          "geoElementType": "ROUNDABOUT",
          "length": 122,
          "duration": 21,
          "manoeuvre": "BEAR_RIGHT",
          "coordinate": {
            "lon": 7.07869,
            "lat": 43.61212
          },
          "roundAboutExitNumber": 4,
          "toName": "D535",
          "toOn": "Route des Chappes",
          "toRn": "D535",
          "textDist": "At 122 meters",
          "text": "From Route des Chappes at roundabout take 4th exit on D535"
        },
        {
          "type": "FOLLOW",
          "geoElementType": "ROAD",
          "length": 107,
          "duration": 9,
          "fromName": "Route des Chappes",
          "manoeuvre": "RIGHT",
          "coordinate": {
            "lon": 7.07921,
            "lat": 43.61298
          },
          "roundAboutExitNumber": 0,
          "toName": "Allée Charles-Victor Naudin",
          "toOn": "Allée Charles-Victor Naudin",
          "textDist": "At 107 meters",
          "text": "From Route des Chappes make a right turn on Allée Charles-Victor Naudin"
        },
        {
          "type": "FOLLOW",
          "geoElementType": "ROAD",
          "length": 246,
          "duration": 38,
          "fromName": "Allée Charles-Victor Naudin",
          "manoeuvre": "LEFT",
          "coordinate": {
            "lon": 7.08151,
            "lat": 43.61153
          },
          "roundAboutExitNumber": 0,
          "textDist": "At 246 meters",
          "text": "From Allée Charles-Victor Naudin make a left turn"
        },
        {
          "type": "STOP",
          "geoElementType": "ROAD",
          "length": 29,
          "duration": 12,
          "manoeuvre": "STRAIGHT",
          "coordinate": {
            "lon": 7.08177,
            "lat": 43.6117
          },
          "roundAboutExitNumber": 0,
          "textDist": "At 29 meters",
          "text": "Destination reached"
        }
      ],
      "boundingBox": {
        "minLon": 7.06602,
        "minLat": 43.61153,
        "maxLon": 7.081772121283489,
        "maxLat": 43.6175
      },
      "startStopInfo": {
        "start": {
          "lon": 7.06602,
          "lat": 43.61618
        },
        "stop": {
          "lon": 7.08177,
          "lat": 43.6117
        },
        "distanceFirstMatched": 0,
        "distanceLastMatched": 0.28,
        "interDests": null
      },
      "polyline": [
        {
          "lon": 7.06602,
          "lat": 43.61618
        },
        {
          "lon": 7.06627,
          "lat": 43.61621
        },
        {
          "lon": 7.06668,
          "lat": 43.6162
        },
        {
          "lon": 7.06701,
          "lat": 43.61621
        },
        {
          "lon": 7.06751,
          "lat": 43.61625
        }
      ]
    }
  ]
}
```
> ✅ Accepted in both formats; on TraceRoute, the times in the response come from the GPS points, not from `departureTime`.
---
<a name="traceroute_geoserver_tutorial"></a>
## 🗺️ geoserver – Choose the Map Data Provider
✅ **Use Case**

You want to choose which map data provider is used to perform the route matching (e.g. HERE, TomTom...).

💡 **What it Does**

The `geoserver` parameter allows you to specify the **routing engine and map data source** behind the TraceRoute service.
It directly impacts the quality, availability, and features of the route (e.g. road coverage, turn restrictions, speed limits).

Typical values include:

- `here` (default if omitted)
- `tomtom` (if available)
- Any other valid provider configured for your environment.

🔧 **How to Enable**

Add the geoserver field to your request and set it to the desired provider.
```
"geoserver": "here"
```
📦 **Example**
```
{
  "routingVehicleProfile": {
    "transportMode": "CAR"
  },
  "geoserver": "here",
  "options": ["ROUTESHEET", "POLYLINE"],
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
                "time" : 1396242190000,
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
    ]
}
```
**Response (truncated)**
```
{
  "usedDestinations": [
    {
      "inputOrder": 0,
      "used": true,
      "usedOrder": 0,
      "matchedCoordinateGps": {
        "lon": 7.06602,
        "lat": 43.61618
      },
      "confidenceValue": 0.08574764015778809,
      "distanceFromRequest": 20.1,
      "polylineIndex": -1,
      "duration": -1,
      "length": -1
    },
    {
      "inputOrder": 1,
      "used": true,
      "usedOrder": 1,
      "matchedCoordinateGps": {
        "lon": 7.066400317430266,
        "lat": 43.61620682152609
      },
      "confidenceValue": 0.10601713385854422,
      "distanceFromRequest": 0.76,
      "polylineIndex": -1,
      "duration": 4,
      "length": 31
    },
    {
      "inputOrder": 2,
      "used": true,
      "usedOrder": 2,
      "matchedCoordinateGps": {
        "lon": 7.078630465561669,
        "lat": 43.61534202308657
      },
      "confidenceValue": 0.51092712176195,
      "distanceFromRequest": 5.28,
      "polylineIndex": -1,
      "duration": 118,
      "length": 1128
    },
    {
      "inputOrder": 3,
      "used": true,
      "usedOrder": 3,
      "matchedCoordinateGps": {
        "lon": 7.08040384430796,
        "lat": 43.61472713942907
      },
      "confidenceValue": 0.36879436163061363,
      "distanceFromRequest": 8.32,
      "polylineIndex": -1,
      "duration": 139,
      "length": 1324
    },
    {
      "inputOrder": 4,
      "used": true,
      "usedOrder": 4,
      "matchedCoordinateGps": {
        "lon": 7.07845,
        "lat": 43.61179
      },
      "confidenceValue": 0.1570877388041818,
      "distanceFromRequest": 10.8,
      "polylineIndex": -1,
      "duration": 178,
      "length": 1718
    },
    {
      "inputOrder": 5,
      "used": true,
      "usedOrder": 5,
      "matchedCoordinateGps": {
        "lon": 7.07866,
        "lat": 43.61185
      },
      "confidenceValue": 0.17740010014753527,
      "distanceFromRequest": 6.43,
      "polylineIndex": -1,
      "duration": 180,
      "length": 1737
    },
    {
      "inputOrder": 6,
      "used": true,
      "usedOrder": 6,
      "matchedCoordinateGps": {
        "lon": 7.079380021004235,
        "lat": 43.61285888564006
      },
      "confidenceValue": 0.21769057231240393,
      "distanceFromRequest": 9.2,
      "polylineIndex": -1,
      "duration": 198,
      "length": 1896
    },
    {
      "inputOrder": 7,
      "used": true,
      "usedOrder": 7,
      "matchedCoordinateGps": {
        "lon": 7.08118,
        "lat": 43.61169
      },
      "confidenceValue": 0.15771606787125328,
      "distanceFromRequest": 20.37,
      "polylineIndex": -1,
      "duration": 226,
      "length": 2090
    },
    {
      "inputOrder": 8,
      "used": true,
      "usedOrder": 8,
      "matchedCoordinateGps": {
        "lon": 7.08118,
        "lat": 43.61169
      },
      "confidenceValue": 0.15738207601732185,
      "distanceFromRequest": 6.54,
      "polylineIndex": -1,
      "duration": 226,
      "length": 2090
    },
    {
      "inputOrder": 9,
      "used": true,
      "usedOrder": 9,
      "matchedCoordinateGps": {
        "lon": 7.08118,
        "lat": 43.61169
      },
      "confidenceValue": 0.1758813458024068,
      "distanceFromRequest": 23.43,
      "polylineIndex": -1,
      "duration": 226,
      "length": 2090
    },
    {
      "inputOrder": 10,
      "used": true,
      "usedOrder": 10,
      "matchedCoordinateGps": {
        "lon": 7.081305634154667,
        "lat": 43.61164064372495
      },
      "confidenceValue": 0.1620184383434684,
      "distanceFromRequest": 32.85,
      "polylineIndex": -1,
      "duration": 230,
      "length": 2102
    },
    {
      "inputOrder": 11,
      "used": true,
      "usedOrder": 11,
      "matchedCoordinateGps": {
        "lon": 7.081772121283489,
        "lat": 43.61169746672947
      },
      "confidenceValue": 0.1875133785230111,
      "distanceFromRequest": 17.96,
      "polylineIndex": -1,
      "duration": 245,
      "length": 2151
    }
  ],
  "routingRoutes": [
    {
      "length": 2151,
      "duration": 245,
      "totalDuration": 245,
      "trafficDelay": 0,
      "departureTime": 1396241966,
      "arrivalTime": 1396242211,
      "averageSpeed": 31.606531,
      "maximumSpeed": 0,
      "startUTurnThreshold": 3000,
      "routingInstructions": [
        {
          "type": "ENTER_ROUNDABOUT",
          "geoElementType": "ROAD",
          "length": 387,
          "duration": 37,
          "fromName": "Route des Lucioles",
          "manoeuvre": "RIGHT",
          "coordinate": {
            "lon": 7.07047,
            "lat": 43.61731
          },
          "roundAboutExitNumber": 2,
          "toName": "Carrefour du Golf",
          "toOn": "Carrefour du Golf",
          "textDist": "At 387 meters"
        },
        {
          "type": "EXIT_ROUNDABOUT",
          "geoElementType": "ROUNDABOUT",
          "length": 49,
          "duration": 10,
          "fromName": "Carrefour du Golf",
          "manoeuvre": "RIGHT",
          "coordinate": {
            "lon": 7.07093,
            "lat": 43.61741
          },
          "roundAboutExitNumber": 2,
          "toName": "D504",
          "toOn": "Route des Colles",
          "toRn": "D504",
          "textDist": "At 49 meters",
          "text": "From Route des Lucioles at roundabout take 2nd exit on D504"
        },
        {
          "type": "ENTER_ROUNDABOUT",
          "geoElementType": "ROAD",
          "length": 224,
          "duration": 24,
          "fromName": "Route des Colles",
          "manoeuvre": "RIGHT",
          "coordinate": {
            "lon": 7.07357,
            "lat": 43.61703
          },
          "roundAboutExitNumber": 3,
          "toName": "Carrefour Saint-Philippe",
          "toOn": "Carrefour Saint-Philippe",
          "textDist": "At 224 meters"
        },
        {
          "type": "EXIT_ROUNDABOUT",
          "geoElementType": "ROUNDABOUT",
          "length": 104,
          "duration": 22,
          "fromName": "Carrefour Saint-Philippe",
          "manoeuvre": "RIGHT",
          "coordinate": {
            "lon": 7.07463,
            "lat": 43.61674
          },
          "roundAboutExitNumber": 3,
          "toName": "D504",
          "toOn": "Route des Colles",
          "toRn": "D504",
          "textDist": "At 104 meters",
          "text": "From Route des Colles at roundabout take 3rd exit on D504"
        },
        {
          "type": "ENTER_ROUNDABOUT",
          "geoElementType": "ROAD",
          "length": 513,
          "duration": 39,
          "fromName": "Route des Colles",
          "manoeuvre": "STRAIGHT",
          "coordinate": {
            "lon": 7.08045,
            "lat": 43.61509
          },
          "roundAboutExitNumber": 1,
          "toName": "Carrefour des Chappes",
          "toOn": "Carrefour des Chappes",
          "textDist": "At 513 meters"
        },
        {
          "type": "EXIT_ROUNDABOUT",
          "geoElementType": "ROUNDABOUT",
          "length": 8,
          "duration": 3,
          "fromName": "Carrefour des Chappes",
          "manoeuvre": "RIGHT",
          "coordinate": {
            "lon": 7.08053,
            "lat": 43.61505
          },
          "roundAboutExitNumber": 1,
          "toName": "D535",
          "toOn": "Route des Chappes",
          "toRn": "D535",
          "textDist": "At 8 meters",
          "text": "From Route des Colles at roundabout take 1st exit on D535"
        },
        {
          "type": "ENTER_ROUNDABOUT",
          "geoElementType": "ROAD",
          "length": 360,
          "duration": 29,
          "fromName": "Route des Chappes",
          "manoeuvre": "STRAIGHT",
          "coordinate": {
            "lon": 7.07845,
            "lat": 43.61221
          },
          "roundAboutExitNumber": 4,
          "textDist": "At 360 meters"
        },
        {
          "type": "EXIT_ROUNDABOUT",
          "geoElementType": "ROUNDABOUT",
          "length": 122,
          "duration": 21,
          "manoeuvre": "BEAR_RIGHT",
          "coordinate": {
            "lon": 7.07869,
            "lat": 43.61212
          },
          "roundAboutExitNumber": 4,
          "toName": "D535",
          "toOn": "Route des Chappes",
          "toRn": "D535",
          "textDist": "At 122 meters",
          "text": "From Route des Chappes at roundabout take 4th exit on D535"
        },
        {
          "type": "FOLLOW",
          "geoElementType": "ROAD",
          "length": 107,
          "duration": 9,
          "fromName": "Route des Chappes",
          "manoeuvre": "RIGHT",
          "coordinate": {
            "lon": 7.07921,
            "lat": 43.61298
          },
          "roundAboutExitNumber": 0,
          "toName": "Allée Charles-Victor Naudin",
          "toOn": "Allée Charles-Victor Naudin",
          "textDist": "At 107 meters",
          "text": "From Route des Chappes make a right turn on Allée Charles-Victor Naudin"
        },
        {
          "type": "FOLLOW",
          "geoElementType": "ROAD",
          "length": 246,
          "duration": 38,
          "fromName": "Allée Charles-Victor Naudin",
          "manoeuvre": "LEFT",
          "coordinate": {
            "lon": 7.08151,
            "lat": 43.61153
          },
          "roundAboutExitNumber": 0,
          "textDist": "At 246 meters",
          "text": "From Allée Charles-Victor Naudin make a left turn"
        },
        {
          "type": "STOP",
          "geoElementType": "ROAD",
          "length": 29,
          "duration": 12,
          "manoeuvre": "STRAIGHT",
          "coordinate": {
            "lon": 7.08177,
            "lat": 43.6117
          },
          "roundAboutExitNumber": 0,
          "textDist": "At 29 meters",
          "text": "Destination reached"
        }
      ],
      "boundingBox": {
        "minLon": 7.06602,
        "minLat": 43.61153,
        "maxLon": 7.081772121283489,
        "maxLat": 43.6175
      },
      "startStopInfo": {
        "start": {
          "lon": 7.06602,
          "lat": 43.61618
        },
        "stop": {
          "lon": 7.08177,
          "lat": 43.6117
        },
        "distanceFirstMatched": 0,
        "distanceLastMatched": 0.28,
        "interDests": null
      },
      "polyline": [
        {
          "lon": 7.06602,
          "lat": 43.61618
        },
        {
          "lon": 7.06627,
          "lat": 43.61621
        },
        {
          "lon": 7.06668,
          "lat": 43.6162
        },
        {
          "lon": 7.06701,
          "lat": 43.61621
        },
        {
          "lon": 7.06751,
          "lat": 43.61625
        }
      ]
    }
  ]
}
```
> ✅ Choose your `geoserver` wisely depending on regional coverage, regulatory preferences, or internal licensing.
---
<a name="traceroute_language_tutorial"></a>
## 🈯 language – Set Output Language for Route Instructions
✅ **Use Case**

You want the route instructions or summaries (like the route sheet) to be localized in a specific language, such as French, German, or Spanish.

💡 **What it Does**
The `language` parameter defines the **language used in the API response**, particularly in textual outputs such as route descriptions. It uses ISO 639-1 codes (two-letter).

Example values:

- `en` → English
- `fr` → French
- `de` → German
- `es` → Spanish

🔧 **How to Enable**
Add the language field to your request with the desired ISO code.
```
"language": "fr"
```
📦 **Example**
```
{
  "routingVehicleProfile": {
    "transportMode": "CAR"
  },
  "language": "fr",
  "options": ["ROUTESHEET", "POLYLINE"],
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
                "time" : 1396242190000,
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
    ]
}
```
**Response (truncated)**
```
{
  "usedDestinations": [
    {
      "inputOrder": 0,
      "used": true,
      "usedOrder": 0,
      "matchedCoordinateGps": {
        "lon": 7.06602,
        "lat": 43.61618
      },
      "confidenceValue": 0.08574764015778809,
      "distanceFromRequest": 20.1,
      "polylineIndex": -1,
      "duration": -1,
      "length": -1
    },
    {
      "inputOrder": 1,
      "used": true,
      "usedOrder": 1,
      "matchedCoordinateGps": {
        "lon": 7.066400317430266,
        "lat": 43.61620682152609
      },
      "confidenceValue": 0.10601713385854422,
      "distanceFromRequest": 0.76,
      "polylineIndex": -1,
      "duration": 4,
      "length": 31
    },
    {
      "inputOrder": 2,
      "used": true,
      "usedOrder": 2,
      "matchedCoordinateGps": {
        "lon": 7.078630465561669,
        "lat": 43.61534202308657
      },
      "confidenceValue": 0.51092712176195,
      "distanceFromRequest": 5.28,
      "polylineIndex": -1,
      "duration": 118,
      "length": 1128
    },
    {
      "inputOrder": 3,
      "used": true,
      "usedOrder": 3,
      "matchedCoordinateGps": {
        "lon": 7.08040384430796,
        "lat": 43.61472713942907
      },
      "confidenceValue": 0.36879436163061363,
      "distanceFromRequest": 8.32,
      "polylineIndex": -1,
      "duration": 139,
      "length": 1324
    },
    {
      "inputOrder": 4,
      "used": true,
      "usedOrder": 4,
      "matchedCoordinateGps": {
        "lon": 7.07845,
        "lat": 43.61179
      },
      "confidenceValue": 0.1570877388041818,
      "distanceFromRequest": 10.8,
      "polylineIndex": -1,
      "duration": 178,
      "length": 1718
    },
    {
      "inputOrder": 5,
      "used": true,
      "usedOrder": 5,
      "matchedCoordinateGps": {
        "lon": 7.07866,
        "lat": 43.61185
      },
      "confidenceValue": 0.17740010014753527,
      "distanceFromRequest": 6.43,
      "polylineIndex": -1,
      "duration": 180,
      "length": 1737
    },
    {
      "inputOrder": 6,
      "used": true,
      "usedOrder": 6,
      "matchedCoordinateGps": {
        "lon": 7.079380021004235,
        "lat": 43.61285888564006
      },
      "confidenceValue": 0.21769057231240393,
      "distanceFromRequest": 9.2,
      "polylineIndex": -1,
      "duration": 198,
      "length": 1896
    },
    {
      "inputOrder": 7,
      "used": true,
      "usedOrder": 7,
      "matchedCoordinateGps": {
        "lon": 7.08118,
        "lat": 43.61169
      },
      "confidenceValue": 0.15771606787125328,
      "distanceFromRequest": 20.37,
      "polylineIndex": -1,
      "duration": 226,
      "length": 2090
    },
    {
      "inputOrder": 8,
      "used": true,
      "usedOrder": 8,
      "matchedCoordinateGps": {
        "lon": 7.08118,
        "lat": 43.61169
      },
      "confidenceValue": 0.15738207601732185,
      "distanceFromRequest": 6.54,
      "polylineIndex": -1,
      "duration": 226,
      "length": 2090
    },
    {
      "inputOrder": 9,
      "used": true,
      "usedOrder": 9,
      "matchedCoordinateGps": {
        "lon": 7.08118,
        "lat": 43.61169
      },
      "confidenceValue": 0.1758813458024068,
      "distanceFromRequest": 23.43,
      "polylineIndex": -1,
      "duration": 226,
      "length": 2090
    },
    {
      "inputOrder": 10,
      "used": true,
      "usedOrder": 10,
      "matchedCoordinateGps": {
        "lon": 7.081305634154667,
        "lat": 43.61164064372495
      },
      "confidenceValue": 0.1620184383434684,
      "distanceFromRequest": 32.85,
      "polylineIndex": -1,
      "duration": 230,
      "length": 2102
    },
    {
      "inputOrder": 11,
      "used": true,
      "usedOrder": 11,
      "matchedCoordinateGps": {
        "lon": 7.081772121283489,
        "lat": 43.61169746672947
      },
      "confidenceValue": 0.1875133785230111,
      "distanceFromRequest": 17.96,
      "polylineIndex": -1,
      "duration": 245,
      "length": 2151
    }
  ],
  "routingRoutes": [
    {
      "length": 2151,
      "duration": 245,
      "totalDuration": 245,
      "trafficDelay": 0,
      "departureTime": 1396241966,
      "arrivalTime": 1396242211,
      "averageSpeed": 31.606531,
      "maximumSpeed": 0,
      "startUTurnThreshold": 3000,
      "routingInstructions": [
        {
          "type": "ENTER_ROUNDABOUT",
          "geoElementType": "ROAD",
          "length": 387,
          "duration": 37,
          "fromName": "Route des Lucioles",
          "manoeuvre": "RIGHT",
          "coordinate": {
            "lon": 7.07047,
            "lat": 43.61731
          },
          "roundAboutExitNumber": 2,
          "toName": "Carrefour du Golf",
          "toOn": "Carrefour du Golf",
          "textDist": "À 387 mètres"
        },
        {
          "type": "EXIT_ROUNDABOUT",
          "geoElementType": "ROUNDABOUT",
          "length": 49,
          "duration": 10,
          "fromName": "Carrefour du Golf",
          "manoeuvre": "RIGHT",
          "coordinate": {
            "lon": 7.07093,
            "lat": 43.61741
          },
          "roundAboutExitNumber": 2,
          "toName": "D504",
          "toOn": "Route des Colles",
          "toRn": "D504",
          "textDist": "À 49 mètres",
          "text": "Depuis Route des Lucioles au rond point prendre la 2e sortie en direction de D504"
        },
        {
          "type": "ENTER_ROUNDABOUT",
          "geoElementType": "ROAD",
          "length": 224,
          "duration": 24,
          "fromName": "Route des Colles",
          "manoeuvre": "RIGHT",
          "coordinate": {
            "lon": 7.07357,
            "lat": 43.61703
          },
          "roundAboutExitNumber": 3,
          "toName": "Carrefour Saint-Philippe",
          "toOn": "Carrefour Saint-Philippe",
          "textDist": "À 224 mètres"
        },
        {
          "type": "EXIT_ROUNDABOUT",
          "geoElementType": "ROUNDABOUT",
          "length": 104,
          "duration": 22,
          "fromName": "Carrefour Saint-Philippe",
          "manoeuvre": "RIGHT",
          "coordinate": {
            "lon": 7.07463,
            "lat": 43.61674
          },
          "roundAboutExitNumber": 3,
          "toName": "D504",
          "toOn": "Route des Colles",
          "toRn": "D504",
          "textDist": "À 104 mètres",
          "text": "Depuis Route des Colles au rond point prendre la 3e sortie en direction de D504"
        },
        {
          "type": "ENTER_ROUNDABOUT",
          "geoElementType": "ROAD",
          "length": 513,
          "duration": 39,
          "fromName": "Route des Colles",
          "manoeuvre": "STRAIGHT",
          "coordinate": {
            "lon": 7.08045,
            "lat": 43.61509
          },
          "roundAboutExitNumber": 1,
          "toName": "Carrefour des Chappes",
          "toOn": "Carrefour des Chappes",
          "textDist": "À 513 mètres"
        },
        {
          "type": "EXIT_ROUNDABOUT",
          "geoElementType": "ROUNDABOUT",
          "length": 8,
          "duration": 3,
          "fromName": "Carrefour des Chappes",
          "manoeuvre": "RIGHT",
          "coordinate": {
            "lon": 7.08053,
            "lat": 43.61505
          },
          "roundAboutExitNumber": 1,
          "toName": "D535",
          "toOn": "Route des Chappes",
          "toRn": "D535",
          "textDist": "À 8 mètres",
          "text": "Depuis Route des Colles au rond point prendre la 1er sortie en direction de D535"
        },
        {
          "type": "ENTER_ROUNDABOUT",
          "geoElementType": "ROAD",
          "length": 360,
          "duration": 29,
          "fromName": "Route des Chappes",
          "manoeuvre": "STRAIGHT",
          "coordinate": {
            "lon": 7.07845,
            "lat": 43.61221
          },
          "roundAboutExitNumber": 4,
          "textDist": "À 360 mètres"
        },
        {
          "type": "EXIT_ROUNDABOUT",
          "geoElementType": "ROUNDABOUT",
          "length": 122,
          "duration": 21,
          "manoeuvre": "BEAR_RIGHT",
          "coordinate": {
            "lon": 7.07869,
            "lat": 43.61212
          },
          "roundAboutExitNumber": 4,
          "toName": "D535",
          "toOn": "Route des Chappes",
          "toRn": "D535",
          "textDist": "À 122 mètres",
          "text": "Depuis Route des Chappes au rond point prendre la 4e sortie en direction de D535"
        },
        {
          "type": "FOLLOW",
          "geoElementType": "ROAD",
          "length": 107,
          "duration": 9,
          "fromName": "Route des Chappes",
          "manoeuvre": "RIGHT",
          "coordinate": {
            "lon": 7.07921,
            "lat": 43.61298
          },
          "roundAboutExitNumber": 0,
          "toName": "Allée Charles-Victor Naudin",
          "toOn": "Allée Charles-Victor Naudin",
          "textDist": "À 107 mètres",
          "text": "Depuis Route des Chappes tourner à droite sur Allée Charles-Victor Naudin"
        },
        {
          "type": "FOLLOW",
          "geoElementType": "ROAD",
          "length": 246,
          "duration": 38,
          "fromName": "Allée Charles-Victor Naudin",
          "manoeuvre": "LEFT",
          "coordinate": {
            "lon": 7.08151,
            "lat": 43.61153
          },
          "roundAboutExitNumber": 0,
          "textDist": "À 246 mètres",
          "text": "Depuis Allée Charles-Victor Naudin tourner à gauche"
        },
        {
          "type": "STOP",
          "geoElementType": "ROAD",
          "length": 29,
          "duration": 12,
          "manoeuvre": "STRAIGHT",
          "coordinate": {
            "lon": 7.08177,
            "lat": 43.6117
          },
          "roundAboutExitNumber": 0,
          "textDist": "À 29 mètres",
          "text": "Destination atteinte"
        }
      ],
      "boundingBox": {
        "minLon": 7.06602,
        "minLat": 43.61153,
        "maxLon": 7.081772121283489,
        "maxLat": 43.6175
      },
      "startStopInfo": {
        "start": {
          "lon": 7.06602,
          "lat": 43.61618
        },
        "stop": {
          "lon": 7.08177,
          "lat": 43.6117
        },
        "distanceFirstMatched": 0,
        "distanceLastMatched": 0.28,
        "interDests": null
      },
      "polyline": [
        {
          "lon": 7.06602,
          "lat": 43.61618
        },
        {
          "lon": 7.06627,
          "lat": 43.61621
        },
        {
          "lon": 7.06668,
          "lat": 43.6162
        },
        {
          "lon": 7.06701,
          "lat": 43.61621
        },
        {
          "lon": 7.06751,
          "lat": 43.61625
        }
      ]
    }
  ]
}
```
> ✅ Useful for applications targeting international users, multilingual UIs, or localized route guidance.

---

_BeNomad MCP: a corrected copy of BeMap's page, served until BeMap publishes the correction (BEMAP-1938)._
