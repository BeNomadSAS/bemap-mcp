# 🚧 Step-by-Step – Build Your First Charging Station Request
This tutorial walks you through **how to build a Charging Station API request** step by step, to search for EV charging stations around a specific location.

## 🧱 Step 1 – Choose the Geoserver
The `geoserver` defines which geospatial dataset you want to use (e.g. OpenStreetMap or a custom dataset).
```
"geoserver": "osm"
```
Most users can keep `"default"`.

---
## 🏢 Step 2 – Select the Provider(s)
Choose one or more charging station providers. Always use:
```
"providers": ["ecoMovement"]
```
This ensures compatibility with our standard coverage.

---
## 🧠 Step 3 – Set the Search Mode
The `mode` controls whether the search uses local cache or provider APIs. Use the recommended setting:
```
"mode": "LOCAL_OR_REMOTE"
```
This mode will use local data if possible, or fall back to remote provider search when needed.

---
## 📍 Step 4 – Define the Center Coordinate
Pick the center point for your search. Use WGS84 coordinates (decimal degrees):
```
"coordinate": {
  "lon": 2.3412,
  "lat": 48.8569
}
```
💡 Tip: You can use a map tool like [Google Maps](https://www.google.com/maps?q=48.8543694,2.34014219) to find precise coordinates.

---
## 📏 Step 5 – Set the Search Radius
Define how far (in meters) around your coordinate the system should look:
```
"radius": 300
```
Here, 300 meters = 0.3 km around the selected point.
---
🧪 Optional – Add Options (Advanced)
You can request extra detail using the options field. For example, to show connector-level info:
```
"options": ["PATH_POINT"]
```
See [Charging Station Options](index.html#subpage-rest_1_0_0-tutorials-chargingstation-service-v1_0_0-parameters.md#chargingstation_options_tutorial) for more.

🔗 See more details in the [API reference](index.html#subpage-rest_1_0_0-chargingstation-search-service.md).

---
## 📦 Final Request Example
Here is a complete example combining all the above steps:
```
{
  "geoserver": "osm",
  "providers": ["ecoMovement"],
  "mode": "LOCAL_OR_REMOTE",
  "radius": 300,
  "coordinate": {
    "lon": 2.3412,
    "lat": 48.8569
  },
  "options": ["PATH_POINT"]
}
```
🔗 Send this via **POST** to `/bgis/service/chargingstation/search/1.0`
Include header: `Content-Type: application/json`
---
## 📥 Response Analysis
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

When you send the request above, you receive a response containing a list of **charging station pools**. Below is a detailed breakdown of a typical response entry:

🔹 **Root Object: pools**

The root object is a list of `pools`, each representing a group of charging stations at a physical location. In this example, only one pool was returned.
---
## 🧾 Pool Information
| Field                                         | Description                                                       |
| --------------------------------------------- | ----------------------------------------------------------------- |
| `id`                                          | Unique ID of the pool                                             |
| `providerName`                                | Name of the data provider (e.g., `ecoMovement`)                   |
| `sourceProvider`                              | Real-world provider (e.g., `Tesla Destination`)                   |
| `brand`                                       | Brand associated with the pool                                    |
| `nameOfPool`                                  | Display name of the location                                      |
| `accessibility`                               | Whether the location is public or restricted (e.g., `RESTRICTED`) |
| `updateDate`                                  | Last update timestamp (Unix format)                               |
| `siteCategory`                                | Category of the site (e.g., `ON_STREET`)                          |
| `countryCode`, `city`, `street`, `postalCode` | Address details                                                   |
| `phoneNumber`                                 | Contact number for the location                                   |

---
### 🔌 Charging Stations (chargingStations)
Each pool contains one or more charging stations, represented by the chargingStations array.

Each station includes:

- `nature`: Always `"VGROUP"` (grouped station)

- `availabilityStatus`: May be `"NA"` if real-time data is not available

- `chargePasses`: Accepted charge passes (e.g., `Tesla`)

- `bookable`: Whether the station is reservable

- `chargingPoints`: One or more charging points available at this station

---
### ⚡ Charging Points
Each station includes one or more charging points, each with technical details:
| Field                        | Description                                                                  |
| ---------------------------- | ---------------------------------------------------------------------------- |
| `id`                         | Unique ID for the charging point                                             |
| `availabilityStatus`         | Real-time availability (if available)                                        |
| `type`                       | Internal connector type ID (e.g., 32)                                        |
| `currentType`                | AC or DC type (e.g., `AC_THREE_PHASES`)                                      |
| `voltage`, `ampere`, `power` | Electrical specifications                                                    |
| `connectorTypes`             | Array with detailed connector specs (standard, cable, deprecated flag, etc.) |

➡️ In this example, all charging points are **Type 2 (IEC 62196)**, with 11 kW power and three-phase AC.
---

### 🧮 Summary Fields

| Field                       | Description                                                  |
| --------------------------- | ------------------------------------------------------------ |
| `summaryOfConnectorTypeIds` | List of unique connector type IDs in the pool (e.g., `[32]`) |
| `maxNominalPower`           | Maximum power across all charging points                         |
| `numberOfChargingPoint`     | Total number of charging points in the pool                  |

### ✅ In Summary
This response tells you:

- There is one Tesla Destination charging location nearby.

- It offers 3 Type 2 connectors, all rated at 11 kW.

- The location is restricted access.

- No real-time availability info is provided (`availabilityStatus: NA`).

You can now use this structure to interpret any search results and optionally display them on a map or in your UI.