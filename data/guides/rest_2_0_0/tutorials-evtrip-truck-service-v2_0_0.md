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
- `weight`: The total weight of the vehicle in tenths of a tonne: `450` = 45 t. The specification's description says "tens of metric tons", but its own example (`35` = 3.5 t) is the unit the service reads: measured on prod from Paris to Lyon, `450` changes the route, where `45` (4.5 t) gives the same route as no weight.
- `hazardousMaterials`: Specific types of hazardous materials being transported (e.g., `EXPLOSIVE`).
- 🔗 See the full [EV Smart Routing API Reference](index.html#subpage-rest_2_0_0-evsmartrouting-service-v2_0_0.md) for more details.
- 🔗 You can use the [interactive example](index.html#subpage-rest_2_0_0-examples-evsmartrouting-service-v2_0_0.md).

---

## 2. 🛣️ Run the Truck Routing computation

In this example, we calculate a trip for an electric truck between **Amnéville (near Metz)** and **Lunéville (near Nancy)**.

The `vehicle.key` must be a vehicle of the catalogue (`/bgis/service/vehicle/1.1/findvehicles`). On production, the vehicles whose `transportType` is `TRUCK` are two Ford e-Transit vans; this example uses the `e-Transit E425 - L2H2`, and its `feature` block sets the weight and the load of this trip. A key the catalogue does not hold answers `400 INTERNAL_ERROR "EV brands not allowed!"`, which does not say that the vehicle was not found.

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
  "vehicle": {
    "initBatLvl": 50,
    "key": "ef965806-c24f-467e-8aba-b05e63b1ee9d",
    "payload": 75,
    "feature": {
      "weight": 450,
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
- `csps`: The charging station providers (e.g., `ecoMovement`). A trip that needs a charge, like this one, answers `400 NO_REACHABLE_STEP_POINT` without it. The values are your account's providers, the keys of `chargingStationProviders` in `GET /bgis/service/acl/1.0/user/details`.

### 🔌 Charging Station Filters
- To keep only the charging points whose parking spot accepts a truck, add `"csfsVersion": 2` and `"csfs": ["pool.stations.chargingPoints.parkingSpot.transportTypes == TRUCK"]`. Send `csfsVersion` as a number: the specification shows a base64 string (`format: byte`), which the service refuses (`"Ag=="` answers `400 INVALID_ARGUMENT`). Version 2 needs the full path from the pool, and ignores the short form `parkingSpot.transportTypes == TRUCK` (see [Charging station filter v2](index.html#page-chargingstation-filter-v2.md)). Measured on prod on 29 September 2026, no station declares transport types yet: this filter matched no station in twelve charging-station searches across Europe, and with it this trip answers `400 NO_REACHABLE_STEP_POINT`. So the example leaves it out.

### 🚛 Vehicle and Features
- `key`: The unique identifier of the vehicle in the catalogue, here a Ford e-Transit E425 van (transport type `TRUCK`).
- `payload`: The vehicle's payload in kg, e.g.: `75`.
- `feature`:
    - `weight`: Overrides the default weight: `450` = 45 t (tenths of a tonne).
    - `hazardousMaterials`: Overrides the hazardous material constraint (e.g., `EXPLOSIVE`).

### 🔋 Conditions
- `minBatLvl`: The minimum battery level required during the trip (10%).
- `minArrivalBatLvl`: The minimum battery level desired at the destination (15%).

You can find the other condition parameters in the tutorials [First trip](index.html#subpage-rest_2_0_0-tutorials-evtrip-first_trip-service-v2_0_0.md) and [Conditions](index.html#subpage-rest_2_0_0-tutorials-evtrip-conditions-service-v2_0_0.md).
Also, see the full [EV Smart Routing API Reference](index.html#subpage-rest_2_0_0-evsmartrouting-service-v2_0_0.md) for more details.

---

_BeNomad MCP: a corrected copy of BeMap's page, served until BeMap publishes the correction (BEMAP-1938)._
