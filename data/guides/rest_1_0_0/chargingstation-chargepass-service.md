# REST API, Service version 1.0.0


## Charge pass service
The service returns a list of charge pass information.

The charge pass can be used in the [Charging Stations](index.html#subpage-rest_1_0_0-examples-charging-station-service-v1_0_0.md), see the [API Charging Stations](index.html#subpage-rest_1_0_0-chargingstation-search-service.md)
and the [EV Smart Routing](index.html#subpage-rest_2_0_0-examples-evsmartrouting-service-v2_0_0.md), see [API EV Smart Routing](index.html#subpage-rest_2_0_0-evsmartrouting-service-v2_0_0.md).



### Request
The request must be sent with the HTTP method `GET`.

Sample:
URI: `/bgis/service/chargingstation/chargepass/1.0/list`

Exemple: `/bgis/service/chargingstation/chargepass/1.0/list?providerName=ecoMovement`

#### __Parameters__

- `providerName`: Define the provider name of charge pass will used the return the charge pass list.
- `geoServer`: Optional, define the Geo-server to use. A Geo-server is a reference to the server configuration. It can be selected in left menu of documentation page. Also is provided by the account configuration. 


### Response

#### Details of fields

<a target="_blank" rel="noopener" href="scheme.html?className=com.benomad.bgis.fe.protocol.service.v1_0_0.model.chargingStation.ChargingStationChargePassResponse">Show the class diagram</a>

```
{"bemap":{"language":"!include","url":"/bgis/service/documentation/1.0/buildclass.md?className=com.benomad.bgis.fe.protocol.service.v1_0_0.model.chargingStation.ChargingStationChargePassResponse"}}
```

#### Response samples

JSON Sample:
```
{
  "chargePasses": [
    {
      "hashId": "32cb6f255139b61f36708abf8c3cc4c9",
      "networkName": "RCN",
      "title": "Ad hoc",
      "currency": "EUR",
      "subscriptionType": "n/a",
      "subscriptionFeeExclVat": 0
    },
    {
      "hashId": "7637702e95b24bef906350a0f0cf513f",
      "networkName": "Autel",
      "title": "OCPI Tariff Adhoc price",
      "currency": "EUR",
      "subscriptionType": "n/a",
      "subscriptionFeeExclVat": 0
    },

. . .
    
    {
      "hashId": "b774604ea286ff2dd535bdddeb744b4d",
      "networkName": "Ulys",
      "title": "Abonne",
      "currency": "EUR",
      "subscriptionType": "n/a",
      "subscriptionFeeExclVat": 0
    }
  ]
}
```