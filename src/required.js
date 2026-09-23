/* ======================================================================
 * PROBED REQUIREDNESS
 *
 * What the live backend actually refuses a request body without — measured,
 * not read off the introspection.
 *
 * The introspection's "Optional" column has three states and only two of them
 * are ever printed: `optional`, or an empty cell. The empty cell does not mean
 * "mandatory". Measured across the 21 request schemas the specification and the
 * 4.1 snapshot share, 23 fields disagreed with what the backend enforces, and
 * the column is wrong in both directions — it leaves `routingCriterias` blank
 * when the service defaults it to `FASTEST`, and marks `coordinate` optional on
 * charging-station search where the service answers `Missing coordinate(s)`.
 * Corpus-wide the ambiguity is 2 187 blank cells against 846 marked optional,
 * so reading blank as mandatory asserts a contract the service does not have.
 *
 * This table is the answer to that, and it is deliberately small: an entry
 * exists only where a field was removed from a body that works and the service
 * refused the result. Everything else stays `unspecified`, which is the honest
 * verdict — untested is not the same as optional.
 *
 * It is keyed on the fully-qualified request class, because the snapshot files
 * are, and because two versions of one class disagree: the v1 and v2
 * `EvSmartRoutingRequest` differ on the shape of `vehicle`, and only v2 was
 * probed. A key that matched on the simple name would lend one's evidence to
 * the other.
 *
 * `scripts/build-openapi.js` reads this module rather than carrying its own
 * copy. That is the one thing to preserve when editing: the published
 * specification's `required` and the MCP's requiredness column are the same
 * table, so they cannot drift the way the two `CORRECTIONS` tables can.
 * The test suite asserts that every operation with a JSON request body has an
 * entry here — a new operation fails the suite instead of silently publishing
 * the introspection's guess.
 *
 * Each claim was measured by sending the captured body without <operationId
 * --drop <field>`, which sends the captured body minus one field and reads the
 * answer against BeMap's error vocabulary.
 * ====================================================================== */

/** Root of the request model package, shared by every key below. */
const V1 = 'com.benomad.bgis.fe.protocol.service.v1_0_0.model';

/**
 * Fields the live service refuses a body without, and fields it accepts a body
 * without despite the introspection leaving their cell blank.
 *
 * `fields` is the allow-list the published specification emits as `required`.
 * `notRequired` is the opposite measurement and exists because it is just as
 * expensive to rediscover: each of these answers `200` when removed from a body
 * that works, yet reads as mandatory in the introspection. `why` carries the
 * evidence a reader needs to trust or re-test the row.
 *
 * @type {Record<string, {fields: string[], notRequired?: string[], why: string}>}
 */
export const PROBED_REQUIRED = {
  [`${V1}.routing.RoutingRequest`]: {
    fields: ['destinations'],
    notRequired: ['options', 'outputLanguage', 'routingCriterias'],
    why:
      'Only `destinations` is enforced. `routingCriterias` defaults to `FASTEST`, ' +
      '`options` to no geometry and `outputLanguage` to the server default; all three ' +
      'answer `200` when removed. An unknown field name is accepted and silently ' +
      'dropped, so a `200` proves nothing about a field the class does not declare.',
  },
  [`${V1}.routing.TraceRouteRequest`]: {
    fields: ['destinations', 'routingVehicleProfile'],
    notRequired: ['options'],
    why:
      'Without `routingVehicleProfile` the service answers `400 ' +
      'VehicleProfileIsRequiredException`, *"Vehicle profile (vp) is required!"* — an ' +
      'error naming a field that exists under no such name in the class.',
  },
  [`${V1}.geocodingService.GeocodingRequest`]: {
    fields: ['address'],
    why:
      'Structured geocoding takes `address` plus optional components (`city`, ' +
      '`postalCode`, `street`, …). It carries no coordinate field of any spelling.',
  },
  [`${V1}.geocodingService.ReverseGeocodingRequest`]: {
    fields: ['coordinateSat'],
    why:
      'One `coordinateSat` **object**, not a `coordinates` array. `radius` is not ' +
      'enforced and its absence is worse than a rejection: the service answers `200` ' +
      'with an uninitialised bounding box (`minLon: 180, maxLon: -180`) and no elements.',
  },
  [`${V1}.geocodingService.GeocodingNaturalRequest`]: {
    fields: ['naturalQuery'],
    why:
      'The query goes in `naturalQuery`. Under any other name the backend reports a ' +
      'missing query or fails with a truncated internal error that reads as an outage.',
  },
  [`${V1}.autocomplete.AutocompleteGeocodingRequest`]: {
    fields: ['place'],
    why:
      'Without `place` the service answers a raw Java NPE — `400 INTERNAL_ERROR, ' +
      '"Cannot invoke \\"String.length()\\" because \\"<parameter1>\\" is null"` — naming no ' +
      'field. `coordinate` is required for the `herehlp` geoserver only, which is why it ' +
      'is not listed: `addok` and `nominatim` answer `200` without it. `maximumResults` ' +
      'is declared nowhere in this class and is accepted and ignored.',
  },
  [`${V1}.geocodingForBatch.GeocodingForBatchRequest`]: {
    fields: ['queries'],
    why: 'Production accepts 200 addresses per call.',
  },
  [`${V1}.geocodingForBatch.RevGeocodingBatchRequest`]: {
    fields: ['coordinatesSat'],
    notRequired: ['radius'],
    why:
      'Note the spelling: `coordinatesSat` here, `coordinateSat` on single reverse ' +
      'geocoding. Production accepts 1000 coordinates per call, beta only 250.',
  },
  ['com.benomad.bgis.fe.protocol.service.v2_0_0.model.evSmartRouting.request.EvSmartRoutingRequest']:
    {
      fields: ['start', 'stop', 'vehicle'],
      why:
        '`vehicle` is a `VehicleFront` object — `{ "key": "<uuid>", "initBatLvl": 80 }` — ' +
        'not the bare UUID string `evreachablearea` takes; a string answers `400 ' +
        'INVALID_ARGUMENT` with an XML body. `csps` is **conditionally** required and so ' +
        'cannot be listed: any trip needing a charging stop fails without it (`400 ' +
        'NO_REACHABLE_STEP_POINT`), while a trip short enough to need no charge succeeds.',
    },
  [`${V1}.chargingStation.ChargingStationSearchRequest`]: {
    fields: ['coordinate'],
    why:
      'The introspection marks `coordinate` optional and the service answers `Missing ' +
      'coordinate(s)` without it. The radius field is `radius`, not the `distance` ' +
      'nearpoi takes — a `distance` here is ignored and the search returns the ' +
      'environment default. `maxPoolResult` caps pools per provider, not overall.',
  },
  [`${V1}.chargingStation.ChargingStationTariffsRequest`]: {
    fields: ['links', 'providerName'],
    why:
      'Without `links`: `Tariff connector links is required!`, a message naming the Java ' +
      'field rather than the JSON one. Without `providerName`: `400 Provider name is not ' +
      'defined`. `links[].connectorId` takes the connector\'s own `operatorId` from ' +
      '`connectorTypes[]`, not the pool\'s from `chargingPoints[]` — the wrong one ' +
      'answers `200 {"items":[]}`.',
  },
  [`${V1}.chargingTime.ChargingTimeRequest`]: {
    fields: ['chargingCurrentType', 'chargingPointPower'],
    why:
      'The request must also carry an energy vehicle profile; without one the service ' +
      'answers `Invalid energy vehicle profile`.',
  },
  [`${V1}.chargingCost.ChargingCostRequest`]: {
    fields: ['vehicle', 'charges'],
    why:
      'Without `charges` the service answers `400` with a raw Java NPE naming ' +
      '`ChargingCostGeoRequest.getCharges()`. Tariffs are `{"prices":[{type,price,unit}]}`; ' +
      'a flat `{type,price}` is dropped in silence and the cost comes back zero.',
  },
  [`${V1}.evReachableArea.EvReachableAreaRequest`]: {
    fields: ['vehicle', 'startLat'],
    notRequired: ['criterias', 'temperature'],
    why:
      '`vehicle` is a bare UUID **string** here, unlike EV smart routing. `startLat` is ' +
      'listed and `startLon` is not, for a reason worth knowing: an omitted `double` ' +
      'defaults to `0.0` rather than being rejected, so a missing `startLat` surfaces as ' +
      '`400 Via not match` while a missing `startLon` answers `200` and computes the area ' +
      'several hundred kilometres away. A specification can require a field; it cannot ' +
      'invent the null check. `criterias` here takes routing avoidances ' +
      '(`AVOID_FERRIES`, …) — the routing service\'s `FASTEST` / `SHORTEST` are refused.',
  },
  ['com.benomad.bgis.fe.protocol.service.v1_1_0.model.vehicle.VehicleRequest']: {
    fields: [],
    why:
      'Probed and nothing is enforced: every field is a filter and an empty body returns ' +
      'the unfiltered catalogue. The filter is `brandId`; `brand` is accepted and ignored.',
  },
  [`${V1}.nearPoi.NearPoiRequest`]: {
    fields: ['coordinate', 'distance', 'transportType'],
    why:
      '`transportType` is marked optional and refused. `distance` is capped at **1000 m** ' +
      'and its absence is the one failure here that names itself: `400 ServiceException, ' +
      '"distance is out of range, allowed range [0 - 1000]."`. A missing `coordinate` or ' +
      '`transportType` answers a bare `400 {"code":"INTERNAL_ERROR"}`, one code for two ' +
      'fields.',
  },
  [`${V1}.geofencing.GeofencingRequest`]: {
    fields: ['fenceShapes', 'positions'],
    why:
      'Without `fenceShapes` the service answers `400` with a raw Java NPE naming ' +
      '`getFenceShapes()`; without `positions`, a clean `NullParameterException`. ' +
      'Production accepts 2500 fences and 2500 coordinates per call, beta 1000 of each.',
  },
  [`${V1}.roadsExtractor.RoadsExtractorRequest`]: {
    fields: ['coordinates', 'transportType'],
    notRequired: ['outputLanguage'],
    why: '`transportType` is marked optional by the introspection and is refused.',
  },
  [`${V1}.traffic.TrafficRequest`]: {
    fields: [],
    notRequired: ['countryCode', 'options'],
    why:
      'Probed and nothing is enforced, though the service needs a bounding box, a country ' +
      'code, or both to return anything useful. This reports traffic; it does not apply ' +
      'it to a route — that is the `TRAFFIC` option on the routing service.',
  },
  [`${V1}.weather.WeatherRequest`]: {
    fields: ['provider'],
    why:
      'The one case where the introspection was right and the published specification was ' +
      'not: without `provider` the service answers `400 Weather provider not found ' +
      "'null'`. The value is `owm`.",
  },
  [`${V1}.currency.CurrencyConvertRequest`]: {
    fields: [],
    notRequired: ['from', 'to', 'value'],
    why:
      'The backend\'s own api-docs marks `from`, `to` and `value` mandatory and enforces ' +
      'none of them. The amount field is `value`: an `amount` is accepted, ignored, and ' +
      'the conversion answers `200` with `value: 0`. (`/currency/1.0/rate` is the sibling ' +
      'that takes `code`, not `from`/`to`.)',
  },
};

/**
 * The probed verdict for one request class, or `null` when it was never probed.
 *
 * @param {string} className - Fully-qualified class name, as the snapshot files are named.
 * @returns {{fields: string[], notRequired?: string[], why: string} | null}
 */
export function probedRequired(className) {
  return PROBED_REQUIRED[className] ?? null;
}

/**
 * How a field's requiredness should be reported, reconciling the introspection's
 * column with the probe.
 *
 * The probe wins wherever it has an opinion, because it measured the service and
 * the column describes an annotation. Where it has none, an explicit `optional`
 * still stands — the column under-marks, it does not invent optionality — and a
 * blank cell resolves to `unspecified` rather than to `required`.
 *
 * @param {string} field - Field name.
 * @param {boolean} columnOptional - Whether the introspection's cell reads `optional`.
 * @param {{fields: string[], notRequired?: string[]} | null} probed - Verdict for the
 *   declaring class, or `null` when the field is not on a probed class's root section.
 * @returns {'required'|'optional'|'unspecified'} The verdict to print.
 */
export function requiredness(field, columnOptional, probed) {
  if (probed?.fields.includes(field)) return 'required';
  if (probed?.notRequired?.includes(field)) return 'optional';
  return columnOptional ? 'optional' : 'unspecified';
}
