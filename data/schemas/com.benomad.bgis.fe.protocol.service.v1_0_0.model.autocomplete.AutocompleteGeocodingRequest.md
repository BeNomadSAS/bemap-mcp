| Field  | Optional | Description |
|--------|----------|-------------|
| __coordinate__ |             | To define the center of research area. Most providers use the parameter as optional, but some others require it to work. You can try a request without it, if the server returns an error message about this required parameter, add it and retry the same request. Type: `[Coordinate]`. See details below. |
| __language__ |             | Define the language that will be used to perform the address lookup. Objects for which defined language code is not available, default language will be used. Values language Code - An US-ASCII string that defines an ISO 639-1 (2-letter) language code. The specials 'IC' (no sensitive case) language code allows you to search for a country  depending on its ISO-3166 Alpha-3 or Alpha-2 country code. Type: `String`. |
| __place__ |             | Textual postal address or POI name. Mandatory. Type: `String`. |
| __addressDetails__ |    optional | Set to true to receive the proposed postal addresses in separate fields (country, city, street, etc). false by default. Type: `boolean`. |
| __boundingbox__ |    optional | Define a bounding box to limit the auto-complete search area. Type: `[BoundingBox]`. See details below. |
| __countryCode__ |    optional | Optional filtering research on country code. Type: `String`. |
| __enCategories__ |    optional | Enable the generation list of category ids. The primary category has its flag primary set to true. Type: `boolean`. |
| __enChains__ |    optional | Enable place chains metadata to allow customers to choose a chain icon. Type: `boolean`. |
| __enEntrances__ |    optional | Enable the generation list of geo-coordinate of the access to the result (for instance the entrance). Type: `boolean`. |
| __enFoodTypes__ |    optional | Enable the generation list of food-type ids if available The primary category has its flag primary set to true. Type: `boolean`. |
| __enHighlights__ |    optional | Enable the generation of text slices matching the query. These slices can be used to highlight the related matching fields. Type: `boolean`. |
| __enLocId__ |    optional | Used by HERE HLP geo-server; if set to true the Location ID will be returned. Type: `boolean`. |
| __enReferences__ |    optional | Enable the data source ids, when the place result has a contribution from specific suppliers. Type: `boolean`. |
| __geoserver__ |    optional | Geoserver name. Type: `String`. |
| __radius__ |    optional | Define the radius of research in meters. Type: `Long`. |
| <s>__swidx__</s> |    optional | Switch index. Type: `int`. |

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
