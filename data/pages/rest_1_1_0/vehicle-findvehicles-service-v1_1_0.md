# REST API, Service version 1.1.0


## Vehicle service

To retrieve vehicles or vehicle information.




### Find vehicles

Returns the list of available vehicles.
HTTP method `GET` or `POST`. 
URI: `/bgis/service/vehicle/1.1/findvehicles`

Parameters:

<a target="_blank" rel="noopener" href="scheme.html?className=com.benomad.bgis.fe.protocol.service.v1_1_0.model.vehicle.VehicleRequest">Show the class diagram</a>

```
{"bemap":{"language":"!include","url":"/bgis/service/documentation/1.0/buildclass.md?className=com.benomad.bgis.fe.protocol.service.v1_1_0.model.vehicle.VehicleRequest"}}
```


### Response

#### Details of fields

<a target="_blank" rel="noopener" href="scheme.html?className=com.benomad.bgis.fe.protocol.service.v1_1_0.model.vehicle.VehicleInfo">Show the class diagram</a>

```
{"bemap":{"language":"!include","url":"/bgis/service/documentation/1.0/buildclass.md?className=com.benomad.bgis.fe.protocol.service.v1_1_0.model.vehicle.VehicleInfo"}}
```

<div data-right="ROLE_VEHICLE_DATASHEET">
<h5><strong>VehicleDatasheet</strong></h5>
```
{"bemap":{"language":"!include","url":"/bgis/service/documentation/1.0/buildclass.md?className=com.benomad.bgis.fe.protocol.service.v1_1_0.model.vehicle.VehicleDatasheet"}}
```
</div>

<script>
bemap.miniweb.aclCheck(bemap.miniweb.getAclDetails());
</script>

#### Response samples

JSON Sample:
```
{"bemap":{"language":"javascript"}}
{
    "vehicles": [
        {
            "key": "8724c12d-1ec8-426f-af2a-84ac1a030001",
            "brandId": "609a4642c9cb5b0b1846c129",
            "brandName": "Fiat",
            "name": "500e",
            "year": "2020",
            "variant": "Action, Action plus",
            "motorType": "EV",
            "batteryName": "24",
            "connectorTypes": [
                32,
                38,
                48
            ],
            "chargerPowerAcSinglePhase": 7.0,
            "chargerPowerAcThreePhases": 11.0,
            "chargerPowerDC": 50.0
        },
        {
            "key": "b8527b78-6240-4a32-8d23-66ccbdd10def",
            "brandId": "609a4642c9cb5b0b1846c129",
            "brandName": "Fiat",
            "name": "500e",
            "year": "2020",
            "variant": "Icône, Icône plus, La prima",
            "motorType": "EV",
            "batteryName": "42",
            "connectorTypes": [
                32,
                38,
                48
            ],
            "chargerPowerAcSinglePhase": 7.0,
            "chargerPowerAcThreePhases": 11.0,
            "chargerPowerDC": 85.0
        },
        {
            "key": "444720e1-4591-42e2-bec2-b6f5d3351909",
            "brandId": "609a4642c9cb5b0b1846c129",
            "brandName": "Fiat",
            "name": "500e US",
            "year": "2013",
            "motorType": "EV",
            "batteryName": "24",
            "connectorTypes": [
                31
            ],
            "chargerPowerAcSinglePhase": 6.6
        },
        {
            "key": "4d7be666-6f01-4fe8-bb92-e478beb0e5f3",
            "brandId": "609a4642c9cb5b0b1846c129",
            "brandName": "Fiat",
            "name": "e-Ducato",
            "motorType": "EV",
            "batteryName": "47",
            "connectorTypes": [
                32,
                38,
                48
            ],
            "chargerPowerAcSinglePhase": 7.0,
            "chargerPowerDC": 50.0
        }
    ]
}
```
