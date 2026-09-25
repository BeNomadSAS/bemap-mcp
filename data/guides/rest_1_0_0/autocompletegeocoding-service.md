# REST API, Service version 1.0.0


## Autocomplete Geocoding service
From a textual address perform a geographical research to suggest some textual postal address (free text).

_For more details: [Wikipedia](https://en.wikipedia.org/wiki/Geocoding)_

### Summary
1. Request
 1. Mandatory parameters
 2. Optional parameters
2. Response
 1. Details of fields
 2. Response samples
 3. Error response


### Request
The request must be sent with the HTTP method `POST` and the HTTP header `Content-Type` set to `application/json`. 

Sample:
URI: `/bgis/service/geocoding/autocomplete/1.0`

POST data:
```
{"bemap":{"language":"javascript"}}
{
  "geoserver": "nominatim",
  "coordinate": {
    "lat": 48.8566,
    "lon": 2.3522
  },
  "place": "Paris"
}
```

All coordinates are defined by longitude and latitude, see the [coordinate system](index.html#page-glossary-coordinate_system.md) glossary for more details.


#### __Parameters__

> NOTE: the `geoserver` parameter must be defined to `nominatim`, `addok`, `herehlp`. Otherwise the default `geoserver` value will be used.

<a target="_blank" rel="noopener" href="scheme.html?className=com.benomad.bgis.fe.protocol.service.v1_0_0.model.autocomplete.AutocompleteGeocodingRequest">Show the class diagram</a>

```
{"bemap":{"language":"!include","url":"/bgis/service/documentation/1.0/buildclass.md?className=com.benomad.bgis.fe.protocol.service.v1_0_0.model.autocomplete.AutocompleteGeocodingRequest"}}
```


### Response

#### Details of fields

<a target="_blank" rel="noopener" href="scheme.html?className=com.benomad.bgis.fe.protocol.service.v1_0_0.model.autocomplete.AutocompleteGeocodingResponse">Show the class diagram</a>

```
{"bemap":{"language":"!include","url":"/bgis/service/documentation/1.0/buildclass.md?className=com.benomad.bgis.fe.protocol.service.v1_0_0.model.autocomplete.AutocompleteGeocodingResponse"}}
```


#### Response samples

JSON Sample:
```
{"bemap":{"language":"javascript"}}
{
	"items": [{
			"place": "PARIS | ILE-DE-FRANCE | FRANCE",
			"score": 0.7,
			"coordinate": {
				"longitude": 2.38305,
				"latitude": 48.902475
			}
		}
	]
}
```


#### Error response
If an error occurs during the process on server side, only an error object will be returned in the response. See `Error example` chapter.
* `code`: error code. 
* `message`: error message. 
* `coordinate`: coordinate of error (optional). 
   * `lon`: longitude of coordinate in decimal degrees ([WGS84](index.html#page-glossary-coordinate_system.md)). 
   * `lat`: latitude of coordinate in decimal degrees ([WGS84](index.html#page-glossary-coordinate_system.md)). 


##### Error example
```
{"bemap":{"language":"javascript"}}
{ 
   "error": { 
      "code": "ERROR_CODE", 
      "message": "Comment of error.", 
      "coordinate": { 
         "lon": 8.193691832353528, 
         "lat": 45.42630127240513 
      } 
   } 
} 
```

All coordinates are defined by longitude and latitude, see the [coordinate system](index.html#page-glossary-coordinate_system.md) glossary for more details.
