<span class="bemap-tag">Foundations</span>

# Authentication

<p class="bemap-tagline">HTTP Basic auth built from <code>ctx.login</code> + <code>ctx.password</code>. No token exchange on the JS side — credentials live on <code>bemap.Context</code> for the life of the app.</p>

## At a glance

<ul class="bemap-glance">
<li>Auth lives on <code>bemap.Context</code> — set once, reused everywhere.</li>
<li>No per-call setup; every v2 service inherits the auth from the Context.</li>
<li>Account grants (services, geoservers, CSPs) are provisioned server-side — discover at runtime via <a href="index.html#subpage-jsapi_2_0_0-js-acl-service.md"><code>bemap.AclService</code></a>.</li>
<li>Failure modes: <code>bemap.Error.UNAUTHORIZED</code> (bad credentials) or <code>FORBIDDEN</code> (missing role).</li>
</ul>

## Usage

```js
var ctx = new bemap.Context({
    login:    'your-login',
    password: 'your-password',
    host:     'bemap-beta.benomad.com',
    secure:   true,
    geoserver: 'here',
    chargingStationProvider: 'ecoMovement'
});
```

<div data-right="ROLE_MAPPING and ROLE_MAPPING_MPTILES">

Rendering with MapLibre and BeNomad Tiles? Add two more fields:

```js
    tilesHost:    'mptiles-api.benomad.net',
    tokenStorage: 'session'          // or 'local' / 'memory'
```

</div>

### What credentials get you

Your BeMap account is provisioned by your administrator with:

- **A list of services you can call** (routing, geocoding, EV smart routing, charging stations, …).
- **A list of geoservers you can query** (`osm`, `here`, `addok`, `nominatim`, …) — the geographic backends available to you.
- **A list of charging-station providers you can query** (`ecoMovement`, …) — the CSP datasets available to you.

If a service you expect to use is missing — or a call fails with `bemap.Error.FORBIDDEN` — contact your administrator.

### Inspect your account at runtime

Use the [ACL service](index.html#subpage-jsapi_2_0_0-js-acl-service.md) instead of hard-coding lists:

```js
new bemap.AclService(ctx).getCurrentUserDetails().then(function(details) {
    details.getUsername();                    // String
    details.getGeoservers();                  // Array<AclLabel>
    details.getDefaultGeoserver();            // AclLabel | null
    details.getChargingStationProviders();    // Array<AclLabel>
});
```

## Reference

### Failure modes

| Error code | Meaning |
| --- | --- |
| `bemap.Error.UNAUTHORIZED` | HTTP 401 — bad credentials. Force re-login. |
| `bemap.Error.FORBIDDEN` | HTTP 403 — account doesn't have access to this service. Contact your administrator. |

See [Error handling](index.html#subpage-jsapi_2_0_0-error-handling.md).

### Hosts

| Environment | Host |
| --- | --- |
| Beta (customer testing) | `bemap-beta.benomad.com` |
| Pre-production | *confirm with BeMap support* |
| Production | *confirm with BeMap support* |

## See also

- [The Context](index.html#subpage-jsapi_2_0_0-the-context.md)
- [`bemap.AclService`](index.html#subpage-jsapi_2_0_0-js-acl-service.md)
- [Error handling](index.html#subpage-jsapi_2_0_0-error-handling.md)
