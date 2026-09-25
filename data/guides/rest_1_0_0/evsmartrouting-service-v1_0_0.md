<span class="float-right shadow">![Illustration of near POI service](images/evsmartrouting-service-map.jpg)</span>

# REST API, Service version 1.0.0



## EV Smart Routing service
Performs a route calculation dedicated to electric vehicles.
If the vehicle's range is insufficient to reach the final destination, this service returns a route that includes deviations to charging stations (also known as step points).


### Request
The request must be sent using the HTTP `POST` method with the `Content-Type` header set to `application/json`.

**Sample:**

End-point URI: `/bgis/service/evsmartrouting/1.0`.

HTTP header: `Content-Type: application/json`.

POST data:
```
{"bemap":{"language":"javascript"}}
{
  "vehicle": "06b5c02d-ba2e-4b14-8b2b-6d793aac0da0",
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
  "cur": "EUR"
}
```

All coordinates are defined by longitude and latitude, see the [coordinate system](index.html#page-glossary-coordinate_system.md) glossary for more details.



#### __Parameters__

<a target="_blank" rel="noopener" href="scheme.html?className=com.benomad.bgis.fe.protocol.service.v1_0_0.model.evSmartRouting.request.EvSmartRoutingRequest">Show the class diagram</a>

```
{"bemap":{"language":"!include","url":"/bgis/service/documentation/1.0/buildclass.md?className=com.benomad.bgis.fe.protocol.service.v1_0_0.model.evSmartRouting.request.EvSmartRoutingRequest"}}
```


To get the complete list of available connector types, see the [Charging station connector service](index.html##subpage-rest_1_0_0-chargingstation-connector-service.md).

See the [Currency Codes](index.html#subpage-rest_1_0_0-currency-codes-service.md) service to get the available codes.


### Response

#### Details of fields

<a target="_blank" rel="noopener" href="scheme.html?className=com.benomad.bgis.fe.protocol.service.v1_0_0.model.evSmartRouting.response.EvSmartRoutingResponse">Show the class diagram</a>

```
{"bemap":{"language":"!include","url":"/bgis/service/documentation/1.0/buildclass.md?className=com.benomad.bgis.fe.protocol.service.v1_0_0.model.evSmartRouting.response.EvSmartRoutingResponse"}}
```
See chapter [Google Encoded Polyline Algorithm Format](index.html#page-glossary-google_encoded_polyline_algorithm_format.md) of full description of encoding format.


#### Response samples

JSON Sample:
```
{"bemap":{"language":"javascript"}}
{
  "logTag": "48434800-a86f-4333-a274-c9810499bbaa",
  "journey": {
    "distance": 488860,
    "duration": 18272,
    "batteryLevel": 15,
    "consumed": 106.32,
    "chargingTime": 5487,
    "departureTime": 1787642234000,
    "arrivalTime": 1787665993000,
    "vehicle": "Zoe 2"
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
    "minLon": 2.3059,
    "minLat": 45.7515,
    "maxLon": 4.91991,
    "maxLat": 48.85848
  },
  "route": {
    "stepPoints": [
      {
        "id": "92538C37-6DB0-4219-A308-60956AF57FD9",
        "nameOfPool": "place",
        "accessibility": "NA",
        "availabilityStatus": "IN_SERVICE",
        "longitude": 3.6368734605,
        "latitude": 47.8067199884,
        "distance": 178291,
        "duration": 6897,
        "arrivalTime": 1787649131000,
        "departureTime": 1787651606000,
        "consumed": 38.39077295291925,
        "arrivalBatteryLevel": 23.344935132048718,
        "departureBatteryLevel": 77.32597182092913,
        "chargingPower": {
          "currentType": "DC",
          "power": 45,
          "cnnTypeId": 38
        },
        "chargingTime": 2475,
        "countryCode": "FR",
        "country": "France",
        "street": "Place du Presbytere - VENOY",
        "comment": "En service",
        "chargingStations": [
          {
            "id": "214763",
            "nature": "VGROUP",
            "availabilityStatus": "IN_SERVICE",
            "bookable": false,
            "chargingPoints": [
              {
                "id": "214763",
                "operatorId": "214763",
                "availabilityStatus": "IN_SERVICE",
                "type": 38,
                "connectorTypes": [
                  {
                    "id": 38,
                    "key": "TYPE_2-CABLE_COMBO_CCS",
                    "deprecated": false,
                    "name": "Type 2 Combo",
                    "norm": "Combo Type 2 based, DC",
                    "maxPower": 350,
                    "acSingle": false,
                    "acThree": false,
                    "dc": true,
                    "cable": true
                  }
                ],
                "currentType": "DC",
                "power": 45
              }
            ]
          }
        ]
      },
      {
        "id": "59E20836-0065-4A00-B857-9F6504A96CD3",
        "brand": "Total EV Charge",
        "nameOfPool": "Total - Relais Beaune-Merceuil",
        "accessibility": "NA",
        "availabilityStatus": "IN_SERVICE",
        "longitude": 4.83816536817574,
        "latitude": 46.9632136215612,
        "distance": 154647,
        "duration": 5626,
        "arrivalTime": 1787657232000,
        "departureTime": 1787660244000,
        "consumed": 34.19316735752278,
        "arrivalBatteryLevel": 10,
        "departureBatteryLevel": 81.38480865927184,
        "chargingPower": {
          "currentType": "DC",
          "power": 50,
          "cnnTypeId": 38
        },
        "chargingTime": 3012,
        "countryCode": "FR",
        "country": "France",
        "postalCode": "21190",
        "city": "Merceuil ",
        "street": "Aire de Beaune",
        "chargingStations": [
          {
            "id": "180273",
            "nature": "VGROUP",
            "availabilityStatus": "IN_SERVICE",
            "bookable": false,
            "chargingPoints": [
              {
                "id": "180273",
                "operatorId": "180273",
                "availabilityStatus": "IN_SERVICE",
                "type": 38,
                "connectorTypes": [
                  {
                    "id": 38,
                    "key": "TYPE_2-CABLE_COMBO_CCS",
                    "deprecated": false,
                    "name": "Type 2 Combo",
                    "norm": "Combo Type 2 based, DC",
                    "maxPower": 350,
                    "acSingle": false,
                    "acThree": false,
                    "dc": true,
                    "cable": true
                  }
                ],
                "currentType": "DC",
                "power": 50
              }
            ]
          }
        ]
      }
    ],
    "encodedPolyline": "ileiHwhhMGEKI[WYU..."
  }
}
```



#### ErrorResponse object
If an error occurs during the process on server side, only an error object will be returned in the response. See `Error example` chapter.
* `code`: error code. See the Error list chapter.
* `message`: error message.
* `coordinate`: coordinate of error (optional).
   * `lon`: longitude of coordinate in decimal degrees ([WGS84](index.html#page-glossary-coordinate_system.md)).
   * `lat`: latitude of coordinate in decimal degrees ([WGS84](index.html#page-glossary-coordinate_system.md)).



##### Error codes
List of all possible error codes:

| Code                              | Description                                                  |
| --------------------------------- | ------------------------------------------------------------ |
| OK                                | No error.                                                    |
| CANNOT\_PERFORM\_CHARGINGTIME     | The charging time estimation cannot be performed.            |
| CANNOT\_PERFORM\_ROUTING          | The routing calculation cannot be performed with the input coordinates. |
| CHARGING\_STATION\_NOT\_FOUND     | Cannot find any charging station.                            |
| CANNOT\_GET\_CONNECTOR\_TYPES     | Issue to get the list of connector types.                    |
| COORDINATE\_NOT\_MATCH            | One of the input coordinates cannot be matched on a road.    |
| INTERNAL\_ERROR                   | The server cannot perform the routing calculation for internal service reason. |
| NO\_REACHABLE\_STEP\_POINT        | No charging stations found are reachable.                    |
| OVER\_ALLOWED\_DISTANCE           | Too many charges required (maximum charges = 16).            |
| RouteNotFoundException            | The initial route cannot be found.                           |
| TooMuchViaException               | Too much via coordinates in request.                         |
| ViaNotMatchException              | One of via coordinate of request cannot be map matched.      |
| NotEnoughViaException             | The via coordinates cannot be map matched. A minimal of 2 coordinates must be map matched to perform a route. |
| VehicleFeatureIsRequiredException | The vehicle feature is required. The vehicle must be checked. |
| VehicleProfileIsRequiredException | The vehicle profile is required. The vehicle must be checked. |


##### Error example
```
{"bemap":{"language":"javascript"}}
{
   "error": {
      "code": "NO_REACHABLE_STEP_POINT",
      "message": "All charging stations found cannot be reachable. Around this coordinate.",
      "coordinate": {
         "lon": 8.193691832353528,
         "lat": 45.42630127240513
      }
   }
}
```


All coordinates are defined by longitude and latitude, see the [coordinate system](index.html#page-glossary-coordinate_system.md) glossary for more details.
