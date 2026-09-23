# Glossary

## Google Encoded Polyline Algorithm Format

Polyline/polygon encoding is a lossy compression algorithm that allows you to store a series of 
coordinates as a single string. Point coordinates are encoded using signed values. If you only 
have a few static points, you may also wish to use the interactive polyline encoding utility. 
 
The encoding process converts a binary value into a series of character codes for [ASCII](https://en.wikipedia.org/wiki/ASCII) 
characters using the familiar base64 encoding scheme: to ensure proper display of these 
characters, encoded values are summed with 63 (the [ASCII](https://en.wikipedia.org/wiki/ASCII) character '?') before converting 
them into [ASCII](https://en.wikipedia.org/wiki/ASCII). The algorithm also checks for additional character codes for a given point by 
checking the least significant bit of each byte group; if this bit is set to 1, the point is not yet 
fully formed and additional data must follow. 
 
Additionally, to conserve space, points only include the offset from the previous point (except 
of course for the first point). All points are encoded in Base64 as signed integers, as latitudes 
and longitudes are signed values. The encoding format within a polyline needs to represent two 
coordinates representing latitude and longitude to a reasonable precision. Given a maximum 
longitude of +/- 180 degrees to a precision of 5 decimal places (180.00000 to -180.00000), this 
results in the need for a 32 bit signed binary integer value.

Note that the backslash is interpreted as an escape character within string literals. Any output 
of this utility should convert backslash characters to double-backslashes within string literals.


The steps for encoding such a signed value are specified below. 
1. Take the initial signed value:
   * __-179.9832104__
2. Take the decimal value and multiply it by 1e5, rounding the result:
   * __-17998321__
3.  Convert the decimal value to binary. Note that a negative value must be calculated using its 
two's complement by inverting the binary value and adding one to the result: 
   * __00000001 00010010 10100001 11110001__
   * __11111110 11101101 01011110 00001110__
   * __11111110 11101101 01011110 00001111__
4.  Left-shift the binary value one bit: 
   * __11111101 11011010 10111100 00011110__
5.  If the original decimal value is negative, invert this encoding: 
   * __00000010 00100101 01000011 11100001__
6.  Break the binary value out into 5-bit chunks (starting from the right hand side): 
   * __00001 00010 01010 10000 11111 00001__
7.  Place the 5-bit chunks into reverse order: 
   * __00001 11111 10000 01010 00010 00001__
8.  OR each value with 0x20 if another bit chunk follows: 
   * __100001 111111 110000 101010 100010 000001__ 
9.  Convert each value to decimal:
   * __33 63 48 42 34 1__
10. Add 63 to each value: 
   * __96 126 111 105 97 64__
11. Convert each value to its [ASCII](https://en.wikipedia.org/wiki/ASCII) equivalent: 
   * __`~oia@__


The table below shows some examples of encoded points, showing the encodings as a series of offsets from previous points.

_Source: [https://developers.google.com/maps/documentation/utilities/polylinealgorithm](https://developers.google.com/maps/documentation/utilities/polylinealgorithm)_
