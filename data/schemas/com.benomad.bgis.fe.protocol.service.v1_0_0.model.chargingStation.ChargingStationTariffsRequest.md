| Field  | Optional | Description |
|--------|----------|-------------|
| __links__ |             | Represents a list of associations between charging tariffs and connectors. Type: `list or array of [ChargingTariffConnectorLinkFront]`. See details below. |
| __providerName__ |             | Provider name used by BeMap (bgis). Type: `String`. |
| __chargePassHashIds__ |    optional | Represents a collection of hashed identifiers for tariff charge passes added in response. The tariffs of charge passes are returned in response to the AD/HOC tariffs. The AD/HOC tariffs are always returned when they are available. Type: `list or array of String`. |
| __geoserver__ |    optional | Geoserver name. Type: `String`. |
| __logTag__ |    optional | Log tag is an UUID tag used during the request calculation in log and send to another provider (if need). Type: `String`. |
| <s>__swidx__</s> |    optional | Switch index. Type: `int`. |

#### __ChargingTariffConnectorLinkFront__
Represents a link between a charging tariff and a connector. Fields details:
| Field  | Optional | Description |
|--------|----------|-------------|
| __chargingPointId__ |             | Unique identifier of the charging point. Use the ID field from charging station search service. Type: `String`. |
| __connectorId__ |             | Unique identifier of the charging connector. Use the operator ID field from charging station search service. Type: `String`. |
| __poolId__ |             | Unique identifier of the charging pool. Type: `String`. |
| __stationId__ |    optional | Unique identifier of the charging station. Type: `String`. |
