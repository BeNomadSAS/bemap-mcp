<a name="traceroute_routingVehicleProfile_tutorial"></a>
# 📦 TraceRoute - routingVehicleProfile Detailed Usage
This tutorial explains how to use the `routingVehicleProfile` object in the TraceRoute API to define the physical and legal characteristics of the vehicle. These features influence route calculation, especially regarding **height**, **weight**, **hazardous materials**, and **access restrictions**.
---

## 🚀 Purpose – Control routing with vehicle characteristics
  
✅ **Use case**

You want the route to avoid restricted roads or infrastructure based on the vehicle's height, weight, or hazardous cargo. For example:
- A truck should avoid low tunnels.
- A vehicle carrying hazardous materials must avoid restricted roads.
- A large vehicle should avoid narrow lanes or bridges with weight limits.

💡 **What it does**

The `routingVehicleProfile` affects how the trace is matched to the road network:
- **transportMode** tells the system how to interpret movement patterns (e.g., car vs pedestrian)
- **routingVehicleFeature** contains legal and physical specs (height, weight, hazardous material) used for more precise trace correction
- **routingEnergyVehicleFeature** and **maxSpeeds** are ignored in TraceRoute

🔧 **How to enable**

Include the `routingVehicleProfile` object with at least the required field `transportMode`. For trucks or restricted vehicles, also define `routingVehicleFeature`.
- `transportMode`: e.g., `CAR` or `TRUCK`.
- `routingVehicleFeature`: object with vehicle characteristics.
- Optionally, `maxSpeeds` if you want to define a speed limit per use case.
---

📦 Example 1 – Car with basic dimensions

```
"routingVehicleProfile": {
  "transportMode": "CAR",
  "routingVehicleFeature": {
    "height": 160,
    "width": 180,
    "length": 420,
    "weight": 15
  }
}
```
---
<a name="traceroute_maxSpeeds_tutorial"></a>
## 🚀 maxSpeeds – Define vehicle speed limitations
This tutorial explains how to use the maxSpeeds field in the routingVehicleProfile object of the TraceRoute API.

✅ **Use case**

You want to simulate a vehicle that is limited to a specific speed for **route calculation**, **ETA estimation**, or **both**. This is useful for:

- Modeling trucks or buses with legal speed limits.
- Reflecting realistic average speeds for planning.
- Enforcing internal policies or safety constraints.

💡 **What it does**

The `maxSpeeds` field lets you declare one or more max speed limits for the vehicle, and specify when that speed should apply:

- `ALL`: Applies for both route path and ETA.
- `CAL`: Affects only the route calculation path.
- `ETA`: Affects only the time estimation.
- 
🔧 **How to enable**

Add a `maxSpeeds` array to the `routingVehicleProfile`. Each entry must include:

`maxSpeed` (in km/h)

`type`: `ALL`, `CAL`, or `ETA`
```
"routingVehicleProfile": {
  "maxSpeeds": [
    {
      "maxSpeed": 80,
      "type": "ALL"
    }
  ],
}
```
📦 **Example**
Here's a full TraceRoute request using `maxSpeeds`:
```
{
  "routingVehicleProfile": {
    "transportMode": "CAR",
    "maxSpeeds": [
      {
        "maxSpeed": 80,
        "type": "ALL"
      }
    ],
    "routingVehicleFeature": {
      "height": 320,
      "width": 250,
      "length": 700,
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
      "maximumSpeed": 80,
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
> ✅ Used to simulate a max speed limit of 80 km/h for both route and ETA calculation.
---
<a name="traceroute_routingEnergyVehicleFeature_tutorial"></a>
## 🔋 routingEnergyVehicleFeature – Define energy parameters of the vehicle
This tutorial explains how to use the routingEnergyVehicleFeature field in the routingVehicleProfile object of the TraceRoute API.

✅ **Use case**

You want to provide physical and energy-related properties of the vehicle to:

- Simulate more realistic energy consumption.

- Anticipate SoC (state of charge) drops or limitations.

- Match the profile of a specific EV model.

Even though `TraceRoute` doesn't calculate energy usage, this field can be stored for consistency or future compatibility, and some implementations may leverage it for internal analytics or post-processing.

💡 **What it does**

This field allows you to define detailed characteristics of an electric or hybrid vehicle, such as:

- Battery capacity (`batCapacity`)
- Rolling resistance (`crr`)
- Weight (`dryWeight`, `payload`)
- Efficiency (`engineEfficiency`)
- Regenerative braking
- Outside temperature, frontal surface area (`scx`), etc.

🔧 **How to enable**
Add a `routingEnergyVehicleFeature` block to the `routingVehicleProfile`. Example:
```
"routingVehicleProfile": {
  "transportMode": "CAR",
  "routingEnergyVehicleFeature": {
    "batCapacity": 75,
    "payload": 150,
    "dryWeight": 1800,
    "engineEfficiency": 0.88,
    "crr": 0.012,
    "scx": 0.64,
    "auxConsumption": 800,
    "regenerativeBraking": true,
    "extTemp": 20.0
  }
}
```
📦 **Example**
Here is a **working TraceRoute request** including `routingEnergyVehicleFeature`:
```
{
  "routingVehicleProfile": {
    "transportMode": "CAR",
    "routingEnergyVehicleFeature": {
      "batCapacity": 75,
      "payload": 150,
      "dryWeight": 1800,
      "engineEfficiency": 0.88,
      "crr": 0.012,
      "scx": 0.64,
      "auxConsumption": 800,
      "regenerativeBraking": true,
      "extTemp": 20.0
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
---
<a name="traceroute_routingVehicleFeature_tutorial"></a>
## 🚗 routingVehicleFeature – Define physical and legal vehicle constraints
This tutorial explains how to use the `routingVehicleFeature` field inside the `routingVehicleProfile` in the **TraceRoute** API.

✅ **Use case**

You want to:

- Avoid routes that your vehicle physically cannot take (e.g., low bridges, narrow tunnels).
- Respect legal limitations based on size, weight, or hazardous cargo.
- Ensure routing complies with vehicle-specific restrictions (truck, bus, caravan, etc.).

💡 **What it does**

- The `routingVehicleFeature` object provides the physical dimensions and legal attributes of the vehicle. These affect:
- Road eligibility (tunnel height, weight limits, bridge restrictions, etc.).
- Toll cost estimation depending on vehicle type and attributes.

🔧 **How to enable**

Add a `routingVehicleFeature` block inside `routingVehicleProfile`:
```
"routingVehicleProfile": {
  "transportMode": "CAR",
  "routingVehicleFeature": {
    "height": 380,
    "width": 250,
    "length": 1875,
    "weight": 35,
    "axleWeight": 10,
    "nbTrailer": 1,
    "adrTunnelCategory": "CAT_D",
    "hazardousMaterials": "EXPLOSIVE",
    "emissionClass": "EURO6"
  }
}
```
📦 **Example:**

Here’s a **working TraceRoute request** including `routingVehicleFeature`:
```
{
  "routingVehicleProfile": {
    "transportMode": "CAR",
    "routingVehicleFeature": {
      "height": 380,
      "width": 250,
      "length": 1875,
      "weight": 35,
      "axleWeight": 10,
      "nbTrailer": 1,
      "adrTunnelCategory": "CAT_D",
      "hazardousMaterials": "EXPLOSIVE",
      "emissionClass": "EURO6"
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
**Response:**
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
> ✅ Used to avoid roads that are physically or legally restricted based on the vehicle’s size, weight, or cargo.
---
<a name="traceroute_transportMode_tutorial"></a>
## 🚚 transportMode – Choose the right routing logic for your vehicle type
This tutorial explains how to use the `transportMode` field inside the `routingVehicleProfile` in the **TraceRoute** API.

✅ **Use case**

You want to:

- Adapt routing rules to your type of vehicle (car, pedestrian, truck, etc.)
- Ensure traffic restrictions, turn rules, and access permissions are respected.
- Leverage map data optimized for specific transport modes.

💡 **What it does**

The `transportMode` defines how the routing engine interprets the road network for your request. It influences:

- Accessibility of roads (e.g., no cars in pedestrian zones)
- Turn and one-way restrictions
- Toll and traffic rules
- Routing preferences and road types used

If omitted, the default value for TraceRoute is `EMERGENCY`.

🔧 **How to enable**

Add `transportMode` inside `routingVehicleProfile`:
```
"routingVehicleProfile": {
  "transportMode": "CAR"
}
```
📦 **Example**
Here’s a **functional TraceRoute request** using `transportMode: CAR`:
```
{
  "routingVehicleProfile": {
    "transportMode": "CAR"
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
> ✅ Ensures the routing engine applies car-specific traffic rules and avoids restricted zones.
