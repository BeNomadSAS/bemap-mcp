# 🚧 Building a Routing Request
This section guides you through the steps to construct a complete request for the routing API.

Each request is composed of multiple blocks, each defining a key aspect of the route calculation.

## 🧱 Basic Structure
A standard request is a JSON object that includes `destinations`, the only required field, and usually `routingVehicleProfile` (optional: without it, the vehicle is a `CAR`):

```
{
  "destinations": [ ... ],
  "routingVehicleProfile": { ... }
}
```
### 🗺️ 1. destinations
List of GPS coordinates (latitude / longitude) forming the route.
The first point is the **starting point**, the last one is the **destination**, and any others are intermediate waypoints.
```
  "destinations": [
    {
      "coordinateSat": {
        "lon": 2.38261,
        "lat": 48.85356
      }
    },
    {
      "coordinateSat": {
        "lon": 4.35631,
        "lat": 50.84531
      }
    }
  ]
```
### 🚗 2. routingVehicleProfile
Defines the **vehicle type**, **transport mode**, and **physical or legal characteristics** used during routing.

This includes parameters like height, width and length, in centimeters, and weight and axle weight, in tenths of a metric ton (`35` = 3.5 t, `10` = 1 t). The specification's descriptions of `weight` and `axleWeight` say "in tens of metric tons"; their own example, `35` = 3.5 t, is tenths.

**Example:**
```
{
  "routingVehicleProfile": {
    "transportMode": "CAR",
    "routingVehicleFeature": {
      "height": 190,
      "width": 230,
      "length": 1875,
      "weight": 35,
      "axleWeight": 10
    }
  }
}
```

### 🧭 3. routingCriterias (optional)
Specifies route preferences such as avoiding tolls, ferries, or motorways.

**Example:**
```
"routingCriterias": ["AVOID_TOLLS", "AVOID_FERRIES"]
```

### ⚙️ 4. options (optional)
Enables additional output features such as polyline geometry.

**Example:**
```
"options": ["POLYLINE"]
```
### 🔁 Full Example
```
{
  "destinations": [
    {
      "coordinateSat": {
        "lon": 2.38261,
        "lat": 48.85356
      }
    },
    {
      "coordinateSat": {
        "lon": 4.35631,
        "lat": 50.84531
      }
    }
  ],
  "options": [
    "POLYLINE"
  ],
  "routingCriterias": [
    "AVOID_FERRIES",
    "AVOID_TOLLS"
  ],
  "routingVehicleProfile": {
    "transportMode": "CAR",
    "routingVehicleFeature": {
      "height": 190,
      "width": 230,
      "length": 1875,
      "weight": 35,
      "axleWeight": 10
    }
  }
}
```

---

_BeNomad MCP: a corrected copy of BeMap's page, served until BeMap publishes the correction (BEMAP-1938)._
