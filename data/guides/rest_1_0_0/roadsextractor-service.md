# REST API, Service version 1.0.0


## Roads extractor service
Performs a Road-Matching (or Map-Matching) process for a specified type of vehicle within a specified polygon.
This method builds a list of `ExtractedRoadFront` on each road element within the specified polygon.
For road elements which are open in both directions according to the specified type of vehicle, two `ExtractedRoadFront` will be created, one for each direction.
The angle set on each `ExtractedRoadFront` defines the direction this point has to be reached should you use these points to perform a route calculation or trip optimization.

> NOTE: The maximum number of `ExtractedRoadFront` that can be created is limited to 1500.


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
URI: `/bgis/service/roadsextractor/1.0`

POST data:
```
{"bemap":{"language":"javascript"}}
{
    "geoserver": "default",
    "outputLanguage": "en",
    "coordinates": [
        {
            "lon": 7.41,
            "lat": 43.73
        },
        {
            "lon": 7.42,
            "lat": 43.73
        },
        {
            "lon": 7.42,
            "lat": 43.74
        },
        {
            "lon": 7.41,
            "lat": 43.74
        },
        {
            "lon": 7.41,
            "lat": 43.73
        }
    ],
    "transportType": "CAR",
    "adminPath": true
}
```

All coordinates are defined by longitude and latitude, see the [coordinate system](index.html#page-glossary-coordinate_system.md) glossary for more details.

#### __Parameters__

<a target="_blank" rel="noopener" href="scheme.html?className=com.benomad.bgis.fe.protocol.service.v1_0_0.model.roadsExtractor.RoadsExtractorRequest">Show the class diagram</a>

```
{"bemap":{"language":"!include","url":"/bgis/service/documentation/1.0/buildclass.md?className=com.benomad.bgis.fe.protocol.service.v1_0_0.model.roadsExtractor.RoadsExtractorRequest"}}
```


### Response

#### Details of fields

<a target="_blank" rel="noopener" href="scheme.html?className=com.benomad.bgis.fe.protocol.service.v1_0_0.model.roadsExtractor.RoadsExtractorResponse">Show the class diagram</a>

```
{"bemap":{"language":"!include","url":"/bgis/service/documentation/1.0/buildclass.md?className=com.benomad.bgis.fe.protocol.service.v1_0_0.model.roadsExtractor.RoadsExtractorResponse"}}
```


#### Response samples
JSON Sample:
```
{"bemap":{"language":"javascript"}}
{
  "roads": [
    {
      "coordinate": {
        "lon": 7.411,
        "lat": 43.731
      },
      "postalAddress": {
        "street": "Avenue de la Costa",
        "city": "Monaco",
        "postalCode": "98000"
      }
    }
  ]
}
```
