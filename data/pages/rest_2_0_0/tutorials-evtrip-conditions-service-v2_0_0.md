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

When this option is enabled (`true`) **and algorithm version 3 is used**, the EV routing engine may suggest a **maximum speed** limit for certain sections of the route. This recommendation helps the vehicle:

- **Arrive at the next destination or charging station without depleting the battery**
- **Optimize energy consumption**
- **Bypass low-power charging stations** in favor of better options further ahead

Instead of simply driving as fast as possible, the algorithm may recommend slowing down **to skip an extra charging stop** — resulting in faster **total travel time.**

> ⚠️ This is a recommendation, not a restriction — the driver is still free to ignore it.

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
  "routingMode": "MODE_VIAS",
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
  },
  "routingVehicleProfile": {
    "transportMode": "CAR"
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
  "routingMode": "MODE_VIAS",
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
  },
  "routingVehicleProfile": {
    "transportMode": "CAR"
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
  "routingMode": "MODE_VIAS",
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
  },
  "routingVehicleProfile": {
    "transportMode": "CAR"
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

🔧 **How to enable**  

Add the `chargePluggingTime` parameter in the `condition` block.
```
"condition": {
  "chargePluggingTime": 300
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
  "routingMode": "MODE_VIAS",
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
    "chargePluggingTime": 300
  },
  "routingVehicleProfile": {
    "transportMode": "CAR"
  }
}
```
**Response**
```
{
  "logTag": "1f2ce6ab-4f82-4877-b40b-225566775ffd",
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
        "departureTime": 1752756683000,
        "arrivalTime": 1752770030000,
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
          "departureTime": 1752756683000
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
          "arrivalTime": 1752763212000,
          "departureTime": 1752764120000,
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
```
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
Each object is of type `ChargeTimeSlotFront` and must include:
- `duration`: Duration of the charging stop in seconds (e.g. 1800 = 30 minutes)
- `startDateTime`: Start date/time of the window in ISO format (e.g. `2025-07-10T08:00:00`)
- `stopDateTime	`: End date/time of the window in ISO format
- `maxWalkingDistance`: Max distance (in meters) from POI to the vehicle (default: `1000`)
- `serviceCategory`: Logical expression to filter POI categories. Example: (`7315`) [Service Category Reference](index.html#page-sdk-jsiv-classids.md)
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
  "routingMode": "MODE_VIAS",
  "start": {
    "lon": 2.34755,
    "lat": 48.85708
  },
  "stop": {
    "lon": 4.35497,
    "lat": 50.83857
  },
  "condition": {
    "departureTime": "2025-07-10T07:50:00+02:00",
    "minBatLvl": 10.0,
    "chargeTimeSlots": [
      {
        "duration": 1800,
        "startDateTime": "2025-07-10T08:00:00+02:00",
        "stopDateTime": "2025-07-10T10:00:00+02:00",
        "maxWalkingDistance": 500,
        "serviceCategory": "(7315|9105)&!7395"
      }
    ]
  },
  "routingVehicleProfile": {
    "transportMode": "CAR"
  }
}
```
**Response**
```
{
  "logTag": "3c5e4ba2-875b-4fb3-9f54-14acea57ce3c",
  "journeys": [
    {
      "summary": {
        "vehicleInfo": {
          "brand": "Kia",
          "name": "e-Niro",
          "variant": "64 kWh",
          "year": "2018"
        },
        "distance": 315442,
        "duration": 12813,
        "batteryLevel": 21.1,
        "consumed": 69.64,
        "chargingTime": 1500,
        "departureTime": 1752133800000,
        "arrivalTime": 1752148413000,
        "boundingBox": {
          "minLon": 2.347567485574783,
          "minLat": 48.82658,
          "maxLon": 4.35548,
          "maxLat": 50.83906
        },
        "chargingCost": {
          "currency": "EUR",
          "withoutVat": 0,
          "includeVat": 0
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
          "departureTime": 1752133800000
        },
        {
          "eventType": "ROUTE",
          "distance": 114056,
          "duration": 4959,
          "consumed": 25.138592854519352
        },
        {
          "eventType": "CHARGE",
          "coord": {
            "lon": 2.77397302,
            "lat": 49.70755659
          },
          "arrivalTime": 1752138759000,
          "departureTime": 1752140559000,
          "arrivalBatteryLevel": 60.72094866481351,
          "departureBatteryLevel": 90.67673474907342,
          "chargingTime": 1500,
          "chargingPower": {
            "currentType": "DC",
            "power": 77,
            "cnnTypeId": 38
          },
          "chargingCost": {
            "currency": "EUR",
            "withoutVat": 0,
            "includeVat": 0
          },
          "pool": {
            "providerName": "ecoMovement",
            "providerMode": "LOCAL",
            "id": "cd0570ca-2c16-11ef-b8a5-42010aa40043",
            "sourceProvider": "IZIVIA Fast",
            "updateDate": 1752462431048,
            "brand": "IZIVIA Fast",
            "name": "IZIVIA FAST - McDonald's - Roye Le Moulin",
            "countryCode": "FRA",
            "address": {
              "countryCode": "FRA",
              "country": "FRA",
              "city": "Roye",
              "postalCode": "80700",
              "street": "2 Impasse du Moulin"
            },
            "siteCategory": "ON_STREET",
            "accessibility": "PUBLIC",
            "entrance": {
              "lon": 2.77397302,
              "lat": 49.70755659
            },
            "availabilityStatus": "IN_SERVICE",
            "open24x7": true,
            "numberOfChargingPoint": 3,
            "reliabilityScore": 25,
            "predictedOccupancyTimeSlots": [
              {
                "dayOfweek": "MONDAY",
                "start": "00:00",
                "end": "09:59",
                "predictedOccupancy": 2
              },
              {
                "dayOfweek": "MONDAY",
                "start": "10:00",
                "end": "12:59",
                "predictedOccupancy": 3
              },
```
---
<a name="evsmartrouting_chargingStationDeprecatedConnector_tutorial"></a>
## 🔌 chargingStationDeprecatedConnector – Allow deprecated charging connector types
✅ **Use case**

Your EV may support **older or deprecated connector types** (e.g., CHAdeMO, older Type 1 standards), and you want the routing engine to include **charging stations with these deprecated connectors**, even if they are not recommended anymore.

💡 **What it does**

By default, the EV Routing API uses only the connector types specified in the vehicle profile (vehicle.connectorTypes) to filter compatible charging stations.

If `chargingStationDeprecatedConnector` is set to `true`, then stations that only support deprecated types can be included in the route, if those connectors match your vehicle's capabilities.

This is useful when:

- You're driving an **older EV model** still compatible with deprecated connectors.
- You're planning **routes in rural** or poorly equipped areas.
- You need **maximum flexibility**, even if it means using obsolete plugs.

> ⚠️ This flag **does not override the connector list**, but allows inclusion of stations with deprecated types **only if they match the declared vehicle connectors**.

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
  "routingMode": "MODE_VIAS",
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
  },
  "routingVehicleProfile": {
    "transportMode": "CAR"
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
  "routingMode": "MODE_VIAS",
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
  },
  "routingVehicleProfile": {
    "transportMode": "CAR"
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
> 📘 The connector IDs correspond to internal enum values (e.g., 32 = CCS Combo 2, 38 = Type 2).
Refer to the API glossary for the full list of IDs. 

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
  "routingMode": "MODE_VIAS",
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
  },
  "routingVehicleProfile": {
    "transportMode": "CAR"
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
  "routingMode": "MODE_VIAS",
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
    "currency": "EUR"
  },
  "routingVehicleProfile": {
    "transportMode": "CAR"
  }
}
```
**Response**
```
{
  "logTag": "4a36b91e-9c82-41e9-8a95-f19076f09758",
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
        "departureTime": 1752757421000,
        "arrivalTime": 1752770768000,
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
          "departureTime": 1752757421000
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
          "arrivalTime": 1752763950000,
          "departureTime": 1752764858000,
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

- 📅 **ISO 8601 string** (recommended for clarity):

  - `"2011-12-03T10:15:30"`
  - `"2011-12-03T10:15:30+01:00"`
  - `"2011-12-03T10:15:30+01:00[Europe/Paris]"`

- 🕰️ **Epoch timestamp in milliseconds** (UTC):

  - 1672531200000

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
  "routingMode": "MODE_VIAS",
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
    "departureTime": "2025-07-10T08:00:00+02:00"
  },
  "routingVehicleProfile": {
    "transportMode": "CAR"
  }
}
```
**Response**
```
{
  "logTag": "81fe113a-8c37-4c39-aa8a-35f328058f19",
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
        "departureTime": 1752134400000,
        "arrivalTime": 1752147747000,
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
          "departureTime": 1752134400000
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
          "arrivalTime": 1752140929000,
          "departureTime": 1752141837000,
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
  "routingMode": "MODE_VIAS",
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
  },
  "routingVehicleProfile": {
    "transportMode": "CAR"
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
  "routingMode": "MODE_VIAS",
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
  },
  "routingVehicleProfile": {
    "transportMode": "CAR"
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
  "routingMode": "MODE_VIAS",
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
  },
  "routingVehicleProfile": {
    "transportMode": "CAR"
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
  "routingMode": "MODE_VIAS",
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
  },
  "routingVehicleProfile": {
    "transportMode": "CAR"
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
  "routingMode": "MODE_VIAS",
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
  },
  "routingVehicleProfile": {
    "transportMode": "CAR"
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
  "routingMode": "MODE_VIAS",
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
  },
  "routingVehicleProfile": {
    "transportMode": "CAR"
  }
}
```
**Response**
```
{
  "logTag": "2c8e3c94-9625-4b68-b29e-09e490c82a69",
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
        "departureTime": 1752758090000,
        "arrivalTime": 1752771437000,
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
          "departureTime": 1752758090000
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
          "arrivalTime": 1752764619000,
          "departureTime": 1752765527000,
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
  "routingMode": "MODE_VIAS",
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
  },
  "routingVehicleProfile": {
    "transportMode": "CAR"
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
  "routingMode": "MODE_VIAS",
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
  },
  "routingVehicleProfile": {
    "transportMode": "CAR"
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
  "routingMode": "MODE_VIAS",
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
  },
  "routingVehicleProfile": {
    "transportMode": "CAR"
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
  "routingMode": "MODE_VIAS",
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
  },
  "routingVehicleProfile": {
    "transportMode": "CAR"
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
  "routingMode": "MODE_VIAS",
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
  },
  "routingVehicleProfile": {
    "transportMode": "CAR"
  }
}
```
**Response**
```
{
  "logTag": "32662cfa-de02-485e-a91b-926c2685d223",
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
        "batteryLevel": 9.8,
        "consumed": 69.31,
        "chargingTime": 608,
        "departureTime": 1752758280000,
        "arrivalTime": 1752771627000,
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
          "departureTime": 1752758280000
        },
        {
          "eventType": "ROUTE",
          "distance": 168024,
          "duration": 6529,
          "consumed": 38.53506932004888,
          "routeConsumptions": [
            {
              "time": 0,
              "distFromStart": 0,
              "cumulativeConsumption": 0,
              "consumption": 0,
              "batteryLevel": 100
            },
            {
              "time": 60,
              "distFromStart": 246.4027160287868,
              "cumulativeConsumption": 0.11167172760407368,
              "consumption": 0.11167172760407368,
              "batteryLevel": 99.82551292561863
            },
```
---
<a name="evsmartrouting_routeDetailsExtKey_tutorial"></a>
## 🔐 routeDetailsExtKey – Unlock extended route event details
✅ **Use case**

You need **high-resolution route event data** such as:

- Instantaneous **speed**,
- **Acceleration** and **deceleration**,
- **Slope**, **road angles**, or **elevation variations**.

This level of detail is particularly useful for **advanced simulations**, **vehicle dynamics studies**, or **driving behavior analysis**.

💡 **What it does**

This field unlocks additional **granular route event data** in the response.
It must be used **in combination with** `"routeDetails": true`.

To obtain a valid `routeDetailsExtKey`, you must contact your BeMap account manager. Without this key, only basic route details will be returned.

🔧 **How to enable**
```
"condition": {
  "routeDetails": true,
  "routeDetailsExtKey": "your-api-extension-key"
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
  "routingMode": "MODE_VIAS",
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
    "routeDetailsExtKey": "abcd1234-ef56-7890-ghij-klmnopqrstuv"
  },
  "routingVehicleProfile": {
    "transportMode": "CAR"
  }
}
```
**Response**
```
{
  "logTag": "4a9f396e-f26a-41fe-b8d6-7573491d406f",
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
        "batteryLevel": 9.8,
        "consumed": 69.31,
        "chargingTime": 608,
        "departureTime": 1752758325000,
        "arrivalTime": 1752771672000,
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
          "departureTime": 1752758325000
        },
        {
          "eventType": "ROUTE",
          "distance": 168024,
          "duration": 6529,
          "consumed": 38.53506932004888,
          "routeConsumptions": [
            {
              "time": 0,
              "distFromStart": 0,
              "cumulativeConsumption": 0,
              "consumption": 0,
              "batteryLevel": 100
            },
            {
              "time": 60,
              "distFromStart": 246.4027160287868,
              "cumulativeConsumption": 0.11167172760407368,
              "consumption": 0.11167172760407368,
              "batteryLevel": 99.82551292561863
            },
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

📌 Default: `60` seconds

🔧 **How to enable**
```
"condition": {
  "routeDetails": true,
  "routeDetailsFreq": 30
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
  "routingMode": "MODE_VIAS",
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
    "routeDetailsFreq": 30
  },
  "routingVehicleProfile": {
    "transportMode": "CAR"
  }
}
```
**Response**
```
{
  "logTag": "d9649df1-ad0f-46e7-a163-9a3b24b5d0b4",
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
        "batteryLevel": 9.8,
        "consumed": 69.31,
        "chargingTime": 608,
        "departureTime": 1752758633000,
        "arrivalTime": 1752771980000,
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
          "departureTime": 1752758633000
        },
        {
          "eventType": "ROUTE",
          "distance": 168024,
          "duration": 6529,
          "consumed": 38.53506932004888,
          "routeConsumptions": [
            {
              "time": 0,
              "distFromStart": 0,
              "cumulativeConsumption": 0,
              "consumption": 0,
              "batteryLevel": 100
            },
            {
              "time": 30,
              "distFromStart": 108.5632777869273,
              "cumulativeConsumption": 0.04458432192735585,
              "consumption": 0.04458432192735585,
              "batteryLevel": 99.93033699698852
            },
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
  "routingMode": "MODE_VIAS",
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
  },
  "routingVehicleProfile": {
    "transportMode": "CAR"
  }
}
```
**Response**
```
{
  "logTag": "9992afd7-e302-4f24-bdaa-c960c0d08eb9",
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
        "batteryLevel": 9.8,
        "consumed": 69.31,
        "chargingTime": 608,
        "departureTime": 1752758680000,
        "arrivalTime": 1752772027000,
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
          "departureTime": 1752758680000
        },
        {
          "eventType": "ROUTE",
          "distance": 168024,
          "duration": 6529,
          "consumed": 38.53506932004888,
          "routeConsumptions": [
            {
              "time": 0,
              "distFromStart": 0,
              "cumulativeConsumption": 0,
              "consumption": 0,
              "batteryLevel": 100
            },
            {
              "time": 60,
              "distFromStart": 246.4027160287868,
              "cumulativeConsumption": 0.11167172760407368,
              "consumption": 0.11167172760407368,
              "batteryLevel": 99.82551292561863
            },
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
  "routingMode": "MODE_VIAS",
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
  },
  "routingVehicleProfile": {
    "transportMode": "CAR"
  }
}
```
**Response**
```
{
  "logTag": "695e19f0-6ced-4e66-94b8-a074a5caea32",
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
        "batteryLevel": 9.8,
        "consumed": 69.31,
        "chargingTime": 608,
        "departureTime": 1752758762000,
        "arrivalTime": 1752772109000,
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
          "departureTime": 1752758762000
        },
        {
          "eventType": "ROUTE",
          "distance": 168024,
          "duration": 6529,
          "consumed": 38.53506932004888,
          "routeConsumptions": [
            {
              "time": 0,
              "distFromStart": 0,
              "cumulativeConsumption": 0,
              "consumption": 0,
              "batteryLevel": 100
            },
            {
              "time": 60,
              "distFromStart": 246.4027160287868,
              "cumulativeConsumption": 0.11167172760407368,
              "consumption": 0.11167172760407368,
              "batteryLevel": 99.82551292561863
            },
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

- `TEXT` (default): Returns only human-readable route instructions.
- `DETAILS`: Returns only structured routing steps, useful for processing.
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
  "routingMode": "MODE_VIAS",
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
  },
  "routingVehicleProfile": {
    "transportMode": "CAR"
  }
}
```
**Response**
```
{
  "logTag": "debe331d-6c53-4e16-a3ac-12c035e208bb",
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
        "batteryLevel": 9.8,
        "consumed": 69.31,
        "chargingTime": 608,
        "departureTime": 1752758818000,
        "arrivalTime": 1752772165000,
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
          "departureTime": 1752758818000
        },
        {
          "eventType": "ROUTE",
          "distance": 168024,
          "duration": 6529,
          "consumed": 38.53506932004888,
          "routeConsumptions": [
            {
              "time": 0,
              "distFromStart": 0,
              "cumulativeConsumption": 0,
              "consumption": 0,
              "batteryLevel": 100
            },
            {
              "time": 60,
              "distFromStart": 246.4027160287868,
              "cumulativeConsumption": 0.11167172760407368,
              "consumption": 0.11167172760407368,
              "batteryLevel": 99.82551292561863
            },
```
---
<a name="evsmartrouting_routesheetVerboseLevel_tutorial"></a>
## 🗣️ routesheetVerboseLevel – Control the amount of detail in the route-sheet instructions
✅ **Use case**

You want to **adjust the level of detail** in the textual guidance returned by the `routesheet`. This is useful to match different user needs: minimal instructions for experienced drivers, or highly descriptive ones for novices.

💡 **What it does**

Determines the **verbosity** of each instruction in the route-sheet. A higher verbosity provides more contextual and descriptive information about maneuvers.

🔧 **Available values**

- `LOW` – Basic and minimal instructions (e.g., "Turn right").

- `MEDIUM` – Standard instructions with road names or directions (e.g., "Turn right onto Rue de Lyon").

- `HIGH` – Full instructions with detailed context (e.g., "At the intersection, turn right onto Rue de Lyon, continuing east").

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
  "routingMode": "MODE_VIAS",
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
  },
  "routingVehicleProfile": {
    "transportMode": "CAR"
  }
}
```
**Response**
```
{
  "logTag": "4e143873-d41d-486c-b243-86aa4d16c0be",
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
        "batteryLevel": 9.8,
        "consumed": 69.31,
        "chargingTime": 608,
        "departureTime": 1752760134000,
        "arrivalTime": 1752773481000,
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
          "departureTime": 1752760134000
        },
        {
          "eventType": "ROUTE",
          "distance": 168024,
          "duration": 6529,
          "consumed": 38.53506932004888,
          "routeConsumptions": [
            {
              "time": 0,
              "distFromStart": 0,
              "cumulativeConsumption": 0,
              "consumption": 0,
              "batteryLevel": 100
            },
            {
              "time": 60,
              "distFromStart": 246.4027160287868,
              "cumulativeConsumption": 0.11167172760407368,
              "consumption": 0.11167172760407368,
              "batteryLevel": 99.82551292561863
            },
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
  "routingMode": "MODE_VIAS",
  "start": {
    "lon": 2.34755,
    "lat": 48.85708
  },
  "stop": {
    "lon": 4.35497,
    "lat": 50.83857
  },
  "condition": {
    "temperature": -5,
    "weather": false
  },
  "routingVehicleProfile": {
    "transportMode": "CAR"
  }
}
```
**Response**
```
{
  "logTag": "1e31671d-b25a-46a3-a4cf-95718443670e",
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
        "consumed": 88.37,
        "chargingTime": 1930,
        "departureTime": 1752760213000,
        "arrivalTime": 1752774882000,
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
          "departureTime": 1752760213000
        },
        {
          "eventType": "ROUTE",
          "distance": 168024,
          "duration": 6529,
          "consumed": 50.61196233161227
        },
        {
          "eventType": "CHARGE",
          "coord": {
            "lon": 3.08922127,
            "lat": 50.12222526
          },
          "arrivalTime": 1752766742000,
          "departureTime": 1752768972000,
          "arrivalBatteryLevel": 20.918808856855833,
          "departureBatteryLevel": 68.99584443837378,
          "chargingTime": 1930,
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
<a name="evsmartrouting_weather_tutorial"></a>
## ☁️ weather – Enable real-time weather data
✅ **Use case**

You want the routing engine to consider **real-time weather conditions** (temperature, wind, rain, etc.) to produce **more accurate energy consumption estimates**.

💡 **What it does**

When set to `true`, the routing system fetches **real-time weather data** from a provider (e.g., temperature, wind, precipitation) and overrides the manual `temperature` value if provided.

🔧 **How to use**

- Type: `boolean`
- Default: `false`
- If enabled, it overrides the `temperature` field
```
"condition": {
  "weather": true
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
  "routingMode": "MODE_VIAS",
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
  },
  "routingVehicleProfile": {
    "transportMode": "CAR"
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
- Only effective if `"weather": true`
- Only Accepted values (`openweathermap`)

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
  "routingMode": "MODE_VIAS",
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
  },
  "routingVehicleProfile": {
    "transportMode": "CAR"
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