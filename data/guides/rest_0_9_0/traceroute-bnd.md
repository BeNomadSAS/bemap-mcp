# REST API, BND version 0.9 (Deprecate see API v1.x)


## TraceRoute service
Performs a road-matching of GPS coordinates and routing process for a specified type of vehicle. Road-matching consists in correcting uncertainties related to GPS measurements by repositioning a vehicle on the most accurate segment of neighboring roads. This service assumes that an input position corresponds to a chronological sequence of positions of a given vehicle driving on the road network.

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
/bgis/bnd?geoserver=default&version=1.0.0&action=traceRoute&language=fr&options=POLYLINE,POLYLINE_INDEX&format=json&xy=7.41888,43.73252&xy=7.41806,43.73272&xy=7.41781,43.73234&xy=7.41761,43.73205&xy=7.41753,43.73195&xy=7.41745,43.73183&xy=7.4174,43.73179&xy=7.4173,43.73165&xy=7.41722,43.73164&xy=7.41697,43.73208&xy=7.417,43.73212&xy=7.41692,43.73223&xy=7.41678,43.73217&xy=7.4168,43.7321&xy=7.41639,43.7317&xy=7.41588,43.73133&xy=7.41537,43.73169&xy=7.41516,43.73184&xy=7.41461,43.73224
```

All coordinates are defined by longitude and latitude, see the [coordinate system](index.html#page-glossary-coordinate_system.md) glossary for more details.

#### __Mandatory parameters__

##### __action__: Name of service (action), here is `traceRoute`.

##### __version__: Version of BND protocol, here is `1.0.0`.

##### __xy__: GPS coordinates of request. This parameter can be repeated.
This parameter is comma-separated list, see below the details of parameter format in order of fields value:
1. longitude: longitude in degrees [WGS84](index.html#page-glossary-coordinate_system.md).
2. latitude: latitude in degrees [WGS84](index.html#page-glossary-coordinate_system.md).
3. altitude: (optional) altitude in meters.
4. heading: (optional) heading angle in degrees. For BeNomad engine: If the angle is not available, set this field and speed field to `0`.
5. speed: (optional) speed in km/h. For BeNomad engine: Use this field only if the heading is available. 
6. time: (optional) time stamp of GPS coordinate. Unix Epoch in milliseconds.
7. satellite: (optional) number of available GPS satellite when the coordinate is collected.
8. radius: Unused.
9. ignorePoint: Unused.
10. ignoreTrafficDirections: Unused.
11. ignoreRoadBlocks: Unused.
12. ignoreRestrictions Unused.
13. avoidUTurn: Unused.
14. useStartAngle: Unused.
15. useStopRoadSide: Unused.
16. mandatory: (optional) If mandatory is set to true, the coordinate will be kept in the way-points response array. Available values are `true` or `false`. `false` by default.
17-n. customData: Custom data can be repeated and contains a key and value separated by `:`. URL format `[key]:[value],[key]:[value],[key]:[value]`. URL example `a_key:the_value_of_a,b_key:the_value_of_b,c_key:the_value_of_c`.

Format:
* URL format: `&xy=longitude,latitude,altitude,heading,speed,time,satellite`.
* URL Example 1: `&xy=2.36136,48.81349,0,178,50,1532088905000,3`.
* URL Example 2: `&xy=2.36136,48.81349,,178,50,1532088905000,3`.
* URL Example 3: `&xy=2.36136,48.81349,,,,1532088905000`.
* Possible exceptions are `MissingCoordinateParameterException` and `NotValidCoordinateParameterException`.

#### __Optional parameters__

##### __callback__: Define the JSONP callback name.

##### __corridorRadius__: Builds a corridor along this route with the given radius and the default scale resolution 100000. Corridor's radius in meters (Corridor's width = 2*corridorRadius). 

##### <s> __*criterias*__ </s>: (Deprecated) The criteria parameter don't have any effect on trace-route results.

##### __departureTime__: This parameter is an EPOCH time stamp in milliseconds (UTC) or can take an string with ISO local date time format like '2011-12-03T10:15:30', '2011-12-03T10:15:30+01:00' or '2011-12-03T10:15:30+01:00[Europe/Paris]'. It is used to define the date and time of routing departure. (For traffic patterns support, this method does not have any effect if the loaded SVS map data does not contain either the HERE Traffic Patterns or TomTom Speed Profiles databases).
* Possible exception is `NotValidDepartureTimeParameterException`.

##### __adjustEta__: Defines if the ETAs match with time stamps defined in destinations.

##### <s> __*euroEmiClass*__ </s>: (Deprecated) Define the Euro class used by the Eco-tax feature. Replaced by vehicle's emission type of vf parameter.

##### __evCnnType__: Connector (plug) type of electrical vehicle, used to process the energy consumption estimation.

##### __evf__: Energy vehicle feature used for energy consumption estimation.
This parameter is comma-separated list, see below the details of parameter format in order of fields value:
1.  scx: Product of vehicle's front area and aerodynamic coefficient (in m²).
2.  crr: Vehicle's tire rolling resistance coefficient (dimension-less, in interval ]0, 1[).
3.  engineEfficiency: Vehicle's efficiency coefficient between engine and gear (dimension-less, in interval ]0, 1[).
4.  batCapacity: Vehicle's capacity of the battery (in kWh, only if electric vehicle or hybrid re-chargeable, 0 otherwise).
5.  dryWeight: Vehicle's weight without any consumables or passengers (in kg).
6.  payload: Vehicle's extra load (consumables and passengers weight) (in kg).
7.  auxConsumption: Vehicle's instantaneous auxiliary equipments consumption (in W).
8.  maxAccel: Maximum acceleration (> 0.1, in m/s², based on vehicle's acceleration capacity and expected driving behavior).
9.  maxDecel: Maximum deceleration (< -0.1, in m/s², based on vehicle's braking capacity and expected driving behavior).
10. extTemp: Outside temperature (in °C).
11. energyLoad: Vehicle's current energy load, state of charge (in kWh).
12. maxChargePowerAc1: Maximum charge power AC single phase authorized by the vehicle (in kW).
13. maxChargePowerAc3: Maximum charge power AC three phases authorized by the vehicle (in kW).
14. maxChargePowerDc: Maximum charge power DC authorized by the vehicle (in kW).
15. regenerativeBraking: Defines if the vehicle supports regenerative braking. By default is set to `true`.
* URL format `&evf=scx,crr,engineEfficiency,batCapacity,dryWeight,payload,auxConsumption,maxAccel,maxDecel,extTemp,energyLoad,maxChargePowerAc1,maxChargePowerAc3,maxChargePowerDc,regenerativeBraking`.
* URL example `&evf=0.75,0.012,0.693,22,1468,100,300,2.1,-2,15,12,23`.
* Possible exception is `NotValidEnergyVehicleFeatureParameterException`.

##### __evRange__: Energy vehicle range. Define the pre-calculated electric vehicle autonomy in meters.
Comma-separated list of one or more options.
* URL example `&evRange=50000,100000`.
* Possible exception is `NotValidEnergyVehicleFeatureParameterException`.

##### __fence__: Define a fence shape to perform a intersection test between the route and fence.
This parameters can be repeated.
* Example: `fence=1,POLYGON,7.07863,43.61533,7.07863,43.61533,7.08136,43.61156,7.0786,43.6153`.
* Possible exception is `NotValidFenceParameterException`.

Main fields: `fence=id,type`.
* id: your fence id. if negate value the server set it with an auto-incrementing number.
* type: define the type of geometric shape of fence, like CIRCLE or POLYGON.

Geometric fields for CIRCLE type: `fence=id,type,longitude,latitude,radius`.
* longitude: longitude in degrees ([WGS84](index.html#page-glossary-coordinate_system.md)).
* latitude: latitude in degrees ([WGS84](index.html#page-glossary-coordinate_system.md)).
* radius: radius of circle in meters.
* Example `fence=1,CIRCLE,7.4173,43.73165,150`.

Geometric fields for POLYGON type: `fence=id,type,longitude,latitude,longitude,latitude,longitude,latitude,etc`.
* longitude: longitude in degrees ([WGS84](index.html#page-glossary-coordinate_system.md)).
* latitude: latitude in degrees ([WGS84](index.html#page-glossary-coordinate_system.md)).
 
##### __format__: Define the format of output.
* Default value is `XML`.
* Available values are `XML`, `JSON`, `JSONP`, `GEOJSON` and `GPX`.   
* Possible exception is `FormatNotSupportedException`.

##### __geoserver__: Geo server name. Set the name of the server configuration that will be used to perform the request.

##### __language__: Define the language that will be used to perform the address lookup. Objects for which defined language code is not available, default language will be used. Values language Code - An US-ASCII string that defines an ISO 639-1 (2-letter) language code. The specials "IC" (no sensitive case) language code allows you to search for a country depending on its ISO-3166 Alpha-3 or Alpha-2 country code.
* Example for French : `&LANGUAGE=FR`.

##### __options__: Comma-separated list of one or more options.
* Available values:
 * `USED_DESTINATIONS_OFF`: Disable used destinations list.
 * `ROUTESHEET`: Return the route sheet.
 * `ROUTESHEET_VERBOSE_LOW`: Low level of verbose for the route sheet (default).
 * `ROUTESHEET_VERBOSE_MEDIUM`: Medium level of verbose for the route sheet.
 * `ROUTESHEET_VERBOSE_HIGH`: High level of verbose for the route sheet.
 * `FENCE_SHAPE`: Enable the tests between route found and geometric fences. Return the shape of fence used to perform the test.
 * `POLYLINE`: Return the polyline (geometry) of itinerary.
 * `DETAILED_POLYLINE`: Return the polyline (geometry) of itinerary with more information for each sub-segments.
 * `POLYLINE_INDEX`: Enable the index calculation of used destination on the polyline.
 * `OPENLR`: Return the geometry of route as an encoded OpenLR base64 string.
 * `SEGMENTIDS`: Return the list of segments id of itinerary.
 * `ROAD_SEGMENTS`: Return the list of road segments of itinerary.
 * `JUNCTION_NODES`: Return the junction notes of itinerary.
 * `OFFROADS`: Return the off-road polylines of itinerary.
 * `OFFROADS_RAWDATA`: Returns the native value of map data base (like SVS attributes) of the Off-road section.
 * `NO_MINIMAL_WAYPOINTS`: Disable the minimal way-points algorithm.
 * `WAYPOINTS`: Return the way-points of itinerary.
 * `WAYPOINTS_POLYLINE`: Return the polyline of way-points of itinerary.
 * `ENERGY_CONSUMPTION`: Enable energy consumption estimation. The Energy vehicle feature (evf) is mandatory.
 * <s>`TOLL_COST`</s>: (Deprecated) Enable the toll cost calculation. The Vehicle feature, `vf` parameter is mandatory. Replaced by `EVT_TOLL_COST` option.
 * <s>`TAX_COST`</s>: (Deprecated) Enable the tax cost calculation. The Vehicle feature, `vf` parameter is mandatory. Replaced by `EVT_TAX_COST` option.
 * <s>`ECO_TAX`</s>: (Deprecated) Enable the eco-tax calculation. The Vehicle feature, `vf` parameter and Euro emission class are mandatory. You can used the additional `departureTime` parameter. Replaced by `EVT_TAX_COST` option.
 * `REVGEO_POSTAL_ADDRESS`: Return the postal address of matched input coordinates.
 * <s> `ALGO_EXP0` </s>: (Deprecated) Old algorithm.
 * <s> `ALGO_EXP1` </s>: (Deprecated) Current algorithm. Enable by default.
 * `EVENT`: Enable structure of events on road. See EVT other values.
 * `EVT_DUPLICATE_FILTER`: Enable filter on repeated values.
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
 * `EVT_ENERGY_CONSUMPTION`: Enable energy consumption estimation in events structure. The Energy vehicle feature (evf) is mandatory. This option can calculate the end of autonomy distance.
 * `EVT_ENERGY_CONSUMPTION_SAMPLE`: Enable energy consumption estimation with samples data in events structure. The Energy vehicle feature (evf) is mandatory. This option can calculate the end of autonomy distance.
 * `EVT_CHARGING_STATION`: Add electrical charging station information (static data).
 * `EVT_CHARGING_STATION_DYNAMIC`: Add electrical charging station information (dynamic data).
 * `EVT_TOLL_COST`: Enable the toll cost calculation in event structure. The Vehicle feature, `vf` parameter is mandatory. This option disable the `Tolls` list of `TollCost` output structure.
 * `EVT_TAX_COST`: Enable the tax cost calculation in event structure. The Vehicle feature `vf` is mandatory. This option disable the `TaxSections` list of `TaxCost` output structure.
 * `EVT_TRAFFIC`: Enable the traffic info in event structure.
 * `EVT_TRAFFIC_PREDICTIVE`: Enable the predictive traffic information in event structure.
 * `EVT_TRAFFIC_HISTORICAL`: (Beta) Enable the historical traffic information in event structure.
 * `EVT_ROUTESHEET`: Enable the route-sheet instructions in event structure.
 * `EVT_TRAFFIC_SIGNS`: Enable the traffic sign information in event structure.

* Possible exception is `NotValidOptionsParameterException`.

##### __pr__: Defines a new speed ponderation factor for the specified road network attribute. This parameter can be repeated.
This parameter is comma-separated list, see below the details of parameter format in order of fields value:
1. factor: New ponderation factor for speeds (float).
2. routingRoadAttribute: Attribute of road.
3. routingPonderationType: Type of ponderation.

Available values of routingRoadAttribute:
* `PREFERRED_UNDEFINED`: Roads belonging to preferred undefined network.
* `PREFERRED_STAA`: Roads belonging to preferred STAA network.
* `PREFERRED_NATIONAL_ACCESS`: Roads belonging to preferred national access network.
* `PREFERRED_TRUCK_ROUTE`: Roads belonging to preferred route truck network.
* `PREFERRED_TRUCK_BYPASS`: Roads belonging to preferred bypass truck network.
* `PREFERRED_TRUCK_LOCAL`: Roads belonging to preferred local truck network.
* `PREFERRED_HAZMAT_NRHM`: Roads belonging to preferred NRHM hazmat network.
* `PREFERRED_HAZMAT_EXPLOSIVES`: Roads belonging to preferred explosive hazmat network.
* `PREFERRED_HAZMAT_PIH`: Roads belonging to preferred PIH hazmat network.
* `PREFERRED_HAZMAT_MEDICAL`: Roads belonging to preferred medical hazmat network.
* `PREFERRED_HAZMAT_RADIOACTIVE`: Roads belonging to preferred radioactive hazmat network.
* `PREFERRED_HAZMAT_GENERAL`: Roads belonging to preferred general hazmat network.
* `PREFERRED_TOURIST_SCENIC`: Roads belonging to preferred tourist scenic roads.
* `PREFERRED_TOURIST_HISTORIC`: Roads belonging to preferred tourist historic roads.
* `PREFERRED_B_DOUBLES`: Roads belonging to preferred B-Doubles.
* `PREFERRED_TOURIST_NATIONAL`: Roads belonging to preferred tourist national route.
* `PREFERRED_TOURIST_REGIONAL`: Roads belonging to preferred tourist regional route.
* `PREFERRED_TOURIST_NATURE`: Roads belonging to preferred tourist nature route.
* `PREFERRED_WEIGHT_DEPENDENT`: Roads belonging to weight dependent preferred network.
* `TOLL_ROAD`: Roads with tolls.
* `BUILT_UP`: Roads belonging to built-up areas.
* `TUNNEL`: Roads in tunnels.
* `BRIDGE`: Roads on bridges.
* `TAX`: Roads submitted to government tax (like German MAUT, etc.).
* `CARPOOL`: Roads reserved to carpooling.

Available values of routingPonderationType:
* `ALL`: Speed ponderations apply to route calculation and to route ETA.
* `CAL`: Speed ponderations apply only to route calculation.
* `ETA`: Speed ponderations apply only to route ETA.

Format:
* URL format `&pr=[factor],[routingRoadAttribute],[routingPonderationType]`.
* URL example `&pr=0.1,TOLL_ROAD,CAL`.
 
##### __rb__: List of road blocks. Specifies a location where route must not go through. As many road blocks as desired can be set. A ponderation can be set to define that location is not blocked but average speed is slow down on that location. For instance, a ponderation of 0.4 means that average speed is 40% of the usual average speed.
This parameter can be repeated.
This parameter is comma-separated list, see below the details of parameter format in order of fields value:
1. longitude: longitude in degrees ([WGS84](index.html#page-glossary-coordinate_system.md)).
2. latitude: latitude in degrees ([WGS84](index.html#page-glossary-coordinate_system.md)).
3. ponderation: The average speed ponderation in [0-255] of this location (0 will close the
4. uniDirectional: If true, this road block will only apply in direction defined by a heading (optional).
5. heading: Heading in degrees (optional).
6. ponderationType: Defines if ponderation should be used for route calculation and/or for route time estimation (ETA) (default = ALL).

Available values of ponderationType:
* `ALL`: Speed ponderations apply to route calculation and to route ETA.
* `CAL`: Speed ponderations apply only to route calculation.
* `ETA`: Speed ponderations apply only to route ETA.

Format:
* URL format `&rb=[longitude],[latitude],[ponderation],[uniDirectional],[heading],[ponderationType]`.
* URL example `&rb=7.41537,43.73169,0,true,320,ALL`.

##### __sp__: Defines a new speed ponderation factor for the specified road network level.
Note: since road attributes are non exclusive, ponderations are cumulated. They are also cumulated with ponderations defined on road levels and types.
This parameter can be repeated.
This parameter is comma-separated list, see below the details of parameter format in order of fields value:
1. factor: Specifies a new ponderation factor for speeds, by default is `1`. A value under `0` to reduce the speed, i.g: `0.8`. A value upper to `1` for increase the speed, i.g: `1.3`.
2. level: Road network level (`0`: all 4 levels, `1`: main level, `2`: secondary level, `3`: third level, `4`: fourth level).
3. routingRoadType: Define the road type.
4. routingPonderationType: Define the ponderation type.

Available values of routingRoadType:
* ALL: All road network.
* DEFAULT: Default type of roads.
* FERRY: Ferries way.
* MOTORWAY: Motor-way.
* PEDESTRIAN: Pedestrian.
* ROUNDABOUNT: Roundabout.
* SLIPROAD: Slip road.

Available values of routingPonderationType:
* ALL: Speed ponderations apply to route calculation and to route ETA.
* CAL: Speed ponderations apply only to route calculation.
* ETA: Speed ponderations apply only to route ETA.

Format:
* URL format `&sp=[factor],[level],[routingRoadType],[routingPonderationType]`.
* URL example `&sp=1,1,ALL,CAL&sp=0.7,2,ALL,CAL&sp=0.3,3,ALL,CAL&sp=0.1,4,ALL,CAL`.

##### <s> __*speed*__ </s>: (Deprecated) Specifies a maximum speed for vehicles in range between `0` to `115` (km/h). Deprecated field, see `maxSpeed` field.

##### <s> __*speedType*__ </s>: (Deprecated) Defines if max speed should be used for route calculation and/or for route time estimation (ETA). Deprecated field, see `maxSpeed` field.
* By default is `ALL`.
* Available values:
 * `ALL`: Maximum speed apply to route calculation and to route ETA.
 * `CAL`: Maximum speed apply only to route calculation.
 * `ETA`: Maximum speed apply only to route ETA.

##### __maxSpeed__: Specifies a maximum speed for vehicles in range between `0` to `115` (km/h) and defines if max speed should be used for route calculation and/or for route time estimation (ETA).
By default type is set to `ALL`.
Available values of type:
* `ALL`: Maximum speed apply to route calculation and to route ETA.
* `CAL`: Maximum speed apply only to route calculation.
* `ETA`: Maximum speed apply only to route ETA.

Format:
* URL format `&maxSpeed=[speed],[type]`.
* URL example `&maxSpeed=25,CAL`.

##### __transportType__: Define the transportation mode: Car, pedestrian, truck, etc.
* By default is `EMERGENCY`.
* Available values:
 * `PEDESTRIAN`: Pedestrian.
 * `BICYCLE`: Bicycle.
 * `MOTORCYCLE`: Motorcycle.
 * `CAR`: Passenger car, tourist car.
 * `TAXI`: Taxi.
 * `PUBLIC_BUS`: Public bus.
 * `EMERGENCY`: Emergency vehicle.
 * `DELIVERY_TRUCK`: Delivery truck.
 * `TRUCK`: Truck.
* Possible exception is `NotValidTransportTypeParameterException`.

##### __vf__: Vehicle feature is used to set the information about the vehicle.
This parameter is comma-separated list, see below the details of parameter format in order of fields value:
1. height: height of vehicle in centimeters.
2. width: width of vehicle in centimeters.
3. length: length of vehicle in centimeters.
4. weight: weight of vehicle in tens of metric tons, e.i: 3.5t = `35`.
5. axleWeight: axle weight in tens of metric tons, e.i: 1.2t = `12`.
6. hazardousMaterials: (optional) hazardous materials carried by the vehicle. See the available values below.
7. tollTransportCategory: (optional) vehicle category of toll. See the available values below.
8. caravan: (optional) defines if trailer is a caravan. Available values are `UNDEFINED`, `YES` and `NO`.
9. hybrid: (optional) defines if vehicle is hybrid. Available values are `UNDEFINED`, `YES` and `NO`.
10. disEquipped: (optional) defines if vehicle is equipped for disabled people. Available values are `UNDEFINED`, `YES` and `NO`.
11. pollMin: (optional) defines if vehicle has minimal pollution. Available values are `UNDEFINED`, `YES` and `NO`.
12. hov: (optional) Defines if vehicle is a High Occupancy Vehicle (US). For more details see [High occupancy vehicle lane on Wikipedia](http://en.wikipedia.org/wiki/High-occupancy_vehicle_lane). Available values are `UNDEFINED`, `YES` and `NO`.
13. cial: (optional) defines if vehicle is a commercial vehicle. Available values are `UNDEFINED`, `YES` and `NO`.
14. nbVehAxles: (optional) defines the number of axles of the vehicle.
15. nbTrailAxles: (optional) defines the number of axles of the trailer.
16. nbTires: (optional) defines the number of tires.
17. nbPassengers: (optional) defines the number of passengers.
18. vehHeight: (optional) defines vehicle's height in centimeters (use field height to define total height : vehicle + trailer).
19. trailHeight: (optional) defines trailer's height in centimeters (use field height to define total height : vehicle + trailer).
20. vehWeight: (optional) defines vehicle's weight in tens of tons (use field weight to define total weight : vehicle + trailer).
21. emissionClass: (optional) The vehicle's emission type. See the available values below. See more on [Wikipedia European emission standards](http://en.wikipedia.org/wiki/European_emission_standards).
22. nbTrailer: (optional) vehicle's number of trailers (`-1`: not defined, `0`: no trailer).
23. adrTunnelCategory: (optional) ADR tunnel category defines all supported ADR (European Agreement concerning the International Carriage of Dangerous Goods by Road) tunnel categories. 
24. onlyPhysical: (optional) Defines if vehicle's weight (weight, weight per axle and trailers) and hazardous materials (hazardous materials and ADR) should be ignored outside respectively bridges and tunnels. By default is set to false.
See the available values below.

Available values of hazardousMaterials:
* `NONE`: No hazardous material.
* `ALL`: General hazardous materials.
* `EXPLOSIVE`: Trucks with Explosive and Flammable Goods.
* `WATER`: Trucks with Goods Harmful for Water.
* `US_CORROSIVE`: (USA only) Corrosive materials (e.g., hydrochloric acid, sulfuric acid, mercury, sodium hydroxide).
* `US_EXPLOSIVES`: (USA only) Explosives (e.g., TNT, ammunition, flares, fireworks).
* `US_FLAM`: (USA only) Flammable and combustible liquids (e.g., jet fuel, gasoline, fuel oil, alcohols).
* `US_FLAM_SOL`: (USA only) Flammable solids, spontaneously combustible materials and water reactive substances (e.g., matches, white phosphorus, potassium).
* `US_GAS`: (USA only) Flammable, compressed and poisonous gases (e.g., propane, compressed oxygen, chlorine).
* `US_ORGANIC`: (USA only) Oxidizers and organic peroxides (e.g., ammonium nitrate and benzoyl peroxide).
* `US_OTHER`: (USA only) Miscellaneous hazardous materials (e.g., asbestos, dry ice, lithium batteries).
* `US_PIH`: (USA only) Poisonous inhalation hazards (PIH).
* `US_POISON`: (USA only) Poisonous (toxic) and infectious substances (e.g., cyanide, most mercury-based compounds, viruses, toxins and regulated medical waste).
* `US_RADIO_ACTIVE`: (USA only) Radioactive materials (e.g., plutonium-239 and uranium-235).
* `TUNNEL_CAT_B`: Tunnel Category B.
* `TUNNEL_CAT_B1000C`: Tunnel Category B1000C.
* `TUNNEL_CAT_BD`: Tunnel Category B/D.
* `TUNNEL_CAT_BE`: Tunnel Category B/E.
* `TUNNEL_CAT_C`: Tunnel Category C.
* `TUNNEL_CAT_C5000D`: Tunnel Category C5000D.
* `TUNNEL_CAT_CD`: Tunnel Category C/D.
* `TUNNEL_CAT_CE`: Tunnel Category C/E.
* `TUNNEL_CAT_D`: Tunnel Category D.
* `TUNNEL_CAT_DE`: Tunnel Category D/E.
* `TUNNEL_CAT_E`: Tunnel Category E.

Available values of tollTransportCategory:
* `UNDEFINED`: Undefined.
* `MOTORCYCLE`: Motorcycle.
* `AUTO`: Automobile.
* `TRUCK`: Truck.
* `MOTOR_HOME`: Motor home.
* `MINIBUS`: Mini bus.
* `BUS`: Bus.
* `SIDECAR`: Sidecar (EU only).
* `TRICYCLE`: Tricycle (EU only).
* `DLV_TRUCK`: Delivery truck (EU only).
* `SNOWMOBILE`: Snowmobile (US only).
* `PICK_UP`: Pick up (US only).
* `TRACTOR`: Tractor (US only).

Available values of emissionClass:
* `UNDEFINED`: Undefined.
* `EURO1`: EURO I.
* `EURO2`: EURO II.
* `EURO3`: EURO III.
* `EURO4`: EURO IV.
* `EURO5`: EURO V.
* `EURO6`: EURO VI.
* `EURO_EEV`: EURO EEV.
* `ELECTRIC`: EURO Electric.

Available values of adrTunnelCategory:
* `NONE`: No tunnel category restriction (category A).
* `CAT_B`: Tunnel Category B.
* `CAT_C`: Tunnel Category C.
* `CAT_D`: Tunnel Category D.
* `CAT_E`: Tunnel Category E.

Format:
* URL format `&vf=height,width,length,weight,axleWeight,hazardousMaterials,tollTransportCategory,caravan,hybrid,disEquipped,pollMin,hov,cial,nbVehAxles,nbTrailAxles,nbTires,nbPassengers,vehHeight,trailHeight,vehWeight,emissionClass,nbTrailer,adrTunnelCategory`.
* URL example `&vf=380,240,1875,35,10,NONE`.
* URL complex example `&vf=334,249,660,38,19,NONE,TRUCK,UNDEFINED,UNDEFINED,UNDEFINED,UNDEFINED,UNDEFINED,UNDEFINED,2,0,0,0,0,0,0,EURO3,1,NONE`.
* Possible exception is `NotValidVehicleProfileParameterException`.

##### __xslt__: Add xml-stylesheet element in the header of generated XML. e.i. `<?xml-stylesheet type="text/xsl" href="/bgis/html/clt-api/xslt/en/routing.xsl"?>`.



### Response

#### Details of fields
Please, find the details of fields response on the [dedicated page](index.html#subpage-rest_0_9_0-routing-bnd-response.md).


#### Response samples

XML Sample:
```
{"bemap":{"language":"xml"}}
<?xml version="1.0" encoding="UTF-8"?>
<BND action="traceRoute" version="1.0.0">
	<UsedDestinations count="19">
		<UsedDestination used="true" usedOrder="0" usedX="7.41888" usedY="43.73252" confidenceValue="0.07769784172661873" inputOrder="0" x="7.41888" y="43.73252" heading="0.0" speed="0.0" radius="0" distanceFromRequest="0.0" distanceUnity="m" polylineIndex="0">
		</UsedDestination>

. . .
		
		<UsedDestination used="true" usedOrder="18" usedX="7.41461" usedY="43.73224" confidenceValue="0.11669367909238247" inputOrder="18" x="7.41461" y="43.73224" heading="0.0" speed="0.0" radius="0" distanceFromRequest="0.0" distanceUnity="m" polylineIndex="25" length="564" duration="85">
		</UsedDestination>
	</UsedDestinations>
	<Routes count="1">
		<Route>
			<Length unity="m">564</Length>
			<Duration unity="second">85</Duration>
			<AverageSpeed>23.887058</AverageSpeed>
			<MaximumSpeed>0.0</MaximumSpeed>
			<StartUTurnThreshold>3000</StartUTurnThreshold>
			<StartStopInfo distanceUnity="m" startX="7.41888" startY="43.73252" stopX="7.41461" stopY="43.73224" distanceFirstMatched="0.0" distanceLastMatched="0.0"/>
			<Instructions>
				<Instruction type="FOLLOW" geoElementType="ROAD">
					<Coordinate x="7.41806" y="43.73272" />
					<Duration unity="second">13</Duration>
					<FromName>AVENUE PRINCE PIERRE</FromName>
					<Length unity="m">70</Length>
					<Manoeuvre>LEFT</Manoeuvre>
					<ToName>RUE DE LA COLLE</ToName>
					<ToOn>RUE DE LA COLLE</ToOn>
					<ToRn/>
					<ToSi/>
					<PolylineIndex>1</PolylineIndex>
				</Instruction>

. . .

				<Instruction type="STOP" geoElementType="ROAD">
					<Coordinate x="7.41461" y="43.73224" />
					<Duration unity="second">10</Duration>
					<FromName>TUNNEL RAINIER III</FromName>
					<Length unity="m">144</Length>
					<Manoeuvre>STRAIGHT</Manoeuvre>
					<ToName/>
					<ToOn/>
					<ToRn/>
					<ToSi/>
				</Instruction>
			</Instructions>
			<BoundingBox minX="7.41461" minY="43.73133" maxX="7.41888" maxY="43.73272" />
			<Polyline points="26">
				<![CDATA[7.41888,43.73252 7.41806,43.73272 7.418,43.73258 7.41781,43.73234 7.41761,43.73205 7.41753,43.73195 7.41745,43.73183 7.4174,43.73179 7.4173,43.73165 7.41722,43.73164 7.41716,43.73174 7.41697,43.73208 7.417,43.73212 7.41701,43.73215 7.41697,43.73221 7.41692,43.73223 7.41685,43.73223 7.4168,43.73221 7.41678,43.73217 7.4168,43.7321 7.41639,43.7317 7.41588,43.73133 7.41568,43.73146 7.41537,43.73169 7.41516,43.73184 7.41461,43.73224 ]]>
			</Polyline>
		</Route>
	</Routes>
</BND>
```

JSON Sample:
```
{"bemap":{"language":"javascript"}}
{
	"BND": {
		"action": "traceRoute",
		"version": "1.0.0",
		"UsedDestinations": {
			"count": 19,
			"UsedDestination": [{
					"used": "true",
					"usedOrder": 0,
					"usedX": 7.41888,
					"usedY": 43.73252,
					"confidenceValue": 0.07769784172661873,
					"inputOrder": 0,
					"x": 7.41888,
					"y": 43.73252,
					"heading": 0.0,
					"speed": 0.0,
					"distanceFromRequest": 0.0,
					"distanceUnity": "m",
					"polylineIndex": 0
				},
. . .
				 {
					"used": "true",
					"usedOrder": 18,
					"usedX": 7.41461,
					"usedY": 43.73224,
					"confidenceValue": 0.11669367909238247,
					"inputOrder": 18,
					"x": 7.41461,
					"y": 43.73224,
					"heading": 0.0,
					"speed": 0.0,
					"distanceFromRequest": 0.0,
					"distanceUnity": "m",
					"polylineIndex": 25,
					"length": 564,
					"duration": 85
				}
			]
		},
		"Routes": {
			"count": 1,
			"Route": [{
					"Length": {
						"unity": "m",
						"value": 564
					},
					"Duration": {
						"unity": "second",
						"value": 85
					},
					"AverageSpeed": 23.887058,
					"MaximumSpeed": 0.0,
					"StartUTurnThreshold": 3000,
					"StartStopInfo": {
						"distanceUnity": "m",
						"startX": "7.41888",
						"startY": "43.73252",
						"stopX": "7.41461",
						"stopY": "43.73224",
						"distanceFirstMatched": "0.0",
						"distanceLastMatched": "0.0"
					},
					"Instructions": {
						"Instruction": [{
								"type": "FOLLOW",
								"geoElementType": "ROAD",
								"Coordinate": {
									"x": 7.41806,
									"y": 43.73272
								},
								"Duration": {
									"unity": "second",
									"value": 13
								},
								"Manoeuvre": "AVENUE PRINCE PIERRE",
								"Length": {
									"unity": "m",
									"value": 70
								},
								"Manoeuvre": "LEFT",
								"ToName": "RUE DE LA COLLE",
								"ToOn": "RUE DE LA COLLE",
								"ToRn": "",
								"ToSi": "",
								"PolylineIndex": 1
							},
. . .
							 {
								"type": "STOP",
								"geoElementType": "ROAD",
								"Coordinate": {
									"x": 7.41461,
									"y": 43.73224
								},
								"Duration": {
									"unity": "second",
									"value": 10
								},
								"Manoeuvre": "TUNNEL RAINIER III",
								"Length": {
									"unity": "m",
									"value": 144
								},
								"Manoeuvre": "STRAIGHT",
								"ToName": "",
								"ToOn": "",
								"ToRn": "",
								"ToSi": ""
							}
						]
					},
					"BoundingBox": {
						"minX": 7.41461,
						"minY": 43.73133,
						"maxX": 7.41888,
						"maxY": 43.73272
					},
					"Polyline": {
						"points": 26,
						"Line": [{
								"X": 7.41888,
								"Y": 43.73252
							}, {
								"X": 7.41806,
								"Y": 43.73272
							}, {
								"X": 7.418,
								"Y": 43.73258
							}, {
								"X": 7.41781,
								"Y": 43.73234
							}, {
								"X": 7.41761,
								"Y": 43.73205
							}, {
								"X": 7.41753,
								"Y": 43.73195
							}, {
								"X": 7.41745,
								"Y": 43.73183
							}, {
								"X": 7.4174,
								"Y": 43.73179
							}, {
								"X": 7.4173,
								"Y": 43.73165
							}, {
								"X": 7.41722,
								"Y": 43.73164
							}, {
								"X": 7.41716,
								"Y": 43.73174
							}, {
								"X": 7.41697,
								"Y": 43.73208
							}, {
								"X": 7.417,
								"Y": 43.73212
							}, {
								"X": 7.41701,
								"Y": 43.73215
							}, {
								"X": 7.41697,
								"Y": 43.73221
							}, {
								"X": 7.41692,
								"Y": 43.73223
							}, {
								"X": 7.41685,
								"Y": 43.73223
							}, {
								"X": 7.4168,
								"Y": 43.73221
							}, {
								"X": 7.41678,
								"Y": 43.73217
							}, {
								"X": 7.4168,
								"Y": 43.7321
							}, {
								"X": 7.41639,
								"Y": 43.7317
							}, {
								"X": 7.41588,
								"Y": 43.73133
							}, {
								"X": 7.41568,
								"Y": 43.73146
							}, {
								"X": 7.41537,
								"Y": 43.73169
							}, {
								"X": 7.41516,
								"Y": 43.73184
							}, {
								"X": 7.41461,
								"Y": 43.73224
							}
						]
					}
				}
			]
		}
	}
}
```
