# 🛰️ Get a satellite image with WMS 1.3.0

This tutorial shows how to obtain a **satellite raster image** from BeMap with the **WMS 1.3.0** protocol, using the `herehlp` geo-server.

The request used all along this tutorial is the following one — a single 256 × 256 satellite tile of the French Riviera, north of Antibes:

```
{"bemap":{"language":"request"}}
GET ${HOST_URL}/bgis/wms?REQUEST=GetMap&SERVICE=WMS&VERSION=1.3.0&FORMAT=image%2Fpng&STYLES=&TRANSPARENT=false&geoserver=herehlp&LAYERS=here-satellite.day&TILED=true&WIDTH=256&HEIGHT=256&CRS=EPSG%3A3857&BBOX=786384.1469978951%2C5411741.602590479%2C787607.1394504579%2C5412964.595043042
```

Everything that makes this request work — and that makes a hand-written one fail — is explained below.

## Summary

1. Prerequisites
2. Anatomy of the request
3. Selecting the satellite layer
4. Building a valid BBOX (the tricky part)
5. Sending the request
6. Reading the response
7. Displaying satellite tiles in a map client
8. Troubleshooting



## 1. Prerequisites

| Item | Value |
|------|-------|
| End point | `https://[environment]/bgis/wms` |
| Environments | `bemap-prod`, `bemap-preprod`, `bemap-beta`, or `localhost:8380` |
| Protocol | WMS `1.3.0` |
| Geo-server | `herehlp` |
| Credentials | An account allowed to use the `herehlp` geo-server |

Authentication is the standard BeMap one (HTTP `Authorization: Basic`, `X-Auth-ID`, `SESSION` cookie, or the deprecated `appid` / `appcode` URL parameters). See the [authentication page](index.html#page-authentication.md).

> 📌 The `herehlp` geo-server is **not** listed in the *Geo-server* selector of this documentation portal. It must always be requested explicitly with the `geoserver=herehlp` parameter.



## 2. Anatomy of the request

`GetMap` is a plain HTTP `GET`: all the parameters live in the query string, and every value must be URL-encoded (`image/png` → `image%2Fpng`, `EPSG:3857` → `EPSG%3A3857`, the `,` of the `BBOX` → `%2C`).

| Parameter | Value in the example | Role |
|-----------|----------------------|------|
| `SERVICE` | `WMS` | Mandatory. Protocol name. |
| `VERSION` | `1.3.0` | Mandatory. Protocol version. |
| `REQUEST` | `GetMap` | Mandatory. Operation returning an image. |
| `CRS` | `EPSG:3857` | Mandatory. Coordinate reference system of the `BBOX`. |
| `BBOX` | `minx,miny,maxx,maxy` | Mandatory. Area to render, expressed in the `CRS` units. |
| `WIDTH` / `HEIGHT` | `256` / `256` | Mandatory. Size of the returned image, in pixels. |
| `LAYERS` | `here-satellite.day` | The satellite layer, see chapter 3. |
| `STYLES` | *(empty)* | Rendering style. Empty means "use the layer default". |
| `FORMAT` | `image/png` | Output format: `image/png`, `image/png24`, `image/gif` or `image/jpeg`. Defaults to `image/png`. |
| `TRANSPARENT` | `false` | Keep it `false` for a satellite basemap. |
| `geoserver` | `herehlp` | BeMap extra parameter. Selects the data provider. |
| `TILED` | `true` | Not a WMS parameter: it is emitted by OpenLayers / Leaflet and simply ignored by BeMap. Harmless. |

Two optional parameters are worth knowing:

* `EXCEPTIONS` — how errors are reported. Accepted values are `XML` (default), `INIMAGE` (the error message is painted inside the returned image) and `BLANK` (a uniform image).
* `LANGUAGE` — ISO 639-1 language code used for the map labels. It has no visible effect on a pure satellite layer.



## 3. Selecting the satellite layer

The satellite imagery is served by the `herehlp` geo-server. The layer name is:

```
LAYERS=here-satellite.day
```

Good to know:

* The `here-` prefix is optional — `LAYERS=satellite.day` is equivalent. The prefix is stripped by the server before the provider call.
* `STYLES` accepts the same values as `LAYERS`, and **takes precedence** over `LAYERS` when both are filled. Sending an empty `STYLES` and the layer name in `LAYERS`, as in the example, is the recommended way.
* For backward compatibility, `hybrid.day` and `terrain.day` are also mapped to the satellite rendering, while `normal.day` and `default` are mapped to the standard rendering.
* Depending on the deployment, the `herehlp` geo-server can be configured in *satellite only* mode. In that case every `GetMap` on this geo-server returns satellite imagery, whatever `LAYERS` and `STYLES` contain.
* `GetCapabilities` on `geoserver=herehlp` does not advertise a layer list: use the layer names documented here.



## 4. Building a valid BBOX (the tricky part)

Satellite imagery is made of **pre-rendered raster tiles**, not of a map drawn on demand. BeMap therefore only serves `GetMap` requests whose `BBOX` matches exactly one cell of its internal tile grid. A free-form bounding box — an arbitrary rectangle around a city, for instance — is rejected with a rendering error.

### The tile grid

| Property | Value |
|----------|-------|
| Projection | Web Mercator (`EPSG:3857`, also accepted as `EPSG:3785` and `EPSG:900913`) |
| World extent | `-20037508.34` … `20037508.34` on both axes |
| Tile size | `256` × `256` pixels |
| Zoom levels | `0` … `20` |
| Resolution at level *z* | `156543.03390625 / 2^z` metres per pixel |

Two direct consequences:

* **`WIDTH` and `HEIGHT` must be `256`.** Larger sizes are rejected by the tile cache rules.
* **`TRANSPARENT` must stay `false`** to benefit from the tile cache: a transparent request bypasses it.

### Formulas

For a tile `(z, x, y)` given in the usual XYZ convention (`y` counted from the **north**):

```
{"bemap":{"language":"javascript"}}
var ORIGIN = -20037508.34;                     // Web Mercator world origin
var SPAN   = 40075016.68 / Math.pow(2, z);     // size of one tile, in metres

var minx =  ORIGIN + x * SPAN;
var maxx =  minx + SPAN;
var miny = -ORIGIN - (y + 1) * SPAN;
var maxy =  miny + SPAN;

var bbox = minx + ',' + miny + ',' + maxx + ',' + maxy;
```

And to go from a geographic position to a tile:

```
{"bemap":{"language":"javascript"}}
function lonLatToTile(lon, lat, z) {
    var n = Math.pow(2, z);
    var rad = lat * Math.PI / 180;
    return {
        x: Math.floor((lon + 180) / 360 * n),
        y: Math.floor((1 - Math.log(Math.tan(rad) + 1 / Math.cos(rad)) / Math.PI) / 2 * n),
        z: z
    };
}

lonLatToTile(7.0697, 43.6559, 15);   // → { x: 17027, y: 11958, z: 15 }
```

### Worked example

The request at the top of this page is exactly the tile `z = 15`, `x = 17027`, `y = 11958`:

| Step | Result |
|------|--------|
| `SPAN` at level 15 | `40075016.68 / 32768` = `1222.9924523925781` m |
| Resolution | `1222.99245… / 256` = `4.777314267…` m/pixel |
| `minx` | `-20037508.34 + 17027 × 1222.99245…` = `786384.146…` |
| `miny` | `20037508.34 - 11959 × 1222.99245…` = `5411741.601…` |
| `maxx`, `maxy` | `minx + SPAN`, `miny + SPAN` |
| Geographic footprint | ≈ `7.0642, 43.6520` → `7.0752, 43.6599` (WGS84) |

The server accepts a tolerance of one pixel on the tile corners, which is why the values sent by a map client (`786384.1469978951`, …) and the values recomputed above are accepted even though their last decimals differ.

### If you use CRS=EPSG:4326

WMS 1.3.0 changed the axis order for geographic CRS. With `CRS=EPSG:4326` the bounding box must be written **latitude first**:

```
&CRS=EPSG%3A4326&BBOX=minLat%2CminLon%2CmaxLat%2CmaxLon
```

With `EPSG:3857` (and the other Mercator codes) the order stays `minx,miny,maxx,maxy` — easting first. This axis inversion is the main incompatibility between a WMS 1.1.1 request and its 1.3.0 counterpart.



## 5. Sending the request

### With cURL

```
curl -o tile.png \
  -H "Authorization: Basic <base64 of account:apikey>" \
  "https://bemap-beta.benomad.com/bgis/wms?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&geoserver=herehlp&LAYERS=here-satellite.day&STYLES=&FORMAT=image%2Fpng&TRANSPARENT=false&WIDTH=256&HEIGHT=256&CRS=EPSG%3A3857&BBOX=786384.1469978951%2C5411741.602590479%2C787607.1394504579%2C5412964.595043042"
```

### From a browser

Once authenticated on the BeMap host (form login or `SESSION` cookie), pasting the full URL in the address bar displays the tile directly.



## 6. Reading the response

On success the server returns the raw image bytes with:

| Header | Content |
|--------|---------|
| `Content-Type` | The MIME type of `FORMAT`, for example `image/png` |
| `Last-Modified` | Date of the cached tile, when it comes from the tile cache |
| `Cache-Control` | Server-side caching policy |

Sending an `If-Modified-Since` header on the next call for the same tile makes the server answer `304 Not Modified` with no payload — use it to spare bandwidth in a tile-heavy client.

On failure the response is a WMS service exception, formatted according to `EXCEPTIONS` (XML by default).



## 7. Displaying satellite tiles in a map client

Both examples below produce exactly the request documented in this tutorial, tile after tile, as the user pans and zooms.

### OpenLayers

```
{"bemap":{"language":"javascript"}}
var satellite = new ol.layer.Tile({
    source: new ol.source.TileWMS({
        url: '/bgis/wms',
        params: {
            'VERSION':     '1.3.0',
            'geoserver':   'herehlp',
            'LAYERS':      'here-satellite.day',
            'STYLES':      '',
            'FORMAT':      'image/png',
            'TRANSPARENT': false,
            'TILED':       true
        }
    })
});

var map = new ol.Map({
    target: 'map1',
    layers: [satellite],
    view: new ol.View({
        projection: 'EPSG:3857',
        center: ol.proj.transform([7.0697, 43.6559], 'EPSG:4326', 'EPSG:3857'),
        zoom: 15,
        maxZoom: 20
    })
});
```

`ol.source.TileWMS` emits tile-aligned bounding boxes by construction, so the grid constraint of chapter 4 is satisfied automatically.

### Leaflet

```
{"bemap":{"language":"javascript"}}
var map = L.map('map1').setView([43.6559, 7.0697], 15);

L.tileLayer.wms('/bgis/wms', {
    version:     '1.3.0',
    geoserver:   'herehlp',
    layers:      'here-satellite.day',
    styles:      '',
    format:      'image/png',
    transparent: false,
    tiled:       true,
    maxZoom:     20
}).addTo(map);
```

> 📌 From outside the BeMap host, append the credentials to the WMS URL — `'https://<host>/bgis/wms?appid=<login>&appcode=<password>'` — or configure your client to send the `Authorization` header.



## 8. Troubleshooting

| Symptom | Cause | Fix |
|---------|-------|-----|
| `InvalidCRS` exception | `CRS` missing, misspelled or not supported | Use `EPSG:3857` (or `EPSG:4326`, `EPSG:4979`, `EPSG:3785`, `EPSG:900913`) |
| `MissingDimensionValue` / `InvalidDimensionValue` | `BBOX`, `WIDTH` or `HEIGHT` missing or malformed | The four `BBOX` values are required, comma-separated and URL-encoded |
| `InvalidFormat` | Unsupported `FORMAT` | `image/png`, `image/png24`, `image/gif`, `image/jpeg` |
| `Unable to perform mapping with provider HereHlp` | The `BBOX` does not match a tile of the grid, or its resolution does not match a zoom level | Recompute the `BBOX` with the formulas of chapter 4 |
| Error on a large image | `WIDTH` or `HEIGHT` greater than `256` | Request 256 × 256 tiles and assemble them client-side |
| The returned image is a standard map, not satellite | Layer name not recognised, or `STYLES` overriding `LAYERS` | Send `LAYERS=here-satellite.day` with an empty `STYLES` |
| `401` or a login page is returned | Missing or invalid credentials | See [authentication](index.html#page-authentication.md) |
| Rendering works on another geo-server but not here | The account is not allowed to use `herehlp` | Contact your BeNomad account manager |



## See also

* [WMS 1.3.0 — GetMap](index.html#page-mapping-wms-1-3-0-getmap.md) — the complete parameter reference.
* [WMS 1.3.0 — GetCapabilities](index.html#page-mapping-wms-1-3-0-getcapabilities.md) — server metadata.
* [WMS 1.3.0 — GetFeatureInfo](index.html#page-mapping-wms-1-3-0-getfeatureInfo.md) — querying features under a pixel.
* [Coordinate system](index.html#page-glossary-coordinate_system.md) — projections and axis orders.
* [Map display with OpenLayers](index.html#page-examples-mapping-display-ol4.md) · [Map display with Leaflet](index.html#page-examples-mapping-display-leaflet-raw.md) — ready-to-run basemap templates.
* [Authentication](index.html#page-authentication.md) — credentials and request signing.
