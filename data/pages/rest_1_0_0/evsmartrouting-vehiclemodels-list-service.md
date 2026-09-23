# REST API, Service version 1.0.0


## EV Models list service
List of electrical vehicle model.

__DEPRECATED API__: please use the [Find vehicle API of Vehicle Service](index.html#subpage-rest_1_1_0-vehicle-findvehicles-service-v1_1_0.md).

### Summary
1. Request
 1. Parameters
2. Response
 1. Details of fields
 2. Response samples


### Request
The request must be sent with the HTTP method `GET`.
If you want to use the HTTP method `POST` add the HTTP header `Content-Type` set to `application/json`.

Sample:
URI: `/bgis/service/evsmartrouting/vehiclemodels/list/1.0`


#### __Parameters__

<a target="_blank" rel="noopener" href="scheme.html?className=com.benomad.bgis.fe.protocol.service.v1_0_0.model.vehicle.VehicleRequest">Show the class diagram</a>

```
{"bemap":{"language":"!include","url":"/bgis/service/documentation/1.0/buildclass.md?className=com.benomad.bgis.fe.protocol.service.v1_0_0.model.vehicle.VehicleRequest"}}
```


### Response

#### Details of fields

<a target="_blank" rel="noopener" href="scheme.html?className=com.benomad.bgis.fe.protocol.service.v1_0_0.model.vehicle.VehicleModelsResponse">Show the class diagram</a>

```
{"bemap":{"language":"!include","url":"/bgis/service/documentation/1.0/buildclass.md?className=com.benomad.bgis.fe.protocol.service.v1_0_0.model.vehicle.VehicleModelsResponse"}}
```


#### Response samples
JSON Sample:
```
{"bemap":{"language":"javascript"}}

{
    "vehicles":[
        {
            "key":"8724c12d-1ec8-426f-af2a-84ac1a030001",
            "title":"500e 24.0kWh DC:50.0kW AC3:11.0kW",
            "connectorTypes":[
                32,
                38,
                48
            ]
        },
        {
            "key":"b8527b78-6240-4a32-8d23-66ccbdd10def",
            "title":"500e 42.0kWh DC:85.0kW AC3:11.0kW",
            "connectorTypes":[
                32,
                38,
                48
            ]
        },
        {
            "key":"444720e1-4591-42e2-bec2-b6f5d3351909",
            "title":"500e US 24.0kWh AC1:6.6kW",
            "connectorTypes":[
                31
            ]
        },
        {
            "key":"d65b5971-9fc4-4903-b187-96b1530335d4",
            "title":"Ami 5.5kWh AC1:2.3kW",
            "connectorTypes":[
                48
            ]
        }
	]
}
```
