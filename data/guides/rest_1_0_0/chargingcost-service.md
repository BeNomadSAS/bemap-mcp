# REST API, Service version 1.0.0


## Charging Cost service
Compute an estimated charging cost and time, based on vehicle, connector power, charge need, and tariffs.
The tariffs can be retrieved from the Tariffs service or Charging Station service.
The time-zone can be retrieved from the Charging Station service.

See the [tutorial of the full services process](index.html#subpage-rest_1_0_0-tutorials-chargingcost_from_charging_station_tariffs-v1_0_0.md) to build a request from the Charging Station and Tariffs services.

### Summary
1. Request
 1. Parameters
2. Response
 1. Details of fields
 2. Response samples


### Request
The request must be sent with the HTTP method `POST` and the HTTP header `Content-Type` set to `application/json`.

Sample:
URI: `/bgis/service/chargingcost/1.0`

POST data:
```
{"bemap":{"language":"javascript"}}
{
  "geoserver": "here",
  "vehicle": "d729502b-12ba-4adb-89bd-cff6a2d00919",
  "temperature": 20,
  "cur": "EUR",
  "charges": [
    {
      "curBatLvl": 23,
      "toBatLvl": 80,
      "duration": 3600,
      "currentType": "DC",
      "power": 50,
      "cnnTypeId": 39,
      "currency": "EUR",
      "tariffs": [
        {
          "prices": [
            {
              "type": "PARKING_TIME",
              "unit": "PER_HOUR",
              "price": 1,
              "vat": 20,
              "minAmount": 1
            },
            {
              "type": "ENERGY",
              "unit": "PER_KWH",
              "price": 0.5,
              "vat": 20,
              "minAmount": 1
            }
          ]
        }
      ]
    }
  ]
}
```

#### Parameters

<a target="_blank" rel="noopener" href="scheme.html?className=com.benomad.bgis.fe.protocol.service.v1_0_0.model.chargingCost.ChargingCostRequest">Show the class diagram</a>

```
{"bemap":{"language":"!include","url":"/bgis/service/documentation/1.0/buildclass.md?className=com.benomad.bgis.fe.protocol.service.v1_0_0.model.chargingCost.ChargingCostRequest"}}
```
See the [Currency Codes](index.html#subpage-rest_1_0_0-currency-codes-service.md) service to get the available codes.

### Response
List of calculated charging cost and time for an electrical vehicle. The list is in order of inputs.

#### Details of fields

<a target="_blank" rel="noopener" href="scheme.html?className=com.benomad.bgis.fe.protocol.service.v1_0_0.model.chargingCost.ChargingCostResponse">Show the class diagram</a>

```
{"bemap":{"language":"!include","url":"/bgis/service/documentation/1.0/buildclass.md?className=com.benomad.bgis.fe.protocol.service.v1_0_0.model.chargingCost.ChargingCostResponse"}}
```
See the [Currency Codes](index.html#subpage-rest_1_0_0-currency-codes-service.md) service to get the available codes.

#### Response samples
JSON Sample:
```
{"bemap":{"language":"javascript"}}
{
  "estimations": [
    {
      "chargingTime": 2462,
      "energyUsed": 34.2,
      "batChargeLvl": 80,
      "chargingCost": {
        "currency": "EUR",
        "withoutVat": 17.1,
        "includeVat": 20.52
      }
    }
  ]
}
```
