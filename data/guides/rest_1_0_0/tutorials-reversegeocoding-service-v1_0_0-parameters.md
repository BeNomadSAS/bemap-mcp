<a id="reverse_geocoding_parameters_tutorial"></a>

# ⚙️ Reverse Geocoding Parameters
This document explains in detail all the **parameters** you can use with the **Reverse Geocoding API** (`/bgis/service/geocoding/1.0/reverse`).

Each parameter controls how the service processes your request and what kind of results you receive: how many results, the search radius, the language and the transport mode.

Each section includes:

- ✅ A **use case**

- 💡 A short **description**

- 🔧 **How to include** it in your JSON request

- 📦 **Request example**

- 📝 **Notes** (when relevant)
---
## 🌍 coordinateSat – Define the GPS coordinates

✅ **Use case**
Specify the exact location (latitude & longitude) to reverse geocode and get the nearest address or place name.

💡 **Description**
Defines the geographical coordinates used to search for an address. This is the core parameter and mandatory.

🔧 **How to include**
```
"coordinateSat": {
  "lon": 7.13891,
  "lat": 43.647749
}
```
📦 **Example**
```
{
  "geoserver": "osm",
  "transportMode": "CAR",
  "maximumResults": 5,
  "coordinateSat": {
    "lon": 2.3412,
    "lat": 48.85693
  },
  "radius": 1000,
  "language": "en"
}
```
**Response**
```
{
  "extent": {
    "minLon": 2.34117,
    "minLat": 48.85686,
    "maxLon": 2.3413,
    "maxLat": 48.85696
  },
  "elements": [
    {
      "coordinate": {
        "lon": 2.34121,
        "lat": 48.85694
      },
      "distanceFromRequest": 1.33,
      "postalAddress": {
        "countryCode": "FRA",
        "country": "France",
        "state": "Île-de-France",
        "county": "Paris",
        "city": "Paris",
        "district": "Paris 1er Arrondissement",
        "postalCode": "75001",
        "roadNumber": "",
        "street": "Quai des Orfèvres"
      },
      "postalAddressClassType": "ROAD_FOURTH",
      "postalAddressClassId": 4048,
      "postalAddressExactStreeNumber": false,
      "angle": 149,
      "administrativeSpeedLimit": 30,
      "relevanceScore": 0.05327986839399546,
      "countryRelevanceScore": 0,
      "cityRelevanceScore": 0,
      "postalCodeRelevanceScore": 0,
      "streetRelevanceScore": 0,
      "streetNumberRelevanceScore": 0,
      "geoElementTypes": [
        "ROAD",
        "FOURTH_ROAD",
        "DISTRICT",
        "CITY",
        "COUNTY",
        "STATE",
        "COUNTRY"
      ],
      "segmentId": 0
    },
    {
      "coordinate": {
        "lon": 2.34117,
        "lat": 48.85694
      },
      "distanceFromRequest": 2.46,
      "postalAddress": {
        "countryCode": "FRA",
        "country": "France",
        "state": "Île-de-France",
        "county": "Paris",
        "city": "Paris",
        "district": "Paris 1er Arrondissement",
        "postalCode": "75000",
        "roadNumber": "",
        "street": "Place du Pont Neuf"
      },
      "postalAddressClassType": "ROAD_FOURTH",
      "postalAddressClassId": 4048,
      "postalAddressExactStreeNumber": false,
      "angle": -147,
      "administrativeSpeedLimit": 30,
      "relevanceScore": 0.05319761464116799,
      "countryRelevanceScore": 0,
      "cityRelevanceScore": 0,
      "postalCodeRelevanceScore": 0,
      "streetRelevanceScore": 0,
      "streetNumberRelevanceScore": 0,
      "geoElementTypes": [
        "ROAD",
        "FOURTH_ROAD",
        "DISTRICT",
        "CITY",
        "COUNTY",
        "STATE",
        "COUNTRY"
      ],
      "segmentId": 0
    },
    {
      "coordinate": {
        "lon": 2.34119,
        "lat": 48.85696
      },
      "distanceFromRequest": 3.42,
      "postalAddress": {
        "countryCode": "FRA",
        "country": "France",
        "state": "Île-de-France",
        "county": "Paris",
        "city": "Paris",
        "district": "Paris 1er Arrondissement",
        "postalCode": "75000",
        "roadNumber": "",
        "street": "Place du Pont Neuf"
      },
      "postalAddressClassType": "ROAD_FOURTH",
      "postalAddressClassId": 4048,
      "postalAddressExactStreeNumber": false,
      "angle": -148,
      "administrativeSpeedLimit": 30,
      "relevanceScore": 0.05309479745013365,
      "countryRelevanceScore": 0,
      "cityRelevanceScore": 0,
      "postalCodeRelevanceScore": 0,
      "streetRelevanceScore": 0,
      "streetNumberRelevanceScore": 0,
      "geoElementTypes": [
        "ROAD",
        "FOURTH_ROAD",
        "DISTRICT",
        "CITY",
        "COUNTY",
        "STATE",
        "COUNTRY"
      ],
      "segmentId": 0
    },
    {
      "coordinate": {
        "lon": 2.3413,
        "lat": 48.85688
      },
      "distanceFromRequest": 9.2,
      "postalAddress": {
        "countryCode": "FRA",
        "country": "France",
        "state": "Île-de-France",
        "county": "Paris",
        "city": "Paris",
        "district": "Paris 1er Arrondissement",
        "postalCode": "75001",
        "roadNumber": "",
        "street": "Place du Pont Neuf",
        "streetNumber": "15",
        "oppositeStreetNumber": "15"
      },
      "postalAddressClassType": "ROAD_FOURTH",
      "postalAddressClassId": 4048,
      "postalAddressExactStreeNumber": false,
      "angle": 35,
      "administrativeSpeedLimit": 30,
      "relevanceScore": 0.05190211803413529,
      "countryRelevanceScore": 0,
      "cityRelevanceScore": 0,
      "postalCodeRelevanceScore": 0,
      "streetRelevanceScore": 0,
      "streetNumberRelevanceScore": 0,
      "geoElementTypes": [
        "ROAD",
        "FOURTH_ROAD",
        "DISTRICT",
        "CITY",
        "COUNTY",
        "STATE",
        "COUNTRY"
      ],
      "segmentId": 0
    },
    {
      "coordinate": {
        "lon": 2.34128,
        "lat": 48.85686
      },
      "distanceFromRequest": 9.75,
      "postalAddress": {
        "countryCode": "FRA",
        "country": "France",
        "state": "Île-de-France",
        "county": "Paris",
        "city": "Paris",
        "district": "Paris 1er Arrondissement",
        "postalCode": "75001",
        "roadNumber": "",
        "street": "Quai des Orfèvres"
      },
      "postalAddressClassType": "ROAD_FOURTH",
      "postalAddressClassId": 4048,
      "postalAddressExactStreeNumber": false,
      "angle": 134,
      "administrativeSpeedLimit": 30,
      "relevanceScore": 0.05171704709027348,
      "countryRelevanceScore": 0,
      "cityRelevanceScore": 0,
      "postalCodeRelevanceScore": 0,
      "streetRelevanceScore": 0,
      "streetNumberRelevanceScore": 0,
      "geoElementTypes": [
        "ROAD",
        "FOURTH_ROAD",
        "DISTRICT",
        "CITY",
        "COUNTY",
        "STATE",
        "COUNTRY"
      ],
      "segmentId": 0
    }
  ],
  "maximunResult": 5
}
```
📝 **Notes**

- Uses the **WGS84 coordinate system** (standard GPS).
---
## 📏 radius – Limit search area

✅ **Use case**
Restrict results to addresses within a **specific distance** from the given GPS point.

💡 **Description**
Defines the **maximum search radius in meters**. Useful when you want to avoid irrelevant addresses far away from your coordinates.

🔧 **How to include**
```
"radius": 100
```
**Example**
```
{
  "coordinateSat": {
    "lon": 7.13891,
    "lat": 43.647749
  },
  "radius": 100,
  "maximumResults": 3
}
```
**Response**
```
{
  "extent": {
    "minLon": 7.13891,
    "minLat": 43.64767,
    "maxLon": 7.13903,
    "maxLat": 43.64784
  },
  "elements": [
    {
      "coordinate": {
        "lon": 7.13891,
        "lat": 43.64775
      },
      "distanceFromRequest": 0.11,
      "postalAddress": {
        "countryCode": "FRA",
        "country": "France",
        "state": "Provence-Alpes-Côte d'Azur",
        "county": "Alpes-Maritimes",
        "city": "Cagnes-sur-Mer",
        "postalCode": "06800",
        "roadNumber": "A8/E80",
        "street": "La Provençale"
      },
      "postalAddressClassType": "ROAD_MAIN_MOTORWAY",
      "postalAddressClassId": 4832,
      "postalAddressExactStreeNumber": false,
      "angle": -138,
      "administrativeSpeedLimit": 90,
      "relevanceScore": 0.08888279267539949,
      "countryRelevanceScore": 0,
      "cityRelevanceScore": 0,
      "postalCodeRelevanceScore": 0,
      "streetRelevanceScore": 0,
      "streetNumberRelevanceScore": 0,
      "geoElementTypes": [
        "MOTORWAY",
        "MAIN_ROAD",
        "CITY",
        "COUNTY",
        "STATE",
        "COUNTRY"
      ],
      "segmentId": 0
    },
    {
      "coordinate": {
        "lon": 7.13899,
        "lat": 43.64784
      },
      "distanceFromRequest": 12.01,
      "postalAddress": {
        "countryCode": "FRA",
        "country": "France",
        "state": "Provence-Alpes-Côte d'Azur",
        "county": "Alpes-Maritimes",
        "city": "Cagnes-sur-Mer",
        "postalCode": "06800",
        "roadNumber": "",
        "street": ""
      },
      "postalAddressClassType": "ROAD_FOURTH",
      "postalAddressClassId": 4048,
      "postalAddressExactStreeNumber": false,
      "angle": 123,
      "administrativeSpeedLimit": 30,
      "relevanceScore": 0.08459639256566764,
      "countryRelevanceScore": 0,
      "cityRelevanceScore": 0,
      "postalCodeRelevanceScore": 0,
      "streetRelevanceScore": 0,
      "streetNumberRelevanceScore": 0,
      "geoElementTypes": [
        "ROAD",
        "FOURTH_ROAD",
        "CITY",
        "COUNTY",
        "STATE",
        "COUNTRY"
      ],
      "segmentId": 0
    },
    {
      "coordinate": {
        "lon": 7.13903,
        "lat": 43.64767
      },
      "distanceFromRequest": 13.07,
      "postalAddress": {
        "countryCode": "FRA",
        "country": "France",
        "state": "Provence-Alpes-Côte d'Azur",
        "county": "Alpes-Maritimes",
        "city": "Cagnes-sur-Mer",
        "postalCode": "06800",
        "roadNumber": "A8/E80",
        "street": "La Provençale"
      },
      "postalAddressClassType": "ROAD_MAIN_MOTORWAY",
      "postalAddressClassId": 4832,
      "postalAddressExactStreeNumber": false,
      "angle": 42,
      "administrativeSpeedLimit": 110,
      "relevanceScore": 0.08439064536040052,
      "countryRelevanceScore": 0,
      "cityRelevanceScore": 0,
      "postalCodeRelevanceScore": 0,
      "streetRelevanceScore": 0,
      "streetNumberRelevanceScore": 0,
      "geoElementTypes": [
        "MOTORWAY",
        "MAIN_ROAD",
        "CITY",
        "COUNTY",
        "STATE",
        "COUNTRY"
      ],
      "segmentId": 0
    }
  ],
  "maximunResult": 3
}
```
📝 **Notes**

- If omitted, the service uses a **default radius**.
- Combine with `maximumResults` to refine results.
---
## 🗺️ geoserver – Choose your data source

✅ **Use case**
Select which **geoserver** (map provider) to use for reverse geocoding.

💡 **Description**
Specifies the **geoserver name** that will provide address data. Common values are `"osm"` or `"here"`.

🔧 **How to include**
```
"geoserver": "osm"
```
**Example**
```
{
  "geoserver": "osm",
  "transportMode": "CAR",
  "maximumResults": 5,
  "coordinateSat": {
    "lon": 2.3412,
    "lat": 48.85693
  },
  "radius": 100,
  "language": "en"
}
```
**Response**
```
{
  "extent": {
    "minLon": 2.34117,
    "minLat": 48.85686,
    "maxLon": 2.3413,
    "maxLat": 48.85696
  },
  "elements": [
    {
      "coordinate": {
        "lon": 2.34121,
        "lat": 48.85694
      },
      "distanceFromRequest": 1.33,
      "postalAddress": {
        "countryCode": "FRA",
        "country": "France",
        "state": "Île-de-France",
        "county": "Paris",
        "city": "Paris",
        "district": "Paris 1er Arrondissement",
        "postalCode": "75001",
        "roadNumber": "",
        "street": "Quai des Orfèvres"
      },
      "postalAddressClassType": "ROAD_FOURTH",
      "postalAddressClassId": 4048,
      "postalAddressExactStreeNumber": false,
      "angle": 149,
      "administrativeSpeedLimit": 30,
      "relevanceScore": 0.05327986839399546,
      "countryRelevanceScore": 0,
      "cityRelevanceScore": 0,
      "postalCodeRelevanceScore": 0,
      "streetRelevanceScore": 0,
      "streetNumberRelevanceScore": 0,
      "geoElementTypes": [
        "ROAD",
        "FOURTH_ROAD",
        "DISTRICT",
        "CITY",
        "COUNTY",
        "STATE",
        "COUNTRY"
      ],
      "segmentId": 0
    },
    {
      "coordinate": {
        "lon": 2.34117,
        "lat": 48.85694
      },
      "distanceFromRequest": 2.46,
      "postalAddress": {
        "countryCode": "FRA",
        "country": "France",
        "state": "Île-de-France",
        "county": "Paris",
        "city": "Paris",
        "district": "Paris 1er Arrondissement",
        "postalCode": "75000",
        "roadNumber": "",
        "street": "Place du Pont Neuf"
      },
      "postalAddressClassType": "ROAD_FOURTH",
      "postalAddressClassId": 4048,
      "postalAddressExactStreeNumber": false,
      "angle": -147,
      "administrativeSpeedLimit": 30,
      "relevanceScore": 0.05319761464116799,
      "countryRelevanceScore": 0,
      "cityRelevanceScore": 0,
      "postalCodeRelevanceScore": 0,
      "streetRelevanceScore": 0,
      "streetNumberRelevanceScore": 0,
      "geoElementTypes": [
        "ROAD",
        "FOURTH_ROAD",
        "DISTRICT",
        "CITY",
        "COUNTY",
        "STATE",
        "COUNTRY"
      ],
      "segmentId": 0
    },
    {
      "coordinate": {
        "lon": 2.34119,
        "lat": 48.85696
      },
      "distanceFromRequest": 3.42,
      "postalAddress": {
        "countryCode": "FRA",
        "country": "France",
        "state": "Île-de-France",
        "county": "Paris",
        "city": "Paris",
        "district": "Paris 1er Arrondissement",
        "postalCode": "75000",
        "roadNumber": "",
        "street": "Place du Pont Neuf"
      },
      "postalAddressClassType": "ROAD_FOURTH",
      "postalAddressClassId": 4048,
      "postalAddressExactStreeNumber": false,
      "angle": -148,
      "administrativeSpeedLimit": 30,
      "relevanceScore": 0.05309479745013365,
      "countryRelevanceScore": 0,
      "cityRelevanceScore": 0,
      "postalCodeRelevanceScore": 0,
      "streetRelevanceScore": 0,
      "streetNumberRelevanceScore": 0,
      "geoElementTypes": [
        "ROAD",
        "FOURTH_ROAD",
        "DISTRICT",
        "CITY",
        "COUNTY",
        "STATE",
        "COUNTRY"
      ],
      "segmentId": 0
    },
    {
      "coordinate": {
        "lon": 2.3413,
        "lat": 48.85688
      },
      "distanceFromRequest": 9.2,
      "postalAddress": {
        "countryCode": "FRA",
        "country": "France",
        "state": "Île-de-France",
        "county": "Paris",
        "city": "Paris",
        "district": "Paris 1er Arrondissement",
        "postalCode": "75001",
        "roadNumber": "",
        "street": "Place du Pont Neuf",
        "streetNumber": "15",
        "oppositeStreetNumber": "15"
      },
      "postalAddressClassType": "ROAD_FOURTH",
      "postalAddressClassId": 4048,
      "postalAddressExactStreeNumber": false,
      "angle": 35,
      "administrativeSpeedLimit": 30,
      "relevanceScore": 0.05190211803413529,
      "countryRelevanceScore": 0,
      "cityRelevanceScore": 0,
      "postalCodeRelevanceScore": 0,
      "streetRelevanceScore": 0,
      "streetNumberRelevanceScore": 0,
      "geoElementTypes": [
        "ROAD",
        "FOURTH_ROAD",
        "DISTRICT",
        "CITY",
        "COUNTY",
        "STATE",
        "COUNTRY"
      ],
      "segmentId": 0
    },
    {
      "coordinate": {
        "lon": 2.34128,
        "lat": 48.85686
      },
      "distanceFromRequest": 9.75,
      "postalAddress": {
        "countryCode": "FRA",
        "country": "France",
        "state": "Île-de-France",
        "county": "Paris",
        "city": "Paris",
        "district": "Paris 1er Arrondissement",
        "postalCode": "75001",
        "roadNumber": "",
        "street": "Quai des Orfèvres"
      },
      "postalAddressClassType": "ROAD_FOURTH",
      "postalAddressClassId": 4048,
      "postalAddressExactStreeNumber": false,
      "angle": 134,
      "administrativeSpeedLimit": 30,
      "relevanceScore": 0.05171704709027348,
      "countryRelevanceScore": 0,
      "cityRelevanceScore": 0,
      "postalCodeRelevanceScore": 0,
      "streetRelevanceScore": 0,
      "streetNumberRelevanceScore": 0,
      "geoElementTypes": [
        "ROAD",
        "FOURTH_ROAD",
        "DISTRICT",
        "CITY",
        "COUNTY",
        "STATE",
        "COUNTRY"
      ],
      "segmentId": 0
    }
  ],
  "maximunResult": 5
}
```
---
## 🈯 language – Set response language

✅ **Use case**
Retrieve addresses and place names in a **specific language**.

💡 **Description**
Defines the **language** used for the address lookup. If the requested language isn’t available, the service falls back to the **default language**.

🔧 **How to include**
```
"language": "fr"
```
**Example**
```
{
  "geoserver": "osm",
  "transportMode": "CAR",
  "maximumResults": 5,
  "coordinateSat": {
    "lon": 2.3412,
    "lat": 48.85693
  },
  "radius": 100,
  "language": "fr"
}
```
**Response**
```
{
  "extent": {
    "minLon": 2.34117,
    "minLat": 48.85686,
    "maxLon": 2.3413,
    "maxLat": 48.85696
  },
  "elements": [
    {
      "coordinate": {
        "lon": 2.34121,
        "lat": 48.85694
      },
      "distanceFromRequest": 1.33,
      "postalAddress": {
        "countryCode": "FRA",
        "country": "France",
        "state": "Île-de-France",
        "county": "Paris",
        "city": "Paris",
        "district": "Paris 1er Arrondissement",
        "postalCode": "75001",
        "roadNumber": "",
        "street": "Quai des Orfèvres"
      },
      "postalAddressClassType": "ROAD_FOURTH",
      "postalAddressClassId": 4048,
      "postalAddressExactStreeNumber": false,
      "angle": 149,
      "administrativeSpeedLimit": 30,
      "relevanceScore": 0.05327986839399546,
      "countryRelevanceScore": 0,
      "cityRelevanceScore": 0,
      "postalCodeRelevanceScore": 0,
      "streetRelevanceScore": 0,
      "streetNumberRelevanceScore": 0,
      "geoElementTypes": [
        "ROAD",
        "FOURTH_ROAD",
        "DISTRICT",
        "CITY",
        "COUNTY",
        "STATE",
        "COUNTRY"
      ],
      "segmentId": 0
    },
    {
      "coordinate": {
        "lon": 2.34117,
        "lat": 48.85694
      },
      "distanceFromRequest": 2.46,
      "postalAddress": {
        "countryCode": "FRA",
        "country": "France",
        "state": "Île-de-France",
        "county": "Paris",
        "city": "Paris",
        "district": "Paris 1er Arrondissement",
        "postalCode": "75000",
        "roadNumber": "",
        "street": "Place du Pont Neuf"
      },
      "postalAddressClassType": "ROAD_FOURTH",
      "postalAddressClassId": 4048,
      "postalAddressExactStreeNumber": false,
      "angle": -147,
      "administrativeSpeedLimit": 30,
      "relevanceScore": 0.05319761464116799,
      "countryRelevanceScore": 0,
      "cityRelevanceScore": 0,
      "postalCodeRelevanceScore": 0,
      "streetRelevanceScore": 0,
      "streetNumberRelevanceScore": 0,
      "geoElementTypes": [
        "ROAD",
        "FOURTH_ROAD",
        "DISTRICT",
        "CITY",
        "COUNTY",
        "STATE",
        "COUNTRY"
      ],
      "segmentId": 0
    },
    {
      "coordinate": {
        "lon": 2.34119,
        "lat": 48.85696
      },
      "distanceFromRequest": 3.42,
      "postalAddress": {
        "countryCode": "FRA",
        "country": "France",
        "state": "Île-de-France",
        "county": "Paris",
        "city": "Paris",
        "district": "Paris 1er Arrondissement",
        "postalCode": "75000",
        "roadNumber": "",
        "street": "Place du Pont Neuf"
      },
      "postalAddressClassType": "ROAD_FOURTH",
      "postalAddressClassId": 4048,
      "postalAddressExactStreeNumber": false,
      "angle": -148,
      "administrativeSpeedLimit": 30,
      "relevanceScore": 0.05309479745013365,
      "countryRelevanceScore": 0,
      "cityRelevanceScore": 0,
      "postalCodeRelevanceScore": 0,
      "streetRelevanceScore": 0,
      "streetNumberRelevanceScore": 0,
      "geoElementTypes": [
        "ROAD",
        "FOURTH_ROAD",
        "DISTRICT",
        "CITY",
        "COUNTY",
        "STATE",
        "COUNTRY"
      ],
      "segmentId": 0
    },
    {
      "coordinate": {
        "lon": 2.3413,
        "lat": 48.85688
      },
      "distanceFromRequest": 9.2,
      "postalAddress": {
        "countryCode": "FRA",
        "country": "France",
        "state": "Île-de-France",
        "county": "Paris",
        "city": "Paris",
        "district": "Paris 1er Arrondissement",
        "postalCode": "75001",
        "roadNumber": "",
        "street": "Place du Pont Neuf",
        "streetNumber": "15",
        "oppositeStreetNumber": "15"
      },
      "postalAddressClassType": "ROAD_FOURTH",
      "postalAddressClassId": 4048,
      "postalAddressExactStreeNumber": false,
      "angle": 35,
      "administrativeSpeedLimit": 30,
      "relevanceScore": 0.05190211803413529,
      "countryRelevanceScore": 0,
      "cityRelevanceScore": 0,
      "postalCodeRelevanceScore": 0,
      "streetRelevanceScore": 0,
      "streetNumberRelevanceScore": 0,
      "geoElementTypes": [
        "ROAD",
        "FOURTH_ROAD",
        "DISTRICT",
        "CITY",
        "COUNTY",
        "STATE",
        "COUNTRY"
      ],
      "segmentId": 0
    },
    {
      "coordinate": {
        "lon": 2.34128,
        "lat": 48.85686
      },
      "distanceFromRequest": 9.75,
      "postalAddress": {
        "countryCode": "FRA",
        "country": "France",
        "state": "Île-de-France",
        "county": "Paris",
        "city": "Paris",
        "district": "Paris 1er Arrondissement",
        "postalCode": "75001",
        "roadNumber": "",
        "street": "Quai des Orfèvres"
      },
      "postalAddressClassType": "ROAD_FOURTH",
      "postalAddressClassId": 4048,
      "postalAddressExactStreeNumber": false,
      "angle": 134,
      "administrativeSpeedLimit": 30,
      "relevanceScore": 0.05171704709027348,
      "countryRelevanceScore": 0,
      "cityRelevanceScore": 0,
      "postalCodeRelevanceScore": 0,
      "streetRelevanceScore": 0,
      "streetNumberRelevanceScore": 0,
      "geoElementTypes": [
        "ROAD",
        "FOURTH_ROAD",
        "DISTRICT",
        "CITY",
        "COUNTY",
        "STATE",
        "COUNTRY"
      ],
      "segmentId": 0
    }
  ],
  "maximunResult": 5
}
```
📝 Notes

- Accepts **ISO 639-1** two-letter codes (e.g. `"en"`, `"fr"`, `"es"`).
- Special value `"IC"` → performs a **case-insensitive country code search** based on ISO-3166 Alpha-2 or Alpha-3 codes.
---
## 🔢 maximumResults – Limit number of results

✅ **Use case**
Control how many possible addresses are returned in the response.

💡 **Description**
Sets the **maximum number of addresses** or places returned by the API.

🔧 **How to include**
```
"maximumResults": 5
```
**Example**
```
{
  "geoserver": "osm",
  "transportMode": "CAR",
  "maximumResults": 5,
  "coordinateSat": {
    "lon": 2.3412,
    "lat": 48.85693
  },
  "radius": 100,
  "language": "fr"
}
```
**Response**
```
{
  "extent": {
    "minLon": 2.34117,
    "minLat": 48.85686,
    "maxLon": 2.3413,
    "maxLat": 48.85696
  },
  "elements": [
    {
      "coordinate": {
        "lon": 2.34121,
        "lat": 48.85694
      },
      "distanceFromRequest": 1.33,
      "postalAddress": {
        "countryCode": "FRA",
        "country": "France",
        "state": "Île-de-France",
        "county": "Paris",
        "city": "Paris",
        "district": "Paris 1er Arrondissement",
        "postalCode": "75001",
        "roadNumber": "",
        "street": "Quai des Orfèvres"
      },
      "postalAddressClassType": "ROAD_FOURTH",
      "postalAddressClassId": 4048,
      "postalAddressExactStreeNumber": false,
      "angle": 149,
      "administrativeSpeedLimit": 30,
      "relevanceScore": 0.05327986839399546,
      "countryRelevanceScore": 0,
      "cityRelevanceScore": 0,
      "postalCodeRelevanceScore": 0,
      "streetRelevanceScore": 0,
      "streetNumberRelevanceScore": 0,
      "geoElementTypes": [
        "ROAD",
        "FOURTH_ROAD",
        "DISTRICT",
        "CITY",
        "COUNTY",
        "STATE",
        "COUNTRY"
      ],
      "segmentId": 0
    },
    {
      "coordinate": {
        "lon": 2.34117,
        "lat": 48.85694
      },
      "distanceFromRequest": 2.46,
      "postalAddress": {
        "countryCode": "FRA",
        "country": "France",
        "state": "Île-de-France",
        "county": "Paris",
        "city": "Paris",
        "district": "Paris 1er Arrondissement",
        "postalCode": "75000",
        "roadNumber": "",
        "street": "Place du Pont Neuf"
      },
      "postalAddressClassType": "ROAD_FOURTH",
      "postalAddressClassId": 4048,
      "postalAddressExactStreeNumber": false,
      "angle": -147,
      "administrativeSpeedLimit": 30,
      "relevanceScore": 0.05319761464116799,
      "countryRelevanceScore": 0,
      "cityRelevanceScore": 0,
      "postalCodeRelevanceScore": 0,
      "streetRelevanceScore": 0,
      "streetNumberRelevanceScore": 0,
      "geoElementTypes": [
        "ROAD",
        "FOURTH_ROAD",
        "DISTRICT",
        "CITY",
        "COUNTY",
        "STATE",
        "COUNTRY"
      ],
      "segmentId": 0
    },
    {
      "coordinate": {
        "lon": 2.34119,
        "lat": 48.85696
      },
      "distanceFromRequest": 3.42,
      "postalAddress": {
        "countryCode": "FRA",
        "country": "France",
        "state": "Île-de-France",
        "county": "Paris",
        "city": "Paris",
        "district": "Paris 1er Arrondissement",
        "postalCode": "75000",
        "roadNumber": "",
        "street": "Place du Pont Neuf"
      },
      "postalAddressClassType": "ROAD_FOURTH",
      "postalAddressClassId": 4048,
      "postalAddressExactStreeNumber": false,
      "angle": -148,
      "administrativeSpeedLimit": 30,
      "relevanceScore": 0.05309479745013365,
      "countryRelevanceScore": 0,
      "cityRelevanceScore": 0,
      "postalCodeRelevanceScore": 0,
      "streetRelevanceScore": 0,
      "streetNumberRelevanceScore": 0,
      "geoElementTypes": [
        "ROAD",
        "FOURTH_ROAD",
        "DISTRICT",
        "CITY",
        "COUNTY",
        "STATE",
        "COUNTRY"
      ],
      "segmentId": 0
    },
    {
      "coordinate": {
        "lon": 2.3413,
        "lat": 48.85688
      },
      "distanceFromRequest": 9.2,
      "postalAddress": {
        "countryCode": "FRA",
        "country": "France",
        "state": "Île-de-France",
        "county": "Paris",
        "city": "Paris",
        "district": "Paris 1er Arrondissement",
        "postalCode": "75001",
        "roadNumber": "",
        "street": "Place du Pont Neuf",
        "streetNumber": "15",
        "oppositeStreetNumber": "15"
      },
      "postalAddressClassType": "ROAD_FOURTH",
      "postalAddressClassId": 4048,
      "postalAddressExactStreeNumber": false,
      "angle": 35,
      "administrativeSpeedLimit": 30,
      "relevanceScore": 0.05190211803413529,
      "countryRelevanceScore": 0,
      "cityRelevanceScore": 0,
      "postalCodeRelevanceScore": 0,
      "streetRelevanceScore": 0,
      "streetNumberRelevanceScore": 0,
      "geoElementTypes": [
        "ROAD",
        "FOURTH_ROAD",
        "DISTRICT",
        "CITY",
        "COUNTY",
        "STATE",
        "COUNTRY"
      ],
      "segmentId": 0
    },
    {
      "coordinate": {
        "lon": 2.34128,
        "lat": 48.85686
      },
      "distanceFromRequest": 9.75,
      "postalAddress": {
        "countryCode": "FRA",
        "country": "France",
        "state": "Île-de-France",
        "county": "Paris",
        "city": "Paris",
        "district": "Paris 1er Arrondissement",
        "postalCode": "75001",
        "roadNumber": "",
        "street": "Quai des Orfèvres"
      },
      "postalAddressClassType": "ROAD_FOURTH",
      "postalAddressClassId": 4048,
      "postalAddressExactStreeNumber": false,
      "angle": 134,
      "administrativeSpeedLimit": 30,
      "relevanceScore": 0.05171704709027348,
      "countryRelevanceScore": 0,
      "cityRelevanceScore": 0,
      "postalCodeRelevanceScore": 0,
      "streetRelevanceScore": 0,
      "streetNumberRelevanceScore": 0,
      "geoElementTypes": [
        "ROAD",
        "FOURTH_ROAD",
        "DISTRICT",
        "CITY",
        "COUNTY",
        "STATE",
        "COUNTRY"
      ],
      "segmentId": 0
    }
  ],
  "maximunResult": 5
}
```
---
## 🚗 transportMode – Specify transport mode

✅ **Use case**
Adapt reverse geocoding results to a **specific transport mode** (e.g. car, pedestrian, truck).

💡 **Description**
Some roads and addresses vary depending on the **type of vehicle** or transport. Supported values:

- `CAR`
- `PEDESTRIAN`
- `BICYCLE`
- `TRUCK`
- `MOTORCYCLE`
- `PUBLIC_BUS`
- `TAXI`
- `EMERGENCY`

🔧 **How to include**
```
"transportMode": "CAR"
```
**Example**
```
{
  "geoserver": "here",
  "transportMode": "CAR",
  "maximumResults": 5,
  "coordinateSat": {
    "lon": 2.3412,
    "lat": 48.85693
  },
  "radius": 1000,
  "language": "en"
}
```
**Response**
```
{
  "extent": {
    "minLon": 2.34117,
    "minLat": 48.85685,
    "maxLon": 2.34128,
    "maxLat": 48.85693
  },
  "elements": [
    {
      "coordinate": {
        "lon": 2.3412,
        "lat": 48.85693
      },
      "distanceFromRequest": 0,
      "postalAddress": {
        "countryCode": "FRA",
        "country": "France",
        "state": "Île-de-France",
        "county": "Paris",
        "city": "Paris",
        "district": "Paris 1er Arrondissement",
        "postalCode": "75001",
        "roadNumber": "",
        "street": "Place du Pont-Neuf"
      },
      "postalAddressClassType": "ROAD_TERTIARY",
      "postalAddressClassId": 4304,
      "postalAddressExactStreeNumber": false,
      "angle": 31,
      "administrativeSpeedLimit": 30,
      "relevanceScore": 0.05719455416050664,
      "countryRelevanceScore": 0,
      "cityRelevanceScore": 0,
      "postalCodeRelevanceScore": 0,
      "streetRelevanceScore": 0,
      "streetNumberRelevanceScore": 0,
      "geoElementTypes": [
        "ROAD",
        "TERTIARY_ROAD",
        "DISTRICT",
        "CITY",
        "COUNTY",
        "STATE",
        "COUNTRY"
      ],
      "segmentId": 0
    },
    {
      "coordinate": {
        "lon": 2.34117,
        "lat": 48.8569
      },
      "distanceFromRequest": 4,
      "postalAddress": {
        "countryCode": "FRA",
        "country": "France",
        "state": "Île-de-France",
        "county": "Paris",
        "city": "Paris",
        "district": "Paris 1er Arrondissement",
        "postalCode": "75001",
        "roadNumber": "",
        "street": "Quai des Orfèvres"
      },
      "postalAddressClassType": "ROAD_FOURTH",
      "postalAddressClassId": 4048,
      "postalAddressExactStreeNumber": false,
      "angle": 137,
      "administrativeSpeedLimit": 30,
      "relevanceScore": 0.056907698757695455,
      "countryRelevanceScore": 0,
      "cityRelevanceScore": 0,
      "postalCodeRelevanceScore": 0,
      "streetRelevanceScore": 0,
      "streetNumberRelevanceScore": 0,
      "geoElementTypes": [
        "ROAD",
        "FOURTH_ROAD",
        "DISTRICT",
        "CITY",
        "COUNTY",
        "STATE",
        "COUNTRY"
      ],
      "segmentId": 0
    },
    {
      "coordinate": {
        "lon": 2.34117,
        "lat": 48.8569
      },
      "distanceFromRequest": 4,
      "postalAddress": {
        "countryCode": "FRA",
        "country": "France",
        "state": "Île-de-France",
        "county": "Paris",
        "city": "Paris",
        "district": "Paris 1er Arrondissement",
        "postalCode": "75001",
        "roadNumber": "",
        "street": "Pont Neuf"
      },
      "postalAddressClassType": "ROAD_TERTIARY",
      "postalAddressClassId": 4304,
      "postalAddressExactStreeNumber": false,
      "angle": 31,
      "administrativeSpeedLimit": 30,
      "relevanceScore": 0.056907698757695455,
      "countryRelevanceScore": 0,
      "cityRelevanceScore": 0,
      "postalCodeRelevanceScore": 0,
      "streetRelevanceScore": 0,
      "streetNumberRelevanceScore": 0,
      "geoElementTypes": [
        "ROAD",
        "TERTIARY_ROAD",
        "DISTRICT",
        "CITY",
        "COUNTY",
        "STATE",
        "COUNTRY"
      ],
      "segmentId": 0
    },
    {
      "coordinate": {
        "lon": 2.34128,
        "lat": 48.85689
      },
      "distanceFromRequest": 7.36,
      "postalAddress": {
        "countryCode": "FRA",
        "country": "France",
        "state": "Île-de-France",
        "county": "Paris",
        "city": "Paris",
        "district": "Paris 1er Arrondissement",
        "postalCode": "75001",
        "roadNumber": "",
        "street": ""
      },
      "postalAddressClassType": "ROAD_FOURTH",
      "postalAddressClassId": 4048,
      "postalAddressExactStreeNumber": false,
      "angle": 35,
      "administrativeSpeedLimit": 30,
      "relevanceScore": 0.056201593150775615,
      "countryRelevanceScore": 0,
      "cityRelevanceScore": 0,
      "postalCodeRelevanceScore": 0,
      "streetRelevanceScore": 0,
      "streetNumberRelevanceScore": 0,
      "geoElementTypes": [
        "ROAD",
        "FOURTH_ROAD",
        "DISTRICT",
        "CITY",
        "COUNTY",
        "STATE",
        "COUNTRY"
      ],
      "segmentId": 0
    },
    {
      "coordinate": {
        "lon": 2.34124,
        "lat": 48.85685
      },
      "distanceFromRequest": 9.37,
      "postalAddress": {
        "countryCode": "FRA",
        "country": "France",
        "state": "Île-de-France",
        "county": "Paris",
        "city": "Paris",
        "district": "Paris 1er Arrondissement",
        "postalCode": "75001",
        "roadNumber": "",
        "street": ""
      },
      "postalAddressClassType": "ROAD_FOURTH",
      "postalAddressClassId": 4048,
      "postalAddressExactStreeNumber": false,
      "angle": 41,
      "administrativeSpeedLimit": 30,
      "relevanceScore": 0.05562788234515325,
      "countryRelevanceScore": 0,
      "cityRelevanceScore": 0,
      "postalCodeRelevanceScore": 0,
      "streetRelevanceScore": 0,
      "streetNumberRelevanceScore": 0,
      "geoElementTypes": [
        "ROAD",
        "FOURTH_ROAD",
        "DISTRICT",
        "CITY",
        "COUNTY",
        "STATE",
        "COUNTRY"
      ],
      "segmentId": 0
    }
  ],
  "maximunResult": 5
}
```

---

_BeNomad MCP: a tutorial BeMap does not publish yet, served until it does (BEMAP-1938)._
