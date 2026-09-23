| Field  | Optional | Description |
|--------|----------|-------------|
| __coordinatesSat__ |             | GPS coordinates. Type: `list or array of [CoordinateSat]`. See details below. |
| __radius__ |             | Maximum search radius around GPS point. The value is in meter.. Type: `long`. |
| __geoserver__ |    optional | Geoserver name. Type: `String`. |
| __language__ |    optional | Define the language that will be used to perform the address lookup. Objects for which defined language code is not available, default language will be used. Values language Code - An US-ASCII string that defines an ISO 639-1 (2-letter) language code. The specials "IC" (no sensitive case) language code allows you to search for a country depending on its ISO-3166 Alpha-3 or Alpha-2 country code. Type: `String`. |
| __maximumResults__ |    optional | The maximum number of items used to perform the research and returned items by the server.. Type: `int`. |
| __options__ |    optional | Comma-separated list of one or more reverse-geocoding options.<br/> Available values:<br/> - `OPPOSITE_POSTAL_ADDRESS`: Return the opposite postal address only if different from the postal address field.<br/> - `OPPOSITE_POSTAL_ADDRESS_ALWAYS`: Return the opposite postal address, always even if the values are the same as the postal address field.<br/> - `POLYLINE`: Return the list of coordinates of a road segment.<br/> - `ROAD_FEATURE`: Return the network information of a road segment.<br/> - `SEGMENTID`: Return the segment ID (like link ID).<br/> - `SKIP_EMPTY_STREETNAME`: Skip elements without a street name if other element(s) have a street name.<br/> - `START_AT_RADIUS`: Force to start research directly at radius passed in parameter.<br/> - `THROUGH_POINT_ADDRESS`: This option will first attempt to locate a point address within the given radius around the given location. In case a point address is found, the service will return a unique result corresponding to the road-matched location of the point address. Otherwise, the search process behaves as if this option was not enabled.<br/> - `TRAFFIC`: Return the traffic information.<br/> - `TRAFFIC_HISTORICAL`: (Beta) Return the historical traffic information. The timestamp defined in each coordinate is used.<br/> - `TRAFFIC_PREDICTIVE`: Return the predictive traffic information. The timestamp defined in each coordinate is used.<br/> - `URBAN_AREA`: Set this flag to true if you need to know if the resulting matched point is in an urban area.
| <s>__swidx__</s> |    optional | Switch index. Type: `int`. |
| __transportMode__ |    optional | Transportation mode: Car, pedestrian, truck, etc...<br/> Available values:<br/> - `BICYCLE`: Bicycle.<br/> - `CAR`: Passenger car.<br/> - <s>`DELIVERY_TRUCK`</s>: Delivery truck. Deprecated, use `TRUCK` instead.<br/> - `EMERGENCY`: Emergency vehicle.<br/> - `MOTORCYCLE`: Motorcycle.<br/> - `PEDESTRIAN`: Pedestrian.<br/> - `PUBLIC_BUS`: Public bus.<br/> - `TAXI`: Taxi.<br/> - `TRUCK`: Truck.

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
