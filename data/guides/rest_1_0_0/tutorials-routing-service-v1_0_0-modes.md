<a name="routing_mode_tutorial"></a>
# 🧪 Routing Mode Tutorial

This tutorial provides clear usage examples for each `routingMode` supported by the routing API. Each example includes:

- ✅ A practical use case  
- 📦 A ready-to-use JSON payload  
- 💡 An explanation of what the request does  

🔧 **How to enable routing criteria**

To define the routing mode, simply include the `routingMode` field in your routing request JSON. Example:
```
"routingMode": "MODE_VIAS"
```

---
<a name="mode_vias"></a>
## 📍 `MODE_VIAS` – Standard route with waypoints

**✅ Use case**  
Compute a standard route from point A to B to C, following the given order.

**📦 Example**
```
{
  "routingMode": "MODE_VIAS",
  "destinations": [
    { "coordinateSat": { "lon": 4.81594, "lat": 45.75508 } },
    { "coordinateSat": { "lon": 5.04476, "lat": 47.33372 } },
    { "coordinateSat": { "lon": 2.34241, "lat": 48.85223 } }
  ],
  "options": ["POLYLINE"],
  "routingVehicleProfile": {
    "transportMode": "CAR"
  }
}
```

**💡 What it does**  
Calculates a **single route** from Lyon → Dijon → Paris, in the exact order.

📨 **Response**

```

{
  "usedDestinations": [
    {
      "inputOrder": 0,
      "used": true,
      "usedOrder": 0,
      "matchedCoordinateGps": {
        "lon": 4.815940190524969,
        "lat": 45.75508125
      },
      "confidenceValue": 0.3742419867167196,
      "distanceFromRequest": 0.14,
      "polylineIndex": -1,
      "duration": -1,
      "length": -1
    },
    {
      "inputOrder": 1,
      "used": true,
      "usedOrder": 1,
      "matchedCoordinateGps": {
        "lon": 5.044754103431373,
        "lat": 47.33364875
      },
      "confidenceValue": 0.3017814726840855,
      "distanceFromRequest": 7.94,
      "polylineIndex": -1,
      "duration": 7202,
      "length": 195778
    },
    {
      "inputOrder": 2,
      "used": true,
      "usedOrder": 2,
      "matchedCoordinateGps": {
        "lon": 2.3423590873895535,
        "lat": 48.85218
      },
      "confidenceValue": 0.16602793114647615,
      "distanceFromRequest": 6.7,
      "polylineIndex": -1,
      "duration": 18933,
      "length": 510058
    }
  ],
  "routingRoutes": [
    {
      "length": 510058,
      "duration": 18933,
      "trafficDelay": 0,
      "averageSpeed": 96.984566,
      "maximumSpeed": 0,
      "startUTurnThreshold": 3000,
      "boundingBox": {
        "minLon": 2.30612,
        "minLat": 45.7515,
        "maxLon": 5.08011,
        "maxLat": 48.85218
      },
      "startStopInfo": {
        "start": {
          "lon": 4.81594,
          "lat": 45.75508
        },
        "stop": {
          "lon": 2.34236,
          "lat": 48.85218
        },
        "distanceFirstMatched": 0.14,
        "distanceLastMatched": 0,
        "interDests": null
      },
      "polyline": [
        {
          "lon": 4.815940190524969,
          "lat": 45.75508125
        },
        {
          "lon": 4.81627,
          "lat": 45.75484
        },
```

---

<a name="mode_1_to_n"></a>
## 🧭 `MODE_1_TO_N` – One origin to many destinations

**✅ Use case**

Compute separate routes from a single starting point to multiple destinations.

**📦 Example**
```
{
  "routingMode": "MODE_1_TO_N",
  "destinations": [
    { "coordinateSat": { "lon": 4.8357, "lat": 45.7640 } },  
    { "coordinateSat": { "lon": 5.3698, "lat": 43.2965 } },
    { "coordinateSat": { "lon": 7.2619, "lat": 43.7102 } },
    { "coordinateSat": { "lon": 2.3522, "lat": 48.8566 } }
  ],
  "options": ["POLYLINE"],
  "routingVehicleProfile": {
    "transportMode": "CAR"
  }
}
```

**💡 What it does** 

Returns **individual routes** from Lyon to each destination:

📨 **Response**

- Lyon → Marseille  
- Lyon → Nice  
- Lyon → Paris  
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
        "lon": 5.37028,
        "lat": 43.29654
      },
      "confidenceValue": 0.4295641187618445,
      "distanceFromRequest": 39.14,
      "polylineIndex": -1,
      "duration": -1,
      "length": -1
    },
    {
      "inputOrder": 2,
      "used": true,
      "usedOrder": 2,
      "matchedCoordinateGps": {
        "lon": 7.2619026033410385,
        "lat": 43.7101925
      },
      "confidenceValue": 0.188395259216171,
      "distanceFromRequest": 0.83,
      "polylineIndex": -1,
      "duration": -1,
      "length": -1
    },
    {
      "inputOrder": 3,
      "used": true,
      "usedOrder": 3,
      "matchedCoordinateGps": {
        "lon": 2.3525263882048697,
        "lat": 48.85722125
      },
      "confidenceValue": 0.007055115402485117,
      "distanceFromRequest": 73.17,
      "polylineIndex": -1,
      "duration": -1,
      "length": -1
    }
  ],
  "routingRoutes": [
    {
      "length": 314264,
      "duration": 11317,
      "trafficDelay": 0,
      "averageSpeed": 99.96911,
      "maximumSpeed": 0,
      "startUTurnThreshold": 3000,
      "boundingBox": {
        "minLon": 4.70685,
        "minLat": 43.29515,
        "maxLon": 5.37173,
        "maxLat": 45.76617
      },
      "startStopInfo": {
        "start": {
          "lon": 4.83554,
          "lat": 45.76412
        },
        "stop": {
          "lon": 5.37028,
          "lat": 43.29654
        },
        "distanceFirstMatched": 0,
        "distanceLastMatched": 0,
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
<a name="mode_n_to_1"></a>
## 🧭 `MODE_N_TO_1` – Many origins to one destination

**✅ Use case**

Calculate independent routes from multiple origins to a single destination.

**📦 Example**
```
{
  "routingMode": "MODE_N_TO_1",
  "destinations": [
    { "coordinateSat": { "lon": 4.8357, "lat": 45.7640 } },
    { "coordinateSat": { "lon": 6.1294, "lat": 46.2044 } },
    { "coordinateSat": { "lon": 5.7224, "lat": 45.1885 } },
    { "coordinateSat": { "lon": 5.0415, "lat": 47.3220 } }
  ],
  "options": ["POLYLINE"],
  "routingVehicleProfile": {
    "transportMode": "CAR"
  }
}
```

**💡 What it does**
 
Returns routes from Lyon, Annecy, and Grenoble **to Dijon** (last point is the destination).

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
        "lon": 6.12971,
        "lat": 46.20452
      },
      "confidenceValue": 0.8268272425249169,
      "distanceFromRequest": 27.37,
      "polylineIndex": -1,
      "duration": -1,
      "length": -1
    },
    {
      "inputOrder": 2,
      "used": true,
      "usedOrder": 2,
      "matchedCoordinateGps": {
        "lon": 5.722293645827602,
        "lat": 45.18855125
      },
      "confidenceValue": 0.7293058379320361,
      "distanceFromRequest": 10.11,
      "polylineIndex": -1,
      "duration": -1,
      "length": -1
    },
    {
      "inputOrder": 3,
      "used": true,
      "usedOrder": 3,
      "matchedCoordinateGps": {
        "lon": 5.0419,
        "lat": 47.32316
      },
      "confidenceValue": 0.011090957769868685,
      "distanceFromRequest": 132.61,
      "polylineIndex": -1,
      "duration": -1,
      "length": -1
    }
  ],
  "routingRoutes": [
    {
      "length": 196040,
      "duration": 7554,
      "trafficDelay": 0,
      "averageSpeed": 93.42653,
      "maximumSpeed": 0,
      "startUTurnThreshold": 3000,
      "boundingBox": {
        "minLon": 4.71619,
        "minLat": 45.75105,
        "maxLon": 5.08011,
        "maxLat": 47.32631
      },
      "startStopInfo": {
        "start": {
          "lon": 4.83554,
          "lat": 45.76412
        },
        "stop": {
          "lon": 5.0419,
          "lat": 47.32316
        },
        "distanceFirstMatched": 0,
        "distanceLastMatched": 0,
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
<a name="mode_n_to_n"></a>
## 🧭 `MODE_N_TO_N` – Full NxN route matrix

**✅ Use case**

Compute all possible routes between each pair of N locations.

**📦 Example**
```
{
  "routingMode": "MODE_N_TO_N",
  "destinations": [
    { "coordinateSat": { "lon": 4.83554, "lat": 45.76412 } },
    { "coordinateSat": { "lon": 5.37028, "lat": 43.29654 } },
    { "coordinateSat": { "lon": 1.48529, "lat": 43.63876 } },
    { "coordinateSat": { "lon": 2.34212, "lat": 48.82982 } }
  ],
  "options": ["POLYLINE"],
  "routingVehicleProfile": {
    "transportMode": "CAR"
  }
}
```

**💡 What it does**

Returns **16 route combinations** (4x4), including every possible origin/destination pair.

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
      "confidenceValue": 0.3741339491916859,
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
        "lon": 5.37028,
        "lat": 43.29654
      },
      "confidenceValue": 0.20007719027402546,
      "distanceFromRequest": 0,
      "polylineIndex": -1,
      "duration": -1,
      "length": -1
    },
    {
      "inputOrder": 2,
      "used": true,
      "usedOrder": 2,
      "matchedCoordinateGps": {
        "lon": 1.4852923354376975,
        "lat": 43.638755
      },
      "confidenceValue": 0.2616331886544867,
      "distanceFromRequest": 0.56,
      "polylineIndex": -1,
      "duration": -1,
      "length": -1
    },
    {
      "inputOrder": 3,
      "used": true,
      "usedOrder": 3,
      "matchedCoordinateGps": {
        "lon": 2.34205,
        "lat": 48.83009
      },
      "confidenceValue": 1,
      "distanceFromRequest": 30.49,
      "polylineIndex": -1,
      "duration": -1,
      "length": -1
    }
  ],
  "routingRoutes": [
    {
      "length": 314264,
      "duration": 11317,
      "trafficDelay": 0,
      "averageSpeed": 99.96911,
      "maximumSpeed": 0,
      "startUTurnThreshold": 3000,
      "boundingBox": {
        "minLon": 4.70685,
        "minLat": 43.29515,
        "maxLon": 5.37173,
        "maxLat": 45.76617
      },
      "startStopInfo": {
        "start": {
          "lon": 4.83554,
          "lat": 45.76412
        },
        "stop": {
          "lon": 5.37028,
          "lat": 43.29654
        },
        "distanceFirstMatched": 0,
        "distanceLastMatched": 0,
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
<a name="mode_matrix"></a>
## 🧮 `MODE_MATRIX` – Distance / time / energy matrix

**✅ Use case**

Get a **matrix** of distances, travel times or energy consumption between multiple origins and destinations.

**📦 Example**
```
{
  "routingMode": "MODE_MATRIX",
  "destinations": [
    { "coordinateSat": { "lon": 4.83554, "lat": 45.76412 } },
    { "coordinateSat": { "lon": 5.6943, "lat": 45.18019 } },
    { "coordinateSat": { "lon": 5.40638, "lat": 43.32238 } },
    { "coordinateSat": { "lon": 1.45128, "lat": 43.61487 } }
  ],
  "options": ["POLYLINE"],
  "routingVehicleProfile": {
    "transportMode": "CAR"
  }
}
```

**💡 What it does**

Returns a table (matrix) with **distance/time/energy values** between each pair of points. No route geometry is included.

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
      "confidenceValue": 0.3741339491916859,
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
        "lon": 5.694295961447033,
        "lat": 45.18018875
      },
      "confidenceValue": 0.06747539959389807,
      "distanceFromRequest": 0.14,
      "polylineIndex": -1,
      "duration": -1,
      "length": -1
    },
    {
      "inputOrder": 2,
      "used": true,
      "usedOrder": 2,
      "matchedCoordinateGps": {
        "lon": 5.4063817189367205,
        "lat": 43.32238125
      },
      "confidenceValue": 0.16168673195683364,
      "distanceFromRequest": 0.14,
      "polylineIndex": -1,
      "duration": -1,
      "length": -1
    },
    {
      "inputOrder": 3,
      "used": true,
      "usedOrder": 3,
      "matchedCoordinateGps": {
        "lon": 1.4512833045462004,
        "lat": 43.6148675
      },
      "confidenceValue": 0.1723633461896529,
      "distanceFromRequest": 0.28,
      "polylineIndex": -1,
      "duration": -1,
      "length": -1
    }
  ],
  "routingRoutes": [
    {
      "length": -1,
      "duration": 0,
      "trafficDelay": 0,
      "averageSpeed": 0,
      "maximumSpeed": 0,
      "startUTurnThreshold": 0,
      "energyConsumption": -1
    },
    {
      "length": -1,
      "duration": 4723,
      "trafficDelay": 0,
      "averageSpeed": 0,
      "maximumSpeed": 0,
      "startUTurnThreshold": 0,
      "energyConsumption": -1
    },
```
---
<a name="mode_isochrone"></a>
## 🗺️ `MODE_ISOCHRONE` – Reachable area

**✅ Use case**

Visualize the area reachable within a given **time**, **distance**, or **energy** limit.

---

**📍 Example: From one point (Lyon)**
```
{
  "routingMode": "MODE_ISOCHRONE",
  "destinations": [
    { "coordinateSat": { "lon": 4.8357, "lat": 45.7640 } }
  ],
  "isoChroneLimit": 1800,
  "options": ["POLYLINE"],
  "routingVehicleProfile": {
    "transportMode": "CAR"
  }
}
```

**💡 What it does**  

Returns the polygon representing the zone reachable **within 30 minutes** from Lyon.

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
    }
  ],
  "routingRoutes": [
    {
      "length": 0,
      "duration": 0,
      "trafficDelay": 0,
      "averageSpeed": 0,
      "maximumSpeed": 0,
      "startUTurnThreshold": 0,
      "boundingBox": {
        "minLon": 4.56677,
        "minLat": 45.5055,
        "maxLon": 5.19823,
        "maxLat": 46.00572
      },
      "polyline": [
        {
          "lon": 4.96174,
          "lat": 45.87819
        },
        {
          "lon": 4.96793,
          "lat": 45.88438
        },
```

---

**📍 Example: From two points with energy constraint**
```
{
  "routingMode": "MODE_ISOCHRONE",
  "destinations": [
    { "coordinateSat": { "lon": 4.8357, "lat": 45.7640 } },
    { "coordinateSat": { "lon": 4.9000, "lat": 45.5600 } }
  ],
  "isoChroneLimit": 3000,
  "options": ["POLYLINE"],
  "routingVehicleProfile": {
    "transportMode": "CAR"
  }
}
```

**💡 What it does**  

Returns the area reachable from Lyon to Valence using **3000 Wh** of energy. Useful for EV range visualization.

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
        "lon": 4.89971,
        "lat": 45.55845
      },
      "confidenceValue": 0.2467450352129857,
      "distanceFromRequest": 174.02,
      "polylineIndex": -1,
      "duration": -1,
      "length": -1
    }
  ],
  "routingRoutes": [
    {
      "length": 0,
      "duration": 0,
      "trafficDelay": 0,
      "averageSpeed": 0,
      "maximumSpeed": 0,
      "startUTurnThreshold": 0,
      "boundingBox": {
        "minLon": 4.73271,
        "minLat": 45.50303,
        "maxLon": 4.92389,
        "maxLat": 45.78482
      },
      "polyline": [
        {
          "lon": 4.81835,
          "lat": 45.63508
        },
        {
          "lon": 4.82443,
          "lat": 45.64226
        },
```