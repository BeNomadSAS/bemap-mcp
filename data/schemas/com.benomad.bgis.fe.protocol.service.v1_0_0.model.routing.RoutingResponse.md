| Field  | Optional | Description |
|--------|----------|-------------|
| __routingRoutes__ |             | Defines a list of computed routes. Type: `list or array of [RoutingRt]`. See details below. |
| __usedDestinations__ |             | List of used destinations according to the request. The coordinates used for routing calculation: includes the raw coordinates and the map matched coordinates. Type: `list or array of [RoutingUsedDest]`. See details below. |

#### __RoutingUsedDest__
Class representing coordinates used for routing calculation: includes the raw coordinates and the map matched coordinates. Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __confidenceValue__ |             | Confidence score of map matched coordinate in range ]0,1]. Type: `double`. |
| __distanceFromRequest__ |             | Distance in meters between raw coordinate and map matched coordinate. Type: `double`. |
| __duration__ |             | The travel time (ETA) in seconds from start coordinate of this destination. Type: `long`. |
| __exceptionMessage__ |             | The exception message of the destination. Returned only when the option `REVGEO_STRICT_DISABLE` is defined in request. Type: `String`. |
| __inputOrder__ |             | Original order number of input coordinates. Type: `int`. |
| __length__ |             | The length in meters from start coordinate of this destination. Type: `long`. |
| __matchedCoordinateGps__ |             | Map matched coordinate (i.e. snapped on a map road element). Type: `[CoordinateSat]`. See details below. |
| __matchedPostalAddress__ |             | Postal address of map matched coordinate. Type: `[Address]`. See details below. |
| <s>__polylineIndex__</s> |             | The index of corresponding coordinate in route's polyline. Only when the option `POLYLINE_INDEX` is defined in request, otherwise the value is set to `-1`. Type: `long`. |
| __used__ |             | Indicates if this coordinate has been used by the routing calculator. Type: `boolean`. |
| __usedOrder__ |             | Final order number of input coordinates. The order can be changed by options `OPTIMIZED_TRIP`, `OPTIMIZED_TRIP_CLOSE`, `OPTIMIZED_TRIP_ROUND`, `OPTIMIZED_TRIP_UNDEFSTOP`. Type: `int`. |
| <s>__waypointPolylineIndex__</s> |             |  Type: `Integer`. |
| __customData__ |    optional | Custom data is a list that can be used to set some custom information about the destination in input. Type: `list or array of [CustomDt]`. See details below. |

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

#### __Address__
Defines a postal address, [Wikipedia link](http://en.wikipedia.org/wiki/Postal_address). Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __city__ |    optional | City name. Type: `String`. |
| __country__ |    optional | Country name. Type: `String`. |
| __countryCode__ |    optional | ISO code of country. Type: `String`. |
| __county__ |    optional | County name. Type: `String`. |
| __district__ |    optional | District name of city. Type: `String`. |
| <s>__oppositeStreetNumber__</s> |    optional | Opposite street number. Type: `String`. |
| __postalCode__ |    optional | Postal code. Type: `String`. |
| __roadNumber__ |    optional | Road number. Type: `String`. |
| __state__ |    optional | State name. Type: `String`. |
| __street__ |    optional | Street name. Type: `String`. |
| __streetNumber__ |    optional | House number. Type: `String`. |

#### __CustomDt__
Class representing a custom data. Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __key__ |             |  Type: `String`. |
| __value__ |             |  Type: `String`. |

#### __RoutingRt__
Class representing a computed route. Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __arrivalTime__ |             |  Type: `long`. |
| __averageSpeed__ |             | Average speed in km/h. Type: `float`. |
| __boundingBox__ |             | Bounding box of the route. Type: `[BoundingBox]`. See details below. |
| __corridor__ |             | Corridor around the route. Use the parameter `corridorRadius` in request. Type: `list or array of [GeometricPoly]`. See details below. |
| __departureTime__ |             |  Type: `long`. |
| <s>__detailedPolylines__</s> |             | Polyline geometry of itinerary with more information for each sub-segments. See the option `DETAILED_POLYLINE`. Deprecated Use events system (like `EVENT`, `EVT_POLYLINE`) instead. Type: `list or array of [GeometricDetPolyline]`. See details below. |
| __duration__ |             | Total driving time in seconds. Type: `long`. |
| __energyConsumption__ |             | Energy needed to travel route, in kWh. See options `ENERGY_CONSUMPTION`, `EVT_ENERGY_CONSUMPTION`. Type: `Double`. |
| __events__ |             | Events on road. See the `EVENT` option. Type: `list or array of [RoutingEvnt]`. See details below. |
| __exceptionMessage__ |             | Error message returned when the route is not feasible. Type: `String`. |
| __fenceResults__ |             | List of tested fences. Type: `list or array of [GeoFenceRes]`. See details below. |
| <s>__junctionNodes__</s> |             | Junction nodes of route. Type: `list or array of [Coordinate]`. See details below. |
| __length__ |             | Length of route in meters. Type: `long`. |
| __maximumSpeed__ |             | Maximum speed in km/h. Type: `float`. |
| __openLrBase64__ |             | Route geometry encoded as OpenLR (in base64 encoding). Type: `String`. |
| __polyline__ |             | Route polyline geometry. See the option `POLYLINE`. Type: `list or array of [Coordinate]`. See details below. |
| <s>__roadSegments__</s> |             | Route segments. Deprecated use events system (like `EVENT`, `EVT_SEGMENT_INFO`, `EVT_POLYLINE`) instead. Type: `list or array of [RoadSeg]`. See details below. |
| __routingInstructions__ |             | List of guidance instructions. Use `ROUTESHEET` option in request. Type: `list or array of [RoutingInstruc]`. See details below. |
| __routingTaxCost__ |             | Total tax cost range along the route. See option `EVT_TAX_COST`. Type: `[RoutingTaxCst]`. See details below. |
| __routingTollCost__ |             | Total toll cost range along the route. See option `EVT_TOLL_COST`. Type: `[RoutingTollCst]`. See details below. |
| <s>__segmentIds__</s> |             | List of segment ID of computed route. Type: `list or array of Long`. |
| __startStopInfo__ |             | Information about the start and stop coordinates of a route found by the routing calculation. Type: `[RoutingRouteStartStopInf]`. See details below. |
| __startUTurnThreshold__ |             | The start UTurn threshold. This value determines, at start point or any via point for which a use start angle / avoid UTurn property is set, the threshold (in 1/10th seconds / meters / Wh in resp. FASTEST / SHORTEST / ECO mode) above which the property may be ignored. For instance, in SHORTEST mode, if the route from start to stop leaving start point in the desired direction is more than `startUTurnThreshold` meters longer than the route from start to stop leaving start point in the opposite direction, leave the start point in the opposite direction. Type: `int`. |
| __totalDuration__ |             | The total duration in seconds represent the duration of travel + stop time. Type: `long`. |
| __trafficDelay__ |             | Delay in seconds due to real time traffic and statistical traffic. Type: `long`. |
| __waypointPolyline__ |             | Waypoints polyline of route. This polyline is composed of the coordinates of the route with inserted waypoint matched coordinates. Type: `list or array of [Coordinate]`. See details below. |
| __waypoints__ |             | Waypoints of route. Type: `list or array of [RoutingWaypnt]`. See details below. |

#### __RoutingTollCst__
Class representing toll cost information of a route. Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __sumFees__ |             | List of total toll fees of route. In most cases this list contains only one entry. Only when the toll fees along the route use several currencies will the list contains several entries (one for each currency). Type: `list or array of [RoutingSumF]`. See details below. |
| __tolls__ |             | List of tolls. Type: `list or array of [Tol]`. See details below. |

#### __Tol__
Class representing toll. Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __coordinate__ |             | Coordinate of toll. Type: `[Coordinate]`. See details below. |
| __meanOfPayments__ |             | List of mean of payment.<br/> Available values:<br/> - `PAYMENT_BANK_CARD`: Bank card.<br/> - `PAYMENT_CASH`: Cash.<br/> - `PAYMENT_CREDIT_CARD`: Credit card.<br/> - `PAYMENT_EXACT_CASH`: Exact cash.<br/> - `PAYMENT_PASS_SUBSCRIPTION`: Pass or subscription.<br/> - `PAYMENT_TRANSPONDER`: Transponder.<br/> - `PAYMENT_TRAVEL_CARD`: Travel card.<br/> - `PAYMENT_VIDEO_TOLL_CHARGE`: Video toll charge.
| __polylineIndex__ |             | Index of polyline coordinate. Type: `long`. |
| __tollCharges__ |             | List of toll charge. Type: `list or array of [TollChrg]`. See details below. |
| __tollType__ |             | Type of toll.<br/> Available values:<br/> - `TOLL_ELECTRONIC`: Electronic.<br/> - `TOLL_FIXED_FEE`: Fixed fee (does not depend of origin).<br/> - `TOLL_OBTAIN_TICKET`: Obtain ticket (no fee).<br/> - `TOLL_PAY_PER_TICKET`: Pay per ticket (depends of origin).

#### __TollChrg__
Class representing a toll charge. Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __category__ |             | A textual definition of vehicle category. Type: `String`. |
| __currency__ |             | Currency unit in norm ISO 4217, more details on [Wikipedia ISO 4217](https://en.wikipedia.org/wiki/ISO_4217). Type: `String`. |
| __price__ |             | Price. Type: `double`. |

#### __Coordinate__
Describe a coordinate which consists of a latitude and longitude. Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __lat__ |             | Latitude in degrees decimal ([WGS84](index.html#page-glossary-coordinate_system.md)). Type: `double`. |
| __lon__ |             | Longitude in degrees decimal ([WGS84](index.html#page-glossary-coordinate_system.md)). Type: `double`. |

#### __RoutingSumF__
Class representing the range of total toll or tax fees of a route. Depending of how precise the vehicle profile (field `routingVehicleProfile`) has been defined, the total toll or tax fees can be within a range (`feeMin`, `feeMax`) more or less wide. Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __currency__ |             | Currency in norm ISO 4217, more details on Wikipedia ISO 4217 https://en.wikipedia.org/wiki/ISO_4217. Type: `String`. |
| __feeMax__ |             | The maximum fee. Type: `double`. |
| __feeMin__ |             | The minimum fee. Type: `double`. |

#### __RoutingTaxCst__
Class representing tax cost information of a route. Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __sumFees__ |             | List of total tax fees of route. In most cases this list contains only one entry. Only when the tax fees along the route use several currencies will the list contains several entries (one for each currency). Type: `list or array of [RoutingSumF]`. See details below. |
| __taxSections__ |             | List of tax sections. Type: `list or array of [RoutingTaxSect]`. See details below. |

#### __RoutingTaxSect__
Class representing a tax section of a route. Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __countryCode__ |             | The ISO country code ([ISO 3166 alpha 3](https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes)) of current tax section. Type: `String`. |
| __firstFrmIdx__ |             | Index of the first route's segment event of the tax section. See the options `EVENT`, `EVT_POLYLINE`, `EVT_SEGMENT_INFO`. Type: `int`. |
| __lastFrmIdx__ |             | Index of the last route's segment event of the tax section. See the options `EVENT`, `EVT_POLYLINE`, `EVT_SEGMENT_INFO`. Type: `int`. |
| __length__ |             | Length of section in meters. Type: `int`. |
| __meanOfPayments__ |             | List of mean of payment.<br/> Available values:<br/> - `PAYMENT_BANK_CARD`: Bank card.<br/> - `PAYMENT_CASH`: Cash.<br/> - `PAYMENT_CREDIT_CARD`: Credit card.<br/> - `PAYMENT_EXACT_CASH`: Exact cash.<br/> - `PAYMENT_PASS_SUBSCRIPTION`: Pass or subscription.<br/> - `PAYMENT_TRANSPONDER`: Transponder.<br/> - `PAYMENT_TRAVEL_CARD`: Travel card.<br/> - `PAYMENT_VIDEO_TOLL_CHARGE`: Video toll charge.
| __taxCategory__ |             | Tax category.<br/> Available values:<br/> - `TAX_CATEGORY_1`: Tax category 1.<br/> - `TAX_CATEGORY_2`: Tax category 2.<br/> - `TAX_CATEGORY_3`: Tax category 3.<br/> - `TAX_CATEGORY_NONE`: No tax.
| __taxCharges__ |             | List of tax charge. Type: `list or array of [TaxChrg]`. See details below. |

#### __TaxChrg__
Class representing tax charge. Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __category__ |             | A textual definition of vehicle category. Type: `String`. |
| __currency__ |             | Currency in norm ISO 4217, more details on Wikipedia ISO 4217 https://en.wikipedia.org/wiki/ISO_4217. Type: `String`. |
| __price__ |             | Price. Type: `double`. |

#### __RoutingInstruc__
Class representing a guidance instruction of a route. Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __coordinate__ |             | Position of the maneuver. Type: `[Coordinate]`. See details below. |
| __duration__ |             | Duration in seconds of current instruction. Type: `Integer`. |
| __fromName__ |             | Name of last road segment before the maneuver. In specified language define in request, if available in map data Type: `String`. |
| __fromPhoneme__ |             | Phonetic transcription of the name of last road segment before the maneuver. In specified language define in request, if available in map data Type: `String`. |
| __geoElementType__ |             | Geo element type following instruction.<br/> Available values:<br/> - `ALL_ROAD`: Road types.<br/> - `AMUSEMENT_PARK`: <br/> - `BANK`: <br/> - `BEACH`: <br/> - `BOWLING`: <br/> - `BUILT_UP_AREA_MAIN`: Urban area coverage size main, not an administrative area.<br/> - `BUILT_UP_AREA_MEDIUM`: Urban area coverage size medium (not an administrative area).<br/> - `BUILT_UP_AREA_NA`: Urban area information not available.<br/> - `BUILT_UP_AREA_NONE`: No urban area.<br/> - `BUILT_UP_AREA_SMALL`: Urban area coverage size small (not an administrative area).<br/> - `BUS_STATION`: <br/> - `CAMPING`: <br/> - `CASINO`: <br/> - `CINEMA`: <br/> - `CITY`: <br/> - `CITY_HALL`: <br/> - `COUNTRY`: Administrative.<br/> - `COUNTY`: <br/> - `CULTURAL_CENTRE`: <br/> - `DISTRICT`: <br/> - `EXHIBITION_CENTER`: <br/> - `FERRY`: <br/> - `FOURTH_ROAD`: <br/> - `GOLF_COURSE`: <br/> - `GROCERY_STORE`: <br/> - `HISTORICAL_MONUMENT`: <br/> - `HOSPITAL`: <br/> - `HOTEL_MOTEL`: <br/> - `LIBRARY`: <br/> - `MAIN_ROAD`: Road levels.<br/> - `MARINA`: <br/> - `MOTORWAY`: <br/> - `MUSEUM`: <br/> - `MUSIC_CENTER`: <br/> - `OPERA`: <br/> - `PARKING_GARAGE`: <br/> - `PEDESTRIAN`: <br/> - `PETROL_STATION`: <br/> - `PHARMACY`: <br/> - `POLICE_STATION`: <br/> - `POST_OFFICE`: <br/> - `POSTAL_CODE`: <br/> - `RENT_A_CAR`: <br/> - `RESTAURANT`: <br/> - `ROAD`: <br/> - `ROUNDABOUT`: <br/> - `SECONDARY_ROAD`: <br/> - `SHOP`: <br/> - `SHOPPING_CENTRE`: <br/> - `SLIP_ROAD`: <br/> - `SPORTS_ACTIVITY`: <br/> - `SPORTS_CENTRE`: <br/> - `STADIUM`: <br/> - `STATE`: <br/> - `TENNIS_COURT`: <br/> - `TERTIARY_ROAD`: <br/> - `THEATRE`: <br/> - `TOURIST_ATTRACTION`: <br/> - `TOURIST_OFFICE`: <br/> - `VEHICLE_REPAIR`: POI.<br/> - `ZOO`: 
| __length__ |             | Distance in meters of current instruction. Type: `Integer`. |
| __manoeuvre__ |             | The direction to follow.<br/> Available values:<br/> - `BEAR_LEFT`: Bear left.<br/> - `BEAR_RIGHT`: Bear right.<br/> - `LEFT`: Turn left.<br/> - `RIGHT`: Turn right.<br/> - `SHARP_LEFT`: Turn sharp left.<br/> - `SHARP_RIGHT`: Turn sharp right.<br/> - `SLIGHT_LEFT`: Turn slight left.<br/> - `SLIGHT_RIGHT`: Turn slight right.<br/> - `STRAIGHT`: Straight ahead.<br/> - `U_TURN`: Make a u-turn.
| <s>__polylineIndex__</s> |             | Index in route polyline's points array of first form of this instruction. Deprecated use instead `EVENT`, `EVT_ROUTESHEET` with `EVT_POLYLINE` or `EVT_ENCODED_POLYLINE`. Type: `Integer`. |
| __roundAboutExitNumber__ |             | The exit number of a roundabout. Type: `Integer`. |
| __text__ |             | Instruction in human readable format can be used with text-to-speech. Type: `String`. |
| __textDist__ |             | Distance instruction in human readable format can be used with text-to-speech. Type: `String`. |
| __toName__ |             | Name (or sign post) of first road segment after the maneuver. In specified language define in request, if available in map data Type: `String`. |
| __toOn__ |             | Returns the Official Name of next route section (in specified language code if available). Type: `String`. |
| __toOnPhoneme__ |             | Returns phonetic transcription of the official name of next route section. Type: `String`. |
| __toPhoneme__ |             | Phonetic transcription of the name (or sign post) of first road segment after the maneuver. In specified language define in request, if available in map data Type: `String`. |
| __toRn__ |             | Route number of first road segment after the maneuver. Type: `String`. |
| __toRnPhoneme__ |             | Phonetic transcription of the route number of first road segment after the maneuver. Type: `String`. |
| __toSi__ |             | Sign post to follow after the maneuver. In specified language define in request, if available in map data. Type: `String`. |
| __toSiPhoneme__ |             | Phonetic transcription of the sign post to follow after the maneuver. In specified language define in request, if available in map data. Type: `String`. |
| __type__ |             | Instruction type.<br/> Available values:<br/> - `ENTER_MOTORWAY`: Enter in motorway.<br/> - `ENTER_ROUNDABOUT`: Enter in roundabout.<br/> - `EXIT_MOTORWAY`: Exit from motorway.<br/> - `EXIT_ROUNDABOUT`: Exit from roundabout.<br/> - `FOLLOW`: Follow.<br/> - `FOLLOW_SIGN`: Follow sign.<br/> - `LEAVE_FERRY`: Leave ferry.<br/> - `STOP`: Stop.<br/> - `STOP_VIA`: Stop on via.<br/> - `TAKE_FERRY`: Take ferry.<br/> - `TAKE_RAMP`: Take ramp.

#### __BoundingBox__
This a model class for creating a rectangle that includes the whole trip which is defined with 4 coordinates. Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __maxLat__ |             | Maximum latitude, in degrees decimal ([WGS84](index.html#page-glossary-coordinate_system.md)). Type: `double`. |
| __maxLon__ |             | Maximum longitude, in degrees decimal ([WGS84](index.html#page-glossary-coordinate_system.md)). Type: `double`. |
| __minLat__ |             | Minimum latitude, in degrees decimal ([WGS84](index.html#page-glossary-coordinate_system.md)). Type: `double`. |
| __minLon__ |             | Minimum longitude, in degrees decimal ([WGS84](index.html#page-glossary-coordinate_system.md)). Type: `double`. |

#### __GeometricPoly__
Class representing a polygon's geometry. Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __coordinates__ |             | Coordinates of the polygon. Type: `list or array of [Coordinate]`. See details below. |

#### __GeoFenceRes__
Class representing a geocoding fence result. Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __fenceShape__ |             | Shape of fence used to perform the test. Type: `[GeoFenceShp]`. See details below. |
| __id__ |             | Unique ID of fence. Type: `long`. |
| __position__ |             | The coordinates of the intersection in WGS84. Type: `[Coordinate]`. See details below. |
| __positionState__ |             | Defines position state of tested coordinate on the fence geometry.<br/> Available values:<br/> - `INSIDE`: Defines if the tested coordinate is in fence.<br/> - `INTERSECT`: Position is not completely inside or outside but the shapes are intersected.<br/> - `INWARD`: Defines if the tested coordinate is an inward intersection.<br/> - `OUTSIDE`: Defines if the tested coordinate is out of fence.<br/> - `OUTWARD`: Defines if the tested coordinate is an outward intersection.
| __timestamp__ |             | The estimated time stamp of this intersection in milliseconds. Type: `long`. |
| __type__ |             | Type of geometry.<br/> Available values:<br/> - `CIRCLE`: Circle.<br/> - `POLYGON`: Polygon.

#### __GeoFenceShp__
Class representing a fence shape. Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __center__ |             | Center of circle fence. Type: `[Coordinate]`. See details below. |
| __id__ |             | The fence id. If value is negative the server will set it with an auto-incrementing number. Type: `long`. |
| __radius__ |             | Radius of circle fence. Type: `long`. |
| __type__ |             | Define the type of geometric shape of fence, like CIRCLE or POLYGON.<br/> Available values:<br/> - `CIRCLE`: Circle.<br/> - `POLYGON`: Polygon.
| __vertices__ |             | Vertices of polygon fence. Type: `list or array of [Coordinate]`. See details below. |

#### __RoutingRouteStartStopInf__
Class representing a routing route start/stop information. Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __distanceFirstMatched__ |             | Distance between first matched coordinate and the start coordinate of route found by the routing calculation. This distance is not 0 when the input matched coordinate is unaccessible. Type: `double`. |
| __distanceLastMatched__ |             | Distance between last matched coordinate and the stop coordinate of route found by the routing calculation. This distance is not 0 when the input matched coordinate is unaccessible. Type: `double`. |
| __interDests__ |             | List of intermediate destination coordinates reached by the computed route. Type: `list or array of [Coordinate]`. See details below. |
| __start__ |             | Start (first) coordinate of the computed route. Type: `[Coordinate]`. See details below. |
| __stop__ |             | Stop (last) coordinate of the computed route. Type: `[Coordinate]`. See details below. |

#### __GeometricDetPolyline__
Class representing a geometric detailed polyline. Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __coordinates__ |             | Matched coordinate on a road. Type: `list or array of [Coordinate]`. See details below. |
| __length__ |             | Length of route segment in meters. Type: `long`. |

#### __RoadSeg__
Class representing an road segment. Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __countryCode__ |             | Country code (ISO). Type: `String`. |
| __duration__ |             | The duration in seconds to travel through this route segment. -1 if information is not available. Type: `double`. |
| __from__ |             | Coordinate of first point. Type: `[Coordinate]`. See details below. |
| __id__ |             | ID of segment. -1 if information is not available. Type: `long`. |
| __reverseDirection__ |             | True if this segment has been reversed, false otherwise. Type: `boolean`. |
| __to__ |             | Coordinate of last point. Type: `[Coordinate]`. See details below. |
| __weight__ |             | The weight in seconds or meters to travel through this route, used only by isochrone calculation. -1 if information is not available. Type: `long`. |

#### __RoutingWaypnt__
Class representing a routing waypoint. A waypoint is a coordinate with properties that can be used to reproduce the computed trip on other device or server. Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __angle__ |             | Angle in degrees of the road segment (clock-wise). Type: `double`. |
| __avoidUTurn__ |             | Defines if a UTurn should be avoided (if possible) by route planner at this location.<br/> Available values:<br/> - `NO`: Status no.<br/> - `UNDEF`: Status undefined.<br/> - `YES`: Status yes.
| __coordinate__ |             | Coordinate of waypoint. Type: `[Coordinate]`. See details below. |
| __ignorePoint__ |             | Defines if this waypoint is ignored by the planner for its route calculation. Type: `boolean`. |
| __ignoreRestrictions__ |             | Defines if forbidden manoeuvres and blocked passages should be ignored by route planner between this waypoint and next one. Type: `boolean`. |
| __ignoreRoadBlocks__ |             | Defines if road blocks should be ignored by route planner between this waypoint and next one. Type: `boolean`. |
| __ignoreTrafficDirections__ |             | Defines if traffic directions should be ignored by route planner between this waypoint and next one. Type: `boolean`. |
| __offRoad__ |             | Polyline representing the offroad section following this waypoint. Type: `[RoutingOffRd]`. See details below. |
| <s>__polylineIndex__</s> |             | The index of the waypoint polyline. -1 if not available. Type: `int`. |
| __radius__ |             | Radius (in meters) of the waypoint. Type: `long`. |
| __usedDestinationIndex__ |             | The index of the used destinations (destinations). -1 if not available. Type: `int`. |
| __useStartAngle__ |             | If set to `YES` and location is on is on a 2 way road, location's angle will be used as a general direction for departure from location.<br/> Available values:<br/> - `NO`: Status no.<br/> - `UNDEF`: Status undefined.<br/> - `YES`: Status yes.
| __useStopRoadSide__ |             | Defines if route planner must arrive on this waypoint on waypoint's side (if waypoint is on a 2 way road).<br/> Available values:<br/> - `NO`: Status no.<br/> - `UNDEF`: Status undefined.<br/> - `YES`: Status yes.
| __uturn__ |             | Defines if a UTurn is done on this via point. Type: `boolean`. |
| __waypointPolylineIndex__ |             | The coordinate index of the waypoint polyline. Type: `Integer`. |

#### __RoutingOffRd__
Class representing a routing off road. Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __attributes__ |             | Attributes. Type: `list or array of [AttributeItem]`. See details below. |
| __geometry__ |             | Geometry representing the offroad section. Type: `list or array of [Coordinate]`. See details below. |

#### __AttributeItem__
Class representing an attribute element. Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __attributeCode__ |             | BeNomad Code of attribute.<br/> Available values:<br/> - `__NOT_MAPPED`: Not mapped value.<br/> - `ADMINISTRATIVE_CLASS`: AC = administrative class of a city (0: capital of a country, 1: capital of an order 1 area, etc.).<br/> - `ALBANIAN_NAME`: SQ = ALBANIAN name.<br/> - `ALPHA_HOUSE_NUMBER`: HN = Alphanumerical house number.<br/> - `ANY_LANG`: XX = Any language code.<br/> - `ARABIC_ENGLISH_NAME`: AE = ARABIC ENGLISH name (latin alphabet).<br/> - `ARABIC_NAME`: AR = ARABIC name (arabic alphabet).<br/> - `ASSAMESE_LATIN_NAME`: AX = ASSAMESE_LATIN name (alphabet).<br/> - `ASSAMESE_NAME`: AS = ASSAMESE name (alphabet).<br/> - `AZERBAIJANI_NAME`: AZ = AZERBAIJANI name.<br/> - `BASQUE_NAME`: EU = BASQUE name.<br/> - `BELARUSIAN_LATIN_NAME`: BT = BELARUSIAN name (latin alphabet).<br/> - `BELARUSIAN_NAME`: BE = BELARUSIAN name (cyrillic alphabet).<br/> - `BENGALI_LATIN_NAME`: BX = BENGALI name (latin alphabet).<br/> - `BENGALI_NAME`: BI = BENGALI name.<br/> - `BOSNIAN_NAME`: BS = BOSNIAN name.<br/> - `BRAND_NAME`: BN = brand name.<br/> - `BULGARIAN_LATIN_NAME`: BL = BULGARIAN name (latin alphabet).<br/> - `BULGARIAN_NAME`: BG = BULGARIAN name (cyrillic alphabet).<br/> - `CATALAN_NAME`: CA = CATALAN name.<br/> - `CHINESE_LATIN_NAME`: ZL = Chinese name (latin alphabet).<br/> - `CHINESE_NAME`: ZH = Chinese name.<br/> - `COORDINATE_TYPE`: CO = coordinates' sytem.<br/> - `COUNTRY_CODE`: CC = Country code.<br/> - `CZECH_NAME`: CS = CZECH name.<br/> - `DANISH_NAME`: DA = DANISH name.<br/> - `DATA_PROVIDER`: PR = data provider's name.<br/> - `DUTCH_NAME`: NL = DUTCH name.<br/> - `ENCODING`: CH = character encoding.<br/> - `ENGLISH_NAME`: EN = ENGLISH name.<br/> - `ESTONIAN_NAME`: ET = ESTONIAN name.<br/> - `EXTRA_ATTRIBUTE`: EA = extra attributes for POIs objects.<br/> - `FEATURE_CLASS_CODE`: FCC = feature class code.<br/> - `FINNISH_NAME`: FI = FINNISH name.<br/> - `FRENCH_NAME`: FR = FRENCH name.<br/> - `FRISIAN_NAME`: FY = FRISISAN name.<br/> - `GAELIC_NAME`: GD = GAELIC name.<br/> - `GALICIAN_NAME`: GL = GALICIAN name.<br/> - `GEORGIAN_LATIN_NAME`: GT = GEORGIAN_LATIN name.<br/> - `GERMAN_NAME`: DE = GERMAN name.<br/> - `GREEK_GREEK_NAME`: EG = GREEK name (greek alphabet).<br/> - `GREEK_NAME`: EL = GREEK name (latin alphabet).<br/> - `GUARANI_NAME`: GN = GUARANI name.<br/> - `GUJARATI_LATIN_NAME`: GX = GUJARATI_LATIN name.<br/> - `GUJARATI_NAME`: GU = GUJARATI name.<br/> - `HEADER`: HD = header.<br/> - `HEBREW_LATIN_NAME`: HL = HEBREW name (latin).<br/> - `HEBREW_NAME`: HE = HEBREW name.<br/> - `HINDI_LATIN_NAME`: HT = HINDI name (latin).<br/> - `HINDI_NAME`: HI = HINDI name.<br/> - `HOUSE_NUMBER_LEFT`: LE = House number left.<br/> - `HOUSE_NUMBER_RIGHT`: RE = House number right.<br/> - `HUNGARIAN_NAME`: HU = HUNGARIAN name.<br/> - `ICELANDIC_NAME`: IS = ICELANDIC name.<br/> - `INCLUSION_RELATION`: LAB = Inclusion relation.<br/> - `INDONESIAN_NAME`: IN = INDONESIAN name (ID reserved for LinkIDs).<br/> - `INTERNATIONAL_CODE`: IC = international code.<br/> - `IRISH_NAME`: GA = IRISH name.<br/> - `ITALIAN_NAME`: IT = ITALIAN name.<br/> - `JAPAN_LATIN_NAME`: JL = JAPAN name (latin).<br/> - `JAPAN_NAME`: JA = JAPAN name.<br/> - `KANNADA_LATIN_NAME`: KX = KANNADA_LATIN name (latin).<br/> - `KANNADA_NAME`: KA = KANNADA name (latin).<br/> - `KAZAKH_LATIN_NAME`: KL = KAZAKH name (latin alphabet).<br/> - `KAZAKH_NAME`: KK = KAZAKH name.<br/> - `KEY`: Key.<br/> - `KOREAN_LATIN_NAME`: KT = KOREAN name (latin).<br/> - `KOREAN_NAME`: KO = KOREAN name.<br/> - `LANDMARK`: BM = 2D-Landmark meta data.<br/> - `LANDMARK_3D`: LM = 3D landmark texture.<br/> - `LANE_NUMBER`: LN = number of lanes.<br/> - `LANGUAGE`: LA = language for objects' names.<br/> - `LATVIAN_NAME`: LV = LATVIAN name.<br/> - `LEGAL_SPEED`: LS = Legal Speed.<br/> - `LENGTH`: LG = length in meters.<br/> - `LETZEBURGESCH_NAME`: LB = LETZEBURGESCH name.<br/> - `LITHUANIAN_NAME`: LT = LITHUANIAN name.<br/> - `MACEDONIAN_LATIN_NAME`: MC = MACEDONIAN name (latin alphabet).<br/> - `MACEDONIAN_NAME`: MK = MACEDONIAN name (cyrillic alphabet).<br/> - `MALAY_NAME`: MS = MALAY name.<br/> - `MALAYALAM_NAME`: MA = Malayalam name.<br/> - `MALTESE_NAME`: MT = MALTESE name.<br/> - `METRO`: MO = Metro (0 : not a metro station; 1 : metro station).<br/> - `MOLDAVIAN_NAME`: MO = MOLDAVIAN name.<br/> - `NAME`: ON = Official Name.<br/> - `NB_BORDER_JUNCTIONS`: NB = Number border junctions.<br/> - `NB_JUNCTIONS`: NJ = Number junctions.<br/> - `NORWEGIAN_NAME`: NO = NORWEGIAN name.<br/> - `OFFICIAL_CODE`: OC = Official Code.<br/> - `POLISH_NAME`: PL = POLISH name.<br/> - `POPULATION`: PO = Population.<br/> - `POPULATION_CATEGORY`: PC = Population Category.<br/> - `PORTUGUESE_NAME`: PT = PORTUGUESE name.<br/> - `POSTAL_CODE`: PS = postal code.<br/> - `RHAETO_ROMANCE_NAME`: RM = RHAETO-ROMANCE name.<br/> - `ROMANIAN_NAME`: RO = ROMANIAN name.<br/> - `ROUTE_NUMBER`: RN = Route number (ex. E15, A6, N7, etc.).<br/> - `RUSSIAN_LATIN_NAME`: RL = RUSSIAN name (latin alphabet).<br/> - `RUSSIAN_NAME`: RU = RUSSIAN name (cyrillic alphabet).<br/> - `SCALE`: SC = coordinates' scale.<br/> - `SELF_REF`: For SIV/VB SDK dynamic objects (self reference).<br/> - `SERBO_CROATIAN_LATIN_NAME`: SR = SERBO-CROATIAN name (latin alphabet).<br/> - `SERBO_CROATIAN_NAME`: SH = SERBO-CROATIAN name.<br/> - `SIGN_INFORMATION`: SI = sign information.<br/> - `SLOVAK_NAME`: SK = SLOVAK name.<br/> - `SLOVENIAN_NAME`: SL = SLOVENIAN name.<br/> - `SOURCE_FORMAT`: F0 = source format.<br/> - `SPANISH_NAME`: ES = SPANISH name.<br/> - `SPEED_CATEGORY`: SP = speed category (km/h): 0=10;1=20;2=30;3=40;4=50;5=60;6=70;7=80;8=90;9=100;10=110;11=120.<br/> - `STREET_NAME_AND_HOUSE_NUMBER`: NS = Street name and house number.<br/> - `SVS_TYPE`: ST = SVS type.<br/> - `SWEDISH_NAME`: SV = SWEDISH name.<br/> - `TELEPHONE`: TL = telephone number.<br/> - `TEXTURE_COORD`: TE = Texture coordinates (for 3D landmarks).<br/> - `THAI_LATIN_NAME`: TX = THAI name (latin alphabet).<br/> - `THAI_NAME`: TH = THAI name.<br/> - `TIME_DOMAIN_ATTRIBUTE`: TD = Time domain Attribute.<br/> - `TMC_LOCATION`: TM = TMC location.<br/> - `TOLL_ROAD`: TR = toll road.<br/> - `TRAFFIC_DIRECTION`: DF = direction of traffic flow.<br/> - `TRAFIC_INFO`: TI = Traffic Info Attribute.<br/> - `TRUCK_ATT_TIME_DOMAIN_ATTRIBUTE`: T0 = Truck Attribute with a Time domain Attribute.<br/> - `TRUCK_ATTRIBUTE`: TA = Truck Attribute.<br/> - `TURKISH_NAME`: TU = TURKISH name.<br/> - `UKRAINIAN_LATIN_NAME`: UL = UKRAINIAN name (latin alphabet).<br/> - `UKRAINIAN_NAME`: UK = UKRAINIAN name (cyrillic alphabet).<br/> - `UTM_ZONE`: UT = UTM zone : 1 - 60, positif for north, negative for south.<br/> - `VALENCIAN_NAME`: VL = VALENCIAN name.<br/> - `VIETNAMESE_LATIN_NAME`: VL = VIETNAMESE name (latin alphabet).<br/> - `VIETNAMESE_NAME`: VI = VIETNAMESE name.<br/> - `VT_MASK`: VT = vehicle type mask.<br/> - `WELSH_NAME`: CY = WELSH name.
| __key__ |             | BeNomad key of attribute. Type: `String`. |
| __numericKey__ |             | Numeric key. Type: `int`. |
| __rawData__ |             | BeNomad raw data. Type: `boolean`. |
| __type__ |             | Data type.<br/> Available values:<br/> - `BOOLEAN`: <br/> - `BYTE`: <br/> - `BYTES`: <br/> - `CHAR`: <br/> - `DOUBLE`: <br/> - `FLOAT`: <br/> - `INT`: <br/> - `KEY`: <br/> - `LABEL`: <br/> - `LONG`: <br/> - `META`: <br/> - `NA`: <br/> - `STRING`: <br/> - `UINT`: 
| __value__ |             | Data value. Type: `String`. |

#### __RoutingEvnt__
Class representing a routing event. Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __distanceUnit__ |             | Defines the distance unit. Type: `String`. |
| __markers__ |             | List of markers. Type: `list or array of [RoutingEvntMarker]`. See details below. |
| __timeUnit__ |             | Defines the time unit. Type: `String`. |
| __type__ |             | Type of event.<br/> Available values:<br/> - `SAMPLING_DISTANCE`: Each entry values are sampled by distance.<br/> - `SAMPLING_TIME`: Each entry values are sampled by time.<br/> - `SEGMENT`: Each entry values come from the road segmentation of map data.

#### __RoutingEvntMarker__
Class representing a routing event marker. Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __coordinate__ |             | The coordinate of the marker. Type: `[Coordinate]`. See details below. |
| __distance__ |             | The travel distance from start of the route. Type: `long`. |
| __entries__ |             | List of entries. Type: `list or array of [RoutingEvntEntry]`. See details below. |
| __percent__ |             | The percentage of distance from start of the route. Type: `double`. |
| __time__ |             | The travel time from start of the route. Type: `long`. |

#### __RoutingEvntEntry__
Class representing a routing event entry. Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __jsonObject__ |             | Representation of object value by JSON. Type: `[Object]`. See details below. |
| __name__ |             | Name of entry. Type: `String`. |
| __type__ |             | Type of entry. Type: `String`. |

#### __RoutingBooleanEventEntryFront__
Class representing a routing event entry. Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __jsonObject__ |             | Representation of object value by JSON. Type: `[Object]`. See details below. |
| __name__ |             | Name of entry. Type: `String`. |
| __type__ |             | Type of entry. Type: `String`. |
| __value__ |             |  Type: `boolean`. |

#### __RoutingChargingStationPoolEventEntryFront__
Class representing a routing event entry. Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __accessibility__ |             | <br/> Available values:<br/> - `CAR_SHARING_ONLY`: Car sharing only.<br/> - `NA`: Unspecified access to the area.<br/> - `OTHER`: Other.<br/> - `PRIVATE`: Private.<br/> - `PRIVATE_CUSTOMERS_ONLY`: Private customers only.<br/> - `PRIVATE_EMPLOYEES_ONLY`: Private employees only.<br/> - `PRIVATE_RESIDENTS_ONLY`: Private residents only.<br/> - `PRIVATE_UPON_PRESENTATION`: Private upon presentation.<br/> - `PUBLIC`: Publicly accessible area.<br/> - `PUBLIC_UPON_PRESENTATION`: Public upon presentation.<br/> - `PUBLIC_WITH_MEMBERSHIP`: Public with membership.<br/> - `RESTRICTED`: Controlled or restricted area access.<br/> - `UNSUPPORTED_VALUE`: Not found, not supported new value.
| __address__ |             |  Type: `[Address]`. See details below. |
| __addressComplement__ |             |  Type: `String`. |
| __availabilityStatus__ |             | <br/> Available values:<br/> - `FUTURE`: Future.<br/> - `IN_SERVICE`: In service.<br/> - `IN_SERVICE_BUSY`: In service but busy.<br/> - `IN_SERVICE_FREE`: In service and free.<br/> - `IN_SERVICE_RESERVED`: In service but reserved.<br/> - `NA`: Not specified.<br/> - `OUT_OF_ORDER`: Out Of Order.<br/> - `UNSUPPORTED_VALUE`: Not found, not supported new value.
| __availabilityUntil__ |             |  Type: `long`. |
| __brand__ |             |  Type: `String`. |
| __comment__ |             |  Type: `String`. |
| __entrance__ |             |  Type: `[CoordinateFullName]`. See details below. |
| __floorNumber__ |             |  Type: `String`. |
| __id__ |             |  Type: `String`. |
| __jsonObject__ |             | Representation of object value by JSON. Type: `[Object]`. See details below. |
| __maxNominalPower__ |             |  Type: `double`. |
| __name__ |             | Name of entry. Type: `String`. |
| __nameOfPool__ |             |  Type: `String`. |
| __numberOfChargingPoint__ |             |  Type: `int`. |
| __open24x7__ |             |  Type: `Boolean`. |
| __openingHours__ |             |  Type: `list or array of [PoolOpeningHour]`. See details below. |
| __phoneNumber__ |             |  Type: `String`. |
| __providerName__ |             |  Type: `String`. |
| __siteType__ |             |  Type: `String`. |
| __sourceProvider__ |             |  Type: `String`. |
| __summaryOfConnectorTypeIds__ |             |  Type: `list or array of Integer`. |
| __type__ |             | Type of entry. Type: `String`. |

#### __CoordinateFullName__
Describe the coordinate composed by latitude and longitude. Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __altitude__ |             | Altitude in meters. Type: `Double`. |
| __latitude__ |             | Latitude in degrees decimal (WGS84) (double). Type: `double`. |
| __longitude__ |             | Longitude in degrees decimal (WGS84) (double). Type: `double`. |

#### __PoolOpeningHour__
 Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __dayOfweek__ |             | <br/> Available values:<br/> - `FRIDAY`: <br/> - `MONDAY`: <br/> - `SATURDAY`: <br/> - `SUNDAY`: <br/> - `THURSDAY`: <br/> - `TUESDAY`: <br/> - `WEDNESDAY`: 
| __end__ |             |  Type: `String`. |
| __start__ |             |  Type: `String`. |

#### __RoutingChargingStationStepEventEntryFront__
Class representing a routing event entry. Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __batteryChargeLevel__ |             |  Type: `double`. |
| __chargingTime__ |             |  Type: `long`. |
| __consumedFromPreviousStop__ |             |  Type: `double`. |
| __jsonObject__ |             | Representation of object value by JSON. Type: `[Object]`. See details below. |
| __name__ |             | Name of entry. Type: `String`. |
| __type__ |             | Type of entry. Type: `String`. |

#### __RoutingCoordinateEventEntryFront__
Class representing a routing event entry. Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __altitude__ |             |  Type: `Double`. |
| __jsonObject__ |             | Representation of object value by JSON. Type: `[Object]`. See details below. |
| __latitude__ |             |  Type: `double`. |
| __longitude__ |             |  Type: `double`. |
| __name__ |             | Name of entry. Type: `String`. |
| __type__ |             | Type of entry. Type: `String`. |

#### __RoutingDoubleEventEntryFront__
Class representing a routing event entry. Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __jsonObject__ |             | Representation of object value by JSON. Type: `[Object]`. See details below. |
| __name__ |             | Name of entry. Type: `String`. |
| __type__ |             | Type of entry. Type: `String`. |
| __value__ |             |  Type: `double`. |

#### __RoutingElevation2EventEntryFront__
Class representing a routing event entry. Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __distance__ |             |  Type: `long`. |
| __duration__ |             |  Type: `double`. |
| __fromAltitude__ |             |  Type: `double`. |
| __jsonObject__ |             | Representation of object value by JSON. Type: `[Object]`. See details below. |
| __length__ |             |  Type: `double`. |
| __name__ |             | Name of entry. Type: `String`. |
| __toAltitude__ |             |  Type: `double`. |
| __type__ |             | Type of entry. Type: `String`. |

#### __RoutingElevationEventEntryFront__
Class representing a routing event entry. Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __altitude__ |             |  Type: `double`. |
| __distance__ |             |  Type: `long`. |
| __duration__ |             |  Type: `double`. |
| __jsonObject__ |             | Representation of object value by JSON. Type: `[Object]`. See details below. |
| __length__ |             |  Type: `double`. |
| __name__ |             | Name of entry. Type: `String`. |
| __type__ |             | Type of entry. Type: `String`. |

#### __RoutingEnergySampleEventEntryFront__
Class representing a routing event entry. Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __acceleration__ |             |  Type: `double`. |
| __angle__ |             |  Type: `double`. |
| __cumulativeConsumption__ |             |  Type: `double`. |
| __distFromStart__ |             |  Type: `double`. |
| __jsonObject__ |             | Representation of object value by JSON. Type: `[Object]`. See details below. |
| __name__ |             | Name of entry. Type: `String`. |
| __pos__ |             |  Type: `[CoordinateFullName]`. See details below. |
| __slope__ |             |  Type: `double`. |
| __speed__ |             |  Type: `double`. |
| __type__ |             | Type of entry. Type: `String`. |

#### __RoutingExceptionEventFront__
Class representing an exception during the trip. Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __jsonObject__ |             | Representation of object value by JSON. Type: `[Object]`. See details below. |
| __message__ |             | list of the via event's POIs Type: `String`. |
| __name__ |             | Name of entry. Type: `String`. |
| __type__ |             | Type of entry. Type: `String`. |

#### __RoutingFloatEventEntryFront__
Class representing a routing event entry. Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __jsonObject__ |             | Representation of object value by JSON. Type: `[Object]`. See details below. |
| __name__ |             | Name of entry. Type: `String`. |
| __type__ |             | Type of entry. Type: `String`. |
| __value__ |             |  Type: `float`. |

#### __RoutingGeoElementTypeEventEntryFront__
Class representing a routing event entry. Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __geoElementType__ |             |  Type: `String`. |
| __jsonObject__ |             | Representation of object value by JSON. Type: `[Object]`. See details below. |
| __name__ |             | Name of entry. Type: `String`. |
| __roadAdminLevel__ |             |  Type: `String`. |
| __type__ |             | Type of entry. Type: `String`. |

#### __RoutingGeometryEventEntryFront__
Class representing a routing event entry. Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __coordinates__ |             |  Type: `list or array of [CoordinateFullName]`. See details below. |
| __jsonObject__ |             | Representation of object value by JSON. Type: `[Object]`. See details below. |
| __name__ |             | Name of entry. Type: `String`. |
| __type__ |             | Type of entry. Type: `String`. |

#### __RoutingIntEventEntryFront__
Class representing a routing event entry. Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __jsonObject__ |             | Representation of object value by JSON. Type: `[Object]`. See details below. |
| __name__ |             | Name of entry. Type: `String`. |
| __type__ |             | Type of entry. Type: `String`. |
| __value__ |             |  Type: `int`. |

#### __RoutingLongEventEntryFront__
Class representing a routing event entry. Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __jsonObject__ |             | Representation of object value by JSON. Type: `[Object]`. See details below. |
| __name__ |             | Name of entry. Type: `String`. |
| __type__ |             | Type of entry. Type: `String`. |
| __value__ |             |  Type: `long`. |

#### __RoutingRoutesheetEventEntryFront__
Class representing a routing event entry. Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __jsonObject__ |             | Representation of object value by JSON. Type: `[Object]`. See details below. |
| __name__ |             | Name of entry. Type: `String`. |
| __routingInstruction__ |             |  Type: `[RoutingInstrucFullName]`. See details below. |
| __type__ |             | Type of entry. Type: `String`. |

#### __RoutingInstrucFullName__
Class representing a guidance instruction of a route. Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __coordinateWgs84__ |             | Position of the maneuver. Type: `[CoordinateFullName]`. See details below. |
| __duration__ |             | Duration in seconds of current instruction. Type: `Integer`. |
| __fromName__ |             | Name of last road segment before the maneuver. In specified language define in request, if available in map data Type: `String`. |
| __fromPhoneme__ |             | Phonetic transcription of the name of last road segment before the maneuver. In specified language define in request, if available in map data Type: `String`. |
| __geoElementType__ |             | Geo element type following instruction.<br/> Available values:<br/> - `ALL_ROAD`: Road types.<br/> - `AMUSEMENT_PARK`: <br/> - `BANK`: <br/> - `BEACH`: <br/> - `BOWLING`: <br/> - `BUILT_UP_AREA_MAIN`: Urban area coverage size main, not an administrative area.<br/> - `BUILT_UP_AREA_MEDIUM`: Urban area coverage size medium (not an administrative area).<br/> - `BUILT_UP_AREA_NA`: Urban area information not available.<br/> - `BUILT_UP_AREA_NONE`: No urban area.<br/> - `BUILT_UP_AREA_SMALL`: Urban area coverage size small (not an administrative area).<br/> - `BUS_STATION`: <br/> - `CAMPING`: <br/> - `CASINO`: <br/> - `CINEMA`: <br/> - `CITY`: <br/> - `CITY_HALL`: <br/> - `COUNTRY`: Administrative.<br/> - `COUNTY`: <br/> - `CULTURAL_CENTRE`: <br/> - `DISTRICT`: <br/> - `EXHIBITION_CENTER`: <br/> - `FERRY`: <br/> - `FOURTH_ROAD`: <br/> - `GOLF_COURSE`: <br/> - `GROCERY_STORE`: <br/> - `HISTORICAL_MONUMENT`: <br/> - `HOSPITAL`: <br/> - `HOTEL_MOTEL`: <br/> - `LIBRARY`: <br/> - `MAIN_ROAD`: Road levels.<br/> - `MARINA`: <br/> - `MOTORWAY`: <br/> - `MUSEUM`: <br/> - `MUSIC_CENTER`: <br/> - `OPERA`: <br/> - `PARKING_GARAGE`: <br/> - `PEDESTRIAN`: <br/> - `PETROL_STATION`: <br/> - `PHARMACY`: <br/> - `POLICE_STATION`: <br/> - `POST_OFFICE`: <br/> - `POSTAL_CODE`: <br/> - `RENT_A_CAR`: <br/> - `RESTAURANT`: <br/> - `ROAD`: <br/> - `ROUNDABOUT`: <br/> - `SECONDARY_ROAD`: <br/> - `SHOP`: <br/> - `SHOPPING_CENTRE`: <br/> - `SLIP_ROAD`: <br/> - `SPORTS_ACTIVITY`: <br/> - `SPORTS_CENTRE`: <br/> - `STADIUM`: <br/> - `STATE`: <br/> - `TENNIS_COURT`: <br/> - `TERTIARY_ROAD`: <br/> - `THEATRE`: <br/> - `TOURIST_ATTRACTION`: <br/> - `TOURIST_OFFICE`: <br/> - `VEHICLE_REPAIR`: POI.<br/> - `ZOO`: 
| __length__ |             | Distance in meters of current instruction. Type: `Integer`. |
| __manoeuvre__ |             | The direction to follow.<br/> Available values:<br/> - `BEAR_LEFT`: Bear left.<br/> - `BEAR_RIGHT`: Bear right.<br/> - `LEFT`: Turn left.<br/> - `RIGHT`: Turn right.<br/> - `SHARP_LEFT`: Turn sharp left.<br/> - `SHARP_RIGHT`: Turn sharp right.<br/> - `SLIGHT_LEFT`: Turn slight left.<br/> - `SLIGHT_RIGHT`: Turn slight right.<br/> - `STRAIGHT`: Straight ahead.<br/> - `U_TURN`: Make a u-turn.
| <s>__polylineIndex__</s> |             | Index in route polyline's points array of first form of this instruction. Deprecated use instead `EVENT`, `EVT_ROUTESHEET` with `EVT_POLYLINE` or `EVT_ENCODED_POLYLINE`. Type: `Integer`. |
| __roundAboutExitNumber__ |             | The exit number of a roundabout. Type: `Integer`. |
| __text__ |             | Instruction in human readable format can be used with text-to-speech. Type: `String`. |
| __textDist__ |             | Distance instruction in human readable format can be used with text-to-speech. Type: `String`. |
| __toName__ |             | Name (or sign post) of first road segment after the maneuver. In specified language define in request, if available in map data Type: `String`. |
| __toOn__ |             | Returns the Official Name of next route section (in specified language code if available). Type: `String`. |
| __toOnPhoneme__ |             | Returns phonetic transcription of the official name of next route section. Type: `String`. |
| __toPhoneme__ |             | Phonetic transcription of the name (or sign post) of first road segment after the maneuver. In specified language define in request, if available in map data Type: `String`. |
| __toRn__ |             | Route number of first road segment after the maneuver. Type: `String`. |
| __toRnPhoneme__ |             | Phonetic transcription of the route number of first road segment after the maneuver. Type: `String`. |
| __toSi__ |             | Sign post to follow after the maneuver. In specified language define in request, if available in map data. Type: `String`. |
| __toSiPhoneme__ |             | Phonetic transcription of the sign post to follow after the maneuver. In specified language define in request, if available in map data. Type: `String`. |
| __type__ |             | Instruction type.<br/> Available values:<br/> - `ENTER_MOTORWAY`: Enter in motorway.<br/> - `ENTER_ROUNDABOUT`: Enter in roundabout.<br/> - `EXIT_MOTORWAY`: Exit from motorway.<br/> - `EXIT_ROUNDABOUT`: Exit from roundabout.<br/> - `FOLLOW`: Follow.<br/> - `FOLLOW_SIGN`: Follow sign.<br/> - `LEAVE_FERRY`: Leave ferry.<br/> - `STOP`: Stop.<br/> - `STOP_VIA`: Stop on via.<br/> - `TAKE_FERRY`: Take ferry.<br/> - `TAKE_RAMP`: Take ramp.

#### __RoutingSegmentInfoEventEntryFront__
Class representing a routing event entry. Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __duration__ |             |  Type: `long`. |
| __id__ |             |  Type: `String`. |
| __jsonObject__ |             | Representation of object value by JSON. Type: `[Object]`. See details below. |
| __length__ |             |  Type: `long`. |
| __name__ |             | Name of entry. Type: `String`. |
| __reverseDirection__ |             |  Type: `boolean`. |
| __type__ |             | Type of entry. Type: `String`. |

#### __RoutingStringEventEntryFront__
Class representing a routing event entry. Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __jsonObject__ |             | Representation of object value by JSON. Type: `[Object]`. See details below. |
| __name__ |             | Name of entry. Type: `String`. |
| __type__ |             | Type of entry. Type: `String`. |
| __value__ |             |  Type: `String`. |

#### __RoutingTaxCostEventEntryFront__
Class representing a routing event entry. Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __jsonObject__ |             | Representation of object value by JSON. Type: `[Object]`. See details below. |
| __name__ |             | Name of entry. Type: `String`. |
| __taxSection__ |             |  Type: `[RoutingTaxSect]`. See details below. |
| __type__ |             | Type of entry. Type: `String`. |

#### __RoutingTollCostEventEntryFront__
Class representing a routing event entry. Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __jsonObject__ |             | Representation of object value by JSON. Type: `[Object]`. See details below. |
| __name__ |             | Name of entry. Type: `String`. |
| __toll__ |             |  Type: `[TolFullName]`. See details below. |
| __type__ |             | Type of entry. Type: `String`. |

#### __TolFullName__
Class representing toll. Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __coordinateWgs84__ |             | Coordinate of toll. Type: `[CoordinateFullName]`. See details below. |
| __meanOfPayments__ |             | List of mean of payment.<br/> Available values:<br/> - `PAYMENT_BANK_CARD`: Bank card.<br/> - `PAYMENT_CASH`: Cash.<br/> - `PAYMENT_CREDIT_CARD`: Credit card.<br/> - `PAYMENT_EXACT_CASH`: Exact cash.<br/> - `PAYMENT_PASS_SUBSCRIPTION`: Pass or subscription.<br/> - `PAYMENT_TRANSPONDER`: Transponder.<br/> - `PAYMENT_TRAVEL_CARD`: Travel card.<br/> - `PAYMENT_VIDEO_TOLL_CHARGE`: Video toll charge.
| __polylineIndex__ |             | Index of polyline coordinate. Type: `long`. |
| __tollCharges__ |             | List of toll charge. Type: `list or array of [TollChrg]`. See details below. |
| __tollType__ |             | Type of toll.<br/> Available values:<br/> - `TOLL_ELECTRONIC`: Electronic.<br/> - `TOLL_FIXED_FEE`: Fixed fee (does not depend of origin).<br/> - `TOLL_OBTAIN_TICKET`: Obtain ticket (no fee).<br/> - `TOLL_PAY_PER_TICKET`: Pay per ticket (depends of origin).

#### __RoutingTrafficElementEventEntryFront__
Class representing a routing event entry. Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __currentJamFactor__ |             |  Type: `Float`. |
| __jsonObject__ |             | Representation of object value by JSON. Type: `[Object]`. See details below. |
| __name__ |             | Name of entry. Type: `String`. |
| __statisticJamFactor__ |             |  Type: `Float`. |
| __trafficElement__ |             |  Type: `[TrafficItemFullName]`. See details below. |
| __type__ |             | Type of entry. Type: `String`. |

#### __TrafficItemFullName__
Traffic item. Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __alertcCode__ |             | AlertcTrafficElement. Type: `int`. |
| __alertcEbuCountryCode__ |             | AlertcTrafficElement. Type: `char`. |
| __alertcExtend__ |             | AlertcTrafficElement. Type: `int`. |
| __alertcLocationId__ |             | AlertcTrafficElement. Type: `long`. |
| __alertcTableId__ |             | AlertcTrafficElement. Type: `long`. |
| __boundingBoxWgs84__ |             | Bounding box of geometry in WGS84. Type: `[BoundingBoxFullName]`. See details below. |
| __elementId__ |             | Element ID. Type: `String`. |
| __info__ |             | Traffic information of element. Type: `[TrafficElementInfo]`. See details below. |
| __jamFactor__ |             | Percent (%) of traffic jam. Between 0.00 (free way) to 100.00 (full jam). Type: `float`. |
| __openLrBase64__ |             | OpenLrTrafficElement. Type: `String`. |
| __polyline__ |             | Polyline. Type: `list or array of [CoordinateFullName]`. See details below. |
| __reason__ |             | TrafficReason.<br/> Available values:<br/> - `ACCIDENT`: Accident.<br/> - `BLOCKED_ROAD`: Blocked road.<br/> - `CARRIAGEWAY_REDUCED`: Carriage-way reduced.<br/> - `CONGESTION`: traffic congestion (jam).<br/> - `INCIDENT`: Incident.<br/> - `INFORMATION`: Information.<br/> - `NA`: Not available.<br/> - `NON_RECOMMANDED_ROAD`: Non re-commanded road.<br/> - `ROAD_CONDITION_DETERIORATED`: Road condition deteriorated.<br/> - `ROAD_UNDER_CONTRUCTION`: Road under construction.
| __reasonComments__ |             | List of reason comments. Type: `list or array of [TrafficResComment]`. See details below. |
| __reasonCoordinate__ |             | Coordinate of the reason event. Type: `[CoordinateFullName]`. See details below. |
| __reverseDirection__ |             | True for inverse road direction. Type: `boolean`. |
| __segmentInfos__ |             | Segment Info. Type: `list or array of [TrafficSegInfo]`. See details below. |
| __tmcInternalId__ |             | AlertcTrafficElement. Type: `long`. |

#### __TrafficElementInfo__
 Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __copyright__ |             |  Type: `String`. |
| __countryCode__ |             |  Type: `String`. |
| __id__ |             |  Type: `String`. |
| __lastUpdateDate__ |             |  Type: `Date`. |
| __releaseDate__ |             |  Type: `Date`. |

#### __BoundingBoxFullName__
This a model class for creating a rectangle that includes the whole trip which is defined with 4 coordinates. Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __maxXLongitude__ |             | Maximum longitude, in degrees decimal ([WGS84](index.html#page-glossary-coordinate_system.md)). Type: `double`. |
| __maxYLatitude__ |             | Maximum latitude, in degrees decimal ([WGS84](index.html#page-glossary-coordinate_system.md)). Type: `double`. |
| __minXLongitude__ |             | Minimum longitude, in degrees decimal ([WGS84](index.html#page-glossary-coordinate_system.md)). Type: `double`. |
| __minYLatitude__ |             | Minimum latitude, in degrees decimal ([WGS84](index.html#page-glossary-coordinate_system.md)). Type: `double`. |

#### __TrafficResComment__
Class representing a traffic reason comment. Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __comment__ |             |  Type: `String`. |
| __language__ |             |  Type: `String`. |

#### __TrafficSegInfo__
Class representing a traffic segment information. Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __id__ |             | Unique identifier of road segment. Type: `String`. |
| __reverseDirection__ |             | The route travel is in opposite way of geometry. Type: `boolean`. |

#### __RoutingTrafficSignEventEntryFront__
Class representing a routing event entry. Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __category__ |             | <br/> Available values:<br/> - `ACCIDENT_HAZARD`: <br/> - `ANIMAL_CROSSING`: <br/> - `BICYCLE_CROSSING`: <br/> - `CONGESTION_HAZARD`: <br/> - `DOUBLE_HAIRPIN`: <br/> - `EMBANKMENT`: <br/> - `END_NO_OVERTAKING`: <br/> - `END_NO_OVERTAKING_TRUCKS`: <br/> - `END_OF_ALL_RESTRICTIONS`: <br/> - `ENDOF_LOW_GEAR`: <br/> - `ENDOF_NO_ENGINE_BRAKE`: <br/> - `FALLING_ROCKS`: <br/> - `FLOOD_AREA`: <br/> - `GENERAL_CURVE`: <br/> - `GENERAL_HILL`: <br/> - `GENERAL_WARNING`: <br/> - `HUMP_BRIDGE`: <br/> - `ICY_CONDITIONS`: <br/> - `LANE_MERGE_CENTER`: <br/> - `LANE_MERGE_LEFT`: <br/> - `LANE_MERGE_RIGHT`: <br/> - `LATERAL_WIND`: <br/> - `LIGHT`: <br/> - `LOW_GEAR`: <br/> - `NO_CAMPER`: <br/> - `NO_ENGINE_BRAKE`: <br/> - `NO_IDLING`: <br/> - `NO_TOWED_CARAVAN`: <br/> - `NO_TOWED_TRAILER`: <br/> - `NO_TURN_ON_RED`: <br/> - `NOT_SUPPORTED`: <br/> - `OBJECT_OVERHANG`: <br/> - `OBSTACLE`: <br/> - `PEDESTRIAN_CROSSING`: <br/> - `PR_OVERTAKING_EL`: <br/> - `PR_OVERTAKING_ELL`: <br/> - `PR_OVERTAKING_ELR`: <br/> - `PRIORITY_ONCOMING`: <br/> - `RAILWAY_CROSS_PR`: <br/> - `RAILWAY_CROSS_UNPR`: <br/> - `RIGHT_PRIORITY`: <br/> - `RISK_OF_GROUNDING`: <br/> - `ROAD_NARROWS`: <br/> - `ROAD_SPLIT`: <br/> - `SCHOOL_ZONE`: <br/> - `SHARP_CURVE_LEFT`: <br/> - `SHARP_CURVE_RIGHT`: <br/> - `SLIPPERY_ROAD`: <br/> - `ST_NO_OVERTAKING`: <br/> - `ST_NO_OVERTAKING_TRUCKS`: <br/> - `STEEP_HILL_DOWN`: <br/> - `STEEP_HILL_UP`: <br/> - `STOP`: <br/> - `TRAMWAY_CROSSING`: <br/> - `TRIPLE_HAIRPIN`: <br/> - `TRUCK_ROLLOVER`: <br/> - `TURN_ON_RED`: <br/> - `TWO_WAY_TRAFFIC`: <br/> - `UNEVEN_ROAD`: <br/> - `URBAN_AREA`: <br/> - `WINDING_RD_LEFT`: <br/> - `WINDING_RD_RIGHT`: <br/> - `YIELD`: <br/> - `YIELD_ONCOMING`: <br/> - `YIELD_TO_BICYCLES`: 
| __jsonObject__ |             | Representation of object value by JSON. Type: `[Object]`. See details below. |
| __matchedCoordinate__ |             |  Type: `[CoordinateFullName]`. See details below. |
| __name__ |             | Name of entry. Type: `String`. |
| __text__ |             |  Type: `String`. |
| __type__ |             | Type of entry. Type: `String`. |

#### __RoutingWaypointEventEntryFront__
Class representing a routing event entry. Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __jsonObject__ |             | Representation of object value by JSON. Type: `[Object]`. See details below. |
| __name__ |             | Name of entry. Type: `String`. |
| __type__ |             | Type of entry. Type: `String`. |
| __waypoint__ |             |  Type: `[RoutingWaypnt]`. See details below. |

#### __RoutingBooleanEventEntry__
 Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __value__ |             |  Type: `boolean`. |

#### __RoutingChargingStationPoolEventEntry__
 Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __accessibility__ |             | <br/> Available values:<br/> - `CAR_SHARING_ONLY`: <br/> - `NA`: <br/> - `NOT_FOUND`: <br/> - `OTHER`: <br/> - `PRIVATE`: <br/> - `PRIVATE_CUSTOMERS_ONLY`: <br/> - `PRIVATE_EMPLOYEES_ONLY`: <br/> - `PRIVATE_RESIDENTS_ONLY`: <br/> - `PRIVATE_UPON_PRESENTATION`: <br/> - `PUBLIC`: <br/> - `PUBLIC_UPON_PRESENTATION`: <br/> - `PUBLIC_WITH_MEMBERSHIP`: <br/> - `RESTRICTED`: 
| __address__ |             |  Type: `[PostalAddress]`. See details below. |
| __addressComplement__ |             |  Type: `String`. |
| __availabilityStatus__ |             | <br/> Available values:<br/> - `FUTURE`: <br/> - `IN_SERVICE`: <br/> - `IN_SERVICE_BUSY`: <br/> - `IN_SERVICE_FREE`: <br/> - `IN_SERVICE_RESERVED`: <br/> - `NA`: <br/> - `OUT_OF_ORDER`: 
| __availabilityUntil__ |             |  Type: `long`. |
| __brand__ |             |  Type: `String`. |
| __comment__ |             |  Type: `String`. |
| __entrance__ |             |  Type: `[CoordinateWgs84]`. See details below. |
| __floorNumber__ |             |  Type: `String`. |
| __id__ |             |  Type: `String`. |
| __maxNominalPower__ |             |  Type: `double`. |
| __nameOfPool__ |             |  Type: `String`. |
| __numberOfChargingPoint__ |             |  Type: `int`. |
| __open24x7__ |             |  Type: `Boolean`. |
| __openingHours__ |             |  Type: `list or array of [PoolOpeningHour]`. See details below. |
| __phoneNumber__ |             |  Type: `String`. |
| __providerName__ |             |  Type: `String`. |
| __siteType__ |             |  Type: `String`. |
| __sourceProvider__ |             |  Type: `String`. |
| __summaryOfConnectorTypeIds__ |             |  Type: `list or array of Integer`. |

#### __PostalAddress__
 Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __city__ |             |  Type: `String`. |
| __country__ |             |  Type: `String`. |
| __countryCode__ |             |  Type: `String`. |
| __county__ |             |  Type: `String`. |
| __district__ |             |  Type: `String`. |
| <s>__oppositeStreetNumber__</s> |             |  Type: `String`. |
| __postalCode__ |             |  Type: `String`. |
| __roadNumber__ |             |  Type: `String`. |
| __state__ |             |  Type: `String`. |
| __street__ |             |  Type: `String`. |
| __streetNumber__ |             |  Type: `String`. |

#### __CoordinateWgs84__
 Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __altitude__ |             | Altitude in meters. Type: `Double`. |
| __latitude__ |             | Latitude in degrees (WGS84). Type: `double`. |
| __longitude__ |             | Longitude in degrees (WGS84). Type: `double`. |

#### __RoutingChargingStationStepEventEntry__
 Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __accessibility__ |             | <br/> Available values:<br/> - `CAR_SHARING_ONLY`: <br/> - `NA`: <br/> - `NOT_FOUND`: <br/> - `OTHER`: <br/> - `PRIVATE`: <br/> - `PRIVATE_CUSTOMERS_ONLY`: <br/> - `PRIVATE_EMPLOYEES_ONLY`: <br/> - `PRIVATE_RESIDENTS_ONLY`: <br/> - `PRIVATE_UPON_PRESENTATION`: <br/> - `PUBLIC`: <br/> - `PUBLIC_UPON_PRESENTATION`: <br/> - `PUBLIC_WITH_MEMBERSHIP`: <br/> - `RESTRICTED`: 
| __address__ |             |  Type: `[PostalAddress]`. See details below. |
| __addressComplement__ |             |  Type: `String`. |
| __availabilityStatus__ |             | <br/> Available values:<br/> - `FUTURE`: <br/> - `IN_SERVICE`: <br/> - `IN_SERVICE_BUSY`: <br/> - `IN_SERVICE_FREE`: <br/> - `IN_SERVICE_RESERVED`: <br/> - `NA`: <br/> - `OUT_OF_ORDER`: 
| __availabilityUntil__ |             |  Type: `long`. |
| __batteryChargeLevel__ |             |  Type: `double`. |
| __brand__ |             |  Type: `String`. |
| __chargingTime__ |             |  Type: `long`. |
| __comment__ |             |  Type: `String`. |
| __consumedFromPreviousStop__ |             |  Type: `double`. |
| __entrance__ |             |  Type: `[CoordinateWgs84]`. See details below. |
| __floorNumber__ |             |  Type: `String`. |
| __id__ |             |  Type: `String`. |
| __maxNominalPower__ |             |  Type: `double`. |
| __nameOfPool__ |             |  Type: `String`. |
| __numberOfChargingPoint__ |             |  Type: `int`. |
| __open24x7__ |             |  Type: `Boolean`. |
| __openingHours__ |             |  Type: `list or array of [PoolOpeningHour]`. See details below. |
| __phoneNumber__ |             |  Type: `String`. |
| __providerName__ |             |  Type: `String`. |
| __siteType__ |             |  Type: `String`. |
| __sourceProvider__ |             |  Type: `String`. |
| __summaryOfConnectorTypeIds__ |             |  Type: `list or array of Integer`. |

#### __RoutingCoordinateEventEntry__
 Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __altitude__ |             |  Type: `Double`. |
| __latitude__ |             |  Type: `double`. |
| __longitude__ |             |  Type: `double`. |

#### __RoutingDoubleEventEntry__
 Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __value__ |             |  Type: `double`. |

#### __RoutingElevation2EventEntry__
 Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __distance__ |             |  Type: `long`. |
| __duration__ |             |  Type: `double`. |
| __fromAltitude__ |             |  Type: `double`. |
| __length__ |             |  Type: `double`. |
| __toAltitude__ |             |  Type: `double`. |

#### __RoutingElevationEventEntry__
 Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __altitude__ |             |  Type: `double`. |
| __distance__ |             |  Type: `long`. |
| __duration__ |             |  Type: `double`. |
| __length__ |             |  Type: `double`. |

#### __RoutingEnergySampleEventEntry__
 Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __acceleration__ |             |  Type: `double`. |
| __angle__ |             |  Type: `double`. |
| __cumulativeConsumption__ |             |  Type: `double`. |
| __distFromStart__ |             |  Type: `double`. |
| __pos__ |             |  Type: `[CoordinateWgs84]`. See details below. |
| __slope__ |             |  Type: `double`. |
| __speed__ |             |  Type: `double`. |

#### __RoutingFloatEventEntry__
 Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __value__ |             |  Type: `float`. |

#### __RoutingGeoElementTypeEventEntry__
 Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __geoElementType__ |             |  Type: `String`. |
| __roadAdminLevel__ |             |  Type: `String`. |

#### __RoutingGeometryEventEntry__
 Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __coordinates__ |             |  Type: `list or array of [CoordinateWgs84]`. See details below. |

#### __RoutingIntEventEntry__
 Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __value__ |             |  Type: `int`. |

#### __RoutingLongEventEntry__
 Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __value__ |             |  Type: `long`. |

#### __RoutingRoutesheetEventEntry__
 Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __routingInstruction__ |             |  Type: `[RoutingInstruction]`. See details below. |

#### __RoutingInstruction__
 Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __coordinateWgs84__ |             |  Type: `[CoordinateWgs84]`. See details below. |
| __duration__ |             |  Type: `Integer`. |
| __fromName__ |             |  Type: `String`. |
| __fromPhoneme__ |             |  Type: `String`. |
| __geoElementType__ |             | <br/> Available values:<br/> - `ABBEY`: <br/> - `AIRPORT`: <br/> - `ALL_ROAD`: <br/> - `AMUSEMENT_PARK`: <br/> - `ARTS_CENTER`: <br/> - `ATM`: <br/> - `AUTOMOBILE_DEALERSHP`: <br/> - `BANK`: <br/> - `BAR_PUB`: <br/> - `BEACH`: <br/> - `BOWLING`: <br/> - `BUILT_UP_AREA_MAIN`: <br/> - `BUILT_UP_AREA_MEDIUM`: <br/> - `BUILT_UP_AREA_NA`: <br/> - `BUILT_UP_AREA_NONE`: <br/> - `BUILT_UP_AREA_SMALL`: <br/> - `BUS_STATION`: <br/> - `BUSINESS_FACILITY`: <br/> - `CAMPING`: <br/> - `CAR_DEALER`: <br/> - `CASINO`: <br/> - `CASTLE`: <br/> - `CHURCH`: <br/> - `CINEMA`: <br/> - `CITY`: <br/> - `CITY_CENTER`: <br/> - `CITY_HALL`: <br/> - `COMMUNITY_CENTRE`: <br/> - `COMMUTER_RAIL_STATION`: <br/> - `COMPANY`: <br/> - `CONCERT_HALL`: <br/> - `CONVENTION_CENTER`: <br/> - `COUNTRY`: <br/> - `COUNTY`: <br/> - `COURT_HOUSE`: <br/> - `CULTURAL_CENTRE`: <br/> - `DENTIST`: <br/> - `DISTRICT`: <br/> - `DOCTOR`: <br/> - `EMBASSY`: <br/> - `ENTERTAINMENT`: <br/> - `EXHIBITION_CENTER`: <br/> - `FERRY`: <br/> - `FERRY_TERMINAL`: <br/> - `FORTRESS`: <br/> - `FOURTH_ROAD`: <br/> - `GOLF_COURSE`: <br/> - `GOVERNMENT_OFFICE`: <br/> - `GROCERY_STORE`: <br/> - `HAMLET`: <br/> - `HISTORICAL_MONUMENT`: <br/> - `HOLIDAY_AREA`: <br/> - `HOSPITAL`: <br/> - `HOTEL_MOTEL`: <br/> - `ICE_SKATING_RINK`: <br/> - `LEISURE_CENTRE`: <br/> - `LIBRARY`: <br/> - `LIGHTHOUSE`: <br/> - `MAIN_ROAD`: <br/> - `MARINA`: <br/> - `MILITARY_CEMETERY`: <br/> - `MONASTERY`: <br/> - `MONUMENT`: <br/> - `MOTORWAY`: <br/> - `MOUNTAIN_PEAK`: <br/> - `MUSEUM`: <br/> - `MUSIC_CENTER`: <br/> - `NATURAL_RESERVE`: <br/> - `NIGHTLIFE`: <br/> - `OPEN_PARKING_AREA`: <br/> - `OPERA`: <br/> - `PARK_AND_RECREATION_AREA`: <br/> - `PARK_AND_RIDE`: <br/> - `PARKING_GARAGE`: <br/> - `PEDESTRIAN`: <br/> - `PETROL_STATION`: <br/> - `PHARMACY`: <br/> - `POLICE_STATION`: <br/> - `POST_OFFICE`: <br/> - `POSTAL_CODE`: <br/> - `PRISON`: <br/> - `RAILWAY_STATION`: <br/> - `RECREATION_FACILITY`: <br/> - `RENT_A_CAR`: <br/> - `RENT_A_CAR_PARKING`: <br/> - `REST_AREA`: <br/> - `RESTAURANT`: <br/> - `ROAD`: <br/> - `ROCKS`: <br/> - `ROUNDABOUT`: <br/> - `SCHOOL`: <br/> - `SECONDARY_ROAD`: <br/> - `SHOP`: <br/> - `SHOPPING_CENTRE`: <br/> - `SKI_RESORT`: <br/> - `SLIP_ROAD`: <br/> - `SPORTS_ACTIVITY`: <br/> - `SPORTS_CENTRE`: <br/> - `STADIUM`: <br/> - `STATE`: <br/> - `SWIMMING_POOL`: <br/> - `TENNIS_COURT`: <br/> - `TERTIARY_ROAD`: <br/> - `THEATRE`: <br/> - `TOURIST_ATTRACTION`: <br/> - `TOURIST_OFFICE`: <br/> - `UNIVERSITY`: <br/> - `VEHICLE_REPAIR`: <br/> - `VETERINARIAN`: <br/> - `WALKING_AREA`: <br/> - `WATER_MILL`: <br/> - `WATER_SPORT`: <br/> - `WINDMILL`: <br/> - `WINERY`: <br/> - `WORSHIP_PLACE`: <br/> - `YACHT_BASIN`: <br/> - `ZOO`: 
| __length__ |             |  Type: `Integer`. |
| __manoeuvre__ |             | <br/> Available values:<br/> - `BEAR_LEFT`: <br/> - `BEAR_RIGHT`: <br/> - `LEFT`: <br/> - `RIGHT`: <br/> - `SHARP_LEFT`: <br/> - `SHARP_RIGHT`: <br/> - `SLIGHT_LEFT`: <br/> - `SLIGHT_RIGHT`: <br/> - `STRAIGHT`: <br/> - `U_TURN`: 
| __polylineIndex__ |             |  Type: `Integer`. |
| __roundAboutExitNumber__ |             |  Type: `Integer`. |
| __text__ |             |  Type: `String`. |
| __textDist__ |             |  Type: `String`. |
| __toName__ |             |  Type: `String`. |
| __toOn__ |             |  Type: `String`. |
| __toOnPhoneme__ |             |  Type: `String`. |
| __toPhoneme__ |             |  Type: `String`. |
| __toRn__ |             |  Type: `String`. |
| __toRnPhoneme__ |             |  Type: `String`. |
| __toSi__ |             |  Type: `String`. |
| __toSiPhoneme__ |             |  Type: `String`. |
| __type__ |             | <br/> Available values:<br/> - `ENTER_MOTORWAY`: <br/> - `ENTER_ROUNDABOUT`: <br/> - `EXIT_MOTORWAY`: <br/> - `EXIT_ROUNDABOUT`: <br/> - `FOLLOW`: <br/> - `FOLLOW_SIGN`: <br/> - `LEAVE_FERRY`: <br/> - `STOP`: <br/> - `STOP_VIA`: <br/> - `TAKE_FERRY`: <br/> - `TAKE_RAMP`: 

#### __RoutingSegmentInfoEventEntry__
 Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __duration__ |             |  Type: `long`. |
| __id__ |             |  Type: `String`. |
| __length__ |             |  Type: `long`. |
| __reverseDirection__ |             |  Type: `boolean`. |

#### __RoutingStringEventEntry__
 Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __value__ |             |  Type: `String`. |

#### __RoutingTaxCostEventEntry__
 Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __taxSection__ |             |  Type: `[RoutingTaxSection]`. See details below. |

#### __RoutingTaxSection__
 Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __countryCode__ |             |  Type: `String`. |
| __firstFrmIdx__ |             |  Type: `int`. |
| __lastFrmIdx__ |             |  Type: `int`. |
| __length__ |             |  Type: `int`. |
| __meanOfPayments__ |             | <br/> Available values:<br/> - `PAYMENT_BANK_CARD`: <br/> - `PAYMENT_CASH`: <br/> - `PAYMENT_CREDIT_CARD`: <br/> - `PAYMENT_EXACT_CASH`: <br/> - `PAYMENT_PASS_SUBSCRIPTION`: <br/> - `PAYMENT_TRANSPONDER`: <br/> - `PAYMENT_TRAVEL_CARD`: <br/> - `PAYMENT_VIDEO_TOLL_CHARGE`: 
| __taxCategory__ |             | <br/> Available values:<br/> - `TAX_CATEGORY_1`: <br/> - `TAX_CATEGORY_2`: <br/> - `TAX_CATEGORY_3`: <br/> - `TAX_CATEGORY_NONE`: 
| __taxCharges__ |             |  Type: `list or array of [TaxCharge]`. See details below. |

#### __TaxCharge__
 Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __category__ |             |  Type: `String`. |
| __currency__ |             |  Type: `String`. |
| __price__ |             |  Type: `double`. |

#### __RoutingTollCostEventEntry__
 Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __toll__ |             |  Type: `[Toll]`. See details below. |

#### __Toll__
 Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __coordinateWgs84__ |             |  Type: `[CoordinateWgs84]`. See details below. |
| __meanOfPayments__ |             | <br/> Available values:<br/> - `PAYMENT_BANK_CARD`: <br/> - `PAYMENT_CASH`: <br/> - `PAYMENT_CREDIT_CARD`: <br/> - `PAYMENT_EXACT_CASH`: <br/> - `PAYMENT_PASS_SUBSCRIPTION`: <br/> - `PAYMENT_TRANSPONDER`: <br/> - `PAYMENT_TRAVEL_CARD`: <br/> - `PAYMENT_VIDEO_TOLL_CHARGE`: 
| __polylineIndex__ |             |  Type: `long`. |
| __tollCharges__ |             |  Type: `list or array of [TollCharge]`. See details below. |
| __tollType__ |             | <br/> Available values:<br/> - `TOLL_ELECTRONIC`: <br/> - `TOLL_FIXED_FEE`: <br/> - `TOLL_OBTAIN_TICKET`: <br/> - `TOLL_PAY_PER_TICKET`: 

#### __TollCharge__
 Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __category__ |             |  Type: `String`. |
| __currency__ |             |  Type: `String`. |
| __price__ |             |  Type: `double`. |

#### __RoutingTrafficElementEventEntry__
 Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __currentJamFactor__ |             |  Type: `Float`. |
| __statisticJamFactor__ |             |  Type: `Float`. |
| __trafficElement__ |             |  Type: `[TrafficElement]`. See details below. |

#### __TrafficElement__
 Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __boundingBoxWgs84__ |             |  Type: `[BoundingBoxWgs84]`. See details below. |
| __elementId__ |             |  Type: `String`. |
| __id__ |             |  Type: `String`. |
| __info__ |             |  Type: `[TrafficElementInfo]`. See details below. |
| __jamFactor__ |             |  Type: `float`. |
| __maxClassId__ |             |  Type: `long`. |
| __multiPolyline__ |             |  Type: `[MultiPolyline]`. See details below. |
| __polyline__ |             |  Type: `list or array of [CoordinateWgs84]`. See details below. |
| __reason__ |             | <br/> Available values:<br/> - `ACCIDENT`: <br/> - `BLOCKED_ROAD`: <br/> - `CARRIAGEWAY_REDUCED`: <br/> - `CONGESTION`: <br/> - `INCIDENT`: <br/> - `INFORMATION`: <br/> - `NA`: <br/> - `NON_RECOMMANDED_ROAD`: <br/> - `ROAD_CONDITION_DETERIORATED`: <br/> - `ROAD_UNDER_CONTRUCTION`: 
| __reasonComments__ |             |  Type: `list or array of [TrafficReasonComment]`. See details below. |
| __reasonCoordinate__ |             |  Type: `[CoordinateWgs84]`. See details below. |
| __reverseDirection__ |             |  Type: `boolean`. |
| __segmentInfos__ |             |  Type: `list or array of [TrafficSegmentInfo]`. See details below. |
| __timestamp__ |             |  Type: `long`. |

#### __BoundingBoxWgs84__
 Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __maxXLongitude__ |             |  Type: `double`. |
| __maxYLatitude__ |             |  Type: `double`. |
| __minXLongitude__ |             |  Type: `double`. |
| __minYLatitude__ |             |  Type: `double`. |

#### __TrafficReasonComment__
 Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __comment__ |             |  Type: `String`. |
| __language__ |             |  Type: `String`. |

#### __MultiPolyline__
 Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __elementData__ |             |  Type: `list or array of [Object]`. See details below. |
| __modCount__ |             |  Type: `int`. |
| __size__ |             |  Type: `int`. |

#### __TrafficSegmentInfo__
 Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __id__ |             |  Type: `String`. |
| __reverseDirection__ |             |  Type: `boolean`. |

#### __RoutingTrafficSignEventEntry__
 Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __category__ |             | <br/> Available values:<br/> - `ACCIDENT_HAZARD`: <br/> - `ANIMAL_CROSSING`: <br/> - `BICYCLE_CROSSING`: <br/> - `CONGESTION_HAZARD`: <br/> - `DOUBLE_HAIRPIN`: <br/> - `EMBANKMENT`: <br/> - `END_NO_OVERTAKING`: <br/> - `END_NO_OVERTAKING_TRUCKS`: <br/> - `END_OF_ALL_RESTRICTIONS`: <br/> - `ENDOF_LOW_GEAR`: <br/> - `ENDOF_NO_ENGINE_BRAKE`: <br/> - `FALLING_ROCKS`: <br/> - `FLOOD_AREA`: <br/> - `GENERAL_CURVE`: <br/> - `GENERAL_HILL`: <br/> - `GENERAL_WARNING`: <br/> - `HUMP_BRIDGE`: <br/> - `ICY_CONDITIONS`: <br/> - `LANE_MERGE_CENTER`: <br/> - `LANE_MERGE_LEFT`: <br/> - `LANE_MERGE_RIGHT`: <br/> - `LATERAL_WIND`: <br/> - `LIGHT`: <br/> - `LOW_GEAR`: <br/> - `NO_CAMPER`: <br/> - `NO_ENGINE_BRAKE`: <br/> - `NO_IDLING`: <br/> - `NO_TOWED_CARAVAN`: <br/> - `NO_TOWED_TRAILER`: <br/> - `NO_TURN_ON_RED`: <br/> - `NOT_SUPPORTED`: <br/> - `OBJECT_OVERHANG`: <br/> - `OBSTACLE`: <br/> - `PEDESTRIAN_CROSSING`: <br/> - `PR_OVERTAKING_EL`: <br/> - `PR_OVERTAKING_ELL`: <br/> - `PR_OVERTAKING_ELR`: <br/> - `PRIORITY_ONCOMING`: <br/> - `RAILWAY_CROSS_PR`: <br/> - `RAILWAY_CROSS_UNPR`: <br/> - `RIGHT_PRIORITY`: <br/> - `RISK_OF_GROUNDING`: <br/> - `ROAD_NARROWS`: <br/> - `ROAD_SPLIT`: <br/> - `SCHOOL_ZONE`: <br/> - `SHARP_CURVE_LEFT`: <br/> - `SHARP_CURVE_RIGHT`: <br/> - `SLIPPERY_ROAD`: <br/> - `ST_NO_OVERTAKING`: <br/> - `ST_NO_OVERTAKING_TRUCKS`: <br/> - `STEEP_HILL_DOWN`: <br/> - `STEEP_HILL_UP`: <br/> - `STOP`: <br/> - `TRAMWAY_CROSSING`: <br/> - `TRIPLE_HAIRPIN`: <br/> - `TRUCK_ROLLOVER`: <br/> - `TURN_ON_RED`: <br/> - `TWO_WAY_TRAFFIC`: <br/> - `UNEVEN_ROAD`: <br/> - `URBAN_AREA`: <br/> - `WINDING_RD_LEFT`: <br/> - `WINDING_RD_RIGHT`: <br/> - `YIELD`: <br/> - `YIELD_ONCOMING`: <br/> - `YIELD_TO_BICYCLES`: 
| __matchedCoordinate__ |             |  Type: `[CoordinateWgs84]`. See details below. |
| __text__ |             |  Type: `String`. |

#### __RoutingWaypointEventEntry__
 Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __routingWaypoint__ |             |  Type: `[RoutingWaypoint]`. See details below. |

#### __RoutingWaypoint__
 Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __angle__ |             |  Type: `double`. |
| __avoidUTurn__ |             | <br/> Available values:<br/> - `NO`: <br/> - `UNDEF`: <br/> - `YES`: 
| __coordinateWgs84__ |             |  Type: `[CoordinateWgs84]`. See details below. |
| __ignorePoint__ |             |  Type: `boolean`. |
| __ignoreRestrictions__ |             |  Type: `boolean`. |
| __ignoreRoadBlocks__ |             |  Type: `boolean`. |
| __ignoreTrafficDirections__ |             |  Type: `boolean`. |
| __offRoad__ |             |  Type: `[RoutingOffRoad]`. See details below. |
| __radius__ |             |  Type: `long`. |
| __usedDestinationIndex__ |             |  Type: `int`. |
| __useStartAngle__ |             | <br/> Available values:<br/> - `NO`: <br/> - `UNDEF`: <br/> - `YES`: 
| __useStopRoadSide__ |             | <br/> Available values:<br/> - `NO`: <br/> - `UNDEF`: <br/> - `YES`: 
| __uturn__ |             |  Type: `boolean`. |
| __waypointPolylineIndex__ |             |  Type: `Integer`. |

#### __RoutingOffRoad__
 Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __attributes__ |             |  Type: `list or array of [AttributeElement]`. See details below. |
| __geometry__ |             |  Type: `list or array of [CoordinateWgs84]`. See details below. |

#### __AttributeElement__
 Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __attributeCode__ |             | <br/> Available values:<br/> - `__NOT_MAPPED`: <br/> - `ADMINISTRATIVE_CLASS`: <br/> - `ALBANIAN_NAME`: <br/> - `ALPHA_HOUSE_NUMBER`: <br/> - `ANY_LANG`: <br/> - `ARABIC_ENGLISH_NAME`: <br/> - `ARABIC_NAME`: <br/> - `ASSAMESE_LATIN_NAME`: <br/> - `ASSAMESE_NAME`: <br/> - `AZERBAIJANI_NAME`: <br/> - `BASQUE_NAME`: <br/> - `BELARUSIAN_LATIN_NAME`: <br/> - `BELARUSIAN_NAME`: <br/> - `BENGALI_LATIN_NAME`: <br/> - `BENGALI_NAME`: <br/> - `BOSNIAN_NAME`: <br/> - `BRAND_NAME`: <br/> - `BULGARIAN_LATIN_NAME`: <br/> - `BULGARIAN_NAME`: <br/> - `CATALAN_NAME`: <br/> - `CHINESE_LATIN_NAME`: <br/> - `CHINESE_NAME`: <br/> - `COORDINATE_TYPE`: <br/> - `COUNTRY_CODE`: <br/> - `CZECH_NAME`: <br/> - `DANISH_NAME`: <br/> - `DATA_PROVIDER`: <br/> - `DUTCH_NAME`: <br/> - `ENCODING`: <br/> - `ENGLISH_NAME`: <br/> - `ESTONIAN_NAME`: <br/> - `EXTRA_ATTRIBUTE`: <br/> - `FEATURE_CLASS_CODE`: <br/> - `FINNISH_NAME`: <br/> - `FRENCH_NAME`: <br/> - `FRISIAN_NAME`: <br/> - `GAELIC_NAME`: <br/> - `GALICIAN_NAME`: <br/> - `GEORGIAN_LATIN_NAME`: <br/> - `GERMAN_NAME`: <br/> - `GREEK_GREEK_NAME`: <br/> - `GREEK_NAME`: <br/> - `GUARANI_NAME`: <br/> - `GUJARATI_LATIN_NAME`: <br/> - `GUJARATI_NAME`: <br/> - `HEADER`: <br/> - `HEBREW_LATIN_NAME`: <br/> - `HEBREW_NAME`: <br/> - `HINDI_LATIN_NAME`: <br/> - `HINDI_NAME`: <br/> - `HOUSE_NUMBER_LEFT`: <br/> - `HOUSE_NUMBER_RIGHT`: <br/> - `HUNGARIAN_NAME`: <br/> - `ICELANDIC_NAME`: <br/> - `INCLUSION_RELATION`: <br/> - `INDONESIAN_NAME`: <br/> - `INTERNATIONAL_CODE`: <br/> - `IRISH_NAME`: <br/> - `ITALIAN_NAME`: <br/> - `JAPAN_LATIN_NAME`: <br/> - `JAPAN_NAME`: <br/> - `KANNADA_LATIN_NAME`: <br/> - `KANNADA_NAME`: <br/> - `KAZAKH_LATIN_NAME`: <br/> - `KAZAKH_NAME`: <br/> - `KEY`: <br/> - `KOREAN_LATIN_NAME`: <br/> - `KOREAN_NAME`: <br/> - `LANDMARK`: <br/> - `LANDMARK_3D`: <br/> - `LANE_NUMBER`: <br/> - `LANGUAGE`: <br/> - `LATVIAN_NAME`: <br/> - `LEGAL_SPEED`: <br/> - `LENGTH`: <br/> - `LETZEBURGESCH_NAME`: <br/> - `LITHUANIAN_NAME`: <br/> - `MACEDONIAN_LATIN_NAME`: <br/> - `MACEDONIAN_NAME`: <br/> - `MALAY_NAME`: <br/> - `MALAYALAM_NAME`: <br/> - `MALTESE_NAME`: <br/> - `METRO`: <br/> - `MOLDAVIAN_NAME`: <br/> - `NAME`: <br/> - `NB_BORDER_JUNCTIONS`: <br/> - `NB_JUNCTIONS`: <br/> - `NORWEGIAN_NAME`: <br/> - `OFFICIAL_CODE`: <br/> - `POLISH_NAME`: <br/> - `POPULATION`: <br/> - `POPULATION_CATEGORY`: <br/> - `PORTUGUESE_NAME`: <br/> - `POSTAL_CODE`: <br/> - `RHAETO_ROMANCE_NAME`: <br/> - `ROMANIAN_NAME`: <br/> - `ROUTE_NUMBER`: <br/> - `RUSSIAN_LATIN_NAME`: <br/> - `RUSSIAN_NAME`: <br/> - `SCALE`: <br/> - `SELF_REF`: <br/> - `SERBO_CROATIAN_LATIN_NAME`: <br/> - `SERBO_CROATIAN_NAME`: <br/> - `SIGN_INFORMATION`: <br/> - `SLOVAK_NAME`: <br/> - `SLOVENIAN_NAME`: <br/> - `SOURCE_FORMAT`: <br/> - `SPANISH_NAME`: <br/> - `SPEED_CATEGORY`: <br/> - `STREET_NAME_AND_HOUSE_NUMBER`: <br/> - `SVS_TYPE`: <br/> - `SWEDISH_NAME`: <br/> - `TELEPHONE`: <br/> - `TEXTURE_COORD`: <br/> - `THAI_LATIN_NAME`: <br/> - `THAI_NAME`: <br/> - `TIME_DOMAIN_ATTRIBUTE`: <br/> - `TMC_LOCATION`: <br/> - `TOLL_ROAD`: <br/> - `TRAFFIC_DIRECTION`: <br/> - `TRAFIC_INFO`: <br/> - `TRUCK_ATT_TIME_DOMAIN_ATTRIBUTE`: <br/> - `TRUCK_ATTRIBUTE`: <br/> - `TURKISH_NAME`: <br/> - `UKRAINIAN_LATIN_NAME`: <br/> - `UKRAINIAN_NAME`: <br/> - `UTM_ZONE`: <br/> - `VALENCIAN_NAME`: <br/> - `VIETNAMESE_LATIN_NAME`: <br/> - `VIETNAMESE_NAME`: <br/> - `VT_MASK`: <br/> - `WELSH_NAME`: 
| __key__ |             |  Type: `String`. |
| __numericKey__ |             |  Type: `int`. |
| __rawData__ |             |  Type: `boolean`. |
