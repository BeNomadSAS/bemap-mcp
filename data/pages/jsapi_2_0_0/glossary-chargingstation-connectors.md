<span class="bemap-tag">Glossary</span>

# Charging-station connectors

<p class="bemap-tagline">The connector-type catalogue used by every EV-related service. Live-rendered below from <code>bemap.ChargingStations.getConnectorTypes()</code>.</p>

## At a glance

<ul class="bemap-glance">
<li>Catalogue endpoint: <code>GET service/chargingstation/connector/list/1.0</code>.</li>
<li>Accessor: <code>cs.getConnectorTypes()</code> on <a href="index.html#subpage-jsapi_2_0_0-js-charging-stations.md"><code>bemap.ChargingStations</code></a>.</li>
<li>Connector type IDs feed: <code>request.connectorIdFilters</code> on Charging Stations search, <code>connectorTypes</code> on EV Smart Routing, <code>connectorType</code> on Charging Time.</li>
<li>Deprecated connectors live in a separate sub-list — surface them only when explicitly requested.</li>
</ul>

## Reference

### List of available connectors

<div id="connectorTable"></div>

### List of deprecated connectors

<div id="connectorDeprecatedTable"></div>

```
{"bemap":{"language":"javascript","run":true,"hide":true, "src":"glossary-chargingstation-connectors.js"}}
```

## See also

- [`bemap.ChargingStations`](index.html#subpage-jsapi_2_0_0-js-charging-stations.md) — `getConnectorTypes()` method
- [`bemap.EvVehicles`](index.html#subpage-jsapi_2_0_0-js-ev-vehicles.md) — `getConnectorTypes()` per vehicle
- [`bemap.ChargingTime`](index.html#subpage-jsapi_2_0_0-js-charging-time.md) — `connectorType` request field
