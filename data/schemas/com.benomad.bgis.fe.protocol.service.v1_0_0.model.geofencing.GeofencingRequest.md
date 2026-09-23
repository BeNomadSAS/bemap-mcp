| Field  | Optional | Description |
|--------|----------|-------------|
| __fenceShapes__ |             | Define a fence shape to perform a intersection test between the route and fence. Type: `list or array of [GeoFenceShp]`. See details below. |
| __positions__ |             | The coordinates will be compared with the fences. Type: `list or array of [GeofencingPos]`. See details below. |
| __geoserver__ |    optional | Geoserver name. Type: `String`. |
| __options__ |    optional | Comma-separated list of one or more geo-fencing options.<br/> Available values:<br/> - `SEARCH`: Enable to search the fences with coordinate, in this case the parameter `positions` can be use the radius.
| __positionType__ |    optional | Define type of `positions` parameter used to perform a comparison between fence shapes and coordinates.<br/> Available values:<br/> - `CIRCLE`: Define type of xy parameter as circle to perform a comparison between fence shapes and a circle.<br/> - `POLYGON`: Define the interpretation of coordinates of xy parameter to perform a comparison between fence shapes and a polygon.<br/> - `POLYLINE`: Define the interpretation of coordinates of xy parameter to perform a comparison between fence shapes and a polyline.
| <s>__swidx__</s> |    optional | Switch index. Type: `int`. |

#### __GeoFenceShp__
Class representing a fence shape. Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __center__ |             | Center of circle fence. Type: `[Coordinate]`. See details below. |
| __id__ |             | The fence id. If value is negative the server will set it with an auto-incrementing number. Type: `long`. |
| __radius__ |             | Radius of circle fence. Type: `long`. |
| __type__ |             | Define the type of geometric shape of fence, like CIRCLE or POLYGON.<br/> Available values:<br/> - `CIRCLE`: Circle.<br/> - `POLYGON`: Polygon.
| __vertices__ |             | Vertices of polygon fence. Type: `list or array of [Coordinate]`. See details below. |

#### __Coordinate__
Describe a coordinate which consists of a latitude and longitude. Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __lat__ |             | Latitude in degrees decimal ([WGS84](index.html#page-glossary-coordinate_system.md)). Type: `double`. |
| __lon__ |             | Longitude in degrees decimal ([WGS84](index.html#page-glossary-coordinate_system.md)). Type: `double`. |

#### __GeofencingPos__
Class representing a geofencing position. Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __lat__ |             | Latitude in degrees decimal ([WGS84](index.html#page-glossary-coordinate_system.md)). Type: `double`. |
| __lon__ |             | Longitude in degrees decimal ([WGS84](index.html#page-glossary-coordinate_system.md)). Type: `double`. |
| __radius__ |    optional | Radius in meters. Type: `long`. |
