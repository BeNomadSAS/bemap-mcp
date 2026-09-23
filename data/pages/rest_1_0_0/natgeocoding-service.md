# REST API, Service version 1.0.0


## Natural Geocoding service
Natural Geocoding is the process of converting textual postal address (1 line / free text) to a geographical longitude and latitude coordinates.

_For more details: [Wikipedia](https://en.wikipedia.org/wiki/Geocoding)_

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
URI: `/bgis/service/geocoding/1.0/natural`

POST data:
```
{"bemap":{"language":"javascript"}}
{
	"geoserver": "herehlp",
	"naturalQuery": "Villa des pyrénées paris france"
}
```

All coordinates are defined by longitude and latitude, see the [coordinate system](index.html#page-glossary-coordinate_system.md) glossary for more details.


#### __Parameters__

<a target="_blank" rel="noopener" href="scheme.html?className=com.benomad.bgis.fe.protocol.service.v1_0_0.model.geocodingService.GeocodingNaturalRequest">Show the class diagram</a>

```
{"bemap":{"language":"!include","url":"/bgis/service/documentation/1.0/buildclass.md?className=com.benomad.bgis.fe.protocol.service.v1_0_0.model.geocodingService.GeocodingNaturalRequest"}}
```


### Response

#### Details of fields

<a target="_blank" rel="noopener" href="scheme.html?className=com.benomad.bgis.fe.protocol.service.v1_0_0.model.geocodingService.GeocodingResponse">Show the class diagram</a>

```
{"bemap":{"language":"!include","url":"/bgis/service/documentation/1.0/buildclass.md?className=com.benomad.bgis.fe.protocol.service.v1_0_0.model.geocodingService.GeocodingResponse"}}
```


#### Response samples
JSON Sample:
```
{"bemap":{"language":"javascript"}}
{
    "elements": [
        {
            "boundingBox": {
                "minLon": 2.40498,
                "minLat": 48.85325,
                "maxLon": 2.40587,
                "maxLat": 48.85351
            },
            "coordinate": {
                "lon": 2.40542,
                "lat": 48.85339
            },
            "distanceFromRequest": 0.0,
            "postalCode": {
                "countryCode": "FRA",
                "country": "France",
                "state": "Île-de-France",
                "county": "Paris",
                "city": "Paris",
                "district": "20e Arrondissement",
                "postalCode": "75020",
                "street": "Villa des Pyrénées"
            },
            "postalAddressClassId": 0,
            "postalAddressExactStreeNumber": false,
            "angle": 0.0,
            "administrativeSpeedLimit": 0.0,
            "relevanceScore": 1.0,
            "countryRelevanceScore": 0.0,
            "cityRelevanceScore": 0.0,
            "postalCodeRelevanceScore": 0.0,
            "streetRelevanceScore": 0.0,
            "streetNumberRelevanceScore": 0.0,
            "segmentId": 0
        }
    ],
    "maximumResult": 0
}
```