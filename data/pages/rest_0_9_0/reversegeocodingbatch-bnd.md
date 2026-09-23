# REST API, BND version 0.9 (Deprecate see API v1.x)


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
Sample:
```
/bgis/bnd?geoserver=default&version=1.0.0&action=revgeoBatch&radius=50&language=fr&options=polyline&format=json&xy=7.202222,43.761058,0,180,50&xy=4.82962,45.75856
```

All coordinates are defined by longitude and latitude, see the [coordinate system](index.html#page-glossary-coordinate_system.md) glossary for more details.

#### __Parameters__
All parameters are the same as [reverse-geocoding](index.html#subpage-rest_0_9_0-reversegeocoding-bnd.md) service, exception the `xy` parameter. 

##### __xy__: coordinate of request. With this service this parameter can be repeated.
See the details of this parameter on [reverse-geocoding](index.html#subpage-rest_0_9_0-reversegeocoding-bnd.md) service.
* URL Example: `&xy=2.36136,48.81349&xy=7.202222,43.761058,0,180,50`.

### Response
It's the same response like the [reverse-geocoding](index.html#subpage-rest_0_9_0-reversegeocoding-bnd.md) service.
But the fields `Extent` and `Elements` can be repeated in `XML` response format and encapsulated in `BatchResults` array for`JSON` format.
[See the reverse-geocoding response here](index.html#subpage-rest_0_9_0-reversegeocoding-bnd.md).

#### Response samples

XML Sample:
```
{"bemap":{"language":"xml"}}
<?xml version="1.0" encoding="UTF-8"?>
<BND action="revgeocoding" version="1.0.0">
	<Extent minX="7.20211" minY="43.76112" maxX="7.20211" maxY="43.76112" />
	<Elements count="1">
		<Element>
			<Coordinate x="7.20211" y="43.76112" distanceFromRequest="11.35" lengthUnity="m" />
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
				<StreetNumber/>
				<OppositeStreetNumber/>
				<ClassId code="ROAD_SECONDARY" id="4560" />
			</PostalAddress>
			<Angle>-143.0</Angle>
			<SpeedLimit>70.0</SpeedLimit>
			<RelevanceScore>0.29405305536383314</RelevanceScore>
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
				<![CDATA[7.20205,43.76106 7.20349,43.76242 ]]>
			</Polyline>
		</Element>
	</Elements>
	<Extent minX="4.82962" minY="45.75856" maxX="4.82962" maxY="45.75856" />
	<Elements count="1">
		<Element>
			<Coordinate x="4.82962" y="45.75856" distanceFromRequest="0.0" lengthUnity="m" />
			<PostalAddress>
				<CountryCode>FRA</CountryCode>
				<Country>FRANCE</Country>
				<State>AUVERGNE-RHÔNE-ALPES</State>
				<County>RHÔNE</County>
				<City>LYON</City>
				<District>LYON 2E ARRONDISSEMENT</District>
				<PostalCode>69002</PostalCode>
				<RoadNumber/>
				<Street>RUE DU PLAT</Street>
				<StreetNumber>5</StreetNumber>
				<OppositeStreetNumber/>
				<ClassId code="ROAD_FOURTH" id="4048" />
			</PostalAddress>
			<Angle>26.0</Angle>
			<SpeedLimit>30.0</SpeedLimit>
			<RelevanceScore>0.7837919564560023</RelevanceScore>
			<Types>
				<Type>ROAD</Type>
				<Type>FOURTH_ROAD</Type>
				<Type>DISTRICT</Type>
				<Type>CITY</Type>
				<Type>COUNTY</Type>
				<Type>STATE</Type>
				<Type>COUNTRY</Type>
			</Types>
			<Polyline points="2">
				<![CDATA[4.82998,45.75908 4.82926,45.75804 ]]>
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
		"BatchResults": [{
				"Extent": {
					"minX": 7.20211,
					"minY": 43.76112,
					"maxX": 7.20211,
					"maxY": 43.76112
				},
				"Elements": {
					"count": 1,
					"Element": [{
							"Coordinate": {
								"x": 7.20211,
								"y": 43.76112,
								"distanceFromRequest": 11.35,
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
								"StreetNumber": "",
								"OppositeStreetNumber": "",
								"ClassId": {
									"code": "ROAD_SECONDARY",
									"id": "4560"
								}
							},
							"Angle": -143.0,
							"SpeedLimit": 70.0,
							"RelevanceScore": 0.29405305536383314,
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
										"X": 7.20205,
										"Y": 43.76106
									}, {
										"X": 7.20349,
										"Y": 43.76242
									}
								]
							}
						}
					]
				}
			}, {
				"Extent": {
					"minX": 4.82962,
					"minY": 45.75856,
					"maxX": 4.82962,
					"maxY": 45.75856
				},
				"Elements": {
					"count": 1,
					"Element": [{
							"Coordinate": {
								"x": 4.82962,
								"y": 45.75856,
								"distanceFromRequest": 0.0,
								"lengthUnity": "m"
							},
							"PostalAddress": {
								"CountryCode": "FRA",
								"Country": "FRANCE",
								"State": "AUVERGNE-RHÔNE-ALPES",
								"County": "RHÔNE",
								"City": "LYON",
								"District": "LYON 2E ARRONDISSEMENT",
								"PostalCode": "69002",
								"Street": "RUE DU PLAT",
								"StreetNumber": "5",
								"OppositeStreetNumber": "",
								"ClassId": {
									"code": "ROAD_FOURTH",
									"id": "4048"
								}
							},
							"Angle": 26.0,
							"SpeedLimit": 30.0,
							"RelevanceScore": 0.7837919564560023,
							"Types": [{
									"Type": "ROAD"
								}, {
									"Type": "FOURTH_ROAD"
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
										"X": 4.82998,
										"Y": 45.75908
									}, {
										"X": 4.82926,
										"Y": 45.75804
									}
								]
							}
						}
					]
				}
			}

		]
	}
}
```
