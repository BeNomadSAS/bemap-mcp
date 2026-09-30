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
- **routingEnergyVehicleFeature** is used by the energy options (`ENERGY_CONSUMPTION`, `EVT_ENERGY_*`), and **maxSpeeds** caps the speed and changes the ETA (measured on this page's trace: 827 s with a `maxSpeed` of 10 km/h, 245 s without)
- **routingSpeedPonderations** and **routingCrossPenaltiesCoefficients** have no effect on TraceRoute (per the specification)

> ℹ️ Units of `routingVehicleFeature`: `height`, `width` and `length` in centimetres, `weight` and `axleWeight` in tenths of a tonne (`35` = 3.5 t). The specification describes the weights as "in tens of metric tons", which its own examples (`35` = 3.5t, `12` = 1.2t) contradict: one unit is 100 kg.<br>
> ℹ️ The sample responses were measured on production on 29 September 2026. A response marked *truncated* shows only the first points of its `polyline`.

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
  ]
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
      "maximumSpeed": 80,
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

`TraceRoute` calculates energy usage when you ask for it: the `ENERGY_CONSUMPTION` option returns one total per route (`routingRoutes[].energyConsumption`, in kWh), and `EVENT` with `EVT_ENERGY_CONSUMPTION` or `EVT_ENERGY_CONSUMPTION_SAMPLE` returns it in the route's events. Without one of these options, this block is not used.

💡 **What it does**

This field allows you to define detailed characteristics of an electric or hybrid vehicle, such as:

- Battery capacity (`batCapacity`)
- Rolling resistance (`crr`)
- Weight (`dryWeight`, `payload`)
- Efficiency (`engineEfficiency`)
- Regenerative braking
- Maximum acceleration and deceleration (`maxAccel`, `maxDecel`)
- Outside temperature, aerodynamic drag area S×Cx (`scx`), etc.

> ⚠️ When an energy option is set, the service checks these values, although the specification marks every field optional: an omitted number reads as `0`, and `scx`, `crr`, `engineEfficiency`, `dryWeight`, `batCapacity` and `maxAccel` must be above 0, `maxDecel` below 0. Measured on production: without `maxAccel`, `400` maxAccelOutOfRange, *"maxAccel must be over 0."*; then, without `maxDecel`, `400` maxDecelOutOfRange, *"maxDecel must be under 0."*.

🔧 **How to enable**
Add a `routingEnergyVehicleFeature` block to the `routingVehicleProfile`, and an energy option to `options`. Example:
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
    "extTemp": 20.0,
    "maxAccel": 1.0,
    "maxDecel": -1.0
  }
}
```
📦 **Example**
Here is a **working TraceRoute request** including `routingEnergyVehicleFeature` and the `ENERGY_CONSUMPTION` option:
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
      "extTemp": 20.0,
      "maxAccel": 1.0,
      "maxDecel": -1.0
    }
  },
  "options": ["ENERGY_CONSUMPTION", "ROUTESHEET", "POLYLINE"],
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
      "energyConsumption": 0.18269515488916505,
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

`transportMode` is **required**. The specification marks it optional, with a default of `EMERGENCY` for TraceRoute, but measured on production a request without it fails: `400` MISSING_PARAMETER, with a message that does not name the field — *"Some parameter are missing, please check your request."*, followed by a Java error about the vehicle's transport type. For the emergency-vehicle behaviour, send `"transportMode": "EMERGENCY"` explicitly.

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
> ✅ Ensures the routing engine applies car-specific traffic rules and avoids restricted zones.

---

_BeNomad MCP: a corrected copy of BeMap's page, served until BeMap publishes the correction (BEMAP-1938)._
