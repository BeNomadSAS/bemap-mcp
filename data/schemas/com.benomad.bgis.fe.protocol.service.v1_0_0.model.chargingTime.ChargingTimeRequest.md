| Field  | Optional | Description |
|--------|----------|-------------|
| __chargingCurrentType__ |             | Define the current type of charging point power.<br/> Available values:<br/> - `AC`: Alternating current (AC), but the number of phases is not available.<br/> - `AC_SINGLE_PHASE`: Alternating current (AC), single phase.<br/> - `AC_THREE_PHASES`: Alternating current (AC), three phases.<br/> - `DC`: Direct current (DC).<br/> - `NA`: Not available (NA).
| __chargingPointPower__ |             | Nominal power of connector of the charging station (in kW). Type: `double`. |
| __chargingBatteryLevel__ |    optional | Desired level of battery after charging (in percent, [1,100]), 100% for a full battery charge. Default value: '100.0'. Type: `double`. |
| __connectorType__ |    optional | Connector type ID, used to perform a power limitation based on those connector. Type: `String`. |
| __geoserver__ |    optional | Geoserver name. Type: `String`. |
| __options__ |    optional | Options of charging time service.<br/> Available values:<br/> - `OPTIMUM_BATTERY_CHARGE`: Calculate the optimum charge level (in %) of the vehicle battery at the given charge point; Above this level, the power delivered by the charge point decreases, and the charge takes more time.
| __remainingBatteryLevel__ |    optional | Remaining battery level in percent. Available value `0` to `100`. By default `0`. Mandatory if `vehicle` parameter is used. Optional if `evf` parameter is used. Type: `double`. |
| __energyVehicleFeature__ |    optional | Energy vehicle feature for energy consumption estimation. Optional if `vehicle` parameter is defined. Type: `[RoutingEnergyVehicleFtr]`. See details below. |
| <s>__swidx__</s> |    optional | Switch index. Type: `int`. |
| __temperature__ |    optional | Temperature in Celsius. Mandatory if `vehicle` parameter is used. Optional if `evf` parameter is used. By Default `20`. Type: `int`. |
| __vehicle__ |    optional | Vehicle model (UUID key). Mandatory if `energyVehicleFeature` parameter is not set. Type: `String`. |

#### __RoutingEnergyVehicleFtr__
Class representing a routing energy vehicle feature. Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __auxConsumption__ |             | Vehicle's instantaneous auxiliary equipments consumption (in W). Type: `int`. |
| __batCapacity__ |             | Vehicle's capacity of the battery (in kWh, only if electric vehicle or hybrid re-chargeable, 0 otherwise). Type: `double`. |
| __crr__ |             | Vehicle's tire rolling resistance coefficient (dimension-less, in interval ]0, 1[). Type: `double`. |
| __dryWeight__ |             | Vehicle's weight without any consumables or passengers (in kg). Type: `int`. |
| __energyLoad__ |             | Vehicle's current energy load, state of charge (in kWh). Type: `double`. |
| __engineEfficiency__ |             | Vehicle's efficiency coefficient between engine and gear (dimension-less, in interval ]0, 1[). Type: `double`. |
| __extTemp__ |             | Outside temperature (in °C). Type: `float`. |
| __maxAccel__ |             | Maximum acceleration (superior to 0.1, in m/s², based on vehicle's acceleration capacity and expected driving behavior). Type: `double`. |
| __maxChargePower__ |             | Maximum charge power AC single phase authorized by the vehicle (in kW). Type: `double`. |
| __maxChargePowerAc3__ |             | Maximum charge power AC three phases authorized by the vehicle (in kW). Type: `double`. |
| __maxChargePowerDc__ |             | Maximum charge power DC authorized by the vehicle (in kW). Type: `double`. |
| __maxDecel__ |             | Maximum deceleration (inferior to -0.1, in m/s², based on vehicle's braking capacity and expected driving behavior). Type: `double`. |
| __payload__ |             | Vehicle's extra load (consumables or passengers weight for example) (in kg). Type: `int`. |
| __regenerativeBraking__ |             | Defines if the vehicle supports regenerative braking (default = true). Type: `boolean`. |
| __scx__ |             | Product of vehicle's front area and aerodynamic coefficient (in m²). Type: `double`. |
