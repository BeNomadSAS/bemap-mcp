<a name="routing_optimized_tutorial"></a>
# 🧠 Routing Optimization Tutorial

This tutorial explains how to use **routing optimization options** to compute smarter, more efficient routes.

The `OPTIMIZED_*` options allow you to:
- Reorder waypoints automatically for shortest/fastest trip
- Close a route (circular trips)
- Return to start (round trips)
- Find charging stations when battery is insufficient
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
## ⚡ `OPTIMIZED_ROUTE_FOR_CHARGING_STATION` – EV smart routing with charging stops  
✅ **Use case**  

Optimize electric vehicle routing by automatically adding charging stops when the trip is not feasible with the current battery and vehicle parameters.

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
      "initBatLvl": 60,
      "batCapacity": 64,
      "payload": 200,
      "scx": 0.6,
      "crr": 0.01,
      "dryWeight": 2000,
      "engineEfficiency": 0.5,
      "maxAccel": 130,
      "maxDecel": -100
    }
  },
  "smartRouting": {
    "chargingMode": "FASTEST"
  },
  "routingChargeFeature": {
    "socAlert": 10,
    "socAtArrival": 20,
    "reachChargePointAtArrival": true,
    "connectorTypeIdFilters": [1, 2, 3],
    "providers": ["chargemap", "totalenergies"]
  },
  "options": [ "OPTIMIZED_ROUTE_FOR_CHARGING_STATION", "POLYLINE" ]
}
```
**💡 What it does**

- Checks route feasibility with EV parameters (initial battery level, vehicle consumption, etc.).
- If the trip can't be completed, inserts optimal charging station stops along the route.
- Takes into account criteria like **fastest time**, **shortest distance**, or **least energy** depending on the route profile.

**⚠️ Requires a valid routingEnergyVehicleFeature block and a smartRouting configuration.**

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
        "lon": 5.045916592146761,
        "lat": 43.6039025
      },
      "confidenceValue": 0.04951623367054404,
      "distanceFromRequest": 109.78,
      "polylineIndex": -1,
      "duration": 9907,
      "length": 276724
    }
  ],
  "routingRoutes": [
    {
      "length": 276724,
      "duration": 9907,
      "trafficDelay": 0,
      "averageSpeed": 100.55581,
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
- Keeps start and end points fixed

📎 Combine with `departureTime` or `EVENT` for time-aware or segment-detailed optimization.

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

Compute an optimized route that **starts and ends at the same location**, but does **not explicitly close the loop** by recalculating the last leg.  
Useful when you want to return to the start point without forcing a final optimization step.

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
  "options": [ "OPTIMIZED_TRIP", "OPTIMIZED_TRIP_ROUND", "POLYLINE" ]
}
```
**💡 What it does**

- Optimizes the trip while **keeping the first point as both start and end**
- The route **comes back to the starting point**, but the last segment is not recalculated like with `OPTIMIZED_TRIP_CLOSE`
- Use this when the return is known or not important to recalculate

📌 To close the route explicitly with recalculation, add `OPTIMIZED_TRIP_CLOSE` as well.

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