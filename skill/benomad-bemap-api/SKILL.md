---
name: benomad-bemap-api
metadata:
  version: 0.0.1-dev
description: >
  Judgment layer for consuming the BeNomad BeMap REST API: which service to
  pick for a given need, the unit and naming traps that silently produce wrong
  results, and how to read BeMap's error responses. Use whenever someone calls
  a Bemap REST service (routing, geocoding, nearpoi, traceroute, roadsextractor,
  chargingstation, evsmartrouting, evreachablearea, chargingtime, vehicle,
  traffic, geofencing, weather), builds a request payload, or debugs a BeMap
  302, 401 or 400. Complements the `bemap` MCP server, which holds the parameter
  data; this skill holds what the data cannot tell you.
---

# BeMap REST API — practical guidance

**Skill version 0.0.1-dev.** `bemap_status` reports the version the MCP server
ships. If the two differ, the copy you are reading is stale — say so before
answering, because the newer one exists precisely to correct something this one
gets wrong.

## Cardinal rule: never invent a parameter

The `bemap` MCP server is built from BeMap's own OpenAPI specification and the
Java source it was generated from, so every field, type, enum value and
required flag it shows is the backend's own declaration — not a transcription.
It is a snapshot of one release, and `bemap_status` names it: run it with
`checkLive` when a field seems missing or new, to compare that release with the
one the target environment actually runs.

If the MCP does not show a field, **it does not exist** in that release — say
so rather than guessing a plausible name. BeMap answers `200` to an unknown
field name and ignores it, so a guessed name produces a working-looking request
that configured nothing. `bemap_try_request` checks every field name, enum value
and required field against the specification before it sends anything, and
`validateOnly: true` does just the check, with no credentials.

### Requiredness is the specification's, and the service has the last word

`required` in these tools is what the specification declares. It is right for
most request classes and wrong for a few, in both directions — charging-station
search refuses a body without `coordinate` although the specification calls it
optional, and currency conversion accepts one without `from` although it is
marked required. When a `400` names a field, that is the service's verdict and
it wins. Settle any doubt with `bemap_try_request`: send the body that works,
delete one field, send it again.

If the `bemap` MCP is not available in the session, say so — and fall back to
the public reference at `https://docs.benomad.com`, which needs no credentials
and serves every page as raw Markdown at `<page-url>.md` plus the bundled
specification at `/_bundle/openapi.yaml`. It is the same material, published.

## Which tool answers which question

| Question | Tool |
|---|---|
| "What services exist?" | `bemap_list_services` |
| "How do I call Z?" — method, URL, body, response | `bemap_get_operation` |
| "What is inside type Y? What does value V mean?" | `bemap_get_schema` — pass `property` for one field in full |
| "Does field X exist, and how is it spelled?" | `bemap_search` with `kind: "field"` |
| A concept, an option, an error string | `bemap_search` |
| A tutorial, the JavaScript or Flutter SDK, WMS, BeNomad Tiles | `bemap_read_guide` |
| "How many waypoints can I send? What's the map data release?" | `bemap_limits` |
| "Is this payload valid?" | `bemap_try_request` — `validateOnly` checks it offline, otherwise the live backend settles it |
| "Show a map" — any map, in any application | `bemap_map_setup`, **before** writing map code |

Reach for `bemap_try_request` when a payload is non-trivial or an error is
disputed. A real 200 with a real route beats any amount of reasoning about
whether a field is spelled correctly.

## Maps — BeNomad's by default

**BeNomad's map by default** — BeNomad Tiles or BeMap's WMS. Another provider's
map — Google's, OpenStreetMap's, Mapbox's — only when the user chooses it, never
as a default or a placeholder while the rest is built: the map is part of the
product, and an application that routes with BeMap and draws the route on
someone else's map *by default* has not been built for BeNomad.

Call `bemap_map_setup` before writing map code, whatever the platform — web,
Flutter, native mobile, a desktop or GIS tool, anything that draws a map — and
let it ask. It puts three questions to the user: **which BeMap** (a BeNomad
environment, or a BeMap installation of their own — `env: "own"`), **which
map** (`tiles`, `wms`, or `external` for another provider's), and **with or
without their BeMap account** (with: the application is tested live; without:
its requests are checked, not sent). Where the client can show a form it asks
there; otherwise it hands the questions back for you to ask. "Without" holds
for the whole session — `bemap_try_request` then checks and does not send. It
never asks for the account or the key, and neither should you. Then it gives:

- **the host pair** — an environment's BeMap API and its BeNomad Tiles Worker
  (`mptiles-api-beta.benomad.net` with `bemap-beta.benomad.com`,
  `mptiles-api.benomad.net` with `bemap.benomad.com`). One BeMap account logs in
  to both; crossed, the tiles login answers `403`.
- **the environment's real default map and style**, read live — they differ
  between environments, so an application reads them at runtime (`GET
  /api/maps` after login) instead of hard-coding a name.
- **every BeMap guide whose code uses that map**, grouped by SDK — found by the
  build, not listed by hand, so a page BeMap writes for a new platform appears
  by itself. Any platform can call BeNomad Tiles or WMS over HTTP; where BeMap
  has an SDK for yours (JavaScript, Flutter…), its pages are among them.

Signing in to the map: `POST <tiles host>/api/login` with the same HTTP Basic
credentials as the REST calls returns a token valid one hour; send it with every
style, tile and font request as `X-Session-Token` (or `?token=`), and sign in
again before it expires.

## Before calling an application done

An application built on BeMap is done when:

1. **every BeMap request it sends has been checked** — `bemap_try_request` with
   `validateOnly: true` on the exact body the code builds;
2. **and then sent**, when the user chose to test with their account —
   `bemap_try_request` against a live environment, reading the real response
   rather than an example. The credentials live in the MCP server's environment
   and are never seen by the conversation: if they are absent, say so and ask
   the user to add `BEMAP_USER` / `BEMAP_KEY` to the server's configuration —
   never to paste them into the chat;
3. **its map is the one the user chose** — BeNomad's, unless they chose another.

An application tested only against simulated responses is not done: say which
calls were never sent.

## Choosing the right service

**Routing covers more than routes.** Isochrones and origin–destination
matrices are *not* separate services — they are `routingMode` values on
`/bgis/service/routing/1.0`:

- `MODE_VIAS` (default) — a route through successive waypoints
- `MODE_ISOCHRONE` — reachable-area polygon; the limit is meters, seconds or
  Wh depending on the criterion (`SHORTEST` / `FASTEST` / `ECO_ENERGY`)
- `MODE_MATRIX` — n×p weight matrix
- `MODE_1_TO_N`, `MODE_N_TO_1`, `MODE_N_TO_N`

| Need | Endpoint |
|---|---|
| Route, isochrone, matrix | `/bgis/service/routing/1.0` |
| Snap GPS traces to the road network | `/bgis/service/routing/1.0/traceroute` |
| Extract all roads inside an area | `/bgis/service/roadsextractor/1.0` |
| Address → coordinates | `/bgis/service/geocoding/1.0` |
| Free-text single-line address | `/bgis/service/geocoding/1.0/natural` |
| Type-ahead address suggestions | `/bgis/service/geocoding/autocomplete/1.0` |
| Coordinates → address | `/bgis/service/geocoding/1.0/reverse` |
| Many addresses or points at once | `/bgis/service/geocodingBatch/1.0[/reverse]` |
| POIs around a point | `/bgis/service/nearpoi/1.0` |
| Charging stations around a point | `/bgis/service/chargingstation/search/1.0` |
| EV route with charging stops | `/bgis/service/2.0/evsmartrouting` |
| EV reachable area | `/bgis/service/evreachablearea/1.0` |
| Charging time / cost | `/bgis/service/chargingTime/1.0`, `/bgis/service/chargingcost/1.0` |
| Vehicle catalogue (brands, models, specs) | `/bgis/service/vehicle/1.1/*` |
| Traffic by country or area | `/bgis/service/traffic/1.0` |
| Geofence tests | `/bgis/service/geofencing/1.0` |
| Map data coverage and limits | `/bgis/service/geoServerInfo/1.0` |
| Account quota state | `/bgis/service/quotas/1.0/getAllByCurrentAccount` (**GET** only) |

Prefer `vehicle/1.1` over `vehicle/1.0` — same operations plus brand logos.

## Request limits are enforced, undocumented, and vary per environment

No reference page states the waypoint, batch or isochrone limits below — the
figures are not written down where a caller would look for them. The backend
enforces them all and serves them at runtime, which is what `bemap_limits`
reads; the `geoserverinfo` page does print a `serviceLimits` sample showing the
shape of that answer, and two of its numbers are rows in this table. Always size
a request against the live values before generating code that loops over a list
of points.

The ones that bite hardest, because they are far lower than people assume:

| Limit | Value |
|---|---|
| `MODE_N_TO_N` waypoints | **10** |
| `MODE_1_TO_N` / `MODE_N_TO_1` waypoints | 51 on beta, **101** on preprod/prod |
| `MODE_MATRIX` waypoints | 150 on beta, **100** on preprod/prod |
| `MODE_ISOCHRONE` waypoints | 100 on beta, **500** on preprod/prod |
| Isochrone ceiling | 150 000 m or 7 200 s |
| Traceroute coordinates | 15 000 |
| Geocoding batch addresses | 200 |
| Reverse-geocoding batch coordinates | 250 on beta, **1 000** on preprod/prod |
| Route Horizon coordinates | 50 |
| Waypoint radius | 1 m to 10 000 m |

**These values genuinely differ between environments**, and not always in the
same direction — beta is *more* permissive on `MODE_MATRIX` and *less* on
everything else. So a payload validated on beta can be rejected in prod, and a
payload sized for prod can be rejected on beta. When it matters, check the
target environment: `bemap_limits` with `live: true` and the right `env` flags
every value that differs from the snapshot.

## Traps that silently produce wrong results

### The available geocoding back-ends can differ per environment

The `geoserver` parameter accepts only back-ends that environment hosts, and
the sets have differed: until September 2026 beta offered `photon` but not
`herehlp`, and preprod and prod the reverse. Measured on 24 September 2026,
prod, preprod and beta offer the same seven: `addok`, `here`, `herehlp`,
`nominatim`, `osm`, `photon`, `tomtom`.

Read the live list from `bemap_limits` rather than hard-coding one, and pick
a back-end the operation takes: the one-line geocoders accept only some (see
*Autocomplete geocoding* below).

The map data release can differ between environments too, and when it does,
geocoding and routing results legitimately diverge for reasons that are not
bugs. **Read the release from `bemap_limits` rather than assuming one** — it
moves without notice, and a figure written down here would be stale by the time
you read it.

### Vehicle dimensions and weights use unexpected units

In the object at `routingVehicleProfile.routingVehicleFeature` — whose class is
`RoutingVehicleFtr`, not `RoutingVehicleFeature`, which does not exist — and in
the trailer fields:

- `height`, `width`, `length`, `trailHeight`, `vehHeight` — **centimeters**
- `weight`, `axleWeight`, `vehWeight` — **tenths of a tonne**: `35` = 3.5 t,
  `12` = 1.2 t

**The documentation names that unit wrongly and the published specification
inherits the error.** Both say "in tens of metric tons, i.e.: `12` = 1.2t" —
which contradicts itself, since twelve tens of tonnes is 120 t. The worked
examples are the reliable half: divide by ten, so one unit is 100 kg.

A developer writing `weight: 3500` for a 3.5-tonne van is asking for a
350-tonne vehicle, and will get a route avoiding most of the network — with no
error. This is the single most costly mistake on this API. Convert explicitly
and comment the conversion in generated code.

`maxSpeed` is plain km/h.

### Battery state comes in two units, and the field name tells you which

Two units express the same physical quantity, and the split is **by field name,
not by service**: anything named `…BatLvl` or `…BatteryLevel` is a percent
0–100, while `energyLoad` and `batCapacity` are kWh. The same service can read
either — `chargingtime` takes the percent fields when you identify the car by
UUID and the kWh ones when you describe it by physical model, as the paragraph
on `ChargingTimeRequest` below sets out. **The unit is the easy half — the trap
is the path.** None of these fields sits where its request class name suggests,
and one placed at the root is dropped in silence, so the table below gives the
full JSON path and nothing shorter.

**Percent (0–100):**

| Path | Service |
|---|---|
| `vehicle.initBatLvl` | evsmartrouting **v2** |
| `condition.minBatLvl` · `condition.minArrivalBatLvl` · `condition.maxAfterChargeBatLvl` | evsmartrouting **v2** |
| `initBatLvl`, `minBatLvl`, `minArrivalBatLvl`, `maxAfterChargeBatLvl` (root) | evsmartrouting **v1** |
| `initBatLvl` (root) | evreachablearea |
| `charges[].curBatLvl` · `charges[].toBatLvl` | chargingcost |
| `remainingBatteryLevel` · `chargingBatteryLevel` (root) | chargingtime |

**kWh** — `energyLoad` (state of charge) and `batCapacity` are fields of the one
shared class `RoutingEnergyVehicleFtr`, reached under a different name and depth
in each service: `energyVehicleFeature.…` on chargingtime,
`routingVehicleProfile.routingEnergyVehicleFeature.…` on routing and traceroute,
`rvp.routingEnergyVehicleFeature.…` on routeHorizon — note `rvp`, not
`routingVehicleProfile`. Every field of that class is mandatory once you supply
it: a partial object answers `400`, e.g. `scxOutOfRange`.

**Two measured examples of what a wrong path costs.** On evsmartrouting v2, a
root `minArrivalBatLvl: 60` answers `200` and is ignored — the journey is
planned to the default and arrives at 0 %; under `condition` the response echoes
`batteryLevel: 60`. On chargingcost, putting `curBatLvl: 20` / `toBatLvl: 80` at
the root instead of inside `charges[]` answers `200` with **23.40 EUR** and
`batChargeLvl: 100` — a full 0→100 % charge — where the intended 20→80 % costs
**14.04 EUR**. Nothing in either response flags it.

**`ChargingTimeRequest` does not accept both units at once**, contrary to what
its two field families suggest — it reads exactly one, chosen by whether
`vehicle` is set. With `vehicle` (a UUID), the state of charge is
`remainingBatteryLevel` in percent and the whole `energyVehicleFeature` object is
ignored: measured on prod, `energyVehicleFeature.energyLoad` at 10 % and at 80 %
both return the baseline `chargingTime: 2773`, identical to a deliberately bogus
key. Without `vehicle`, supply `energyVehicleFeature` and the charge comes from
`energyLoad` in kWh against `batCapacity`. `energyLoad` is **never** a root
field: at the root it is dropped like any unknown key. Read the field name *and*
its path, not the concept.

### A journey's charging cost total can be silently partial

`evsmartrouting` builds `summary.chargingCost` by adding up the `CHARGE` events
that carry a `chargingCost` of their own. A pool whose provider publishes no
tariff contributes nothing, and the total is presented with no sign that it is
incomplete.

Verified on **4.1.0**, Nice to Toulouse: three stops, one of them untariffed and
supplying 26 % of the recharged energy, and `summary.chargingCost` equalled the
sum of the other two to the cent.

**The per-stop figure is not self-describing, and this is the trap.** An
unpriced stop does not omit `chargingCost` — it reports one whose `includeVat`
and `withoutVat` are `0`, complete with a `tariffChargePassHashId`, so it reads
as a priced charge that happened to be free. Measured on Paris → Lyon with a
Zoe: the first stop lifts the battery from 17.1 % to 62.3 % — 40 % of the
journey's energy — and reports `{"currency":"EUR","includeVat":0,
"tariffChargePassHashId":"05bd9cbd…","withoutVat":0}`. The journey total is
23.07 EUR, which is the *second* stop alone.

So the guard is **not** "count the events with no `chargingCost`" — that count
is zero here, and the caller then presents a badly partial total as complete.
Treat absent and zero alike:

```js
const unpriced = journey.events.filter(
  (e) => e.eventType === 'CHARGE' && !(e.chargingCost?.includeVat > 0)
);
```

If `unpriced.length`, say the total covers only part of the trip. Do **not**
promise to fill the gap from `chargingstation/tariffs/1.0/search`: for exactly
the pools whose stop came back at zero, that endpoint answers
`200 {"items":[]}`. A zero here means "no tariff was found", not "this charge
is free", and BeMap has nothing further to offer on it.

### The coordinate field is named differently per service

There is no single convention — ten spellings across the platform, and two of
them are not an object at all. Read off the specification:

| Spelling | Where |
|---|---|
| `coordinate` | nearpoi, chargingstation search, autocomplete, vehicle; routing inside `routingRoadBlocks[]` |
| `coordinateSat` | reverse geocoding; routing and traceroute inside `destinations[]`. **Not** forward geocoding, which takes no coordinate at all — it takes `address` plus optional structured components (`city`, `postalCode`, `street`, …) |
| `coordinatesSat` | reverse geocoding **batch** (plural) |
| `coordinates` | roadsextractor, landFeature |
| `coord` | weather — singular and truncated, unlike everything else |
| `positions` | geofencing (`GeofencingPos`), beside `fenceShapes[].vertices` and `fenceShapes[].center` |
| `corridor` | chargingstation search — a list of coordinates describing a route corridor |
| `gps` | routeHorizon |
| `start` / `stop` / `vias` | evsmartrouting **v2** (`PlaceFront`, `ViaFront`) |
| `startLat` · `startLon` · `stopLat` · `stopLon` | evsmartrouting **v1** and evreachablearea — four bare doubles, no coordinate object |

Two consequences worth naming. **evsmartrouting changes shape between versions**:
v1 takes four flat doubles, v2 takes `start` / `stop` objects — so a v1 payload
sent to v2 has no departure point at all, and the unknown keys are dropped in
silence. And **omitting one half of a flat pair is not symmetrical**: on
evreachablearea a missing `startLat` answers `400`, while a missing `startLon`
answers `200` and computes the area from longitude 0.0, several hundred
kilometres away.

Always confirm with `bemap_get_schema` before writing the payload. Note
that `RoutingRequest` contains *both* `coordinate` and `coordinateSat` at
different nesting levels.

Coordinates are named objects (`{"lon": …, "lat": …}`), so REST has no
lon/lat ordering trap — but the **JS SDK does**: `bemap.Coordinate(lon, lat)`
and `map.move(lon, lat, zoom)` take longitude first.

### A charging-station filter with no action excludes, and excluding can mean no route at all

`csfs` (EV smart routing) and `filters` (charging-station search) share one
filter language. It has its own reference page — **`chargingstation-filter-v1.md`**,
read it with `bemap_read_guide`. It is linked from both schemas but sits in no
menu branch of the documentation site.

Four traps, all measured on `/bgis/service/2.0/evsmartrouting` (preprod,
Paris→Lyon, Tesla Model 3 RWD 50 kWh at 80 %), each by comparing two responses
rather than reading a status code:

**1. A filter with no action is an exclusion rule.** Filter the stations down
to a network that has none reachable and the answer is not a route without a
preference — it is `400 NO_REACHABLE_STEP_POINT`, "All charging stations found
cannot be reachable". Measured: a hard filter on Tesla, Electra or Allego all
returned 400 on that trip. An action makes the filter weight instead of
exclude, and the same three then return 200.

**2. The regex is anchored** — it must cover the whole field, and real values
are compound. `pool.brand` holds `Tesla Supercharger`, `ENGIE Vianeo`,
`IZIVIA Fast`, `Lidl France`, so `/Tesla/` matches nothing and answers 400.
Write `/.*(Tesla).*/`.

**3. It is case-sensitive unless the closing delimiter is `/i`.** This is the
one that reads as "the network has no stations": `/.*(tesla).*/` → 400,
`/.*(tesla).*/i` → 200 with Tesla Superchargers chosen. Prefer `/i` over
listing every casing a brand might use.

**4. The action's trailing semicolon is mandatory.** Drop it and the action is
not parsed, the filter silently reverts to a hard one, and a valid preference
answers 400:

```jsonc
"pool.brand /= /.*(tesla).*/i -> prefCoeff=10.0"   // → 400 NO_REACHABLE_STEP_POINT
"pool.brand /= /.*(tesla).*/i -> prefCoeff=10.0;"  // → 200, Tesla stops chosen
```

`prefCoeff` is the preference coefficient: `1.0` neutral, `]1, 10]` prefer,
`[0.1, 1[` avoid. **A value below 1 avoids** — `0.9` is a mild penalty, not a
mild preference, and on that trip left the reference itinerary untouched. Even
at the `10.0` ceiling the coefficient only weights: it reroutes onto a network
that sits on the corridor (Tesla, IONITY, ENGIE, Fastned, Lidl all visibly
changed the stops, in 2–4 s) but will not pay a large detour, so a preference
for Izivia or Electra came back as the unchanged reference route. Pairing
`-> prefCoeff=10.0;` with a negative-lookahead filter penalising every other
brand at `0.1` does force the detour, but pushed the computation to 56–66 s
on three of seven networks — usually the wrong trade.

Two more measured details. `filters`/`csfs` are combined with **AND**; use `||`
inside one pattern for OR. And **`csfsVersion: 2` changes more than the syntax**:
on the same request it ignored a `prefCoeff=0.1` penalty that v1 honoured, and
took 15–23 s against v1's 3 s. Set it only for what needs it — the truck
parking filter (`pool.stations.chargingPoints.parkingSpot.transportTypes ==
TRUCK`) is the documented case.

### EV smart routing v2 inverts the URL

- v1: `/bgis/service/evsmartrouting/1.0` — name, then version
- v2: `/bgis/service/2.0/evsmartrouting` — **version, then name**

Prefer v2 for new work.

### Timestamps accept two formats

`departureTime` / `arrivalTime` take either an EPOCH millisecond value (UTC)
or an ISO local date-time string: `2011-12-03T10:15:30`,
`2011-12-03T10:15:30+01:00`, or `2011-12-03T10:15:30+01:00[Europe/Paris]`.

**`arrivalTime` is honoured only for 1-to-1 routing** — `MODE_VIAS` with
exactly two destinations. Everywhere else it is not rejected and not ignored:
it is **silently read as a departure time**. Add one via, or switch to
`MODE_1_TO_N`, `MODE_N_TO_1`, `MODE_N_TO_N` or `MODE_ISOCHRONE`, and the
response is byte-identical to sending `departureTime` with the same value — so
a caller asking to arrive at 18:15 departs at 18:15 and arrives a whole trip
later, with `200` and no message. `MODE_MATRIX` is the exception that ignores
both timestamps outright. Verified on prod, comparing the two responses
byte for byte rather than reading the status.

### "Comma-separated list" in the documentation means a JSON array

The generated parameter tables describe `options` and `routingCriterias` as a
"Comma-separated list of one or more options". **Taken literally, that is
wrong** — it describes the underlying query-string form, not the JSON body.
Verified against the live API:

```jsonc
"options": "EVENT,EVT_LENGTH"        // → 400 INVALID_ARGUMENT, "Invalid request"
"options": ["EVENT", "EVT_LENGTH"]   // → 200
```

Treat every "comma-separated list" as a JSON array — the prose is wrong, the
JSON shape is a list. Do **not** extend that to the `list or array of …` type
string, which is a Java declaration and not a wire format: `list or array of
byte` is a single **base64 string** (every brand logo and vehicle photo comes
back that way), and a name being plural is a heuristic, not a fact. Three
fields break the grammar: `status` ends in `s` and is a **scalar**;
`hazardousMaterials` is plural and takes exactly **one** value; `dayOfWeek` is
singular and takes a **list** (`"MONDAY"` → `400 Invalid request`, `["MONDAY"]`
→ `200`). Audited across 23 services, these are the fields verified to
require arrays:

`routing.options` · `routing.routingCriterias` · `traceroute.options` ·
`reversegeocoding.options` · `geocodingBatch/reverse.options` ·
`chargingstation.options` · `chargingtime.options` ·
`evreachablearea.criterias` · `evsmartrouting.condition.criterias` ·
`traffic.options` · `landfeature.options` · `geofencing.options` ·
`geoServerInfo.options`

Thirteen fields, and the last one on `evsmartrouting` sits on the nested
`condition` object rather than at the request root — see the path table below.

Only five fields in the whole corpus use the misleading "Comma-separated list"
wording — `routing.options`, `routing.routingCriterias`,
`reversegeocoding.options`, `geocodingBatch/reverse.options`,
`geofencing.options` — and all five are arrays. The other 65 list-typed fields
say `list or array of …`, which is unambiguous.

Everything else audited is a plain scalar — `routingMode`, `transportMode`,
`transportType`, `orderBy`, `searchType`, `emissionClass`, `hazardousMaterials`,
`chargingstation.mode`, `format`, `positionType`, `coordinateShape` and the
`avoidUTurn` / `useStartAngle` / `useStopRoadSide` triple.

### Sub-options are inert without their parent

`options` mixes top-level options and sub-options: most `EVT_*` values only
take effect when `EVENT` is also present — `EVT_LENGTH` on its own returns a
response byte-identical to sending no options at all.

**Two of them are not inert, and it is the costly pair.** `EVT_TOLL_COST`
alone behaves exactly like the deprecated `TOLL_COST`, returning the full
per-gate breakdown in `routingRoutes[].routingTollCost.tolls[]` — byte-identical
responses. `EVT_TAX_COST` does the same against `TAX_COST`. What `EVENT` changes
is the *shape*, not the presence: with it, the per-gate detail moves into event
entries and `routingTollCost` keeps only `sumFees` (1.4 KB becomes 284 KB on a
Paris → Brussels truck run). So do not read a missing `tolls[]` as "the
sub-option needs its parent" — check whether you sent `EVENT`.

They are also not silent about a missing prerequisite: without a populated
`routingVehicleProfile.routingVehicleFeature`, `EVT_TOLL_COST` answers
`400 VehicleFeatureIsRequiredException`, *"Vehicle feature (vf) is required!"*.
Toll and tax data additionally requires the matching map data on the account.

### Option names that are wrong in three different ways

| Wrong name | Actually accepted | Where the wrong one comes from |
|---|---|---|
| `OPTIMIZED_TRIP_CLOSED` | **`OPTIMIZED_TRIP_CLOSE`** | the documentation's own `OPTIMIZED_TRIP_ROUND` description |
| `EVT_POLYINE` | **`EVT_POLYLINE`** | the documentation's own `POLYLINE` description |
| `EVT_DISTANCE` | **`EVT_LENGTH`** | nowhere — it is the intuitive guess for the length sub-option, and it does not exist |

All three answer `400 Invalid value for field 'options'` with the full accepted
list, so a bad option name is always reported. What is *not* reported is a bad
field name — see below.

Three values are accepted by `routing.options`, `traceroute.options` and
`chargingstation.options` and are documented nowhere, the published
specification included: **`EVT_CHARGING_STATION`** and
**`EVT_CHARGING_STATION_DYNAMIC`** on the first two, **`PATH_AUTO`** on the
third. The backend does list them when it rejects a bad value, which is the only
place they surface.

### Every enum is validated — but only at its real path

Send a value no enumeration contains and the backend answers `400` with the
accepted list. All 52 enum fields audited across 23 services behave that way,
with no exception: there is no field where a misspelt *value* passes silently.

The silent failure is one level up. **An unknown field *name* is ignored and the
request answers `200`** — at every nesting level, including the top. So a field
placed on the wrong object does nothing at all, and the call still succeeds:

```jsonc
// wrong object: RoutingEnergyVehicleFtr has no `hybrid`. Silently ignored.
"routingVehicleProfile": { "routingEnergyVehicleFeature": { "hybrid": "YES" } }
// right object: RoutingVehicleFtr declares it. A bad value here is rejected.
"routingVehicleProfile": { "routingVehicleFeature": { "hybrid": "YES" } }
```

Three paths are easy to get wrong, and each one answers `200` when you do:

| Field | Real path | Not |
|---|---|---|
| `hybrid` | `routingVehicleProfile.routingVehicleFeature` | `…routingEnergyVehicleFeature` |
| `transportMode` on `routeHorizon` | `rvp` | `routingVehicleProfile` |
| `criterias`, `optimMode`, `routesheetMode`, `routesheetVerboseLevel` on `evsmartrouting` v2 | `condition` | the request root |

So a `200` proves the request was accepted, never that your field was read.
Confirm the path with `bemap_get_schema` before sending — `bemap_try_request` flags a field on the wrong object — and to prove a
field took effect, send a deliberately invalid *value* and check the backend
objects. Silence means it never saw the field.

When an option name is in doubt, do not trust prose — get the authoritative
list from the backend with the trick in the next section.

## New in 4.1.0 — what to reach for and what to distrust

Each bullet carries the measurement behind it, and says which release it was
measured on — several of these changes turn out to be already true on 4.0.3.
Query `bemap_get_schema` for the fields themselves; this is the judgment
around them.

- **`startUTurnThreshold`** — the extra cost **above** which BeMap gives up on
  the departure direction you asked for and turns around anyway. It applies at
  the start point and at any via point carrying `useStartAngle` or `avoidUTurn`.
  Default **3000**. Two traps, both in the field description and both easy to
  paraphrase backwards:
  - **The unit follows the criterion, and only one of the two is a tenth.**
    Measured by bisection on 4.1, one Paris departure, detour 1196 m / 260 s:
    under `SHORTEST` the flip happens between **1197 and 1198** — the unit is the
    **metre**. Under `FASTEST` it happens between **2443 and 2444** — tenths of a
    second, against the engine's own cost rather than the reported `duration`,
    which is why it is 2443 and not 2600. The field description reads
    *"in 1/10th seconds / meters / Wh"*, which invites reading the tenth into all
    three; its own worked example, two sentences later, says plainly *"more than
    `startUTurnThreshold` **meters** longer"*. `ECO_ENERGY` needs an energy
    vehicle profile and was not measured — the row says Wh, and that is a claim,
    not a result.
  - **The polarity reads backwards.** *Below* the threshold your requested
    direction is honoured; *above* it the U-turn is taken.
  - **`0` and negatives disable it**, they do not mean "never detour": at `0` and
    at `-1` the heading is honoured exactly as at `99999`. Only a value at or
    above `1` and below the detour cost makes the direction be abandoned.
  - **On 4.0.3 the field is not read at all.** Every environment a caller can
    reach today runs 4.0.3, and there the route is byte-identical whatever you
    send. There is no error: the request answers `200`, and this backend ignores
    an unknown key silently. **The response is the only witness** — it carries
    `routingRoutes[].startUTurnThreshold`, which echoes your value back on 4.1
    and stays pinned at `3000` on 4.0.3. Read the echo before believing the
    field took effect.

  Where it lives also differs by service: on routing it is a root field of
  `RoutingRequest`, but on EV smart routing it exists on **v2 only** and **only
  inside `condition`**. `EvSmartRoutingRequest` v1 does not declare it at all, so
  at a v1 root — or at a v2 root — it is an unknown key: dropped in silence, and
  the call still answers `200`. A non-numeric value returns a bare
  `Invalid request` that does not name the field, so if a routing call starts
  failing after adding it, suspect the type.
- **`routingCrossPenaltiesCoefficients`** — per-road-class penalty factors at
  intersections, **added in 4.1.0**. On an older release the whole object is an
  unknown field name: it is silently dropped and the call answers `200` with the
  unchanged route, so a caller cannot tell the parameter was refused. Check the
  release with `bemap_limits` before relying on it. Where it does exist it
  behaves exactly as documented — `factor` defaults to `1` and a `1` reproduces
  the control route to the metre, `CAL` and `ALL` change the route chosen while
  `ETA` leaves it identical and adjusts only the travel time. Its
  `RoutingCrossPenaltiesCoef` object exposes only `factor` and `type` even though
  the description mentions the road element's classification. Treat any
  assumption about `level` or `roadType` as wrong until `bemap_get_schema`
  shows it.
- **Charging cost from charging-station tariffs (OCPI)** — a real tariff-based
  cost, distinct from `chargingtime`. There is a dedicated tutorial; search
  `charging cost tariffs`.
- **Autocomplete geocoding** — check the `place` field, and pick the
  `geoserver` deliberately: this family accepts **`herehlp`, `nominatim`,
  `addok` and `photon`**, and nothing else. **Here-backed autocomplete is
  `herehlp`, never `here`** — `here` is the plain geocoder and is not wired for
  it. `here`, `osm` and `tomtom` return 400, and so does omitting `geoserver`
  (the environment default is not eligible). The error text is unhelpful either
  way — `no protocol: /selectSignatures?Supplier=Here` on 4.0.3, `This service
  is not configured on this server.` on 4.1.0 — so read a 400 here as "wrong
  geocoder" before touching the payload.
  Two things the eligibility list does not tell you, both verified live:
  **`nominatim` is eligible and empty** — it answers `200 {"items":[]}` for
  queries `addok` and `herehlp` resolve, so a 200 is not a result; and
  **`/geocoding/1.0/natural` does *not* share the rule**. Its query field is
  `naturalQuery`, it takes `herehlp`, `nominatim` and `addok`, and it refuses
  `photon` with `Photon server error: Unknown query parameter ''` — on prod,
  preprod and beta alike, measured on 24 September 2026: an environment that
  has `photon` still fails on one of the two endpoints.
- **Charging cost now honours the tariff restrictions it used to ignore — a
  fix, and a visible one.** `PARKING_TIME` is no longer billed at all in an
  estimate (in OCPI it means *plugged in without charging*, which an estimate
  does not model), a time-based price is pro-rated **beyond** `minDuration`
  instead of charged in full from the first minute, and the four
  session-magnitude restrictions start being evaluated. `FLAT` and `TIME` are
  still billed, so this is a targeted fix and not a dropped feature.

  **Be precise about *which* restrictions — 4.0.3 already evaluates most of the
  block.** Measured on prod and beta (both 4.0.3), one `FLAT` 5 EUR item added to
  an `ENERGY` baseline of 14.04 EUR at a Friday 14:00 UTC `time`: `startDate`,
  `endDate`, `dayOfWeek`, `startTime`/`endTime`, `minPower` and `maxPower` each
  drop the item, leaving 14.04. Only `minDuration`, `maxDuration`, `minKwh` and
  `maxKwh` are ignored — the item is billed and the total reaches 19.04. So an
  out-of-window item is *already* dropped on 4.0.3; what 4.1.0 adds is the four
  session-magnitude bounds, and they are exactly the ones an occupancy penalty
  uses.

  If anyone reports that charging costs **fell** after the upgrade, this is why
  — and the older figure was the wrong one. Through 4.0.3 an occupancy penalty
  reserved for sessions over 45 minutes was billed on a 20-minute stop. On the
  reference
  journey the estimate goes from 25.63 EUR to 21.14 EUR: 19 % of the old total
  was a fee the tariff forbade. Operators that penalise occupancy are the most
  affected, and the shorter the stop the larger the former error.
  `ChargingCostResponse` also gained `energyUsed`, so energy no longer has to be
  inferred from battery percentages.

- **The charging point is identified by its ID when pricing (EVMOVE-465).**
  Before 4.1.0 an EV smart routing stop could be priced with a tariff belonging
  to a different charging point of the same pool. This is a second, independent
  reason for a journey's cost to change between releases — do not attribute
  every difference to the restriction fix above.
- **URL-based authentication is deprecated.** Credentials passed as
  `?appid=…&appcode=…`, still visible in older mapping examples, are on the way
  out: use HTTP Basic, `Authorization: Basic base64(account:apikey)`. The
  authentication reference was rewritten in 4.1.0 and the session header it
  documents is `X-Auth-ID` — earlier pages misprinted it `X-Aith-ID`, so code
  copied from them silently sends nothing usable.
- **`geoserverinfo` reports the per-environment *geocoders* and *limits*, not a
  per-environment service list** (BEMAP-1853 restructured it). Its
  `servicesInfo` array is the same 28 entries in the same order on prod, beta
  and preprod — measured — so it cannot tell you a service is missing here.
  What can differ is `availableGeoServerNames` — the same seven on prod,
  preprod and beta since September 2026, after months apart — and the limit
  values. It is a **POST**; a GET answers `405`.
- **Autocomplete names the missing parameter** (BEMAP-1887) — but 4.0.3 does
  too, so do not use the message to tell the releases apart. On prod today,
  omitting `place` answers `400` with
  `ServiceException / "Invalid parameters for the service: Place parameter is mandatory"`.
- **`reversegeocodingbatch` is a documentation filename, not an endpoint.**
  4.1.0 renamed the *page* `reversegeocodingbacth-service.md` to
  `reversegeocodingbatch-service.md` (BEMAP-1893); no caller's code ever carried
  the typo, and nothing answers at either spelling. Batch reverse geocoding is
  and always was **`POST /bgis/service/geocodingBatch/1.0/reverse`** — the
  capital `B` is required, `geocodingbatch` answers `404`.
- **Vehicles** — `LevelVehicleInfoRequest` is new, and `getlevelvehicleinfo`
  v1.1 gains `variant`. The field *name* is not new: `variant` already exists on
  `VehicleRequest`, `VehicleInfo` and `VehicleInfoFront` in 4.0.3, and already
  filters as a query parameter there. What 4.1.0 adds is the POST body form —
  see the method caveat above. v1.0 has neither.
- **Timezone retrieval and the WMS satellite layer** are documented from 4.1.0;
  search rather than assuming they are absent.

Roles are granted **per operation, not per service**: `/geocoding/1.0` needs
`ROLE_GEOCODING` while `/geocoding/1.0/reverse` needs `ROLE_REVERSEGEOCODING`,
though both belong to the `geocoding` service. When `bemap_list_services` marks
a role *(inferred)*, it was propagated from a sibling page — treat it as a
strong hint, not as provisioning truth, and read the account's real list from
`/bgis/service/acl/1.0/user/details` (see *Reading BeMap errors*).

## Getting the authoritative enum list out of the backend

BeMap rejects an unknown enum value by **listing every accepted value**. That
makes the backend queryable: send a deliberately invalid value in the field,
with the correct type, and read the answer.

```jsonc
{ "destinations": [ … ], "options": ["__NOPE__"] }
```

```
INVALID_ARGUMENT
Invalid value for field 'options'. Accepted values : [MAPMATCH_AVOID_TUNNEL,
MAPMATCH_AVOID_BRIDGE, … EVT_CHARGING_STATION, … EVT_WAYPOINTS]
```

Use `bemap_try_request` for this. It is the fastest way to settle any "does
this value exist / how is it spelled" question, it beats the documentation
whenever the two disagree, and it costs one request. The field must have the
right *type* for this to work — a string where an array is expected fails
earlier, with no list.

## Reading BeMap errors

**`400 "Access Denied"` means "the account is not entitled to what you asked
for".** This is the trap that wastes the most debugging time — BeMap returns
400 where most APIs return 403, under the generic code `INTERNAL_ERROR`.
Usually it is a missing service role, which must be provisioned server-side and
is not an integration bug. But *what you asked for* can be a payload value — an
unavailable or misspelt `geoserver` returns the identical message, because it
resolves to a back-end the account cannot use. Rule the geocoder out before
raising a provisioning ticket.

**Ask the account what it holds rather than inferring it.**
`GET /bgis/service/acl/1.0/user/details`, with the same HTTP Basic credentials
as any other call, answers `200` with the account's own entitlements — verified
on prod, preprod and beta, and on 4.0.3 as well as 4.1:

```json
{ "username": "…",
  "rights": ["ROLE_AUTOCOMPLETE", "ROLE_CHARGINGSTATION", "ROLE_ROUTING", …],
  "geoservers": [{ "byDefault": true, "key": "here" }, { "key": "osm" }, …],
  "chargingStationProviders": [{ "key": "gireve" }, { "key": "ecoMovement" }, …] }
```

That settles an `Access Denied` in one call, and the last two lists settle the
other half of it: `geoservers` is the geocoders this environment actually wires
up, and `chargingStationProviders` the charging providers — both differ per
environment, which is why the same payload can work on beta and fail on prod.
Without credentials the call answers `302` to the login page, like every other
BeMap endpoint.

The role names are the vocabulary, not a mapping: nothing exposes which role
each endpoint requires. `bemap_list_services` reports the role the
*documentation* gates a page behind, which coincides with the endpoint's for
most services and is left empty where no page of that service declares one.
Treat a role marked *(inferred)* as a strong hint and this list as the fact.

- **`302` and `401` mean different things.** A request carrying no Basic
  credentials — no `Authorization` header, or a scheme BeMap does not read,
  such as `Bearer` — answers `302` with `Location: /bgis/login.html`. A
  client left on the default `redirect: 'follow'` then sees HTTP `200` and an
  HTML login page, which reads as a broken payload: use `redirect: 'manual'`.
  A request whose Basic credentials BeMap reads and refuses — unknown account,
  wrong key, malformed header — answers **`401`** with `WWW-Authenticate:
  Basic realm="BeNomad BeMap Security"` and a Tomcat HTML page. Measured on
  beta and prod. REST services use HTTP Basic
  (`Authorization: Basic base64(account:apiKey)`), independent of the
  documentation site's session cookie.
- `400` otherwise — genuine payload problem. **The wording tells you which
  kind**, and this distinction saves the most time:

  | Message | Means | Fix |
  |---|---|---|
  | `Invalid value for field 'X'. Accepted values : [ … ]` | Right type, unrecognised enum value — and it hands you the full list | Pick from the list |
  | `Invalid request`, nothing more | A **type** mismatch — most often a string where a JSON array belongs | Check the shape, not the values |

  A bare `Invalid request` never names the offending field, so do not hunt for
  a typo: suspect the structure first. Errors come back as XML
  (`<ErrorResponse><code>…</code><message>…</message></ErrorResponse>`) even
  though requests are JSON.
- `400 INTERNAL_ERROR "This service is not configured on this server."` — 4.1.0's
  wording for an **ineligible geocoder**, despite what it says. The service *is*
  configured; the `geoserver` you named is not eligible for it. 4.0.3 reports the
  same condition as `ServiceException` /
  `"no protocol: /selectSignatures?Supplier=Here"`. **The fix is in the payload**
  — name a geocoder the endpoint accepts, per the autocomplete bullet above — not
  in the environment. A geocoder the *account* is not provisioned for is a
  different failure and says `Access Denied` instead, so the two are
  distinguishable.
- `405` — wrong HTTP method. Most services are POST with
  `Content-Type: application/json`; a few (quotas, some vehicle endpoints)
  are GET. Since 4.1.0 each reference page declares its method, so
  `bemap_list_services` shows it and `bemap_try_request` uses it by default —
  check there before assuming POST. The method can differ *between versions of
  the same service* — but only from 4.1.0: there `getlevelvehicleinfo` accepts
  POST on v1.1 and answers `405` for it on v1.0. On 4.0.3, which is what every
  environment a customer can call runs today, POST answers `405` on **both**
  versions and only GET works.
- **A `200` is not proof a parameter took effect.** An unknown *field name* is
  dropped in silence at every nesting level, so a payload written for a newer
  release still answers `200` on an older one, with the newer parameters
  discarded. `routingCrossPenaltiesCoefficients` is the worked example: on 4.1.0
  a bogus `type` is rejected with `400` and the whole object where an array
  belongs is rejected too, while on 4.0.3 both answer `200` and the route comes
  back byte-identical to the control. When a parameter is supposed to change the
  result, verify by comparing two responses, not by the status code. Enum
  *values* do validate wherever the field exists, and list every accepted value
  on rejection.

Quotas are enforced per account and readable at
`/bgis/service/quotas/1.0/getAllByCurrentAccount` (GET), which returns a
`jails` array — empty when nothing is currently throttled. The REST
documentation states no numeric rate ceiling, so do not quote one; the
published 100 req/s figure applies to the **tiles** backend
(`mptiles-api*.benomad.net`), which is a different service — and it is a stated
limit rather than an observed one. Measured on the production tiles host: 150
distinct uncached tiles in 1.00 s answered `200` every time, with no `429` and
no `Retry-After` or `X-RateLimit-*` header. Throttle to the published figure by
policy if you like, but **do not build backpressure on receiving a `429`** —
there is nothing today that sends one.

If credentials that work on one environment fail on another, suspect that the
account is not provisioned there rather than a malformed request — check
against `beta` first, which is where accounts are usually enabled.

**Authentication (4.1.0).** HTTP Basic on every call remains the supported
route. 4.1.0 adds an auth API — `GET /bgis/service/acl/1.0/auth` returns an
`X-Auth-ID` — and deprecates both URL-based credentials and session reuse. That
endpoint returns 404 on 4.0.3, so do not build on it until the target
environment is on 4.1.0; `bemap_status` says which release the environment
runs. Only `auth` is new: `GET /bgis/service/acl/1.0/user/details` answers
`200` on 4.0.3 too — see *Reading BeMap errors*. The header is `X-Auth-ID` — the documentation spelled it `X-Aith-ID`
until 4.1.0 fixed the typo, and the misspelling still circulates in older
integration code.

## Keeping the reference current

The MCP serves a snapshot of one release, so it can lag the live API. If a
field is disputed or newly added, check `bemap_status` for the release and the
build date, then use a snapshot built from the release you call rather than
working around a stale one — the snapshot is rebuilt from BeMap's own
specification for every release.

`bemap_status` also says whether the snapshot is **ahead of** or **behind** the
environment being called. Ahead is the normal state while a release rolls out —
the fields are real, they just do not exist on that environment yet, which is a
different problem from a wrong field name and needs a different answer.

## Out of scope

- **Vector tiles, map display, authentication for tiles** → skill
  `benomad-tiles-integration`.
- **Frontend project conventions** (DAO layer, namespace, structure) → skill
  `benomad-frontend`.
- **JS SDK class reference** (`bemap.RoutingV2`, `bemap.Geocoder`, …) → the
  SDK's own `llms.txt` and `benomad-tiles-integration`. This skill and the
  `bemap` MCP cover the REST API underneath.
