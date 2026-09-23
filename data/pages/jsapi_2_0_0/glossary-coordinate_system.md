<span class="bemap-tag">Glossary</span>

# Coordinate system

<p class="bemap-tagline">Geographic latitude / longitude, the WGS84 datum BeMap uses, and the <code>longitude, latitude</code> ordering convention enforced by every <code>bemap.Coordinate</code>.</p>

## At a glance

<ul class="bemap-glance">
<li>BeMap uses the <strong>WGS84</strong> coordinate system.</li>
<li>Range: longitude <code>-180</code> → <code>+180</code>, latitude <code>-90</code> → <code>+90</code>.</li>
<li>Order: <strong><code>longitude, latitude</code></strong> — <code>new bemap.Coordinate(2.35, 48.85)</code> means lon 2.35, lat 48.85.</li>
<li>String form (where used): <code>"longitude,latitude"</code>, e.g. <code>"2.29494,48.85853"</code>.</li>
</ul>

## Reference

### Notation

| Concept | Notation |
| --- | --- |
| Coordinate | `new bemap.Coordinate(lon, lat)` |
| Bounding box | `new bemap.BoundingBox(swLon, swLat, neLon, neLat)` |
| Wire string | `"longitude,latitude"` (e.g. `"2.29494,48.85853"`) |

### Latitude — `-90` to `+90`

The latitude of a point on Earth's surface is the angle between the equatorial plane and the straight line that passes through that point and the centre of the Earth. Lines joining points of the same latitude trace circles called parallels. The North Pole is `90°N`; the South Pole is `90°S`. The 0° parallel is the equator.

### Longitude — `-180` to `+180`

The longitude of a point is the angle east or west of a reference meridian. All meridians converge at the poles. The prime meridian (`0°`) passes through the Royal Observatory in Greenwich. The antipodal meridian is both `180°W` and `180°E` — note this is **not** the International Date Line, which diverges politically in several places.

_Source: [Wikipedia — Geographic coordinate system](https://en.wikipedia.org/wiki/Geographic_coordinate_system)._

## See also

- [`bemap.Coordinate`](index.html#subpage-jsapi_2_0_0-js-routing-v2.md) — usage on every service request
- [Encoded polyline format](index.html#subpage-jsapi_2_0_0-glossary-google_encoded_polyline_algorithm_format.md)
