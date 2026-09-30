<a name="routing_optimized_tutorial"></a>
# 🧠 Routing Optimization Tutorial

This tutorial explains how to use **routing optimization options** to compute smarter, more efficient routes.

The `OPTIMIZED_*` options allow you to:
- Reorder waypoints automatically for shortest/fastest trip
- Close a route (circular trips)
- Order the stops for a round trip (back to start)
- Find charging stations when battery is insufficient (deprecated: use EV Smart Routing)
- End the trip at the most optimal destination

Each section includes a use case, a description of the result, and a JSON example.

---

## 🔧 How to enable Optimization

To activate optimization, include `"OPTIMIZED_TRIP"` in the `options` array, along with any desired sub-options:

```
"options": [ "OPTIMIZED_TRIP", "OPTIMIZED_TRIP_CLOSE" ]
```
---
<a name="optimized_route_for_charging_station"></a>
## ⚡ `OPTIMIZED_ROUTE_FOR_CHARGING_STATION` – EV smart routing with charging stops (deprecated)  
✅ **Use case**  

Optimize electric vehicle routing by automatically adding charging stops when the trip is not feasible with the current battery and vehicle parameters.

⚠️ **Deprecated:** the specification marks this option deprecated. To plan charging stops, use EV Smart Routing, `POST /2.0/evsmartrouting`.

📦 **Example**
```
{
  "destinations": [
    { "coordinateSat": { "lon": 4.8357, "lat": 45.7640 } },
    { "coordinateSat": { "lon": 5.0470, "lat": 43.6045 } }
  ],
  "routingVehicleProfile": {
    "transportMode": "CAR",
    "routingEnergyVehicleFeature": {
      "energyLoad": 38.4,
      "batCapacity": 64,
      "payload": 200,
      "scx": 0.6,
      "crr": 0.01,
      "dryWeight": 2000,
      "engineEfficiency": 0.9,
      "maxAccel": 2.5,
      "maxDecel": -3.0
    }
  },
  "routingChargeFeature": {
    "socAlert": 10,
    "socAtArrival": 20,
    "reachChargePointAtArrival": true,
    "connectorTypeIdFilters": [1, 2, 3],
    "providers": ["gireve"]
  },
  "options": [ "OPTIMIZED_ROUTE_FOR_CHARGING_STATION", "POLYLINE" ]
}
```
`energyLoad` is the energy loaded at departure, in kWh: 38.4 kWh is 60 % of this 64 kWh battery.

**💡 What it does**

- Is meant to check route feasibility with EV parameters (energy loaded, vehicle consumption, etc.).
- If the trip can't be completed, is meant to insert optimal charging station stops along the route.
- Measured on production, it inserts no stop. This trip needs 59.9 kWh (option `ENERGY_CONSUMPTION`) for 38.4 kWh loaded, and the answer is `200` with the same route as without the option (276 723 m, 9 879 s), no charging stop (`interDests` is `null`) and nothing saying the energy is not enough.

**⚠️ Requires a valid routingEnergyVehicleFeature block; the charging preferences go in `routingChargeFeature`.**

📨 **Response** (polyline shortened to its first two points)
```
{
  "usedDestinations": [
    {
      "inputOrder": 0,
      "used": true,
      "usedOrder": 0,
      "matchedCoordinateGps": {
        "lon": 4.83554,
        "lat": 45.76412
      },
      "confidenceValue": 0.3344370860927152,
      "distanceFromRequest": 18.24,
      "polylineIndex": -1,
      "duration": -1,
      "length": -1
    },
    {
      "inputOrder": 1,
      "used": true,
      "usedOrder": 1,
      "matchedCoordinateGps": {
        "lon": 5.045919559748073,
        "lat": 43.60390268559976
      },
      "confidenceValue": 0.04452326340594739,
      "distanceFromRequest": 109.57,
      "polylineIndex": -1,
      "duration": 9879,
      "length": 276723
    }
  ],
  "routingRoutes": [
    {
      "length": 276723,
      "duration": 9879,
      "totalDuration": 9879,
      "trafficDelay": 0,
      "departureTime": 0,
      "arrivalTime": 0,
      "averageSpeed": 100.84045,
      "maximumSpeed": 0,
      "startUTurnThreshold": 3000,
      "boundingBox": {
        "minLon": 4.70685,
        "minLat": 43.60067,
        "maxLon": 5.12559,
        "maxLat": 45.76617
      },
      "startStopInfo": {
        "start": {
          "lon": 4.83554,
          "lat": 45.76412
        },
        "stop": {
          "lon": 5.04592,
          "lat": 43.6039
        },
        "distanceFirstMatched": 0,
        "distanceLastMatched": 0.3,
        "interDests": null
      },
      "polyline": [
        {
          "lon": 4.83554,
          "lat": 45.76412
        },
        {
          "lon": 4.83422,
          "lat": 45.76421
        }
      ]
    }
  ]
}
```
---
<a name="optimized_trip"></a>
## 🧭 `OPTIMIZED_TRIP` – Optimized itinerary between fixed start and end points  
✅ **Use case**  

Reorder a list of waypoints to find the most optimal travel path, **keeping the first and last points fixed**.  
Useful for delivery or service routes with a flexible order of intermediate stops.

📦 **Example**
```
{
  "destinations": [
    { "coordinateSat": { "lon": 4.8357, "lat": 45.7640 } },
    { "coordinateSat": { "lon": 4.8923, "lat": 45.7700 } },
    { "coordinateSat": { "lon": 4.9000, "lat": 45.7400 } },
    { "coordinateSat": { "lon": 5.0470, "lat": 43.6045 } }
  ],
  "routingVehicleProfile": {
    "transportMode": "CAR"
  },
  "departureTime": "2025-07-02T09:00:00",
  "options": [ "OPTIMIZED_TRIP", "POLYLINE" ]
}
```
**💡 What it does**

- Keeps start and end points fixed.
- Reorders intermediate destinations to minimize travel time, distance, or energy.
- Can consider departure time to factor in time-based traffic or restrictions.

📝 You can combine this with EVENT or energy options for enhanced routing context.

📨 **Response**

```
{
  "usedDestinations": [
    {
      "inputOrder": 0,
      "used": true,
      "usedOrder": 0,
      "matchedCoordinateGps": {
        "lon": 4.83554,
        "lat": 45.76412
      },
      "confidenceValue": 0.33438985736925514,
      "distanceFromRequest": 18.24,
      "polylineIndex": -1,
      "duration": -1,
      "length": -1
    },
    {
      "inputOrder": 1,
      "used": true,
      "usedOrder": 1,
      "matchedCoordinateGps": {
        "lon": 4.892257988197541,
        "lat": 45.7697075
      },
      "confidenceValue": 0.20329411764705882,
      "distanceFromRequest": 32.72,
      "polylineIndex": -1,
      "duration": 1160,
      "length": 10992
    },
    {
      "inputOrder": 2,
      "used": true,
      "usedOrder": 2,
      "matchedCoordinateGps": {
        "lon": 4.90009,
        "lat": 45.73994
      },
      "confidenceValue": 0.34147334147334146,
      "distanceFromRequest": 9.67,
      "polylineIndex": -1,
      "duration": 1896,
      "length": 15938
    },
    {
      "inputOrder": 3,
      "used": true,
      "usedOrder": 3,
      "matchedCoordinateGps": {
        "lon": 5.045916592146761,
        "lat": 43.6039025
      },
      "confidenceValue": 0.04951623367054404,
      "distanceFromRequest": 109.78,
      "polylineIndex": -1,
      "duration": 11677,
      "length": 293138
    }
  ],
  "routingRoutes": [
    {
      "length": 293138,
      "duration": 11677,
      "trafficDelay": 0,
      "averageSpeed": 90.37396,
      "maximumSpeed": 0,
      "startUTurnThreshold": 3000,
      "boundingBox": {
        "minLon": 4.70685,
        "minLat": 43.60067,
        "maxLon": 5.12559,
        "maxLat": 45.79358
      },
      "startStopInfo": {
        "start": {
          "lon": 4.83554,
          "lat": 45.76412
        },
        "stop": {
          "lon": 5.04592,
          "lat": 43.6039
        },
        "distanceFirstMatched": 0,
        "distanceLastMatched": 0.28,
        "interDests": null
      },
      "polyline": [
        {
          "lon": 4.83554,
          "lat": 45.76412
        },
        {
          "lon": 4.83422,
          "lat": 45.76421
        },
```
---
<a name="optimized_trip_close"></a>
## 🔁 `OPTIMIZED_TRIP_CLOSE` – Optimize and return to start point  
✅ **Use case**  

Reorder waypoints for the best itinerary **and automatically close the loop** by adding a leg from the last point back to the first one.  
Useful for logistics tours or delivery loops.

📦 **Example**
```
{
  "destinations": [
    { "coordinateSat": { "lon": 4.8357, "lat": 45.7640 } },
    { "coordinateSat": { "lon": 4.8923, "lat": 45.7700 } },
    { "coordinateSat": { "lon": 4.9000, "lat": 45.7400 } },
    { "coordinateSat": { "lon": 5.0470, "lat": 43.6045 } }
  ],
  "routingVehicleProfile": {
    "transportMode": "CAR"
  },
  "options": [ "OPTIMIZED_TRIP", "OPTIMIZED_TRIP_CLOSE", "POLYLINE" ]
}
```
**💡 What it does**

- Optimizes the trip order (like `OPTIMIZED_TRIP`)
- Adds an extra leg back to the starting point, turning the itinerary into a loop

📌 The order is the one of `OPTIMIZED_TRIP`: the last input point is still the last one visited before the leg back. For the order of the best round trip, add `OPTIMIZED_TRIP_ROUND` as well (see below).

📎 Combine with `departureTime` or `EVENT` for time-aware or segment-detailed optimization.

ℹ️ In the response, `startStopInfo.distanceLastMatched` is measured from the last input point, not from the stop of the closed route: 241 km here is the distance from the last input point to the start, not a stop 241 km off the road.

📨 **Response**

```
{
  "usedDestinations": [
    {
      "inputOrder": 0,
      "used": true,
      "usedOrder": 0,
      "matchedCoordinateGps": {
        "lon": 4.83554,
        "lat": 45.76412
      },
      "confidenceValue": 0.33438985736925514,
      "distanceFromRequest": 18.24,
      "polylineIndex": -1,
      "duration": -1,
      "length": -1
    },
    {
      "inputOrder": 1,
      "used": true,
      "usedOrder": 1,
      "matchedCoordinateGps": {
        "lon": 4.892257988197541,
        "lat": 45.7697075
      },
      "confidenceValue": 0.20329411764705882,
      "distanceFromRequest": 32.72,
      "polylineIndex": -1,
      "duration": 1160,
      "length": 10992
    },
    {
      "inputOrder": 2,
      "used": true,
      "usedOrder": 2,
      "matchedCoordinateGps": {
        "lon": 4.90009,
        "lat": 45.73994
      },
      "confidenceValue": 0.34147334147334146,
      "distanceFromRequest": 9.67,
      "polylineIndex": -1,
      "duration": 1896,
      "length": 15938
    },
    {
      "inputOrder": 3,
      "used": true,
      "usedOrder": 3,
      "matchedCoordinateGps": {
        "lon": 5.045916592146761,
        "lat": 43.6039025
      },
      "confidenceValue": 0.04951623367054404,
      "distanceFromRequest": 109.78,
      "polylineIndex": -1,
      "duration": 21545,
      "length": 570336
    }
  ],
  "routingRoutes": [
    {
      "length": 570336,
      "duration": 21545,
      "trafficDelay": 0,
      "averageSpeed": 95.29866,
      "maximumSpeed": 0,
      "startUTurnThreshold": 3000,
      "boundingBox": {
        "minLon": 4.70685,
        "minLat": 43.60067,
        "maxLon": 5.13023,
        "maxLat": 45.79358
      },
      "startStopInfo": {
        "start": {
          "lon": 4.83554,
          "lat": 45.76412
        },
        "stop": {
          "lon": 4.83554,
          "lat": 45.76412
        },
        "distanceFirstMatched": 0,
        "distanceLastMatched": 241049.82,
        "interDests": null
      },
      "polyline": [
        {
          "lon": 4.83554,
          "lat": 45.76412
        },
        {
          "lon": 4.83422,
          "lat": 45.76421
        },
```
---
<a name="optimized_trip_round"></a>
## 🔄 `OPTIMIZED_TRIP_ROUND` – Round trip with return to origin  
✅ **Use case**  

Order the stops for a **round trip that comes back to the start**, but compute the route **without the leg back**: it ends at the last stop of that round trip.  
Useful when you want to return to the start point without computing the return now.

📦 **Example**

From Lyon to Grenoble, Saint-Étienne, Annecy, Bourg-en-Bresse and Chambéry:
```
{
  "destinations": [
    { "coordinateSat": { "lon": 4.8357, "lat": 45.7640 } },
    { "coordinateSat": { "lon": 5.7245, "lat": 45.1885 } },
    { "coordinateSat": { "lon": 4.3872, "lat": 45.4397 } },
    { "coordinateSat": { "lon": 6.1294, "lat": 45.8992 } },
    { "coordinateSat": { "lon": 5.2256, "lat": 46.2052 } },
    { "coordinateSat": { "lon": 5.9178, "lat": 45.5646 } }
  ],
  "routingVehicleProfile": {
    "transportMode": "CAR"
  },
  "options": [ "OPTIMIZED_TRIP", "OPTIMIZED_TRIP_ROUND", "POLYLINE" ]
}
```
**💡 What it does**

- Keeps the first point as the start, and orders the other points for the best round trip back to it: the last input point is not kept as the end
- The route **does not come back to the starting point**: it stops at the last stop of the round trip
- Use this when the return is known or not important to recalculate

On this example, `OPTIMIZED_TRIP` alone ends at Chambéry, the last input point (503 527 m, 23 125 s). With `OPTIMIZED_TRIP_ROUND`, the order is Bourg-en-Bresse, Annecy, Chambéry, Grenoble, Saint-Étienne, and the route ends at Saint-Étienne (472 839 m, 21 279 s), the stop nearest to Lyon. When the input order is already the best round trip, the answer is the same as with `OPTIMIZED_TRIP` alone.

📌 To close the route explicitly with recalculation, add `OPTIMIZED_TRIP_CLOSE` as well: on this example, the round trip back to Lyon is 535 975 m, 24 888 s. The option reference names it `OPTIMIZED_TRIP_CLOSED`, which does not exist and answers `400`.

ℹ️ As with `OPTIMIZED_TRIP_UNDEFSTOP`, `startStopInfo.distanceLastMatched` is measured from the last input point (Chambéry), not from the stop of the route (Saint-Étienne): 120 122.31 m here.

📨 **Response** (polyline shortened to its first two points)

```
{
  "usedDestinations": [
    {
      "inputOrder": 0,
      "used": true,
      "usedOrder": 0,
      "matchedCoordinateGps": {
        "lon": 4.83554,
        "lat": 45.76412
      },
      "confidenceValue": 0.3344370860927152,
      "distanceFromRequest": 18.24,
      "polylineIndex": -1,
      "duration": -1,
      "length": -1
    },
    {
      "inputOrder": 1,
      "used": true,
      "usedOrder": 4,
      "matchedCoordinateGps": {
        "lon": 5.724327290069303,
        "lat": 45.188401015273264
      },
      "confidenceValue": 0.17611290443660382,
      "distanceFromRequest": 17.46,
      "polylineIndex": -1,
      "duration": 14828,
      "length": 318980
    },
    {
      "inputOrder": 2,
      "used": true,
      "usedOrder": 5,
      "matchedCoordinateGps": {
        "lon": 4.3877491649491365,
        "lat": 45.43977574972
      },
      "confidenceValue": 0.3877400295420975,
      "distanceFromRequest": 43.72,
      "polylineIndex": -1,
      "duration": 21279,
      "length": 472839
    },
    {
      "inputOrder": 3,
      "used": true,
      "usedOrder": 2,
      "matchedCoordinateGps": {
        "lon": 6.1294068627825995,
        "lat": 45.899013872549695
      },
      "confidenceValue": 0.19503084006602378,
      "distanceFromRequest": 20.73,
      "polylineIndex": -1,
      "duration": 9325,
      "length": 209254
    },
    {
      "inputOrder": 4,
      "used": true,
      "usedOrder": 1,
      "matchedCoordinateGps": {
        "lon": 5.225610545343734,
        "lat": 46.20518316360312
      },
      "confidenceValue": 0.10860354880657745,
      "distanceFromRequest": 2.05,
      "polylineIndex": -1,
      "duration": 3781,
      "length": 80572
    },
    {
      "inputOrder": 5,
      "used": true,
      "usedOrder": 3,
      "matchedCoordinateGps": {
        "lon": 5.917029578044807,
        "lat": 45.56465721509572
      },
      "confidenceValue": 0.007007433349600533,
      "distanceFromRequest": 60.38,
      "polylineIndex": -1,
      "duration": 11999,
      "length": 260728
    }
  ],
  "routingRoutes": [
    {
      "length": 472839,
      "duration": 21279,
      "totalDuration": 21279,
      "trafficDelay": 0,
      "departureTime": 0,
      "arrivalTime": 0,
      "averageSpeed": 79.995316,
      "maximumSpeed": 0,
      "startUTurnThreshold": 3000,
      "boundingBox": {
        "minLon": 4.3877491649491365,
        "minLat": 45.18484,
        "maxLon": 6.13176,
        "maxLat": 46.20753
      },
      "startStopInfo": {
        "start": {
          "lon": 4.83554,
          "lat": 45.76412
        },
        "stop": {
          "lon": 4.38775,
          "lat": 45.43978
        },
        "distanceFirstMatched": 0,
        "distanceLastMatched": 120122.31,
        "interDests": null
      },
      "polyline": [
        {
          "lon": 4.83554,
          "lat": 45.76412
        },
        {
          "lon": 4.83422,
          "lat": 45.76421
        }
      ]
    }
  ]
}
```

---
<a name="optimized_trip_undefstop"></a>
## ❓ `OPTIMIZED_TRIP_UNDEFSTOP` – Open-ended optimized trip  
✅ **Use case**  

Compute an optimized trip that starts at a **defined point** but **ends at any of the waypoints**, choosing the one that produces the best overall path.  
This is useful when the final destination is flexible (e.g. logistics scenarios, open deliveries).

📦 **Example**
```
{
  "destinations": [
    { "coordinateSat": { "lon": 4.8357, "lat": 45.7640 } },
    { "coordinateSat": { "lon": 5.0470, "lat": 43.6045 } },
    { "coordinateSat": { "lon": 4.8923, "lat": 45.7700 } },
    { "coordinateSat": { "lon": 4.9000, "lat": 45.7400 } }
  ],
  "routingVehicleProfile": {
    "transportMode": "CAR"
  },
  "options": [ "OPTIMIZED_TRIP", "OPTIMIZED_TRIP_UNDEFSTOP", "POLYLINE" ]
}
```
**💡 What it does**

- Keeps the first coordinate fixed as the start
- Selects the most optimal final stop among the remaining waypoints
- Skips the need to manually define a final destination in advance

📎 Useful when the route can end at any stop to minimize time, distance, or cost.

ℹ️ In the response, `startStopInfo.distanceLastMatched` is measured from the last input point, not from the stop the route ends at: 238 km here is the distance between the last input point and the stop chosen, not a stop 238 km off the road.

📨 **Response**
```
{
  "usedDestinations": [
    {
      "inputOrder": 0,
      "used": true,
      "usedOrder": 0,
      "matchedCoordinateGps": {
        "lon": 4.83554,
        "lat": 45.76412
      },
      "confidenceValue": 0.33438985736925514,
      "distanceFromRequest": 18.24,
      "polylineIndex": -1,
      "duration": -1,
      "length": -1
    },
    {
      "inputOrder": 1,
      "used": true,
      "usedOrder": 3,
      "matchedCoordinateGps": {
        "lon": 5.045916592146761,
        "lat": 43.6039025
      },
      "confidenceValue": 0.04951623367054404,
      "distanceFromRequest": 109.78,
      "polylineIndex": -1,
      "duration": 11677,
      "length": 293138
    },
    {
      "inputOrder": 2,
      "used": true,
      "usedOrder": 1,
      "matchedCoordinateGps": {
        "lon": 4.892257988197541,
        "lat": 45.7697075
      },
      "confidenceValue": 0.20329411764705882,
      "distanceFromRequest": 32.72,
      "polylineIndex": -1,
      "duration": 1160,
      "length": 10992
    },
    {
      "inputOrder": 3,
      "used": true,
      "usedOrder": 2,
      "matchedCoordinateGps": {
        "lon": 4.90009,
        "lat": 45.73994
      },
      "confidenceValue": 0.34147334147334146,
      "distanceFromRequest": 9.67,
      "polylineIndex": -1,
      "duration": 1896,
      "length": 15938
    }
  ],
  "routingRoutes": [
    {
      "length": 293138,
      "duration": 11677,
      "trafficDelay": 0,
      "averageSpeed": 90.37396,
      "maximumSpeed": 0,
      "startUTurnThreshold": 3000,
      "boundingBox": {
        "minLon": 4.70685,
        "minLat": 43.60067,
        "maxLon": 5.12559,
        "maxLat": 45.79358
      },
      "startStopInfo": {
        "start": {
          "lon": 4.83554,
          "lat": 45.76412
        },
        "stop": {
          "lon": 5.04592,
          "lat": 43.6039
        },
        "distanceFirstMatched": 0,
        "distanceLastMatched": 238062.84,
        "interDests": null
      },
      "polyline": [
        {
          "lon": 4.83554,
          "lat": 45.76412
        },
        {
          "lon": 4.83422,
          "lat": 45.76421
        },
```

---

_BeNomad MCP: a corrected copy of BeMap's page, served until BeMap publishes the correction (BEMAP-1938)._
