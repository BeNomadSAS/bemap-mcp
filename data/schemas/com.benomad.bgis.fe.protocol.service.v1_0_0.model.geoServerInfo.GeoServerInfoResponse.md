| Field  | Optional | Description |
|--------|----------|-------------|
| __availableGeoServerNames__ |             | Available GeoServer names on this server. Type: `list or array of String`. |
| __globalCopyright__ |             | Copyright of map data. Type: `String`. |
| __globalCopyrightUrl__ |             | URL of map data copyright. Type: `String`. |
| __globalSupplierTerms__ |             | Legal terms of supplier. Type: `String`. |
| __globalSupplierTermsUrl__ |             | URL of legal terms (supplier). Type: `String`. |
| __serviceLimits__ |             | Resources limitation on geo-server and per service. Type: `list or array of [ServiceLmt]`. See details below. |
| __servicesInfo__ |             | The list of service information. Type: `list or array of [ServiceInfoFront]`. See details below. |
| __transportTypes__ |             | Available transportation mode, Car, pedestrian, truck, etc.<br/> Available values:<br/> - `BICYCLE`: Bicycle.<br/> - `CAR`: Passenger car.<br/> - <s>`DELIVERY_TRUCK`</s>: Delivery truck. Deprecated, use `TRUCK` instead.<br/> - `EMERGENCY`: Emergency vehicle.<br/> - `MOTORCYCLE`: Motorcycle.<br/> - `PEDESTRIAN`: Pedestrian.<br/> - `PUBLIC_BUS`: Public bus.<br/> - `TAXI`: Taxi.<br/> - `TRUCK`: Truck.
| __truckAttributes__ |             | If the truck attributes are available this flag is set to true, otherwise false. Type: `boolean`. |

#### __ServiceInfoFront__
Class representing charging price. Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __description__ |             | Description of service. Type: `String`. |
| __fieldName__ |             | Name of field used in GeoServer. Type: `String`. |
| __serviceName__ |             | Name of service. Type: `String`. |
| __title__ |             | Title of service. Type: `String`. |

#### __ServiceLmt__
Class representing a land feature request. Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __argument__ |             | Indicate the interpretation of value, e.i. the value is maximal or minimal.<br/> Available values:<br/> - `MAX`: Name of BeMap service (like mapping, geocoding, routing, etc.).<br/> - `MIN`: Name of BeMap service (like mapping, geocoding, routing, etc.).<br/> - `NA`: Name of BeMap service (like mapping, geocoding, routing, etc.).
| __key__ |             | The key field is like a name of limit. Type: `String`. |
| __serviceName__ |             | Name of BeMap service (like mapping, geocoding, routing, etc.). Type: `String`. |
| __type__ |             | Define the type of value.<br/> Available values:<br/> - `DOUBLE`: Double.<br/> - `FLOAT`: Float.<br/> - `INT`: Integer.<br/> - `LONG`: Long.<br/> - `NA`: Not available.<br/> - `STRING`: String.
| __unit__ |             | Used measure unit. By default is METER.<br/> Available values:<br/> - `KM`: <br/> - `METER`: <br/> - `MINUTE`: <br/> - `NA`: <br/> - `SECOND`: <br/> - `SQUARE_METER`: 
| __value__ |             | The value of limitation. Type: `String`. |
