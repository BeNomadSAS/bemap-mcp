| Field  | Optional | Description |
|--------|----------|-------------|
| __vehicles__ |    optional | A list of vehicle information. Type: `list or array of [VehicleInfo]`. See details below. |

#### __VehicleInfo__
Class defining the Vehicle information can be exposed on public and used by an external application. Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __batteryName__ |             | The commercial name or power of vehicle battery. Type: `String`. |
| __brandId__ |             | Brand ID of vehicle, can be used for display. Type: `String`. |
| __brandName__ |             | Brand name of vehicle, can be used for display. Type: `String`. |
| __connectorTypes__ |             | List of default connector types defined by the server vehicle profile. Type: `list or array of Integer`. |
| __encDatasheet__ |             | Base64 encoded and encrypted JSON that contains the vehicle datasheet. Type: `String`. |
| __key__ |             | Key of vehicle, used to select the vehicle to perform the routing calculation. Type: `String`. |
| __motorType__ |             | Motor type of vehicle.<br/> Available values:<br/> - `EV`: Electric Vehicle.<br/> - `HEV`: Hybrid Electric Vehicle.<br/> - `NOT_SUPPORTED_VALUE`: Not supported value for this API version.<br/> - `PHEV`: Plug-in Hybrid Electric Vehicle (with electric plug).
| __name__ |             | Name of vehicle, can be used for display. Type: `String`. |
| <s>__title__</s> |             | Title of vehicle, can be used for display. Type: `String`. |
| __variant__ |             | Variant or sub name of vehicle. Type: `String`. |
| __year__ |             | Year of release and end of series in format yyyy or yyyy-yyyy. Type: `String`. |
| __chargerPowerAcSinglePhase__ |    optional | Maximum charge power (in kW) in AC 1 phase current type. Type: `Double`. |
| __chargerPowerAcThreePhases__ |    optional | Maximum charge power (in kW) in AC 3 phases current type. Type: `Double`. |
| __chargerPowerDC__ |    optional | Maximum charge power (in kW) in DC current type. Type: `Double`. |
