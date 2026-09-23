# REST API, Service version 1.0.0


## Reverse-Geocoding service
Reverse geocoding is the process of back (reverse) coding of a point location (latitude, longitude) to a readable address or place name. This permits the identification of nearby street addresses, places, and/or areal subdivisions such as neighbourhoods, county, state, or country. Combined with geocoding and routing services, reverse geocoding is a critical component of mobile location-based services and Enhanced 911 to convert a coordinate obtained by GPS to a readable street address which is easier to understand by the end user.

_For more details: [Wikipedia](https://en.wikipedia.org/wiki/Reverse_geocoding)_

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
URI: `/bgis/service/geocoding/1.0/reverse`

POST data:
```
{"bemap":{"language":"javascript"}}
{
	"transportMode": "CAR",
	"coordinateSat": {
		"lon": 7.13891,
		"lat": 43.647749
	},
	"radius":50,
	"language": "fr",
	"maximumResults":5
}
```

All coordinates are defined by longitude and latitude, see the [coordinate system](index.html#page-glossary-coordinate_system.md) glossary for more details.

#### __Parameters__

<a target="_blank" rel="noopener" href="scheme.html?className=com.benomad.bgis.fe.protocol.service.v1_0_0.model.geocodingService.ReverseGeocodingRequest">Show the class diagram</a>

```
{"bemap":{"language":"!include","url":"/bgis/service/documentation/1.0/buildclass.md?className=com.benomad.bgis.fe.protocol.service.v1_0_0.model.geocodingService.ReverseGeocodingRequest"}}
```


### Response

#### Details of fields

<a target="_blank" rel="noopener" href="scheme.html?className=com.benomad.bgis.fe.protocol.service.v1_0_0.model.geocodingService.ReverseGeocodingResponse">Show the class diagram</a>

```
{"bemap":{"language":"!include","url":"/bgis/service/documentation/1.0/buildclass.md?className=com.benomad.bgis.fe.protocol.service.v1_0_0.model.geocodingService.ReverseGeocodingResponse"}}
```


#### Response samples
JSON Sample:
```
{"bemap":{"language":"javascript"}}
{
    "extent": {
        "minLon": 7.13891,
        "minLat": 43.64767,
        "maxLon": 7.13903,
        "maxLat": 43.64784
    },
    "elements": [
        {
            "coordinate": {
                "lon": 7.13891,
                "lat": 43.64775
            },
            "distanceFromRequest": 0.11,
            "postalCode": {
                "countryCode": "FRA",
                "country": "France",
                "state": "Provence-Alpes-Côte d'Azur",
                "county": "Alpes-Maritimes",
                "city": "Cagnes-sur-Mer",
                "postalCode": "06800",
                "roadNumber": "A8/E80",
                "street": "La Provençale"
            },
            "postalAddressClassType": "ROAD_MAIN_MOTORWAY",
            "postalAddressClassId": 4832,
            "postalAddressExactStreeNumber": false,
            "angle": -138.0,
            "administrativeSpeedLimit": 110.0,
            "relevanceScore": 0.07508038119514526,
            "countryRelevanceScore": 0.0,
            "cityRelevanceScore": 0.0,
            "postalCodeRelevanceScore": 0.0,
            "streetRelevanceScore": 0.0,
            "streetNumberRelevanceScore": 0.0,
            "geoElementTypes": [
                "MOTORWAY",
                "MAIN_ROAD",
                "CITY",
                "COUNTY",
                "STATE",
                "COUNTRY"
            ],
            "segmentId": 0
        },
        {
            "coordinate": {
                "lon": 7.13899,
                "lat": 43.64784
            },
            "distanceFromRequest": 12.01,
            "postalCode": {
                "countryCode": "FRA",
                "country": "France",
                "state": "Provence-Alpes-Côte d'Azur",
                "county": "Alpes-Maritimes",
                "city": "Cagnes-sur-Mer",
                "postalCode": "06800",
                "roadNumber": "",
                "street": ""
            },
            "postalAddressClassType": "ROAD_FOURTH",
            "postalAddressClassId": 4048,
            "postalAddressExactStreeNumber": false,
            "angle": 123.0,
            "administrativeSpeedLimit": 50.0,
            "relevanceScore": 0.07151753903194971,
            "countryRelevanceScore": 0.0,
            "cityRelevanceScore": 0.0,
            "postalCodeRelevanceScore": 0.0,
            "streetRelevanceScore": 0.0,
            "streetNumberRelevanceScore": 0.0,
            "geoElementTypes": [
                "ROAD",
                "FOURTH_ROAD",
                "CITY",
                "COUNTY",
                "STATE",
                "COUNTRY"
            ],
            "segmentId": 0
        },
        {
            "coordinate": {
                "lon": 7.13902,
                "lat": 43.64783
            },
            "distanceFromRequest": 12.64,
            "postalCode": {
                "countryCode": "FRA",
                "country": "France",
                "state": "Provence-Alpes-Côte d'Azur",
                "county": "Alpes-Maritimes",
                "city": "Cagnes-sur-Mer",
                "postalCode": "06800",
                "roadNumber": "A8/E80",
                "street": "La Provençale"
            },
            "postalAddressClassType": "ROAD_MAIN_MOTORWAY",
            "postalAddressClassId": 4832,
            "postalAddressExactStreeNumber": false,
            "angle": -138.0,
            "administrativeSpeedLimit": 110.0,
            "relevanceScore": 0.07131477565680851,
            "countryRelevanceScore": 0.0,
            "cityRelevanceScore": 0.0,
            "postalCodeRelevanceScore": 0.0,
            "streetRelevanceScore": 0.0,
            "streetNumberRelevanceScore": 0.0,
            "geoElementTypes": [
                "MOTORWAY",
                "MAIN_ROAD",
                "CITY",
                "COUNTY",
                "STATE",
                "COUNTRY"
            ],
            "segmentId": 0
        },
        {
            "coordinate": {
                "lon": 7.13902,
                "lat": 43.64783
            },
            "distanceFromRequest": 12.64,
            "postalCode": {
                "countryCode": "FRA",
                "country": "France",
                "state": "Provence-Alpes-Côte d'Azur",
                "county": "Alpes-Maritimes",
                "city": "Cagnes-sur-Mer",
                "postalCode": "06800",
                "roadNumber": "",
                "street": ""
            },
            "postalAddressClassType": "ROAD_FOURTH",
            "postalAddressClassId": 4048,
            "postalAddressExactStreeNumber": false,
            "angle": 121.0,
            "administrativeSpeedLimit": 50.0,
            "relevanceScore": 0.07131477565680851,
            "countryRelevanceScore": 0.0,
            "cityRelevanceScore": 0.0,
            "postalCodeRelevanceScore": 0.0,
            "streetRelevanceScore": 0.0,
            "streetNumberRelevanceScore": 0.0,
            "geoElementTypes": [
                "ROAD",
                "FOURTH_ROAD",
                "CITY",
                "COUNTY",
                "STATE",
                "COUNTRY"
            ],
            "segmentId": 0
        },
        {
            "coordinate": {
                "lon": 7.13903,
                "lat": 43.64767
            },
            "distanceFromRequest": 13.07,
            "postalCode": {
                "countryCode": "FRA",
                "country": "France",
                "state": "Provence-Alpes-Côte d'Azur",
                "county": "Alpes-Maritimes",
                "city": "Cagnes-sur-Mer",
                "postalCode": "06800",
                "roadNumber": "A8/E80",
                "street": "La Provençale"
            },
            "postalAddressClassType": "ROAD_MAIN_MOTORWAY",
            "postalAddressClassId": 4832,
            "postalAddressExactStreeNumber": false,
            "angle": 42.0,
            "administrativeSpeedLimit": 110.0,
            "relevanceScore": 0.07125684326391102,
            "countryRelevanceScore": 0.0,
            "cityRelevanceScore": 0.0,
            "postalCodeRelevanceScore": 0.0,
            "streetRelevanceScore": 0.0,
            "streetNumberRelevanceScore": 0.0,
            "geoElementTypes": [
                "MOTORWAY",
                "MAIN_ROAD",
                "CITY",
                "COUNTY",
                "STATE",
                "COUNTRY"
            ],
            "segmentId": 0
        }
    ],
    "maximumResult": 5
}
```
