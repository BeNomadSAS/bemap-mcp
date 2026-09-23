# REST API, Service version 1.0.0


## Reverse-Geocoding service for batch work
This service can process a several coordinates in same request.
Reverse geocoding is the process of back (reverse) coding of a point location (latitude, longitude) to a readable address or place name. This permits the identification of nearby street addresses, places, and/or areal subdivisions such as neighbourhoods, county, state, or country. Combined with geocoding and routing services, reverse geocoding is a critical component of mobile location-based services and Enhanced 911 to convert a coordinate obtained by GPS to a readable street address which is easier to understand by the end user.

_For more details: [Wikipedia](https://en.wikipedia.org/wiki/Reverse_geocoding)_

### Summary
1. Request
 1. Parameters
2. Response
 1. Response samples


### Request
The request must be sent with the HTTP method `POST` and the HTTP header `Content-Type` set to `application/json`. 

Sample:
URI: `/bgis/service/geocodingBatch/1.0/reverse`

POST data:
```
{"bemap":{"language":"javascript"}}
{
	"radius" : 50,
	"language" : "fr",
	"coordinatesSat" : [
		{
			"lon" : 2.29555,
			"lat" : 48.87384
		},
		{
			"lon" : 2.29258,
			"lat" : 48.87474
		}
	],
	"maximumResults" : 2
}
```

All coordinates are defined by longitude and latitude, see the [coordinate system](index.html#page-glossary-coordinate_system.md) glossary for more details.

#### __Parameters__

<a target="_blank" rel="noopener" href="scheme.html?className=com.benomad.bgis.fe.protocol.service.v1_0_0.model.geocodingForBatch.RevGeocodingBatchRequest">Show the class diagram</a>

```
{"bemap":{"language":"!include","url":"/bgis/service/documentation/1.0/buildclass.md?className=com.benomad.bgis.fe.protocol.service.v1_0_0.model.geocodingForBatch.RevGeocodingBatchRequest"}}
```


### Response

#### Details of fields

<a target="_blank" rel="noopener" href="scheme.html?className=com.benomad.bgis.fe.protocol.service.v1_0_0.model.geocodingForBatch.RevGeocodingBatchResponse">Show the class diagram</a>

```
{"bemap":{"language":"!include","url":"/bgis/service/documentation/1.0/buildclass.md?className=com.benomad.bgis.fe.protocol.service.v1_0_0.model.geocodingForBatch.RevGeocodingBatchResponse"}}
```


#### Response samples
JSON Sample:
```
{"bemap":{"language":"javascript"}}
{
    "revGeoBatchMatcheds": [
        {
            "extent": {
                "minLon": 2.29565,
                "minLat": 48.8738,
                "maxLon": 2.29593,
                "maxLat": 48.8739
            },
            "elements": [
                {
                    "coordinate": {
                        "lon": 2.29565,
                        "lat": 48.8739
                    },
                    "distanceFromRequest": 9.91,
                    "postalCode": {
                        "countryCode": "FRA",
                        "country": "France",
                        "state": "Île-de-France",
                        "county": "Paris",
                        "city": "Paris",
                        "district": "Paris 17e Arrondissement",
                        "postalCode": "75017",
                        "roadNumber": "",
                        "street": "Souterrain Étoile"
                    },
                    "postalAddressClassType": "ROAD_FOURTH",
                    "postalAddressClassId": 4048,
                    "postalAddressExactStreeNumber": false,
                    "angle": -40.0,
                    "administrativeSpeedLimit": 50.0,
                    "relevanceScore": 0.11856886623241761,
                    "countryRelevanceScore": 0.0,
                    "cityRelevanceScore": 0.0,
                    "postalCodeRelevanceScore": 0.0,
                    "streetRelevanceScore": 0.0,
                    "streetNumberRelevanceScore": 0.0,
                    "geoElementTypes": [
                        "ROAD",
                        "FOURTH_ROAD",
                        "DISTRICT",
                        "CITY",
                        "COUNTY",
                        "STATE",
                        "COUNTRY"
                    ],
                    "segmentId": 0
                },
                {
                    "coordinate": {
                        "lon": 2.29593,
                        "lat": 48.8738
                    },
                    "distanceFromRequest": 28.18,
                    "postalCode": {
                        "countryCode": "FRA",
                        "country": "France",
                        "state": "Île-de-France",
                        "county": "Paris",
                        "city": "Paris",
                        "district": "Paris 8e Arrondissement",
                        "postalCode": "75008",
                        "roadNumber": "",
                        "street": "Place Charles de Gaulle"
                    },
                    "postalAddressClassType": "ROAD_TERTIARY_ROUNDABOUT",
                    "postalAddressClassId": 4272,
                    "postalAddressExactStreeNumber": false,
                    "angle": 10.0,
                    "administrativeSpeedLimit": 50.0,
                    "relevanceScore": 0.09100349287265173,
                    "countryRelevanceScore": 0.0,
                    "cityRelevanceScore": 0.0,
                    "postalCodeRelevanceScore": 0.0,
                    "streetRelevanceScore": 0.0,
                    "streetNumberRelevanceScore": 0.0,
                    "geoElementTypes": [
                        "ROUNDABOUT",
                        "TERTIARY_ROAD",
                        "DISTRICT",
                        "CITY",
                        "COUNTY",
                        "STATE",
                        "COUNTRY"
                    ],
                    "segmentId": 0
                }
            ]
        },
        {
            "extent": {
                "minLon": 2.29258,
                "minLat": 48.87474,
                "maxLon": 2.29263,
                "maxLat": 48.87482
            },
            "elements": [
                {
                    "coordinate": {
                        "lon": 2.29258,
                        "lat": 48.87474
                    },
                    "distanceFromRequest": 0.0,
                    "postalCode": {
                        "countryCode": "FRA",
                        "country": "France",
                        "state": "Île-de-France",
                        "county": "Paris",
                        "city": "Paris",
                        "district": "Paris 17e Arrondissement",
                        "postalCode": "75017",
                        "roadNumber": "",
                        "street": ""
                    },
                    "postalAddressClassType": "ROAD_FOURTH",
                    "postalAddressClassId": 4048,
                    "postalAddressExactStreeNumber": false,
                    "angle": -65.0,
                    "administrativeSpeedLimit": 50.0,
                    "relevanceScore": 0.13526771735726956,
                    "countryRelevanceScore": 0.0,
                    "cityRelevanceScore": 0.0,
                    "postalCodeRelevanceScore": 0.0,
                    "streetRelevanceScore": 0.0,
                    "streetNumberRelevanceScore": 0.0,
                    "geoElementTypes": [
                        "ROAD",
                        "FOURTH_ROAD",
                        "DISTRICT",
                        "CITY",
                        "COUNTY",
                        "STATE",
                        "COUNTRY"
                    ],
                    "segmentId": 0
                },
                {
                    "coordinate": {
                        "lon": 2.29263,
                        "lat": 48.87482
                    },
                    "distanceFromRequest": 9.63,
                    "postalCode": {
                        "countryCode": "FRA",
                        "country": "France",
                        "state": "Île-de-France",
                        "county": "Paris",
                        "city": "Paris",
                        "district": "Paris 17e Arrondissement",
                        "postalCode": "75017",
                        "roadNumber": "",
                        "street": "Avenue de la Grande Armée",
                        "streetNumber": "10",
                        "oppositeStreetNumber": "10"
                    },
                    "postalAddressClassType": "ROAD_FOURTH",
                    "postalAddressClassId": 4048,
                    "postalAddressExactStreeNumber": false,
                    "angle": -65.0,
                    "administrativeSpeedLimit": 30.0,
                    "relevanceScore": 0.13145809414466128,
                    "countryRelevanceScore": 0.0,
                    "cityRelevanceScore": 0.0,
                    "postalCodeRelevanceScore": 0.0,
                    "streetRelevanceScore": 0.0,
                    "streetNumberRelevanceScore": 0.0,
                    "geoElementTypes": [
                        "ROAD",
                        "FOURTH_ROAD",
                        "DISTRICT",
                        "CITY",
                        "COUNTY",
                        "STATE",
                        "COUNTRY"
                    ],
                    "segmentId": 0
                }
            ]
        }
    ]
}
```
