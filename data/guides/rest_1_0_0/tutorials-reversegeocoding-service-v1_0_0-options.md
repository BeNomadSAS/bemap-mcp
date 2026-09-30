<a id="reverse_geocoding_options_tutorial"></a>
# ⚙️ Reverse Geocoding Options

This document explains how to use the `options` parameter in the Reverse Geocoding API (`/bgis/service/geocoding/1.0/reverse`) to customize the level of detail and extend response features.

Each option modifies how much data the API returns or what kind of additional insights are included, such as traffic info, road segments, or urban area detection.

Each section includes:

- ✅ A **use case**
- 💡 A **description**
- 🔧 **How to enable it** in your JSON request
- 📦 A **request/response example**
- 📝 **Notes** (if needed)
  
---

## 📬 `OPPOSITE_POSTAL_ADDRESS` – Return opposite postal address only if different

✅ **Use case**

You want to know the **opposite street address**, but **only when it differs** from the main address.

💡 **Description**

When enabled, the API includes the **opposite side’s postal address** in the response, but **only if it’s different** from the main result.

🔧 **How to enable**
```
"options": ["OPPOSITE_POSTAL_ADDRESS"]
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
  "language": "en",
  "options": ["OPPOSITE_POSTAL_ADDRESS"]
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
        "COUNTRY",
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
        "COUNTRY",
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
        "COUNTRY",
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
        "COUNTRY",
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
        "COUNTRY",
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
## 📨 `OPPOSITE_POSTAL_ADDRESS_ALWAYS` – Always return opposite postal address

✅ **Use case**
You **always** want to know the **opposite side’s address**, even if it’s the same as the primary address.

🔧 **How to enable**
```
"options": ["OPPOSITE_POSTAL_ADDRESS_ALWAYS"]
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
  "language": "en",
  "options": ["OPPOSITE_POSTAL_ADDRESS_ALWAYS"]
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
      "oppositePostalAddress": {
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
        "COUNTRY",
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
      "oppositePostalAddress": {
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
        "COUNTRY",
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
      "oppositePostalAddress": {
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
        "COUNTRY",
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
      "oppositePostalAddress": {
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
        "COUNTRY",
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
      "oppositePostalAddress": {
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
        "COUNTRY",
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

## 🛣️ `POLYLINE` – Get road segment geometry

✅ **Use case**
You want to **draw the road segment** where the point belongs on a map.

💡 **Description**
Returns the **list of coordinates** that make up the road segment.

🔧 **How to enable**
```
"options": ["POLYLINE"]
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
  "language": "en",
  "options": [
    "POLYLINE"
  ]
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
        "country": "Republic of France",
        "state": "Île-de-France",
        "county": "Paris",
        "city": "Paris",
        "district": "1st Arrondissement",
        "postalCode": "75001",
        "roadNumber": "",
        "street": "Place du Pont-Neuf"
      },
      "postalAddressClassType": "ROAD_TERTIARY",
      "postalAddressClassId": 4304,
      "postalAddressExactStreeNumber": false,
      "angle": 31,
      "administrativeSpeedLimit": 30,
      "relevanceScore": 0.06671814671814673,
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
      "polyline": [
        {
          "lon": 2.34117,
          "lat": 48.8569
        },
        {
          "lon": 2.3413,
          "lat": 48.85704
        }
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
        "country": "Republic of France",
        "state": "Île-de-France",
        "county": "Paris",
        "city": "Paris",
        "district": "1st Arrondissement",
        "postalCode": "75001",
        "roadNumber": "",
        "street": "Quai des Orfèvres"
      },
      "postalAddressClassType": "ROAD_FOURTH",
      "postalAddressClassId": 4048,
      "postalAddressExactStreeNumber": false,
      "angle": 137,
      "administrativeSpeedLimit": 30,
      "relevanceScore": 0.0663835263835264,
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
      "polyline": [
        {
          "lon": 2.34117,
          "lat": 48.8569
        },
        {
          "lon": 2.34124,
          "lat": 48.85685
        }
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
        "country": "Republic of France",
        "state": "Île-de-France",
        "county": "Paris",
        "city": "Paris",
        "district": "1st Arrondissement",
        "postalCode": "75001",
        "roadNumber": "",
        "street": "Pont Neuf"
      },
      "postalAddressClassType": "ROAD_TERTIARY",
      "postalAddressClassId": 4304,
      "postalAddressExactStreeNumber": false,
      "angle": 31,
      "administrativeSpeedLimit": 30,
      "relevanceScore": 0.0663835263835264,
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
      "polyline": [
        {
          "lon": 2.341,
          "lat": 48.85672
        },
        {
          "lon": 2.34106,
          "lat": 48.85678
        },
        {
          "lon": 2.34117,
          "lat": 48.8569
        }
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
        "country": "Republic of France",
        "state": "Île-de-France",
        "county": "Paris",
        "city": "Paris",
        "district": "1st Arrondissement",
        "postalCode": "75001",
        "roadNumber": "",
        "street": ""
      },
      "postalAddressClassType": "ROAD_FOURTH",
      "postalAddressClassId": 4048,
      "postalAddressExactStreeNumber": false,
      "angle": 35,
      "administrativeSpeedLimit": 30,
      "relevanceScore": 0.06553410553410555,
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
      "polyline": [
        {
          "lon": 2.34124,
          "lat": 48.85685
        },
        {
          "lon": 2.3414,
          "lat": 48.857
        }
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
        "country": "Republic of France",
        "state": "Île-de-France",
        "county": "Paris",
        "city": "Paris",
        "district": "1st Arrondissement",
        "postalCode": "75001",
        "roadNumber": "",
        "street": ""
      },
      "postalAddressClassType": "ROAD_FOURTH",
      "postalAddressClassId": 4048,
      "postalAddressExactStreeNumber": false,
      "angle": 41,
      "administrativeSpeedLimit": 30,
      "relevanceScore": 0.0648906048906049,
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
      "polyline": [
        {
          "lon": 2.341,
          "lat": 48.85672
        },
        {
          "lon": 2.34111,
          "lat": 48.85675
        },
        {
          "lon": 2.34124,
          "lat": 48.85685
        }
      ],
      "segmentId": 0
    }
  ],
  "maximunResult": 5
}
```
📝 **Notes**
- Useful for **map visualization** and **segment highlighting**.

---

## 🛤️ `ROAD_FEATURE` – Include road metadata

✅**Use case**
You need **extra information** about the road, such as its **name**, **type**, or **network properties**.

🔧 **How to enable**
```
"options": ["ROAD_FEATURE"]
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
  "language": "en",
  "options": [
    "ROAD_FEATURE"
  ]
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
        "country": "Republic of France",
        "state": "Île-de-France",
        "county": "Paris",
        "city": "Paris",
        "district": "1st Arrondissement",
        "postalCode": "75001",
        "roadNumber": "",
        "street": "Place du Pont-Neuf"
      },
      "postalAddressClassType": "ROAD_TERTIARY",
      "postalAddressClassId": 4304,
      "postalAddressExactStreeNumber": false,
      "angle": 31,
      "administrativeSpeedLimit": 30,
      "relevanceScore": 0.06671814671814673,
      "countryRelevanceScore": 0,
      "cityRelevanceScore": 0,
      "postalCodeRelevanceScore": 0,
      "streetRelevanceScore": 0,
      "streetNumberRelevanceScore": 0,
      "roadInfo": {
        "urban": true,
        "tunnel": false,
        "bridge": false,
        "maxSpeedVerified": true,
        "carPool": false,
        "mainCategory": true,
        "dualCarriageway": 0,
        "noThroughTr": 3,
        "toll": 0,
        "tax": 0,
        "matchDir": "OPEN_POS",
        "nbLanePos": 1,
        "nbLaneNeg": 3,
        "pedestrianInfrastructureType": "UNDEFINED",
        "maxSpeed": 30,
        "averageSpeed": 20,
        "conditionalMaxSpeeds": null,
        "length": 18,
        "directionFlow": "OPEN"
      },
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
        "country": "Republic of France",
        "state": "Île-de-France",
        "county": "Paris",
        "city": "Paris",
        "district": "1st Arrondissement",
        "postalCode": "75001",
        "roadNumber": "",
        "street": "Quai des Orfèvres"
      },
      "postalAddressClassType": "ROAD_FOURTH",
      "postalAddressClassId": 4048,
      "postalAddressExactStreeNumber": false,
      "angle": 137,
      "administrativeSpeedLimit": 30,
      "relevanceScore": 0.0663835263835264,
      "countryRelevanceScore": 0,
      "cityRelevanceScore": 0,
      "postalCodeRelevanceScore": 0,
      "streetRelevanceScore": 0,
      "streetNumberRelevanceScore": 0,
      "roadInfo": {
        "urban": true,
        "tunnel": false,
        "bridge": false,
        "maxSpeedVerified": true,
        "carPool": false,
        "mainCategory": false,
        "dualCarriageway": 0,
        "noThroughTr": 2,
        "toll": 0,
        "tax": 0,
        "matchDir": "OPEN_POS",
        "nbLanePos": 0,
        "nbLaneNeg": 0,
        "pedestrianInfrastructureType": "UNDEFINED",
        "maxSpeed": 30,
        "averageSpeed": 20,
        "conditionalMaxSpeeds": null,
        "length": 8,
        "directionFlow": "OPEN_POS"
      },
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
        "country": "Republic of France",
        "state": "Île-de-France",
        "county": "Paris",
        "city": "Paris",
        "district": "1st Arrondissement",
        "postalCode": "75001",
        "roadNumber": "",
        "street": "Pont Neuf"
      },
      "postalAddressClassType": "ROAD_TERTIARY",
      "postalAddressClassId": 4304,
      "postalAddressExactStreeNumber": false,
      "angle": 31,
      "administrativeSpeedLimit": 30,
      "relevanceScore": 0.0663835263835264,
      "countryRelevanceScore": 0,
      "cityRelevanceScore": 0,
      "postalCodeRelevanceScore": 0,
      "streetRelevanceScore": 0,
      "streetNumberRelevanceScore": 0,
      "roadInfo": {
        "urban": true,
        "tunnel": false,
        "bridge": true,
        "maxSpeedVerified": true,
        "carPool": false,
        "mainCategory": true,
        "dualCarriageway": 0,
        "noThroughTr": 3,
        "toll": 0,
        "tax": 0,
        "matchDir": "OPEN_POS",
        "nbLanePos": 1,
        "nbLaneNeg": 3,
        "pedestrianInfrastructureType": "UNDEFINED",
        "maxSpeed": 30,
        "averageSpeed": 20,
        "conditionalMaxSpeeds": null,
        "length": 24,
        "directionFlow": "OPEN"
      },
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
        "country": "Republic of France",
        "state": "Île-de-France",
        "county": "Paris",
        "city": "Paris",
        "district": "1st Arrondissement",
        "postalCode": "75001",
        "roadNumber": "",
        "street": ""
      },
      "postalAddressClassType": "ROAD_FOURTH",
      "postalAddressClassId": 4048,
      "postalAddressExactStreeNumber": false,
      "angle": 35,
      "administrativeSpeedLimit": 30,
      "relevanceScore": 0.06553410553410555,
      "countryRelevanceScore": 0,
      "cityRelevanceScore": 0,
      "postalCodeRelevanceScore": 0,
      "streetRelevanceScore": 0,
      "streetNumberRelevanceScore": 0,
      "roadInfo": {
        "urban": true,
        "tunnel": false,
        "bridge": false,
        "maxSpeedVerified": true,
        "carPool": false,
        "mainCategory": false,
        "dualCarriageway": 0,
        "noThroughTr": 2,
        "toll": 0,
        "tax": 0,
        "matchDir": "OPEN_POS",
        "nbLanePos": 0,
        "nbLaneNeg": 0,
        "pedestrianInfrastructureType": "UNDEFINED",
        "maxSpeed": 30,
        "averageSpeed": 20,
        "conditionalMaxSpeeds": null,
        "length": 20,
        "directionFlow": "OPEN_POS"
      },
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
        "country": "Republic of France",
        "state": "Île-de-France",
        "county": "Paris",
        "city": "Paris",
        "district": "1st Arrondissement",
        "postalCode": "75001",
        "roadNumber": "",
        "street": ""
      },
      "postalAddressClassType": "ROAD_FOURTH",
      "postalAddressClassId": 4048,
      "postalAddressExactStreeNumber": false,
      "angle": 41,
      "administrativeSpeedLimit": 30,
      "relevanceScore": 0.0648906048906049,
      "countryRelevanceScore": 0,
      "cityRelevanceScore": 0,
      "postalCodeRelevanceScore": 0,
      "streetRelevanceScore": 0,
      "streetNumberRelevanceScore": 0,
      "roadInfo": {
        "urban": true,
        "tunnel": false,
        "bridge": false,
        "maxSpeedVerified": true,
        "carPool": false,
        "mainCategory": false,
        "dualCarriageway": 0,
        "noThroughTr": 2,
        "toll": 0,
        "tax": 0,
        "matchDir": "OPEN_POS",
        "nbLanePos": 0,
        "nbLaneNeg": 0,
        "pedestrianInfrastructureType": "UNDEFINED",
        "maxSpeed": 30,
        "averageSpeed": 20,
        "conditionalMaxSpeeds": null,
        "length": 24,
        "directionFlow": "OPEN_POS"
      },
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
## 🆔 `SEGMENTID` – Return the segment ID

✅ **Use case**
You need a **unique identifier** for the road segment (e.g., for caching or matching).

🔧 **How to enable**
```
"options": ["SEGMENTID"]
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
  "language": "en",
  "options": ["SEGMENTID"]
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
      "segmentId": 56245140
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
      "segmentId": 849749026
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
      "segmentId": 1167157580
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
      "segmentId": 1328696482
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
      "segmentId": 1328696481
    }
  ],
  "maximunResult": 5
}
```
---
## 🚫 `SKIP_EMPTY_STREETNAME` – Ignore results without street names

✅ **Use case**
You only want addresses **with a street name** when possible.

💡 **Description**
Skips results **without street names**, unless no better result is available.

🔧 **How to enable**
```
"options": ["SKIP_EMPTY_STREETNAME"]
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
  "language": "en",
  "options": ["SKIP_EMPTY_STREETNAME"]
}
```
**Response**
```
{
  "extent": {
    "minLon": 2.34117,
    "minLat": 48.85685,
    "maxLon": 2.3413,
    "maxLat": 48.85704
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
      "relevanceScore": 0.07463932962824316,
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
      "relevanceScore": 0.07426498113859532,
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
      "relevanceScore": 0.07426498113859532,
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
        "street": "Quai des Orfèvres",
        "streetNumber": "76",
        "oppositeStreetNumber": "3V"
      },
      "postalAddressClassType": "ROAD_FOURTH",
      "postalAddressClassId": 4048,
      "postalAddressExactStreeNumber": false,
      "angle": 143,
      "administrativeSpeedLimit": 30,
      "relevanceScore": 0.07259481095401273,
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
        "lat": 48.85704
      },
      "distanceFromRequest": 14.27,
      "postalAddress": {
        "countryCode": "FRA",
        "country": "France",
        "state": "Île-de-France",
        "county": "Paris",
        "city": "Paris",
        "district": "Paris 1er Arrondissement",
        "postalCode": "75001",
        "roadNumber": "",
        "street": "Rue Henri Robert"
      },
      "postalAddressClassType": "ROAD_FOURTH",
      "postalAddressClassId": 4048,
      "postalAddressExactStreeNumber": false,
      "angle": 121,
      "administrativeSpeedLimit": 20,
      "relevanceScore": 0.06997437152647795,
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
## 🎯 `START_AT_RADIUS` – Start search exactly at the given radius

✅ **Use case**
You want the search to **start directly at the radius** given in `radius` (BeMap: *Force to start research directly at radius passed in parameter*). Closer addresses are not left out: the nearest still come first, as the response shows (the same five results at 0 to 9.37 m with the option and without it, on production).
🔧 **How to enable**
```
"options": ["START_AT_RADIUS"]
```
📦 **Example**
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
  "language": "en",
  "options": ["START_AT_RADIUS"]
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
      "relevanceScore": 0.0007218846648182751,
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
      "relevanceScore": 0.000721878859022042,
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
      "relevanceScore": 0.000721878859022042,
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
      "relevanceScore": 0.0007218645678313145,
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
      "relevanceScore": 0.0007218529562388486,
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
## 🚦 `TRAFFIC` – Get live traffic data

✅ Use case
You need real-time traffic information around the given coordinates.

🔧 How to enable
```
"options": ["TRAFFIC"]
```
📦 **Example**
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
  "language": "en",
  "options": ["TRAFFIC"]
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
      "segmentId": 0,
      "trafficElements": [
        {
          "info": {
            "countryCode": "FRA",
            "copyright": "HERE",
            "releaseDate": 1756369853000,
            "lastUpdateDate": 1756369891444
          },
          "elementId": "520526315",
          "reverseDirection": true,
          "boundingBox": {
            "minLon": 2.34041,
            "minLat": 48.85607,
            "maxLon": 2.34143,
            "maxLat": 48.85721
          },
          "jamFactor": 90.8955,
          "reason": "NA",
          "reasonCoordinate": {
            "lon": 2.34063,
            "lat": 48.85631
          },
          "polyline": [
            {
              "lon": 2.34063,
              "lat": 48.85631
            },
            {
              "lon": 2.34041,
              "lat": 48.85607
            },
            {
              "lon": 2.34117,
              "lat": 48.8569
            },
            {
              "lon": 2.34106,
              "lat": 48.85678
            },
            {
              "lon": 2.341,
              "lat": 48.85672
            },
            {
              "lon": 2.34079,
              "lat": 48.85647
            },
            {
              "lon": 2.34067,
              "lat": 48.85634
            },
            {
              "lon": 2.34063,
              "lat": 48.85631
            },
            {
              "lon": 2.34138,
              "lat": 48.85714
            },
            {
              "lon": 2.3413,
              "lat": 48.85704
            },
            {
              "lon": 2.34117,
              "lat": 48.8569
            },
            {
              "lon": 2.34143,
              "lat": 48.85721
            },
            {
              "lon": 2.34138,
              "lat": 48.85714
            }
          ],
          "segmentInfos": [
            {
              "id": "868059253",
              "reverseDirection": true
            },
            {
              "id": "1167157580",
              "reverseDirection": true
            },
            {
              "id": "56245140",
              "reverseDirection": true
            },
            {
              "id": "1328696476",
              "reverseDirection": true
            },
            {
              "id": "868059254",
              "reverseDirection": true
            },
            {
              "id": "810781034",
              "reverseDirection": true
            },
            {
              "id": "56245094",
              "reverseDirection": true
            },
            {
              "id": "733389645",
              "reverseDirection": true
            },
            {
              "id": "1328696477",
              "reverseDirection": true
            }
          ],
          "tmcInternalId": 520526315,
          "alertcEbuCountryCode": "F",
          "alertcTableId": 32,
          "alertcLocationId": 39403,
          "alertcExtend": 0,
          "alertcCode": 101
        }
      ]
    },
```
---
## 📊 `TRAFFIC_HISTORICAL` – Get historical traffic patterns (Beta)

> ⚠️ **Production and preproduction do not provide it.** Both answer `400`, *Historical traffic info is not available, please check the server configuration*. The response below is what an environment that provides it returns.

✅ **Use case**
Analyze **past traffic conditions** at a given location and time.

💡 **Description**
Uses the **timestamp** from your coordinateSat to return **historical traffic trends.**

🔧 **How to enable**
```
"options": ["TRAFFIC_HISTORICAL"]
```
The time is `coordinateSat.time`, in milliseconds since 1 January 1970, UTC: a past instant here.

**Example**
```
{
  "geoserver": "here",
  "transportMode": "CAR",
  "maximumResults": 5,
  "coordinateSat": {
    "lon": 2.3412,
    "lat": 48.85693,
    "time": 1789977600000
  },
  "radius": 1000,
  "language": "en",
  "options": [
    "TRAFFIC_HISTORICAL"
  ]
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
      "segmentId": 0,
      "trafficElements": [
        {
          "info": {
            "countryCode": "FRA",
            "copyright": "HERE",
            "releaseDate": 1756371293000,
            "lastUpdateDate": 1756371339000
          },
          "elementId": "520526315",
          "reverseDirection": true,
          "boundingBox": {
            "minLon": 2.34041,
            "minLat": 48.85607,
            "maxLon": 2.34143,
            "maxLat": 48.85721
          },
          "jamFactor": 86.6764,
          "reason": "NA",
          "reasonCoordinate": {
            "lon": 2.34063,
            "lat": 48.85631
          },
          "polyline": [
            {
              "lon": 2.34063,
              "lat": 48.85631
            },
            {
              "lon": 2.34041,
              "lat": 48.85607
            },
            {
              "lon": 2.34117,
              "lat": 48.8569
            },
            {
              "lon": 2.34106,
              "lat": 48.85678
            },
            {
              "lon": 2.341,
              "lat": 48.85672
            },
            {
              "lon": 2.34079,
              "lat": 48.85647
            },
            {
              "lon": 2.34067,
              "lat": 48.85634
            },
            {
              "lon": 2.34063,
              "lat": 48.85631
            },
            {
              "lon": 2.34138,
              "lat": 48.85714
            },
            {
              "lon": 2.3413,
              "lat": 48.85704
            },
            {
              "lon": 2.34117,
              "lat": 48.8569
            },
            {
              "lon": 2.34143,
              "lat": 48.85721
            },
            {
              "lon": 2.34138,
              "lat": 48.85714
            }
          ],
          "segmentInfos": [
            {
              "id": "868059253",
              "reverseDirection": true
            },
            {
              "id": "1167157580",
              "reverseDirection": true
            },
            {
              "id": "56245140",
              "reverseDirection": true
            },
            {
              "id": "1328696476",
              "reverseDirection": true
            },
            {
              "id": "868059254",
              "reverseDirection": true
            },
            {
              "id": "810781034",
              "reverseDirection": true
            },
            {
              "id": "56245094",
              "reverseDirection": true
            },
            {
              "id": "733389645",
              "reverseDirection": true
            },
            {
              "id": "1328696477",
              "reverseDirection": true
            }
          ],
          "tmcInternalId": 520526315,
          "alertcEbuCountryCode": "F",
          "alertcTableId": 32,
          "alertcLocationId": 39403,
          "alertcExtend": 0,
          "alertcCode": 108
        }
      ]
    },
```
---

## 🔮 `TRAFFIC_PREDICTIVE` – Get predicted traffic data

✅ **Use case**
You need **predicted traffic** for a **future time** provided in `coordinateSat.time`.

🔧 **How to enable**
```
"options": ["TRAFFIC_PREDICTIVE"]
```
The time is `coordinateSat.time`, in milliseconds since 1 January 1970, UTC: an instant ahead of now — a departure a few hours ahead, for instance. Compute it when you send the request (`Date.now() + 3 * 3600 * 1000` in JavaScript); the example's `1811836800000` is 1 June 2027, 08:00 UTC.

> ⚠️ **Measured on production (29 September 2026), the answer is the live traffic.** The same `jamFactor` and `releaseDate` as `TRAFFIC`, whatever `time` holds: a past instant, an hour ahead, a week ahead or this example's.

**Example**
```
{
  "geoserver": "here",
  "transportMode": "CAR",
  "maximumResults": 5,
  "coordinateSat": {
    "lon": 2.3412,
    "lat": 48.85693,
    "time": 1811836800000
  },
  "radius": 1000,
  "language": "en",
  "options": [
    "TRAFFIC_PREDICTIVE"
  ]
}
```
**Response** (the first of five elements)
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
        "country": "Republic of France",
        "state": "Île-de-France",
        "county": "Paris",
        "city": "Paris",
        "district": "1st Arrondissement",
        "postalCode": "75001",
        "roadNumber": "",
        "street": "Place du Pont-Neuf"
      },
      "postalAddressClassType": "ROAD_TERTIARY",
      "postalAddressClassId": 4304,
      "postalAddressExactStreeNumber": false,
      "angle": 31,
      "administrativeSpeedLimit": 30,
      "relevanceScore": 0.06671814671814673,
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
      "segmentId": 0,
      "trafficElements": [
        {
          "info": {
            "countryCode": "FRA",
            "copyright": "HERE",
            "releaseDate": 1790691378000,
            "lastUpdateDate": 1790691399368
          },
          "elementId": "520526315",
          "reverseDirection": true,
          "boundingBox": {
            "minLon": 2.34041,
            "minLat": 48.85607,
            "maxLon": 2.34143,
            "maxLat": 48.85721
          },
          "jamFactor": 88.7829,
          "reason": "NA",
          "reasonCoordinate": {
            "lon": 2.34063,
            "lat": 48.85631
          },
          "polyline": [
            {
              "lon": 2.34063,
              "lat": 48.85631
            },
            {
              "lon": 2.34041,
              "lat": 48.85607
            },
            {
              "lon": 2.341,
              "lat": 48.85672
            },
            {
              "lon": 2.34079,
              "lat": 48.85647
            },
            {
              "lon": 2.34067,
              "lat": 48.85634
            },
            {
              "lon": 2.34063,
              "lat": 48.85631
            },
            {
              "lon": 2.34117,
              "lat": 48.8569
            },
            {
              "lon": 2.34106,
              "lat": 48.85678
            },
            {
              "lon": 2.341,
              "lat": 48.85672
            },
            {
              "lon": 2.3413,
              "lat": 48.85704
            },
            {
              "lon": 2.34117,
              "lat": 48.8569
            },
            {
              "lon": 2.34138,
              "lat": 48.85714
            },
            {
              "lon": 2.3413,
              "lat": 48.85704
            },
            {
              "lon": 2.34143,
              "lat": 48.85721
            },
            {
              "lon": 2.34138,
              "lat": 48.85714
            }
          ],
          "segmentInfos": [
            {
              "id": "4385172304649",
              "reverseDirection": true
            },
            {
              "id": "4385172304864",
              "reverseDirection": true
            },
            {
              "id": "4385172304760",
              "reverseDirection": true
            },
            {
              "id": "4385172305112",
              "reverseDirection": true
            },
            {
              "id": "4385172305222",
              "reverseDirection": true
            },
            {
              "id": "4385172305453",
              "reverseDirection": true
            },
            {
              "id": "4385172305583",
              "reverseDirection": true
            }
          ],
          "tmcInternalId": 520526315,
          "alertcEbuCountryCode": "F",
          "alertcTableId": 32,
          "alertcLocationId": 39403,
          "alertcExtend": 0,
          "alertcCode": 108
        }
      ]
    }
  ],
  "maximunResult": 5
}
```
---
## 🏙️ `URBAN_AREA` – Detect if point is in an urban zone

✅ **Use case**
You want to know whether the returned point **belongs to an urban area**.

🔧 **How to enable**
```
"options": ["URBAN_AREA"]
```
📦 **Example**
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
  "language": "en",
  "options": ["URBAN_AREA"]
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
        "BUILT_UP_AREA_NA",
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
        "BUILT_UP_AREA_NA",
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
        "BUILT_UP_AREA_NA",
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
        "BUILT_UP_AREA_NA",
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
        "BUILT_UP_AREA_NA",
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
