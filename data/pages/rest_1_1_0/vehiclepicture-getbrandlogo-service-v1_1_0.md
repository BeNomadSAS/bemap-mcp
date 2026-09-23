# REST API, Service version 1.1.0



## Get all

Returns the logo picture of brand and details in JSON format.

HTTP method `GET`.
URI: `/bgis/service/vehicle/1.1/getbrandlogo`

Sample : `/bgis/service/vehicle/1.1/getbrandlogo?brandId=686f862d9992b5655f42c47a`

## Parameters

Mandatory parameters:
* `brandId`: Unique uuid of the brand.


## Response

The logo image inside the JSON. 

### Details of response item fields

```
{"bemap":{"language":"!include","url":"/bgis/service/documentation/1.0/buildclass.md?className=com.benomad.bgis.fe.protocol.service.v1_1_0.model.vehicle.EvBrandLogoDescription"}}
```

