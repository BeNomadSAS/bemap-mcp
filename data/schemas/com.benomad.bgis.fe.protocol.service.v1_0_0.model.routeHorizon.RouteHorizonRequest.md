| Field  | Optional | Description |
|--------|----------|-------------|
| __gps__ |             | List of GPS coordinate. The last coordinate is most recent (Chronological order). Type: `list or array of [CoordinateSat]`. See details below. |
| __decWtr__ |    optional | Declared weather condition. Type: `[RouteHorizonDecWeather]`. See details below. |
| __geoserver__ |    optional | Geoserver name. Type: `String`. |
| __rvp__ |    optional | Vehicle feature is used to set the information about the vehicle. Type: `[RoutingVehicleProf]`. See details below. |
| __showTraf__ |    optional | Enable the traffic information in output. Experimental service, poor accuracy! Type: `boolean`. |
| __showWtr__ |    optional | Enable the weather information in output. Experimental service, cause latency! Type: `boolean`. |
| <s>__swidx__</s> |    optional | Switch index. Type: `int`. |
| __useDynSpd__ |    optional | Enable dynamic speed in calculation. Type: `boolean`. |
| __useWtr__ |    optional | Enable the weather information in calculation. If declared weather condition (decWtr) is set, this parameter (useWtr) is ignored and the declared weather condition is used. Type: `boolean`. |
| __wtrProv__ |    optional | Weather provider name used with wtr parameter. Type: `String`. |

#### __RoutingVehicleProf__
Class representing a routing vehicle profile. A routing vehicle profile defines physical, legal, toll and energetic characteristics. Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| <s>__chargingStationProviderName__</s> |             | Name of charging station provider used to research the chargning station pools. Deprecated Use the API Charging Station. Type: `String`. |
| __maxSpeeds__ |             | Defines a maximum speed in km/h for the vehicle. It is possible to discriminate two different maximum speeds: one to be used for route calculation (`CAL`) and another one for route time estimation (`ETA`). By default (`ALL`) the speed applies to both cases. Type: `list or array of [RoutingMaxSpd]`. See details below. |
| __routingCrossPenaltiesCoefficients__ |             | Defines a cross-penalties coefficient for the specified road element's classification. Note: This parameter has no effect on the Traceroute service. Type: `list or array of [RoutingCrossPenaltiesCoef]`. See details below. |
| <s>__routingEnergyVehicleConnectorTypeIds__</s> |             | Connector (plug) type of electrical vehicle, used for energy consumption estimation. Deprecated Use the API Charging Station. Type: `list or array of Integer`. |
| __routingEnergyVehicleFeature__ |             | Energy vehicle feature for energy consumption estimation. Type: `[RoutingEnergyVehicleFtr]`. See details below. |
| <s>__routingEnergyVehicleRanges__</s> |             | Energy vehicle range. Define the pre-calculated electric vehicle autonomy in meters. Type: `list or array of Long`. |
| __routingSpeedPonderations__ |             | Defines a speed coefficient for the specified road element's classification. Note: This parameter has no effect on the Traceroute service. Type: `list or array of [RoutingSpeedPond]`. See details below. |
| __routingVehicleFeature__ |             | Defines the routing vehicle feature. A routing vehicle feature defines physical, legal and toll characteristics. Type: `[RoutingVehicleFtr]`. See details below. |
| __transportMode__ |             | Defines the transportation mode: Car, pedestrian, truck, etc. Default value is `CAR`, except for Traceroute service for which default value is `EMERGENCY`. The map data contains information which are related to transportation mode such as: traffic directions, turn restrictions and road accessibility. Therefore the transportation mode can affect the route calculation.<br/> Available values:<br/> - `BICYCLE`: Bicycle.<br/> - `CAR`: Passenger car.<br/> - <s>`DELIVERY_TRUCK`</s>: Delivery truck. Deprecated, use `TRUCK` instead.<br/> - `EMERGENCY`: Emergency vehicle.<br/> - `MOTORCYCLE`: Motorcycle.<br/> - `PEDESTRIAN`: Pedestrian.<br/> - `PUBLIC_BUS`: Public bus.<br/> - `TAXI`: Taxi.<br/> - `TRUCK`: Truck.

#### __RoutingMaxSpd__
Class representing a routing maximal speed. Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __maxSpeed__ |             | Specifies a maximum speed for a vehicle in km/h. Type: `int`. |
| __type__ |             | Defines if max speed should be used for route calculation (`CAL`) and/or for route time estimation (`ETA`). By default (`ALL`) the speed applies to both cases.<br/> Available values:<br/> - `ALL`: Maximum speed apply to route calculation and to route ETA.<br/> - `CAL`: Maximum speed apply only to route calculation.<br/> - `ETA`: Maximum speed apply only to route ETA.

#### __RoutingVehicleFtr__
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

#### __RoutingEnergyVehicleFtr__
Class representing a routing energy vehicle feature. Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __auxConsumption__ |             | Vehicle's instantaneous auxiliary equipments consumption (in W). Type: `int`. |
| __batCapacity__ |             | Vehicle's capacity of the battery (in kWh, only if electric vehicle or hybrid re-chargeable, 0 otherwise). Type: `double`. |
| __crr__ |             | Vehicle's tire rolling resistance coefficient (dimension-less, in interval ]0, 1[). Type: `double`. |
| __dryWeight__ |             | Vehicle's weight without any consumables or passengers (in kg). Type: `int`. |
| __energyLoad__ |             | Vehicle's current energy load, state of charge (in kWh). Type: `double`. |
| __engineEfficiency__ |             | Vehicle's efficiency coefficient between engine and gear (dimension-less, in interval ]0, 1[). Type: `double`. |
| __extTemp__ |             | Outside temperature (in °C). Type: `float`. |
| __maxAccel__ |             | Maximum acceleration (superior to 0.1, in m/s², based on vehicle's acceleration capacity and expected driving behavior). Type: `double`. |
| __maxChargePower__ |             | Maximum charge power AC single phase authorized by the vehicle (in kW). Type: `double`. |
| __maxChargePowerAc3__ |             | Maximum charge power AC three phases authorized by the vehicle (in kW). Type: `double`. |
| __maxChargePowerDc__ |             | Maximum charge power DC authorized by the vehicle (in kW). Type: `double`. |
| __maxDecel__ |             | Maximum deceleration (inferior to -0.1, in m/s², based on vehicle's braking capacity and expected driving behavior). Type: `double`. |
| __payload__ |             | Vehicle's extra load (consumables or passengers weight for example) (in kg). Type: `int`. |
| __regenerativeBraking__ |             | Defines if the vehicle supports regenerative braking (default = true). Type: `boolean`. |
| __scx__ |             | Product of vehicle's front area and aerodynamic coefficient (in m²). Type: `double`. |

#### __RoutingSpeedPond__
Class representing a routing speed ponderation. Defines a speed coefficient for the specified road element's classification. Note: This parameter has no effect on Traceroute service. Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __factor__ |             | Specifies the speed coefficient. A value under 1 to reduce the speed, e.g: 0.8. A value over 1 to increase the speed, e.g: 1.3. `1` by default. Default value: '1'. Type: `float`. |
| __level__ |             | Road element's level (0: all 4 levels, 1: main level, 2: secondary level, 3: third level, 4: fourth level). Type: `int`. |
| __pondType__ |    optional | Define the ponderation type.<br/> Available values:<br/> - `ALL`: Speed coefficient applies both for finding the fastest route and calculating its ETA. Default value.<br/> - `CAL`: Speed coefficient applies only searching for the fastest route (only when fastest criteria is set).<br/> - `ETA`: Speed coefficient applies only for calculating route's travel time (ETA).
| __roadType__ |    optional | Define the road type.<br/> Available values:<br/> - `ALL`: All road network.<br/> - `DEFAULT`: Default.<br/> - `FERRY`: Ferry line.<br/> - `MOTORWAY`: Motorway.<br/> - `PEDESTRIAN`: Pedestrian.<br/> - `ROUNDABOUNT`: Roundabout.<br/> - `SLIPROAD`: Slip road.

#### __RoutingCrossPenaltiesCoef__
Defines a cross-penalties coefficient for the specified road element's classification. Note: This parameter has no effect on the Traceroute service. Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __factor__ |             | New coefficient factor for cross-penalties (Default = 1). Default value: '1'. Type: `float`. |
| __type__ |    optional | Defines if a new coefficient applies to route calculation or to route ETA or both (Default = ALL).<br/> Available values:<br/> - `ALL`: Speed coefficient applies both for finding the fastest route and calculating its ETA. Default value.<br/> - `CAL`: Speed coefficient applies only searching for the fastest route (only when fastest criteria is set).<br/> - `ETA`: Speed coefficient applies only for calculating route's travel time (ETA).

#### __CoordinateSat__
GPS coordinates. Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __lat__ |             | Latitude in degrees decimal ([WGS84](index.html#page-glossary-coordinate_system.md)). Type: `double`. |
| __lon__ |             | Longitude in degrees decimal ([WGS84](index.html#page-glossary-coordinate_system.md)). Type: `double`. |
| __heading__ |    optional | Heading in degrees. Type: `Double`. |
| __sat__ |    optional | Number of GPS satellites available. Type: `Integer`. |
| __speed__ |    optional | Speed in km/h. Type: `Float`. |
| __time__ |    optional | GPS time in milliseconds (EPOCH). Type: `Long`. |

#### __RouteHorizonDecWeather__
 Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __dry__ |    optional | Dry. Type: `boolean`. |
| __fog__ |    optional | Fog. Type: `boolean`. |
| __rain__ |    optional | Rain. Type: `boolean`. |
| __snow__ |    optional | Snow. Type: `boolean`. |
