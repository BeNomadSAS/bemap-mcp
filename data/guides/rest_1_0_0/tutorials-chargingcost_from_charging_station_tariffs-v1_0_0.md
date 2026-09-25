# 💶 Step-by-Step – Compute a Charging Cost from Charging Station and Tariffs data

This tutorial walks you through **how to turn the data you already retrieved from the Charging Station and the Tariffs services into a charging cost estimation**.

The [Charging Cost](index.html#subpage-rest_1_0_0-chargingcost-service.md) service does not look anything up by itself: it prices a charging session from the values **you** provide. Those values are exactly the ones returned by the two previous calls, so the whole job is to copy the right fields into the right place.

---
## 🗺️ The Big Picture

```
{"bemap":{"language":"mermaid","graphid":"chargingCostPipeline"}}
%%{init: {'theme':'forest'}}%%
flowchart TB
search["1. Charging Station search<br/>/chargingstation/search/1.0"]
tariffs["2. Charging Station Tariffs<br/>/chargingstation/tariffs/1.0/search"]
vehicle["Vehicle<br/>/vehicle/1.0/findvehicles"]
cost["3. Charging Cost<br/>/chargingcost/1.0"]
estimation["Estimation<br/>chargingTime, energyUsed,<br/>chargingCost: withoutVat / includeVat"]

search -->|"poolId, chargingPointId,<br/>connector operatorId"| tariffs
search -->|"connector type id, power,<br/>currentType, timeZone"| cost
tariffs -->|"currency, tariffItems,<br/>minPrice, maxPrice"| cost
vehicle -->|"vehicle key"| cost
cost --> estimation
```

Each box of the diagram is one call, and each arrow is data you carry from one call to the next:

1. **Charging Station search** locates the stations around a coordinate. Pick the connector the driver is going to plug into: the answer holds both the identifiers naming that connector at the operator, and its technical characteristics.
2. **Charging Station Tariffs** returns the prices of that exact connector. It is asked with the three identifiers of step 1, so it answers for one connector and not for the whole station.
3. **Vehicle** provides the vehicle key. It is a one-off call: get the key once and reuse it for every estimation.
4. **Charging Cost** puts everything together. From the vehicle and the connector it works out how long the charge takes and how much energy it needs, then prices that energy with the tariff of step 2.

The result is an **estimation**: the charging time, the energy delivered, and the cost before and after taxes.

💡 Nothing is looked up twice. Steps 1 and 2 are the ones that talk to the charging network; step 4 only computes, from the values you hand over.

All the requests below are sent with the HTTP method `POST` and the header `Content-Type: application/json`.
See the [authentication page](index.html#page-authentication.md) for the login and password process.

---
## 🔌 Step 1 – Collect the connector data (Charging Station service)

Start from a regular charging station search. See [Build Your First Charging Station Request](index.html#subpage-rest_1_0_0-tutorials-chargingstation-service-v1_0_0-first_request.md) if you are not familiar with it.

Request sent to `/bgis/service/chargingstation/search/1.0`:
```
{
  "geoserver": "osm",
  "providers": ["ecoMovement"],
  "mode": "LOCAL_OR_REMOTE",
  "options": ["PATH_POINT"],
  "radius": 300,
  "coordinate": {
    "lon": 2.3412,
    "lat": 48.8569
  }
}
```

Response (only the fields used by this tutorial are shown):
```
{
  "pools": [
    {
      "providerName": "ecoMovement",
      "id": "3c4b35cc-368f-11f0-94a6-42010aa40043",
      "nameOfPool": "Parking Saint-Germain",
      "timeZone": "Europe/Paris",
      "chargingStations": [
        {
          "chargingPoints": [
            {
              "id": "FR*IOY*E448904",
              "currentType": "DC",
              "power": 50,
              "voltage": 400,
              "connectorTypes": [
                {
                  "id": 38,
                  "key": "COMBO_2-ATTACHED_CABLE",
                  "operatorId": "1",
                  "name": "Cable Combo2",
                  "norm": "CCS with type 2 (Europe)",
                  "maxPower": 350,
                  "power": 50,
                  "dc": true,
                  "cable": true
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

🧾 **Keep these values**, they feed both of the next steps:

| Value from the search                                              | Used later as                          |
| ------------------------------------------------------------------ | -------------------------------------- |
| `pools[].id` → `3c4b35cc-368f-11f0-94a6-42010aa40043`               | Tariffs: `links[].poolId`              |
| `pools[].chargingStations[].chargingPoints[].id` → `FR*IOY*E448904` | Tariffs: `links[].chargingPointId`     |
| `...connectorTypes[].operatorId` → `1`                              | Tariffs: `links[].connectorId`         |
| `...connectorTypes[].id` → `38`                                     | Charging Cost: `charges[].cnnTypeId`   |
| `...chargingPoints[].power` → `50`                                  | Charging Cost: `charges[].power`       |
| `...chargingPoints[].currentType` → `DC`                            | Charging Cost: `charges[].currentType` |
| `pools[].timeZone` → `Europe/Paris`                                 | Charging Cost: `charges[].timeZone`    |

⚠️ Do not mix up the two connector identifiers:

- `connectorTypes[].operatorId` is the identifier of the physical connector at the operator, used to ask for its tariffs;
- `connectorTypes[].id` is the **BeMap connector type** identifier (see the [connector glossary](index.html#page-glossary-chargingstation-connectors.md)), used to price the charge.

💡 The `timeZone` is what makes a time based tariff (night rate, week-end rate…) resolve to the right local time. Always carry it over.

---
## 💳 Step 2 – Get the tariffs (Charging Station Tariffs service)

Build the `links` array with the three identifiers collected in step 1. Optionally add the `chargePassHashIds` of the charge passes your user owns; the AD_HOC (direct payment) tariffs are always returned anyway.

The hash IDs come from the [Charge Pass service](index.html#subpage-rest_1_0_0-chargingstation-chargepass-service.md).

Request sent to `/bgis/service/chargingstation/tariffs/1.0/search`:
```
{
  "providerName": "ecoMovement",
  "chargePassHashIds": [
    "b6c2f14ed716704ba648926f26071da0"
  ],
  "links": [
    {
      "poolId": "3c4b35cc-368f-11f0-94a6-42010aa40043",
      "chargingPointId": "FR*IOY*E448904",
      "connectorId": "1"
    }
  ]
}
```

Response:
```
{
  "items": [
    {
      "poolId": "3c4b35cc-368f-11f0-94a6-42010aa40043",
      "chargingPointId": "FR*IOY*E448904",
      "connectorId": "1",
      "tariffContent": {
        "id": "696513356c695139442c3013",
        "providerName": "ecoMovement",
        "providerTariffId": "e861f26fed5e26b956f34e6cc2439d11e7e9c4c5939465326224baf132b4b418",
        "type": "MSP",
        "chargePass": {
          "hashId": "b6c2f14ed716704ba648926f26071da0",
          "networkName": "EnBW",
          "title": "EnBW mobility+ Ladetarif M",
          "currency": "EUR",
          "subscriptionType": "monthly",
          "subscriptionFeeExclVat": 5.0336
        },
        "currency": "EUR",
        "tariffItems": [
          {
            "restriction": {
              "minDuration": 14400,
              "maxDuration": 21600
            },
            "prices": [
              {
                "type": "ENERGY",
                "unit": "PER_KWH",
                "price": 0.4917,
                "vat": 20.0,
                "minAmount": 1.0
              },
              {
                "type": "PARKING_TIME",
                "unit": "PER_HOUR",
                "price": 5.0,
                "vat": 20.0,
                "minAmount": 60.0
              }
            ]
          },
          {
            "prices": [
              {
                "type": "ENERGY",
                "unit": "PER_KWH",
                "price": 0.4917,
                "vat": 20.0,
                "minAmount": 1.0
              }
            ]
          }
        ]
      }
    }
  ]
}
```

---
## 🎯 Step 3 – Pick the tariff to apply

One connector can be sold under several tariffs, so `items` may contain **several entries for the same link**. Pick one, and only one, before computing a cost:

| `tariffContent.type` | Meaning                                                                    |
| -------------------- | -------------------------------------------------------------------------- |
| `AD_HOC`             | Direct payment, no contract. The fallback when the user has no charge pass. |
| `MSP`                | Tariff of a mobility service provider, tied to `chargePass.hashId`.         |
| `CPO_SUB`            | Subscription offered by the charge point operator itself.                   |

Filter on `type`, or on `tariffContent.chargePass.hashId` when you want the tariff of a specific charge pass.

⚠️ A recurring subscription fee (`chargePass.subscriptionFeeExclVat`) is **not** part of a session cost and is never included in the estimation. Display it separately if your UI needs it.

---
## 🚗 Step 4 – Pick the vehicle

The charging time, and therefore the energy actually billed, depends on the vehicle charge curve. Get the vehicle key once from `/bgis/service/vehicle/1.0/findvehicles` and reuse it:
```
"vehicle": "d729502b-12ba-4adb-89bd-cff6a2d00919"
```
See the [Vehicle service](index.html#subpage-rest_1_0_0-vehicle-findvehicles-service-v1_0_0.md) for the full list.

---
## 🧩 Step 5 – Map the collected fields into the Charging Cost request

This is the heart of the tutorial. Every field below is copied, not recomputed:

| Charging Cost field     | Comes from                                                   |
| ----------------------- | ------------------------------------------------------------ |
| `charges[].cnnTypeId`   | Charging Station → `...connectorTypes[].id`                  |
| `charges[].power`       | Charging Station → `...chargingPoints[].power` (kW)          |
| `charges[].currentType` | Charging Station → `...chargingPoints[].currentType`         |
| `charges[].timeZone`    | Charging Station → `pools[].timeZone`                        |
| `charges[].currency`    | Tariffs → `items[].tariffContent.currency`                   |
| `charges[].tariffs`     | Tariffs → `items[].tariffContent.tariffItems` (copied as is) |
| `charges[].minPrice`    | Tariffs → `items[].tariffContent.minPrice` (when present)    |
| `charges[].maxPrice`    | Tariffs → `items[].tariffContent.maxPrice` (when present)    |
| `vehicle`               | Vehicle service → vehicle key                                |

And these ones describe the session you want to price, they come from your application:

| Field                 | Description                                                                                      |
| --------------------- | ------------------------------------------------------------------------------------------------ |
| `charges[].curBatLvl` | Battery level when plugging in, in % (0 to 100). **Mandatory.**                                   |
| `charges[].toBatLvl`  | Target battery level, in %. Defaults to `100`, must be greater than `curBatLvl`.                  |
| `temperature`         | Outside temperature in °C, between -50 and 100. It changes the usable battery capacity.           |
| `time`                | Timestamp in milliseconds of the charge. Used with `timeZone` to resolve the tariff restrictions. |
| `cur`                 | Currency the result is converted into, ISO 4217. See [Currency Codes](index.html#subpage-rest_1_0_0-currency-codes-service.md). |

📋 **Copy `tariffItems` in its original order.** The order is meaningful: for each dimension, the service applies the price of the **first** item that carries this dimension and whose restrictions hold. Reordering or filtering the array changes the price.

💡 The `charges` array accepts several charges at once, one per connector you want to compare. Estimations are returned in the same order.

---
## 📦 Step 6 – The complete request

Request sent to `/bgis/service/chargingcost/1.0`:
```
{
  "geoserver": "osm",
  "vehicle": "d729502b-12ba-4adb-89bd-cff6a2d00919",
  "time": 1781526600000,
  "temperature": 20,
  "cur": "EUR",
  "charges": [
    {
      "curBatLvl": 23,
      "toBatLvl": 80,
      "currentType": "DC",
      "power": 50,
      "cnnTypeId": 38,
      "timeZone": "Europe/Paris",
      "currency": "EUR",
      "tariffs": [
        {
          "restriction": {
            "minDuration": 14400,
            "maxDuration": 21600
          },
          "prices": [
            {
              "type": "ENERGY",
              "unit": "PER_KWH",
              "price": 0.4917,
              "vat": 20.0,
              "minAmount": 1.0
            },
            {
              "type": "PARKING_TIME",
              "unit": "PER_HOUR",
              "price": 5.0,
              "vat": 20.0,
              "minAmount": 60.0
            }
          ]
        },
        {
          "prices": [
            {
              "type": "ENERGY",
              "unit": "PER_KWH",
              "price": 0.4917,
              "vat": 20.0,
              "minAmount": 1.0
            }
          ]
        }
      ]
    }
  ]
}
```

Note how `tariffs` is a verbatim copy of `tariffContent.tariffItems` from step 2, and `currency` a copy of `tariffContent.currency`.
The timestamp `1781526600000` stands for 2026-06-15 14:30, local time of `Europe/Paris`.

---
## 📥 Response Analysis

```
{
  "estimations": [
    {
      "chargingTime": 2462,
      "energyUsed": 34.2,
      "batChargeLvl": 80,
      "chargingCost": {
        "currency": "EUR",
        "withoutVat": 16.81614,
        "includeVat": 20.179367
      }
    }
  ]
}
```

| Field                     | Description                                                     |
| ------------------------- | --------------------------------------------------------------- |
| `chargingTime`            | Charging time in seconds (here ≈ 41 min)                        |
| `energyUsed`              | Energy delivered in kWh to go from `curBatLvl` to `toBatLvl`    |
| `batChargeLvl`            | Battery level reached, in %                                     |
| `chargingCost.currency`   | Currency of the amounts, after conversion into `cur` when needed |
| `chargingCost.withoutVat` | Amount before taxes                                             |
| `chargingCost.includeVat` | Amount taxes included                                           |

🔎 **Checking the numbers.** The session lasts 2462 s, which is below the `minDuration` of 14400 s, so the first tariff item never applies. The second item prices the whole energy:

```
34.2 kWh × 0.4917 €/kWh     = 16.81614 € excluding VAT
16.81614 € × (1 + 20 / 100) = 20.179367 € including VAT
```

⚠️ `chargingTime` and `energyUsed` depend on the vehicle charge curve, on the temperature and on the power actually delivered, so your own figures will differ. The cost, however, is always the plain arithmetic above applied to the returned `energyUsed`.

---
## 🧮 How the cost is computed

The calculation follows the OCPI pricing rules. Understanding them explains most of the results that look surprising at first sight.

### The four price dimensions

| `type`         | Priced quantity                                  | `unit`     |
| -------------- | ------------------------------------------------ | ---------- |
| `ENERGY`       | Energy delivered, in kWh                         | `PER_KWH`  |
| `TIME`         | Time spent **charging**, in seconds              | `PER_HOUR` |
| `PARKING_TIME` | Time plugged in **without charging**, in seconds | `PER_HOUR` |
| `FLAT`         | A single session fee, quantity independent       | none       |

⚠️ The Charging Cost service prices a session that ends when the charge ends, so the idle period is zero and a `PARKING_TIME` price contributes **0** to the result. This is why the `PARKING_TIME` line of the example above does not appear in the total. Use `TIME` if you want to bill the charging period itself.

### Selection of the applicable price

For each dimension, the service walks the `tariffs` array **in order** and keeps the price of the first item that:

1. carries a price for this dimension, **and**
2. has no restriction, or a restriction that holds for the session.

If no item matches, the dimension is simply not billed.

### Restrictions

| Field                         | Effect                                                                  |
| ----------------------------- | ----------------------------------------------------------------------- |
| `minDuration` / `maxDuration` | Session duration in seconds the item applies to                         |
| `minKwh` / `maxKwh`           | Energy window in kWh                                                    |
| `minPower` / `maxPower`       | Charging power window in kW (`minPower` inclusive, `maxPower` exclusive) |
| `startTime` / `endTime`       | Time of day window, `hh:mm`, in the local time of `timeZone`             |
| `startDate` / `endDate`       | Date window, `yyyy-MM-dd`                                               |
| `dayOfWeek`                   | `MONDAY` … `SUNDAY`                                                     |

Time and date restrictions can only be resolved when `time` is provided. Without it, they are ignored rather than treated as unmatched, so that a purely time based tariff does not silently return a cost of zero.

### `minAmount`, `minPrice` and `maxPrice`

- `minAmount` is the OCPI *step size*: the billed quantity is rounded **up** to the next multiple. It is expressed in **Wh** for `ENERGY` and in **seconds** for `TIME` and `PARKING_TIME`. In the example, `"minAmount": 1.0` on the energy means a 1 Wh step, which leaves 34.2 kWh unchanged.
- `minPrice` and `maxPrice` are session floors and ceilings. They are set on `charges[]`, not inside a tariff item, and are applied at the very end of the calculation.

### VAT and currency

Prices are given excluding taxes; `vat` is the percentage applied to produce `includeVat`. A `vat` of `0`, or an omitted `vat`, means no tax is added.

When `cur` differs from `charges[].currency`, both amounts are converted with the current exchange rate of the [Currency service](index.html#subpage-rest_1_0_0-currency-convert-service.md). If the rate cannot be found, the amounts are returned in the original currency, so always read `chargingCost.currency` rather than assuming it equals `cur`.

---
## 🧯 Troubleshooting

| Symptom                                    | Likely cause                                                                                           |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------------ |
| `Connector type ID is not found.`          | `cnnTypeId` was filled with `operatorId` instead of `connectorTypes[].id`.                              |
| `Vehicle '…' cannot be found.`             | The vehicle key is unknown or not granted to your account.                                              |
| `INVALID_TO_BATTERY_LEVEL`                 | `toBatLvl` is lower than `curBatLvl`, or one of them is outside 0–100.                                  |
| `Temperature is out of range, -50 to 100.` | `temperature` must be given in °C.                                                                      |
| `chargingCost` is `null`                   | `tariffs` is empty or missing. The service prices nothing without tariff items.                         |
| Cost is `0`                                | The tariff was not active at `time` (`startDateTime` / `endDateTime`), or no item matched the session.  |
| The night rate is never applied            | `timeZone` is missing, or `time` was not provided.                                                      |
| Result is higher than expected             | An earlier item of the array already prices that dimension. Remember: first match wins.                 |

---
## ✅ Checklist

Before sending the Charging Cost request, make sure that:

- `cnnTypeId` is the **connector type id**, and `power` and `currentType` come from the same charging point;
- `timeZone` is the `timeZone` of the pool;
- `currency` is the currency of the **tariff**, while `cur` is the currency you want to display;
- `tariffs` is the `tariffItems` array of the selected tariff, copied in the same order;
- `time` is set whenever the tariff carries time or date restrictions;
- `curBatLvl` is lower than `toBatLvl`, both in the 0–100 range.

---
## 🔗 Going further

- [Charging Cost service](index.html#subpage-rest_1_0_0-chargingcost-service.md) – full API reference
- [Charging Station Tariffs service](index.html#subpage-rest_1_0_0-chargingstation-tariffs-service.md) – full API reference
- [Charging Station service](index.html#subpage-rest_1_0_0-chargingstation-search-service.md) – full API reference
- [Charging Time service](index.html#subpage-rest_1_0_0-chargingtime-service.md) – charging duration only, without pricing
- [Connector glossary](index.html#page-glossary-chargingstation-connectors.md) – the list of connector type ids
- [Charging Cost example](index.html#subpage-rest_1_0_0-examples-charging-cost-service-v1_0_0.md) – run a request live
