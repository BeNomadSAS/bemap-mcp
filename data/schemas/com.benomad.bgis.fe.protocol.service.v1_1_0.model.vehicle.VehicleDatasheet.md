| Field  | Optional | Description |
|--------|----------|-------------|
| __auxConsumptions__ |             | Energy auxiliary consumption used by the heating or air conditioner. Type: `list or array of [VehicleAuxConsumptionDatasheet]`. See details below. |
| __chargingBatteryLevelTo__ |             | Charging up to x percent of battery capacity (100% by default). Type: `Double`. |
| __crr__ |             | Vehicle's tire rolling resistance coefficient (dimensionless, in interval ]0, 1[). Type: `double`. |
| __dryWeight__ |             | Vehicle's weight without any consumables or passengers (in kg). Type: `int`. |
| __engineEfficiency__ |             | Vehicle's efficiency coefficient between engine and gear (dimensionless, in interval ]0, 1[). Type: `double`. |
| __maxAccel__ |             | Maximum acceleration (> 0.1, in m/s², based on vehicle's acceleration capacity and expected driving behaviour). Type: `double`. |
| __maxBatteryCapacity__ |             | Maximum battery capacity in optimal conditions. Type: `double`. |
| __maxDecel__ |             | Maximum deceleration (< -0.1, in m/s², based on vehicle's braking capacity and expected driving behaviour). Type: `double`. |
| __scx__ |             | Product of vehicle's frontal area and aerodynamic coefficient (in m²). Type: `double`. |
| __vehicleCharger__ |             | The vehicle charger. Type: `[VehicleChargerDatasheet]`. See details below. |
| __batteryCapacities__ |    optional | Vehicle's capacity of the battery (in kWh, only if electric vehicle or hybrid rechargeable, 0 otherwise). Type: `list or array of [VehicleBatteryDatasheet]`. See details below. |
| __enginePower__ |    optional | Engine power in kW. Type: `Double`. |
| __f0__ |    optional | The constant road load coefficient (in N). f0 and f1 used in replacement of Crr. Type: `double`. |
| __f0f1WeightReference__ |    optional | The reference weight of coefficients f0 and f1 (in kg). Default = 0, in that case the method will use as reference weight the sum of dryWeight and payLoad. Type: `double`. |
| __f1__ |    optional | The first order road load coefficient (in N/kph). f1 and f0 used in replacement of Crr. Type: `double`. |
| __f2__ |    optional | The second order road load coefficient (in N/kph²). f2 used in replacement of SCx. Type: `double`. |
| __f2TemperatureReference__ |    optional | The reference temperature of coefficient f2 (in °C). Default = 20 °C. Type: `double`. |
| __maxSpeed__ |    optional | Maximum speed in km/h. Type: `Short`. |
| __minConsumption__ |    optional | Minimal energy consumption used by the electric and electronic equipments of vehicle. Consumption in Watt. Type: `int`. |
| __regenerativeBraking__ |    optional | Defines if the vehicle supports regenerative braking (default = true). Type: `boolean`. |

#### __VehicleBatteryDatasheet__
 Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __batteryCapacity__ |             | Battery capacity kWh. Type: `double`. |
| __outsideTemp__ |             |  Type: `short`. |

#### __VehicleAuxConsumptionDatasheet__
 Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __auxiliaryConsumption__ |             | Energy auxiliary consumption in Watt. Type: `int`. |
| __outsideTemp__ |             |  Type: `short`. |

#### __VehicleChargerDatasheet__
 Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __maxAcSinglePhase__ |    optional | Maximum charge power (in kW) in AC 1 phase current type. Type: `double`. |
| __maxAcThreePhases__ |    optional | Maximum charge power (in kW) in AC 3 phases current type. Type: `double`. |
| __maxDC__ |    optional | Maximum charge power (in kW) in DC current type. Type: `double`. |
