| Field  | Optional | Description |
|--------|----------|-------------|
| __start__ |             | Departure coordinates (start point). Type: `[PlaceFront]`. See details below. |
| __stop__ |             | Arrival coordinates (stop point). Type: `[PlaceFront]`. See details below. |
| __vehicle__ |             | Vehicle model (UUID key). Type: `[VehicleFront]`. See details below. |
| __csfs__ |    optional | List of charging station filter, return only the points matching the filters. [Documentation of available filters](index.html#page-chargingstation-filter-v1.md#filtersparameter). Type: `list or array of String`. |
| __csfsVersion__ |    optional | Represents the version of the filtering logic used in the charging station search query. This field determines which filtering implementation or algorithm is applied during processing. The default is 1.  The available values are: 1, 2. Default value: '1'. Type: `byte`. |
| __csps__ |    optional | List of charging station provider names. Type: `list or array of String`. |
| __condition__ |    optional | Condition of trip, that contains the options and settings parameters like weather, battery levels, etc. Type: `[ConditionFront]`. See details below. |
| __geoserver__ |    optional | Geoserver name. Type: `String`. |
| __swidx__ |    optional | Switch index. Type: `int`. |
| __tariffChargePassHashIds__ |    optional | List of eligible charge pass hash IDs (retrieved from the Charge Pass Service). The backend will select the applicable charge pass based on station, provider, and tariff compatibility to propose the lowest cost for a charge. The effectively applied charge pass is returned in `chargingCost` section. Type: `list or array of String`. |
| __vias__ |    optional | List of via places. Type: `list or array of [ViaFront]`. See details below. |

#### __VehicleFront__
Class representing a Vehicle. Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __key__ |             | The vehicle's UUID key. You can fin the UUID key in the API Vehicles. Type: `String`. |
| __feature__ |    optional | Vehicle features is used to set the information about the vehicle. Type: `[VehicleFeatureFront]`. See details below. |
| __initBatLvl__ |    optional | Initial battery level in percent. Available value 0 to 100. Default value 100. Type: `float`. |
| __payload__ |    optional | Vehicle's payload in kg (i.e: passengers, luggage and consumables weight). 75 kg by default. Type: `int`. |

#### __VehicleFeatureFront__
Class representing a routing vehicle features. A routing vehicle feature defines physical, legal and toll characteristics. The map data contains restrictions which are related to vehicle features such as: height, width, length, weight and hazardous materials. Therefore the vehicle features can affect the route calculation. Routing vehicle features can also affect toll and tax cost calculation. Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __adrTunnelCategory__ |             | ADR tunnel category defines all supported ADR (EU only, European Agreement concerning the International Carriage of Dangerous Goods by Road). Affects route calculation.<br/> Available values:<br/> - `CAT_B`: Tunnel Category B.<br/> - `CAT_C`: Tunnel Category C.<br/> - `CAT_D`: Tunnel Category D.<br/> - `CAT_E`: Tunnel Category E.<br/> - `NONE`: No tunnel category restriction (category A).
| __axleWeight__ |             | Axle weight in tens of metric tons, i.e.: `12` = 1.2t. Affects route calculation. Legal and physical restrictions. Type: `int`. |
| __caravan__ |             | Defines if the vehicle has a caravan. Affects toll calculation. `UNDEFINED` by default.<br/> Available values:<br/> - `NO`: No.<br/> - `UNDEFINED`: Undefined.<br/> - `YES`: Yes.
| __cial__ |             | Defines if vehicle is a commercial vehicle. Affects toll calculation. `UNDEFINED` by default.<br/> Available values:<br/> - `NO`: No.<br/> - `UNDEFINED`: Undefined.<br/> - `YES`: Yes.
| __disEquipped__ |             | Defines if vehicle is equipped for disabled people. Affects toll calculation. `UNDEFINED` by default.<br/> Available values:<br/> - `NO`: No.<br/> - `UNDEFINED`: Undefined.<br/> - `YES`: Yes.
| __emissionClass__ |             | Defines vehicle's emission type (optional). See [Wikipedia: European emission standards](http://en.wikipedia.org/wiki/European_emission_standards). Affects toll calculation.<br/> Available values:<br/> - `ELECTRIC`: EURO Electric.<br/> - `EURO0`: EURO 0<br/> - `EURO1`: EURO I.<br/> - `EURO2`: EURO II.<br/> - `EURO2_PRC`: EURO II with PRC (Particle Reduction Composite/System)<br/> - `EURO3`: EURO III.<br/> - `EURO3_PRC`: EURO III with PRC (Particle Reduction Composite/System)<br/> - `EURO4`: EURO IV.<br/> - `EURO5`: EURO V.<br/> - `EURO6`: EURO VI.<br/> - `EURO6_CO2_1`: EURO VI CO2 1<br/> - `EURO6_CO2_2`: EURO VI CO2 2<br/> - `EURO6_CO2_3`: EURO VI CO2 3<br/> - `EURO6_CO2_4`: EURO VI CO2 4<br/> - `EURO6_CO2_5`: EURO VI CO2 5<br/> - `EURO_EEV`: EURO EEV.<br/> - `MAX`: Maximal value.<br/> - `UNDEFINED`: Undefined.
| __hazardousMaterials__ |             | Hazardous materials carried by the vehicle. Affects route calculation. Legal restriction.<br/> Available values:<br/> - `ALL`: General hazardous materials.<br/> - `EXPLOSIVE`: Trucks with Explosive and Flammable Goods.<br/> - `NONE`: No hazardous material.<br/> - `TUNNEL_CAT_B`: Tunnel Category B.<br/> - `TUNNEL_CAT_B1000C`: Tunnel Category B1000C.<br/> - `TUNNEL_CAT_BD`: Tunnel Category B/D.<br/> - `TUNNEL_CAT_BE`: Tunnel Category B/E.<br/> - `TUNNEL_CAT_C`: Tunnel Category C.<br/> - `TUNNEL_CAT_C5000D`: Tunnel Category C5000D.<br/> - `TUNNEL_CAT_CD`: Tunnel Category C/D.<br/> - `TUNNEL_CAT_CE`: Tunnel Category C/E.<br/> - `TUNNEL_CAT_D`: Tunnel Category D.<br/> - `TUNNEL_CAT_DE`: Tunnel Category D/E.<br/> - `TUNNEL_CAT_E`: Tunnel Category E.<br/> - `US_CORROSIVE`: USA only : Corrosive materials (e.g., hydrochloric acid, sulfuric acid, mercury, sodium hydroxide).<br/> - `US_EXPLOSIVES`: USA only : Explosives (e.g., TNT, ammunition, flares, fireworks).<br/> - `US_FLAM`: USA only : Flammable and combustible liquids (e.g., jet fuel, gasoline, fuel oil, alcohols).<br/> - `US_FLAM_SOL`: USA only : Flammable solids, spontaneously combustible materials and water reactive substances (e.g., matches, white phosphorus, potassium).<br/> - `US_GAS`: USA only : Flammable, compressed and poisonous gases (e.g., propane, compressed oxygen, chlorine).<br/> - `US_ORGANIC`: USA only : Oxidizers and organic peroxides (e.g., ammonium nitrate and benzoyl peroxide).<br/> - `US_OTHER`: USA only : Miscellaneous hazardous materials (e.g., asbestos, dry ice, lithium batteries).<br/> - `US_PIH`: USA only : Poisonous inhalation hazards (PIH).<br/> - `US_POISON`: USA only : Poisonous (toxic) and infectious substances (e.g., cyanide, most mercury-based compounds, viruses, toxins and regulated medical waste).<br/> - `US_RADIO_ACTIVE`: USA only : Radioactive materials (e.g., plutonium-239 and uranium-235).<br/> - `WATER`: Trucks with Goods Harmful for Water.
| __height__ |             | Height of vehicle in centimeters. Affects route calculation. Physical restriction. Type: `int`. |
| __hov__ |             | Defines if vehicle is a High Occupancy Vehicle (USA only). See [Wikipedia: High-occupancy vehicle lane](http://en.wikipedia.org/wiki/High-occupancy_vehicle_lane). Affects toll calculation. `UNDEFINED` by default.<br/> Available values:<br/> - `NO`: No.<br/> - `UNDEFINED`: Undefined.<br/> - `YES`: Yes.
| __hybrid__ |             | Defines if vehicle has a hybrid engine. Affects toll calculation. `UNDEFINED` by default.<br/> Available values:<br/> - `NO`: No.<br/> - `UNDEFINED`: Undefined.<br/> - `YES`: Yes.
| __length__ |             | Length of vehicle in centimeters. Affects route calculation. Physical restriction. Type: `int`. |
| __nbPassengers__ |             | Defines the number of passengers (optional). Affects toll calculation. Type: `int`. |
| __nbTires__ |             | Defines the number of tires (optional). Affects toll calculation. Type: `int`. |
| __nbTrailAxles__ |             | Defines the number of axles of the trailer (optional). Affects toll calculation. Type: `int`. |
| __nbTrailer__ |             | Vehicle's number of trailers (`-1`: not defined, `0`: no trailer). Affects route calculation. Legal restriction. Type: `int`. |
| __nbVehAxles__ |             | Defines the number of axles of the vehicle (optional). Affects toll calculation. Type: `int`. |
| __onlyPhysical__ |             | Defines if vehicle's weight (weight, weight per axle and trailers) and hazardous materials (hazardous materials and ADR) should be ignored outside respectively bridges and tunnels. `false` by default. Affects route calculation. Type: `boolean`. |
| __pollMin__ |             | Defines if vehicle has minimal pollution. Affects toll calculation. `UNDEFINED` by default.<br/> Available values:<br/> - `NO`: No.<br/> - `UNDEFINED`: Undefined.<br/> - `YES`: Yes.
| __tollTransportCategory__ |             | Defines the toll vehicle category. Affects toll calculation. `UNDEFINED` by default.<br/> Available values:<br/> - `AUTO`: Automobile.<br/> - `BUS`: Bus.<br/> - `DLV_TRUCK`: Delivery truck (EU only).<br/> - `MINIBUS`: Mini bus.<br/> - `MOTOR_HOME`: Motor home.<br/> - `MOTORCYCLE`: Motorcycle.<br/> - `PICK_UP`: Pick up (US only).<br/> - `SIDECAR`: Sidecar (EU only).<br/> - `SNOWMOBILE`: Snowmobile (US only).<br/> - `TRACTOR`: Tractor (US only).<br/> - `TRICYCLE`: Tricycle (EU only).<br/> - `TRUCK`: Truck.<br/> - `UNDEFINED`: Undefined.
| __trailHeight__ |             | Defines trailer's height in centimeters (optional, use field `height` to define total height : vehicle + trailer). Affects toll calculation. Type: `int`. |
| __vehHeight__ |             | Defines vehicle's height in centimeters (optional, use field `height` to define total height : vehicle + trailer). Affects toll calculation. Type: `int`. |
| __vehWeight__ |             | Defines vehicle's weight in tens of tons (optional, use field `weight` to define total weight : vehicle + trailer). Affects toll calculation. Type: `int`. |
| __weight__ |             | Weight of vehicle in tens of metric tons, i.e.: `35` = 3.5t. Affects route calculation. Legal and physical restrictions. Type: `int`. |
| __width__ |             | Width of vehicle in centimeters. Affects route calculation. Physical restriction. Type: `int`. |

#### __ConditionFront__
Class representing the condition of trip, that contains the options and settings parameters like weather, battery levels, etc. Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __allowMaxSpeedRecommendation__ |    optional | Allow to calculate the maximum speeds to reach destination or step-point. Since algorithm v3. Type: `boolean`. |
| __allowNaStatus__ |    optional | Allow use of pools with NA availability status. False by default. Type: `boolean`. |
| __alternative__ |    optional | Index of alternative route. 0 to disable. 0 by default. Type: `byte`. |
| __chargePluggingTime__ |    optional | Defines the fixed additional time in seconds for each charging stop. 300 by default. Type: `int`. |
| __chargeTimeSlots__ |    optional | List of step-point time slots. Note: If forced charges are defined, they take priority over charge times. Type: `list or array of [ChargeTimeSlotFront]`. See details below. |
| __chargingStationDeprecatedConnector__ |    optional | Set to true to enable the support of charging station deprecated connector types. False by default. Type: `boolean`. |
| __co2emissions__ |    optional | If set to true CO2 emissions will be calculated in the journey, set to false by default. Type: `boolean`. |
| __connectorTypes__ |    optional | List of connector type ID, used to perform a filtration based on those connector. Type: `list or array of Integer`. |
| __currency__ |    optional | Define the currency used for costs calculation. Currency ISO 4217 Code. Type: `String`. |
| __departureTime__ |    optional | This parameter is an EPOCH time stamp in milliseconds (UTC) or can take an string with ISO local date time format like '2011-12-03T10:15:30', '2011-12-03T10:15:30+01:00' or '2011-12-03T10:15:30+01:00[Europe/Paris]'. It is used to define the date and time of routing departure. Type: `String`. |
| __drivingStyle__ |    optional | Driving style definition for an electric vehicle. Type: `[DrivingStyleFront]`. See details below. |
| __encodedGeometry__ |    optional | Set to true to enable the encoded polyline. False by default. Type: `boolean`. |
| __criterias__ |    optional | The EV's list of criterias.<br/> Available values:<br/> - `AVOID_CROSSING_BORDER`: Find a route without country border crossing (makes sence only when the start and stop points are in the same country).<br/> - `AVOID_FERRIES`: Find a route with no ferry.<br/> - `AVOID_MOTORWAYS`: Find a route without motorways.<br/> - `AVOID_TOLLS`: Find a route with no toll.<br/> - `AVOID_UNPAVED`: Find a route with no unpaved roads.<br/> - <s>`LESS_EXPENSIVE`</s>: Find the less expensive charging stations. Only with algorithm v2. Deprecated.<br/> - `TRAFFIC`: Use traffic info for route calculation.
| __geometry__ |    optional | Set to true to enable the polyline otherwise set to false. True by default. Type: `boolean`. |
| __ignoreAvailableStatus__ |    optional | Allow use of any pool regardless of availability status. False by default. Type: `boolean`. |
| __maxAfterChargeBatLvl__ |    optional | Maximal battery level after a charge. This value is in percent. Available value 0 to 100. Type: `Float`. |
| __minArrivalBatLvl__ |    optional | Minimal battery level at destination. This value is in percent. Available value 0 to 100. The value of `minArrivalBatLvl` must be superior or equals to the value of `minBatLvl`. If the value of `minArrivalBatLvl` is lower than `minBatLvl`, the value of `minBatLvl` will be used instead of `minArrivalBatLvl`. Type: `float`. |
| __minBatLvl__ |    optional | Minimal battery level during the journey. This value is in percent. Available value 0 to 100. Type: `float`. |
| __optimMode__ |    optional | Optimization mode.<br/> Available values:<br/> - `ECO_ENERGY`: Find the route which optimizes travel energy consumption.<br/> - `FASTEST`: Find the route which optimizes travel time. Default value.<br/> - `SHORTEST`: Find the route which optimizes travel distance.
| __restrictedEvse__ |    optional | Accept the restricted charging stations. Type: `boolean`. |
| __routeDetails__ |    optional | Set to true to enable the route events detailed information like consumption, speed, altitude, etc. False by default. See the `RouteConsumptionFront` class for more details about the returned values. Type: `boolean`. |
| __routeDetailsFreq__ |    optional | Frequency in seconds of route event. 60 seconds by default which is also the minimal authorized value. Type: `int`. |
| __routesheet__ |    optional | Enable the route-sheet. Type: `boolean`. |
| __routesheetLanguage__ |    optional | Define the language that will be used to render the text of route-sheet. Type: `String`. |
| __routesheetMode__ |    optional | Define the output mode of route-sheet: only text, only details and both. `TEXT` by default.<br/> Available values:<br/> - `DETAILS`: Render only the detailed information in separated fields.<br/> - `TEXT`: Render only the text information.<br/> - `TEXT_DETAILS`: Render both text and details information.
| __routesheetVerboseLevel__ |    optional | Select the information details level of route-sheet.<br/> Available values:<br/> - `HIGH`: High verbosity, the maximum details information about the route-sheet instruction will be returned.<br/> - `LOW`: Low verbosity, the minimal information about the route-sheet instruction will be returned.<br/> - `MEDIUM`: Medium verbosity, the normal information about the route-sheet instruction will be returned.
| __startUTurnThreshold__ |    optional | Specifies the start UTurn threshold. This value determines, at start point or any via point for which a use start angle / avoid UTurn property is set, the threshold (in 1/10th seconds / meters / Wh in resp. FASTEST / SHORTEST / ECO mode) above which the property may be ignored (default = 3000). For instance, in SHORTEST mode, if the route from start to stop leaving start point in the desired direction is more than `startUTurnThreshold` meters longer than the route from start to stop leaving start point in the opposite direction, leave the start point in the opposite direction. Type: `Integer`. |
| __temperature__ |    optional | Temperature in Celsius. Not used if weather is enabled. 20 by default. Type: `int`. |
| __tollCost__ |    optional | Set to true to enable the toll cost calculation and toll events along the route. False by default. Type: `boolean`. |
| __weather__ |    optional | Enable the weather information. Type: `boolean`. |
| __weatherProvider__ |    optional | Define the weather provider. Type: `String`. |

#### __ChargeTimeSlotFront__
Represents a time slot which will be used to charge the vehicle. It is defined by a begin time, which should be after the departure time of the route, a end time, and a stop duration which should be inferior to (stopDateTime - startDateTime) and should be strictly superior to the stop time duration For EV Smart Routing, StepPointTimeSlot is valid if:
  - A departure date and time have been set.
  - Beginning of the time slot is before end of the time slot.
  - Stop time duration is strictly positive and strictly superior to the fixed stop time.
  - Beginning time plus stop time duration is inferior or equal to end time.
  - Time slot's begin should be after the departure time.
  - Time slot's begin should be before arrival time once stop is reachable. For EV Smart Routing, a time slot has a margin of +/- 1 minute.

 >Note: If forced charges are defined, they take priority over charge times.

 Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __duration__ |             | Stop duration in seconds. Type: `int`. |
| __maxWalkingDistance__ |    optional | Maximum walking distance in meters to the service(s) POI. Value range [50, 1000] between the step point and the service(s). 1000 meters by default. Type: `int`. |
| __serviceCategory__ |    optional | Service category. Semantics:<br/>- !: not (unary).<br/>- &verbar;: or (binary).<br/>- &amp;: and (binary).<br/>- (: open section.<br/>- ): close section.<br/>- any numeric value.<br/>Example: (7315&verbar;9105)&amp;!7395<br/>See the [Class ID list](index.html#page-sdk-jsiv-classids.md) in Glossary menu. Type: `String`. |
| __startDateTime__ |    optional | Start local date time in text format ISO YYYY-MM-DDThh:mm:ss (eg: 2020-09-08T12:28:00). Type: `String`. |
| __stopDateTime__ |    optional | Stop local date time in text format ISO YYYY-MM-DDThh:mm:ss (eg: 2020-09-08T12:28:00). Type: `String`. |

#### __DrivingStyleFront__
Class representing a driving style. Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __mode__ |             | Define the driving mode.<br/> Available values:<br/> - `CUSTOM`: Allow to override ponderation parameters.<br/> - `ECO`: Reduce the acceleration/deceleration, auxiliary consumption and prefer the national road over the high-ways.<br/> - `NORMAL`: Use the speed limitation in vehicles database.<br/> - `SPORT`: No speed limitation (only the legal speed limit of roads). Increase the acceleration/deceleration. Prefer the high-ways.
| __allowOverVehSpdLim__ |    optional | Allows to define a maximum speed above the vehicle's maximum speed defined in the vehicle's database. Type: `boolean`. |
| __limitMaxSpeed__ |    optional | Defines vehicle's maximum speed in km/h used during the routing calculation. By default `null`. If `null`, uses the maximum speed defined in the vehicle's database. Note that if the speed is greater than the one defined in the database, it will be bounded by the later except if you activate the parameter `allowOverVehSpdLim`. Type: `Short`. |
| __maxAcc__ |    optional | Average vehicle's acceleration in m/s². Must be > 0. For example: 1.25 m/s². Type: `Double`. |
| __maxDec__ |    optional | Average vehicle's deceleration in m/s². Must be < 0. For example: -1.25 m/s². Type: `Double`. |
| __sps__ |    optional | Speed weight coefficient for the specified road network level. A value < 1 will reduce speeds. A value > 1 will increase speeds. Type: `list or array of [SpeedPonderationFront]`. See details below. |

#### __SpeedPonderationFront__
Class representing a routing speed ponderation. Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __factor__ |             | Specifies a new ponderation factor for speeds (Default = 1). A value under 0 to reduce the speed, i.g: 0.8. A value upper to 1 for increase the speed, i.g: 1.3. Type: `float`. |
| __level__ |             | Road network level (0: all 4 levels, 1: main level, 2: secondary level, 3: third level, 4: fourth level). Type: `int`. |
| __pondType__ |    optional | Define the ponderation type.<br/> Available values:<br/> - `ALL`: Speed coefficient applies both for finding the fastest route and calculating its ETA. Default value.<br/> - `CAL`: Speed coefficient applies only searching for the fastest route.<br/> - `ETA`: Speed coefficient applies only for calculating route's travel time (ETA).
| __roadType__ |    optional | Define the road type.<br/> Available values:<br/> - `ALL`: All road network.<br/> - `DEFAULT`: Default.<br/> - `FERRY`: Ferries way.<br/> - `MOTORWAY`: Motor-way.<br/> - `PEDESTRIAN`: Pedestrian.<br/> - `ROUNDABOUNT`: Roundabout.<br/> - `SLIPROAD`: Slip road.

#### __PlaceFront__
Describe the coordinate a place (like start point or stop point). Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __lat__ |             | Latitude in degrees decimal ([WGS84](index.html#page-glossary-coordinate_system.md)). Type: `double`. |
| __lon__ |             | Longitude in degrees decimal ([WGS84](index.html#page-glossary-coordinate_system.md)). Type: `double`. |
| __alt__ |    optional | Altitude in meters. Type: `Double`. |
| __avoidUTurn__ |    optional | Defines if a UTurn should be avoided by route calculation on this coordinate. Not defined by default. Type: `Boolean`. |
| __heading__ |    optional | Heading angle in degrees (optional). For BeNomad engine: If the angle is not available, set this field and speed field to 0. Type: `Double`. |
| __ignorePoint__ |    optional | Defines if this coordinate is ignored by the route calculation. `false` by default. Type: `boolean`. |
| __ignoreRestrictions__ |    optional | Defines if forbidden maneuvers and blocked passages should be ignored by route calculation between this coordinate and the next one. `false` by default. Type: `boolean`. |
| __ignoreTrafficDirections__ |    optional | Defines if traffic directions should be ignored by route calculation between this waypoint and the next one. `false` by default. Type: `boolean`. |
| __radius__ |    optional | Radius in meters around the coordinate. This radius defines the maximum distance the route calculation should approach the coordinate. Type: `Integer`. |
| __sat__ |    optional | Number of satellites available. Type: `Integer`. |
| __speed__ |    optional | Speed in km/h (optional). For BeNomad engine: Use this field only if the heading is available. Type: `Float`. |
| __time__ |    optional | GPS time in milliseconds. Type: `Long`. |
| __useStartAngle__ |    optional | If set to `true` and coordinate is located on a two-way road and heading is defined, coordinate's heading will be used as a general direction for departure from this coordinate. See the `heading` parameter. Not defined by default. Type: `Boolean`. |
| __useStopRoadSide__ |    optional | Defines if route calculation must arrive on this coordinate on its side (if coordinate is on a two-way road). Not defined by default. Type: `Boolean`. |

#### __ViaFront__
Describe the coordinate of a way-point (via). Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __lat__ |             | Latitude in degrees decimal ([WGS84](index.html#page-glossary-coordinate_system.md)). Type: `double`. |
| __lon__ |             | Longitude in degrees decimal ([WGS84](index.html#page-glossary-coordinate_system.md)). Type: `double`. |
| __alt__ |    optional | Altitude in meters. Type: `Double`. |
| __avoidUTurn__ |    optional | Defines if a UTurn should be avoided by route calculation on this coordinate. Not defined by default. Type: `Boolean`. |
| __chargeMaxDistance__ |    optional | This parameter should be defined to impose a charge around this destination. It defines the maximum walking distance 3000 meters a charge point can be from this destination to force a charge (0 means no charge forced). By default `0`. NOTE: If you combine this parameter with the `stopDuration` parameter it will define how much time can be used for charging. Type: `int`. |
| __heading__ |    optional | Heading angle in degrees (optional). For BeNomad engine: If the angle is not available, set this field and speed field to 0. Type: `Double`. |
| __ignorePoint__ |    optional | Defines if this coordinate is ignored by the route calculation. `false` by default. Type: `boolean`. |
| __ignoreRestrictions__ |    optional | Defines if forbidden maneuvers and blocked passages should be ignored by route calculation between this coordinate and the next one. `false` by default. Type: `boolean`. |
| __ignoreTrafficDirections__ |    optional | Defines if traffic directions should be ignored by route calculation between this waypoint and the next one. `false` by default. Type: `boolean`. |
| __ignoreVehicleProfile__ |    optional | Ignore vehicle profile status. Type: `boolean`. |
| __maxSpeed__ |    optional | Maximum Speed in km/h associated to this destination coordinate. If not 0 this will force routing calculation to bound all driving speeds between this destination and the next one. If 0 the global maximum speed will be used if defined. By default `0`. Type: `int`. |
| __radius__ |    optional | Radius in meters around the coordinate. This radius defines the maximum distance the route calculation should approach the coordinate. Type: `Integer`. |
| __sat__ |    optional | Number of satellites available. Type: `Integer`. |
| __speed__ |    optional | Speed in km/h (optional). For BeNomad engine: Use this field only if the heading is available. Type: `Float`. |
| __stopDuration__ |    optional | Stop duration in seconds associated to the destination coordinate. By default `0`. Note: if charging times are defined. Forced charges take priority over charge times. Note: only about forced charge, stop duration could be linked chargeMaxDist in case of forced charge. To ensure that charge duration is superior to stopDuration + FixedStopTime in EV Smart Routing, the stop duration used is min(stopDuration, KB_MIN_CHARGE_DURATION + FixedStopTime). However the original value stopDuration is not modified. Type: `int`. |
| __time__ |    optional | GPS time in milliseconds. Type: `Long`. |
| __transportType__ |    optional | Transport type associated to the destination coordinate. Useful for discriminating between passenger car, taxi and emergency.<br/> Available values:<br/> - `BICYCLE`: Bicycle.<br/> - `CAR`: Passenger car, tourist car.<br/> - `DELIVERY_TRUCK`: Delivery truck.<br/> - `EMERGENCY`: Emergency vehicle.<br/> - `MOTORCYCLE`: Motorcycle.<br/> - `PEDESTRIAN`: Pedestrian.<br/> - `PUBLIC_BUS`: Public bus.<br/> - `TAXI`: Taxi.<br/> - `TRUCK`: Truck.
| __useStartAngle__ |    optional | If set to `true` and coordinate is located on a two-way road and heading is defined, coordinate's heading will be used as a general direction for departure from this coordinate. See the `heading` parameter. Not defined by default. Type: `Boolean`. |
| __useStopRoadSide__ |    optional | Defines if route calculation must arrive on this coordinate on its side (if coordinate is on a two-way road). Not defined by default. Type: `Boolean`. |
