| Field  | Optional | Description |
|--------|----------|-------------|
| __coordinates__ |             | List of coordinates of the polygon. Type: `list or array of [Coordinate]`. See details below. |
| __outputLanguage__ |             | Define the language that will be used to perform the address lookup. Objects for which defined language code is not available, the default language will be used. A US-ASCII string that defines an ISO 639-1 (2-letter) language code. The special "IC" (or "ic") language code allows you to search for a country depending on its ISO-3166 Alpha-3 or Alpha-2 country code. Type: `String`. |
| __adminPath__ |    optional | Set this flag to true if you want to retrieve the complete hierarchical path of each `ExtractedRoadFront`. This option is required to get the postal addresses. Type: `boolean`. |
| __classIdFilters__ |    optional | List of road network class ID to filter by. A class ID can be a number e.g. `4000` or an enumeration string e.g. `ROAD_FOURTH`). No filtering by default. [List of available class ID](index.html#page-sdk-jsiv-classids.md). Type: `list or array of String`. |
| __filterClippedElements__ |    optional | Set this flag to true if you want to filter out elements which are not fully inside the polygon. Type: `boolean`. |
| __filterElementsHouseNumbers__ |    optional | Set to true to filter road elements with house numbers only. Type: `boolean`. |
| __geoserver__ |    optional | Geoserver name. Type: `String`. |
| <s>__swidx__</s> |    optional | Switch index. Type: `int`. |
| __transportType__ |    optional | Transportation mode.<br/> Available values:<br/> - `BICYCLE`: Bicycle.<br/> - `CAR`: Passenger car.<br/> - <s>`DELIVERY_TRUCK`</s>: Delivery truck. Deprecated, use `TRUCK` instead.<br/> - `EMERGENCY`: Emergency vehicle.<br/> - `MOTORCYCLE`: Motorcycle.<br/> - `PEDESTRIAN`: Pedestrian.<br/> - `PUBLIC_BUS`: Public bus.<br/> - `TAXI`: Taxi.<br/> - `TRUCK`: Truck.

#### __Coordinate__
Describe a coordinate which consists of a latitude and longitude. Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __lat__ |             | Latitude in degrees decimal ([WGS84](index.html#page-glossary-coordinate_system.md)). Type: `double`. |
| __lon__ |             | Longitude in degrees decimal ([WGS84](index.html#page-glossary-coordinate_system.md)). Type: `double`. |
