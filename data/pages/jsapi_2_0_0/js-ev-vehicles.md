<span class="bemap-tag">Electric mobility</span>

# EV Vehicles — `bemap.EvVehicles`

<p class="bemap-tagline">Browse the EV vehicle catalogue independently of EV routing — list brands, search by brand / variant / key, fetch a single vehicle's full record. Wraps the v1.1 vehicle endpoints.</p>

## At a glance

<ul class="bemap-glance">
<li>Endpoints: <code>service/vehicle/1.1/getbrands</code>, <code>findvehicles</code>, <code>getlevelvehicleinfo</code>, <code>getbrandlogo</code>.</li>
<li>Four primary methods: <code>brands()</code>, <code>list({brandId})</code>, <code>get(vehicleKey)</code>, <code>levels({level, brandId, …})</code>.</li>
<li>Two URL helpers (synchronous): <code>getBrandLogoUrl(brandId)</code>, <code>getPictureUrl(vehicleKey)</code>.</li>
<li>Convenience: <code>toRoutingProfile(vehicleKey)</code> returns a profile ready for <a href="index.html#subpage-jsapi_2_0_0-js-ev-smart-routing.md"><code>bemap.EvSmartRouting</code></a>.</li>
<li>Back-compat helpers <code>EvSmartRouting.getBrands()</code> / <code>.getVehicles()</code> still work; prefer this class for new code.</li>
</ul>

## Usage

```js
var evv = new bemap.EvVehicles(ctx);

evv.brands().then(function(brands) {
    brands.forEach(function(b) {
        console.log(b.getId(), b.getLabel());
    });
});

evv.list({ brandId: '<brand-id>' }).then(function(vehicles) {
    vehicles.forEach(function(v) {
        console.log(v.getDisplayLabel(), '—', v.getBatteryCapacity(), 'kWh');
    });
});

evv.get('<vehicle-uuid>').then(function(v) {
    console.log(v.getBrandName(), v.getName(), v.getVariant(), v.getYear());
});
```

### Brand + vehicle cascade

A brand + vehicle dropdown cascade is the most common UI shape:

```js
evv.brands().then(function(brands) {
    populateBrandDropdown(brands);          // each item: { id: b.getId(), label: b.getLabel() }
});

brandDropdown.addEventListener('change', function() {
    evv.list({ brandId: this.value }).then(function(vehicles) {
        populateVehicleDropdown(vehicles);   // each item: { key: v.getKey(), label: v.getDisplayLabel() }
    });
});

vehicleDropdown.addEventListener('change', function() {
    var vehicleKey = this.value;
    // hand off to EvSmartRouting, ChargingTime, EvReachableArea, …
});
```

For deeper cascades (name → variant → battery → power → motor), use `levels()`.

## Reference

### Constructor

```js
new bemap.EvVehicles(context)
```

| Parameter | Type | Notes |
| --- | --- | --- |
| `context` | `bemap.Context` | Credentials + geoserver. See [The Context](index.html#subpage-jsapi_2_0_0-the-context.md). |

### Methods

| Method | Returns | Notes |
| --- | --- | --- |
| `brands(options?)` | `Promise<Array<bemap.EvBrand>>` | Lists every brand the geoserver carries. Auto-sorted. |
| `list({brandId?, vehicle?, variant?, enableDatasheet?, signal?})` | `Promise<Array<bemap.EvVehicle>>` | Filter vehicles. `vehicle` returns 0 or 1 entries (key lookup). `enableDatasheet: true` includes the encrypted datasheet blob. |
| `get(vehicleKey, {enableDatasheet?, signal?})` | `Promise<bemap.EvVehicle>` | Fetch a single vehicle by key. Rejects with `bemap.Error.VEHICLE_NOT_FOUND` if unknown, or `bemap.Error.INVALID_ARGUMENT` if `vehicleKey` is missing. |
| `levels({level, brandId, name?, variant?, year?, batteryName?, motorType?, chargerPowerDC?, chargerPowerAC?, signal?})` | `Promise<Array<String>>` | Walk the catalogue progressively. `level` is one of `'NAME'`, `'VARIANT'`, `'YEAR'`, `'BATTERY_NAME'`, `'CHARGE_POWER_DC'`, `'CHARGE_POWER_AC'`, `'MOTOR_TYPE'`. |
| `brandLogo(brandId, options?)` | `Promise<{brandId, pictureFileFormat, logo}>` | Fetch the brand logo as a base64 blob. |
| `getBrandLogoUrl(brandId)` | String | Synchronous URL to the lite logo endpoint. Embed directly in `<img src=…>`. |
| `getPictureUrl(vehicleKey)` | String | Synchronous URL to a vehicle picture. |
| `toRoutingProfile(vehicleKey, options?)` | `Promise<bemap.RoutingVehicleProfile>` | Fetches the vehicle and returns a profile ready to plug into [`bemap.EvSmartRouting`](index.html#subpage-jsapi_2_0_0-js-ev-smart-routing.md). |

### `bemap.EvBrand`

| Accessor | Returns |
| --- | --- |
| `getId()` | String — MongoDB ObjectId-style. |
| `getLabel()` | String — human-readable brand name. |

### `bemap.EvVehicle`

| Accessor | Returns | Notes |
| --- | --- | --- |
| `getKey()` | String | Unique vehicle key. |
| `getBrandId()` | String | |
| `getBrandName()` | String | |
| `getName()` | String | Model name. |
| `getYear()` | Number | Model year. |
| `getVariant()` | String | Trim / variant. |
| `getMotorType()` | String | |
| `getDisplayLabel()` | String | Formatted "Brand — Model Variant (Year)". |
| `getBatteryName()` | String | Battery designation. |
| `getBatteryCapacity()` | Number (kWh) | Usable battery capacity, parsed from `batteryName`. |
| `getMaxChargingPowerAcSinglePhase()` | Number (kW) | |
| `getMaxChargingPowerAcThreePhases()` | Number (kW) | |
| `getMaxChargingPowerDc()` | Number (kW) | |
| `getConnectorTypes()` | `Array<Number>` | Supported connector type IDs. |
| `getTransportType()` | String | |
| `getDimensions()` | `{ height, width, length } \| null` | Metres. |
| `getMaxWeight()` | Number (kg) | |
| `getMaxWeightPerAxle()` | Number (kg) | |
| `getWltp()` | Object | WLTP consumption / range payload. |
| `getConsumptionInWhPerKm()` | Number (Wh/km) | |
| `getPlugAndAutoCharge()` | Object | |
| `getDatasheet()` | String | Encrypted (AES) blob — only present when `enableDatasheet: true`. |

## Notes

The full interactive demo (brand list, free-text vehicle search, spec panel with battery / power / connectors / WLTP, "Plan a route with this vehicle" hand-off to the EV Smart Routing demo) ships with the library — see [the GitHub repository](https://github.com/BeNomadSAS/bemap-js-api), then open `examples/services-v2/ev-vehicles.html`.

## See also

- [`bemap.EvSmartRouting`](index.html#subpage-jsapi_2_0_0-js-ev-smart-routing.md) — feed a selected vehicle key into journey planning
- [`bemap.ChargingTime`](index.html#subpage-jsapi_2_0_0-js-charging-time.md) — per-vehicle charging-time estimates
- [`bemap.EvReachableArea`](index.html#subpage-jsapi_2_0_0-js-ev-reachable-area.md) — per-vehicle reachable-area polygons
- [Connector types glossary](index.html#subpage-jsapi_2_0_0-glossary-chargingstation-connectors.md)
- REST endpoints: `service/vehicle/1.1/getbrands`, `findvehicles`, `getlevelvehicleinfo`, `getbrandlogo`
