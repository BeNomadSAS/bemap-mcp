/**
 * corrections — factual corrections applied to the documentation snapshot on read.
 *
 * The snapshot under `data/` is captured verbatim from BeNomad's own internal
 * documentation, and `snapshot.readPage()` used to hand it to the model
 * unchanged. That is right for everything the backend can be asked about — the
 * introspection is the source of truth and this server must not paraphrase it.
 * It is wrong for the handful of sentences where the upstream prose states a
 * cause that a live probe disproves: those are served to a coding assistant as
 * fact, and the assistant writes them into a customer's client. There was no
 * layer in which such a sentence could be corrected, because reading is a
 * passthrough and the snapshot is regenerated wholesale.
 *
 * This is that layer, and it is deliberately the same shape as `CORRECTIONS` in
 * the published documentation pages, which are generated from the same
 * measurements. A fact corrected for a reader of the documentation is
 * corrected here too, so the two never disagree.
 *
 * Non-obvious constraint: a stale correction must NOT throw here. The build
 * read path skips a correction it cannot apply rather than raising: an
 * exception here would turn a documentation lookup into a crash. A stale
 * correction is caught before release, not in your server.
 *
 * Every entry must cite the measurement that justifies it. A correction with no
 * live evidence behind it is an opinion overwriting the backend's own words.
 */

/**
 * Corrections keyed by page id — the path under `data/pages/`, exactly as
 * `readPage()` receives it. Each entry is `[find, replace, why]`, where `find`
 * must occur exactly once in the captured page and `why` records the probe that
 * settled it. A fourth element declares an expected occurrence count for a wrong
 * sentence the upstream repeats — the WMS reference annotates one false default on
 * four parameters of the same page. It defaults to 1 and is asserted, not assumed:
 * a resync that changes how many times the sentence occurs still fails the guard.
 *
 * @type {Record<string, Array<[string, string, string]>>}
 */
export const CORRECTIONS = {
  "general/mapping-wms-1-3-0-getcapabilities.md": [
    [
      /^(\s*)\* Possible exceptions? (?:is|are) `(?!OperationNotSupported)[A-Za-z]+Exception`(?: or `[A-Za-z]+Exception`)?\.[ \t]*$/gm,
      "$1* The exception code is `FrontendException`, as it is for essentially every WMS failure. The one code with a distinct cause is `OperationNotSupported`, raised only when the `EXCEPTIONS` value itself is refused.",
      "Probed on prod 4 September 2026: a malformed BBOX, a missing WIDTH/HEIGHT/I/J and an unsupported FORMAT all answer FrontendException. OperationNotSupported has exactly one cause, a refused EXCEPTIONS value.",
      1,
    ],
  ],
  "general/mapping-wms-1-1-1-getcapabilities.md": [
    [
      /^(\s*)\* Possible exceptions? (?:is|are) `(?!OperationNotSupported)[A-Za-z]+Exception`(?: or `[A-Za-z]+Exception`)?\.[ \t]*$/gm,
      "$1* The exception code is `FrontendException`, as it is for essentially every WMS failure. The one code with a distinct cause is `OperationNotSupported`, raised only when the `EXCEPTIONS` value itself is refused.",
      "Probed on prod 4 September 2026: a malformed BBOX, a missing WIDTH/HEIGHT/I/J and an unsupported FORMAT all answer FrontendException. OperationNotSupported has exactly one cause, a refused EXCEPTIONS value.",
      1,
    ],
  ],
  "general/mapping-wms-1-3-0-getfeatureInfo.md": [
    [
      /^(\s*)\* Possible exceptions? (?:is|are) `(?!OperationNotSupported)[A-Za-z]+Exception`(?: or `[A-Za-z]+Exception`)?\.[ \t]*$/gm,
      "$1* The exception code is `FrontendException`, as it is for essentially every WMS failure. The one code with a distinct cause is `OperationNotSupported`, raised only when the `EXCEPTIONS` value itself is refused.",
      "Probed on prod 4 September 2026: a malformed BBOX, a missing WIDTH/HEIGHT/I/J and an unsupported FORMAT all answer FrontendException. OperationNotSupported has exactly one cause, a refused EXCEPTIONS value.",
      10,
    ],
    [
      "##### __SRS__: Spatial Reference System (SRS) identifier the map is returned in.",
      "##### __CRS__: Coordinate Reference System identifier the map is returned in. **This page names the parameter `SRS`, which is the 1.1.1 spelling; version 1.3.0 takes `CRS`.** The two versions also read `BBOX` in opposite orders \u2014 `1.3.0` with `EPSG:4326` is `minLat,minLon,maxLat,maxLon` and `1.1.1` is `minLon,minLat,maxLon,maxLat` \u2014 and omitting `VERSION` silently selects `1.1.1`.",
      "Probed on prod: 43.702,7.266,43.704,7.268 answers BUILDING in Nice under 1.3.0 and COUNTRY Ethiopia under 1.1.1, both 200.",
    ],
    [
      "* Default value: `-1`.",
      "* No default value: the server rejects the request if the parameter is omitted, and sending `-1` draws the identical rejection.",
      "Probed on prod: omitting the parameter answers FrontendException, \"the server did not declare a default value for that dimension\", and sending the documented default draws the identical rejection. There is no default.",
      4,
    ],
  ],
  "rest_1_0_0/tutorials-routing-service-v1_0_0-modes.md": [
    [
      "## \ud83e\udded `MODE_N_TO_N` \u2013 Full NxN route matrix",
      "## \ud83e\udded `MODE_N_TO_N` \u2013 Every ordered pair of distinct points (n\u00b2\u2212n, not a full NxN matrix)",
      "Measured on prod: 2 coordinates return 2 routes, 3 return 6, 4 return 12 \u2014 n2-n. Only MODE_MATRIX with matrixStartCount:0 returns n2.",
    ],
    [
      "Returns **16 route combinations** (4x4), including every possible origin/destination pair.",
      "Returns **12 route combinations** (4x4 minus the four self-pairs), covering every ordered pair of *distinct* points. `MODE_N_TO_N` returns n\u00b2\u2212n, not n\u00b2 \u2014 a point is never paired with itself. Only `MODE_MATRIX` with `matrixStartCount: 0` returns n\u00b2, so the two modes disagree about the diagonal and their counts are not interchangeable.",
      "Measured on prod: 2 coordinates return 2 routes, 3 return 6, 4 return 12 \u2014 n2-n. Only MODE_MATRIX with matrixStartCount:0 returns n2."
    ],
  ],
  "general/mapping-wms-1-3-0-getmap.md": [
    [
      /^(\s*)\* Possible exceptions? (?:is|are) `(?!OperationNotSupported)[A-Za-z]+Exception`(?: or `[A-Za-z]+Exception`)?\.[ \t]*$/gm,
      "$1* The exception code is `FrontendException`, as it is for essentially every WMS failure. The one code with a distinct cause is `OperationNotSupported`, raised only when the `EXCEPTIONS` value itself is refused.",
      "Probed on prod 4 September 2026: a malformed BBOX, a missing WIDTH/HEIGHT/I/J and an unsupported FORMAT all answer FrontendException. OperationNotSupported has exactly one cause, a refused EXCEPTIONS value.",
      7,
    ],
    [
      "* Default value: `256`.",
      "* No default value: the server rejects the request if the parameter is omitted.",
      "Probed on prod: omitting the parameter answers FrontendException, \"the server did not declare a default value for that dimension\", and sending the documented default draws the identical rejection. There is no default.",
      2,
    ],
  ],
  "general/tutorials-mapping-wms-1_3_0-satellite.md": [
    [
      "| `InvalidCRS` exception | `CRS` missing, misspelled or not supported |",
      "| `FrontendException` naming the CRS | `CRS` missing, misspelled or not supported |",
      "Probed on prod 4 September 2026: the WMS exception code is FrontendException for a malformed BBOX, a missing WIDTH/HEIGHT/I/J and an unsupported FORMAT alike. OperationNotSupported has exactly one cause, a refused EXCEPTIONS value.",
    ],
    [
      "| `MissingDimensionValue` / `InvalidDimensionValue` | `BBOX`, `WIDTH` or `HEIGHT` missing or malformed |",
      "| `FrontendException` | `BBOX`, `WIDTH` or `HEIGHT` missing or malformed |",
      "Probed on prod 4 September 2026: the WMS exception code is FrontendException for a malformed BBOX, a missing WIDTH/HEIGHT/I/J and an unsupported FORMAT alike. OperationNotSupported has exactly one cause, a refused EXCEPTIONS value.",
    ],
    [
      "| `InvalidFormat` | Unsupported `FORMAT` |",
      "| `FrontendException` | Unsupported `FORMAT` |",
      "Probed on prod 4 September 2026: the WMS exception code is FrontendException for a malformed BBOX, a missing WIDTH/HEIGHT/I/J and an unsupported FORMAT alike. OperationNotSupported has exactly one cause, a refused EXCEPTIONS value.",
    ],
    [
      "| `401` or a login page is returned | Missing or invalid credentials |",
      "| A login page is returned (HTTP `302`, never `401`) | Missing or invalid credentials |",
      "Everything on BeMap is behind auth, static assets included, and an unauthenticated request answers 302 to /bgis/login.html \u2014 never 401. A missing entitlement is 400 \"Access Denied\". Probed on prod.",
    ],
  ],
  "jsapi_2_0_0/js-tiles-web-pmtiles.md": [
    [
      "`204` is a **z/x/y** behaviour, see [Mobile &amp; fleet](index.html#subpage-jsapi_2_0_0-js-tiles-mobile-zxy.md).",
      "On the z/x/y wire an empty tile inside the zoom range answers `200` with a near-empty body; `204` there means the zoom is above the archive maxzoom (14), see [Mobile &amp; fleet](index.html#subpage-jsapi_2_0_0-js-tiles-mobile-zxy.md).",
      "Measured on prod and beta at z5, z8, z10 and z14: an empty tile inside the archive zoom range answers 200 with a 36-41 byte MVT body. 204 appears only at z15 and above, past the archive maxzoom of 14.",
    ],
  ],
  "jsapi_2_0_0/install.md": [
    [
      "so a login that works for one service can legitimately return `403` on another.",
      "so a login that works for one service can legitimately answer `400 \"Access Denied\"` on another \u2014 BeMap never returns `403`.",
      "Everything on BeMap is behind auth, static assets included, and an unauthenticated request answers 302 to /bgis/login.html \u2014 never 401. A missing entitlement is 400 \"Access Denied\". Probed on prod.",
    ],
    [
      "<strong><code>401</code> on every service call, tiles fine (or the reverse).</strong> The two authenticate separately \u2014 the tiles worker is a different origin with its own login.",
      "<strong>Every service call rejected, tiles fine (or the reverse).</strong> The two authenticate separately \u2014 the tiles worker is a different origin with its own login, and it is the only one of the two that returns <code>401</code>; BeMap answers <code>302</code> to its login page instead.",
      "Everything on BeMap is behind auth, static assets included, and an unauthenticated request answers 302 to /bgis/login.html \u2014 never 401. A missing entitlement is 400 \"Access Denied\". Probed on prod.",
    ],
  ],
  "jsapi_2_0_0/js-tiles-mobile-zxy.md": [
    [
      "<li><strong>204 No Content</strong> on an out-of-data tile (open ocean) is normal \u2014 \"nothing to draw here\", not an error.</li>",
      "<li><strong>204 No Content</strong> means the requested zoom is <em>above the archive maxzoom</em> (14) \u2014 ask for a lower zoom and overzoom client-side. An empty tile <em>inside</em> the zoom range is a <strong>200</strong> with a near-empty body, not a 204.</li>",
      "Measured on prod and beta at z5, z8, z10 and z14: an empty ocean tile inside the archive zoom range answers 200 with a 36-41 byte MVT body. 204 appears only at z15 and above, past the archive maxzoom of 14.",
    ],
    [
      "# 200 with a tile body, or 204 when the tile is empty",
      "# 200 with a tile body (empty tiles included), or 204 above maxzoom",
      "Measured on prod and beta at z5, z8, z10 and z14: an empty ocean tile inside the archive zoom range answers 200 with a 36-41 byte MVT body. 204 appears only at z15 and above, past the archive maxzoom of 14.",
    ],
    [
      "| `GET /<map>/{z}/{x}/{y}.pbf?token=<JWT>` | **200** tile \u00b7 **204** empty | MVT (protobuf), gzip-encoded. |",
      "| `GET /<map>/{z}/{x}/{y}.pbf?token=<JWT>` | **200** tile, empty tiles included \u00b7 **204** above maxzoom | MVT (protobuf), gzip-encoded. |",
      "Measured on prod and beta at z5, z8, z10 and z14: an empty ocean tile inside the archive zoom range answers 200 with a 36-41 byte MVT body. 204 appears only at z15 and above, past the archive maxzoom of 14.",
    ],
    [
      "| `204` | Empty tile, no body | Draw nothing. **Not an error.** |",
      "| `204` | Zoom above the archive maxzoom (14), no body | Request a lower zoom and overzoom client-side. **Not an error.** |",
      "Measured on prod and beta at z5, z8, z10 and z14: an empty ocean tile inside the archive zoom range answers 200 with a 36-41 byte MVT body. 204 appears only at z15 and above, past the archive maxzoom of 14.",
    ],
    [
      "- **`204` treated as failure.** Clients that only special-case `200` will log errors, retry, and burn rate limit over open ocean. Handle `204` as an empty tile.",
      "- **`204` treated as failure.** It means the zoom is above the archive maxzoom (14), not that the tile is empty \u2014 an empty tile is a `200` with a near-empty body. Clamp the request zoom and overzoom client-side rather than retrying.",
      "Measured on prod and beta at z5, z8, z10 and z14: an empty ocean tile inside the archive zoom range answers 200 with a 36-41 byte MVT body. 204 appears only at z15 and above, past the archive maxzoom of 14.",
    ],
  ],
  "jsapi_2_0_0/js-tiles-troubleshooting.md": [
    [
      "a <code>204</code> is not an error at all.",
      "a <code>204</code> is not an error at all \u2014 it means the zoom is above the archive maxzoom (14).",
      "Measured on prod and beta at z5, z8, z10 and z14: an empty ocean tile inside the archive zoom range answers 200 with a 36-41 byte MVT body. 204 appears only at z15 and above, past the archive maxzoom of 14.",
    ],
    [
      "<li><code>204</code> is a legitimately empty tile (ocean, desert). Do not decode it, do not report it.</li>",
      "<li><code>204</code> means the requested zoom is above the archive maxzoom (14), not that the tile is empty \u2014 an empty tile is a <code>200</code> with a near-empty body. Clamp the zoom and overzoom client-side; do not report it as a failure.</li>",
      "Measured on prod and beta at z5, z8, z10 and z14: an empty ocean tile inside the archive zoom range answers 200 with a 36-41 byte MVT body. 204 appears only at z15 and above, past the archive maxzoom of 14.",
    ],
    [
      "# 5. A z/x/y MVT tile \u2014 expect 200, or 204 if the tile is legitimately empty",
      "# 5. A z/x/y MVT tile \u2014 expect 200 (empty tiles included), or 204 above maxzoom 14",
      "Measured on prod and beta at z5, z8, z10 and z14: an empty ocean tile inside the archive zoom range answers 200 with a 36-41 byte MVT body. 204 appears only at z15 and above, past the archive maxzoom of 14.",
    ],
    [
      "| `204` | Empty tile | The z/x/y tile contains no feature (ocean, desert, out of coverage) | **Not an error.** Skip decoding and render nothing. Reporting `204` as a failure is the single most common false alarm. |",
      "| `204` | Zoom above maxzoom | The requested zoom is above the archive maxzoom (14). An empty tile *inside* the range is a `200` with a near-empty body, never a `204`. | **Not an error.** Request a lower zoom and overzoom client-side. Reporting `204` as a failure is the single most common false alarm. |",
      "Measured on prod and beta at z5, z8, z10 and z14: an empty ocean tile inside the archive zoom range answers 200 with a 36-41 byte MVT body. 204 appears only at z15 and above, past the archive maxzoom of 14.",
    ],
    [
      "- **`204` is not a failure.** Treat it as \"no features here\" and render nothing. Retrying an empty tile burns quota toward the `429` threshold.",
      "- **`204` is not a failure.** It says the zoom is above the archive maxzoom (14) \u2014 clamp the zoom and overzoom client-side. Retrying burns quota toward the `429` threshold.",
      "Measured on prod and beta at z5, z8, z10 and z14: an empty ocean tile inside the archive zoom range answers 200 with a 36-41 byte MVT body. 204 appears only at z15 and above, past the archive maxzoom of 14.",
    ],
  ],
  "jsapi_2_0_0/js-tiles-overview.md": [
    [
      "- [Mobile & fleet z/x/y](index.html#subpage-jsapi_2_0_0-js-tiles-mobile-zxy.md) \u2014 path C, MVT, `204` on empty tiles, gzip matrix",
      "- [Mobile & fleet z/x/y](index.html#subpage-jsapi_2_0_0-js-tiles-mobile-zxy.md) \u2014 path C, MVT, `204` above the archive maxzoom, gzip matrix",
      "Measured on prod and beta at z5, z8, z10 and z14: an empty ocean tile inside the archive zoom range answers 200 with a 36-41 byte MVT body. 204 appears only at z15 and above, past the archive maxzoom of 14.",
    ],
  ],
  "rest_1_0_0/tutorials-routing-service-v1_0_0-how_to_send_a_routing_request.md": [
    [
      "| `Authorization`   | `Bearer <your_access_token>` |",
      "| `Authorization`   | `Basic <base64(account:apikey)>` |",
      "REST services authenticate with HTTP Basic on every call. There is no bearer token and no /authenticate endpoint anywhere on the platform; probed on prod."
    ],
    [
      "> \ud83d\udee1\ufe0f You must first authenticate using the `/authenticate` endpoint to get a valid token.",
      "> \ud83d\udee1\ufe0f Every REST call carries HTTP Basic credentials: `Authorization: Basic base64(account:apikey)`. There is no token to obtain and no `/authenticate` endpoint.",
      "REST services authenticate with HTTP Basic on every call. There is no bearer token and no /authenticate endpoint anywhere on the platform; probed on prod."
    ],
    [
      "| Authorization  | Bearer `your_access_token`    |",
      "| Authorization  | Basic `base64(account:apikey)` |",
      "REST services authenticate with HTTP Basic on every call. There is no bearer token and no /authenticate endpoint anywhere on the platform; probed on prod."
    ],
    [
      "  -H \"Authorization: Bearer <your_access_token>\" \\",
      "  -H \"Authorization: Basic <base64(account:apikey)>\" \\",
      "REST services authenticate with HTTP Basic on every call. There is no bearer token and no /authenticate endpoint anywhere on the platform; probed on prod."
    ],
    [
      "\ud83d\udccc Make sure to replace <your_access_token> with a valid token retrieved from the /authenticate endpoint.",
      "\ud83d\udccc Replace <base64(account:apikey)> with your account name and API key, joined by a colon and base64-encoded. There is no token to retrieve and no /authenticate endpoint; the same header goes on every call.",
      "REST services authenticate with HTTP Basic on every call. There is no bearer token and no /authenticate endpoint anywhere on the platform; probed on prod."
    ],
  ],
  "rest_1_0_0/autocompletegeocoding-service.md": [
    [
      "> NOTE: the `geoserver` parameter must be defined to `nominatim`, `addok`, `herehlp`. Otherwise the default `geoserver` value will be used.",
      "> NOTE: the `geoserver` parameter must be set to `addok`, `nominatim` or `herehlp` \u2014 or `photon`, which exists on beta only. There is no usable fallback: an ineligible geoserver, and omitting the parameter so the environment default applies, both answer `400` rather than degrading gracefully. `nominatim` is eligible but answers `200` with an empty list for queries the other two resolve.",
      "Re-probed 4 September 2026 across beta and prod. An ineligible geoserver names its supplier (no protocol: /selectSignatures?Supplier=...); the prod default is not eligible either."
    ],
  ],
  "rest_2_0_0/tutorials-evtrip-first_trip-service-v2_0_0.md": [
    [
      "Now we have all required values to start the computation.",
      "Now we have all the values this tutorial sets. One more is required in practice: `csps`, the list of charging-station providers. The schema marks it optional, but a trip that needs a charging stop answers `400 NO_REACHABLE_STEP_POINT` (\"no compatible charging point\") without it \u2014 a trip short enough to need no charge succeeds, which is what makes the omission look harmless.",
      "Measured Paris to Lyon with a Zoe at 80%: 400 without csps, 200 with csps: [\"gireve\"]."
    ],
  ],
  "jsapi_2_0_0/js-near-poi.md": [
    [
      "    distance: 1500,                                       // metres",
      "    distance: 1000,                                       // metres \u2014 1000 is the maximum the service accepts",
      "Probed on prod: distance 5000 answers 400 ServiceException, \"distance is out of range, allowed range [0 - 1000].\""
    ],
  ],
  "jsapi_2_0_0/js-traceroute.md": [
    [
      "| `routingVehicleProfile` | `bemap.RoutingVehicleProfile` | Same shape as Routing v2. |",
      "| `routingVehicleProfile` | `bemap.RoutingVehicleProfile` | Same shape as Routing v2. **Required** \u2014 without it the service answers `400 VehicleProfileIsRequiredException`, \"Vehicle profile (vp) is required!\". |",
      "Probed on prod: traceroute without routingVehicleProfile answers 400 VehicleProfileIsRequiredException."
    ],
  ],
  "jsapi_2_0_0/glossary-enums.md": [
    [
      "Distance is as-the-crow-flies; duration is drive time. For \"the closest station\" they\nfrequently disagree, and duration is usually what the user means.",
      "Both are road-network metrics: `distance` is metres of travel along the route, not a\nstraight line, and `duration` is drive time. They still disagree for \"the closest\nstation\", and duration is usually what the user means.",
      "NearPoiResponse declares distance as \"Distance of travel in meters between the input coordinate and POI\". orderBy accepts only the four DISTANCE_*/DURATION_* values; there is no straight-line mode."
    ],
    [
      "`TRAFFIC` compiles for everyone and returns\n`403` without the grant.",
      "`TRAFFIC` compiles for everyone and the REST call answers\n`400 \"Access Denied\"` without the grant \u2014 BeMap never returns `403`.",
      "BeMap REST never answers 401 or 403. A credential failure is a 302 to /bgis/login.html; a missing entitlement is 400 \"Access Denied\" under code INTERNAL_ERROR. Probed on prod."
    ],
  ],
  "jsapi_2_0_0/authentication.md": [
    [
      "| `bemap.Error.UNAUTHORIZED` | HTTP 401 \u2014 bad credentials. Force re-login. |",
      "| `bemap.Error.UNAUTHORIZED` | Bad credentials. The REST backend answers `302` to `/bgis/login.html`, never `401`. Force re-login. |",
      "BeMap REST never answers 401 or 403. A credential failure is a 302 to /bgis/login.html; a missing entitlement is 400 \"Access Denied\" under code INTERNAL_ERROR. Probed on prod."
    ],
    [
      "| `bemap.Error.FORBIDDEN` | HTTP 403 \u2014 account doesn't have access to this service. Contact your administrator. |",
      "| `bemap.Error.FORBIDDEN` | The account lacks access to this service. The REST backend answers `400 \"Access Denied\"`, never `403`. Contact your administrator. |",
      "BeMap REST never answers 401 or 403. A credential failure is a 302 to /bgis/login.html; a missing entitlement is 400 \"Access Denied\" under code INTERNAL_ERROR. Probed on prod."
    ],
  ],
  "jsapi_2_0_0/error-handling.md": [
    [
      "| `bemap.Error.FORBIDDEN` | HTTP 403. Your account does not have access to this service \u2014 contact your administrator. |",
      "| `bemap.Error.FORBIDDEN` | Your account does not have access to this service \u2014 the REST backend answers `400 \"Access Denied\"`, never `403`. Contact your administrator. |",
      "BeMap REST never answers 401 or 403. A credential failure is a 302 to /bgis/login.html; a missing entitlement is 400 \"Access Denied\" under code INTERNAL_ERROR. Probed on prod 4 September 2026.",
    ],
    [
      "| `bemap.Error.UNAUTHORIZED` | HTTP 401. Bad credentials or expired session. |",
      "| `bemap.Error.UNAUTHORIZED` | Bad credentials or expired session. The REST backend signals this with a `302` to `/bgis/login.html`, never a `401`. |",
      "BeMap REST never answers 401 or 403. A credential failure is a 302 to /bgis/login.html; a missing entitlement is 400 \"Access Denied\" under code INTERNAL_ERROR. Probed on prod."
    ],
  ],
  "jsapi_2_0_0/glossary-error-codes.md": [
    [
      "| `bemap.Error.UNAUTHORIZED` | HTTP 401. Bad credentials or expired session. Force re-login. |",
      "| `bemap.Error.UNAUTHORIZED` | Bad credentials or expired session \u2014 the REST backend answers `302` to `/bgis/login.html`, never `401`. Force re-login. |",
      "BeMap REST never answers 401 or 403. A credential failure is a 302 to /bgis/login.html; a missing entitlement is 400 \"Access Denied\" under code INTERNAL_ERROR. Probed on prod 4 September 2026.",
    ],
    [
      "| `bemap.Error.FORBIDDEN` | HTTP 403. Credentials valid but the account lacks access.",
      "| `bemap.Error.FORBIDDEN` | Credentials valid but the account lacks access \u2014 the REST backend answers `400 \"Access Denied\"`, never `403`.",
      "BeMap REST never answers 401 or 403. A credential failure is a 302 to /bgis/login.html; a missing entitlement is 400 \"Access Denied\" under code INTERNAL_ERROR. Probed on prod."
    ],
  ],
  "jsapi_2_0_0/js-autocomplete.md": [
    [
      "On the public beta server use <code>nominatim</code>.",
      "On the public beta server use <code>herehlp</code> or <code>addok</code>; <code>nominatim</code> is eligible but answers <code>200</code> with an empty list for queries the other two resolve.",
      "Probed on prod and beta 4 September 2026: herehlp and addok both return results, nominatim returns {\"items\":[]}."
    ],
  ],
  "rest_1_0_0/currency-rate-service.md": [
    [
      "No parameters are required by this service.",
      "One parameter is required: `code`, the ISO currency code \u2014 `?code=USD`. A call without it, or one sending `from`/`to`, answers `400 \"Required request parameter 'code' ... is not present\"`. (`from`/`to` belong to `currency/1.0/convert`, whose amount field is `value`, not `amount`.)",
      "Probed on prod: ?code=USD answers 200 {base, code, rate, label}; ?from=EUR&to=USD and a bare call both answer 400."
    ],
  ],
  "rest_1_0_0/tutorials-chargingstation-service-v1_0_0-parameters.md": [
    [
      "The `maxPoolResult` parameter sets an upper limit on the **number of** `ChargingStationPool` **objects** the API will return.",
      "The `maxPoolResult` parameter sets an upper limit on the number of `ChargingStationPool` objects returned **per provider**, not overall \u2014 with six providers wired up, `2` returns 12. Pair it with `providers` to get a fixed response size.",
      "Measured on prod: one unbounded Paris search returns 449 pools and 5.4 MB."
    ],
    [
      "Each pattern is used to **include or prioritize** charging stations that match specific criteria.",
      "Each pattern **excludes** every charging station it does not match, unless it carries an action \u2014 `-> prefCoeff=\u2026;` \u2014 in which case it weights the matches instead of excluding the rest. The difference decides whether an unreachable preference answers a route or a `400`.",
      "Measured on preprod 7 September 2026, Paris\u2192Lyon: a bare `pool.brand /= /.*(Electra).*/i` answers 400 NO_REACHABLE_STEP_POINT; the same pattern with `-> prefCoeff=10.0;` answers 200. `prioritize` describes only the action form."
    ],
    [
      "- Improperly formatted filters will be **ignored silently**.",
      "- A malformed filter is **not** ignored: the action is dropped and the pattern is applied as an exclusion rule, which turns a preference into a hard filter. Omitting the action's trailing `;` is the common case \u2014 `-> prefCoeff=10.0` without it answers `400 NO_REACHABLE_STEP_POINT` where `-> prefCoeff=10.0;` answers 200.",
      "Measured on preprod 7 September 2026, Paris\u2192Lyon, same body twice: `pool.brand /= /.*(tesla).*/i -> prefCoeff=10.0` (no semicolon) \u2192 400; with the semicolon \u2192 200 and Tesla stops chosen."
    ],
  ],
  "general/mapping-wms-1-1-1-getfeatureInfo.md": [
    [
      /^(\s*)\* Possible exceptions? (?:is|are) `(?!OperationNotSupported)[A-Za-z]+Exception`(?: or `[A-Za-z]+Exception`)?\.[ \t]*$/gm,
      "$1* The exception code is `FrontendException`, as it is for essentially every WMS failure. The one code with a distinct cause is `OperationNotSupported`, raised only when the `EXCEPTIONS` value itself is refused.",
      "Probed on prod 4 September 2026: a malformed BBOX, a missing WIDTH/HEIGHT/I/J and an unsupported FORMAT all answer FrontendException. OperationNotSupported has exactly one cause, a refused EXCEPTIONS value.",
      10,
    ],
    [
      "* Default value: `-1`.",
      "* No default value: the server rejects the request if the parameter is omitted, and sending `-1` draws the identical rejection.",
      "Probed on prod: omitting the parameter answers FrontendException, \"the server did not declare a default value for that dimension\", and sending the documented default draws the identical rejection. There is no default.",
      4,
    ],
  ],
  "general/mapping-wms-1-1-1-getmap.md": [
    [
      /^(\s*)\* Possible exceptions? (?:is|are) `(?!OperationNotSupported)[A-Za-z]+Exception`(?: or `[A-Za-z]+Exception`)?\.[ \t]*$/gm,
      "$1* The exception code is `FrontendException`, as it is for essentially every WMS failure. The one code with a distinct cause is `OperationNotSupported`, raised only when the `EXCEPTIONS` value itself is refused.",
      "Probed on prod 4 September 2026: a malformed BBOX, a missing WIDTH/HEIGHT/I/J and an unsupported FORMAT all answer FrontendException. OperationNotSupported has exactly one cause, a refused EXCEPTIONS value.",
      7,
    ],
    [
      "* Default value: `256`.",
      "* No default value: the server rejects the request if the parameter is omitted.",
      "Probed on prod: omitting the parameter answers FrontendException, \"the server did not declare a default value for that dimension\", and sending the documented default draws the identical rejection. There is no default.",
      2,
    ],
  ],
};

/**
 * Corrections keyed by class name — the `className` `readSchema()` receives,
 * without the `.md` suffix.
 *
 * `data/schemas/` is the introspection: the backend's own description of every
 * request and response class, and the source of truth for field names and
 * types. It is right about the shape of things and demonstrably wrong about a
 * few of their meanings — the *Optional* column disagrees with the service in
 * both directions, and a handful of descriptions state a count or a unit that a
 * probe refutes. `bemap_get_parameters` presents this table as authoritative,
 * so a wrong cell here is copied into a caller's request.
 *
 * @type {Record<string, Array<[string, string, string]>>}
 */
export const SCHEMA_CORRECTIONS = {
  "com.benomad.bgis.fe.protocol.service.v1_0_0.model.routing.RoutingRequest": [
    [
      "| __options__ |             | Comma-separated list of one or more options.",
      "| __options__ |             | JSON array of one or more options \u2014 the field is a list, not a comma-separated string.",
      "Probed live: a comma-separated string answers 400 INVALID_ARGUMENT \"Invalid request\"; a JSON array answers 200."
    ],
    [
      "| __routingCriterias__ |             | Criteria used to perform the routing calculation like shortest, fastest. Comma-separated list of one or more criteria.",
      "| __routingCriterias__ |             | Criteria used to perform the routing calculation like shortest, fastest. JSON array of one or more criteria \u2014 the field is a list, not a comma-separated string.",
      "Probed live: a comma-separated string answers 400 INVALID_ARGUMENT \"Invalid request\"; a JSON array answers 200."
    ],
    [
      "- `MODE_N_TO_N`: Computes n\u00b2 routes between each couples of a list of n coordinates.",
      "- `MODE_N_TO_N`: Computes n\u00b2\u2212n routes between each couple of distinct coordinates in a list of n \u2014 a point is never paired with itself. `MODE_MATRIX` with `matrixStartCount: 0` returns n\u00b2, so the two counts are not interchangeable.",
      "Measured on prod: 2 coordinates return 2 routes, 3 return 6, 4 return 12 \u2014 n2-n. Only MODE_MATRIX with matrixStartCount:0 returns n2."
    ],
  ],
  "com.benomad.bgis.fe.protocol.service.v2_0_0.model.evSmartRouting.request.EvSmartRoutingRequest": [
    [
      "| __csps__ |    optional | List of charging station provider names. Type: `list or array of String`. |",
      "| __csps__ |    **required in practice** | List of charging station provider names. Marked optional by the introspection, but a trip needing a charging stop answers `400 NO_REACHABLE_STEP_POINT` without it. Type: `list or array of String`. |",
      "Measured Paris to Lyon with a Zoe at 80%: 400 without csps, 200 with csps: [\"gireve\"]."
    ],
  ],
  "com.benomad.bgis.fe.protocol.service.v1_0_0.model.chargingStation.ChargingStationSearchRequest": [
    [
      "| __maxPoolResult__ |    optional | Define the maximum pools will be returned in response. Type: `int`. |",
      "| __maxPoolResult__ |    optional | Maximum pools returned **per provider**, not overall \u2014 with six providers wired up, `2` returns 12. Pair it with `providers` for a fixed response size. Type: `int`. |",
      "Measured on prod: one unbounded Paris search returns 449 pools and 5.4 MB."
    ],
    [
      "| __coordinate__ |    optional | Coordinate research center in degrees decimal (WGS84). Type: `[Coordinate]`. See details below. |",
      "| __coordinate__ |    **required** | Coordinate research center in degrees decimal (WGS84). Marked optional by the introspection; the service refuses the request with `Missing coordinate(s)`. Type: `[Coordinate]`. See details below. |",
      "Probed on prod: omitting coordinate answers 400 \"Missing coordinate(s)\"."
    ],
  ],
  "com.benomad.bgis.fe.protocol.service.v1_0_0.model.nearPoi.NearPoiRequest": [
    [
      "| __transportType__ |    optional | Define the transportation mode: Car, pedestrian, truck, etc. By default PEDESTRIAN. Default value: 'PEDESTRIAN'.",
      "| __transportType__ |    **required** | Define the transportation mode: Car, pedestrian, truck, etc. Marked optional by the introspection and refused by the service \u2014 the documented `PEDESTRIAN` default is not applied.",
      "Probed on prod: omitting transportType answers a bare 400 {\"code\":\"INTERNAL_ERROR\"}."
    ],
  ],
  "com.benomad.bgis.fe.protocol.service.v1_0_0.model.chargingStation.ChargingStationTariffsRequest": [
    [
      "| __connectorId__ |             | Unique identifier of the charging connector. Use the operator ID field from charging station search service. Type: `String`. |",
      "| __connectorId__ |             | Unique identifier of the charging connector. Take it from `connectorTypes[].operatorId` in the charging station search response (e.g. `11`) \u2014 **not** `chargingPoints[].operatorId` (e.g. `FR*V75*E9001*02*1`), which answers `200` with an empty `items` list. Type: `String`. |",
      "Probed on prod: chargingPoints[].operatorId answers 200 {\"items\":[]}; connectorTypes[].operatorId answers the tariffs."
    ],
  ],
  "com.benomad.bgis.fe.protocol.service.v1_0_0.model.geocodingService.ReverseGeocodingRequest": [
    [
      "| __options__ |    optional | Comma-separated list of one or more reverse-geocoding options.",
      "| __options__ |    optional | JSON array of one or more reverse-geocoding options \u2014 the field is a list, not a comma-separated string.",
      "Probed live: a comma-separated string answers 400 INVALID_ARGUMENT \"Invalid request\"; a JSON array answers 200."
    ],
  ],
  "com.benomad.bgis.fe.protocol.service.v1_1_0.model.vehicle.EvBrandLogoDescription": [
    [
      "| __logo__ |             | Logo of the brand. Type: `list or array of byte`. |",
      "| __logo__ |             | Logo of the brand, as a single base64-encoded PNG **string** \u2014 never a JSON array of numbers, despite the declared type. `getbrandlogo` returns `application/json` with the image in this field, not an image response. Type: `list or array of byte`. |",
      "Observed on prod: every logo and vehicle photo comes back as a base64 string."
    ],
  ],
  "com.benomad.bgis.fe.protocol.service.v1_0_0.model.vehicle.VehiclePictureDescription": [
    [
      "| __picture__ |             | Photo of the vehicle. Type: `list or array of byte`. |",
      "| __picture__ |             | Photo of the vehicle, as a single base64-encoded **string** \u2014 never a JSON array of numbers, despite the declared type. Type: `list or array of byte`. |",
      "Observed on prod: every logo and vehicle photo comes back as a base64 string."
    ],
  ],
  "com.benomad.bgis.fe.protocol.service.v1_0_0.model.routing.RoutingResponse": [
    [
      "| __jsonObject__ |             | Representation of object value by JSON. Type: `[Object]`. See details below. |",
      "| __jsonObject__ |             | The entry's payload, delivered as a **JSON string** that must be parsed \u2014 e.g. `\"{\\\\\"type\\\\\":\\\\\"SegmentInfo\\\\\",...}\"` \u2014 not as a nested object. The `EVT_ENTRY_VALUE_AS_OBJECT` option flattens those fields onto the entry and drops this one. Type: `[Object]`. See details below. |",
      "Observed on prod: entries[].jsonObject is a string on every routing response that carries events.",
      23,
    ],
  ],
};

/**
 * The body as the correction tables were written against it: LF line endings.
 *
 * Two `find` strings span a line, and a Windows checkout with
 * `core.autocrlf=true` rewrites `data/` with CRLF — at which point those two
 * stop matching and are skipped, because the read path skips rather than throws
 * (see the module banner). One of the two is the correction that stops the SDK
 * pages promising an HTTP `403` the platform never returns, so the failure is
 * both silent and load-bearing. Normalising here fixes the whole class rather
 * than the two instances: any future multi-line `find` is otherwise dead on
 * arrival on Windows. `.gitattributes` pins the checkout as well; this is the
 * half that also covers a page arriving from anywhere else.
 *
 * @param {string} body - A captured page or schema.
 * @returns {string} The same text with `\r\n` and bare `\r` reduced to `\n`.
 */
function normaliseEol(body) {
  return body.includes('\r') ? body.replace(/\r\n?/g, '\n') : body;
}

/**
 * Count how many times a correction's `find` occurs in a body.
 *
 * A `find` is normally a literal string, which is what makes an entry readable
 * and auditable. It may also be a global regular expression, for the one shape
 * where literals do not scale: the WMS reference states the same false
 * exception code on 36 parameter blocks across six pages, in eight different
 * indentations, so a literal table would need eight entries per page and would
 * silently lose a line the day the generator changes a space. The declared
 * count is asserted either way, so a regexp is no less strict than a literal —
 * it is only less repetitive.
 *
 * @param {string} body - The captured page or schema.
 * @param {string|RegExp} find - Literal text, or a global regular expression.
 * @returns {number} Occurrences found.
 */
function countMatches(body, find) {
  if (typeof find === 'string') return body.split(find).length - 1;
  return (body.match(find) || []).length;
}

/**
 * Replace every occurrence of a correction's `find`.
 *
 * @param {string} body - The captured page or schema.
 * @param {string|RegExp} find - Literal text, or a global regular expression.
 * @param {string} replace - Replacement text; `$1` etc. apply for a regexp.
 * @returns {string} The body with every occurrence replaced.
 */
function replaceAll(body, find, replace) {
  if (typeof find === 'string') return body.split(find).join(replace);
  return body.replace(find, replace);
}

/**
 * Apply the corrections listed for one snapshot page.
 *
 * A correction whose source text no longer matches exactly once is skipped
 * rather than raised: see the module banner. `checkCorrections()` is what turns
 * that silence into a test failure.
 *
 * @param {string} markdown - The captured page, exactly as read from `data/pages/`.
 * @param {string} id - The page id, e.g. `jsapi_2_0_0/js-tiles-mobile-zxy.md`.
 * @returns {string} The page with every applicable correction applied.
 */
export function correctPage(markdown, id) {
  const body = normaliseEol(markdown);
  const entries = CORRECTIONS[id];
  if (!entries) return body;

  let out = body;
  for (const [find, replace, , expected = 1] of entries) {
    if (countMatches(out, find) !== expected) continue;
    out = replaceAll(out, find, replace);
  }
  return out;
}

/**
 * Apply the corrections listed for one introspection class.
 *
 * Same skip-rather-than-throw contract as `correctPage`: see the module banner.
 *
 * @param {string} markdown - The captured schema, as read from `data/schemas/`.
 * @param {string} className - The fully qualified class name, without `.md`.
 * @returns {string} The schema with every applicable correction applied.
 */
export function correctSchema(markdown, className) {
  const body = normaliseEol(markdown);
  const entries = SCHEMA_CORRECTIONS[className];
  if (!entries) return body;

  let out = body;
  for (const [find, replace, , expected = 1] of entries) {
    if (countMatches(out, find) !== expected) continue;
    out = replaceAll(out, find, replace);
  }
  return out;
}

/**
 * Report every correction, in either table, whose source text is not present
 * exactly once in the file it targets.
 *
 * This is the staleness guard. A refreshed snapshot that rewords a corrected
 * sentence must have the claim re-verified against the live service, not
 * silently revert to the text the probe disproved.
 *
 * @param {(id: string) => Promise<string>} readPageFile - Reader for one page, by id.
 * @param {(className: string) => Promise<string>} readSchemaFile - Reader for one class.
 * @returns {Promise<Array<{kind: string, id: string, find: string, count: number, why: string}>>}
 *   One entry per stale correction; empty when every correction still applies.
 */
export async function checkCorrections(readPageFile, readSchemaFile) {
  const stale = [];

  const sweep = async (kind, table, read) => {
    for (const [id, entries] of Object.entries(table)) {
      let body;
      try {
        body = normaliseEol(await read(id));
      } catch {
        for (const [find, , why, expected = 1] of entries) stale.push({ kind, id, find, count: -1, expected, why });
        continue;
      }
      for (const [find, , why, expected = 1] of entries) {
        const count = countMatches(body, find);
        if (count !== expected) stale.push({ kind, id, find, count, expected, why });
      }
    }
  };

  await sweep('page', CORRECTIONS, readPageFile);
  if (readSchemaFile) await sweep('schema', SCHEMA_CORRECTIONS, readSchemaFile);
  return stale;
}
