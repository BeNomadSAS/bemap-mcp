# REST API, Service version 1.0.0


## Geocoding for batch job service
Geocoding is the process of converting textual postal address to a geographical longitude and latitude coordinates.

_For more details: [Wikipedia](https://en.wikipedia.org/wiki/Geocoding)_

### Summary
1. Request
 1. Mandatory parameters
 2. Optional parameters
2. Response
 1. Response samples


### Request
The request must be sent with the HTTP method `POST` and the HTTP header `Content-Type` set to `application/json`. 

Sample:
URI: `/bgis/service/geocodingBatch/1.0`

POST data:
```
{"bemap":{"language":"javascript"}}
{
    "queries": [
        {
            "postalAddress": {
                "countryCode": "FR",
                "city": "aix en provence",
                "street": "95 rue docteur albert aynaud",
                "postalCode": "13100"
            }
        }
    ],
    "searchType": "FUZZY",
    "language": "fr",
    "maximumResult": 1
}
```

All coordinates are defined by longitude and latitude, see the [coordinate system](index.html#page-glossary-coordinate_system.md) glossary for more details.


#### __Parameters__

<a target="_blank" rel="noopener" href="scheme.html?className=com.benomad.bgis.fe.protocol.service.v1_0_0.model.geocodingForBatch.GeocodingForBatchRequest">Show the class diagram</a>

```
{"bemap":{"language":"!include","url":"/bgis/service/documentation/1.0/buildclass.md?className=com.benomad.bgis.fe.protocol.service.v1_0_0.model.geocodingForBatch.GeocodingForBatchRequest"}}
```


### Response
It's the same response like the [geocoding](index.html#subpage-rest_0_9_0-geocoding-bnd.md) service.
But the fields `Extent` and `Elements` can be repeated in `XML` response format and encapsulated in `AreaAnswer` array for`JSON` format.
[See the geocoding response here](index.html#subpage-rest_0_9_0-geocoding-bnd.md).

#### Details of fields

<a target="_blank" rel="noopener" href="scheme.html?className=com.benomad.bgis.fe.protocol.service.v1_0_0.model.geocodingForBatch.GeocodingForBatchResponse">Show the class diagram</a>

```
{"bemap":{"language":"!include","url":"/bgis/service/documentation/1.0/buildclass.md?className=com.benomad.bgis.fe.protocol.service.v1_0_0.model.geocodingForBatch.GeocodingForBatchResponse"}}
```


#### Response samples
JSON Sample:
```
{"bemap":{"language":"javascript"}}
{
    "answers": [
        {
            "extent": {
                "minLon": 5.35107,
                "minLat": 43.48732,
                "maxLon": 5.35316,
                "maxLat": 43.492
            },
            "elements": [
                {
                    "boundingBox": {
                        "minLon": 5.35107,
                        "minLat": 43.48732,
                        "maxLon": 5.35316,
                        "maxLat": 43.492
                    },
                    "coordinate": {
                        "lon": 5.35123,
                        "lat": 43.4914
                    },
                    "exactCoordinate": {
                        "lon": 5.35124,
                        "lat": 43.4914
                    },
                    "distanceFromRequest": 0.0,
                    "postalAddress": {
                        "countryCode": "FRA",
                        "country": "France",
                        "state": "Provence-Alpes-Côte d'Azur",
                        "county": "Bouches-du-Rhône",
                        "city": "Aix-en-Provence",
                        "district": "Aix la Duranne",
                        "postalCode": "13290",
                        "street": "Rue du Docteur Albert Aynaud",
                        "streetNumber": "95"
                    },
                    "postalAddressClassType": "ROAD_FOURTH",
                    "postalAddressClassId": 4048,
                    "postalAddressExactStreeNumber": true,
                    "angle": -15.0,
                    "administrativeSpeedLimit": 0.0,
                    "relevanceScore": 0.92,
                    "countryRelevanceScore": 1.0,
                    "cityRelevanceScore": 1.0,
                    "postalCodeRelevanceScore": 0.67,
                    "streetRelevanceScore": 0.92,
                    "streetNumberRelevanceScore": 1.0,
                    "segmentId": 0
                }
            ]
        }
    ]
}
```
