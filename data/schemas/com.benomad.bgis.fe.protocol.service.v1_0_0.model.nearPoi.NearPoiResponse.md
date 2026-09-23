| Field  | Optional | Description |
|--------|----------|-------------|
| __pois__ |             | Points of interests. Type: `list or array of [NearPoint]`. See details below. |

#### __NearPoint__
Class representing a near point of interest. Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __comment__ |             | Comment. Type: `String`. |
| __coordinate__ |             | Geographical coordinate of POI. Type: `[Coordinate]`. See details below. |
| __distance__ |             | Distance of travel in meters between the input coordinate and POI. Type: `Long`. |
| __duration__ |             | Duration of travel in seconds between the input coordinate and POI. Type: `Long`. |
| __encodedPolyline__ |             | Polyline geometry of route between start coordinate and the POI. It is a composed of coordinates list and encoded with Google Algorithm. Type: `String`. |
| __name__ |             | Name of POI. Type: `String`. |
| __polyline__ |             | Polyline geometry of route between start coordinate and the POI. Type: `list or array of [CoordinateFullName]`. See details below. |
| __telephone__ |             | Phone number of POI. Type: `String`. |
| __type__ |             | Type of POI. Type: `String`. |

#### __Coordinate__
Describe a coordinate which consists of a latitude and longitude. Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __lat__ |             | Latitude in degrees decimal ([WGS84](index.html#page-glossary-coordinate_system.md)). Type: `double`. |
| __lon__ |             | Longitude in degrees decimal ([WGS84](index.html#page-glossary-coordinate_system.md)). Type: `double`. |

#### __CoordinateFullName__
Describe the coordinate composed by latitude and longitude. Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __altitude__ |             | Altitude in meters. Type: `Double`. |
| __latitude__ |             | Latitude in degrees decimal (WGS84) (double). Type: `double`. |
| __longitude__ |             | Longitude in degrees decimal (WGS84) (double). Type: `double`. |
