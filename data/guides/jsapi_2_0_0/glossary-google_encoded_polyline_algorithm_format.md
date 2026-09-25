<span class="bemap-tag">Glossary</span>

# Google encoded polyline format

<p class="bemap-tagline">A compact ASCII encoding for a sequence of coordinates. BeMap returns it on routing / EV-routing / reachable-area responses when you opt in via <code>RoutingOptions.ENCODED_POLYLINE</code> (or similar).</p>

## At a glance

<ul class="bemap-glance">
<li>Lossy compression — coordinates stored as a single ASCII string.</li>
<li>Delta-encoded (offsets from the previous point) + base64 + sign-flip on negative values.</li>
<li>BeMap returns it on routing responses via <code>getEncodedPolyline()</code> when the matching option is set.</li>
<li>Decode with any library that implements Google's algorithm — most map engines have one.</li>
<li>Source spec: <a href="https://developers.google.com/maps/documentation/utilities/polylinealgorithm">developers.google.com/maps/documentation/utilities/polylinealgorithm</a>.</li>
</ul>

## How it works

Polyline / polygon encoding is a lossy compression that stores a series of coordinates as a single string. The encoding process converts a binary value into a series of [ASCII](https://en.wikipedia.org/wiki/ASCII) character codes using a familiar base64 scheme: encoded values are summed with 63 (the `?` character) before converting to ASCII. The algorithm checks for additional character codes for a given point via the least-significant bit of each byte group; if that bit is set, the point is not yet fully formed and more data follows.

To conserve space, points only include the **offset** from the previous point (except the first). All values are signed integers, since latitudes and longitudes are signed. Given a maximum longitude of ±180° to 5 decimal places (180.00000 to -180.00000), this needs a 32-bit signed binary integer.

> Backslashes in the output must be doubled inside string literals.

## Encoding a signed value — worked example

1. Initial signed value:
   - `-179.9832104`
2. Multiply by 1e5, round:
   - `-17998321`
3. Convert to binary (two's complement for negative values):
   - `00000001 00010010 10100001 11110001`
   - `11111110 11101101 01011110 00001110`
   - `11111110 11101101 01011110 00001111`
4. Left-shift one bit:
   - `11111101 11011010 10111100 00011110`
5. If originally negative, invert:
   - `00000010 00100101 01000011 11100001`
6. Break into 5-bit chunks (right to left):
   - `00001 00010 01010 10000 11111 00001`
7. Reverse order:
   - `00001 11111 10000 01010 00010 00001`
8. OR each value with `0x20` if another chunk follows:
   - `100001 111111 110000 101010 100010 000001`
9. Convert to decimal:
   - `33 63 48 42 34 1`
10. Add 63:
    - `96 126 111 105 97 64`
11. Convert to ASCII:
    - `` `~oia@ ``

_Source: [Google Maps — Polyline algorithm](https://developers.google.com/maps/documentation/utilities/polylinealgorithm)._

## See also

- [`bemap.RoutingV2`](index.html#subpage-jsapi_2_0_0-js-routing-v2.md) — `route.getEncodedPolyline()` on every routing response
- [Coordinate system](index.html#subpage-jsapi_2_0_0-glossary-coordinate_system.md)
