<span class="bemap-tag">ACL &amp; admin</span>

# Geoserver Info — `bemap.GeoServerInfoService`

<p class="bemap-tagline">Discover what a geoserver supports — transport modes, truck attributes, service limits (max distance, max via count, max isochrone radius, …). Use it to gate UI and pre-validate requests.</p>

## At a glance

<ul class="bemap-glance">
<li>Endpoint: <code>POST service/geoServerInfo/1.0</code>.</li>
<li>One method: <code>getInfo(geoserverName, opts?)</code> returns <code>Promise&lt;bemap.GeoServerInfoResponse&gt;</code>.</li>
<li>Helper: <code>bemap.helpers.getGeoServerInfo(ctx, geoserverName)</code> — same call, one liner.</li>
<li>Use <code>meta.hasService(name)</code> to gate UI; use <code>getServiceLimits()</code> as form hints.</li>
<li>Pair with <a href="index.html#subpage-jsapi_2_0_0-js-acl-service.md"><code>bemap.AclService</code></a> to discover <em>which</em> geoservers the user can query.</li>
</ul>

## Usage

```js
var info = new bemap.GeoServerInfoService(ctx);

info.getInfo('here', { language: 'en' }).then(function(meta) {
    console.log('transport modes:', meta.getTransportTypes());
    console.log('truck attributes:', meta.getTruckAttributes());

    if (!meta.hasService('isochrone')) {
        disableIsochroneButton();
    }

    meta.getServiceLimits().forEach(function(limit) {
        console.log(limit);
    });
});

// One-liner
bemap.helpers.getGeoServerInfo(ctx, 'here').then(handle);
```

## Reference

### Constructor

```js
new bemap.GeoServerInfoService(context)
```

### Methods

| Method | Returns | Notes |
| --- | --- | --- |
| `getInfo(geoserverName, options?)` | `Promise<bemap.GeoServerInfoResponse>` | `options` accepts `{ language?, options?, signal? }`. |

### Response — `bemap.GeoServerInfoResponse`

| Accessor | Returns |
| --- | --- |
| `getAvailableGeoServerNames()` | `Array<String>` |
| `getTransportTypes()` | `Array<String>` — `CAR`, `TRUCK`, `BICYCLE`, `PEDESTRIAN`, … |
| `getTruckAttributes()` | `Array<String>` — truck-routing attrs supported |
| `getGlobalCopyright()` | String |
| `getSupplierTerms()` | String |
| `getServicesInfo()` | `Array<bemap.GeoServerServiceInfo>` — every service the geoserver advertises |
| `getServiceLimits()` | `Array<bemap.GeoServerServiceLimit>` — per-service limits |
| `hasService(name)` | Boolean — convenience |

## Use cases

- Show only the transport modes the active geoserver supports.
- Surface max distance / max via count / max isochrone radius as form hints.
- Gate features (e.g. show the "Isochrone" tab only if the geoserver supports it).
- Pre-validate a request to avoid a server round-trip rejection.

## See also

- [Authentication](index.html#subpage-jsapi_2_0_0-authentication.md)
- [ACL service](index.html#subpage-jsapi_2_0_0-js-acl-service.md) — which geoservers the user can query
- REST endpoint: `POST service/geoServerInfo/1.0`
