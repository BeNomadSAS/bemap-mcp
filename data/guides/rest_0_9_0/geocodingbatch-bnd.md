# REST API, BND version 0.9 (Deprecate see API v1.x)


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
Sample:
```
/bgis/bnd?geoserver=default&version=1.0.0&action=geocodingBatch&language=xx&maxresult=2&format=json&searchType=FUZZY&query=france,,,,paris,,villa%20des&query=france,,,,bordeaux,,rue%20de%20labrede,%202
```

All coordinates are defined by longitude and latitude, see the [coordinate system](index.html#page-glossary-coordinate_system.md) glossary for more details.

#### __Mandatory parameters__

See below for more details of parameters.

##### __action__: Name of service (action), here is `geocodingBatch`.

##### __query__: Postal address splitted by comma. 
This parameters can be repeated.
Below the details of sub-parameters:
* `country`: Country name will be researched.
* `state`: State name will be researched.
* `county`: County name will be researched.
* `postalCode`: Postal code (ZIP code) will be researched.
* `city`: City name will be researched
* `district`: District name will be researched.
* `street`: Street name, place or POI will be researched.
* `streetNumber`: The house number will be researched.
* `minimalX`: Minimal longitude of bounding box (in WGS84 format) to restrict the geocoding research.
* `minimalY`: Minimal latitude of bounding box (in WGS84 format) to restrict the geocoding research.
* `maximalX`: Maximal longitude of bounding box (in WGS84 format) to restrict the geocoding research.
* `maximalY`: Maximal latitude of bounding box (in WGS84 format) to restrict the geocoding research.
* URL Format: `&query=country,state,county,postalCode,city,district,street,streetNumber,minimalX,minimalY,maximalX,maximalY`.
* Example: `&query=france,,,,paris,,villa%20de,2,1.13342,40.75561,6.51123,46.13342`.

##### __version__: Version of BND protocol, here is `1.0.0`.

#### __Optional parameters__

##### __callback__: Define the JSONP callback name.

##### __format__: Define the format of output.
* Default value is `XML`.
* Available values are `XML`, `JSON` and `JSONP`.   
* Possible exception is `FormatNotSupportedException`.

##### __geoserver__: Geo server name. Set the name of the server configuration that will be used to perform the request.

##### __language__: Define the language that will be used to perform the address lookup. Objects for which defined language code is not available, default language will be used. Values language Code - An US-ASCII string that defines an ISO 639-1 (2-letter) language code. The specials "IC" (no sensitive case) language code allows you to search for a country depending on its ISO-3166 Alpha-3 or Alpha-2 country code.
* Example for French : `&LANGUAGE=FR`.

##### __maxResult__: The maximum number of items used to perform the research and returned items by the server.
* Default value: `1`.

##### __searchType__: Defines all the possible types of research that can be applied to a textual pattern.
* Available values:
 * `CONTAINS`: Means that the pattern must be contained in the required strings.
 * `FUZZY`: Means that the pattern will be used to perform a fuzzy search based on the pattern. (Fuzzy searching can be useful when you are searching text that may contain misspelled words).
 * `KEY_SEARCH`: Specifies a search on key ids. This criteria can be used for retrieving an item by its numerical key.
 * `STRICT`: Means that the required string must be strictly equal to the pattern.
 * `STRICT_BEGINNING`: Means that the required strings must begin with the pattern.
 * `WORD_BEGINNING`: Means that one word of required strings must begin with the pattern (characters ' ', '-' and '/' are considered as word separators).
* Possible exception is `NotValidSearchTypeParameterException`.

##### __xslt__: Add xml-stylesheet element in the header of generated XML. e.i. `<?xml-stylesheet type="text/xsl" href="/bgis/html/clt-api/xslt/en/routing.xsl"?>`.


### Response
It's the same response like the [geocoding](index.html#subpage-rest_0_9_0-geocoding-bnd.md) service.
But the fields `Extent` and `Elements` can be repeated in `XML` response format and encapsulated in `AreaAnswer` array for`JSON` format.
[See the geocoding response here](index.html#subpage-rest_0_9_0-geocoding-bnd.md).


#### Response samples

XML Sample:
```
{"bemap":{"language":"xml"}}
<?xml version="1.0" encoding="UTF-8"?>
<BND action="geocodingBatch" version="1.0.0">
	<AreaAnswer>
		<Extent minX="2.3155" minY="48.82669" maxX="2.34642" maxY="48.82798" />
		<Elements count="2">
			<Element>
				<BoundingBox minX="2.3155" minY="48.82723" maxX="2.31674" maxY="48.82798" />
				<Coordinate x="2.3156" y="48.82792" />
				<PostalAddress>
					<CountryCode>FRA</CountryCode>
					<Country>FRANCE</Country>
					<State>ÎLE-DE-FRANCE</State>
					<County>PARIS</County>
					<City>PARIS</City>
					<District/>
					<PostalCode>75014</PostalCode>
					<Street>VILLA DESHAYES (PARIS 14E ARRONDISSEMENT)</Street>
					<StreetNumber>1</StreetNumber>
					<ExactStreetNumber>false</ExactStreetNumber>
					<ClassId code="ROAD_FOURTH" id="4048" />
				</PostalAddress>
				<Angle>-47.0</Angle>
				<RelevanceScore>0.86</RelevanceScore>
				<RelevanceScoreDetails country="1.0" city="1.0" postalCode="1.0" street="0.86" streetNumber="1.0" />
			</Element>
			<Element>
				<BoundingBox minX="2.34594" minY="48.82669" maxX="2.34642" maxY="48.82772" />
				<Coordinate x="2.34634" y="48.82756" />
				<PostalAddress>
					<CountryCode>FRA</CountryCode>
					<Country>FRANCE</Country>
					<State>ÎLE-DE-FRANCE</State>
					<County>PARIS</County>
					<City>PARIS</City>
					<District/>
					<PostalCode>75013</PostalCode>
					<Street>VILLA DAVIEL (PARIS 13E ARRONDISSEMENT)</Street>
					<StreetNumber>1</StreetNumber>
					<ExactStreetNumber>false</ExactStreetNumber>
					<ClassId code="ROAD_FOURTH" id="4048" />
				</PostalAddress>
				<Angle>17.0</Angle>
				<RelevanceScore>0.81</RelevanceScore>
				<RelevanceScoreDetails country="1.0" city="1.0" postalCode="1.0" street="0.81" streetNumber="1.0" />
			</Element>
		</Elements>
	</AreaAnswer>
	<AreaAnswer>
		<Extent minX="-0.57" minY="44.82761" maxX="-0.56767" maxY="44.82912" />
		<Elements count="1">
			<Element>
				<BoundingBox minX="-0.57" minY="44.82761" maxX="-0.56767" maxY="44.82912" />
				<Coordinate x="-0.56993" y="44.82905" />
				<ExactCoordinate x="-0.56991" y="44.82906" />
				<PostalAddress>
					<CountryCode>FRA</CountryCode>
					<Country>FRANCE</Country>
					<State>NOUVELLE-AQUITAINE</State>
					<County>GIRONDE</County>
					<City>BORDEAUX</City>
					<District/>
					<PostalCode>33800</PostalCode>
					<Street>RUE DE LABRÈDE</Street>
					<StreetNumber>2</StreetNumber>
					<ExactStreetNumber>true</ExactStreetNumber>
					<ClassId code="ROAD_FOURTH" id="4048" />
				</PostalAddress>
				<Angle>-33.0</Angle>
				<RelevanceScore>1.0</RelevanceScore>
				<RelevanceScoreDetails country="1.0" city="1.0" postalCode="1.0" street="1.0" streetNumber="1.0" />
			</Element>
		</Elements>
	</AreaAnswer>
</BND>
```

JSON Sample:
```
{"bemap":{"language":"javascript"}}
{
	"BND": {
		"action": "geocodingBatch",
		"version": "1.0.0",
		"AreaAnswer": [{
				"Extent": {
					"minX": 2.3155,
					"minY": 48.82669,
					"maxX": 2.34642,
					"maxY": 48.82798
				},
				"Elements": {
					"count": 2,
					"Element": [{
							"ID": "",
							"BoundingBox": {
								"minX": 2.3155,
								"minY": 48.82723,
								"maxX": 2.31674,
								"maxY": 48.82798
							},
							"Coordinate": {
								"x": 2.3156,
								"y": 48.82792
							},
							"PostalAddress": {
								"CountryCode": "FRA",
								"Country": "FRANCE",
								"State": "ÎLE-DE-FRANCE",
								"County": "PARIS",
								"City": "PARIS",
								"District": "",
								"PostalCode": "75014",
								"Street": "VILLA DESHAYES (PARIS 14E ARRONDISSEMENT)",
								"StreetNumber": "1",
								"ExactStreetNumber": false,
								"ClassId": {
									"code": "ROAD_FOURTH",
									"id": "4048"
								}
							},
							"Angle": -47.0,
							"RelevanceScore": 0.86,
							"RelevanceScoreDetails": {
								"country": 1.0,
								"city": 1.0,
								"postalCode": 1.0,
								"street": 0.86,
								"streetNumber": 1.0
							}
						}, {
							"ID": "",
							"BoundingBox": {
								"minX": 2.34594,
								"minY": 48.82669,
								"maxX": 2.34642,
								"maxY": 48.82772
							},
							"Coordinate": {
								"x": 2.34634,
								"y": 48.82756
							},
							"PostalAddress": {
								"CountryCode": "FRA",
								"Country": "FRANCE",
								"State": "ÎLE-DE-FRANCE",
								"County": "PARIS",
								"City": "PARIS",
								"District": "",
								"PostalCode": "75013",
								"Street": "VILLA DAVIEL (PARIS 13E ARRONDISSEMENT)",
								"StreetNumber": "1",
								"ExactStreetNumber": false,
								"ClassId": {
									"code": "ROAD_FOURTH",
									"id": "4048"
								}
							},
							"Angle": 17.0,
							"RelevanceScore": 0.81,
							"RelevanceScoreDetails": {
								"country": 1.0,
								"city": 1.0,
								"postalCode": 1.0,
								"street": 0.81,
								"streetNumber": 1.0
							}
						}
					]
				}
			}, {
				"Extent": {
					"minX": -0.57,
					"minY": 44.82761,
					"maxX": -0.56767,
					"maxY": 44.82912
				},
				"Elements": {
					"count": 1,
					"Element": [{
							"ID": "",
							"BoundingBox": {
								"minX": -0.57,
								"minY": 44.82761,
								"maxX": -0.56767,
								"maxY": 44.82912
							},
							"Coordinate": {
								"x": -0.56993,
								"y": 44.82905
							},
							"ExactCoordinate": {
								"x": -0.56991,
								"y": 44.82906
							},
							"PostalAddress": {
								"CountryCode": "FRA",
								"Country": "FRANCE",
								"State": "NOUVELLE-AQUITAINE",
								"County": "GIRONDE",
								"City": "BORDEAUX",
								"District": "",
								"PostalCode": "33800",
								"Street": "RUE DE LABRÈDE",
								"StreetNumber": "2",
								"ExactStreetNumber": true,
								"ClassId": {
									"code": "ROAD_FOURTH",
									"id": "4048"
								}
							},
							"Angle": -33.0,
							"RelevanceScore": 1.0,
							"RelevanceScoreDetails": {
								"country": 1.0,
								"city": 1.0,
								"postalCode": 1.0,
								"street": 1.0,
								"streetNumber": 1.0
							}
						}
					]
				}
			}
		]
	}
}
```
