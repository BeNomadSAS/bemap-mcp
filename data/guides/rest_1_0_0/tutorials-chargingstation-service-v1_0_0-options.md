<a name="chargingstation_options_tutorial"></a>

# ⚙️ Charging Station Options – Usage Guide
This document provides a detailed explanation of all the available `options` you can pass to the Charging Station API (`/bgis/service/chargingstation/search/1.0`) to customize the level of detail and behavior of the response.

Each `option` defines how much data should be returned (depth of response) or toggles specific features such as connector metadata or deprecated types. These options are particularly useful when optimizing for performance, display needs (e.g. maps), or data filtering strategies.

Whether you're building a fast map display, a detailed connector list, or need to support backward compatibility, this guide will help you understand and choose the right combination of `options` for your use case.

Each section includes:

- ✅ A **use case**

- 💡 A short **description**

- 🔧 A **how-to** for enabling it in your JSON request

- 📦 A **request/response example**

<a name="chargingstation_options_availableConnectorTypes_tutorial"></a>

## 🔌 AVAILABLE_CONNECTOR_TYPES – Get the list of supported connector types
✅ **Use case**

You want to **retrieve all connector types supported by the server** to dynamically populate filters, dropdowns, or analytics in your application — ensuring that your UI always reflects up-to-date connector options.

💡 **What it does**

When you include `AVAILABLE_CONNECTOR_TYPES` in the `options` array, the API response will include a **dedicated list of all connector types** known and supported by the server or selected provider(s).
These connectors can then be reused for:

- Custom filters (`connectorIdFilters`)

- Form inputs

- Compatibility checks

🔧 **How to enable**
```
"options": ["AVAILABLE_CONNECTOR_TYPES"]
```
📦 **Example**
```
{
  "geoserver": "osm",
  "providers": ["ecoMovement"],
  "mode": "LOCAL_OR_REMOTE",
  "radius": 300,
  "coordinate": {
    "lat": 48.85693,
    "lon": 2.3412
  },
  "options": ["AVAILABLE_CONNECTOR_TYPES"]
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

- The connector list is returned **in addition** to the regular `stations` list.

- Use it to **build a compatible UI**, or to **validate connector IDs** dynamically.

- This is especially useful when the provider list (`providers`) or geoserver (`geoserver`) may change.
---
<a name="chargingstation_options_deprecatedConnector_tutorial"></a>

## ⚠️ DEPRECATED_CONNECTOR – Include deprecated connector types
✅ **Use case**

You want to **include outdated or legacy connector types** in your search results — for example, to support older vehicles, ensure backward compatibility, or perform a full network audit.

💡 **What it does**

By default, the API **filters out deprecated connector types** (e.g., connectors that are no longer installed or actively supported).
When you include `DEPRECATED_CONNECTOR`, the response will also contain **charging points using these outdated connector types.**

🔧 **How to enable**

```
"options": ["DEPRECATED_CONNECTOR"]
```
📦 **Example**
```
{
  "geoserver": "osm",
  "providers": ["ecoMovement"],
  "mode": "LOCAL_OR_REMOTE",
  "radius": 300,
  "coordinate": {
    "lat": 48.85693,
    "lon": 2.3412
  },
  "options": ["PATH_POINT", "DEPRECATED_CONNECTOR"]
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

- This option does **not filter or prioritize** deprecated connectors — it simply ensures they’re **not excluded.**

- Can be combined with `connectorIdFilters` if you specifically want to **target deprecated connectors**.

- Recommended for use cases like **infrastructure diagnostics**, **legacy fleet support**, or **technical validation**.
---
<a name="chargingstation_options_path_point_tutorial"></a>

## 🔍 PATH_POINT – Return full charging point information
✅ **Use case**

You need **detailed technical and availability information** about each individual **charging point** — for example, to show specs like power, connector types, and real-time status in your app.

💡 **What it does**

The `PATH_POINT` option configures the API to return **complete data at the charging point level**, including:

- Connector types and power

- Availability status

- Voltage, current type, and more

It is the **most detailed data depth**, ideal when you want to display or analyze every individual charge slot.

🔧 **How to enable**

```
"options": ["PATH_POINT"]
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
    }
  ]
}
```
📝 **Notes**

- Use this option when you want **fine control** over technical and operational display (e.g., filter by power or connector).

- Recommended for **vehicle compatibility checks, advanced search interfaces**, or **detailed map tooltips**.

- May increase response size for areas with many points.
---

<a name="chargingstation_options_path_point_map_tutorial"></a>

## 🗺️ PATH_POINT_MAP – Lightweight data for maps, with point-level filtering
✅ **Use case**

You want to **display charging pools on a map with fast performance**, but still be able to **filter results based on charging point characteristics**, like connector type or power.

💡 **What it does**

The `PATH_POINT_MAP` option returns a **minimal dataset per pool**, optimized for **fast rendering on maps**, while preserving the ability to **apply filters based on point-level data**.
You don’t get full point details in the response, but filters like `connectorIdFilters` and `filters` still work.

🔧 **How to enable**

```
"options": ["PATH_POINT_MAP"]
```
📦 **Example**
```
{
  "geoserver": "osm",
  "providers": ["ecoMovement"],
  "mode": "LOCAL_OR_REMOTE",
  "radius": 300,
  "coordinate": {
    "lat": 48.85693,
    "lon": 2.3412
  },
  "options": ["PATH_POINT_MAP"],
  "connectorIdFilters": [32]
}
```
**Response**
```
{
  "pools": [
    {
      "id": "8f709a26-466d-11e9-8601-42010a840003",
      "availabilityStatus": "NA",
      "longitude": 2.34014219,
      "latitude": 48.8543694,
      "maxNominalPower": 11
    }
  ]
}
```
📝 **Notes**

- Ideal for **large map views** (zoomed-out level) where performance matters.

- You can **filter by point data**, but you **don’t receive** that data in the response.

- Combine with `radius` and `filters` to keep control of search scope and criteria.
---
<a name="chargingstation_options_path_pool_tutorial"></a>

## 🏢 PATH_POOL – Return full pool-level information
✅ **Use case**

You want to retrieve **complete details about each charging pool**, such as the operator, number of points, address, and tags — without needing to go down to the individual connector level.

💡 **What it does**

The `PATH_POOL` option configures the API to return **full information at the pool level**. You’ll receive attributes such as:

- Pool name, address, and contact info

- Number of charging points

- Tags, access rules, operator, brand, etc.

However, **individual charging point details** (connectors, power, status) are **not included**.

🔧 **How to enable**
```
"options": ["PATH_POOL"]
```
📦 **Example**
```
{
  "geoserver": "osm",
  "providers": ["ecoMovement"],
  "mode": "LOCAL_OR_REMOTE",
  "radius": 300,
  "coordinate": {
    "lat": 48.85693,
    "lon": 2.3412
  },
  "options": ["PATH_POOL"]
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

- Use this option when you need a **summary per pool**, without diving into connector-level specs.

- Great for **directory listings**, **map clustering**, or **operator-focused filtering**.

- Filters on charging points (e.g., power or connector type) are **not effective** here.

---
<a name="chargingstation_options_path_pool_map_tutorial"></a>

## 🗺️ PATH_POOL_MAP – Minimal pool data for fast map display
✅ **Use case**

You want to **display charging pools on a map quickly**, with **minimal data** for each, focusing on location and basic identifiers — and you don’t need detailed filtering.

💡 **What it does**

The `PATH_POOL_MAP` option limits the API response to **only essential information per pool**, such as:

- Pool ID

- Location (latitude/longitude)

- Basic display label

This allows **fast loading on maps**, especially for wide areas or zoomed-out views. However, **filtering capabilities are limited**, particularly at the point/connector level.

🔧 **How to enable**

```
"options": ["PATH_POOL_MAP"]
```

📦 **Example**
```
{
  "geoserver": "osm",
  "providers": ["ecoMovement"],
  "mode": "LOCAL_OR_REMOTE",
  "radius": 3000,
  "coordinate": {
    "lat": 48.85693,
    "lon": 2.3412
  },
  "options": ["PATH_POOL_MAP"]
}
```
**Response**
```
{
  "pools": [
    {
      "id": "8f709a26-466d-11e9-8601-42010a840003",
      "availabilityStatus": "NA",
      "longitude": 2.34014219,
      "latitude": 48.8543694,
      "maxNominalPower": 11
    }
  ]
}
```
📝 Notes

Optimized for **map rendering performance**.

Best used when showing **many stations** at once (e.g., in large-scale overviews).

**Filtering is limited** to basic pool-level parameters; **connector filters will be ignored**.
---
<a name="chargingstation_options_path_station_tutorial"></a>

## 🏬 PATH_STATION – Return only station-level information
✅ **Use case**

You need a **high-level overview** of charging infrastructure, without going into pool or connector details — ideal for summary displays or dashboards.

💡 **What it does**

The `PATH_STATION` option limits the API response to **station-level metadata only**. Each station includes:

- Station ID

- Location (latitude/longitude)

- Basic details such as name, operator, or general status

It **excludes pools and charging points**, reducing payload size and complexity when you only need top-level locations.

🔧 **How to enable**
```
"options": ["PATH_STATION"]
```
📦 **Example**
```
{
  "geoserver": "osm",
  "providers": ["ecoMovement"],
  "mode": "LOCAL_OR_REMOTE",
  "radius": 300,
  "coordinate": {
    "lat": 48.85693,
    "lon": 2.3412
  },
  "options": ["PATH_STATION"]
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
          "bookable": false
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
          "bookable": false
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
          "bookable": false
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

Perfect for **station-level** analytics or **summary views**.

Use when you're **not interested** in pools or charging points.

Fastest response when the goal is **listing** or **geolocation only**.