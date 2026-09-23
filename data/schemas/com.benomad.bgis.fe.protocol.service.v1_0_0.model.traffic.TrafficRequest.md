| Field  | Optional | Description |
|--------|----------|-------------|
| __countryCode__ |             | Country ISO Code. Performs a data extract operation inside the specified Iso code filter. Type: `String`. |
| <s>__previousUpdateTimestamp__</s> |             | The previous time stamp of update, can be used for synchronization mode. Type: `long`. |
| __boundingBox__ |    optional | The bounding box make a filter on an specific area. Type: `[BoundingBox]`. See details below. |
| __elementId__ |    optional | Traffic element ID. Type: `String`. |
| __geoserver__ |    optional | Geoserver name. Type: `String`. |
| __options__ |    optional | Options of traffic info service.<br/> Available values:<br/> - `ALERTC`: Enable the Alert-C outputs.<br/> - `EXCLUDE_BLOCKED_ROAD`: To exclude all blocked roads (closed).<br/> - `ONLY_BLOCKED_ROAD`: To get only the blocked roads (closed).<br/> - `OPENLR`: Enable the OpenLR outputs.<br/> - `POLYLINE`: Enable the polyline geometry output.<br/> - `STATS`: Enable the data outputs like jam factor, speed and other information.<br/> - <s>`SYNC`</s>: <br/> - `TRAFFIC_HISTORICAL`: (Beta) Enable the historical traffic information.<br/> - `TRAFFIC_PREDICTIVE`: Enable the predictive traffic information.
| __outputLanguage__ |    optional | Output language. Type: `String`. |
| __reverseDirection__ |    optional | Define the side of road will be used. Type: `boolean`. |
| <s>__swidx__</s> |    optional | Switch index. Type: `int`. |
| __timestamp__ |    optional | Time stamp in milliseconds. Type: `long`. |

#### __BoundingBox__
This a model class for creating a rectangle that includes the whole trip which is defined with 4 coordinates. Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __maxLat__ |             | Maximum latitude, in degrees decimal ([WGS84](index.html#page-glossary-coordinate_system.md)). Type: `double`. |
| __maxLon__ |             | Maximum longitude, in degrees decimal ([WGS84](index.html#page-glossary-coordinate_system.md)). Type: `double`. |
| __minLat__ |             | Minimum latitude, in degrees decimal ([WGS84](index.html#page-glossary-coordinate_system.md)). Type: `double`. |
| __minLon__ |             | Minimum longitude, in degrees decimal ([WGS84](index.html#page-glossary-coordinate_system.md)). Type: `double`. |
