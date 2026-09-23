| Field  | Optional | Description |
|--------|----------|-------------|
| __motorType__ |             | Motor type of vehicle.<br/> Available values:<br/> - `EV`: Electric Vehicle.<br/> - `HEV`: Hybrid Electric Vehicle.<br/> - `NOT_SUPPORTED_VALUE`: Not supported value for this API version.<br/> - `PHEV`: Plug-in Hybrid Electric Vehicle (with electric plug).
| __batteryName__ |    optional | The commercial name or power of vehicle battery. Type: `String`. |
| __brandId__ |    optional | Brand ID of vehicle, can be used for display. Type: `String`. |
| __brandName__ |    optional | Brand name of vehicle, can be used for display. Type: `String`. |
| __chargerPowerAcSinglePhase__ |    optional | Maximum charge power (in kW) in AC 1 phase current type. Type: `Double`. |
| __chargerPowerAcThreePhases__ |    optional | Maximum charge power (in kW) in AC 3 phases current type. Type: `Double`. |
| __chargerPowerDC__ |    optional | Maximum charge power (in kW) in DC current type. Type: `Double`. |
| __connectorTypes__ |    optional | List of default connector types defined by the server vehicle profile. Type: `list or array of Integer`. |
| __consumptionInWhPerKm__ |    optional | Vehicle consumption in Wh/km. Type: `Float`. |
| __encDatasheet__ |    optional | Base64 encoded and encrypted JSON that contains the vehicle datasheet. Type: `String`. |
| __height__ |    optional | Height in cm. Type: `Integer`. |
| __key__ |    optional | Key of vehicle, used to select the vehicle to perform the routing calculation. Type: `String`. |
| __length__ |    optional | Length in cm. Type: `Integer`. |
| __maxWeight__ |    optional | Maximum weight in tenth of ton. Type: `Integer`. |
| __maxWeightPerAxle__ |    optional | Maximum weight per axle in tenth of ton. Type: `Integer`. |
| __name__ |    optional | Name of vehicle, can be used for display. Type: `String`. |
| __plugAndAutoCharge__ |    optional | Defines if the vehicle has the AutoCharge capability. AutoCharge is an EV charging technology that enables automatic authentication and initiation of a charging session by recognising a unique identifier from the EV. AutoCharge shares similarities with Plug and Charge (PnC) technology, but there are important distinctions between the two. PnC is a more comprehensive authentication standard, established by the ISO 15118 protocol. Type: `[PlugAndAutoChargeFront]`. See details below. |
| __transportType__ |    optional | Transport type.<br/> Available values:<br/> - `BICYCLE`: Bicycle.<br/> - `CAR`: Passenger car, tourist car.<br/> - `DELIVERY_TRUCK`: Delivery truck.<br/> - `EMERGENCY`: Emergency vehicle.<br/> - `MOTORCYCLE`: Motorcycle.<br/> - `PEDESTRIAN`: Pedestrian.<br/> - `PUBLIC_BUS`: Public bus.<br/> - `TAXI`: Taxi.<br/> - `TRUCK`: Truck.
| __variant__ |    optional | Variant or sub name of vehicle. Type: `String`. |
| __width__ |    optional | Width in cm. Type: `Integer`. |
| __wltp__ |    optional | WLTP information of vehicle. Type: `[VehicleWltp]`. See details below. |
| __year__ |    optional | Year of release and end of series in format yyyy or yyyy-yyyy. Type: `String`. |

#### __PlugAndAutoChargeFront__
Class defining if the vehicle have the AutoCharge capability. AutoCharge is an EV charging technology that enables automatic authentication and initiation of a charging session by recognising a unique identifier from the EV. AutoCharge shares similarities with Plug and Charge (PnC) technology, but there are important distinctions between the two. PnC is a more comprehensive authentication standard, established by the ISO 15118 protocol. Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __available__ |             | Define if the vehicle has the capability of plug and aotomatic starting the charge. Ture if available. Type: `boolean`. |
| __iso15118__ |    optional | Plug & Charge: The ISO 15118 standard is supported. If Autocharge is OCPP version 2, the ISO 15118 and OCPP can be checked. Type: `Boolean`. |
| __ocpp__ |    optional | The OCPP standard is supported. The Autocharge use OCPP version 1. If Autocharge is OCPP version 2, the ISO 15118 and OCPP can be checked. Type: `Boolean`. |

#### __VehicleWltp__
Define the WLTP information of vehicle. Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __completeWltp__ |             | The WLTP provided by the vehicle manufacturer for a complete cycle. Containing all four phases of WLTP. Type: `Double`. |
| __urbanWltp__ |             | The WLTP provided by the vehicle manufacturer for an urban cycle. Containing only the first two phases of the complete WLTP cycle. Type: `Double`. |
