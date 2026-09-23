## 🎯 TraceRoute - destinations List of GPS Coordinates

### 📌 Description
The `destinations` field is **required**. It defines the list of GPS coordinates to match to the road network. Each point will be processed in sequence to reconstruct the route trace.

Type: `TraceRouteDest[]`

---

## 🔍 Field Breakdown

| Field                    | Required | Description |
|--------------------------|----------|-------------|
| `coordinateSat.lat`      | ✅       | Latitude in decimal degrees (WGS84). |
| `coordinateSat.lon`      | ✅       | Longitude in decimal degrees (WGS84). |
| `coordinateSat.speed`    | ❌       | Speed in km/h. Used to refine ETA if provided. |
| `coordinateSat.time`     | ❌       | Timestamp in milliseconds since Epoch (UTC). |
| `keptByMinimalWp`        | ❌       | If `true`, forces the waypoint to be kept even if simplification is applied. |
| `customData`             | ❌       | Array of key-value pairs to tag the coordinate with custom info. |

---

## 📤 Example – Minimal

```
{
  "destinations": [
    {
      "coordinateSat": {
        "lon": 7.066,
        "lat": 43.616
      }
    },
    {
      "coordinateSat": {
        "lon": 7.0664,
        "lat": 43.6162
      }
    }
  ],
  "routingVehicleProfile": {
    "transportMode": "CAR",
    "routingVehicleFeature": {
      "height": 380,
      "width": 40,
      "length": 1875,
      "weight": 35,
      "axleWeight": 10
    }
  },
  "options": ["ROUTESHEET", "POLYLINE", "POLYLINE_INDEX"]
}
```
>✅ This creates a basic trace between two points (e.g., Eiffel Tower → Louvre).
---
### 📤 Example – With Speed
```
{
  "destinations": [
    {
      "coordinateSat": {
        "lon": 7.066,
        "lat": 43.616,
        "speed": 23.1
      }
    },
    {
      "coordinateSat": {
        "lon": 7.0664,
        "lat": 43.6162
        "speed": 29.3
      }
    }
  ],
  "routingVehicleProfile": {
    "transportMode": "CAR",
    "routingVehicleFeature": {
      "height": 380,
      "width": 40,
      "length": 1875,
      "weight": 35,
      "axleWeight": 10
    }
  },
  "options": ["ROUTESHEET", "POLYLINE", "POLYLINE_INDEX"]
}
```
>✅ Used to refine ETA calculation based on vehicle speed at each point.
---
### 📤 Example - With Heading
```
{
  "destinations": [
    {
      "coordinateSat": {
        "lon": 7.066,
        "lat": 43.616,
        "heading": 17.6
      }
    },
    {
      "coordinateSat": {
        "lon": 7.0664,
        "lat": 43.6162,
        "heading": 95.0
      }
    }
  ],
  "routingVehicleProfile": {
    "transportMode": "CAR",
    "routingVehicleFeature": {
      "height": 380,
      "width": 40,
      "length": 1875,
      "weight": 35,
      "axleWeight": 10
    }
  },
  "options": ["ROUTESHEET", "POLYLINE", "POLYLINE_INDEX"]
}
```
>✅ Heading is used to indicate the vehicle's direction (90° = East).
---
### 📤 Example – With Time
```
{
  "destinations": [
    {
      "coordinateSat": {
        "lon": 7.066,
        "lat": 43.616,
        "time": 1396241966000
      }
    },
    {
      "coordinateSat": {
        "lon": 7.0664,
        "lat": 43.6162,
        "time": 1396241972000
      }
    }
  ],
  "routingVehicleProfile": {
    "transportMode": "CAR",
    "routingVehicleFeature": {
      "height": 380,
      "width": 40,
      "length": 1875,
      "weight": 35,
      "axleWeight": 10
    }
  },
  "options": ["ROUTESHEET", "POLYLINE", "POLYLINE_INDEX"]
}
```
>✅ Use when you want ETA to align with the time of each point (requires adjustEta: true in main request).
---
### 📤 Example - With Sat
```
{
  "destinations": [
    {
      "coordinateSat": {
        "lon": 7.066,
        "lat": 43.616,
        "sat": 11
      }
    },
    {
      "coordinateSat": {
        "lon": 7.0664,
        "lat": 43.6162
        "sat": 11
      },
      "keptByMinimalWp": true
    }
  ],
  "routingVehicleProfile": {
    "transportMode": "CAR",
    "routingVehicleFeature": {
      "height": 380,
      "width": 40,
      "length": 1875,
      "weight": 35,
      "axleWeight": 10
    }
  },
  "options": ["ROUTESHEET", "POLYLINE", "POLYLINE_INDEX"]
}
```
> ✅ Satellite count can improve location accuracy and matching quality.
---
### 📤 Example – With keptByMinimalWp
```
{
  "destinations": [
    {
      "coordinateSat": {
        "lon": 7.066,
        "lat": 43.616
      }
    },
    {
      "coordinateSat": {
        "lon": 7.0664,
        "lat": 43.6162
      },
      "keptByMinimalWp": true
    }
  ],
  "routingVehicleProfile": {
    "transportMode": "CAR",
    "routingVehicleFeature": {
      "height": 380,
      "width": 40,
      "length": 1875,
      "weight": 35,
      "axleWeight": 10
    }
  },
  "options": ["ROUTESHEET", "POLYLINE", "POLYLINE_INDEX"]
}
```
>✅ Forces the waypoint to be retained even if the system applies simplification (e.g. NO_MINIMAL_WAYPOINTS is not used).
---
### 📤 Example – With customData
```
{
  "destinations": [
    {
      "coordinateSat": {
        "lon": 7.066,
        "lat": 43.616
      }
    },
    {
      "coordinateSat": {
        "lon": 7.0664,
        "lat": 43.6162
      },
      "customData": [
        {
          "key": "driver",
          "value": "john_doe"
        },
        {
          "key": "weather",
          "value": "rain"
        }
      ]
    }
  ],
  "routingVehicleProfile": {
    "transportMode": "CAR",
    "routingVehicleFeature": {
      "height": 380,
      "width": 40,
      "length": 1875,
      "weight": 35,
      "axleWeight": 10
    }
  },
  "options": ["ROUTESHEET", "POLYLINE", "POLYLINE_INDEX"]
}
```
>✅ Adds extra tags to a waypoint, useful for post-processing or debugging.