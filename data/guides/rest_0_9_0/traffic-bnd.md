# REST API, BND version 0.9


## Traffic service
To get the traffic information by country or an restricted area.

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
/bgis/bnd?geoserver=default&version=1.0.0&action=traffic&language=fr&format=Json&countryCode=FRA
```

All coordinates are defined by longitude and latitude, see the [coordinate system](index.html#page-glossary-coordinate_system.md) glossary for more details.

#### __Mandatory parameters__
The parameters `bbox` and `countryCode` can used alternately, but the presence of one of them in the request is mandatory.

##### __action__: Name of service (action), here is `traffic`.

##### __bbox__: Define a bounding box (in [WGS84](index.html#page-glossary-coordinate_system.md) format) to get the traffic information of restricted area.
The bounding box parameter is contains a couple of coordinates that represent the bottom left corn and the top right corn.
First couple of coordinates is composed by minimal values of longitude (X axis) and latitude (Y axis).
Second couple of coordinates is composed by maximal values of longitude (X axis) and latitude (Y axis).
* URL Format: `&bbox=minimal X,minimal Y,maximal X,maximal Y`.
* Example: `&bbox=1.13342,40.75561,6.51123,46.13342`.
* Possible exceptions are `MissingBBoxParameterException` and `NotValidBBoxParameterException`.

##### __countryCode__: Country ISO Code. Performs a data extract operation inside the specified ISO code filter.

##### __version__: Version of BND protocol, here is `1.0.0`.

#### __Optional parameters__

##### __callback__: Define the JSONP callback name.

##### __elementId__: Set the traffic element ID to get only the information about it.

##### __format__: Define the format of output.
* Default value is `XML`.
* Available values are `XML`, `JSON`, `JSONP`, `BINAC10`, `BINLID10`, `BNDJSON10` and `BNDJSON11`.  
* Possible exception is `FormatNotSupportedException`.

##### __geoserver__: Geo server name. Set the name of the server configuration that will be used to perform the request.

##### __language__: Define the language that will be used. Objects for which defined language code is not available, default language will be used. Values language Code - An US-ASCII string that defines an ISO 639-1 (2-letter) language code. The specials "IC" (no sensitive case) language code allows you to search for a country depending on its ISO-3166 Alpha-3 or Alpha-2 country code.
* Example for French : `&LANGUAGE=FR`.

##### __minJamFactor__: Set the minimal value of jam factory, under this value the element will be ignored.

##### __options__: Comma-separated list of one or more options.
* Available values:
 * `STATS`: Enable the data outputs like jam factor, speed and other information.
 * `POLYLINE`: Enable the polyline geometry output.
 * `SYNC`: SYNC works only with binac10 format.
 * `ALERTC`: Enable the Alert-C outputs.
 * `OPENLR`: Enable the OpenLR outputs.
 * `TRAFFIC_PREDICTIVE`: Enable the predictive traffic information.
 * `TRAFFIC_HISTORICAL`: (Beta) Enable the historical traffic information.
 * `ONLY_BLOCKED_ROAD`: To get only the blocked roads (closed).
 * `EXCLUDE_BLOCKED_ROAD`: To exclude all blocked roads (closed).
 * `EVENT`: Enable structure of events on road. See `EVT_` other values.
 * `EVT_DUPLICATE_FILTER`: Enable filter on repeated values to reduce the output flow.
 * `EVT_ROAD_FEATURE`: Add road feature information.
 * `EVT_PROHIBITED_DRIVING`: Add the prohibited driving information like againstTrafficDir, prohibitedTurn and prohibitedBlockedPassage.
 * `EVT_ELEVATION`: Add elevation of road segments.
 * `EVT_ELEVATION2`: Add elevation of road segments (other representation of data).
 * `EVT_SEGMENT_INFO`: Add road segments information.
 * `EVT_GEOELEMENT_TYPE`: Add Geo-element type information, like the type of road, example SECONDARY_ROAD, ROUNDABOUT, MAIN_ROAD, etc.
 * `EVT_POLYLINE`: Add polyline geometry of road segments or route.
 * `EVT_ENCODED_POLYLINE`: Add encoded polyline geometry of road segments or route.
 * `EVT_LENGTH`: Enable length calculation.
 * `EVT_DURATION`: Enable duration calculation (ETA).
 * `EVT_ENERGY_CONSUMPTION`: Enable energy consumption estimation in events structure. The Energy vehicle feature, `evf` parameter is mandatory. This option can calculate the end of autonomy distance.
 * `EVT_ENERGY_CONSUMPTION_SAMPLE`: Enable energy consumption estimation with samples data in events structure. The Energy vehicle feature, `evf` parameter is mandatory. This option can calculate the end of autonomy distance.
 * `EVT_CHARGING_STATION`: Add electrical charging station information (static data).
 * `EVT_CHARGING_STATION_DYNAMIC`: Add electrical charging station information (dynamic data).
 * `EVT_TOLL_COST`: Enable the toll cost calculation in event structure. The Vehicle feature, `vf` parameter is mandatory. This option disable the `Tolls` list of `TollCost` output structure.
 * `EVT_TAX_COST`: Enable the tax cost calculation in event structure. The Vehicle feature `vf` is mandatory. This option disable the `TaxSections` list of `TaxCost` output structure.
 * `EVT_TRAFFIC`: Enable the traffic info in event structure.
 * `EVT_TRAFFIC_PREDICTIVE`: Enable the predictive traffic information in event structure.
 * `EVT_TRAFFIC_HISTORICAL`: (Beta) Enable the historical traffic information in event structure.
 * `EVT_TRAFFIC_STATISTIC`: Enable the predictive traffic information (traffic patterns) in event structure.
 * `EVT_ROUTESHEET`: Enable the route-sheet instructions in event structure.
 * `EVT_TRAFFIC_SIGNS`: Enable the traffic sign information in event structure.
* Possible exception is `NotValidOptionsParameterException`.

##### __previousUpdateTS__: (Deprecated): The previous time stamp in milliseconds of update, can be used for synchronization mode. 

##### __reverseDirection__: Available values `TRUE`, `FALSE`.

##### __timestamp__: Time stamp in milliseconds. Used by historical traffic info.

##### __xslt__: Add xml-stylesheet element in the header of generated XML. e.i. `<?xml-stylesheet type="text/xsl" href="/bgis/html/clt-api/xslt/en/routing.xsl"?>`.


### Response

#### Details of fields

Fields described below are use by the XML or JSON response format.
For the others response format follow the links below:
- [BINAC10](index.html#subpage-traffic-bnd-response-binac10.md)
- [BINLID10](index.html#subpage-rest_0_9_0-traffic-bnd-response-binlid10.md)
- [BNDJSON10](index.html#subpage-rest_0_9_0-traffic-bnd-response-bndjson10.md)
- [BNDJSON11](index.html#subpage-rest_0_9_0-traffic-bnd-response-bndjson11.md)



##### __BND__: Header of BND format response.
* action: performed action (the name of called service).
* version: version of protocol used.

##### __Elements__: List of traffic element.
* count: number of traffic element.

##### __SyncMode__: For compliance with previous protocol. The field (SyncMode) will be used for next feature.
* Available value is `OFF`.

##### __Info__: Information about the traffic information data.
* Id: ID of traffic information.
* CountryCode: ISO country code.
* Copyright: copyright of provider source data.
* Release: timestamp in milliseconds of the provider's feeds creation.
* LastUpdate: timestamp in milliseconds of the feeds creation.

##### __Element__: Traffic info element. 
* ElementId: element ID.
* TmcId: TMC ID.
* ReverseDirection: represents the queuing direction of traffic in positive or negative notation. Therefore, if the direction of travel is Eastbound (`true`), the queuing direction will be Westbound (`false`). Available values are `true` or `false`.
* PredictedSecondsInFuture: seconds in future relative to the creation time of the complete flow data the specified speed information is relevant. A value of `0` shall indicate the current speed data.

##### __JamFactor__: Percent of traffic jam. The number between `0.0` and `100.0` indicating the expected quality of travel. When there is a road closure, the Jam Factor will be `100`. As the number approaches `100.0` the quality of travel is getting worse. `-1.0` indicates that a Jam Factor could not be calculated.

##### __CurrentJamFactor__: Jam on route (in percent) from real time traffic information.
 
##### __StatisticJamFactor__: Jam on route (in percent) from statistic traffic information (traffic patterns).

##### __BoundingBox__: Bounding box of traffic info geometry (maximum extend). Define a bounding box (in [WGS84](index.html#page-glossary-coordinate_system.md) format).
The bounding box parameter is contains a couple of coordinates that represent the bottom left corn and the top right corn.
 * minX: minimal value of longitude (X axis).
 * minY: minimal value of latitude (Y axis).
 * maxX: maximal value of longitude (X axis).
 * maxY: maximal value of latitude (Y axis).

##### __CurrentAvrSpeed__: The current average speed.
* unity: measure of unit. Default value `kph` (kilometer by hour). Available values are `kph` and `mph`.

##### __CurrentDuration__: The current time to traverse this route.
* unity: measure of unit. Default value `second`. 

##### __FreeFlowAvrSpeed__: The average speed without jam.
* unity: measure of unit. Default value `kph` (kilometer by hour). Available values are `kph` and `mph`.

##### __FreeFlowDuration__: The time without jam to traverse this route.
* unity: measure of unit. Default value `second`. 

##### __JamFactorTrend__: The number between `-1.0` and `1.0` indicating the trend of the jam factor over a period of time. As the number approaches `1.0` the jam factor is getting worse.

##### __Length__: Length of traffic jam.
* unity: measure of unit. Default value `m` (meter).

##### __Offset__: Offset beging at start of jam segment.
* unity: measure of unit. Default value `m` (meter).

##### __RelevanceScore__: This indicates the level of confidence that traffic info source has in the flow data. The normal value will be a value from `0.0` to `1.0` where `1.0` is the highest level of confidence (i.e. dense sensor coverage) and `0.0` is the lowest level of confidence (i.e. completely estimated).

##### __Reason__: Reason of traffic jam.
* Available values:
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

##### __ReasonComment__: Textual explanation of cause of traffic jam.
* language: Define the language that will be used. Objects for which defined language code is not available, default language will be used. Values language Code - An US-ASCII string that defines an ISO 639-1 (2-letter) language code. The specials "IC" (no sensitive case) language code allows you to search for a country depending on its ISO-3166 Alpha-3 or Alpha-2 country code.

##### __AlertC__: Alert-C location information.
* ebuCountryCode: EBU country code.
* tableId: table ID.
* locationId: location ID.
* extend: extend.
* code: alert-c code.

##### __OpenLr__: Traffic information encoded in Base64 OpenLR string.

##### __Polyline__: Geometry of traffic information. String contains a list of coordinates in [WGS84](index.html#page-glossary-coordinate_system.md) format.
* points: number of coordinate.
* Line: Used in JSON output, is an array of coordinate of polyline.
 * X: longitude in degrees [WGS84](index.html#page-glossary-coordinate_system.md).
 * Y: latitude in degrees [WGS84](index.html#page-glossary-coordinate_system.md).

#### Response samples

XML Sample:
```
{"bemap":{"language":"xml"}}
<?xml version="1.0" encoding="UTF-8"?>
<BND action="traffic" version="1.0.0">
	<Elements count="2863">
		<SyncMode>OFF</SyncMode>
		<Info Id="0">
			<CountryCode>FRA</CountryCode>
			<Copyright>Navteq</Copyright>
			<Release>1515575786000</Release>
			<LastUpdate>1515575846995</LastUpdate>
		</Info>
		<Element ElementId="520393582" TmcId="F32-37742" ReverseDirection="false" PredictedSecondsInFuture="0">
			<JamFactor>40.275303</JamFactor>
			<CurrentJamFactor>55.8835</CurrentJamFactor>
			<StatisticJamFactor>55.8835</StatisticJamFactor>
			<BoundingBox minX="5.42752" minY="43.28165" maxX="5.44257" maxY="43.28584" />
			<CurrentAvrSpeed unity="kph">21.16</CurrentAvrSpeed>
			<CurrentDuration unity="second">0</CurrentDuration>
			<FreeFlowAvrSpeed unity="kph">33.3</FreeFlowAvrSpeed>
			<FreeFlowDuration  unity="second">0</FreeFlowDuration>
			<Length unity="m">1</Length>
			<RelevanceScore>0.86</RelevanceScore>
			<Reason>NA</Reason>
			<AlertC ebuCountryCode="F" tableId="32" locationId="37742" extend="0" code="115" />
			<Polyline points="45">
				<![CDATA[5.43016,43.28226 5.4305,43.28239 5.43079,43.28245 5.43102,43.28249 5.43137,43.28255 5.43147,43.28257 5.43195,43.2827 5.43208,43.28274 5.43227,43.28282 5.43258,43.28294 5.43285,43.28303 5.43332,43.2832 5.43346,43.28325 5.43357,43.28329 5.43382,43.28338 5.43404,43.28346 5.43439,43.28359 5.4355,43.28402 5.43556,43.28404 5.43566,43.28408 5.43583,43.28414 5.43601,43.2842 5.43715,43.28462 5.43755,43.2847 5.43795,43.28474 5.43873,43.28482 5.43911,43.28486 5.43979,43.28496 5.44015,43.28503 5.44038,43.2851 5.44082,43.28525 5.44164,43.28553 5.44195,43.28564 5.44201,43.28566 5.44234,43.28577 5.44257,43.28584 5.42983,43.28209 5.43016,43.28226 5.42888,43.2818 5.42949,43.28195 5.42983,43.28209 5.42825,43.28166 5.42888,43.2818 5.42752,43.28165 5.42825,43.28166 ]]>
			</Polyline>
		</Element>
		<Element ElementId="520518221" TmcId="F32+31309" ReverseDirection="true" PredictedSecondsInFuture="0">
			<JamFactor>47.253098</JamFactor>
			<CurrentJamFactor>55.8835</CurrentJamFactor>
			<StatisticJamFactor>55.8835</StatisticJamFactor>
			<BoundingBox minX="1.08363" minY="49.42724" maxX="1.08618" maxY="49.43063" />
			<CurrentAvrSpeed unity="kph">11.63</CurrentAvrSpeed>
			<CurrentDuration unity="second">0</CurrentDuration>
			<FreeFlowAvrSpeed unity="kph">21.6</FreeFlowAvrSpeed>
			<FreeFlowDuration  unity="second">0</FreeFlowDuration>
			<Length unity="m">0</Length>
			<RelevanceScore>0.73</RelevanceScore>
			<Reason>NA</Reason>
			<AlertC ebuCountryCode="F" tableId="32" locationId="31309" extend="0" code="115" />
			<Polyline points="15">
				<![CDATA[1.08589,49.43025 1.08618,49.43063 1.0843,49.42817 1.08446,49.42837 1.08482,49.42882 1.08486,49.42887 1.0854,49.42957 1.08577,49.43008 1.08589,49.43025 1.08403,49.42782 1.0843,49.42817 1.08373,49.42739 1.08403,49.42782 1.08363,49.42724 1.08373,49.42739 ]]>
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
		"action": "traffic",
		"version": "1.0.0",
		"Elements": {
			"count": 2863,
			"SyncMode": "OFF",
			"Elements": [{
					"Info": {
						"Id": "0",
						"CountryCode": "FRA",
						"Release": 1515575786000,
						"LastUpdate": 1515575846995,
						"Copyright": "Navteq"
					}
				}, {
					"ElementId": "520393582",
					"TmcId": "F32-37742",
					"ReverseDirection": "false",
					"PredictedSecondsInFuture": "0",
					"JamFactor": 40.275303,
					"CurrentJamFactor": 55.8835,
					"StatisticJamFactor": 55.8835
					"BoundingBox": {
						"minX": 5.42752,
						"minY": 43.28165,
						"maxX": 5.44257,
						"maxY": 43.28584
					},
					"CurrentAvrSpeed": 21.16,
					"CurrentDuration": 0,
					"FreeFlowAvrSpeed": 33.3,
					"FreeFlowDuration": 0,
					"Length": 1,
					"RelevanceScore": 0.86,
					"Reason": "NA",
					"AlertC": {
						"ebuCountryCode": "F",
						"tableId": "32",
						"locationId": "37742",
						"extend": "0",
						"code": "115"
					},
					"Polyline": {
						"points": 45,
						"Line": [{
								"X": 5.43016,
								"Y": 43.28226
							}, {
								"X": 5.4305,
								"Y": 43.28239
							}, {
								"X": 5.43079,
								"Y": 43.28245
							}, {
								"X": 5.43102,
								"Y": 43.28249
							}, {
								"X": 5.43137,
								"Y": 43.28255
							}, {
								"X": 5.43147,
								"Y": 43.28257
							}, {
								"X": 5.43195,
								"Y": 43.2827
							}, {
								"X": 5.43208,
								"Y": 43.28274
							}, {
								"X": 5.43227,
								"Y": 43.28282
							}, {
								"X": 5.43258,
								"Y": 43.28294
							}, {
								"X": 5.43285,
								"Y": 43.28303
							}, {
								"X": 5.43332,
								"Y": 43.2832
							}, {
								"X": 5.43346,
								"Y": 43.28325
							}, {
								"X": 5.43357,
								"Y": 43.28329
							}, {
								"X": 5.43382,
								"Y": 43.28338
							}, {
								"X": 5.43404,
								"Y": 43.28346
							}, {
								"X": 5.43439,
								"Y": 43.28359
							}, {
								"X": 5.4355,
								"Y": 43.28402
							}, {
								"X": 5.43556,
								"Y": 43.28404
							}, {
								"X": 5.43566,
								"Y": 43.28408
							}, {
								"X": 5.43583,
								"Y": 43.28414
							}, {
								"X": 5.43601,
								"Y": 43.2842
							}, {
								"X": 5.43715,
								"Y": 43.28462
							}, {
								"X": 5.43755,
								"Y": 43.2847
							}, {
								"X": 5.43795,
								"Y": 43.28474
							}, {
								"X": 5.43873,
								"Y": 43.28482
							}, {
								"X": 5.43911,
								"Y": 43.28486
							}, {
								"X": 5.43979,
								"Y": 43.28496
							}, {
								"X": 5.44015,
								"Y": 43.28503
							}, {
								"X": 5.44038,
								"Y": 43.2851
							}, {
								"X": 5.44082,
								"Y": 43.28525
							}, {
								"X": 5.44164,
								"Y": 43.28553
							}, {
								"X": 5.44195,
								"Y": 43.28564
							}, {
								"X": 5.44201,
								"Y": 43.28566
							}, {
								"X": 5.44234,
								"Y": 43.28577
							}, {
								"X": 5.44257,
								"Y": 43.28584
							}, {
								"X": 5.42983,
								"Y": 43.28209
							}, {
								"X": 5.43016,
								"Y": 43.28226
							}, {
								"X": 5.42888,
								"Y": 43.2818
							}, {
								"X": 5.42949,
								"Y": 43.28195
							}, {
								"X": 5.42983,
								"Y": 43.28209
							}, {
								"X": 5.42825,
								"Y": 43.28166
							}, {
								"X": 5.42888,
								"Y": 43.2818
							}, {
								"X": 5.42752,
								"Y": 43.28165
							}, {
								"X": 5.42825,
								"Y": 43.28166
							}
						]
					}
				}, {
					"ElementId": "520518221",
					"TmcId": "F32+31309",
					"ReverseDirection": "true",
					"PredictedSecondsInFuture": "0",
					"JamFactor": 47.253098,
					"CurrentJamFactor": 55.8835,
					"StatisticJamFactor": 55.8835 
					"BoundingBox": {
						"minX": 1.08363,
						"minY": 49.42724,
						"maxX": 1.08618,
						"maxY": 49.43063
					},
					"CurrentAvrSpeed": 11.63,
					"CurrentDuration": 0,
					"FreeFlowAvrSpeed": 21.6,
					"FreeFlowDuration": 0,
					"Length": 0,
					"RelevanceScore": 0.73,
					"Reason": "NA",
					"AlertC": {
						"ebuCountryCode": "F",
						"tableId": "32",
						"locationId": "31309",
						"extend": "0",
						"code": "115"
					},
					"Polyline": {
						"points": 15,
						"Line": [{
								"X": 1.08589,
								"Y": 49.43025
							}, {
								"X": 1.08618,
								"Y": 49.43063
							}, {
								"X": 1.0843,
								"Y": 49.42817
							}, {
								"X": 1.08446,
								"Y": 49.42837
							}, {
								"X": 1.08482,
								"Y": 49.42882
							}, {
								"X": 1.08486,
								"Y": 49.42887
							}, {
								"X": 1.0854,
								"Y": 49.42957
							}, {
								"X": 1.08577,
								"Y": 49.43008
							}, {
								"X": 1.08589,
								"Y": 49.43025
							}, {
								"X": 1.08403,
								"Y": 49.42782
							}, {
								"X": 1.0843,
								"Y": 49.42817
							}, {
								"X": 1.08373,
								"Y": 49.42739
							}, {
								"X": 1.08403,
								"Y": 49.42782
							}, {
								"X": 1.08363,
								"Y": 49.42724
							}, {
								"X": 1.08373,
								"Y": 49.42739
							}
						]
					}
				}
			]
		}
	}
}
```
