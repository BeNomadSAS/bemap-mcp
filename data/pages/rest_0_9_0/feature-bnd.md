# REST API, BND version 0.9 (Deprecate see API v1.x)


## Feature service


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
/bgis/bnd?geoserver=default&version=1.0.0&action=feature&xy=2.29489,48.85803&radius=50&language=fr&format=json
```

All coordinates are defined by longitude and latitude, see the [coordinate system](index.html#page-glossary-coordinate_system.md) glossary for more details.

#### __Mandatory parameters__

##### __action__: Name of service (action), here is `feature`.

##### __version__: Version of BND protocol, here is `1.0.0`.

##### __xy__: coordinate of request. This parameter can be repeated.
This parameter is comma-separated list, see below the details of parameter format in order of fields value:
1. longitude: Longitude in degrees [WGS84](index.html#page-glossary-coordinate_system.md).
2. latitude: Latitude in degrees [WGS84](index.html#page-glossary-coordinate_system.md).
3. altitude: Altitude in meter (optional).
4. heading: heading angle in degrees (optional). For BeNomad engine: If the angle is not available, set this field and speed field to 0.
5. speed: speed in km/h (optional). For BeNomad engine: Use this field only if the heading is available. 
6. time: time stamp of GPS coordinate in millisecond (optional).
7. satellite: number of satellite (optional).

Format:
* URL format: `&xy=longitude,latitude,altitude,heading,speed,time,satellite`.
* URL Example: `&xy=2.36136,48.81349`.
* Possible exceptions are `MissingCoordinateParameterException` and `NotValidCoordinateParameterException`.

#### __Optional parameters__

##### __attributes__: Comma-separated list of one or more BeNomad's attribute number to be queried.
* Possible exception is `NotValidAttributesParameterException`.

##### __attCompares__: Filtering by value of attributes.
* Details of parameter format:
 * Attribute code: Code of attribute.
 * Comparison Operators: equal is represented by `==` (e.i: `20306==TOUR EIFFEL`) and not equal is represented by `!=` (e.i: `20306!=TOUR EIFFEL`).
 * Value: Filter value.
* URL Format: `&attCompares=attribute code, comparison operators, value`.
* Examples:
 * Single expression: `&attCompares=20306==TOUR EIFFEL`.
 * Multiple expression OR: `&attCompares=20306==TOUR EIFFEL&attCompares=20306==JARDIN DU CHAMP DE MARS&attCompares=20306==EIFFEL`.
* Possible exception is `NotValidAttributesParameterException`.

##### __callback__: Define the JSONP callback name.

##### __format__: Define the format of output.
* Default value is `XML`.
* Available values are `XML`, `JSON` and `JSONP`.   
* Possible exception is `FormatNotSupportedException`.

##### __geoserver__: Geo server name. Set the name of the server configuration that will be used to perform the request.

##### __language__: Define the language that will be used to perform the address lookup. Objects for which defined language code is not available, default language will be used. Values language Code - An US-ASCII string that defines an ISO 639-1 (2-letter) language code. The specials "IC" (no sensitive case) language code allows you to search for a country depending on its ISO-3166 Alpha-3 or Alpha-2 country code.
* Example for French : `&LANGUAGE=FR`.

##### __layers__: Comma-separated list of one or more layers name (or [BeNomad class id](index.html#page-sdk-jsiv-classids.md)) to be queried.
See the page [Class ID list](index.html#page-sdk-jsiv-classids.md) to know the available values. 

##### __maxResult__: The maximum number of items used to perform the research and returned items by the server. `0` to disable.
* Default value: `0`.

##### __options__: Comma-separated list of one or more options.
* Available values:
 * `REVGEOCODING_SEARCH`: Enable the road match search by reverse geocoding to return a postal address.
 * `POLYGON_SEARCH`: Enable the research on polygon layer type.
 * `OTHER_SEARCH`: Enable the research on any layers type (POI, park, etc.). See the layers parameter.
 * `VISIBLE_FILTER`: Return only the objects visible on the map.
 * `POLYGON`: Return the list of coordinates of geometry.
 * `DISTANCE_FROMCENTER`: Calculate the distance in meters between the request center and each element.
 * `FILTERBY_RADIUS`: Exclude all out side element of request radius.
 * `SORTBY_NEARTOFAR_FROMCENTER`: Can return a sorted list by distance between the request center and element, add the distance from the request center value in response. Value is in meters.
 * `TRAFFIC`: Return the traffic information.
 * `TRAFFIC_PREDICTIVE`: Return the predictive traffic information. the time stamp defined in each coordinates are used.
 * `TRAFFIC_HISTORICAL`: (Beta) Return the historical traffic information. the time stamp defined in each coordinates are used.
 * `RAWDATA`: Returns the native value of map data base (like SVS attributes).
 * `SVS_ALL_CLASS`: Export all layers (class).
 * `SVS_ALL_ATTRIBUTE`: Export all attributes for each element found (form).
* Possible exception is `NotValidOptionsParameterException`.

##### __radius__: Maximum search radius around GPS point (xy parameter). The value is in meter.
* Possible exceptions are `MissingRadiusParameterException` and `NotValidRadiusParameterException`.

##### __styles__: Comma-separated list of one or more style name to be queried.

##### __svsGeoscale__: Define the geo-scale of generated SVS.
Mandatory if the options `SVS_ALL_CLASS` or `SVS_ALL_ATTRIBUTE` are set. Integer value between 40000 or 100000.
* Possible exceptions are `MissingSvsGeoscaleParameterException` and `NotValidSvsGeoscaleParameterException`.

##### __viewBbox__: Define a bounding box (in WGS84 format) to restrict the research.
The bounding box parameter is contains a couple of coordinates that represent the bottom left corn and the top right corn.
First couple of coordinates is composed by minimal values of longitude (X axis) and latitude (Y axis).
Second couple of coordinates is composed by maximal values of longitude (X axis) and latitude (Y axis).
* URL Format: `&viewBbox=minimal X,minimal Y,maximal X,maximal Y`.
* Example: `&viewBbox=1.13342,40.75561,6.51123,46.13342`.
* Possible exceptions are `MissingBBoxParameterException` and `NotValidBBoxParameterException`.

##### __viewWidth__: The viewWidth parameters specify the size in integer pixels of the map on which the request is made. Use in addition to parameter viewBbox.
* Default value is `-1`.
* Possible exceptions are `MissingDimensionValueException` and `InvalidDimensionValueException`.

##### __viewHeight__: The viewHeight parameters specify the size in integer pixels of the map on which the request is made. Use in addition to parameter viewBbox.
* Default value is `-1`.
* Possible exceptions are `MissingDimensionValueException` and `InvalidDimensionValueException`.

##### __xslt__: Add xml-stylesheet element in the header of generated XML. e.i. `<?xml-stylesheet type="text/xsl" href="/bgis/html/clt-api/xslt/en/routing.xsl"?>`.

##### __xyShape__: Define the geometry interpretation of xy parameter(s). By default `CIRCLE`.
* Available values:
 * `CIRCLE`: the first xy parameter is parsed as an circle geometry, require the radius parameter.
 * `POLYGON`: the xy parameters are parsed as an polygon geometry.


### Response

#### Details of fields


##### __BND__: Header of BND format response.
* action: performed action (the name of called service).
* version: version of protocol used.

##### __GeocodingElements__: List of reverse-geocoding element.
* count: the number of elements found.

##### __GeocodingElement__: The response element of reverse-geocoding.

##### __BoundingBox__: The bounding box of matched element.
Coordinates are in in [WGS84](index.html#page-glossary-coordinate_system.md).
The bounding box contains a couple of coordinates that represent the bottom left corn and the top right corn:
* minX: minimal value of longitude (X axis).
* minY: minimal value of latitude (Y axis).
* maxX: maximal value of longitude (X axis).
* maxY: maximal value of latitude (Y axis).

##### __Coordinate__: Matched coordinate.
* x: matched longitude [WGS84](index.html#page-glossary-coordinate_system.md).
* y: matched latitude [WGS84](index.html#page-glossary-coordinate_system.md).
* distanceFromRequest: distance form the request coordinate in meter.
* lengthUnity: Unit of length (by default meter).

##### __PostalAddress__: The postal address found.
* CountryCode: ISO code of country.
* Country: name of country.
* State: name of state.
* County: name of county.
* City: name of city.
* District: name of district.
* PostalCode: the postal code (Zip code).
* RoadNumber: the administrative street number.
* Street: name of street.
* StreetNumber: the house number.

##### __Angle__: Angle of matched road segment. Value is a double in degrees.

##### __SpeedLimit__: Administrative speed limit in km/h.

##### __RelevanceScore__: Scoring of last (deepest) item found. Range value is a double between 0 to 1. the best matching is 1. 

##### __TrafficElements__: List of traffic element found on the matched road segment.
* count: number of traffic element in list.

##### __TrafficElement__: Traffic element found on the matched road segment.
* countryCode: ISO country code.
* elementId: unique identifier of traffic element.
* reverseDirection:
* relevanceScore:
* jamFactor:
* currentAvrSpeed:
* currentDuration:
* length:
* openLrBase64:
* alertCCode:
* reason: flag to define the reason a road condition. Available values:
 * `NA`: not available.
 * `CONGESTION`: traffic congestion (jam).
 * `CARRIAGEWAY_REDUCED`: carriage-way reduced.
 * `ACCIDENT`: accident.
 * `INCIDENT`: Incident.
 * `INFORMATION`: Information.
 * `NON_RECOMMANDED_ROAD`: Non re-commanded road.
 * `ROAD_CONDITION_DETERIORATED`: Road condition deteriorated.
 * `BLOCKED_ROAD`: Blocked road.
 * `ROAD_UNDER_CONTRUCTION`: Road under construction.

##### __ReasonComment__: Contains a textual comment of reason field.
* language: language code of text.

##### __FeatureElements__: List of reverse-geocoding element.

##### __FeatureElement__: The response element of matched map data (feature).
* code
* classId

##### __DistanceFromRequestCenter__: Distance in meters between the input coordinate and the matched coordinate.

##### __Type__: Type of matched geometry or object.

##### __Attributes__: List of map data attribute.

##### __Attribute__: Attribute information.
* code: BeNomad attribute code.
* key: BeNomad attribute key.
* value: The value of map data.

##### __Polyline__: Geometry of matched road segment.
In XML output is a string contains a list of coordinates in [WGS84](index.html#page-glossary-coordinate_system.md) format.
 * points: number of coordinate.

In JSON output is an array of coordinate of polyline.
 * Line:
  * X: longitude in degrees [WGS84](index.html#page-glossary-coordinate_system.md).
  * Y: latitude in degrees [WGS84](index.html#page-glossary-coordinate_system.md).

#### Response samples

XML Sample:
```
{"bemap":{"language":"xml"}}
<?xml version="1.0" encoding="UTF-8"?>
<BND action="feature" version="1.0.0">
	<GeocodingElements count="1">
		<GeocodingElement>
			<Coordinate x="2.29521" y="48.85785" />
			<PostalAddress>
				<CountryCode>FRA</CountryCode>
				<Country>FRANCE</Country>
				<State>ÎLE-DE-FRANCE</State>
				<County>PARIS</County>
				<City>PARIS</City>
				<District>PARIS 7E ARRONDISSEMENT</District>
				<PostalCode>75007</PostalCode>
				<RoadNumber/>
				<Street>AVENUE GUSTAVE EIFFEL</Street>
				<StreetNumber/>
			</PostalAddress>
			<Angle>40.0</Angle>
			<SpeedLimit>30.0</SpeedLimit>
			<RelevanceScore>0.40017628911414715</RelevanceScore>
		</GeocodingElement>
	</GeocodingElements>
	<FeatureElements count="6">
		<FeatureElement code="BUILT_UP_AREA" classId="1300">
			<BoundingBox minX="2.25129" minY="48.81571" maxX="2.41624" maxY="48.90248" />
			<Coordinate x="2.333765" y="48.859094999999996" />
			<Attributes>
				<Attribute code="NAME" key="20306">
					<![CDATA[]]>
				</Attribute>
			</Attributes>
		</FeatureElement>
		<FeatureElement code="LAND_USAGE" classId="2000">
			<BoundingBox minX="2.29102" minY="48.85119" maxX="2.3043" maxY="48.86014" />
			<Coordinate x="2.29766" y="48.855665" />
			<Attributes>
				<Attribute code="NAME" key="20306">
					<![CDATA[JARDIN DU CHAMP DE MARS]]>
				</Attribute>
			</Attributes>
		</FeatureElement>
		<FeatureElement code="BUILDING" classId="3900">
			<BoundingBox minX="2.29379" minY="48.85778" maxX="2.2952" maxY="48.85869" />
			<Coordinate x="2.294495" y="48.858235" />
			<Attributes>
				<Attribute code="NAME" key="20306">
					<![CDATA[TOUR EIFFEL]]>
				</Attribute>
			</Attributes>
		</FeatureElement>
		<FeatureElement code="RESTAURANT" classId="7315">
			<BoundingBox minX="2.29516" minY="48.85784" maxX="2.29516" maxY="48.85784" />
			<Coordinate x="2.29516" y="48.85784" />
			<Attributes>
				<Attribute code="NAME" key="20306">
					<![CDATA[LE JULES VERNE]]>
				</Attribute>
			</Attributes>
		</FeatureElement>
		<FeatureElement code="HISTORICAL_MONUMENT" classId="9113">
			<BoundingBox minX="2.2945" minY="48.85824" maxX="2.2945" maxY="48.85824" />
			<Coordinate x="2.2945" y="48.85824" />
			<Attributes>
				<Attribute code="NAME" key="20306">
					<![CDATA[TOUR EIFFEL]]>
				</Attribute>
			</Attributes>
		</FeatureElement>
		<FeatureElement code="CONVENTION_CENTER" classId="9377">
			<BoundingBox minX="2.29452" minY="48.85827" maxX="2.29452" maxY="48.85827" />
			<Coordinate x="2.29452" y="48.85827" />
			<Attributes>
				<Attribute code="NAME" key="20306">
					<![CDATA[SALLE GUSTAVE EIFFEL]]>
				</Attribute>
			</Attributes>
		</FeatureElement>
	</FeatureElements>
</BND>
```

JSON Sample:
```
{"bemap":{"language":"javascript"}}
{
	"BND": {
		"action": "feature",
		"version": "1.0.0",
		"GeocodingElements": {
			"count": 1,
			"GeocodingElement": [{
					"Coordinate": {
						"x": 2.29521,
						"y": 48.85785
					},
					"PostalAddress": {
						"CountryCode": "FRA",
						"Country": "FRANCE",
						"State": "ÎLE-DE-FRANCE",
						"County": "PARIS",
						"City": "PARIS",
						"District": "PARIS 7E ARRONDISSEMENT",
						"PostalCode": "75007",
						"Street": "AVENUE GUSTAVE EIFFEL",
						"StreetNumber": ""
					},
					"Angle": 40.0,
					"SpeedLimit": 30.0,
					"RelevanceScore": 0.40017628911414715
				}
			]
		},
		"FeatureElements": {
			"count": 6,
			"FeatureElement": [{
					"Code": "BUILT_UP_AREA",
					"ClassId": "1300",
					"BoundingBox": {
						"minX": 2.25129,
						"minY": 48.81571,
						"maxX": 2.41624,
						"maxY": 48.90248
					},
					"Coordinate": {
						"x": 2.333765,
						"y": 48.859094999999996
					},
					"Attributes": [{
							"Attribute": {
								"code": "NAME",
								"key": "20306",
								"value": ""
							}
						}
					]
				}, {
					"Code": "LAND_USAGE",
					"ClassId": "2000",
					"BoundingBox": {
						"minX": 2.29102,
						"minY": 48.85119,
						"maxX": 2.3043,
						"maxY": 48.86014
					},
					"Coordinate": {
						"x": 2.29766,
						"y": 48.855665
					},
					"Attributes": [{
							"Attribute": {
								"code": "NAME",
								"key": "20306",
								"value": "JARDIN DU CHAMP DE MARS"
							}
						}
					]
				}, {
					"Code": "BUILDING",
					"ClassId": "3900",
					"BoundingBox": {
						"minX": 2.29379,
						"minY": 48.85778,
						"maxX": 2.2952,
						"maxY": 48.85869
					},
					"Coordinate": {
						"x": 2.294495,
						"y": 48.858235
					},
					"Attributes": [{
							"Attribute": {
								"code": "NAME",
								"key": "20306",
								"value": "TOUR EIFFEL"
							}
						}
					]
				}, {
					"Code": "RESTAURANT",
					"ClassId": "7315",
					"BoundingBox": {
						"minX": 2.29516,
						"minY": 48.85784,
						"maxX": 2.29516,
						"maxY": 48.85784
					},
					"Coordinate": {
						"x": 2.29516,
						"y": 48.85784
					},
					"Attributes": [{
							"Attribute": {
								"code": "NAME",
								"key": "20306",
								"value": "LE JULES VERNE"
							}
						}
					]
				}, {
					"Code": "HISTORICAL_MONUMENT",
					"ClassId": "9113",
					"BoundingBox": {
						"minX": 2.2945,
						"minY": 48.85824,
						"maxX": 2.2945,
						"maxY": 48.85824
					},
					"Coordinate": {
						"x": 2.2945,
						"y": 48.85824
					},
					"Attributes": [{
							"Attribute": {
								"code": "NAME",
								"key": "20306",
								"value": "TOUR EIFFEL"
							}
						}
					]
				}, {
					"Code": "CONVENTION_CENTER",
					"ClassId": "9377",
					"BoundingBox": {
						"minX": 2.29452,
						"minY": 48.85827,
						"maxX": 2.29452,
						"maxY": 48.85827
					},
					"Coordinate": {
						"x": 2.29452,
						"y": 48.85827
					},
					"Attributes": [{
							"Attribute": {
								"code": "NAME",
								"key": "20306",
								"value": "SALLE GUSTAVE EIFFEL"
							}
						}
					]
				}
			]
		}
	}
}

```
