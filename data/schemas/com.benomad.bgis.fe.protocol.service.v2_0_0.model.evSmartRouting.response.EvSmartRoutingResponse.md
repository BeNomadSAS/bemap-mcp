| Field  | Optional | Description |
|--------|----------|-------------|
| __journeys__ |             | Describes the whole itinerary which can be composed of multiple journeys. Type: `list or array of [JourneyFront]`. See details below. |
| __logTag__ |             | Log tag is an UUID tag used during the request calculation. Type: `String`. |

#### __JourneyFront__
Class describing the information about the journey, summary, list of events along the route, etc. Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __events__ |             | Describes all information along the computed journey. Type: `list or array of [EventFront]`. See details below. |
| __summary__ |             | Summary of journey information. Type: `[SummaryFront]`. See details below. |
| __timeSlotWarns__ |             | List of warnings about the time slots request. Type: `list or array of [TimeSlotWarningFront]`. See details below. |

#### __SummaryFront__
Class describing the trip's summary. Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __arrivalTime__ |             | Arrival time in milliseconds. Type: `long`. |
| __batteryLevel__ |             | Remaining battery level (in percentage) at the end of the trip. Type: `double`. |
| __boundingBox__ |             | The rectangle that encompasses the entire trip, defined by four coordinates. Type: `[BoundingBoxFront]`. See details below. |
| __chargingTime__ |             | Sum of charging time in seconds. Type: `long`. |
| __consumed__ |             | Sum of consumed values in kWh. Type: `double`. |
| __departureTime__ |             | Departure time in milliseconds. Type: `long`. |
| __distance__ |             | Distance: sum of distance, in meters. Type: `long`. |
| __duration__ |             | Duration: sum of duration, in seconds. Type: `long`. |
| __vehicleInfo__ |             | Vehicle information used to compute the journey. Type: `[VehicleInfoFront]`. See details below. |
| __chargingCost__ |    optional | Sum of charging cost. Type: `[ChargingCostFront]`. See details below. |
| __savedCo2Emissions__ |    optional | Saved CO2 Emissions (kg). This value is calculated from the amount of energy consumed for this journey using the profile of an ICE vehicle similar to the selected electric vehicle. Type: `Float`. |
| __tollSumFees__ |    optional | Sum of toll cost. Type: `[TollSumFeesFront]`. See details below. |

#### __VehicleInfoFront__
Class describing the vehicle information used for the journey computation. Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __brand__ |             | Brand name. Type: `String`. |
| __name__ |             | Model name of vehicle. Type: `String`. |
| __variant__ |    optional | Variant of model. Type: `String`. |
| __year__ |    optional | Year of vehicle model. Type: `String`. |

#### __BoundingBoxFront__
This a model class for creating a rectangle that includes the whole trip which is defined with 4 coordinates. Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __maxLat__ |             | Maximum latitude, in degrees decimal ([WGS84](index.html#page-glossary-coordinate_system.md)). Type: `double`. |
| __maxLon__ |             | Maximum longitude, in degrees decimal ([WGS84](index.html#page-glossary-coordinate_system.md)). Type: `double`. |
| __minLat__ |             | Minimum latitude, in degrees decimal ([WGS84](index.html#page-glossary-coordinate_system.md)). Type: `double`. |
| __minLon__ |             | Minimum longitude, in degrees decimal ([WGS84](index.html#page-glossary-coordinate_system.md)). Type: `double`. |

#### __ChargingCostFront__
Class representing an estimated charging cost and time, based on vehicle, connector power, charge need and prices list. Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __currency__ |    optional | Currency ISO 4217 Code. Type: `String`. |
| __includeVat__ |    optional | Price include VAT. Type: `float`. |
| __tariffChargePassHashId__ |    optional | Represents the hashed identifier for tariff charge passes that used to calculate the cost. Type: `String`. |
| __withoutVat__ |    optional | Price without VAT. Type: `float`. |

#### __TollSumFeesFront__
Class describing the total of toll fees. Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __currency__ |    optional | Currency in norm ISO 4217, more details on Wikipedia ISO 4217 https://en.wikipedia.org/wiki/ISO_4217. Type: `String`. |
| __feeMax__ |    optional | The maximum fee. Type: `double`. |
| __feeMin__ |    optional | The minimum fee. Type: `double`. |

#### __EventFront__
Class representing an Event. Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __eventType__ |             | The event's type.<br/> Available values:<br/> - `CHARGE`: Charge step, event contains information about the charge step location of trip.<br/> - `EXCEPTION`: Exception event can show the information about a error on the API conversion between backend and frontend.<br/> - `NOT_SUPPORTED_ENUM`: The event type is not supported by this API version, please check if a newer API is already released.<br/> - `ROUTE`: Route, that represent the route information about part of trip.<br/> - `START`: Start point, event contains information about the start location of trip.<br/> - `STOP`: Stop point, event contains information about the stop location of trip.<br/> - `TOLL`: Toll along the journey.<br/> - `VIA`: Via point, event contains information about the way-point location of trip.

#### __ChargeEventFront__
Class representing a charge event Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __arrivalBatteryLevel__ |             | The charge event's arrival battery level. Type: `double`. |
| __chargingPower__ |             | The charge event's charging power. Type: `[ChargingPowerFront]`. See details below. |
| __chargingTime__ |             | The charge event's charging time. Type: `long`. |
| __coord__ |             | Coordinate of map matched address. Type: `[CoordinateFront]`. See details below. |
| __departureBatteryLevel__ |             | The charge event's departure battery level. Type: `double`. |
| __eventType__ |             | The event's type.<br/> Available values:<br/> - `CHARGE`: Charge step, event contains information about the charge step location of trip.<br/> - `EXCEPTION`: Exception event can show the information about a error on the API conversion between backend and frontend.<br/> - `NOT_SUPPORTED_ENUM`: The event type is not supported by this API version, please check if a newer API is already released.<br/> - `ROUTE`: Route, that represent the route information about part of trip.<br/> - `START`: Start point, event contains information about the start location of trip.<br/> - `STOP`: Stop point, event contains information about the stop location of trip.<br/> - `TOLL`: Toll along the journey.<br/> - `VIA`: Via point, event contains information about the way-point location of trip.
| __pool__ |             | The charge event's pool. Type: `[PoolFront]`. See details below. |
| __address__ |    optional | Map matched address. Type: `String`. |
| __arrivalTime__ |    optional | Time stamp in milliseconds of arrival to the step point. Type: `Long`. |
| __chargingCost__ |    optional | The charge event's charging cost. Type: `[ChargingCostFront]`. See details below. |
| __departureTime__ |    optional | Time stamp in milliseconds of departure from the step point. Type: `Long`. |
| __weather__ |    optional | Weather condition at Step point. Type: `[LocalWeatherFront]`. See details below. |

#### __ChargingPowerFront__
Class representing charging power. Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __cnnTypeId__ |    optional | Connector type ID used to charging the vehicle battery. Type: `Integer`. |
| __currentType__ |    optional | Current type (AC/DC).<br/> Available values:<br/> - `AC`: Alternating current (AC), but the number of phases is not available.<br/> - `AC_SINGLE_PHASE`: Alternating current (AC), single phase.<br/> - `AC_THREE_PHASES`: Alternating current (AC), three phases.<br/> - `DC`: Direct current (DC).<br/> - `NA`: Not available (NA).
| __power__ |    optional | Power in kW will used to charging the vehicle battery. Type: `double`. |

#### __PoolFront__
Class describing a step point. Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __accessibility__ |             | Define the accessibility of a pool of charging station.<br/> Available values:<br/> - `CAR_SHARING_ONLY`: Car sharing only.<br/> - `NA`: Unspecified access to the area.<br/> - `OTHER`: Other.<br/> - `PRIVATE`: Private.<br/> - `PRIVATE_CUSTOMERS_ONLY`: Private customers only.<br/> - `PRIVATE_EMPLOYEES_ONLY`: Private employees only.<br/> - `PRIVATE_RESIDENTS_ONLY`: Private residents only.<br/> - `PRIVATE_UPON_PRESENTATION`: Private upon presentation.<br/> - `PUBLIC`: Publicly accessible area.<br/> - `PUBLIC_UPON_PRESENTATION`: Public upon presentation.<br/> - `PUBLIC_WITH_MEMBERSHIP`: Public with membership.<br/> - `RESTRICTED`: Controlled or restricted area access.<br/> - `UNSUPPORTED_VALUE`: Not found, not supported new value.
| __address__ |             | Pool address. Type: `[PostalAddressFront]`. See details below. |
| __addressComplement__ |             | Pool complement of address. Type: `String`. |
| __availabilityStatus__ |             | Availability status.<br/> Available values:<br/> - `FUTURE`: Future.<br/> - `IN_SERVICE`: In service.<br/> - `IN_SERVICE_BUSY`: In service but busy.<br/> - `IN_SERVICE_FREE`: In service and free.<br/> - `IN_SERVICE_RESERVED`: In service but reserved.<br/> - `NA`: Not specified.<br/> - `OUT_OF_ORDER`: Out Of Order.<br/> - `UNSUPPORTED_VALUE`: Not found, not supported new value.
| __availabilityUntil__ |             | Time stamp in milliseconds. Type: `Long`. |
| __brand__ |             | Brand name of pool. Type: `String`. |
| __comment__ |             | Comment. Type: `String`. |
| __countryCode__ |             | ISO country code, 2 digits. Type: `String`. |
| __customerId__ |             | Customer id. Type: `String`. |
| __entrance__ |             | Coordinate of entrance gateway to pool access. Type: `[CoordinateFront]`. See details below. |
| __floorNumber__ |             | Address floor number. Type: `String`. |
| __id__ |             | Unique identifier of pool, come from the provider. Type: `String`. |
| __imageLinks__ |             | Links to images related to the location such as photos or logos. Type: `list or array of [ImageLinkFront]`. See details below. |
| __maxNominalPower__ |             | Maximum of nominal power (in kW) present in pool. Type: `Double`. |
| __name__ |             | Name of pool. Type: `String`. |
| __numberOfChargingPoint__ |             | Summary of number of charging points present in pool. Type: `Integer`. |
| __numberOfParkingSpace__ |             | Number of parking space in the pool (parking). Type: `Integer`. |
| __open24x7__ |             | Pool is opened 24x7 hours. Type: `Boolean`. |
| __openingHours__ |             | List of opening hours. Type: `list or array of [PoolOpeningHourFront]`. See details below. |
| __operatorId__ |             | Operator unique identifier like eMI3 format. Type: `String`. |
| __phoneNumber__ |             | Phone number. Type: `String`. |
| __predictedOccupancyTimeSlots__ |             | List of predicted occupancy time slots for a charging station. Each time slot provides information about the predicted occupancy level within a specific time range on a given day. Type: `list or array of [PredictedOccupancyTimeSlotFront]`. See details below. |
| __providerMode__ |             | Define if the data come from the local database or directly from provider API.<br/> Available values:<br/> - `LOCAL`: The charging station data come from the local database or cache (local request to spatial database).<br/> - `NOT_SUPPORTED_VALUE`: Not supported value for this API version.<br/> - `REMOTE`: The charging station data come directly from the provider database (remote request to provider API).
| __providerName__ |             | Provider name used by BeMap (bgis). Type: `String`. |
| __reliabilityScore__ |             | Reliability score of the pool. A score of 1 is the least reliable, and a score of 5 is the most reliable. Type: `Integer`. |
| __siteCategory__ |             | Reflects the general category type of the pool.<br/> Available values:<br/> - `BUILDING_DRIVEWAY`: Location is on the driveway of a house/building.<br/> - `BUILDING_PARKING`: Multi-storey car park.<br/> - `NA`: Not available.<br/> - `ON_MOTORWAY`: Location on a parking facility/rest area along a motorway, freeway, interstate, highway etc.<br/> - `ON_STREET`: Parking in public space along a street.<br/> - `OTHER`: Other, not categorized.<br/> - `PARKING_LOT`: A cleared area that is intended for parking vehicles, i.e. at super markets, bars, etc.<br/> - `UNDERGROUND_PARKING`: Multi-storey car park, mainly underground.<br/> - `UNKNOWN`: Unknown category.<br/> - `UNSUPPORTED_VALUE`: Not found, not supported new value.
| __siteType__ |             | Textual description of site. Type: `String`. |
| __sourceProvider__ |             | Name of the original provider. Type: `String`. |
| __stations__ |             | List of stations in pool. Type: `list or array of [StationFront]`. See details below. |
| __summaryOfConnectorTypeIds__ |             | Summarized of connector type, used as cache of different connector types present in pool. Type: `list or array of Integer`. |
| __tags__ |             | List of tags, will be used to perform some filtration based on provider or customer references. Type: `list or array of String`. |
| __timeZone__ |             | Time zone. One of IANA tzdata’s TZ-values representing the time zone of the location. Examples: "Europe/Oslo", "Europe/Zurich". (http://www.iana.org/time-zones) Type: `String`. |
| __updateDate__ |             | Update date, time stamp in milliseconds. Type: `Long`. |
| __vehicleAccess__ |             | Restrictions regarding vehicles. Type: `[SummaryParkingVehicleAccessFront]`. See details below. |

#### __PostalAddressFront__
Define a postal address, [Wikipedia link](http://en.wikipedia.org/wiki/Postal_address). Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __city__ |             | City name. Type: `String`. |
| __country__ |             | Country name. Type: `String`. |
| __countryCode__ |             | ISO code of country. Type: `String`. |
| __county__ |             | County name. Type: `String`. |
| __district__ |             | District name of city. Type: `String`. |
| __postalCode__ |             | Postal code. Type: `String`. |
| __roadNumber__ |             | Road number. Type: `String`. |
| __state__ |             | State name. Type: `String`. |
| __street__ |             | Street name. Type: `String`. |
| __streetNumber__ |             | House number. Type: `String`. |

#### __CoordinateFront__
Describe a coordinate which consists of a latitude and longitude. Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __lat__ |             | Latitude in degrees decimal ([WGS84](index.html#page-glossary-coordinate_system.md)). Type: `double`. |
| __lon__ |             | Longitude in degrees decimal ([WGS84](index.html#page-glossary-coordinate_system.md)). Type: `double`. |
| __alt__ |    optional | Altitude in meters. Type: `Double`. |

#### __PoolOpeningHourFront__
Class defining the opening hour (Date and time) of a pool of charging station. Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __dayOfweek__ |             | Day of week.<br/> Available values:<br/> - `FRIDAY`: FRIDAY.<br/> - `MONDAY`: MONDAY.<br/> - `SATURDAY`: SATURDAY.<br/> - `SUNDAY`: SUNDAY.<br/> - `THURSDAY`: THURSDAY.<br/> - `TUESDAY`: TUESDAY.<br/> - `WEDNESDAY`: WEDNESDAY.
| __end__ |             | End time of opened pool. Type: `String`. |
| __start__ |             | Start time of opened pool. Type: `String`. |

#### __ImageLinkFront__
Class representing url image. Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __category__ |             | Describes what the image is used for. Values can be CHARGER, ENTRANCE, LOCATION, NETWORK, OPERATOR, OTHER, OWNER.<br/> Available values:<br/> - `CHARGER`: Charger<br/> - `ENTRANCE`: Entrance<br/> - `LOCATION`: Location<br/> - `NETWORK`: Network<br/> - `NOT_SUPPORTED_VALUE`: Not supported value for this API version.<br/> - `OPERATOR`: Operator<br/> - `OTHER`: Other<br/> - `OWNER`: Owner
| __format__ |             | Image format like gif, jpeg, png, svg. Type: `String`. |
| __height__ |             | Height of the full-scale image. Type: `Short`. |
| __thumbnailUrl__ |             | URL from where a thumbnail of the image can be fetched through a web browser. Type: `String`. |
| __url__ |             | URL from where the image data can be fetched through a web browser. Type: `String`. |
| __width__ |             | Width of the full-scale image. Type: `Short`. |

#### __PredictedOccupancyTimeSlotFront__
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
| __transportTypes__ |             | List of transport types that can use this parking.<br/> Available values:<br/> - `BICYCLE`: Bicycle.<br/> - `CAR`: Passenger car, tourist car.<br/> - `DELIVERY_TRUCK`: Delivery truck.<br/> - `EMERGENCY`: Emergency vehicle.<br/> - `MOTORCYCLE`: Motorcycle.<br/> - `PEDESTRIAN`: Pedestrian.<br/> - `PUBLIC_BUS`: Public bus.<br/> - `TAXI`: Taxi.<br/> - `TRUCK`: Truck.

#### __StationFront__
 Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __authenticationInformation__ |             | Information about the authentication. Type: `String`. |
| __authenticationModes__ |             | Authentication mode.<br/> Available values:<br/> - `APPS`: By application.<br/> - `BARCODE`: BarCode.<br/> - `CPL_15118`: CPL 15118.<br/> - `KEYBOARD`: Keyboard key.<br/> - `NA`: Not specified.<br/> - `NO`: No Authentication.<br/> - `NOT_FOUND`: Not found, not supported new value.<br/> - `OTHER`: Other.<br/> - `PHONE`: By Phone.<br/> - `PHONE_PLATFORM`: Phone (via platform).<br/> - `QR_CODE`: QR Code.<br/> - `RADIO_15118`: Radio 15118.<br/> - `RFID_BADGE`: RFID Badge.<br/> - `RFID_CALYPSO`: Calypso RFID Badge.<br/> - `RFID_MIFARE_CLASSIC`: RFID Badge / NFC Phone - Mifare Classic.<br/> - `RFID_MIFARE_DESFIRE`: RFID Badge / NFC Phone - Mifare Desfire.<br/> - `RFID_ULTRALIGHT`: RFID Ultralight.<br/> - `SMS`: SMS.
| __availabilityStatus__ |             | Define the status of availability.<br/> Available values:<br/> - `FUTURE`: Future.<br/> - `IN_SERVICE`: In service.<br/> - `IN_SERVICE_BUSY`: In service but busy.<br/> - `IN_SERVICE_FREE`: In service and free.<br/> - `IN_SERVICE_RESERVED`: In service but reserved.<br/> - `NA`: Not specified.<br/> - `OUT_OF_ORDER`: Out Of Order.<br/> - `UNSUPPORTED_VALUE`: Not found, not supported new value.
| __availabilityStatusSchedule__ |             | List of scheduled availability status. Type: `list or array of [AvailabilityStatusScheduleFront]`. See details below. |
| __bookable__ |             | Bookable. Set to true if the station is bookable. Type: `Boolean`. |
| __chargePasses__ |             | List of charge pass available a station. Type: `list or array of [ChargingPassFront]`. See details below. |
| __chargingPoints__ |             | List of charging points. Type: `list or array of [ChargingPointFront]`. See details below. |
| __coordinate__ |             | Coordinate of station. Type: `[CoordinateFront]`. See details below. |
| __floorNumber__ |             | Floor number on which the charging station is located (in garage buildings). Type: `String`. |
| __id__ |             | ID of station. Type: `String`. |
| __images__ |             | Links to images related to the location such as photos or logos. Type: `list or array of [ImageLinkFront]`. See details below. |
| __nature__ |             | Nature define the interpretation and behavior. If VGROUP the data must be interpreted as an no reality object, just like a simple group. If is REAL, the object exist in the reality world.<br/> Available values:<br/> - `REAL`: The object exists in the real world.<br/> - `UNSUPPORTED_VALUE`: Not found, not supported new value.<br/> - `VGROUP`: The data must not be interpreted as an actual physical object, but as a simple group.
| __operatorId__ |             | Operator unique identifier like eMI3 format. Type: `String`. |
| __paymentInformation__ |             | Information about the payment mode. Type: `String`. |
| __paymentModes__ |             | Payment mode.<br/> Available values:<br/> - `CASH`: Paid charging service, cash.<br/> - `CREDIT_CARD`: Paid charging service, credit card.<br/> - `FREE`: Free charging service.<br/> - `NA`: Unspecified means of payment.<br/> - `NOT_FOUND`: Not found, not supported new value.<br/> - `OPERATOR_CONTRACT`: Paid charging service, operator contract.<br/> - `OTHER`: Other.<br/> - `PREPAID_CARD`: Paid charging service, prepaid card.
| __tags__ |             | List of tags, will be used to perform some filtration based on provider or customer references. Type: `list or array of String`. |

#### __AvailabilityStatusScheduleFront__
 Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __status__ |             | Availability status.<br/> Available values:<br/> - `FUTURE`: Future.<br/> - `IN_SERVICE`: In service.<br/> - `IN_SERVICE_BUSY`: In service but busy.<br/> - `IN_SERVICE_FREE`: In service and free.<br/> - `IN_SERVICE_RESERVED`: In service but reserved.<br/> - `NA`: Not specified.<br/> - `OUT_OF_ORDER`: Out Of Order.<br/> - `UNSUPPORTED_VALUE`: Not found, not supported new value.
| __end__ |    optional | End of the scheduled period, if known. Type: `Date`. |
| __start__ |    optional | Start of the scheduled period. If NULL, indicates that the schedule goes from now to end. Type: `Date`. |

#### __ChargingPassFront__
Class representing charge pass. Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __id__ |             | Unique identifier of charge pass. Type: `String`. |
| __title__ |             | Name of charge pass. Type: `String`. |
| __androidAppUrl__ |    optional | URL link to the Android application of charge network. Type: `String`. |
| __iosAppUrl__ |    optional | URL link to the iOS application of charge network. Type: `String`. |
| __networkName__ |    optional | Unique name of charge network. Type: `String`. |
| __networkUrl__ |    optional | URL link to the web-site of charge network. Type: `String`. |

#### __ChargingPointFront__
Class describing a charging point. Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __ampere__ |             | Ampere of current. Type: `Float`. |
| __availabilityStatus__ |             | Define the status of availability.<br/> Available values:<br/> - `FUTURE`: Future.<br/> - `IN_SERVICE`: In service.<br/> - `IN_SERVICE_BUSY`: In service but busy.<br/> - `IN_SERVICE_FREE`: In service and free.<br/> - `IN_SERVICE_RESERVED`: In service but reserved.<br/> - `NA`: Not specified.<br/> - `OUT_OF_ORDER`: Out Of Order.<br/> - `UNSUPPORTED_VALUE`: Not found, not supported new value.
| __availabilityUntil__ |             | Availability available until time (Time stamp in milliseconds). Type: `Long`. |
| __chargePassHashId__ |             | Hash ID of charge pass. Type: `String`. |
| __connectorTypes__ |             | List of connector type. Type: `list or array of [ConnectorTypeFront]`. See details below. |
| __currency__ |             | Currency ISO 4217 Code. Type: `String`. |
| __currentType__ |             | Current type (AC/DC).<br/> Available values:<br/> - `AC`: Alternating current (AC), but the number of phases is not available.<br/> - `AC_SINGLE_PHASE`: Alternating current (AC), single phase.<br/> - `AC_THREE_PHASES`: Alternating current (AC), three phases.<br/> - `DC`: Direct current (DC).<br/> - `NA`: Not available (NA).<br/> - `UNSUPPORTED_VALUE`: Not found, not supported new value.
| __id__ |             | ID of charging point. Type: `String`. |
| __operatorId__ |             | Operator unique identifier like eMI3 format. Type: `String`. |
| __parkingSpot__ |             | Vehicle access restrictions and parking information for this charging point. Type: `[ParkingVehicleAccessFront]`. See details below. |
| __power__ |             | Electrical power in kW. Type: `double`. |
| __remoteCharging__ |             | True if a charging session can be started remotely. Type: `Boolean`. |
| __tags__ |             | List of tags, will be used to perform some filtration based on provider or customer references. Type: `list or array of String`. |
| __tariffs__ |             | List of tariff. Type: `list or array of [ChargingTariffFront]`. See details below. |
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

#### __ChargingTariffFront__
Class representing charging tariff. Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __prices__ |             | List of price. Type: `list or array of [ChargingPriceFront]`. See details below. |
| __restriction__ |    optional | Restriction information of prices. Type: `[ChargingPriceRestrictionFront]`. See details below. |

#### __ChargingPriceRestrictionFront__
Class representing charging price restrictions. Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __dayOfWeek__ |    optional | List of day of the week for this tariff to be valid. Values can be MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY, SUNDAY.<br/> Available values:<br/> - `FRIDAY`: FRIDAY.<br/> - `MONDAY`: MONDAY.<br/> - `SATURDAY`: SATURDAY.<br/> - `SUNDAY`: SUNDAY.<br/> - `THURSDAY`: THURSDAY.<br/> - `TUESDAY`: TUESDAY.<br/> - `WEDNESDAY`: WEDNESDAY.
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

#### __ChargingPriceFront__
Class representing charging price. Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __price__ |             | Price per unit (excluding VAT) for this tariff dimension. Type: `float`. |
| __type__ |             | Type of price dimension.<br/> Available values:<br/> - `ENERGY`: defined in kWh..<br/> - `FLAT`: flat fee, no unit..<br/> - `PARKING_TIME`: time not charging, defined in hours..<br/> - `TIME`: time charging, defined in hours.<br/> - `UNSUPPORTED_VALUE`: Not found, not supported new value.
| __minAmount__ |    optional | Minimum amount to be billed. Type: `float`. |
| __unit__ |    optional | Unit of price.<br/> Available values:<br/> - `NA`: Not available.<br/> - `PER_HOUR`: PER_HOUR.<br/> - `PER_KWH`: PER_KWH.<br/> - `UNSUPPORTED_VALUE`: Not found, not supported new value.
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
| __transportTypes__ |             | List of transport types that can use this parking.<br/> Available values:<br/> - `BICYCLE`: Bicycle.<br/> - `CAR`: Passenger car, tourist car.<br/> - `DELIVERY_TRUCK`: Delivery truck.<br/> - `EMERGENCY`: Emergency vehicle.<br/> - `MOTORCYCLE`: Motorcycle.<br/> - `PEDESTRIAN`: Pedestrian.<br/> - `PUBLIC_BUS`: Public bus.<br/> - `TAXI`: Taxi.<br/> - `TRUCK`: Truck.

#### __ExceptionEventFront__
Class representing an exception during the trip. Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __eventType__ |             | The event's type.<br/> Available values:<br/> - `CHARGE`: Charge step, event contains information about the charge step location of trip.<br/> - `EXCEPTION`: Exception event can show the information about a error on the API conversion between backend and frontend.<br/> - `NOT_SUPPORTED_ENUM`: The event type is not supported by this API version, please check if a newer API is already released.<br/> - `ROUTE`: Route, that represent the route information about part of trip.<br/> - `START`: Start point, event contains information about the start location of trip.<br/> - `STOP`: Stop point, event contains information about the stop location of trip.<br/> - `TOLL`: Toll along the journey.<br/> - `VIA`: Via point, event contains information about the way-point location of trip.
| __message__ |             | list of the via event's POIs Type: `String`. |

#### __PlaceEventFront__
Class representing a place event. Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __coord__ |             | Coordinate of map matched address. Type: `[CoordinateFront]`. See details below. |
| __eventType__ |             | The event's type.<br/> Available values:<br/> - `CHARGE`: Charge step, event contains information about the charge step location of trip.<br/> - `EXCEPTION`: Exception event can show the information about a error on the API conversion between backend and frontend.<br/> - `NOT_SUPPORTED_ENUM`: The event type is not supported by this API version, please check if a newer API is already released.<br/> - `ROUTE`: Route, that represent the route information about part of trip.<br/> - `START`: Start point, event contains information about the start location of trip.<br/> - `STOP`: Stop point, event contains information about the stop location of trip.<br/> - `TOLL`: Toll along the journey.<br/> - `VIA`: Via point, event contains information about the way-point location of trip.
| __address__ |    optional | Map matched address. Type: `String`. |

#### __RouteEventFront__
A class representing a route event. Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __consumed__ |             | Battery capacity consumed in kWh. Type: `Double`. |
| __distance__ |             | The route event's distance in meters. Type: `int`. |
| __duration__ |             | The route event's duration in seconds. Type: `int`. |
| __eventType__ |             | The event's type.<br/> Available values:<br/> - `CHARGE`: Charge step, event contains information about the charge step location of trip.<br/> - `EXCEPTION`: Exception event can show the information about a error on the API conversion between backend and frontend.<br/> - `NOT_SUPPORTED_ENUM`: The event type is not supported by this API version, please check if a newer API is already released.<br/> - `ROUTE`: Route, that represent the route information about part of trip.<br/> - `START`: Start point, event contains information about the start location of trip.<br/> - `STOP`: Stop point, event contains information about the stop location of trip.<br/> - `TOLL`: Toll along the journey.<br/> - `VIA`: Via point, event contains information about the way-point location of trip.
| __encodedGeometry__ |    optional | Encoded geometry of the route, it is composed of a list of coordinates. Type: `String`. |
| __geometry__ |    optional | Geometry of the route, it is composed of a list of coordinates. Type: `list or array of [CoordinateFront]`. See details below. |
| __maxSpeed__ |    optional | Maximum speeds in km/h recommended by calculation from the previous event coordinate to the stop event or next event coordinate. Type: `Integer`. |
| __routeConsumptions__ |    optional | The route event's list of route consumptions. Type: `list or array of [RouteConsumptionFront]`. See details below. |
| __routesheet__ |    optional | The route event's list of routesheet instructions. Type: `list or array of [RoutesheetInstructionFront]`. See details below. |
| __transportType__ |    optional | The route event's transport type.<br/> Available values:<br/> - `BICYCLE`: Bicycle.<br/> - `CAR`: Passenger car, tourist car.<br/> - `DELIVERY_TRUCK`: Delivery truck.<br/> - `EMERGENCY`: Emergency vehicle.<br/> - `MOTORCYCLE`: Motorcycle.<br/> - `PEDESTRIAN`: Pedestrian.<br/> - `PUBLIC_BUS`: Public bus.<br/> - `TAXI`: Taxi.<br/> - `TRUCK`: Truck.

#### __RoutesheetInstructionFront__
Class representing a routing instructions. Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __coordinate__ |             | Returns the position of the intersection between the current and next road sections. Type: `[CoordinateFront]`. See details below. |
| __duration__ |             | Time of current road section in seconds. Type: `Integer`. |
| __fromName__ |             | Returns the name of current road section. Type: `String`. |
| __fromPhoneme__ |             | Returns the phonetic transcription of the name of current route section. Type: `String`. |
| __geoElementType__ |             | Instruction Geo element type.<br/> Available values:<br/> - `ALL_ROAD`: Road types.<br/> - `AMUSEMENT_PARK`: <br/> - `BANK`: <br/> - `BEACH`: <br/> - `BOWLING`: <br/> - `BUILT_UP_AREA_MAIN`: Urban area coverage size main, not an administrative area.<br/> - `BUILT_UP_AREA_MEDIUM`: Urban area coverage size medium (not an administrative area).<br/> - `BUILT_UP_AREA_NA`: Urban area information not available.<br/> - `BUILT_UP_AREA_NONE`: No urban area.<br/> - `BUILT_UP_AREA_SMALL`: Urban area coverage size small (not an administrative area).<br/> - `BUS_STATION`: <br/> - `CAMPING`: <br/> - `CASINO`: <br/> - `CINEMA`: <br/> - `CITY`: <br/> - `CITY_HALL`: <br/> - `COUNTRY`: Administrative.<br/> - `COUNTY`: <br/> - `CULTURAL_CENTRE`: <br/> - `DISTRICT`: <br/> - `EXHIBITION_CENTER`: <br/> - `FERRY`: <br/> - `FOURTH_ROAD`: <br/> - `GOLF_COURSE`: <br/> - `GROCERY_STORE`: <br/> - `HISTORICAL_MONUMENT`: <br/> - `HOSPITAL`: <br/> - `HOTEL_MOTEL`: <br/> - `LIBRARY`: <br/> - `MAIN_ROAD`: Road levels.<br/> - `MARINA`: <br/> - `MOTORWAY`: <br/> - `MUSEUM`: <br/> - `MUSIC_CENTER`: <br/> - `OPERA`: <br/> - `PARKING_GARAGE`: <br/> - `PEDESTRIAN`: <br/> - `PETROL_STATION`: <br/> - `PHARMACY`: <br/> - `POLICE_STATION`: <br/> - `POST_OFFICE`: <br/> - `POSTAL_CODE`: <br/> - `RENT_A_CAR`: <br/> - `RESTAURANT`: <br/> - `ROAD`: <br/> - `ROUNDABOUT`: <br/> - `SECONDARY_ROAD`: <br/> - `SHOP`: <br/> - `SHOPPING_CENTRE`: <br/> - `SLIP_ROAD`: <br/> - `SPORTS_ACTIVITY`: <br/> - `SPORTS_CENTRE`: <br/> - `STADIUM`: <br/> - `STATE`: <br/> - `TENNIS_COURT`: <br/> - `TERTIARY_ROAD`: <br/> - `THEATRE`: <br/> - `TOURIST_ATTRACTION`: <br/> - `TOURIST_OFFICE`: <br/> - `VEHICLE_REPAIR`: POI.<br/> - `ZOO`: 
| __length__ |             | Length of current road section in meters. Type: `Integer`. |
| __manoeuvre__ |             | Returns the direction to follow (see MANOEUVRE_STRAIGHT ...).<br/> Available values:<br/> - `BEAR_LEFT`: Bear left.<br/> - `BEAR_RIGHT`: Bear right.<br/> - `LEFT`: Left. PI/3 inferior to a inferior to 2*PI/3, a = angle with azimuth.<br/> - `RIGHT`: Right. -2*PI/3 inferior to a inferior to -PI/3, a = angle with azimuth.<br/> - `SHARP_LEFT`: Sharp left. 2*PI/3 inferior or equals to a inferior to 14*PI/15, a = angle with azimuth.<br/> - `SHARP_RIGHT`: Sharp right. -14*PI/15 inferior to a inferior or equals to -2*PI/3, a = angle with azimuth.<br/> - `SLIGHT_LEFT`: Slight left. PI/9 inferior to a inferior or equals to PI/3, a = angle with azimuth.<br/> - `SLIGHT_RIGHT`: Slight right. -PI/3 inferior or equals to a inferior to -PI/9, a = angle with azimuth.<br/> - `STRAIGHT`: Straight. -PI/9 inferior or equals to a and inferior or equals to PI/9, a = angle with azimuth.<br/> - `U_TURN`: U-Turn. a superior or equals to 14*PI/15 or a inferior or equals to -14*PI/15, a = angle with azimuth.
| __polylineIndex__ |             | Returns index in route polyline's points array of first form of this instruction. Type: `Integer`. |
| __roundAboutExitNumber__ |             | Returns the exit number of a roundabout. Type: `Integer`. |
| __text__ |             | Instruction in human readable format can be used with text-to-speech. Type: `String`. |
| __textDist__ |             | Distance instruction in human readable format can be used with text-to-speech. Type: `String`. |
| __toName__ |             | Returns the name of the next road section (or name of sign post to follow). Type: `String`. |
| __toOn__ |             | Returns the Official Name of next route section (in specified language code if available). Type: `String`. |
| __toOnPhoneme__ |             | Returns phonetic transcription of the official name of next route section. Type: `String`. |
| __toPhoneme__ |             | Returns the phonetic transcription of the next route section (or sign post to follow). Type: `String`. |
| __toRn__ |             | Returns the Route Number of next route sectiony. Type: `String`. |
| __toRnPhoneme__ |             | Returns the phonetic transcription of the route number of next route section. Type: `String`. |
| __toSi__ |             | Returns the Sign post to follow. Type: `String`. |
| __toSiPhoneme__ |             | Returns phonetic transcription of sign post to follow. Type: `String`. |
| __type__ |             | Instruction type.<br/> Available values:<br/> - `ENTER_MOTORWAY`: Enter to motor-way.<br/> - `ENTER_ROUNDABOUT`: Enter to the roundabout.<br/> - `EXIT_MOTORWAY`: Exit from motor-way.<br/> - `EXIT_ROUNDABOUT`: Exit from roundabout.<br/> - `FOLLOW`: Follow.<br/> - `FOLLOW_SIGN`: Follow sign.<br/> - `LEAVE_FERRY`: Leave ferry.<br/> - `STOP`: Stop.<br/> - `STOP_VIA`: Stop on via.<br/> - `TAKE_FERRY`: Take ferry.<br/> - `TAKE_RAMP`: Take ramp.

#### __RouteConsumptionFront__
Class representing a route consumption. Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __angle__ |             | The route's angle in degrees. Type: `Double`. |
| __batteryLevel__ |             | The route's battery level in percent. Type: `double`. |
| __consumption__ |             | The route's consumption from previous value in kWh. Type: `double`. |
| __cumulativeConsumption__ |             | The route's cumulative consumption from start in kWh. Type: `double`. |
| __distFromStart__ |             | The route's distance from the start in meters. Type: `double`. |
| __lat__ |             | Latitude in degrees decimal ([WGS84](index.html#page-glossary-coordinate_system.md)). Type: `double`. |
| __lon__ |             | Longitude in degrees decimal ([WGS84](index.html#page-glossary-coordinate_system.md)). Type: `double`. |
| __speed__ |             | The route's speed in m/s. Type: `Double`. |
| __time__ |             | The route's time from start in seconds. Type: `int`. |
| __acceleration__ |    optional | The route's acceleration m/s². Type: `Double`. |
| __alt__ |    optional | Altitude in meters. Type: `Double`. |
| __slope__ |    optional | The route's slope coefficient (0 = 0°, +/-0.5 = +/-30°, etc.). Type: `Double`. |

#### __StartEventFront__
Class representing a step poin tevent. Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __coord__ |             | Coordinate of map matched address. Type: `[CoordinateFront]`. See details below. |
| __eventType__ |             | The event's type.<br/> Available values:<br/> - `CHARGE`: Charge step, event contains information about the charge step location of trip.<br/> - `EXCEPTION`: Exception event can show the information about a error on the API conversion between backend and frontend.<br/> - `NOT_SUPPORTED_ENUM`: The event type is not supported by this API version, please check if a newer API is already released.<br/> - `ROUTE`: Route, that represent the route information about part of trip.<br/> - `START`: Start point, event contains information about the start location of trip.<br/> - `STOP`: Stop point, event contains information about the stop location of trip.<br/> - `TOLL`: Toll along the journey.<br/> - `VIA`: Via point, event contains information about the way-point location of trip.
| __address__ |    optional | Map matched address. Type: `String`. |
| __arrivalTime__ |    optional | Time stamp in milliseconds of arrival to the step point. Type: `Long`. |
| __departureTime__ |    optional | Time stamp in milliseconds of departure from the step point. Type: `Long`. |
| __weather__ |    optional | Weather condition at Step point. Type: `[LocalWeatherFront]`. See details below. |

#### __StepPointEventFront__
Class representing a step poin tevent. Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __coord__ |             | Coordinate of map matched address. Type: `[CoordinateFront]`. See details below. |
| __eventType__ |             | The event's type.<br/> Available values:<br/> - `CHARGE`: Charge step, event contains information about the charge step location of trip.<br/> - `EXCEPTION`: Exception event can show the information about a error on the API conversion between backend and frontend.<br/> - `NOT_SUPPORTED_ENUM`: The event type is not supported by this API version, please check if a newer API is already released.<br/> - `ROUTE`: Route, that represent the route information about part of trip.<br/> - `START`: Start point, event contains information about the start location of trip.<br/> - `STOP`: Stop point, event contains information about the stop location of trip.<br/> - `TOLL`: Toll along the journey.<br/> - `VIA`: Via point, event contains information about the way-point location of trip.
| __address__ |    optional | Map matched address. Type: `String`. |
| __arrivalTime__ |    optional | Time stamp in milliseconds of arrival to the step point. Type: `Long`. |
| __departureTime__ |    optional | Time stamp in milliseconds of departure from the step point. Type: `Long`. |
| __weather__ |    optional | Weather condition at Step point. Type: `[LocalWeatherFront]`. See details below. |

#### __LocalWeatherFront__
Class representing a local weather. Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __temperature__ |             | Temperature, Unit Celsius. Type: `float`. |
| __condition__ |    optional | Group of weather parameters (Rain, Snow, Extreme etc.). Type: `String`. |
| __description__ |    optional | Weather condition within the group. Type: `String`. |
| __icon__ |    optional | Weather icon id of provider. Type: `String`. |

#### __StopEventFront__
Class representing a step poin tevent. Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __coord__ |             | Coordinate of map matched address. Type: `[CoordinateFront]`. See details below. |
| __eventType__ |             | The event's type.<br/> Available values:<br/> - `CHARGE`: Charge step, event contains information about the charge step location of trip.<br/> - `EXCEPTION`: Exception event can show the information about a error on the API conversion between backend and frontend.<br/> - `NOT_SUPPORTED_ENUM`: The event type is not supported by this API version, please check if a newer API is already released.<br/> - `ROUTE`: Route, that represent the route information about part of trip.<br/> - `START`: Start point, event contains information about the start location of trip.<br/> - `STOP`: Stop point, event contains information about the stop location of trip.<br/> - `TOLL`: Toll along the journey.<br/> - `VIA`: Via point, event contains information about the way-point location of trip.
| __address__ |    optional | Map matched address. Type: `String`. |
| __arrivalTime__ |    optional | Time stamp in milliseconds of arrival to the step point. Type: `Long`. |
| __departureTime__ |    optional | Time stamp in milliseconds of departure from the step point. Type: `Long`. |
| __weather__ |    optional | Weather condition at Step point. Type: `[LocalWeatherFront]`. See details below. |

#### __TollEventFront__
Toll event. Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __charges__ |             | List of toll charge. Type: `list or array of [TollChargeFront]`. See details below. |
| __coord__ |             | Coordinate of map matched address. Type: `[CoordinateFront]`. See details below. |
| __eventType__ |             | The event's type.<br/> Available values:<br/> - `CHARGE`: Charge step, event contains information about the charge step location of trip.<br/> - `EXCEPTION`: Exception event can show the information about a error on the API conversion between backend and frontend.<br/> - `NOT_SUPPORTED_ENUM`: The event type is not supported by this API version, please check if a newer API is already released.<br/> - `ROUTE`: Route, that represent the route information about part of trip.<br/> - `START`: Start point, event contains information about the start location of trip.<br/> - `STOP`: Stop point, event contains information about the stop location of trip.<br/> - `TOLL`: Toll along the journey.<br/> - `VIA`: Via point, event contains information about the way-point location of trip.
| __meanOfPayments__ |             | List of mean of payment.<br/> Available values:<br/> - `BANK_CARD`: Bank card.<br/> - `CASH`: Cash.<br/> - `CREDIT_CARD`: Credit card.<br/> - `EXACT_CASH`: Exact cash.<br/> - `NOT_SUPPORTED_VALUE`: Not supported value.<br/> - `PASS_SUBSCRIPTION`: Pass or subscription.<br/> - `TRANSPONDER`: Transponder.<br/> - `TRAVEL_CARD`: Travel card.<br/> - `VIDEO_TOLL_CHARGE`: Video toll charge.
| __tollType__ |             | Type of toll.<br/> Available values:<br/> - `ELECTRONIC`: Electronic.<br/> - `FIXED_FEE`: Fixed fee (does not depend of origin).<br/> - `NOT_SUPPORTED_VALUE`: Not supported value.<br/> - `OBTAIN_TICKET`: Obtain ticket (no fee).<br/> - `PAY_PER_TICKET`: Pay per ticket (depends of origin).
| __address__ |    optional | Map matched address. Type: `String`. |
| __arrivalTime__ |    optional | Time stamp in milliseconds of arrival to the step point. Type: `Long`. |
| __departureTime__ |    optional | Time stamp in milliseconds of departure from the step point. Type: `Long`. |
| __weather__ |    optional | Weather condition at Step point. Type: `[LocalWeatherFront]`. See details below. |

#### __TollChargeFront__
Toll charge. Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __category__ |             |  Type: `String`. |
| __currency__ |             |  Type: `String`. |
| __price__ |             |  Type: `double`. |

#### __ViaEventFront__
class representing a Via Event. Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __coord__ |             | Coordinate of map matched address. Type: `[CoordinateFront]`. See details below. |
| __eventType__ |             | The event's type.<br/> Available values:<br/> - `CHARGE`: Charge step, event contains information about the charge step location of trip.<br/> - `EXCEPTION`: Exception event can show the information about a error on the API conversion between backend and frontend.<br/> - `NOT_SUPPORTED_ENUM`: The event type is not supported by this API version, please check if a newer API is already released.<br/> - `ROUTE`: Route, that represent the route information about part of trip.<br/> - `START`: Start point, event contains information about the start location of trip.<br/> - `STOP`: Stop point, event contains information about the stop location of trip.<br/> - `TOLL`: Toll along the journey.<br/> - `VIA`: Via point, event contains information about the way-point location of trip.
| __address__ |    optional | Map matched address. Type: `String`. |
| __arrivalTime__ |    optional | Time stamp in milliseconds of arrival to the step point. Type: `Long`. |
| __departureTime__ |    optional | Time stamp in milliseconds of departure from the step point. Type: `Long`. |
| __poi__ |    optional | list of the via event's POIs Type: `list or array of [PoiFront]`. See details below. |
| __weather__ |    optional | Weather condition at Step point. Type: `[LocalWeatherFront]`. See details below. |

#### __PoiFront__
Class representing a POI. Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __category__ |             | The POI's category.<br/> Available values:<br/> - `HOTEL`: Restaurant.<br/> - `NOT_SUPPORTED_ENUM`: The POI category is not supported by this API version, please check if a newer API is already released.<br/> - `RESTAURANT`: Hotel.
| __coordinate__ |             | The POI's coordinates. Type: `[CoordinateFront]`. See details below. |
| __id__ |             | The POI's id. Type: `String`. |
| __providerName__ |             | The provider name. Type: `String`. |

#### __TimeSlotWarningFront__
Class describing a timeslot warning. Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __message__ |             | Describes a time slot status: if the time slot has been validated by a EV route. Type: `String`. |
| __statusCode__ |             | Code of the time slot status. Available codes:<br/> - `TSS_UNINITIALIZED`: Time slot status uninitialized.<br/>- `TSS_NO_POOL_FOUND`: No pool found during this time slot (default value before EVRoute computation).<br/>- `TSS_NO_POOL_FOUND_WITH_SERVICE`: No pool found with the requested services.<br/>- `TSS_NOT_SELECTED_TOO_MUCH_ENERGY_NEEDED`: Too much additional energy needed to reach pools during this time slot.<br/>- `TSS_NOT_SELECTED_OPENING_TIME`: Opening Time are incorrect for pools found during these time slot.<br/>- `TSS_NOT_SELECTED`: Route with the pools found during this time slot validate less time slot that this current itinerary OR charge during time slot is useless.<br/>- `TSS_IGNORED_DEPARTURE_DATE_TIME_NOT_SET`: Time slot ignored: Departure date and time is not set.<br/>- `TSS_IGNORED_END_BEFORE_DEPARTURE`: Time slot ignored: Time slot end is before route departure OR stop duration implied to stop before route departure.<br/>- `TSS_IGNORED_BEGIN_AFTER_ARRIVAL`: Time slot ignored: Time slot begins after arrival date and time.<br/>- `TSS_IGNORED_INTERNAL_ERROR`: Time slot ignored: Internal error.<br/>- `TSS_NOT_VALID_BEGIN_AFTER_END`: Time slot not valid: Time slot begins after time slot end.<br/>- `TSS_NOT_VALID_DURATION_TOO_SHORT`: Time slot not valid: Stop duration is too short (should be superior to fixed stop time).<br/>- `TSS_NOT_VALID_DURATION_TOO_LONG`: Time slot not valid: Stop duration is too long (should be inferior to time slot duration).<br/>- `TSS_NOT_VALID_SERVICE`: Time slot not valid: Requested service format is incorrect"). Type: `String`. |
