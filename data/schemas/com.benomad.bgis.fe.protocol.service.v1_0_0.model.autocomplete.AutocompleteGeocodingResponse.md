| Field  | Optional | Description |
|--------|----------|-------------|
| __items__ |             | List of proposal items. Type: `list or array of [AutocompleteElem]`. See details below. |

#### __AutocompleteElem__
Class representing autocomplete element. Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __coordinate__ |             | Coordinate of proposed place. Type: `[CoordinateFullName]`. See details below. |
| __elemType__ |             | Type of element result. Auto-complete is able to return items of several types: categoryQuery, chainQuery, place, locality, etc. Type: `String`. |
| __place__ |             | Proposed place. Type: `String`. |
| __address__ |    optional | Complete postal address of proposed place. Type: `[Address]`. See details below. |
| __addressLabel__ |    optional | The full address in one text string of the entity result item. Type: `String`. |
| __addressLabelHighlight__ |    optional | The text slices matching the query. These slices can be used to highlight the related matching address label field. Type: `list or array of [AutocompleteElemHighlight]`. See details below. |
| __categories__ |    optional | A list of category ids. The primary category has its flag primary set to true. Type: `list or array of [AutocompleteElemReference]`. See details below. |
| __chains__ |    optional | Place chains metadata to allow customers to choose a chain icon. Type: `list or array of [AutocompleteElemReference]`. See details below. |
| __countryCode__ |    optional | Country Code. Type: `String`. |
| __distance__ |    optional | The distance in a straight line in meters from the position specified in the query `coordinate` parameter. Type: `Integer`. |
| __entrances__ |    optional | List of coordinate of the access to the result (for instance the entrance). Type: `list or array of [Coordinate]`. See details below. |
| __foodTypes__ |    optional | A list of food-type ids if available The primary category has its flag primary set to true. Type: `list or array of [AutocompleteElemReference]`. See details below. |
| __language__ |    optional | Language. Type: `String`. |
| __locationId__ |    optional | Location Id. Type: `String`. |
| __placeHighlight__ |    optional | The text slices matching the query. These slices can be used to highlight the related matching place field. Type: `list or array of [AutocompleteElemHighlight]`. See details below. |
| __references__ |    optional | Data source ids, when the place result has a contribution from specific suppliers: Type: `list or array of [AutocompleteElemReference]`. See details below. |
| __score__ |    optional | Score. Type: `Double`. |

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

#### __CoordinateFullName__
Describe the coordinate composed by latitude and longitude. Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __altitude__ |             | Altitude in meters. Type: `Double`. |
| __latitude__ |             | Latitude in degrees decimal (WGS84) (double). Type: `double`. |
| __longitude__ |             | Longitude in degrees decimal (WGS84) (double). Type: `double`. |

#### __Coordinate__
Describe a coordinate which consists of a latitude and longitude. Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __lat__ |             | Latitude in degrees decimal ([WGS84](index.html#page-glossary-coordinate_system.md)). Type: `double`. |
| __lon__ |             | Longitude in degrees decimal ([WGS84](index.html#page-glossary-coordinate_system.md)). Type: `double`. |

#### __AutocompleteElemHighlight__
Class representing highlight section of element place or address fields. Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __end__ |             |  Type: `int`. |
| __start__ |             |  Type: `int`. |

#### __AutocompleteElemReference__
Class representing autocomplete reference of element. Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __id__ |             |  Type: `String`. |
| __name__ |             |  Type: `String`. |
| __primary__ |             |  Type: `Boolean`. |
| __supplierId__ |             |  Type: `String`. |
