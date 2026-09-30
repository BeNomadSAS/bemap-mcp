<a name="chargingstation_parameters_tutorial"></a>
# ⚡ Charging Station Parameters – Detailed Usage Guide

This guide provides a comprehensive overview of all available parameters in the **Charging Station Search API** (`/bgis/service/chargingstation/search/1.0`).  

Each field is explained with its **purpose**, **usage tips**, and **real-world examples** to help you build precise and efficient queries for locating EV charging infrastructure.

Whether you're building a **charging map**, planning **long-distance electric trips**, or integrating **EVSE data** into your fleet management solution, this tutorial will guide you through the correct and effective use of each parameter.

> ℹ️ We recommend exploring each parameter individually, especially `bbox`, `corridor`, `filters`, and `options`, as they can significantly affect result accuracy, performance, and depth of information returned.

<a name="chargingstation_bbox_tutorial"></a>
## 🗺️ bbox – Define a geographic corridor using a bounding box

✅ **Use case**

You want to **search for charging stations along a defined corridor or area**, like a route or a rectangular zone 

— instead of using a single coordinate with a radius.

💡 **What it does**

The `bbox` parameter lets you specify a **Bounding Box** (rectangular area) using 4 coordinates:
`minLat`, `minLon`, `maxLat`, `maxLon`.
It allows the charging station service to **restrict the search to a specific geographic region**, which is ideal for long-distance route planning or area-based filtering.

🔧 **How to enable**

Add a `bbox` object to the root of your request:
```
"bbox": {
  "minLat": 48.80,
  "minLon": 2.25,
  "maxLat": 48.90,
  "maxLon": 2.45
}
```
📦 **Example**
```
{
  "geoserver": "osm",
  "providers": ["ecoMovement"],
  "mode": "LOCAL_OR_REMOTE",
  "maxProviderResult": 5,
  "options": ["PATH_POINT"],
  "bbox": {
    "minLat": 48.80,
    "minLon": 2.25,
    "maxLat": 48.90,
    "maxLon": 2.45
  }
}
```
**Response**
```
{
  "pools": [
    {
      "providerName": "ecoMovement",
      "providerMode": "LOCAL",
      "id": "8556d622-74e5-11e8-8953-42010a840002",
      "sourceProvider": "La borne bleue",
      "updateDate": 1753672005588,
      "brand": "La borne bleue",
      "nameOfPool": "SAINT-MANDÉ - Avenue du Général De Gaulle",
      "accessibility": "PUBLIC",
      "availabilityStatus": "NA",
      "longitude": 2.41786991,
      "latitude": 48.83774178,
      "countryCode": "FRA",
      "country": "FRA",
      "postalCode": "94160",
      "city": "Saint-Mandé",
      "street": "102 Avenue du Général de Gaulle",
      "siteCategory": "ON_STREET",
      "phoneNumber": "+(33)-(805)-021480",
      "open24x7": true,
      "chargingStations": [
        {
          "nature": "VGROUP",
          "availabilityStatus": "NA",
          "authenticationModes": [
            "RFID_BADGE"
          ],
          "paymentModes": [
            "OPERATOR_CONTRACT"
          ],
          "chargePasses": [
            {
              "title": "Ecotap",
              "networkName": "Ecotap"
            },
            {
              "title": "Shell Recharge",
              "networkName": "Shell Recharge"
            },
            ...
          ],
          "bookable": true,
          "chargingPoints": [
            {
              "id": "ROVVsBU6mPxQJ605fBK52w==",
              "operatorId": "FR*SIP*E94067*005*2*1",
              "availabilityStatus": "NA",
              "type": 32,
              "connectorTypes": [
                {
                  "id": 32,
                  "key": "TYPE_2-ATTACHED_CABLE",
                  "operatorId": "ROVVsBU6mPxQJ605fBK52w==",
                  "deprecated": false,
                  "name": "Type 2",
                  "norm": "IEC 62196 Type 2 (Mennekes)",
                  "maxPower": 43,
                  "power": 22,
                  "voltage": 230,
                  "ampere": 32,
                  "acSingle": false,
                  "acThree": true,
                  "dc": false,
                  "cable": true
                }
              ],
              "currentType": "AC_THREE_PHASES",
              "voltage": 230,
              "ampere": 32,
              "power": 22,
              "remoteCharging": true
            }
          ]
        }
      ],
      "summaryOfConnectorTypeIds": [
        32
      ],
      "maxNominalPower": 22,
      "numberOfChargingPoint": 1,
      "reliabilityScore": 25
    },
```
📝 **Notes**

- The bounding box must be defined in **decimal degrees (WGS84).**

- It is often used as an **alternative to** `coordinate` + `radius`, especially for large routes or custom-shaped areas.

- If both `bbox` and `coordinate` are provided, behavior may depend on implementation — prefer using **only one spatial filter** per request for clarity.

- The field is named `bbox`. The specification's descriptions call it `boundingBox`, a name this service does not read: measured on production, a request whose only area is a `boundingBox` answers `400 CHARGING_STATION_FAILED` "Missing coordinate(s)", and the same box as `bbox` answers `200`.
---
<a name="chargingstation_connectorIdFilters_tutorial"></a>
## 🔌 connectorIdFilters – Filter by connector type IDs
✅ **Use case**

You want to **restrict the results to only show charging stations** that support specific **connector types**, such as `TYPE_2`, `CCS`, or `CHADEMO`.

💡 **What it does**

The connectorIdFilters parameter lets you filter the list of charging stations by their connector type.
Each connector type is represented by a **numeric ID** (e.g., `32` for Type 2, `36` for CHAdeMO, `38` for Type 2 Combo (CCS)), listed by `GET /bgis/service/chargingstation/connector/list/1.0`. IDs `1` and `2` are deprecated attached-cable types, not Type 2 and CHAdeMO: measured on production, `[1, 2]` finds nothing within 1 000 m of the example below.
Only the charging points that include at least one connector matching one of the given IDs will be returned.

🔧 **How to enable**

Add the `connectorIdFilters` field to your request as an array of integers:
```
"connectorIdFilters": [36, 38]
```
📦 **Example**
```
{
  "geoserver": "osm",
  "providers": ["ecoMovement"],
  "mode": "LOCAL_OR_REMOTE",
  "options": ["PATH_POINT"],
  "radius": 1000,
  "coordinate": {
    "lon": 2.3412,
    "lat": 48.85693
  },
  "connectorIdFilters": [35]
}
```
**Response**
```
{
  "pools": [
    {
      "providerName": "ecoMovement",
      "providerMode": "LOCAL",
      "id": "219b90de-ccf6-11eb-8eb9-42010a840003",
      "sourceProvider": "Belib'",
      "updateDate": 1753672005588,
      "brand": "Belib'",
      "nameOfPool": "Paris | Rue de L'Amiral De Coligny 1",
      "accessibility": "PUBLIC",
      "availabilityStatus": "OUT_OF_ORDER",
      "longitude": 2.34062067,
      "latitude": 48.86024528,
      "countryCode": "FRA",
      "country": "FRA",
      "postalCode": "75001",
      "city": "1er Arrondissement",
      "street": "1 Rue de l'Amiral de Coligny",
      "siteCategory": "ON_STREET",
      "phoneNumber": "+(33)-(1)-85169402",
      "open24x7": true,
      "chargingStations": [
        {
          "nature": "VGROUP",
          "availabilityStatus": "OUT_OF_ORDER",
          "authenticationModes": [
            "RFID_BADGE"
          ],
          "paymentModes": [
            "OPERATOR_CONTRACT",
            "CREDIT_CARD"
          ],
          "chargePasses": [
            {
              "title": "Ecotap",
              "networkName": "Ecotap"
            },
            {
              "title": "Shell Recharge",
              "networkName": "Shell Recharge"
            },
            {
              "title": "EnBW mobility+",
              "networkName": "EnBW"
            },
            {
              "title": "Nissan Charge",
              "networkName": "Nissan"
            },
            {
              "title": "EVBox Charge",
              "networkName": "EVBox"
            },
            {
              "title": "EWE Go",
              "networkName": "EWE Go"
            },
            {
              "title": "Virta",
              "networkName": "Virta"
            },
            {
              "title": "EinfachStromLaden",
              "networkName": "Maingau Energie"
            },
            {
              "title": "Freshmile Pass",
              "networkName": "Freshmile"
            },
            {
              "title": "BMW Charging",
              "networkName": "BMW"
            },
            {
              "title": "MyToyota",
              "networkName": "Toyota"
            },
            {
              "title": "Volvo",
              "networkName": "Volvo"
            },
            {
              "title": "Volkswagen App",
              "networkName": "Volkswagen"
            },
            {
              "title": "Kia Charge",
              "networkName": "Kia Hypercharge "
            },
            {
              "title": "Alizé Charge",
              "networkName": "Alizé Liberté"
            },
            {
              "title": "Mobilize charge pass",
              "networkName": "Renault"
            },
            {
              "title": "Audi e-tron Charging Service",
              "networkName": "AUDI"
            },
            {
              "title": "Chargemap Pass",
              "networkName": "Chargemap"
            },
            {
              "title": "Mercedes",
              "networkName": "Mercedes"
            },
            {
              "title": "Mobiflow",
              "networkName": "Mobiflow"
            },
            {
              "title": "Métropole Rouen Normandie",
              "networkName": "Métropole Rouen Normandie"
            },
            {
              "title": "Charge myHyundai",
              "networkName": "Hyundai"
            },
            {
              "title": "Corpay Card",
              "networkName": "Corpay"
            },
            {
              "title": "ChargeNow Laadkaart",
              "networkName": "Digital Charging Solutions"
            },
            {
              "title": "Octopus Electroverse",
              "networkName": "Octopus Electroverse"
            },
            {
              "title": "JLR Charging",
              "networkName": "JLR Charging"
            },
            {
              "title": "Tap Electric",
              "networkName": "Tap Electric"
            },
            {
              "title": "Elli",
              "networkName": "Elli"
            },
            {
              "title": "MyŠkoda",
              "networkName": "Škoda"
            },
            {
              "title": "SEAT Easy Charging app",
              "networkName": "Seat"
            },
            {
              "title": "CHARGE&FUEL CARD ",
              "networkName": "LOGPAY"
            },
            {
              "title": "Ulys",
              "networkName": "Ulys"
            },
            {
              "title": "D'Ieteren Energy",
              "networkName": "EDI"
            },
            {
              "title": "Lexus Electrified",
              "networkName": "Lexus"
            },
            {
              "title": "Subaru care",
              "networkName": "Subaru"
            },
            {
              "title": "Plugsurfing",
              "networkName": "Plugsurfing"
            },
            {
              "title": "Polestar Charge",
              "networkName": "Polestar"
            }
          ],
          "bookable": false,
          "chargingPoints": [
            {
              "id": "CU-B90-0102-001-1",
              "operatorId": "FR*V75*E9001*02*1",
              "availabilityStatus": "OUT_OF_ORDER",
              "type": 35,
              "connectorTypes": [
                {
                  "id": 35,
                  "key": "TYPE_3C",
                  "operatorId": "2",
                  "deprecated": false,
                  "name": "Type 3C",
                  "norm": "IEC 62196 Type 3C (Scame)",
                  "maxPower": 22,
                  "power": 22,
                  "voltage": 230,
                  "ampere": 32,
                  "acSingle": false,
                  "acThree": true,
                  "dc": false,
                  "cable": false
                }
              ],
              "currentType": "DC",
              "voltage": 500,
              "ampere": 44,
              "power": 22,
              "remoteCharging": true
            }
          ]
        },
```
📝 **Notes**

- The list of valid connector IDs depends on the provider or internal configuration; `GET /bgis/service/chargingstation/connector/list/1.0` returns it. Common examples include:

  - `31` = Type 1

  - `32` = Type 2

  - `35` = Type 3C

  - `36` = CHAdeMO

  - `38` = Type 2 Combo (CCS)

- You can combine this filter with `filters` or `options` to refine the results even further.

- Stations with **no matching connector types** will be excluded from the result.

---

<a name="chargingstation_coordinate_tutorial"></a>

## 📍 coordinate – Define the search center using a single point
✅ **Use case**

You want to **search for charging stations around a specific location**, such as a city center, a GPS location, or the current position of a vehicle.

💡 **What it does**

The `coordinate` parameter allows you to define a **central point** for the charging station search.
When combined with the `radius` parameter, it creates a circular search area around the specified location.

🔧 **How to enable**

Add a `coordinate` object to your request with `lat` and `lon` values:

```
"coordinate": {
  "lat": 48.85693,
  "lon": 2.3412
}
```
📦 **Example**
```
{
  "geoserver": "osm",
  "providers": ["ecoMovement"],
  "mode": "LOCAL_OR_REMOTE",
  "options": ["PATH_POINT"],
  "radius": 1000,
  "coordinate": {
    "lat": 48.85693,
    "lon": 2.3412
  }
}
```
**Response**
```
{
  "pools": [
    {
      "providerName": "ecoMovement",
      "providerMode": "LOCAL",
      "id": "8f709a26-466d-11e9-8601-42010a840003",
      "sourceProvider": "Tesla Destination",
      "updateDate": 1753672005588,
      "brand": "Tesla Destination",
      "nameOfPool": "Tesla Destination Charger Relais Christine",
      "accessibility": "RESTRICTED",
      "availabilityStatus": "NA",
      "longitude": 2.34014219,
      "latitude": 48.8543694,
      "countryCode": "FRA",
      "country": "FRA",
      "postalCode": "75006",
      "city": "6e Arrondissement",
      "street": "3 Rue Christine",
      "siteCategory": "ON_STREET",
      "phoneNumber": "+(33)-(9)-70730850",
      "chargingStations": [
        {
          "nature": "VGROUP",
          "availabilityStatus": "NA",
          "chargePasses": [
            {
              "title": "Tesla",
              "networkName": "Tesla"
            }
          ],
          "bookable": false,
          "chargingPoints": [
            {
              "id": "491848_1",
              "availabilityStatus": "NA",
              "type": 32,
              "connectorTypes": [
                {
                  "id": 32,
                  "key": "TYPE_2-ATTACHED_CABLE",
                  "operatorId": "491848_1_0",
                  "deprecated": false,
                  "name": "Type 2",
                  "norm": "IEC 62196 Type 2 (Mennekes)",
                  "maxPower": 43,
                  "power": 11,
                  "voltage": 230,
                  "ampere": 16,
                  "acSingle": false,
                  "acThree": true,
                  "dc": false,
                  "cable": true
                }
              ],
              "currentType": "AC_THREE_PHASES",
              "voltage": 230,
              "ampere": 16,
              "power": 11
            }
          ]
        },
        {
          "nature": "VGROUP",
          "availabilityStatus": "NA",
          "chargePasses": [
            {
              "title": "Tesla",
              "networkName": "Tesla"
            }
          ],
          "bookable": false,
          "chargingPoints": [
            {
              "id": "491848_0",
              "availabilityStatus": "NA",
              "type": 32,
              "connectorTypes": [
                {
                  "id": 32,
                  "key": "TYPE_2-ATTACHED_CABLE",
                  "operatorId": "491848_0_0",
                  "deprecated": false,
                  "name": "Type 2",
                  "norm": "IEC 62196 Type 2 (Mennekes)",
                  "maxPower": 43,
                  "power": 11,
                  "voltage": 230,
                  "ampere": 16,
                  "acSingle": false,
                  "acThree": true,
                  "dc": false,
                  "cable": true
                }
              ],
              "currentType": "AC_THREE_PHASES",
              "voltage": 230,
              "ampere": 16,
              "power": 11
            }
          ]
        },
        {
          "nature": "VGROUP",
          "availabilityStatus": "NA",
          "chargePasses": [
            {
              "title": "Tesla",
              "networkName": "Tesla"
            }
          ],
          "bookable": false,
          "chargingPoints": [
            {
              "id": "491848_2",
              "availabilityStatus": "NA",
              "type": 32,
              "connectorTypes": [
                {
                  "id": 32,
                  "key": "TYPE_2-ATTACHED_CABLE",
                  "operatorId": "491848_2_0",
                  "deprecated": false,
                  "name": "Type 2",
                  "norm": "IEC 62196 Type 2 (Mennekes)",
                  "maxPower": 43,
                  "power": 11,
                  "voltage": 230,
                  "ampere": 16,
                  "acSingle": false,
                  "acThree": true,
                  "dc": false,
                  "cable": true
                }
              ],
              "currentType": "AC_THREE_PHASES",
              "voltage": 230,
              "ampere": 16,
              "power": 11
            }
          ]
        }
      ],
      "summaryOfConnectorTypeIds": [
        32
      ],
      "maxNominalPower": 11,
      "numberOfChargingPoint": 3
    },
    {
      "providerName": "ecoMovement",
      "providerMode": "LOCAL",
      "id": "8dbd7abe-c2d8-11ed-90d8-42010aa40fc0",
      "sourceProvider": "Q-Park",
      "updateDate": 1753672005588,
      "brand": "Q-Park",
      "nameOfPool": "QPARK - PARIS - RIVOLI PONT NEUF - 019",
      "accessibility": "RESTRICTED",
      "availabilityStatus": "NA",
      "longitude": 2.34376881,
      "latitude": 48.85944148,
      "countryCode": "FRA",
      "country": "FRA",
      "postalCode": "75001",
      "city": "Paris",
      "street": "2 Rue Boucher",
      "siteCategory": "BUILDING_PARKING",
      "phoneNumber": "",
      "chargingStations": [
        {
          "nature": "VGROUP",
          "availabilityStatus": "NA",
          "chargePasses": [
            {
              "title": "Ecotap",
              "networkName": "Ecotap"
            },
            {
              "title": "Shell Recharge",
              "networkName": "Shell Recharge"
            },
            ...
```
📝 **Notes**

- The `coordinate` must be expressed in **WGS84 decimal degrees.**

- The field is typically used with the `radius` parameter to limit the distance.

- If you use both `coordinate` and `bbox` or `corridor`, only one will usually be applied — check the server behavior if combining.

---
<a name="chargingstation_corridor_tutorial"></a>

## 🚗 corridor – Search along a custom route or path
✅ **Use case**

You want to **search for charging stations along a route**, such as a road trip path, a delivery line, or a predefined travel corridor — instead of using a single center point or a rectangular area.

💡 **What it does**

The `corridor` parameter allows you to specify a **list of coordinates** that represent a custom path (e.g., a polyline following a road).
The system will search for charging stations **near this corridor**, using a buffer defined by the `radius` parameter.

🔧 **How to enable**

Add a `corridor` field with an array of `Coordinate` objects (each containing `lat` and `lon`), and specify a `radius`.
```
"corridor": [
  { "lat": 48.85693, "lon": 2.3412 },
  { "lat": 49.0097,  "lon": 2.5479 }
],
"radius": 1000
```

📦 **Example**
```
{
  "geoserver": "osm",
  "providers": ["ecoMovement"],
  "mode": "LOCAL_OR_REMOTE",
  "options": ["PATH_POINT"],
  "radius": 1000,
  "corridor": [
    { "lat": 48.85693, "lon": 2.3412 },
    { "lat": 49.0097,  "lon": 2.5479 }
  ]
}
```
**Response**
```
{
  "pools": [
    {
      "providerName": "ecoMovement",
      "providerMode": "LOCAL",
      "id": "44c7ede4-376d-11ee-a9d5-42010aa40fc0",
      "sourceProvider": "Bouygues Energies",
      "updateDate": 1753672005588,
      "brand": "Bouygues Energies",
      "nameOfPool": "CDG - Parking Baïkal",
      "accessibility": "RESTRICTED",
      "availabilityStatus": "NA",
      "longitude": 2.55473378,
      "latitude": 49.01018122,
      "countryCode": "FRA",
      "country": "FRA",
      "postalCode": "93290",
      "city": "Tremblay-en-France",
      "street": "Rue Louis Couhé",
      "siteCategory": "ON_STREET",
      "phoneNumber": "+33-(8)-05021480",
      "chargingStations": [
        {
          "nature": "VGROUP",
          "availabilityStatus": "NA",
          "chargePasses": [
            {
              "title": "Ecotap",
              "networkName": "Ecotap"
            },
            {
              "title": "Shell Recharge",
              "networkName": "Shell Recharge"
            },
```
📝 **Notes**

- The `corridor` must contain **at least two coordinates** to define a path.

- Used with the `radius` parameter to define how wide the corridor search should be.

- Ideal for **route-based charging plans** or **logistics optimization**.

- Do not combine with `coordinate` or `bbox` unless the API specifically supports it.
---
<a name="chargingstation_filters_tutorial"></a>
## 🧲 filters – Apply advanced filtering to returned charging points
✅ **Use case**

You want to **precisely control which charging stations are returned**, based on complex rules like brand, availability, power, cost, or even operator preferences.

💡 **What it does**

The `filters` parameter allows you to apply **define one or more filter patterns**.
Each pattern **keeps only** the charging stations that match specific criteria: the others are **excluded**. A pattern that ends with an **action** (`-> prefCoeff=…;`) excludes nothing under `filtersVersion` 1, the default; under `filtersVersion` 2 it excludes too.
You can also **combine filters**, use **OR logic**, and apply **actions** like `prefCoeff`.

🔧 **How to enable**

Each filter is a **string** following this structure:
```
"filters": [
    "pool.brand == Tesla"
  ]
```

📘 For detailed syntax and supported fields, see the [Charging Station Filter Glossary](index.html#page-chargingstation-filter-v1.md#filtersparameter) — and, with `filtersVersion` 2, [its version 2 page](index.html#page-chargingstation-filter-v2.md).

📦 **Examples**
```
{
  "geoserver": "osm",
  "providers": ["ecoMovement"],
  "mode": "LOCAL_OR_REMOTE",
  "options": ["PATH_POINT"],
  "radius": 500,
  "coordinate": {
    "lat": 48.85693,
    "lon": 2.3412
  },
  "filters": [
    "station.available == true"
  ]
}
```
**Response**
```
{
  "pools": [
    {
      "providerName": "ecoMovement",
      "providerMode": "LOCAL",
      "id": "8f709a26-466d-11e9-8601-42010a840003",
      "sourceProvider": "Tesla Destination",
      "updateDate": 1753672005588,
      "brand": "Tesla Destination",
      "nameOfPool": "Tesla Destination Charger Relais Christine",
      "accessibility": "RESTRICTED",
      "availabilityStatus": "NA",
      "longitude": 2.34014219,
      "latitude": 48.8543694,
      "countryCode": "FRA",
      "country": "FRA",
      "postalCode": "75006",
      "city": "6e Arrondissement",
      "street": "3 Rue Christine",
      "siteCategory": "ON_STREET",
      "phoneNumber": "+(33)-(9)-70730850",
      "chargingStations": [
        {
          "nature": "VGROUP",
          "availabilityStatus": "NA",
          "chargePasses": [
            {
              "title": "Tesla",
              "networkName": "Tesla"
            }
          ],
          "bookable": false,
          "chargingPoints": [
            {
              "id": "491848_1",
              "availabilityStatus": "NA",
              "type": 32,
              "connectorTypes": [
                {
                  "id": 32,
                  "key": "TYPE_2-ATTACHED_CABLE",
                  "operatorId": "491848_1_0",
                  "deprecated": false,
                  "name": "Type 2",
                  "norm": "IEC 62196 Type 2 (Mennekes)",
                  "maxPower": 43,
                  "power": 11,
                  "voltage": 230,
                  "ampere": 16,
                  "acSingle": false,
                  "acThree": true,
                  "dc": false,
                  "cable": true
                }
              ],
              "currentType": "AC_THREE_PHASES",
              "voltage": 230,
              "ampere": 16,
              "power": 11
            }
          ]
        },
        {
          "nature": "VGROUP",
          "availabilityStatus": "NA",
          "chargePasses": [
            {
              "title": "Tesla",
              "networkName": "Tesla"
            }
          ],
          "bookable": false,
          "chargingPoints": [
            {
              "id": "491848_0",
              "availabilityStatus": "NA",
              "type": 32,
              "connectorTypes": [
                {
                  "id": 32,
                  "key": "TYPE_2-ATTACHED_CABLE",
                  "operatorId": "491848_0_0",
                  "deprecated": false,
                  "name": "Type 2",
                  "norm": "IEC 62196 Type 2 (Mennekes)",
                  "maxPower": 43,
                  "power": 11,
                  "voltage": 230,
                  "ampere": 16,
                  "acSingle": false,
                  "acThree": true,
                  "dc": false,
                  "cable": true
                }
              ],
              "currentType": "AC_THREE_PHASES",
              "voltage": 230,
              "ampere": 16,
              "power": 11
            }
          ]
        },
        {
          "nature": "VGROUP",
          "availabilityStatus": "NA",
          "chargePasses": [
            {
              "title": "Tesla",
              "networkName": "Tesla"
            }
          ],
          "bookable": false,
          "chargingPoints": [
            {
              "id": "491848_2",
              "availabilityStatus": "NA",
              "type": 32,
              "connectorTypes": [
                {
                  "id": 32,
                  "key": "TYPE_2-ATTACHED_CABLE",
                  "operatorId": "491848_2_0",
                  "deprecated": false,
                  "name": "Type 2",
                  "norm": "IEC 62196 Type 2 (Mennekes)",
                  "maxPower": 43,
                  "power": 11,
                  "voltage": 230,
                  "ampere": 16,
                  "acSingle": false,
                  "acThree": true,
                  "dc": false,
                  "cable": true
                }
              ],
              "currentType": "AC_THREE_PHASES",
              "voltage": 230,
              "ampere": 16,
              "power": 11
            }
          ]
        }
      ],
      "summaryOfConnectorTypeIds": [
        32
      ],
      "maxNominalPower": 11,
      "numberOfChargingPoint": 3
    },
    {
      "providerName": "ecoMovement",
      "providerMode": "LOCAL",
      "id": "8dbd7abe-c2d8-11ed-90d8-42010aa40fc0",
      "sourceProvider": "Q-Park",
      "updateDate": 1753672005588,
      "brand": "Q-Park",
      "nameOfPool": "QPARK - PARIS - RIVOLI PONT NEUF - 019",
      "accessibility": "RESTRICTED",
      "availabilityStatus": "NA",
      "longitude": 2.34376881,
      "latitude": 48.85944148,
      "countryCode": "FRA",
      "country": "FRA",
      "postalCode": "75001",
      "city": "Paris",
      "street": "2 Rue Boucher",
      "siteCategory": "BUILDING_PARKING",
      "phoneNumber": "",
      "chargingStations": [
        {
          "nature": "VGROUP",
          "availabilityStatus": "NA",
          "chargePasses": [
            {
              "title": "Ecotap",
              "networkName": "Ecotap"
            },
            {
              "title": "Shell Recharge",
              "networkName": "Shell Recharge"
            },
```
📝 **Notes**

- Filters are combined with **AND logic** by default.

- Use `||` to apply **OR logic** between multiple filter patterns.

- A pattern **without an action excludes** every station it does not match: measured on production, `"pool.brand /= /.*Tesla.*/"` within 500 m of this coordinate keeps 1 pool of 11.

- `station.available == true`, the example above, also keeps stations whose status is unknown (`NA`), such as the Tesla pool in the response: measured, it keeps all 11 pools, where `"station.availabilityStatus == IN_SERVICE_FREE"` keeps 7.

- Under `filtersVersion` 1, an action like `prefCoeff` does **not exclude** stations: `"pool.brand /= /.*Tesla.*/ -> prefCoeff=5.0;"` keeps all 11 pools. In this search it changed neither the pools returned nor their order (measured with `prefCoeff=10.0` and `0.1`). Under `filtersVersion` 2 the same filter keeps 1 pool.

- Improperly formatted filters are **not ignored**. Under version 1 the search answers `400 CHARGING_STATION_FAILED` and names the filter: an action without its trailing `;` gives "Invalid format of charging station filter with value …", a field the filter language does not know (`pool.nameOfPool`) "Unsupported filter field: 'nameOfPool'". Under version 2 an unknown field is accepted and ignored: `200`, nothing filtered.
---
<a name="chargingstation_filtersVersion_tutorial"></a>

## 🔢 filtersVersion – Choose the version of the filter language
✅ **Use case**

You need a filter that only the newer implementation of the `filters` language evaluates, and you accept how that version treats actions and unknown fields.

💡 **What it does**

The `filtersVersion` parameter selects the implementation that evaluates `filters`: `1` (the default) or `2`. Measured on production, version 2 differs from version 1 in two ways:

- An **action excludes** what it does not match, like a plain pattern.

- A **field it does not know is ignored** (`200`, nothing filtered), where version 1 refuses it (`400`).

The syntax of each version: [version 1](index.html#page-chargingstation-filter-v1.md#filtersparameter), [version 2](index.html#page-chargingstation-filter-v2.md).

🔧 **How to enable**

Send the version as a **number**:
```
"filtersVersion": 2
```
The specification shows this field as a base64 string (`format: byte`); the service reads a number, and `"Ag=="` answers `400 INVALID_ARGUMENT` "Invalid request".

📦 **Example**
```
{
  "geoserver": "osm",
  "providers": ["ecoMovement"],
  "mode": "LOCAL_OR_REMOTE",
  "options": ["PATH_POOL"],
  "radius": 500,
  "coordinate": {
    "lat": 48.85693,
    "lon": 2.3412
  },
  "filtersVersion": 2,
  "filters": [
    "pool.brand /= /.*Tesla.*/ -> prefCoeff=5.0;"
  ]
}
```
**Response**
```
{
  "pools": [
    {
      "providerName": "ecoMovement",
      "providerMode": "LOCAL",
      "id": "8f709a26-466d-11e9-8601-42010a840003",
      "sourceProvider": "Tesla Destination",
      "updateDate": 1790566612731,
      "brand": "Tesla Destination",
      "nameOfPool": "Tesla Destination Charger Relais Christine",
      "accessibility": "RESTRICTED",
      "availabilityStatus": "NA",
      "longitude": 2.34014219,
      "latitude": 48.8543694,
      "countryCode": "FRA",
      "country": "FRA",
      "postalCode": "75006",
      "city": "Paris",
      "street": "3 Rue Christine",
      "siteCategory": "ON_STREET",
      "phoneNumber": "+(33)-(9)-70730850",
      "timeZone": "Europe/Paris",
      "open24x7": true,
      "summaryOfConnectorTypeIds": [
        32
      ],
      "maxNominalPower": 11,
      "numberOfChargingPoint": 3
    }
  ]
}
```
📝 **Notes**

- The same request without `filtersVersion` returns all 11 pools: under version 1, the action does not exclude.

- Leave the field out unless you need version 2: under version 2, a misspelt field filters nothing, in silence.
---

<a name="chargingstation_geoserver_tutorial"></a>

## 🗺️ geoserver – Select the map data source for location processing
✅ **Use case**

You want to define **which map or geospatial provider** the charging station service should use to interpret coordinates, compute distances, or return addresses.

💡 **What it does**

The `geoserver` parameter lets you choose the **underlying geospatial engine** used by the service. This can affect:

- Address resolution (reverse geocoding),

- Map-matching logic,

- Distance and routing precision.

Each geoserver may provide **different data coverage, freshness, or licensing.** Common values are `"default"` or `"osm"` (OpenStreetMap-based), but custom names may be available in your environment.

🔧 **How to enable**

Add the `geoserver` field to your request with the desired string value:
```
"geoserver": "osm"
```
📦 **Example**
```
{
  "geoserver": "osm",
  "providers": ["ecoMovement"],
  "mode": "LOCAL_OR_REMOTE",
  "radius": 500,
  "coordinate": {
    "lat": 48.85693,
    "lon": 2.3412
  },
  "options": ["PATH_POINT"]
}
```

**Response**
```
{
  "pools": [
    {
      "providerName": "ecoMovement",
      "providerMode": "LOCAL",
      "id": "8f709a26-466d-11e9-8601-42010a840003",
      "sourceProvider": "Tesla Destination",
      "updateDate": 1753672005588,
      "brand": "Tesla Destination",
      "nameOfPool": "Tesla Destination Charger Relais Christine",
      "accessibility": "RESTRICTED",
      "availabilityStatus": "NA",
      "longitude": 2.34014219,
      "latitude": 48.8543694,
      "countryCode": "FRA",
      "country": "FRA",
      "postalCode": "75006",
      "city": "6e Arrondissement",
      "street": "3 Rue Christine",
      "siteCategory": "ON_STREET",
      "phoneNumber": "+(33)-(9)-70730850",
      "chargingStations": [
        {
          "nature": "VGROUP",
          "availabilityStatus": "NA",
          "chargePasses": [
            {
              "title": "Tesla",
              "networkName": "Tesla"
            }
          ],
          "bookable": false,
          "chargingPoints": [
            {
              "id": "491848_1",
              "availabilityStatus": "NA",
              "type": 32,
              "connectorTypes": [
                {
                  "id": 32,
                  "key": "TYPE_2-ATTACHED_CABLE",
                  "operatorId": "491848_1_0",
                  "deprecated": false,
                  "name": "Type 2",
                  "norm": "IEC 62196 Type 2 (Mennekes)",
                  "maxPower": 43,
                  "power": 11,
                  "voltage": 230,
                  "ampere": 16,
                  "acSingle": false,
                  "acThree": true,
                  "dc": false,
                  "cable": true
                }
              ],
              "currentType": "AC_THREE_PHASES",
              "voltage": 230,
              "ampere": 16,
              "power": 11
            }
          ]
        },
        {
          "nature": "VGROUP",
          "availabilityStatus": "NA",
          "chargePasses": [
            {
              "title": "Tesla",
              "networkName": "Tesla"
            }
          ],
          "bookable": false,
          "chargingPoints": [
            {
              "id": "491848_0",
              "availabilityStatus": "NA",
              "type": 32,
              "connectorTypes": [
                {
                  "id": 32,
                  "key": "TYPE_2-ATTACHED_CABLE",
                  "operatorId": "491848_0_0",
                  "deprecated": false,
                  "name": "Type 2",
                  "norm": "IEC 62196 Type 2 (Mennekes)",
                  "maxPower": 43,
                  "power": 11,
                  "voltage": 230,
                  "ampere": 16,
                  "acSingle": false,
                  "acThree": true,
                  "dc": false,
                  "cable": true
                }
              ],
              "currentType": "AC_THREE_PHASES",
              "voltage": 230,
              "ampere": 16,
              "power": 11
            }
          ]
        },
        {
          "nature": "VGROUP",
          "availabilityStatus": "NA",
          "chargePasses": [
            {
              "title": "Tesla",
              "networkName": "Tesla"
            }
          ],
          "bookable": false,
          "chargingPoints": [
            {
              "id": "491848_2",
              "availabilityStatus": "NA",
              "type": 32,
              "connectorTypes": [
                {
                  "id": 32,
                  "key": "TYPE_2-ATTACHED_CABLE",
                  "operatorId": "491848_2_0",
                  "deprecated": false,
                  "name": "Type 2",
                  "norm": "IEC 62196 Type 2 (Mennekes)",
                  "maxPower": 43,
                  "power": 11,
                  "voltage": 230,
                  "ampere": 16,
                  "acSingle": false,
                  "acThree": true,
                  "dc": false,
                  "cable": true
                }
              ],
              "currentType": "AC_THREE_PHASES",
              "voltage": 230,
              "ampere": 16,
              "power": 11
            }
          ]
        }
      ],
      "summaryOfConnectorTypeIds": [
        32
      ],
      "maxNominalPower": 11,
      "numberOfChargingPoint": 3
    },
    {
      "providerName": "ecoMovement",
      "providerMode": "LOCAL",
      "id": "8dbd7abe-c2d8-11ed-90d8-42010aa40fc0",
      "sourceProvider": "Q-Park",
      "updateDate": 1753672005588,
      "brand": "Q-Park",
      "nameOfPool": "QPARK - PARIS - RIVOLI PONT NEUF - 019",
      "accessibility": "RESTRICTED",
      "availabilityStatus": "NA",
      "longitude": 2.34376881,
      "latitude": 48.85944148,
      "countryCode": "FRA",
      "country": "FRA",
      "postalCode": "75001",
      "city": "Paris",
      "street": "2 Rue Boucher",
      "siteCategory": "BUILDING_PARKING",
      "phoneNumber": "",
      "chargingStations": [
        {
          "nature": "VGROUP",
          "availabilityStatus": "NA",
          "chargePasses": [
            {
              "title": "Ecotap",
              "networkName": "Ecotap"
            },
            {
              "title": "Shell Recharge",
              "networkName": "Shell Recharge"
            },
```
📝 **Notes**

- If omitted, the system will use the **default configured geoserver.**

- Ensure that the selected `geoserver` is compatible with your current environment or provider capabilities.
---
<a name="chargingstation_language_tutorial"></a>

## 🌐 language – Define the language used for address formatting
✅ **Use case**

You want the **station addresses or location names** in the API response to be returned in a specific **language**, such as French, English, or German — depending on the user’s locale or app language.

💡 **What it does**

The `language` parameter tells the system to perform **reverse geocoding and address lookups** using the specified **language code** (e.g., `"fr"` for French, `"en"` for English).
This affects how address fields like `street`, `streetNumber`, `postalCode`, `city`, or `country` are returned in the response.

🔧 **How to enable**

Add the `language` field to your request using a standard language code (ISO 639-1):
```
"language": "fr"
```
📦 **Example**
```
{
  "geoserver": "osm",
  "providers": ["ecoMovement"],
  "mode": "LOCAL_OR_REMOTE",
  "radius": 1000,
  "coordinate": {
    "lat": 48.85693,
    "lon": 2.3412
  },
  "language": "fr",
  "options": ["PATH_POINT"]
}
```
**Response**
```
{
  "pools": [
    {
      "providerName": "ecoMovement",
      "providerMode": "LOCAL",
      "id": "8f709a26-466d-11e9-8601-42010a840003",
      "sourceProvider": "Tesla Destination",
      "updateDate": 1753672005588,
      "brand": "Tesla Destination",
      "nameOfPool": "Tesla Destination Charger Relais Christine",
      "accessibility": "RESTRICTED",
      "availabilityStatus": "NA",
      "longitude": 2.34014219,
      "latitude": 48.8543694,
      "countryCode": "FRA",
      "country": "FRA",
      "postalCode": "75006",
      "city": "6e Arrondissement",
      "street": "3 Rue Christine",
      "siteCategory": "ON_STREET",
      "phoneNumber": "+(33)-(9)-70730850",
      "chargingStations": [
        {
          "nature": "VGROUP",
          "availabilityStatus": "NA",
          "chargePasses": [
            {
              "title": "Tesla",
              "networkName": "Tesla"
            }
          ],
          "bookable": false,
          "chargingPoints": [
            {
              "id": "491848_1",
              "availabilityStatus": "NA",
              "type": 32,
              "connectorTypes": [
                {
                  "id": 32,
                  "key": "TYPE_2-ATTACHED_CABLE",
                  "operatorId": "491848_1_0",
                  "deprecated": false,
                  "name": "Type 2",
                  "norm": "IEC 62196 Type 2 (Mennekes)",
                  "maxPower": 43,
                  "power": 11,
                  "voltage": 230,
                  "ampere": 16,
                  "acSingle": false,
                  "acThree": true,
                  "dc": false,
                  "cable": true
                }
              ],
              "currentType": "AC_THREE_PHASES",
              "voltage": 230,
              "ampere": 16,
              "power": 11
            }
          ]
        },
        {
          "nature": "VGROUP",
          "availabilityStatus": "NA",
          "chargePasses": [
            {
              "title": "Tesla",
              "networkName": "Tesla"
            }
          ],
          "bookable": false,
          "chargingPoints": [
            {
              "id": "491848_0",
              "availabilityStatus": "NA",
              "type": 32,
              "connectorTypes": [
                {
                  "id": 32,
                  "key": "TYPE_2-ATTACHED_CABLE",
                  "operatorId": "491848_0_0",
                  "deprecated": false,
                  "name": "Type 2",
                  "norm": "IEC 62196 Type 2 (Mennekes)",
                  "maxPower": 43,
                  "power": 11,
                  "voltage": 230,
                  "ampere": 16,
                  "acSingle": false,
                  "acThree": true,
                  "dc": false,
                  "cable": true
                }
              ],
              "currentType": "AC_THREE_PHASES",
              "voltage": 230,
              "ampere": 16,
              "power": 11
            }
          ]
        },
        {
          "nature": "VGROUP",
          "availabilityStatus": "NA",
          "chargePasses": [
            {
              "title": "Tesla",
              "networkName": "Tesla"
            }
          ],
          "bookable": false,
          "chargingPoints": [
            {
              "id": "491848_2",
              "availabilityStatus": "NA",
              "type": 32,
              "connectorTypes": [
                {
                  "id": 32,
                  "key": "TYPE_2-ATTACHED_CABLE",
                  "operatorId": "491848_2_0",
                  "deprecated": false,
                  "name": "Type 2",
                  "norm": "IEC 62196 Type 2 (Mennekes)",
                  "maxPower": 43,
                  "power": 11,
                  "voltage": 230,
                  "ampere": 16,
                  "acSingle": false,
                  "acThree": true,
                  "dc": false,
                  "cable": true
                }
              ],
              "currentType": "AC_THREE_PHASES",
              "voltage": 230,
              "ampere": 16,
              "power": 11
            }
          ]
        }
      ],
      "summaryOfConnectorTypeIds": [
        32
      ],
      "maxNominalPower": 11,
      "numberOfChargingPoint": 3
    },
    {
      "providerName": "ecoMovement",
      "providerMode": "LOCAL",
      "id": "8dbd7abe-c2d8-11ed-90d8-42010aa40fc0",
      "sourceProvider": "Q-Park",
      "updateDate": 1753672005588,
      "brand": "Q-Park",
      "nameOfPool": "QPARK - PARIS - RIVOLI PONT NEUF - 019",
      "accessibility": "RESTRICTED",
      "availabilityStatus": "NA",
      "longitude": 2.34376881,
      "latitude": 48.85944148,
      "countryCode": "FRA",
      "country": "FRA",
      "postalCode": "75001",
      "city": "Paris",
      "street": "2 Rue Boucher",
      "siteCategory": "BUILDING_PARKING",
      "phoneNumber": "",
      "chargingStations": [
        {
          "nature": "VGROUP",
          "availabilityStatus": "NA",
          "chargePasses": [
            {
              "title": "Ecotap",
              "networkName": "Ecotap"
            },
            {
              "title": "Shell Recharge",
              "networkName": "Shell Recharge"
            },
```
📝 **Notes**

- Supported values follow **ISO 639-1**: `"fr"`, `"en"`, `"de"`, `"es"`, etc.

- If omitted, the default language (usually `"en"`) will be used.

- The accuracy of translation depends on the underlying geoserver and data availability.
---
<a name="chargingstation_maxPoolResult_tutorial"></a>

## 🔢 maxPoolResult – Limit the number of charging pools returned
✅ **Use case**

You want to **restrict the number of charging station pools** returned by the API — for performance reasons, pagination, or to reduce clutter on a map.

💡 **What it does**

The `maxPoolResult` parameter sets an upper limit on the **number of** `ChargingStationPool` **objects** the API will return **for each provider** listed in `providers`.

This is useful when working with large search areas or displaying results on devices with limited performance.

🔧 **How to enable**

Add the `maxPoolResult` field to your request with an integer value:
```
"maxPoolResult": 5
```

📦 **Example**
```
{
  "geoserver": "osm",
  "providers": ["ecoMovement"],
  "mode": "LOCAL_OR_REMOTE",
  "radius": 1000,
  "coordinate": {
    "lat": 48.85693,
    "lon": 2.3412
  },
  "maxPoolResult": 5,
  "options": ["PATH_POINT"]
}
```
**Response**
```
{
  "pools": [
    {
      "providerName": "ecoMovement",
      "providerMode": "LOCAL",
      "id": "8f709a26-466d-11e9-8601-42010a840003",
      "sourceProvider": "Tesla Destination",
      "updateDate": 1753672005588,
      "brand": "Tesla Destination",
      "nameOfPool": "Tesla Destination Charger Relais Christine",
      "accessibility": "RESTRICTED",
      "availabilityStatus": "NA",
      "longitude": 2.34014219,
      "latitude": 48.8543694,
      "countryCode": "FRA",
      "country": "FRA",
      "postalCode": "75006",
      "city": "6e Arrondissement",
      "street": "3 Rue Christine",
      "siteCategory": "ON_STREET",
      "phoneNumber": "+(33)-(9)-70730850",
      "chargingStations": [
        {
          "nature": "VGROUP",
          "availabilityStatus": "NA",
          "chargePasses": [
            {
              "title": "Tesla",
              "networkName": "Tesla"
            }
          ],
          "bookable": false,
          "chargingPoints": [
            {
              "id": "491848_1",
              "availabilityStatus": "NA",
              "type": 32,
              "connectorTypes": [
                {
                  "id": 32,
                  "key": "TYPE_2-ATTACHED_CABLE",
                  "operatorId": "491848_1_0",
                  "deprecated": false,
                  "name": "Type 2",
                  "norm": "IEC 62196 Type 2 (Mennekes)",
                  "maxPower": 43,
                  "power": 11,
                  "voltage": 230,
                  "ampere": 16,
                  "acSingle": false,
                  "acThree": true,
                  "dc": false,
                  "cable": true
                }
              ],
              "currentType": "AC_THREE_PHASES",
              "voltage": 230,
              "ampere": 16,
              "power": 11
            }
          ]
        },
        {
          "nature": "VGROUP",
          "availabilityStatus": "NA",
          "chargePasses": [
            {
              "title": "Tesla",
              "networkName": "Tesla"
            }
          ],
          "bookable": false,
          "chargingPoints": [
            {
              "id": "491848_0",
              "availabilityStatus": "NA",
              "type": 32,
              "connectorTypes": [
                {
                  "id": 32,
                  "key": "TYPE_2-ATTACHED_CABLE",
                  "operatorId": "491848_0_0",
                  "deprecated": false,
                  "name": "Type 2",
                  "norm": "IEC 62196 Type 2 (Mennekes)",
                  "maxPower": 43,
                  "power": 11,
                  "voltage": 230,
                  "ampere": 16,
                  "acSingle": false,
                  "acThree": true,
                  "dc": false,
                  "cable": true
                }
              ],
              "currentType": "AC_THREE_PHASES",
              "voltage": 230,
              "ampere": 16,
              "power": 11
            }
          ]
        },
        {
          "nature": "VGROUP",
          "availabilityStatus": "NA",
          "chargePasses": [
            {
              "title": "Tesla",
              "networkName": "Tesla"
            }
          ],
          "bookable": false,
          "chargingPoints": [
            {
              "id": "491848_2",
              "availabilityStatus": "NA",
              "type": 32,
              "connectorTypes": [
                {
                  "id": 32,
                  "key": "TYPE_2-ATTACHED_CABLE",
                  "operatorId": "491848_2_0",
                  "deprecated": false,
                  "name": "Type 2",
                  "norm": "IEC 62196 Type 2 (Mennekes)",
                  "maxPower": 43,
                  "power": 11,
                  "voltage": 230,
                  "ampere": 16,
                  "acSingle": false,
                  "acThree": true,
                  "dc": false,
                  "cable": true
                }
              ],
              "currentType": "AC_THREE_PHASES",
              "voltage": 230,
              "ampere": 16,
              "power": 11
            }
          ]
        }
      ],
      "summaryOfConnectorTypeIds": [
        32
      ],
      "maxNominalPower": 11,
      "numberOfChargingPoint": 3
    },
    {
      "providerName": "ecoMovement",
      "providerMode": "LOCAL",
      "id": "8dbd7abe-c2d8-11ed-90d8-42010aa40fc0",
      "sourceProvider": "Q-Park",
      "updateDate": 1753672005588,
      "brand": "Q-Park",
      "nameOfPool": "QPARK - PARIS - RIVOLI PONT NEUF - 019",
      "accessibility": "RESTRICTED",
      "availabilityStatus": "NA",
      "longitude": 2.34376881,
      "latitude": 48.85944148,
      "countryCode": "FRA",
      "country": "FRA",
      "postalCode": "75001",
      "city": "Paris",
      "street": "2 Rue Boucher",
      "siteCategory": "BUILDING_PARKING",
      "phoneNumber": "",
      "chargingStations": [
        {
          "nature": "VGROUP",
          "availabilityStatus": "NA",
          "chargePasses": [
            {
              "title": "Ecotap",
              "networkName": "Ecotap"
            },
            {
              "title": "Shell Recharge",
              "networkName": "Shell Recharge"
            },
```
📝 **Notes**

- This parameter limits the **number of pools**, not the number of individual charging points.

- Use in combination with `filters`, `radius`, or `corridor` to better target the most relevant pools.

- If more pools are available than the limit, **only the top N (unordered)** will be returned.

- The limit applies **per provider**, not to the whole response: measured on production, `"maxPoolResult": 5` within 1 000 m of this coordinate returns 5 pools with `["ecoMovement"]`, 10 with `["ecoMovement", "gireve"]` and 15 with `["ecoMovement", "gireve", "here"]`.
---
<a name="chargingstation_maxProviderResult_tutorial"></a>

## 📦 maxProviderResult – Limit the number of results queried per provider
✅ **Use case**

You want to **control how many items are retrieved from each data provider**, especially when multiple providers are involved or when performance is critical.

💡 **What it does**

The `maxProviderResult` parameter sets a limit on the **maximum number of results to be fetched from each provider** listed in the `providers` array (e.g., `ecoMovement`).
It does **not** limit the total results globally, but rather **per provider.**

🔧 **How to enable**

Add the `maxProviderResult` field to your request with an integer value:
```
"maxProviderResult": 50
```
📦 **Example**
```
{
  "geoserver": "osm",
  "providers": ["ecoMovement"],
  "mode": "LOCAL_OR_REMOTE",
  "radius": 1000,
  "coordinate": {
    "lat": 48.85693,
    "lon": 2.3412
  },
  "maxProviderResult": 50,
  "options": ["PATH_POINT"]
}
```
**Response**
```
{
  "pools": [
    {
      "providerName": "ecoMovement",
      "providerMode": "LOCAL",
      "id": "8f709a26-466d-11e9-8601-42010a840003",
      "sourceProvider": "Tesla Destination",
      "updateDate": 1753672005588,
      "brand": "Tesla Destination",
      "nameOfPool": "Tesla Destination Charger Relais Christine",
      "accessibility": "RESTRICTED",
      "availabilityStatus": "NA",
      "longitude": 2.34014219,
      "latitude": 48.8543694,
      "countryCode": "FRA",
      "country": "FRA",
      "postalCode": "75006",
      "city": "6e Arrondissement",
      "street": "3 Rue Christine",
      "siteCategory": "ON_STREET",
      "phoneNumber": "+(33)-(9)-70730850",
      "chargingStations": [
        {
          "nature": "VGROUP",
          "availabilityStatus": "NA",
          "chargePasses": [
            {
              "title": "Tesla",
              "networkName": "Tesla"
            }
          ],
          "bookable": false,
          "chargingPoints": [
            {
              "id": "491848_1",
              "availabilityStatus": "NA",
              "type": 32,
              "connectorTypes": [
                {
                  "id": 32,
                  "key": "TYPE_2-ATTACHED_CABLE",
                  "operatorId": "491848_1_0",
                  "deprecated": false,
                  "name": "Type 2",
                  "norm": "IEC 62196 Type 2 (Mennekes)",
                  "maxPower": 43,
                  "power": 11,
                  "voltage": 230,
                  "ampere": 16,
                  "acSingle": false,
                  "acThree": true,
                  "dc": false,
                  "cable": true
                }
              ],
              "currentType": "AC_THREE_PHASES",
              "voltage": 230,
              "ampere": 16,
              "power": 11
            }
          ]
        },
        {
          "nature": "VGROUP",
          "availabilityStatus": "NA",
          "chargePasses": [
            {
              "title": "Tesla",
              "networkName": "Tesla"
            }
          ],
          "bookable": false,
          "chargingPoints": [
            {
              "id": "491848_0",
              "availabilityStatus": "NA",
              "type": 32,
              "connectorTypes": [
                {
                  "id": 32,
                  "key": "TYPE_2-ATTACHED_CABLE",
                  "operatorId": "491848_0_0",
                  "deprecated": false,
                  "name": "Type 2",
                  "norm": "IEC 62196 Type 2 (Mennekes)",
                  "maxPower": 43,
                  "power": 11,
                  "voltage": 230,
                  "ampere": 16,
                  "acSingle": false,
                  "acThree": true,
                  "dc": false,
                  "cable": true
                }
              ],
              "currentType": "AC_THREE_PHASES",
              "voltage": 230,
              "ampere": 16,
              "power": 11
            }
          ]
        },
        {
          "nature": "VGROUP",
          "availabilityStatus": "NA",
          "chargePasses": [
            {
              "title": "Tesla",
              "networkName": "Tesla"
            }
          ],
          "bookable": false,
          "chargingPoints": [
            {
              "id": "491848_2",
              "availabilityStatus": "NA",
              "type": 32,
              "connectorTypes": [
                {
                  "id": 32,
                  "key": "TYPE_2-ATTACHED_CABLE",
                  "operatorId": "491848_2_0",
                  "deprecated": false,
                  "name": "Type 2",
                  "norm": "IEC 62196 Type 2 (Mennekes)",
                  "maxPower": 43,
                  "power": 11,
                  "voltage": 230,
                  "ampere": 16,
                  "acSingle": false,
                  "acThree": true,
                  "dc": false,
                  "cable": true
                }
              ],
              "currentType": "AC_THREE_PHASES",
              "voltage": 230,
              "ampere": 16,
              "power": 11
            }
          ]
        }
      ],
      "summaryOfConnectorTypeIds": [
        32
      ],
      "maxNominalPower": 11,
      "numberOfChargingPoint": 3
    },
    {
      "providerName": "ecoMovement",
      "providerMode": "LOCAL",
      "id": "8dbd7abe-c2d8-11ed-90d8-42010aa40fc0",
      "sourceProvider": "Q-Park",
      "updateDate": 1753672005588,
      "brand": "Q-Park",
      "nameOfPool": "QPARK - PARIS - RIVOLI PONT NEUF - 019",
      "accessibility": "RESTRICTED",
      "availabilityStatus": "NA",
      "longitude": 2.34376881,
      "latitude": 48.85944148,
      "countryCode": "FRA",
      "country": "FRA",
      "postalCode": "75001",
      "city": "Paris",
      "street": "2 Rue Boucher",
      "siteCategory": "BUILDING_PARKING",
      "phoneNumber": "",
      "chargingStations": [
        {
          "nature": "VGROUP",
          "availabilityStatus": "NA",
          "chargePasses": [
            {
              "title": "Ecotap",
              "networkName": "Ecotap"
            },
            {
              "title": "Shell Recharge",
              "networkName": "Shell Recharge"
            },
```
📝 Notes

- The value applies **individually** to each provider listed.

- It can be combined with `maxPoolResult` for fine-grained control over result size.

- Useful when you expect **hundreds of results** and want to avoid long processing times.

---
<a name="chargingstation_mode_tutorial"></a>

## 🧭 mode – Choose the search strategy (local, remote, or hybrid)
✅ **Use case**

You want to **control where the charging station data is retrieved from**: local cache/database, remote provider APIs, or a mix of both — based on performance, freshness, or connectivity.

💡 **What it does**

The mode parameter defines the **source strategy** for the charging station search:

- **Local mode** uses internal BeMap data (cached or preloaded).

- **Remote mode** delegates the query to external data providers (e.g. ecoMovement).

- **Hybrid modes** try one first and fallback to the other if needed.

This allows developers to **balance between speed, completeness, and offline capabilities.**

🔧 **How to enable**

Set the `mode` field to one of the following string values (recommended default: `"LOCAL_OR_REMOTE"`):
```
"mode": "LOCAL_OR_REMOTE"
```
🎛️ **Available Values**

| Mode                    | Behavior                                                                 |
|-------------------------|--------------------------------------------------------------------------|
| `LOCAL`                 | Query only local database/cache. Fast, but might miss latest data.       |
| `REMOTE`                | Query only the remote provider. Most up-to-date, but slower.             |
| `LOCAL_AND_REMOTE`      | Query both local and remote, and merge results. Most complete.           |
| `LOCAL_OR_REMOTE`       | Use local if available, otherwise fallback to remote. (⚠️ Preferred mode) |
| `LOCAL_IFNOPOOLS_REMOTE`| Try local first. If no stations are found, then try remote.              |
| `REMOTE_OR_LOCAL`       | Use remote if available, otherwise fallback to local.                    |
| `REMOTE_IFNOPOOLS_LOCAL`| Try remote first. If no stations are found, then try local.              |
📦 **Example**
```
{
  "geoserver": "osm",
  "providers": ["ecoMovement"],
  "mode": "LOCAL_OR_REMOTE",
  "radius": 1000,
  "coordinate": {
    "lat": 48.85693,
    "lon": 2.3412
  },
  "options": ["PATH_POINT"]
}
```
**Response**
```
{
  "pools": [
    {
      "providerName": "ecoMovement",
      "providerMode": "LOCAL",
      "id": "8f709a26-466d-11e9-8601-42010a840003",
      "sourceProvider": "Tesla Destination",
      "updateDate": 1753672005588,
      "brand": "Tesla Destination",
      "nameOfPool": "Tesla Destination Charger Relais Christine",
      "accessibility": "RESTRICTED",
      "availabilityStatus": "NA",
      "longitude": 2.34014219,
      "latitude": 48.8543694,
      "countryCode": "FRA",
      "country": "FRA",
      "postalCode": "75006",
      "city": "6e Arrondissement",
      "street": "3 Rue Christine",
      "siteCategory": "ON_STREET",
      "phoneNumber": "+(33)-(9)-70730850",
      "chargingStations": [
        {
          "nature": "VGROUP",
          "availabilityStatus": "NA",
          "chargePasses": [
            {
              "title": "Tesla",
              "networkName": "Tesla"
            }
          ],
          "bookable": false,
          "chargingPoints": [
            {
              "id": "491848_1",
              "availabilityStatus": "NA",
              "type": 32,
              "connectorTypes": [
                {
                  "id": 32,
                  "key": "TYPE_2-ATTACHED_CABLE",
                  "operatorId": "491848_1_0",
                  "deprecated": false,
                  "name": "Type 2",
                  "norm": "IEC 62196 Type 2 (Mennekes)",
                  "maxPower": 43,
                  "power": 11,
                  "voltage": 230,
                  "ampere": 16,
                  "acSingle": false,
                  "acThree": true,
                  "dc": false,
                  "cable": true
                }
              ],
              "currentType": "AC_THREE_PHASES",
              "voltage": 230,
              "ampere": 16,
              "power": 11
            }
          ]
        },
        {
          "nature": "VGROUP",
          "availabilityStatus": "NA",
          "chargePasses": [
            {
              "title": "Tesla",
              "networkName": "Tesla"
            }
          ],
          "bookable": false,
          "chargingPoints": [
            {
              "id": "491848_0",
              "availabilityStatus": "NA",
              "type": 32,
              "connectorTypes": [
                {
                  "id": 32,
                  "key": "TYPE_2-ATTACHED_CABLE",
                  "operatorId": "491848_0_0",
                  "deprecated": false,
                  "name": "Type 2",
                  "norm": "IEC 62196 Type 2 (Mennekes)",
                  "maxPower": 43,
                  "power": 11,
                  "voltage": 230,
                  "ampere": 16,
                  "acSingle": false,
                  "acThree": true,
                  "dc": false,
                  "cable": true
                }
              ],
              "currentType": "AC_THREE_PHASES",
              "voltage": 230,
              "ampere": 16,
              "power": 11
            }
          ]
        },
        {
          "nature": "VGROUP",
          "availabilityStatus": "NA",
          "chargePasses": [
            {
              "title": "Tesla",
              "networkName": "Tesla"
            }
          ],
          "bookable": false,
          "chargingPoints": [
            {
              "id": "491848_2",
              "availabilityStatus": "NA",
              "type": 32,
              "connectorTypes": [
                {
                  "id": 32,
                  "key": "TYPE_2-ATTACHED_CABLE",
                  "operatorId": "491848_2_0",
                  "deprecated": false,
                  "name": "Type 2",
                  "norm": "IEC 62196 Type 2 (Mennekes)",
                  "maxPower": 43,
                  "power": 11,
                  "voltage": 230,
                  "ampere": 16,
                  "acSingle": false,
                  "acThree": true,
                  "dc": false,
                  "cable": true
                }
              ],
              "currentType": "AC_THREE_PHASES",
              "voltage": 230,
              "ampere": 16,
              "power": 11
            }
          ]
        }
      ],
      "summaryOfConnectorTypeIds": [
        32
      ],
      "maxNominalPower": 11,
      "numberOfChargingPoint": 3
    },
    {
      "providerName": "ecoMovement",
      "providerMode": "LOCAL",
      "id": "8dbd7abe-c2d8-11ed-90d8-42010aa40fc0",
      "sourceProvider": "Q-Park",
      "updateDate": 1753672005588,
      "brand": "Q-Park",
      "nameOfPool": "QPARK - PARIS - RIVOLI PONT NEUF - 019",
      "accessibility": "RESTRICTED",
      "availabilityStatus": "NA",
      "longitude": 2.34376881,
      "latitude": 48.85944148,
      "countryCode": "FRA",
      "country": "FRA",
      "postalCode": "75001",
      "city": "Paris",
      "street": "2 Rue Boucher",
      "siteCategory": "BUILDING_PARKING",
      "phoneNumber": "",
      "chargingStations": [
        {
          "nature": "VGROUP",
          "availabilityStatus": "NA",
          "chargePasses": [
            {
              "title": "Ecotap",
              "networkName": "Ecotap"
            },
```

📝 **Notes**

- Default mode is often set to `"LOCAL_OR_REMOTE"` for **balanced behavior**.

- If your app runs **offline** or has a **local cache**, use `"LOCAL"` to avoid remote calls.

- Use `"REMOTE"` when **real-time accuracy** is critical (e.g. station availability).

- Modes only apply to **providers** that support both access types.
---

<a name="chargingstation_pointIdFilter_tutorial"></a>

## 🎯 pointIdFilter – Filter by a specific charging point ID
✅ **Use case**

You want to **retrieve a single specific charging point** based on its unique identifier — for example, to display its detail page or validate its availability.

💡 **What it does**

The `pointIdFilter` parameter filters the result to **only include the charging point** that matches the exact ID provided.
It does **not** replace the spatial search: it narrows the pools found around `coordinate`, `bbox` or `corridor` (within `radius`) to the matching point, so the search area **must contain the point**. Measured on production: the example below finds point `491848_1`; the same filter around a coordinate in Lyon answers `200` with `{"pools": []}`, and with no spatial field at all `400 CHARGING_STATION_FAILED` "Missing coordinate(s)".

🔧 **How to enable**
```
"pointIdFilter": "CP-123456"
```
📦 **Example**
```
{
  "geoserver": "osm",
  "providers": ["ecoMovement"],
  "mode": "LOCAL_OR_REMOTE",
  "pointIdFilter": "491848_1",
  "radius": 500,
  "coordinate": {
    "lat": 48.85693,
    "lon": 2.3412
  },
  "options": ["PATH_POINT"]
}
```
**Response**
```
{
  "pools": [
    {
      "providerName": "ecoMovement",
      "providerMode": "LOCAL",
      "id": "8f709a26-466d-11e9-8601-42010a840003",
      "sourceProvider": "Tesla Destination",
      "updateDate": 1752065776704,
      "brand": "Tesla Destination",
      "nameOfPool": "Tesla Destination Charger Relais Christine",
      "accessibility": "RESTRICTED",
      "availabilityStatus": "NA",
      "longitude": 2.34014219,
      "latitude": 48.8543694,
      "countryCode": "FRA",
      "country": "FRA",
      "postalCode": "75006",
      "city": "Paris",
      "street": "3 Rue Christine",
      "siteCategory": "UNKNOWN",
      "phoneNumber": "+(33)-(9)-70730850",
      "chargingStations": [
        {
          "nature": "VGROUP",
          "availabilityStatus": "NA",
          "chargePasses": [
            {
              "title": "Tesla",
              "networkName": "Tesla"
            }
          ],
          "bookable": false,
          "chargingPoints": [
            {
              "id": "491848_1",
              "availabilityStatus": "NA",
              "type": 32,
              "connectorTypes": [
                {
                  "id": 32,
                  "key": "TYPE_2-ATTACHED_CABLE",
                  "operatorId": "491848_1_0",
                  "deprecated": false,
                  "name": "Type 2",
                  "norm": "IEC 62196 Type 2 (Mennekes)",
                  "maxPower": 43,
                  "power": 11,
                  "voltage": 230,
                  "ampere": 16,
                  "acSingle": false,
                  "acThree": true,
                  "dc": false,
                  "cable": true
                }
              ],
              "currentType": "AC_THREE_PHASES",
              "voltage": 230,
              "ampere": 16,
              "power": 11
            }
          ]
        }
      ],
      "summaryOfConnectorTypeIds": [
        32
      ],
      "maxNominalPower": 11,
      "numberOfChargingPoint": 3
    }
  ]
}
```

---

<a name="chargingstation_poolIdFilter_tutorial"></a>

## 🏟️ poolIdFilter – Filter by a specific charging pool ID
✅ **Use case**

You want to **retrieve all the information about a specific charging pool**, identified by its unique ID — for instance, to display all its charging stations or points on a dedicated page.

💡 **What it does**

The `poolIdFilter` parameter restricts the search to **a single charging pool**, identified by its unique ID.
The response will include all the stations and points associated with that pool, depending on the selected `options`.
Like `pointIdFilter`, it narrows a spatial search, which must contain the pool: measured on production, this pool ID around a coordinate in Lyon answers `200` with `{"pools": []}`.

🔧 **How to enable**
```
"poolIdFilter": "8f709a26-466d-11e9-8601-42010a840003"
```
📦 **Example**
```
{
  "geoserver": "osm",
  "providers": ["ecoMovement"],
  "mode": "LOCAL_OR_REMOTE",
  "poolIdFilter": "8f709a26-466d-11e9-8601-42010a840003",
  "radius": 500,
  "coordinate": {
    "lat": 48.85693,
    "lon": 2.3412
  },
  "options": ["PATH_POINT"]
}
```

**Response**
```
{
  "pools": [
    {
      "providerName": "ecoMovement",
      "providerMode": "LOCAL",
      "id": "8f709a26-466d-11e9-8601-42010a840003",
      "sourceProvider": "Tesla Destination",
      "updateDate": 1753672005588,
      "brand": "Tesla Destination",
      "nameOfPool": "Tesla Destination Charger Relais Christine",
      "accessibility": "RESTRICTED",
      "availabilityStatus": "NA",
      "longitude": 2.34014219,
      "latitude": 48.8543694,
      "countryCode": "FRA",
      "country": "FRA",
      "postalCode": "75006",
      "city": "6e Arrondissement",
      "street": "3 Rue Christine",
      "siteCategory": "ON_STREET",
      "phoneNumber": "+(33)-(9)-70730850",
      "chargingStations": [
        {
          "nature": "VGROUP",
          "availabilityStatus": "NA",
          "chargePasses": [
            {
              "title": "Tesla",
              "networkName": "Tesla"
            }
          ],
          "bookable": false,
          "chargingPoints": [
            {
              "id": "491848_1",
              "availabilityStatus": "NA",
              "type": 32,
              "connectorTypes": [
                {
                  "id": 32,
                  "key": "TYPE_2-ATTACHED_CABLE",
                  "operatorId": "491848_1_0",
                  "deprecated": false,
                  "name": "Type 2",
                  "norm": "IEC 62196 Type 2 (Mennekes)",
                  "maxPower": 43,
                  "power": 11,
                  "voltage": 230,
                  "ampere": 16,
                  "acSingle": false,
                  "acThree": true,
                  "dc": false,
                  "cable": true
                }
              ],
              "currentType": "AC_THREE_PHASES",
              "voltage": 230,
              "ampere": 16,
              "power": 11
            }
          ]
        },
        {
          "nature": "VGROUP",
          "availabilityStatus": "NA",
          "chargePasses": [
            {
              "title": "Tesla",
              "networkName": "Tesla"
            }
          ],
          "bookable": false,
          "chargingPoints": [
            {
              "id": "491848_0",
              "availabilityStatus": "NA",
              "type": 32,
              "connectorTypes": [
                {
                  "id": 32,
                  "key": "TYPE_2-ATTACHED_CABLE",
                  "operatorId": "491848_0_0",
                  "deprecated": false,
                  "name": "Type 2",
                  "norm": "IEC 62196 Type 2 (Mennekes)",
                  "maxPower": 43,
                  "power": 11,
                  "voltage": 230,
                  "ampere": 16,
                  "acSingle": false,
                  "acThree": true,
                  "dc": false,
                  "cable": true
                }
              ],
              "currentType": "AC_THREE_PHASES",
              "voltage": 230,
              "ampere": 16,
              "power": 11
            }
          ]
        },
        {
          "nature": "VGROUP",
          "availabilityStatus": "NA",
          "chargePasses": [
            {
              "title": "Tesla",
              "networkName": "Tesla"
            }
          ],
          "bookable": false,
          "chargingPoints": [
            {
              "id": "491848_2",
              "availabilityStatus": "NA",
              "type": 32,
              "connectorTypes": [
                {
                  "id": 32,
                  "key": "TYPE_2-ATTACHED_CABLE",
                  "operatorId": "491848_2_0",
                  "deprecated": false,
                  "name": "Type 2",
                  "norm": "IEC 62196 Type 2 (Mennekes)",
                  "maxPower": 43,
                  "power": 11,
                  "voltage": 230,
                  "ampere": 16,
                  "acSingle": false,
                  "acThree": true,
                  "dc": false,
                  "cable": true
                }
              ],
              "currentType": "AC_THREE_PHASES",
              "voltage": 230,
              "ampere": 16,
              "power": 11
            }
          ]
        }
      ],
      "summaryOfConnectorTypeIds": [
        32
      ],
      "maxNominalPower": 11,
      "numberOfChargingPoint": 3
    }
  ]
}
```
📝 **Notes**

- You must provide the **exact pool ID** as stored in the backend (case-sensitive).

- This is ideal for **loading a full site or parking lot**, often displayed on map zoom or detail views.

- Recommended to pair with `options: ["PATH_POOL"] or ["PATH_POINT"]` depending on the desired depth.
---
<a name="chargingstation_providers_tutorial"></a>

## 🏢 providers – Define the charging data sources to use
✅ **Use case**

You want to **control which data providers are queried** for charging station information — for example, using only trusted sources or avoiding duplicates.

💡 **What it does**

The `providers` parameter specifies which **charging data providers** should be used for the request.
Each provider represents an external or internal source of charging infrastructure data (e.g. `ecoMovement`).
The API will **only query the listed providers**, improving performance and consistency.

🔧 **How to enable**

Provide a list of provider names as strings. BeMap recommends always specifying `"ecoMovement"` as default.
```
"providers": ["ecoMovement"]
```

📦 **Example**
```
{
  "geoserver": "osm",
  "providers": ["ecoMovement"],
  "mode": "LOCAL_OR_REMOTE",
  "radius": 1000,
  "coordinate": {
    "lat": 48.85693,
    "lon": 2.3412
  },
  "options": ["PATH_POINT"]
}
```
**Response**

```
{
  "pools": [
    {
      "providerName": "ecoMovement",
      "providerMode": "LOCAL",
      "id": "8f709a26-466d-11e9-8601-42010a840003",
      "sourceProvider": "Tesla Destination",
      "updateDate": 1753672005588,
      "brand": "Tesla Destination",
      "nameOfPool": "Tesla Destination Charger Relais Christine",
      "accessibility": "RESTRICTED",
      "availabilityStatus": "NA",
      "longitude": 2.34014219,
      "latitude": 48.8543694,
      "countryCode": "FRA",
      "country": "FRA",
      "postalCode": "75006",
      "city": "6e Arrondissement",
      "street": "3 Rue Christine",
      "siteCategory": "ON_STREET",
      "phoneNumber": "+(33)-(9)-70730850",
      "chargingStations": [
        {
          "nature": "VGROUP",
          "availabilityStatus": "NA",
          "chargePasses": [
            {
              "title": "Tesla",
              "networkName": "Tesla"
            }
          ],
          "bookable": false,
          "chargingPoints": [
            {
              "id": "491848_1",
              "availabilityStatus": "NA",
              "type": 32,
              "connectorTypes": [
                {
                  "id": 32,
                  "key": "TYPE_2-ATTACHED_CABLE",
                  "operatorId": "491848_1_0",
                  "deprecated": false,
                  "name": "Type 2",
                  "norm": "IEC 62196 Type 2 (Mennekes)",
                  "maxPower": 43,
                  "power": 11,
                  "voltage": 230,
                  "ampere": 16,
                  "acSingle": false,
                  "acThree": true,
                  "dc": false,
                  "cable": true
                }
              ],
              "currentType": "AC_THREE_PHASES",
              "voltage": 230,
              "ampere": 16,
              "power": 11
            }
          ]
        },
        {
          "nature": "VGROUP",
          "availabilityStatus": "NA",
          "chargePasses": [
            {
              "title": "Tesla",
              "networkName": "Tesla"
            }
          ],
          "bookable": false,
          "chargingPoints": [
            {
              "id": "491848_0",
              "availabilityStatus": "NA",
              "type": 32,
              "connectorTypes": [
                {
                  "id": 32,
                  "key": "TYPE_2-ATTACHED_CABLE",
                  "operatorId": "491848_0_0",
                  "deprecated": false,
                  "name": "Type 2",
                  "norm": "IEC 62196 Type 2 (Mennekes)",
                  "maxPower": 43,
                  "power": 11,
                  "voltage": 230,
                  "ampere": 16,
                  "acSingle": false,
                  "acThree": true,
                  "dc": false,
                  "cable": true
                }
              ],
              "currentType": "AC_THREE_PHASES",
              "voltage": 230,
              "ampere": 16,
              "power": 11
            }
          ]
        },
        {
          "nature": "VGROUP",
          "availabilityStatus": "NA",
          "chargePasses": [
            {
              "title": "Tesla",
              "networkName": "Tesla"
            }
          ],
          "bookable": false,
          "chargingPoints": [
            {
              "id": "491848_2",
              "availabilityStatus": "NA",
              "type": 32,
              "connectorTypes": [
                {
                  "id": 32,
                  "key": "TYPE_2-ATTACHED_CABLE",
                  "operatorId": "491848_2_0",
                  "deprecated": false,
                  "name": "Type 2",
                  "norm": "IEC 62196 Type 2 (Mennekes)",
                  "maxPower": 43,
                  "power": 11,
                  "voltage": 230,
                  "ampere": 16,
                  "acSingle": false,
                  "acThree": true,
                  "dc": false,
                  "cable": true
                }
              ],
              "currentType": "AC_THREE_PHASES",
              "voltage": 230,
              "ampere": 16,
              "power": 11
            }
          ]
        }
      ],
      "summaryOfConnectorTypeIds": [
        32
      ],
      "maxNominalPower": 11,
      "numberOfChargingPoint": 3
    },
```
📝 **Notes**

Values are case-sensitive and must match the exact provider keys configured in the system.

The providers your account may use are the keys of `chargingStationProviders` in `GET /bgis/service/acl/1.0/user/details`; they differ per account and per environment. `"ecoMovement"` is recommended, and it is the only provider that carries charge passes and tariffs.

A provider your account does not hold is refused with `400` and the code `INTERNAL_ERROR` — an access refusal, not a server fault: measured on production, `["ocm", "bemap"]` answers "Not allowed charging station provider for input 'ocm'!".

Combine with `mode: "LOCAL_OR_REMOTE"` to ensure compatibility with both local cache and remote API access.

---

<a name="chargingstation_radius_tutorial"></a>

## 📏 radius – Define the search radius around a location or corridor
✅ **Use case**

You want to **limit the search area** around a coordinate or along a route to a specific distance — for example, to only show stations within 1 km of a user or a travel path.

💡 **What it does**

The `radius` parameter defines the **distance in meters** used to expand the search around either:

a central `coordinate` (circular search), or

a `corridor` (buffer zone along a path).

It is **optional**: without it, the environment's default radius applies — **500 m on production**. Measured: the same 11 pools come back with no `radius` as with `"radius": 500` (6 with `400`, 13 with `600`). The specification's description, "Required by the center or corridor parameters", says otherwise.

🔧 **How to enable**
```
"radius": 1000
```
📦 **Example**
```
{
  "geoserver": "osm",
  "providers": ["ecoMovement"],
  "mode": "LOCAL_OR_REMOTE",
  "radius": 500,
  "coordinate": {
    "lat": 48.85693,
    "lon": 2.3412
  },
  "options": ["PATH_POINT"]
}
```
**Response**
```
{
  "pools": [
    {
      "providerName": "ecoMovement",
      "providerMode": "LOCAL",
      "id": "8f709a26-466d-11e9-8601-42010a840003",
      "sourceProvider": "Tesla Destination",
      "updateDate": 1753672005588,
      "brand": "Tesla Destination",
      "nameOfPool": "Tesla Destination Charger Relais Christine",
      "accessibility": "RESTRICTED",
      "availabilityStatus": "NA",
      "longitude": 2.34014219,
      "latitude": 48.8543694,
      "countryCode": "FRA",
      "country": "FRA",
      "postalCode": "75006",
      "city": "6e Arrondissement",
      "street": "3 Rue Christine",
      "siteCategory": "ON_STREET",
      "phoneNumber": "+(33)-(9)-70730850",
      "chargingStations": [
        {
          "nature": "VGROUP",
          "availabilityStatus": "NA",
          "chargePasses": [
            {
              "title": "Tesla",
              "networkName": "Tesla"
            }
          ],
          "bookable": false,
          "chargingPoints": [
            {
              "id": "491848_1",
              "availabilityStatus": "NA",
              "type": 32,
              "connectorTypes": [
                {
                  "id": 32,
                  "key": "TYPE_2-ATTACHED_CABLE",
                  "operatorId": "491848_1_0",
                  "deprecated": false,
                  "name": "Type 2",
                  "norm": "IEC 62196 Type 2 (Mennekes)",
                  "maxPower": 43,
                  "power": 11,
                  "voltage": 230,
                  "ampere": 16,
                  "acSingle": false,
                  "acThree": true,
                  "dc": false,
                  "cable": true
                }
              ],
              "currentType": "AC_THREE_PHASES",
              "voltage": 230,
              "ampere": 16,
              "power": 11
            }
          ]
        },
        {
          "nature": "VGROUP",
          "availabilityStatus": "NA",
          "chargePasses": [
            {
              "title": "Tesla",
              "networkName": "Tesla"
            }
          ],
          "bookable": false,
          "chargingPoints": [
            {
              "id": "491848_0",
              "availabilityStatus": "NA",
              "type": 32,
              "connectorTypes": [
                {
                  "id": 32,
                  "key": "TYPE_2-ATTACHED_CABLE",
                  "operatorId": "491848_0_0",
                  "deprecated": false,
                  "name": "Type 2",
                  "norm": "IEC 62196 Type 2 (Mennekes)",
                  "maxPower": 43,
                  "power": 11,
                  "voltage": 230,
                  "ampere": 16,
                  "acSingle": false,
                  "acThree": true,
                  "dc": false,
                  "cable": true
                }
              ],
              "currentType": "AC_THREE_PHASES",
              "voltage": 230,
              "ampere": 16,
              "power": 11
            }
          ]
        },
        {
          "nature": "VGROUP",
          "availabilityStatus": "NA",
          "chargePasses": [
            {
              "title": "Tesla",
              "networkName": "Tesla"
            }
          ],
          "bookable": false,
          "chargingPoints": [
            {
              "id": "491848_2",
              "availabilityStatus": "NA",
              "type": 32,
              "connectorTypes": [
                {
                  "id": 32,
                  "key": "TYPE_2-ATTACHED_CABLE",
                  "operatorId": "491848_2_0",
                  "deprecated": false,
                  "name": "Type 2",
                  "norm": "IEC 62196 Type 2 (Mennekes)",
                  "maxPower": 43,
                  "power": 11,
                  "voltage": 230,
                  "ampere": 16,
                  "acSingle": false,
                  "acThree": true,
                  "dc": false,
                  "cable": true
                }
              ],
              "currentType": "AC_THREE_PHASES",
              "voltage": 230,
              "ampere": 16,
              "power": 11
            }
          ]
        }
      ],
      "summaryOfConnectorTypeIds": [
        32
      ],
      "maxNominalPower": 11,
      "numberOfChargingPoint": 3
    },
```
📝 **Notes**

- Unit is **meters** (e.g., `1000` = 1 km).

- Optional with `coordinate` or `corridor`: 500 m when omitted, on production.

- Still applies with `pointIdFilter`, `poolIdFilter`, or `stationIdFilter`: those narrow the pools found within the radius, so the radius must reach the object.

- Use a **larger value** (e.g. `5000`) for rural or highway searches; smaller values (e.g. `300`) for dense urban areas.
---

<a name="chargingstation_stationIdFilter_tutorial"></a>

## 🏷️ stationIdFilter – Filter by a specific charging station ID
✅ **Use case**

You want to **retrieve a single charging station** based on its unique identifier — for example, to refresh its status on a detail page.

💡 **What it does**

The `stationIdFilter` parameter filters the result to **only include the station** that matches the exact ID provided (`chargingStations[].id` in a response).
Like `pointIdFilter`, it narrows the pools found around `coordinate`, `bbox` or `corridor` (within `radius`), so the search area **must contain the station**.

🔧 **How to enable**
```
"stationIdFilter": "123428"
```

📝 **Notes**

- Only a provider that gives its stations an ID can be filtered this way. Measured on production around Paris: `ecoMovement`'s stations carry no `id` (none of 2 977 within 3 000 m), so the filter finds nothing with it; `gireve` and `here` give one to every station.

- Measured with `"providers": ["gireve"]`, station `123428` and the Paris coordinate of the examples above, `PATH_STATION`: its pool only, holding that station. Around a coordinate in Lyon: `200` with `{"pools": []}`.

- Use `options` to choose the depth, as with `poolIdFilter`.
---

---

_BeNomad MCP: a corrected copy of BeMap's page, served until BeMap publishes the correction (BEMAP-1938)._
