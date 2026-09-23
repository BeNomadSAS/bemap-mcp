| Field  | Optional | Description |
|--------|----------|-------------|
| __coordinates__ |             | Coordinate of research. Type: `list or array of [CoordinateSat]`. See details below. |
| __attCompares__ |    optional | Details of parameter format:\n* Attribute code: Code of attribute.\n* Comparison Operators: equal is represented by == (e.i: 20306==TOUR EIFFEL) and not equal is represented by != (e.i: 20306!=TOUR EIFFEL).\n* Value: Filter value.\nFormat: <attribute code><comparison operators><value>. Examples: 20306==TOUR EIFFEL. Type: `list or array of String`. |
| __attributes__ |    optional | List of BeNomad's attribute number to be queried. Type: `list or array of String`. |
| __coordinateShape__ |    optional | Define the geometry interpretation of coordinates parameter. By default CIRCLE.<br/> Available values:<br/> - `CIRCLE`: Circle.<br/> - `POLYGON`: Polygon.
| __geoserver__ |    optional | Geoserver name. Type: `String`. |
| __language__ |    optional | Define the language that will be used to perform the address lookup. Objects for which defined language code is not available, default language will be used. Values language Code - An US-ASCII string that defines an ISO 639-1 (2-letter) language code. The specials "IC" (no sensitive case) language code allows you to search for a country depending on its ISO-3166 Alpha-3 or Alpha-2 country code. Type: `String`. |
| __layers__ |    optional | List of layers name (or BeNomad class id) to be queried. Type: `list or array of String`. |
| __maximumResults__ |    optional | The maximum number of items used to perform the research and returned items by the server. 0 to disable. By default 0. Type: `int`. |
| __options__ |    optional | List of feature options.<br/> Available values:<br/> - `DISTANCE_FROMCENTER`: Calculate the distance in meters between the request center and each element.<br/> - `FILTERBY_RADIUS`: Exclude all out side element of request radius.<br/> - `OTHER_SEARCH`: Enable the research on any layers type (POI, park, etc.). See the layers parameter.<br/> - `POLYGON`: Return the list of coordinate of geo-fencing.<br/> - `POLYGON_SEARCH`: Enable the research on polygon layer type.<br/> - `RAWDATA`: Returns the native value of map data base (like SVS attributes).<br/> - `REVGEOCODING_SEARCH`: Enable the road match search by reverse geocoding to return a postal address.<br/> - `SORTBY_NEARTOFAR_FROMCENTER`: Can return a sorted list by distance between the request center and element, add the distance from the request center value in response. Value is in meters.<br/> - `SVS_ALL_ATTRIBUTE`: Export all attributes for each element found (form).<br/> - `SVS_ALL_CLASS`: Export all layers (class).<br/> - `TRAFFIC`: Return the traffic information.<br/> - `TRAFFIC_HISTORICAL`: (Beta) Return the historical traffic information. the time stamp defined in each coordinates are used.<br/> - `TRAFFIC_PREDICTIVE`: Return the predictive traffic information. the time stamp defined in each coordinates are used.<br/> - `VISIBLE_FILTER`: Return only the objects visible on the map.
| __projection__ |    optional | Projection code. Type: `String`. |
| __radius__ |    optional | Maximum search radius around GPS point (coordinates parameter). The value is in meter. Type: `long`. |
| __styles__ |    optional | List of style name to be queried. Type: `list or array of String`. |
| <s>__swidx__</s> |    optional | Switch index. Type: `int`. |
| __transportType__ |    optional | Transport type.<br/> Available values:<br/> - `BICYCLE`: Bicycle.<br/> - `CAR`: Passenger car.<br/> - <s>`DELIVERY_TRUCK`</s>: Delivery truck. Deprecated, use `TRUCK` instead.<br/> - `EMERGENCY`: Emergency vehicle.<br/> - `MOTORCYCLE`: Motorcycle.<br/> - `PEDESTRIAN`: Pedestrian.<br/> - `PUBLIC_BUS`: Public bus.<br/> - `TAXI`: Taxi.<br/> - `TRUCK`: Truck.
| __viewBox__ |    optional | Define a bounding box (in WGS84 format) to restrict the research. Type: `[BoundingBox]`. See details below. |
| __viewHeight__ |    optional | The viewHeight parameters specify the size in integer pixels of the map on which the request is made. Use in addition to parameter viewBbox. Type: `int`. |
| __viewWidth__ |    optional | The viewWidth parameters specify the size in integer pixels of the map on which the request is made. Use in addition to parameter viewBbox. Type: `int`. |

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

#### __BoundingBox__
This a model class for creating a rectangle that includes the whole trip which is defined with 4 coordinates. Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __maxLat__ |             | Maximum latitude, in degrees decimal ([WGS84](index.html#page-glossary-coordinate_system.md)). Type: `double`. |
| __maxLon__ |             | Maximum longitude, in degrees decimal ([WGS84](index.html#page-glossary-coordinate_system.md)). Type: `double`. |
| __minLat__ |             | Minimum latitude, in degrees decimal ([WGS84](index.html#page-glossary-coordinate_system.md)). Type: `double`. |
| __minLon__ |             | Minimum longitude, in degrees decimal ([WGS84](index.html#page-glossary-coordinate_system.md)). Type: `double`. |
