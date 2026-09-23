# REST API, Service version 1.0.0


## Feature service


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
URI: `/bgis/service/landFeature/1.0`

POST data:
```
{"bemap":{"language":"javascript"}}
{
    "geoserver": "default",
    "options": [
        "OTHER_SEARCH",
        "POLYGON"
    ],
    "language": "fr",
    "radius": 200,
    "coordinates": [
        {
            "lon": 2.3538198,
            "lat": 48.754084
        }
    ]
}
```

All coordinates are defined by longitude and latitude, see the [coordinate system](index.html#page-glossary-coordinate_system.md) glossary for more details.

#### __Parameters__

<a target="_blank" rel="noopener" href="scheme.html?className=com.benomad.bgis.fe.protocol.service.v1_0_0.model.landFeature.LandFeatureRequest">Show the class diagram</a>

```
{"bemap":{"language":"!include","url":"/bgis/service/documentation/1.0/buildclass.md?className=com.benomad.bgis.fe.protocol.service.v1_0_0.model.landFeature.LandFeatureRequest"}}
```


### Response

#### Details of fields

```
{"bemap":{"language":"!include","url":"/bgis/service/documentation/1.0/buildclass.md?className=com.benomad.bgis.fe.protocol.service.v1_0_0.model.landFeature.LandFeatureResponse"}}
```


#### Response samples
JSON Sample:
```
{"bemap":{"language":"javascript"}}
{
    "coordinateWgs84": {
        "lon": 2.3538198,
        "lat": 48.754084
    },
    "elements": [
        {
            "boundingBoxWgs84": {
                "minLon": 2.35343,
                "minLat": 48.7539,
                "maxLon": 2.35343,
                "maxLat": 48.7539
            },
            "coordinateWgs84": {
                "lon": 2.35343,
                "lat": 48.7539
            },
            "distanceFromRequestCenter": -1.0,
            "classId": 0,
            "attributes": [
                {
                    "attributeCode": "NAME",
                    "key": "20306",
                    "numericKey": 20306,
                    "rawData": true
                }
            ],
            "geometricShapes": [
                {
                    "coordinate": {
                        "longitude": 2.35343,
                        "latitude": 48.7539
                    }
                }
            ]
        },
        {
            "boundingBoxWgs84": {
                "minLon": 2.35569,
                "minLat": 48.75372,
                "maxLon": 2.35569,
                "maxLat": 48.75372
            },
            "coordinateWgs84": {
                "lon": 2.35569,
                "lat": 48.75372
            },
            "distanceFromRequestCenter": -1.0,
            "classId": 0,
            "attributes": [
                {
                    "attributeCode": "NAME",
                    "key": "20306",
                    "numericKey": 20306,
                    "rawData": true
                }
            ],
            "geometricShapes": [
                {
                    "coordinate": {
                        "longitude": 2.35569,
                        "latitude": 48.75372
                    }
                }
            ]
        }
    ],
    "maximumResult": 2
}
```
