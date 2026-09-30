# Charging station filter v2

To define filter pattern that will filter charging station search results, with version 2 of the filters: `"filtersVersion": 2` in a charging station search, `"csfsVersion": 2` in EV smart routing. Send the version as a number: the specification shows these fields as base64 strings, which the service refuses (`400 INVALID_ARGUMENT "Invalid request"`). Version 1, the default, is described in [Charging station filter v1](index.html#page-chargingstation-filter-v1.md).

### Filters parameter

The charging station filters parameter is a list of `String` representing filter pattern on which the charging stations will be selected or not. Each filter pattern must be formatted according to the following pattern: `PATH OPERATOR VALUE`, where `PATH` leads from the pool to a field.

Filters support the OR operator `||` example: `Filter pattern 1 || Filter pattern 2` means a charging station will be accepted if it matches any of the two filter patterns. Can be used for two or more filter patterns.

A filter pattern is an exclusion rule: any object that does not comply with all of the filters will not be included in the response. **In version 2 an action does not change this**: a filter with an action excludes the objects that do not match its condition, like a filter without action, and applies the action on the matching objects. `pool.brand == NOSUCHBRAND -> prefCoeff=5.0;` returns no pool, where version 1 returns every pool of the area; in EV smart routing it answers `400 NO_REACHABLE_STEP_POINT`. To specify an action, the filter must follow the following pattern: `Filter pattern -> ACTION`. The filter pattern definition supports the OR operator.

⚠️ **Version 2 ignores a field it does not know**, where version 1 refuses it (`400 "Unsupported filter field"`). A filter naming one answers `200` and filters nothing: `pool.nameOfPool == x`, or the special field of version 1 `station.available == false`, returns every pool of the area. Check each path against the list of supported filter fields below.

#### Filter pattern syntax:
- __PATH__: `pool.` followed by the path to the field, through the objects of the pool:
  - `pool.FIELD`: the pool;
  - `pool.stations.FIELD`: its stations;
  - `pool.stations.chargingPoints.FIELD`: their charging points;
  - `pool.stations.chargingPoints.connectorTypes.FIELD`: their connectors, and `pool.stations.chargingPoints.connectorTypes.tariffContents.FIELD` the tariffs of a connector;
  - `pool.stations.chargingPoints.parkingSpot.FIELD`: the parking spot of a charging point;
  - `pool.vehicleAccess.FIELD`: the vehicle access of the pool;
  - `pool.address.FIELD`: the address of the pool.

  Version 2 also reads the classes of version 1 `station.FIELD` and `chargingPoint.FIELD`, as `pool.stations.FIELD` and `pool.stations.chargingPoints.FIELD`, but ignores `vehicleAccess.FIELD` and `parkingSpot.FIELD`. Write the full path.
- __OPERATOR__: can be replaced by:
  - `==`: for equals tests.
  - `!=`: for not equals tests.
  - `<`, `>`, `<=` or `>=`: for numeric tests.
  - `IN`: for a list of possible values separated by `;`.
  - `/=`: for a regular expression delimited by `/` at beginning and end of string. `/i` can be used as the end delimiter instead if the match should be case insensitive. The expression must match the whole value, and without `/i` it is case-sensitive: `pool.brand /= /Tesla/` and `pool.brand /= /tesla.*/` find no `Tesla Destination` pool, `/Tesla.*/` and `/tesla.*/i` find it.
- __VALUE__: the value you want to be compared with the selected field value.
- __ACTION__: Action to be executed if the filter pattern are matched. Formatted as `-> ACTION_KEY = ACTION_VALUE;`. See below the available actions:
  - `prefCoeff`: Represents the preference coefficient to apply (1 neutral value, >1 preferred, <1 to avoid) if the filter condition is met. The value must be a double. To prioritizes a network set `prefCoeff` value greater than 1 up to 10 ( ]1, 10] ). To avoid a network set `prefCoeff` value between 0.1 and 0.999999 ( [0.1, 1[ ).

Example of JSON representation:
```
[
  "pool.brand /= /.*(Izivia|IONITY).*/i || pool.brand /= /Tesla.*/",
  "pool.stations.availabilityStatus == IN_SERVICE_FREE",
  "pool.stations.chargingPoints.nominalPower >= 7",
  "pool.stations.chargingPoints.connectorTypes.tariffContents.currency IN EUR;GBP;DKK"
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
  "filtersVersion": 2,
  "filters": [
    "pool.brand /= /.*(Izivia|IONITY).*/i || pool.brand /= /Tesla.*/",
    "pool.stations.availabilityStatus == IN_SERVICE_FREE",
    "pool.stations.chargingPoints.nominalPower >= 7",
    "pool.stations.chargingPoints.connectorTypes.tariffContents.currency IN EUR;GBP;DKK"
  ]
}
```
Of the six pools found within 300 m, it returns one: IZIVIA Express, 4 Rue de Lobau, with its four DC charging points.

### Supported filter fields
Every path version 2 reads is listed by the filter autocomplete service:
```
{"bemap":{"language":"request"}}
GET ${HOST_URL}/bgis/service/chargingstation/filter/autocomplete/1.0?filterVersion=2&levelLimit=6&filter=pool.
```

Version 2 has none of the special filters of version 1: `available`, `freeCharging`, `creditCardPayment`, `chargePass`, `rfidAuth` and `appAuth` are not read, and a filter on one is ignored. Filter on the stored fields instead, for example `pool.stations.availabilityStatus == IN_SERVICE_FREE` for a station that is free now.

The fields of each object are listed below. They are the fields of BeMap's own classes, which are not always those of the response: the name of a pool is `pool.name`, which the response calls `nameOfPool`.

#### Supported pool filters
Path: `pool.FIELD`.
```
{"bemap":{"language":"!include","url":"/bgis/service/documentation/1.0/buildchargingstationfilters.md?className=com.benomad.bgis.be.model.chargingStation.Pool"}}
```

#### Supported station filters
Path: `pool.stations.FIELD`.
```
{"bemap":{"language":"!include","url":"/bgis/service/documentation/1.0/buildchargingstationfilters.md?className=com.benomad.bgis.be.model.chargingStation.Station"}}
```

#### Supported charging point filters
Path: `pool.stations.chargingPoints.FIELD`.
```
{"bemap":{"language":"!include","url":"/bgis/service/documentation/1.0/buildchargingstationfilters.md?className=com.benomad.bgis.be.model.chargingStation.ChargingPoint"}}
```

#### Supported connector and tariff filters
Paths: `pool.stations.chargingPoints.connectorTypes.FIELD`, and `pool.stations.chargingPoints.connectorTypes.tariffContents.FIELD` for the tariffs of a connector, as listed by the autocomplete service above.

The currency of a charging point is the one of its tariffs: `pool.stations.chargingPoints.connectorTypes.tariffContents.currency`. `chargingPoint.currency` is not a filter field in version 2 and is ignored. A charging point that has no tariff passes a filter on its tariffs: `pool.stations.chargingPoints.connectorTypes.tariffContents.currency == XXX` keeps every pool without tariff data.

#### Supported vehicle access filters
Path: `pool.vehicleAccess.FIELD`.
```
{"bemap":{"language":"!include","url":"/bgis/service/documentation/1.0/buildchargingstationfilters.md?className=com.benomad.bgis.be.model.chargingStation.SummaryParkingVehicleAccess"}}
```

#### Supported parking spot filters
Path: `pool.stations.chargingPoints.parkingSpot.FIELD`, for example `pool.stations.chargingPoints.parkingSpot.transportTypes == TRUCK`.
```
{"bemap":{"language":"!include","url":"/bgis/service/documentation/1.0/buildchargingstationfilters.md?className=com.benomad.bgis.be.model.chargingStation.ParkingVehicleAccess"}}
```


> Note: A pool that carries no vehicle access data does not pass a filter on it: in a search of 500 m around Pont Neuf, Paris, where no pool returned carries any, `pool.vehicleAccess.maxHeight > 100000` and `pool.vehicleAccess.maxHeight < 1` both return no pool.

---

_BeNomad MCP: a corrected copy of BeMap's page, served until BeMap publishes the correction (BEMAP-1938)._
