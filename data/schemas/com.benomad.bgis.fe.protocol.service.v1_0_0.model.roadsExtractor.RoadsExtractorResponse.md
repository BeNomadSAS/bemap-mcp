| Field  | Optional | Description |
|--------|----------|-------------|
| __roads__ |    optional | List of extracted road information. Type: `list or array of [ExtractedRoadFront]`. See details below. |

#### __ExtractedRoadFront__
Class representing an extracted road. Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __angle__ |    optional | Angle associated with the coordinate of the extracted road. This angle defines the direction this point has to be reached should you use these points to perform a route calculation or trip optimization. Type: `int`. |
| __coordinate__ |    optional | The coordinate around the middle of the extracted road. Type: `[Coordinate]`. See details below. |
| __label__ |    optional | Label of the road. Type: `String`. |
| __postalAddress__ |    optional | Postal address of the extracted road. Type: `[Address]`. See details below. |

#### __Coordinate__
Describe a coordinate which consists of a latitude and longitude. Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __lat__ |             | Latitude in degrees decimal ([WGS84](index.html#page-glossary-coordinate_system.md)). Type: `double`. |
| __lon__ |             | Longitude in degrees decimal ([WGS84](index.html#page-glossary-coordinate_system.md)). Type: `double`. |

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
