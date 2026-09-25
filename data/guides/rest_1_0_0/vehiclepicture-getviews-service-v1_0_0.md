# REST API, Service version 1.0.0



## Get views

Returns a list of available views of a given vehicle.

HTTP method `GET`.
URI: `/bgis/service/vehicle/picture/1.0/getviews`

Sample: `/bgis/service/vehicle/picture/1.0/getviews?vehicleUuidKey=719db9db-db6c-4410-8a48-8fdffd4905d8`


## Parameters

Mandatory parameters:
* `vehicleUuidKey`: Unique uuid of the vehicle.


## Response

### Possible values

```
{"bemap":{"language":"!include","url":"/bgis/service/documentation/1.0/buildclass.md?className=com.benomad.bgis.fe.protocol.service.v1_0_0.model.vehicle.PictureViewInfo"}}
```
