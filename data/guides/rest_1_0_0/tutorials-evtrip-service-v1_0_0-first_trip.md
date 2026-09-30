# Tutorial for the first trip in electrical vehicle
<span class="float-right shadow">![Illustration of an EV smart routing trip](images/evsmartrouting-service-map.jpg)</span>

This tutorial is about how to perform a simple routing trip calculation dedicated to electric vehicle.

When the autonomy of the vehicle is not sufficient to reach the final destination, this service returns a route which includes deviations through charging stations (aka step points).

In this tutorial, the trip starts from the city of Paris to the city of Lyon.
To do this, the tutorial is divided in chapters :

1. How to get the vehicle key:
   1. Get the brand.
   2. Select the vehicle.
2. How to convert a postal address to coordinates (optional).
3. How to run the trip computation.
   1. Use the results.



## How to get the vehicle key

The first step is to get the brand of vehicle. The second is to get the vehicle key id.
The vehicle key id will be used by the EV Smart Routing API to perform the trip computation with the selected vehicle.



### Get the brand

To get the list of vehicle constructor brands, just call the API Vehicle `getbrands` like the request example below.

Request example:

```
{"bemap":{"language":"request"}}
GET ${HOST_URL}/bgis/service/vehicle/1.1/getbrands
```

Response (truncated):

```
{"bemap":{"language":"json"}}
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

> NOTE: The id is unique to one environment (production, preproduction, etc). When your application switches environments (for example from preproduction to production), you will need to call the API again.



### Select the vehicle

To compute the trip, the EV Smart Routing API needs to know which vehicle to use. The vehicle is represented by an identifier, the `vehicle key id`. This identifier is a simple string like `eb72114c-1f74-4854-b4ce-c2b3f06405d5` for an `Audi e-tron 50 quattro`. 

> NOTE: The  ` vehicle key id` is the same on all environments (production and preproduction).



To do this selection we have two main APIs:

- A helper API to fill a drop-down list. See the chapter `Select the vehicle from a drop-down list` below.
- An API to find or list the vehicles. See the `Find vehicle` chapter below.



#### Select the vehicle from a drop-down list (optional)

The vehicle key id is a unique string identifier of a vehicle. Its `id` is the same on all environments (production and preproduction).

##### 1. Get vehicle names for a brand

```
{"bemap":{"language":"request"}}
GET ${HOST_URL}/bgis/service/vehicle/1.1/getlevelvehicleinfo?level=NAME&brandId=5e903acb9548987051674099
```

The response is a JSON array.

```
{"bemap":{"language":"json"}}
["A6 Avant e-tron", "A6 Sportback e-tron", "Q4 Sportback e-tron", "Q4 e-tron", ..., "e-tron", "e-tron 55 Quattro", "e-tron GT", ...]
```

You can use it to fill a drop-down list in your user interface.
Get the searched vehicle name to fill the next step request url and the final `find vehicle` request.

##### 2. Get the variants and years for the vehicle name.

a. List of variants

```
{"bemap":{"language":"request"}}
GET ${HOST_URL}/bgis/service/vehicle/1.1/getlevelvehicleinfo?level=VARIANT&brandId=5e903acb9548987051674099&name=e-tron
```

The response is a JSON array.

```
{"bemap":{"language":"json"}}
["50 quattro", "55 quattro"]
```

b. List of years

```
{"bemap":{"language":"request"}}
GET ${HOST_URL}/bgis/service/vehicle/1.1/getlevelvehicleinfo?level=YEAR&brandId=5e903acb9548987051674099&name=e-tron&variant=50+quattro
```

The response is a JSON array.

```
{"bemap":{"language":"json"}}
["2019-2022", "2021-2022"]
```

You can use them to fill drop-down lists in your user interface.
Get the searched variant and year to fill the next step request url and the final `find vehicle` request.

##### 3. Get the available battery names for the vehicle name.

The battery name is the public or commercial name of battery like "50". This information should not be confused with the actual battery capacity (kWh). For example, a battery with 52 kWh of capacity is called "50".

```
{"bemap":{"language":"request"}}
GET ${HOST_URL}/bgis/service/vehicle/1.1/getlevelvehicleinfo?level=BATTERY_NAME&brandId=5e903acb9548987051674099&name=e-tron&variant=50+quattro&year=2019-2022
```

The response is a JSON array.

```
{"bemap":{"language":"json"}}
["71"]
```

You can use it to fill a drop-down list in your user interface. 
Get the searched battery name to fill the next step request url and the final `find vehicle` request.

##### 4. Get available chargers for the vehicle name and battery name.

a. List of DC chargers

```
{"bemap":{"language":"request"}}
GET ${HOST_URL}/bgis/service/vehicle/1.1/getlevelvehicleinfo?level=CHARGE_POWER_DC&brandId=5e903acb9548987051674099&name=e-tron&variant=50+quattro&year=2019-2022&batteryName=71
```

The response is a JSON array.

```
{"bemap":{"language":"json"}}
["120.0"]
```

You can use it to fill a drop-down list in your user interface.
Get the searched DC charge to fill the next step request url and the final `find vehicle` request.

b. List of AC chargers

```
{"bemap":{"language":"request"}}
GET ${HOST_URL}/bgis/service/vehicle/1.1/getlevelvehicleinfo?level=CHARGE_POWER_AC&brandId=5e903acb9548987051674099&name=e-tron&variant=50+quattro&year=2019-2022&batteryName=71&chargerPowerDC=120.0
```

The response is a JSON array.

```
{"bemap":{"language":"json"}}
["11.0", "0.0"]
```

You can use it to fill a drop-down list in your user interface.
Get the searched AC charge to fill the final `find vehicle` request.

##### 5. Get the `vehicle key id`.

Now, we have all the elements to perform a request with the find vehicle API. See the next chapter.



See more details in the [API reference](index.html#subpage-rest_1_1_0-vehicle-getlevelvehicleinfo-service-v1_1_0.md).



#### Find vehicle

This API can return the `vehicle key id` and other vehicle information.

If you have enough information, you can get a single vehicle ID directly in the response. Otherwise you obtain a list of vehicles.

The following example gets a single `vehicle key id` in one request.

Request:

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

Response:

```
{"bemap":{"language":"json"}}
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
            "maxWeight": 2,
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



Here is another example to get all the vehicles for a brand.

Request example:

```
{"bemap":{"language":"request"}}
POST ${HOST_URL}/bgis/service/vehicle/1.1/findvehicles
{
  "brandId": "5e903acb9548987051674099"
}
```

In the response you will find all vehicles for this particular brand.



See more details in the [API reference](index.html#subpage-rest_1_1_0-vehicle-findvehicles-service-v1_1_0.md).





## How to convert a postal address to coordinates

If you have the [coordinates (longitude and latitude)](index.html#page-glossary-coordinate_system.md) of the start and destination points, you can skip this chapter to the next chapter.



The EV Smart Routing API runs with [coordinates (longitude and latitude)](index.html#page-glossary-coordinate_system.md): if you have a postal address, you need to find the coordinate of this address.

To do this, 2 APIs are available:

- Geocoding
- Auto-complete



### Get the coordinate via the Geocoding API

This API can take the postal address in categorized fields and returns the [coordinate](index.html#page-glossary-coordinate_system.md) and postal address.

- The `address` field contains subfields like `country`, `city` and `street`. More fields are available.

- The `language` field defines the language in search and response.

- The `maximumResults` field defines the maximum results to be returned in the response.

For more details, see the [API reference](index.html#subpage-rest_1_0_0-geocoding-service.md).

Request:

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

Response:

```
{"bemap":{"language":"json"}}
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

> NOTE: the response spells this field `maximunResult`, not `maximumResults`.

In the `elements` array, the first element is the best match found by the API.

You can take the longitude and latitude values of the `coordinate` field of the first element.

This coordinate will be used by the EV Smart Routing API to perform the trip computation.

See more details in the [API reference](index.html#subpage-rest_1_0_0-geocoding-service.md).



### Get the coordinate via Auto-complete API

This API can take the postal address, place or POI name as free text and returns the place name and the [coordinate](index.html#page-glossary-coordinate_system.md).

The `place` field defines the postal address, place or POI name.

The `coordinate` field biases the search towards a point: the `distance` of each item in the response is measured from it, in metres. It is mandatory with `herehlp`.

> IMPORTANT: this feature is only available with providers `herehlp`, `nominatim`, `addok` and `photon`, named in the `geoserver` field.



Request:

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

Response:

```
{"bemap":{"language":"json"}}
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

The API EV Smart Routing is used to perform the trip computation.
The example trip is from Paris to Lyon. To make this trip computation with the API, some fields are required:

- `vehicle`: this field can be set with the value of `vehicle key id` retrieved above in this tutorial in the chapter `How to get the vehicle key`.
- `startLon` and `startLat`: these fields can be set with [GPS-like coordinates](index.html#page-glossary-coordinate_system.md). If you have a postal address, see the chapter `How to convert a postal address to coordinates` available above in this tutorial.
- `stopLon` and `stopLat`: these fields can be set with [GPS-like coordinates](index.html#page-glossary-coordinate_system.md). If you have a postal address, see the chapter `How to convert a postal address to coordinates` available above in this tutorial.
- `csps`: the charging station providers in which the charging stops are searched. It is needed for any trip that needs a charge, as Paris to Lyon does: without it, the service answers `400 NO_REACHABLE_STEP_POINT` ("All charging stations found cannot be reachable"), a message that does not mention `csps`. The accepted values are the `key`s of your account's `chargingStationProviders`, returned by `GET ${HOST_URL}/bgis/service/acl/1.0/user/details`; a provider your account does not hold answers `400` "Not allowed charging station provider". This tutorial uses `ecoMovement`.

The example also sets `temperature`, the outside temperature in degrees Celsius. It is optional: `20` by default.

Now we have all required values to start the computation.

Request:

```
{"bemap":{"language":"request"}}
POST ${HOST_URL}/bgis/service/evsmartrouting/1.0
{
  "vehicle": "eb72114c-1f74-4854-b4ce-c2b3f06405d5",
  "csps": [
    "ecoMovement"
  ],
  "temperature": 20,
  "startLon": 2.3414,
  "startLat": 48.85717,
  "stopLon": 4.82965,
  "stopLat": 45.75917
}
```



Some optional fields:

- `geoserver`: allows you to define the `geoserver`. The `geoserver` defines the server configuration to use for the calculation. For example `here` is a configuration running with the HERE map data.
- `initBatLvl`: the initial battery level in percent. This value will be used from the start coordinate to the destination or to the first charge (if required).
- `minBatLvl`: the minimal battery level in percent. Defines the value below which the battery should be charged during the trip.
- `minArrivalBatLvl`: the minimal arrival battery level in percent. Defines the value below which the battery should be charged at arrival of trip.
- `payload`: the vehicle's extra load (passengers, luggage) in kg. `75` by default.
- `cur`: the currency as a 3-letter ISO 4217 code.
- `departureTime`: the departure time as EPOCH in milliseconds.
- `stepPointPluggingTime`: the time in seconds to take the cable, plug and unplug the connector, added to each charging stop.
- `pl` and `epl`: if the `pl` field is set to `true`, the geometry of the route is returned as a `JSON` object composed by longitude and latitude fields. This is very verbose. To reduce this information, you can set the `pl` field to `false` and set the `epl` field to `true`. Then, the returned geometry will be a [Google Encoded Polyline](index.html#page-glossary-google_encoded_polyline_algorithm_format.md).

See more details in the [API reference](index.html#subpage-rest_1_0_0-evsmartrouting-service-v1_0_0.md).



Request:

```
{"bemap":{"language":"request"}}
POST ${HOST_URL}/bgis/service/evsmartrouting/1.0
{
  "geoserver": "here",
  "csps": [
    "ecoMovement"
  ],
  "vehicle": "eb72114c-1f74-4854-b4ce-c2b3f06405d5",
  "initBatLvl": 100,
  "minBatLvl": 10,
  "minArrivalBatLvl": 15,
  "temperature": 20,
  "payload": 75,
  "startLon": 2.3414,
  "startLat": 48.85717,
  "stopLon": 4.82965,
  "stopLat": 45.75917,
  "pl": false,
  "epl": true,
  "cur": "EUR",
  "departureTime": 1675444140000,
  "stepPointPluggingTime": 300
}
```



Response:

```
{"bemap":{"language":"json"}}
{
  "logTag": "88fc406a-a5e9-4c43-93c8-24e78720ca99",
  "journey": {
    "chargingCost": {
      "currency": "EUR",
      "withoutVat": 14.1678,
      "includeVat": 17.00136
    },
    "distance": 465905,
    "duration": 16582,
    "batteryLevel": 15.0,
    "consumed": 121.31,
    "chargingTime": 2366,
    "departureTime": 1675444140000,
    "arrivalTime": 1675463688000,
    "vehicle": "e-tron"
  },
  "inputInfo": {
    "start": {
      "address": "Pont Neuf, 75001 Paris, France",
      "lon": 2.3414011701366593,
      "lat": 48.85716963819132
    },
    "stop": {
      "address": "Place Antonin Gourju, 69002 Lyon, France",
      "lon": 4.829650718111577,
      "lat": 45.7591712233967
    }
  },
  "boundingBox": {
    "minLon": 2.30592,
    "minLat": 45.7515,
    "maxLon": 4.91991,
    "maxLat": 48.85848
  },
  "route": {
    "stepPoints": [
      {
        "id": "29877aee-8bd4-11ed-8bd2-42010aa40fc0",
        "brand": "SDEY",
        "nameOfPool": "SDEY - SAUVIGNY LE BOIS (89) - Sortie 22 Avallon sur A6",
        "accessibility": "PUBLIC",
        "availabilityStatus": "IN_SERVICE_FREE",
        "longitude": 3.99160365,
        "latitude": 47.50860064,
        "distance": 218099,
        "duration": 7951,
        "arrivalTime": 1675452091000,
        "departureTime": 1675453604000,
        "consumed": 57.68289269052022,
        "arrivalBatteryLevel": 10.840305252749204,
        "departureBatteryLevel": 63.0249272574425,
        "chargingPower": {
          "currentType": "DC",
          "power": 120.0,
          "cnnTypeId": 38
        },
        "chargingTime": 1213,
        "chargingCost": {
          "currency": "EUR",
          "withoutVat": 14.1678,
          "includeVat": 17.00136
        },
        "countryCode": "FRA",
        "country": "FRA",
        "postalCode": "89200",
        "city": "Sauvigny-le-Bois",
        "street": "Échangeur d'Avallon",
        "phoneNumber": "+(33)-(3)-86522200",
        "timeZone": "Europe/Paris",
        "open24x7": true,
        "chargingStations": [
          {
            "nature": "VGROUP",
            "availabilityStatus": "IN_SERVICE_FREE",
            "authenticationModes": [
              "RFID_BADGE"
            ],
            "paymentModes": [
              "OPERATOR_CONTRACT",
              "CREDIT_CARD"
            ],
            "bookable": true,
            "chargingPoints": [
              {
                "id": "d9bf99f9-bcda-5f22-a1a2-bd0539215005",
                "operatorId": "FR*BFC*EV*DOCO2",
                "availabilityStatus": "IN_SERVICE_FREE",
                "type": 38,
                "connectorTypes": [
                  {
                    "id": 38,
                    "key": "TYPE_2-CABLE_COMBO_CCS",
                    "operatorId": "517164a8-fae1-5e29-befc-31045fc4abec",
                    "deprecated": false,
                    "name": "Type 2 Combo",
                    "norm": "Combo Type 2 based, DC",
                    "maxPower": 350.0,
                    "power": 160.0,
                    "voltage": 400.0,
                    "ampere": 400.0,
                    "acSingle": false,
                    "acThree": false,
                    "dc": true,
                    "cable": true
                  }
                ],
                "currentType": "DC",
                "voltage": 400.0,
                "ampere": 400.0,
                "power": 160.0,
                "remoteCharging": true
              }
            ]
          }
        ]
      },
      {
        "id": "f35bd446-7cac-11ed-9d15-42010aa40fc0",
        "brand": "TotalEnergies",
        "nameOfPool": "RELAIS DE LA FERTE",
        "accessibility": "PUBLIC",
        "availabilityStatus": "IN_SERVICE_FREE",
        "longitude": 4.84293398,
        "latitude": 46.69314818,
        "distance": 132753,
        "duration": 4290,
        "arrivalTime": 1675457894000,
        "departureTime": 1675459347000,
        "consumed": 34.31055774651636,
        "arrivalBatteryLevel": 9.999999999999986,
        "departureBatteryLevel": 60.304797226976696,
        "chargingPower": {
          "currentType": "DC",
          "power": 120.0,
          "cnnTypeId": 38
        },
        "chargingTime": 1153,
        "chargingCost": {
          "currency": "EUR",
          "withoutVat": 0.0,
          "includeVat": 0.0
        },
        "countryCode": "FRA",
        "country": "FRA",
        "postalCode": "71240",
        "city": "Saint-Ambreuil",
        "street": "Autoroute du Soleil",
        "phoneNumber": "+(33)-(9)-77405060",
        "timeZone": "Europe/Paris",
        "open24x7": true,
        "chargingStations": [
          {
            "nature": "VGROUP",
            "availabilityStatus": "IN_SERVICE_FREE",
            "authenticationModes": [
              "RFID_BADGE"
            ],
            "paymentModes": [
              "OPERATOR_CONTRACT",
              "CREDIT_CARD"
            ],
            "bookable": false,
            "chargingPoints": [
              {
                "id": "CU-TOTAL-NF080341-004-1",
                "operatorId": "FR*HPC*ENF080341*004*1",
                "availabilityStatus": "IN_SERVICE_BUSY",
                "type": 38,
                "connectorTypes": [
                  {
                    "id": 38,
                    "key": "TYPE_2-CABLE_COMBO_CCS",
                    "operatorId": "1",
                    "deprecated": false,
                    "name": "Type 2 Combo",
                    "norm": "Combo Type 2 based, DC",
                    "maxPower": 350.0,
                    "power": 300.0,
                    "voltage": 800.0,
                    "ampere": 375.0,
                    "acSingle": false,
                    "acThree": false,
                    "dc": true,
                    "cable": true
                  }
                ],
                "currentType": "DC",
                "voltage": 800.0,
                "ampere": 375.0,
                "power": 300.0,
                "remoteCharging": true
              }
            ]
          }
        ]
      }
    ],
    "encodedPolyline": "ileiHwhhMGEKI[WYUu@g@_BmAI..."
  }
}
```

See more details in the [API reference](index.html#subpage-rest_1_0_0-evsmartrouting-service-v1_0_0.md).



### Use the results

The API returns a `JSON` object with two main fields: `journey` and `route`. The `journey` contains the summary information of the trip. The `route` lists the charge steps in the `stepPoints` field and contains the route geometry in the `encodedPolyline` field.

The `journey` object can be used to display the summary of trip in your application: the distance (`distance`), duration (`duration`), time spent in charge (`chargingTime`), arrival date and time (`arrivalTime`) and consumption (`consumed`). See the [API reference](index.html#subpage-rest_1_0_0-evsmartrouting-service-v1_0_0.md) for more details about these fields.

The trip geometry can be used to display the trip on a map in your application. Two fields are available for the geometry. One is the `polyline`, which contains an array of coordinate objects with `lon` (longitude) and `lat` (latitude) fields. The second is `encodedPolyline`, which represents the geometry as a [Google Encoded Polyline](index.html#page-glossary-google_encoded_polyline_algorithm_format.md).



You can use the [interactive example](index.html#subpage-rest_1_0_0-examples-evsmartrouting-service-v1_0_0.md) to quickly test different requests and trips.

---

_BeNomad MCP: a corrected copy of BeMap's page, served until BeMap publishes the correction (BEMAP-1938)._
