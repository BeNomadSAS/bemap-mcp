# 🌱 How to estimate CO₂ emissions for ICE vehicles

This tutorial explains how to configure the routing request to estimate the **energy consumption** of an internal combustion engine (ICE) vehicle, and how to convert this energy into **CO₂ emissions**.

---

## 🔧 Required fields in the routing request

Ask for the estimation with the `ENERGY_CONSUMPTION` option, and describe the vehicle in `routingVehicleProfile.routingEnergyVehicleFeature`.

Set the following 4 fields of the ICE vehicle:

* **dryWeight (kg)**: the vehicle's weight without consumables or passengers
* **auxConsumption (W)**: the consumption of the auxiliary equipment
* **scx (m²)**: the product of the vehicle's front area and its aerodynamic coefficient
* **crr**: the rolling resistance coefficient of the tyres, dimensionless, between 0 and 1 (0.007 in the example below)

Put the weight of the driver, the passengers and the load in **payload (kg)**. Default value is 0. Only the sum of `dryWeight` and `payload` changes the result.

You also need to define these 2 parameters (which reflect a driving profile):

* **maxAccel (m/s²)**: above 0.1
* **maxDecel (m/s²)**: below -0.1

You can use **1.25** and **-1.25** respectively.

Finally set these other parameters:

* **engineEfficiency**: depends on the type of fuel used by the engine:

  * petrol and LPG: approximately **0.25**
  * diesel: approximately **0.3**
* **regenerativeBraking**: false
* **batCapacity**: 1000 (kWh)
  Note: the vehicle has no battery, but a value above 0 is needed: without it, or with 0, the request answers `400`. The value does not affect the result.

---

## 📐 CO₂ emission conversion formula

The estimation of CO₂ emission in kg is the value of the **energyConsumption** field in the response (in kWh) multiplied by **G / K**, where:

**G** = the emission factor (kg CO₂ / L), depending on the fuel:

* petrol: approximately **2.31 kg/L**
* diesel: approximately **2.68 kg/L**
* LPG: approximately **1.66 kg/L**

**K** = the energy released by 1 litre of fuel (kWh/L):

* petrol: approximately **9 kWh/L**
* diesel: approximately **10 kWh/L**
* LPG: approximately **7 kWh/L**

These are approximate values: where your country or your fuel supplier publishes its own factors, use them.

Therefore, to convert the energy consumption **E** (in kWh) into CO₂ emissions (in kg), multiply it by:

* petrol: **2.31 / 9 = 0.257**
* diesel: **2.68 / 10 = 0.268**
* LPG: **1.66 / 7 = 0.237**

---

## 📦 Example request for a diesel car

### Request

```json
{
  "routingMode": "MODE_VIAS",
  "outputLanguage": "fr",
  "destinations": [
    {
      "coordinateSat": {
        "lon": 2.243,
        "lat": 48.89661
      }
    },
    {
      "coordinateSat": {
        "lon": 2.649556640625001,
        "lat": 48.81703451637949
      }
    }
  ],
  "options": [
    "ENERGY_CONSUMPTION"
  ],
  "routingVehicleProfile": {
    "transportMode": "CAR",
    "routingEnergyVehicleFeature": {
      "dryWeight": 1000,
      "crr": 0.007,
      "scx": 0.7,
      "auxConsumption": 400,
      "payload": 150,
      "maxAccel": 1.25,
      "maxDecel": -1.25,
      "engineEfficiency": 0.3,
      "regenerativeBraking": false,
      "batCapacity": 1000
    }
  }
}
```

### Response

The energy is in the route's `energyConsumption` field (the other fields are left out):

```json
{
  "routingRoutes": [
    {
      "length": 41991,
      "energyConsumption": 18.38025842359699
    }
  ]
}
```

### CO₂ emission

```
CO₂ emission = 18.38025842359699 × 0.268 = 4.9 kg
```

---

_BeNomad MCP: a tutorial BeMap does not publish yet, served until it does (BEMAP-1938)._
