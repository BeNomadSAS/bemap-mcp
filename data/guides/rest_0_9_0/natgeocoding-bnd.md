# REST API, BND version 0.9 (Deprecate see API v1.x)


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
Sample:
```
/bgis/bnd?version=1.0.0&action=natgeocoding&format=json&query=Villa%20des%20pyr%C3%A9n%C3%A9es%20paris%20france
```

All coordinates are defined by longitude and latitude, see the [coordinate system](index.html#page-glossary-coordinate_system.md) glossary for more details.

#### __Mandatory parameters__
See below for more details of parameters.

##### __action__: Name of service (action), here is `natgeocoding`.

##### __query__: textual postal address or POI name.

##### __version__: Version of BND protocol, here is `1.0.0`.

#### __Optional parameters__

##### __bbox__: Define a bounding box (in WGS84 format) to restrict the geocoding research.
The bounding box parameter is contains a couple of coordinates that represent the bottom left corn and the top right corn.
First couple of coordinates is composed by minimal values of longitude (X axis) and latitude (Y axis).
Second couple of coordinates is composed by maximal values of longitude (X axis) and latitude (Y axis).
* URL Format: `&bbox=minimal X,minimal Y,maximal X,maximal Y`.
* Example: `&bbox=1.13342,40.75561,6.51123,46.13342`.
* Possible exceptions are `MissingBBoxParameterException` and `NotValidBBoxParameterException`.

##### __callback__: Define the JSONP callback name.

##### __format__: Define the format of output.
* Default value is `XML`.
* Available values are `XML`, `JSON` and `JSONP`.   
* Possible exception is `FormatNotSupportedException`.

##### __geoserver__: Geo server name. Set the name of the server configuration that will be used to perform the request.

##### __language__: Define the language that will be used to perform the address lookup. Objects for which defined language code is not available, default language will be used. Values language Code - An US-ASCII string that defines an ISO 639-1 (2-letter) language code. The specials "IC" (no sensitive case) language code allows you to search for a country depending on its ISO-3166 Alpha-3 or Alpha-2 country code.
* Example for French : `&LANGUAGE=FR`.

##### __xslt__: Add xml-stylesheet element in the header of generated XML. e.i. `<?xml-stylesheet type="text/xsl" href="/bgis/html/clt-api/xslt/en/routing.xsl"?>`.


### Response

#### Details of fields

##### __BND__: Header of BND format response.
* action: performed action (the name of called service).
* version: version of protocol used.

##### __Extent__: Bounding box extent of all elements in [WGS84](index.html#page-glossary-coordinate_system.md) format.

##### __Elements__: List of element.
* count: the number of elements found.

##### __Element__: The response element of geocoding.

##### __BoundingBox__: The bounding box of matched element.
Coordinates are in in [WGS84](index.html#page-glossary-coordinate_system.md).
The bounding box contains a couple of coordinates that represent the bottom left corn and the top right corn:
* minX: minimal value of longitude (X axis).
* minY: minimal value of latitude (Y axis).
* maxX: maximal value of longitude (X axis).
* maxY: maximal value of latitude (Y axis).

##### __Coordinate__: Matched coordinate on a road.
* x: matched longitude [WGS84](index.html#page-glossary-coordinate_system.md).
* y: matched latitude [WGS84](index.html#page-glossary-coordinate_system.md).

##### __ExactCoordinate__: Exact coordinate is a non map-matched coordinate on road, like the coordinate of a POI in a pack.
* x: matched longitude [WGS84](index.html#page-glossary-coordinate_system.md).
* y: matched latitude [WGS84](index.html#page-glossary-coordinate_system.md).

##### __PostalAddress__: The postal address found.
* CountryCode: ISO code of country.
* Country: name of country.
* State: name of state, 1st administrative level's name, empty if no such administrative level.
* County: name of county, Returns 2nd administrative level's name, empty if no such administrative level.
* City: name of city.
* District: name of district.
* PostalCode: the postal code (Zip code).
* RoadNumber: the administrative street number.
* Street: name of street.
* StreetNumber: the house number.
* ExactStreetNumber: indicates if the location corresponds exactly to the required street number.
* ClassId:
 * code: administrative level of network.
 * id: the id of administrative level of network.

##### __Angle__: Angle of matched road segment. Value is a double in degrees.

##### __RelevanceScore__: Scoring of last (deepest) item found. Range value is a double between 0 to 1. the best matching is 1.

##### __RelevanceScoreDetails__: Details of scoring.
Range value is a double between 0 to 1. the best matching is 1.
Details of sub-fields:
* country: Matching error of the country.
* city: matching error of the city.
* postalCode: matching error of the postal code (zip code).
* street: matching error of the place.
* streetNumber: matching error of the house number (street number).

##### __Types__: List of type.
* type: administrative level of network.

#### Response samples

XML Sample:
```
{"bemap":{"language":"xml"}}
<?xml version="1.0" encoding="UTF-8"?>
<BND action="geocoding" version="1.0.0">
	<Extent minX="2.40498" minY="48.85325" maxX="2.40587" maxY="48.85351" />
	<Elements count="1">
		<Element>
			<BoundingBox minX="2.40498" minY="48.85325" maxX="2.40587" maxY="48.85351" />
			<Coordinate x="2.40552" y="48.85342" />
			<PostalAddress>
				<CountryCode>FRA</CountryCode>
				<Country>FRANCE</Country>
				<State>ÎLE-DE-FRANCE</State>
				<County>PARIS</County>
				<City>PARIS</City>
				<District/>
				<PostalCode>75020</PostalCode>
				<Street>VILLA DES PYRÉNÉES (PARIS 20E ARRONDISSEMENT)</Street>
				<StreetNumber>1</StreetNumber>
				<ExactStreetNumber>false</ExactStreetNumber>
				<ClassId code="ROAD_FOURTH" id="4048" />
			</PostalAddress>
			<Angle>64.0</Angle>
			<RelevanceScore>1.0</RelevanceScore>
			<RelevanceScoreDetails country="1.0" city="1.0" postalCode="1.0" street="1.0" streetNumber="1.0" />
		</Element>
	</Elements>
</BND>
```

JSON Sample:
```
{"bemap":{"language":"javascript"}}
{
	"BND": {
		"action": "geocoding",
		"version": "1.0.0",
		"Extent": {
			"minX": 2.40498,
			"minY": 48.85325,
			"maxX": 2.40587,
			"maxY": 48.85351
		},
		"Elements": {
			"count": 1,
			"Element": [{
					"ID": "",
					"BoundingBox": {
						"minX": 2.40498,
						"minY": 48.85325,
						"maxX": 2.40587,
						"maxY": 48.85351
					},
					"Coordinate": {
						"x": 2.40552,
						"y": 48.85342
					},
					"PostalAddress": {
						"CountryCode": "FRA",
						"Country": "FRANCE",
						"State": "ÎLE-DE-FRANCE",
						"County": "PARIS",
						"City": "PARIS",
						"District": "",
						"PostalCode": "75020",
						"Street": "VILLA DES PYRÉNÉES (PARIS 20E ARRONDISSEMENT)",
						"StreetNumber": "1",
						"ExactStreetNumber": false,
						"ClassId": {
							"code": "ROAD_FOURTH",
							"id": "4048"
						}
					},
					"Angle": 64.0,
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
}
```