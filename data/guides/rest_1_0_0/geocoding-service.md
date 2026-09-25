# REST API, Service version 1.0.0


## Geocoding service
Geocoding is the process of converting textual postal address to a geographical longitude and latitude coordinates.

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
URI: `/bgis/service/geocoding/1.0`

POST data:
```
{"bemap":{"language":"javascript"}}
{
	"address": {
		"country":"France",
		"city": "Paris",
		"street": "villa des pyrénées"
	},
	"searchType": "FUZZY",
	"maximumResult": 2,
	"language": "fr"
}
```

All coordinates are defined by longitude and latitude, see the [coordinate system](index.html#page-glossary-coordinate_system.md) glossary for more details.

#### __Parameters__
The parameters `country`/`countryCode` or `bbox` can used alternately, but the presence of one of them in the request is mandatory.
To define a restriction area by a bounding box, use the `bbox` parameter.

<a target="_blank" rel="noopener" href="scheme.html?className=com.benomad.bgis.fe.protocol.service.v1_0_0.model.geocodingService.GeocodingRequest">Show the class diagram</a>

```
{"bemap":{"language":"!include","url":"/bgis/service/documentation/1.0/buildclass.md?className=com.benomad.bgis.fe.protocol.service.v1_0_0.model.geocodingService.GeocodingRequest"}}
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
  "extent": {
    "minLon": 2.40518,
    "minLat": 48.8533,
    "maxLon": 2.40587,
    "maxLat": 48.85351
  },
  "elements": [
    {
      "boundingBox": {
        "minLon": 2.40518,
        "minLat": 48.8533,
        "maxLon": 2.40587,
        "maxLat": 48.85351
      },
      "coordinate": {
        "lon": 2.40552,
        "lat": 48.85342
      },
      "distanceFromRequest": 0,
      "postalAddress": {
        "countryCode": "FRA",
        "country": "France",
        "state": "Île-de-France",
        "county": "Paris",
        "city": "Paris",
        "district": "Paris 20e Arrondissement",
        "postalCode": "75020",
        "street": "Villa des Pyrénées"
      },
      "postalAddressClassType": "ROAD_FOURTH",
      "postalAddressClassId": 4048,
      "postalAddressExactStreeNumber": false,
      "angle": 62,
      "administrativeSpeedLimit": 0,
      "relevanceScore": 1,
      "countryRelevanceScore": 1,
      "cityRelevanceScore": 0.75,
      "postalCodeRelevanceScore": 1,
      "streetRelevanceScore": 1,
      "streetNumberRelevanceScore": 0,
      "segmentId": 0
    }
  ],
  "maximunResult": 1
}
```