# REST API, Service version 1.0.0



## Get motor types

Returns the list of available motor types.

HTTP method `GET`.
URI: `/bgis/service/vehicle/1.0/getmotortypes`



## Response

Returns the list of motor types. Available values:

```
{"bemap":{"language":"!include","url":"/bgis/service/documentation/1.0/buildclass.md?className=com.benomad.bgis.be.db.scheme.vehicle.MotorType"}}
```



#### Response samples

JSON Sample:
```
{"bemap":{"language":"javascript"}}
["EV","HEV","PHEV"]
```
