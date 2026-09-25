# REST API, BND version 0.9 (Deprecate see API v1.x)


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
Sample:
```
/bgis/bnd?version=1.0.0&action=revgeocoding&xy=7.202222,43.761058&radius=5&language=fr&format=json
```

All coordinates are defined by longitude and latitude, see the [coordinate system](index.html#page-glossary-coordinate_system.md) glossary for more details.

#### __Mandatory parameters__

##### __action__: Name of service (action), here is `revgeocoding`.

##### __radius__: Maximum search radius around GPS point. The value is in meter.
* Possible exceptions are `MissingRadiusParameterException`.

##### __version__: Version of BND protocol, here is `1.0.0`.

##### __xy__: Coordinate of request.
This parameter is comma-separated list, see below the details of parameter format in order of fields value:
1. longitude: Longitude in degrees [WGS84](index.html#page-glossary-coordinate_system.md).
2. latitude: Latitude in degrees [WGS84](index.html#page-glossary-coordinate_system.md).
3. altitude: Altitude in meters (optional).
4. heading: heading angle in degrees (optional).
5. speed: speed in km/h (optional). For BeNomad engine: Use this field only if the heading is available.
6. time: time stamp of GPS coordinate in millisecond (optional).
7. satellite: number of satellite (optional).

Format:
* URL format: `&xy=longitude,latitude,altitude,heading,speed,time,satellite`.
* URL Example: `&xy=2.36136,48.81349`.
* Possible exceptions are `MissingCoordinateParameterException` and `NotValidCoordinateParameterException`.

#### __Optional parameters__

##### __angle__: Define to the GPS angle (in degrees).

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

##### __options__: Comma-separated list of one or more reverse-geocoding options.
* Available values:
 * `POLYLINE`: Return the list of coordinates of road segment.
 * `ROAD_FEATURE`: Return the network information of a road segment.
 * `SEGMENTID`: Return the segment ID (like link Id).
 * `START_AT_RADIUS`: Force to start research directly at radius passed in parameter.
 * `SKIP_EMPTY_STREETNAME`: Skip elements without street name if other element(s) have a street name.
 * `OPPOSITE_POSTAL_ADDRESS`: Return the opposite postal address only if different from postal address field.
 * `OPPOSITE_POSTAL_ADDRESS_ALWAYS`:Return the opposite postal address, always even if the values are same as postal address field.
 * `TRAFFIC`: Return the traffic information.
 * `TRAFFIC_HISTORICAL`: (Beta) Return the historical traffic information. the time stamp defined in each coordinates are used.
 * `TRAFFIC_PREDICTIVE`: Return the predictive traffic information. the time stamp defined in each coordinates are used.
 * `URBAN_AREA`: Set this flag to true if you need to know if the resulting matched point is in an urban area.
* Possible exception is `NotValidOptionsParameterException`.

##### __speed__: Accessor to the GPS speed measure (in km/h).

##### __transportType__: Transportation mode, Car, pedestrian, truck, etc.
* Available values:
 * `BICYCLE`: Bicycle.
 * `CAR`: Passenger car, tourist car.
 * `DELIVERY_TRUCK`: Delivery truck.
 * `EMERGENCY`: Emergency vehicle.
 * `MOTORCYCLE`: Motorcycle.
 * `PEDESTRIAN`: Pedestrian.
 * `PUBLIC_BUS`: Public bus.
 * `TAXI`: Taxi.
 * `TRUCK`: Truck.
* Default value is `CAR`.
* Possible exception is `NotValidTransportTypeParameterException`.

##### __xslt__: Add xml-stylesheet element in the header of generated XML. e.i. `<?xml-stylesheet type="text/xsl" href="/bgis/html/clt-api/xslt/en/routing.xsl"?>`.


### Response

#### Details of fields

##### __BND__: Header of BND format response.
* action: performed action (the name of called service).
* version: version of protocol used.

##### __Extent__: Bounding box extent of all elements in [WGS84](index.html#page-glossary-coordinate_system.md) format.

##### __Elements__: List of element.
* count: the number of elements found.

##### __Element__: The response element of reverse-geocoding.

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
* OppositeStreetNumber: the opposite street number.
* ClassId:
 * code: administrative level of network.
 * id: the id of administrative level of network.

##### __OppositePostalAddress__: The opposite postal address found.
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

##### __RoadFeature__: Information about the road segment where the coordinate are matched.
* AverageSpeed: Average speed in km/h.
* Bridge: flag that indicates if road is part of a bridge or not.
* CarPool: A flag that indicates if road is reserved to carpooling.
* ConditionalMaxSpeeds and ConditionalMaxSpeed:
 * type: condition type.
 * value: condition value (see HAZMAT, WEATHER, WEIGHT: in tenths of tons, trailer: in number of trailers, vehicle type: a mask of transportation modes).
 * speed: speed in km/h.
* DirectionFlow: the direction of traffic flow per transportation modes.
* Length: length in meters.
* MainCategory: flag that enables discrimination within road's of a same FCC type (depends of map provider).
* DualCarriageway: flag that indicates if road is part of a dual carriageway (e.g. with physical separation between opposite traffic sides). 0 for no or unknown. 1 for yes.
* MaxSpeed: speed limit in km/h (0 if not available).
* MaxSpeedVerified: maximum speed verified flag (true: verified, false: calculated).
* MatchDir: the matching direction. Available values:
 * `CLOSE`: undefined matched direction and closed in both directions.
 * `OPEN_POS`: open in positive direction.
 * `OPEN_NEG`: open in negative direction.
 * `OPEN`: undefined matched direction and open in both directions.
* NbLaneNeg: number of lanes in negative direction. 0 if traffic closed in negative direction or if lane information is not available.
* NbLanePos: Number of lanes in positive direction. 0 if traffic closed in positive direction or if lane information is not available.
* NoThroughTr: No through traffic restriction. Available values:
 * `0`: no restriction.
 * `1`: restriction.
 * `2`: restriction for trucks only.
* PedestrianInfrastructureType: pedestrian type. Available values:
 * `UNDEFINED`: undefined.
 * `ZONE`: pedestrian Zone.
 * `HIKING`: hiking.
 * `UNPAVED_ROAD`: unpaved road.
 * `ROUGH_ROAD`: rough road.
 * `CONDITION_ROAD`: poor condition road.
 * `STAIRS`: stairs.
 * `TUNNEL`: tunnel.
 * `ELEVATOR`: elevator.
 * `ESCALATOR`: escalator.
 * `FOOTBRIDGE`: footbridge.
* Tax: Indicates if road is submitted to a government tax (like German MAUT, etc). 0 means no tax, 1-3 defines the tax category (country dependent).
* Toll: Toll information. Available values:
 * `0`: no toll.
 * `1`: toll in positive direction.
 * `2`: toll in negative direction.
 * `3`: toll in both directions.
* Tunnel: flag that indicates if road is part of a tunnel or not.
* Urban: true if the address found is in urban area or false if not.

##### __Types__: List of type.
* type: administrative level of network.

##### __SegmentId__

##### __Polyline__: Geometry of matched road segment. String contains a list of coordinates in [WGS84](index.html#page-glossary-coordinate_system.md) format.
* points: number of coordinate.

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


#### Response samples

XML Sample:
```
{"bemap":{"language":"xml"}}
<?xml version="1.0" encoding="UTF-8"?>
<BND action="revgeocoding" version="1.0.0">
	<Extent minX="7.20223" minY="43.76106" maxX="7.20223" maxY="43.76106" />
	<Elements count="1">
		<Element>
			<Coordinate x="7.20223" y="43.76106" distanceFromRequest="0.69" lengthUnity="m" />
			<PostalAddress>
				<CountryCode>FRA</CountryCode>
				<Country>FRANCE</Country>
				<State>PROVENCE-ALPES-CÔTE D'AZUR</State>
				<County>ALPES-MARITIMES</County>
				<City>COLOMARS</City>
				<District>LA MANDA</District>
				<PostalCode>06670</PostalCode>
				<RoadNumber>M6202</RoadNumber>
				<Street>ROUTE DE GRENOBLE</Street>
				<StreetNumber>6</StreetNumber>
				<OppositeStreetNumber/>
				<ClassId code="ROAD_SECONDARY" id="4560" />
			</PostalAddress>
			<Angle>37.0</Angle>
			<SpeedLimit>70.0</SpeedLimit>
			<RelevanceScore>0.20550225957345597</RelevanceScore>
			<RoadFeature>
				<AverageSpeed>60.0</AverageSpeed>
				<Bridge>false</Bridge>
				<CarPool>false</CarPool>
				<DirectionFlow>OPEN_POS</DirectionFlow>
				<Length>76</Length>
				<MainCategory>false</MainCategory>
				<DualCarriageway>1</DualCarriageway>
				<MaxSpeed>70.0</MaxSpeed>
				<MaxSpeedVerified>true</MaxSpeedVerified>
				<MatchDir>OPEN_POS</MatchDir>
				<NbLaneNeg>0</NbLaneNeg>
				<NbLanePos>2</NbLanePos>
				<NoThroughTr>0</NoThroughTr>
				<PedestrianInfrastructureType>UNDEFINED</PedestrianInfrastructureType>
				<Tax>0</Tax>
				<Toll>0</Toll>
				<Tunnel>false</Tunnel>
				<Urban>true</Urban>
			</RoadFeature>
			<Types>
				<Type>ROAD</Type>
				<Type>SECONDARY_ROAD</Type>
				<Type>DISTRICT</Type>
				<Type>CITY</Type>
				<Type>COUNTY</Type>
				<Type>STATE</Type>
				<Type>COUNTRY</Type>
			</Types>
			<Polyline points="2">
				<![CDATA[7.20217,43.761 7.20273,43.76154 ]]>
			</Polyline>
		</Element>
	</Elements>
</BND>
```

JSON Sample:
```
{"bemap":{"language":"javascript"}}
{
	"BND": {
		"action": "revgeocoding",
		"version": "1.0.0",
		"Extent": {
			"minX": 7.20223,
			"minY": 43.76106,
			"maxX": 7.20223,
			"maxY": 43.76106
		},
		"Elements": {
			"count": 1,
			"Element": [{
					"Coordinate": {
						"x": 7.20223,
						"y": 43.76106,
						"distanceFromRequest": 0.69,
						"lengthUnity": "m"
					},
					"PostalAddress": {
						"CountryCode": "FRA",
						"Country": "FRANCE",
						"State": "PROVENCE-ALPES-CÔTE D'AZUR",
						"County": "ALPES-MARITIMES",
						"City": "COLOMARS",
						"District": "LA MANDA",
						"PostalCode": "06670",
						"Street": "ROUTE DE GRENOBLE",
						"StreetNumber": "6",
						"OppositeStreetNumber": "",
						"ClassId": {
							"code": "ROAD_SECONDARY",
							"id": "4560"
						}
					},
					"Angle": 37.0,
					"SpeedLimit": 70.0,
					"RelevanceScore": 0.20550225957345597,
					"RoadFeature": {
						"AverageSpeed": 60.0,
						"Bridge": "false",
						"CarPool": "false",
						"DirectionFlow": "OPEN_POS",
						"Length": 76,
						"MainCategory": "false",
						"DualCarriageway": 1,
						"MaxSpeed": 70.0,
						"MaxSpeedVerified": "true",
						"MatchDir": "OPEN_POS",
						"NbLaneNeg": 0,
						"NbLanePos": 2,
						"NoThroughTr": 0,
						"PedestrianInfrastructureType": "UNDEFINED",
						"Tax": 0,
						"Toll": 0,
						"Tunnel": "false",
						"Urban": "true"
					},
					"Types": [{
							"Type": "ROAD"
						}, {
							"Type": "SECONDARY_ROAD"
						}, {
							"Type": "DISTRICT"
						}, {
							"Type": "CITY"
						}, {
							"Type": "COUNTY"
						}, {
							"Type": "STATE"
						}, {
							"Type": "COUNTRY"
						}
					],
					"Polyline": {
						"points": 2,
						"Line": [{
								"X": 7.20217,
								"Y": 43.761
							}, {
								"X": 7.20273,
								"Y": 43.76154
							}
						]
					}
				}
			]
		}
	}
}
```
