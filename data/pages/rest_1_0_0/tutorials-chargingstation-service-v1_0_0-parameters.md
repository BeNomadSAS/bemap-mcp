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
              "id": "Ecotap",
              "title": "Ecotap",
              "networkName": "Ecotap"
            },
            {
              "id": "Shell Recharge",
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
---
<a name="chargingstation_connectorIdFilters_tutorial"></a>
## 🔌 connectorIdFilters – Filter by connector type IDs
✅ **Use case**

You want to **restrict the results to only show charging stations** that support specific **connector types**, such as `TYPE_2`, `CCS`, or `CHADEMO`.

💡 **What it does**

The connectorIdFilters parameter lets you filter the list of charging stations by their connector type.
Each connector type is represented by a **numeric ID** (e.g., `1` for TYPE_2, `2` for CHAdeMO, etc.).
Only the charging points that include at least one connector matching one of the given IDs will be returned.

🔧 **How to enable**

Add the `connectorIdFilters` field to your request as an array of integers:
```
"connectorIdFilters": [1, 2]
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
              "id": "Ecotap",
              "title": "Ecotap",
              "networkName": "Ecotap"
            },
            {
              "id": "Shell Recharge",
              "title": "Shell Recharge",
              "networkName": "Shell Recharge"
            },
            {
              "id": "EnBW mobility+",
              "title": "EnBW mobility+",
              "networkName": "EnBW"
            },
            {
              "id": "Nissan Charge",
              "title": "Nissan Charge",
              "networkName": "Nissan"
            },
            {
              "id": "EVBox Charge",
              "title": "EVBox Charge",
              "networkName": "EVBox"
            },
            {
              "id": "EWE Go",
              "title": "EWE Go",
              "networkName": "EWE Go"
            },
            {
              "id": "Virta",
              "title": "Virta",
              "networkName": "Virta"
            },
            {
              "id": "EinfachStromLaden",
              "title": "EinfachStromLaden",
              "networkName": "Maingau Energie"
            },
            {
              "id": "Freshmile Pass",
              "title": "Freshmile Pass",
              "networkName": "Freshmile"
            },
            {
              "id": "BMW Charging",
              "title": "BMW Charging",
              "networkName": "BMW"
            },
            {
              "id": "MyToyota",
              "title": "MyToyota",
              "networkName": "Toyota"
            },
            {
              "id": "Volvo",
              "title": "Volvo",
              "networkName": "Volvo"
            },
            {
              "id": "Volkswagen App",
              "title": "Volkswagen App",
              "networkName": "Volkswagen"
            },
            {
              "id": "Kia Charge",
              "title": "Kia Charge",
              "networkName": "Kia Hypercharge "
            },
            {
              "id": "Alizé Charge",
              "title": "Alizé Charge",
              "networkName": "Alizé Liberté"
            },
            {
              "id": "Mobilize charge pass",
              "title": "Mobilize charge pass",
              "networkName": "Renault"
            },
            {
              "id": "Audi e-tron Charging Service",
              "title": "Audi e-tron Charging Service",
              "networkName": "AUDI"
            },
            {
              "id": "Chargemap Pass",
              "title": "Chargemap Pass",
              "networkName": "Chargemap"
            },
            {
              "id": "Mercedes",
              "title": "Mercedes",
              "networkName": "Mercedes"
            },
            {
              "id": "Mobiflow",
              "title": "Mobiflow",
              "networkName": "Mobiflow"
            },
            {
              "id": "Métropole Rouen Normandie",
              "title": "Métropole Rouen Normandie",
              "networkName": "Métropole Rouen Normandie"
            },
            {
              "id": "Charge myHyundai",
              "title": "Charge myHyundai",
              "networkName": "Hyundai"
            },
            {
              "id": "Corpay Card",
              "title": "Corpay Card",
              "networkName": "Corpay"
            },
            {
              "id": "ChargeNow Laadkaart",
              "title": "ChargeNow Laadkaart",
              "networkName": "Digital Charging Solutions"
            },
            {
              "id": "Octopus Electroverse",
              "title": "Octopus Electroverse",
              "networkName": "Octopus Electroverse"
            },
            {
              "id": "JLR Charging",
              "title": "JLR Charging",
              "networkName": "JLR Charging"
            },
            {
              "id": "Tap Electric",
              "title": "Tap Electric",
              "networkName": "Tap Electric"
            },
            {
              "id": "Elli",
              "title": "Elli",
              "networkName": "Elli"
            },
            {
              "id": "MyŠkoda",
              "title": "MyŠkoda",
              "networkName": "Škoda"
            },
            {
              "id": "SEAT Easy Charging app",
              "title": "SEAT Easy Charging app",
              "networkName": "Seat"
            },
            {
              "id": "CHARGE&FUEL CARD ",
              "title": "CHARGE&FUEL CARD ",
              "networkName": "LOGPAY"
            },
            {
              "id": "Ulys",
              "title": "Ulys",
              "networkName": "Ulys"
            },
            {
              "id": "D'Ieteren Energy",
              "title": "D'Ieteren Energy",
              "networkName": "EDI"
            },
            {
              "id": "Lexus Electrified",
              "title": "Lexus Electrified",
              "networkName": "Lexus"
            },
            {
              "id": "Subaru care",
              "title": "Subaru care",
              "networkName": "Subaru"
            },
            {
              "id": "Plugsurfing",
              "title": "Plugsurfing",
              "networkName": "Plugsurfing"
            },
            {
              "id": "Polestar Charge",
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

- The list of valid connector IDs depends on the provider or internal configuration. Common examples include:

  - `31` = Type 1

  - `32` = Type 2

  - `35` = Type 3C

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
              "id": "Tesla",
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
              "id": "Tesla",
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
              "id": "Tesla",
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
              "id": "Ecotap",
              "title": "Ecotap",
              "networkName": "Ecotap"
            },
            {
              "id": "Shell Recharge",
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
Each pattern is used to **include or prioritize** charging stations that match specific criteria.
You can also **combine filters**, use **OR logic**, and apply **actions** like prioritizing results using `prefCoeff`.

🔧 **How to enable**

Each filter is a **string** following this structure:
```
"filters": [
    "pool.brand == Tesla"
  ]
```

📘 For detailed syntax and supported fields, see the [Charging Station Filter Glossary](index.html#page-chargingstation-filter-v1.md#filtersparameter).

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
              "id": "Tesla",
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
              "id": "Tesla",
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
              "id": "Tesla",
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
📝 **Notes**

- Filters are combined with **AND logic** by default.

- Use `||` to apply **OR logic** between multiple filter patterns.

- Actions like `prefCoeff` do **not exclude** stations but influence their **ranking**.

- Improperly formatted filters will be **ignored silently**.
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
              "id": "Tesla",
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
              "id": "Tesla",
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
              "id": "Tesla",
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
This affects how fields like `address`, `city`, or `country` are returned in the response.

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
              "id": "Tesla",
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
              "id": "Tesla",
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
              "id": "Tesla",
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

The `maxPoolResult` parameter sets an upper limit on the **number of** `ChargingStationPool` **objects** the API will return.

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
              "id": "Tesla",
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
              "id": "Tesla",
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
              "id": "Tesla",
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
📝 **Notes**

- This parameter limits the **number of pools**, not the number of individual charging points.

- Use in combination with `filters`, `radius`, or `corridor` to better target the most relevant pools.

- If more pools are available than the limit, **only the top N (unordered)** will be returned.
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
              "id": "Tesla",
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
              "id": "Tesla",
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
              "id": "Tesla",
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
              "id": "Tesla",
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
              "id": "Tesla",
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
              "id": "Tesla",
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
              "id": "Ecotap",
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
It bypasses all other spatial filters (like `coordinate`, `bbox`, or `corridor`) and **returns only the matching point** if it exists.

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
              "id": "Tesla",
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
              "id": "Tesla",
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
              "id": "Tesla",
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
              "id": "Tesla",
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
Each provider represents an external or internal source of charging infrastructure data (e.g. `ecoMovement`, `ocm`, `bemap`).
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
              "id": "Tesla",
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
              "id": "Tesla",
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
              "id": "Tesla",
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
📝 ***Notes**

Values are case-sensitive and must match the exact provider keys configured in the system.

Common providers:

- `"ecoMovement"` (recommended)

- `"ocm"` (Open Charge Map)

- `"bemap"` (BeMap's internal data)

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

Without it, searches using `coordinate` or `corridor` won’t work properly.

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
              "id": "Tesla",
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
              "id": "Tesla",
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
              "id": "Tesla",
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

- Required when using either `coordinate` or `corridor`.

- Has no effect if using `pointIdFilter`, `poolIdFilter`, or `stationIdFilter`.

- Use a **larger value** (e.g. `5000`) for rural or highway searches; smaller values (e.g. `300`) for dense urban areas.
---

