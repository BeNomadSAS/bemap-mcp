<span class="float-right shadow">![Illustration of near POI service](images/evsmartrouting-service-map.jpg)</span>

# REST API, Service version 2.0.0



## EV Smart Routing service
Performs a route calculation dedicated to electric vehicles. If the autonomy of the vehicle is not sufficient to reach final destination, this service returns a route which includes deviations through charging stations (aka step points). If the optimization criteria is fastest the calculated route optimizes the overall time (driving + charging) to reach the final destination.



### Request
The request must be sent with the HTTP method `POST` and the HTTP header `Content-Type` set to `application/json`.

**Sample:**

End-point URI: `/bgis/service/2.0/evsmartrouting`.

HTTP header: `Content-Type: application/json`.

POST data:
```
{"bemap":{"language":"javascript"}}
{
  "geoserver": "here",
  "csps": [
    "gireve"
  ],
  "vehicle": {
    "initBatLvl": 70,
    "key": "06b5c02d-ba2e-4b14-8b2b-6d793aac0da0",
    "payload": 75
  },
  "start": {
    "lon": 2.3414,
    "lat": 48.85717
  },
  "stop": {
    "lon": 3.569,
    "lat": 47.79602
  },
  "condition": {
    "minBatLvl": 10,
    "minArrivalBatLvl": 15,
    "temperature": 20,
    "currency": "EUR",
    "encodedGeometry": true,
    "departureTime": 1704905400000,
    "chargePluggingTime": 300
  }
}
```

All coordinates are defined by longitude and latitude, see the [coordinate system](index.html#page-glossary-coordinate_system.md) glossary for more details.



#### __Parameters__

<a target="_blank" rel="noopener" href="scheme.html?className=com.benomad.bgis.fe.protocol.service.v2_0_0.model.evSmartRouting.request.EvSmartRoutingRequest">Show the class diagram</a>

```
{"bemap":{"language":"!include","url":"/bgis/service/documentation/1.0/buildclass.md?className=com.benomad.bgis.fe.protocol.service.v2_0_0.model.evSmartRouting.request.EvSmartRoutingRequest"}}
```


To get the complete list of available connector types, see the [Charging station connector service](index.html##subpage-rest_1_0_0-chargingstation-connector-service.md).

See the [Currency Codes](index.html#subpage-rest_1_0_0-currency-codes-service.md) service to get the available codes.


### Response

#### Details of fields

<a target="_blank" rel="noopener" href="scheme.html?className=com.benomad.bgis.fe.protocol.service.v2_0_0.model.evSmartRouting.response.EvSmartRoutingResponse">Show the class diagram</a>

```
{"bemap":{"language":"!include","url":"/bgis/service/documentation/1.0/buildclass.md?className=com.benomad.bgis.fe.protocol.service.v2_0_0.model.evSmartRouting.response.EvSmartRoutingResponse"}}
```
See chapter [Google Encoded Polyline Algorithm Format](index.html#page-glossary-google_encoded_polyline_algorithm_format.md) of full description of encoding format.


#### Response samples

JSON Sample:
```
{"bemap":{"language":"javascript"}}
{
  "journeys": [
    {
      "summary": {
        "vehicleInfo": {
          "brand": "Renault",
          "name": "Zoe 2",
          "year": "2019"
        },
        "distance": 169756,
        "duration": 7394,
        "batteryLevel": 15,
        "consumed": 34.13,
        "chargingTime": 467,
        "departureTime": 1704905690000,
        "arrivalTime": 1704913551000,
        "boundingBox": {
          "minLon": 2.3059,
          "minLat": 47.79602,
          "maxLon": 3.56947,
          "maxLat": 48.85848
        }
      },
      "events": [
        {
          "eventType": "START",
          "coord": {
            "lon": 2.3413990156969615,
            "lat": 48.85717
          },
          "address": "Pont Neuf, 75001 Paris, France",
          "departureTime": 1704905690000000
        },
        {
          "eventType": "ROUTE",
          "distance": 136762,
          "duration": 5501,
          "consumed": 27.512743964305944,
          "encodedGeometry": "ileiHwhhMGEKI[WYUu@g@ . . . TJLJDJAl@dG"
        },
        {
          "eventType": "CHARGE",
          "coord": {
            "lon": 3.243228,
            "lat": 47.93862
          },
          "arrivalTime": 1704911191000,
          "departureTime": 1704911958000,
          "arrivalBatteryLevel": 16.51411128574597,
          "departureBatteryLevel": 27.796459405101274,
          "chargingTime": 467,
          "chargingPower": {
            "currentType": "DC",
            "power": 50,
            "cnnTypeId": 38
          },
          "pool": {
            "providerName": "gireve",
            "providerMode": "LOCAL",
            "id": "402548",
            "sourceProvider": "Gireve",
            "updateDate": 1680318107013,
            "brand": "SDEY",
            "name": "SDEY/L4SV657FSZ",
            "countryCode": "FRA",
            "address": {
              "countryCode": "FR",
              "city": "Sépeaux-Saint Romain",
              "postalCode": "89116",
              "street": "D943"
            },
            "accessibility": "PUBLIC",
            "entrance": {
              "lon": 3.243228,
              "lat": 47.93862
            },
            "phoneNumber": "+33970830213",
            "availabilityStatus": "IN_SERVICE",
            "open24x7": false,
            "numberOfParkingSpace": 2,
            "comment": "Sepeaux, Echangeur A6 Sur Cd945",
            "stations": [
              {
                "id": "525614",
                "nature": "REAL",
                "availabilityStatus": "IN_SERVICE",
                "coordinate": {
                  "lon": 3.243228,
                  "lat": 47.93862
                },
                "authenticationModes": [
                  "RFID_BADGE",
                  "NA"
                ],
                "paymentModes": [
                  "OPERATOR_CONTRACT"
                ],
                "bookable": false,
                "chargingPoints": [
                  {
                    "id": "1168662",
                    "operatorId": "FR*S89*EVRFW*2",
                    "availabilityStatus": "IN_SERVICE",
                    "currentType": "DC",
                    "voltage": 400,
                    "ampere": 125,
                    "power": 50,
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
                    ]
                  }
                ]
              }
            ]
          }
        },
        {
          "eventType": "ROUTE",
          "distance": 32994,
          "duration": 1593,
          "consumed": 6.615769512437353,
          "encodedGeometry": "o_rcHqmxRb@YL|ASTER?PFRHJXDPQF . . . KLUPDP@"
        },
        {
          "eventType": "STOP",
          "coord": {
            "lon": 3.568998979043319,
            "lat": 47.79602
          },
          "address": "Place Charles Lepère, 89000 Auxerre, France",
          "departureTime": 7094
        }
      ]
    }
  ]
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
| OVER\_ALLOWED\_DISTANCE           | Too many charges required (maximum charges = 16)             |
| RouteNotFoundException            | The initial route cannot be found.                           |
| TooMuchViaException               | Too much via coordinates in request.                         |
| ViaNotMatchException              | One of via coordinate of request cannot be map matched.      |
| NotEnoughViaException             | The via coordinates cannot be map matched. A minimal of 2 coordinates must be map matched to perform a route. |
| VehicleFeatureIsRequiredException | The vehicle feature is required. The vehicle must be checked. |
| VehicleProfileIsRequiredException | The vehicle profile is required. The vehicle must be checked. |
| RequestsQuotasExceededException   | When a "hard" quotas limit is reached. See the quotas service API to check the quotas limits "soft" and "hard". |


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
