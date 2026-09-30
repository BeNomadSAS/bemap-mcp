<a name="routing_vehicle_profile_tutorial"></a>
# 🚗 Routing Vehicle Profile Tutorial

This tutorial explains how to configure and use the `routingVehicleProfile` field in your routing requests.  
A vehicle profile allows the routing engine to account for **physical**, **legal**, **toll**, and **energy-related** characteristics of your vehicle, leading to more accurate results.

---

## 🔧 How to enable routingVehicleProfile

Simply add the `routingVehicleProfile` field to your JSON request body.  
It must follow the structure of a [`RoutingVehicleProf`](index.html#subpage-rest_1_0_0-routing-service.md) object:

```
"routingVehicleProfile": {
  "transportMode": "CAR",
  "maxSpeeds": [
    { "type": "ALL", "maxSpeed": 90 }
  ],
  "routingVehicleFeature": {
    "weight": 15,
    "emissionClass": "EURO6"
  }
}
```

`maxSpeeds` belongs to the profile itself, in km/h. `weight` is in tenths of a metric ton: `15` is 1.5 t.

You can combine this with other options such as `EVENT` or `ENERGY_CONSUMPTION` to get detailed segment info or energy consumption estimates.

---

## 🔍 Why use a vehicle profile?
Using a `routingVehicleProfile` allows you to:

- Respect legal constraints (e.g. max height, weight limits)
- Optimize EV routes based on consumption models
- Avoid restricted roads (e.g. tunnels, bridges, zones)
- Get realistic ETA and energy consumption estimates

---

<a name="routing_max_speeds"></a>
## 🚦 `maxSpeeds` – Define vehicle speed limits

✅ **Use case**  

Set custom maximum speeds for the vehicle to influence both **route calculation** and **estimated time of arrival (ETA)** independently.

💡 **What it does** 

Allows you to define speed constraints for:
- Only the route computation (`CAL`)
- Only the ETA computation (`ETA`)
- Or both (`ALL`, default)

This is useful when:
- Your vehicle drives slower than allowed (e.g. heavy truck)
- You want to test a route with lower speeds for simulations

🔧 **How to enable** 

Add the `maxSpeeds` field inside your `routingVehicleProfile`:
```
"routingVehicleProfile": {
  "transportMode": "CAR",
  "maxSpeeds": [
    { "type": "ALL", "maxSpeed": 90 }
  ]
}
```
The speed is `maxSpeed`, in km/h. A misnamed field (`value`) or `maxSpeeds` placed in `routingVehicleFeature` is ignored without an error: on Lyon to Vienne, `{ "type": "ALL", "maxSpeed": 90 }` turns 2 114 s into 2 223 s, while `{ "type": "ALL", "value": 90 }`, or the right entry inside `routingVehicleFeature`, leaves 2 114 s.

📦 **Example**

```
{
  "destinations": [
    { "coordinateSat": { "lon": 4.8357, "lat": 45.7640 } },
    { "coordinateSat": { "lon": 4.8270, "lat": 45.7580 } }
  ],
  "routingVehicleProfile": {
    "transportMode": "TRUCK",
    "maxSpeeds": [
      { "type": "CAL", "maxSpeed": 80 },
      { "type": "ETA", "maxSpeed": 90 }
    ]
  }
}
```

On this short city trip, the limits do not change the route: length and duration are the same without them (3 143 m, 653 s). Only `maximumSpeed` differs: 80 here, 0 without `maxSpeeds`.

📨 **Response**

```
{
  "usedDestinations": [
    {
      "inputOrder": 0,
      "used": true,
      "usedOrder": 0,
      "matchedCoordinateGps": {
        "lon": 4.835807292597741,
        "lat": 45.76399772974804
      },
      "confidenceValue": 0.11460592913955168,
      "distanceFromRequest": 8.34,
      "polylineIndex": -1,
      "duration": -1,
      "length": -1
    },
    {
      "inputOrder": 1,
      "used": true,
      "usedOrder": 1,
      "matchedCoordinateGps": {
        "lon": 4.826440200339454,
        "lat": 45.75826727456483
      },
      "confidenceValue": 0.9723756906077351,
      "distanceFromRequest": 52.68,
      "polylineIndex": -1,
      "duration": 653,
      "length": 3143
    }
  ],
  "routingRoutes": [
    {
      "length": 3143,
      "duration": 653,
      "totalDuration": 653,
      "trafficDelay": 0,
      "departureTime": 0,
      "arrivalTime": 0,
      "averageSpeed": 17.327412,
      "maximumSpeed": 80,
      "startUTurnThreshold": 3000,
      "startStopInfo": {
        "start": {
          "lon": 4.83581,
          "lat": 45.764
        },
        "stop": {
          "lon": 4.82644,
          "lat": 45.75827
        },
        "distanceFirstMatched": 0.25,
        "distanceLastMatched": 0.3,
        "interDests": null
      }
    }
  ]
}
```
---
<a name="routing_energy_vehicle_feature_tutorial"></a>
## ⚡ routingEnergyVehicleFeature – Energy Consumption Parameters
**✅ Use case**

Enable energy consumption estimation and EV-specific routing by defining physical, environmental, and battery-related parameters of the vehicle.
**💡 What it does**

Provides detailed energy profile for the vehicle to allow:

- Estimating battery usage during routing
- Predicting recharging needs
- Applying realistic physical constraints (mass, aerodynamism, etc.)
- Simulating driving behaviors and conditions (temperature, payload, regen braking...)
**🔧 How to enable**

You must include a routingVehicleProfile in your routing request, nest routingEnergyVehicleFeature inside it, and ask for the estimation with the `ENERGY_CONSUMPTION` option: without the option, no `energyConsumption` comes back.
```
"options": [ "ENERGY_CONSUMPTION" ],
"routingVehicleProfile": {
  "transportMode": "CAR",
  "routingEnergyVehicleFeature": {
    "auxConsumption": 1000,
    "batCapacity": 60.0,
    "crr": 0.01,
    "dryWeight": 1600,
    "energyLoad": 45.0,
    "engineEfficiency": 0.9,
    "extTemp": 20.5,
    "maxAccel": 2.5,
    "maxChargePower": 7.2,
    "maxChargePowerAc3": 11.0,
    "maxChargePowerDc": 50.0,
    "maxDecel": -3.0,
    "payload": 200,
    "regenerativeBraking": true,
    "scx": 0.7
    }
}
```

📦 **Example**
```
{
  "destinations": [
    { "coordinateSat": { "lon": 4.8357, "lat": 45.7640 } },
    { "coordinateSat": { "lon": 4.8270, "lat": 45.7580 } }
  ],
  "options": [ "POLYLINE", "ENERGY_CONSUMPTION" ],
  "routingVehicleProfile": {
    "transportMode": "CAR",
    "routingEnergyVehicleFeature": {
      "auxConsumption": 1000,
      "batCapacity": 60.0,
      "crr": 0.01,
      "dryWeight": 1600,
      "energyLoad": 45.0,
      "engineEfficiency": 0.9,
      "extTemp": 20.5,
      "maxAccel": 2.5,
      "maxChargePower": 7.2,
      "maxChargePowerAc3": 11.0,
      "maxChargePowerDc": 50.0,
      "maxDecel": -3.0,
      "payload": 200,
      "regenerativeBraking": true,
      "scx": 0.7
    }
  }
}
```

📨 **Response** (polyline shortened to its first two points; `energyConsumption` is in kWh)
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
        "lon": 4.826440200339454,
        "lat": 45.75826727456483
      },
      "confidenceValue": 0.9723756906077351,
      "distanceFromRequest": 52.68,
      "polylineIndex": -1,
      "duration": 486,
      "length": 1767
    }
  ],
  "routingRoutes": [
    {
      "length": 1767,
      "duration": 486,
      "totalDuration": 486,
      "trafficDelay": 0,
      "departureTime": 0,
      "arrivalTime": 0,
      "averageSpeed": 13.088889,
      "maximumSpeed": 0,
      "startUTurnThreshold": 3000,
      "energyConsumption": 0.4610347183618907,
      "boundingBox": {
        "minLon": 4.82545,
        "minLat": 45.7578,
        "maxLon": 4.83554,
        "maxLat": 45.76492
      },
      "startStopInfo": {
        "start": {
          "lon": 4.83554,
          "lat": 45.76412
        },
        "stop": {
          "lon": 4.82644,
          "lat": 45.75827
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
<a name="routing_speed_ponderation_tutorial"></a>
## 🏁 routingSpeedPonderations – Adjust speed by road type or level
✅ **Use case**

Customize your vehicle's speed based on the **road type** (e.g. motorway, urban, roundabout) and road level (main, secondary, etc.).

💡 **What it does**

Applies a **speed coefficient** to influence the vehicle’s behavior depending on the road characteristics.

Use this to simulate:

- Slower driving in cities or roundabouts

- Faster driving on motorways

- Realistic speed profiles based on actual driving patterns

🔧 **How to enable**

Add the `routingSpeedPonderations` field to your `routingVehicleProfile`:
```
"routingVehicleProfile": {
  "transportMode": "CAR",
  "routingSpeedPonderations": [
    {
      "factor": 0.8,
      "level": 4,
      "pondType": "ETA",
      "roadType": "ROUNDABOUNT"
    },
    {
      "factor": 1.2,
      "level": 1,
      "pondType": "ALL",
      "roadType": "MOTORWAY"
    }
  ]
}
```

`pondType` says what the coefficient changes: `CAL` only the choice of the fastest route, `ETA` only the travel time, `ALL` (default) both. A `CAL` coefficient therefore shows only when it changes the route chosen.

📦 **Example**

From Lyon to Villefranche-sur-Saône, 18 km of it on the motorway:
```
{
  "destinations": [
    { "coordinateSat": { "lon": 4.8357, "lat": 45.7640 } },
    { "coordinateSat": { "lon": 4.7190, "lat": 45.9890 } }
  ],
  "options": ["POLYLINE"],
  "routingVehicleProfile": {
    "transportMode": "CAR",
    "routingSpeedPonderations": [
      {
        "factor": 0.8,
        "level": 4,
        "pondType": "ETA",
        "roadType": "ROUNDABOUNT"
      },
      {
        "factor": 1.2,
        "level": 1,
        "pondType": "ALL",
        "roadType": "MOTORWAY"
      }
    ]
  }
}
```

The route is the same 34 843 m with or without the coefficients; its duration is 2 092 s with them and 2 168 s without. With the motorway coefficient as `CAL`, the duration stays 2 168 s.

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
        "lon": 4.71857,
        "lat": 45.989
      },
      "confidenceValue": 0.17982641828958512,
      "distanceFromRequest": 33.26,
      "polylineIndex": -1,
      "duration": 2092,
      "length": 34843
    }
  ],
  "routingRoutes": [
    {
      "length": 34843,
      "duration": 2092,
      "totalDuration": 2092,
      "trafficDelay": 0,
      "departureTime": 0,
      "arrivalTime": 0,
      "averageSpeed": 59.959274,
      "maximumSpeed": 0,
      "startUTurnThreshold": 3000,
      "boundingBox": {
        "minLon": 4.71619,
        "minLat": 45.74845,
        "maxLon": 4.8382,
        "maxLat": 45.989
      },
      "startStopInfo": {
        "start": {
          "lon": 4.83554,
          "lat": 45.76412
        },
        "stop": {
          "lon": 4.71857,
          "lat": 45.989
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
        }
      ]
    }
  ]
}
```
---
<a name="routing_vehicle_feature_tutorial"></a>
## 🚚 routingVehicleFeature – Define vehicle characteristics

A routing vehicle feature defines **physical, legal, and toll characteristics**. These parameters directly affect the routing result based on map constraints, such as bridge heights, weight limits, hazardous materials, and toll pricing.

✅ **Use case**

- Route a truck carrying hazardous material through allowed tunnels only  
- Avoid bridges with low clearance  
- Apply proper toll cost for commercial vehicles


💡 **What it does**

Each field in `routingVehicleFeature` corresponds to a real-world constraint:

- Physical limits: height, width, length, axleWeight, etc.
- Legal limits: nbTrailer, hazardous materials, ADR category
- Toll impact: emission class, toll category (`tollTransportCategory`), number of axles, hybrid, HOV, etc.

📏 **Units:** `height`, `width`, `length`, `vehHeight` and `trailHeight` are in centimeters; `weight`, `axleWeight` and `vehWeight` are in tenths of a metric ton (`35` = 3.5 t, `12` = 1.2 t). The specification says "tens of metric tons", which its own examples (`35` = 3.5t) contradict: read them as tenths. A weight written in kilograms (`3500`) is read as 350 t, without an error.

🔧 **How to enable**

Add the `routingVehicleFeature` block to your `routingVehicleProfile` in your routing request:

```
"routingVehicleProfile": {
  "transportMode": "TRUCK",
  "routingVehicleFeature": {
    "height": 400,
    "weight": 35,
    "hazardousMaterials": "EXPLOSIVE"
  }
}
```

📦 **Example**

```
{
  "destinations": [
    { "coordinateSat": { "lon": 4.81594, "lat": 45.75508 } },
    { "coordinateSat": { "lon": 2.34241, "lat": 48.85223 } }
  ],
  "routingVehicleProfile": {
    "transportMode": "TRUCK",
    "routingVehicleFeature": {
      "adrTunnelCategory": "CAT_C",
      "axleWeight": 12,
      "caravan": "NO",
      "cial": "YES",
      "disEquipped": "NO",
      "emissionClass": "EURO6",
      "hazardousMaterials": "EXPLOSIVE",
      "height": 420,
      "hov": "NO",
      "hybrid": "NO",
      "length": 1800,
      "nbPassengers": 1,
      "nbTires": 6,
      "nbTrailAxles": 2,
      "nbTrailer": 1,
      "nbVehAxles": 2,
      "onlyPhysical": false,
      "pollMin": "NO",
      "tollTransportCategory": "TRUCK",
      "trailHeight": 220,
      "vehHeight": 200,
      "vehWeight": 25,
      "weight": 35,
      "width": 250
    }
  },
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
        "lon": 2.3423590873895535,
        "lat": 48.85218
      },
      "confidenceValue": 0.16602793114647615,
      "distanceFromRequest": 6.7,
      "polylineIndex": -1,
      "duration": 17239,
      "length": 461562
    }
  ],
  "routingRoutes": [
    {
      "length": 461562,
      "duration": 17239,
      "trafficDelay": 0,
      "averageSpeed": 96.38744,
      "maximumSpeed": 0,
      "startUTurnThreshold": 3000,
      "boundingBox": {
        "minLon": 2.30612,
        "minLat": 45.75484,
        "maxLon": 4.9201,
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
<a name="routing_transport_mode"></a>
## 🚗 transportMode – Define the transportation mode
✅ **Use case**

Specify the transportation mode (car, pedestrian, truck, etc.) to adapt the route calculation to legal access, traffic rules, and restrictions relevant to the vehicle.

💡 **What it does**

The transportation mode affects:
- Access to certain roads (e.g., pedestrian-only streets)
- Turn restrictions and traffic directions
- Applicable traffic data (e.g., emergency vs public transport)

If omitted, the default mode is:
- `CAR` (for standard routing)
- none for the Traceroute service: `transportMode` is required there. Without it, Traceroute answers `400 MISSING_PARAMETER`, whose message is a Java NullPointerException; the `EMERGENCY` default the specification states does not apply.

🔧 **How to enable**

Include the transportMode field in your routingVehicleProfile object:
```
"routingVehicleProfile": {
  "transportMode": "TRUCK"
}
```
📦 **Example**
```
{
  "destinations": [
    { "coordinateSat": { "lon": 4.8357, "lat": 45.7640 } },
    { "coordinateSat": { "lon": 4.8270, "lat": 45.7580 } }
  ],
  "routingVehicleProfile": {
    "transportMode": "PEDESTRIAN"
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
        "lon": 4.835805567159972,
        "lat": 45.7639975
      },
      "confidenceValue": 0.10741947771617216,
      "distanceFromRequest": 8.2,
      "polylineIndex": -1,
      "duration": -1,
      "length": -1
    },
    {
      "inputOrder": 1,
      "used": true,
      "usedOrder": 1,
      "matchedCoordinateGps": {
        "lon": 4.826438509920649,
        "lat": 45.7582675
      },
      "confidenceValue": 0.9746478873239437,
      "distanceFromRequest": 52.81,
      "polylineIndex": -1,
      "duration": 1126,
      "length": 1194
    }
  ],
  "routingRoutes": [
    {
      "length": 1194,
      "duration": 1126,
      "trafficDelay": 0,
      "averageSpeed": 3.8174067,
      "maximumSpeed": 0,
      "startUTurnThreshold": 3000,
      "startStopInfo": {
        "start": {
          "lon": 4.83581,
          "lat": 45.764
        },
        "stop": {
          "lon": 4.82644,
          "lat": 45.75827
        },
        "distanceFirstMatched": 0.28,
        "distanceLastMatched": 0.28,
        "interDests": null
      }
    }
  ]
}
```

---

_BeNomad MCP: a corrected copy of BeMap's page, served until BeMap publishes the correction (BEMAP-1938)._
