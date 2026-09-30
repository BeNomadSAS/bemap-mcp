<a name="evsmartrouting_condition_tutorial"></a>
# 📦 Condition – Detailed Usage Tutorial

This tutorial explains how to use each field of the `Condition` object in the EV Smart Routing API, including real-world use cases and JSON examples.

---
<a name="evsmartrouting_allowMaxSpeedRecommendation_tutorial"></a>
## 🚀 allowMaxSpeedRecommendation – Enable maximum speed recommendation
✅ **Use case**

You want the API to **suggest a recommended maximum speed** that helps:

- **Avoid unnecessary charging stops**
- **Reach a more powerful charging station**
- **Minimize overall trip time**, even if it means driving slightly slower over a section

💡 **What it does**

When this option is enabled (`true`), the EV routing engine is meant to suggest a **maximum speed** limit for certain sections of the route — the specification describes the option as available *"since algorithm v3"*. This recommendation would help the vehicle:

- **Arrive at the next destination or charging station without depleting the battery**
- **Optimize energy consumption**
- **Bypass low-power charging stations** in favor of better options further ahead

Instead of simply driving as fast as possible, the algorithm may recommend slowing down **to skip an extra charging stop** — resulting in faster **total travel time.**

> ⚠️ This is a recommendation, not a restriction — the driver is still free to ignore it.

> ⚠️ Measured on prod (29 September 2026): no request field selects an algorithm version, and no response field carries a recommended speed. The example below answers exactly as it does without the flag — the same route, the same charge, the same response, with or without `routeDetails`.

🔧 How to enable

Add `allowMaxSpeedRecommendation: true` in the `condition` block of your routing request:

```
  "condition": {
    "allowMaxSpeedRecommendation": true
  },
```

📦 **Example**
```
{
  "geoserver": "osm",
  "csps": ["ecoMovement"],
  "vehicle": {
    "initBatLvl": 100,
    "key": "eb1e9464-8654-4c01-bedd-b2f95412a60d",
    "payload": 75
  },
  "start": {
    "lon": 2.34755,
    "lat": 48.85708
  },
  "stop": {
    "lon": 4.35497,
    "lat": 50.83857
  },
  "condition": {
    "minBatLvl": 10.0,
    "allowMaxSpeedRecommendation": true
  }
}
```

**Response**
```
{
  "logTag": "13a53b8a-d1e2-45ce-bbc2-1ef7b9f4b513",
  "journeys": [
    {
      "summary": {
        "vehicleInfo": {
          "brand": "Kia",
          "name": "e-Niro",
          "variant": "64 kWh",
          "year": "2018"
        },
        "distance": 312050,
        "duration": 12439,
        "batteryLevel": 10,
        "consumed": 69.31,
        "chargingTime": 608,
        "departureTime": 1752756882000,
        "arrivalTime": 1752770229000,
        "boundingBox": {
          "minLon": 2.347567485574783,
          "minLat": 48.82658,
          "maxLon": 4.35548,
          "maxLat": 50.83906
        }
      },
      "events": [
        {
          "eventType": "START",
          "coord": {
            "lon": 2.347567485574783,
            "lat": 48.85710875
          },
          "address": "Quai de Gesvres, 75004 Paris, France",
          "departureTime": 1752756882000
        },
        {
          "eventType": "ROUTE",
          "distance": 168024,
          "duration": 6529,
          "consumed": 38.53506932004888
        },
        {
          "eventType": "CHARGE",
          "coord": {
            "lon": 3.08922127,
            "lat": 50.12222526
          },
          "arrivalTime": 1752763411000,
          "departureTime": 1752764319000,
          "arrivalBatteryLevel": 39.78895418742362,
          "departureBatteryLevel": 58.08151994321714,
          "chargingTime": 608,
          "chargingPower": {
            "currentType": "DC",
            "power": 77,
            "cnnTypeId": 38
          },
          "pool": {
            "providerName": "ecoMovement",
            "providerMode": "LOCAL",
            "id": "c8109b7c-e8ad-11ef-9543-42010aa400b8",
            "sourceProvider": "TotalEnergies",
            "updateDate": 1752462431048,
            "brand": "TotalEnergies",
            "name": "RELAIS DE HAVRINCOURT",
            "countryCode": "FRA",
            "address": {
              "countryCode": "FRA",
              "country": "FRA",
              "city": "Havrincourt",
              "postalCode": "62147",
              "street": "A2"
            },
            "siteCategory": "ON_STREET",
            "accessibility": "PUBLIC",
            "entrance": {
              "lon": 3.08922127,
              "lat": 50.12222526
            },
            "phoneNumber": "+(33)-(9)-77405060",
            "availabilityStatus": "IN_SERVICE",
            "open24x7": true,
            "numberOfChargingPoint": 8,
            "reliabilityScore": 50,
            "predictedOccupancyTimeSlots": [
              {
                "dayOfweek": "MONDAY",
                "start": "00:00",
                "end": "18:59",
                "predictedOccupancy": 5
              },
              {
                "dayOfweek": "MONDAY",
                "start": "19:00",
                "end": "23:59",
                "predictedOccupancy": 4
              },
              {
                "dayOfweek": "TUESDAY",
                "start": "00:00",
                "end": "23:59",
                "predictedOccupancy": 4
              },
              {
                "dayOfweek": "WEDNESDAY",
                "start": "00:00",
                "end": "23:59",
                "predictedOccupancy": 4
              },
              {
                "dayOfweek": "THURSDAY",
                "start": "00:00",
                "end": "23:59",
                "predictedOccupancy": 4
              },
              {
                "dayOfweek": "FRIDAY",
                "start": "00:00",
                "end": "23:59",
                "predictedOccupancy": 4
              },
              {
                "dayOfweek": "SATURDAY",
                "start": "00:00",
                "end": "03:59",
                "predictedOccupancy": 4
              },
              {
                "dayOfweek": "SATURDAY",
                "start": "04:00",
                "end": "23:59",
                "predictedOccupancy": 5
              },
              {
                "dayOfweek": "SUNDAY",
                "start": "00:00",
                "end": "23:59",
                "predictedOccupancy": 5
              }
            ],
            "stations": [
              {
                "nature": "VGROUP",
                "availabilityStatus": "IN_SERVICE",
                "authenticationModes": [
                  "RFID_BADGE"
                ],
                "paymentModes": [
                  "OPERATOR_CONTRACT",
                  "CREDIT_CARD"
                ],
                "chargePasses": [
                  {
                    "id": "Ecotap",
                    "title": "Ecotap",
                    "networkName": "Ecotap"
                  },
                  {
                    "id": "Shell Recharge",
                    "title": "Shell Recharge",
                    "networkName": "Shell Recharge"
                  },
```
---
<a name="evsmartrouting_allowNaStatus_tutorial"></a>
## 🔌 allowNaStatus – Allow use of charging pools with unknown availability
✅ **Use case**

You want to **include charging stations** even if their **availability status is unknown** (`NA`), instead of skipping them by default.

💡 **What it does**

By default, the routing service **excludes charging stations** with an availability status marked as `NA` (Not Available or Unknown).
Setting `allowNaStatus: true` allows the algorithm to consider these stations during route planning — useful when coverage is sparse or data is incomplete.

🔧 **How to enable**

Add `allowNaStatus: true` to the `condition` block in your routing request.
```
  "condition": {
    "allowNaStatus": true
  },
```

📦 **Example**
```
{
  "geoserver": "osm",
  "csps": ["ecoMovement"],
  "vehicle": {
    "initBatLvl": 100,
    "key": "eb1e9464-8654-4c01-bedd-b2f95412a60d",
    "payload": 75
  },
  "start": {
    "lon": 2.34755,
    "lat": 48.85708
  },
  "stop": {
    "lon": 4.35497,
    "lat": 50.83857
  },
  "condition": {
    "minBatLvl": 10.0,
    "allowNaStatus": true
  }
}
```
**Response**
```
{
  "logTag": "70389fc3-a47a-46d1-9a17-93f550093e50",
  "journeys": [
    {
      "summary": {
        "vehicleInfo": {
          "brand": "Kia",
          "name": "e-Niro",
          "variant": "64 kWh",
          "year": "2018"
        },
        "distance": 312050,
        "duration": 12439,
        "batteryLevel": 10,
        "consumed": 69.31,
        "chargingTime": 608,
        "departureTime": 1752756842000,
        "arrivalTime": 1752770189000,
        "boundingBox": {
          "minLon": 2.347567485574783,
          "minLat": 48.82658,
          "maxLon": 4.35548,
          "maxLat": 50.83906
        }
      },
      "events": [
        {
          "eventType": "START",
          "coord": {
            "lon": 2.347567485574783,
            "lat": 48.85710875
          },
          "address": "Quai de Gesvres, 75004 Paris, France",
          "departureTime": 1752756842000
        },
        {
          "eventType": "ROUTE",
          "distance": 168024,
          "duration": 6529,
          "consumed": 38.53506932004888
        },
        {
          "eventType": "CHARGE",
          "coord": {
            "lon": 3.08922127,
            "lat": 50.12222526
          },
          "arrivalTime": 1752763371000,
          "departureTime": 1752764279000,
          "arrivalBatteryLevel": 39.78895418742362,
          "departureBatteryLevel": 58.08151994321714,
          "chargingTime": 608,
          "chargingPower": {
            "currentType": "DC",
            "power": 77,
            "cnnTypeId": 38
          },
          "pool": {
            "providerName": "ecoMovement",
            "providerMode": "LOCAL",
            "id": "c8109b7c-e8ad-11ef-9543-42010aa400b8",
            "sourceProvider": "TotalEnergies",
            "updateDate": 1752462431048,
            "brand": "TotalEnergies",
            "name": "RELAIS DE HAVRINCOURT",
            "countryCode": "FRA",
            "address": {
              "countryCode": "FRA",
              "country": "FRA",
              "city": "Havrincourt",
              "postalCode": "62147",
              "street": "A2"
            },
            "siteCategory": "ON_STREET",
            "accessibility": "PUBLIC",
            "entrance": {
              "lon": 3.08922127,
              "lat": 50.12222526
            },
            "phoneNumber": "+(33)-(9)-77405060",
            "availabilityStatus": "IN_SERVICE",
            "open24x7": true,
            "numberOfChargingPoint": 8,
            "reliabilityScore": 50,
            "predictedOccupancyTimeSlots": [
              {
                "dayOfweek": "MONDAY",
                "start": "00:00",
                "end": "18:59",
                "predictedOccupancy": 5
              },
              {
                "dayOfweek": "MONDAY",
                "start": "19:00",
                "end": "23:59",
                "predictedOccupancy": 4
              },
              {
                "dayOfweek": "TUESDAY",
                "start": "00:00",
                "end": "23:59",
                "predictedOccupancy": 4
              },
              {
                "dayOfweek": "WEDNESDAY",
                "start": "00:00",
                "end": "23:59",
                "predictedOccupancy": 4
              },
              {
                "dayOfweek": "THURSDAY",
                "start": "00:00",
                "end": "23:59",
                "predictedOccupancy": 4
              },
              {
                "dayOfweek": "FRIDAY",
                "start": "00:00",
                "end": "23:59",
                "predictedOccupancy": 4
              },
              {
                "dayOfweek": "SATURDAY",
                "start": "00:00",
                "end": "03:59",
                "predictedOccupancy": 4
              },
              {
                "dayOfweek": "SATURDAY",
                "start": "04:00",
                "end": "23:59",
                "predictedOccupancy": 5
              },
              {
                "dayOfweek": "SUNDAY",
                "start": "00:00",
                "end": "23:59",
                "predictedOccupancy": 5
              }
            ],
            "stations": [
              {
                "nature": "VGROUP",
                "availabilityStatus": "IN_SERVICE",
                "authenticationModes": [
                  "RFID_BADGE"
                ],
                "paymentModes": [
                  "OPERATOR_CONTRACT",
                  "CREDIT_CARD"
                ],
                "chargePasses": [
                  {
                    "id": "Ecotap",
                    "title": "Ecotap",
                    "networkName": "Ecotap"
                  },
                  {
                    "id": "Shell Recharge",
                    "title": "Shell Recharge",
                    "networkName": "Shell Recharge"
                  },
```
---
## 🔀 alternative – Select an alternative route
<a name="evsmartrouting_alternative_tutorial"></a>
✅ **Use case**

You want to compare different route options for the same trip — for example, to choose between the fastest, shortest, or most energy-efficient route.

💡 **What it does**

By default, the routing service returns the primary (best) route only.
Setting `alternative: 1` (or another index > 0) returns a different valid route, when available.
The number indicates the index of the alternative in the list of available options:

- 0 = default route (no alternative)
- 1, 2, etc. = valid alternative routes

🔧 **How to enable**

Add `alternative: 1` (or other non-zero index) to the condition block of your request.
```
"condition": {
  "alternative": 1
},
```
> ⚠️ Send `alternative` as a number. The specification shows it as a base64 string (`format: byte`), but BeMap reads a number: `1` and `"1"` answer `200`, while `"AQ=="` answers `400 INVALID_ARGUMENT` *"Invalid request"*, which names no field (measured on prod, 29 September 2026).

📦 **Example**
```
{
  "geoserver": "osm",
  "csps": ["ecoMovement"],
  "vehicle": {
    "initBatLvl": 100,
    "key": "eb1e9464-8654-4c01-bedd-b2f95412a60d",
    "payload": 75
  },
  "start": {
    "lon": 2.34755,
    "lat": 48.85708
  },
  "stop": {
    "lon": 4.35497,
    "lat": 50.83857
  },
  "condition": {
    "minBatLvl": 10.0,
    "alternative": 1
  }
}
```
**Response**
```
{
  "logTag": "af890469-a55c-4180-a40e-7c8c99c6f9cc",
  "journeys": [
    {
      "summary": {
        "vehicleInfo": {
          "brand": "Kia",
          "name": "e-Niro",
          "variant": "64 kWh",
          "year": "2018"
        },
        "distance": 325674,
        "duration": 13035,
        "batteryLevel": 10,
        "consumed": 71.87,
        "chargingTime": 741,
        "departureTime": 1752756787000,
        "arrivalTime": 1752770863000,
        "boundingBox": {
          "minLon": 2.347567485574783,
          "minLat": 48.82658,
          "maxLon": 4.35548,
          "maxLat": 50.83906
        },
        "chargingCost": {
          "currency": "EUR",
          "withoutVat": 12.71271,
          "includeVat": 12.71271
        }
      },
      "events": [
        {
          "eventType": "START",
          "coord": {
            "lon": 2.347567485574783,
            "lat": 48.85710875
          },
          "address": "Quai de Gesvres, 75004 Paris, France",
          "departureTime": 1752756787000
        },
        {
          "eventType": "ROUTE",
          "distance": 236792,
          "duration": 8865,
          "consumed": 54.05869687389634
        },
        {
          "eventType": "CHARGE",
          "coord": {
            "lon": 3.34118523,
            "lat": 50.61902106
          },
          "arrivalTime": 1752765652000,
          "departureTime": 1752766693000,
          "arrivalBatteryLevel": 15.559729361373726,
          "departureBatteryLevel": 37.86218337225338,
          "chargingTime": 741,
          "chargingPower": {
            "currentType": "DC",
            "power": 77,
            "cnnTypeId": 38
          },
          "chargingCost": {
            "currency": "EUR",
            "withoutVat": 12.71271,
            "includeVat": 12.71271
          },
          "pool": {
            "providerName": "ecoMovement",
            "providerMode": "LOCAL",
            "id": "a607e602-687f-11e9-be07-42010a840003",
            "sourceProvider": "IONITY",
            "updateDate": 1752462431048,
            "brand": "IONITY",
            "name": "IONITY Froyennes Sud",
            "countryCode": "BEL",
            "address": {
              "countryCode": "BEL",
              "country": "BEL",
              "city": "Tournai",
              "postalCode": "7503",
              "street": "E42"
            },
            "siteCategory": "ON_STREET",
            "accessibility": "PUBLIC",
            "entrance": {
              "lon": 3.34118523,
              "lat": 50.61902106
            },
            "phoneNumber": "+(32)-(28)-997267",
            "availabilityStatus": "IN_SERVICE",
            "open24x7": true,
            "numberOfChargingPoint": 6,
            "reliabilityScore": 50,
            "predictedOccupancyTimeSlots": [
              {
                "dayOfweek": "MONDAY",
                "start": "00:00",
                "end": "05:59",
                "predictedOccupancy": 2
              },
              {
                "dayOfweek": "MONDAY",
                "start": "06:00",
                "end": "18:59",
                "predictedOccupancy": 3
              },
```
---

## 🚗 chargePluggingTime – Charging connection time
<a name="evsmartrouting_chargePluggingTime_tutorial"></a>
✅ **Use case**  

You want to simulate more realistic charging stops by accounting for **fixed time needed to plug in, to start charging and to unplug.**.

💡 **What it does**  

Adds a fixed time (in seconds) to every charging stop during the trip.  
This reflects the real-world time needed to plug, begin charging and unplug.

📌 Default: `300` seconds — a request without the field already adds 5 minutes to each stop. Send `0` to leave it out.

🔧 **How to enable**  

Add the `chargePluggingTime` parameter in the `condition` block.
```
"condition": {
  "chargePluggingTime": 600
}
```

📦 **Example**
```
{
  "geoserver": "osm",
  "csps": ["ecoMovement"],
  "vehicle": {
    "initBatLvl": 100,
    "key": "eb1e9464-8654-4c01-bedd-b2f95412a60d",
    "payload": 75
  },
  "start": {
    "lon": 2.34755,
    "lat": 48.85708
  },
  "stop": {
    "lon": 4.35497,
    "lat": 50.83857
  },
  "condition": {
    "minBatLvl": 10.0,
    "chargePluggingTime": 600
  }
}
```
**Response**
```
{
  "logTag": "b2ecdc7d-a9bb-4a51-92dd-b807d8534db3",
  "journeys": [
    {
      "summary": {
        "vehicleInfo": {
          "brand": "Kia",
          "name": "e-Niro",
          "variant": "64 kWh",
          "year": "2018"
        },
        "distance": 325881,
        "duration": 12744,
        "batteryLevel": 10,
        "consumed": 66.35,
        "chargingTime": 454,
        "departureTime": 1790692268000,
        "arrivalTime": 1790706066000,
        "boundingBox": {
          "minLon": 2.3475670788198015,
          "minLat": 48.82658,
          "maxLon": 4.35548,
          "maxLat": 50.83906
        },
        "chargingCost": {
          "currency": "EUR",
          "withoutVat": 5.4207706,
          "includeVat": 6.5591326
        }
      },
      "events": [
        {
          "eventType": "START",
          "coord": {
            "lon": 2.3475670788198015,
            "lat": 48.857108751160624
          },
          "address": "Quai de Gesvres, 75004 Paris, France",
          "departureTime": 1790692268000
        },
        {
          "eventType": "ROUTE",
          "distance": 276566,
          "duration": 10138,
          "consumed": 57.327046164778025
        },
        {
          "eventType": "CHARGE",
          "coord": {
            "lon": 3.86916221,
            "lat": 50.6693674
          },
          "arrivalTime": 1790702406000,
          "departureTime": 1790703460000,
          "arrivalBatteryLevel": 10.416628678789777,
          "departureBatteryLevel": 24.080891420749417,
          "chargingTime": 454,
          "chargingPower": {
            "currentType": "DC",
            "power": 77,
            "cnnTypeId": 38
          },
          "chargingCost": {
            "currency": "EUR",
            "withoutVat": 5.4207706,
            "includeVat": 6.5591326,
            "tariffChargePassHashId": "2f0581a4648e0889b77321d14d2d7c36"
          },
          "pool": {
            "providerName": "ecoMovement",
            "providerMode": "LOCAL",
            "id": "1bb8cd94-c71f-11f0-b52b-42010aa400b8",
            "sourceProvider": "IONITY",
            "brand": "IONITY",
            "name": "IONITY GmbH IONITY Ath",
            "countryCode": "BEL",
            "address": {
              "countryCode": "BEL",
              "country": "BEL",
              "city": "Gellingen",
              "postalCode": "7822",
              "street": "Avenue des Artisans 1"
            },
            "accessibility": "PUBLIC",
            "availabilityStatus": "IN_SERVICE_FREE",
            "numberOfChargingPoint": 12,
            ...
          }
        },
        {
          "eventType": "ROUTE",
          "distance": 49315,
          "duration": 2606,
          "consumed": 9.018081990076134
        },
        {
          "eventType": "STOP",
          "coord": {
            "lon": 4.35463449209338,
            "lat": 50.838761144465366
          },
          "address": "34 Rue de la Régence, 1000 Bruxelles, België"
        }
      ]
    }
  ]
}
```
The stop lasts `chargingTime` plus the plugging time: from `arrivalTime` to `departureTime`, 1,054 s = 454 + 600.

---
<a name="evsmartrouting_chargeTimeSlots_tutorial"></a>
## ⏰ chargeTimeSlots – Define allowed time windows for charging
✅ **Use case**

You want to limit when your vehicle can stop to charge, based on:

- Charging during cheaper electricity hours (e.g., night-time)
- Aligning with delivery windows or rest periods
- POI (Point of Interest) availability or service category

💡 **What it does**

This option allows you to define **specific charging windows** at **step-points** along the route. Each window defines:

- The exact time window (start/stop date)
- The allowed stop duration
- The maximum walking distance from vehicle to service
- The type of POI/services allowed (filtered with a logic expression)
If a charging station is reached outside those windows, the algorithm will **wait until the next valid window**, or **avoid the step** if charging is not possible.
>⚠️ If **forced charges** are defined, they take precedence over `chargeTimeSlots`.

🔧 **How to enable**

Include a list of objects inside the `chargeTimeSlots` array in the `condition` block.
Each object is of type `ChargeTimeSlotFront`; only `duration` is required:
- `duration` (required): Duration of the charging stop in seconds (e.g. 1800 = 30 minutes)
- `startDateTime`: Start date/time of the window, as an ISO local date and time without offset (e.g. `2025-07-10T08:00:00`)
- `stopDateTime`: End date/time of the window, in the same format
- `maxWalkingDistance`: Max distance (in meters) from POI to the vehicle, from `50` to `1000` (default: `1000`)
- `serviceCategory`: Logical expression to filter POI categories. Example: (`7315`) [Service Category Reference](index.html#page-sdk-jsiv-classids.md)

> ⚠️ The window is read as local time, and an offset such as `+02:00` is dropped. Measured on prod (29 September 2026), the example below: departing from Paris at `1752126600000` (epoch milliseconds, see `departureTime`: 05:50 UTC, 07:50 Paris time), a `08:00:00`–`10:00:00` window gave a stop from 07:11 to 07:41 UTC, i.e. 09:11–09:41 Paris time.

A window the journey cannot use is reported in `journeys[].timeSlotWarns` — `TSS_NO_POOL_FOUND`, `TSS_IGNORED_BEGIN_AFTER_ARRIVAL` — and the route is computed without it; a window that ends before the departure answers `400 CANNOT_PERFORM_ROUTING` (measured on prod, 29 September 2026).
```
  "condition": {
    "chargeTimeSlots": [
      {
        "duration": 1800,
        "startDateTime": "2025-07-10T08:00:00",
        "stopDateTime": "2025-07-10T10:00:00",
        "maxWalkingDistance": 500,
        "serviceCategory": "(7315|9105)&!7395"
      }
    ]
  },
```
<br>🧠 **Notes on serviceCategory syntax**

Use the following operators:

- `|` for OR
- `&` for AND
- `!` for NOT
- `()` to group expressions Refer to the glossary for full POI class ID list.
  
📦 **Example**
```
{
  "geoserver": "osm",
  "csps": ["ecoMovement"],
  "vehicle": {
    "initBatLvl": 100,
    "key": "eb1e9464-8654-4c01-bedd-b2f95412a60d",
    "payload": 75
  },
  "start": {
    "lon": 2.34755,
    "lat": 48.85708
  },
  "stop": {
    "lon": 4.35497,
    "lat": 50.83857
  },
  "condition": {
    "departureTime": "1752126600000",
    "minBatLvl": 10.0,
    "chargeTimeSlots": [
      {
        "duration": 1800,
        "startDateTime": "2025-07-10T08:00:00",
        "stopDateTime": "2025-07-10T10:00:00",
        "maxWalkingDistance": 500,
        "serviceCategory": "(7315|9105)&!7395"
      }
    ]
  }
}
```
**Response**
```
{
  "logTag": "449d0791-27ab-4165-b4a1-84e8e8e66830",
  "journeys": [
    {
      "summary": {
        "vehicleInfo": {
          "brand": "Kia",
          "name": "e-Niro",
          "variant": "64 kWh",
          "year": "2018"
        },
        "distance": 328404,
        "duration": 13066,
        "batteryLevel": 24.4,
        "consumed": 66.64,
        "chargingTime": 1500,
        "departureTime": 1752126600000,
        "arrivalTime": 1752141466000,
        "boundingBox": {
          "minLon": 2.3475670788198015,
          "minLat": 48.82658,
          "maxLon": 4.35548,
          "maxLat": 50.83906
        },
        "chargingCost": {
          "currency": "EUR",
          "withoutVat": 10.1327,
          "includeVat": 12.15924
        }
      },
      "events": [
        {
          "eventType": "START",
          "coord": {
            "lon": 2.3475670788198015,
            "lat": 48.857108751160624
          },
          "address": "Quai de Gesvres, 75004 Paris, France",
          "departureTime": 1752126600000
        },
        {
          "eventType": "ROUTE",
          "distance": 114088,
          "duration": 4870,
          "consumed": 23.173799783103476
        },
        {
          "eventType": "CHARGE",
          "coord": {
            "lon": 2.77400205,
            "lat": 49.7097668
          },
          "arrivalTime": 1752131470000,
          "departureTime": 1752133270000,
          "arrivalBatteryLevel": 63.79700945157574,
          "departureBatteryLevel": 92.36860005105049,
          "chargingTime": 1500,
          "chargingPower": {
            "currentType": "DC",
            "power": 77,
            "cnnTypeId": 38
          },
          "chargingCost": {
            "currency": "EUR",
            "withoutVat": 10.1327,
            "includeVat": 12.15924
          },
          "pool": {
            "providerName": "ecoMovement",
            "providerMode": "LOCAL",
            "id": "88098be2-f842-11f0-a6d8-42010aa400b8",
            "sourceProvider": "Plug Inn fast charge",
            "brand": "Plug Inn fast charge",
            "name": "Plug Inn fast charge Rue Émile Pluchet",
            "countryCode": "FRA",
            "address": {
              "countryCode": "FRA",
              "country": "FRA",
              "city": "Roye",
              "postalCode": "80700",
              "street": "Rue Émile Pluchet"
            },
            "accessibility": "PUBLIC",
            "availabilityStatus": "IN_SERVICE_FREE",
            "numberOfChargingPoint": 7,
            ...
          }
        },
        {
          "eventType": "ROUTE",
          "distance": 214316,
          "duration": 8196,
          "consumed": 43.46643751863997
        },
        {
          "eventType": "STOP",
          "coord": {
            "lon": 4.35463449209338,
            "lat": 50.838761144465366
          },
          "address": "34 Rue de la Régence, 1000 Bruxelles, België"
        }
      ]
    }
  ]
}
```
---
<a name="evsmartrouting_chargingStationDeprecatedConnector_tutorial"></a>
## 🔌 chargingStationDeprecatedConnector – Allow deprecated charging connector types
✅ **Use case**

Some charging stations are still described with **deprecated connector types** — legacy ids of BeMap's connector catalogue, which duplicate current ones (e.g. `3` "Attached cable Combo-Type 2" beside `38` "Type 2 Combo", `2` "Attached cable CHAdeMO" beside `36` "CHAdeMO") — and you want the routing engine to include **charging stations with these deprecated connectors**.

> 📘 Deprecated does not mean an old plug standard: CHAdeMO (`36`) and Type 1 (`31`) are current ids (`deprecated: false`). The deprecated ids are `0`–`29`, `33`, `56`–`57`, `59`–`64` and `67`: `GET /bgis/service/chargingstation/connector/list/1.0?deprecatedConnector=true` lists them with `deprecated: true` — see the [Charging station connector service](index.html#subpage-rest_1_0_0-chargingstation-connector-service.md).

💡 **What it does**

By default, the EV Routing API uses only the connector types of the vehicle — those the vehicle database defines for it, or the list you send in `condition.connectorTypes` — to filter compatible charging stations.

If `chargingStationDeprecatedConnector` is set to `true`, then stations that only support deprecated types can be included in the route, if those connectors match your vehicle's capabilities.

This is useful when:

- The stations on your route are still described with **legacy connector ids**.
- You're planning **routes in rural** or poorly equipped areas.
- You need **maximum flexibility**.

> ⚠️ This flag **does not override the connector list**, but allows inclusion of stations with deprecated types **only if they match the vehicle's connectors or `condition.connectorTypes`**.

🔧 **How to enable**

Set the boolean field in the `condition` block:
```
"chargingStationDeprecatedConnector": true
```
📦 **Example**
```
{
  "geoserver": "osm",
  "csps": ["ecoMovement"],
  "vehicle": {
    "initBatLvl": 100,
    "key": "eb1e9464-8654-4c01-bedd-b2f95412a60d",
    "payload": 75
  },
  "start": {
    "lon": 2.34755,
    "lat": 48.85708
  },
  "stop": {
    "lon": 4.35497,
    "lat": 50.83857
  },
  "condition": {
    "minBatLvl": 10.0,
    "chargingStationDeprecatedConnector": true
  }
}
```
**Response**
```
{
  "logTag": "8010bb8b-03f2-410d-b110-eab1cdcad7b4",
  "journeys": [
    {
      "summary": {
        "vehicleInfo": {
          "brand": "Kia",
          "name": "e-Niro",
          "variant": "64 kWh",
          "year": "2018"
        },
        "distance": 312050,
        "duration": 12439,
        "batteryLevel": 10,
        "consumed": 69.31,
        "chargingTime": 608,
        "departureTime": 1752756990000,
        "arrivalTime": 1752770337000,
        "boundingBox": {
          "minLon": 2.347567485574783,
          "minLat": 48.82658,
          "maxLon": 4.35548,
          "maxLat": 50.83906
        }
      },
      "events": [
        {
          "eventType": "START",
          "coord": {
            "lon": 2.347567485574783,
            "lat": 48.85710875
          },
          "address": "Quai de Gesvres, 75004 Paris, France",
          "departureTime": 1752756990000
        },
        {
          "eventType": "ROUTE",
          "distance": 168024,
          "duration": 6529,
          "consumed": 38.53506932004888
        },
        {
          "eventType": "CHARGE",
          "coord": {
            "lon": 3.08922127,
            "lat": 50.12222526
          },
          "arrivalTime": 1752763519000,
          "departureTime": 1752764427000,
          "arrivalBatteryLevel": 39.78895418742362,
          "departureBatteryLevel": 58.08151994321714,
          "chargingTime": 608,
          "chargingPower": {
            "currentType": "DC",
            "power": 77,
            "cnnTypeId": 38
          },
          "pool": {
            "providerName": "ecoMovement",
            "providerMode": "LOCAL",
            "id": "c8109b7c-e8ad-11ef-9543-42010aa400b8",
            "sourceProvider": "TotalEnergies",
            "updateDate": 1752462431048,
            "brand": "TotalEnergies",
            "name": "RELAIS DE HAVRINCOURT",
            "countryCode": "FRA",
            "address": {
              "countryCode": "FRA",
              "country": "FRA",
              "city": "Havrincourt",
              "postalCode": "62147",
              "street": "A2"
            },
            "siteCategory": "ON_STREET",
            "accessibility": "PUBLIC",
            "entrance": {
              "lon": 3.08922127,
              "lat": 50.12222526
            },
            "phoneNumber": "+(33)-(9)-77405060",
            "availabilityStatus": "IN_SERVICE",
            "open24x7": true,
            "numberOfChargingPoint": 8,
            "reliabilityScore": 50,
            "predictedOccupancyTimeSlots": [
              {
                "dayOfweek": "MONDAY",
                "start": "00:00",
                "end": "18:59",
                "predictedOccupancy": 5
              },
              {
                "dayOfweek": "MONDAY",
                "start": "19:00",
                "end": "23:59",
                "predictedOccupancy": 4
              },
```
---
<a name="evsmartrouting_co2emissions_tutorial"></a>
## 🌍 CO2emissions – Include CO₂ emissions in the journey
✅ **Use case**

You want to **evaluate the environmental benefit** of your trip by computing **CO₂ emissions saved** compared to a thermal (ICE) vehicle.
This is especially useful for:

- Eco-conscious routing
- Environmental reporting
- Comparative analysis with conventional vehicles

💡 **What it does**

- Only available for electric vehicles (EVs)
- The routing engine calculates the CO₂ saved along the route, compared to an equivalent ICE vehicle.
  
When enabled, the routing engine calculates **estimated CO₂ emissions** for the entire trip, based on vehicle characteristics, energy consumption, and routing data.
> 📏 Result is expressed in kilograms (kg).

🔧 **How to enable**<br>
Set the boolean field in the `condition` block:
```
"co2emissions": true
```
📦**Example**
```
{
  "geoserver": "osm",
  "csps": ["ecoMovement"],
  "vehicle": {
    "initBatLvl": 100,
    "key": "eb1e9464-8654-4c01-bedd-b2f95412a60d",
    "payload": 75
  },
  "start": {
    "lon": 2.34755,
    "lat": 48.85708
  },
  "stop": {
    "lon": 4.35497,
    "lat": 50.83857
  },
  "condition": {
    "minBatLvl": 10.0,
    "co2emissions": true
  }
}
```
**Response**
```
{
  "logTag": "a1545e81-d9fe-4eaa-af4a-81c6823d65da",
  "journeys": [
    {
      "summary": {
        "vehicleInfo": {
          "brand": "Kia",
          "name": "e-Niro",
          "variant": "64 kWh",
          "year": "2018"
        },
        "distance": 312050,
        "duration": 12439,
        "batteryLevel": 10,
        "consumed": 69.31,
        "chargingTime": 608,
        "departureTime": 1752757038000,
        "arrivalTime": 1752770385000,
        "savedCo2Emissions": 49.09458,
        "boundingBox": {
          "minLon": 2.347567485574783,
          "minLat": 48.82658,
          "maxLon": 4.35548,
          "maxLat": 50.83906
        }
      },
      "events": [
        {
          "eventType": "START",
          "coord": {
            "lon": 2.347567485574783,
            "lat": 48.85710875
          },
          "address": "Quai de Gesvres, 75004 Paris, France",
          "departureTime": 1752757038000
        },
        {
          "eventType": "ROUTE",
          "distance": 168024,
          "duration": 6529,
          "consumed": 38.53506932004888
        },
        {
          "eventType": "CHARGE",
          "coord": {
            "lon": 3.08922127,
            "lat": 50.12222526
          },
          "arrivalTime": 1752763567000,
          "departureTime": 1752764475000,
          "arrivalBatteryLevel": 39.78895418742362,
          "departureBatteryLevel": 58.08151994321714,
          "chargingTime": 608,
          "chargingPower": {
            "currentType": "DC",
            "power": 77,
            "cnnTypeId": 38
          },
          "pool": {
            "providerName": "ecoMovement",
            "providerMode": "LOCAL",
            "id": "c8109b7c-e8ad-11ef-9543-42010aa400b8",
            "sourceProvider": "TotalEnergies",
            "updateDate": 1752462431048,
            "brand": "TotalEnergies",
            "name": "RELAIS DE HAVRINCOURT",
            "countryCode": "FRA",
            "address": {
              "countryCode": "FRA",
              "country": "FRA",
              "city": "Havrincourt",
              "postalCode": "62147",
              "street": "A2"
            },
            "siteCategory": "ON_STREET",
            "accessibility": "PUBLIC",
            "entrance": {
              "lon": 3.08922127,
              "lat": 50.12222526
            },
            "phoneNumber": "+(33)-(9)-77405060",
            "availabilityStatus": "IN_SERVICE",
            "open24x7": true,
            "numberOfChargingPoint": 8,
            "reliabilityScore": 50,
            "predictedOccupancyTimeSlots": [
              {
                "dayOfweek": "MONDAY",
                "start": "00:00",
                "end": "18:59",
                "predictedOccupancy": 5
              },
              {
                "dayOfweek": "MONDAY",
                "start": "19:00",
                "end": "23:59",
                "predictedOccupancy": 4
              },
```
---
<a name="evsmartrouting_connectorTypes_tutorial"></a>
## 🔌 connectorTypes – Filter charging stations by connector type
✅ **Use case**

You want to **restrict the route to charging stations compatible with your vehicle’s connector(s)**.
Useful when:

- Your vehicle only supports specific connectors (e.g., CCS, CHAdeMO, Type2)
- You want to avoid deprecated or incompatible connectors

💡 **What it does**

Filters out all charging stations **not matching** the connector types listed in the array.
Only charging stations with **at least one compatible connector** from the list will be used during routing.

🔧 **How to enable**

Provide a list of connector IDs in the `connectorTypes` field inside the `condition` block.
```
"connectorTypes": [32, 38]
```
> 📘 The connector IDs correspond to internal enum values (e.g., 32 = Type 2, AC; 38 = Type 2 Combo, the CCS, DC).
The full list of IDs, with each one's current type and maximum power, is returned by `GET /bgis/service/chargingstation/connector/list/1.0` — see the [Charging station connector service](index.html#subpage-rest_1_0_0-chargingstation-connector-service.md).
Measured on prod (29 September 2026), the example trip with `[32]` alone charges on AC at 7.2 kW for 4,772 s; with `[38]`, on DC at 77 kW for 454 s.

📦 **Example**
```
{
  "geoserver": "osm",
  "csps": ["ecoMovement"],
  "vehicle": {
    "initBatLvl": 100,
    "key": "eb1e9464-8654-4c01-bedd-b2f95412a60d",
    "payload": 75
  },
  "start": {
    "lon": 2.34755,
    "lat": 48.85708
  },
  "stop": {
    "lon": 4.35497,
    "lat": 50.83857
  },
  "condition": {
    "minBatLvl": 10.0,
    "connectorTypes": [32, 38]
  }
}
```
**Response**
```
{
  "logTag": "b9543fdd-7b98-48ad-935d-ffa7b1a62ef8",
  "journeys": [
    {
      "summary": {
        "vehicleInfo": {
          "brand": "Kia",
          "name": "e-Niro",
          "variant": "64 kWh",
          "year": "2018"
        },
        "distance": 312050,
        "duration": 12439,
        "batteryLevel": 10,
        "consumed": 69.31,
        "chargingTime": 608,
        "departureTime": 1752757348000,
        "arrivalTime": 1752770695000,
        "boundingBox": {
          "minLon": 2.347567485574783,
          "minLat": 48.82658,
          "maxLon": 4.35548,
          "maxLat": 50.83906
        }
      },
      "events": [
        {
          "eventType": "START",
          "coord": {
            "lon": 2.347567485574783,
            "lat": 48.85710875
          },
          "address": "Quai de Gesvres, 75004 Paris, France",
          "departureTime": 1752757348000
        },
        {
          "eventType": "ROUTE",
          "distance": 168024,
          "duration": 6529,
          "consumed": 38.53506932004888
        },
        {
          "eventType": "CHARGE",
          "coord": {
            "lon": 3.08922127,
            "lat": 50.12222526
          },
          "arrivalTime": 1752763877000,
          "departureTime": 1752764785000,
          "arrivalBatteryLevel": 39.78895418742362,
          "departureBatteryLevel": 58.08151994321714,
          "chargingTime": 608,
          "chargingPower": {
            "currentType": "DC",
            "power": 77,
            "cnnTypeId": 38
          },
          "pool": {
            "providerName": "ecoMovement",
            "providerMode": "LOCAL",
            "id": "c8109b7c-e8ad-11ef-9543-42010aa400b8",
            "sourceProvider": "TotalEnergies",
            "updateDate": 1752462431048,
            "brand": "TotalEnergies",
            "name": "RELAIS DE HAVRINCOURT",
            "countryCode": "FRA",
            "address": {
              "countryCode": "FRA",
              "country": "FRA",
              "city": "Havrincourt",
              "postalCode": "62147",
              "street": "A2"
            },
            "siteCategory": "ON_STREET",
            "accessibility": "PUBLIC",
            "entrance": {
              "lon": 3.08922127,
              "lat": 50.12222526
            },
            "phoneNumber": "+(33)-(9)-77405060",
            "availabilityStatus": "IN_SERVICE",
            "open24x7": true,
            "numberOfChargingPoint": 8,
            "reliabilityScore": 50,
            "predictedOccupancyTimeSlots": [
              {
                "dayOfweek": "MONDAY",
                "start": "00:00",
                "end": "18:59",
                "predictedOccupancy": 5
              },
              {
                "dayOfweek": "MONDAY",
                "start": "19:00",
                "end": "23:59",
                "predictedOccupancy": 4
              },
              ...
            ],
            "chargingStations": [
              {
                ...
                "bookable": false,
                "chargingPoints": [
                  {
                    "id": "CU-TOTAL-NF080350-002-1",
                    "operatorId": "FR*HPC*ENF080350*002*1",
                    "availabilityStatus": "IN_SERVICE",
                    "currentType": "DC",
                    "voltage": 900,
                    "ampere": 333,
                    "power": 300,
                    "remoteCharging": true,
                    "type": 38,
                    "connectorTypes": [
                      {
                        "id": 38,
                        "key": "TYPE_2-CABLE_COMBO_CCS",
                        "deprecated": false,
                        "name": "Type 2 Combo",
                        "norm": "Combo Type 2 based, DC",
                        "maxPower": 350,
                        "acSingle": false,
                        "acThree": false,
                        "dc": true,
                        "cable": true
                      }
                    ]
                  }
                ]
              }
            ]
          }
        },
```
<a name="evsmartrouting_currency_tutorial"></a>
## 💱 currency – Set the currency for cost calculation
✅ **Use case**

You want to display **route-related costs** (like charging or tolls) in a specific currency.
Useful when:

- Your app supports multiple currencies
- You need to **match the user’s locale or billing region**

💡 **What it does**

Defines the **currency code** (ISO 4217 format, e.g., "EUR", "USD", "GBP") to be used when calculating **charging costs, tolls, or other monetary estimations** during routing.
The charging costs are `summary.chargingCost` and each `CHARGE` event's `chargingCost`; the toll costs are returned only with `tollCost: true` (see `tollCost` below), in the same currency.

🔧 **How to enable**

Set the `currency` field inside the `condition` block.
```
"currency": "EUR"
```
>💡 Default behavior: If not set, the system may default to `EUR` or another predefined currency depending on the provider.

📦 **Example**
```
{
  "geoserver": "osm",
  "csps": ["ecoMovement"],
  "vehicle": {
    "initBatLvl": 100,
    "key": "eb1e9464-8654-4c01-bedd-b2f95412a60d",
    "payload": 75
  },
  "start": {
    "lon": 2.34755,
    "lat": 48.85708
  },
  "stop": {
    "lon": 4.35497,
    "lat": 50.83857
  },
  "condition": {
    "minBatLvl": 10.0,
    "currency": "GBP"
  }
}
```
**Response**
```
{
  "logTag": "0c0a50c3-8791-435d-80c4-4d8252e2c918",
  "journeys": [
    {
      "summary": {
        "vehicleInfo": {
          "brand": "Kia",
          "name": "e-Niro",
          "variant": "64 kWh",
          "year": "2018"
        },
        "distance": 325881,
        "duration": 12744,
        "batteryLevel": 10,
        "consumed": 66.35,
        "chargingTime": 454,
        "departureTime": 1790692272000,
        "arrivalTime": 1790705770000,
        "boundingBox": {
          "minLon": 2.3475670788198015,
          "minLat": 48.82658,
          "maxLon": 4.35548,
          "maxLat": 50.83906
        },
        "chargingCost": {
          "currency": "GBP",
          "withoutVat": 4.744215,
          "includeVat": 5.7405005
        }
      },
      "events": [
        {
          "eventType": "START",
          "coord": {
            "lon": 2.3475670788198015,
            "lat": 48.857108751160624
          },
          "address": "Quai de Gesvres, 75004 Paris, France",
          "departureTime": 1790692272000
        },
        {
          "eventType": "ROUTE",
          "distance": 276566,
          "duration": 10138,
          "consumed": 57.327046164778025
        },
        {
          "eventType": "CHARGE",
          "coord": {
            "lon": 3.86916221,
            "lat": 50.6693674
          },
          "arrivalTime": 1790702410000,
          "departureTime": 1790703164000,
          "arrivalBatteryLevel": 10.416628678789777,
          "departureBatteryLevel": 24.080891420749417,
          "chargingTime": 454,
          "chargingPower": {
            "currentType": "DC",
            "power": 77,
            "cnnTypeId": 38
          },
          "chargingCost": {
            "currency": "GBP",
            "withoutVat": 4.744215,
            "includeVat": 5.7405005,
            "tariffChargePassHashId": "2f0581a4648e0889b77321d14d2d7c36"
          },
          "pool": {
            "providerName": "ecoMovement",
            "providerMode": "LOCAL",
            "id": "1bb8cd94-c71f-11f0-b52b-42010aa400b8",
            "sourceProvider": "IONITY",
            "brand": "IONITY",
            "name": "IONITY GmbH IONITY Ath",
            "countryCode": "BEL",
            "address": {
              "countryCode": "BEL",
              "country": "BEL",
              "city": "Gellingen",
              "postalCode": "7822",
              "street": "Avenue des Artisans 1"
            },
            "accessibility": "PUBLIC",
            "availabilityStatus": "IN_SERVICE_FREE",
            "numberOfChargingPoint": 12,
            ...
          }
        },
        {
          "eventType": "ROUTE",
          "distance": 49315,
          "duration": 2606,
          "consumed": 9.018081990076134
        },
        {
          "eventType": "STOP",
          "coord": {
            "lon": 4.35463449209338,
            "lat": 50.838761144465366
          },
          "address": "34 Rue de la Régence, 1000 Bruxelles, België"
        }
      ]
    }
  ]
}
```
---
<a name="evsmartrouting_departureTime_tutorial"></a>
## 🕒 departureTime – Set the departure date and time
✅ **Use case**

You want to **plan a route starting at a specific date and time**, which is especially useful when:

- Considering **charging station availability**
- Enabling **dynamic traffic or weather forecasts**
- Coordinating trips with **appointments or deliveries**

💡 **What it does**
Specifies the **starting point in time** for the trip. This affects:

- Real-time traffic integration
- Weather-based consumption estimation
- Charging station availability (if provider supports it)

🔧 **How to enable**
Provide the `departureTime` field inside the `condition` block.

You can use two formats:

- 🕰️ **Epoch timestamp in milliseconds** (UTC) — recommended:

  - `"1672531200000"` (a number is accepted too)

- 📅 **ISO 8601 string**:

  - `"2011-12-03T10:15:30"`
  - `"2011-12-03T10:15:30+01:00"`
  - `"2011-12-03T10:15:30+01:00[Europe/Paris]"`

> ⚠️ An ISO time loses its offset: the wall-clock time is read as UTC. Measured on prod (29 September 2026): `"2026-10-10T08:00:00+02:00"`, `"2026-10-10T08:00:00"` and `"2026-10-10T08:00:00+02:00[Europe/Paris]"` all depart at `1791619200000` — 08:00 UTC, two hours late for Paris — while the same instant in epoch milliseconds, `"1791612000000"`, departs at 06:00 UTC as sent. Send epoch milliseconds.

📦 **Example** — departing on 10 July 2025 at 08:00 Paris time (06:00 UTC):
```
{
  "geoserver": "osm",
  "csps": ["ecoMovement"],
  "vehicle": {
    "initBatLvl": 100,
    "key": "eb1e9464-8654-4c01-bedd-b2f95412a60d",
    "payload": 75
  },
  "start": {
    "lon": 2.34755,
    "lat": 48.85708
  },
  "stop": {
    "lon": 4.35497,
    "lat": 50.83857
  },
  "condition": {
    "minBatLvl": 10.0,
    "departureTime": "1752127200000"
  }
}
```
**Response**
```
{
  "logTag": "8f6b7fe3-9810-4d69-84f9-3ae71fb25bb3",
  "journeys": [
    {
      "summary": {
        "vehicleInfo": {
          "brand": "Kia",
          "name": "e-Niro",
          "variant": "64 kWh",
          "year": "2018"
        },
        "distance": 325881,
        "duration": 12744,
        "batteryLevel": 10,
        "consumed": 66.35,
        "chargingTime": 454,
        "departureTime": 1752127200000,
        "arrivalTime": 1752140698000,
        "boundingBox": {
          "minLon": 2.3475670788198015,
          "minLat": 48.82658,
          "maxLon": 4.35548,
          "maxLat": 50.83906
        },
        "chargingCost": {
          "currency": "EUR",
          "withoutVat": 5.4207706,
          "includeVat": 6.5591326
        }
      },
      "events": [
        {
          "eventType": "START",
          "coord": {
            "lon": 2.3475670788198015,
            "lat": 48.857108751160624
          },
          "address": "Quai de Gesvres, 75004 Paris, France",
          "departureTime": 1752127200000
        },
        {
          "eventType": "ROUTE",
          "distance": 276566,
          "duration": 10138,
          "consumed": 57.327046164778025
        },
        {
          "eventType": "CHARGE",
          "coord": {
            "lon": 3.86916221,
            "lat": 50.6693674
          },
          "arrivalTime": 1752137338000,
          "departureTime": 1752138092000,
          "arrivalBatteryLevel": 10.416628678789777,
          "departureBatteryLevel": 24.080891420749417,
          "chargingTime": 454,
          "chargingPower": {
            "currentType": "DC",
            "power": 77,
            "cnnTypeId": 38
          },
          "chargingCost": {
            "currency": "EUR",
            "withoutVat": 5.4207706,
            "includeVat": 6.5591326,
            "tariffChargePassHashId": "2f0581a4648e0889b77321d14d2d7c36"
          },
          "pool": {
            "providerName": "ecoMovement",
            "providerMode": "LOCAL",
            "id": "1bb8cd94-c71f-11f0-b52b-42010aa400b8",
            "sourceProvider": "IONITY",
            "brand": "IONITY",
            "name": "IONITY GmbH IONITY Ath",
            "countryCode": "BEL",
            "address": {
              "countryCode": "BEL",
              "country": "BEL",
              "city": "Gellingen",
              "postalCode": "7822",
              "street": "Avenue des Artisans 1"
            },
            "accessibility": "PUBLIC",
            "availabilityStatus": "IN_SERVICE_FREE",
            "numberOfChargingPoint": 12,
            ...
          }
        },
        {
          "eventType": "ROUTE",
          "distance": 49315,
          "duration": 2606,
          "consumed": 9.018081990076134
        },
        {
          "eventType": "STOP",
          "coord": {
            "lon": 4.35463449209338,
            "lat": 50.838761144465366
          },
          "address": "34 Rue de la Régence, 1000 Bruxelles, België"
        }
      ]
    }
  ]
}
```
---
<a name="evsmartrouting_drivingStyle_tutorial"></a>
## 🧠 drivingStyle – Simulate driver behavior for better consumption forecasts
✅ **Use case**

You want to simulate realistic or custom driver behavior to **optimize energy consumption**, reflect **real-life driving styles**, or test **different acceleration profiles**.

💡 **What it does**
This field allows you to define how the EV is driven during routing. You can use a predefined mode (`ECO`, `NORMAL`, `SPORT`) or define **custom values** with `CUSTOM`.

It impacts:
- Acceleration / Deceleration
- Speed limitations
- Vehicle energy consumption
- Road type preferences

🎛️ **Available modes**
- `ECO`:	Slower driving, favors national roads, lower auxiliary usage
- `NORMAL`:	Standard vehicle specs from database
- `SPORT`:	Faster driving, favors highways, aggressive acceleration
- `CUSTOM`:	Fully customizable with manual control over acceleration, deceleration, speed limits, etc.

🔧 **How to enable**

Add a `drivingStyle` object inside `condition`:
```
"drivingStyle": {
  "mode": "ECO"
}
```
To use custom values:
```
"drivingStyle": {
  "mode": "CUSTOM",
  "limitMaxSpeed": 120,
  "allowOverVehSpdLim": true,
  "maxAcc": 1.5,
  "maxDec": -1.2
}
```
🧩 **Custom fields (used with `mode: CUSTOM`)**
- `limitMaxSpeed`	:	Max speed in km/h. Null uses vehicle's DB. Use with `allowOverVehSpdLim`.
- `allowOverVehSpdLim` : Allows to exceed max speed in DB.
- `maxAcc` : Average acceleration (m/s²), > 0. Example: 1.25
- `maxDec` : Average deceleration (m/s²), < 0. Example: -1.25
- `sps`	:	Road-type speed adjustment list (`SpeedPonderationFront`).

📦 **Example – ECO Mode**
```
{
  "geoserver": "osm",
  "csps": ["ecoMovement"],
  "vehicle": {
    "initBatLvl": 100,
    "key": "eb1e9464-8654-4c01-bedd-b2f95412a60d",
    "payload": 75
  },
  "start": {
    "lon": 2.34755,
    "lat": 48.85708
  },
  "stop": {
    "lon": 4.35497,
    "lat": 50.83857
  },
  "condition": {
    "minBatLvl": 10.0,
    "drivingStyle": {
      "mode": "ECO"
    }
  }
}
```
**Response**
```
{
  "logTag": "f69bea65-28bd-4d80-8c02-4d151637af7e",
  "journeys": [
    {
      "summary": {
        "vehicleInfo": {
          "brand": "Kia",
          "name": "e-Niro",
          "variant": "64 kWh",
          "year": "2018"
        },
        "distance": 312050,
        "duration": 12923,
        "batteryLevel": 10,
        "consumed": 62.8,
        "chargingTime": 270,
        "departureTime": 1752757600000,
        "arrivalTime": 1752771093000,
        "boundingBox": {
          "minLon": 2.347567485574783,
          "minLat": 48.82658,
          "maxLon": 4.35548,
          "maxLat": 50.83906
        }
      },
      "events": [
        {
          "eventType": "START",
          "coord": {
            "lon": 2.347567485574783,
            "lat": 48.85710875
          },
          "address": "Quai de Gesvres, 75004 Paris, France",
          "departureTime": 1752757600000
        },
        {
          "eventType": "ROUTE",
          "distance": 168024,
          "duration": 6882,
          "consumed": 34.48160190689897
        },
        {
          "eventType": "CHARGE",
          "coord": {
            "lon": 3.08922127,
            "lat": 50.12222526
          },
          "arrivalTime": 1752764482000,
          "departureTime": 1752765052000,
          "arrivalBatteryLevel": 46.12302780772248,
          "departureBatteryLevel": 54.247939294783684,
          "chargingTime": 270,
          "chargingPower": {
            "currentType": "DC",
            "power": 77,
            "cnnTypeId": 38
          },
          "pool": {
            "providerName": "ecoMovement",
            "providerMode": "LOCAL",
            "id": "c8109b7c-e8ad-11ef-9543-42010aa400b8",
            "sourceProvider": "TotalEnergies",
            "updateDate": 1752462431048,
            "brand": "TotalEnergies",
            "name": "RELAIS DE HAVRINCOURT",
            "countryCode": "FRA",
            "address": {
              "countryCode": "FRA",
              "country": "FRA",
              "city": "Havrincourt",
              "postalCode": "62147",
              "street": "A2"
            },
            "siteCategory": "ON_STREET",
            "accessibility": "PUBLIC",
            "entrance": {
              "lon": 3.08922127,
              "lat": 50.12222526
            },
            "phoneNumber": "+(33)-(9)-77405060",
            "availabilityStatus": "IN_SERVICE",
            "open24x7": true,
            "numberOfChargingPoint": 8,
            "reliabilityScore": 50,
            "predictedOccupancyTimeSlots": [
              {
                "dayOfweek": "MONDAY",
                "start": "00:00",
                "end": "18:59",
                "predictedOccupancy": 5
              },
              {
                "dayOfweek": "MONDAY",
                "start": "19:00",
                "end": "23:59",
                "predictedOccupancy": 4
              },
              ...
            ],
            "chargingStations": [
              {
                ...
                "bookable": false,
                "chargingPoints": [
                  {
                    "id": "CU-TOTAL-NF080350-002-1",
                    "operatorId": "FR*HPC*ENF080350*002*1",
                    "availabilityStatus": "IN_SERVICE",
                    "currentType": "DC",
                    "voltage": 900,
                    "ampere": 333,
                    "power": 300,
                    "remoteCharging": true,
                    "type": 38,
                    "connectorTypes": [
                      {
                        "id": 38,
                        "key": "TYPE_2-CABLE_COMBO_CCS",
                        "deprecated": false,
                        "name": "Type 2 Combo",
                        "norm": "Combo Type 2 based, DC",
                        "maxPower": 350,
                        "acSingle": false,
                        "acThree": false,
                        "dc": true,
                        "cable": true
                      }
                    ]
                  }
                ]
              }
            ]
          }
        },
```
**📊 Tips**

- Use `ECO` to simulate energy saving strategies.
- Use `SPORT` to simulate real-time driving with time constraints.
- Use `CUSTOM` for total control over routing physics.
---
<a name="evsmartrouting_encodedGeometry_tutorial"></a>
## 🧬 encodedGeometry – Enable encoded polyline output for lightweight responses
✅ **Use case**

You want to **minimize response size** and **store the route geometry efficiently** (for example, when working with mobile apps or low-bandwidth environments).

💡 **What it does**

When enabled, the route geometry will be returned as a **compressed polyline string** (Google-style encoded format), instead of a list of lat/lon coordinates. This format is compact and widely supported in mapping libraries (Leaflet, Google Maps, Mapbox, etc.).

🔧 **How to enable**

Add the `encodedGeometry` field in your `condition` block and set it to `true`:
```
"condition": {
  "encodedGeometry": true
}
```
📦 **Example**
```
{
  "geoserver": "osm",
  "csps": ["ecoMovement"],
  "vehicle": {
    "initBatLvl": 100,
    "key": "eb1e9464-8654-4c01-bedd-b2f95412a60d",
    "payload": 75
  },
  "start": {
    "lon": 2.34755,
    "lat": 48.85708
  },
  "stop": {
    "lon": 4.35497,
    "lat": 50.83857
  },
  "condition": {
    "minBatLvl": 10.0,
    "encodedGeometry": true
  }
}
```
**Response**
```
{
  "logTag": "afac384f-227c-4896-8dc1-87b7092892e0",
  "journeys": [
    {
      "summary": {
        "vehicleInfo": {
          "brand": "Kia",
          "name": "e-Niro",
          "variant": "64 kWh",
          "year": "2018"
        },
        "distance": 312050,
        "duration": 12439,
        "batteryLevel": 10,
        "consumed": 69.31,
        "chargingTime": 608,
        "departureTime": 1752757660000,
        "arrivalTime": 1752771007000,
        "boundingBox": {
          "minLon": 2.347567485574783,
          "minLat": 48.82658,
          "maxLon": 4.35548,
          "maxLat": 50.83906
        }
      },
      "events": [
        {
          "eventType": "START",
          "coord": {
            "lon": 2.347567485574783,
            "lat": 48.85710875
          },
          "address": "Quai de Gesvres, 75004 Paris, France",
          "departureTime": 1752757660000
        },
        {
          "eventType": "ROUTE",
          "distance": 168024,
          "duration": 6529,
          "consumed": 38.53506932004888,
          "encodedGeometry": "}keiHioiMBMTqAJe@\\iBH_@^yAFUpAwEFYPq@Jc@Xy@v@wCVi@Rc@La@@EBKFWDQb@aBdB}F@GFSJ]p@aC|@kDhAuEBIFSJa@`AuDDMz@kDn@_CHWb@cAj@u@t@c@lCGLAF?\\?^?dCE`@Gd@[Va@R]~@_BHMNYlB_DtAaCJQ`A}AXa@JKbAaAVYNKFEnAgAlAwAz@gARUh@u@LWbBgCnA_CZ{@He@L{@Rw@hBsC|A}BlBuC`CaDfEgFZa@|G{H^c@^a@|AqBlCiDjB_BrJkMt@qA~@mBrDaFrAkB|CcEhKyN~@oAr@u@jAq@|BsA~@o@Z]z@cA~@gB`BeCrAoBz@wALONsA?oAMy@Sq@_@mAy@iCcAoDa@iB_@oFcD{UO_AWyAk@sB_AaCUa@aAcBk@cAiEmHeFuKWk@uCiG{@wCeEqOc@aAo@gA_AkAy@u@qA{@iAe@uLwCmGiAqASeCUyMc@qBSiAM}Dg@cFm@cBUaBSqLyAiDi@_BI}ADsBb@c@R}G|CiAZcC`@gAB{@?sJi@}FSmCAgM`AeAGiECeCE}@EiAc@c@a@e@y@_@cA{AiFa@uBKkAGqAAeBKgEUaCq@yEK_@e@cDsCsQ_AcFqAiESm@g@cAoAqBgAwAW[qCgDgAoAeAcBqCqE{AwCeAmBiDkHcFoMISiEmL{Na_@aDoJ[aAuFyPaB{EGSkIqV_DqJeAuC[aA{CiJ[oA]iB]gDIsACoEFoEd@sW?}CMkDKcAGo@_@yBaAiDoAuCgC_EkAgBeAqAy@q@qBeAyA_@{AMeABgBVKBaH~AiFv@[GgB\\yBx@m@XqDnBoMtIgCfAsBn@q@R{APw@DkDC_AEeDk@cBm@aCgAeD_BmBq@wEuAwJgCwDcAqAi@gCuAw@m@uKgIc@[q@e@wBuAqHuDqGaCmEcAeEy@oHuAuBc@qHqBmV_Ie@K{Co@cDi@iF_@_BEmGJiGXcM`A{@H_BD{In@kGj@k@F}Fx@qDt@mKfCcHdCy@V_AZoLdE{CfAwC`AmQjGsIfCqCr@{KlB}Fl@qG\\uFP_IKuLw@eCa@oBe@yCaAmCqAsAy@{BmBqCyC_BqBkBqCg@u@oB_DAAmGqKmAgCy@wAiPeYa@g@gKwQ{MeUuEiIcBeD}KyRmA}BwCeHy@{BmAmDUa@}@}Bs@qAw@mAaAkA_A{@aBmAiAiAgH{IaEeEmAaAmEeFe[o]mD_EkCsCeG}GmX}ZmGmGqHiGsGoEeEaC_By@qHgDc@QuAi@cDsA}CqAy\\aNgLuEoBy@gAc@qBy@gAc@qBy@aCaAuD{AgHwCeGcCqBy@wB}@oKiEyCmA{F}Bg@UyB{@oEgBuMuE{FaBqNqD{Q{EoBi@{ImCaDoAsDgB{L{G}HkD_FiBiFkAqMuBeBQqASwB[cI_BeGaBiG_CuL{EwGqBsCw@s@Q_HiAeFi@_JOkE?kDJcXhAgSp@sU|@ePl@uEVwBBg`@|AeQp@cRt@O?sFPkDHaF?iFSgAIwK_As_@iDuEo@cMeC}DgA_AWqN_GgJoDiGsBqAc@}D}@SGwCk@sMsAoIi@eJs@qAQqE{@yF_BkEgBkCoAsBkAkBkAoHwFmFuF{EcGiM}PmUm[{k@yw@{|@amAkJqMgCyCeCgCoAgAkCqBsF_DqFyBwFsA{ASaFc@kCI{HBkBGuBKyDg@_Dq@cCs@}Ak@gD_BaEcCmFaEmDkCoBmAwBsAoAk@iCcAoCw@iFaA{D]kCIqEByDXcDh@_Dp@yKhDkEbAuGz@mCHaCAaHg@}EcAoC}@_A_@_EqBsEmC{RcM_EgCmAs@wJoGiEkDaKqJcE}E{BkCmEkGcBeCoHwMkFcLWm@iBeFcAgFyDcTgAgDyAsDw@oAwFcJaEgIaAoCYu@}^qfAeDcJqDoIyDiH_BiCeDuEqBgC}GiHaEgEsWyWoEmEsAwA}CgD}E{FwDcFmEaHwHkMkf@k{@{EoHgC}CkDwD{AyAmBcBsCyBwDcCm_@wSaa@oTcV{MuN}IsKwFaJkDqBg@oEu@gCW_CI}C?iABgHn@[FkLvC}FnBwNxFgCbAqGnBuG|AgBX_WpDi[pEoFbAcG~BiDvByLvJ}B`BqBlAuBbA{CfAyBh@{AViCVk@D_@BaCDgBE}Fm@wOqCeBYmBa@qEw@{PkDkB]iPkE_IyC}HgCqP}FwUqI}o@eUc@O_L_EsVwIwEcBgC}@{CeAUI{FqBgJgCoD}@}L_C_^wEa@E_RyBsEa@cI[uRMO?sa@KsGJS?wMn@}Ix@yFx@iIxA_PvDm@P}u@hSgNrDmFnA}RnFuBj@}I`C_IjBeGfAaEb@kBPqFRcJ@kFMgEOcBGi[oA{DQyDGqeAcEu@CgFWuFMQA}@CkKi@i@A{Ro@yT}@{Hm@iKoAyI_BkJyBiGiB_GqBgHsC{O{Hav@u`@{SqK}@c@eFsBsDqAqGeBqDo@eHkAej@}GyzAaRqrBgWwM}AmEm@sC]ye@_GwGaAuGkA_Dq@wQwE{x@sTu@Q}@W}v@aTwHaC}MuEuJqDiJkD}_A{]wOaGk|@g\\uIaDe@QkAc@yJqDsTiHaq@eRk\\}I}GyA_J_BsFq@oJy@gFYuFOmNOej@WeK?kVKE?}IE}FM}Lo@_ScCyl@eLae@kJ_WyHuhA}]}x@mWyF}AaI{AkFq@gGa@_LMcKH}FFY?mUTkq@r@cNN}IJ_EDeZV{DB_KOgCQoBMwGaAwCk@gE}@iBg@uAa@sIcDmWmKeTeIm`@yO}@]wN}FcGyBaIwC}G{Bo`@mL}hAw\\CAc@MEAsW{HkQ_FsUiFq`@aI_d@gJeAU{Ck@y^sHuA[kDs@}HaB{WwFqWgF{G}AqMaEyGwCyHiEsDeC_ImGcImHkNaNKIQQ_GoFYUeBwAWSkDmC{FsDwHcEgF_Ciz@u\\ea@_PoCgAsTwIyNiFuGmBiMwCeMmBmIaAwi@iFsC[ab@yDuGm@qD]oSoB_@EodA{Jwe@qE}]gDiNuAgEg@}@IuAWeDi@oEcAgJmCsHaDkHyDc@W{A_AyAcAgD_CoDcC{ZgTcG_DgJ{DiH{ByK{B}M{AeNo@ac@oB{qA_GeLQmHBqA?q_@p@mGCgGQmAGuBMmCMqTgBy@Go@GsE]iDY}McAYCqFe@{@Gk@GcNgAeL_B{Dy@kEiAaJeD{Am@gCkAsF}CqPoKwCkB_IcFqH{Dm@Wa@SyHkDwGuCctAyl@aOsG[MuJuDkEsAyEmAiHqAiI}@oDWsWaAyKk@cIu@yB[gE{@uGcBuGuBy@]wB}@mGkCy^iQq@o@gI{E}F_EqCuBeDsCeD_DmG}G}FuHcEeGw\\oi@cF}IsDeHiDuHqD_JiD_KyCmJoGqSoCaJc@sAcRcm@_EsLaFmNwGeQwEqLaAcC_Oc^mFsMmA{CcQyb@cFkNaEgMuEoPcEcQ_EiRkL{k@eE{SeYiwAmEoV_D{R}AmKqBuN{Ew_@aBiLcC_PuCgPmCmN{EyT{D}OkBiHg@gBgIoXuC}IMa@Si@cIqTcHgQgGmNyF_McIiPqFwKuOaZi@cA}FmKmNoVuI{N}OsWoRgZkR}Xi_@qh@uz@uiAcJeM_BaCGa@k@eAu@{AIWi@qAk@uC"
        },
        {
          "eventType": "CHARGE",
          "coord": {
            "lon": 3.08922127,
            "lat": 50.12222526
          },
          "arrivalTime": 1752764189000,
          "departureTime": 1752765097000,
          "arrivalBatteryLevel": 39.78895418742362,
          "departureBatteryLevel": 58.08151994321714,
          "chargingTime": 608,
          "chargingPower": {
            "currentType": "DC",
            "power": 77,
            "cnnTypeId": 38
          },
          "pool": {
            "providerName": "ecoMovement",
            "providerMode": "LOCAL",
            "id": "c8109b7c-e8ad-11ef-9543-42010aa400b8",
            "sourceProvider": "TotalEnergies",
            "updateDate": 1752462431048,
            "brand": "TotalEnergies",
            "name": "RELAIS DE HAVRINCOURT",
            "countryCode": "FRA",
            "address": {
              "countryCode": "FRA",
              "country": "FRA",
              "city": "Havrincourt",
              "postalCode": "62147",
              "street": "A2"
            },
            "siteCategory": "ON_STREET",
            "accessibility": "PUBLIC",
            "entrance": {
              "lon": 3.08922127,
              "lat": 50.12222526
            },
            "phoneNumber": "+(33)-(9)-77405060",
            "availabilityStatus": "IN_SERVICE",
            "open24x7": true,
            "numberOfChargingPoint": 8,
            "reliabilityScore": 50,
            "predictedOccupancyTimeSlots": [
              {
                "dayOfweek": "MONDAY",
                "start": "00:00",
                "end": "18:59",
                "predictedOccupancy": 5
              },
              {
                "dayOfweek": "MONDAY",
                "start": "19:00",
                "end": "23:59",
                "predictedOccupancy": 4
              },
              ...
            ],
            "chargingStations": [
              {
                ...
                "bookable": false,
                "chargingPoints": [
                  {
                    "id": "CU-TOTAL-NF080350-002-1",
                    "operatorId": "FR*HPC*ENF080350*002*1",
                    "availabilityStatus": "IN_SERVICE",
                    "currentType": "DC",
                    "voltage": 900,
                    "ampere": 333,
                    "power": 300,
                    "remoteCharging": true,
                    "type": 38,
                    "connectorTypes": [
                      {
                        "id": 38,
                        "key": "TYPE_2-CABLE_COMBO_CCS",
                        "deprecated": false,
                        "name": "Type 2 Combo",
                        "norm": "Combo Type 2 based, DC",
                        "maxPower": 350,
                        "acSingle": false,
                        "acThree": false,
                        "dc": true,
                        "cable": true
                      }
                    ]
                  }
                ]
              }
            ]
          }
        },
```
In the response, you'll find a field like:

```
"encodedGeometry": "wkeiHeoiM@I`@eC`@gCdAh@fAh@fAh@dAh@nAn@TJrCpANHnAn@ZNHDVLLFJDPF|@h@tB`Aj@XlAl@`@RHD`Ab@b@RJu@Z_Cj@oD@IHk@XiBHm@^yBXgBl@sDHeBDoDDuBDgBHyH@iA@w@B}@D{B?eBEu@Ic@YqAI_@q@{CUgAQw@S_Ac@kBQu@EUg@_CIg@EWMu@f@Ar@?z@AhAKd@[`@m@tA_CtA}B~B{DVc@tAwBLMfAaANOJIJKt@g@fBsB\\a@|@oAJOX]j@aAh@{@fAkB^}@R{@FWJs@X}@dCyDrB{ChE_GnDkEPUZ]`JkKxEcGt@s@lAkA|@eAbDmEHKFIh@u@~A{BfAyBr@iA`HkJd@o@l@{@rAkB|B_DjAeBZs@lAcBx@kAdBaBv@KpAw@bAm@b@[j@m@X]V_@`AqBn@{@Xa@fBcCj@{@Pg@NYHeACs@Iy@Uy@[aAi@}AKm@ISq@}Bk@oAi@kHi@eEcCaQi@sCi@mBs@eBYk@S_@S]Ua@[k@[g@oAyBkBmDQ]kBuDcAuBe@_A_@q@eAyBeAcCuAuEi@wBy@}Ce@mBUm@Uk@Ys@eAeBqA_B{@s@oAo@wEsAcCi@oIcB_AQyAUoAOoCMwBIyAG_FS{AO[CaAI_Da@iH_AyC_@uH}@o@KqGs@kBBsARmAb@yE|BkAf@_@HeBXoAJs@?o@@{CGoBK{@EqCOsAE}BIyDJ}D^oAJkAJa@@o@Kk@A_BAuAAwBGmAQiAu@k@y@o@aBqAmE_@qBSoCC}BA}@GqA]wC]}CWaBm@eEM}@u@{ESqAq@gEcAgFu@qCa@iAqAoCo@eA[c@q@}@o@w@g@m@SU]_@mAsAeB}B[k@aEsH{@cB}@uAuCaHk@wAcDoI]_A}EqMmBaF{BqFo@eBsDkJw@{BqAsDe@uAgGwQQk@gAkDEOqFmP]eAmAmDs@uBcBaFk@aBa@mAUq@sA_EoAeEo@cD[sCO}EJqH^ySBuFGoCKyAk@_EiAaEsAsCmBwC{B_Da@e@y@q@g@_@}B}@s@Qy@GoCFs@LgDz@SF{@PgGz@_C^g@LwAd@c@PoAh@}CbBSNIFSL_ErCcF~C}D|AoCl@gDNqAEqBSeB]qA_@gA_@}Au@iAk@q@]}Ao@sDoA{KwCsCu@{Bu@eD_BsBwAi@_@mEkDwBaBqFqDiBcAaDyA{EgBuHiBg@Ke@KmLyBgJ_C}UwHs@SWGg@Kc@KiEu@sCYwCO{DCyBDo@@mMz@{@FiBNW@I@I@M@K@W@G?E?u@F_AFaGb@_BL_K`AaEn@sCl@aFjAyJ|CwBr@kFjBoGtBe@Pi@PoE|AcBl@mE~AwLbEoF|AgAZ{E~@cIhAoE`@S@}AH_CN_BBa@@W@aIFaAEeBI[CyHk@eAO{@QcEcAyCkAuAq@mCiBkAcAcAcAuEaG{CwEiEkHwDqGgAsBSk@MUyEeIqGcLc@c@oHsM_@s@eAmBs@gAeKcQeF_Jm@{AgAkBoFiJaEiHcCaFcCkGmBqFwA}CeBkCwDaE{BmB}EcGyCcDuB}AyGwH{BeCuEgFuBaCcUeWyFsGuA}AyFmGeG}GmKgLcC}BqAkA_FcE_CcBuDaCkGoDkGoCeDsAsAi@sB{@yB}@w@[kHuCg@SoBw@oD}AaIcDmAe@eAc@_A]iAk@cA]UKyAq@eAc@qB{@oAe@yBy@_G_Cs@YePuGwCkAcAc@qBy@mAg@eEcBa@QsCeA}BaA_Bs@_A_@e@SYMWK_DmAa@OmI}C[Km@SwIiCcG}Ai@OcHiBo@OsCu@uBi@gBe@}LkDmFoByFkCcHwDuFwCsF}BwDoAgD}@_Do@{LkBmC]}@Mi@IaBWi@KcH_BeKmDiHuCyEiBqEyAwAa@iAYuGkAmDa@sG_@wGAsCFeBDmTt@{WbAW@kAD{Op@e@BuCJmLd@mFPyf@jBY@qH\\gIZiCHgHXyHVkI?_HYaAImJu@y@K{CWmK_A_CUqNwAcGcAuAWyFyA_@Ka@MyEaBuUsJkGuBsCw@}Cs@_Fu@aHq@_Ls@gGc@eCYeDk@}D_AsBk@gDmAsCuAeB_AuAs@q@a@wDmCeEqDkDmDcH{IY_@k@w@_GcIw@cAyAqB]e@c@k@cRkWsAgB{Y_a@gJeMsBqCes@_aAmAcBm@y@eDsEiLsOqE}E_Aw@oC{BqFgDwEqBgBi@kH}AuBQqDS}B?oFBiCIqDYqDe@uBi@gC}@}DeBwDuBuG{EsHqFiCsAiCgA{Bw@mCo@}Do@mCWmDIiC@qFX}Ez@sD~@iGlBaFrAo@Jg@JgEh@}CN}DAgDWqHqAqCaAgEmBuHoEePeKYSeDsBiAs@_@U_FcDaFqDm@c@oByA_CuBeAcA_@]kCiC{AcBkAsAoBcCiEcGs@aAoEoH{B_E{CiGcCqFISUi@_BeEUw@_AoDi@wDW}A{@uEc@}B_@aBeA{CoA{CYo@mFaJ_A}A[m@]s@sBiEs@mBUs@mBwFYy@y@}Bo[y~@eCsGkCaGuDeHiF_IwC{DyKeL}A}A}XcY_KkKyDqEaGcIiCaEyFoJqYwg@cMqTiB{CsB{CyC{DiCwCkDgD}BoBuAgAqCkByMuHuK_GwEgCoBiAyDsB_@Sim@m\\uPiKuF{CuGuCsFgBmDs@{C_@{CQcECmEPmBTm@HeAPiCh@yFxAmKvD{CnAqAf@aA^sDtAeA^yEzAeCl@_IzAe@HmAP}JvA{Cb@mEl@cRjCqCb@}Dx@wBl@gEhBkElCoJzH_D|B}DxBeBr@kBj@gAXeDl@sEZuABQ?kAEaFc@aMyBgDm@uB_@MCqFcAqAS}FgAmAWkBc@_Du@uEiAiBg@aDaAeDeAkHcCkBo@sDsAcMkEga@qNm@Sea@oNgAa@cJcDi@SmE{AmC}@eFkBgKoDeDmAwBu@cC}@oC}@aA]sAc@qHwBaAWcIgBiKeB}Em@}b@uFyJs@}EU{KQaVGgYEaHRyGb@sDX{Gt@qG`AsHzAqMdDuBj@ag@tMsD`A}@VuBj@_Bb@sL~CgSnFiAZcAVmFvAwL|C{IhBcC^}Fh@wGXkG?}GOo@CsCMq@CcYeAcFSkAEmJ]}`AoDoOm@a@AiU}@gK_@cU}@aF_@mGs@}HiAaF}@qEcA{F_BgHyBuIaDeEiBqKkF_`A{f@}ImE{EwBgE_BcHqBsDw@mLgBuH_AcV{Cca@cFmMyAeq@uIyJmAgg@kGi@G}B[w{@sKaKoAsH_AsDa@sKqAcIgA{Q{BcCa@sB_@yA[gAUoCi@qEiA{Bo@{Aa@oEkAmc@sLsI}B{HwBqA]_\\}Ia[qI}TqHuLmEaJgD}v@sYyKaEcLkEaw@sYgAa@cC_AwNqFwGcCcQ}F_u@wS_QyE{PkEkIyAiJoAyNgA_EOiMS{e@QsC?e@?yKEqA?uGEwOEO?kB?cAAsBCq@Ay@C}Ja@cIm@uNiBg@IoXcFaGiAye@cJkCo@i@My@SYGmBe@mJsCksAkb@k_@uLi_@kLsCo@qCk@oHcAcJk@aFOc@?yAB}@?k@@_BBwB@qa@`@ca@b@a@@iKHoHHgQPkEDyABw@@{CBkC@aDF}DD_B@wA?gGCiI]}BYcFo@oDm@wHkB{C_AwG_Cse@kR{T}IkEeBoCgA_E_Bs@Y{Am@_A_@eDsAc@QwEiBaC}@yDwAgFiBwIyCeNcE}O{Ei[iJo^wK_NaEc[eJyKwC}JeCwImBo`@cIiDs@c]aHiCi@mAWsSgE}PmDm@M{LeCqn@mMuAYkJ{BmJ}C}HkDoDkBsFmDeF{Du@k@yHaHsQgQi@g@wDkDyDaDeAy@wCwBaFaDcDgBmG}CuGuCeO}FeLsE{u@iZsBy@mCcAYKeUcJ_LaEcJiCeKcC}Dw@_L}Aif@{EmAI}Fi@UCuAKg@Ec@E_@EsCWmCSwSuBaE_@mCU_LeA_Ho@u@IkBSg]aDyIy@_XeCwBSwTuBeMmAoAM}@IqAO{@K_KaAaP{A}BUyBUsI_AqBYqASaCc@kHgB{FkBoGgCyBcAoDoBy@g@oAu@a@W_EmC}@m@_BiAqPwLoH{EgEeCgFkCiGiCwGwBkIoBgFy@sI}@gAIgMm@gy@uD{DSyXqAsZsAoLSoJDuKPoBD}GPyFDkGCwFOm@CyAGkBKiAGeCOyDYkNkAoCSyE_@o@E_AIwMcA_E[g@EoAKaIq@kHs@iC_@yHsAwCu@oEqAYKaE}A}@]cAc@wDgBqC{AoKwGsDcCkAw@o@c@u@e@{A_AsEsCqKuFg@UeCkAiGqCiAg@cmA_i@qAk@sEsBqO{G_FoBcEwA_HqBgIcBkFu@yFg@}DUeMc@iMc@}Io@qD_@aDg@{@Om@MuA[iGeBqFiByB{@cDoAuDaBy[qO}AgA_DiBa@S}JsGkDiC_EmDkDeDiG}GsGqI}FwIuF}IaA{AaEyGiJkOcCiEkDkGuEsJaA}BmD_JkEkMaAaDyHwVaDgKwQml@wAcEyAoE}GuROc@qHuRwDiJg@oAoA{C_GsN_DwHsDcJuCeHoKuWs@gBsDmJ}DaLcD_KaCeIcFyRoB}IgGeZ}Ho`@wDgRyAsH}Kkj@mIcb@oDaSkBeLoEuYwDmYiCcTiEqYuCmP_EsS{CeNuEqRq@gCyAsFyB{HiF{PyBuGuJ_XgFoMuHgQ_GkMmHkO{KmTsHoN}AuC_Vub@_Sm\\cMkSoNmT_W}^sIwLu@eAeMaQSY}`@oi@mLuO{R_X{@qAq@_AeFsH}DqG{CoFyFyKaBmDeA_C_FkLoBcFgEqL}Teq@_DuI_D_IkD{HiAeCaF}JyFcKaDiFcC}D_FuHw@kAcBeCmGkK_JkOgByCe@u@o@mAIOg@{@_AeB{BmEcG{M{C{H{CsImAoDgEmNyBiIm@eCo@eCS{@k@_CUeAYqA}@eEQ{@iE}SiEaT}BqKoEwQgCaJeDoK}DeLaEkKqG}N{EsJcHcMyEsHmHgKeCaDmIuJqIuImCcCeA_AaA{@kI{GaAu@kA}@yB}AmYsTqDkCsDqCkB_BaFsDk@c@{K_JmJ{I{DaEqEiFqJaM}CoEuCsE{CcFeDcGyF{KwE_KiKiV{Vun@}HsQiEyIc@{@}E}IgHwLgDqFyHwL{C{EU]uGgK_EsGqIwNoIsOsGyMkHkPqHoR_EiL_CiHqCaJiGeTmMye@k@yBsAgF_EkOQq@eBsGIa@wA}G{@gE]{A_AaESu@Sw@]uAiA}D{ByF}@kC{AwFOm@{D_NSq@aA{CsDwKqHyRuHwQ_Ni[wDgJsD}JaByEsFsP{BkH]gA_@mAEOY{@aBmFeFaPsEkM}D{J{FiMaI{OIOqAyB_A}Aq@eA_@m@a@m@mDsFiEkGkG}HmIgJYYoAqA][o@m@aC{BkHkGsHuFyDkCoCaB{CgBqKgFsFaCeTqIk@Ug@UoB_Aw@_@q@]uFaDmHgFmHuG}EkF{D}EuCaEkE_H{Zkj@mC{EsGiLoGsKcAaBoAgBaIkLiBcCsEaGkEkFaCsCoNwOoMeN{FsGs@y@}@kAmEeGeF_IqCgFi@aAcC}EoDiIm@uAc@iAaCoGcCiHkF_QiCgJaBoGaGwUoDwN_DeN}D{R}AmIqF_\\cAiGgHkc@kA_Hk@aD}BcLq@wC}@wDeA_EgC{I}DsLyFiO}BwFkGaN_C_FYi@eAwBeCcFyHgOoEoIeE{Ha@w@uNmX_HgNyBiE_@y@sAwCWm@iCaGo@cBiEkLsC}IgBqGkAmEcAoEqAoGuAiIi@aEk@wE_@yDWmC]eEa@uFw@yLm@}Ko@yM{@}VUaJMgGC}AEcBEaCCeBA}AA_AEkFC}JFuGHsDFsAVqF`AaON_Bl@yGv@uIn@uGVcC\\eDN_BjB}SHcAb@oEHs@XaDVqCB]b@yEHk@^{DZeEj@}Hj@}LJkEF{IAuH]eR]kIOuCKaBO}Bq@uJiDob@i@cJM}FAwCDuEZuHl@wGlAaIt@kDvDaOrAuGTuA~@mH`@sE\\iFHcBH}IA}COsHg@kIAMQkBg@gEwBwMqAwFqA{EoA_EkDeJmBcEmEeIa@w@wEgHkFkH}AmBiFkG]a@cGqGuRaSeCiCiGmGoAsAkAmAiBiBaLyLuI{JsOiRuH}JiO}ScN}RuAoBs@cAm@{@qJ}M{FwHwDwEY]qHiIuEsEuDeD}HoGgAy@gGuD_JaFgF_CqIeDyLqD[I{DaAmZiG_KuBoRsEeHoBsEyAkIwCyGmCkAg@oFaC}DiBwOuIaIaFs@e@qA}@y@m@u@g@_GgEyFqEmIkHwJiJu@w@mFuF{GuHcD{DkAwAuCqDW]gEyFyJqN_IcMgGiKyDaHsImPiEyIoD{H{F{MKS_@{@IS}@wB_D}H{AgEsAuD{D_KmBqF{@eCeBiF[}@{AwEw@eCW{@[aAwAyEe@{AsA_FsCeNUcAqBwGyA{Dk@gBe@wA_AyDaEuQy@oDk@iCeDcPeEmTqDaTgD_TqEc\\aDsXcCeVaD{_@_A}MiAwRkAuV]kJYkJc@uM[gO[}SOwVCuSAsFAeDEgNSsc@a@c|@c@}jAC}IEcSAsAAqBSaYGmNIsQA_C_@{cAMeRAiAOwNGgEaA_h@GcDAsAC}EI}K?gEMu`@AgDAaBCqGMkd@IyUAiDEmI?qAAaAE}GAaCs@cvAAsCCaSIaM]glACyHK_^Qip@EiOKe]CqIAyFAyCEyK?cAE{JGkHOmIG_CYiIs@gLu@qIy@yHS{AQqA[yBYmB_AqF_AyEyAwGcByGcDqKeDaJsAaDoD{HeDgGu@oAeDeFcB_CSYoBgCY]}AgBQScI_IcBqAOK}C}Bi@]mAu@iEcCkDcBcHuCwBw@k@SmKuDw@Wk@SwImDsEcCoE_DgCaCaCkCe@q@g@q@kAiByCqFsB}Es@mB}A_FsAmFg@kCc@}Be@_Di@yDe@yFMeBo@}OKaEEmACy@CaBO{Go@yN]_GQyBM}Am@wGg@cFyBcPqBsL{CaOqAmFuD_NsEkO_BmFaByF}@mDuBiJwAcI}@mH}@oKWsEKmCIwEAuAAyD?eFDmCR}GVeFZgE\\iDhA_K~AsL~I{p@|Em^d@kDvGuf@jHqi@dBmMVoBzCaU|AiM~CqUjAuIxDcZv@oITeETeKEaJOcFg@{HaAsJoAeKaEuYyAqKmEk[YsBe@gD}@oG}@wGi@yDyAmK}Eu]sCoSYwBm@cEiCaRkJqq@k@cE_BmLm@mEg@uDe@kDc@{CGa@yCeTkFy_@uBsOqCmTi@mEc@qDScBsDg\\Gi@{C{Xi@aF[sC{BgTe@mE}BkTiAgKs@oGs@oGW}BYaCw@wGaCkTyAeLy@yF{AyI}B_LuAuFw@sC}BkHaB{EmBaF{DeJuD_IqC{FcEoIgBqD_AoB}BwEcRy_@mAaCc@}@cN_Y}GsN_EkIuC}F}GiNa@}@{@cBo@qAgGgMcEqIWi@a@y@kE{IcAsByA{C[o@w@_BmVkg@gWyh@{G_OwFmNeCiHgAmDcEqOsBaJg@}BaCeN_C_Qs@mGOkAMgAgCmTg@iEkBoMYgBgBuKoAeHuDgR}CeNcFqSyAkFqEsPoDqLeGyR_DwJ_DoJyHkTgBmFmCoIeBoFY{@cIiT]_AqHgRqB{EUk@aB{D_IiQeIoP_JsPoFgJ{EoHm@{@iBaCkEiFaEiE{F}EgAw@m@c@aHiEyCyAuAy@gEaB}C_AeJsBeKiAuAE_AEuBEiEB}@@kHd@iFp@yE~@]HcEjA{EbBeBt@m@XkCrA_E`CmExC{@n@sDnCk@b@qFbEuFtDoEdCyExB}CjAqF~AyDz@gG~@wDZoGTcC?sFOiJ}@wH{Ay@SiFaByEmB{As@UMk@YcF{C_GeE_NiLcDoCyC{B{CsBw@e@yEiC{DeBc@QyCgAkDcAkDy@uDo@oFm@uCSaL]mFEwFEm@?oEG_BCqIOwX}@eY}A}NeAeWcC{BUiGm@uD]_@EeFe@sBMoCSmEY_BGgFa@iH]sEOuGWcBE_GQaHMi@AyGIiAAqAAaC?qDD}ER{E\\mFj@cFx@iDr@{JlC_F~A{@ZwEjBqItDk@XcG|CuAv@iEjCaEjCoAz@wAdAu@h@i@`@_HzFw@t@uAtAQNWXoArA{CnDyC~D_EfGwCbFsAfCwBrE}BnFqBjFcAtCa@lAc@vAeC|I_AtDc@fB]zAcGbYsBlIwA`FqBbGg@rAgEfKmCpF}B`EwBhDoD`F{CpD_BbBoF`FoCtBeDzBqDtBsB`A{ClA}DrAeEbAmGbAkDZwEP}@?kGG_Hk@wFaAiEgA{DoAYKmC_AuBu@i@Sq@Uc@O{FkBiJeCiBa@uCm@sDq@eJiAm]gDkBUuD}@eGcBg@SuEmBmAm@qBqA{EgDkDuCiCiCuEwFe@m@}@oAeB_CyJiMgBoBeBqBkBiBoFsEcCkBiCcB}EqC_F}BeJsDcKyDoBs@iI{CmAk@gSoHgGoCyAq@qE{BmIwEoMkIaBeAoBqAyDeCmFiDsCkBq@c@sEyCmAu@eH_EgI}DkKcEsIkCoD}@_B_@y@Q_Do@aBY}Es@cBSuAMuD[yAKmBKg@CaIOwE@qA@sA?aEIg@AoBEaE]k@IuB]q@MeBc@w@YaDuAkAq@w@k@i@c@_@[cB{Am@c@k@WgAWs@Ew@BiATkAf@oBnAqA`Ac@^iBxAgA|@IF}AlAuB~AUPsCzBo@f@QLoBzAsDvC{@ZsBdAcBj@{Cf@oADgCGaBW{CaAa@Uk@U}Ag@mC]UK_@U_@s@Mg@Gy@@cADy@@YBi@N}DFcB?eBGq@Mu@]{@W]]Wo@S}AUcAOk@Kg@Is@K{AU[EsAQ[EUCcAI{AU}Bw@_AQmAAs@Bg@BwCXmBHqBOiCQqA[g@Uu@i@y@{@Y]S[g@w@q@cAeA}Ao@gAgAgBc@s@Wa@Q[s@qA_AaBWe@cBgDkAkC_AeBa@c@?[E[M[QKQ?MDwBwEuF{LQa@i@oAaAeDMc@eAqDiAyEIc@Ke@Ic@[wBE[Mm@C[Ek@I_AEq@Ek@CWUwCKaBG}@Eq@Gs@i@kHGw@KqBIiANm@h@wBNk@bBeINOGKOWGIIMwBwCMQMSqBqCoBsCo@y@a@i@i@s@SYGKwBaDMQ[a@}@oAe@Yk@s@qAcBsBuCSYa@k@oBwCdAc@tDeANEvDaAh@Md@OpAk@hBg@l@WbAy@Zg@Vo@^}A^iCTeCHyAFwC?iBKsEQuBYwB[iB]wAQk@M_@wCuJEMi@}AS}Ag@uBS_AWeAa@uABUE_@EKKMMCQAUHSh@Cn@cAjAaAdAs@`ASh@]l@i@x@Y]MAMHQZ[i@gDkFIMaA{Am@aAcA}AnCqDhDtFuAtB"
```
This string can be decoded using standard libraries to retrieve the full path.

🧰 **When to use**

- You're working with **mobile** or **embedded** applications
- You need to store **multiple routes efficiently**
- You use **map SDKs** that support encoded polylines
---
<a name="evsmartrouting_criterias_tutorial"></a>
## 🎯 criterias – Guide the routing engine with routing preferences
✅ **Use case**

You want to influence how the route is calculated — for example, to **avoid tolls, motorways**, or to **prefer cheaper charging stations**.

💡 **What it does**

The `criterias` field lets you specify a list of **route constraints** or **preferences**. Each criteria modifies how the routing engine computes the path, such as avoiding certain road types or using traffic data.

🔧 **How to enable**

Add the `criterias` array to your `condition` block with one or more of the supported values:
```
"condition": {
  "criterias": ["AVOID_TOLLS", "TRAFFIC"]
}
```
- `AVOID_CROSSING_BORDER`:	Avoid international borders (useful only if all points are in one country)
- `AVOID_FERRIES`:	Avoid using ferries
- `AVOID_MOTORWAYS`:	Avoid motorways (e.g. prefer national roads)
- `AVOID_TOLLS`:	Avoid toll roads
- `AVOID_UNPAVED`:	Avoid unpaved roads
- `TRAFFIC`:	Use real-time traffic data for computation
📦 **Example**
```
{
  "geoserver": "osm",
  "csps": ["ecoMovement"],
  "vehicle": {
    "initBatLvl": 100,
    "key": "eb1e9464-8654-4c01-bedd-b2f95412a60d",
    "payload": 75
  },
  "start": {
    "lon": 2.34755,
    "lat": 48.85708
  },
  "stop": {
    "lon": 4.35497,
    "lat": 50.83857
  },
  "condition": {
    "minBatLvl": 10.0,
    "criterias": ["AVOID_TOLLS"]
  }
}
```
**Response**
```
{
  "logTag": "bbd9a550-c175-4995-8632-5c85a334f4fb",
  "journeys": [
    {
      "summary": {
        "vehicleInfo": {
          "brand": "Kia",
          "name": "e-Niro",
          "variant": "64 kWh",
          "year": "2018"
        },
        "distance": 325504,
        "duration": 18717,
        "batteryLevel": 15.4,
        "consumed": 54.15,
        "chargingTime": 0,
        "departureTime": 1752757750000,
        "arrivalTime": 1752776467000,
        "boundingBox": {
          "minLon": 2.347567485574783,
          "minLat": 48.82658,
          "maxLon": 4.35548,
          "maxLat": 50.83906
        }
      },
      "events": [
        {
          "eventType": "START",
          "coord": {
            "lon": 2.347567485574783,
            "lat": 48.85710875
          },
          "address": "Quai de Gesvres, 75004 Paris, France",
          "departureTime": 1752757750000
        },
        {
          "eventType": "ROUTE",
          "distance": 325504,
          "duration": 18717,
          "consumed": 54.150429306076845
        },
        {
          "eventType": "STOP",
          "coord": {
            "lon": 4.354633642234695,
            "lat": 50.83876125
          },
          "address": "34 Rue de la Régence, 1000 Bruxelles, België"
        }
      ]
    }
  ]
}
```
---
<a name="evsmartrouting_geometry_tutorial"></a>
## 🧭 geometry – Enable raw geometry output for the route
✅ **Use case**

You want to **display the full route line** on a map using raw coordinates (polyline). This is useful for visualizations, GPS guidance, or GIS tools.

💡 **What it does**

When `geometry` is set to `true`, the API returns the entire route geometry as a sequence of longitude/latitude points.<br>
If set to `false`, no route shape is returned — you’ll still receive steps, distances, and metadata, but not the full path.

📌 Default: `false` — a request without the field returns no geometry (measured on prod, 29 September 2026, with the example below: 4,456 characters and no `geometry` without the field, 66,576 characters with `geometry: true`). The specification says *"True by default"*.

🔧 **How to enable**
```
"condition": {
  "geometry": true
}
```
**📦 Example**
```
{
  "geoserver": "osm",
  "csps": ["ecoMovement"],
  "vehicle": {
    "initBatLvl": 100,
    "key": "eb1e9464-8654-4c01-bedd-b2f95412a60d",
    "payload": 75
  },
  "start": {
    "lon": 2.34755,
    "lat": 48.85708
  },
  "stop": {
    "lon": 4.35497,
    "lat": 50.83857
  },
  "condition": {
    "minBatLvl": 10.0,
    "geometry": true
  }
}
```
**Response**

The response includes a geometry field with an array of coordinates forming the polyline of the computed route:
```
{
  "logTag": "7409afaa-c773-4c41-b961-1d7f6dd1c7f0",
  "journeys": [
    {
      "summary": {
        "vehicleInfo": {
          "brand": "Kia",
          "name": "e-Niro",
          "variant": "64 kWh",
          "year": "2018"
        },
        "distance": 312050,
        "duration": 12439,
        "batteryLevel": 10,
        "consumed": 69.31,
        "chargingTime": 608,
        "departureTime": 1752757808000,
        "arrivalTime": 1752771155000,
        "boundingBox": {
          "minLon": 2.347567485574783,
          "minLat": 48.82658,
          "maxLon": 4.35548,
          "maxLat": 50.83906
        }
      },
      "events": [
        {
          "eventType": "START",
          "coord": {
            "lon": 2.347567485574783,
            "lat": 48.85710875
          },
          "address": "Quai de Gesvres, 75004 Paris, France",
          "departureTime": 1752757808000
        },
        {
          "eventType": "ROUTE",
          "distance": 168024,
          "duration": 6529,
          "consumed": 38.53506932004888,
          "geometry": [
            {
              "lon": 2.347567485574783,
              "lat": 48.85710875
            },
            {
              "lon": 2.34764,
              "lat": 48.85709
            },
```
---
<a name="evsmartrouting_ignoreAvailableStatus_tutorial"></a>
## 🔄 ignoreAvailableStatus – Use all charging pools, even those with unknown status
✅ **Use case**

You want to **maximize the number of available charging stations**, even if their real-time availability is unknown or not provided by the CSP.

This is useful in rural areas or networks with incomplete availability data.

💡 **What it does**

When `ignoreAvailableStatus` is set to `true`, the algorithm **does not filter out** charging stations based on their real-time status (e.g., unknown or not connected).
By default (`false`), only charging pools with a known and available status are used.

🔧 **How to enable**

```
"condition": {
  "ignoreAvailableStatus": true
}
```
📦 **Example**
```
{
  "geoserver": "osm",
  "csps": ["ecoMovement"],
  "vehicle": {
    "initBatLvl": 100,
    "key": "eb1e9464-8654-4c01-bedd-b2f95412a60d",
    "payload": 75
  },
  "start": {
    "lon": 2.34755,
    "lat": 48.85708
  },
  "stop": {
    "lon": 4.35497,
    "lat": 50.83857
  },
  "condition": {
    "minBatLvl": 10.0,
    "ignoreAvailableStatus": true
  }
}
```
**Response**
```
{
  "logTag": "cf6bdb7a-6965-468a-a1f1-e54410222ce6",
  "journeys": [
    {
      "summary": {
        "vehicleInfo": {
          "brand": "Kia",
          "name": "e-Niro",
          "variant": "64 kWh",
          "year": "2018"
        },
        "distance": 312050,
        "duration": 12439,
        "batteryLevel": 10,
        "consumed": 69.31,
        "chargingTime": 608,
        "departureTime": 1752757863000,
        "arrivalTime": 1752771210000,
        "boundingBox": {
          "minLon": 2.347567485574783,
          "minLat": 48.82658,
          "maxLon": 4.35548,
          "maxLat": 50.83906
        }
      },
      "events": [
        {
          "eventType": "START",
          "coord": {
            "lon": 2.347567485574783,
            "lat": 48.85710875
          },
          "address": "Quai de Gesvres, 75004 Paris, France",
          "departureTime": 1752757863000
        },
        {
          "eventType": "ROUTE",
          "distance": 168024,
          "duration": 6529,
          "consumed": 38.53506932004888
        },
        {
          "eventType": "CHARGE",
          "coord": {
            "lon": 3.08922127,
            "lat": 50.12222526
          },
          "arrivalTime": 1752764392000,
          "departureTime": 1752765300000,
          "arrivalBatteryLevel": 39.78895418742362,
          "departureBatteryLevel": 58.08151994321714,
          "chargingTime": 608,
          "chargingPower": {
            "currentType": "DC",
            "power": 77,
            "cnnTypeId": 38
          },
          "pool": {
            "providerName": "ecoMovement",
            "providerMode": "LOCAL",
            "id": "c8109b7c-e8ad-11ef-9543-42010aa400b8",
            "sourceProvider": "TotalEnergies",
            "updateDate": 1752462431048,
            "brand": "TotalEnergies",
            "name": "RELAIS DE HAVRINCOURT",
            "countryCode": "FRA",
            "address": {
              "countryCode": "FRA",
              "country": "FRA",
              "city": "Havrincourt",
              "postalCode": "62147",
              "street": "A2"
            },
            "siteCategory": "ON_STREET",
            "accessibility": "PUBLIC",
            "entrance": {
              "lon": 3.08922127,
              "lat": 50.12222526
            },
            "phoneNumber": "+(33)-(9)-77405060",
            "availabilityStatus": "IN_SERVICE",
            "open24x7": true,
            "numberOfChargingPoint": 8,
            "reliabilityScore": 50,
            "predictedOccupancyTimeSlots": [
              {
                "dayOfweek": "MONDAY",
                "start": "00:00",
                "end": "18:59",
                "predictedOccupancy": 5
              },
              {
                "dayOfweek": "MONDAY",
                "start": "19:00",
                "end": "23:59",
                "predictedOccupancy": 4
              },
```
---
<a name="evsmartrouting_maxAfterChargeBatLvl_tutorial"></a>
## 🔋 maxAfterChargeBatLvl – Limit maximum battery level after charging
✅ **Use case**

You want to limit battery charging to a specific level, for example:

- To **preserve battery health** (e.g., avoid frequent 100% charges).
- To **reduce charging times** during short trips.
- To **force partial charges** for better efficiency in multi-stop trips.

💡 **What it does**

This parameter **caps the maximum state of charge (SoC)** the vehicle is allowed to reach after a charging session.

- By default, the EV routing algorithm assumes charging up to 100%.

- If `maxAfterChargeBatLvl` is set to e.g. `80`, the API **won’t charge beyond 80%**, even if technically possible.

- 🔄 The **algorithm still optimizes** how much charge is needed for each segment: this field just defines an **upper limit**, not a target.

> ✅ Useful for real-world EV usage where drivers prefer keeping SoC between 20% and 80%.

🔧 **How to enable**
```
"condition": {
  "maxAfterChargeBatLvl": 80.0
}
```
📦 **Example**
```
{
  "geoserver": "osm",
  "csps": ["ecoMovement"],
  "vehicle": {
    "initBatLvl": 20,
    "key": "eb1e9464-8654-4c01-bedd-b2f95412a60d",
    "payload": 75
  },
  "start": {
    "lon": 2.34755,
    "lat": 48.85708
  },
  "stop": {
    "lon": 4.35497,
    "lat": 50.83857
  },
  "condition": {
    "minBatLvl": 10.0,
    "maxAfterChargeBatLvl": 80.0
  }
}
```
**Response**
```
{
  "logTag": "6912d4ad-e479-45f3-a462-718ec3117fd6",
  "journeys": [
    {
      "summary": {
        "vehicleInfo": {
          "brand": "Kia",
          "name": "e-Niro",
          "variant": "64 kWh",
          "year": "2018"
        },
        "distance": 325342,
        "duration": 12958,
        "batteryLevel": 10,
        "consumed": 65.97,
        "chargingTime": 3095,
        "departureTime": 1790692276000,
        "arrivalTime": 1790708929000,
        "boundingBox": {
          "minLon": 2.3475670788198015,
          "minLat": 48.82658,
          "maxLon": 4.35548,
          "maxLat": 50.83906
        },
        "chargingCost": {
          "currency": "EUR",
          "withoutVat": 30.279942,
          "includeVat": 36.33593
        }
      },
      "events": [
        {
          "eventType": "START",
          "coord": {
            "lon": 2.3475670788198015,
            "lat": 48.857108751160624
          },
          "address": "Quai de Gesvres, 75004 Paris, France",
          "departureTime": 1790692276000
        },
        {
          "eventType": "ROUTE",
          "distance": 37664,
          "duration": 2365,
          "consumed": 6.290317179907371
        },
        {
          "eventType": "CHARGE",
          "coord": {
            "lon": 2.55297002,
            "lat": 49.07188492
          },
          "arrivalTime": 1790694641000,
          "departureTime": 1790696660000,
          "arrivalBatteryLevel": 10.171379406394733,
          "departureBatteryLevel": 61.876,
          "chargingTime": 1719,
          "chargingPower": {
            "currentType": "DC",
            "power": 77,
            "cnnTypeId": 38
          },
          "chargingCost": {
            "currency": "EUR",
            "withoutVat": 16.820156,
            "includeVat": 20.184187,
            "tariffChargePassHashId": "de14cf91a4b464ba931f552fa31951ae"
          },
          "pool": {
            "providerName": "ecoMovement",
            "providerMode": "LOCAL",
            "id": "bf65480e-7f9d-11ed-8c95-42010aa40048",
            "sourceProvider": "Fastned",
            "brand": "Fastned",
            "name": "Fastned Aire de Vémars Est",
            "countryCode": "FRA",
            "address": {
              "countryCode": "FRA",
              "country": "FRA",
              "city": "Vémars",
              "postalCode": "95470",
              "street": "A1"
            },
            "accessibility": "PUBLIC",
            "availabilityStatus": "IN_SERVICE_FREE",
            "numberOfChargingPoint": 16,
            ...
          }
        },
        {
          "eventType": "ROUTE",
          "distance": 138683,
          "duration": 4500,
          "consumed": 31.137040371186032
        },
        {
          "eventType": "CHARGE",
          "coord": {
            "lon": 2.8641582,
            "lat": 50.26148552
          },
          "arrivalTime": 1790701160000,
          "departureTime": 1790702836000,
          "arrivalBatteryLevel": 13.224374420021825,
          "departureBatteryLevel": 54.59933631133972,
          "chargingTime": 1376,
          "chargingPower": {
            "currentType": "DC",
            "power": 77,
            "cnnTypeId": 38
          },
          "chargingCost": {
            "currency": "EUR",
            "withoutVat": 13.4597845,
            "includeVat": 16.151741,
            "tariffChargePassHashId": "de14cf91a4b464ba931f552fa31951ae"
          },
          "pool": {
            "providerName": "ecoMovement",
            "providerMode": "LOCAL",
            "id": "d66f3672-a3c9-11ed-bc56-42010aa40fc6",
            "sourceProvider": "Fastned",
            "brand": "Fastned",
            "name": "Fastned Aire de Wancourt Est",
            "countryCode": "FRA",
            "address": {
              "countryCode": "FRA",
              "country": "FRA",
              "city": "Wancourt",
              "postalCode": "62128",
              "street": "Échangeur d'Arras-Est"
            },
            "accessibility": "PUBLIC",
            "availabilityStatus": "IN_SERVICE_FREE",
            "numberOfChargingPoint": 8,
            ...
          }
        },
        {
          "eventType": "ROUTE",
          "distance": 148995,
          "duration": 6093,
          "consumed": 28.543575239257407
        },
        {
          "eventType": "STOP",
          "coord": {
            "lon": 4.35463449209338,
            "lat": 50.838761144465366
          },
          "address": "34 Rue de la Régence, 1000 Bruxelles, België"
        }
      ]
    }
  ]
}
```
---
<a name="evsmartrouting_minArrivalBatLvl_tutorial"></a>
## 🎯 minArrivalBatLvl – Minimum battery level at arrival
✅ **Use case**
You want to **arrive at your destination with a minimum battery charge**, for safety margin, operational needs, or to avoid full depletion.

💡 **What it does**
This parameter defines the **lowest acceptable battery level** (in %) when reaching the final destination.
The routing engine will ensure charging stops are added if needed so that this level is respected.

🔧 **How to enable**
```
"condition": {
  "minArrivalBatLvl": 15.0
}
```
📦 **Example**
```
{
  "geoserver": "osm",
  "csps": ["ecoMovement"],
  "vehicle": {
    "initBatLvl": 50,
    "key": "eb1e9464-8654-4c01-bedd-b2f95412a60d",
    "payload": 75
  },
  "start": {
    "lon": 2.34755,
    "lat": 48.85708
  },
  "stop": {
    "lon": 4.35497,
    "lat": 50.83857
  },
  "condition": {
    "minArrivalBatLvl": 15.0
  }
}
```
**Response**
```
{
  "logTag": "95202a9f-4315-4a5f-a479-57cab6c89943",
  "journeys": [
    {
      "summary": {
        "vehicleInfo": {
          "brand": "Kia",
          "name": "e-Niro",
          "variant": "64 kWh",
          "year": "2018"
        },
        "distance": 312842,
        "duration": 12773,
        "batteryLevel": 15,
        "consumed": 63.89,
        "chargingTime": 2248,
        "departureTime": 1752049380000,
        "arrivalTime": 1752064701000,
        "boundingBox": {
          "minLon": 2.34551,
          "minLat": 48.82655,
          "maxLon": 4.35678,
          "maxLat": 50.83971
        }
      },
      "events": [
        {
          "eventType": "START",
          "coord": {
            "lon": 2.3475503867395418,
            "lat": 48.8570825
          },
          "address": "Quai de Gesvres, 75004 Paris, France",
          "departureTime": 1752049380000
        },
        {
          "eventType": "ROUTE",
          "distance": 134814,
          "duration": 5728,
          "consumed": 27.862513382958646
        },
        {
          "eventType": "CHARGE",
          "coord": {
            "lon": 2.84053458,
            "lat": 49.88889193
          },
          "arrivalTime": 1752055108000,
          "departureTime": 1752057656000,
          "arrivalBatteryLevel": 6.464822839127116,
          "departureBatteryLevel": 71.285914276977,
          "chargingTime": 2248,
          "chargingPower": {
            "currentType": "DC",
            "power": 77,
            "cnnTypeId": 38
          },
          "pool": {
            "providerName": "ecoMovement",
            "providerMode": "LOCAL",
            "id": "f44083e8-7cac-11ed-ab52-42010aa40fc0",
            "sourceProvider": "TotalEnergies",
            "updateDate": 1751857634862,
            "brand": "TotalEnergies",
            "name": "RELAIS DE COEUR DES HAUTS DE FRANCE",
            "countryCode": "FRA",
            "address": {
              "countryCode": "FRA",
              "country": "FRA",
              "city": "Assevillers",
              "postalCode": "80200",
              "street": "Autoroute du Nord"
            },
            "siteCategory": "ON_STREET",
            "accessibility": "PUBLIC",
            "entrance": {
              "lon": 2.84053458,
              "lat": 49.88889193
            },
            "phoneNumber": "+(33)-(9)-77405060",
            "availabilityStatus": "IN_SERVICE",
            "open24x7": true,
            "numberOfChargingPoint": 20,
            "reliabilityScore": 50,
            "predictedOccupancyTimeSlots": [
              {
                "dayOfweek": "MONDAY",
                "start": "00:00",
                "end": "23:59",
                "predictedOccupancy": 5
              },
              {
                "dayOfweek": "TUESDAY",
                "start": "00:00",
                "end": "23:59",
                "predictedOccupancy": 5
              },
```
---
<a name="evsmartrouting_minBatLvl_tutorial"></a>
## 🔋 minBatLvl – Minimum battery level during the journey
✅ **Use case**

You want to prevent the vehicle battery from falling below a critical level at any point in the journey.
This is useful for battery health, safety, or to avoid getting stranded in zones with few chargers.

💡 **What it does**

This parameter sets a minimum threshold (in %) of battery level that must be maintained at all times.
The routing algorithm will add charging stops if needed to stay above this threshold throughout the trip.

🔧 **How to enable**
```
"condition": {
  "minBatLvl": 10.0
}
```
📦 **Example**
```
{
  "geoserver": "osm",
  "csps": ["ecoMovement"],
  "vehicle": {
    "initBatLvl": 80,
    "key": "eb1e9464-8654-4c01-bedd-b2f95412a60d",
    "payload": 75
  },
  "start": {
    "lon": 2.34755,
    "lat": 48.85708
  },
  "stop": {
    "lon": 4.35497,
    "lat": 50.83857
  },
  "condition": {
    "minBatLvl": 10.0
  }
}
```
**Response**
```
{
  "logTag": "9f8b51c4-8385-45db-8d49-7b29f36dd5f8",
  "journeys": [
    {
      "summary": {
        "vehicleInfo": {
          "brand": "Kia",
          "name": "e-Niro",
          "variant": "64 kWh",
          "year": "2018"
        },
        "distance": 312814,
        "duration": 12725,
        "batteryLevel": 10,
        "consumed": 63.93,
        "chargingTime": 994,
        "departureTime": 1752049664000,
        "arrivalTime": 1752063683000,
        "boundingBox": {
          "minLon": 2.34551,
          "minLat": 48.82655,
          "maxLon": 4.35678,
          "maxLat": 50.83971
        }
      },
      "events": [
        {
          "eventType": "START",
          "coord": {
            "lon": 2.3475503867395418,
            "lat": 48.8570825
          },
          "address": "Quai de Gesvres, 75004 Paris, France",
          "departureTime": 1752049664000
        },
        {
          "eventType": "ROUTE",
          "distance": 168822,
          "duration": 6762,
          "consumed": 35.57480719832625
        },
        {
          "eventType": "CHARGE",
          "coord": {
            "lon": 3.0901592,
            "lat": 50.1228649
          },
          "arrivalTime": 1752056426000,
          "departureTime": 1752057720000,
          "arrivalBatteryLevel": 24.414363752615238,
          "departureBatteryLevel": 54.30753061472008,
          "chargingTime": 994,
          "chargingPower": {
            "currentType": "DC",
            "power": 77,
            "cnnTypeId": 38
          },
          "pool": {
            "providerName": "ecoMovement",
            "providerMode": "LOCAL",
            "id": "c8109b7c-e8ad-11ef-9543-42010aa400b8",
            "sourceProvider": "TotalEnergies",
            "updateDate": 1751857634862,
            "brand": "TotalEnergies",
            "name": "RELAIS DE HAVRINCOURT",
            "countryCode": "FRA",
            "address": {
              "countryCode": "FRA",
              "country": "FRA",
              "city": "Havrincourt",
              "postalCode": "62147",
              "street": "A2 - PARIS BRUXELLES"
            },
            "siteCategory": "ON_STREET",
            "accessibility": "PUBLIC",
            "entrance": {
              "lon": 3.0901592,
              "lat": 50.1228649
            },
            "phoneNumber": "+(33)-(9)-77405060",
            "availabilityStatus": "IN_SERVICE",
            "open24x7": true,
            "numberOfChargingPoint": 8,
            "reliabilityScore": 25,
            "predictedOccupancyTimeSlots": [
              {
                "dayOfweek": "MONDAY",
                "start": "00:00",
                "end": "23:59",
                "predictedOccupancy": 4
              },
              {
                "dayOfweek": "TUESDAY",
                "start": "00:00",
                "end": "23:59",
                "predictedOccupancy": 4
              },
```
---
<a name="evsmartrouting_optimMode_tutorial"></a>
## 🧠 optimMode – Optimization mode
✅ **Use case**

You want to **customize the route objective**: minimize energy consumption, travel time, or distance.
This allows adapting the route to different priorities, such as **efficiency** or **speed**.

💡 **What it does**

Controls the routing algorithm’s **optimization strategy**:

- `ECO_ENERGY`: favors routes that consume the **least energy**, even if longer.
- `FASTEST`: favors routes that take the **least time** (default).
- `SHORTEST`: favors shortest **distance**, ignoring time or consumption.

🔧 **How to enable**
```
"condition": {
  "optimMode": "ECO_ENERGY"
}
```
📦 **Example**
```
{
  "geoserver": "osm",
  "csps": ["ecoMovement"],
  "vehicle": {
    "initBatLvl": 100,
    "key": "eb1e9464-8654-4c01-bedd-b2f95412a60d",
    "payload": 75
  },
  "start": {
    "lon": 2.34755,
    "lat": 48.85708
  },
  "stop": {
    "lon": 4.35497,
    "lat": 50.83857
  },
  "condition": {
    "minBatLvl": 10.0,
    "optimMode": "ECO_ENERGY"
  }
}
```
**Response**
```
{
  "logTag": "c186bb29-fba5-424a-9602-a9d47b074caf",
  "journeys": [
    {
      "summary": {
        "vehicleInfo": {
          "brand": "Kia",
          "name": "e-Niro",
          "variant": "64 kWh",
          "year": "2018"
        },
        "distance": 312050,
        "duration": 12907,
        "batteryLevel": 10,
        "consumed": 65,
        "chargingTime": 384,
        "departureTime": 1752758163000,
        "arrivalTime": 1752771754000,
        "boundingBox": {
          "minLon": 2.347567485574783,
          "minLat": 48.82658,
          "maxLon": 4.35548,
          "maxLat": 50.83906
        }
      },
      "events": [
        {
          "eventType": "START",
          "coord": {
            "lon": 2.347567485574783,
            "lat": 48.85710875
          },
          "address": "Quai de Gesvres, 75004 Paris, France",
          "departureTime": 1752758163000
        },
        {
          "eventType": "ROUTE",
          "distance": 168024,
          "duration": 6880,
          "consumed": 35.5847162495461
        },
        {
          "eventType": "CHARGE",
          "coord": {
            "lon": 3.08922127,
            "lat": 50.12222526
          },
          "arrivalTime": 1752765043000,
          "departureTime": 1752765727000,
          "arrivalBatteryLevel": 44.39888086008422,
          "departureBatteryLevel": 55.953619294793775,
          "chargingTime": 384,
          "chargingPower": {
            "currentType": "DC",
            "power": 77,
            "cnnTypeId": 38
          },
          "pool": {
            "providerName": "ecoMovement",
            "providerMode": "LOCAL",
            "id": "c8109b7c-e8ad-11ef-9543-42010aa400b8",
            "sourceProvider": "TotalEnergies",
            "updateDate": 1752462431048,
            "brand": "TotalEnergies",
            "name": "RELAIS DE HAVRINCOURT",
            "countryCode": "FRA",
            "address": {
              "countryCode": "FRA",
              "country": "FRA",
              "city": "Havrincourt",
              "postalCode": "62147",
              "street": "A2"
            },
            "siteCategory": "ON_STREET",
            "accessibility": "PUBLIC",
            "entrance": {
              "lon": 3.08922127,
              "lat": 50.12222526
            },
            "phoneNumber": "+(33)-(9)-77405060",
            "availabilityStatus": "IN_SERVICE",
            "open24x7": true,
            "numberOfChargingPoint": 8,
            "reliabilityScore": 50,
            "predictedOccupancyTimeSlots": [
              {
                "dayOfweek": "MONDAY",
                "start": "00:00",
                "end": "18:59",
                "predictedOccupancy": 5
              },
              {
                "dayOfweek": "MONDAY",
                "start": "19:00",
                "end": "23:59",
                "predictedOccupancy": 4
              },
```
---
<a name="evsmartrouting_restrictedEvse_tutorial"></a>
## 🔒 restrictedEvse – Accept restricted charging stations
✅ **Use case**

You want to **include restricted charging stations** in your EV route.
Useful for fleet vehicles, partnerships, or users with access to specific networks.

💡 **What it does**

If set to `true`, the algorithm will **include charging stations** marked as **restricted access** (e.g., private stations, fleet-only, membership-required).
If `false` (default), only **publicly available** stations are considered.

🔧 **How to enable**
```
"condition": {
  "restrictedEvse": true
}
```
📦 **Example**
```
{
  "geoserver": "osm",
  "csps": ["ecoMovement"],
  "vehicle": {
    "initBatLvl": 100,
    "key": "eb1e9464-8654-4c01-bedd-b2f95412a60d",
    "payload": 75
  },
  "start": {
    "lon": 2.34755,
    "lat": 48.85708
  },
  "stop": {
    "lon": 4.35497,
    "lat": 50.83857
  },
  "condition": {
    "minBatLvl": 10.0,
    "restrictedEvse": true
  }
}
```
**Response**
```
{
  "logTag": "d60f45fe-c8fc-4089-bbec-4180e66c82b9",
  "journeys": [
    {
      "summary": {
        "vehicleInfo": {
          "brand": "Kia",
          "name": "e-Niro",
          "variant": "64 kWh",
          "year": "2018"
        },
        "distance": 312050,
        "duration": 12439,
        "batteryLevel": 10,
        "consumed": 69.31,
        "chargingTime": 608,
        "departureTime": 1752758208000,
        "arrivalTime": 1752771555000,
        "boundingBox": {
          "minLon": 2.347567485574783,
          "minLat": 48.82658,
          "maxLon": 4.35548,
          "maxLat": 50.83906
        }
      },
      "events": [
        {
          "eventType": "START",
          "coord": {
            "lon": 2.347567485574783,
            "lat": 48.85710875
          },
          "address": "Quai de Gesvres, 75004 Paris, France",
          "departureTime": 1752758208000
        },
        {
          "eventType": "ROUTE",
          "distance": 168024,
          "duration": 6529,
          "consumed": 38.53506932004888
        },
        {
          "eventType": "CHARGE",
          "coord": {
            "lon": 3.08922127,
            "lat": 50.12222526
          },
          "arrivalTime": 1752764737000,
          "departureTime": 1752765645000,
          "arrivalBatteryLevel": 39.78895418742362,
          "departureBatteryLevel": 58.08151994321714,
          "chargingTime": 608,
          "chargingPower": {
            "currentType": "DC",
            "power": 77,
            "cnnTypeId": 38
          },
          "pool": {
            "providerName": "ecoMovement",
            "providerMode": "LOCAL",
            "id": "c8109b7c-e8ad-11ef-9543-42010aa400b8",
            "sourceProvider": "TotalEnergies",
            "updateDate": 1752462431048,
            "brand": "TotalEnergies",
            "name": "RELAIS DE HAVRINCOURT",
            "countryCode": "FRA",
            "address": {
              "countryCode": "FRA",
              "country": "FRA",
              "city": "Havrincourt",
              "postalCode": "62147",
              "street": "A2"
            },
            "siteCategory": "ON_STREET",
            "accessibility": "PUBLIC",
            "entrance": {
              "lon": 3.08922127,
              "lat": 50.12222526
            },
            "phoneNumber": "+(33)-(9)-77405060",
            "availabilityStatus": "IN_SERVICE",
            "open24x7": true,
            "numberOfChargingPoint": 8,
            "reliabilityScore": 50,
            "predictedOccupancyTimeSlots": [
              {
                "dayOfweek": "MONDAY",
                "start": "00:00",
                "end": "18:59",
                "predictedOccupancy": 5
              },
              {
                "dayOfweek": "MONDAY",
                "start": "19:00",
                "end": "23:59",
                "predictedOccupancy": 4
              },
```
---
<a name="evsmartrouting_routeDetails_tutorial"></a>
## 🧭 routeDetails – Enable detailed route information
✅ **Use case**

You want to **analyze the route in detail**, including **consumption events**, **distance per segment**, or **SoC variations**.
Ideal for energy audits, visual dashboards, or post-processing.

💡 **What it does**

If set to `true`, the API includes **step-by-step details** of the computed route.
These details may include:

- Distance and time per segment
- Consumption per segment
- State of charge (SoC) evolution
- Temperature impact (if enabled)
- Speed, elevation, etc.

Each `ROUTE` event then carries `routeConsumptions[]`, one point every `routeDetailsFreq` seconds (60 by default), each with `lon`, `lat`, `alt`, `time`, `distFromStart`, `speed`, `cumulativeConsumption`, `consumption` and `batteryLevel`. No extra key is needed.

> ⚠️ Measured on prod (29 September 2026): turning `routeDetails` on can change the trip's battery levels and charging cost, depending on `routeDetailsFreq` — on the same 325,881 m and 66.35 kWh. Without `routeDetails`, the example arrives at 10 %, with a charge arriving at 10.42 % for 5.42 EUR (without VAT); with `routeDetailsFreq: 120`, at 10.1 % and 5.45 EUR; with `routeDetailsFreq: 3600`, at 24.1 %, with a charge arriving at 4.12 % — below `minBatLvl` — for 7.92 EUR. Read the levels and the cost from a request without `routeDetails`.

🔧 **How to enable**
```
"condition": {
  "routeDetails": true
}
```
📦 **Example**
```
{
  "geoserver": "osm",
  "csps": ["ecoMovement"],
  "vehicle": {
    "initBatLvl": 100,
    "key": "eb1e9464-8654-4c01-bedd-b2f95412a60d",
    "payload": 75
  },
  "start": {
    "lon": 2.34755,
    "lat": 48.85708
  },
  "stop": {
    "lon": 4.35497,
    "lat": 50.83857
  },
  "condition": {
    "minBatLvl": 10.0,
    "routeDetails": true
  }
}
```
**Response**
```
{
  "logTag": "836cf8d5-9a7e-4d91-99e1-be55577078a7",
  "journeys": [
    {
      "summary": {
        "vehicleInfo": {
          "brand": "Kia",
          "name": "e-Niro",
          "variant": "64 kWh",
          "year": "2018"
        },
        "distance": 325881,
        "duration": 12744,
        "batteryLevel": 10,
        "consumed": 66.35,
        "chargingTime": 454,
        "departureTime": 1790692324000,
        "arrivalTime": 1790705822000,
        "boundingBox": {
          "minLon": 2.3475670788198015,
          "minLat": 48.82658,
          "maxLon": 4.35548,
          "maxLat": 50.83906
        },
        "chargingCost": {
          "currency": "EUR",
          "withoutVat": 5.4207706,
          "includeVat": 6.5591326
        }
      },
      "events": [
        {
          "eventType": "START",
          "coord": {
            "lon": 2.3475670788198015,
            "lat": 48.857108751160624
          },
          "address": "Quai de Gesvres, 75004 Paris, France",
          "departureTime": 1790692324000
        },
        {
          "eventType": "ROUTE",
          "distance": 276566,
          "duration": 10138,
          "consumed": 57.327046164778025,
          "routeConsumptions": [
            {
              "lon": 2.3475670788198015,
              "lat": 48.857108751160624,
              "alt": 43.781492667805864,
              "time": 0,
              "distFromStart": 0,
              "speed": 7.760658070398802,
              "cumulativeConsumption": 0,
              "consumption": 0,
              "batteryLevel": 100
            },
            {
              "lon": 2.3515140999490054,
              "lat": 48.85576790922998,
              "alt": 30.44263131055584,
              "time": 60,
              "distFromStart": 325.44239910002307,
              "speed": 8.39106276978498,
              "cumulativeConsumption": 0.08777182501355431,
              "consumption": 0.08777182501355431,
              "batteryLevel": 99.86285652341633
            },
            {
              "lon": 2.35494,
              "lat": 48.85438,
              "alt": 37,
              "time": 120,
              "distFromStart": 620.8643125231465,
              "speed": 1.2523033189455646,
              "cumulativeConsumption": 0.17775575324519866,
              "consumption": 0.08998392823164436,
              "batteryLevel": 99.72225663555437
            },
            ...
          ]
        },
        ...
      ]
    }
  ]
}
```
---
<a name="evsmartrouting_routeDetailsFreq_tutorial"></a>
## ⏱️ routeDetailsFreq – Set the frequency of route event data
✅ **Use case**

You want to control how **frequently** the system logs **route event details** (like speed, consumption, or acceleration) throughout the trip.
Ideal for **performance tuning, data volume optimization**, or aligning data points with **real-time monitoring systems**.

💡 **What it does**

Defines the **interval in seconds** at which route event data is sampled and returned in the `routeDetails` response.

- A **lower value** gives **finer granularity** (more data points, more precision).
- A **higher value** gives **coarser granularity** (fewer points, lighter response).

📌 Default: `60` seconds, which is also the minimum. A lower value is read as `60` without any error — measured on prod (29 September 2026): `30` returns points at 0, 60, 120 s…; `120` at 0, 120, 240 s…

> ⚠️ The sampling frequency can change the trip's battery levels and charging cost — see the note under `routeDetails`.

🔧 **How to enable**
```
"condition": {
  "routeDetails": true,
  "routeDetailsFreq": 120
}
```
📦 **Example**
```
{
  "geoserver": "osm",
  "csps": ["ecoMovement"],
  "vehicle": {
    "initBatLvl": 100,
    "key": "eb1e9464-8654-4c01-bedd-b2f95412a60d",
    "payload": 75
  },
  "start": {
    "lon": 2.34755,
    "lat": 48.85708
  },
  "stop": {
    "lon": 4.35497,
    "lat": 50.83857
  },
  "condition": {
    "minBatLvl": 10.0,
    "routeDetails": true,
    "routeDetailsFreq": 120
  }
}
```
**Response**
```
{
  "logTag": "3f8a43d7-7b04-49e9-afa3-1cf113dc8df3",
  "journeys": [
    {
      "summary": {
        "vehicleInfo": {
          "brand": "Kia",
          "name": "e-Niro",
          "variant": "64 kWh",
          "year": "2018"
        },
        "distance": 325881,
        "duration": 12744,
        "batteryLevel": 10.1,
        "consumed": 66.35,
        "chargingTime": 454,
        "departureTime": 1790692326000,
        "arrivalTime": 1790705824000,
        "boundingBox": {
          "minLon": 2.3475670788198015,
          "minLat": 48.82658,
          "maxLon": 4.35548,
          "maxLat": 50.83906
        },
        "chargingCost": {
          "currency": "EUR",
          "withoutVat": 5.45424,
          "includeVat": 6.5996304
        }
      },
      "events": [
        {
          "eventType": "START",
          "coord": {
            "lon": 2.3475670788198015,
            "lat": 48.857108751160624
          },
          "address": "Quai de Gesvres, 75004 Paris, France",
          "departureTime": 1790692326000
        },
        {
          "eventType": "ROUTE",
          "distance": 276566,
          "duration": 10138,
          "consumed": 57.327046164778025,
          "routeConsumptions": [
            {
              "lon": 2.3475670788198015,
              "lat": 48.857108751160624,
              "alt": 43.781492667805864,
              "time": 0,
              "distFromStart": 0,
              "speed": 7.760658070398802,
              "cumulativeConsumption": 0,
              "consumption": 0,
              "batteryLevel": 100
            },
            {
              "lon": 2.35494,
              "lat": 48.85438,
              "alt": 37,
              "time": 120,
              "distFromStart": 620.8643125231465,
              "speed": 1.2523033189455646,
              "cumulativeConsumption": 0.17775575324519866,
              "consumption": 0.17775575324519866,
              "batteryLevel": 99.72225663555437
            },
            {
              "lon": 2.36143,
              "lat": 48.85078523698524,
              "alt": 33,
              "time": 240,
              "distFromStart": 1285.966562371676,
              "speed": 2.028112361078229,
              "cumulativeConsumption": 0.28509560699191766,
              "consumption": 0.10733985374671898,
              "batteryLevel": 99.55453811407513
            },
            ...
          ]
        },
        ...
      ]
    }
  ]
}
```
---
<a name="evsmartrouting_routesheet_tutorial"></a>
## 📄 routesheet – Enable the route sheet generation
✅ **Use case**

You need a **structured and human-readable summary** of the route for reporting, logistics, delivery planning, or offline usage.

💡 **What it does**

When enabled, the response includes a **route sheet** containing the full list of instructions, stops, distances, durations, and other trip details in a **summarized textual format**.

- Often used in **printed documents**, **driver instructions**, or **dispatch systems**.
- Can be combined with `routesheetMode`, `routesheetLanguage`, and `routesheetVerboseLevel` to customize output.

The route sheet is the `routesheet[]` array of each `ROUTE` event: in the default `TEXT` mode, one `{ "textDist", "text" }` item per instruction.

🔧 **How to enable**
```
"condition": {
  "routesheet": true
}
```
📦 **Example**
```
{
  "geoserver": "osm",
  "csps": ["ecoMovement"],
  "vehicle": {
    "initBatLvl": 100,
    "key": "eb1e9464-8654-4c01-bedd-b2f95412a60d",
    "payload": 75
  },
  "start": {
    "lon": 2.34755,
    "lat": 48.85708
  },
  "stop": {
    "lon": 4.35497,
    "lat": 50.83857
  },
  "condition": {
    "minBatLvl": 10.0,
    "routesheet": true,
    "routesheetLanguage": "en",
    "routesheetMode": "TEXT",
    "routesheetVerboseLevel": "MEDIUM"
  }
}
```
**Response**
```
{
  "logTag": "f14954ca-815d-4c9d-9676-8710218f84fa",
  "journeys": [
    {
      "summary": {
        "vehicleInfo": {
          "brand": "Kia",
          "name": "e-Niro",
          "variant": "64 kWh",
          "year": "2018"
        },
        "distance": 325881,
        "duration": 12744,
        "batteryLevel": 10,
        "consumed": 66.35,
        "chargingTime": 454,
        "departureTime": 1790692328000,
        "arrivalTime": 1790705826000,
        "boundingBox": {
          "minLon": 2.3475670788198015,
          "minLat": 48.82658,
          "maxLon": 4.35548,
          "maxLat": 50.83906
        },
        "chargingCost": {
          "currency": "EUR",
          "withoutVat": 5.4207706,
          "includeVat": 6.5591326
        }
      },
      "events": [
        {
          "eventType": "START",
          "coord": {
            "lon": 2.3475670788198015,
            "lat": 48.857108751160624
          },
          "address": "Quai de Gesvres, 75004 Paris, France",
          "departureTime": 1790692328000
        },
        {
          "eventType": "ROUTE",
          "distance": 276566,
          "duration": 10138,
          "consumed": 57.327046164778025,
          "routesheet": [
            {
              "textDist": "At 258 meters",
              "text": "From Quai de Gesvres straight on Quai de l'Hôtel de Ville"
            },
            {
              "textDist": "At 1 kilometer",
              "text": "From Quai des Célestins straight on Quai Henri IV"
            },
            {
              "textDist": "At 854 meters",
              "text": "From Voie Mazas straight on Quai de la Rapée"
            },
            ...
          ]
        },
        ...
      ]
    }
  ]
}
```
---
<a name="evsmartrouting_routesheetLanguage_tutorial"></a>
## 🌍 routesheetLanguage – Define the language of the route sheet
✅ **Use case**

You want the **route-sheet instructions** to be generated in a specific language — for example, English for international drivers or French for local deliveries.

💡 **What it does**

When `routesheet` is enabled, this option **controls the language** used for rendering the route instructions.
This is particularly useful when generating instructions for drivers who speak different languages.

🔧 **How to enable**
```
"condition": {
  "routesheet": true,
  "routesheetLanguage": "fr"
}
```
📦 **Example**
```
{
  "geoserver": "osm",
  "csps": ["ecoMovement"],
  "vehicle": {
    "initBatLvl": 100,
    "key": "eb1e9464-8654-4c01-bedd-b2f95412a60d",
    "payload": 75
  },
  "start": {
    "lon": 2.34755,
    "lat": 48.85708
  },
  "stop": {
    "lon": 4.35497,
    "lat": 50.83857
  },
  "condition": {
    "routesheet": true,
    "routesheetLanguage": "fr",
    "routesheetMode": "TEXT"
  }
}
```
**Response**
```
{
  "logTag": "65b45acb-1899-4dc1-a72a-197d73c98b47",
  "journeys": [
    {
      "summary": {
        "vehicleInfo": {
          "brand": "Kia",
          "name": "e-Niro",
          "variant": "64 kWh",
          "year": "2018"
        },
        "distance": 325364,
        "duration": 12705,
        "batteryLevel": 0,
        "consumed": 66.33,
        "chargingTime": 121,
        "departureTime": 1790692330000,
        "arrivalTime": 1790705456000,
        "boundingBox": {
          "minLon": 2.3475670788198015,
          "minLat": 48.82658,
          "maxLon": 4.35548,
          "maxLat": 50.83906
        },
        "chargingCost": {
          "currency": "EUR",
          "withoutVat": 1.9587,
          "includeVat": 2.3700268
        }
      },
      "events": [
        {
          "eventType": "START",
          "coord": {
            "lon": 2.3475670788198015,
            "lat": 48.857108751160624
          },
          "address": "Quai de Gesvres, 75004 Paris, France",
          "departureTime": 1790692330000
        },
        {
          "eventType": "ROUTE",
          "distance": 306432,
          "duration": 11186,
          "consumed": 63.316992820515885,
          "routesheet": [
            {
              "textDist": "À 1,3 kilomètre",
              "text": "Depuis Quai des Célestins continuer tout droit sur Quai Henri IV"
            },
            {
              "textDist": "À 854 mètres",
              "text": "Depuis Voie Mazas continuer tout droit sur Quai de la Rapée"
            },
            {
              "textDist": "À 1,8 kilomètre",
              "text": "Depuis Quai de Bercy continuer tout droit sur Quai de Bercy"
            },
            ...
          ]
        },
        ...
      ]
    }
  ]
}
```
---
<a name="evsmartrouting_routesheetMode_tutorial"></a>
## 🧾 routesheetMode – Define the output mode of the route-sheet
✅ **Use case**

You want to customize the format of the route-sheet in the API response: just simple instructions, detailed step-by-step metadata, or both.
This is helpful for frontend display (text), backend processing (details), or full route reports (text + details).

💡 **What it does**

Controls the content and structure of the route-sheet output.
Combined with `"routesheet": true`, this field defines how the journey instructions are rendered.

🔧 **Available values**

- `TEXT` (default): Returns only human-readable route instructions (`textDist`, `text`).
- `DETAILS`: Returns only structured routing steps, useful for processing (`type`, `geoElementType`, `length`, `duration`, `fromName`, `manoeuvre`, `coordinate`, `roundAboutExitNumber`, `toName`, `toOn`).
- `TEXT_DETAILS`: Returns both formats – ideal if you want a complete view.

🔧 **How to enable**
```
"condition": {
  "routesheet": true,
  "routesheetMode": "TEXT_DETAILS"
}
```
📦 **Example**
```
{
  "geoserver": "osm",
  "csps": ["ecoMovement"],
  "vehicle": {
    "initBatLvl": 100,
    "key": "eb1e9464-8654-4c01-bedd-b2f95412a60d",
    "payload": 75
  },
  "start": {
    "lon": 2.34755,
    "lat": 48.85708
  },
  "stop": {
    "lon": 4.35497,
    "lat": 50.83857
  },
  "condition": {
    "routesheet": true,
    "routesheetMode": "TEXT_DETAILS",
    "routesheetLanguage": "en"
  }
}
```
**Response**
```
{
  "logTag": "14798cd6-6392-454a-9e11-544a7a8b6226",
  "journeys": [
    {
      "summary": {
        "vehicleInfo": {
          "brand": "Kia",
          "name": "e-Niro",
          "variant": "64 kWh",
          "year": "2018"
        },
        "distance": 325364,
        "duration": 12705,
        "batteryLevel": 0,
        "consumed": 66.33,
        "chargingTime": 121,
        "departureTime": 1790692332000,
        "arrivalTime": 1790705458000,
        "boundingBox": {
          "minLon": 2.3475670788198015,
          "minLat": 48.82658,
          "maxLon": 4.35548,
          "maxLat": 50.83906
        },
        "chargingCost": {
          "currency": "EUR",
          "withoutVat": 1.9587,
          "includeVat": 2.3700268
        }
      },
      "events": [
        {
          "eventType": "START",
          "coord": {
            "lon": 2.3475670788198015,
            "lat": 48.857108751160624
          },
          "address": "Quai de Gesvres, 75004 Paris, France",
          "departureTime": 1790692332000
        },
        {
          "eventType": "ROUTE",
          "distance": 306432,
          "duration": 11186,
          "consumed": 63.316992820515885,
          "routesheet": [
            {
              "type": "FOLLOW",
              "geoElementType": "ROAD",
              "length": 1283,
              "duration": 231,
              "fromName": "Quai des Célestins",
              "manoeuvre": "STRAIGHT",
              "coordinate": {
                "lon": 2.36143,
                "lat": 48.85083
              },
              "roundAboutExitNumber": 0,
              "toName": "Quai Henri IV",
              "toOn": "Quai Henri IV",
              "textDist": "At 1.3 kilometer",
              "text": "From Quai des Célestins straight on Quai Henri IV"
            },
            {
              "type": "FOLLOW",
              "geoElementType": "ROAD",
              "length": 854,
              "duration": 134,
              "fromName": "Voie Mazas",
              "manoeuvre": "STRAIGHT",
              "coordinate": {
                "lon": 2.36777,
                "lat": 48.84471
              },
              "roundAboutExitNumber": 0,
              "toName": "Quai de la Rapée",
              "toOn": "Quai de la Rapée",
              "textDist": "At 854 meters",
              "text": "From Voie Mazas straight on Quai de la Rapée"
            },
            {
              "type": "FOLLOW",
              "geoElementType": "ROAD",
              "length": 1784,
              "duration": 170,
              "fromName": "Quai de Bercy",
              "manoeuvre": "STRAIGHT",
              "coordinate": {
                "lon": 2.38348,
                "lat": 48.83258
              },
              "roundAboutExitNumber": 0,
              "toName": "Quai de Bercy",
              "toOn": "Quai de Bercy",
              "textDist": "At 1.8 kilometer",
              "text": "From Quai de Bercy straight on Quai de Bercy"
            },
            ...
          ]
        },
        ...
      ]
    }
  ]
}
```
---
<a name="evsmartrouting_routesheetVerboseLevel_tutorial"></a>
## 🗣️ routesheetVerboseLevel – Control the amount of detail in the route-sheet instructions
✅ **Use case**

You want to **adjust the level of detail** in the guidance returned by the `routesheet`. This is useful to match different user needs: only the main instructions for experienced drivers, or every one of them for novices.

💡 **What it does**

Determines **how many instructions** the route-sheet returns. The wording of an instruction is the same at every level — it names the roads at `LOW` as at `MEDIUM` (e.g. "From Quai des Célestins straight on Quai Henri IV"); a higher level adds instructions.

🔧 **Available values**

- `LOW` – The fewest instructions. A request without `routesheetVerboseLevel` answers like `LOW`.

- `MEDIUM` – More instructions.

- `HIGH` – The most instructions.

Measured on prod (29 September 2026), the example below in `TEXT_DETAILS`: 55 instructions at `LOW`, 70 at `MEDIUM`, 188 at `HIGH`.

>⚠️ **Note**: Has effect only if `routesheet` is enabled.

🔧 **How to enable**
```
"condition": {
  "routesheet": true,
  "routesheetVerboseLevel": "HIGH"
}
```
📦 **Example**
```
{
  "geoserver": "osm",
  "csps": ["ecoMovement"],
  "vehicle": {
    "initBatLvl": 100,
    "key": "eb1e9464-8654-4c01-bedd-b2f95412a60d",
    "payload": 75
  },
  "start": {
    "lon": 2.34755,
    "lat": 48.85708
  },
  "stop": {
    "lon": 4.35497,
    "lat": 50.83857
  },
  "condition": {
    "minBatLvl": 10.0,
    "routesheet": true,
    "routesheetMode": "TEXT_DETAILS",
    "routesheetVerboseLevel": "HIGH",
    "routesheetLanguage": "en"
  }
}
```
**Response**
```
{
  "logTag": "409dc474-b2a3-4982-9685-4d36c9353d04",
  "journeys": [
    {
      "summary": {
        "vehicleInfo": {
          "brand": "Kia",
          "name": "e-Niro",
          "variant": "64 kWh",
          "year": "2018"
        },
        "distance": 325881,
        "duration": 12744,
        "batteryLevel": 10,
        "consumed": 66.35,
        "chargingTime": 454,
        "departureTime": 1790692334000,
        "arrivalTime": 1790705832000,
        "boundingBox": {
          "minLon": 2.3475670788198015,
          "minLat": 48.82658,
          "maxLon": 4.35548,
          "maxLat": 50.83906
        },
        "chargingCost": {
          "currency": "EUR",
          "withoutVat": 5.4207706,
          "includeVat": 6.5591326
        }
      },
      "events": [
        {
          "eventType": "START",
          "coord": {
            "lon": 2.3475670788198015,
            "lat": 48.857108751160624
          },
          "address": "Quai de Gesvres, 75004 Paris, France",
          "departureTime": 1790692334000
        },
        {
          "eventType": "ROUTE",
          "distance": 276566,
          "duration": 10138,
          "consumed": 57.327046164778025,
          "routesheet": [
            {
              "type": "FOLLOW",
              "geoElementType": "ROAD",
              "length": 111,
              "duration": 20,
              "fromName": "Quai de Gesvres",
              "manoeuvre": "STRAIGHT",
              "coordinate": {
                "lon": 2.34896,
                "lat": 48.85672
              },
              "roundAboutExitNumber": 0,
              "toName": "Quai de Gesvres",
              "toOn": "Quai de Gesvres",
              "textDist": "At 111 meters",
              "text": "From Quai de Gesvres straight on Quai de Gesvres"
            },
            {
              "type": "FOLLOW",
              "geoElementType": "ROAD",
              "length": 45,
              "duration": 11,
              "fromName": "Quai de Gesvres",
              "manoeuvre": "STRAIGHT",
              "coordinate": {
                "lon": 2.34949,
                "lat": 48.85652
              },
              "roundAboutExitNumber": 0,
              "toName": "Quai de Gesvres",
              "toOn": "Quai de Gesvres",
              "textDist": "At 45 meters",
              "text": "From Quai de Gesvres straight on Quai de Gesvres"
            },
            {
              "type": "FOLLOW",
              "geoElementType": "ROAD",
              "length": 102,
              "duration": 14,
              "fromName": "Quai de Gesvres",
              "manoeuvre": "STRAIGHT",
              "coordinate": {
                "lon": 2.3507,
                "lat": 48.85607
              },
              "roundAboutExitNumber": 0,
              "toName": "Quai de l'Hôtel de Ville",
              "toOn": "Quai de l'Hôtel de Ville",
              "textDist": "At 102 meters",
              "text": "From Quai de Gesvres straight on Quai de l'Hôtel de Ville"
            },
            ...
          ]
        },
        ...
      ]
    }
  ]
}
```
---
<a name="evsmartrouting_startUTurnThreshold_tutorial"></a>
## ↩️ startUTurnThreshold – Limit the detour made to respect the departure direction
✅ **Use case**

Your vehicle is parked on a two-way road, facing a known direction, and you want the route to leave in that direction — unless turning around saves a lot.

💡 **What it does**

At the start point, and at any via point where `useStartAngle` (with a `heading`) or `avoidUTurn` is set, respecting the direction can cost a detour. `startUTurnThreshold` is the extra cost **above** which the engine gives up the requested direction and turns around anyway: below the threshold the direction is kept, above it the U-turn is taken.

- Type: `integer`
- Default: `3000`
- The unit follows `optimMode`: the specification gives *"1/10th seconds / meters / Wh in resp. FASTEST / SHORTEST / ECO mode"*. Measured on the routing service (`/routing/1.0`), it is **metres** for `SHORTEST` and **tenths of a second** for `FASTEST` — `3000` is 300 s.
- `0` disables the threshold: the direction is always kept. Do not send a negative value.

> ⚠️ Measured on prod (29 September 2026), Paris → Arc de Triomphe, start heading 180° with `useStartAngle`, `optimMode: "SHORTEST"`: EV smart routing answered the same 4,859 m route with `startUTurnThreshold` at `1`, at the default and at `99999`, while the routing service, from the same start, turned around at `1` (5,063 m) and kept the direction at `99999` (5,847 m). Check the answer before relying on this field here.

🔧 **How to enable**
```
"start": {
  "lon": 2.34755,
  "lat": 48.85708,
  "heading": 90,
  "useStartAngle": true
},
"condition": {
  "startUTurnThreshold": 1000
}
```
📦 **Example**
```
{
  "geoserver": "osm",
  "csps": ["ecoMovement"],
  "vehicle": {
    "initBatLvl": 100,
    "key": "eb1e9464-8654-4c01-bedd-b2f95412a60d",
    "payload": 75
  },
  "start": {
    "lon": 2.34755,
    "lat": 48.85708,
    "heading": 90,
    "useStartAngle": true
  },
  "stop": {
    "lon": 4.35497,
    "lat": 50.83857
  },
  "condition": {
    "minBatLvl": 10.0,
    "startUTurnThreshold": 1000
  }
}
```
**Response**
```
{
  "logTag": "cc396ff1-70d3-4aac-9b0a-bcd542ce35d5",
  "journeys": [
    {
      "summary": {
        "vehicleInfo": {
          "brand": "Kia",
          "name": "e-Niro",
          "variant": "64 kWh",
          "year": "2018"
        },
        "distance": 325881,
        "duration": 12744,
        "batteryLevel": 10,
        "consumed": 66.35,
        "chargingTime": 454,
        "departureTime": 1790691915000,
        "arrivalTime": 1790705413000,
        "boundingBox": {
          "minLon": 2.3475670788198015,
          "minLat": 48.82658,
          "maxLon": 4.35548,
          "maxLat": 50.83906
        },
        "chargingCost": {
          "currency": "EUR",
          "withoutVat": 5.4207706,
          "includeVat": 6.5591326
        }
      },
      "events": [
        {
          "eventType": "START",
          "coord": {
            "lon": 2.3475670788198015,
            "lat": 48.857108751160624
          },
          "address": "Quai de Gesvres, 75004 Paris, France",
          "departureTime": 1790691915000
        },
        {
          "eventType": "ROUTE",
          "distance": 276566,
          "duration": 10138,
          "consumed": 57.327046164778025
        },
        {
          "eventType": "CHARGE",
          "coord": {
            "lon": 3.86916221,
            "lat": 50.6693674
          },
          "arrivalTime": 1790702053000,
          "departureTime": 1790702807000,
          "arrivalBatteryLevel": 10.416628678789777,
          "departureBatteryLevel": 24.080891420749417,
          "chargingTime": 454,
          "chargingPower": {
            "currentType": "DC",
            "power": 77,
            "cnnTypeId": 38
          },
          "chargingCost": {
            "currency": "EUR",
            "withoutVat": 5.4207706,
            "includeVat": 6.5591326,
            "tariffChargePassHashId": "2f0581a4648e0889b77321d14d2d7c36"
          },
          "pool": {
            "providerName": "ecoMovement",
            "providerMode": "LOCAL",
            "id": "1bb8cd94-c71f-11f0-b52b-42010aa400b8",
            "sourceProvider": "IONITY",
            "brand": "IONITY",
            "name": "IONITY GmbH IONITY Ath",
            "countryCode": "BEL",
            "address": {
              "countryCode": "BEL",
              "country": "BEL",
              "city": "Gellingen",
              "postalCode": "7822",
              "street": "Avenue des Artisans 1"
            },
            "accessibility": "PUBLIC",
            "availabilityStatus": "IN_SERVICE_FREE",
            "numberOfChargingPoint": 12,
            ...
          }
        },
        {
          "eventType": "ROUTE",
          "distance": 49315,
          "duration": 2606,
          "consumed": 9.018081990076134
        },
        {
          "eventType": "STOP",
          "coord": {
            "lon": 4.35463449209338,
            "lat": 50.838761144465366
          },
          "address": "34 Rue de la Régence, 1000 Bruxelles, België"
        }
      ]
    }
  ]
}
```
---
<a name="evsmartrouting_temperature_tutorial"></a>
## 🌡️ temperature – Set ambient temperature manually (°C)
✅ **Use case**

You want to **manually define the ambient temperature** during the EV trip. This affects vehicle consumption (battery performance, heating/cooling, etc.).

💡 **What it does**

Defines the outside **temperature in Celsius** that impacts energy consumption estimations.

🔧 **How to use**

- Value must be an integer (°C)
- Default is `20`
- Range is usually `-30` to `50` for realistic use cases
```
"condition": {
  "temperature": 5
}
```
> ⚠️ Measured on prod (29 September 2026): `temperature` is applied even when `weather` is `true` — see the note under `weather`.

📦 **Example**
```
{
  "geoserver": "osm",
  "csps": ["ecoMovement"],
  "vehicle": {
    "initBatLvl": 100,
    "key": "eb1e9464-8654-4c01-bedd-b2f95412a60d",
    "payload": 75
  },
  "start": {
    "lon": 2.34755,
    "lat": 48.85708
  },
  "stop": {
    "lon": 4.35497,
    "lat": 50.83857
  },
  "condition": {
    "minBatLvl": 10.0,
    "temperature": -5,
    "weather": false
  }
}
```
**Response**
```
{
  "logTag": "2dcb9311-e547-43f6-8290-e32d956752ed",
  "journeys": [
    {
      "summary": {
        "vehicleInfo": {
          "brand": "Kia",
          "name": "e-Niro",
          "variant": "64 kWh",
          "year": "2018"
        },
        "distance": 325281,
        "duration": 12790,
        "batteryLevel": 10,
        "consumed": 85.08,
        "chargingTime": 1657,
        "departureTime": 1790692279000,
        "arrivalTime": 1790707026000,
        "boundingBox": {
          "minLon": 2.3475670788198015,
          "minLat": 48.82658,
          "maxLon": 4.35548,
          "maxLat": 50.83906
        },
        "chargingCost": {
          "currency": "EUR",
          "withoutVat": 13.970626,
          "includeVat": 16.764751
        }
      },
      "events": [
        {
          "eventType": "START",
          "coord": {
            "lon": 2.3475670788198015,
            "lat": 48.857108751160624
          },
          "address": "Quai de Gesvres, 75004 Paris, France",
          "departureTime": 1790692279000
        },
        {
          "eventType": "ROUTE",
          "distance": 176286,
          "duration": 6697,
          "consumed": 49.30487450315385
        },
        {
          "eventType": "CHARGE",
          "coord": {
            "lon": 2.8641582,
            "lat": 50.26148552
          },
          "arrivalTime": 1790698976000,
          "departureTime": 1790700933000,
          "arrivalBatteryLevel": 22.961133588822108,
          "departureBatteryLevel": 65.90625868776897,
          "chargingTime": 1657,
          "chargingPower": {
            "currentType": "DC",
            "power": 77,
            "cnnTypeId": 38
          },
          "chargingCost": {
            "currency": "EUR",
            "withoutVat": 13.970626,
            "includeVat": 16.764751,
            "tariffChargePassHashId": "de14cf91a4b464ba931f552fa31951ae"
          },
          "pool": {
            "providerName": "ecoMovement",
            "providerMode": "LOCAL",
            "id": "d66f3672-a3c9-11ed-bc56-42010aa40fc6",
            "sourceProvider": "Fastned",
            "brand": "Fastned",
            "name": "Fastned Aire de Wancourt Est",
            "countryCode": "FRA",
            "address": {
              "countryCode": "FRA",
              "country": "FRA",
              "city": "Wancourt",
              "postalCode": "62128",
              "street": "Échangeur d'Arras-Est"
            },
            "accessibility": "PUBLIC",
            "availabilityStatus": "IN_SERVICE_FREE",
            "numberOfChargingPoint": 8,
            ...
          }
        },
        {
          "eventType": "ROUTE",
          "distance": 148995,
          "duration": 6093,
          "consumed": 35.780005560172135
        },
        {
          "eventType": "STOP",
          "coord": {
            "lon": 4.35463449209338,
            "lat": 50.838761144465366
          },
          "address": "34 Rue de la Régence, 1000 Bruxelles, België"
        }
      ]
    }
  ]
}
```
---
<a name="evsmartrouting_tollCost_tutorial"></a>
## 💶 tollCost – Include toll costs and toll events in the journey
✅ **Use case**

You want to know **how much the tolls of the trip cost** and where they are met — to budget a trip, or to compare it with a toll-free one (`criterias: ["AVOID_TOLLS"]`).

💡 **What it does**

When `tollCost` is `true`, the response adds:

- `summary.tollSumFees`: the toll fees of the whole journey, as `feeMin` and `feeMax` with their `currency` — in the example below, the motorcycle price (9.6 EUR) and the price for the `ALL (HT_VEH_MAX,200)(WT_VEH_MAX,3500)` category (16.3 EUR);
- a `TOLL` event at each toll point, with its `tollType` (`OBTAIN_TICKET`, `PAY_PER_TICKET`…) and `coord`; the event where the toll is paid also carries `meanOfPayments` and `charges[]`, one price per vehicle category.

The prices follow `currency`.

🔧 **How to use**

- Type: `boolean`
- Default: `false`

```
"condition": {
  "tollCost": true
}
```
> ⚠️ Measured on prod (29 September 2026), on the example trip: the toll data came with `"geoserver": "here"`. With `"osm"`, the same request answered `200` with no toll at all — no `tollSumFees`, no `TOLL` event, and nothing saying why.

📦 **Example**
```
{
  "geoserver": "here",
  "csps": ["ecoMovement"],
  "vehicle": {
    "initBatLvl": 100,
    "key": "eb1e9464-8654-4c01-bedd-b2f95412a60d",
    "payload": 75
  },
  "start": {
    "lon": 2.34755,
    "lat": 48.85708
  },
  "stop": {
    "lon": 4.35497,
    "lat": 50.83857
  },
  "condition": {
    "minBatLvl": 10.0,
    "tollCost": true
  }
}
```
**Response**
```
{
  "logTag": "e6ee462f-36f7-4ac4-b760-53574d9c7abf",
  "journeys": [
    {
      "summary": {
        "vehicleInfo": {
          "brand": "Kia",
          "name": "e-Niro",
          "variant": "64 kWh",
          "year": "2018"
        },
        "distance": 312013,
        "duration": 12454,
        "batteryLevel": 10,
        "consumed": 63.98,
        "chargingTime": 332,
        "departureTime": 1790691135000,
        "arrivalTime": 1790704221000,
        "boundingBox": {
          "minLon": 2.347551814585281,
          "minLat": 48.82655,
          "maxLon": 4.35679,
          "maxLat": 50.83971
        },
        "chargingCost": {
          "currency": "EUR",
          "withoutVat": 3.7919002,
          "includeVat": 4.55028
        },
        "tollSumFees": {
          "currency": "EUR",
          "feeMin": 9.6,
          "feeMax": 16.3
        }
      },
      "events": [
        {
          "eventType": "START",
          "coord": {
            "lon": 2.347551814585281,
            "lat": 48.857082927794195
          },
          "address": "Quai de Gesvres, 75004 Paris, France",
          "departureTime": 1790691135000
        },
        {
          "eventType": "ROUTE",
          "distance": 55459,
          "duration": 2972,
          "consumed": 9.910327142358156
        },
        {
          "tollType": "OBTAIN_TICKET",
          "eventType": "TOLL",
          "coord": {
            "lon": 2.62796,
            "lat": 49.21563
          }
        },
        {
          "eventType": "ROUTE",
          "distance": 112459,
          "duration": 3515,
          "consumed": 25.367759883085316
        },
        {
          "eventType": "CHARGE",
          "coord": {
            "lon": 3.08922127,
            "lat": 50.12222526
          },
          "arrivalTime": 1790697622000,
          "departureTime": 1790698254000,
          "arrivalBatteryLevel": 44.88039675356762,
          "departureBatteryLevel": 54.853260627451604,
          "chargingTime": 332,
          "chargingPower": {
            "currentType": "DC",
            "power": 77,
            "cnnTypeId": 38
          },
          "chargingCost": {
            "currency": "EUR",
            "withoutVat": 3.7919002,
            "includeVat": 4.55028,
            "tariffChargePassHashId": "54f7f457a004285cbd9eeed89df76986"
          },
          "pool": {
            "providerName": "ecoMovement",
            "providerMode": "LOCAL",
            "id": "c8109b7c-e8ad-11ef-9543-42010aa400b8",
            "sourceProvider": "TotalEnergies",
            "brand": "TotalEnergies",
            "name": "RELAIS DE HAVRINCOURT",
            "countryCode": "FRA",
            "address": {
              "countryCode": "FRA",
              "country": "FRA",
              "city": "Havrincourt",
              "postalCode": "62147",
              "street": "A2"
            },
            "accessibility": "PUBLIC",
            "availabilityStatus": "IN_SERVICE_FREE",
            "numberOfChargingPoint": 16,
            ...
          }
        },
        {
          "eventType": "ROUTE",
          "distance": 17936,
          "duration": 636,
          "consumed": 3.7619065455423044
        },
        {
          "tollType": "PAY_PER_TICKET",
          "meanOfPayments": [
            "CASH",
            "BANK_CARD",
            "CREDIT_CARD"
          ],
          "charges": [
            {
              "currency": "EUR",
              "category": "MOTORCYCLE",
              "price": 9.6
            },
            {
              "currency": "EUR",
              "category": "ALL (HT_VEH_MAX,200)(WT_VEH_MAX,3500)",
              "price": 16.3
            }
          ],
          "eventType": "TOLL",
          "coord": {
            "lon": 3.2721,
            "lat": 50.22922
          }
        },
        {
          "eventType": "ROUTE",
          "distance": 126159,
          "duration": 5331,
          "consumed": 24.942639308299977
        },
        {
          "eventType": "STOP",
          "coord": {
            "lon": 4.354965993372832,
            "lat": 50.83856781880828
          },
          "address": "4 Joseph Dupontstraat, 1000 Brussel, België"
        }
      ]
    }
  ]
}
```
---
<a name="evsmartrouting_weather_tutorial"></a>
## ☁️ weather – Enable real-time weather data
✅ **Use case**

You want the routing engine to consider **real-time weather conditions** (temperature, wind, rain, etc.) to produce **more accurate energy consumption estimates**.

💡 **What it does**

When set to `true`, the routing system is meant to fetch **real-time weather data** from a provider (e.g., temperature, wind, precipitation) and to override the manual `temperature` value if provided.

🔧 **How to use**

- Type: `boolean`
- Default: `false`
- If enabled, it is meant to override the `temperature` field (see the note below)
```
"condition": {
  "weather": true
}
```
> ⚠️ Measured on prod (29 September 2026): `weather: true` has no measurable effect, and the manual `temperature` is still applied. With `temperature: -5`, `weather: true` and `weatherProvider: "owm"`, the example trip consumes 85.08 kWh and charges for 1,657 s — exactly as with `weather: false`; with `weather: true` and no `temperature`, it consumes 66.35 kWh, the same as at the 20 °C default. Every answer is `200`, and nothing in it says the weather was not applied. Set `temperature` to the expected temperature.
📦 **Example**
```
{
  "geoserver": "osm",
  "csps": ["ecoMovement"],
  "vehicle": {
    "initBatLvl": 100,
    "key": "eb1e9464-8654-4c01-bedd-b2f95412a60d",
    "payload": 75
  },
  "start": {
    "lon": 2.34755,
    "lat": 48.85708
  },
  "stop": {
    "lon": 4.35497,
    "lat": 50.83857
  },
  "condition": {
    "minBatLvl": 10.0,
    "weather": true
  }
}
```
**Response**
```
{
  "logTag": "c67423d6-7bc6-42e9-b44c-7ce57a46851f",
  "journeys": [
    {
      "summary": {
        "vehicleInfo": {
          "brand": "Kia",
          "name": "e-Niro",
          "variant": "64 kWh",
          "year": "2018"
        },
        "distance": 312050,
        "duration": 12439,
        "batteryLevel": 10,
        "consumed": 69.31,
        "chargingTime": 608,
        "departureTime": 1752760273000,
        "arrivalTime": 1752773620000,
        "boundingBox": {
          "minLon": 2.347567485574783,
          "minLat": 48.82658,
          "maxLon": 4.35548,
          "maxLat": 50.83906
        }
      },
      "events": [
        {
          "eventType": "START",
          "coord": {
            "lon": 2.347567485574783,
            "lat": 48.85710875
          },
          "address": "Quai de Gesvres, 75004 Paris, France",
          "departureTime": 1752760273000
        },
        {
          "eventType": "ROUTE",
          "distance": 168024,
          "duration": 6529,
          "consumed": 38.53506932004888
        },
        {
          "eventType": "CHARGE",
          "coord": {
            "lon": 3.08922127,
            "lat": 50.12222526
          },
          "arrivalTime": 1752766802000,
          "departureTime": 1752767710000,
          "arrivalBatteryLevel": 39.78895418742362,
          "departureBatteryLevel": 58.08151994321714,
          "chargingTime": 608,
          "chargingPower": {
            "currentType": "DC",
            "power": 77,
            "cnnTypeId": 38
          },
          "pool": {
            "providerName": "ecoMovement",
            "providerMode": "LOCAL",
            "id": "c8109b7c-e8ad-11ef-9543-42010aa400b8",
            "sourceProvider": "TotalEnergies",
            "updateDate": 1752462431048,
            "brand": "TotalEnergies",
            "name": "RELAIS DE HAVRINCOURT",
            "countryCode": "FRA",
            "address": {
              "countryCode": "FRA",
              "country": "FRA",
              "city": "Havrincourt",
              "postalCode": "62147",
              "street": "A2"
            },
            "siteCategory": "ON_STREET",
            "accessibility": "PUBLIC",
            "entrance": {
              "lon": 3.08922127,
              "lat": 50.12222526
            },
            "phoneNumber": "+(33)-(9)-77405060",
            "availabilityStatus": "IN_SERVICE",
            "open24x7": true,
            "numberOfChargingPoint": 8,
            "reliabilityScore": 50,
            "predictedOccupancyTimeSlots": [
              {
                "dayOfweek": "MONDAY",
                "start": "00:00",
                "end": "18:59",
                "predictedOccupancy": 5
              },
              {
                "dayOfweek": "MONDAY",
                "start": "19:00",
                "end": "23:59",
                "predictedOccupancy": 4
              },
```
---
<a name="evsmartrouting_weatherProvider_tutorial"></a>
## 🌦️ weatherProvider – Choose the weather data provider
✅ **Use case**

You want to specify the source of real-time `weather` data when weather is enabled. This allows you to choose a provider with better coverage, reliability, or performance in your area.

💡 **What it does**

Defines which weather API provider will be used to retrieve live weather data during route calculation. This field only has an effect if `weather` is set to `true`.

🔧 **How to use**

- Type: `String`
- Only effective if `"weather": true` (see the note under `weather`)
- Accepted value: `owm` (OpenWeatherMap). `"openweathermap"` answers `400` *"Weather provider not found 'openweathermap'"* (measured on prod, 29 September 2026)

```
"condition": {
  "weather": true,
  "weatherProvider": "owm"
}
```
📦 Example
```
{
  "geoserver": "osm",
  "csps": ["ecoMovement"],
  "vehicle": {
    "initBatLvl": 100,
    "key": "eb1e9464-8654-4c01-bedd-b2f95412a60d",
    "payload": 75
  },
  "start": {
    "lon": 2.34755,
    "lat": 48.85708
  },
  "stop": {
    "lon": 4.35497,
    "lat": 50.83857
  },
  "condition": {
    "minBatLvl": 10.0,
    "weather": true,
    "weatherProvider": "owm"
  }
}
```
**Response**
```
{
  "logTag": "215755f2-b0ca-442b-b301-e68594d56dfa",
  "journeys": [
    {
      "summary": {
        "vehicleInfo": {
          "brand": "Kia",
          "name": "e-Niro",
          "variant": "64 kWh",
          "year": "2018"
        },
        "distance": 312050,
        "duration": 12439,
        "batteryLevel": 10,
        "consumed": 69.31,
        "chargingTime": 608,
        "departureTime": 1752760364000,
        "arrivalTime": 1752773711000,
        "boundingBox": {
          "minLon": 2.347567485574783,
          "minLat": 48.82658,
          "maxLon": 4.35548,
          "maxLat": 50.83906
        }
      },
      "events": [
        {
          "eventType": "START",
          "coord": {
            "lon": 2.347567485574783,
            "lat": 48.85710875
          },
          "address": "Quai de Gesvres, 75004 Paris, France",
          "departureTime": 1752760364000
        },
        {
          "eventType": "ROUTE",
          "distance": 168024,
          "duration": 6529,
          "consumed": 38.53506932004888
        },
        {
          "eventType": "CHARGE",
          "coord": {
            "lon": 3.08922127,
            "lat": 50.12222526
          },
          "arrivalTime": 1752766893000,
          "departureTime": 1752767801000,
          "arrivalBatteryLevel": 39.78895418742362,
          "departureBatteryLevel": 58.08151994321714,
          "chargingTime": 608,
          "chargingPower": {
            "currentType": "DC",
            "power": 77,
            "cnnTypeId": 38
          },
          "pool": {
            "providerName": "ecoMovement",
            "providerMode": "LOCAL",
            "id": "c8109b7c-e8ad-11ef-9543-42010aa400b8",
            "sourceProvider": "TotalEnergies",
            "updateDate": 1752462431048,
            "brand": "TotalEnergies",
            "name": "RELAIS DE HAVRINCOURT",
            "countryCode": "FRA",
            "address": {
              "countryCode": "FRA",
              "country": "FRA",
              "city": "Havrincourt",
              "postalCode": "62147",
              "street": "A2"
            },
            "siteCategory": "ON_STREET",
            "accessibility": "PUBLIC",
            "entrance": {
              "lon": 3.08922127,
              "lat": 50.12222526
            },
            "phoneNumber": "+(33)-(9)-77405060",
            "availabilityStatus": "IN_SERVICE",
            "open24x7": true,
            "numberOfChargingPoint": 8,
            "reliabilityScore": 50,
            "predictedOccupancyTimeSlots": [
              {
                "dayOfweek": "MONDAY",
                "start": "00:00",
                "end": "18:59",
                "predictedOccupancy": 5
              },
              {
                "dayOfweek": "MONDAY",
                "start": "19:00",
                "end": "23:59",
                "predictedOccupancy": 4
              },
```

---

_BeNomad MCP: a corrected copy of BeMap's page, served until BeMap publishes the correction (BEMAP-1938)._
