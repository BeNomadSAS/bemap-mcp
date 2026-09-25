<span class="bemap-tag">Foundations</span>

# The Context — `bemap.Context`

<p class="bemap-tagline">Every BeMap JS API call goes through a <code>bemap.Context</code>. It carries credentials, host, geoserver, and (for EV / charging) the matching provider hints. It is the only stateful object you need to keep around.</p>

## At a glance

<ul class="bemap-glance">
<li>Constructed once at app start; reused by every service class.</li>
<li>Carries auth (<code>login</code>, <code>password</code>) + target (<code>host</code>, <code>secure</code>) + defaults (<code>geoserver</code>, <code>chargingStationProvider</code>).</li>
<li data-right="ROLE_MAPPING and ROLE_MAPPING_MPTILES">For MapLibre vector tiles: add <code>tilesHost</code> + <code>tokenStorage</code>.</li>
<li>Per-request override on every request object (<code>request.geoserver</code>, <code>request.providers</code>, …).</li>
<li>Discover allowed geoservers / CSPs at runtime via <a href="index.html#subpage-jsapi_2_0_0-js-acl-service.md"><code>bemap.AclService</code></a>.</li>
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

### Discover ACL grants instead of hard-coding

```js
bemap.helpers.listGeoservers(ctx).then(function(items) {
    // items: Array<AclLabel> — getKey() / getValue() / isDefault()
});

bemap.helpers.listChargingStationProviders(ctx).then(function(items) {
    // same shape — driven by the user's ACL
});
```

### Per-request override

Every v2 request object accepts an optional `geoserver` field that overrides the Context's default for that call only:

```js
new bemap.RoutingRequest({
    destinations: [a, b],
    geoserver: 'osm'   // override ctx.geoserver
});
```

Likewise: `ChargingStationSearchRequest.providers` and `EvSmartRoutingRequest.chargingStationProviders` override `ctx.chargingStationProvider`.

## Reference

### Constructor fields

<table>
<thead><tr><th>Field</th><th>Type</th><th style="text-align:center">Required</th><th>Notes</th></tr></thead>
<tbody>
<tr><td><code>login</code></td><td>String</td><td style="text-align:center">✓</td><td>Customer login.</td></tr>
<tr><td><code>password</code></td><td>String</td><td style="text-align:center">✓</td><td>Paired with <code>login</code> for HTTP Basic auth.</td></tr>
<tr><td><code>host</code></td><td>String</td><td style="text-align:center">✓</td><td>Hostname only (<code>bemap-beta.benomad.com</code>), no scheme.</td></tr>
<tr><td><code>secure</code></td><td>Boolean</td><td style="text-align:center">—</td><td><code>true</code> → HTTPS, <code>false</code> → HTTP. Default: <code>true</code>.</td></tr>
<tr><td><code>geoserver</code></td><td>String</td><td style="text-align:center">—</td><td>Default geoserver (<code>here</code>, <code>osm</code>, <code>addok</code>, …). Per-request overridable.</td></tr>
<tr><td><code>chargingStationProvider</code></td><td>String</td><td style="text-align:center">—</td><td>Default CSP for <code>bemap.ChargingStations</code> / <code>bemap.EvSmartRouting</code>.</td></tr>
<tr data-right="ROLE_MAPPING and ROLE_MAPPING_MPTILES"><td><code>tilesHost</code></td><td>String</td><td style="text-align:center">—</td><td>Host serving PMTiles + the tile-auth endpoint. Only for MapLibre vector tiles. See <a href="index.html#subpage-jsapi_2_0_0-js-tiles-web-pmtiles.md">Web — PMTiles</a>.</td></tr>
<tr data-right="ROLE_MAPPING and ROLE_MAPPING_MPTILES"><td><code>tilesFallbackToDefault</code></td><td>Boolean</td><td style="text-align:center"><code>false</code></td><td>When the Worker serves no vector map for <code>geoserver</code> (<code>addok</code>, <code>photon</code>, <code>herehlp</code>, …): <code>false</code> (default) leaves the MapLibre basemap empty, so the map never shows another provider's data; <code>true</code> loads the Worker's default map instead.</td></tr>
<tr data-right="ROLE_MAPPING and ROLE_MAPPING_MPTILES"><td><code>tokenStorage</code></td><td>String</td><td style="text-align:center">—</td><td>Where the tiles JWT is cached: <code>'session'</code> (default, <code>sessionStorage</code>), <code>'local'</code> (<code>localStorage</code>), or <code>'memory'</code> (never persisted).</td></tr>
</tbody>
</table>

### Live snippet helper

`bemap.snippet.contextLine(ctx)` renders a copy-paste-ready `new bemap.Context({...})` string from a live Context — useful for admin UIs that show the user their current configuration. See [Snippet helpers](index.html#subpage-jsapi_2_0_0-snippet-helpers.md).

## See also

<ul>
<li><a href="index.html#subpage-jsapi_2_0_0-authentication.md">Authentication</a> — credentials, roles, ACL</li>
<li><a href="index.html#subpage-jsapi_2_0_0-js-acl-service.md"><code>bemap.AclService</code></a> — discover geoservers &amp; CSPs at runtime</li>
<li><a href="index.html#subpage-jsapi_2_0_0-snippet-helpers.md">Snippet helpers</a></li>
<li data-right="ROLE_MAPPING and ROLE_MAPPING_MPTILES"><a href="index.html#subpage-jsapi_2_0_0-js-tiles-auth.md">Sessions &amp; tokens</a> — when to set <code>tilesHost</code> / <code>tokenStorage</code></li>
</ul>
