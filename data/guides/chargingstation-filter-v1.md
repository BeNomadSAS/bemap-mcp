# Charging station filter v1

To define filter pattern that will filter charging station search results.

### Filters parameter

The charging station filters parameter is a list of `String` representing filter pattern on which the charging stations will be selected or not. Each filter pattern must be formatted according to the following pattern: `CLASS.FIELD OPERATOR VALUE`.

Filters support the OR operator `||` example: `Filter pattern 1 || Filter pattern 2` means a charging station will be accepted if it matches any of the two filter patterns. Can be used for two or more filter patterns.

By default, a filter pattern is an exclusion rule: any object that does not comply with all of the filters will not be included in the response. Instead, you can also specify actions on a filter. A filter with an action will not exclude objects that do not match its condition, it will apply the action on the matching objects. To specify an action, the filter must follow the following pattern: `Filter pattern -> ACTION`. The filter pattern definition supports the OR operator.

This page describes version 1 of the filters, the default of `filtersVersion` (charging station search) and `csfsVersion` (EV smart routing). Under version 2 an action also excludes what it does not match, like a filter without action: see [Charging station filter v2](index.html#page-chargingstation-filter-v2.md).

#### Filter pattern syntax:
- __CLASS__: must be one of:
  - `pool`
  - `station`
  - `chargingPoint`
  - `vehicleAccess`
  - `parkingSpot`
- __FIELD__: see "Supported filter fields" section below.
- __OPERATOR__: can be replaced by:
  - `==`: for equals tests.
  - `!=`: for not equals tests.
  - `<`, `>`, `<=` or `>=`: for numeric tests.
  - `IN`: for a list of possible values separated by `;`.
  - `/=`: for a regular expression delimited by `/` at beginning and end of string. `/i` can be used as the end delimiter instead if the match should be case insensitive. The expression must match the whole value, and without `/i` it is case-sensitive: `pool.brand /= /Tesla/` and `pool.brand /= /tesla.*/` find no `Tesla Destination` pool, `/Tesla.*/` and `/tesla.*/i` find it.
- __VALUE__: the value you want to be compared with the selected field value.
- __ACTION__: Action to be executed if the filter pattern are matched. Formatted as `-> ACTION_KEY = ACTION_VALUE;`. The trailing `;` is mandatory: without it the action is not read, and the filter excludes like a filter without action. See below the available actions:
  - `prefCoeff`: Represents the preference coefficient to apply (1 neutral value, >1 preferred, <1 to avoid) if the filter condition is met. The value must be a double. To prioritizes a network set `prefCoeff` value greater than 1 up to 10 ( ]1, 10] ). To avoid a network set `prefCoeff` value between 0.1 and 0.999999 ( [0.1, 1[ ).

Example of JSON representation:
```
[
  "pool.brand /= /.*(Izivia|IONITY).*/i || pool.brand /= /Tesla.*/",
  "station.available == true",
  "chargingPoint.nominalPower >= 7",
  "station.freeCharging==true -> prefCoeff=7.0;"
]
```

The same filters in a complete charging station search:
```
{"bemap":{"language":"request"}}
POST ${HOST_URL}/bgis/service/chargingstation/search/1.0
{
  "providers": ["ecoMovement"],
  "options": ["PATH_POINT"],
  "radius": 300,
  "coordinate": {
    "lon": 2.3538,
    "lat": 48.8564
  },
  "filters": [
    "pool.brand /= /.*(Izivia|IONITY).*/i || pool.brand /= /Tesla.*/",
    "station.available == true",
    "chargingPoint.nominalPower >= 7",
    "station.freeCharging==true -> prefCoeff=7.0;"
  ]
}
```
Of the six pools found within 300 m, it returns one: IZIVIA Express, 4 Rue de Lobau, with its four DC charging points.

`chargingPoint.currency` is not a filter field in version 1: a filter on it answers `400 CHARGING_STATION_FAILED "Unsupported filter field: 'currency'"`.

### Supported filter fields
Special filters are described here, along with the list of fields on which filters can be specified.
A filter names the fields of BeMap's own classes, listed below, which are not always those of the response: the name of a pool is `pool.name`, which the response calls `nameOfPool`. A response name is refused: `pool.nameOfPool /= /.*Tesla.*/` answers `400 CHARGING_STATION_FAILED "Unsupported filter field: 'nameOfPool'"`.

The special filter `available`, on a pool, a station or a charging point, is `true` for an object in service, whether it is free, busy or reserved. An object whose status is unknown (`NA`) passes both `available == true` and `available == false`. To keep only what is free now, filter on the status itself, for example `station.availabilityStatus == IN_SERVICE_FREE`.

#### Supported pool filters
* __available__: Whether the pool is available. Type: `boolean`
```
{"bemap":{"language":"!include","url":"/bgis/service/documentation/1.0/buildchargingstationfilters.md?className=com.benomad.bgis.be.model.chargingStation.Pool"}}
```

#### Supported station filters
* __available__: Whether the station is available. Type: `boolean`
* __freeCharging__: Whether charging at this station is free. Type: `boolean`
* __creditCardPayment__: Whether credit card payment is supported at this station. Type: `boolean`
* __chargePass__: Name or id of charge pass. Type: `String`
* __rfidAuth__: Whether the station supports RFID authentication. Type : `boolean`
* __appAuth__: Whether the station supports Application authentication. Type : `boolean`
```
{"bemap":{"language":"!include","url":"/bgis/service/documentation/1.0/buildchargingstationfilters.md?className=com.benomad.bgis.be.model.chargingStation.Station"}}
```

#### Supported charging point filters
* __available__: Whether the charging point is available. Type: `boolean`
```
{"bemap":{"language":"!include","url":"/bgis/service/documentation/1.0/buildchargingstationfilters.md?className=com.benomad.bgis.be.model.chargingStation.ChargingPoint"}}
```

#### Supported vehicle access filters
```
{"bemap":{"language":"!include","url":"/bgis/service/documentation/1.0/buildchargingstationfilters.md?className=com.benomad.bgis.be.model.chargingStation.SummaryParkingVehicleAccess"}}
```

#### Supported parking spot filters
```
{"bemap":{"language":"!include","url":"/bgis/service/documentation/1.0/buildchargingstationfilters.md?className=com.benomad.bgis.be.model.chargingStation.ParkingVehicleAccess"}}
```


> Note: Null values in a pool's vehicle access restrictions are considered as no restrictions and therefore are always compliant with any filters.

---

_BeNomad MCP: a corrected copy of BeMap's page, served until BeMap publishes the correction (BEMAP-1938)._
