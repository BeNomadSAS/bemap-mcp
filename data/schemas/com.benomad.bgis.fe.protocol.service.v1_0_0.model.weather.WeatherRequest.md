| Field  | Optional | Description |
|--------|----------|-------------|
| __provider__ |             | Provider name. Type: `String`. |
| __cacheRadius__ |    optional | Radius in meters used in coordinate search (coord parameter) to limit the search area in weather cache around the coordinate. Type: `Double`. |
| __id__ |    optional | Search the weather for a city by the ID of city. To use this, the ID must be known. Also the search by city name is available. Type: `String`. |
| __city__ |    optional | Search the weather for a city by the name. Type: `String`. |
| __coord__ |    optional | Search the weather for a city by the coordinate in the city area. Type: `[Coordinate]`. See details below. |
| __current__ |    optional | To get the current weather condition. Type: `boolean`. |
| __dtFilter__ |    optional | Filter by date and time. The forecast will be filtered to return only the requested time slot. This parameter is an EPOCH time stamp in milliseconds (UTC) or can take an string with ISO local date time format like '2011-12-03T10:15:30', '2011-12-03T10:15:30+01:00' or '2011-12-03T10:15:30+01:00[Europe/Paris]'. Type: `String`. |
| __forecast__ |    optional | To get the forecast weather conditions. Type: `boolean`. |
| __geoserver__ |    optional | Geoserver name. Type: `String`. |
| __pc__ |    optional | Search the weather for a postal code. Type: `String`. |
| <s>__swidx__</s> |    optional | Switch index. Type: `int`. |

#### __Coordinate__
Describe a coordinate which consists of a latitude and longitude. Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __lat__ |             | Latitude in degrees decimal ([WGS84](index.html#page-glossary-coordinate_system.md)). Type: `double`. |
| __lon__ |             | Longitude in degrees decimal ([WGS84](index.html#page-glossary-coordinate_system.md)). Type: `double`. |
