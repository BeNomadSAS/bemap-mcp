| Field  | Optional | Description |
|--------|----------|-------------|
| __fenceResults__ |             | Return a list in same order of xy parameters (list of coordinates) with state INSIDE, OUTSIDE or INTERSECT. Type: `list or array of [GeofencingRes]`. See details below. |

#### __GeofencingRes__
Class representing a geofencing result. Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __fenceShape__ |             | Shape of fence used to perform the test. Type: `[GeoFenceShp]`. See details below. |
| __id__ |             | Unique ID of fence. Type: `long`. |
| __positionStates__ |             | Defines position state of tested coordinate on the fence geometry.<br/> Available values:<br/> - `INSIDE`: Defines if the tested coordinate is in fence.<br/> - `INTERSECT`: Position is not completely inside or outside but the shapes are intersected.<br/> - `INWARD`: Defines if the tested coordinate is an inward intersection.<br/> - `OUTSIDE`: Defines if the tested coordinate is out of fence.<br/> - `OUTWARD`: Defines if the tested coordinate is an outward intersection.
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

#### __Coordinate__
Describe a coordinate which consists of a latitude and longitude. Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __lat__ |             | Latitude in degrees decimal ([WGS84](index.html#page-glossary-coordinate_system.md)). Type: `double`. |
| __lon__ |             | Longitude in degrees decimal ([WGS84](index.html#page-glossary-coordinate_system.md)). Type: `double`. |
