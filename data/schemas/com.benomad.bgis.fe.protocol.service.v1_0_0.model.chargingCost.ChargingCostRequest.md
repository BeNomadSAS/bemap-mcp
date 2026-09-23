| Field  | Optional | Description |
|--------|----------|-------------|
| __charges__ |             | List of charging features. Type: `list or array of [ChargingCostCharge]`. See details below. |
| __temperature__ |             | Temperature in Celsius. Type: `int`. |
| __vehicle__ |             | Model of vehicle (key). Type: `String`. |
| __cur__ |    optional | Defined the currency used for costs calculation. Currency ISO 4217 Code. Type: `String`. |
| __geoserver__ |    optional | Geoserver name. Type: `String`. |
| <s>__swidx__</s> |    optional | Switch index. Type: `int`. |
| __time__ |    optional | Time stamp (in milliseconds). Defines the date and time will be used to apply the price restrictions. Type: `long`. |

#### __ChargingCostCharge__
Class representing charging cost charge. Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __cnnTypeId__ |             | Connector type ID. Type: `int`. |
| __currency__ |             | Defined the currency used for costs calculation. Currency ISO 4217 Code. Type: `String`. |
| __curBatLvl__ |             | Current level of battery (in percent), Range between 0% to 100% for a full battery charge. Type: `double`. |
| __maxPrice__ |             | Maximum price for a charging session with this tariff. Type: `[ChargingPriceTaxFront]`. See details below. |
| __minPrice__ |             | Minimum price for a charging session with this tariff. Type: `[ChargingPriceTaxFront]`. See details below. |
| __power__ |             | Nominal power of connector (in kW). For a charging station can deliver 50 kW, set the value to 50. Type: `double`. |
| __tariffs__ |             | List of tariff. Type: `list or array of [ChargingTariffItemFront]`. See details below. |
| __currentType__ |    optional | Current type (AC/DC).<br/> Available values:<br/> - `AC`: Alternating current (AC), but the number of phases is not available.<br/> - `AC_SINGLE_PHASE`: Alternating current (AC), single phase.<br/> - `AC_THREE_PHASES`: Alternating current (AC), three phases.<br/> - `DC`: Direct current (DC).<br/> - `NA`: Not available (NA).
| __duration__ |    optional | Maximum desired time spent to the charge (in seconds). Type: `long`. |
| __endDateTime__ |    optional | The time after which this tariff is no longer valid, in UTC, time_zone field if the Location can be used to convert to local time. Typically used when this tariff is going to be replaced with a different tariff soon. Type: `String`. |
| __startDateTime__ |    optional | The time when this tariff becomes active, in UTC, the time_zone field of the Location can be used to convert to local time. Typically used for a new tariff already given with the location, before it becomes active. Type: `String`. |
| __timeZone__ |    optional | Time zone. The value must come from the Pool `timeZone` field. One of IANA tzdata’s TZ-values representing the time zone of the location. Examples: "Europe/Oslo", "Europe/Zurich". (http://www.iana.org/time-zones) Type: `String`. |
| __toBatLvl__ |    optional | Desired level of battery after charging (in percent), 100% for a full battery charge. For a full charge, set the value to 100. For a charge to 80% of battery capacity set the value to 80. Type: `double`. |

#### __ChargingPriceTaxFront__
Represents a tax applied to a charging price. Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __excludeTax__ |             | Represents the price of a charge without a tax. Type: `float`. |
| __includeTax__ |             | Represents the price of a charge with tax. The amount of money of this tax that is due. Type: `Float`. |
| __name__ |    optional | The name of the tax. The intention is that Parties use short names where possible, e.g. VAT. Type: `String`. |

#### __ChargingTariffItemFront__
Class representing charging tariff. Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __prices__ |             | List of price. Type: `list or array of [ChargingPrice]`. See details below. |
| __restriction__ |    optional | Restriction information of prices. Type: `[ChargingPriceRestriction]`. See details below. |

#### __ChargingPriceRestriction__
Class representing charging price restrictions. Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __dayOfWeek__ |    optional | List of day of the week for this tariff to be valid. Values can be MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY, SUNDAY.<br/> Available values:<br/> - `FRIDAY`: <br/> - `MONDAY`: <br/> - `SATURDAY`: <br/> - `SUNDAY`: <br/> - `THURSDAY`: <br/> - `TUESDAY`: <br/> - `WEDNESDAY`: 
| __endDate__ |    optional | End date (AAAA-MM-DD). Type: `String`. |
| __endTime__ |    optional | End time of day (hh:mm). Type: `String`. |
| __maxDuration__ |    optional | Maximum duration in seconds for this tariff to be valid. Type: `Integer`. |
| __maxKwh__ |    optional | Maximum used energy in kWh for this tariff to be valid. Type: `Float`. |
| __maxPower__ |    optional | Maximum power in kW for this tariff to be valid. Type: `Double`. |
| __minDuration__ |    optional | Minimum duration in seconds for this tariff to be valid. Type: `Integer`. |
| __minKwh__ |    optional | Minimum used energy in kWh for this tariff to be valid. Type: `Float`. |
| __minPower__ |    optional | Minimum power in kW for this tariff to be valid. Type: `Double`. |
| __startDate__ |    optional | Start date (AAAA-MM-DD). Type: `String`. |
| __startTime__ |    optional | Start time of day (hh:mm). Type: `String`. |

#### __ChargingPrice__
Class representing charging price. Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __price__ |             | Price per unit (excluding VAT) for this tariff dimension. Type: `float`. |
| __type__ |             | Type of price dimension.<br/> Available values:<br/> - `ENERGY`: defined in kWh.<br/> - `FLAT`: flat fee, no unit.<br/> - `PARKING_TIME`: time not charging, defined in hours.<br/> - `TIME`: time charging, defined in hours.
| __minAmount__ |    optional | Minimum amount to be billed. Type: `float`. |
| __unit__ |    optional | Unit of price.<br/> Available values:<br/> - `NA`: <br/> - `PER_HOUR`: <br/> - `PER_KWH`: 
| __vat__ |    optional | Applicable VAT percentage for this tariff dimension. If omitted, no VAT is applicable. Type: `float`. |
