<a name="routing_event_tutorial"></a>
# 🛰️ Routing Event Tutorial

This tutorial explains how to use the `EVENT` option in routing requests to retrieve **detailed segment-level data** such as elevation, traffic, duration, and more.

Each section includes a use case, a description of the expected result, and a practical JSON example.

---

## 🔧 How to enable EVENTS

To enable event data, simply include `"EVENT"` in your `options` array along with any desired sub-options:

```
"options": [ "EVENT", "EVT_ELEVATION2", "EVT_TRAFFIC" ]
```

This will activate the event system and return additional data for each segment of the route.

---

## 📋 Available EVENT sub-options

For a full list and reference of all `EVENT` sub-options, refer to the [API reference documentation](index.html#subpage-rest_1_0_0-routing-service.md). This tutorial focuses on practical examples.

---

<a name="evt_duplicate_filter"></a>
## ♻️ `EVT_DUPLICATE_FILTER` – Filter repeated values  
✅ **Use case**  

Avoid returning identical event data on every road segment when no change occurs.

📦 **Example**
```
{
  "destinations": [ 
    { "coordinateSat": { "lon": 2.32158, "lat": 48.86533 } },
    { "coordinateSat": { "lon": 4.35655, "lat": 50.8447  } }
  ],
  "routingVehicleProfile": {
    "transportMode": "CAR"
  },
  "options": [ "EVENT", "EVT_DURATION", "EVT_DUPLICATE_FILTER" ]
}
```
**💡 What it does**

This option filters out redundant values across consecutive road segments.
For example, if the speed limit or toll is the same for multiple segments, the value will only be returned once, reducing payload size and improving clarity
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
      "events": [
        {
          "type": "SEGMENT",
          "distanceUnit": "meters",
          "timeUnit": "seconds",
          "markers": [
            {
              "distance": 0,
              "time": 0,
              "percent": 0,
              "entries": [
                {
                  "type": "String",
                  "name": "countryCode",
                  "jsonObject": "{\"type\":\"String\",\"value\":\"FRA\"}"
                },
                {
                  "type": "double",
                  "name": "duration",
                  "jsonObject": "{\"type\":\"double\",\"value\":8479.75}"
                }
              ]
            },
            {
              "distance": 222686,
              "time": 8480,
              "percent": 72.20172361245307,
              "entries": [
                {
                  "type": "String",
                  "name": "countryCode",
                  "jsonObject": "{\"type\":\"String\",\"value\":\"BEL\"}"
                },
                {
                  "type": "double",
                  "name": "duration",
                  "jsonObject": "{\"type\":\"double\",\"value\":3937.12890625}"
                }
              ]
            },
            {
              "distance": 308404,
              "time": 12417,
              "percent": 99.99416384045236,
              "entries": [
                {
                  "type": "double",
                  "name": "duration",
                  "jsonObject": "{\"type\":\"double\",\"value\":4.7890625}"
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}
```
---

<a name="evt_duration"></a>
## ⏱️ `EVT_DURATION` – Segment duration

**✅ Use case**

Add estimated travel time per segment (in seconds).

**📦 Example**
```
{
  "destinations": [ 
    { "coordinateSat": { "lon": 2.32158, "lat": 48.86533 } },
    { "coordinateSat": { "lon": 4.35655, "lat": 50.8447  } }
  ],
  "routingVehicleProfile": {
    "transportMode": "CAR"
  },
  "options": [ "POLYLINE", "EVENT", "EVT_DURATION" ]
}
```

**💡 What it does** 

Appends a `duration` field to each segment of the route. Useful for detailed timing analysis.
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
      "events": [
        {
          "type": "SEGMENT",
          "distanceUnit": "meters",
          "timeUnit": "seconds",
          "markers": [
            {
              "distance": 0,
              "time": 0,
              "percent": 0,
              "entries": [
                {
                  "type": "String",
                  "name": "countryCode",
                  "jsonObject": "{\"type\":\"String\",\"value\":\"FRA\"}"
                },
                {
                  "type": "double",
                  "name": "duration",
                  "jsonObject": "{\"type\":\"double\",\"value\":3.9375}"
                }
              ]
            },
            {
              "distance": 22,
              "time": 4,
              "percent": 0.007133083891551187,
              "entries": [
                {
                  "type": "String",
                  "name": "countryCode",
                  "jsonObject": "{\"type\":\"String\",\"value\":\"FRA\"}"
                },
                {
                  "type": "double",
                  "name": "duration",
                  "jsonObject": "{\"type\":\"double\",\"value\":10.10546875}"
                }
              ]
            },
```
---

<a name="evt_elevation2"></a>
## 🏔️ `EVT_ELEVATION2` – Elevation data

**✅ Use case**  

Include start and end altitude of each segment to assess elevation changes.

**📦 Example**
```
{
  "destinations": [ 
    { "coordinateSat": { "lon": 2.32158, "lat": 48.86533 } },
    { "coordinateSat": { "lon": 4.35655, "lat": 50.8447  } }
  ],
  "routingVehicleProfile": {
    "transportMode": "CAR"
  },
  "options": [ "POLYLINE", "EVENT", "EVT_ELEVATION2" ]
}
```

**💡 What it does** 

Returns `startElevation` and `endElevation` for each segment, enabling slope and terrain analysis.
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
  "events": [
        {
          "type": "SEGMENT",
          "distanceUnit": "meters",
          "timeUnit": "seconds",
          "markers": [
            {
              "distance": 0,
              "time": 0,
              "percent": 0,
              "entries": [
                {
                  "type": "Elevation2",
                  "name": "altitude",
                  "jsonObject": "{\"type\":\"Elevation2\",\"distance\":22,\"fromAltitude\":35.0,\"toAltitude\":34.0,\"length\":22.0,\"duration\":3.94}"
                },
                {
                  "type": "String",
                  "name": "countryCode",
                  "jsonObject": "{\"type\":\"String\",\"value\":\"FRA\"}"
                }
              ]
            },
            {
              "distance": 22,
              "time": 4,
              "percent": 0.007133083891551187,
              "entries": [
                {
                  "type": "Elevation2",
                  "name": "altitude",
                  "jsonObject": "{\"type\":\"Elevation2\",\"distance\":78,\"fromAltitude\":34.0,\"toAltitude\":36.0,\"length\":56.0,\"duration\":10.11}"
                },
                {
                  "type": "String",
                  "name": "countryCode",
                  "jsonObject": "{\"type\":\"String\",\"value\":\"FRA\"}"
                }
              ]
            },
```
---
<a name="evt_encoded_polyline"></a>
## 🧩 `EVT_ENCODED_POLYLINE` – Encoded segment geometry  
✅ **Use case**  

Get a compact polyline geometry for each road segment using encoded format (smaller payload).

📦 **Example**
```
{
  "destinations": [ 
    { "coordinateSat": { "lon": 2.32158, "lat": 48.86533 } },
    { "coordinateSat": { "lon": 4.35655, "lat": 50.8447  } }
  ],
  "routingVehicleProfile": {
    "transportMode": "CAR"
  },
  "options": [ "EVENT", "EVT_ENCODED_POLYLINE" ]
}
```

**💡 What it does**

Adds an encoded polyline (geometry) to each event segment, using a compressed format.
This is useful for minimizing response size when rendering geometry on a map client.
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
      "events": [
        {
          "type": "SEGMENT",
          "distanceUnit": "meters",
          "timeUnit": "seconds",
          "markers": [
            {
              "distance": 0,
              "time": 0,
              "percent": 0,
              "entries": [
                {
                  "type": "String",
                  "name": "countryCode",
                  "jsonObject": "{\"type\":\"String\",\"value\":\"FRA\"}"
                },
                {
                  "type": "String",
                  "name": "encodedPolyline",
                  "jsonObject": "{\"type\":\"String\",\"value\":\"i_giHyldMc@Y\"}"
                }
              ]
            },
            {
              "distance": 22,
              "time": 4,
              "percent": 0.007133083891551187,
              "entries": [
                {
                  "type": "String",
                  "name": "countryCode",
                  "jsonObject": "{\"type\":\"String\",\"value\":\"FRA\"}"
                },
                {
                  "type": "String",
                  "name": "encodedPolyline",
                  "jsonObject": "{\"type\":\"String\",\"value\":\"m`giHsmdMcAg@YE\"}"
                }
              ]
            },
```

---

<a name="evt_energy_consumption"></a>
## 🔋 `EVT_ENERGY_CONSUMPTION` – Energy estimation

**✅ Use case**  

Estimate energy consumption per segment (requires EV profile).

**📦 Example**
```
{
  "destinations": [ 
    { "coordinateSat": { "lon": 2.32158, "lat": 48.86533 } },
    { "coordinateSat": { "lon": 4.35655, "lat": 50.8447  } }
  ],
  "routingVehicleProfile": {
    "transportMode": "CAR",
    "routingEnergyVehicleFeature": {
      "initBatLevel": 60,
      "batCapacity": 70,
      "scx": 0.6,
      "crr": 0.07,
      "dryWeight": 2000,
      "engineEfficiency": 0.6,
      "maxAccel": 130,
      "maxDecel": -100
    }
  },
  "options": [ "EVENT", "EVT_ENERGY_CONSUMPTION" ]
}
```

**💡 What it does**  

Provides energy cost and end-of-autonomy indicators. Useful for EV range prediction.
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
      "energyConsumption": 386.61808375813365,
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
      "events": [
        {
          "type": "SEGMENT",
          "distanceUnit": "meters",
          "timeUnit": "seconds",
          "markers": [
            {
              "distance": 0,
              "time": 0,
              "percent": 0,
              "entries": [
                {
                  "type": "String",
                  "name": "countryCode",
                  "jsonObject": "{\"type\":\"String\",\"value\":\"FRA\"}"
                }
              ]
            },
            {
              "distance": 22,
              "time": 4,
              "percent": 0.007133083891551187,
              "entries": [
                {
                  "type": "String",
                  "name": "countryCode",
                  "jsonObject": "{\"type\":\"String\",\"value\":\"FRA\"}"
                }
              ]
            },
```
---
<a name="evt_energy_consumption_sample"></a>
## 🔋 `EVT_ENERGY_CONSUMPTION_SAMPLE` – Detailed energy sample data  
✅ **Use case**  

Retrieve per-second energy consumption data along the route, useful for electric vehicle simulations.

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
      "initBatLevel": 60,
      "batCapacity": 70,
      "scx": 0.6,
      "crr": 0.07,
      "dryWeight": 2000,
      "engineEfficiency": 0.6,
      "maxAccel": 130,
      "maxDecel": -100
    }
  },
  "options": [ "EVENT", "EVT_ENERGY_CONSUMPTION_SAMPLE" ]
}
```
**💡 What it does**

Returns an array of energy samples for each segment, with one entry per second.
Each sample includes:

- distFromStart (meters)
- speed (m/s)
- acceleration (m/s²)
- angle (degrees)
- slope (coefficient)
- cumulativeConsumption (Wh)
- pos (WGS84 coordinates)
- altitude (meters)

⚠️ Requires routingEnergyVehicleFeature to be set in the vehicle profile.
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
      "energyConsumption": 386.61808375813365,
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
      "events": [
        {
          "type": "SEGMENT",
          "distanceUnit": "meters",
          "timeUnit": "seconds",
          "markers": [
            {
              "distance": 0,
              "time": 0,
              "percent": 0,
              "entries": [
                {
                  "type": "String",
                  "name": "countryCode",
                  "jsonObject": "{\"type\":\"String\",\"value\":\"FRA\"}"
                },
                {
                  "type": "EnergySample",
                  "name": "energySample",
                  "jsonObject": "{\"type\":\"EnergySample\",\"distFromStart\":0.0,\"speed\":5.6277354258978125,\"acceleration\":0.0,\"angle\":25.412364342910674,\"slope\":-0.03571428571428571,\"cumulativeConsumption\":0.0,\"pos\":{\"altitude\":34.79140029426688,\"longitude\":2.321574222824279,\"latitude\":48.86533125}}"
                },
                {
                  "type": "EnergySample",
                  "name": "energySample",
                  "jsonObject": "{\"type\":\"EnergySample\",\"distFromStart\":5.6277354258978125,\"speed\":5.6277354258978125,\"acceleration\":0.0,\"angle\":25.412364342910674,\"slope\":-0.03571428571428571,\"cumulativeConsumption\":1.682558786543018,\"pos\":{\"altitude\":34.59040974334196,\"longitude\":2.321603015873016,\"latitude\":48.86537571428572}}"
                },
```
---

<a name="evt_entry_value_as_object"></a>
## 🧱 `EVT_ENTRY_VALUE_AS_OBJECT` – Return entries as JSON objects  
✅ **Use case**  

Ensure all event values are returned as structured JSON objects instead of plain strings.

📦 **Example**
```
{
  "destinations": [ 
    { "coordinateSat": { "lon": 2.32158, "lat": 48.86533 } },
    { "coordinateSat": { "lon": 4.35655, "lat": 50.8447  } }
  ],
  "routingVehicleProfile": {
    "transportMode": "CAR"
  },
  "options": [ "EVENT", "EVT_DURATION", "EVT_ENTRY_VALUE_AS_OBJECT" ]
}
```
**💡 What it does**

By default, some event fields may be returned as strings.
This option forces all entries to use structured JSON format, making them easier to parse and consume programmatically.
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
      "events": [
        {
          "type": "SEGMENT",
          "distanceUnit": "meters",
          "timeUnit": "seconds",
          "markers": [
            {
              "distance": 0,
              "time": 0,
              "percent": 0,
              "entries": [
                {
                  "type": "String",
                  "name": "countryCode",
                  "value": "FRA"
                },
                {
                  "type": "double",
                  "name": "duration",
                  "value": 3.9375
                }
              ]
            },
            {
              "distance": 22,
              "time": 4,
              "percent": 0.007133083891551187,
              "entries": [
                {
                  "type": "String",
                  "name": "countryCode",
                  "value": "FRA"
                },
                {
                  "type": "double",
                  "name": "duration",
                  "value": 10.10546875
                }
              ]
            },
```
---
<a name="evt_geoelement_type"></a>
## 🛣️ `EVT_GEOELEMENT_TYPE` – Road segment type and classification  
✅ **Use case**  
Identify the type and administrative level of each road segment in the route.

📦 **Example**
```
{
  "destinations": [ 
    { "coordinateSat": { "lon": 2.32158, "lat": 48.86533 } },
    { "coordinateSat": { "lon": 4.35655, "lat": 50.8447  } }
  ],
  "routingVehicleProfile": {
    "transportMode": "CAR"
  },
  "options": [ "EVENT", "EVT_GEOELEMENT_TYPE" ]
}
```
💡 What it does
Adds two classification fields to each segment event:

- **`roadAdminLevel`**: the administrative importance of the road  
  **Possible values**: `FOURTH_ROAD`, `TERTIARY_ROAD`, `SECONDARY_ROAD`, `MAIN_ROAD`

- **`geoElementType`**: the physical or functional type of the segment  
  **Possible values**: `PEDESTRIAN`, `ROUNDABOUT`, `SLIP_ROAD`, `ROAD`, `MOTORWAY`, `FERRY`
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
      "events": [
        {
          "type": "SEGMENT",
          "distanceUnit": "meters",
          "timeUnit": "seconds",
          "markers": [
            {
              "distance": 0,
              "time": 0,
              "percent": 0,
              "entries": [
                {
                  "type": "String",
                  "name": "countryCode",
                  "jsonObject": "{\"type\":\"String\",\"value\":\"FRA\"}"
                },
                {
                  "type": "GeoElementType",
                  "name": "geoElementType",
                  "jsonObject": "{\"type\":\"GeoElementType\",\"roadAdminLevel\":\"TERTIARY_ROAD\",\"geoElementType\":\"ROAD\"}"
                }
              ]
            },
            {
              "distance": 22,
              "time": 4,
              "percent": 0.007133083891551187,
              "entries": [
                {
                  "type": "String",
                  "name": "countryCode",
                  "jsonObject": "{\"type\":\"String\",\"value\":\"FRA\"}"
                },
                {
                  "type": "GeoElementType",
                  "name": "geoElementType",
                  "jsonObject": "{\"type\":\"GeoElementType\",\"roadAdminLevel\":\"TERTIARY_ROAD\",\"geoElementType\":\"ROAD\"}"
                }
              ]
            },
```
---

<a name="evt_length"></a>
## 📏 `EVT_LENGTH` – Segment length in meters  
✅ **Use case**  
Get the precise length of each road segment in the route.

📦 **Example**
```
{
  "destinations": [ 
    { "coordinateSat": { "lon": 2.32158, "lat": 48.86533 } },
    { "coordinateSat": { "lon": 4.35655, "lat": 50.8447  } }
  ],
  "routingVehicleProfile": {
    "transportMode": "CAR"
  },
  "options": [ "EVENT", "EVT_LENGTH" ]
}
```
**💡 What it does**
Adds a `length` field (in meters) to each event segment.
This is useful for analytics, cost estimation, or visualizations based on segment size.
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
      "events": [
        {
          "type": "SEGMENT",
          "distanceUnit": "meters",
          "timeUnit": "seconds",
          "markers": [
            {
              "distance": 0,
              "time": 0,
              "percent": 0,
              "entries": [
                {
                  "type": "String",
                  "name": "countryCode",
                  "jsonObject": "{\"type\":\"String\",\"value\":\"FRA\"}"
                },
                {
                  "type": "long",
                  "name": "length",
                  "jsonObject": "{\"type\":\"long\",\"value\":22}"
                }
              ]
            },
            {
              "distance": 22,
              "time": 4,
              "percent": 0.007133083891551187,
              "entries": [
                {
                  "type": "String",
                  "name": "countryCode",
                  "jsonObject": "{\"type\":\"String\",\"value\":\"FRA\"}"
                },
                {
                  "type": "long",
                  "name": "length",
                  "jsonObject": "{\"type\":\"long\",\"value\":56}"
                }
              ]
            },
```
---
<a name="evt_objectid_base64"></a>
## 🧬 `EVT_OBJECTID_BASE64` – Encoded segment ID  
✅ **Use case**  
Retrieve a unique identifier for each segment, useful for map data versioning or tracking.

📦 **Example**
```
{
  "destinations": [ 
    { "coordinateSat": { "lon": 2.32158, "lat": 48.86533 } },
    { "coordinateSat": { "lon": 4.35655, "lat": 50.8447  } }
  ],
  "routingVehicleProfile": {
    "transportMode": "CAR"
  },
  "options": [ "EVENT", "EVT_OBJECTID_BASE64" ]
}
```
**💡 What it does**
Adds an `objectIdBase64` field to each segment event.
This ID is a base64-encoded string uniquely identifying the road segment in BeNomad's map database.
It is linked to a specific map data release and can be used for version comparison or caching logic.
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
      "events": [
        {
          "type": "SEGMENT",
          "distanceUnit": "meters",
          "timeUnit": "seconds",
          "markers": [
            {
              "distance": 0,
              "time": 0,
              "percent": 0,
              "entries": [
                {
                  "type": "String",
                  "name": "countryCode",
                  "jsonObject": "{\"type\":\"String\",\"value\":\"FRA\"}"
                },
                {
                  "type": "String",
                  "name": "objectIdBase64",
                  "jsonObject": "{\"type\":\"String\",\"value\":\"CQAAAAvczwBGUkFfTkVPU05PRV9OVzI=\"}"
                }
              ]
            },
            {
              "distance": 22,
              "time": 4,
              "percent": 0.007133083891551187,
              "entries": [
                {
                  "type": "String",
                  "name": "countryCode",
                  "jsonObject": "{\"type\":\"String\",\"value\":\"FRA\"}"
                },
                {
                  "type": "String",
                  "name": "objectIdBase64",
                  "jsonObject": "{\"type\":\"String\",\"value\":\"CQAAAGndzwBGUkFfTkVPU05PRV9OVzI=\"}"
                }
              ]
            },
```
---
<a name="evt_polyline"></a>
## 🖊️ `EVT_POLYLINE` – Raw polyline geometry  
✅ **Use case**  

Get the full, unencoded geometry of each road segment for precise map rendering.

📦 **Example**
```
{
  "destinations": [ 
    { "coordinateSat": { "lon": 2.32158, "lat": 48.86533 } },
    { "coordinateSat": { "lon": 4.35655, "lat": 50.8447  } }
  ],
  "routingVehicleProfile": {
    "transportMode": "CAR"
  },
  "options": [ "EVENT", "EVT_POLYLINE" ]
}
```
**💡 What it does**

Adds a `polyline` field to each event segment, containing the full list of coordinates in WGS84 format.
Unlike `EVT_ENCODED_POLYLINE`, this version is not encoded, which makes it easier to read or debug but results in larger payloads.
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
      "events": [
        {
          "type": "SEGMENT",
          "distanceUnit": "meters",
          "timeUnit": "seconds",
          "markers": [
            {
              "distance": 0,
              "time": 0,
              "percent": 0,
              "entries": [
                {
                  "type": "String",
                  "name": "countryCode",
                  "jsonObject": "{\"type\":\"String\",\"value\":\"FRA\"}"
                },
                {
                  "type": "Geometry",
                  "name": "polyline",
                  "jsonObject": "{\"type\":\"Geometry\",\"coordinates\":[{\"longitude\":2.321574222824279,\"latitude\":48.86533125},{\"longitude\":2.3217,\"latitude\":48.86551}]}"
                }
              ]
            },
            {
              "distance": 22,
              "time": 4,
              "percent": 0.007133083891551187,
              "entries": [
                {
                  "type": "String",
                  "name": "countryCode",
                  "jsonObject": "{\"type\":\"String\",\"value\":\"FRA\"}"
                },
                {
                  "type": "Geometry",
                  "name": "polyline",
                  "jsonObject": "{\"type\":\"Geometry\",\"coordinates\":[{\"longitude\":2.3217,\"latitude\":48.86551},{\"longitude\":2.3219,\"latitude\":48.86585},{\"longitude\":2.32193,\"latitude\":48.86598}]}"
                }
              ]
            },
```
---
<a name="evt_prohibited_driving"></a>
## ⛔ `EVT_PROHIBITED_DRIVING` – Prohibited driving data  
✅ **Use case**  

Detect segments with driving restrictions such as wrong-way, blocked passages, or forbidden turns.

📦 **Example**
```
{
  "destinations": [ 
    { "coordinateSat": { "lon": 2.32158, "lat": 48.86533 } },
    { "coordinateSat": { "lon": 4.35655, "lat": 50.8447  } }
  ],
  "routingVehicleProfile": {
    "transportMode": "CAR"
  },
  "options": [ "EVENT", "EVT_PROHIBITED_DRIVING" ]
}
```
**💡 What it does**

Adds restricted driving metadata to each event segment, including:

- `againstTrafficDir`: indicates segments going against allowed traffic flow
- `prohibitedTurn`: flags turns that are not allowed
- `prohibitedBlockedPassage`: indicates physically or legally blocked paths

Useful for ensuring compliance with driving rules or enhancing safety checks.
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
      "events": [
        {
          "type": "SEGMENT",
          "distanceUnit": "meters",
          "timeUnit": "seconds",
          "markers": [
            {
              "distance": 0,
              "time": 0,
              "percent": 0,
              "entries": [
                {
                  "type": "String",
                  "name": "countryCode",
                  "jsonObject": "{\"type\":\"String\",\"value\":\"FRA\"}"
                },
                {
                  "type": "boolean",
                  "name": "againstTrafficDir",
                  "jsonObject": "{\"type\":\"boolean\",\"value\":false}"
                },
                {
                  "type": "boolean",
                  "name": "prohibitedTurn",
                  "jsonObject": "{\"type\":\"boolean\",\"value\":false}"
                },
                {
                  "type": "boolean",
                  "name": "prohibitedBlockedPassage",
                  "jsonObject": "{\"type\":\"boolean\",\"value\":false}"
                }
              ]
            },
            {
              "distance": 22,
              "time": 4,
              "percent": 0.007133083891551187,
              "entries": [
                {
                  "type": "String",
                  "name": "countryCode",
                  "jsonObject": "{\"type\":\"String\",\"value\":\"FRA\"}"
                },
                {
                  "type": "boolean",
                  "name": "againstTrafficDir",
                  "jsonObject": "{\"type\":\"boolean\",\"value\":false}"
                },
                {
                  "type": "boolean",
                  "name": "prohibitedTurn",
                  "jsonObject": "{\"type\":\"boolean\",\"value\":false}"
                },
                {
                  "type": "boolean",
                  "name": "prohibitedBlockedPassage",
                  "jsonObject": "{\"type\":\"boolean\",\"value\":false}"
                }
              ]
            },
```
---

<a name="evt_road_feature"></a>
## 🛣️ `EVT_ROAD_FEATURE` – Road details

**✅ Use case** 

Retrieve data about each segment’s characteristics (speed limit, lanes, etc.).

**📦 Example**
```
{
  "destinations": [ 
    { "coordinateSat": { "lon": 2.32158, "lat": 48.86533 } },
    { "coordinateSat": { "lon": 4.35655, "lat": 50.8447  } }
  ],
  "routingVehicleProfile": {
    "transportMode": "CAR"
  },
  "options": [ "EVENT", "EVT_ROAD_FEATURE" ]
}
```

**💡 What it does**  

Adds structural road metadata to help evaluate route quality and constraints.
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
      "events": [
        {
          "type": "SEGMENT",
          "distanceUnit": "meters",
          "timeUnit": "seconds",
          "markers": [
            {
              "distance": 0,
              "time": 0,
              "percent": 0,
              "entries": [
                {
                  "type": "String",
                  "name": "countryCode",
                  "jsonObject": "{\"type\":\"String\",\"value\":\"FRA\"}"
                },
                {
                  "type": "int",
                  "name": "maxSpeed",
                  "jsonObject": "{\"type\":\"int\",\"value\":30}"
                },
                {
                  "type": "boolean",
                  "name": "maxSpeedVerified",
                  "jsonObject": "{\"type\":\"boolean\",\"value\":false}"
                },
                {
                  "type": "int",
                  "name": "averageSpeed",
                  "jsonObject": "{\"type\":\"int\",\"value\":20}"
                },
                {
                  "type": "int",
                  "name": "transTypSpdLimit",
                  "jsonObject": "{\"type\":\"int\",\"value\":30}"
                },
                {
                  "type": "int",
                  "name": "freeFlowSpeed",
                  "jsonObject": "{\"type\":\"int\",\"value\":20}"
                },
                {
                  "type": "double",
                  "name": "usedSpeed",
                  "jsonObject": "{\"type\":\"double\",\"value\":20.0}"
                },
                {
                  "type": "int",
                  "name": "nbLaneNeg",
                  "jsonObject": "{\"type\":\"int\",\"value\":0}"
                },
                {
                  "type": "int",
                  "name": "nbLanePos",
                  "jsonObject": "{\"type\":\"int\",\"value\":9}"
                },
                {
                  "type": "boolean",
                  "name": "mainCategory",
                  "jsonObject": "{\"type\":\"boolean\",\"value\":true}"
                },
                {
                  "type": "boolean",
                  "name": "urbanArea",
                  "jsonObject": "{\"type\":\"boolean\",\"value\":true}"
                },
                {
                  "type": "boolean",
                  "name": "tunnel",
                  "jsonObject": "{\"type\":\"boolean\",\"value\":false}"
                },
                {
                  "type": "boolean",
                  "name": "bridge",
                  "jsonObject": "{\"type\":\"boolean\",\"value\":false}"
                },
                {
                  "type": "boolean",
                  "name": "carPool",
                  "jsonObject": "{\"type\":\"boolean\",\"value\":false}"
                },
                {
                  "type": "boolean",
                  "name": "dualCarriageway",
                  "jsonObject": "{\"type\":\"boolean\",\"value\":false}"
                },
                {
                  "type": "int",
                  "name": "noThroughTraffic",
                  "jsonObject": "{\"type\":\"int\",\"value\":0}"
                },
                {
                  "type": "int",
                  "name": "taxCategory",
                  "jsonObject": "{\"type\":\"int\",\"value\":0}"
                },
                {
                  "type": "int",
                  "name": "tollSide",
                  "jsonObject": "{\"type\":\"int\",\"value\":0}"
                },
                {
                  "type": "boolean",
                  "name": "offRoad",
                  "jsonObject": "{\"type\":\"boolean\",\"value\":false}"
                }
              ]
            },
            {
              "distance": 22,
              "time": 4,
              "percent": 0.007133083891551187,
              "entries": [
                {
                  "type": "String",
                  "name": "countryCode",
                  "jsonObject": "{\"type\":\"String\",\"value\":\"FRA\"}"
                },
                {
                  "type": "int",
                  "name": "maxSpeed",
                  "jsonObject": "{\"type\":\"int\",\"value\":30}"
                },
                {
                  "type": "boolean",
                  "name": "maxSpeedVerified",
                  "jsonObject": "{\"type\":\"boolean\",\"value\":false}"
                },
                {
                  "type": "int",
                  "name": "averageSpeed",
                  "jsonObject": "{\"type\":\"int\",\"value\":20}"
                },
                {
                  "type": "int",
                  "name": "transTypSpdLimit",
                  "jsonObject": "{\"type\":\"int\",\"value\":30}"
                },
                {
                  "type": "int",
                  "name": "freeFlowSpeed",
                  "jsonObject": "{\"type\":\"int\",\"value\":20}"
                },
                {
                  "type": "double",
                  "name": "usedSpeed",
                  "jsonObject": "{\"type\":\"double\",\"value\":20.0}"
                },
                {
                  "type": "int",
                  "name": "nbLaneNeg",
                  "jsonObject": "{\"type\":\"int\",\"value\":0}"
                },
                {
                  "type": "int",
                  "name": "nbLanePos",
                  "jsonObject": "{\"type\":\"int\",\"value\":9}"
                },
                {
                  "type": "boolean",
                  "name": "mainCategory",
                  "jsonObject": "{\"type\":\"boolean\",\"value\":true}"
                },
                {
                  "type": "boolean",
                  "name": "urbanArea",
                  "jsonObject": "{\"type\":\"boolean\",\"value\":true}"
                },
                {
                  "type": "boolean",
                  "name": "tunnel",
                  "jsonObject": "{\"type\":\"boolean\",\"value\":false}"
                },
                {
                  "type": "boolean",
                  "name": "bridge",
                  "jsonObject": "{\"type\":\"boolean\",\"value\":false}"
                },
                {
                  "type": "boolean",
                  "name": "carPool",
                  "jsonObject": "{\"type\":\"boolean\",\"value\":false}"
                },
                {
                  "type": "boolean",
                  "name": "dualCarriageway",
                  "jsonObject": "{\"type\":\"boolean\",\"value\":false}"
                },
                {
                  "type": "int",
                  "name": "noThroughTraffic",
                  "jsonObject": "{\"type\":\"int\",\"value\":0}"
                },
                {
                  "type": "int",
                  "name": "taxCategory",
                  "jsonObject": "{\"type\":\"int\",\"value\":0}"
                },
                {
                  "type": "int",
                  "name": "tollSide",
                  "jsonObject": "{\"type\":\"int\",\"value\":0}"
                },
                {
                  "type": "boolean",
                  "name": "offRoad",
                  "jsonObject": "{\"type\":\"boolean\",\"value\":false}"
                }
              ]
            },
```
---
<a name="evt_routesheet"></a>
## 🗺️ `EVT_ROUTESHEET` – Turn-by-turn instructions

**✅ Use case**  

Include detailed navigation instructions (turn left, continue, etc.).

**📦 Example**
```
{
  "destinations": [ 
    { "coordinateSat": { "lon": 2.32158, "lat": 48.86533 } },
    { "coordinateSat": { "lon": 4.35655, "lat": 50.8447  } }
  ],
  "routingVehicleProfile": {
    "transportMode": "CAR"
  },
  "options": [ "POLYLINE", "EVENT", "EVT_ROUTESHEET" ]
}
```

**💡 What it does**

Returns a route sheet embedded within each event segment. Each step includes instructions and metadata.
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
      "events": [
        {
          "type": "SEGMENT",
          "distanceUnit": "meters",
          "timeUnit": "seconds",
          "markers": [
            {
              "distance": 0,
              "time": 0,
              "percent": 0,
              "entries": [
                {
                  "type": "String",
                  "name": "countryCode",
                  "jsonObject": "{\"type\":\"String\",\"value\":\"FRA\"}"
                },
                {
                  "type": "Routesheet",
                  "name": "routesheet",
                  "jsonObject": "{\"type\":\"Routesheet\",\"routingInstruction\":{\"type\":\"FOLLOW\",\"geoElementType\":\"ROAD\",\"length\":158,\"duration\":36,\"fromName\":\"Place de la Concorde\",\"manoeuvre\":\"STRAIGHT\",\"coordinateWgs84\":{\"longitude\":2.322,\"latitude\":48.86669},\"roundAboutExitNumber\":0,\"toName\":\"Rue Royale\",\"toOn\":\"Rue Royale\",\"textDist\":\"At 158 meters\",\"text\":\"From Place de la Concorde straight on Rue Royale\"}}"
                }
              ]
            },
            {
              "distance": 22,
              "time": 4,
              "percent": 0.007133083891551187,
              "entries": [
                {
                  "type": "String",
                  "name": "countryCode",
                  "jsonObject": "{\"type\":\"String\",\"value\":\"FRA\"}"
                }
              ]
            },
```
---
<a name="evt_segment_info"></a>
## 🧩 `EVT_SEGMENT_INFO` – Segment ID and direction  
✅ **Use case** 

Get technical information about each segment, including its unique ID and travel direction.

📦 **Example**
```
{
  "destinations": [ 
    { "coordinateSat": { "lon": 2.32158, "lat": 48.86533 } },
    { "coordinateSat": { "lon": 4.35655, "lat": 50.8447  } }
  ],
  "routingVehicleProfile": {
    "transportMode": "CAR"
  },
  "options": [ "EVENT", "EVT_SEGMENT_INFO" ]
}
```
**💡 What it does**

Adds metadata to each event segment:

`segmentId`: unique identifier for the segment (if available in map data)

`reverseDirection`: `true` if the segment is traversed in the opposite direction to how it’s stored in the map

This is helpful for advanced navigation engines, debugging route behavior, or reconstructing path logic from the event stream.
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
      "events": [
        {
          "type": "SEGMENT",
          "distanceUnit": "meters",
          "timeUnit": "seconds",
          "markers": [
            {
              "distance": 0,
              "time": 0,
              "percent": 0,
              "entries": [
                {
                  "type": "String",
                  "name": "countryCode",
                  "jsonObject": "{\"type\":\"String\",\"value\":\"FRA\"}"
                },
                {
                  "type": "SegmentInfo",
                  "name": "segmentInfo",
                  "jsonObject": "{\"type\":\"SegmentInfo\",\"id\":\"959514105\",\"length\":22,\"duration\":4,\"reverseDirection\":false}"
                }
              ]
            },
            {
              "distance": 22,
              "time": 4,
              "percent": 0.007133083891551187,
              "entries": [
                {
                  "type": "String",
                  "name": "countryCode",
                  "jsonObject": "{\"type\":\"String\",\"value\":\"FRA\"}"
                },
                {
                  "type": "SegmentInfo",
                  "name": "segmentInfo",
                  "jsonObject": "{\"type\":\"SegmentInfo\",\"id\":\"1214393378\",\"length\":56,\"duration\":10,\"reverseDirection\":false}"
                }
              ]
            },
```
---
<a name="evt_tax_cost"></a>
## 💰 `EVT_TAX_COST` – Tax cost calculation  
✅ **Use case**  

Estimate the tax-related cost per road segment, useful for logistics or transport budgeting.

📦 **Example**
```
{
  "destinations": [ 
    { "coordinateSat": { "lon": 2.32158, "lat": 48.86533 } },
    { "coordinateSat": { "lon": 4.35655, "lat": 50.8447  } }
  ],
  "routingVehicleProfile": {
    "transportMode": "CAR",
    "routingVehicleFeature": {
      "vehicleType": "CAR",
      "axleNumber": 4
    }
  },
  "options": [ "EVENT", "EVT_TAX_COST" ]
}
```
**💡 What it does**

Adds a `TaxCost` entry to each event segment, containing fields like:

- `RoutingTaxCst`: total tax value

- `RoutingTaxSect`: tax per segment (if applicable)

**⚠️ Requires:**

- A complete `routingVehicleProfile` including `routingVehicleFeature`

- Specific map data (contact support to enable)
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
      "events": [
        {
          "type": "SEGMENT",
          "distanceUnit": "meters",
          "timeUnit": "seconds",
          "markers": [
            {
              "distance": 0,
              "time": 0,
              "percent": 0,
              "entries": [
                {
                  "type": "String",
                  "name": "countryCode",
                  "jsonObject": "{\"type\":\"String\",\"value\":\"FRA\"}"
                }
              ]
            },
            {
              "distance": 22,
              "time": 4,
              "percent": 0.007133083891551187,
              "entries": [
                {
                  "type": "String",
                  "name": "countryCode",
                  "jsonObject": "{\"type\":\"String\",\"value\":\"FRA\"}"
                }
              ]
            },
```

---

<a name="evt_toll_cost"></a>
## 🛣️ `EVT_TOLL_COST` – Toll cost calculation  
✅ **Use case**  

Estimate toll costs per road segment, especially for trucks or paid highways.

📦 **Example**
```
{
  "destinations": [ 
    { "coordinateSat": { "lon": 2.32158, "lat": 48.86533 } },
    { "coordinateSat": { "lon": 4.35655, "lat": 50.8447  } }
  ],
  "routingVehicleProfile": {
    "transportMode": "CAR",
    "routingVehicleFeature": {
      "vehicleType": "TRUCK",
      "emissionClass": "EURO6"
    }
  },
  "options": [ "EVENT", "EVT_TOLL_COST" ]
}
```

**💡 What it does**

Adds a `TollCost` entry to each event segment, with fields like:

- `RoutingTollCst`: total toll amount
- `Tol`: toll details per section

**⚠️ Requires:**

- A valid `routingVehicleProfile` with `routingVehicleFeature`
- Specific toll map data (contact support to activate)

Useful for trip cost estimation, invoicing, or route optimization avoiding excessive tolls.
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
      "duration": 12433,
      "length": 308600
    }
  ],
  "routingRoutes": [
    {
      "length": 308600,
      "duration": 12433,
      "trafficDelay": 0,
      "averageSpeed": 89.35574,
      "maximumSpeed": 0,
      "startUTurnThreshold": 3000,
      "routingTollCost": {
        "sumFees": [
          {
            "currency": "EUR",
            "feeMin": 9.6,
            "feeMax": 16
          }
        ]
      },
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
      "events": [
        {
          "type": "SEGMENT",
          "distanceUnit": "meters",
          "timeUnit": "seconds",
          "markers": [
            {
              "distance": 0,
              "time": 0,
              "percent": 0,
              "entries": [
                {
                  "type": "String",
                  "name": "countryCode",
                  "jsonObject": "{\"type\":\"String\",\"value\":\"FRA\"}"
                }
              ]
            },
            {
              "distance": 22,
              "time": 4,
              "percent": 0.00712896953985742,
              "entries": [
                {
                  "type": "String",
                  "name": "countryCode",
                  "jsonObject": "{\"type\":\"String\",\"value\":\"FRA\"}"
                }
              ]
            },
```
---
<a name="evt_traffic"></a>
## 🚦 `EVT_TRAFFIC` – Real-time traffic information  
✅ **Use case**  

Get real-time traffic conditions per segment for display, alerting, or post-analysis.

📦 **Example**
```
{
  "destinations": [ 
    { "coordinateSat": { "lon": 2.32158, "lat": 48.86533 } },
    { "coordinateSat": { "lon": 4.35655, "lat": 50.8447  } }
  ],
  "routingVehicleProfile": {
    "transportMode": "CAR"
  },
  "options": [ "EVENT", "EVT_TRAFFIC" ]
}
```
**💡 What it does**
Adds a `TrafficElement` to each event segment, including:

`jamFactor` (in %): traffic congestion level

`reason`: textual reason for the traffic (e.g., "accident", "congestion")

`currentAvrSpeed`: average speed currently observed (in km/h)

`freeFlowAvrSpeed`: normal average speed without congestion (in km/h)

**⚠️ Note:**

This option does not alter the computed route.

To influence the routing based on traffic, you must add the global `"TRAFFIC"` option.

Requires specific real-time traffic map data (contact support to enable).
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
      "events": [
        {
          "type": "SEGMENT",
          "distanceUnit": "meters",
          "timeUnit": "seconds",
          "markers": [
            {
              "distance": 0,
              "time": 0,
              "percent": 0,
              "entries": [
                {
                  "type": "String",
                  "name": "countryCode",
                  "jsonObject": "{\"type\":\"String\",\"value\":\"FRA\"}"
                },
                {
                  "type": "TrafficElement",
                  "name": "trafficElement",
                  "jsonObject": "{\"type\":\"TrafficElement\",\"trafficElement\":{\"info\":{\"countryCode\":\"FRA\",\"copyright\":\"HERE\",\"releaseDate\":1751617887000,\"lastUpdateDate\":1751617948055},\"elementId\":\"520538604\",\"reverseDirection\":true,\"boundingBoxWgs84\":{\"minXLongitude\":2.32084,\"minYLatitude\":48.86465,\"maxXLongitude\":2.32193,\"maxYLatitude\":48.86653},\"jamFactor\":54.3656,\"reason\":\"NA\",\"reasonCoordinate\":{\"longitude\":2.32193,\"latitude\":48.86615},\"polyline\":[{\"longitude\":2.32193,\"latitude\":48.86615},{\"longitude\":2.32187,\"latitude\":48.86653},{\"longitude\":2.32084,\"latitude\":48.86465},{\"longitude\":2.32093,\"latitude\":48.86467},{\"longitude\":2.32103,\"latitude\":48.8647},{\"longitude\":2.32154,\"latitude\":48.86528},{\"longitude\":2.3217,\"latitude\":48.86551},{\"longitude\":2.3219,\"latitude\":48.86585},{\"longitude\":2.32193,\"latitude\":48.86598},{\"longitude\":2.32193,\"latitude\":48.86615}],\"segmentInfos\":[{\"id\":\"68573794\",\"reverseDirection\":true},{\"id\":\"708801412\",\"reverseDirection\":false},{\"id\":\"56243920\",\"reverseDirection\":false},{\"id\":\"959514105\",\"reverseDirection\":false},{\"id\":\"708801413\",\"reverseDirection\":false},{\"id\":\"1214393378\",\"reverseDirection\":false},{\"id\":\"1214393379\",\"reverseDirection\":false}],\"tmcInternalId\":520538604,\"alertcEbuCountryCode\":\"F\",\"alertcTableId\":32,\"alertcLocationId\":51692,\"alertcExtend\":0,\"alertcCode\":115},\"currentJamFactor\":54.3656,\"statisticJamFactor\":0.0}"
                }
              ]
            },
            {
              "distance": 22,
              "time": 4,
              "percent": 0.007133083891551187,
              "entries": [
                {
                  "type": "String",
                  "name": "countryCode",
                  "jsonObject": "{\"type\":\"String\",\"value\":\"FRA\"}"
                }
              ]
            },
```
---

---

<a name="evt_traffic_signs"></a>
## 🚧 `EVT_TRAFFIC_SIGNS` – Traffic signs

**✅ Use case**  

Display visual and contextual traffic signs along the route segments to enhance safety alerts and navigation awareness.

**📦 Example**
```
{
  "destinations": [ 
    { "coordinateSat": { "lon": 2.32158, "lat": 48.86533 } },
    { "coordinateSat": { "lon": 4.35655, "lat": 50.8447  } }
  ],
  "routingVehicleProfile": {
    "transportMode": "CAR"
  },
  "options": [ "POLYLINE", "EVENT", "EVT_TRAFFIC_SIGNS" ]
}
```

**💡 What it does**  

Adds traffic sign data to the event structure for each segment, with the following fields:
- `text` (optional): descriptive text below the sign.
- `matchedCoordinate`: WGS84 location of the traffic sign.
- `category`: classification of the sign.

**📑 Available `category` values include:**
- `NOT_SUPPORTED`
- `ROAD_NARROWS`
- `SHARP_CURVE_LEFT`
- `SHARP_CURVE_RIGHT`
- `WINDING_RD_LEFT`
- `WINDING_RD_RIGHT`
- `STEEP_HILL_UP`
- `STEEP_HILL_DOWN`
- `LATERAL_WIND`
- `GENERAL_WARNING`
- `RISK_OF_GROUNDING`
- `GENERAL_CURVE`
- `GENERAL_HILL`
- `OBJECT_OVERHANG`
- `ST_NO_OVERTAKING`
- `END_NO_OVERTAKING`
- `PR_OVERTAKING_EL`
- `PR_OVERTAKING_ELR`
- `PR_OVERTAKING_ELL`
- `LANE_MERGE_RIGHT`
- `LANE_MERGE_LEFT`
- `LANE_MERGE_CENTER`
- `RAILWAY_CROSS_PR`
- `RAILWAY_CROSS_UNPR`
- `ST_NO_OVERTAKING_TRUCKS`
- `END_NO_OVERTAKING_TRUCKS`
- `STOP`
- `END_OF_ALL_RESTRICTIONS`
- `ANIMAL_CROSSING`
- `ICY_CONDITIONS`
- `SLIPPERY_ROAD`
- `FALLING_ROCKS`
- `SCHOOL_ZONE`
- `TRAMWAY_CROSSING`
- `CONGESTION_HAZARD`
- `ACCIDENT_HAZARD`
- `PRIORITY_ONCOMING`
- `YIELD_ONCOMING`
- `RIGHT_PRIORITY`
- `PEDESTRIAN_CROSSING`
- `YIELD`
- `NO_ENGINE_BRAKE`
- `ENDOF_NO_ENGINE_BRAKE`
- `NO_IDLING`
- `TRUCK_ROLLOVER`
- `LOW_GEAR`
- `ENDOF_LOW_GEAR`
- `LIGHT`
- `DOUBLE_HAIRPIN`
- `TRIPLE_HAIRPIN`
- `TWO_WAY_TRAFFIC`
- `URBAN_AREA`
- `HUMP_BRIDGE`
- `UNEVEN_ROAD`
- `BICYCLE_CROSSING`
- `YIELD_TO_BICYCLES`
- `NO_TOWED_CARAVAN`
- `NO_TOWED_TRAILER`
- `NO_CAMPER`
- `NO_TURN_ON_RED`
- `TURN_ON_RED`
- `EMBANKMENT`
- `FLOOD_AREA`
- `OBSTACLE`
- `ROAD_SPLIT`
**⚠️ Requires map data including traffic sign annotations. Contact support to enable this feature.**

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
      "events": [
        {
          "type": "SEGMENT",
          "distanceUnit": "meters",
          "timeUnit": "seconds",
          "markers": [
            {
              "distance": 0,
              "time": 0,
              "percent": 0,
              "entries": [
                {
                  "type": "String",
                  "name": "countryCode",
                  "jsonObject": "{\"type\":\"String\",\"value\":\"FRA\"}"
                }
              ]
            },
            {
              "distance": 22,
              "time": 4,
              "percent": 0.007133083891551187,
              "entries": [
                {
                  "type": "String",
                  "name": "countryCode",
                  "jsonObject": "{\"type\":\"String\",\"value\":\"FRA\"}"
                }
              ]
            },
```
---
<a name="evt_waypoints"></a>
## 📍 `EVT_WAYPOINTS` – Waypoints along the route  
✅ **Use case**  

Get reproducible waypoints along the computed route for syncing across devices or re-processing later.

📦 **Example**
```
{
  "destinations": [ 
    { "coordinateSat": { "lon": 2.32158, "lat": 48.86533 } },
    { "coordinateSat": { "lon": 4.35655, "lat": 50.8447  } }
  ],
  "routingVehicleProfile": {
    "transportMode": "CAR"
  },
  "options": [ "EVENT", "EVT_WAYPOINTS" ]
}
```
**💡 What it does**

Adds a list of waypoints in the event structure. Each waypoint includes:
- A coordinate (`lat`, `lon`) in WGS84
- Optional metadata (e.g., order, original destination match, segment ID)

These waypoints represent key points along the route that can be:
- Used to redraw the route on another map system
- Reused as input for another routing query
- Synced across devices for continuity

Ideal for applications that need offline navigation continuity or route sharing.

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
      "events": [
        {
          "type": "SEGMENT",
          "distanceUnit": "meters",
          "timeUnit": "seconds",
          "markers": [
            {
              "distance": 0,
              "time": 0,
              "percent": 0,
              "entries": [
                {
                  "type": "String",
                  "name": "countryCode",
                  "jsonObject": "{\"type\":\"String\",\"value\":\"FRA\"}"
                },
                {
                  "type": "Waypoint",
                  "name": "waypoint",
                  "jsonObject": "{\"type\":\"Waypoint\",\"waypoint\":{\"usedDestinationIndex\":0,\"polylineIndex\":-1,\"coordinate\":{\"lon\":2.321574222824279,\"lat\":48.86533125},\"angle\":25.0,\"radius\":0,\"uturn\":false,\"ignorePoint\":false,\"ignoreTrafficDirections\":false,\"ignoreRoadBlocks\":false,\"ignoreRestrictions\":false,\"avoidUTurn\":\"UNDEF\",\"useStartAngle\":\"UNDEF\",\"useStopRoadSide\":\"UNDEF\"}}"
                }
              ]
            },
            {
              "distance": 22,
              "time": 4,
              "percent": 0.007133083891551187,
              "entries": [
                {
                  "type": "String",
                  "name": "countryCode",
                  "jsonObject": "{\"type\":\"String\",\"value\":\"FRA\"}"
                }
              ]
            },
```