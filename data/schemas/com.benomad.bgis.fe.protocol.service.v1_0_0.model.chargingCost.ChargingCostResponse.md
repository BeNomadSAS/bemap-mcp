| Field  | Optional | Description |
|--------|----------|-------------|
| __estimations__ |             | List of estimated cost and time. Type: `list or array of [ChargingCostEstimation]`. See details below. |

#### __ChargingCostEstimation__
Class representing charging cost estimations. Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __batChargeLvl__ |    optional | The charge level (in %) of the vehicle at the given charge point. Type: `double`. |
| __chargingCost__ |    optional | Charging cost. Type: `[ChargingCost]`. See details below. |
| __chargingTime__ |    optional | Charging time in seconds. Type: `long`. |
| __energyUsed__ |    optional | Energy used in kW to make the charge. Type: `double`. |

#### __ChargingCost__
Class representing an estimated charging cost and time, based on vehicle, connector power, charge need and prices list. Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __currency__ |    optional | Currency ISO 4217 Code. Type: `String`. |
| __includeVat__ |    optional | Price include VAT. Type: `float`. |
| __withoutVat__ |    optional | Price without VAT. Type: `float`. |
