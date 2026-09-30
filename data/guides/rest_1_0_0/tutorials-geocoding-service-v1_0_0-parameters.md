# 📖 Geocoding API – Parameters Overview

The Geocoding API accepts several parameters that control how the address lookup is performed and how results are returned.  
They fall into two categories: **mandatory** and **optional**.

---

## ✅ Mandatory

- **`address`**  
  Defines the postal address to geocode. It can contain fields such as `country`, `city`, `street`, `postalCode`, etc.  
  👉 At least `country` or `countryCode`, or alternatively a `boundingBox`, must be provided.

---

## ⚙️ Optional

- **`boundingBox`**  
  Defines a rectangular area (in WGS84 coordinates) that restricts the search. Useful when the same address exists in multiple regions. It can stand in for the country of `address`, never for `address` itself: a bounding box without an address is refused.

- **`assetSearchType`**  
  Defines the type of object to search for. Possible values: `CITY_CENTER`, `OBJECT`, `POI`, `ROAD`.

- **`geoserver`**  
  Name of the geoserver to use. Example: `here`, `osm`.

- **`language`**  
  Language code (ISO 639-1, 2 letters) for the address lookup.  
  Special value: `"IC"` → case-insensitive search by country code (ISO-3166 Alpha-2 or Alpha-3).

- **`maximumResults`**  
  Maximum number of results returned by the server. Type: `int`.

- **`searchType`**  
  Controls how the input string is matched. Possible values:  
  - `CONTAINS` → pattern must be contained in the results.  
  - `FUZZY` → fuzzy matching (typos tolerated).  
  - `KEY_SEARCH` → search by unique identifiers.  
  - `STRICT` → exact match only.  
  - `STRICT_BEGINNING` → result must start with the pattern.  
  - `WORD_BEGINNING` → one word must begin with the pattern.

---

## 📦 Example (overview)

```
{
  "geoserver": "osm",
  "address": {
    "country": "France",
    "city": "Paris",
    "street": "villa des pyrénées"
  },
  "boundingBox": {
    "minLat": 48.80,
    "minLon": 2.25,
    "maxLat": 48.90,
    "maxLon": 2.45
  },
  "assetSearchType": "POI",
  "searchType": "FUZZY",
  "maximumResults": 3,
  "language": "fr"
}
```

➡️ This request searches for “Villa des Pyrénées, Paris” within the specified bounding box, returning up to 3 results in French, using fuzzy matching.
---
## 📐 BoundingBox

✅ **Use case**
Limit the geocoding search to a **specific area** (e.g. a city or trip corridor), to avoid irrelevant results from other regions.

💡 **What it does**
The service only returns addresses **inside the defined rectangle** (WGS84 coordinates).

🔧 **How to enable**
Add the `boundingBox` field in the request body with 4 coordinates: `maxLat`, `maxLon`, `minLat`, `minLon`.

📦 **Example**
```
{
  "geoserver": "osm",
  "address": {
    "city": "Paris",
    "street": "rue de la paix"
  },
  "boundingBox": {
    "maxLat": 48.95,
    "maxLon": 2.50,
    "minLat": 48.80,
    "minLon": 2.25
  },
  "language": "fr",
  "maximumResults": 3
}
```

📤 **Response**
```
{
  "extent": {
    "minLon": 2.33027,
    "minLat": 48.86832,
    "maxLon": 2.33223,
    "maxLat": 48.87021
  },
  "elements": [
    {
      "boundingBox": {
        "minLon": 2.33027,
        "minLat": 48.86832,
        "maxLon": 2.33223,
        "maxLat": 48.87021
      },
      "coordinate": {
        "lon": 2.33044,
        "lat": 48.8685
      },
      "distanceFromRequest": 0,
      "postalAddress": {
        "countryCode": "FRA",
        "country": "France",
        "state": "Île-de-France",
        "county": "Paris",
        "city": "Paris",
        "district": "Paris 2e Arrondissement",
        "postalCode": "75002",
        "street": "Rue de la Paix"
      },
      "postalAddressClassType": "ROAD_TERTIARY",
      "postalAddressClassId": 4304,
      "postalAddressExactStreeNumber": false,
      "angle": -147,
      "administrativeSpeedLimit": 0,
      "relevanceScore": 1,
      "countryRelevanceScore": 1,
      "cityRelevanceScore": 0.75,
      "postalCodeRelevanceScore": 1,
      "streetRelevanceScore": 1,
      "streetNumberRelevanceScore": 0,
      "segmentId": 0
    },
    {
      "coordinate": {
        "lon": 2.33215,
        "lat": 48.87041
      },
      "exactCoordinate": {
        "lon": 2.33239,
        "lat": 48.87045
      },
      "distanceFromRequest": 18.13,
      "postalAddress": {
        "countryCode": "FRA",
        "country": "France",
        "state": "Île-de-France",
        "county": "Paris",
        "city": "Paris",
        "district": "Paris 2e Arrondissement",
        "postalCode": "75002",
        "roadNumber": "",
        "street": "Rue de la Paix, Place de l'Opéra",
        "streetNumber": "3",
        "oppositeStreetNumber": "3"
      },
      "postalAddressClassType": "__NOT_MAPPED",
      "postalAddressClassId": 9942,
      "postalAddressExactStreeNumber": false,
      "angle": 166,
      "administrativeSpeedLimit": 30,
      "relevanceScore": 1,
      "countryRelevanceScore": 1,
      "cityRelevanceScore": 0.75,
      "postalCodeRelevanceScore": 1,
      "streetRelevanceScore": 1,
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
      "boundingBox": {
        "minLon": 2.33027,
        "minLat": 48.86832,
        "maxLon": 2.33223,
        "maxLat": 48.87021
      },
      "coordinate": {
        "lon": 2.33044,
        "lat": 48.8685
      },
      "distanceFromRequest": 0,
      "postalAddress": {
        "countryCode": "FRA",
        "country": "France",
        "state": "Île-de-France",
        "county": "Paris",
        "city": "Paris",
        "district": "Quartier Gaillon",
        "postalCode": "75002",
        "street": "Rue de la Paix"
      },
      "postalAddressClassType": "ROAD_TERTIARY",
      "postalAddressClassId": 4304,
      "postalAddressExactStreeNumber": false,
      "angle": -147,
      "administrativeSpeedLimit": 0,
      "relevanceScore": 1,
      "countryRelevanceScore": 1,
      "cityRelevanceScore": 0.35,
      "postalCodeRelevanceScore": 1,
      "streetRelevanceScore": 1,
      "streetNumberRelevanceScore": 0,
      "segmentId": 0
    }
  ],
  "maximunResult": 3
}
```

---

## 🏠 Address

✅ **Use case**  
Provide a **postal address** (country, city, street, etc.) that you want to convert into geographical coordinates.  

💡 **What it does**  
The service parses the given address fields and returns one or more **matching locations** with longitude/latitude coordinates.  

🔧 **How to enable**  
Include the `address` object in the request body.  
You can specify any combination of fields: `country`, `countryCode`, `city`, `district`, `postalCode`, `street`, `streetNumber`, etc.  

📦 **Example**  
```
{
  "geoserver": "osm",
  "address": {
    "country": "France",
    "city": "Paris",
    "street": "Rue de Rivoli",
    "streetNumber": "99"
  },
  "language": "fr",
  "maximumResults": 1
}
```

**Response**
```
{
  "extent": {
    "minLon": 2.32341,
    "minLat": 48.85852,
    "maxLon": 2.3482,
    "maxLat": 48.86637
  },
  "elements": [
    {
      "boundingBox": {
        "minLon": 2.32341,
        "minLat": 48.85852,
        "maxLon": 2.3482,
        "maxLat": 48.86637
      },
      "coordinate": {
        "lon": 2.33491,
        "lat": 48.86284
      },
      "exactCoordinate": {
        "lon": 2.33482,
        "lat": 48.86273
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
        "street": "Rue de Rivoli",
        "streetNumber": "99"
      },
      "postalAddressClassType": "ROAD_TERTIARY",
      "postalAddressClassId": 4304,
      "postalAddressExactStreeNumber": true,
      "angle": 117,
      "administrativeSpeedLimit": 0,
      "relevanceScore": 1,
      "countryRelevanceScore": 1,
      "cityRelevanceScore": 0.75,
      "postalCodeRelevanceScore": 1,
      "streetRelevanceScore": 1,
      "streetNumberRelevanceScore": 1,
      "segmentId": 0
    }
  ],
  "maximunResult": 1
}
```
---
## 🌐 Language

✅ **Use case**  
Control the **language** used for address lookup and returned results (street names, city names, etc.).  

💡 **What it does**  
If the requested language is available, the response will return the address in that language.  
If not, the **default language** of the geoserver will be used.  
The lookup reads the address in that language too, so write it in the language you ask for: Deutschland and München with `de`, Germany and Munich with `en`. English names sent with `de` find nothing.  
Special value `"IC"` allows case-insensitive search by ISO country codes.  

🔧 **How to enable**  
Add the `language` field in the request body with an **ISO 639-1** 2-letter code (e.g. `fr`, `en`, `de`).  

📦 **Example**  
```
{
  "geoserver": "osm",
  "address": {
    "country": "Deutschland",
    "city": "München",
    "street": "Marienplatz"
  },
  "language": "de",
  "maximumResults": 1
}
```
**Response**
```
{
  "extent": {
    "minLon": 11.57464,
    "minLat": 48.1365,
    "maxLon": 11.57727,
    "maxLat": 48.13758
  },
  "elements": [
    {
      "boundingBox": {
        "minLon": 11.57464,
        "minLat": 48.1365,
        "maxLon": 11.57727,
        "maxLat": 48.13758
      },
      "coordinate": {
        "lon": 11.5747,
        "lat": 48.13728
      },
      "distanceFromRequest": 0,
      "postalAddress": {
        "countryCode": "DEU",
        "country": "Deutschland",
        "state": "Bayern",
        "county": "München",
        "city": "München",
        "district": "Altstadt-Lehel",
        "postalCode": "80331",
        "street": "Marienplatz"
      },
      "postalAddressClassType": "ROAD_FOURTH_PEDESTRIAN",
      "postalAddressClassId": 4000,
      "postalAddressExactStreeNumber": false,
      "angle": 22,
      "administrativeSpeedLimit": 0,
      "relevanceScore": 1,
      "countryRelevanceScore": 1,
      "cityRelevanceScore": 0.28,
      "postalCodeRelevanceScore": 1,
      "streetRelevanceScore": 1,
      "streetNumberRelevanceScore": 0,
      "segmentId": 0
    }
  ],
  "maximunResult": 1
}
```
---
## 🔍 searchType

✅ **Use case**  
Control the **matching strategy** used when searching for addresses. Useful to handle typos, partial inputs, or strict searches.  

💡 **What it does**  
Determines how the service compares the input text with stored addresses:  
- `CONTAINS` → match if the input is contained in the address.  
- `FUZZY` → allows typos or misspellings (fuzzy search).  
- `KEY_SEARCH` → search by key identifiers (IDs).  
- `STRICT` → exact match only.  
- `STRICT_BEGINNING` → match must start with the input string.  
- `WORD_BEGINNING` → match if one word begins with the input (separators: space, `-`, `/`).  

🔧 **How to enable**  
Add the `searchType` field in the request body with one of the supported values.  

📦 **Example**  
```
{
  "geoserver": "osm",
  "address": {
    "country": "France",
    "city": "Paris",
    "street": "villa des pyrenes"
  },
  "searchType": "FUZZY",
  "maximumResults": 2,
  "language": "fr"
}
```
**Response**
```
{
  "extent": {
    "minLon": 2.4052,
    "minLat": 48.8533,
    "maxLon": 2.40586,
    "maxLat": 48.85355
  },
  "elements": [
    {
      "boundingBox": {
        "minLon": 2.4052,
        "minLat": 48.8533,
        "maxLon": 2.40586,
        "maxLat": 48.85355
      },
      "coordinate": {
        "lon": 2.40553,
        "lat": 48.85342
      },
      "distanceFromRequest": 0,
      "postalAddress": {
        "countryCode": "FRA",
        "country": "France",
        "state": "Île-de-France",
        "county": "Paris",
        "city": "Paris",
        "district": "Paris 20e Arrondissement",
        "postalCode": "75020",
        "street": "Villa des Pyrénées"
      },
      "postalAddressClassType": "ROAD_FOURTH",
      "postalAddressClassId": 4048,
      "postalAddressExactStreeNumber": false,
      "angle": 60,
      "administrativeSpeedLimit": 0,
      "relevanceScore": 0.98,
      "countryRelevanceScore": 1,
      "cityRelevanceScore": 0.75,
      "postalCodeRelevanceScore": 1,
      "streetRelevanceScore": 0.98,
      "streetNumberRelevanceScore": 0,
      "segmentId": 0
    },
    {
      "boundingBox": {
        "minLon": 2.4052,
        "minLat": 48.8533,
        "maxLon": 2.40586,
        "maxLat": 48.85355
      },
      "coordinate": {
        "lon": 2.40553,
        "lat": 48.85342
      },
      "distanceFromRequest": 0,
      "postalAddress": {
        "countryCode": "FRA",
        "country": "France",
        "state": "Île-de-France",
        "county": "Paris",
        "city": "Paris",
        "district": "Quartier de Charonne",
        "postalCode": "75020",
        "street": "Villa des Pyrénées"
      },
      "postalAddressClassType": "ROAD_FOURTH",
      "postalAddressClassId": 4048,
      "postalAddressExactStreeNumber": false,
      "angle": 60,
      "administrativeSpeedLimit": 0,
      "relevanceScore": 0.98,
      "countryRelevanceScore": 1,
      "cityRelevanceScore": 0.32,
      "postalCodeRelevanceScore": 1,
      "streetRelevanceScore": 0.98,
      "streetNumberRelevanceScore": 0,
      "segmentId": 0
    }
  ],
  "maximunResult": 2
}
```
---
## 🔢 maximumResults

✅ **Use case**  
Limit the **number of results** returned by the geocoding request.  

💡 **What it does**  
The service will return **at most N addresses** matching the search.  
This helps avoid long responses and keeps only the most relevant results.  

🔧 **How to enable**  
Add the `maximumResults` field in the request body with an integer value.  

📦 **Example**  
```
{
  "geoserver": "osm",
  "address": {
    "country": "France",
    "city": "Paris",
    "street": "Rue de Rivoli"
  },
  "maximumResults": 3,
  "language": "fr"
}
```
**Response**
```
{
  "extent": {
    "minLon": 2.32346,
    "minLat": 48.85848,
    "maxLon": 2.34823,
    "maxLat": 48.86644
  },
  "elements": [
    {
      "boundingBox": {
        "minLon": 2.32346,
        "minLat": 48.85848,
        "maxLon": 2.34823,
        "maxLat": 48.86644
      },
      "coordinate": {
        "lon": 2.34763,
        "lat": 48.85866
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
        "street": "Rue de Rivoli"
      },
      "postalAddressClassType": "ROAD_FOURTH_PEDESTRIAN",
      "postalAddressClassId": 4000,
      "postalAddressExactStreeNumber": false,
      "angle": 115,
      "administrativeSpeedLimit": 0,
      "relevanceScore": 1,
      "countryRelevanceScore": 1,
      "cityRelevanceScore": 0.75,
      "postalCodeRelevanceScore": 1,
      "streetRelevanceScore": 1,
      "streetNumberRelevanceScore": 0,
      "segmentId": 0
    },
    {
      "coordinate": {
        "lon": 2.33013,
        "lat": 48.86433
      },
      "exactCoordinate": {
        "lon": 2.3301,
        "lat": 48.86429
      },
      "distanceFromRequest": 4.97,
      "postalAddress": {
        "countryCode": "FRA",
        "country": "France",
        "state": "Île-de-France",
        "county": "Paris",
        "city": "Paris",
        "district": "Quartier Saint-Germain-l'Auxerrois",
        "postalCode": "75001",
        "roadNumber": "",
        "street": "Rue de Rivoli, Rue de Rivoli",
        "streetNumber": "121"
      },
      "postalAddressClassType": "__NOT_MAPPED",
      "postalAddressClassId": 9942,
      "postalAddressExactStreeNumber": false,
      "angle": 115,
      "administrativeSpeedLimit": 0,
      "relevanceScore": 1,
      "countryRelevanceScore": 1,
      "cityRelevanceScore": 0.75,
      "postalCodeRelevanceScore": 1,
      "streetRelevanceScore": 1,
      "streetNumberRelevanceScore": 0,
      "geoElementTypes": [
        "PEDESTRIAN",
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
      "boundingBox": {
        "minLon": 2.34814,
        "minLat": 48.85848,
        "maxLon": 2.34822,
        "maxLat": 48.85854
      },
      "coordinate": {
        "lon": 2.3482,
        "lat": 48.85848
      },
      "distanceFromRequest": 0,
      "postalAddress": {
        "countryCode": "FRA",
        "country": "France",
        "state": "Île-de-France",
        "county": "Paris",
        "city": "Paris",
        "district": "Paris 4e Arrondissement",
        "postalCode": "75001",
        "street": "Rue de Rivoli"
      },
      "postalAddressClassType": "ROAD_FOURTH_PEDESTRIAN",
      "postalAddressClassId": 4000,
      "postalAddressExactStreeNumber": false,
      "angle": 0,
      "administrativeSpeedLimit": 0,
      "relevanceScore": 1,
      "countryRelevanceScore": 1,
      "cityRelevanceScore": 0.75,
      "postalCodeRelevanceScore": 1,
      "streetRelevanceScore": 1,
      "streetNumberRelevanceScore": 0,
      "segmentId": 0
    }
  ],
  "maximunResult": 3
}
```
---
## 🏷️ assetSearchType

✅ **Use case**  
Refine the geocoding search to target a **specific type of asset** (e.g. city center, road, POI).  

💡 **What it does**  
The service adjusts the results depending on the selected asset type:  
- `CITY_CENTER` → returns the central point of a city.  
- `OBJECT` → returns generic objects (buildings, addresses).  
- `POI` → returns points of interest (restaurants, landmarks, etc.).  
- `ROAD` → returns road segments or streets.  

🔧 **How to enable**  
Add the `assetSearchType` field in the request body with one of the available values.  

📦 **Example**  
```
{
  "geoserver": "osm",
  "address": {
    "country": "France",
    "city": "Nice"
  },
  "assetSearchType": "CITY_CENTER",
  "maximumResults": 1,
  "language": "fr"
}
```
**Response**
```
{
  "extent": {
    "minLon": 7.18193,
    "minLat": 43.64566,
    "maxLon": 7.32309,
    "maxLat": 43.76084
  },
  "elements": [
    {
      "boundingBox": {
        "minLon": 7.18193,
        "minLat": 43.64566,
        "maxLon": 7.32309,
        "maxLat": 43.76084
      },
      "coordinate": {
        "lon": 7.27768,
        "lat": 43.70032
      },
      "distanceFromRequest": 0,
      "postalAddress": {
        "countryCode": "FRA",
        "country": "France",
        "state": "Provence-Alpes-Côte d'Azur",
        "county": "Alpes-Maritimes",
        "city": "Nice"
      },
      "postalAddressClassType": "ORDRE_8_AREA",
      "postalAddressClassId": 1119,
      "postalAddressExactStreeNumber": false,
      "angle": 0,
      "administrativeSpeedLimit": 0,
      "relevanceScore": 1,
      "countryRelevanceScore": 1,
      "cityRelevanceScore": 1,
      "postalCodeRelevanceScore": 1,
      "streetRelevanceScore": 1,
      "streetNumberRelevanceScore": 0,
      "segmentId": 0
    }
  ],
  "maximunResult": 1
}
```
---
## 🌍 geoserver

✅ **Use case**  
Select the **geographical database** (geoserver) to be used for the geocoding request.  

💡 **What it does**  
The service queries the chosen geoserver (e.g. `here`, `osm`) to return coordinates for the provided address.  
Different geoservers may give **different results** depending on their coverage and data quality.  

🔧 **How to enable**  
Add the `geoserver` field in the request body with the desired geoserver name as a string.  

📦 **Example**  
```
{
  "geoserver": "osm",
  "address": {
    "country": "Italy",
    "city": "Rome",
    "street": "Via del Corso"
  },
  "maximumResults": 1,
  "language": "en"
}
```
**Response**
```
{
  "extent": {
    "minLon": 12.47651,
    "minLat": 41.89668,
    "maxLon": 12.48222,
    "maxLat": 41.91031
  },
  "elements": [
    {
      "boundingBox": {
        "minLon": 12.47651,
        "minLat": 41.89668,
        "maxLon": 12.48222,
        "maxLat": 41.91031
      },
      "coordinate": {
        "lon": 12.47675,
        "lat": 41.90975
      },
      "distanceFromRequest": 0,
      "postalAddress": {
        "countryCode": "ITA",
        "country": "Italy",
        "state": "Lazio",
        "county": "Roma",
        "city": "Rome",
        "district": "Municipio Roma I",
        "street": "Via del Corso"
      },
      "postalAddressClassType": "ROAD_FOURTH_PEDESTRIAN",
      "postalAddressClassId": 4000,
      "postalAddressExactStreeNumber": false,
      "angle": 0,
      "administrativeSpeedLimit": 0,
      "relevanceScore": 1,
      "countryRelevanceScore": 1,
      "cityRelevanceScore": 0.4,
      "postalCodeRelevanceScore": 1,
      "streetRelevanceScore": 1,
      "streetNumberRelevanceScore": 0,
      "segmentId": 0
    }
  ],
  "maximunResult": 1
}
```

---

_BeNomad MCP: a tutorial BeMap does not publish yet, served until it does (BEMAP-1938)._
