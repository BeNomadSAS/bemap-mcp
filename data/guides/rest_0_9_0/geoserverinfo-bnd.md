# REST API, BND version 0.9 (Deprecate see API v1.x)


## Geoserverinfo service
Expose the information, limitations and statistics of map data about the Geo-server(s).

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
/bgis/bnd?geoserver=default&version=1.0.0&action=geoserverinfo&format=json
```

All coordinates are defined by longitude and latitude, see the [coordinate system](index.html#page-glossary-coordinate_system.md) glossary for more details.

#### __Mandatory parameters__

##### __action__: Name of service (action), here is `geoserverinfo`.

##### __version__: Version of BND protocol, here is `1.0.0`.

#### __Optional parameters__

##### __callback__: Define the JSONP callback name.

##### __format__: Define the format of output.
* Default value is `XML`.
* Available values are `XML`, `JSON` and `JSONP`.   
* Possible exception is `FormatNotSupportedException`.

##### __geoserver__: Geo server name. Set the name of the server configuration that will be used to perform the request.

##### __language__: Define the language that will be used. Objects for which defined language code is not available, default language will be used. Values language Code - An US-ASCII string that defines an ISO 639-1 (2-letter) language code. The specials "IC" (no sensitive case) language code allows you to search for a country depending on its ISO-3166 Alpha-3 or Alpha-2 country code.
* Example for French : `&LANGUAGE=FR`.

##### __layersInfoOptions__: Comma-separated list of one or more options.
* Available values:
 * `COUNTRY_NAME`: Enable country name.
* Possible exception is `NotValidOptionsParameterException`.

##### __xslt__: Add xml-stylesheet element in the header of generated XML. e.i. `<?xml-stylesheet type="text/xsl" href="/bgis/html/clt-api/xslt/en/routing.xsl"?>`.


### Response

#### Details of fields

##### __BND__: Header of BND format response.
* action: performed action (the name of called service).
* version: version of protocol used.

##### __AvailableGeoServer__: List of available geo-server.
* count: number of available geo-server.

##### __GeoServer__: Geo-server.
* name: name of geo-server.

##### __Copyright__: Copyright of map data.

##### __CopyrightUrl__: URL of map data copyright.

##### __SupplierTerms__: Legal terms of supplier.

##### __SupplierTermsUrl__: URL of legal terms (supplier).

##### __Layers__: List of layer information.
* count: number of layer element.

##### __Layer__: Layer information
* Title: title of layer.
* Name: name of layer.
* Copyright: Copyright of layer.
* Code: BeNomad layers codes.
* Projection: projection name.
* BoundingBox: bounding box of layer (maximum extend). Define a bounding box (in [WGS84](index.html#page-glossary-coordinate_system.md) format).
The bounding box parameter is contains a couple of coordinates that represent the bottom left corn and the top right corn.
 * minX: minimal value of longitude (X axis).
 * minY: minimal value of latitude (Y axis).
 * maxX: maximal value of longitude (X axis).
 * maxY: maximal value of latitude (Y axis).

##### __TransportTypes__: Transportation mode, Car, pedestrian, truck, etc.
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

##### __TruckAttributes__: If the truck attributes are available this flag is set to `true`, otherwise `false`.
* Available values are `true` or `false`.

##### __ServiceLimits__:
* count: number of limits.

##### __ServiceLimit__:
* serviveName: name of BeMap service (like mapping, geocoding, routing, etc.).
* key: the key field is like a name of limit.
* argument: indicate the interpretation of value, e.i. the value is maximal or minimal. Available values below.
 * `NA`: not available.
 * `MIN`: minimal.
 * `MAX`: maximal.
* type: define the type of value. Available values below.
 * `NA`: Not available.
 * `STRING`: String.
 * `INT`: Integer.
 * `FLOAT`: Float.
 * `LONG`: Long.
 * `DOUBLE`: Double.
* value: the value of limitation.
* unit: used measure unit. `METER` by default.

##### __Coverages__:
* count: number of coverage.

##### __Coverage__:
* countryCode: ISO country code.
* country: country name.

##### __BoundingBox__: Maximum extend of country coverage.

##### __Statistics__: Statistics of country coverage.

##### __Counter__: Map data statistic counters like geometric element contains in map data or file size of map data.
* filesSizeUnit: measure unit of file size, `byte` by default.
* filesSize: size of map data file.
* firstAdminLevel: number of geometric element for the first administrative level.
* secondAdminLevel: number of geometric element for the second administrative level.
* city: number of geometric element for city administrative level.
* district: number of geometric element for district administrative level.
* postalCode: number of geometric element for postal code administrative level.
* extPostalCode: number of geometric element for extended postal code administrative level.
* roadNetwork: number of geometric element for road network administrative level.
* poi: number of geometric element for POI.
* poiCityCenter: number of geometric element for POI center.


#### Response samples

XML Sample:
```
{"bemap":{"language":"xml"}}
<?xml version="1.0" encoding="UTF-8"?>
<BND action="geoserverinfo" version="1.0.0">
	<AvailableGeoServer count="2">
		<GeoServer name="gireve"/>
		<GeoServer name="benomad"/>
	</AvailableGeoServer>
	<Copyright>Here Maps 2017.3</Copyright>
	<CopyrightUrl>https://company.here.com/here/</CopyrightUrl>
	<SupplierTerms>Supplier Terms Applicable to Location Content</SupplierTerms>
	<SupplierTermsUrl>http://corporate.navteq.com/supplier_terms.html</SupplierTermsUrl>
	<Layers count="1">
		<Layer>
			<Title>Maximum coverage available</Title>
			<Name>Maximum coverage available</Name>
			<Copyright>Here Maps 2017.3</Copyright>
			<Code>40362,12462</Code>
			<Projection>null</Projection>
			<BoundingBox minX="-180.0" minY="-90.0" maxX="180.0" maxY="90.0" />
		</Layer>
	</Layers>
	<TransportTypes count="9">
		<Type>PEDESTRIAN</Type>
		<Type>BICYCLE</Type>
		<Type>MOTORCYCLE</Type>
		<Type>CAR</Type>
		<Type>TAXI</Type>
		<Type>PUBLIC_BUS</Type>
		<Type>EMERGENCY</Type>
		<Type>DELIVERY_TRUCK</Type>
		<Type>TRUCK</Type>
	</TransportTypes>
	<TruckAttributes>true</TruckAttributes>
	<ServiceLimits count="24">
		<ServiceLimit serviveName="BenomadGeocodingPlaceService" key="MaximumBBoxSideForCity" argument="MAX" type="INT" value="29647" unit="METER" />
		<ServiceLimit serviveName="BenomadGeocodingPlaceService" key="MaximumBBoxSideForCountry" argument="MAX" type="INT" value="1139129" unit="METER" />
		<ServiceLimit serviveName="BenomadReverseGeocodingService" key="LimitRadius" argument="MAX" type="INT" value="250000" unit="METER" />
		<ServiceLimit serviveName="BenomadRevGeoBatchService" key="LimitMaxCoordinate" argument="MAX" type="INT" value="0" />
		<ServiceLimit serviveName="BenomadRevGeoBatchService" key="LimitRadius" argument="MAX" type="INT" value="250000" unit="METER" />
		<ServiceLimit serviveName="BenomadGeofencingService" key="LimitMaxCoordinate" argument="MAX" type="INT" value="0" />
		<ServiceLimit serviveName="BenomadGeofencingService" key="LimitMaxFence" argument="MAX" type="INT" value="0" />
		<ServiceLimit serviveName="BenomadLandFeatureService" key="SvsRadiusLimit" argument="MAX" type="LONG" value="10000" unit="METER" />
		<ServiceLimit serviveName="BenomadRoutingService" key="LimitMaxIsochroneSeconds" argument="MAX" type="INT" value="0" unit="SECOND" />
		<ServiceLimit serviveName="BenomadRoutingService" key="LimitModeViaMaxVia" argument="MAX" type="INT" value="0" />
		<ServiceLimit serviveName="BenomadRoutingService" key="LimitMaxRadius" argument="MAX" type="INT" value="10000" unit="METER" />
		<ServiceLimit serviveName="BenomadRoutingService" key="LimitModeNToNMaxVia" argument="MAX" type="INT" value="0" />
		<ServiceLimit serviveName="BenomadRoutingService" key="LimitModeIsoChroneMaxVia" argument="MAX" type="INT" value="0" />
		<ServiceLimit serviveName="BenomadRoutingService" key="LimitMaxIsochroneMeters" argument="MAX" type="INT" value="0" unit="METER" />
		<ServiceLimit serviveName="BenomadRoutingService" key="LimitMode1ToNMaxVia" argument="MAX" type="INT" value="0" />
		<ServiceLimit serviveName="BenomadRoutingService" key="LimitMinRadius" argument="MIN" type="INT" value="1" unit="METER" />
		<ServiceLimit serviveName="BenomadRoutingService" key="LimitModeNTo1MaxVia" argument="MAX" type="INT" value="0" />
		<ServiceLimit serviveName="BenomadRoutingService" key="LimitMaxFence" argument="MAX" type="INT" value="0" />
		<ServiceLimit serviveName="BenomadRebuildRouteService" key="LimitMaxCoordinate" argument="MAX" type="INT" value="0" />
		<ServiceLimit serviveName="BenomadRebuildRouteService" key="LimitMaxSegmentId" argument="MAX" type="INT" value="0" />
		<ServiceLimit serviveName="BenomadRebuildRouteService" key="LimitRadius" argument="MAX" type="INT" value="1000" unit="METER" />
		<ServiceLimit serviveName="BenomadRebuildRouteService" key="LimitMaxFence" argument="MAX" type="INT" value="0" />
		<ServiceLimit serviveName="BenomadTraceRouteService" key="LimitMaxCoordinate" argument="MAX" type="INT" value="0" />
		<ServiceLimit serviveName="BenomadTraceRouteService" key="LimitMaxFence" argument="MAX" type="INT" value="0" />
	</ServiceLimits>
	<Coverages count="238">
		<Coverage countryCode="ABW"	country="ARUBA">
			<BoundingBox minX="-71.96918" minY="7.35986" maxX="-57.12206" maxY="13.24003" />
			<Statistics>
				<Counter filesSizeUnit="byte" filesSize="488455" firstAdminLevel="0" secondAdminLevel="0" city="9" district="0" postalCode="0" extPostalCode="0" roadNetwork="10901" poi="410" poiCityCenter="9" />
			</Statistics>
		</Coverage>
		<Coverage countryCode="AFG"	country="AFGHANISTAN">
			<BoundingBox minX="60.47847" minY="29.37736" maxX="74.87947" maxY="38.48345" />
			<Statistics>
				<Counter filesSizeUnit="byte" filesSize="1299873" firstAdminLevel="0" secondAdminLevel="1" city="1" district="0" postalCode="0" extPostalCode="0" roadNetwork="47620" poi="4" poiCityCenter="1" />
			</Statistics>
		</Coverage>
		<Coverage countryCode="AGO"	country="ANGOLA">
			<BoundingBox minX="9.78848" minY="-18.0393" maxX="24.0966" maxY="-4.34584" />
			<Statistics>
				<Counter filesSizeUnit="byte" filesSize="26319510" firstAdminLevel="0" secondAdminLevel="18" city="159" district="410" postalCode="0" extPostalCode="0" roadNetwork="671237" poi="36536" poiCityCenter="569" />
			</Statistics>
		</Coverage>
		<Coverage countryCode="ZAF"	country="AFRIQUE DU SUD">
			<BoundingBox minX="12.4231" minY="-37.11781" maxX="35.79337" maxY="-22.12474" />
			<Statistics>
				<Counter filesSizeUnit="byte" filesSize="195817236" firstAdminLevel="9" secondAdminLevel="52" city="575" district="20427" postalCode="915" extPostalCode="0" roadNetwork="3765665" poi="549574" poiCityCenter="21005" />
			</Statistics>
		</Coverage>
		<Coverage countryCode="ZMB"	country="ZAMBIE">
			<BoundingBox minX="21.98779" minY="-18.0772" maxX="33.71001" maxY="-8.20733" />
			<Statistics>
				<Counter filesSizeUnit="byte" filesSize="18721769" firstAdminLevel="10" secondAdminLevel="103" city="103" district="140" postalCode="0" extPostalCode="0" roadNetwork="387517" poi="30435" poiCityCenter="243" />
			</Statistics>
		</Coverage>
		<Coverage countryCode="ZWE"	country="ZIMBABWE">
			<BoundingBox minX="25.23714" minY="-22.42881" maxX="33.06829" maxY="-15.60951" />
			<Statistics>
				<Counter filesSizeUnit="byte" filesSize="12063824" firstAdminLevel="0" secondAdminLevel="10" city="61" district="480" postalCode="0" extPostalCode="0" roadNetwork="215623" poi="19838" poiCityCenter="541" />
			</Statistics>
		</Coverage>
	</Coverages>
</BND>
```

JSON Sample:
```
{"bemap":{"language":"javascript"}}
{
	"BND": {
		"action": "geoserverinfo",
		"version": "1.0.0",
		"AvailableGeoServer": {
			"count": 2,
			"GeoServers": [{
					"name": "gireve"
				}, {
					"name": "benomad"
				}
			]
		},
		"Copyright": "Here Maps 2017.3",
		"CopyrightUrl": "https://company.here.com/here/",
		"SupplierTerms": "Supplier Terms Applicable to Location Content",
		"SupplierTermsUrl": "http://corporate.navteq.com/supplier_terms.html",
		"Layers": {
			"count": 1,
			"Layer": [{
					"Title": "Maximum coverage available",
					"Name": "Maximum coverage available",
					"Copyright": "Here Maps 2017.3",
					"Code": "40362,12462",
					"Projection": "null",
					"BoundingBox": {
						"minX": -180.0,
						"minY": -90.0,
						"maxX": 180.0,
						"maxY": 90.0
					}
				}
			]
		},
		"TransportTypes": {
			"count": 9,
			"TransportType": [{
					"Type": "PEDESTRIAN"
				}, {
					"Type": "BICYCLE"
				}, {
					"Type": "MOTORCYCLE"
				}, {
					"Type": "CAR"
				}, {
					"Type": "TAXI"
				}, {
					"Type": "PUBLIC_BUS"
				}, {
					"Type": "EMERGENCY"
				}, {
					"Type": "DELIVERY_TRUCK"
				}, {
					"Type": "TRUCK"
				}
			]
		},
		"TruckAttributes": "true",
		"ServiceLimits": {
			"count": 24,
			"Coverage": [{
					"serviveName": "BenomadGeocodingPlaceService",
					"key": "MaximumBBoxSideForCity",
					"argument": "MAX",
					"type": "INT",
					"value": "29647",
					"unit": "METER"
				}, {
					"serviveName": "BenomadGeocodingPlaceService",
					"key": "MaximumBBoxSideForCountry",
					"argument": "MAX",
					"type": "INT",
					"value": "1139129",
					"unit": "METER"
				}, {
					"serviveName": "BenomadReverseGeocodingService",
					"key": "LimitRadius",
					"argument": "MAX",
					"type": "INT",
					"value": "250000",
					"unit": "METER"
				}, {
					"serviveName": "BenomadRevGeoBatchService",
					"key": "LimitMaxCoordinate",
					"argument": "MAX",
					"type": "INT",
					"value": "0"
				}, {
					"serviveName": "BenomadRevGeoBatchService",
					"key": "LimitRadius",
					"argument": "MAX",
					"type": "INT",
					"value": "250000",
					"unit": "METER"
				}, {
					"serviveName": "BenomadGeofencingService",
					"key": "LimitMaxCoordinate",
					"argument": "MAX",
					"type": "INT",
					"value": "0"
				}, {
					"serviveName": "BenomadGeofencingService",
					"key": "LimitMaxFence",
					"argument": "MAX",
					"type": "INT",
					"value": "0"
				}, {
					"serviveName": "BenomadLandFeatureService",
					"key": "SvsRadiusLimit",
					"argument": "MAX",
					"type": "LONG",
					"value": "10000",
					"unit": "METER"
				}, {
					"serviveName": "BenomadRoutingService",
					"key": "LimitMaxIsochroneSeconds",
					"argument": "MAX",
					"type": "INT",
					"value": "0",
					"unit": "SECOND"
				}, {
					"serviveName": "BenomadRoutingService",
					"key": "LimitModeViaMaxVia",
					"argument": "MAX",
					"type": "INT",
					"value": "0"
				}, {
					"serviveName": "BenomadRoutingService",
					"key": "LimitMaxRadius",
					"argument": "MAX",
					"type": "INT",
					"value": "10000",
					"unit": "METER"
				}, {
					"serviveName": "BenomadRoutingService",
					"key": "LimitModeNToNMaxVia",
					"argument": "MAX",
					"type": "INT",
					"value": "0"
				}, {
					"serviveName": "BenomadRoutingService",
					"key": "LimitModeIsoChroneMaxVia",
					"argument": "MAX",
					"type": "INT",
					"value": "0"
				}, {
					"serviveName": "BenomadRoutingService",
					"key": "LimitMaxIsochroneMeters",
					"argument": "MAX",
					"type": "INT",
					"value": "0",
					"unit": "METER"
				}, {
					"serviveName": "BenomadRoutingService",
					"key": "LimitMode1ToNMaxVia",
					"argument": "MAX",
					"type": "INT",
					"value": "0"
				}, {
					"serviveName": "BenomadRoutingService",
					"key": "LimitMinRadius",
					"argument": "MIN",
					"type": "INT",
					"value": "1",
					"unit": "METER"
				}, {
					"serviveName": "BenomadRoutingService",
					"key": "LimitModeNTo1MaxVia",
					"argument": "MAX",
					"type": "INT",
					"value": "0"
				}, {
					"serviveName": "BenomadRoutingService",
					"key": "LimitMaxFence",
					"argument": "MAX",
					"type": "INT",
					"value": "0"
				}, {
					"serviveName": "BenomadRebuildRouteService",
					"key": "LimitMaxCoordinate",
					"argument": "MAX",
					"type": "INT",
					"value": "0"
				}, {
					"serviveName": "BenomadRebuildRouteService",
					"key": "LimitMaxSegmentId",
					"argument": "MAX",
					"type": "INT",
					"value": "0"
				}, {
					"serviveName": "BenomadRebuildRouteService",
					"key": "LimitRadius",
					"argument": "MAX",
					"type": "INT",
					"value": "1000",
					"unit": "METER"
				}, {
					"serviveName": "BenomadRebuildRouteService",
					"key": "LimitMaxFence",
					"argument": "MAX",
					"type": "INT",
					"value": "0"
				}, {
					"serviveName": "BenomadTraceRouteService",
					"key": "LimitMaxCoordinate",
					"argument": "MAX",
					"type": "INT",
					"value": "0"
				}, {
					"serviveName": "BenomadTraceRouteService",
					"key": "LimitMaxFence",
					"argument": "MAX",
					"type": "INT",
					"value": "0"
				}
			]
		},
		"Coverages": {
			"count": 238,
			"Coverage": [{
					"countryCode": "ABW",
					"country": "ARUBA",
					"BoundingBox": {
						"minX": -71.96918,
						"minY": 7.35986,
						"maxX": -57.12206,
						"maxY": 13.24003
					},
					"Statistics": {
						"Counter": {
							"filesSizeUnit": "byte",
							"filesSize": 488455,
							"firstAdminLevel": 0,
							"secondAdminLevel": 0,
							"city": 9,
							"district": 0,
							"postalCode": 0,
							"extPostalCode": 0,
							"roadNetwork": 10901,
							"poi": 410,
							"poiCityCenter": 9
						}
					}
				}, {
					"countryCode": "AFG",
					"country": "AFGHANISTAN",
					"BoundingBox": {
						"minX": 60.47847,
						"minY": 29.37736,
						"maxX": 74.87947,
						"maxY": 38.48345
					},
					"Statistics": {
						"Counter": {
							"filesSizeUnit": "byte",
							"filesSize": 1299873,
							"firstAdminLevel": 0,
							"secondAdminLevel": 1,
							"city": 1,
							"district": 0,
							"postalCode": 0,
							"extPostalCode": 0,
							"roadNetwork": 47620,
							"poi": 4,
							"poiCityCenter": 1
						}
					}
				}, {
					"countryCode": "AGO",
					"country": "ANGOLA",
					"BoundingBox": {
						"minX": 9.78848,
						"minY": -18.0393,
						"maxX": 24.0966,
						"maxY": -4.34584
					},
					"Statistics": {
						"Counter": {
							"filesSizeUnit": "byte",
							"filesSize": 26319510,
							"firstAdminLevel": 0,
							"secondAdminLevel": 18,
							"city": 159,
							"district": 410,
							"postalCode": 0,
							"extPostalCode": 0,
							"roadNetwork": 671237,
							"poi": 36536,
							"poiCityCenter": 569
						}
					}
				}, {
					"countryCode": "ZAF",
					"country": "AFRIQUE DU SUD",
					"BoundingBox": {
						"minX": 12.4231,
						"minY": -37.11781,
						"maxX": 35.79337,
						"maxY": -22.12474
					},
					"Statistics": {
						"Counter": {
							"filesSizeUnit": "byte",
							"filesSize": 195817236,
							"firstAdminLevel": 9,
							"secondAdminLevel": 52,
							"city": 575,
							"district": 20427,
							"postalCode": 915,
							"extPostalCode": 0,
							"roadNetwork": 3765665,
							"poi": 549574,
							"poiCityCenter": 21005
						}
					}
				}, {
					"countryCode": "ZMB",
					"country": "ZAMBIE",
					"BoundingBox": {
						"minX": 21.98779,
						"minY": -18.0772,
						"maxX": 33.71001,
						"maxY": -8.20733
					},
					"Statistics": {
						"Counter": {
							"filesSizeUnit": "byte",
							"filesSize": 18721769,
							"firstAdminLevel": 10,
							"secondAdminLevel": 103,
							"city": 103,
							"district": 140,
							"postalCode": 0,
							"extPostalCode": 0,
							"roadNetwork": 387517,
							"poi": 30435,
							"poiCityCenter": 243
						}
					}
				}, {
					"countryCode": "ZWE",
					"country": "ZIMBABWE",
					"BoundingBox": {
						"minX": 25.23714,
						"minY": -22.42881,
						"maxX": 33.06829,
						"maxY": -15.60951
					},
					"Statistics": {
						"Counter": {
							"filesSizeUnit": "byte",
							"filesSize": 12063824,
							"firstAdminLevel": 0,
							"secondAdminLevel": 10,
							"city": 61,
							"district": 480,
							"postalCode": 0,
							"extPostalCode": 0,
							"roadNetwork": 215623,
							"poi": 19838,
							"poiCityCenter": 541
						}
					}
				}
			]
		}
	}
}
```