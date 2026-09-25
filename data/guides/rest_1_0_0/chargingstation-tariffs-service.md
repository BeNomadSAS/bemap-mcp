# REST API, Service version 1.0.0


## Charging Station Tariffs service
Returns the list of tariffs of charging stations.

### Summary
1. Request
 1. Mandatory parameters
2. Response
 1. Details of fields
 2. Response samples



### Request
The request must be sent with the HTTP method `POST` and the HTTP header `Content-Type` set to `application/json`.

Sample:
URI: `/bgis/service/chargingstation/tariffs/1.0/search`

POST data:
```
{"bemap":{"language":"javascript"}}
{
    "providerName": "ecoMovement",
    "chargePassHashIds": [
        "b6c2f14ed716704ba648926f26071da0", "b2c34a5e76b162327e29fd79ec1589ed"
    ],
    "links": [
        {
            "poolId": "3c4b35cc-368f-11f0-94a6-42010aa40043",
            "chargingPointId": "FR*IOY*E448904",
            "connectorId": "1"
        }
    ]
}
```


#### __Parameters__

<a target="_blank" rel="noopener" href="scheme.html?className=com.benomad.bgis.fe.protocol.service.v1_0_0.model.chargingStation.ChargingStationTariffsRequest">Show the class diagram</a>

```
{"bemap":{"language":"!include","url":"/bgis/service/documentation/1.0/buildclass.md?className=com.benomad.bgis.fe.protocol.service.v1_0_0.model.chargingStation.ChargingStationTariffsRequest"}}
```



### Response

#### Details of fields

<a target="_blank" rel="noopener" href="scheme.html?className=com.benomad.bgis.fe.protocol.service.v1_0_0.model.chargingStation.ChargingStationTariffsResponse">Show the class diagram</a>

```
{"bemap":{"language":"!include","url":"/bgis/service/documentation/1.0/buildclass.md?className=com.benomad.bgis.fe.protocol.service.v1_0_0.model.chargingStation.ChargingStationTariffsResponse"}}
```

#### Response samples

JSON Sample:
```
{"bemap":{"language":"javascript"}}
{
    "items": [
        {
            "poolId": "3c4b35cc-368f-11f0-94a6-42010aa40043",
            "chargingPointId": "FR*IOY*E448904",
            "connectorId": "1",
            "tariffContent": {
                "id": "696513356c695139442c3013",
                "providerName": "ecoMovement",
                "updateDate": 1768231464512,
                "providerUpdated": "2025-12-24T07:01:11Z",
                "providerTariffId": "e861f26fed5e26b956f34e6cc2439d11e7e9c4c5939465326224baf132b4b418",
                "type": "MSP",
                "chargePass": {
                    "hashId": "b6c2f14ed716704ba648926f26071da0",
                    "networkName": "EnBW",
                    "title": "EnBW mobility+ Ladetarif M",
                    "description": "monthly subscription",
                    "currency": "EUR",
                    "subscriptionType": "monthly",
                    "subscriptionFeeExclVat": 5.0336
                },
                "currency": "EUR",
                "tariffItems": [
                    {
                        "restriction": {
                            "minDuration": 14400,
                            "maxDuration": 21600
                        },
                        "prices": [
                            {
                                "type": "ENERGY",
                                "unit": "PER_KWH",
                                "price": 0.4917,
                                "vat": 20.0,
                                "minAmount": 1.0
                            },
                            {
                                "type": "PARKING_TIME",
                                "unit": "PER_HOUR",
                                "price": 5.0,
                                "vat": 20.0,
                                "minAmount": 60.0
                            }
                        ]
                    },
                    {
                        "prices": [
                            {
                                "type": "ENERGY",
                                "unit": "PER_KWH",
                                "price": 0.4917,
                                "vat": 20.0,
                                "minAmount": 1.0
                            }
                        ]
                    }
                ]
            }
        }
    ]
}
```
