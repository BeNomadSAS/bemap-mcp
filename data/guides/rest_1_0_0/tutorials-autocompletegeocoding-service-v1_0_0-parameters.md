# 📖 Autocomplete Geocoding API – Parameters Overview

The Autocomplete Geocoding API accepts several parameters that control how partial address lookups are performed and how suggestions are returned.  
They fall into two categories: **mandatory** (must be present) and **optional**.

---

## ✅ Mandatory

- **`place`**  
  The free-text input (postal address, city, POI, etc.) to autocomplete.  
  👉 This field is **always required**.

- **`geoserver`**  
  Name of the geoserver to use: `addok`, `nominatim`, `herehlp` or `photon`.  
  👉 Required in practice: without it the environment's default geoserver is used, which this endpoint does not accept (`400`).  

---

## ⚙️ Optional

- **`coordinate`**  
  Defines the center of the search area (latitude & longitude, WGS84).  
  ⚠️ Required by `herehlp` (or a `boundingbox` instead); `addok`, `nominatim` and `photon` answer without it.  
  Type: [Coordinate](#coordinate).  

- **`language`**  
  Language code (ISO 639-1, 2 letters) used for suggestions.  
  Special value: `"IC"` → case-insensitive country code search.  

- **`boundingbox`**  
  Restrict the autocomplete search to a rectangular area in WGS84 coordinates.  
  Type: [BoundingBox](#boundingbox).  
  ⚠️ **All lowercase.** This is the only request class on the platform that
  spells it that way; `boundingBox` is accepted and silently ignored.  
  ⚠️ **Mutually exclusive with `coordinate`.** Sending both answers
  `400 "Parameters coordinate or bbox are mutually exclusive. Only one of them is allowed."`  

- **`countryCode`**  
  Restrict results to a specific country (ISO 3166 Alpha-2 or Alpha-3 code).  

- **`radius`**  
  Defines the search radius in meters around the given coordinate. Type: `long`.  

- **`addressDetails`**  
  If `true`, returns suggestions split into fields (`country`, `city`, `street`, etc.).  
  Default: `false`.  

- **`enCategories`**  
  Enables category IDs in the response (primary flagged).  

- **`enChains`**  
  Enables chain metadata (e.g., franchise information).  

- **`enEntrances`**  
  Returns geo-coordinates of entrances (when available).  

- **`enFoodTypes`**  
  Returns food-type IDs (primary flagged).  

- **`enHighlights`**  
  Returns text slices matching the query, useful for highlighting.  

- **`enLocId`**  
  Specific to `herehlp`: meant to return a Location ID if `true`; measured, `true` answers `400` (see [enLocId](#enlocid)).  

- **`enReferences`**  
  Returns supplier-specific source IDs when available.  

---

## 📦 Example (overview)

```
{
  "geoserver": "nominatim",
  "place": "Paris",
  "coordinate": {
    "lat": 48.8566,
    "lon": 2.3522
  },
  "countryCode": "FR",
  "language": "fr",
  "radius": 10000,
  "addressDetails": true,
  "enHighlights": true
}
```
---

## 🏷️ place

✅ **Use case**  

Provide a **free-text input** (postal address, city, POI, etc.) to trigger autocomplete suggestions.  
This is the starting point of the query — the text the user is typing.  

💡 **What it does**

The service analyzes the string and returns a **list of possible completions**: street names, cities, POIs, depending on the context and provider.  

🔧 **How to enable** 

Add the `place` field in the request body with a text string.  
👉 This field is **mandatory**.  
```
{
  "geoserver": "addok",
  "place": "Boulevard Sai"
}
```

> ⚠️ **`geoserver` is mandatory in practice.** Omitting it falls back to
> the environment's default geoserver, which this endpoint does not accept:
> the call then answers `400` *"This service is not configured on this
> server."*, which does not name the problem. Autocomplete accepts
> **`addok`, `nominatim`, `herehlp` and `photon`** on production. Measured
> there.

📦 **Example**  
```
{
  "geoserver": "nominatim",
  "place": "Boulevard Sai",
  "coordinate": {
    "lat": 48.8566,
    "lon": 2.3522
  },
  "language": "fr"
}
```

---

## 📍 coordinate

✅ **Use case**  

Define the **center of the search area** to improve the relevance of autocomplete suggestions.  
Useful when the same place name exists in different regions.  

💡 **What it does**
 
The service prioritizes suggestions that are **closer to the given coordinate** (latitude, longitude, WGS84).  
`herehlp` requires it, or a `boundingbox` in its place; `addok`, `nominatim` and `photon` answer without it.  

🔧 **How to enable**  
```
{
  "coordinate": {
    "lat": 48.8566,
    "lon": 2.3522
  }
}
```

📦 **Example**
```
{
  "geoserver": "nominatim",
  "place": "Boulevard Sai",
  "coordinate": {
    "lat": 48.8566,
    "lon": 2.3522
  },
  "language": "fr"
}
```

---

## 🌐 language

✅ **Use case**  

Control the **language of suggestions** returned by the service.  
Useful for multilingual regions or international applications.  

💡 **What it does** 

If the requested language is supported, suggestions are returned in that language.  
If not, the **default language** of the geoserver is used.  
Special value `"IC"` → enables case-insensitive search by country codes (ISO-3166 Alpha-2 or Alpha-3).  

🔧 **How to enable**  
```
{
  "language": "fr"
}
```

📦 **Example**
```
{
  "geoserver": "nominatim",
  "place": "Boulevard Sai",
  "coordinate": {
    "lat": 48.8566,
    "lon": 2.3522
  },
  "language": "fr"
}
```

---

## 📐 boundingbox

✅ **Use case**  

Limit the autocomplete search to a **specific rectangular area**.  
This avoids irrelevant suggestions coming from other regions when a place name is ambiguous.  

💡 **What it does** 

The service only considers results **inside the defined rectangle** (WGS84 coordinates).  
Useful for narrowing down searches to a city, region, or trip corridor.  

🔧 **How to enable**  

Add the `boundingbox` field in the request body, in lower case: `boundingBox` is ignored without an error.  
It requires **four coordinates** in decimal degrees (WGS84):  
- `minLat` → minimum latitude  
- `minLon` → minimum longitude  
- `maxLat` → maximum latitude  
- `maxLon` → maximum longitude  

```
{
  "boundingbox": {
    "minLat": 48.80,
    "minLon": 2.25,
    "maxLat": 48.95,
    "maxLon": 2.45
  }
}
```

📦 **Example**
```
{
  "geoserver": "herehlp",
  "place": "Boulevard Sai",
  "language": "fr",
  "boundingbox": {
    "minLat": 48.80,
    "minLon": 2.25,
    "maxLat": 48.95,
    "maxLon": 2.45
  }
}
```

> ⚠️ Measured on production, the same request on `nominatim` answered `400` in
> two calls out of seven: *"Query took too long to process."*, wrapped in a
> JSON parsing error. `herehlp`, `addok` and `photon` answered `200` every time.

---
## 🌎 countryCode

✅ **Use case**  

Restrict the autocomplete results to a **specific country**.  
Useful when the same city or street name exists in multiple countries.  

💡 **What it does** 

The service will only return suggestions that match the given **ISO country code**.  
Supported formats:  
- **Alpha-2** (2 letters, e.g. `"FR"`, `"DE"`, `"US"`)  
- **Alpha-3** (3 letters, e.g. `"FRA"`, `"DEU"`, `"USA"`)  

🔧 **How to enable**  

Add the `countryCode` field in the request body with the ISO code of the desired country.  

```
{
  "countryCode": "FR"
}
```

📦 **Example**
```
{
  "geoserver": "nominatim",
  "place": "Boulevard Sai",
  "coordinate": {
    "lat": 48.8566,
    "lon": 2.3522
  },
  "language": "fr",
  "countryCode": "FR"
}
```

---

## 🏷️ addressDetails

✅ **Use case**  

Get the **postal address split into separate fields** (country, city, street, postal code, etc.) instead of a single formatted string.  
Useful if your application needs to store or display structured address components.  

💡 **What it does** 

When enabled, the response includes a **detailed object** with fields like `country`, `city`, `street`, `postalCode`, etc.  
By default, the service only returns a formatted address string.  

🔧 **How to enable**

Add the `addressDetails` field in the request body and set it to `true`.  
Default value: `false`.  

```
{
  "addressDetails": true
}
```

📦 **Example**
```
{
  "geoserver": "nominatim",
  "place": "Boulevard Sai",
  "coordinate": {
    "lat": 48.8566,
    "lon": 2.3522
  },
  "language": "fr",
  "addressDetails": true
}
```

---

## 🗂️ enCategories

✅ **Use case**  

Retrieve the **categories** (e.g. restaurant, hotel, park) associated with each autocomplete result.  
Useful for filtering or displaying an icon/type alongside place suggestions.  

💡 **What it does** 

When enabled, the response contains a list of **category IDs**.  
One category is marked as **primary** (`"primary": true`) to indicate the most relevant classification.  

🔧 **How to enable** 

Add the `enCategories` field in the request body and set it to `true`.  
Default value: `false`.  

```
{
  "enCategories": true
}
```

📦 **Example**
```
{
  "geoserver": "nominatim",
  "place": "Boulevard Sai",
  "coordinate": {
    "lat": 48.8566,
    "lon": 2.3522
  },
  "language": "fr",
  "enCategories": true
}
```

---

## 🏬 enChains

✅ **Use case**  

Identify whether a place belongs to a **commercial chain** (e.g. McDonald’s, Carrefour, Starbucks).  
Useful for apps that want to display a **chain-specific icon** or group results by brand.  

💡 **What it does**  

When enabled, the response includes **metadata about chains**.  
This allows clients to recognize and visually highlight places that are part of a well-known chain.  

🔧 **How to enable**  

Add the `enChains` field in the request body and set it to `true`.  
Default value: `false`.  

```json
{
  "enChains": true
}
```

📦 **Example**
```
{
  "geoserver": "herehlp",
  "place": "McDonald's",
  "coordinate": {
    "lat": 48.8566,
    "lon": 2.3522
  },
  "language": "fr",
  "enChains": true
}
```

**Response** (the first two of 20 items)
```
{
  "items": [
    {
      "elemType": "place",
      "place": "McDonald's",
      "addressLabel": "McDonald's, 116 Rue de Rivoli, 75001 Paris, France",
      "coordinate": {
        "longitude": 2.34607,
        "latitude": 48.85933
      },
      "distance": 542,
      "chains": [
        {
          "id": "1566",
          "name": "McDonald's"
        }
      ]
    },
    {
      "elemType": "place",
      "place": "McDonald's",
      "addressLabel": "McDonald's, 5 Rue du Renard, 75004 Paris, France",
      "coordinate": {
        "longitude": 2.35147,
        "latitude": 48.85801
      },
      "distance": 166,
      "chains": [
        {
          "id": "1566",
          "name": "McDonald's"
        }
      ]
    }
  ]
}
```

Measured on production, only `herehlp` returns `chains`: `nominatim`, `addok` and `photon` answer the same request without them.

---

## 🚪 enEntrances

✅ **Use case**  

Get the **precise entrances** of a place (e.g. the door of a shopping mall, a parking entry, or a building entrance).  
Useful for navigation apps that need to guide users to the **correct access point** instead of just the building’s center.  

💡 **What it does**  

When enabled, the response contains a list of **geo-coordinates** representing entrances associated with the place.  
This helps refine arrival instructions for pedestrians or drivers.  

🔧 **How to enable** 

Add the `enEntrances` field in the request body and set it to `true`.  
Default value: `false`.  

```
{
  "enEntrances": true
}
```

📦 **Example**
```
{
  "geoserver": "nominatim",
  "place": "Boulevard Sai",
  "coordinate": {
    "lat": 48.8566,
    "lon": 2.3522
  },
  "language": "fr",
  "enEntrances": true
}
```

---

## 🍴 enFoodTypes

✅ **Use case**  

Retrieve the **type of cuisine** for restaurants or food-related places (e.g. Italian, Japanese, Fast food).  
Useful for apps that want to **filter or display food categories** directly in search suggestions.  

💡 **What it does** 

When enabled, the response includes a list of **food-type IDs**.  
One food type is marked as **primary** (`"primary": true`) to indicate the most relevant cuisine category.  

🔧 **How to enable**
 
Add the `enFoodTypes` field in the request body and set it to `true`.  
Default value: `false`.  

```
{
  "enFoodTypes": true
}
```

📦 **Example**

```
{
  "geoserver": "nominatim",
  "place": "Boulevard Sai",
  "coordinate": {
    "lat": 48.8566,
    "lon": 2.3522
  },
  "language": "fr",
  "enFoodTypes": true
}
```

---

## ✨ enHighlights

✅ **Use case**  
Highlight the **matching parts of the suggestion text** that correspond to the user’s query.  
Useful for autocomplete UIs where you want to **bold or emphasize** the part of the result that matches the search.  

💡 **What it does**  
When enabled, the response includes **text slices** that explicitly show which characters matched the query.  
This can be used to visually highlight relevant parts in your application.  

🔧 **How to enable**  
Add the `enHighlights` field in the request body and set it to `true`.  
Default value: `false`.  

```
{
  "enHighlights": true
}
```

📦 **Example**

```
{
  "geoserver": "nominatim",
  "place": "Boulevard Sai",
  "coordinate": {
    "lat": 48.8566,
    "lon": 2.3522
  },
  "language": "fr",
  "enHighlights": true
}
```

---

## 🆔 enLocId

✅ **Use case**  

Retrieve the **unique Location ID** provided by the `herehlp` geoserver.  
Useful if your application needs to **store, reuse, or request updates** for the exact same place later.  

💡 **What it does** 

When enabled, the response is meant to include a **location identifier** (LocId)
generated by that geoserver.  

> ⚠️ **Measured on production, it does not behave that way.** With
> `geoserver: "herehlp"`, setting `enLocId` to `true` makes the geoserver read
> `place` as an *identifier* rather than as text, so an ordinary query answers
> `400`, with an error on an illegal `id`. The same body with
> `enLocId: false` answers `200`, and no item in either response carries an
> identifier of any spelling. Leave the field alone until BeMap documents what
> it is for.

🔧 **How to enable** 

Add the `enLocId` field in the request body and set it to `true`.  
Default value: `false`.  
⚠️ Only applies when using the `herehlp` geoserver.  

```
{
  "enLocId": true
}
```

📦 **Example**
```
{
  "geoserver": "herehlp",
  "place": "Boulevard Sai",
  "coordinate": {
    "lat": 48.8566,
    "lon": 2.3522
  },
  "language": "fr",
  "enLocId": true
}
```

**Response** — `400`, as measured on production
```
{
  "code": "ServiceException",
  "message": "HERE HLP return error message: Illegal input for parameter 'id' Actual parameter value: 'Boulevard Sai'"
}
```

---

## 🔗 enReferences

✅ **Use case**  
Retrieve the **data source references** that contributed to a place result.  
Useful if your application needs to display or log the **origin of the information** (the data sources behind a result).  

💡 **What it does**  
When enabled, the response includes a list of **reference IDs** from external data sources.  
This metadata allows you to trace where the place information comes from.  

🔧 **How to enable**  
Add the `enReferences` field in the request body and set it to `true`.  
Default value: `false`.  

```
{
  "enReferences": true
}
```

📦 **Example**

```
{
  "geoserver": "nominatim",
  "place": "Boulevard Sai",
  "coordinate": {
    "lat": 48.8566,
    "lon": 2.3522
  },
  "language": "fr",
  "enReferences": true
}
```

---

## 🌍 geoserver

✅ **Use case**  
Choose which **geocoding provider** to use for the autocomplete request.  
Different providers may return different results in terms of coverage, accuracy, or available metadata.  

💡 **What it does**  
The service delegates the autocomplete query to the selected **geoserver backend**.  
If not specified, the environment's **default provider** is used, which this endpoint does not accept: the call answers `400`.  
Supported values:  
- `"nominatim"`  
- `"addok"`  
- `"herehlp"` (requires `coordinate` or `boundingbox`)  
- `"photon"` (labels a suggestion with a feature's name, not an address)  

🔧 **How to enable**  
Add the `geoserver` field in the request body with one of the supported provider names.  

```
{
  "geoserver": "nominatim"
}
```

📦 **Example**

```
{
  "geoserver": "nominatim",
  "place": "Boulevard Sai",
  "coordinate": {
    "lat": 48.8566,
    "lon": 2.3522
  },
  "language": "fr"
}
```

---

## 📏 radius

✅ **Use case**  

Restrict autocomplete suggestions to a **circular area around a point**, defined by its radius in meters.  
Useful when searching for places **near a specific location** (e.g. POIs around the user’s position).  

💡 **What it does**  

The service limits the search results to those located **within the given distance** from the specified coordinate.  
This helps focus results on nearby areas only.  

🔧 **How to enable**  

Add the `radius` field in the request body with a value in **meters** (type: `long`).  
It must be used together with a `coordinate`.  

```
{
  "radius": 1000
}
```

📦 **Example**

```
{
  "geoserver": "nominatim",
  "place": "Boulevard Sai",
  "coordinate": {
    "lat": 48.8566,
    "lon": 2.3522
  },
  "language": "fr",
  "radius": 1000
}
```

---

_BeNomad MCP: a tutorial BeMap does not publish yet, served until it does (BEMAP-1938)._
