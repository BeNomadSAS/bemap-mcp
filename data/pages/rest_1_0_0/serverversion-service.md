# REST API, Service version 1.0.0


## Server Version service
Server software version information.

### Summary
1. Request
2. Response
 1. Details of fields
 2. Response samples


### Request
The request must be sent with the HTTP method `GET`.

Sample:
URI: `/bgis/service/version/server/1.0`

### Response

#### Details of fields

<a target="_blank" rel="noopener" href="scheme.html?className=com.benomad.bgis.fe.protocol.service.v1_0_0.model.ServerVersionResponse">Show the class diagram</a>

```
{"bemap":{"language":"!include","url":"/bgis/service/documentation/1.0/buildclass.md?className=com.benomad.bgis.fe.protocol.service.v1_0_0.model.ServerVersionResponse"}}
```


#### Response samples
JSON Sample:
```
{
    "packageIsodatetime": "2021-03-04T12:38:48.467",
    "packagePrefix": "dev",
    "bgisVersion": "3.10.0-SNAPSHOT",
    "bgisVersionMajor": 3,
    "bgisVersionMinor": 10,
    "bgisVersionRevision": 0,
    "bgisVersionStatus": "SNAPSHOT",
    "bgisVersionBuild": "0",
    "jsivVersion": "3.15.0",
    "jsivVersionMajor": 3,
    "jsivVersionMinor": 15,
    "jsivVersionRevision": 0,
    "jsivVersionBuild": "0",
    "geosdkVersionBuild": "0"
}
```