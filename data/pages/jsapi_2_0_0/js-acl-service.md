<span class="bemap-tag">ACL &amp; admin</span>

# ACL Service — `bemap.AclService`

<p class="bemap-tagline">Fetch the current user's roles, allowed geoservers, and allowed charging-station providers. Use it to populate dropdowns and gate admin UI at runtime.</p>

## At a glance

<ul class="bemap-glance">
<li>Endpoint: <code>GET service/acl/1.0/user/details</code>. Available to any authenticated user.</li>
<li>One method: <code>getCurrentUserDetails(opts?)</code> returns <code>Promise&lt;bemap.AclDetailsResponse&gt;</code>.</li>
<li>Helpers: <code>bemap.helpers.listGeoservers(ctx)</code> and <code>listChargingStationProviders(ctx)</code>.</li>
<li>Use <code>details.hasRight(role)</code> to gate admin UI cleanly.</li>
<li>Pair with <a href="index.html#subpage-jsapi_2_0_0-js-geoserver-info.md"><code>bemap.GeoServerInfoService</code></a> for per-geoserver capabilities.</li>
</ul>

## Usage

```js
var acl = new bemap.AclService(ctx);

acl.getCurrentUserDetails().then(function(details) {
    console.log('user:', details.getUsername());
    console.log('rights:', details.getRights());

    var geoserverDropdown = details.getGeoservers().map(function(label) {
        return { key: label.getKey(), value: label.getValue(), selected: label.isDefault() };
    });

    if (details.hasRight('ROLE_ADMIN_ACCESS')) {
        showAdminMenu();
    }
});

// One-liner helpers
bemap.helpers.listGeoservers(ctx)
    .then(populateGeoserverDropdown);

bemap.helpers.listChargingStationProviders(ctx)
    .then(populateProviderDropdown);
```

## Reference

### Constructor

```js
new bemap.AclService(context)
```

### Methods

| Method | Returns | Notes |
| --- | --- | --- |
| `getCurrentUserDetails(options?)` | `Promise<bemap.AclDetailsResponse>` | `options` accepts `{ signal?: AbortSignal }`. |

### Response — `bemap.AclDetailsResponse`

| Accessor | Returns | Notes |
| --- | --- | --- |
| `getUsername()` | String | |
| `getRights()` | `Array<String>` | All roles granted (e.g. `ROLE_ROUTING`, `ROLE_ADMIN_ACCESS`, …). |
| `hasRight(role)` | Boolean | Convenience. |
| `getGeoservers()` | `Array<bemap.AclLabel>` | One per geoserver the user can query. |
| `getDefaultGeoserver()` | `bemap.AclLabel \| null` | |
| `getChargingStationProviders()` | `Array<bemap.AclLabel>` | One per CSP the user can query. |

### `bemap.AclLabel`

| Accessor | Returns |
| --- | --- |
| `getKey()` | String — wire identifier (`here`, `ecoMovement`, …) |
| `getValue()` | String — human-readable label |
| `isDefault()` | Boolean |

## Use cases

- Populate "Geoserver" and "Charging Station Provider" dropdowns from the live ACL — never hard-code.
- Gate admin UI behind `details.hasRight('ROLE_ADMIN_ACCESS')` to match the server's `@PreAuthorize("hasRole('ROLE_ADMIN_ACCESS')")` gate.
- Validate a request before sending — disable buttons for services whose role the user lacks.

## See also

- [Authentication](index.html#subpage-jsapi_2_0_0-authentication.md)
- [Geoserver info](index.html#subpage-jsapi_2_0_0-js-geoserver-info.md) — per-geoserver capabilities and limits
- REST endpoint: `GET service/acl/1.0/user/details`
