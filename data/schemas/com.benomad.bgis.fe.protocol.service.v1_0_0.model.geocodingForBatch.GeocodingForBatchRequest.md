| Field  | Optional | Description |
|--------|----------|-------------|
| __queries__ |             | Postal address splitted by comma. Type: `list or array of [GeocodingAreaQry]`. See details below. |
| __assetSearchType__ |    optional | Asset search type.<br/> Available values:<br/> - `CITY_CENTER`: CITY_CENTER.<br/> - `OBJECT`: OBJECT.<br/> - `POI`: POI.<br/> - `ROAD`: ROAD.
| __geoserver__ |    optional | Geoserver name. Type: `String`. |
| __language__ |    optional | Define the language that will be used to perform the address lookup. Type: `String`. |
| __maximumResults__ |    optional | The maximum number of items used to perform the research and returned items by the server. Type: `int`. |
| __searchType__ |    optional | Defines all the possible types of research that can be applied to a textual pattern.<br/> Available values:<br/> - `CONTAINS`: Means that the pattern must be contained in the required strings.<br/> - `FUZZY`: Means that the pattern will be used to perform a fuzzy search based on. the pattern. (Fuzzy searching can be useful when you are searching text that may contain misspelled words).<br/> - `KEY_SEARCH`: Specifies a search on key ids. This criteria can be used for retrieving an item by its numerical key.<br/> - `STRICT`: Means that the required string must be strictly equal to the pattern.<br/> - `STRICT_BEGINNING`: Means that the required strings must begin with the pattern.<br/> - `WORD_BEGINNING`: Means that one word of required strings must begin with the pattern (characters ' ', '-' and '/' are considered as word separators).
| <s>__swidx__</s> |    optional | Switch index. Type: `int`. |

#### __GeocodingAreaQry__
Class representing reverser geocoding for batch area query Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __boundingBox__ |             | Define a bounding box (in WGS84 format) to restrict the geocoding research. Type: `[BoundingBox]`. See details below. |
| __postalAddress__ |             | Define a postal address according to the geocoding research. Type: `[Address]`. See details below. |

#### __BoundingBox__
This a model class for creating a rectangle that includes the whole trip which is defined with 4 coordinates. Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __maxLat__ |             | Maximum latitude, in degrees decimal ([WGS84](index.html#page-glossary-coordinate_system.md)). Type: `double`. |
| __maxLon__ |             | Maximum longitude, in degrees decimal ([WGS84](index.html#page-glossary-coordinate_system.md)). Type: `double`. |
| __minLat__ |             | Minimum latitude, in degrees decimal ([WGS84](index.html#page-glossary-coordinate_system.md)). Type: `double`. |
| __minLon__ |             | Minimum longitude, in degrees decimal ([WGS84](index.html#page-glossary-coordinate_system.md)). Type: `double`. |

#### __Address__
Defines a postal address, [Wikipedia link](http://en.wikipedia.org/wiki/Postal_address). Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __city__ |    optional | City name. Type: `String`. |
| __country__ |    optional | Country name. Type: `String`. |
| __countryCode__ |    optional | ISO code of country. Type: `String`. |
| __county__ |    optional | County name. Type: `String`. |
| __district__ |    optional | District name of city. Type: `String`. |
| <s>__oppositeStreetNumber__</s> |    optional | Opposite street number. Type: `String`. |
| __postalCode__ |    optional | Postal code. Type: `String`. |
| __roadNumber__ |    optional | Road number. Type: `String`. |
| __state__ |    optional | State name. Type: `String`. |
| __street__ |    optional | Street name. Type: `String`. |
| __streetNumber__ |    optional | House number. Type: `String`. |
