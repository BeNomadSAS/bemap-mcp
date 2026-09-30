# ⚡ Tutorial for the first trip in electrical vehicle
<span class="float-right shadow">![Illustration of an EV smart routing trip](images/evsmartrouting-service-map.jpg)</span>

This tutorial explains **how to perform a simple electric vehicle route calculation** using the EV Smart Routing API.

If your vehicle's battery can't reach the final destination, the route returned will **include charging stations** (also called *step points*) automatically.  
We’ll calculate a trip from **Paris to Lyon**.

---

## 🧭 Tutorial Structure

1. 🔑 How to get the vehicle key
   - Get the vehicle brand
   - Get the vehicle key ID
2. 📍 Optional: Convert address to coordinates
3. 🚗 Run the EV Smart Routing trip computation
4. 📊 Use the results


---

## 1. 🔑 How to Get the Vehicle Key

To compute a route for an electric vehicle, the API needs a **vehicle key ID**, which identifies the EV model. To get it:

### 🏭 Get the Brand

Call the API `/getbrands` to list all available vehicle brands.

#### 🔧 Request
```http
{"bemap":{"language":"request"}}
GET ${HOST_URL}/bgis/service/vehicle/1.1/getbrands
```

**Response (truncated):**

```
{"bemap":{"language":"javascript"}}
{
  "brands": [{
      "id": "6862890593f67e33df977de9",
      "label": "Abarth"
    }, {
      "id": "6a280fea0e36a02c67d568de",
      "label": "AION"
    },
    . . .
    {
      "id": "5e903acb9548987051674099",
      "label": "Audi"
    }, {
      "id": "5e903acb95489870516740a0",
      "label": "BMW"
    },
    . . .
  ]
}
```

See more details on [API reference](index.html#subpage-rest_1_1_0-vehicle-getbrands-service-v1_1_0.md).

In the response you obtain a `JSON` object with a `brands` field. This field is an array of `brand` objects.

The `brand` object contains two important fields, `id` and `label`. The `label` represents the constructor name. The `id` is the unique identifier of the entry. 

For example the `label` can be used to fill a drop-down list or to perform a search based on the brand name.

After the brand name is selected, store the `id`. This `id` will be used in the next step to get the vehicle key id.

For example the `id` of brand `Audi` is `5e903acb9548987051674099` on production.

> ⚠️ **Important:** The id is unique to one environment (production, preproduction, etc). When your application switches environments (for example from preproduction to production), you will need to call the API again. The ids on this page are production's.



### 🚙 Select the Vehicle (Get Vehicle Key ID)

To compute the trip, the EV Smart Routing API needs to know which vehicle to use. The vehicle is represented by an identifier, the `vehicle key id`. This identifier is a simple string like `eb72114c-1f74-4854-b4ce-c2b3f06405d5` for an `Audi e-tron 50 quattro` (2019-2022). 

> NOTE: The  ` vehicle key id` is the same on all environments (production and preproduction).



To do this selection we have two main APIs:

- A helper API to fill a drop-down list. See the chapter `Select the vehicle from a drop-down list` below.
- An API to find or list the vehicles. See the `Find vehicle` chapter below.



#### 🚘 Select the vehicle from a drop-down list (optional)
The **vehicle key ID** is a unique string used to identify a vehicle model.  
🛑 **Note:** It is the **same across all environments** (production, preproduction, etc).

#### 🧩 1. Get vehicle names for a brand

```
{"bemap":{"language":"request"}}
GET ${HOST_URL}/bgis/service/vehicle/1.1/getlevelvehicleinfo?level=NAME&brandId=5e903acb9548987051674099
```

The response is a JSON array.

```
{"bemap":{"language":"javascript"}}
["A6 Avant e-tron", "A6 Sportback e-tron", "Q4 Sportback e-tron", "Q4 e-tron", ..., "e-tron", "e-tron 55 Quattro", "e-tron GT", ...]
```

You can use it to fill a drop-down list in your user interface.
Get the searched vehicle name to fill the next step request url and the final `find vehicle` request.

#### 🏷️ 2. Get the variants for the vehicle name.

A vehicle name can have several variants, like "50 quattro" and "55 quattro" for the `e-tron`.

```
{"bemap":{"language":"request"}}
GET ${HOST_URL}/bgis/service/vehicle/1.1/getlevelvehicleinfo?level=VARIANT&brandId=5e903acb9548987051674099&name=e-tron
```

The response is a JSON array.

```
{"bemap":{"language":"javascript"}}
["50 quattro", "55 quattro"]
```

You can use it to fill a drop-down list in your user interface.
Get the searched variant to fill the next step request url and the final `find vehicle` request.

#### 🔋 3. Get the available battery names for the vehicle name and variant.

The battery name is the public or commercial name of battery like "50". This information should not be confused with the actual battery capacity (kWh). For example, a battery with 52 kWh of capacity is called "50".

```
{"bemap":{"language":"request"}}
GET ${HOST_URL}/bgis/service/vehicle/1.1/getlevelvehicleinfo?level=BATTERY_NAME&brandId=5e903acb9548987051674099&name=e-tron&variant=50+quattro
```

The response is a JSON array.

```
{"bemap":{"language":"javascript"}}
["71"]
```

You can use it to fill a drop-down list in your user interface. 
Get the searched battery name to fill the next step request url and the final `find vehicle` request.

#### ⚡ 4. Get available chargers for the vehicle name, variant and battery name.

**a.** List of DC chargers

```
{"bemap":{"language":"request"}}
GET ${HOST_URL}/bgis/service/vehicle/1.1/getlevelvehicleinfo?level=CHARGE_POWER_DC&brandId=5e903acb9548987051674099&name=e-tron&variant=50+quattro&batteryName=71
```

The response is a JSON array.

```
{"bemap":{"language":"javascript"}}
["120.0"]
```

You can use it to fill a drop-down list in your user interface.
Get the searched DC charge to fill the next step request url and the final `find vehicle` request.

**b.** List of AC chargers

```
{"bemap":{"language":"request"}}
GET ${HOST_URL}/bgis/service/vehicle/1.1/getlevelvehicleinfo?level=CHARGE_POWER_AC&brandId=5e903acb9548987051674099&name=e-tron&variant=50+quattro&batteryName=71&chargerPowerDC=120.0
```

The response is a JSON array.

```
{"bemap":{"language":"javascript"}}
["11.0", "3.67", "0.0"]
```

You can use it to fill a drop-down list in your user interface.
Get the searched AC charge to fill the final `find vehicle` request.

#### 🆔 5. Get the `vehicle key id`.

Now, we have all the elements to perform a request with the find vehicle API. See the next chapter.

🔗 See more details in the [API reference](index.html#subpage-rest_1_1_0-vehicle-getlevelvehicleinfo-service-v1_1_0.md).



## 🔎 Find vehicle

This API lets you retrieve the `vehicle key id` (needed for trip computation) and detailed vehicle information.

You can:
- 🧩 Get a **single vehicle** if all required details are known.
- 📋 Get a **list of vehicles** for a specific brand.

**Request:**

```
{"bemap":{"language":"request"}}
POST ${HOST_URL}/bgis/service/vehicle/1.1/findvehicles
{
    "brandId": "5e903acb9548987051674099",
    "name": "e-tron",
    "variant": "50 quattro",
    "year": "2019-2022",
    "batteryName": "71",
    "chargerPowerDC": 120.0,
    "chargerPowerAC": 11.0,
    "enableDatasheet": false
}
```

Without `year`, this request returns two vehicles: the 2019-2022 and 2021-2022 model years of the same variant. The level `YEAR` of `getlevelvehicleinfo` lists the years of a vehicle name and variant.

**Response:**

```
{"bemap":{"language":"javascript"}}
{
    "vehicles": [
        {
            "motorType": "EV",
            "key": "eb72114c-1f74-4854-b4ce-c2b3f06405d5",
            "brandId": "5e903acb9548987051674099",
            "brandName": "Audi",
            "name": "e-tron",
            "year": "2019-2022",
            "variant": "50 quattro",
            "transportType": "CAR",
            "height": 162,
            "width": 194,
            "length": 490,
            "batteryName": "71",
            "chargerPowerAcThreePhases": 11.0,
            "chargerPowerDC": 120.0,
            "connectorTypes": [
                32,
                38
            ],
            "wltp": {
                "completeWltp": 341.0
            },
            "consumptionInWhPerKm": 189.74
        }
    ]
}
```

The `vehicle key id` is represented by the `key` field. The value `eb72114c-1f74-4854-b4ce-c2b3f06405d5` will be used to run the trip computation in the next chapter.

#### 📚 Get All Vehicles for a Brand
Here is another example to get all the vehicles for a brand.

**Request:**
```http
{"bemap":{"language":"request"}}
POST ${HOST_URL}/bgis/service/vehicle/1.1/findvehicles
{
  "brandId": "5e903acb9548987051674099"
}
```

In the response you will find all vehicles for this particular brand.



See more details in the [API reference](index.html#subpage-rest_1_1_0-vehicle-findvehicles-service-v1_1_0.md).

## 📍 How to convert a postal address to coordinates

If you already have GPS coordinates for your trip (lat/lon), you can skip this section.
Otherwise, use **geocoding** to convert a postal address to coordinates.

The EV Smart Routing API runs with coordinates (longitude and latitude): if you have a postal address, you need to find the coordinate of this address.

To do this, 2 APIs are available:

- Geocoding
- Auto-complete

### Get the coordinate via the Geocoding API

This API can take the postal address in categorized fields and returns the coordinate and postal address.

- The `address` field contains subfields like `country`, `city` and `street`. More fields are available.
- The `language` field defines the language in search and response.
- The `maximumResults` field defines the maximum results to be returned in the response. The response names it `maximunResult`, spelled so by the service.

For more details, see the [API reference](index.html#subpage-rest_1_0_0-geocoding-service.md).

**Request:**

```
{"bemap":{"language":"request"}}
POST ${HOST_URL}/bgis/service/geocoding/1.0
{
	"address": {
		"country":"France",
		"city": "Paris",
		"street": "villa des pyrénées"
	},
	"searchType": "FUZZY",
	"maximumResults": 2,
	"language": "fr"
}
```

**Response:**

```
{"bemap":{"language":"javascript"}}
{
    "extent": {
        "minLon": 2.40518,
        "minLat": 48.8533,
        "maxLon": 2.40587,
        "maxLat": 48.85351
    },
    "elements": [
        {
            "boundingBox": {
                "minLon": 2.40518,
                "minLat": 48.8533,
                "maxLon": 2.40587,
                "maxLat": 48.85351
            },
            "coordinate": {
                "lon": 2.40552,
                "lat": 48.85342
            },
            "distanceFromRequest": 0.0,
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
            "angle": 62.0,
            "administrativeSpeedLimit": 0.0,
            "relevanceScore": 1.0,
            "countryRelevanceScore": 1.0,
            "cityRelevanceScore": 0.75,
            "postalCodeRelevanceScore": 1.0,
            "streetRelevanceScore": 1.0,
            "streetNumberRelevanceScore": 0.0,
            "segmentId": 0
        }
    ],
    "maximunResult": 1
}
```

In the `elements` array, the first element is the best match found by the API.

You can take the longitude and latitude values of the `coordinate` field of the first element.

This coordinate will be used by the EV Smart Routing API to perform the trip computation.

For more details, see the [API reference](index.html#subpage-rest_1_0_0-geocoding-service.md).



### ✨ Get the coordinate via Auto-complete API

This API can take the postal address, place or POI name as free text and returns the place name and the coordinate.

The `place` field defines the postal address, place or POI name.

The `coordinate` field biases the search towards a point: each item's `distance` (in meters) is measured from it, and nearby places rank high, which is why the Rue de Lyon in Paris comes second below. It is mandatory with `herehlp`.

> ⚠️ **IMPORTANT:** this feature is only available with providers `herehlp`, `nominatim`, `addok` and `photon`.

**Request:**

```
{"bemap":{"language":"request"}}
POST ${HOST_URL}/bgis/service/geocoding/autocomplete/1.0
{
    "geoserver": "herehlp",
    "coordinate": {
        "lon": 2.3412,
        "lat": 48.85693
    },
    "place": "lyon"
}
```

**Response:**

```
{"bemap":{"language":"javascript"}}
{
    "items": [
        {
            "elemType": "locality",
            "place": "Lyon, Auvergne-Rhône-Alpes, France",
            "addressLabel": "Lyon, Auvergne-Rhône-Alpes, France",
            "coordinate": {
                "longitude": 4.82965,
                "latitude": 45.75917
            },
            "distance": 392185
        },
        {
            "elemType": "street",
            "place": "Rue de Lyon, 75012 Paris, France",
            "addressLabel": "Rue de Lyon, 75012 Paris, France",
            "coordinate": {
                "longitude": 2.37008,
                "latitude": 48.85099
            },
            "distance": 2214
        },
        ...
    ]
}
```

In the `items` array, the first item is the best match found by the API.

You can take the longitude and latitude values of the `coordinate` field of the first item.

This coordinate will be used by the EV Smart Routing API to perform the trip computation.

See more details in the [API reference](index.html#subpage-rest_1_0_0-autocompletegeocoding-service.md).



## How to run the trip computation

The API EV Smart Routing v2 is used to perform the trip computation. Its URL is `/bgis/service/2.0/evsmartrouting`: the version comes before the name.
The example trip is from Paris to Lyon. To make this trip computation with the API, some fields are required:

- `vehicle`: an object whose `key` field can be set with the value of `vehicle key id` retrieved above in this tutorial in the chapter `How to get the vehicle key`.
- `start`: an object with the `lon` and `lat` fields of the departure. These fields can be set with GPS-like coordinates. If you have a postal address, see the chapter `How to convert a postal address to coordinates` available above in this tutorial.
- `stop`: an object with the `lon` and `lat` fields of the destination, set in the same way.
- `csps`: the charging station providers to be used during the trip. The specification shows it as optional, but a trip that needs a charge fails without it: `400 NO_REACHABLE_STEP_POINT`, "All charging stations found cannot be reachable". The values are your account's providers, the keys of `chargingStationProviders` in `GET /bgis/service/acl/1.0/user/details`. This tutorial uses `ecoMovement`.

Now we have all required values to start the computation.

**Request:**

```
{"bemap":{"language":"request"}}
POST ${HOST_URL}/bgis/service/2.0/evsmartrouting
{
  "csps": [
    "ecoMovement"
  ],
  "vehicle": {
    "key": "eb72114c-1f74-4854-b4ce-c2b3f06405d5"
  },
  "start": {
    "lon": 2.3414,
    "lat": 48.85717
  },
  "stop": {
    "lon": 4.82965,
    "lat": 45.75917
  }
}
```



**📌 Some optional fields:**

The options and settings of the trip go inside the `condition` object.

- `geoserver`: allows you to define the `geoserver`. The `geoserver` defines the server configuration to use for the calculation. For example `here` is a configuration running with the HERE map data.
- `vehicle.initBatLvl`: the initial battery level in percent, 100 by default. This value will be used from the start coordinate to the destination or to the first charge (if required).
- `vehicle.payload`: the payload in kg (passengers, luggage and consumables), 75 by default.
- `condition.temperature`: the outside temperature in degrees Celsius, 20 by default.
- `condition.minBatLvl`: the minimal battery level in percent. Defines the value below which the battery should be charged during the trip.
- `condition.minArrivalBatLvl`: the minimal arrival battery level in percent. Defines the value below which the battery should be charged at arrival of trip.
- `condition.currency`: the currency of the charging costs, as a 3-letter ISO 4217 code such as `EUR`.
- `condition.departureTime`: the departure time as EPOCH in milliseconds. The field also takes an ISO date, but measured on prod its offset is dropped (`08:00+02:00` departs at 08:00 UTC), so send EPOCH milliseconds.
- `condition.chargePluggingTime`: the time in seconds to take the cable, plug and unplug the connector at each charging stop, 300 by default.
- `condition.geometry` and `condition.encodedGeometry`: if `geometry` is set to `true`, the geometry of the route is returned as an array of objects composed by longitude and latitude fields. This is very verbose. To reduce this information, you can set `geometry` to `false` and `encodedGeometry` to `true`. Then, the returned geometry will be a Google Encoded Polyline. Measured on prod, a request that sets neither gets no geometry, although the specification says `geometry` is true by default.

See more details in the [API reference](index.html#subpage-rest_2_0_0-evsmartrouting-service-v2_0_0.md).



**Request:**

```
{"bemap":{"language":"request"}}
POST ${HOST_URL}/bgis/service/2.0/evsmartrouting
{
  "geoserver": "here",
  "csps": [
    "ecoMovement"
  ],
  "vehicle": {
    "key": "eb72114c-1f74-4854-b4ce-c2b3f06405d5",
    "initBatLvl": 100,
    "payload": 75
  },
  "start": {
    "lon": 2.3414,
    "lat": 48.85717
  },
  "stop": {
    "lon": 4.82965,
    "lat": 45.75917
  },
  "condition": {
    "minBatLvl": 10,
    "minArrivalBatLvl": 15,
    "temperature": 20,
    "currency": "EUR",
    "departureTime": 1675444140000,
    "chargePluggingTime": 300,
    "geometry": false,
    "encodedGeometry": true
  }
}
```



**Response (trimmed):**

```
{"bemap":{"language":"javascript"}}
{
  "logTag": "a8ef59f1-f2b9-40e6-b793-2e95f7502dba",
  "journeys": [
    {
      "summary": {
        "vehicleInfo": {
          "brand": "Audi",
          "name": "e-tron",
          "variant": "50 quattro",
          "year": "2019-2022"
        },
        "distance": 465905,
        "duration": 16582,
        "batteryLevel": 15.0,
        "consumed": 121.31,
        "chargingTime": 2366,
        "departureTime": 1675444140000,
        "arrivalTime": 1675463688000,
        "boundingBox": {
          "minLon": 2.30592,
          "minLat": 45.7515,
          "maxLon": 4.91991,
          "maxLat": 48.85848
        },
        "chargingCost": {
          "currency": "EUR",
          "withoutVat": 14.1678,
          "includeVat": 17.00136
        }
      },
      "events": [
        {
          "eventType": "START",
          "coord": {
            "lon": 2.3414011701366593,
            "lat": 48.85716963819132
          },
          "address": "Pont Neuf, 75001 Paris, France",
          "departureTime": 1675444140000
        },
        {
          "eventType": "ROUTE",
          "distance": 218099,
          "duration": 7951,
          "consumed": 57.68289269052022,
          "encodedGeometry": "ileiHwhhMGEKI[WYUu@g@_BmAII..."
        },
        {
          "eventType": "CHARGE",
          "coord": {
            "lon": 3.99160365,
            "lat": 47.50860064
          },
          "arrivalTime": 1675452091000,
          "departureTime": 1675453604000,
          "arrivalBatteryLevel": 10.840305252749204,
          "departureBatteryLevel": 63.0249272574425,
          "chargingTime": 1213,
          "chargingPower": {
            "currentType": "DC",
            "power": 120.0,
            "cnnTypeId": 38
          },
          "chargingCost": {
            "currency": "EUR",
            "withoutVat": 14.1678,
            "includeVat": 17.00136,
            "tariffChargePassHashId": "54f7f457a004285cbd9eeed89df76986"
          },
          "pool": {
            "providerName": "ecoMovement",
            "providerMode": "LOCAL",
            "id": "29877aee-8bd4-11ed-8bd2-42010aa40fc0",
            "brand": "SDEY",
            "name": "SDEY - SAUVIGNY LE BOIS (89) - Sortie 22 Avallon sur A6",
            "countryCode": "FRA",
            "address": {
              "countryCode": "FRA",
              "country": "FRA",
              "city": "Sauvigny-le-Bois",
              "postalCode": "89200",
              "street": "Échangeur d'Avallon"
            },
            "siteCategory": "ON_STREET",
            "accessibility": "PUBLIC",
            "availabilityStatus": "IN_SERVICE_FREE",
            "open24x7": true,
            "numberOfChargingPoint": 4,
            "stations": [
              {
                "availabilityStatus": "IN_SERVICE_FREE",
                "bookable": true,
                "chargingPoints": [
                  {
                    "id": "d9bf99f9-bcda-5f22-a1a2-bd0539215005",
                    "availabilityStatus": "IN_SERVICE_FREE",
                    "currentType": "DC",
                    "power": 160.0,
                    "type": 38,
                    "connectorTypes": [
                      {
                        "id": 38,
                        "key": "TYPE_2-CABLE_COMBO_CCS",
                        "deprecated": false,
                        "name": "Type 2 Combo",
                        "norm": "Combo Type 2 based, DC",
                        "maxPower": 350.0,
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
        {
          "eventType": "ROUTE",
          "distance": 132753,
          "duration": 4290,
          "consumed": 34.31055774651636,
          "encodedGeometry": "q_~`HuqjWa@NETBTLJj@YFK?[..."
        },
        {
          "eventType": "CHARGE",
          "coord": {
            "lon": 4.84293398,
            "lat": 46.69314818
          },
          "arrivalTime": 1675457894000,
          "departureTime": 1675459347000,
          "arrivalBatteryLevel": 9.999999999999986,
          "departureBatteryLevel": 60.304797226976696,
          "chargingTime": 1153,
          . . .
          "pool": {
            "providerName": "ecoMovement",
            "brand": "TotalEnergies",
            "name": "RELAIS DE LA FERTE",
            . . .
          }
        },
        {
          "eventType": "ROUTE",
          "distance": 115053,
          "duration": 4341,
          "consumed": 29.31220380585392,
          "encodedGeometry": "iw~{Gi|p\\HCLWH]vCMzBS`BA..."
        },
        {
          "eventType": "STOP",
          "coord": {
            "lon": 4.829650718111577,
            "lat": 45.7591712233967
          },
          "address": "Place Antonin Gourju, 69002 Lyon, France"
        }
      ]
    }
  ]
}
```

See more details in the [API reference](index.html#subpage-rest_2_0_0-evsmartrouting-service-v2_0_0.md).



### ✅ Use the results

The API returns a `JSON` object with a `journeys` array. Each journey has two main fields: `summary` and `events`. The `summary` contains the summary information of the trip. The `events` describe the trip in order: a `START`, a `ROUTE` for each leg of driving, a `CHARGE` for each charging stop, and a `STOP`.

The `summary` object can be used to display the summary of trip in your application: the distance (`distance`, in meters), duration (`duration`, in seconds), time spent in charge (`chargingTime`, in seconds), arrival date and time (`arrivalTime`, EPOCH in milliseconds), consumption (`consumed`, in kWh), battery level at arrival (`batteryLevel`, in percent) and charging cost (`chargingCost`). See the [API reference](index.html#subpage-rest_2_0_0-evsmartrouting-service-v2_0_0.md) for more details about these fields.

Each `CHARGE` event describes a charging stop: the charging station pool (`pool`), the battery levels at arrival and departure (`arrivalBatteryLevel`, `departureBatteryLevel`), the charging time (`chargingTime`), the charging power (`chargingPower`) and the cost (`chargingCost`).

The trip geometry can be used to display the trip on a map in your application. It is given leg by leg, in the `ROUTE` events. Two fields are available for the geometry. One is `geometry`, returned when `condition.geometry` is `true`, which contains an array of coordinate objects with `lon` (longitude) and `lat` (latitude) fields. The second is `encodedGeometry`, returned when `condition.encodedGeometry` is `true`, which represents the geometry as a Google Encoded Polyline.

You can use the [interactive example](index.html#subpage-rest_2_0_0-examples-evsmartrouting-service-v2_0_0.md).

---

_BeNomad MCP: a corrected copy of BeMap's page, served until BeMap publishes the correction (BEMAP-1938)._
