<a name="traceroute_parameters_tutorial"></a>
# 🛠️ TraceRoute – options Parameter
The `options` array in the TraceRoute API allows you to customize the output content and format of the route calculation. Each value in the array activates a specific feature or additional result in the response.

This tutorial explains the purpose and effect of each option, when to use them, and provides examples of how to include them in your request.

> ℹ️ In the examples' `routingVehicleFeature`, `height`, `width` and `length` are in centimetres and `weight` in tenths of a tonne: `15` = 1.5 t. The specification describes `weight` as "in tens of metric tons", which its own example (`35` = 3.5t) contradicts: one unit is 100 kg.<br>
> ℹ️ The sample responses were measured on production on 29 September 2026. A response marked *truncated* shows only the first entries of its long arrays (`polyline`, `waypointPolyline`, `segmentIds`).
---
<a name="traceroute_energyConsumption_tutorial"></a>
## ⚡ ENERGY_CONSUMPTION – Estimate energy usage along the route
✅ **Use case**

You want to retrieve an **energy consumption estimate** for the route, based on your vehicle’s energy characteristics (like battery, weight, aerodynamic profile, etc.).

💡 **What it does**

When this option is set, the API returns a `energyConsumption` field in the response (`routingRoutes[].energyConsumption`), representing the **estimated energy usage** in kilowatt-hours (kWh) across the entire route: one total per route.
This helps assess whether a full trip is feasible with the current battery or if charging stops are needed.
For per-segment data, use `EVENT` with `EVT_ENERGY_CONSUMPTION_SAMPLE` instead: the route's `events` then carry an energy sample for each second of travel (`distFromStart`, `speed`, `cumulativeConsumption` in Wh, …).

> ⚠️ This option **requires** a `routingEnergyVehicleFeature` block in your `routingVehicleProfile`. If it's missing, the request fails: `400` EnergyVehicleFeatureIsRequiredException, *"Energy vehicle feature (evf) is required!"* — `evf` is `routingVehicleProfile.routingEnergyVehicleFeature`.

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
      "used": true,
      "usedOrder": 0,
      "matchedCoordinateGps": {
        "lon": 2.36001722786005,
        "lat": 48.85801580258289
      },
      "confidenceValue": 1,
      "distanceFromRequest": 969.03,
      "polylineIndex": -1,
      "duration": -1,
      "length": -1
    },
    {
      "inputOrder": 1,
      "used": true,
      "usedOrder": 1,
      "matchedCoordinateGps": {
        "lon": 2.36001722786005,
        "lat": 48.85801580258289
      },
      "confidenceValue": 1,
      "distanceFromRequest": 2.17,
      "polylineIndex": -1,
      "duration": 154,
      "length": 995
    },
    {
      "inputOrder": 2,
      "used": true,
      "usedOrder": 2,
      "matchedCoordinateGps": {
        "lon": 2.3609937107500247,
        "lat": 48.858505460373934
      },
      "confidenceValue": 1,
      "distanceFromRequest": 0.76,
      "polylineIndex": -1,
      "duration": 201,
      "length": 1192
    },
    {
      "inputOrder": 3,
      "used": true,
      "usedOrder": 3,
      "matchedCoordinateGps": {
        "lon": 2.3619947588918433,
        "lat": 48.859004550278456
      },
      "confidenceValue": 1,
      "distanceFromRequest": 0.51,
      "polylineIndex": -1,
      "duration": 201,
      "length": 1192
    },
    {
      "inputOrder": 4,
      "used": true,
      "usedOrder": 4,
      "matchedCoordinateGps": {
        "lon": 2.362995807060262,
        "lat": 48.85950364019624
      },
      "confidenceValue": 1,
      "distanceFromRequest": 0.41,
      "polylineIndex": -1,
      "duration": 201,
      "length": 1192
    },
    {
      "inputOrder": 5,
      "used": true,
      "usedOrder": 5,
      "matchedCoordinateGps": {
        "lon": 2.363996855255285,
        "lat": 48.860002730127285
      },
      "confidenceValue": 1,
      "distanceFromRequest": 0.3,
      "polylineIndex": -1,
      "duration": 201,
      "length": 1192
    },
    {
      "inputOrder": 6,
      "used": true,
      "usedOrder": 6,
      "matchedCoordinateGps": {
        "lon": 2.3649979034769153,
        "lat": 48.86050182007159
      },
      "confidenceValue": 1,
      "distanceFromRequest": 0.2,
      "polylineIndex": -1,
      "duration": 201,
      "length": 1192
    },
    {
      "inputOrder": 7,
      "used": true,
      "usedOrder": 7,
      "matchedCoordinateGps": {
        "lon": 2.365998951725154,
        "lat": 48.86100091002916
      },
      "confidenceValue": 1,
      "distanceFromRequest": 0.1,
      "polylineIndex": -1,
      "duration": 201,
      "length": 1192
    },
    {
      "inputOrder": 8,
      "used": true,
      "usedOrder": 8,
      "matchedCoordinateGps": {
        "lon": 2.36749,
        "lat": 48.86206
      },
      "confidenceValue": 0.1968614245545751,
      "distanceFromRequest": 71.93,
      "polylineIndex": -1,
      "duration": 239,
      "length": 1420
    },
    {
      "inputOrder": 9,
      "used": true,
      "usedOrder": 9,
      "matchedCoordinateGps": {
        "lon": 2.3679173893538783,
        "lat": 48.86215096063645
      },
      "confidenceValue": 0.5678124559548752,
      "distanceFromRequest": 17.86,
      "polylineIndex": -1,
      "duration": 255,
      "length": 1453
    },
    {
      "inputOrder": 10,
      "used": true,
      "usedOrder": 10,
      "matchedCoordinateGps": {
        "lon": 2.3690321483893246,
        "lat": 48.862448723191
      },
      "confidenceValue": 1,
      "distanceFromRequest": 6.17,
      "polylineIndex": -1,
      "duration": 287,
      "length": 1541
    },
    {
      "inputOrder": 11,
      "used": true,
      "usedOrder": 11,
      "matchedCoordinateGps": {
        "lon": 2.3701553973913443,
        "lat": 48.862751840889665
      },
      "confidenceValue": 1,
      "distanceFromRequest": 29.88,
      "polylineIndex": -1,
      "duration": 319,
      "length": 1630
    }
  ],
  "routingRoutes": [
    {
      "length": 1630,
      "duration": 319,
      "totalDuration": 319,
      "trafficDelay": 0,
      "departureTime": 1720519200,
      "arrivalTime": 1720519519,
      "averageSpeed": 18.394985,
      "maximumSpeed": 0,
      "startUTurnThreshold": 3000,
      "energyConsumption": 0.15027987828210332,
      "startStopInfo": {
        "start": {
          "lon": 2.36002,
          "lat": 48.85802
        },
        "stop": {
          "lon": 2.37016,
          "lat": 48.86275
        },
        "distanceFirstMatched": 0.47,
        "distanceLastMatched": 0.2,
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
This **"minimal waypoints" algorithm** keeps the response small.

Enabling `NO_MINIMAL_WAYPOINTS` disables this behavior:

🔁 **Every input coordinate** used by the service is returned in the `waypoints` array, with or without `keptByMinimalWp` (measured with the example below: 10 waypoints, 4 without the option),

📈 Resulting in faster processing (the minimal algorithm is skipped) and better fidelity when analyzing the full trace.

> ℹ️ This is a **sub-option** of the `WAYPOINTS` option.
It has no effect unless `WAYPOINTS` is also included.

> ℹ️ To keep only chosen points instead, leave `NO_MINIMAL_WAYPOINTS` out and set `"keptByMinimalWp": true` on those destinations: the minimal algorithm then keeps them in the `waypoints` array (measured on the Sophia Antipolis trace of the later sections: 3 waypoints, 4 with the flag on its fourth point).<br>
> ⚠️ Measured on production: when a flagged point is one the matcher skips (its waypoint shows `ignorePoint: true`), the whole request fails with `400` RouteNotFoundException, *"Route not found: Cannot perform the minimal way-points"*.

🔧 **How to enable**

Add both `WAYPOINTS` and `NO_MINIMAL_WAYPOINTS` to the options array in your TraceRoute request.
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
      "width": 180,
      "length": 450,
      "weight": 15
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
      }
    },
    {
      "coordinateSat": {
        "lon": 2.3600,
        "lat": 48.8580,
        "speed": 28.0,
        "time": 1720519260000
      }
    },
    {
      "coordinateSat": {
        "lon": 2.3610,
        "lat": 48.8585,
        "speed": 29.0,
        "time": 1720519320000
      }
    },
    {
      "coordinateSat": {
        "lon": 2.3620,
        "lat": 48.8590,
        "speed": 31.0,
        "time": 1720519380000
      }
    },
    {
      "coordinateSat": {
        "lon": 2.3630,
        "lat": 48.8595,
        "speed": 34.0,
        "time": 1720519440000
      }
    },
    {
      "coordinateSat": {
        "lon": 2.3640,
        "lat": 48.8600,
        "speed": 36.0,
        "time": 1720519500000
      }
    },
    {
      "coordinateSat": {
        "lon": 2.3650,
        "lat": 48.8605,
        "speed": 38.0,
        "time": 1720519560000
      }
    },
    {
      "coordinateSat": {
        "lon": 2.3660,
        "lat": 48.8610,
        "speed": 39.0,
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
        "speed": 32.0,
        "time": 1720519740000
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
        "lon": 2.36001722786005,
        "lat": 48.85801580258289
      },
      "confidenceValue": 1,
      "distanceFromRequest": 969.03,
      "polylineIndex": -1,
      "duration": -1,
      "length": -1
    },
    {
      "inputOrder": 1,
      "used": true,
      "usedOrder": 1,
      "matchedCoordinateGps": {
        "lon": 2.36001722786005,
        "lat": 48.85801580258289
      },
      "confidenceValue": 1,
      "distanceFromRequest": 2.17,
      "polylineIndex": -1,
      "duration": 154,
      "length": 995
    },
    {
      "inputOrder": 2,
      "used": true,
      "usedOrder": 2,
      "matchedCoordinateGps": {
        "lon": 2.3609937107500247,
        "lat": 48.858505460373934
      },
      "confidenceValue": 1,
      "distanceFromRequest": 0.76,
      "polylineIndex": -1,
      "duration": 201,
      "length": 1192
    },
    {
      "inputOrder": 3,
      "used": true,
      "usedOrder": 3,
      "matchedCoordinateGps": {
        "lon": 2.3619947588918433,
        "lat": 48.859004550278456
      },
      "confidenceValue": 1,
      "distanceFromRequest": 0.51,
      "polylineIndex": -1,
      "duration": 201,
      "length": 1192
    },
    {
      "inputOrder": 4,
      "used": true,
      "usedOrder": 4,
      "matchedCoordinateGps": {
        "lon": 2.362995807060262,
        "lat": 48.85950364019624
      },
      "confidenceValue": 1,
      "distanceFromRequest": 0.41,
      "polylineIndex": -1,
      "duration": 201,
      "length": 1192
    },
    {
      "inputOrder": 5,
      "used": true,
      "usedOrder": 5,
      "matchedCoordinateGps": {
        "lon": 2.363996855255285,
        "lat": 48.860002730127285
      },
      "confidenceValue": 1,
      "distanceFromRequest": 0.3,
      "polylineIndex": -1,
      "duration": 201,
      "length": 1192
    },
    {
      "inputOrder": 6,
      "used": true,
      "usedOrder": 6,
      "matchedCoordinateGps": {
        "lon": 2.3649979034769153,
        "lat": 48.86050182007159
      },
      "confidenceValue": 1,
      "distanceFromRequest": 0.2,
      "polylineIndex": -1,
      "duration": 201,
      "length": 1192
    },
    {
      "inputOrder": 7,
      "used": true,
      "usedOrder": 7,
      "matchedCoordinateGps": {
        "lon": 2.365998951725154,
        "lat": 48.86100091002916
      },
      "confidenceValue": 1,
      "distanceFromRequest": 0.1,
      "polylineIndex": -1,
      "duration": 201,
      "length": 1192
    },
    {
      "inputOrder": 8,
      "used": true,
      "usedOrder": 8,
      "matchedCoordinateGps": {
        "lon": 2.36749,
        "lat": 48.86206
      },
      "confidenceValue": 0.1968614245545751,
      "distanceFromRequest": 71.93,
      "polylineIndex": -1,
      "duration": 239,
      "length": 1420
    },
    {
      "inputOrder": 9,
      "used": true,
      "usedOrder": 9,
      "matchedCoordinateGps": {
        "lon": 2.3679173893538783,
        "lat": 48.86215096063645
      },
      "confidenceValue": 0.5678124559548752,
      "distanceFromRequest": 17.86,
      "polylineIndex": -1,
      "duration": 255,
      "length": 1453
    }
  ],
  "routingRoutes": [
    {
      "length": 1453,
      "duration": 255,
      "totalDuration": 255,
      "trafficDelay": 0,
      "departureTime": 1720519200,
      "arrivalTime": 1720519455,
      "averageSpeed": 20.512941,
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
        "distanceFirstMatched": 0.47,
        "distanceLastMatched": 0.11,
        "interDests": null
      },
      "waypoints": [
        {
          "usedDestinationIndex": 0,
          "polylineIndex": -1,
          "coordinate": {
            "lon": 2.36001722786005,
            "lat": 48.85801580258289
          },
          "angle": 126,
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
          "usedDestinationIndex": 1,
          "polylineIndex": -1,
          "coordinate": {
            "lon": 2.36001722786005,
            "lat": 48.85801580258289
          },
          "angle": 126,
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
          "usedDestinationIndex": 2,
          "polylineIndex": -1,
          "coordinate": {
            "lon": 2.3609937107500247,
            "lat": 48.858505460373934
          },
          "angle": 51,
          "radius": 0,
          "uturn": false,
          "ignorePoint": true,
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
            "lon": 2.3619947588918433,
            "lat": 48.859004550278456
          },
          "angle": 51,
          "radius": 0,
          "uturn": false,
          "ignorePoint": true,
          "ignoreTrafficDirections": false,
          "ignoreRoadBlocks": false,
          "ignoreRestrictions": false,
          "avoidUTurn": "UNDEF",
          "useStartAngle": "UNDEF",
          "useStopRoadSide": "UNDEF"
        },
        {
          "usedDestinationIndex": 4,
          "polylineIndex": -1,
          "coordinate": {
            "lon": 2.362995807060262,
            "lat": 48.85950364019624
          },
          "angle": 51,
          "radius": 0,
          "uturn": false,
          "ignorePoint": true,
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
            "lon": 2.363996855255285,
            "lat": 48.860002730127285
          },
          "angle": 51,
          "radius": 0,
          "uturn": false,
          "ignorePoint": true,
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
            "lon": 2.3649979034769153,
            "lat": 48.86050182007159
          },
          "angle": 51,
          "radius": 0,
          "uturn": false,
          "ignorePoint": true,
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
            "lon": 2.365998951725154,
            "lat": 48.86100091002916
          },
          "angle": 51,
          "radius": 0,
          "uturn": false,
          "ignorePoint": true,
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
            "lon": 2.36749,
            "lat": 48.86206
          },
          "angle": 75,
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
            "lon": 2.3679173893538783,
            "lat": 48.86215096063645
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
> ✅ Returns every waypoint of the trace in the `waypoints` array, instead of reducing to a minimal list.
---
<a name="traceroute_offroads_tutorial"></a>
## 🛤 OFFROADS – Return off-road polylines in waypoints
✅ **Use case**

You want to **identify off-road segments** between GPS points that **do not align perfectly with the road network**. This is useful when working with noisy GPS traces, or to detect areas without mapped roads (e.g. private roads, parking areas, tunnels).

💡 **What it does**

When enabled, the API adds an **offRoad** object to the **waypoint** after which the route leaves the road network — in the example below, a trace that ends inside the Jardin du Luxembourg, where the map has no road.
A GPS point close to a road is simply snapped onto it, and gets no `offRoad`.

> 🧩 This is a **sub-option** of the `WAYPOINTS` option. It has **no effect** unless `WAYPOINTS` is also included.<br>
> Off-road sections are created only while `allowOffRoad` is `true`, its default: with `false`, the example's last point is left unused and the route stops on the road (165 m instead of 381 m).

Each `offRoad` field in the response (`routingRoutes[].waypoints[].offRoad`) holds:

- `geometry`: the off-road section, an array of `{lon, lat}` coordinates from the point where the route leaves the road to the GPS points beyond it

- `attributes`: the map attributes of that section (`attributeCode`, `key`, `type`, `value`…), such as its `LENGTH` in metres

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
        "lon": 2.3404,
        "lat": 48.8476
      }
    },
    {
      "coordinateSat": {
        "lon": 2.3400,
        "lat": 48.8462
      }
    },
    {
      "coordinateSat": {
        "lon": 2.3372,
        "lat": 48.8462
      }
    }
  ],
  "routingVehicleProfile": {
    "transportMode": "CAR",
    "routingVehicleFeature": {
      "height": 150,
      "width": 180,
      "length": 420,
      "weight": 15
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
      "used": true,
      "usedOrder": 0,
      "matchedCoordinateGps": {
        "lon": 2.340481351926549,
        "lat": 48.8475345741143
      },
      "confidenceValue": 0.0981806775407779,
      "distanceFromRequest": 9.41,
      "polylineIndex": -1,
      "duration": -1,
      "length": -1
    },
    {
      "inputOrder": 1,
      "used": true,
      "usedOrder": 1,
      "matchedCoordinateGps": {
        "lon": 2.340142278341177,
        "lat": 48.846166004493384
      },
      "confidenceValue": 0.24313486182547292,
      "distanceFromRequest": 11.09,
      "polylineIndex": -1,
      "duration": -1,
      "length": -1
    },
    {
      "inputOrder": 2,
      "used": true,
      "usedOrder": 2,
      "matchedCoordinateGps": {
        "lon": 2.3372,
        "lat": 48.8462
      },
      "confidenceValue": 1,
      "distanceFromRequest": 0,
      "polylineIndex": -1,
      "duration": 81,
      "length": 381
    }
  ],
  "routingRoutes": [
    {
      "length": 381,
      "duration": 81,
      "totalDuration": 81,
      "trafficDelay": 0,
      "departureTime": 0,
      "arrivalTime": 0,
      "averageSpeed": 16.933332,
      "maximumSpeed": 0,
      "startUTurnThreshold": 3000,
      "startStopInfo": {
        "start": {
          "lon": 2.34048,
          "lat": 48.84753
        },
        "stop": {
          "lon": 2.34014,
          "lat": 48.84617
        },
        "distanceFirstMatched": 0.51,
        "distanceLastMatched": 215.4,
        "interDests": null
      },
      "waypoints": [
        {
          "usedDestinationIndex": 0,
          "polylineIndex": -1,
          "coordinate": {
            "lon": 2.340481351926549,
            "lat": 48.8475345741143
          },
          "angle": 233,
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
          "usedDestinationIndex": 1,
          "polylineIndex": -1,
          "coordinate": {
            "lon": 2.340142278341177,
            "lat": 48.846166004493384
          },
          "angle": 200,
          "radius": 0,
          "uturn": false,
          "ignorePoint": false,
          "ignoreTrafficDirections": false,
          "ignoreRoadBlocks": false,
          "ignoreRestrictions": false,
          "avoidUTurn": "UNDEF",
          "useStartAngle": "UNDEF",
          "useStopRoadSide": "UNDEF",
          "offRoad": {
            "geometry": [
              {
                "lon": 2.34014,
                "lat": 48.84617
              },
              {
                "lon": 2.34,
                "lat": 48.8462
              },
              {
                "lon": 2.3372,
                "lat": 48.8462
              }
            ],
            "attributes": [
              {
                "attributeCode": "__NOT_MAPPED",
                "key": "20021",
                "numericKey": 20021,
                "rawData": true,
                "type": "UINT",
                "value": "0"
              },
              {
                "attributeCode": "__NOT_MAPPED",
                "key": "20022",
                "numericKey": 20022,
                "rawData": true,
                "type": "UINT",
                "value": "0"
              },
              {
                "attributeCode": "TRAFFIC_DIRECTION",
                "key": "17482",
                "numericKey": 17482,
                "rawData": true,
                "type": "UINT",
                "value": "1"
              },
              {
                "attributeCode": "TOLL_ROAD",
                "key": "21590",
                "numericKey": 21590,
                "rawData": true,
                "type": "UINT",
                "value": "0"
              },
              {
                "attributeCode": "SPEED_CATEGORY",
                "key": "21332",
                "numericKey": 21332,
                "rawData": true,
                "type": "UINT",
                "value": "30"
              },
              {
                "attributeCode": "LENGTH",
                "key": "19531",
                "numericKey": 19531,
                "rawData": true,
                "type": "UINT",
                "value": "216"
              },
              {
                "attributeCode": "NB_BORDER_JUNCTIONS",
                "key": "20038",
                "numericKey": 20038,
                "rawData": true,
                "type": "UINT",
                "value": "4"
              },
              {
                "attributeCode": "KEY",
                "key": "0",
                "numericKey": 0,
                "rawData": true,
                "type": "KEY",
                "value": "4385170695500"
              }
            ]
          }
        }
      ]
    }
  ]
}
```
---
<a name="traceroute_offroads_rawData_tutorial"></a>
## 🧪 OFFROADS_RAWDATA – Include raw map attributes for off-road segments
✅ **Use case**

You want **detailed map information** about the **off-road segments** (e.g. which road type it snapped to, surface type, etc.).
This is particularly useful for **debugging**, **analysis**, or building advanced visualizations.

💡 **What it does**

When enabled, the `attributes` of each `offRoad` object carry the map's **raw (native) values** instead of converted ones. There is no separate field: the same `offRoad.attributes` array changes, for attributes such as:

- Traffic direction (`TRAFFIC_DIRECTION`)
- Toll road (`TOLL_ROAD`)
- Speed category (`SPEED_CATEGORY`): `2` instead of `30` (km/h) in the example below
- Length (`LENGTH`): `108` instead of `216` (metres) in the example below

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
        "lon": 2.3404,
        "lat": 48.8476
      }
    },
    {
      "coordinateSat": {
        "lon": 2.3400,
        "lat": 48.8462
      }
    },
    {
      "coordinateSat": {
        "lon": 2.3372,
        "lat": 48.8462
      }
    }
  ],
  "routingVehicleProfile": {
    "transportMode": "CAR",
    "routingVehicleFeature": {
      "height": 150,
      "width": 180,
      "length": 420,
      "weight": 15
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
      "used": true,
      "usedOrder": 0,
      "matchedCoordinateGps": {
        "lon": 2.340481351926549,
        "lat": 48.8475345741143
      },
      "confidenceValue": 0.0981806775407779,
      "distanceFromRequest": 9.41,
      "polylineIndex": -1,
      "duration": -1,
      "length": -1
    },
    {
      "inputOrder": 1,
      "used": true,
      "usedOrder": 1,
      "matchedCoordinateGps": {
        "lon": 2.340142278341177,
        "lat": 48.846166004493384
      },
      "confidenceValue": 0.24313486182547292,
      "distanceFromRequest": 11.09,
      "polylineIndex": -1,
      "duration": -1,
      "length": -1
    },
    {
      "inputOrder": 2,
      "used": true,
      "usedOrder": 2,
      "matchedCoordinateGps": {
        "lon": 2.3372,
        "lat": 48.8462
      },
      "confidenceValue": 1,
      "distanceFromRequest": 0,
      "polylineIndex": -1,
      "duration": 81,
      "length": 381
    }
  ],
  "routingRoutes": [
    {
      "length": 381,
      "duration": 81,
      "totalDuration": 81,
      "trafficDelay": 0,
      "departureTime": 0,
      "arrivalTime": 0,
      "averageSpeed": 16.933332,
      "maximumSpeed": 0,
      "startUTurnThreshold": 3000,
      "startStopInfo": {
        "start": {
          "lon": 2.34048,
          "lat": 48.84753
        },
        "stop": {
          "lon": 2.34014,
          "lat": 48.84617
        },
        "distanceFirstMatched": 0.51,
        "distanceLastMatched": 215.4,
        "interDests": null
      },
      "waypoints": [
        {
          "usedDestinationIndex": 0,
          "polylineIndex": -1,
          "coordinate": {
            "lon": 2.340481351926549,
            "lat": 48.8475345741143
          },
          "angle": 233,
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
          "usedDestinationIndex": 1,
          "polylineIndex": -1,
          "coordinate": {
            "lon": 2.340142278341177,
            "lat": 48.846166004493384
          },
          "angle": 200,
          "radius": 0,
          "uturn": false,
          "ignorePoint": false,
          "ignoreTrafficDirections": false,
          "ignoreRoadBlocks": false,
          "ignoreRestrictions": false,
          "avoidUTurn": "UNDEF",
          "useStartAngle": "UNDEF",
          "useStopRoadSide": "UNDEF",
          "offRoad": {
            "geometry": [
              {
                "lon": 2.34014,
                "lat": 48.84617
              },
              {
                "lon": 2.34,
                "lat": 48.8462
              },
              {
                "lon": 2.3372,
                "lat": 48.8462
              }
            ],
            "attributes": [
              {
                "attributeCode": "__NOT_MAPPED",
                "key": "20021",
                "numericKey": 20021,
                "rawData": true,
                "type": "UINT",
                "value": "0"
              },
              {
                "attributeCode": "__NOT_MAPPED",
                "key": "20022",
                "numericKey": 20022,
                "rawData": true,
                "type": "UINT",
                "value": "0"
              },
              {
                "attributeCode": "TRAFFIC_DIRECTION",
                "key": "17482",
                "numericKey": 17482,
                "rawData": true,
                "type": "UINT",
                "value": "1"
              },
              {
                "attributeCode": "TOLL_ROAD",
                "key": "21590",
                "numericKey": 21590,
                "rawData": true,
                "type": "UINT",
                "value": "0"
              },
              {
                "attributeCode": "SPEED_CATEGORY",
                "key": "21332",
                "numericKey": 21332,
                "rawData": true,
                "type": "UINT",
                "value": "2"
              },
              {
                "attributeCode": "LENGTH",
                "key": "19531",
                "numericKey": 19531,
                "rawData": true,
                "type": "UINT",
                "value": "108"
              },
              {
                "attributeCode": "NB_BORDER_JUNCTIONS",
                "key": "20038",
                "numericKey": 20038,
                "rawData": true,
                "type": "UINT",
                "value": "4"
              },
              {
                "attributeCode": "KEY",
                "key": "0",
                "numericKey": 0,
                "rawData": true,
                "type": "KEY",
                "value": "4385170695500"
              }
            ]
          }
        }
      ]
    }
  ]
}
```
> ✅ Returns the native values of each `offRoad` segment's `attributes`, giving access to native road metadata for advanced inspection.
---
<a name="traceroute_openlr_tutorial"></a>
## 🛰️ OPENLR – Encode the route geometry in OpenLR format
✅ **Use case**

You want to share or store the **route geometry** in a **compact**, **interoperable format**, especially for use with systems or tools supporting **OpenLR** (like navigation SDKs, traffic systems, etc.).

💡 **What it does**

When this option is enabled, the API attempts to encode the route's geometry into an **OpenLR base64 string**, and includes it in the response under the field `openLrBase64` (`routingRoutes[].openLrBase64`).

- OpenLR is a location referencing standard designed for compact binary representation.
- The encoding may **fail** for certain types of routes (e.g. **U-turns** or geometries with high ambiguity), in which case the `openLrBase64` field will be **absent**.

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
      "width": 180,
      "length": 420,
      "weight": 15
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
> ✅ Adds an `openLrBase64` field to each route in the response with a base64-encoded representation of the route geometry — measured with the example above: `"openLrBase64": "CwUGVB8EFRuHJAYn/kAjEw=="`.<br>
> ⚠️ May be missing if encoding is not possible (e.g. U-turns).
---
<a name="traceroute_polyline_tutorial"></a>
## 🧩 POLYLINE – Return the route geometry as a polyline
✅ **Use case**

You want to visualize the full geometry of the matched route on a map, as a list of coordinates.

💡 **What it does**

When the `POLYLINE` option is enabled, the response includes an additional `polyline` field (`routingRoutes[].polyline`) that contains the geometry of the route: a JSON array of WGS84 coordinates, `{"lon": …, "lat": …}`. This is useful for displaying the route on a frontend map.
For an **encoded** polyline instead, use `EVENT` with `EVT_ENCODED_POLYLINE`: the encoded geometry then comes in the route's `events` (entries named `encodedPolyline`).

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
      "width": 180,
      "length": 420,
      "weight": 15
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
      "width": 180,
      "length": 450,
      "weight": 15
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
      "matchedPostalAddress": {
        "countryCode": "FRA",
        "country": "France",
        "state": "Provence-Alpes-Côte d'Azur",
        "county": "Alpes-Maritimes",
        "city": "Biot",
        "postalCode": "06410",
        "roadNumber": "",
        "street": "Allée Charles-Victor Naudin"
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
      "matchedPostalAddress": {
        "countryCode": "FRA",
        "country": "France",
        "state": "Provence-Alpes-Côte d'Azur",
        "county": "Alpes-Maritimes",
        "city": "Biot",
        "postalCode": "06410",
        "roadNumber": "",
        "street": "Allée Charles-Victor Naudin"
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
      "matchedPostalAddress": {
        "countryCode": "FRA",
        "country": "France",
        "state": "Provence-Alpes-Côte d'Azur",
        "county": "Alpes-Maritimes",
        "city": "Biot",
        "postalCode": "06410",
        "roadNumber": "",
        "street": "Allée Charles-Victor Naudin"
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
> ✅ Returns a `matchedPostalAddress` field for each matched coordinate in the response (`usedDestinations[].matchedPostalAddress`), useful for displaying or logging real-world addresses.
---
<a name="traceroute_routeSheet_tutorial"></a>
## 🧩 ROUTESHEET – Return a human-readable route sheet
✅ **Use case**

You want to generate a **turn-by-turn route sheet** (like a roadbook) summarizing the key maneuvers of the itinerary, including distance, direction, and road names.

💡 **What it does**

When this option is enabled, the API returns a `routingInstructions` field in the response (`routingRoutes[].routingInstructions`). It contains a **list of driving instructions** extracted from the route geometry and enriched with street names, distances, and directions (e.g., "Turn right onto Avenue de la République").

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
      "width": 180,
      "length": 450,
      "weight": 15
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
> ✅ Returns a `routingInstructions` list containing detailed instructions like "Turn left", "Continue on Rue de Rivoli", etc., for each maneuver.
---
<a name="traceroute_routeSheet_Verbose_high_tutorial"></a>
## 🧩 ROUTESHEET_VERBOSE_HIGH – Enable highly detailed route sheet
✅ **Use case**

You need a **very detailed route sheet**, with more steps than the default one. Ideal for:

- advanced navigation systems,
- printing exhaustive roadbooks,
- precise driving analysis.

💡 **What it does**

This option increases the verbosity of the route sheet returned when `ROUTESHEET` is active. The verbosity changes the **number of instructions**, not their fields:

- `ROUTESHEET_VERBOSE_HIGH` adds "straight on" `FOLLOW` steps between the manoeuvres — measured with the example below: 18 instructions, against 11 at the default level,
- every instruction carries the same fields at every level (`type`, `manoeuvre`, `geoElementType`, `length`, `duration`, names and `text`); no level adds a functional road class (FRC) or road type field.

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
      "width": 180,
      "length": 450,
      "weight": 15
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
          "type": "FOLLOW",
          "geoElementType": "ROAD",
          "length": 20,
          "duration": 2,
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
          "length": 33,
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
          "textDist": "At 33 meters",
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
          "type": "FOLLOW",
          "geoElementType": "ROAD",
          "length": 153,
          "duration": 13,
          "fromName": "Route des Chappes",
          "manoeuvre": "STRAIGHT",
          "coordinate": {
            "lon": 7.07982,
            "lat": 43.61378
          },
          "roundAboutExitNumber": 0,
          "toName": "Route des Chappes",
          "toOn": "Route des Chappes",
          "toRn": "D535",
          "textDist": "At 153 meters",
          "text": "From Route des Chappes straight on Route des Chappes"
        },
        {
          "type": "ENTER_ROUNDABOUT",
          "geoElementType": "ROAD",
          "length": 207,
          "duration": 16,
          "fromName": "Route des Chappes",
          "manoeuvre": "STRAIGHT",
          "coordinate": {
            "lon": 7.07845,
            "lat": 43.61221
          },
          "roundAboutExitNumber": 4,
          "textDist": "At 207 meters"
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
          "length": 109,
          "duration": 15,
          "fromName": "Allée Charles-Victor Naudin",
          "manoeuvre": "STRAIGHT",
          "coordinate": {
            "lon": 7.08018,
            "lat": 43.61229
          },
          "roundAboutExitNumber": 0,
          "toName": "Allée Charles-Victor Naudin",
          "toOn": "Allée Charles-Victor Naudin",
          "textDist": "At 109 meters",
          "text": "From Allée Charles-Victor Naudin straight on Allée Charles-Victor Naudin"
        },
        {
          "type": "FOLLOW",
          "geoElementType": "ROAD",
          "length": 27,
          "duration": 5,
          "fromName": "Allée Charles-Victor Naudin",
          "manoeuvre": "STRAIGHT",
          "coordinate": {
            "lon": 7.08043,
            "lat": 43.61213
          },
          "roundAboutExitNumber": 0,
          "toName": "Allée Charles-Victor Naudin",
          "toOn": "Allée Charles-Victor Naudin",
          "textDist": "At 27 meters",
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
          "length": 65,
          "duration": 9,
          "fromName": "Allée Charles-Victor Naudin",
          "manoeuvre": "STRAIGHT",
          "coordinate": {
            "lon": 7.08118,
            "lat": 43.61169
          },
          "roundAboutExitNumber": 0,
          "toName": "Allée Charles-Victor Naudin",
          "toOn": "Allée Charles-Victor Naudin",
          "textDist": "At 65 meters",
          "text": "From Allée Charles-Victor Naudin straight on Allée Charles-Victor Naudin"
        },
        {
          "type": "FOLLOW",
          "geoElementType": "ROAD",
          "length": 33,
          "duration": 6,
          "fromName": "Allée Charles-Victor Naudin",
          "manoeuvre": "LEFT",
          "coordinate": {
            "lon": 7.08151,
            "lat": 43.61153
          },
          "roundAboutExitNumber": 0,
          "textDist": "At 33 meters",
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
> ✅ Enhances the `routingInstructions` with extra `FOLLOW` steps, for a step-by-step description of the whole trace.
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

- The route sheet includes only the manoeuvres (roundabouts, turns, arrival), without the "straight on" `FOLLOW` steps that `ROUTESHEET_VERBOSE_HIGH` adds.
- Each instruction has the same fields as at the other levels (e.g., maneuver type, road name, distance).
- This is the default verbosity level if none is explicitly defined: measured with the example below, the answer is identical to `ROUTESHEET` alone (11 instructions).

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
      "width": 180,
      "length": 450,
      "weight": 15
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
> ✅ Generates a clean, human-readable route sheet focused on navigation instructions only.
---
<a name="traceroute_routeSheet_Verbose_Medium_tutorial"></a>
## 🧩 ROUTESHEET_VERBOSE_MEDIUM – Medium verbosity for the route sheet
✅ **Use case**

You want a **moderately detailed route sheet**, between the low and the high verbosity levels.

This is suitable for:

- advanced user interfaces,
- route validation and diagnostics,
- in-vehicle systems needing contextual navigation data.

💡 **What it does**

When this option is enabled:

- The route sheet includes, as at every level:

  - **geoElementType** (e.g. `ROUNDABOUT`),

  - **maneuver type**,

  - **distance and duration** per step.

- The verbosity changes the number of instructions, not their fields: no level adds a road type or functional road class (FRC) field. Measured with the example below, the medium level returns the same 11 instructions as the default (low) level; only `ROUTESHEET_VERBOSE_HIGH` adds steps.

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
      "width": 180,
      "length": 450,
      "weight": 15
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
> ✅ Returns a route sheet with maneuver types and timing data; on this trace, identical to the default level.
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

> ⚠️ These IDs are **internal and opaque**; they are useful only in the context of advanced features or integration with compatible map data.<br>
> ⚠️ The specification marks the response field `segmentIds` as **deprecated** (the `SEGMENTIDS` option itself is not). For new code, use `EVENT` with `EVT_SEGMENT_INFO`: the route's `events` then carry, per road segment, its `id`, `length`, `duration` and `reverseDirection`.

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
      "width": 180,
      "length": 450,
      "weight": 15
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
      "segmentIds": [
        2997897230383,
        2997897232704,
        2997897232089,
        2997897232828,
        2997897233192
      ]
    }
  ]
}
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
      "width": 180,
      "length": 450,
      "weight": 15
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
<a name="traceroute_waypoints_tutorial"></a>
## 🧩 WAYPOINTS – Return waypoints of the itinerary
✅ **Use case**

You want to **reconstruct the route later** or send it to another device/server for **precise reproduction** of the calculated path.

Useful when:

- You want to cache and reuse a route.
- You need to analyze key points of the route, including geometry and transitions.
- You plan to visualize or simulate the route elsewhere (e.g. navigation system, custom playback).

💡 **What it does**

When enabled, the API returns a `waypoints` array (`routingRoutes[].waypoints`) containing critical points used to form the computed route. Each waypoint includes metadata such as:

- `usedDestinationIndex`: the input destination it comes from
- `coordinate`, `angle` and `radius`
- `uturn`, `ignorePoint`, and the route planner's flags (`ignoreTrafficDirections`, `ignoreRoadBlocks`, `ignoreRestrictions`, `avoidUTurn`, `useStartAngle`, `useStopRoadSide`)
- Off-road info (`offRoad`, if enabled via `OFFROADS`)
- `waypointPolylineIndex`, its position in the `waypointPolyline` array (if enabled via `WAYPOINTS_POLYLINE`)

The distance and duration from the start are not on the waypoints: they are on `usedDestinations[]` (`length`, `duration`).

These are minimal yet sufficient to reproduce the full route on another system (see `NO_MINIMAL_WAYPOINTS` to get every point).

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
      "width": 180,
      "length": 450,
      "weight": 15
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
      ],
      "waypoints": [
        {
          "usedDestinationIndex": 0,
          "polylineIndex": -1,
          "coordinate": {
            "lon": 7.06602,
            "lat": 43.61618
          },
          "angle": 81,
          "radius": 0,
          "uturn": false,
          "ignorePoint": false,
          "ignoreTrafficDirections": false,
          "ignoreRoadBlocks": false,
          "ignoreRestrictions": true,
          "avoidUTurn": "UNDEF",
          "useStartAngle": "UNDEF",
          "useStopRoadSide": "UNDEF"
        },
        {
          "usedDestinationIndex": 6,
          "polylineIndex": -1,
          "coordinate": {
            "lon": 7.079380021004235,
            "lat": 43.61285888564006
          },
          "angle": 134,
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
          "polylineIndex": -1,
          "coordinate": {
            "lon": 7.081772121283489,
            "lat": 43.61169746672947
          },
          "angle": 39,
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
> ✅ Returns minimal but complete waypoint list to reconstruct the route on another device.
---
<a name="traceroute_waypointsPolyline_tutorial"></a>
## 🧭 WAYPOINTS_POLYLINE – Include Waypoint Coordinates in the Polyline
Returns the polyline of the route, enhanced with the **waypoint coordinates**.

✅ **Use case**

You want a single polyline that contains **both the route geometry and the precise waypoints** used in the computation.
This is useful to:

- Visualize or export the route **including key GPS points**
- Perform replay or synchronization between systems
- Ensure all important locations (e.g., stops) are reflected in the geometry

💡 **What it does**

When this option is enabled, the API returns a separate `waypointPolyline` array (`routingRoutes[].waypointPolyline`): the coordinates of the route, as plain `{"lon": …, "lat": …}`, with the matched coordinates of the **waypoints** inserted.
It carries no time, heading or speed.

It comes with the `waypoints` array, which links the two:

- `waypoints` → the list of waypoint objects; this option returns it by itself, so adding `WAYPOINTS` changes nothing (measured: identical answers)
- `waypoints[].waypointPolylineIndex` → the position of each waypoint in `waypointPolyline`

🔧 **How to enable**

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
  "options": ["WAYPOINTS_POLYLINE"],
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
      "waypointPolylineIndex": 0,
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
      "waypointPolylineIndex": 73,
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
      "waypointPolylineIndex": 81,
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
      "waypoints": [
        {
          "usedDestinationIndex": 0,
          "polylineIndex": 0,
          "waypointPolylineIndex": 0,
          "coordinate": {
            "lon": 7.06602,
            "lat": 43.61618
          },
          "angle": 81,
          "radius": 0,
          "uturn": false,
          "ignorePoint": false,
          "ignoreTrafficDirections": false,
          "ignoreRoadBlocks": false,
          "ignoreRestrictions": true,
          "avoidUTurn": "UNDEF",
          "useStartAngle": "UNDEF",
          "useStopRoadSide": "UNDEF"
        },
        {
          "usedDestinationIndex": 6,
          "polylineIndex": 73,
          "waypointPolylineIndex": 73,
          "coordinate": {
            "lon": 7.079380021004235,
            "lat": 43.61285888564006
          },
          "angle": 134,
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
          "polylineIndex": 81,
          "waypointPolylineIndex": 81,
          "coordinate": {
            "lon": 7.081772121283489,
            "lat": 43.61169746672947
          },
          "angle": 39,
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

_BeNomad MCP: a corrected copy of BeMap's page, served until BeMap publishes the correction (BEMAP-1938)._
