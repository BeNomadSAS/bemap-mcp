| Field  | Optional | Description |
|--------|----------|-------------|
| __countryInitialized__ |             | Country initialized. Type: `Boolean`. |
| __trafficResponseElements__ |             | Traffic response elements. Type: `list or array of [TrafficRespElement]`. See details below. |

#### __TrafficRespElement__
Class representing a traffic response element. Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __trafficItem__ |             | Traffic Item. Type: `[TrafficItem]`. See details below. |

#### __TrafficItem__
Traffic item. Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __alertcCode__ |             | AlertcTrafficElement. Type: `int`. |
| __alertcEbuCountryCode__ |             | AlertcTrafficElement. Type: `char`. |
| __alertcExtend__ |             | AlertcTrafficElement. Type: `int`. |
| __alertcLocationId__ |             | AlertcTrafficElement. Type: `long`. |
| __alertcTableId__ |             | AlertcTrafficElement. Type: `long`. |
| __boundingBox__ |             | Bounding box of geometry in WGS84. Type: `[BoundingBox]`. See details below. |
| __elementId__ |             | Element ID. Type: `String`. |
| __info__ |             | Traffic information of element. Type: `[TrafficElementInfo]`. See details below. |
| __jamFactor__ |             | Percent (%) of traffic jam. Between 0.00 (free way) to 100.00 (full jam). Type: `float`. |
| __openLrBase64__ |             | OpenLrTrafficElement. Type: `String`. |
| __polyline__ |             | Polyline. Type: `list or array of [Coordinate]`. See details below. |
| __reason__ |             | TrafficReason.<br/> Available values:<br/> - `ACCIDENT`: Accident.<br/> - `BLOCKED_ROAD`: Blocked road.<br/> - `CARRIAGEWAY_REDUCED`: Carriage-way reduced.<br/> - `CONGESTION`: traffic congestion (jam).<br/> - `INCIDENT`: Incident.<br/> - `INFORMATION`: Information.<br/> - `NA`: Not available.<br/> - `NON_RECOMMANDED_ROAD`: Non re-commanded road.<br/> - `ROAD_CONDITION_DETERIORATED`: Road condition deteriorated.<br/> - `ROAD_UNDER_CONTRUCTION`: Road under construction.
| __reasonComments__ |             | List of reason comments. Type: `list or array of [TrafficResComment]`. See details below. |
| __reasonCoordinate__ |             | Coordinate of the reason event. Type: `[Coordinate]`. See details below. |
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

#### __BoundingBox__
This a model class for creating a rectangle that includes the whole trip which is defined with 4 coordinates. Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __maxLat__ |             | Maximum latitude, in degrees decimal ([WGS84](index.html#page-glossary-coordinate_system.md)). Type: `double`. |
| __maxLon__ |             | Maximum longitude, in degrees decimal ([WGS84](index.html#page-glossary-coordinate_system.md)). Type: `double`. |
| __minLat__ |             | Minimum latitude, in degrees decimal ([WGS84](index.html#page-glossary-coordinate_system.md)). Type: `double`. |
| __minLon__ |             | Minimum longitude, in degrees decimal ([WGS84](index.html#page-glossary-coordinate_system.md)). Type: `double`. |

#### __TrafficResComment__
Class representing a traffic reason comment. Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __comment__ |             |  Type: `String`. |
| __language__ |             |  Type: `String`. |

#### __Coordinate__
Describe a coordinate which consists of a latitude and longitude. Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __lat__ |             | Latitude in degrees decimal ([WGS84](index.html#page-glossary-coordinate_system.md)). Type: `double`. |
| __lon__ |             | Longitude in degrees decimal ([WGS84](index.html#page-glossary-coordinate_system.md)). Type: `double`. |

#### __TrafficSegInfo__
Class representing a traffic segment information. Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __id__ |             | Unique identifier of road segment. Type: `String`. |
| __reverseDirection__ |             | The route travel is in opposite way of geometry. Type: `boolean`. |
