<a name="traceroute_parameters_tutorial"></a>
# 📘 TraceRoute Parameters – Detailed Usage Guide
This document provides an in-depth explanation of all the available parameters in the TraceRoute API request. Each field is described with its purpose, usage guidance, and real-world JSON examples. Whether you're building a vehicle tracking application, analyzing driving behavior, or computing travel times, this guide will help you understand how to use each parameter correctly and effectively.

We recommend reading each section individually to understand how it affects route matching and ETA estimation.

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
      "width": 40,
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
    ]
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
        "lon": 7.065868896076493,
        "lat": 43.616005
      },
      "confidenceValue": 0.9892469222386688,
      "distanceFromRequest": 10.58,
      "polylineIndex": -1,
      "duration": -1,
      "length": -1
    },
    {
      "inputOrder": 1,
      "used": true,
      "usedOrder": 1,
      "matchedCoordinateGps": {
        "lon": 7.066398283397998,
        "lat": 43.616205
      },
      "confidenceValue": 0.3377806566738217,
      "distanceFromRequest": 0.56,
      "polylineIndex": -1,
      "duration": 6,
      "length": 56
    },
    {
      "inputOrder": 2,
      "used": true,
      "usedOrder": 2,
      "matchedCoordinateGps": {
        "lon": 7.078630440418273,
        "lat": 43.61534125
      },
      "confidenceValue": 1,
      "distanceFromRequest": 5.21,
      "polylineIndex": -1,
      "duration": 96,
      "length": 1156
    },
    {
      "inputOrder": 3,
      "used": true,
      "usedOrder": 3,
      "matchedCoordinateGps": {
        "lon": 7.080403748959592,
        "lat": 43.6147275
      },
      "confidenceValue": 0.9910778137778522,
      "distanceFromRequest": 8.34,
      "polylineIndex": -1,
      "duration": 111,
      "length": 1352
    },
    {
      "inputOrder": 4,
      "used": true,
      "usedOrder": 4,
      "matchedCoordinateGps": {
        "lon": 7.07845,
        "lat": 43.61179
      },
      "confidenceValue": 0.17461304514376935,
      "distanceFromRequest": 10.8,
      "polylineIndex": -1,
      "duration": 138,
      "length": 1748
    },
    {
      "inputOrder": 5,
      "used": true,
      "usedOrder": 5,
      "matchedCoordinateGps": {
        "lon": 7.07866,
        "lat": 43.61185
      },
      "confidenceValue": 0.8311396809663245,
      "distanceFromRequest": 6.43,
      "polylineIndex": -1,
      "duration": 141,
      "length": 1766
    },
    {
      "inputOrder": 6,
      "used": true,
      "usedOrder": 6,
      "matchedCoordinateGps": {
        "lon": 7.07938069386973,
        "lat": 43.61286125
      },
      "confidenceValue": 1,
      "distanceFromRequest": 9.42,
      "polylineIndex": -1,
      "duration": 162,
      "length": 1926
    },
    {
      "inputOrder": 7,
      "used": true,
      "usedOrder": 7,
      "matchedCoordinateGps": {
        "lon": 7.08118,
        "lat": 43.61169
      },
      "confidenceValue": 0.6537464392808423,
      "distanceFromRequest": 20.37,
      "polylineIndex": -1,
      "duration": 206,
      "length": 2122
    },
    {
      "inputOrder": 8,
      "used": true,
      "usedOrder": 8,
      "matchedCoordinateGps": {
        "lon": 7.08118,
        "lat": 43.61169
      },
      "confidenceValue": 0.19594762970404958,
      "distanceFromRequest": 6.54,
      "polylineIndex": -1,
      "duration": -1,
      "length": -1
    },
    {
      "inputOrder": 9,
      "used": true,
      "usedOrder": 9,
      "matchedCoordinateGps": {
        "lon": 7.0812,
        "lat": 43.6119
      },
      "confidenceValue": 1,
      "distanceFromRequest": 0,
      "polylineIndex": -1,
      "duration": -1,
      "length": -1
    },
    {
      "inputOrder": 10,
      "used": true,
      "usedOrder": 10,
      "matchedCoordinateGps": {
        "lon": 7.081468042538314,
        "lat": 43.61183298936542
      },
      "confidenceValue": 1,
      "distanceFromRequest": 7.89,
      "polylineIndex": -1,
      "duration": -1,
      "length": -1
    },
    {
      "inputOrder": 11,
      "used": true,
      "usedOrder": 11,
      "matchedCoordinateGps": {
        "lon": 7.0816,
        "lat": 43.6118
      },
      "confidenceValue": 1,
      "distanceFromRequest": 0,
      "polylineIndex": -1,
      "duration": 216,
      "length": 2180
    }
  ],
  "routingRoutes": [
    {
      "length": 2180,
      "duration": 216,
      "trafficDelay": 0,
      "averageSpeed": 36.333332,
      "maximumSpeed": 0,
      "startUTurnThreshold": 3000,
      "routingInstructions": [
        {
          "type": "ENTER_ROUNDABOUT",
          "geoElementType": "ROAD",
          "length": 10,
          "duration": 0,
          "fromName": "Rue Fernand Léger",
          "manoeuvre": "RIGHT",
          "coordinate": {
            "lon": 7.06588,
            "lat": 43.6161
          },
          "roundAboutExitNumber": 1,
          "textDist": "At 10 meters"
        },
        {
          "type": "EXIT_ROUNDABOUT",
          "geoElementType": "ROUNDABOUT",
          "length": 16,
          "duration": 4,
          "manoeuvre": "RIGHT",
          "coordinate": {
            "lon": 7.06602,
            "lat": 43.61618
          },
          "roundAboutExitNumber": 1,
          "toName": "D504",
          "toOn": "Route des Lucioles",
          "toRn": "D504",
          "textDist": "At 16 meters",
          "text": "From Rue Fernand Léger at roundabout take 1st exit on D504"
        },
        {
          "type": "ENTER_ROUNDABOUT",
          "geoElementType": "ROAD",
          "length": 388,
          "duration": 27,
          "fromName": "Route des Lucioles",
          "manoeuvre": "RIGHT",
          "coordinate": {
            "lon": 7.07047,
            "lat": 43.61731
          },
          "roundAboutExitNumber": 2,
          "toName": "Carrefour du Golf",
          "toOn": "Carrefour du Golf",
          "textDist": "At 388 meters"
        },
        {
          "type": "EXIT_ROUNDABOUT",
          "geoElementType": "ROUNDABOUT",
          "length": 50,
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
          "textDist": "At 50 meters",
          "text": "From Route des Lucioles at roundabout take 2nd exit on D504"
        },
        {
          "type": "ENTER_ROUNDABOUT",
          "geoElementType": "ROAD",
          "length": 226,
          "duration": 16,
          "fromName": "Route des Colles",
          "manoeuvre": "RIGHT",
          "coordinate": {
            "lon": 7.07357,
            "lat": 43.61703
          },
          "roundAboutExitNumber": 3,
          "toName": "Carrefour Saint-Philippe",
          "toOn": "Carrefour Saint-Philippe",
          "textDist": "At 226 meters"
        },
        {
          "type": "EXIT_ROUNDABOUT",
          "geoElementType": "ROUNDABOUT",
          "length": 104,
          "duration": 21,
          "fromName": "Carrefour Saint-Philippe",
          "manoeuvre": "SLIGHT_RIGHT",
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
          "length": 514,
          "duration": 29,
          "fromName": "Route des Colles",
          "manoeuvre": "STRAIGHT",
          "coordinate": {
            "lon": 7.08045,
            "lat": 43.61509
          },
          "roundAboutExitNumber": 1,
          "toName": "Carrefour des Chappes",
          "toOn": "Carrefour des Chappes",
          "textDist": "At 514 meters"
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
          "length": 358,
          "duration": 20,
          "fromName": "Route des Chappes",
          "manoeuvre": "STRAIGHT",
          "coordinate": {
            "lon": 7.07845,
            "lat": 43.61221
          },
          "roundAboutExitNumber": 4,
          "textDist": "At 358 meters"
        },
        {
          "type": "EXIT_ROUNDABOUT",
          "geoElementType": "ROUNDABOUT",
          "length": 124,
          "duration": 19,
          "manoeuvre": "BEAR_RIGHT",
          "coordinate": {
            "lon": 7.07869,
            "lat": 43.61212
          },
          "roundAboutExitNumber": 4,
          "toName": "D535",
          "toOn": "Route des Chappes",
          "toRn": "D535",
          "textDist": "At 124 meters",
          "text": "From Route des Chappes at roundabout take 4th exit on D535"
        },
        {
          "type": "FOLLOW",
          "geoElementType": "ROAD",
          "length": 108,
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
          "textDist": "At 108 meters",
          "text": "From Route des Chappes make a right turn on Allée Charles-Victor Naudin"
        },
        {
          "type": "FOLLOW",
          "geoElementType": "ROAD",
          "length": 216,
          "duration": 47,
          "fromName": "Allée Charles-Victor Naudin",
          "manoeuvre": "SHARP_LEFT",
          "coordinate": {
            "lon": 7.08118,
            "lat": 43.61169
          },
          "roundAboutExitNumber": 0,
          "textDist": "At 216 meters",
          "text": "From Allée Charles-Victor Naudin make a sharp left turn"
        },
        {
          "type": "STOP",
          "length": 58,
          "duration": 10,
          "manoeuvre": "STRAIGHT",
          "coordinate": {
            "lon": 7.0816,
            "lat": 43.6118
          },
          "roundAboutExitNumber": 0,
          "textDist": "At 58 meters",
          "text": "Destination reached"
        }
      ],
      "boundingBox": {
        "minLon": 7.065868896076493,
        "minLat": 43.61169,
        "maxLon": 7.0816,
        "maxLat": 43.6175
      },
      "startStopInfo": {
        "start": {
          "lon": 7.06587,
          "lat": 43.61601
        },
        "stop": {
          "lon": 7.08118,
          "lat": 43.61169
        },
        "distanceFirstMatched": 0.56,
        "distanceLastMatched": 36,
        "interDests": null
      },
      "polyline": [
        {
          "lon": 7.065868896076493,
          "lat": 43.616005
        },
        {
          "lon": 7.06588,
          "lat": 43.6161
        },
```
> ⏱️ Note: ETA values in the response will reflect actual travel time between GPS points, rather than being estimated from speed limits or routing heuristics.
---
<a name="traceroute_corridorRadius_tutorial"></a>
## 🛣️ corridorRadius – Define a Route Corridor Radius
✅ **Use Case**

You want to create a buffer zone around the route to allow small deviations from the expected path. This is particularly useful when matching noisy GPS traces or evaluating if the vehicle remained within a defined route corridor.

💡 **What it Does**

When `corridorRadius` is set (in meters), the API creates a virtual corridor of width 2 × `corridorRadius` around the computed route. During analysis, this allows matching coordinates even if they slightly diverge from the ideal path, accounting for GPS drift or minor detours.

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
      "width": 40,
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
    ]
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
        "lon": 7.065868896076493,
        "lat": 43.616005
      },
      "confidenceValue": 0.9892469222386688,
      "distanceFromRequest": 10.58,
      "polylineIndex": -1,
      "duration": -1,
      "length": -1
    },
    {
      "inputOrder": 1,
      "used": true,
      "usedOrder": 1,
      "matchedCoordinateGps": {
        "lon": 7.066398283397998,
        "lat": 43.616205
      },
      "confidenceValue": 0.3377806566738217,
      "distanceFromRequest": 0.56,
      "polylineIndex": -1,
      "duration": 19,
      "length": 56
    },
    {
      "inputOrder": 2,
      "used": true,
      "usedOrder": 2,
      "matchedCoordinateGps": {
        "lon": 7.078630440418273,
        "lat": 43.61534125
      },
      "confidenceValue": 1,
      "distanceFromRequest": 5.21,
      "polylineIndex": -1,
      "duration": 134,
      "length": 1156
    },
    {
      "inputOrder": 3,
      "used": true,
      "usedOrder": 3,
      "matchedCoordinateGps": {
        "lon": 7.080403748959592,
        "lat": 43.6147275
      },
      "confidenceValue": 0.9910778137778522,
      "distanceFromRequest": 8.34,
      "polylineIndex": -1,
      "duration": 156,
      "length": 1352
    },
    {
      "inputOrder": 4,
      "used": true,
      "usedOrder": 4,
      "matchedCoordinateGps": {
        "lon": 7.07845,
        "lat": 43.61179
      },
      "confidenceValue": 0.17461304514376935,
      "distanceFromRequest": 10.8,
      "polylineIndex": -1,
      "duration": 192,
      "length": 1748
    },
    {
      "inputOrder": 5,
      "used": true,
      "usedOrder": 5,
      "matchedCoordinateGps": {
        "lon": 7.07866,
        "lat": 43.61185
      },
      "confidenceValue": 0.8311396809663245,
      "distanceFromRequest": 6.43,
      "polylineIndex": -1,
      "duration": 194,
      "length": 1766
    },
    {
      "inputOrder": 6,
      "used": true,
      "usedOrder": 6,
      "matchedCoordinateGps": {
        "lon": 7.07938069386973,
        "lat": 43.61286125
      },
      "confidenceValue": 1,
      "distanceFromRequest": 9.42,
      "polylineIndex": -1,
      "duration": 212,
      "length": 1926
    },
    {
      "inputOrder": 7,
      "used": true,
      "usedOrder": 7,
      "matchedCoordinateGps": {
        "lon": 7.08118,
        "lat": 43.61169
      },
      "confidenceValue": 0.6537464392808423,
      "distanceFromRequest": 20.37,
      "polylineIndex": -1,
      "duration": 239,
      "length": 2122
    },
    {
      "inputOrder": 8,
      "used": true,
      "usedOrder": 8,
      "matchedCoordinateGps": {
        "lon": 7.08118,
        "lat": 43.61169
      },
      "confidenceValue": 0.19594762970404958,
      "distanceFromRequest": 6.54,
      "polylineIndex": -1,
      "duration": -1,
      "length": -1
    },
    {
      "inputOrder": 9,
      "used": true,
      "usedOrder": 9,
      "matchedCoordinateGps": {
        "lon": 7.0812,
        "lat": 43.6119
      },
      "confidenceValue": 1,
      "distanceFromRequest": 0,
      "polylineIndex": -1,
      "duration": -1,
      "length": -1
    },
    {
      "inputOrder": 10,
      "used": true,
      "usedOrder": 10,
      "matchedCoordinateGps": {
        "lon": 7.081468042538314,
        "lat": 43.61183298936542
      },
      "confidenceValue": 1,
      "distanceFromRequest": 7.89,
      "polylineIndex": -1,
      "duration": -1,
      "length": -1
    },
    {
      "inputOrder": 11,
      "used": true,
      "usedOrder": 11,
      "matchedCoordinateGps": {
        "lon": 7.0816,
        "lat": 43.6118
      },
      "confidenceValue": 1,
      "distanceFromRequest": 0,
      "polylineIndex": -1,
      "duration": 251,
      "length": 2180
    }
  ],
  "routingRoutes": [
    {
      "length": 2180,
      "duration": 251,
      "trafficDelay": 0,
      "averageSpeed": 31.266932,
      "maximumSpeed": 0,
      "startUTurnThreshold": 3000,
      "routingInstructions": [
        {
          "type": "ENTER_ROUNDABOUT",
          "geoElementType": "ROAD",
          "length": 10,
          "duration": 1,
          "fromName": "Rue Fernand Léger",
          "manoeuvre": "RIGHT",
          "coordinate": {
            "lon": 7.06588,
            "lat": 43.6161
          },
          "roundAboutExitNumber": 1,
          "textDist": "At 10 meters"
        },
        {
          "type": "EXIT_ROUNDABOUT",
          "geoElementType": "ROUNDABOUT",
          "length": 16,
          "duration": 12,
          "manoeuvre": "RIGHT",
          "coordinate": {
            "lon": 7.06602,
            "lat": 43.61618
          },
          "roundAboutExitNumber": 1,
          "toName": "D504",
          "toOn": "Route des Lucioles",
          "toRn": "D504",
          "textDist": "At 16 meters",
          "text": "From Rue Fernand Léger at roundabout take 1st exit on D504"
        },
        {
          "type": "ENTER_ROUNDABOUT",
          "geoElementType": "ROAD",
          "length": 388,
          "duration": 39,
          "fromName": "Route des Lucioles",
          "manoeuvre": "RIGHT",
          "coordinate": {
            "lon": 7.07047,
            "lat": 43.61731
          },
          "roundAboutExitNumber": 2,
          "toName": "Carrefour du Golf",
          "toOn": "Carrefour du Golf",
          "textDist": "At 388 meters"
        },
        {
          "type": "EXIT_ROUNDABOUT",
          "geoElementType": "ROUNDABOUT",
          "length": 50,
          "duration": 11,
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
          "textDist": "At 50 meters",
          "text": "From Route des Lucioles at roundabout take 2nd exit on D504"
        },
        {
          "type": "ENTER_ROUNDABOUT",
          "geoElementType": "ROAD",
          "length": 226,
          "duration": 20,
          "fromName": "Route des Colles",
          "manoeuvre": "RIGHT",
          "coordinate": {
            "lon": 7.07357,
            "lat": 43.61703
          },
          "roundAboutExitNumber": 3,
          "toName": "Carrefour Saint-Philippe",
          "toOn": "Carrefour Saint-Philippe",
          "textDist": "At 226 meters"
        },
        {
          "type": "EXIT_ROUNDABOUT",
          "geoElementType": "ROUNDABOUT",
          "length": 104,
          "duration": 27,
          "fromName": "Carrefour Saint-Philippe",
          "manoeuvre": "SLIGHT_RIGHT",
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
          "length": 514,
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
          "textDist": "At 514 meters"
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
          "length": 358,
          "duration": 26,
          "fromName": "Route des Chappes",
          "manoeuvre": "STRAIGHT",
          "coordinate": {
            "lon": 7.07845,
            "lat": 43.61221
          },
          "roundAboutExitNumber": 4,
          "textDist": "At 358 meters"
        },
        {
          "type": "EXIT_ROUNDABOUT",
          "geoElementType": "ROUNDABOUT",
          "length": 124,
          "duration": 20,
          "manoeuvre": "BEAR_RIGHT",
          "coordinate": {
            "lon": 7.07869,
            "lat": 43.61212
          },
          "roundAboutExitNumber": 4,
          "toName": "D535",
          "toOn": "Route des Chappes",
          "toRn": "D535",
          "textDist": "At 124 meters",
          "text": "From Route des Chappes at roundabout take 4th exit on D535"
        },
        {
          "type": "FOLLOW",
          "geoElementType": "ROAD",
          "length": 108,
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
          "textDist": "At 108 meters",
          "text": "From Route des Chappes make a right turn on Allée Charles-Victor Naudin"
        },
        {
          "type": "FOLLOW",
          "geoElementType": "ROAD",
          "length": 216,
          "duration": 31,
          "fromName": "Allée Charles-Victor Naudin",
          "manoeuvre": "SHARP_LEFT",
          "coordinate": {
            "lon": 7.08118,
            "lat": 43.61169
          },
          "roundAboutExitNumber": 0,
          "textDist": "At 216 meters",
          "text": "From Allée Charles-Victor Naudin make a sharp left turn"
        },
        {
          "type": "STOP",
          "length": 58,
          "duration": 12,
          "manoeuvre": "STRAIGHT",
          "coordinate": {
            "lon": 7.0816,
            "lat": 43.6118
          },
          "roundAboutExitNumber": 0,
          "textDist": "At 58 meters",
          "text": "Destination reached"
        }
      ],
      "boundingBox": {
        "minLon": 7.065868896076493,
        "minLat": 43.61169,
        "maxLon": 7.0816,
        "maxLat": 43.6175
      },
      "corridor": [
        {
          "coordinates": [
            {
              "lon": 7.07768,
              "lat": 43.61622
            },
            {
              "lon": 7.07834,
              "lat": 43.61586
            },
```
> 📏 A wider corridor improves robustness against GPS noise, but may also reduce precision in route adherence analysis.
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
      "width": 40,
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
        "lon": 7.06587,
        "lat": 43.61599
      },
      "confidenceValue": 0.145070985788001,
      "distanceFromRequest": 10.54,
      "polylineIndex": -1,
      "duration": -1,
      "length": -1,
      "customData": [
        {
          "key": "event",
          "value": "2"
        },
        {
          "key": "sensor",
          "value": "1"
        }
      ]
    },
    {
      "inputOrder": 1,
      "used": true,
      "usedOrder": 1,
      "matchedCoordinateGps": {
        "lon": 7.066398283397998,
        "lat": 43.616205
      },
      "confidenceValue": 0.14543739172562306,
      "distanceFromRequest": 0.56,
      "polylineIndex": -1,
      "duration": 21,
      "length": 58,
      "customData": [
        {
          "key": "event",
          "value": "1"
        },
        {
          "key": "sensor",
          "value": "2"
        }
      ]
    }
  ],
  "routingRoutes": [
    {
      "length": 58,
      "duration": 21,
      "trafficDelay": 0,
      "averageSpeed": 9.942857,
      "maximumSpeed": 0,
      "startUTurnThreshold": 3000,
      "routingInstructions": [
        {
          "type": "ENTER_ROUNDABOUT",
          "geoElementType": "ROAD",
          "length": 12,
          "duration": 1,
          "fromName": "Rue Fernand Léger",
          "manoeuvre": "RIGHT",
          "coordinate": {
            "lon": 7.06588,
            "lat": 43.6161
          },
          "roundAboutExitNumber": 1,
          "textDist": "At 12 meters"
        },
        {
          "type": "EXIT_ROUNDABOUT",
          "geoElementType": "ROUNDABOUT",
          "length": 16,
          "duration": 12,
          "manoeuvre": "RIGHT",
          "coordinate": {
            "lon": 7.06602,
            "lat": 43.61618
          },
          "roundAboutExitNumber": 1,
          "toName": "D504",
          "toOn": "Route des Lucioles",
          "toRn": "D504",
          "textDist": "At 16 meters",
          "text": "From Rue Fernand Léger at roundabout take 1st exit on D504"
        },
        {
          "type": "STOP",
          "geoElementType": "ROAD",
          "length": 30,
          "duration": 7,
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
          "lon": 7.06587,
          "lat": 43.61599
        },
        "stop": {
          "lon": 7.0664,
          "lat": 43.61621
        },
        "distanceFirstMatched": 0,
        "distanceLastMatched": 0.56,
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
The `departureTime` defines the starting time of the route. It can be used to:

Adjust time-dependent calculations (e.g., traffic models, toll conditions, time-restricted roads).

Make the ETA of each step relative to a real-world clock.

Sync results with external planning systems.

It accepts two formats:

ISO 8601 with time zone, e.g., `2025-07-09T10:00:00+02:00[Europe/Paris]`

Epoch time in milliseconds (UTC), e.g., `1720512000000`

🔧 **How to Enable**
Add the `departureTime` field at the root of your request object.
**Example with ISO format**
```
"departureTime": "2025-07-09T10:00:00+02:00[Europe/Paris]"
```
**Example with Epoch format**
```
"departureTime": 1720512000000
```
📦 **Example**
```
{
  "routingVehicleProfile": {
    "transportMode": "CAR",
    "routingVehicleFeature": {
      "height": 380,
      "width": 40,
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
    ]
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
        "lon": 7.065868896076493,
        "lat": 43.616005
      },
      "confidenceValue": 0.9892469222386688,
      "distanceFromRequest": 10.58,
      "polylineIndex": -1,
      "duration": -1,
      "length": -1
    },
    {
      "inputOrder": 1,
      "used": true,
      "usedOrder": 1,
      "matchedCoordinateGps": {
        "lon": 7.066398283397998,
        "lat": 43.616205
      },
      "confidenceValue": 0.3377806566738217,
      "distanceFromRequest": 0.56,
      "polylineIndex": -1,
      "duration": 19,
      "length": 56
    },
    {
      "inputOrder": 2,
      "used": true,
      "usedOrder": 2,
      "matchedCoordinateGps": {
        "lon": 7.078630440418273,
        "lat": 43.61534125
      },
      "confidenceValue": 1,
      "distanceFromRequest": 5.21,
      "polylineIndex": -1,
      "duration": 134,
      "length": 1156
    },
    {
      "inputOrder": 3,
      "used": true,
      "usedOrder": 3,
      "matchedCoordinateGps": {
        "lon": 7.080403748959592,
        "lat": 43.6147275
      },
      "confidenceValue": 0.9910778137778522,
      "distanceFromRequest": 8.34,
      "polylineIndex": -1,
      "duration": 156,
      "length": 1352
    },
    {
      "inputOrder": 4,
      "used": true,
      "usedOrder": 4,
      "matchedCoordinateGps": {
        "lon": 7.07845,
        "lat": 43.61179
      },
      "confidenceValue": 0.17461304514376935,
      "distanceFromRequest": 10.8,
      "polylineIndex": -1,
      "duration": 192,
      "length": 1748
    },
    {
      "inputOrder": 5,
      "used": true,
      "usedOrder": 5,
      "matchedCoordinateGps": {
        "lon": 7.07866,
        "lat": 43.61185
      },
      "confidenceValue": 0.8311396809663245,
      "distanceFromRequest": 6.43,
      "polylineIndex": -1,
      "duration": 194,
      "length": 1766
    },
    {
      "inputOrder": 6,
      "used": true,
      "usedOrder": 6,
      "matchedCoordinateGps": {
        "lon": 7.07938069386973,
        "lat": 43.61286125
      },
      "confidenceValue": 1,
      "distanceFromRequest": 9.42,
      "polylineIndex": -1,
      "duration": 212,
      "length": 1926
    },
    {
      "inputOrder": 7,
      "used": true,
      "usedOrder": 7,
      "matchedCoordinateGps": {
        "lon": 7.08118,
        "lat": 43.61169
      },
      "confidenceValue": 0.6537464392808423,
      "distanceFromRequest": 20.37,
      "polylineIndex": -1,
      "duration": 239,
      "length": 2122
    },
    {
      "inputOrder": 8,
      "used": true,
      "usedOrder": 8,
      "matchedCoordinateGps": {
        "lon": 7.08118,
        "lat": 43.61169
      },
      "confidenceValue": 0.19594762970404958,
      "distanceFromRequest": 6.54,
      "polylineIndex": -1,
      "duration": -1,
      "length": -1
    },
    {
      "inputOrder": 9,
      "used": true,
      "usedOrder": 9,
      "matchedCoordinateGps": {
        "lon": 7.0812,
        "lat": 43.6119
      },
      "confidenceValue": 1,
      "distanceFromRequest": 0,
      "polylineIndex": -1,
      "duration": -1,
      "length": -1
    },
    {
      "inputOrder": 10,
      "used": true,
      "usedOrder": 10,
      "matchedCoordinateGps": {
        "lon": 7.081468042538314,
        "lat": 43.61183298936542
      },
      "confidenceValue": 1,
      "distanceFromRequest": 7.89,
      "polylineIndex": -1,
      "duration": -1,
      "length": -1
    },
    {
      "inputOrder": 11,
      "used": true,
      "usedOrder": 11,
      "matchedCoordinateGps": {
        "lon": 7.0816,
        "lat": 43.6118
      },
      "confidenceValue": 1,
      "distanceFromRequest": 0,
      "polylineIndex": -1,
      "duration": 251,
      "length": 2180
    }
  ],
  "routingRoutes": [
    {
      "length": 2180,
      "duration": 251,
      "trafficDelay": 0,
      "averageSpeed": 31.266932,
      "maximumSpeed": 0,
      "startUTurnThreshold": 3000,
      "routingInstructions": [
        {
          "type": "ENTER_ROUNDABOUT",
          "geoElementType": "ROAD",
          "length": 10,
          "duration": 1,
          "fromName": "Rue Fernand Léger",
          "manoeuvre": "RIGHT",
          "coordinate": {
            "lon": 7.06588,
            "lat": 43.6161
          },
          "roundAboutExitNumber": 1,
          "textDist": "At 10 meters"
        },
        {
          "type": "EXIT_ROUNDABOUT",
          "geoElementType": "ROUNDABOUT",
          "length": 16,
          "duration": 12,
          "manoeuvre": "RIGHT",
          "coordinate": {
            "lon": 7.06602,
            "lat": 43.61618
          },
          "roundAboutExitNumber": 1,
          "toName": "D504",
          "toOn": "Route des Lucioles",
          "toRn": "D504",
          "textDist": "At 16 meters",
          "text": "From Rue Fernand Léger at roundabout take 1st exit on D504"
        },
        {
          "type": "ENTER_ROUNDABOUT",
          "geoElementType": "ROAD",
          "length": 388,
          "duration": 39,
          "fromName": "Route des Lucioles",
          "manoeuvre": "RIGHT",
          "coordinate": {
            "lon": 7.07047,
            "lat": 43.61731
          },
          "roundAboutExitNumber": 2,
          "toName": "Carrefour du Golf",
          "toOn": "Carrefour du Golf",
          "textDist": "At 388 meters"
        },
        {
          "type": "EXIT_ROUNDABOUT",
          "geoElementType": "ROUNDABOUT",
          "length": 50,
          "duration": 11,
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
          "textDist": "At 50 meters",
          "text": "From Route des Lucioles at roundabout take 2nd exit on D504"
        },
        {
          "type": "ENTER_ROUNDABOUT",
          "geoElementType": "ROAD",
          "length": 226,
          "duration": 20,
          "fromName": "Route des Colles",
          "manoeuvre": "RIGHT",
          "coordinate": {
            "lon": 7.07357,
            "lat": 43.61703
          },
          "roundAboutExitNumber": 3,
          "toName": "Carrefour Saint-Philippe",
          "toOn": "Carrefour Saint-Philippe",
          "textDist": "At 226 meters"
        },
        {
          "type": "EXIT_ROUNDABOUT",
          "geoElementType": "ROUNDABOUT",
          "length": 104,
          "duration": 27,
          "fromName": "Carrefour Saint-Philippe",
          "manoeuvre": "SLIGHT_RIGHT",
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
          "length": 514,
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
          "textDist": "At 514 meters"
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
          "length": 358,
          "duration": 26,
          "fromName": "Route des Chappes",
          "manoeuvre": "STRAIGHT",
          "coordinate": {
            "lon": 7.07845,
            "lat": 43.61221
          },
          "roundAboutExitNumber": 4,
          "textDist": "At 358 meters"
        },
        {
          "type": "EXIT_ROUNDABOUT",
          "geoElementType": "ROUNDABOUT",
          "length": 124,
          "duration": 20,
          "manoeuvre": "BEAR_RIGHT",
          "coordinate": {
            "lon": 7.07869,
            "lat": 43.61212
          },
          "roundAboutExitNumber": 4,
          "toName": "D535",
          "toOn": "Route des Chappes",
          "toRn": "D535",
          "textDist": "At 124 meters",
          "text": "From Route des Chappes at roundabout take 4th exit on D535"
        },
        {
          "type": "FOLLOW",
          "geoElementType": "ROAD",
          "length": 108,
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
          "textDist": "At 108 meters",
          "text": "From Route des Chappes make a right turn on Allée Charles-Victor Naudin"
        },
        {
          "type": "FOLLOW",
          "geoElementType": "ROAD",
          "length": 216,
          "duration": 31,
          "fromName": "Allée Charles-Victor Naudin",
          "manoeuvre": "SHARP_LEFT",
          "coordinate": {
            "lon": 7.08118,
            "lat": 43.61169
          },
          "roundAboutExitNumber": 0,
          "textDist": "At 216 meters",
          "text": "From Allée Charles-Victor Naudin make a sharp left turn"
        },
        {
          "type": "STOP",
          "length": 58,
          "duration": 12,
          "manoeuvre": "STRAIGHT",
          "coordinate": {
            "lon": 7.0816,
            "lat": 43.6118
          },
          "roundAboutExitNumber": 0,
          "textDist": "At 58 meters",
          "text": "Destination reached"
        }
      ],
      "boundingBox": {
        "minLon": 7.065868896076493,
        "minLat": 43.61169,
        "maxLon": 7.0816,
        "maxLat": 43.6175
      },
      "corridor": [
        {
          "coordinates": [
            {
              "lon": 7.07768,
              "lat": 43.61622
            },
            {
              "lon": 7.07834,
              "lat": 43.61586
            },
```
> ✅ Enables ETA calculation based on a future or past departure scenario, accounting for time-based road data if available.
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
    ]
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
        "lon": 7.065868896076493,
        "lat": 43.616005
      },
      "confidenceValue": 0.9892469222386688,
      "distanceFromRequest": 10.58,
      "polylineIndex": -1,
      "duration": -1,
      "length": -1
    },
    {
      "inputOrder": 1,
      "used": true,
      "usedOrder": 1,
      "matchedCoordinateGps": {
        "lon": 7.066398283397998,
        "lat": 43.616205
      },
      "confidenceValue": 0.3377806566738217,
      "distanceFromRequest": 0.56,
      "polylineIndex": -1,
      "duration": 19,
      "length": 56
    },
    {
      "inputOrder": 2,
      "used": true,
      "usedOrder": 2,
      "matchedCoordinateGps": {
        "lon": 7.078630440418273,
        "lat": 43.61534125
      },
      "confidenceValue": 1,
      "distanceFromRequest": 5.21,
      "polylineIndex": -1,
      "duration": 134,
      "length": 1156
    },
    {
      "inputOrder": 3,
      "used": true,
      "usedOrder": 3,
      "matchedCoordinateGps": {
        "lon": 7.080403748959592,
        "lat": 43.6147275
      },
      "confidenceValue": 0.9910778137778522,
      "distanceFromRequest": 8.34,
      "polylineIndex": -1,
      "duration": 156,
      "length": 1352
    },
    {
      "inputOrder": 4,
      "used": true,
      "usedOrder": 4,
      "matchedCoordinateGps": {
        "lon": 7.07845,
        "lat": 43.61179
      },
      "confidenceValue": 0.17461304514376935,
      "distanceFromRequest": 10.8,
      "polylineIndex": -1,
      "duration": 192,
      "length": 1748
    },
    {
      "inputOrder": 5,
      "used": true,
      "usedOrder": 5,
      "matchedCoordinateGps": {
        "lon": 7.07866,
        "lat": 43.61185
      },
      "confidenceValue": 0.8311396809663245,
      "distanceFromRequest": 6.43,
      "polylineIndex": -1,
      "duration": 194,
      "length": 1766
    },
    {
      "inputOrder": 6,
      "used": true,
      "usedOrder": 6,
      "matchedCoordinateGps": {
        "lon": 7.07938069386973,
        "lat": 43.61286125
      },
      "confidenceValue": 1,
      "distanceFromRequest": 9.42,
      "polylineIndex": -1,
      "duration": 212,
      "length": 1926
    },
    {
      "inputOrder": 7,
      "used": true,
      "usedOrder": 7,
      "matchedCoordinateGps": {
        "lon": 7.08118,
        "lat": 43.61169
      },
      "confidenceValue": 0.6537464392808423,
      "distanceFromRequest": 20.37,
      "polylineIndex": -1,
      "duration": 239,
      "length": 2122
    },
    {
      "inputOrder": 8,
      "used": true,
      "usedOrder": 8,
      "matchedCoordinateGps": {
        "lon": 7.08118,
        "lat": 43.61169
      },
      "confidenceValue": 0.19594762970404958,
      "distanceFromRequest": 6.54,
      "polylineIndex": -1,
      "duration": -1,
      "length": -1
    },
    {
      "inputOrder": 9,
      "used": true,
      "usedOrder": 9,
      "matchedCoordinateGps": {
        "lon": 7.0812,
        "lat": 43.6119
      },
      "confidenceValue": 1,
      "distanceFromRequest": 0,
      "polylineIndex": -1,
      "duration": -1,
      "length": -1
    },
    {
      "inputOrder": 10,
      "used": true,
      "usedOrder": 10,
      "matchedCoordinateGps": {
        "lon": 7.081468042538314,
        "lat": 43.61183298936542
      },
      "confidenceValue": 1,
      "distanceFromRequest": 7.89,
      "polylineIndex": -1,
      "duration": -1,
      "length": -1
    },
    {
      "inputOrder": 11,
      "used": true,
      "usedOrder": 11,
      "matchedCoordinateGps": {
        "lon": 7.0816,
        "lat": 43.6118
      },
      "confidenceValue": 1,
      "distanceFromRequest": 0,
      "polylineIndex": -1,
      "duration": 251,
      "length": 2180
    }
  ],
  "routingRoutes": [
    {
      "length": 2180,
      "duration": 251,
      "trafficDelay": 0,
      "averageSpeed": 31.266932,
      "maximumSpeed": 0,
      "startUTurnThreshold": 3000,
      "routingInstructions": [
        {
          "type": "ENTER_ROUNDABOUT",
          "geoElementType": "ROAD",
          "length": 10,
          "duration": 1,
          "fromName": "Rue Fernand Léger",
          "manoeuvre": "RIGHT",
          "coordinate": {
            "lon": 7.06588,
            "lat": 43.6161
          },
          "roundAboutExitNumber": 1,
          "textDist": "At 10 meters"
        },
        {
          "type": "EXIT_ROUNDABOUT",
          "geoElementType": "ROUNDABOUT",
          "length": 16,
          "duration": 12,
          "manoeuvre": "RIGHT",
          "coordinate": {
            "lon": 7.06602,
            "lat": 43.61618
          },
          "roundAboutExitNumber": 1,
          "toName": "D504",
          "toOn": "Route des Lucioles",
          "toRn": "D504",
          "textDist": "At 16 meters",
          "text": "From Rue Fernand Léger at roundabout take 1st exit on D504"
        },
        {
          "type": "ENTER_ROUNDABOUT",
          "geoElementType": "ROAD",
          "length": 388,
          "duration": 39,
          "fromName": "Route des Lucioles",
          "manoeuvre": "RIGHT",
          "coordinate": {
            "lon": 7.07047,
            "lat": 43.61731
          },
          "roundAboutExitNumber": 2,
          "toName": "Carrefour du Golf",
          "toOn": "Carrefour du Golf",
          "textDist": "At 388 meters"
        },
        {
          "type": "EXIT_ROUNDABOUT",
          "geoElementType": "ROUNDABOUT",
          "length": 50,
          "duration": 11,
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
          "textDist": "At 50 meters",
          "text": "From Route des Lucioles at roundabout take 2nd exit on D504"
        },
        {
          "type": "ENTER_ROUNDABOUT",
          "geoElementType": "ROAD",
          "length": 226,
          "duration": 20,
          "fromName": "Route des Colles",
          "manoeuvre": "RIGHT",
          "coordinate": {
            "lon": 7.07357,
            "lat": 43.61703
          },
          "roundAboutExitNumber": 3,
          "toName": "Carrefour Saint-Philippe",
          "toOn": "Carrefour Saint-Philippe",
          "textDist": "At 226 meters"
        },
        {
          "type": "EXIT_ROUNDABOUT",
          "geoElementType": "ROUNDABOUT",
          "length": 104,
          "duration": 27,
          "fromName": "Carrefour Saint-Philippe",
          "manoeuvre": "SLIGHT_RIGHT",
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
          "length": 514,
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
          "textDist": "At 514 meters"
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
          "length": 358,
          "duration": 26,
          "fromName": "Route des Chappes",
          "manoeuvre": "STRAIGHT",
          "coordinate": {
            "lon": 7.07845,
            "lat": 43.61221
          },
          "roundAboutExitNumber": 4,
          "textDist": "At 358 meters"
        },
        {
          "type": "EXIT_ROUNDABOUT",
          "geoElementType": "ROUNDABOUT",
          "length": 124,
          "duration": 20,
          "manoeuvre": "BEAR_RIGHT",
          "coordinate": {
            "lon": 7.07869,
            "lat": 43.61212
          },
          "roundAboutExitNumber": 4,
          "toName": "D535",
          "toOn": "Route des Chappes",
          "toRn": "D535",
          "textDist": "At 124 meters",
          "text": "From Route des Chappes at roundabout take 4th exit on D535"
        },
        {
          "type": "FOLLOW",
          "geoElementType": "ROAD",
          "length": 108,
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
          "textDist": "At 108 meters",
          "text": "From Route des Chappes make a right turn on Allée Charles-Victor Naudin"
        },
        {
          "type": "FOLLOW",
          "geoElementType": "ROAD",
          "length": 216,
          "duration": 31,
          "fromName": "Allée Charles-Victor Naudin",
          "manoeuvre": "SHARP_LEFT",
          "coordinate": {
            "lon": 7.08118,
            "lat": 43.61169
          },
          "roundAboutExitNumber": 0,
          "textDist": "At 216 meters",
          "text": "From Allée Charles-Victor Naudin make a sharp left turn"
        },
        {
          "type": "STOP",
          "length": 58,
          "duration": 12,
          "manoeuvre": "STRAIGHT",
          "coordinate": {
            "lon": 7.0816,
            "lat": 43.6118
          },
          "roundAboutExitNumber": 0,
          "textDist": "At 58 meters",
          "text": "Destination reached"
        }
      ],
      "boundingBox": {
        "minLon": 7.065868896076493,
        "minLat": 43.61169,
        "maxLon": 7.0816,
        "maxLat": 43.6175
      },
      "startStopInfo": {
        "start": {
          "lon": 7.06587,
          "lat": 43.61601
        },
        "stop": {
          "lon": 7.08118,
          "lat": 43.61169
        },
        "distanceFirstMatched": 0.56,
        "distanceLastMatched": 36,
        "interDests": null
      },
      "polyline": [
        {
          "lon": 7.065868896076493,
          "lat": 43.616005
        },
        {
          "lon": 7.06588,
          "lat": 43.6161
        },
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
    ]
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
        "lon": 7.065868896076493,
        "lat": 43.616005
      },
      "confidenceValue": 0.9892469222386688,
      "distanceFromRequest": 10.58,
      "polylineIndex": -1,
      "duration": -1,
      "length": -1
    },
    {
      "inputOrder": 1,
      "used": true,
      "usedOrder": 1,
      "matchedCoordinateGps": {
        "lon": 7.066398283397998,
        "lat": 43.616205
      },
      "confidenceValue": 0.3377806566738217,
      "distanceFromRequest": 0.56,
      "polylineIndex": -1,
      "duration": 19,
      "length": 56
    },
    {
      "inputOrder": 2,
      "used": true,
      "usedOrder": 2,
      "matchedCoordinateGps": {
        "lon": 7.078630440418273,
        "lat": 43.61534125
      },
      "confidenceValue": 1,
      "distanceFromRequest": 5.21,
      "polylineIndex": -1,
      "duration": 134,
      "length": 1156
    },
    {
      "inputOrder": 3,
      "used": true,
      "usedOrder": 3,
      "matchedCoordinateGps": {
        "lon": 7.080403748959592,
        "lat": 43.6147275
      },
      "confidenceValue": 0.9910778137778522,
      "distanceFromRequest": 8.34,
      "polylineIndex": -1,
      "duration": 156,
      "length": 1352
    },
    {
      "inputOrder": 4,
      "used": true,
      "usedOrder": 4,
      "matchedCoordinateGps": {
        "lon": 7.07845,
        "lat": 43.61179
      },
      "confidenceValue": 0.17461304514376935,
      "distanceFromRequest": 10.8,
      "polylineIndex": -1,
      "duration": 192,
      "length": 1748
    },
    {
      "inputOrder": 5,
      "used": true,
      "usedOrder": 5,
      "matchedCoordinateGps": {
        "lon": 7.07866,
        "lat": 43.61185
      },
      "confidenceValue": 0.8311396809663245,
      "distanceFromRequest": 6.43,
      "polylineIndex": -1,
      "duration": 194,
      "length": 1766
    },
    {
      "inputOrder": 6,
      "used": true,
      "usedOrder": 6,
      "matchedCoordinateGps": {
        "lon": 7.07938069386973,
        "lat": 43.61286125
      },
      "confidenceValue": 1,
      "distanceFromRequest": 9.42,
      "polylineIndex": -1,
      "duration": 212,
      "length": 1926
    },
    {
      "inputOrder": 7,
      "used": true,
      "usedOrder": 7,
      "matchedCoordinateGps": {
        "lon": 7.08118,
        "lat": 43.61169
      },
      "confidenceValue": 0.6537464392808423,
      "distanceFromRequest": 20.37,
      "polylineIndex": -1,
      "duration": 239,
      "length": 2122
    },
    {
      "inputOrder": 8,
      "used": true,
      "usedOrder": 8,
      "matchedCoordinateGps": {
        "lon": 7.08118,
        "lat": 43.61169
      },
      "confidenceValue": 0.19594762970404958,
      "distanceFromRequest": 6.54,
      "polylineIndex": -1,
      "duration": -1,
      "length": -1
    },
    {
      "inputOrder": 9,
      "used": true,
      "usedOrder": 9,
      "matchedCoordinateGps": {
        "lon": 7.0812,
        "lat": 43.6119
      },
      "confidenceValue": 1,
      "distanceFromRequest": 0,
      "polylineIndex": -1,
      "duration": -1,
      "length": -1
    },
    {
      "inputOrder": 10,
      "used": true,
      "usedOrder": 10,
      "matchedCoordinateGps": {
        "lon": 7.081468042538314,
        "lat": 43.61183298936542
      },
      "confidenceValue": 1,
      "distanceFromRequest": 7.89,
      "polylineIndex": -1,
      "duration": -1,
      "length": -1
    },
    {
      "inputOrder": 11,
      "used": true,
      "usedOrder": 11,
      "matchedCoordinateGps": {
        "lon": 7.0816,
        "lat": 43.6118
      },
      "confidenceValue": 1,
      "distanceFromRequest": 0,
      "polylineIndex": -1,
      "duration": 251,
      "length": 2180
    }
  ],
  "routingRoutes": [
    {
      "length": 2180,
      "duration": 251,
      "trafficDelay": 0,
      "averageSpeed": 31.266932,
      "maximumSpeed": 0,
      "startUTurnThreshold": 3000,
      "routingInstructions": [
        {
          "type": "ENTER_ROUNDABOUT",
          "geoElementType": "ROAD",
          "length": 10,
          "duration": 1,
          "fromName": "Rue Fernand Léger",
          "manoeuvre": "RIGHT",
          "coordinate": {
            "lon": 7.06588,
            "lat": 43.6161
          },
          "roundAboutExitNumber": 1,
          "textDist": "À 10 mètres"
        },
        {
          "type": "EXIT_ROUNDABOUT",
          "geoElementType": "ROUNDABOUT",
          "length": 16,
          "duration": 12,
          "manoeuvre": "RIGHT",
          "coordinate": {
            "lon": 7.06602,
            "lat": 43.61618
          },
          "roundAboutExitNumber": 1,
          "toName": "D504",
          "toOn": "Route des Lucioles",
          "toRn": "D504",
          "textDist": "À 16 mètres",
          "text": "Depuis Rue Fernand Léger au rond point prendre la 1er sortie en direction de D504"
        },
        {
          "type": "ENTER_ROUNDABOUT",
          "geoElementType": "ROAD",
          "length": 388,
          "duration": 39,
          "fromName": "Route des Lucioles",
          "manoeuvre": "RIGHT",
          "coordinate": {
            "lon": 7.07047,
            "lat": 43.61731
          },
          "roundAboutExitNumber": 2,
          "toName": "Carrefour du Golf",
          "toOn": "Carrefour du Golf",
          "textDist": "À 388 mètres"
        },
        {
          "type": "EXIT_ROUNDABOUT",
          "geoElementType": "ROUNDABOUT",
          "length": 50,
          "duration": 11,
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
          "textDist": "À 50 mètres",
          "text": "Depuis Route des Lucioles au rond point prendre la 2e sortie en direction de D504"
        },
        {
          "type": "ENTER_ROUNDABOUT",
          "geoElementType": "ROAD",
          "length": 226,
          "duration": 20,
          "fromName": "Route des Colles",
          "manoeuvre": "RIGHT",
          "coordinate": {
            "lon": 7.07357,
            "lat": 43.61703
          },
          "roundAboutExitNumber": 3,
          "toName": "Carrefour Saint-Philippe",
          "toOn": "Carrefour Saint-Philippe",
          "textDist": "À 226 mètres"
        },
        {
          "type": "EXIT_ROUNDABOUT",
          "geoElementType": "ROUNDABOUT",
          "length": 104,
          "duration": 27,
          "fromName": "Carrefour Saint-Philippe",
          "manoeuvre": "SLIGHT_RIGHT",
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
          "length": 514,
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
          "textDist": "À 514 mètres"
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
          "length": 358,
          "duration": 26,
          "fromName": "Route des Chappes",
          "manoeuvre": "STRAIGHT",
          "coordinate": {
            "lon": 7.07845,
            "lat": 43.61221
          },
          "roundAboutExitNumber": 4,
          "textDist": "À 358 mètres"
        },
        {
          "type": "EXIT_ROUNDABOUT",
          "geoElementType": "ROUNDABOUT",
          "length": 124,
          "duration": 20,
          "manoeuvre": "BEAR_RIGHT",
          "coordinate": {
            "lon": 7.07869,
            "lat": 43.61212
          },
          "roundAboutExitNumber": 4,
          "toName": "D535",
          "toOn": "Route des Chappes",
          "toRn": "D535",
          "textDist": "À 124 mètres",
          "text": "Depuis Route des Chappes au rond point prendre la 4e sortie en direction de D535"
        },
        {
          "type": "FOLLOW",
          "geoElementType": "ROAD",
          "length": 108,
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
          "textDist": "À 108 mètres",
          "text": "Depuis Route des Chappes tourner à droite sur Allée Charles-Victor Naudin"
        },
        {
          "type": "FOLLOW",
          "geoElementType": "ROAD",
          "length": 216,
          "duration": 31,
          "fromName": "Allée Charles-Victor Naudin",
          "manoeuvre": "SHARP_LEFT",
          "coordinate": {
            "lon": 7.08118,
            "lat": 43.61169
          },
          "roundAboutExitNumber": 0,
          "textDist": "À 216 mètres",
          "text": "Depuis Allée Charles-Victor Naudin prendre un virage serré à gauche"
        },
        {
          "type": "STOP",
          "length": 58,
          "duration": 12,
          "manoeuvre": "STRAIGHT",
          "coordinate": {
            "lon": 7.0816,
            "lat": 43.6118
          },
          "roundAboutExitNumber": 0,
          "textDist": "À 58 mètres",
          "text": "Destination atteinte"
        }
      ],
      "boundingBox": {
        "minLon": 7.065868896076493,
        "minLat": 43.61169,
        "maxLon": 7.0816,
        "maxLat": 43.6175
      },
      "startStopInfo": {
        "start": {
          "lon": 7.06587,
          "lat": 43.61601
        },
        "stop": {
          "lon": 7.08118,
          "lat": 43.61169
        },
        "distanceFirstMatched": 0.56,
        "distanceLastMatched": 36,
        "interDests": null
      },
      "polyline": [
        {
          "lon": 7.065868896076493,
          "lat": 43.616005
        },
        {
          "lon": 7.06588,
          "lat": 43.6161
        },
```
> ✅ Useful for applications targeting international users, multilingual UIs, or localized route guidance.