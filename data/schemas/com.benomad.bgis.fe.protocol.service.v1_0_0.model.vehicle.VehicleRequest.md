| Field  | Optional | Description |
|--------|----------|-------------|
| <s>__batteryCapacity__</s> |    optional | Battery capacity. Type: `String`. |
| __batteryName__ |    optional | Battery name. Type: `String`. |
| __brandId__ |    optional | EV vehicle brand ID. Type: `String`. |
| __chargerPowerAC__ |    optional | AC Power in kW of vehicle charger. Type: `Double`. |
| __chargerPowerDC__ |    optional | DC Power in kW of vehicle charger. Type: `Double`. |
| __coordinate__ |    optional | WGS84 coordinate. Used to filter vehicle data such as available connectors in this country. Type: `[Coordinate]`. See details below. |
| __countryCode__ |    optional | ISO-3 country code. Used to filter vehicle data such as available connectors in this country. Type: `String`. |
| __enableDatasheet__ |    optional | Enable the returned datasheet of vehicle. See field encDatasheet. Type: `boolean`. |
| __motorType__ |    optional | Define the type of motor (engine), is an electric or PHEV motor.<br/> Available values:<br/> - `EV`: Electric Vehicle.<br/> - `HEV`: Hybrid Electric Vehicle.<br/> - `PHEV`: Plug-in Hybrid Electric Vehicle (with electric plug).
| __name__ |    optional | Vehicle model name. Type: `String`. |
| __vehicle__ |    optional | Vehicle id (uuid key). Type: `String`. |
| __year__ |    optional | Year of release and end of series in format yyyy or yyyy-yyyy. Type: `String`. |

#### __Coordinate__
Describe a coordinate which consists of a latitude and longitude. Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __lat__ |             | Latitude in degrees decimal ([WGS84](index.html#page-glossary-coordinate_system.md)). Type: `double`. |
| __lon__ |             | Longitude in degrees decimal ([WGS84](index.html#page-glossary-coordinate_system.md)). Type: `double`. |
