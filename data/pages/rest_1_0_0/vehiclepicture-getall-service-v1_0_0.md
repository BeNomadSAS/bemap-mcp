# REST API, Service version 1.0.0



## Get all

Returns a list of available pictures of the vehicle.

HTTP method `GET`.
URI: `/bgis/service/vehicle/picture/1.0/getall`

Sample: `/bgis/service/vehicle/picture/1.0/getall?vehicleUuidKey=719db9db-db6c-4410-8a48-8fdffd4905d8`


## Parameters

Mandatory parameters:
* `vehicleUuidKey`: Unique uuid of the vehicle.


## Response

### Details of response item fields

```
{"bemap":{"language":"!include","url":"/bgis/service/documentation/1.0/buildclass.md?className=com.benomad.bgis.fe.protocol.service.v1_0_0.model.vehicle.VehiclePictureDescription"}}
```

