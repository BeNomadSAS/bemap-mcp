| Field  | Optional | Description |
|--------|----------|-------------|
| __boundingBox__ |             | The bounding box of the returned polygon geometry. Type: `[BoundingBox]`. See details below. |
| __encodedGeometry__ |             | The reachable area's polygon geometry encoded with Google Algorithm. Type: `String`. |
| __geometry__ |             | The reachable area's polygon geometry defined as a list of WGGS84 coordinates. Type: `list or array of [Coordinate]`. See details below. |

#### __BoundingBox__
This a model class for creating a rectangle that includes the whole trip which is defined with 4 coordinates. Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __maxLat__ |             | Maximum latitude, in degrees decimal ([WGS84](index.html#page-glossary-coordinate_system.md)). Type: `double`. |
| __maxLon__ |             | Maximum longitude, in degrees decimal ([WGS84](index.html#page-glossary-coordinate_system.md)). Type: `double`. |
| __minLat__ |             | Minimum latitude, in degrees decimal ([WGS84](index.html#page-glossary-coordinate_system.md)). Type: `double`. |
| __minLon__ |             | Minimum longitude, in degrees decimal ([WGS84](index.html#page-glossary-coordinate_system.md)). Type: `double`. |

#### __Coordinate__
Describe a coordinate which consists of a latitude and longitude. Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __lat__ |             | Latitude in degrees decimal ([WGS84](index.html#page-glossary-coordinate_system.md)). Type: `double`. |
| __lon__ |             | Longitude in degrees decimal ([WGS84](index.html#page-glossary-coordinate_system.md)). Type: `double`. |
