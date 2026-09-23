| Field  | Optional | Description |
|--------|----------|-------------|
| __coordinate__ |             | Coordinate of center of research, will be used with `distance` parameter. Type: `[CoordinateSat]`. See details below. |
| __distance__ |             | Limit of research in meters. Type: `long`. |
| __epl__ |    optional | Enable the output encoded polyline geometry of route with Google Algorithm. Set to true to enable otherwise false. Disable by default. Type: `boolean`. |
| __pl__ |    optional | Enable the output polyline geometry of route. Set to true to enable otherwise false. Disable by default. Type: `boolean`. |
| __geoserver__ |    optional | Geoserver name. Type: `String`. |
| __orderBy__ |    optional | Sort the result by distance or duration in either ascending or descending. Disable by default.<br/> Available values:<br/> - `DISTANCE_ASC`: Sort by distance in either ascending.<br/> - `DISTANCE_DESC`: Sort by distance in either descending.<br/> - `DURATION_ASC`: Sort by duration in either ascending.<br/> - `DURATION_DESC`: Sort by duration in either descending.
| __serviceCategories__ |    optional | Service categories. POI Class ID (numeric value defining the type of service, see the `Class ID list` in Glossary menu). Type: `list or array of String`. |
| <s>__swidx__</s> |    optional | Switch index. Type: `int`. |
| __transportType__ |    optional | Define the transportation mode: Car, pedestrian, truck, etc. By default PEDESTRIAN. Default value: 'PEDESTRIAN'.<br/> Available values:<br/> - `BICYCLE`: Bicycle.<br/> - `CAR`: Passenger car.<br/> - <s>`DELIVERY_TRUCK`</s>: Delivery truck. Deprecated, use `TRUCK` instead.<br/> - `EMERGENCY`: Emergency vehicle.<br/> - `MOTORCYCLE`: Motorcycle.<br/> - `PEDESTRIAN`: Pedestrian.<br/> - `PUBLIC_BUS`: Public bus.<br/> - `TAXI`: Taxi.<br/> - `TRUCK`: Truck.

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
