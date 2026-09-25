# 🚚 Tutorial: Truck Routing with EV Smart Routing v2.0.0

This tutorial explains **how to perform a route calculation for an electric truck (HGV)** using the EV Smart Routing API version 2.0.0.

In addition to standard electric vehicle parameters, truck routing often requires specific constraints such as weight limits and hazardous materials. The API allows you to either use the default vehicle profile from the database or override it with custom features.

---

## 🧭 Tutorial Overview

1. 🚛 Truck-specific Vehicle Features
2. 🛣️ Run the Truck Routing computation
3. 📋 Understanding the Request Parameters

---

## 1. 🚛 Truck-specific Vehicle Features

The `vehicle` object in the request contains a `feature` block. These parameters are **optional**.

- **Database Profile:** If the `feature` block is omitted, the API uses the default values defined in the vehicle's database profile (linked via the `key`).
- **Override:** Using the `feature` block **overrides** the values from the database for that specific request. This is useful for trucks where the load (weight) or cargo type (hazardous materials) may change from trip to trip.

Key truck features include:
- `weight`: The total weight of the vehicle in tons.
- `hazardousMaterials`: Specific types of hazardous materials being transported (e.g., `EXPLOSIVE`).
- 🔗 See the full [EV Smart Routing API Reference](index.html#subpage-rest_2_0_0-evsmartrouting-service-v2_0_0.md) for more details.
- 🔗 You can use the [interactive example](index.html#subpage-rest_2_0_0-examples-evsmartrouting-service-v2_0_0.md).

---

## 2. 🛣️ Run the Truck Routing computation

In this example, we calculate a trip for an electric truck between **Amnéville (near Metz)** and **Lunéville (near Nancy)**.

### 🔧 Request

**Endpoint URI:** `/bgis/service/2.0/evsmartrouting`

**HTTP header:** `Content-Type: application/json`

**POST data:**
```json
{
  "geoserver": "here",
  "csps": [
    "ecoMovement"
  ],
  "csfsVersion": 2,
  "csfs": [
    "pool.stations.chargingPoints.parkingSpot.transportTypes == TRUCK"
  ],
  "vehicle": {
    "initBatLvl": 50,
    "key": "9df34910-9783-4521-91e3-62e10a2e77d6",
    "payload": 75,
    "feature": {
      "weight": 45,
      "hazardousMaterials": "EXPLOSIVE"
    }
  },
  "start": {
    "lon": 6.15696,
    "lat": 49.24758
  },
  "stop": {
    "lon": 6.4372,
    "lat": 48.58694
  },
  "condition": {
    "minBatLvl": 10,
    "minArrivalBatLvl": 15,
    "temperature": 20,
    "currency": "EUR",
    "encodedGeometry": true,
    "departureTime": 1773937680000,
    "chargePluggingTime": 300,
    "allowNaStatus": true
  }
}
```

---

## 3. 📋 Understanding the Request Parameters

### 🌍 Geoserver and Providers
- `geoserver`: Set to `here` to use HERE map data, which is highly recommended for truck-specific road constraints (bridge heights, weight limits).
- `csps`: The charging station providers (e.g., `ecoMovement`).

### 🔌 Charging Station Filters
- `csfsVersion`: Set to `2` to use the advanced filtering syntax.
- `csfs`: Filters charging stations based on criteria. In this example, we ensure that the charging point has a parking spot compatible with `TRUCK`.

### 🚛 Vehicle and Features
- `key`: The unique identifier for the electric truck model.
- `payload`: The vehicle's payload in kg, e.g.: `75`.
- `feature`:
    - `weight`: Overrides the default truck weight (45 tons).
    - `hazardousMaterials`: Overrides the hazardous material constraint (e.g., `EXPLOSIVE`).

### 🔋 Conditions
- `minBatLvl`: The minimum battery level required during the trip (10%).
- `minArrivalBatLvl`: The minimum battery level desired at the destination (15%).

You can find the others condition paramètres in tutoriels [First trip](index.html#subpage-rest_2_0_0-tutorials-evtrip-conditions-service-v2_0_0.md) and [Conditions](index.html#subpage-rest_2_0_0-tutorials-evtrip-first_trip-service-v2_0_0.md).
Also, see the full [EV Smart Routing API Reference](index.html#subpage-rest_2_0_0-evsmartrouting-service-v2_0_0.md) for more details.
