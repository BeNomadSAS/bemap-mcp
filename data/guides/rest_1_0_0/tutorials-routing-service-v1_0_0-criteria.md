<a name="routing_criteria_tutorial"></a>

# 📍 Routing Criterias Tutorial

This tutorial explains how to use routing criteria to customize the way routes are calculated: fastest, shortest, eco-friendly, toll-free, etc.

Each section includes a real-world use case, what the option does, and an example request.

🔧 **How to enable routing criteria**

To define the routing criteria, simply include the `routingCriterias` field in your routing request JSON. Example:
```json
"routingCriterias": ["FASTEST"]
```
You can combine it with options like `EVENT`, `OPTIMIZED_TRIP`, and `routingVehicleProfiles`.
---
<a name="criteria_avoid_crossing_border"></a>

## 🛂 `AVOID_CROSSING_BORDER` – Avoid crossing international borders

✅ **Use case**

You want to compute a route that **stays within a single country**, avoiding any international border crossings.
Useful for local deliveries, national travel restrictions, or border-sensitive logistics.

💡 **What it does**

If all coordinates are in the same country, this option will enforce a route that avoids crossing any borders.
If the route cannot be computed without crossing a border, an error will be returned.

🔧 **How to enable**

Add `AVOID_CROSSING_BORDER` to the `routingCriterias` array of your routing request:
```
"routingCriterias": [ "AVOID_CROSSING_BORDER" ]
```

📦 **Example**
```
{
  "routingMode": "MODE_VIAS",
  "destinations": [
    { "coordinateSat": { "lon": 6.0816, "lat": 46.1436 } },
    { "coordinateSat": { "lon": 6.0667, "lat": 46.3333 } }
  ],
  "routingCriterias": [ "AVOID_CROSSING_BORDER" ],
  "options": ["POLYLINE"],
  "routingVehicleProfile": {
    "transportMode": "CAR"
  }
}
```

📨 **Response**
```
{
  "usedDestinations": [
    {
      "inputOrder": 0,
      "used": true,
      "usedOrder": 0,
      "matchedCoordinateGps": {
        "lon": 6.081639016849319,
        "lat": 46.14375875
      },
      "confidenceValue": 0.14359605911330048,
      "distanceFromRequest": 17.93,
      "polylineIndex": -1,
      "duration": -1,
      "length": -1
    },
    {
      "inputOrder": 1,
      "used": true,
      "usedOrder": 1,
      "matchedCoordinateGps": {
        "lon": 6.06702,
        "lat": 46.33398
      },
      "confidenceValue": 0.017229293669007308,
      "distanceFromRequest": 79.59,
      "polylineIndex": -1,
      "duration": 3421,
      "length": 50948
    }
  ],
  "routingRoutes": [
    {
      "length": 50948,
      "duration": 3421,
      "trafficDelay": 0,
      "averageSpeed": 53.613796,
      "maximumSpeed": 0,
      "startUTurnThreshold": 3000,
      "boundingBox": {
        "minLon": 5.90139,
        "minLat": 46.10174,
        "maxLon": 6.081639016849319,
        "maxLat": 46.33533
      },
      "startStopInfo": {
        "start": {
          "lon": 6.08164,
          "lat": 46.14376
        },
        "stop": {
          "lon": 6.06702,
          "lat": 46.33398
        },
        "distanceFirstMatched": 0.14,
        "distanceLastMatched": 0,
        "interDests": null
      },
      "polyline": [
        {
          "lon": 6.081639016849319,
          "lat": 46.14375875
        },
        {
          "lon": 6.08147,
          "lat": 46.14378
        },
```
---
<a name="criteria_avoid_ferries"></a>
## ⛴️ AVOID_FERRIES – Avoid ferries in routing
✅ **Use case**

When you want to **avoid all ferry routes**, e.g., for vehicles not allowed on ferries or when you want land-only travel.

💡 **What it does**

This criterion instructs the routing engine to **avoid any route that includes a ferry crossing**, even if it's faster or shorter.

This is useful for:

- Vehicles not permitted or able to take ferries
- Cost optimization (no ferry fees)
- Time-sensitive deliveries avoiding ferry schedules

🔧 **How to enable**

Add `AVOID_FERRIES` to your criteria list in the routing request:
```
"routingCriterias": ["AVOID_FERRIES"]
```
📍 **Practical example**

Routing from canton du Valais, Suisse to Domodossola, Italie will normally include a ferry.
With `AVOID_FERRIES`, the system will instead suggest a land-only route.

📦**Example**
```
{
  "routingMode": "MODE_VIAS",
  "destinations": [
    { "coordinateSat": { "lon": 8.054329047389256, "lat": 46.3619732880897 } },
    { "coordinateSat": { "lon": 8.29778, "lat": 46.11233 } }
  ],
  "options": [
    "POLYLINE"
  ],
  "routingCriterias": [
    "AVOID_FERRIES",
    "SHORTEST"
  ],
  "routingVehicleProfile": {
    "transportMode": "CAR"
  }
}
```

📨 **Response**
```
{
  "usedDestinations": [
    {
      "inputOrder": 0,
      "used": true,
      "usedOrder": 0,
      "matchedCoordinateGps": {
        "lon": 8.05419666280887,
        "lat": 46.36207375
      },
      "confidenceValue": 1,
      "distanceFromRequest": 15.12,
      "polylineIndex": -1,
      "duration": -1,
      "length": -1
    },
    {
      "inputOrder": 1,
      "used": true,
      "usedOrder": 1,
      "matchedCoordinateGps": {
        "lon": 8.297779611282099,
        "lat": 46.1123275
      },
      "confidenceValue": 0.5190228273928715,
      "distanceFromRequest": 0.28,
      "polylineIndex": -1,
      "duration": 4928,
      "length": 68882
    }
  ],
  "routingRoutes": [
    {
      "length": 68882,
      "duration": 4928,
      "trafficDelay": 0,
      "averageSpeed": 50.31964,
      "maximumSpeed": 0,
      "startUTurnThreshold": 3000,
      "boundingBox": {
        "minLon": 7.98183,
        "minLat": 46.1123275,
        "maxLon": 8.30247,
        "maxLat": 46.36207375
      },
      "startStopInfo": {
        "start": {
          "lon": 8.0542,
          "lat": 46.36207
        },
        "stop": {
          "lon": 8.29778,
          "lat": 46.11233
        },
        "distanceFirstMatched": 0.42,
        "distanceLastMatched": 0.28,
        "interDests": null
      },
      "polyline": [
        {
          "lon": 8.05419666280887,
          "lat": 46.36207375
        },
        {
          "lon": 8.05351,
          "lat": 46.36165
        },
```
---
<a name="criteria_avoid_motorways"></a>
## 🛣️ AVOID_MOTORWAYS – Avoid motorways in routing
✅ **Use case**

Avoid **motorways** when computing a route.
<br>Useful for:

- Vehicles not allowed on motorways (e.g., tractors, some motorcycles)
- Avoiding tolls to reduce costs
- Scenic or leisure drives using local roads

💡 **What it does**

When this criteria is enabled, the routing engine **prefers secondary roads** even if the travel time is longer.

🔧 **How to enable**

Add `AVOID_MOTORWAYS` to the `routingCriterias` :
```
"routingCriterias": ["AVOID_MOTORWAYS"]
```

📦**Example**
```
{
  "destinations": [
    { "coordinateSat": { "lon": 2.32158, "lat": 48.86533 } },
    { "coordinateSat": { "lon": 4.35655, "lat": 50.8447  } }
  ],
  "routingVehicleProfile": {
    "transportMode": "CAR"
  },
  "routingCriterias": [ "AVOID_MOTORWAYS" ],
  "options": [ "POLYLINE" ]
}
```

📨 **Response**
```
{
  "usedDestinations": [
    {
      "inputOrder": 0,
      "used": true,
      "usedOrder": 0,
      "matchedCoordinateGps": {
        "lon": 2.321574222824279,
        "lat": 48.86533125
      },
      "confidenceValue": 0.21240678521674997,
      "distanceFromRequest": 0.45,
      "polylineIndex": -1,
      "duration": -1,
      "length": -1
    },
    {
      "inputOrder": 1,
      "used": true,
      "usedOrder": 1,
      "matchedCoordinateGps": {
        "lon": 4.356551936132446,
        "lat": 50.84469875
      },
      "confidenceValue": 0.07687516682978913,
      "distanceFromRequest": 0.14,
      "polylineIndex": -1,
      "duration": 21934,
      "length": 309020
    }
  ],
  "routingRoutes": [
    {
      "length": 309020,
      "duration": 21934,
      "trafficDelay": 0,
      "averageSpeed": 50.719067,
      "maximumSpeed": 0,
      "startUTurnThreshold": 3000,
      "boundingBox": {
        "minLon": 2.321574222824279,
        "minLat": 48.86533125,
        "maxLon": 4.356551936132446,
        "maxLat": 50.84507
      },
      "startStopInfo": {
        "start": {
          "lon": 2.32157,
          "lat": 48.86533
        },
        "stop": {
          "lon": 4.35655,
          "lat": 50.8447
        },
        "distanceFirstMatched": 0.14,
        "distanceLastMatched": 0.14,
        "interDests": null
      },
      "polyline": [
        {
          "lon": 2.321574222824279,
          "lat": 48.86533125
        },
        {
          "lon": 2.3217,
          "lat": 48.86551
        },
```
---
<a name="criteria_avoid_tolls"></a>
## 🛣️ AVOID_TOLLS – Avoid toll roads
✅ **Use case**

Plan routes that avoid toll roads, ideal for cost-saving or toll-free travel requirements.

💡 **What it does**

Forces the routing engine to find a path that does not include toll segments, whenever possible.
If no toll-free alternative exists, it falls back to a tolled route.

This is useful when:

- You want to avoid paying tolls.
- You need to generate a “free” version of the route for comparison.

🔧 **How to enable**

Add the value `AVOID_TOLLS` to the `routingCriterias` array:
```
"routingCriterias": ["AVOID_TOLLS"]
```

📦**Example**

Routing between Lyon, France and Nice, France, avoiding toll roads:
```
{
  "destinations": [ 
    { "coordinateSat": { "lon": 2.32158, "lat": 48.86533 } },
    { "coordinateSat": { "lon": 4.35655, "lat": 50.8447  } }
  ],
  "routingVehicleProfile": {
    "transportMode": "CAR"
  },
  "routingCriterias": [ "AVOID_TOLLS" ],
  "options": [ "POLYLINE" ]
}
```
📨**Response**
```
{
  "usedDestinations": [
    {
      "inputOrder": 0,
      "used": true,
      "usedOrder": 0,
      "matchedCoordinateGps": {
        "lon": 2.321574222824279,
        "lat": 48.86533125
      },
      "confidenceValue": 0.21240678521674997,
      "distanceFromRequest": 0.45,
      "polylineIndex": -1,
      "duration": -1,
      "length": -1
    },
    {
      "inputOrder": 1,
      "used": true,
      "usedOrder": 1,
      "matchedCoordinateGps": {
        "lon": 4.356551936132446,
        "lat": 50.84469875
      },
      "confidenceValue": 0.07687516682978913,
      "distanceFromRequest": 0.14,
      "polylineIndex": -1,
      "duration": 17422,
      "length": 321882
    }
  ],
  "routingRoutes": [
    {
      "length": 321882,
      "duration": 17422,
      "trafficDelay": 0,
      "averageSpeed": 66.51218,
      "maximumSpeed": 0,
      "startUTurnThreshold": 3000,
      "boundingBox": {
        "minLon": 2.30156,
        "minLat": 48.86533125,
        "maxLon": 4.356551936132446,
        "maxLat": 50.84507
      },
      "startStopInfo": {
        "start": {
          "lon": 2.32157,
          "lat": 48.86533
        },
        "stop": {
          "lon": 4.35655,
          "lat": 50.8447
        },
        "distanceFirstMatched": 0.14,
        "distanceLastMatched": 0.14,
        "interDests": null
      },
      "polyline": [
        {
          "lon": 2.321574222824279,
          "lat": 48.86533125
        },
        {
          "lon": 2.3217,
          "lat": 48.86551
        },
```
---
<a name="criteria_avoid_unpaved"></a>
## 🛣️ AVOID_UNPAVED – Avoid unpaved roads
✅ **Use case**

Ensure your route avoids dirt, gravel, or otherwise unpaved roads—especially useful for non-off-road vehicles or in bad weather conditions.

💡 **What it does**

Instructs the routing engine to avoid roads **not marked as paved** in the map data.
This helps avoid poor driving conditions or unsuitable paths for certain vehicle types.

This is useful when:
- You drive a city car or motorcycle.
- You transport sensitive goods.
- You need guaranteed paved-road access (e.g., in winter).

🔧 **How to enable**

Add the value `AVOID_UNPAVED` to the `routingCriterias` array:
```
"routingCriterias": ["AVOID_UNPAVED"]
```
📦 **Example**

Routing between Arezzo, Italy and Badia Tedalda, Italy, avoiding unpaved mountain roads:
```
{
  "destinations": [ 
    { "coordinateSat": { "lon": 2.32158, "lat": 48.86533 } },
    { "coordinateSat": { "lon": 4.35655, "lat": 50.8447  } }
  ],
  "routingVehicleProfile": {
    "transportMode": "CAR"
  },
  "routingCriterias": [ "AVOID_UNPAVED" ],
  "options": [ "POLYLINE" ]
}
```

📨**Response**
```
{
  "usedDestinations": [
    {
      "inputOrder": 0,
      "used": true,
      "usedOrder": 0,
      "matchedCoordinateGps": {
        "lon": 2.321574222824279,
        "lat": 48.86533125
      },
      "confidenceValue": 0.21240678521674997,
      "distanceFromRequest": 0.45,
      "polylineIndex": -1,
      "duration": -1,
      "length": -1
    },
    {
      "inputOrder": 1,
      "used": true,
      "usedOrder": 1,
      "matchedCoordinateGps": {
        "lon": 4.356551936132446,
        "lat": 50.84469875
      },
      "confidenceValue": 0.07687516682978913,
      "distanceFromRequest": 0.14,
      "polylineIndex": -1,
      "duration": 12422,
      "length": 308422
    }
  ],
  "routingRoutes": [
    {
      "length": 308422,
      "duration": 12422,
      "trafficDelay": 0,
      "averageSpeed": 89.383286,
      "maximumSpeed": 0,
      "startUTurnThreshold": 3000,
      "boundingBox": {
        "minLon": 2.30156,
        "minLat": 48.86533125,
        "maxLon": 4.356551936132446,
        "maxLat": 50.84507
      },
      "startStopInfo": {
        "start": {
          "lon": 2.32157,
          "lat": 48.86533
        },
        "stop": {
          "lon": 4.35655,
          "lat": 50.8447
        },
        "distanceFirstMatched": 0.14,
        "distanceLastMatched": 0.14,
        "interDests": null
      },
      "polyline": [
        {
          "lon": 2.321574222824279,
          "lat": 48.86533125
        },
        {
          "lon": 2.3217,
          "lat": 48.86551
        },
```
---
<a name="criteria_carpool"></a>
## 🚗 CARPOOL – Avoid carpool-only roads
✅ **Use case**

Avoid roads that are restricted to carpooling vehicles (e.g., HOV lanes).

💡 **What it does**

Excludes roads reserved for high occupancy vehicles (HOV) or carpooling from the computed route.
Useful when your vehicle does not meet carpooling requirements (e.g., solo driver).

🔧 **How to enable**

Add the value `CARPOOL` to the `routingCriterias` array in your request.
```
"routingCriterias": [ "CARPOOL" ],
```
📦 **Example**
```
{
  "destinations": [ 
    { "coordinateSat": { "lon": 2.32158, "lat": 48.86533 } },
    { "coordinateSat": { "lon": 4.35655, "lat": 50.8447  } }
  ],
  "options": [
    "POLYLINE"
  ],
  "routingCriterias": [ "CARPOOL" ],
  "routingVehicleProfile": {
    "transportMode": "CAR"
  }
}
```
📨**Response**
```
{
  "usedDestinations": [
    {
      "inputOrder": 0,
      "used": true,
      "usedOrder": 0,
      "matchedCoordinateGps": {
        "lon": 2.321574222824279,
        "lat": 48.86533125
      },
      "confidenceValue": 0.21240678521674997,
      "distanceFromRequest": 0.45,
      "polylineIndex": -1,
      "duration": -1,
      "length": -1
    },
    {
      "inputOrder": 1,
      "used": true,
      "usedOrder": 1,
      "matchedCoordinateGps": {
        "lon": 4.356551936132446,
        "lat": 50.84469875
      },
      "confidenceValue": 0.07687516682978913,
      "distanceFromRequest": 0.14,
      "polylineIndex": -1,
      "duration": 12422,
      "length": 308422
    }
  ],
  "routingRoutes": [
    {
      "length": 308422,
      "duration": 12422,
      "trafficDelay": 0,
      "averageSpeed": 89.383286,
      "maximumSpeed": 0,
      "startUTurnThreshold": 3000,
      "boundingBox": {
        "minLon": 2.30156,
        "minLat": 48.86533125,
        "maxLon": 4.356551936132446,
        "maxLat": 50.84507
      },
      "startStopInfo": {
        "start": {
          "lon": 2.32157,
          "lat": 48.86533
        },
        "stop": {
          "lon": 4.35655,
          "lat": 50.8447
        },
        "distanceFirstMatched": 0.14,
        "distanceLastMatched": 0.14,
        "interDests": null
      },
      "polyline": [
        {
          "lon": 2.321574222824279,
          "lat": 48.86533125
        },
        {
          "lon": 2.3217,
          "lat": 48.86551
        },
```
---
<a name="criteria_eco_energy"></a>
## 🌱 ECO_ENERGY – Optimize for lowest energy consumption
✅ **Use case**

Find the most energy-efficient route for electric or hybrid vehicles.

💡 **What it does**

Computes a route that minimizes energy consumption rather than distance or time.
Requires energy-related vehicle details to be provided (e.g., battery capacity, engine efficiency).

🔧 **How to enable**

Add `ECO_ENERGY` to the `routingCriterias` array.
```
"routingCriterias": [ "ECO_ENERGY" ]
```

Provide a valid `routingEnergyVehicleFeature` object with your vehicle’s specs.

📦 **Example**
```
{
  "destinations": [ 
    { "coordinateSat": { "lon": 2.32158, "lat": 48.86533 } },
    { "coordinateSat": { "lon": 4.35655, "lat": 50.8447  } }
  ],
  "routingVehicleProfile": {
    "transportMode": "CAR",
    "routingEnergyVehicleFeature": {
      "batCapacity": 60,
      "energyLoad": 50,
      "engineEfficiency": 0.92,
      "scx": 0.7,
      "crr": 0.013,
      "payload": 100,
      "dryWeight": 1600,
      "auxConsumption": 500,
      "extTemp": 20,
      "maxAccel": 100,
      "maxDecel": -100
    }
  },
  "routingCriterias": [ "ECO_ENERGY" ],
  "options": [ "POLYLINE" ]
}
```

📨**Response**
```
{
  "usedDestinations": [
    {
      "inputOrder": 0,
      "used": true,
      "usedOrder": 0,
      "matchedCoordinateGps": {
        "lon": 2.321574222824279,
        "lat": 48.86533125
      },
      "confidenceValue": 0.21240678521674997,
      "distanceFromRequest": 0.45,
      "polylineIndex": -1,
      "duration": -1,
      "length": -1
    },
    {
      "inputOrder": 1,
      "used": true,
      "usedOrder": 1,
      "matchedCoordinateGps": {
        "lon": 4.356551936132446,
        "lat": 50.84469875
      },
      "confidenceValue": 0.07687516682978913,
      "distanceFromRequest": 0.14,
      "polylineIndex": -1,
      "duration": 12819,
      "length": 308422
    }
  ],
  "routingRoutes": [
    {
      "length": 308422,
      "duration": 12819,
      "trafficDelay": 0,
      "averageSpeed": 86.61512,
      "maximumSpeed": 50,
      "startUTurnThreshold": 3000,
      "boundingBox": {
        "minLon": 2.30156,
        "minLat": 48.86533125,
        "maxLon": 4.356551936132446,
        "maxLat": 50.84507
      },
      "startStopInfo": {
        "start": {
          "lon": 2.32157,
          "lat": 48.86533
        },
        "stop": {
          "lon": 4.35655,
          "lat": 50.8447
        },
        "distanceFirstMatched": 0.14,
        "distanceLastMatched": 0.14,
        "interDests": null
      },
      "polyline": [
        {
          "lon": 2.321574222824279,
          "lat": 48.86533125
        },
        {
          "lon": 2.3217,
          "lat": 48.86551
        },
```
**📘 Note:** This criterion is meaningful only if `routingEnergyVehicleFeature` is provided.
---
<a name="criteria_fastest"></a>
## 🚀 FASTEST – Optimize for travel time (default)
✅ **Use case**

Compute the fastest route between two or more points.

💡 **What it does**

Finds the route with the shortest travel time based on road types, speed limits, and current speed profiles.
This is the default behavior if no `routingCriterias` are specified.

🔧 **How to enable**

Simply omit `routingCriterias`, or explicitly add `FASTEST` to it.
```
"routingCriterias": ["FASTEST"]
```
<br>📦 **Example**
```
{
  "destinations": [ 
    { "coordinateSat": { "lon": 2.32158, "lat": 48.86533 } },
    { "coordinateSat": { "lon": 4.35655, "lat": 50.8447  } }
  ],
  "routingVehicleProfile": {
    "transportMode": "CAR"
  },
  "routingCriterias": [ "FASTEST" ],
  "options": [ "POLYLINE" ]
}
```
📘 **Note**: If multiple criteria are provided, "FASTEST" is combined with others to influence prioritization.
<br><br>📨**Response**
```
{
  "usedDestinations": [
    {
      "inputOrder": 0,
      "used": true,
      "usedOrder": 0,
      "matchedCoordinateGps": {
        "lon": 2.321574222824279,
        "lat": 48.86533125
      },
      "confidenceValue": 0.21240678521674997,
      "distanceFromRequest": 0.45,
      "polylineIndex": -1,
      "duration": -1,
      "length": -1
    },
    {
      "inputOrder": 1,
      "used": true,
      "usedOrder": 1,
      "matchedCoordinateGps": {
        "lon": 4.356551936132446,
        "lat": 50.84469875
      },
      "confidenceValue": 0.07687516682978913,
      "distanceFromRequest": 0.14,
      "polylineIndex": -1,
      "duration": 12422,
      "length": 308422
    }
  ],
  "routingRoutes": [
    {
      "length": 308422,
      "duration": 12422,
      "trafficDelay": 0,
      "averageSpeed": 89.383286,
      "maximumSpeed": 0,
      "startUTurnThreshold": 3000,
      "boundingBox": {
        "minLon": 2.30156,
        "minLat": 48.86533125,
        "maxLon": 4.356551936132446,
        "maxLat": 50.84507
      },
      "startStopInfo": {
        "start": {
          "lon": 2.32157,
          "lat": 48.86533
        },
        "stop": {
          "lon": 4.35655,
          "lat": 50.8447
        },
        "distanceFirstMatched": 0.14,
        "distanceLastMatched": 0.14,
        "interDests": null
      },
      "polyline": [
        {
          "lon": 2.321574222824279,
          "lat": 48.86533125
        },
        {
          "lon": 2.3217,
          "lat": 48.86551
        },
```
---
<a name="criteria_shortest"></a>
##🛣️ SHORTEST – Optimize for travel distance
✅ **Use case**

Compute the route with the shortest distance between two or more points, even if it takes longer in terms of time.

💡 **What it does**

Finds the route that minimizes total distance traveled, which can be useful for fuel savings, emissions reduction, or delivery cost optimization.
Note: The shortest route is not always the fastest.

🔧 **How to enable**

Add "SHORTEST" to the routingCriterias array in your request.
```
"routingCriterias" : [ "SHORTEST" ]
```
<br>📦 Example
```
{
  "destinations": [ 
    { "coordinateSat": { "lon": 2.32158, "lat": 48.86533 } },
    { "coordinateSat": { "lon": 4.35655, "lat": 50.8447  } }
  ],
  "routingVehicleProfile": {
    "transportMode": "CAR"
  },
  "routingCriterias": [ "SHORTEST" ],
  "options": [ "POLYLINE" ]
}
```
📘 Note: If combined with other criteria like AVOID_TOLLS, the engine will balance between them but prioritize shortest distance.
<br><br>
**📨Response**
```
{
  "usedDestinations": [
    {
      "inputOrder": 0,
      "used": true,
      "usedOrder": 0,
      "matchedCoordinateGps": {
        "lon": 2.321574222824279,
        "lat": 48.86533125
      },
      "confidenceValue": 0.21240678521674997,
      "distanceFromRequest": 0.45,
      "polylineIndex": -1,
      "duration": -1,
      "length": -1
    },
    {
      "inputOrder": 1,
      "used": true,
      "usedOrder": 1,
      "matchedCoordinateGps": {
        "lon": 4.356551936132446,
        "lat": 50.84469875
      },
      "confidenceValue": 0.07687516682978913,
      "distanceFromRequest": 0.14,
      "polylineIndex": -1,
      "duration": 16247,
      "length": 292638
    }
  ],
  "routingRoutes": [
    {
      "length": 292638,
      "duration": 16247,
      "trafficDelay": 0,
      "averageSpeed": 64.842545,
      "maximumSpeed": 0,
      "startUTurnThreshold": 3000,
      "boundingBox": {
        "minLon": 2.321574222824279,
        "minLat": 48.86533125,
        "maxLon": 4.356551936132446,
        "maxLat": 50.84469875
      },
      "startStopInfo": {
        "start": {
          "lon": 2.32157,
          "lat": 48.86533
        },
        "stop": {
          "lon": 4.35655,
          "lat": 50.8447
        },
        "distanceFirstMatched": 0.14,
        "distanceLastMatched": 0.14,
        "interDests": null
      },
      "polyline": [
        {
          "lon": 2.321574222824279,
          "lat": 48.86533125
        },
        {
          "lon": 2.3217,
          "lat": 48.86551
        },
```