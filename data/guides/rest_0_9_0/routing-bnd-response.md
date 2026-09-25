# REST API, BND version 0.9 (Deprecate see API v1.x)


## Response of Routing or TraceRoute services
Result of routing computations through an inter-connected road network.

### Summary
1. Response
 1. Details of fields
 2. Response samples

### Response
All coordinates are defined by longitude and latitude, see the [coordinate system](index.html#page-glossary-coordinate_system.md) glossary for more details.

#### Details of fields


##### __BND__: Header of BND format response.
* action: performed action (the name of called service).
* version: version of protocol used.

##### __UsedDestinations__: List of destinations are used by the routing calculation to found the route(s).
* count: number of used destinations.

##### __UsedDestination__: Destination used by the routing calculation to found the route.
* used: if the coordinate is used in the routing calculation or not. Available values are `true` and `false`.
* usedOrder: order used by the routing calculation.
* usedX: longitude coordinate of road match performed by the reverse-geocoding to snap the input coordinate to the road.
* usedY: latitude coordinate of road match performed by the reverse-geocoding to snap the input coordinate to the road.
* confidenceValue: confidence value of road match performed by the reverse geocoding to snap the input coordinate to the road.
* inputOrder: Order number of input coordinates (`xy` parameters).
* x: longitude coordinate of input (`xy` parameters).
* y: latitude coordinate of input (`xy` parameters).
* z: altitude in meters of input (`xy` parameters).
* zIsSet: set to true if the altitude is used.
* heading: heading angle in degrees . For BeNomad engine: If the angle is not available, set this field and speed field to `0`.
* headingIsSet: set to true if the heading is used.
* speed: speed in km/h. For BeNomad engine: Use this field only if the heading is available.
* speedIsSet: set to true if the speed is used.
* time: GPS time in milliseconds.
* sat: number of satellite available.
* radius: radius (in meters) of the waypoint.
* ignorePoint: set to true if this waypoint is ignored by the planner for its route calculation.
* ignoreTrafficDirections: set to true if traffic directions should be ignored by route planner between this waypoint and next one.
* ignoreRoadBlocks: set to true if road blocks should be ignored by route planner between this waypoint and next one.
* ignoreRestrictions: set to true if forbidden maneuvers and blocked passages should be ignored by route planner between this waypoint and next one.
* avoidUTurn: set to true if a UTurn should be avoided (if possible) by route planner at this location.
* useStartAngle: set to true if true and location is on is on a 2 way road, location's angle will be used as a general direction for departure from location.
* useStopRoadSide: set to true if route planner must arrive on this waypoint on waypoint's side (if waypoint is on a 2 way road).
* mandatory: set to true if mandatory is set to true, the coordinate will be kept in the way-points response array.
* distanceFromRequest: distance in meters from the input coordinate (if available).
* distanceUnity: measure unit of distanceFromRequest field. By default `m` (meters).
* polylineIndex: index of the coordinate returned in the table of polyline coordinates (if available). See `POLYLINE` and `POLYLINE_INDEX` options.
* length: length in meters from start point of the used destination (`xy` parameter).
* duration: duration time (ETA) in second from start point of the used destination (`xy` parameter).
* exceptionMessage: exception message returned for this destination (`xy` parameter).
* customData: Data passed in input.

##### __Routes__: List of routes.
* count: number of routes.

##### __Route__: Route found.
* exceptionMessage: error message returned when the route is not feasible.
* Length: length of route in meters.
* Duration: duration of travel in seconds.
* TrafficDelay: delay in seconds due to real time traffic and speed patterns. Takes into account ETA speed ponderations and vehicle's maximum speed.
 * unity: measure unit, by default `second`.
* AverageSpeed: average speed in km/h.
* MaximumSpeed: maximum speed in km/h.
* StartUTurnThreshold: threshold of start U-Turn parameter (used by BeNomad embedded device).
* EnergyConsumption: energy needed to travel route, in kilos Watt per hour.
 * unity: measure unit, by default `kWh` (kilos Watt per hour).

##### __StartStopInfo__: Information about the start and stop coordinates of a route found by the routing calculation.
* distanceUnity: measure unit, by default `m` (meters).
* startX: longitude in degrees of start route found by the routing calculation. 
* startY: latitude in degrees of start route found by the routing calculation. 
* stopX: longitude in degrees of end route found by the routing calculation.
* stopY: latitude in degrees of end route found by the routing calculation.
* distanceFirstMatched: distance between first matched coordinate and the start point of route found by the routing calculation.
* distanceLastMatched: distance between last matched coordinate and the end point of route found by the routing calculation.

##### __TollCost__: Toll cost data.

##### __TollCost__ -> __Tolls__: List of toll.
* count: number of tool.

##### __TollCost__ -> __Tolls__ -> __Toll__: Tool found on the route.
* type: type of toll. Available values:
 * `TOLL_FIXED_FEE`: Fixed fee (does not depend of origin).
 * `TOLL_OBTAIN_TICKET`: Obtain ticket (no fee).
 * `TOLL_PAY_PER_TICKET`: Pay per ticket (depends of origin).
 * `TOLL_ELECTRONIC`: Electronic.
* polylineIndex: index of polyline coordinate.

##### __TollCost__ -> __Tolls__ -> __Toll__ -> __Coordinate__: Coordinate of toll.
* x: longitude in degrees [WGS84](index.html#page-glossary-coordinate_system.md).
* y: latitude in degrees [WGS84](index.html#page-glossary-coordinate_system.md).

##### __TollCost__ -> __Tolls__ -> __Toll__ -> __MeanOfPayments__: List of mean of payment.
Comma-separated list. Available values:
* `PAYMENT_CASH`: Cash.
* `PAYMENT_BANK_CARD`: Bank card.
* `PAYMENT_CREDIT_CARD`: Credit card.
* `PAYMENT_PASS_SUBSCRIPTION`: Pass or subscription.
* `PAYMENT_TRANSPONDER`: Transponder.
* `PAYMENT_VIDEO_TOLL_CHARGE`: Video toll charge.
* `PAYMENT_EXACT_CASH`: Exact cash.
* `PAYMENT_TRAVEL_CARD`:Travel card.

##### __TollCost__ -> __Tolls__ -> __Toll__ -> __TollCharges__: List of toll charge.
* count: number of tool charge for a tool.

##### __TollCost__ -> __Tolls__ -> __Toll__ -> __TollCharges__ -> __TollCharge__: Toll charge.
* category: a textual definition of vehicle category.
* currency: currency in norm ISO 4217, more details on Wikipedia [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217).
* price: price.

##### __TollCost__ -> __SumFees__: List of sum fees.
* count : number of sum fee.

##### __TollCost__ -> __SumFees__ -> __SumFee__: Sum fee.
The minimum and maximum fee values depends on the vehicle feature parameter (`vf`).
* currency: currency in norm ISO 4217, more details on Wikipedia [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217).
* feeMin: minimum fee.
* feeMax: maximum fee.

##### __TaxCost__: Tax cost data.

##### __TaxCost__ -> __TaxSections__: List of tax section.
* count: number of tax section.

##### __TaxCost__ -> __TaxSection__: Tax section.
* countryCode: ISO country code.
* category: category of tax. Available values:
 * `TAX_CATEGORY_NONE`: No tax.
 * `TAX_CATEGORY_1`: Tax category 1.
 * `TAX_CATEGORY_2`: Tax category 2.
 * `TAX_CATEGORY_3`: Tax category 3.
* firstPolylineIndex: first coordinate index of polyline.
* lastPolylineIndex: last coordinate index of polyline.
* length: length of section in meters.
* lengthUnity: measure unit of `length` field, by default `m` (meters).

##### __TaxCost__ -> __TaxSection__ -> __MeanOfPayments__: List of mean of payment.
Comma-separated list. Available values:
* `PAYMENT_CASH`: Cash.
* `PAYMENT_BANK_CARD`: Bank card.
* `PAYMENT_CREDIT_CARD`: Credit card.
* `PAYMENT_PASS_SUBSCRIPTION`: Pass or subscription.
* `PAYMENT_TRANSPONDER`: Transponder.
* `PAYMENT_VIDEO_TOLL_CHARGE`: Video toll charge.
* `PAYMENT_EXACT_CASH`: Exact cash.
* `PAYMENT_TRAVEL_CARD`:Travel card.

##### __TaxCost__ -> __TaxSection__ -> __TaxCharges__: List of tax charge.
* count: number of tax charge.

##### __TaxCost__ -> __TaxSection__ -> __TaxCharges__ -> __TaxCharge__: Tax charge.
* category: textual definition of vehicle category.
* currency: currency in norm ISO 4217, more details on Wikipedia [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217).
* price: price.

##### __TaxCost__ -> __SumFees__: List of sum fees.
* count : number of sum fee.

##### __TaxCost__ -> __SumFees__ -> __SumFee__: Sum fee.
The minimum and maximum fee values depends on the vehicle feature parameter (`vf`).
* currency: currency in norm ISO 4217, more details on Wikipedia [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217).
* feeMin: minimum fee.
* feeMax: maximum fee.


##### __Instructions__: List of route sheet instruction.

##### __Instruction__: Instruction of route sheet.
* type: instruction code. Available values:
 * `FOLLOW`: Follow.
 * `FOLLOW_SIGN`: Follow sign.
 * `TAKE_RAMP`: Take ramp.
 * `ENTER_MOTORWAY`: Enter to motor-way.
 * `EXIT_MOTORWAY`: Exit from motor-way.
 * `ENTER_ROUNDABOUT`: Enter to the roundabout.
 * `EXIT_ROUNDABOUT`: Exit from roundabout.
 * `TAKE_FERRY`: Take ferry.
 * `LEAVE_FERRY`: Leave ferry.
 * `STOP_VIA`: Stop on via destination.
 * `STOP`: Stop.
* geoElementType: type of geometry on the instruction is apllied.
 * `PEDESTRIAN`: pedestrian path.
 * `ROUNDABOUT`: roundabout.
 * `SLIP_ROAD`: slip-road.
 * `ROAD`: road.
 * `MOTORWAY`: motor-way.
 * `FERRY`: ferry way.

##### __Instruction__ -> __Coordinate__: Coordinate of instruction.
* x: longitude in degrees [WGS84](index.html#page-glossary-coordinate_system.md).
* y: latitude in degrees [WGS84](index.html#page-glossary-coordinate_system.md).

##### __Instruction__ -> __Duration__: Time of current road section in seconds.
* unity: measure unit, by default `second`.

##### __Instruction__ -> __Length__: Length of current road section in meters.
* unity: measure unit, by default `m` (meters).

##### __Instruction__ -> __FromName__: Name of current road section.

##### __Instruction__ -> __Manoeuvre__: Direction to follow.
Available values:
* `STRAIGHT`: Straight. -PI/9 <= a <= PI/9, a = angle with azimuth.
* `SLIGHT_LEFT`: Slight left. PI/9 < a <= PI/3, a = angle with azimuth.
* `LEFT: Left`. PI/3 < a < 2*PI/3, a = angle with azimuth.
* `SHARP_LEFT`: Sharp left. 2*PI/3 <= a < 14*PI/15, a = angle with azimuth.
* `U_TURN`: U-Turn. a >= 14*PI/15 or a <= -14*PI/15, a = angle with azimuth.
* `SHARP_RIGHT`: Sharp right. -14*PI/15 < a <= -2*PI/3, a = angle with azimuth.
* `RIGHT`: Right. -2*PI/3 < a < -PI/3, a = angle with azimuth.
* `SLIGHT_RIGHT`: Slight right. -PI/3 <= a < -PI/9, a = angle with azimuth.
* `BEAR_LEFT`: Bear left.
* `BEAR_RIGHT`: Bear right.

##### __Instruction__ -> __RoundAboutExitNumber__: Exit number of a roundabout.

##### __Instruction__ -> __ToName__: Name of the next road section (or name of sign post to follow).

##### __Instruction__ -> __ToOn__: Official Name of next route section (in specified language code if available).

##### __Instruction__ -> __ToRn__: Route Number of next route section.

##### __Instruction__ -> __ToSi__: Sign post to follow.

##### __Instruction__ -> __FromPhoneme__: Phonetic transcription of the name of current route section.

##### __Instruction__ -> __ToOnPhoneme__: Phonetic transcription of the official name of next route section.

##### __Instruction__ -> __ToPhoneme__: Phonetic transcription of the next route section (or sign post to follow).

##### __Instruction__ -> __ToRnPhoneme__: Phonetic transcription of the route number of next route section.

##### __Instruction__ -> __ToSiPhoneme__: Phonetic transcription of sign post to follow.

##### __Instruction__ -> __TextDist__: Distance instruction in human readable format can be used with text-to-speech.

##### __Instruction__ -> __Text__: Instruction in human readable format can be used with text-to-speech.

##### __Instruction__ -> __PolylineIndex__: Index in route polyline's points array of first form of this instruction.

##### __BoundingBox__: The bounding box of route (geometry).
Coordinates are in in [WGS84](index.html#page-glossary-coordinate_system.md).
The bounding box contains a couple of coordinates that represent the bottom left corn and the top right corn:
* minX: minimal value of longitude (X axis).
* minY: minimal value of latitude (Y axis).
* maxX: maximal value of longitude (X axis).
* maxY: maximal value of latitude (Y axis).


##### __Corridor__: Corridor around the route (geometry).
The corridor can be composed of several polygons, the first is the main geometry of the corridor. the next is the extrusion hole.

##### __CorridorPolygon__: Geometry of the route corridor.
In XML output is a string contains a list of coordinates in [WGS84](index.html#page-glossary-coordinate_system.md) format.
 * points: number of coordinate.

In JSON output is an array of coordinate of polyline.
 * points: number of coordinate.
 * Polygon:
  * X: longitude in degrees [WGS84](index.html#page-glossary-coordinate_system.md).
  * Y: latitude in degrees [WGS84](index.html#page-glossary-coordinate_system.md).

##### __GeoFencing__: Result of geo-fencing tests.

##### __GeoFencing__ -> __Fence__: Fence compared.
* id: unique identification number of the fence. By default the value is a number auto-incremented in order of the `fence` input parameters.
* type: type of geometry. Available values `CIRCLE`, `POLYGON`.
* timestampUnity: measure unit, by default `ms` (milliseconds).

##### __GeoFencing__ -> __CircleShape__: Circle geometry information of fence.
* longitude: longitude of center of circle ([WGS84](index.html#page-glossary-coordinate_system.md)).
* latitude:	latitude of center of circle ([WGS84](index.html#page-glossary-coordinate_system.md)).
* radius: radius of circle in meter.
* radiusUnity: measure unit, by default `m` (metters).

##### __GeoFencing__ -> __PolygonShape__: Polygon geometry of fence.
* points: number of vertex coordinate.
* x: longitude [WGS84](index.html#page-glossary-coordinate_system.md).
* y: latitude [WGS84](index.html#page-glossary-coordinate_system.md).

##### __GeoFencing__ -> __Intersection__: Intersection between the route and fence.
* state: Defines position state of tested coordinate on the fence geometry.
* longitude: longitude of intersection [WGS84](index.html#page-glossary-coordinate_system.md).
* latitude: latitude of intersection [WGS84](index.html#page-glossary-coordinate_system.md).
* timestamp: The estimated time stamp of this intersection in milliseconds.

##### __Polyline__: Geometry of route.
In XML output is a string contains a list of coordinates in [WGS84](index.html#page-glossary-coordinate_system.md) format.
 * points: number of coordinate.

In JSON output is an array of coordinate of polyline.
 * Line:
  * X: longitude in degrees [WGS84](index.html#page-glossary-coordinate_system.md).
  * Y: latitude in degrees [WGS84](index.html#page-glossary-coordinate_system.md).

##### __OpenLrBase64__: Route geometry encoded as OpenLR (base64).

##### __Events__: Events on calculated route.
* count: number of event.

##### __Events__ -> __Event__:
* type: type of event. Available values:
 * `SEGMENT`: each entry values come from the road segmentation of map data.
 * `SAMPLING_TIME`: each entry values are splitter by time.
 * `SAMPLING_DISTANCE`: each entry values are splitter by distance.
* distanceUnit: measure unit of distance. By default `meters`.
* timeUnit: measure unit of time. By default `seconds`.
* makerCount: number of marker in the event.

##### __Events__ -> __Event__ -> __Marker__:
* distance: distance from start of route. By default `meters`.
* time: time between the start of route and the marker. By default `seconds`.
* percent: position of marker in percentage of route.
* longitude: longitude in degrees [WGS84](index.html#page-glossary-coordinate_system.md).
* latitude: latitude in degrees [WGS84](index.html#page-glossary-coordinate_system.md).
* altitude: altitude in meters.

##### __Events__ -> __Event__ -> __Marker__ -> __Entry__:
Common fields:
* type: type of entry value. It can be an string, integer, long, float, double, boolean or dedicated type (see below). 
* name: name of entry.

__Fields returned if some option(s) are defined in request__: 

For _event road feature_ option is set:
* maxSpeed: Speed limit in kph (`0` if not available).
* maxSpeedVerified: Max speed verified flag, `true`: verified, `false`: calculated.
* averageSpeed: Average speed in kph (`0` if not available).
* transTypSpdLimit:Speed limit in compliance with the transport type (car, truck, etc).
* freeFlowSpeed: Speed available if road have no jam or traffic.
* usedSpeed: Speed used during the calculation of route.
* usedSpeedWithoutTraffic: Speed used in calculation but without real-time traffic info.
* nbLaneNeg: Get the number of lanes in negative direction. `0` if traffic closed in negative direction or if lane information is not available.
* nbLanePos: Get the number of lanes in positive direction. `0` if traffic closed in positive direction or if lane information is not available.
* mainCategory: A flag that enables discrimination within road's of a same FCC type (depends of map provider). Possible values are `true` or `false`.
* urbanArea: Urban / not urban flag. Possible values are `true` or `false`.
* tunnel: A flag that indicates if road is part of a tunnel or not. Possible values are `true` or `false`.
* bridge: A flag that indicates if road is part of a bridge or not. Possible values are `true` or `false`.
* carPool: A flag that indicates if road is reserved to carpooling. Possible values are `true` or `false`.
* dualCarriageway: A flag that indicates if road is part of a dual carriageway (e.g. with physical separation between opposite traffic sides).
* noThroughTraffic: Get the No through traffic restriction. Available values:
 - `0` no restriction.
 - `1` restriction.
 - `2` restriction for trucks only.
* taxCategory: Indicates if road is submitted to a government tax (like German MAUT, French Ecotaxe, etc). Available values:
 - `0 means no tax.
 - `1-3` defines the tax category (country dependent).
* tollSide: Get the toll information. Available values:
 - `0` no toll.
 - `1` toll in positive direction.
 - `2` toll in negative direction
 - `3` toll in both directions.
* offRoad: Route element's is on a off-road.


For _event prohibited driving_ option is set:
* againstTrafficDir: Checks if a given route element is traveled against its traffic direction.
* prohibitedTurn: true if trespasses a turn restriction, false otherwise.
* prohibitedBlockedPassage: true if trespasses a blocked passage, false otherwise.


__For *Dedicated* type__:
Below the available types of entry and the details of fields for each type.

Type equals to `Coordinate`:
* longitude: longitude in degrees [WGS84](index.html#page-glossary-coordinate_system.md).
* latitude: latitude in degrees [WGS84](index.html#page-glossary-coordinate_system.md).
* altitude: altitude in meters.

Type equals to `SegmentInfo`:
* id: unique identifier of road segment.
* length: length in meters of road segment.
* duration: duration in seconds to travel the road segment.
* reverseDirection: route traveled in opposite way of geometry.

Type equals to `GeoElementType`:
* roadAdminLevel: administration level of road, like SECONDARY_ROAD, MAIN_ROAD, etc. Available values:
 * `MAIN_ROAD`: Main road, like motor-ways.
 * `SECONDARY_ROAD`:  Secondary road.
 * `TERTIARY_ROAD`:  Tertiary road.
 * `FOURTH_ROAD`:  Fourth road.
* geoElementType: type of geo-element, like ROUNDABOUT. Available values:
 * `PEDESTRIAN`: Pedestrian. 
 * `ROUNDABOUT`: Roundabout.
 * `SLIP_ROAD`: Slip road.
 * `ROAD`: Road.
 * `MOTORWAY`: Motor-way.
 * `FERRY`: Ferry.

Type equals to `Elevation`:
* distance : distance from start of route. By default `meters`.
* altitude: altitude at this position.
* length: Length of sub-road-segment.
* duration: Duration to travel the sub-road-segment.

Type equals to `Elevation2`:
* distance :distance from start of route. By default `meters`.
* fromAltitude: altitude at start position of sub-road-segment.
* toAltitude: altitude at end position of sub-road-segment.
* length: length of sub-road-segment.
* duration: duration to travel the sub-road-segment.

Type equals to `EnergySample`:
* acceleration: acceleration in meters per second per second.
* angle: heading in degrees.
* distFromStart: distance in meters from start point.
* slope: slope coefficient (0 = 0°, +/-0.5 = +/-30°, etc.).
* speed: speed in meters per second.
* cumulativeConsumption: cumulative consumption in Wh.
* longitude: longitude in degrees [WGS84](index.html#page-glossary-coordinate_system.md).
* latitude: latitude in degrees [WGS84](index.html#page-glossary-coordinate_system.md).
* altitude: altitude in meters.

Type equals to `Geometry` and name equals to `polyline`: Geometry of route.
A string contains a list of coordinates in [WGS84](index.html#page-glossary-coordinate_system.md) format.

Type equals to `String` and name equals to `encodedPolyline`: Geometry of route.
A string contains the [Encoded Polyline Algorithm Format](https://developers.google.com/maps/documentation/utilities/polylinealgorithm).

Type equals to `ChargingStationPool`:
* id: unique identifier.
* providerName: provider name used by BeMap (bgis).
* sourceProvider: name of the original provider.
* brand: brand of pool.
* nameOfPool: name of pool.
* siteType: type of site.
* accessibility: accessibility of pool.
* availabilityStatus: availability status.
* longitude: longitude in degrees [WGS84](index.html#page-glossary-coordinate_system.md) of entrance gateway to pool access.
* latitude: latitude in degrees [WGS84](index.html#page-glossary-coordinate_system.md) of entrance gateway to pool access.
* countryCode: ISO code of country.
* country: country name.
* state: state name.
* county: county name.
* city: city name.
* postalCode: postal code.
* district: district name of city
* roadNumber: road number.
* street: street name.
* streetNumber: house number.
* addressComplement: pool complement of address.
* floorNumber: address floor number.
* phoneNumber: phone number.
* openingHours: List of opening hours.
* connectorType: summary of connecter type, used as cache of different connector types present in pool.
* maxNominalPower: nominal power in kW.
* numberOfChargingPoint: summarized of number of charging point present in pool.
* comment: Comment.

Type equals to `ChargingStationStep`:
Same as `ChargingStationPool`, but have some extra fields described below.
* consumedFromPreviousStop: energy needed to come from the previous stop (in kWh).
* batteryChargeLevel: battery charge level (in %) of the vehicle at the given charge point.
* chargingTime: estimated charging time, based on energy vehicle profile (in seconds) or `-1` in case of error (that is, if battery capacity = 0, or Connector power <= 0, or Maximum charge power <= 0).

Type equals to `TollCost`:
See the `TollCost` section.

Type equals to `TaxCost`:
See the `TaxCost` section.

Type equals to `TrafficElement`:
Contains a list of `Traffic` element that are describe on [Traffic service page](index.html#subpage-rest_0_9_0-traffic-bnd.md).

Type equals to `TrafficSign`:
* text: text of the traffic sign.
* matchedCoordinate: matched coordinates of the traffic sign. See `Coordinate`.
* category: Category of traffic sign. Available values:
 * `NOT_SUPPORTED`: Impossible value 
 * `ROAD_NARROWS`: Road Narrows 
 * `SHARP_CURVE_LEFT`: Sharp Curve Left 
 * `SHARP_CURVE_RIGHT`: Sharp Curve Right 
 * `WINDING_RD_LEFT`: Winding Road starting Left 
 * `WINDING_RD_RIGHT`: Winding Road starting Right 
 * `STEEP_HILL_UP`: Steep Hill Upwards 
 * `STEEP_HILL_DOWN`: Steep Hill Downwards 
 * `LATERAL_WIND`: Lateral Wind 
 * `GENERAL_WARNING`: General Warning 
 * `RISK_OF_GROUNDING`: Risk of Grounding 
 * `GENERAL_CURVE`: General Curve 
 * `GENERAL_HILL`: General Hill 
 * `OBJECT_OVERHANG`: Object Overhang 
 * `ST_NO_OVERTAKING`: Start of No Overtaking 
 * `END_NO_OVERTAKING`: End of No Overtaking 
 * `PR_OVERTAKING_EL`: Protected Overtaking - Extra Lane 
 * `PR_OVERTAKING_ELR`: Protected Overtaking - Extra Lane Right Side 
 * `PR_OVERTAKING_ELL`: Protected Overtaking - Extra Lane Left Side 
 * `LANE_MERGE_RIGHT`: Lane Merge Right 
 * `LANE_MERGE_LEFT`: Lane Merge Left 
 * `LANE_MERGE_CENTER`: Lane Merge Center 
 * `RAILWAY_CROSS_PR`: Railway Crossing Protected 
 * `RAILWAY_CROSS_UNPR`: Railway Crossing Unprotected 
 * `ST_NO_OVERTAKING_TRUCKS`: Start of No Overtaking Trucks 
 * `END_NO_OVERTAKING_TRUCKS`: End of No Overtaking Trucks 
 * `STOP`: Stop Sign 
 * `END_OF_ALL_RESTRICTIONS`: End of All Restrictions 
 * `ANIMAL_CROSSING`: Animal Crossing 
 * `ICY_CONDITIONS`: Icy Conditions 
 * `SLIPPERY_ROAD`: Slippery Road 
 * `FALLING_ROCKS`: Falling Rocks 
 * `SCHOOL_ZONE`: School Zone 
 * `TRAMWAY_CROSSING`: Tramway Crossing 
 * `CONGESTION_HAZARD`: Congestion Hazard 
 * `ACCIDENT_HAZARD`: Accident Hazard 
 * `PRIORITY_ONCOMING`: Priority Over Oncoming Traffic 
 * `YIELD_ONCOMING`: Yield to Oncoming Traffic 
 * `RIGHT_PRIORITY`: Crossing with Priority from the Right 
 * `PEDESTRIAN_CROSSING`: Pedestrian Crossing 
 * `YIELD`: Yield 
 * `NO_ENGINE_BRAKE`: No Engine Brake 
 * `ENDOF_NO_ENGINE_BRAKE`: End of No Engine Brake 
 * `NO_IDLING`: No Idling 
 * `TRUCK_ROLLOVER`: Truck Rollover 
 * `LOW_GEAR`: Low Gear 
 * `ENDOF_LOW_GEAR`: End of Low Gear 
 * `LIGHT`: Traffic Light (aka Traffic Signal) 
 * `DOUBLE_HAIRPIN`: Double Hairpin 
 * `TRIPLE_HAIRPIN`: Triple Hairpin 
 * `TWO_WAY_TRAFFIC`: Two-way Traffic 
 * `URBAN_AREA`: Urban Area 
 * `HUMP_BRIDGE`: Hump Bridge 
 * `UNEVEN_ROAD`: Uneven Road 
 * `BICYCLE_CROSSING`: Bicycle Crossing 
 * `YIELD_TO_BICYCLES`: Yield to Bicycles 
 * `NO_TOWED_CARAVAN`: No towed caravan allowed 
 * `NO_TOWED_TRAILER`: No towed trailer allowed 
 * `NO_CAMPER`: No camper or motorhome allowed 
 * `NO_TURN_ON_RED`: No turn on red 
 * `TURN_ON_RED`: Turn on red permitted 
 * `EMBANKMENT`: Embankment 
 * `FLOOD_AREA`: Flood area 
 * `OBSTACLE`: Obstacle 
 * `ROAD_SPLIT`: Road split
 ROAD_SPLIT(TrafficSign.TS_ROAD_SPLIT);
 
Type equals to `Routesheet`:
Contains the route-sheet instruction. See the previous chapter of `Instructions (List of route sheet instruction)`.

##### __DetailedPolylines__: Geometry of route with information. The route geometry is divided in sub sections.
This feature will be deprecated and replaced by the `Events` structure.
* polylines: number of polyline.

##### __DetailedPolylines__ -> __DetailedPolyline__: The route geometry with information.
* length: Length of rout segment in meters.
* lengthUnity: Measure unit, by default `m`.
* data: information about the route segment.
* points: number of coordinate that compose the polyline.

In XML output is a string contains a list of coordinates in [WGS84](index.html#page-glossary-coordinate_system.md) format.
 * points: number of coordinate.

In JSON output is an array of coordinate of polyline.
 * Line:
  * X: longitude in degrees [WGS84](index.html#page-glossary-coordinate_system.md).
  * Y: latitude in degrees [WGS84](index.html#page-glossary-coordinate_system.md).

##### __SegmentIds__: Segment IDs of route.
points: number of ID.

In XML output is a string contains a list of ID.

In JSON output is an array of ID.
 * Ids: array of ID.

##### __RoadSegments__: List of road segment.
* elements: number of `RoadSegment` element.
* durationUnity: measure unit, by default `second`.

##### __RoadSegments__ -> __RoadSegment__: Road segment.
* countryCode: ISO country code.
* id: ID of road segment. `-1` if information is not available.
* reverseDirection: `true` if this segment has been reversed, `false` otherwise.
* from: Coordinate of first point.
* to: Coordinate of last point.
* duration:  the duration in seconds to travel through this route segment. `-1` if information is not available.
* weight: the weight in seconds or meters to travel through this route, used by isochrone calculation. `-1` if information is not available.

##### __JunctionNodes__: List of junction node.
In XML output is a string contains a list of coordinates in [WGS84](index.html#page-glossary-coordinate_system.md) format.
 * points: number of junction node.

In JSON output is an array of coordinate of polyline.
 * points: number of junction node.
 * Line:
  * X: longitude in degrees [WGS84](index.html#page-glossary-coordinate_system.md).
  * Y: latitude in degrees [WGS84](index.html#page-glossary-coordinate_system.md).

##### __Waypoints__: List of way-point.
* points: number of way-point.

##### __Waypoints__ -> __Waypoint__: Way-point.
* usedDestinationIndex: The index of the used destinations (destinations). `-1` if not available.
* polylineIndex: The index of the waypoint polyline. `-1` if not available.
* longitude: longitude of way-point in degrees [WGS84](index.html#page-glossary-coordinate_system.md).
* latitude: latitude of way-point in degrees [WGS84](index.html#page-glossary-coordinate_system.md).
* angle: Angle in degrees of the road segment (clock-wise).
* radius: Radius in meters of the way-point.
* <s>*offRoadIndex*</s>: (deprecated) set to `-1`. Replaced by the sub structure `OffRoad`.
* uturn: set to `true` if a UTurn is done on this via point. Available values are `true` and `false`.
* ignorePoint: set to `true` if this waypoint is ignored by the planner for its route calculation. Available values are `true` and `false`.
* ignoreTrafficDirections: set to `true` if traffic directions should be ignored by route planner between this waypoint and next one. Available values are `true` and `false`.
* ignoreRoadBlocks: set to `true` if road blocks should be ignored by route planner between this waypoint and next one. Available values are `true` and `false`.
* ignoreRestrictions: set to `true` if forbidden manoeuvres and blocked passages should be ignored by route planner between this waypoint and next one. Available values are `true` and `false`.
* avoidUTurn: set to `true` if a UTurn should be avoided (if possible) by route planner at this location. Available values are `true` and `false`.
* useStartAngle: If `true` and location is on is on a 2 way road, location's angle will be used as a general direction for departure from location. Available values are `true` and `false`.
* useStopRoadSide: set to `true` if route planner must arrive on this waypoint on waypoint's side (if waypoint is on a 2 way road). Available values are `true` and `false`.

##### __Waypoints__ -> __Waypoint__ -> __OffRoad__: Off-road, describe a geometry are not available in the map data.

##### __Waypoints__ -> __Waypoint__ -> __OffRoad__ -> __Geometry__: Geometry of the off-road.
In XML output is a string contains a list of coordinates in [WGS84](index.html#page-glossary-coordinate_system.md) format.
 * points: number of coordinate to describe the polyline of the off-road.

In JSON output is an array of coordinate of polyline.
 * points: number of coordinate to describe the polyline of the off-road.
 * Line:
  * X: longitude in degrees [WGS84](index.html#page-glossary-coordinate_system.md).
  * Y: latitude in degrees [WGS84](index.html#page-glossary-coordinate_system.md).

##### __Waypoints__ -> __Waypoint__ -> __OffRoad__ -> __Attribute__: Attribute of the off-road.
* type: Type of attribute value, see below the available values:
 * NA: Not available.
 * BOOLEAN: Boolean
 * BYTE: Byte
 * BYTES: Byte array
 * CHAR: Character
 * DOUBLE: Double
 * FLOAT: Float
 * INT: Integer
 * LONG: Long
 * STRING: String
 * KEY: Key
 * LABEL: Label
 * META: Meta data
 * UINT: Unsigned integer
* code: BeNomad Code of attribute.
* key: BeNomad key of attribute.
* value: string value of attribute.

##### __WaypointPolyline__: Way-points polyline (geometry) of route. the way-point polyline contains the coordinates of way-point element to match the index field `polylineIndex`.
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
<BND action="routing" version="1.0.0">
	<UsedDestinations count="4">
		<UsedDestination used="true" usedOrder="0" usedX="7.41059" usedY="43.73446" confidenceValue="0.26293365794278756" inputOrder="0" x="7.41059" y="43.73446" heading="0.0" speed="0.0" radius="0" distanceFromRequest="0.0" distanceUnity="m" polylineIndex="0">
		</UsedDestination>
		<UsedDestination used="true" usedOrder="1" usedX="7.15376" usedY="43.72189" confidenceValue="0.2531497216525051" inputOrder="1" x="7.15376" y="43.72189" heading="0.0" speed="0.0" radius="0" distanceFromRequest="0.0" distanceUnity="m" polylineIndex="869" length="42984" duration="2820">
		</UsedDestination>
		<UsedDestination used="true" usedOrder="2" usedX="7.15092" usedY="43.66244" confidenceValue="0.2166680598512079" inputOrder="2" x="7.15092" y="43.66244" heading="0.0" speed="0.0" radius="0" distanceFromRequest="0.0" distanceUnity="m" polylineIndex="1126" length="51640" duration="3670">
		</UsedDestination>
		<UsedDestination used="true" usedOrder="3" usedX="7.12901" usedY="43.62986" confidenceValue="0.18562016614150673" inputOrder="3" x="7.12901" y="43.62986" heading="0.0" speed="0.0" radius="0" distanceFromRequest="0.0" distanceUnity="m" polylineIndex="1264" length="56432" duration="4354">
		</UsedDestination>
	</UsedDestinations>
	<Routes count="1">
		<Route>
			<Length unity="m">56432</Length>
			<Duration unity="second">4354</Duration>
			<AverageSpeed>46.65944</AverageSpeed>
			<MaximumSpeed>0.0</MaximumSpeed>
			<StartUTurnThreshold>3000</StartUTurnThreshold>
			<StartStopInfo distanceUnity="m" startX="7.41059" startY="43.73446" stopX="7.12901" stopY="43.62986" distanceFirstMatched="0.0" distanceLastMatched="0.0"/>
			<Instructions>
				<Instruction type="FOLLOW" geoElementType="ROAD">
					<Coordinate x="7.41112" y="43.73244" />
					<Duration unity="second">45</Duration>
					<FromName>CHEMIN DES REVOIRES</FromName>
					<Length unity="m">244</Length>
					<Manoeuvre>LEFT</Manoeuvre>
					<ToName>CHEMIN DES REVOIRES</ToName>
					<ToOn>CHEMIN DES REVOIRES</ToOn>
					<ToRn/>
					<ToSi/>
					<PolylineIndex>11</PolylineIndex>
				</Instruction>
				<Instruction type="FOLLOW" geoElementType="ROAD">
					<Coordinate x="7.41176" y="43.73384" />
					<Duration unity="second">40</Duration>
					<FromName>CHEMIN DES REVOIRES</FromName>
					<Length unity="m">214</Length>
					<Manoeuvre>BEAR_RIGHT</Manoeuvre>
					<ToName>CHEMIN DES REVOIRES</ToName>
					<ToOn>CHEMIN DES REVOIRES</ToOn>
					<ToRn/>
					<ToSi/>
					<PolylineIndex>20</PolylineIndex>
				</Instruction>
				<Instruction type="FOLLOW" geoElementType="ROAD">
					<Coordinate x="7.12902" y="43.62986" />
					<Duration unity="second">149</Duration>
					<FromName>AVENUE DOCTEUR JULIEN LEFEBVRE</FromName>
					<Length unity="m">882</Length>
					<Manoeuvre>RIGHT</Manoeuvre>
					<ToName>AVENUE DU CASTEL</ToName>
					<ToOn>AVENUE DU CASTEL</ToOn>
					<ToRn/>
					<ToSi/>
					<PolylineIndex>1263</PolylineIndex>
				</Instruction>
				<Instruction type="STOP" geoElementType="ROAD">
					<Coordinate x="7.12901" y="43.62986" />
					<Duration unity="second">2</Duration>
					<FromName>AVENUE DU CASTEL</FromName>
					<Length unity="m">0</Length>
					<Manoeuvre>STRAIGHT</Manoeuvre>
					<ToName/>
					<ToOn/>
					<ToRn/>
					<ToSi/>
				</Instruction>
			</Instructions>
			<BoundingBox minX="7.12901" minY="43.62986" maxX="7.41278" maxY="43.74639" />
			<Polyline points="1265">
				<![CDATA[7.41059,43.73446 7.12902,43.62986 7.12901,43.62986 ]]>
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
		"action": "routing",
		"version": "1.0.0",
		"UsedDestinations": {
			"count": 4,
			"UsedDestination": [{
					"used": "true",
					"usedOrder": 0,
					"usedX": 7.41059,
					"usedY": 43.73446,
					"confidenceValue": 0.26293365794278756,
					"inputOrder": 0,
					"x": 7.41059,
					"y": 43.73446,
					"heading": 0.0,
					"speed": 0.0,
					"distanceFromRequest": 0.0,
					"distanceUnity": "m",
					"polylineIndex": 0
				}, {
					"used": "true",
					"usedOrder": 1,
					"usedX": 7.15376,
					"usedY": 43.72189,
					"confidenceValue": 0.2531497216525051,
					"inputOrder": 1,
					"x": 7.15376,
					"y": 43.72189,
					"heading": 0.0,
					"speed": 0.0,
					"distanceFromRequest": 0.0,
					"distanceUnity": "m",
					"polylineIndex": 869,
					"length": 42984,
					"duration": 2820
				}, {
					"used": "true",
					"usedOrder": 2,
					"usedX": 7.15092,
					"usedY": 43.66244,
					"confidenceValue": 0.2166680598512079,
					"inputOrder": 2,
					"x": 7.15092,
					"y": 43.66244,
					"heading": 0.0,
					"speed": 0.0,
					"distanceFromRequest": 0.0,
					"distanceUnity": "m",
					"polylineIndex": 1126,
					"length": 51640,
					"duration": 3670
				}, {
					"used": "true",
					"usedOrder": 3,
					"usedX": 7.12901,
					"usedY": 43.62986,
					"confidenceValue": 0.18562016614150673,
					"inputOrder": 3,
					"x": 7.12901,
					"y": 43.62986,
					"heading": 0.0,
					"speed": 0.0,
					"distanceFromRequest": 0.0,
					"distanceUnity": "m",
					"polylineIndex": 1264,
					"length": 56432,
					"duration": 4354
				}
			]
		},
		"Routes": {
			"count": 1,
			"Route": [{
					"Length": {
						"unity": "m",
						"value": 56432
					},
					"Duration": {
						"unity": "second",
						"value": 4354
					},
					"AverageSpeed": 46.65944,
					"MaximumSpeed": 0.0,
					"StartUTurnThreshold": 3000,
					"StartStopInfo": {
						"distanceUnity": "m",
						"startX": "7.41059",
						"startY": "43.73446",
						"stopX": "7.12901",
						"stopY": "43.62986",
						"distanceFirstMatched": "0.0",
						"distanceLastMatched": "0.0"
					},
					"Instructions": {
						"Instruction": [{
								"type": "FOLLOW",
								"geoElementType": "ROAD",
								"Coordinate": {
									"x": 7.41112,
									"y": 43.73244
								},
								"Duration": {
									"unity": "second",
									"value": 45
								},
								"Manoeuvre": "CHEMIN DES REVOIRES",
								"Length": {
									"unity": "m",
									"value": 244
								},
								"Manoeuvre": "LEFT",
								"ToName": "CHEMIN DES REVOIRES",
								"ToOn": "CHEMIN DES REVOIRES",
								"ToRn": "",
								"ToSi": "",
								"PolylineIndex": 11
							}, {
								"type": "FOLLOW",
								"geoElementType": "ROAD",
								"Coordinate": {
									"x": 7.41176,
									"y": 43.73384
								},
								"Duration": {
									"unity": "second",
									"value": 40
								},
								"Manoeuvre": "CHEMIN DES REVOIRES",
								"Length": {
									"unity": "m",
									"value": 214
								},
								"Manoeuvre": "BEAR_RIGHT",
								"ToName": "CHEMIN DES REVOIRES",
								"ToOn": "CHEMIN DES REVOIRES",
								"ToRn": "",
								"ToSi": "",
								"PolylineIndex": 20
							}, {
								"type": "FOLLOW",
								"geoElementType": "ROAD",
								"Coordinate": {
									"x": 7.12902,
									"y": 43.62986
								},
								"Duration": {
									"unity": "second",
									"value": 149
								},
								"Manoeuvre": "AVENUE DOCTEUR JULIEN LEFEBVRE",
								"Length": {
									"unity": "m",
									"value": 882
								},
								"Manoeuvre": "RIGHT",
								"ToName": "AVENUE DU CASTEL",
								"ToOn": "AVENUE DU CASTEL",
								"ToRn": "",
								"ToSi": "",
								"PolylineIndex": 1263
							}, {
								"type": "STOP",
								"geoElementType": "ROAD",
								"Coordinate": {
									"x": 7.12901,
									"y": 43.62986
								},
								"Duration": {
									"unity": "second",
									"value": 2
								},
								"Manoeuvre": "AVENUE DU CASTEL",
								"Length": {
									"unity": "m",
									"value": 0
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
						"minX": 7.12901,
						"minY": 43.62986,
						"maxX": 7.41278,
						"maxY": 43.74639
					},
					"Polyline": {
						"points": 1265,
						"Line": [{
								"X": 7.41059,
								"Y": 43.73446
							}, {
								"X": 7.4106,
								"Y": 43.73438
							}, {
								"X": 7.12902,
								"Y": 43.62986
							}, {
								"X": 7.12901,
								"Y": 43.62986
							}
						]
					}
				}
			]
		}
	}
}
```
