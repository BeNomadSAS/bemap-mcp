| Field  | Optional | Description |
|--------|----------|-------------|
| __criterias__ |             | This field is a list of criteria used by the routing calculator, e.g.: `AVOID_MOTORWAYS`, `AVOID_TOLLS`.<br/> Available values:<br/> - `AVOID_CROSSING_BORDER`: Find a route without country border crossing (makes sence only when the start and stop points are in the same country).<br/> - `AVOID_FERRIES`: Find a route with no ferry.<br/> - `AVOID_MOTORWAYS`: Find a route without motorways.<br/> - `AVOID_TOLLS`: Find a route with no toll.<br/> - `AVOID_UNPAVED`: Find a route with no unpaved roads.<br/> - <s>`LESS_EXPENSIVE`</s>: Find the less expensive charging stations. Only with algorithm v2. Deprecated.<br/> - `TRAFFIC`: Use traffic info for route calculation.
| __optimMode__ |             | Routing optimization mode. `FASTEST` by default.<br/> Available values:<br/> - `ECO_ENERGY`: Find the route which optimizes travel energy consumption.<br/> - `FASTEST`: Find the route which optimizes travel time. Default value.<br/> - `SHORTEST`: Find the route which optimizes travel distance.
| __startLat__ |             | Departure latitude in decimal degrees (WGS84). Ensure these values are provided in decimal degrees format. Type: `double`. |
| __startLon__ |             | Departure longitude in decimal degrees (WGS84). Ensure these values are provided in decimal degrees format. Type: `double`. |
| __stopLat__ |             | Arrival latitude in decimal degrees (WGS84). Ensure these values are provided in decimal degrees format. Type: `double`. |
| __stopLon__ |             | Arrival longitude in decimal degrees (WGS84). Ensure these values are provided in decimal degrees format. Type: `double`. |
| __allowNaStatus__ |    optional | Allows stops on charging stations with unavailable status (NA). By default `false`. Type: `boolean`. |
| __allowMaxSpdReco__ |    optional | Allows the service to define maximum speeds between step points. In response the field `maxSpeed` will be computed and returned. Type: `boolean`. |
| __alr__ |    optional | Define the index of alternative route. By default `0`. Range `[0, 2]`. If the service fails to find the requested alternative route it will return the initial route (i.e. the alternative route of index `0`). Type: `int`. |
| <s>__aroundEvse__</s> |    optional | Provides list of charging stations around the step points in the response. Type: `boolean`. |
| __csdepcnt__ |    optional | Set to `true` to enable the support of charging station deprecated connector types.By default `false`. Type: `boolean`. |
| __csfs__ |    optional | List of charging station filter, return only the points matching the filters. [Documentation of available filters](index.html#page-chargingstation-filter-v1.md#filtersparameter). Type: `list or array of String`. |
| __csps__ |    optional | List of charging station provider names. Type: `list or array of String`. |
| __co2emissions__ |    optional | Allows the service to set whether to calculate the CO2 estimation or not Type: `boolean`. |
| __connectorTypes__ |    optional | List of connector type IDs used to perform a filter based on these connectors. Type: `list or array of Integer`. |
| __cur__ |    optional | Defines the currency used for charging costs calculation. Currency should be define according to [ISO 4217 Codes](https://en.wikipedia.org/wiki/ISO_4217). Type: `String`. |
| __debugStat__ |    optional | Enable the performance statistics of EV Smart Routing service. It's of BeNomad debug only. False by default. Type: `boolean`. |
| __departureTime__ |    optional | This parameter is an EPOCH time stamp in milliseconds (UTC) or can take an string with ISO date time format like '2011-12-03T10:15:30', '2011-12-03T10:15:30+01:00' or '2011-12-03T10:15:30+01:00[Europe/Paris]'. It is used to define the date and time of routing departure. (For traffic support, this method does not have any effect if the loaded SVS map data does not contain either the HERE Traffic Patterns or TomTom Speed Profiles databases). Type: `String`. |
| __drivingStyle__ |    optional | Driving style definition. Type: `[EvDrivingStyle]`. See details below. |
| __epl__ |    optional | Set to `true` to provide the route's encoded polyline, see `Google Encoded Polyline Algorithm Format` in glossary. Otherwise set to `false`. Default value: 'false'. Type: `boolean`. |
| <s>__evseEnd__</s> |    optional | Deprecated. If set to `true`, disables the charging station search around stop point. Type: `boolean`. |
| <s>__evseMid__</s> |    optional | Deprecated. If set to `true`, disables the charging station search around middle of the route. Type: `boolean`. |
| <s>__evseStart__</s> |    optional | Deprecated. If set to `true`, disables the charging station search around start point. Type: `boolean`. |
| __evt__ |    optional | Set to `true` to provide the route timeline information (`events` field in response). By default `false`. Timeline information contains the fields of the `RouteEvent` class. See response for details. Type: `boolean`. |
| __evtFreq__ |    optional | Sampling in seconds of route timeline (`events` field in response). The `evt` parameter is mandatory to use this parameter. By default 60 seconds which is also the minimal authorized value. Type: `int`. |
| <s>__extraPayload__</s> |    optional | Additional load weight in kg (like passengers, luggage or tools). Deprecated and not supported anymore, use the `payload` field. Default value: '0'. Type: `int`. |
| __geoserver__ |    optional | Geoserver name. Type: `String`. |
| __initBatLvl__ |    optional | Initial battery level in percent. Available value 0 to 100. 100% if not defined. Default value: '100'. Type: `double`. |
| __maxAfterChargeBatLvl__ |    optional | Maximal battery level after a charge. This value is in percent. Available value 0 to 100. The default depends of the selected vehicle, but it's around 90%. Default value: '90'. Type: `Float`. |
| __minArrivalBatLvl__ |    optional | Minimal battery level at destination. This value is in percent. Available value 0 to 100. With algorithm version 3 : The `minArrivalBatLvl` should be smaller or equal than 80%. If a higher value is provided, 80% will be used instead. Note that if `minArrivalBatLvl` is greater or equal than `maxAfterChargeBatLvl` - 15% then the value of `maxAfterChargeBatLvl` is set to `minArrivalBatLvl` + 15%. Default value: '0'. Type: `double`. |
| __minBatLvl__ |    optional | Minimal battery level during the journey. This value is in percent. Available value 0 to 100. With algorithm version 3 : The `minBatLvl` should be smaller or equal than 50%. If a superior value is given the 50% will be used instead. Note that if `minBatLvl` is greater or equal than `maxAfterChargeBatLvl` - 25% then the value of `maxAfterChargeBatLvl` is set to `minBatLvl` + 25%. Default value: '0'. Type: `double`. |
| __payload__ |    optional | Vehicle's extra load (consumables or passengers weight for example) (in kg). 75kg by default. Default value: '75'. Type: `int`. |
| __pl__ |    optional | Set to `true` to provide the route's polyline. Otherwise set to `false`. Default value: 'true'. Type: `boolean`. |
| __restrictedEvse__ |    optional | Allows restricted charging stations, like private or employees only. Type: `boolean`. |
| __stepPointPluggingTime__ |    optional | Defines the fixed additional time in seconds for each charging stop. Type: `int`. |
| __stepPointTimeSlots__ |    optional | List of step point time slots. Note: If forced charges are defined, they take priority over charge times. Type: `list or array of [StepPointTimeSlot]`. See details below. |
| <s>__swidx__</s> |    optional | Switch index. Type: `int`. |
| __temperature__ |    optional | Temperature in Celsius. 20 by default. Type: `int`. |
| __vehicle__ |    optional | Vehicle model (UUID key). Type: `String`. |
| __vias__ |    optional | List of intermediate (via) points between start and stop points used by the routing calculation. Type: `list or array of [EnergyRoutingDest]`. See details below. |
| __weather__ |    optional | Enable the weather information. Type: `boolean`. |
| __wp__ |    optional | Enable the weather information. Type: `String`. |

#### __EnergyRoutingDest__
Class representing an intermediate destination coordinate. Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __lat__ |             | Latitude in degrees decimal ([WGS84](index.html#page-glossary-coordinate_system.md)). Type: `double`. |
| __lon__ |             | Longitude in degrees decimal ([WGS84](index.html#page-glossary-coordinate_system.md)). Type: `double`. |
| __chargeMaxDist__ |    optional | This parameter should be defined to impose a charge around this destination. It defines the maximum walking distance 3000 meters a charge point can be from this destination to force a charge (0 means no charge forced). By default `0`. NOTE: If you combine this parameter with the `stopDuration` parameter it will define how much time can be used for charging. Type: `int`. |
| __maxSpd__ |    optional | Maximum Speed in km/h associated to this destination coordinate. If not 0 this will force routing calculation to bound all driving speeds between this destination and the next one. If 0 the global maximum speed will be used if defined. By default `0`. Type: `int`. |
| __stopDuration__ |    optional | Stop duration in seconds associated to the destination coordinate. By default `0`. Note: if charging times are defined. Forced charges take priority over charge times. Note: only about forced charge, stop duration could be linked chargeMaxDist in case of forced charge. To ensure that charge duration is superior to stopDuration + FixedStopTime in EV Smart Routing, the stop duration used is min(stopDuration, KB_MIN_CHARGE_DURATION + FixedStopTime). However the original value stopDuration is not modified. Type: `int`. |

#### __EvDrivingStyle__
Class representing a driving style. Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __mode__ |             | Define the driving mode.<br/> Available values:<br/> - `CUSTOM`: Allows to override accelerations, decelerations, driving speeds and maximum speed.<br/> - `ECO`: Reduces accelerations and decelerations, auxiliary consumption and driving speeds.<br/> - `NORMAL`: Uses speeds defined in map data, auxiliary consumption, accelerations and decelerations defined in vehicle profile. Set as default.<br/> - `SPORT`: Increases accelerations and decelerations and driving speeds.
| __allowOverVehSpdLim__ |    optional | Allows to define a maximum speed above the vehicle's maximum speed defined in the vehicle's database. Type: `boolean`. |
| __limitMaxSpeed__ |    optional | Defines vehicle's maximum speed in km/h used during the routing calculation. By default `null`. If `null`, uses the maximum speed defined in the vehicle's database. Note that if the speed is greater than the one defined in the database, it will be bounded by the later except if you activate the parameter `allowOverVehSpdLim`. Type: `Short`. |
| __maxAcc__ |    optional | Average vehicle's acceleration in m/s². Must be > 0. For example: 1.25 m/s². Type: `Double`. |
| __maxDec__ |    optional | Average vehicle's deceleration in m/s². Must be < 0. For example: -1.25 m/s². Type: `Double`. |
| __sps__ |    optional | Speed weight coefficient for the specified road network level. A value < 1 will reduce speeds. A value > 1 will increase speeds. Type: `list or array of [RoutingSpeedPond]`. See details below. |

#### __RoutingSpeedPond__
Class representing a routing speed ponderation. Defines a speed coefficient for the specified road element's classification. Note: This parameter has no effect on Traceroute service. Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __factor__ |             | Specifies the speed coefficient. A value under 1 to reduce the speed, e.g: 0.8. A value over 1 to increase the speed, e.g: 1.3. `1` by default. Default value: '1'. Type: `float`. |
| __level__ |             | Road element's level (0: all 4 levels, 1: main level, 2: secondary level, 3: third level, 4: fourth level). Type: `int`. |
| __pondType__ |    optional | Define the ponderation type.<br/> Available values:<br/> - `ALL`: Speed coefficient applies both for finding the fastest route and calculating its ETA. Default value.<br/> - `CAL`: Speed coefficient applies only searching for the fastest route (only when fastest criteria is set).<br/> - `ETA`: Speed coefficient applies only for calculating route's travel time (ETA).
| __roadType__ |    optional | Define the road type.<br/> Available values:<br/> - `ALL`: All road network.<br/> - `DEFAULT`: Default.<br/> - `FERRY`: Ferry line.<br/> - `MOTORWAY`: Motorway.<br/> - `PEDESTRIAN`: Pedestrian.<br/> - `ROUNDABOUNT`: Roundabout.<br/> - `SLIPROAD`: Slip road.

#### __StepPointTimeSlot__
Represents a time slot which will be used to charge the vehicle. It is defined by a begin date/time an end date/time and a stop duration in seconds. For EV Smart Routing, StepPointTimeSlot is valid if:
  - A departure date and time has been set.
  - Beginning of the time slot is before end of the time slot.
  - Stop time duration is strictly superior to the step-point's plugging time.
  - Beginning time plus stop time duration is inferior or equal to end time.
  - Time slot's begin should be after the departure time.
  - Time slot's end should be before arrival time once stop is reachable.

 >Note: If forced charges are defined, they take priority over charge times.

 Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __duration__ |             | Stop duration in seconds. Type: `int`. |
| __startDateTime__ |             | Start local date time in text format ISO YYYY-MM-DDThh:mm:ss (e.g: 2020-09-08T12:28:00). Type: `String`. |
| __stopDateTime__ |             | Stop local date time in text format ISO YYYY-MM-DDThh:mm:ss (e.g: 2020-09-08T12:28:00). Type: `String`. |
| __maxWalkingDistance__ |    optional | Maximum walking distance in meters in range [50, 1000] between the step point and the service(s). 1000 meters by default. Type: `int`. |
| __serviceCategory__ |    optional | Service category that can be associated to a time slot. This parameter describes, in combination with an optional maximum pedestrian walking distance (see parameter `maxWalkingDistance`), a boolean expression with all the services requested or unwanted.
Semantics:
  - `!`: not (unary).
  - `|`: or (binary).
  - `&`: and (binary).
  - `(`: open section.
  - `)`: close section.
  - POI Class ID (numeric value defining the type of service, see the `Class ID list` in Glossary menu).
For example to specify that you want either a restaurant OR a grocery store AND NOT a rest area, the corresponding expression is: (7315|9105)&!7395 Type: `String`. |
