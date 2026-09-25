# REST API, Service version 1.0.0


## Charging Time service
Computes an estimated charging time, based on energy vehicle feature (`vehicle` or `evf` parameters), connector power and charge need.

### Summary
1. Request
 1. Mandatory parameters
 2. Optional parameters
2. Response
 1. Details of fields
 2. Response samples


### Request
The request must be sent with the HTTP method `POST` and the HTTP header `Content-Type` set to `application/json`. 

Sample:
URI: `/bgis/service/chargingTime/1.0`

POST data:
```
{"bemap":{"language":"javascript"}}
{
    "geoserver": "here",
    "vehicle": "3e34a8cc-5d3c-40ef-a296-9d43ff257329",
    "chargingPointPower": 75,
    "chargingCurrentType": "DC",
    "chargingBatteryLevel": 90
}
```


#### __Parameters__

<a target="_blank" rel="noopener" href="scheme.html?className=com.benomad.bgis.fe.protocol.service.v1_0_0.model.chargingTime.ChargingTimeRequest">Show the class diagram</a>

```
{"bemap":{"language":"!include","url":"/bgis/service/documentation/1.0/buildclass.md?className=com.benomad.bgis.fe.protocol.service.v1_0_0.model.chargingTime.ChargingTimeRequest"}}
```


### Response
The calculated charging time for an electrical vehicle.

#### Details of fields

<a target="_blank" rel="noopener" href="scheme.html?className=com.benomad.bgis.fe.protocol.service.v1_0_0.model.chargingTime.ChargingTimeResponse">Show the class diagram</a>

```
{"bemap":{"language":"!include","url":"/bgis/service/documentation/1.0/buildclass.md?className=com.benomad.bgis.fe.protocol.service.v1_0_0.model.chargingTime.ChargingTimeResponse"}}
```


#### Response samples
JSON Sample:
```
{
    "optimumBatteryChargeLevel": 75.0,
    "chargingTime": 1840
}
```
