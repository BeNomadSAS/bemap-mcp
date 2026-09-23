| Field  | Optional | Description |
|--------|----------|-------------|
| __openLrRoutes__ |    optional | List of parsed OpenLR route. Type: `list or array of [OpenLrRoute]`. See details below. |

#### __OpenLrRoute__
Class representing an open lr route. Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __boundingBox__ |    optional | Bounding box of geometry. Type: `[BoundingBoxWgs84]`. See details below. |
| __duration__ |    optional | Duration to travel the route. Type: `Long`. |
| __exceptionMessage__ |    optional | Exception message returned for this route. Type: `String`. |
| __length__ |    optional | Length of route. Type: `Long`. |
| __polyline__ |    optional | Geometry of route. Type: `list or array of [CoordinateWgs84]`. See details below. |
| __segmentIds__ |    optional | List of segment ID. Type: `list or array of String`. |

#### __BoundingBoxWgs84__
 Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __maxXLongitude__ |             |  Type: `double`. |
| __maxYLatitude__ |             |  Type: `double`. |
| __minXLongitude__ |             |  Type: `double`. |
| __minYLatitude__ |             |  Type: `double`. |

#### __CoordinateWgs84__
 Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __altitude__ |             | Altitude in meters. Type: `Double`. |
| __latitude__ |             | Latitude in degrees (WGS84). Type: `double`. |
| __longitude__ |             | Longitude in degrees (WGS84). Type: `double`. |
