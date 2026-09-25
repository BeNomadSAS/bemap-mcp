<a name="traceroute_parameters_tutorial"></a>
# 🛠️ TraceRoute – options Parameter
The `options` array in the TraceRoute API allows you to customize the output content and format of the route calculation. Each value in the array activates a specific feature or additional result in the response.

This tutorial explains the purpose and effect of each option, when to use them, and provides examples of how to include them in your request.
---
<a name="traceroute_energyConsumption_tutorial"></a>
## ⚡ ENERGY_CONSUMPTION – Estimate energy usage along the route
✅ **Use case**

You want to retrieve **energy consumption estimates** for each segment of the route, based on your vehicle’s energy characteristics (like battery, weight, aerodynamic profile, etc.).

💡 **What it does**

When this option is set, the API returns a `energyConsumption` field in the response, representing the **estimated energy usage** in kilowatt-hours (kWh) across the entire route.
This helps assess whether a full trip is feasible with the current battery or if charging stops are needed.

> ⚠️ This option **requires** a `routingEnergyVehicleFeature` block in your `routingVehicleProfile`. If it's missing, the request may fail or return no consumption data.

🔧 **How to enable**

Add `ENERGY_CONSUMPTION` to the `options` array in your TraceRoute request, and make sure to include a properly filled `routingEnergyVehicleFeature`.
```
"options": ["ENERGY_CONSUMPTION"]
```
📦 **Example**
```
{
  "routingVehicleProfile": {
    "transportMode": "CAR",
    "routingEnergyVehicleFeature": {
      "batCapacity": 60.0,
      "energyLoad": 42.0,
      "payload": 100,
      "auxConsumption": 800,
      "dryWeight": 1800,
      "crr": 0.01,
      "scx": 0.6,
      "engineEfficiency": 0.9,
      "regenerativeBraking": true,
      "extTemp": 20.0,
      "maxAccel": 2.5,
      "maxDecel": -3.0
    }
  },
  "options": ["ENERGY_CONSUMPTION"],
  "destinations": [
    {
      "coordinateSat": {
        "lon": 2.3488,
        "lat": 48.8534,
        "speed": 20.0,
        "time": 1720519200000
      }
    },
    {
      "coordinateSat": {
        "lon": 2.3600,
        "lat": 48.8580,
        "speed": 35.0,
        "time": 1720519260000
      }
    },
    {
      "coordinateSat": {
        "lon": 2.3610,
        "lat": 48.8585,
        "speed": 33.0,
        "time": 1720519320000
      }
    },
    {
      "coordinateSat": {
        "lon": 2.3620,
        "lat": 48.8590,
        "speed": 36.0,
        "time": 1720519380000
      }
    },
    {
      "coordinateSat": {
        "lon": 2.3630,
        "lat": 48.8595,
        "speed": 38.0,
        "time": 1720519440000
      }
    },
    {
      "coordinateSat": {
        "lon": 2.3640,
        "lat": 48.8600,
        "speed": 40.0,
        "time": 1720519500000
      }
    },
    {
      "coordinateSat": {
        "lon": 2.3650,
        "lat": 48.8605,
        "speed": 41.0,
        "time": 1720519560000
      }
    },
    {
      "coordinateSat": {
        "lon": 2.3660,
        "lat": 48.8610,
        "speed": 42.0,
        "time": 1720519620000
      }
    },
    {
      "coordinateSat": {
        "lon": 2.3670,
        "lat": 48.8615,
        "speed": 40.0,
        "time": 1720519680000
      }
    },
    {
      "coordinateSat": {
        "lon": 2.3680,
        "lat": 48.8620,
        "speed": 38.0,
        "time": 1720519740000
      }
    },
    {
      "coordinateSat": {
        "lon": 2.3690,
        "lat": 48.8625,
        "speed": 35.0,
        "time": 1720519800000
      }
    },
    {
      "coordinateSat": {
        "lon": 2.3700,
        "lat": 48.8630,
        "speed": 30.0,
        "time": 1720519860000
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
      "used": false,
      "usedOrder": 0,
      "confidenceValue": 0,
      "distanceFromRequest": 0,
      "polylineIndex": -1,
      "duration": -1,
      "length": -1
    },
    {
      "inputOrder": 1,
      "used": true,
      "usedOrder": 1,
      "matchedCoordinateGps": {
        "lon": 2.360015114939581,
        "lat": 48.858015
      },
      "confidenceValue": 0.9,
      "distanceFromRequest": 2,
      "polylineIndex": -1,
      "duration": -1,
      "length": -1
    },
    {
      "inputOrder": 2,
      "used": true,
      "usedOrder": 2,
      "matchedCoordinateGps": {
        "lon": 2.361159644312669,
        "lat": 48.8586675
      },
      "confidenceValue": 0.85,
      "distanceFromRequest": 22.01,
      "polylineIndex": -1,
      "duration": 51,
      "length": 222
    },
    {
      "inputOrder": 3,
      "used": true,
      "usedOrder": 3,
      "matchedCoordinateGps": {
        "lon": 2.3622205992189427,
        "lat": 48.85888
      },
      "confidenceValue": 0.28927187521472786,
      "distanceFromRequest": 20.96,
      "polylineIndex": -1,
      "duration": 92,
      "length": 330
    },
    {
      "inputOrder": 4,
      "used": true,
      "usedOrder": 4,
      "matchedCoordinateGps": {
        "lon": 2.3632036770414344,
        "lat": 48.859815
      },
      "confidenceValue": 0.4585633810385473,
      "distanceFromRequest": 38.11,
      "polylineIndex": -1,
      "duration": 212,
      "length": 770
    },
    {
      "inputOrder": 5,
      "used": true,
      "usedOrder": 5,
      "matchedCoordinateGps": {
        "lon": 2.3640594759297437,
        "lat": 48.86009
      },
      "confidenceValue": 0.6287187675009722,
      "distanceFromRequest": 10.92,
      "polylineIndex": -1,
      "duration": 254,
      "length": 878
    },
    {
      "inputOrder": 6,
      "used": true,
      "usedOrder": 6,
      "matchedCoordinateGps": {
        "lon": 2.36456,
        "lat": 48.86013
      },
      "confidenceValue": 0.23113073511408522,
      "distanceFromRequest": 52.3,
      "polylineIndex": -1,
      "duration": 274,
      "length": 940
    },
    {
      "inputOrder": 7,
      "used": true,
      "usedOrder": 7,
      "matchedCoordinateGps": {
        "lon": 2.3660428283122403,
        "lat": 48.86114125
      },
      "confidenceValue": 0.85,
      "distanceFromRequest": 16.03,
      "polylineIndex": -1,
      "duration": 394,
      "length": 1342
    },
    {
      "inputOrder": 8,
      "used": true,
      "usedOrder": 8,
      "matchedCoordinateGps": {
        "lon": 2.3669423826336007,
        "lat": 48.861375
      },
      "confidenceValue": 0.23983956831897124,
      "distanceFromRequest": 14.54,
      "polylineIndex": -1,
      "duration": 501,
      "length": 1656
    },
    {
      "inputOrder": 9,
      "used": true,
      "usedOrder": 9,
      "matchedCoordinateGps": {
        "lon": 2.3679160573446674,
        "lat": 48.86215125
      },
      "confidenceValue": 0.35939913638776866,
      "distanceFromRequest": 17.92,
      "polylineIndex": -1,
      "duration": 567,
      "length": 1938
    },
    {
      "inputOrder": 10,
      "used": true,
      "usedOrder": 10,
      "matchedCoordinateGps": {
        "lon": 2.369032257414646,
        "lat": 48.86244875
      },
      "confidenceValue": 0.85,
      "distanceFromRequest": 6.17,
      "polylineIndex": -1,
      "duration": 583,
      "length": 2026
    },
    {
      "inputOrder": 11,
      "used": true,
      "usedOrder": 11,
      "matchedCoordinateGps": {
        "lon": 2.3701541802535973,
        "lat": 48.86275125
      },
      "confidenceValue": 0.85,
      "distanceFromRequest": 29.9,
      "polylineIndex": -1,
      "duration": 599,
      "length": 2114
    }
  ],
  "routingRoutes": [
    {
      "length": 2114,
      "duration": 599,
      "trafficDelay": 0,
      "averageSpeed": 12.705175,
      "maximumSpeed": 0,
      "startUTurnThreshold": 3000,
      "energyConsumption": 0.4256013630880502,
      "startStopInfo": {
        "start": {
          "lon": 2.36002,
          "lat": 48.85802
        },
        "stop": {
          "lon": 2.37015,
          "lat": 48.86275
        },
        "distanceFirstMatched": 0.56,
        "distanceLastMatched": 0.14,
        "interDests": null
      }
    }
  ]
}
```
> ✅ Enables the `energyConsumption` field in the response, helping you estimate the vehicle’s energy needs across the route.
---
<a name="traceroute_noMinimalWaypoints_tutorial"></a>
## 🧭 NO_MINIMAL_WAYPOINTS – Disable minimal waypoint filtering
✅ **Use case**

You want **all original waypoints** used in the request to be returned in the response, **even those not required to reproduce the route**. This is useful for debugging or for precise post-analysis of GPS data.

💡 **What it does**

By default, the TraceRoute service filters out intermediate waypoints that are not needed to reconstruct the final route.
This **"minimal waypoints" algorithm** improves performance and response size.

Enabling `NO_MINIMAL_WAYPOINTS` disables this behavior:

🔁 **All input coordinates** marked with `keptByMinimalWp = true` are preserved in the response,

📈 Resulting in faster processing and better fidelity when analyzing the full trace.

> ℹ️ This is a **sub-option** of the `WAYPOINTS` option.
It has no effect unless `WAYPOINTS` is also included.

🔧 **How to enable**

Add both `WAYPOINTS` and `NO_MINIMAL_WAYPOINTS` to the options array in your TraceRoute request.

Make sure to set `"keptByMinimalWp": true` on the destinations you want to preserve.
```
"options": ["WAYPOINTS", "NO_MINIMAL_WAYPOINTS"]
```
📦 **Example**
```
{
  "routingVehicleProfile": {
    "transportMode": "CAR",
    "routingVehicleFeature": {
      "height": 150,
      "width": 60,
      "length": 450,
      "weight": 1500
    }
  },
  "options": ["WAYPOINTS", "NO_MINIMAL_WAYPOINTS"],
  "destinations": [
    {
      "coordinateSat": {
        "lon": 2.3488,
        "lat": 48.8534,
        "speed": 30.0,
        "time": 1720519200000
      },
      "keptByMinimalWp": true
    },
    {
      "coordinateSat": {
        "lon": 2.3600,
        "lat": 48.8580,
        "speed": 28.0,
        "time": 1720519260000
      },
      "keptByMinimalWp": true
    },
    {
      "coordinateSat": {
        "lon": 2.3610,
        "lat": 48.8585,
        "speed": 29.0,
        "time": 1720519320000
      },
      "keptByMinimalWp": true
    },
    {
      "coordinateSat": {
        "lon": 2.3620,
        "lat": 48.8590,
        "speed": 31.0,
        "time": 1720519380000
      },
      "keptByMinimalWp": true
    },
    {
      "coordinateSat": {
        "lon": 2.3630,
        "lat": 48.8595,
        "speed": 34.0,
        "time": 1720519440000
      },
      "keptByMinimalWp": true
    },
    {
      "coordinateSat": {
        "lon": 2.3640,
        "lat": 48.8600,
        "speed": 36.0,
        "time": 1720519500000
      },
      "keptByMinimalWp": true
    },
    {
      "coordinateSat": {
        "lon": 2.3650,
        "lat": 48.8605,
        "speed": 38.0,
        "time": 1720519560000
      },
      "keptByMinimalWp": true
    },
    {
      "coordinateSat": {
        "lon": 2.3660,
        "lat": 48.8610,
        "speed": 39.0,
        "time": 1720519620000
      },
      "keptByMinimalWp": true
    },
    {
      "coordinateSat": {
        "lon": 2.3670,
        "lat": 48.8615,
        "speed": 40.0,
        "time": 1720519680000
      },
      "keptByMinimalWp": true
    },
    {
      "coordinateSat": {
        "lon": 2.3680,
        "lat": 48.8620,
        "speed": 32.0,
        "time": 1720519740000
      },
      "keptByMinimalWp": true
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
      "used": false,
      "usedOrder": 0,
      "confidenceValue": 0,
      "distanceFromRequest": 0,
      "polylineIndex": -1,
      "duration": -1,
      "length": -1
    },
    {
      "inputOrder": 1,
      "used": true,
      "usedOrder": 1,
      "matchedCoordinateGps": {
        "lon": 2.360015114939581,
        "lat": 48.858015
      },
      "confidenceValue": 0.9,
      "distanceFromRequest": 2,
      "polylineIndex": -1,
      "duration": -1,
      "length": -1
    },
    {
      "inputOrder": 2,
      "used": true,
      "usedOrder": 2,
      "matchedCoordinateGps": {
        "lon": 2.361159644312669,
        "lat": 48.8586675
      },
      "confidenceValue": 0.85,
      "distanceFromRequest": 22.01,
      "polylineIndex": -1,
      "duration": 51,
      "length": 222
    },
    {
      "inputOrder": 3,
      "used": true,
      "usedOrder": 3,
      "matchedCoordinateGps": {
        "lon": 2.3622205992189427,
        "lat": 48.85888
      },
      "confidenceValue": 0.28927187521472786,
      "distanceFromRequest": 20.96,
      "polylineIndex": -1,
      "duration": 92,
      "length": 330
    },
    {
      "inputOrder": 4,
      "used": true,
      "usedOrder": 4,
      "matchedCoordinateGps": {
        "lon": 2.3632036770414344,
        "lat": 48.859815
      },
      "confidenceValue": 0.4585633810385473,
      "distanceFromRequest": 38.11,
      "polylineIndex": -1,
      "duration": 212,
      "length": 770
    },
    {
      "inputOrder": 5,
      "used": true,
      "usedOrder": 5,
      "matchedCoordinateGps": {
        "lon": 2.3640594759297437,
        "lat": 48.86009
      },
      "confidenceValue": 0.6287187675009722,
      "distanceFromRequest": 10.92,
      "polylineIndex": -1,
      "duration": 254,
      "length": 878
    },
    {
      "inputOrder": 6,
      "used": true,
      "usedOrder": 6,
      "matchedCoordinateGps": {
        "lon": 2.36456,
        "lat": 48.86013
      },
      "confidenceValue": 0.23113073511408522,
      "distanceFromRequest": 52.3,
      "polylineIndex": -1,
      "duration": 274,
      "length": 940
    },
    {
      "inputOrder": 7,
      "used": true,
      "usedOrder": 7,
      "matchedCoordinateGps": {
        "lon": 2.3660428283122403,
        "lat": 48.86114125
      },
      "confidenceValue": 0.85,
      "distanceFromRequest": 16.03,
      "polylineIndex": -1,
      "duration": 394,
      "length": 1342
    },
    {
      "inputOrder": 8,
      "used": true,
      "usedOrder": 8,
      "matchedCoordinateGps": {
        "lon": 2.3669423826336007,
        "lat": 48.861375
      },
      "confidenceValue": 0.23983956831897124,
      "distanceFromRequest": 14.54,
      "polylineIndex": -1,
      "duration": 501,
      "length": 1656
    },
    {
      "inputOrder": 9,
      "used": true,
      "usedOrder": 9,
      "matchedCoordinateGps": {
        "lon": 2.3679160573446674,
        "lat": 48.86215125
      },
      "confidenceValue": 0.35939913638776866,
      "distanceFromRequest": 17.92,
      "polylineIndex": -1,
      "duration": 567,
      "length": 1938
    }
  ],
  "routingRoutes": [
    {
      "length": 1938,
      "duration": 567,
      "trafficDelay": 0,
      "averageSpeed": 12.304762,
      "maximumSpeed": 0,
      "startUTurnThreshold": 3000,
      "startStopInfo": {
        "start": {
          "lon": 2.36002,
          "lat": 48.85802
        },
        "stop": {
          "lon": 2.36792,
          "lat": 48.86215
        },
        "distanceFirstMatched": 0.56,
        "distanceLastMatched": 0.14,
        "interDests": null
      },
      "waypoints": [
        {
          "usedDestinationIndex": 1,
          "polylineIndex": -1,
          "coordinate": {
            "lon": 2.360015114939581,
            "lat": 48.858015
          },
          "angle": 126,
          "radius": 0,
          "uturn": false,
          "ignorePoint": false,
          "ignoreTrafficDirections": true,
          "ignoreRoadBlocks": true,
          "ignoreRestrictions": true,
          "avoidUTurn": "UNDEF",
          "useStartAngle": "UNDEF",
          "useStopRoadSide": "UNDEF"
        },
        {
          "usedDestinationIndex": 2,
          "polylineIndex": -1,
          "coordinate": {
            "lon": 2.361159644312669,
            "lat": 48.8586675
          },
          "angle": 122,
          "radius": 0,
          "uturn": true,
          "ignorePoint": false,
          "ignoreTrafficDirections": false,
          "ignoreRoadBlocks": false,
          "ignoreRestrictions": false,
          "avoidUTurn": "UNDEF",
          "useStartAngle": "UNDEF",
          "useStopRoadSide": "UNDEF"
        },
        {
          "usedDestinationIndex": 3,
          "polylineIndex": -1,
          "coordinate": {
            "lon": 2.3622205992189427,
            "lat": 48.85888
          },
          "angle": 39,
          "radius": 0,
          "uturn": false,
          "ignorePoint": false,
          "ignoreTrafficDirections": true,
          "ignoreRoadBlocks": true,
          "ignoreRestrictions": true,
          "avoidUTurn": "UNDEF",
          "useStartAngle": "UNDEF",
          "useStopRoadSide": "UNDEF"
        },
        {
          "usedDestinationIndex": 4,
          "polylineIndex": -1,
          "coordinate": {
            "lon": 2.3632036770414344,
            "lat": 48.859815
          },
          "angle": 293,
          "radius": 0,
          "uturn": false,
          "ignorePoint": false,
          "ignoreTrafficDirections": false,
          "ignoreRoadBlocks": false,
          "ignoreRestrictions": false,
          "avoidUTurn": "UNDEF",
          "useStartAngle": "UNDEF",
          "useStopRoadSide": "UNDEF"
        },
        {
          "usedDestinationIndex": 5,
          "polylineIndex": -1,
          "coordinate": {
            "lon": 2.3640594759297437,
            "lat": 48.86009
          },
          "angle": 115,
          "radius": 0,
          "uturn": false,
          "ignorePoint": false,
          "ignoreTrafficDirections": false,
          "ignoreRoadBlocks": false,
          "ignoreRestrictions": false,
          "avoidUTurn": "UNDEF",
          "useStartAngle": "UNDEF",
          "useStopRoadSide": "UNDEF"
        },
        {
          "usedDestinationIndex": 6,
          "polylineIndex": -1,
          "coordinate": {
            "lon": 2.36456,
            "lat": 48.86013
          },
          "angle": 0,
          "radius": 0,
          "uturn": false,
          "ignorePoint": false,
          "ignoreTrafficDirections": false,
          "ignoreRoadBlocks": false,
          "ignoreRestrictions": false,
          "avoidUTurn": "UNDEF",
          "useStartAngle": "UNDEF",
          "useStopRoadSide": "UNDEF"
        },
        {
          "usedDestinationIndex": 7,
          "polylineIndex": -1,
          "coordinate": {
            "lon": 2.3660428283122403,
            "lat": 48.86114125
          },
          "angle": 282,
          "radius": 0,
          "uturn": false,
          "ignorePoint": false,
          "ignoreTrafficDirections": false,
          "ignoreRoadBlocks": false,
          "ignoreRestrictions": false,
          "avoidUTurn": "UNDEF",
          "useStartAngle": "UNDEF",
          "useStopRoadSide": "UNDEF"
        },
        {
          "usedDestinationIndex": 8,
          "polylineIndex": -1,
          "coordinate": {
            "lon": 2.3669423826336007,
            "lat": 48.861375
          },
          "angle": 106,
          "radius": 0,
          "uturn": false,
          "ignorePoint": false,
          "ignoreTrafficDirections": false,
          "ignoreRoadBlocks": false,
          "ignoreRestrictions": false,
          "avoidUTurn": "UNDEF",
          "useStartAngle": "UNDEF",
          "useStopRoadSide": "UNDEF"
        },
        {
          "usedDestinationIndex": 9,
          "polylineIndex": -1,
          "coordinate": {
            "lon": 2.3679160573446674,
            "lat": 48.86215125
          },
          "angle": 70,
          "radius": 0,
          "uturn": false,
          "ignorePoint": false,
          "ignoreTrafficDirections": false,
          "ignoreRoadBlocks": false,
          "ignoreRestrictions": false,
          "avoidUTurn": "UNDEF",
          "useStartAngle": "UNDEF",
          "useStopRoadSide": "UNDEF"
        }
      ]
    }
  ]
}
```
> ✅ Forces the API to keep all waypoints marked as `keptByMinimalWp: true` in the final result, instead of reducing to a minimal list.
---
<a name="traceroute_offroads_tutorial"></a>
## 🛤 OFFROADS – Return off-road polylines in waypoints
✅ **Use case**

You want to **identify off-road segments** between GPS points that **do not align perfectly with the road network**. This is useful when working with noisy GPS traces, or to detect areas without mapped roads (e.g. private roads, parking areas, tunnels).

💡 **What it does**

When enabled, the API adds an **offRoad** polyline to each relevant **waypoint** in the response.
This polyline connects the original GPS point to the **closest projected point on the road network**.

> 🧩 This is a **sub-option** of the `WAYPOINTS` option. It has **no effect** unless `WAYPOINTS` is also included.

Each `offRoad` field in the response is a simple array of two points:

The original GPS position

The snapped position on the road

🔧 **How to enable**

Add both `WAYPOINTS` and `OFFROADS` to the `options` array in your TraceRoute request.
```
"options": ["WAYPOINTS", "OFFROADS"]
```
📦 **Example**
```
{
  "destinations": [
    {
      "coordinateSat": {
        "lon": 2.3470,
        "lat": 48.8540,
        "speed": 25.0,
        "time": 1720519200000
      }
    },
    {
      "coordinateSat": {
        "lon": 2.3499,
        "lat": 48.8582,
        "speed": 32.0,
        "time": 1720519260000
      }
    }
  ],
  "routingVehicleProfile": {
    "transportMode": "CAR",
    "routingVehicleFeature": {
      "height": 150,
      "width": 50,
      "length": 420,
      "weight": 1400
    }
  },
  "options": ["WAYPOINTS", "OFFROADS"]
}
```
**Response**
```
{
  "usedDestinations": [
    {
      "inputOrder": 0,
      "used": false,
      "usedOrder": 0,
      "confidenceValue": 0,
      "distanceFromRequest": 0,
      "polylineIndex": -1,
      "duration": -1,
      "length": -1
    },
    {
      "inputOrder": 1,
      "used": true,
      "usedOrder": 1,
      "matchedCoordinateGps": {
        "lon": 2.3497536142612003,
        "lat": 48.8579925
      },
      "confidenceValue": 0.3062559241706161,
      "distanceFromRequest": 25.47,
      "polylineIndex": -1,
      "duration": -1,
      "length": -1
    }
  ],
  "routingRoutes": []
}
```
---
<a name="traceroute_offroads_rawData_tutorial"></a>
## 🧪 OFFROADS_RAWDATA – Include raw map attributes for off-road segments
✅ **Use case**

You want **detailed map information** about the **off-road segments** (e.g. which road type it snapped to, surface type, etc.).
This is particularly useful for **debugging**, **analysis**, or building advanced visualizations.

💡 **What it does**

When enabled, the API includes **raw map attributes** in the `offRoadRawData` field for each `waypoint` that contains an `offRoad` segment.
These attributes reflect native metadata from the matched road segment, such as:

- Road classification
- Surface type
- Speed limit
- Access restrictions

> 🧩 This is a **sub-option** of `OFFROADS`, and has **no effect** unless `OFFROADS` is also present.

🔧 **How to enable**

Add the options `WAYPOINTS`, `OFFROADS` and `OFFROADS_RAWDATA` in your TraceRoute request.
```
"options": ["WAYPOINTS", "OFFROADS", "OFFROADS_RAWDATA"]
```
📦 **Example**
```
{
  "destinations": [
    {
      "coordinateSat": {
        "lon": 2.347,
        "lat": 48.854,
        "speed": 28.5,
        "time": 1720519200000
      }
    },
    {
      "coordinateSat": {
        "lon": 2.3499,
        "lat": 48.8582,
        "speed": 30.2,
        "time": 1720519260000
      }
    }
  ],
  "routingVehicleProfile": {
    "transportMode": "CAR",
    "routingVehicleFeature": {
      "height": 150,
      "width": 50,
      "length": 420,
      "weight": 1400
    }
  },
  "options": ["WAYPOINTS", "OFFROADS", "OFFROADS_RAWDATA"]
}
```
**Response**
```
{
  "usedDestinations": [
    {
      "inputOrder": 0,
      "used": false,
      "usedOrder": 0,
      "confidenceValue": 0,
      "distanceFromRequest": 0,
      "polylineIndex": -1,
      "duration": -1,
      "length": -1
    },
    {
      "inputOrder": 1,
      "used": true,
      "usedOrder": 1,
      "matchedCoordinateGps": {
        "lon": 2.3497536142612003,
        "lat": 48.8579925
      },
      "confidenceValue": 0.3062559241706161,
      "distanceFromRequest": 25.47,
      "polylineIndex": -1,
      "duration": -1,
      "length": -1
    }
  ],
  "routingRoutes": []
}
```
> ✅ Adds `offRoadRawData` alongside each `offRoad` segment, giving access to native road metadata for advanced inspection.
---
<a name="traceroute_openlr_tutorial"></a>
## 🛰️ OPENLR – Encode the route geometry in OpenLR format
✅ **Use case**

You want to share or store the **route geometry** in a **compact**, **interoperable format**, especially for use with systems or tools supporting **OpenLR** (like navigation SDKs, traffic systems, etc.).

💡 **What it does**

When this option is enabled, the API attempts to encode the route's geometry into an **OpenLR base64 string**, and includes it in the response under the field `openlr`.

- OpenLR is a location referencing standard designed for compact binary representation.
- The encoding may **fail** for certain types of routes (e.g. **U-turns** or geometries with high ambiguity), in which case the `openlr` field will be **absent**.

🔧 **How to enable**

Add `OPENLR` to the `options` array in your TraceRoute request.
```
"options": ["OPENLR"]
```
📦 **Example**
```
{
  "routingVehicleProfile": {
    "transportMode": "CAR",
    "routingVehicleFeature": {
      "height": 150,
      "width": 50,
      "length": 420,
      "weight": 1400
    }
  },
  "options": ["OPENLR", "POLYLINE"],
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
> ✅ Adds an openlr field in the response with a base64-encoded representation of the route geometry.<br>
> ⚠️ May be missing if encoding is not possible (e.g. U-turns).
---
<a name="traceroute_polyline_tutorial"></a>
## 🧩 POLYLINE – Return the route geometry as a polyline
✅ **Use case**

You want to visualize the full geometry of the matched route on a map using a compact and standard format like an encoded polyline.

💡 **What it does**

When the `POLYLINE` option is enabled, the response includes an additional `polyline` field that contains the encoded geometry of the route. This is useful for displaying the route on a frontend map or storing it efficiently.

🔧 **How to enable**

Add `POLYLINE` to the `options` array of your TraceRoute request.
```
"options": ["POLYLINE"]
```

📦 **Example**
```
{
  "routingVehicleProfile": {
    "transportMode": "CAR",
    "routingVehicleFeature": {
      "height": 150,
      "width": 50,
      "length": 420,
      "weight": 1400
    }
  },
  "options": ["POLYLINE"],
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
> ✅ Returns a polyline field in the response for efficient geometry rendering on maps.
---
<a name="traceroute_revgeoPostalAddress_tutorial"></a>
## 🧩 REVGEO_POSTAL_ADDRESS – Return postal addresses of matched coordinates
✅ **Use case**

You want to retrieve the postal address (street name, number, city, zip code, etc.) corresponding to each matched GPS coordinate in your TraceRoute request.

💡 **What it does**

When this option is enabled, the API performs a reverse geocoding on each matched coordinate and returns detailed postal address information. This is useful for displaying contextual data like start and end addresses or logging route steps.

🔧 **How to enable**

Add `REVGEO_POSTAL_ADDRESS` to the `options` array in your TraceRoute request.
```
"options": ["REVGEO_POSTAL_ADDRESS"]
```
📦 **Example**
```
{
  "routingVehicleProfile": {
    "transportMode": "CAR",
    "routingVehicleFeature": {
      "height": 160,
      "width": 55,
      "length": 450,
      "weight": 1300
    }
  },
  "options": ["REVGEO_POSTAL_ADDRESS", "POLYLINE"],
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
      "matchedPostalAddress": {
        "countryCode": "FRA",
        "country": "France",
        "state": "Provence-Alpes-Côte d'Azur",
        "county": "Alpes-Maritimes",
        "city": "Biot",
        "postalCode": "06410",
        "roadNumber": "",
        "street": "Rue Fernand Léger"
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
      "matchedPostalAddress": {
        "countryCode": "FRA",
        "country": "France",
        "state": "Provence-Alpes-Côte d'Azur",
        "county": "Alpes-Maritimes",
        "city": "Biot",
        "postalCode": "06410",
        "roadNumber": "D504",
        "street": "Route des Lucioles",
        "streetNumber": "1990"
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
      "matchedPostalAddress": {
        "countryCode": "FRA",
        "country": "France",
        "state": "Provence-Alpes-Côte d'Azur",
        "county": "Alpes-Maritimes",
        "city": "Biot",
        "postalCode": "06410",
        "roadNumber": "D504",
        "street": "Route des Colles",
        "streetNumber": "930"
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
      "matchedPostalAddress": {
        "countryCode": "FRA",
        "country": "France",
        "state": "Provence-Alpes-Côte d'Azur",
        "county": "Alpes-Maritimes",
        "city": "Biot",
        "postalCode": "06410",
        "roadNumber": "D535",
        "street": "Route des Chappes"
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
      "matchedPostalAddress": {
        "countryCode": "FRA",
        "country": "France",
        "state": "Provence-Alpes-Côte d'Azur",
        "county": "Alpes-Maritimes",
        "city": "Biot",
        "postalCode": "06410",
        "roadNumber": "",
        "street": ""
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
      "matchedPostalAddress": {
        "countryCode": "FRA",
        "country": "France",
        "state": "Provence-Alpes-Côte d'Azur",
        "county": "Alpes-Maritimes",
        "city": "Biot",
        "postalCode": "06410",
        "roadNumber": "",
        "street": ""
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
      "matchedPostalAddress": {
        "countryCode": "FRA",
        "country": "France",
        "state": "Provence-Alpes-Côte d'Azur",
        "county": "Alpes-Maritimes",
        "city": "Biot",
        "postalCode": "06410",
        "roadNumber": "",
        "street": "Allée Charles-Victor Naudin",
        "streetNumber": "5"
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
      "matchedPostalAddress": {
        "countryCode": "FRA",
        "country": "France",
        "state": "Provence-Alpes-Côte d'Azur",
        "county": "Alpes-Maritimes",
        "city": "Biot",
        "postalCode": "06410",
        "roadNumber": "",
        "street": "Allée Charles-Victor Naudin",
        "streetNumber": "1"
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
      "matchedPostalAddress": {
        "countryCode": "FRA",
        "country": "France",
        "state": "Provence-Alpes-Côte d'Azur",
        "county": "Alpes-Maritimes",
        "city": "Biot",
        "postalCode": "06410",
        "roadNumber": "",
        "street": "Allée Charles-Victor Naudin",
        "streetNumber": "1"
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
      "matchedPostalAddress": {
        "countryCode": "",
        "postalCode": "",
        "roadNumber": "",
        "street": ""
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
      "matchedPostalAddress": {
        "countryCode": "",
        "postalCode": "",
        "roadNumber": "",
        "street": ""
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
      "matchedPostalAddress": {
        "countryCode": "",
        "postalCode": "",
        "roadNumber": "",
        "street": ""
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
> ✅ Returns a `postalAddress` field for each matched coordinate in the response, useful for displaying or logging real-world addresses.
---
<a name="traceroute_routeSheet_tutorial"></a>
## 🧩 ROUTESHEET – Return a human-readable route sheet
✅ **Use case**

You want to generate a **turn-by-turn route sheet** (like a roadbook) summarizing the key maneuvers of the itinerary, including distance, direction, and road names.

💡 **What it does**

When this option is enabled, the API returns a `routeSheet` field in the response. It contains a *list of driving instructions** extracted from the route geometry and enriched with street names, distances, and directions (e.g., "Turn right onto Avenue de la République").

This is useful for:

- displaying navigation steps to the user
- exporting simplified navigation instructions
- integrating with map-based route viewers

🔧 **How to enable**

Add `ROUTESHEET` to the `options` array in your TraceRoute request.
```
"options": ["ROUTESHEET", "POLYLINE"]
```
📦 **Example**
```
{
  "routingVehicleProfile": {
    "transportMode": "CAR",
    "routingVehicleFeature": {
      "height": 160,
      "width": 55,
      "length": 450,
      "weight": 1300
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
> ✅ Returns a `routeSheet` list containing detailed instructions like "Turn left", "Continue on Rue de Rivoli", etc., for each maneuver.
---
<a name="traceroute_routeSheet_Verbose_high_tutorial"></a>
## 🧩 ROUTESHEET_VERBOSE_HIGH – Enable highly detailed route sheet
✅ **Use case**

You need a **very detailed route sheet** with extra information for each instruction (e.g., road classifications, more descriptive steps, segment info). Ideal for:

- advanced navigation systems,
- printing exhaustive roadbooks,
- precise driving analysis.

💡 **What it does**

This option increases the verbosity of the route sheet returned when `ROUTESHEET` is active. Each instruction includes **additional metadata**, such as:

- functional road class (FRC),
- road type,
- extended descriptions.

This option is only effective when `ROUTESHEET` is already enabled.

🔧 **How to enable**

Add both `ROUTESHEET` and `ROUTESHEET_VERBOSE_HIGH` to the `options` array in your request.
```
"options": ["ROUTESHEET", "ROUTESHEET_VERBOSE_HIGH"]
```
📦 **Example**
```
{
  "routingVehicleProfile": {
    "transportMode": "CAR",
    "routingVehicleFeature": {
      "height": 160,
      "width": 55,
      "length": 450,
      "weight": 1300
    }
  },
  "options": ["ROUTESHEET", "ROUTESHEET_VERBOSE_HIGH", "POLYLINE"],
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
          "type": "FOLLOW",
          "geoElementType": "ROAD",
          "length": 20,
          "duration": 3,
          "fromName": "Route des Lucioles",
          "manoeuvre": "STRAIGHT",
          "coordinate": {
            "lon": 7.06627,
            "lat": 43.61621
          },
          "roundAboutExitNumber": 0,
          "toName": "Route des Lucioles",
          "toOn": "Route des Lucioles",
          "toRn": "D504",
          "textDist": "At 20 meters",
          "text": "From Route des Lucioles straight on Route des Lucioles"
        },
        {
          "type": "FOLLOW",
          "geoElementType": "ROAD",
          "length": 34,
          "duration": 4,
          "fromName": "Route des Lucioles",
          "manoeuvre": "STRAIGHT",
          "coordinate": {
            "lon": 7.06668,
            "lat": 43.6162
          },
          "roundAboutExitNumber": 0,
          "toName": "Route des Lucioles",
          "toOn": "Route des Lucioles",
          "toRn": "D504",
          "textDist": "At 34 meters",
          "text": "From Route des Lucioles straight on Route des Lucioles"
        },
        {
          "type": "ENTER_ROUNDABOUT",
          "geoElementType": "ROAD",
          "length": 334,
          "duration": 31,
          "fromName": "Route des Lucioles",
          "manoeuvre": "RIGHT",
          "coordinate": {
            "lon": 7.07047,
            "lat": 43.61731
          },
          "roundAboutExitNumber": 2,
          "toName": "Carrefour du Golf",
          "toOn": "Carrefour du Golf",
          "textDist": "At 334 meters"
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
          "length": 110,
          "duration": 15,
          "fromName": "Allée Charles-Victor Naudin",
          "manoeuvre": "STRAIGHT",
          "coordinate": {
            "lon": 7.0802,
            "lat": 43.61231
          },
          "roundAboutExitNumber": 0,
          "toName": "Allée Charles-Victor Naudin",
          "toOn": "Allée Charles-Victor Naudin",
          "textDist": "At 110 meters",
          "text": "From Allée Charles-Victor Naudin straight on Allée Charles-Victor Naudin"
        },
        {
          "type": "FOLLOW",
          "geoElementType": "ROAD",
          "length": 28,
          "duration": 4,
          "fromName": "Allée Charles-Victor Naudin",
          "manoeuvre": "STRAIGHT",
          "coordinate": {
            "lon": 7.08043,
            "lat": 43.61213
          },
          "roundAboutExitNumber": 0,
          "toName": "Allée Charles-Victor Naudin",
          "toOn": "Allée Charles-Victor Naudin",
          "textDist": "At 28 meters",
          "text": "From Allée Charles-Victor Naudin straight on Allée Charles-Victor Naudin"
        },
        {
          "type": "FOLLOW",
          "geoElementType": "ROAD",
          "length": 12,
          "duration": 3,
          "fromName": "Allée Charles-Victor Naudin",
          "manoeuvre": "STRAIGHT",
          "coordinate": {
            "lon": 7.08055,
            "lat": 43.61206
          },
          "roundAboutExitNumber": 0,
          "toName": "Allée Charles-Victor Naudin",
          "toOn": "Allée Charles-Victor Naudin",
          "textDist": "At 12 meters",
          "text": "From Allée Charles-Victor Naudin straight on Allée Charles-Victor Naudin"
        },
        {
          "type": "FOLLOW",
          "geoElementType": "ROAD",
          "length": 66,
          "duration": 9,
          "fromName": "Allée Charles-Victor Naudin",
          "manoeuvre": "SHARP_LEFT",
          "coordinate": {
            "lon": 7.08118,
            "lat": 43.61169
          },
          "roundAboutExitNumber": 0,
          "textDist": "At 66 meters",
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
> ✅ Enhances the `routeSheet` with advanced descriptive fields such as road class, road type, and enriched maneuver labels.
---
<a name="traceroute_routeSheet_Verbose_Low_tutorial"></a>
## 🧩 ROUTESHEET_VERBOSE_LOW – Low verbosity for the route sheet
✅ **Use case**

You want to retrieve a **simple and minimal route sheet** for clear and concise navigation instructions. This is suitable for:

- basic navigation apps,

- user interfaces with limited space,

- users who only need turn-by-turn instructions without technical details.

💡 **What it does**

When this option is enabled:

- The route sheet includes only essential information (e.g., maneuver type, road name, distance).
- It excludes verbose metadata like road classification (FRC), road type, and internal navigation codes.
- This is the default verbosity level if none is explicitly defined.

> ✅ If you specify ROUTESHEET in the options and don’t add a verbosity level, this one is applied automatically.

🔧 **How to enable**

Add the following options to your request:
```
"options": ["ROUTESHEET", "ROUTESHEET_VERBOSE_LOW"]
```
📦 **Example**
```
{
  "routingVehicleProfile": {
    "transportMode": "CAR",
    "routingVehicleFeature": {
      "height": 160,
      "width": 55,
      "length": 450,
      "weight": 1300
    }
  },
  "options": ["ROUTESHEET", "ROUTESHEET_VERBOSE_LOW", "POLYLINE"],
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
***Response**
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
> ✅ Generates a clean, human-readable route sheet focused on navigation instructions only.
---
<a name="traceroute_routeSheet_Verbose_Medium_tutorial"></a>
## 🧩 ROUTESHEET_VERBOSE_MEDIUM – Medium verbosity for the route sheet
✅ **Use case**

You want a **moderately detailed route sheet** that includes clear navigation instructions along with extra metadata such as road types and classifications—more informative than the low verbosity level, but less technical than high verbosity.

This is suitable for:

- advanced user interfaces,
- route validation and diagnostics,
- in-vehicle systems needing contextual navigation data.

💡 **What it does**

When this option is enabled:

- The route sheet includes:

  - **road type** (motorway, secondary road, etc.),

  - **functional road class (FRC)**,

  - **maneuver type**,

  - **distance and duration** per step.

- It strikes a balance between clarity and technical detail.

⚠️ This option **must be used together** with `ROUTESHEET`.

🔧 **How to enable**

Add both of the following options in your request:
```
"options": ["ROUTESHEET", "ROUTESHEET_VERBOSE_MEDIUM"]
```

📦 **Example**
```
{
  "routingVehicleProfile": {
    "transportMode": "CAR",
    "routingVehicleFeature": {
      "height": 160,
      "width": 55,
      "length": 450,
      "weight": 1300
    }
  },
  "options": ["ROUTESHEET", "ROUTESHEET_VERBOSE_MEDIUM", "POLYLINE"],
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
**Reponse**
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
> ✅ Returns a route sheet with enriched context: maneuver types, functional road class, road types, and timing data.
---
<a name="traceroute_segmentIDS_tutorial"></a>
## 🧩 SEGMENTIDS – Return segment IDs of the route
✅ **Use case**

You want to retrieve the **internal segment identifiers** used by the map engine to represent each portion of the route. This is helpful for:

- Debugging or analytics,
- Matching against your own map database,
- Post-processing or route indexing,
- Building segment-based routing logic or overlays.

💡 **What it does**

When enabled, the response will contain a list of **segment IDs** (`segmentIds` array) corresponding to each portion of the itinerary.

Each ID is a unique reference for a map segment used during route calculation.

> ⚠️ These IDs are **internal and opaque**; they are useful only in the context of advanced features or integration with compatible map data.

🔧 **How to enable**

Add the `SEGMENTIDS` option to the `options` array in your routing request:
```
"options": ["SEGMENTIDS"]
```
📦 **Example**
```
{
  "routingVehicleProfile": {
    "transportMode": "CAR",
    "routingVehicleFeature": {
      "height": 160,
      "width": 55,
      "length": 450,
      "weight": 1300
    }
  },
  "options": ["SEGMENTIDS"],
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
> ✅ Returns a list of segment IDs used for each portion of the route, available in the `segmentIds` field of the response.
---
<a name="traceroute_used_destinations_off_tutorial"></a>
## 🧩 USED_DESTINATIONS_OFF – Disable used destinations list in response
✅ **Use case**

You want to **reduce the size** of the response or you don't need the `usedDestinations` field, which normally lists the destinations effectively matched to the route.

Useful when:

- You're only interested in the route geometry or travel times.
- You want to optimize bandwidth for mobile or embedded devices.
- You're sending a large number of coordinates and don’t want the server to echo them back.

💡 **What it does**

By default, the TraceRoute response includes a `usedDestinations` array that confirms which coordinates were used in route computation after internal simplification.

When the `USED_DESTINATIONS_OFF` option is added, this list is omitted from the response entirely.

🔧 **How to enable**

Add `USED_DESTINATIONS_OFF` to the `options` array of your request.
```
"options": ["USED_DESTINATIONS_OFF"]
```
📦 **Example**
```
{
  "routingVehicleProfile": {
    "transportMode": "CAR",
    "routingVehicleFeature": {
      "height": 160,
      "width": 55,
      "length": 450,
      "weight": 1300
    }
  },
  "options": ["USED_DESTINATIONS_OFF", "POLYLINE"],
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
  "routingRoutes": [
    {
      "length": 2180,
      "duration": 251,
      "trafficDelay": 0,
      "averageSpeed": 31.266932,
      "maximumSpeed": 0,
      "startUTurnThreshold": 3000,
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
<a name="traceroute_waypoints_tutorial"></a>
## 🧩 WAYPOINTS – Return waypoints of the itinerary
✅ **Use case**

You want to **reconstruct the route later** or send it to another device/server for **precise reproduction** of the calculated path.

Useful when:

- You want to cache and reuse a route.
- You need to analyze key points of the route, including geometry and transitions.
- You plan to visualize or simulate the route elsewhere (e.g. navigation system, custom playback).

💡 **What it does**

When enabled, the API returns a `waypoints` array containing critical points used to form the computed route. Each waypoint includes metadata such as:

- Coordinates
- Distance from origin
- Duration
- Off-road info (if enabled via `OFFROADS`)
- Segment linkage

These are minimal yet sufficient to reproduce the full route on another system.

🔧 **How to enable**

Add `WAYPOINTS` to the `options` array in your routing request:
```
"options": ["WAYPOINTS"]
```
📦 **Example**
```
{
  "routingVehicleProfile": {
    "transportMode": "CAR",
    "routingVehicleFeature": {
      "height": 160,
      "width": 55,
      "length": 450,
      "weight": 1300
    }
  },
  "options": ["WAYPOINTS", "POLYLINE"],
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
> ✅ Returns minimal but complete waypoint list to reconstruct the route on another device.
---
## 🧭 WAYPOINTS_POLYLINE – Include Waypoint Coordinates in the Polyline
Returns the polyline of the route, enhanced with the **waypoint coordinates**.

✅ **Use case**

You want a single polyline that contains **both the route geometry and the precise waypoints** used in the computation.
This is useful to:

- Visualize or export the route **including key GPS points**
- Perform replay or synchronization between systems
- Ensure all important locations (e.g., stops) are reflected in the geometry

💡 **What it does**

When this option is enabled, the API appends the **waypoints** directly in the encoded polyline response.
Waypoints include additional attributes such as time, heading, and speed, if provided.

This is especially relevant if you combine:

- `WAYPOINTS` → returns the full list of waypoint objects
- `WAYPOINTS_POLYLINE` → returns the geometry with those waypoints inside the polyline

🔧 How to enable

Add the following option to your request:
```
"options": ["WAYPOINTS_POLYLINE"]
```
**Example**
```
{
  "routingVehicleProfile": {
    "transportMode": "CAR"
  },
  "options": ["WAYPOINTS", "WAYPOINTS_POLYLINE"],
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
      "waypointPolylineIndex": 0,
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
      "waypointPolylineIndex": 74,
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
      "waypointPolylineIndex": 80,
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
      "boundingBox": {
        "minLon": 7.06587,
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
      "waypoints": [
        {
          "usedDestinationIndex": 0,
          "polylineIndex": 0,
          "waypointPolylineIndex": 0,
          "coordinate": {
            "lon": 7.065868896076493,
            "lat": 43.616005
          },
          "angle": 5,
          "radius": 0,
          "uturn": false,
          "ignorePoint": false,
          "ignoreTrafficDirections": false,
          "ignoreRoadBlocks": false,
          "ignoreRestrictions": false,
          "avoidUTurn": "UNDEF",
          "useStartAngle": "UNDEF",
          "useStopRoadSide": "UNDEF"
        },
        {
          "usedDestinationIndex": 6,
          "polylineIndex": 74,
          "waypointPolylineIndex": 74,
          "coordinate": {
            "lon": 7.07938069386973,
            "lat": 43.61286125
          },
          "angle": 133,
          "radius": 0,
          "uturn": false,
          "ignorePoint": false,
          "ignoreTrafficDirections": false,
          "ignoreRoadBlocks": false,
          "ignoreRestrictions": false,
          "avoidUTurn": "YES",
          "useStartAngle": "YES",
          "useStopRoadSide": "UNDEF"
        },
        {
          "usedDestinationIndex": 7,
          "polylineIndex": 80,
          "waypointPolylineIndex": 80,
          "coordinate": {
            "lon": 7.08118,
            "lat": 43.61169
          },
          "angle": 299,
          "radius": 0,
          "uturn": false,
          "ignorePoint": false,
          "ignoreTrafficDirections": false,
          "ignoreRoadBlocks": false,
          "ignoreRestrictions": false,
          "avoidUTurn": "UNDEF",
          "useStartAngle": "UNDEF",
          "useStopRoadSide": "UNDEF"
        }
      ],
      "waypointPolyline": [
        {
          "lon": 7.06587,
          "lat": 43.61601
        },
        {
          "lon": 7.06588,
          "lat": 43.6161
        },
```