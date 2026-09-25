<span class="bemap-tag">Electric mobility</span>

# Charging Time — `bemap.ChargingTime`

<p class="bemap-tagline">Estimate how long an EV takes to charge from one battery level to another at a given charging-point power. Returns total charging time plus the "knee" of the curve where the rate drops.</p>

## At a glance

<ul class="bemap-glance">
<li>Endpoint: <code>POST service/chargingTime/1.0</code>.</li>
<li>Returns <code>chargingTime</code> (s) plus <code>optimumBatteryChargeLevel</code> (%) — the SOC where the curve flattens.</li>
<li>Required: <code>vehicle</code>, <code>chargingPointPower</code>, <code>chargingCurrentType</code>. SOC range and temperature have sensible defaults.</li>
<li>Pair with <a href="index.html#subpage-jsapi_2_0_0-js-ev-vehicles.md"><code>bemap.EvVehicles</code></a> for the vehicle catalogue.</li>
<li>No spatial output — this is a pure data service. The map-based EV demos live on <a href="index.html#subpage-jsapi_2_0_0-js-ev-smart-routing.md">EV Smart Routing</a>.</li>
</ul>

## Usage

```js
var ct = new bemap.ChargingTime(ctx);

ct.estimate(new bemap.ChargingTimeRequest({
    vehicle: 'tesla-model3-lr-2023',                    // EV vehicle key
    chargingPointPower: 50,                             // kW
    chargingCurrentType: bemap.ChargingCurrentType.DC,
    remainingBatteryLevel: 20,                          // %
    chargingBatteryLevel: 80,                           // %
    temperature: 15                                     // °C
})).then(function(resp) {
    console.log('charging time:', resp.getChargingTime(), 's');
    console.log('optimum stop at:', resp.getOptimumBatteryChargeLevel(), '%');
}).catch(function(err) {
    if (err.getCode() === bemap.Error.CHARGING_TIME_FAILED) noEstimateUI();
    else console.error(err.getMessage());
});
```

## Reference

### Constructor

```js
new bemap.ChargingTime(context)
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `context` | `bemap.Context` | Credentials + geoserver. See [The Context](index.html#subpage-jsapi_2_0_0-the-context.md). |

### Methods

| Method | Returns | Notes |
| --- | --- | --- |
| `estimate(request, options?)` | `Promise<bemap.ChargingTimeResponse>` | `options` accepts `{ signal?: AbortSignal }`. |

### Request fields — `bemap.ChargingTimeRequest`

| Field | Type | Required | Notes |
| --- | --- | :-: | --- |
| `vehicle` | String | ✓ | EV vehicle key. Get one from [`bemap.EvVehicles`](index.html#subpage-jsapi_2_0_0-js-ev-vehicles.md). |
| `chargingPointPower` | Number | ✓ | kW. |
| `chargingCurrentType` | `bemap.ChargingCurrentType.*` | ✓ | `AC` or `DC`. |
| `remainingBatteryLevel` | Number (%) | — | Start SOC, 0–100. Default `0`. |
| `chargingBatteryLevel` | Number (%) | — | Target SOC, 0–100. Default `100`. Must be > `remainingBatteryLevel`. |
| `temperature` | Number (°C) | — | Ambient temperature. Default `20`. |
| `connectorType` | Number | — | Connector type ID. See [connector types glossary](index.html#subpage-jsapi_2_0_0-glossary-chargingstation-connectors.md). |
| `geoserver` | String | — | Per-request override of `ctx.geoserver`. |

### Response — `bemap.ChargingTimeResponse`

| Accessor | Returns | Notes |
| --- | --- | --- |
| `getChargingTime()` | Number (s) | Total time to reach the target SOC. |
| `getOptimumBatteryChargeLevel()` | Number (%) | The "knee" of the charging curve — useful for fast-charge stop hints. |
| `isError()` | Boolean | `true` when the server returned `chargingTime === -1` (vehicle/charger combination not supported). |

> The server does not return an average-power accessor. For a cost estimate, multiply `request.chargingPointPower × getChargingTime() / 3600` for an upper-bound kWh figure and apply your tariff.

## Use cases

- **Trip planning UI** — alongside [`bemap.EvSmartRouting`](index.html#subpage-jsapi_2_0_0-js-ev-smart-routing.md), show an estimate before the user commits to a charging stop.
- **Charge-to-knee hint** — surface `getOptimumBatteryChargeLevel()` so users stop before the rate falls off a cliff.
- **Curve plotting** — call `estimate()` repeatedly across a sweep of `chargingBatteryLevel` to plot a charging-time curve. The server has no per-vehicle curve endpoint.

## Notes

The full interactive demo (brand + vehicle picker chained from `bemap.EvVehicles`, charger-power slider, from/to SOC sliders, temperature input, live charging-curve preview) ships with the library — see [the GitHub repository](https://github.com/BeNomadSAS/bemap-js-api), then open `examples/services-v2/charging-time.html`.

## See also

- [`bemap.EvVehicles`](index.html#subpage-jsapi_2_0_0-js-ev-vehicles.md) — vehicle catalogue
- [`bemap.EvSmartRouting`](index.html#subpage-jsapi_2_0_0-js-ev-smart-routing.md) — full EV journey planning, charging stops included automatically
- [`bemap.ChargingStations`](index.html#subpage-jsapi_2_0_0-js-charging-stations.md) — find stations to charge at
- REST endpoint: `POST service/chargingTime/1.0`
