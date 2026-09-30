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
{"bemap":{"language":"request"}}
POST ${HOST_URL}/bgis/service/chargingstation/search/1.0
{
  "geoserver": "osm",
  "providers": ["ecoMovement"],
  "mode": "LOCAL_OR_REMOTE",
  "options": ["PATH_POINT"],
  "radius": 100,
  "coordinate": {
    "lon": 2.3058,
    "lat": 48.8542
  }
}
```

Response (only the fields used by this tutorial are shown, and one of the pool's six charging points):
```
{
  "pools": [
    {
      "providerName": "ecoMovement",
      "id": "009c54c4-a364-11f0-abfd-42010aa40043",
      "nameOfPool": "Electra Paris 7 - Indigo Parking Joffre Ecole Militaire",
      "timeZone": "Europe/Paris",
      "chargingStations": [
        {
          "chargingPoints": [
            {
              "id": "FR*ELC*EXNJF",
              "currentType": "DC",
              "power": 200,
              "voltage": 800,
              "connectorTypes": [
                {
                  "id": 38,
                  "key": "TYPE_2-CABLE_COMBO_CCS",
                  "operatorId": "combo-ccs-eu_2",
                  "name": "Type 2 Combo",
                  "norm": "Combo Type 2 based, DC",
                  "maxPower": 350,
                  "power": 200,
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
| `pools[].id` → `009c54c4-a364-11f0-abfd-42010aa40043`               | Tariffs: `links[].poolId`              |
| `pools[].chargingStations[].chargingPoints[].id` → `FR*ELC*EXNJF`   | Tariffs: `links[].chargingPointId`     |
| `...connectorTypes[].operatorId` → `combo-ccs-eu_2`                 | Tariffs: `links[].connectorId`         |
| `...connectorTypes[].id` → `38`                                     | Charging Cost: `charges[].cnnTypeId`   |
| `...chargingPoints[].power` → `200`                                 | Charging Cost: `charges[].power`       |
| `...chargingPoints[].currentType` → `DC`                            | Charging Cost: `charges[].currentType` |
| `pools[].timeZone` → `Europe/Paris`                                 | Charging Cost: `charges[].timeZone`    |

⚠️ Do not mix up the two connector identifiers:

- `connectorTypes[].operatorId` is the identifier of the physical connector at the operator, used to ask for its tariffs;
- `connectorTypes[].id` is the **BeMap connector type** identifier (see the [connector glossary](index.html#page-glossary-chargingstation-connectors.md)), used to price the charge.

💡 The `timeZone` is what makes a time based tariff (night rate, week-end rate…) resolve to the right local time. Always carry it over.

---
## 💳 Step 2 – Get the tariffs (Charging Station Tariffs service)

Build the `links` array with the three identifiers collected in step 1. Optionally add the `chargePassHashIds` of the charge passes your user owns; the AD_HOC (direct payment) tariffs are always returned anyway.

The hash IDs come from the [Charge Pass service](index.html#subpage-rest_1_0_0-chargingstation-chargepass-service.md). The example sends none: for this connector, ecoMovement returns the same items with any of its charge passes.

Request sent to `/bgis/service/chargingstation/tariffs/1.0/search`:
```
{"bemap":{"language":"request"}}
POST ${HOST_URL}/bgis/service/chargingstation/tariffs/1.0/search
{
  "providerName": "ecoMovement",
  "links": [
    {
      "poolId": "009c54c4-a364-11f0-abfd-42010aa40043",
      "chargingPointId": "FR*ELC*EXNJF",
      "connectorId": "combo-ccs-eu_2"
    }
  ]
}
```

Response (one of the nine items returned, see step 3):
```
{
  "items": [
    {
      "poolId": "009c54c4-a364-11f0-abfd-42010aa40043",
      "chargingPointId": "FR*ELC*EXNJF",
      "connectorId": "combo-ccs-eu_2",
      "tariffContent": {
        "id": "6ab9e0d7300bd65f024c03f8",
        "providerName": "ecoMovement",
        "updateDate": 1790566612731,
        "providerUpdated": "2026-09-27T08:50:30Z",
        "providerTariffId": "82e897a6d083861efd1deeb3f1436e498fb504dfb94b533effd91e8b576b4551",
        "type": "AD_HOC",
        "chargePass": {
          "hashId": "be14e3a120421ea56f9e01acf7f22898",
          "networkName": "TE61",
          "title": "Adhoc price",
          "description": "Adhoc price",
          "currency": "EUR",
          "subscriptionType": "n/a",
          "subscriptionFeeExclVat": 0
        },
        "currency": "EUR",
        "tariffItems": [
          {
            "restriction": {
              "minDuration": 3600,
              "maxDuration": 19500
            },
            "prices": [
              {
                "type": "TIME",
                "unit": "PER_HOUR",
                "price": 20,
                "vat": 20,
                "minAmount": 60
              },
              {
                "type": "PARKING_TIME",
                "unit": "PER_HOUR",
                "price": 20,
                "vat": 20,
                "minAmount": 60
              }
            ]
          },
          {
            "prices": [
              {
                "type": "ENERGY",
                "unit": "PER_KWH",
                "price": 0.5333,
                "vat": 20,
                "minAmount": 1000
              }
            ]
          }
        ]
      }
    }
  ]
}
```

This tariff carries no `minPrice` or `maxPrice`: they are sent only when the tariff sets them, although the specification marks them as always present.

---
## 🎯 Step 3 – Pick the tariff to apply

One connector can be sold under several tariffs, so `items` may contain **several entries for the same link**. Several entries are not always several tariffs, though: for the link above the service answers nine items, three stored copies of one AD_HOC tariff, each repeated three times. The copies share their `providerTariffId` and differ in `id` and `updateDate` (here also in `chargePass` and in the order of `tariffItems`). Keep one entry per `providerTariffId`, the one with the latest `updateDate`.

Then pick one tariff, and only one, before computing a cost:

| `tariffContent.type` | Meaning                                                                    |
| -------------------- | -------------------------------------------------------------------------- |
| `AD_HOC`             | Direct payment, no contract. The fallback when the user has no charge pass. |
| `MSP`                | Tariff of a mobility service provider, tied to `chargePass.hashId`.         |
| `CPO_SUB`            | Subscription offered by the charge point operator itself.                   |

Filter on `type`, or on `tariffContent.chargePass.hashId` when you want the tariff of a specific charge pass.

⚠️ A recurring subscription fee (`chargePass.subscriptionFeeExclVat`) is **not** part of a session cost and is never included in the estimation. Display it separately if your UI needs it.

---
## 🚗 Step 4 – Pick the vehicle

The charging time, and therefore the energy actually billed, depends on the vehicle charge curve. Get the vehicle key once from `/bgis/service/vehicle/1.1/findvehicles` and reuse it:
```
"vehicle": "d729502b-12ba-4adb-89bd-cff6a2d00919"
```
See the [Vehicle service](index.html#subpage-rest_1_1_0-vehicle-findvehicles-service-v1_1_0.md) for the full list.

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
      "power": 200,
      "cnnTypeId": 38,
      "timeZone": "Europe/Paris",
      "currency": "EUR",
      "tariffs": [
        {
          "restriction": {
            "minDuration": 3600,
            "maxDuration": 19500
          },
          "prices": [
            {
              "type": "TIME",
              "unit": "PER_HOUR",
              "price": 20,
              "vat": 20,
              "minAmount": 60
            },
            {
              "type": "PARKING_TIME",
              "unit": "PER_HOUR",
              "price": 20,
              "vat": 20,
              "minAmount": 60
            }
          ]
        },
        {
          "prices": [
            {
              "type": "ENERGY",
              "unit": "PER_KWH",
              "price": 0.5333,
              "vat": 20,
              "minAmount": 1000
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
      "chargingTime": 1765,
      "energyUsed": 34.2,
      "batChargeLvl": 80.0,
      "chargingCost": {
        "currency": "EUR",
        "withoutVat": 18.665499,
        "includeVat": 22.398598
      }
    }
  ]
}
```

| Field                     | Description                                                     |
| ------------------------- | --------------------------------------------------------------- |
| `chargingTime`            | Charging time in seconds (here ≈ 29 min)                        |
| `energyUsed`              | Energy delivered in kWh to go from `curBatLvl` to `toBatLvl`    |
| `batChargeLvl`            | Battery level reached, in %                                     |
| `chargingCost.currency`   | Currency of the amounts, after conversion into `cur` when needed |
| `chargingCost.withoutVat` | Amount before taxes                                             |
| `chargingCost.includeVat` | Amount taxes included                                           |

🔎 **Checking the numbers.** The session lasts 1765 s, which is below the `minDuration` of 3600 s, so the first tariff item never applies. The second item prices the whole energy, rounded up to its step of 1000 Wh (`minAmount`, see below):

```
34.2 kWh, billed as 35 kWh
35 kWh × 0.5333 €/kWh      = 18.6655 € excluding VAT
18.6655 € × (1 + 20 / 100) = 22.3986 € including VAT
```

The service returns these two amounts to floating-point precision: `18.665499` and `22.398598`.

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

⚠️ The Charging Cost service prices a session that ends when the charge ends, so the idle period is zero and a `PARKING_TIME` price contributes **0** to the result. This is why the `PARKING_TIME` line of the example above never adds to the total, even for a session longer than its `minDuration`, where the `TIME` line beside it is billed. Use `TIME` if you want to bill the charging period itself.

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

- `minAmount` is the OCPI *step size*: the billed quantity is rounded **up** to the next multiple. It is expressed in **Wh** for `ENERGY` and in **seconds** for `TIME` and `PARKING_TIME`. In the example, `"minAmount": 1000` on the energy means a 1 kWh step: the 34.2 kWh delivered are billed as 35 kWh. The specification describes `minAmount` as the "minimum amount to be billed"; the service applies it as this step size.
- `minPrice` and `maxPrice` are session floors and ceilings. They are set on `charges[]`, not inside a tariff item, and are applied at the very end of the calculation.

### VAT and currency

Prices are given excluding taxes; `vat` is the percentage applied to produce `includeVat`. A `vat` of `0`, or an omitted `vat`, means no tax is added.

When `cur` differs from `charges[].currency`, both amounts are converted with the current exchange rate of the [Currency service](index.html#subpage-rest_1_0_0-currency-convert-service.md). If the rate cannot be found, the amounts are returned in the original currency, so always read `chargingCost.currency` rather than assuming it equals `cur`.

---
## 🧯 Troubleshooting

| Symptom                                    | Likely cause                                                                                           |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------------ |
| `Connector type ID is not found.`          | `cnnTypeId` is not a BeMap connector type id. Take it from `connectorTypes[].id`.                       |
| `INVALID_ARGUMENT`, `Invalid request`      | A text value in a number field, such as an `operatorId` (`combo-ccs-eu_2`) sent as `cnnTypeId`.         |
| `chargingTime` far longer than expected    | `cnnTypeId` was filled with a numeric `operatorId` (some operators use `1`, `2`…) instead of `connectorTypes[].id`. The service does not check `cnnTypeId` against `currentType` and `power`: it prices the charge on that connector type and answers `200`. In the example of step 6, `1` instead of `38` gives 20727 s instead of 1765 s, and 107.09 € instead of 18.67 €, the time-based item then applying. |
| `Vehicle '…' cannot be found.`             | The vehicle key is unknown or not granted to your account.                                              |
| `Error found in one of charge object: the to battery level must superior to the current battery level.` | `toBatLvl` is lower than `curBatLvl`. A level outside 0–100 has its own message (`…the current battery level must be superior to 0.`, `…cannot be superior to 100.`). All are sent with the code `MissingParameterServiceException`, although no parameter is missing. |
| `Temperature is out of range, -50 to 100.` | `temperature` must be given in °C.                                                                      |
| No `chargingCost` in the estimation        | `tariffs` is empty or missing. The service still answers `200`, with the time and the energy but no cost, although the specification marks `tariffs` as required. |
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

---

_BeNomad MCP: a corrected copy of BeMap's page, served until BeMap publishes the correction (BEMAP-1938)._
