| Field  | Optional | Description |
|--------|----------|-------------|
| __pools__ |             | Pools of charging station. Type: `list or array of [ChargingStationPool]`. See details below. |

#### __ChargingStationPool__
Class describing a charging station pool. Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __accessibility__ |             | Define the accessibility of a pool of charging station.<br/> Available values:<br/> - `CAR_SHARING_ONLY`: Car sharing only.<br/> - `NA`: Unspecified access to the area.<br/> - `OTHER`: Other.<br/> - `PRIVATE`: Private.<br/> - `PRIVATE_CUSTOMERS_ONLY`: Private customers only.<br/> - `PRIVATE_EMPLOYEES_ONLY`: Private employees only.<br/> - `PRIVATE_RESIDENTS_ONLY`: Private residents only.<br/> - `PRIVATE_UPON_PRESENTATION`: Private upon presentation.<br/> - `PUBLIC`: Publicly accessible area.<br/> - `PUBLIC_UPON_PRESENTATION`: Public upon presentation.<br/> - `PUBLIC_WITH_MEMBERSHIP`: Public with membership.<br/> - `RESTRICTED`: Controlled or restricted area access.<br/> - `UNSUPPORTED_VALUE`: Not found, not supported new value.
| __addressComplement__ |             | Pool complement of address. Type: `String`. |
| __availabilityStatus__ |             | Define the status of availability.<br/> Available values:<br/> - `FUTURE`: Future.<br/> - `IN_SERVICE`: In service.<br/> - `IN_SERVICE_BUSY`: In service but busy.<br/> - `IN_SERVICE_FREE`: In service and free.<br/> - `IN_SERVICE_RESERVED`: In service but reserved.<br/> - `NA`: Not specified.<br/> - `OUT_OF_ORDER`: Out Of Order.<br/> - `UNSUPPORTED_VALUE`: Not found, not supported new value.
| __brand__ |             | Brand name of pool. Type: `String`. |
| __chargingStations__ |             | List of charging stations. Type: `list or array of [ChargingStation]`. See details below. |
| __city__ |             | City name. Type: `String`. |
| __comment__ |             | Comment. Type: `String`. |
| __country__ |             | Country. Type: `String`. |
| __countryCode__ |             | ISO country code, 2 or 3 letters depends on provider (ISO 3166-1 alpha-2 and alpha-3). Type: `String`. |
| __customerId__ |             | Customer id. Type: `String`. |
| __floorNumber__ |             | Address floor number. Type: `String`. |
| __id__ |             | Unique identifier of pool, come from the provider. Type: `String`. |
| __images__ |             | Links to images related to the location such as photos or logos. Type: `list or array of [ImageUrl]`. See details below. |
| __latitude__ |             | Latitude in degrees decimal (WGS84) (double). Type: `double`. |
| __longitude__ |             | Longitude in degrees decimal (WGS84) (double). Type: `double`. |
| __maxNominalPower__ |             | Maximum of nominal power (in kW) present in pool. Type: `Double`. |
| __nameOfPool__ |             | Name of pool. Type: `String`. |
| __numberOfChargingPoint__ |             | Summarized of number of charging point present in pool. Type: `Integer`. |
| __numberOfParkingSpace__ |             | Number of parking space in the pool (parking). Type: `Integer`. |
| __open24x7__ |             | Pool is opened 24x7 hours. Type: `Boolean`. |
| __openingHours__ |             | List of opening hours. Type: `list or array of [PoolOpeningHour]`. See details below. |
| __operatorId__ |             | Operator unique identifier like eMI3 format. Type: `String`. |
| __phoneNumber__ |             | Phone number. Type: `String`. |
| __postalCode__ |             | Zip code. Type: `String`. |
| __predictedOccupancyTimeSlots__ |             | List of predicted occupancy time slots for a charging station. Each time slot provides information about the predicted occupancy level within a specific time range on a given day. Type: `list or array of [PredictedOccupancyTimeSlot]`. See details below. |
| __providerMode__ |             | Define if the data come from the local database or directly from provider API.<br/> Available values:<br/> - `LOCAL`: The charging station data come from the local database or cache (local request to spatial database).<br/> - `NOT_SUPPORTED_VALUE`: Not supported value for this API version.<br/> - `REMOTE`: The charging station data come directly from the provider database (remote request to provider API).
| __providerName__ |             | Provider name used by BeMap (bgis). Type: `String`. |
| __reliabilityScore__ |             | Reliability score of the pool. A score of 1 is the least reliable, and a score of 5 is the most reliable. Type: `Integer`. |
| __siteCategory__ |             | Reflects the general category type of the pool.<br/> Available values:<br/> - `BUILDING_DRIVEWAY`: Location is on the driveway of a house/building.<br/> - `BUILDING_PARKING`: Multi-storey car park.<br/> - `NA`: Not available.<br/> - `ON_MOTORWAY`: Location on a parking facility/rest area along a motorway, freeway, interstate, highway etc.<br/> - `ON_STREET`: Parking in public space along a street.<br/> - `OTHER`: Other, not categorized.<br/> - `PARKING_LOT`: A cleared area that is intended for parking vehicles, i.e. at super markets, bars, etc.<br/> - `UNDERGROUND_PARKING`: Multi-storey car park, mainly underground.<br/> - `UNKNOWN`: Unknown category.<br/> - `UNSUPPORTED_VALUE`: Not found, not supported new value.
| __siteType__ |             | Textual description of site. Type: `String`. |
| __sourceProvider__ |             | Name of the original provider. Type: `String`. |
| __street__ |             | Street name. Type: `String`. |
| __streetNumber__ |             | House number. Type: `String`. |
| __summaryOfConnectorTypeIds__ |             | Summarized of connector type, used as cache of different connector types present in pool. Type: `list or array of Integer`. |
| __tags__ |             | List of tags, will be used to perform some filtration based on provider or customer references. Type: `list or array of String`. |
| __timeZone__ |             | Time zone. One of IANA tzdata’s TZ-values representing the time zone of the location. Examples: "Europe/Oslo", "Europe/Zurich". (http://www.iana.org/time-zones) Type: `String`. |
| __updateDate__ |             | Update date, time stamp in milliseconds. Type: `Long`. |
| __vehicleAccess__ |             | Restrictions regarding vehicles. Type: `[SummaryParkingVehicleAccessFront]`. See details below. |

#### __PoolOpeningHour__
Class defining the opening hour (Date and time) of a pool of charging station. Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __dayOfweek__ |             | Day of week.<br/> Available values:<br/> - `FRIDAY`: FRIDAY.<br/> - `MONDAY`: MONDAY.<br/> - `SATURDAY`: SATURDAY.<br/> - `SUNDAY`: SUNDAY.<br/> - `THURSDAY`: THURSDAY.<br/> - `TUESDAY`: TUESDAY.<br/> - `WEDNESDAY`: WEDNESDAY.
| __end__ |             | End time of opened pool. Type: `String`. |
| __start__ |             | Start time of opened pool. Type: `String`. |

#### __ImageUrl__
Class representing url image. Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __category__ |             | Describes what the image is used for. Values can be CHARGER, ENTRANCE, LOCATION, NETWORK, OPERATOR, OTHER, OWNER.<br/> Available values:<br/> - `CHARGER`: Charger<br/> - `ENTRANCE`: Entrance<br/> - `LOCATION`: Location<br/> - `NETWORK`: Network<br/> - `NOT_SUPPORTED_VALUE`: Not supported value for this API version.<br/> - `OPERATOR`: Operator<br/> - `OTHER`: Other<br/> - `OWNER`: Owner
| __format__ |             | Image format like gif, jpeg, png, svg. Type: `String`. |
| __height__ |             | Height of the full-scale image. Type: `Short`. |
| __thumbnailUrl__ |             | URL from where a thumbnail of the image can be fetched through a web browser. Type: `String`. |
| __url__ |             | URL from where the image data can be fetched through a web browser. Type: `String`. |
| __width__ |             | Width of the full-scale image. Type: `Short`. |

#### __ChargingStation__
Class describing a charging station Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __authenticationInformation__ |             | Information about the authentication. Type: `String`. |
| __authenticationModes__ |             | Authentication mode. Type: `list or array of String`. |
| __availabilityStatus__ |             | Define the status of availability.<br/> Available values:<br/> - `FUTURE`: Future.<br/> - `IN_SERVICE`: In service.<br/> - `IN_SERVICE_BUSY`: In service but busy.<br/> - `IN_SERVICE_FREE`: In service and free.<br/> - `IN_SERVICE_RESERVED`: In service but reserved.<br/> - `NA`: Not specified.<br/> - `OUT_OF_ORDER`: Out Of Order.<br/> - `UNSUPPORTED_VALUE`: Not found, not supported new value.
| __bookable__ |             | Bookable. Set to true if the station is bookable. Type: `Boolean`. |
| __chargePasses__ |             | List of charge pass available a station. Type: `list or array of [ChargingTariffChargePassFront]`. See details below. |
| __chargingPoints__ |             | List of charging points. Type: `list or array of [ChargingPoint]`. See details below. |
| __id__ |             | ID of station. Type: `String`. |
| __images__ |             | Links to images related to the location such as photos or logos. Type: `list or array of [ImageUrl]`. See details below. |
| __nature__ |             | Nature define the interpretation and behavior. If VGROUP the data must be interpreted as an no reality object, just like a simple group. If is REAL, the object exist in the reality world.<br/> Available values:<br/> - `REAL`: The object exists in the real world.<br/> - `VGROUP`: The data must not be interpreted as an actual physical object, but as a simple group.
| __operatorId__ |             | Operator unique identifier like eMI3 format. Type: `String`. |
| __paymentInformation__ |             | Information about the payment mode. Type: `String`. |
| __paymentModes__ |             | Payment mode. Type: `list or array of String`. |
| __tags__ |             | List of tags, will be used to perform some filtration based on provider or customer references. Type: `list or array of String`. |

#### __ChargingTariffChargePassFront__
Class representing charge pass. Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __hashId__ |             | Unique identifier of charge pass. Type: `String`. |
| __title__ |             | Name of charge pass. Type: `String`. |
| __androidAppUrl__ |    optional | URL link to the Android application of charge network. Type: `String`. |
| __currency__ |    optional | Currency used for the subscription fee. This field stores the currency code or symbol used for the subscription fee. Type: `String`. |
| __description__ |    optional | A brief description or summary of the station charge pass. Type: `String`. |
| __iosAppUrl__ |    optional | URL link to the iOS application of charge network. Type: `String`. |
| __networkName__ |    optional | Unique name of charge network. Type: `String`. |
| __networkUrl__ |    optional | URL link to the website of charge network. Type: `String`. |
| __subscriptionFeeExclVat__ |    optional | Subscription fee excluding VAT. This field stores the fee amount charged for a subscription before any value-added tax is applied. Type: `Float`. |
| __subscriptionType__ |    optional | Type of subscription associated with the entity. This may denote the specific subscription model or tier for accessing the station service. Type: `String`. |

#### __ChargingPoint__
Class describing a charging point. Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __ampere__ |             | Ampere of current. Type: `Float`. |
| __availabilityStatus__ |             | Define the status of availability.<br/> Available values:<br/> - `FUTURE`: Future.<br/> - `IN_SERVICE`: In service.<br/> - `IN_SERVICE_BUSY`: In service but busy.<br/> - `IN_SERVICE_FREE`: In service and free.<br/> - `IN_SERVICE_RESERVED`: In service but reserved.<br/> - `NA`: Not specified.<br/> - `OUT_OF_ORDER`: Out Of Order.<br/> - `UNSUPPORTED_VALUE`: Not found, not supported new value.
| __availabilityUntil__ |             | Availability available until time (Time stamp in milliseconds). Type: `Long`. |
| __connectorTypes__ |             | List of connector type. Type: `list or array of [ConnectorTypeFront]`. See details below. |
| __currency__ |             | Currency ISO 4217 Code. Type: `String`. |
| __currentType__ |             | Current type (AC/DC).<br/> Available values:<br/> - `AC`: Alternating current (AC), but the number of phases is not available.<br/> - `AC_SINGLE_PHASE`: Alternating current (AC), single phase.<br/> - `AC_THREE_PHASES`: Alternating current (AC), three phases.<br/> - `DC`: Direct current (DC).<br/> - `NA`: Not available (NA).
| __id__ |             | ID of charging point. Type: `String`. |
| __operatorId__ |             | Operator unique identifier like eMI3 format. Type: `String`. |
| __parkingSpot__ |             | Vehicle access restrictions and parking information for this charging point. Type: `[ParkingVehicleAccessFront]`. See details below. |
| __power__ |             | Electrical power in kW. Type: `double`. |
| __remoteCharging__ |             | True if a charging session can be started remotely. Type: `Boolean`. |
| __tags__ |             | List of tags, will be used to perform some filtration based on provider or customer references. Type: `list or array of String`. |
| __tariffs__ |             | List of tariff. Type: `list or array of [ChargingTariffItemFront]`. See details below. |
| __tariffsChargePassHashId__ |             | Represents a unique identifier hash associated with the tariffs used for calculating charges. Type: `String`. |
| __tariffsType__ |             | Represents the type of tariffs, e.i. AD_HOC, MSP. Type: `String`. |
| __type__ |             | ID of first connector type. Type: `int`. |
| __voltage__ |             | Voltage of current. Type: `Float`. |

#### __ConnectorTypeFront__
Class representing a connector type. Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __acSingle__ |             | AC single phase. Type: `boolean`. |
| __acThree__ |             | Current type AC three phases. Type: `boolean`. |
| __ampere__ |             | Ampere of current. Type: `Float`. |
| __cable__ |             | The connector have a cable. Type: `boolean`. |
| __dc__ |             | Current type DC. Type: `boolean`. |
| __deprecated__ |             | Set to true if the information is deprecated. Type: `boolean`. |
| __id__ |             | BeMap unique identifier of connector. Type: `int`. |
| __key__ |             | BeMap unique identifier text key of connector. Same as id field but with string value. Type: `String`. |
| __maxPower__ |             | Maximal power in kW of connector. Unlimited is `0`. Type: `double`. |
| __name__ |             | Name of connector. Type: `String`. |
| __norm__ |             | Norm of connector. Type: `String`. |
| __operatorId__ |             | Operator unique identifier like eMI3 format. Type: `String`. |
| __power__ |             | Available power in kW can be delivered by the station or charge point. Type: `Double`. |
| __voltage__ |             | Voltage of current. Type: `Float`. |

#### __ChargingTariffItemFront__
Class representing charging tariff. Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __prices__ |             | List of price. Type: `list or array of [ChargingPrice]`. See details below. |
| __restriction__ |    optional | Restriction information of prices. Type: `[ChargingPriceRestriction]`. See details below. |

#### __ChargingPriceRestriction__
Class representing charging price restrictions. Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __dayOfWeek__ |    optional | List of day of the week for this tariff to be valid. Values can be MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY, SUNDAY.<br/> Available values:<br/> - `FRIDAY`: <br/> - `MONDAY`: <br/> - `SATURDAY`: <br/> - `SUNDAY`: <br/> - `THURSDAY`: <br/> - `TUESDAY`: <br/> - `WEDNESDAY`: 
| __endDate__ |    optional | End date (AAAA-MM-DD). Type: `String`. |
| __endTime__ |    optional | End time of day (hh:mm). Type: `String`. |
| __maxDuration__ |    optional | Maximum duration in seconds for this tariff to be valid. Type: `Integer`. |
| __maxKwh__ |    optional | Maximum used energy in kWh for this tariff to be valid. Type: `Float`. |
| __maxPower__ |    optional | Maximum power in kW for this tariff to be valid. Type: `Double`. |
| __minDuration__ |    optional | Minimum duration in seconds for this tariff to be valid. Type: `Integer`. |
| __minKwh__ |    optional | Minimum used energy in kWh for this tariff to be valid. Type: `Float`. |
| __minPower__ |    optional | Minimum power in kW for this tariff to be valid. Type: `Double`. |
| __startDate__ |    optional | Start date (AAAA-MM-DD). Type: `String`. |
| __startTime__ |    optional | Start time of day (hh:mm). Type: `String`. |

#### __ChargingPrice__
Class representing charging price. Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __price__ |             | Price per unit (excluding VAT) for this tariff dimension. Type: `float`. |
| __type__ |             | Type of price dimension.<br/> Available values:<br/> - `ENERGY`: defined in kWh.<br/> - `FLAT`: flat fee, no unit.<br/> - `PARKING_TIME`: time not charging, defined in hours.<br/> - `TIME`: time charging, defined in hours.
| __minAmount__ |    optional | Minimum amount to be billed. Type: `float`. |
| __unit__ |    optional | Unit of price.<br/> Available values:<br/> - `NA`: <br/> - `PER_HOUR`: <br/> - `PER_KWH`: 
| __vat__ |    optional | Applicable VAT percentage for this tariff dimension. If omitted, no VAT is applicable. Type: `float`. |

#### __ParkingVehicleAccessFront__
Class describing vehicle access to a charging station pool. Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __dangerousGoodsAllowed__ |             | Whether vehicles loaded with dangerous goods are allowed to park. Type: `Boolean`. |
| __maxHeight__ |             | Maximum height (in cm) of a vehicle to access the parking. Null if no restriction. Type: `Integer`. |
| __maxLength__ |             | Maximum length (in cm) of a vehicle to access the parking. Null if no restriction. Type: `Integer`. |
| __maxWeight__ |             | Maximum weight (in tenth of ton) of a vehicle to access the parking. Null if no restriction. Type: `Integer`. |
| __maxWidth__ |             | Maximum width (in cm) of a vehicle to access the parking. Null if no restriction. Type: `Integer`. |
| __overnightParkingAllowed__ |             | Whether overnight parking is allowed for heavy vehicles. Type: `Boolean`. |
| __parkingOrientation__ |             | The direction in which vehicles are parked at the charging station.<br/> Available values:<br/> - `ANGLE`: Parking happens at an angle to the roadway on which vehicles approach the charging station (i.e. echelon parking).<br/> - `DRIVE_THROUGH`: A vehicle can stop, charge, and proceed without reversing into or out of a parking bay. This is particularly important for heavy vehicles with trailers.<br/> - `PARALLEL`: Parking happens parallel to the roadway on which vehicles approach the charging station.<br/> - `PERPENDICULAR`: Parking happens perpendicular to the roadway on which vehicles approach the charging station.
| __transportTypes__ |             | List of transport types that can use this parking.<br/> Available values:<br/> - `BICYCLE`: Bicycle.<br/> - `CAR`: Passenger car.<br/> - <s>`DELIVERY_TRUCK`</s>: Delivery truck. Deprecated, use `TRUCK` instead.<br/> - `EMERGENCY`: Emergency vehicle.<br/> - `MOTORCYCLE`: Motorcycle.<br/> - `PEDESTRIAN`: Pedestrian.<br/> - `PUBLIC_BUS`: Public bus.<br/> - `TAXI`: Taxi.<br/> - `TRUCK`: Truck.

#### __PredictedOccupancyTimeSlot__
Class defining a predicted occupancy time slot for a charging station. Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __dayOfweek__ |             | Day of week.<br/> Available values:<br/> - `FRIDAY`: FRIDAY.<br/> - `MONDAY`: MONDAY.<br/> - `SATURDAY`: SATURDAY.<br/> - `SUNDAY`: SUNDAY.<br/> - `THURSDAY`: THURSDAY.<br/> - `TUESDAY`: TUESDAY.<br/> - `WEDNESDAY`: WEDNESDAY.
| __end__ |             | End time of opened pool. Type: `String`. |
| __predictedOccupancy__ |             | Predicted occupancy. This value ranges from 0 to 10, where: `0` means the station is least occupied. `10` means the station is fully occupied. Type: `Integer`. |
| __start__ |             | Start time of opened pool. Type: `String`. |

#### __SummaryParkingVehicleAccessFront__
Describing the summary of vehicle access to most accessible charging stations in pool. See the vehicle access of charging points if available for more precise information on the parking place. Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __dangerousGoodsAllowed__ |             | Whether vehicles loaded with dangerous goods are allowed to park. Type: `Boolean`. |
| __maxHeight__ |             | Maximum height (in cm) of a vehicle to access the parking. Null if no restriction. Type: `Integer`. |
| __maxLength__ |             | Maximum length (in cm) of a vehicle to access the parking. Null if no restriction. Type: `Integer`. |
| __maxWeight__ |             | Maximum weight (in tenth of ton) of a vehicle to access the parking. Null if no restriction. Type: `Integer`. |
| __maxWidth__ |             | Maximum width (in cm) of a vehicle to access the parking. Null if no restriction. Type: `Integer`. |
| __overnightParkingAllowed__ |             | Whether overnight parking is allowed for heavy vehicles. Type: `Boolean`. |
| __parkingOrientation__ |             | The direction in which vehicles are parked at the charging station.<br/> Available values:<br/> - `ANGLE`: Parking happens at an angle to the roadway on which vehicles approach the charging station (i.e. echelon parking).<br/> - `DRIVE_THROUGH`: A vehicle can stop, charge, and proceed without reversing into or out of a parking bay. This is particularly important for heavy vehicles with trailers.<br/> - `PARALLEL`: Parking happens parallel to the roadway on which vehicles approach the charging station.<br/> - `PERPENDICULAR`: Parking happens perpendicular to the roadway on which vehicles approach the charging station.
| __parkingOrientations__ |             | <br/> Available values:<br/> - `ANGLE`: <br/> - `DRIVE_THROUGH`: <br/> - `PARALLEL`: <br/> - `PERPENDICULAR`: 
| __transportTypes__ |             | List of transport types that can use this parking.<br/> Available values:<br/> - `BICYCLE`: Bicycle.<br/> - `CAR`: Passenger car.<br/> - <s>`DELIVERY_TRUCK`</s>: Delivery truck. Deprecated, use `TRUCK` instead.<br/> - `EMERGENCY`: Emergency vehicle.<br/> - `MOTORCYCLE`: Motorcycle.<br/> - `PEDESTRIAN`: Pedestrian.<br/> - `PUBLIC_BUS`: Public bus.<br/> - `TAXI`: Taxi.<br/> - `TRUCK`: Truck.
