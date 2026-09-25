# REST API, BND version 0.9


## Response of Routing with matrix mode
Result of matrix computations through an inter-connected road network.

See the [request parameters of routing](index.html#page-routing-bnd.md).

All coordinates are defined by longitude and latitude, see the [coordinate system](index.html#page-glossary-coordinate_system.md) glossary for more details.

### CSV output format

#### Overview

```csv
     ;x'1,y'1;<more columns>;x'p,y'p
x1,y1;ETA 1→1;<more columns>;ETA 1→p
<more rows>
xn,yn;ETA n→1;<more columns>;ETA n→p
```
If the computation is a n x n matrix: p = n and x'i,y'i = xi,yi.

The column or row headers can contain the text `ViaNotMatchException` to indicate that the corresponding point was not matched to a road of map data.

Each time a route could not be calculated the corresponding cell of the matrix will take the value `268435455`.

### Error message

When the route is not feasible an text message is returned.


#### Examples

A matrix 4 x 4 (n x n):
```csv
"";7.41059,43.73446;7.15376,43.72189;7.15092,43.66244;7.12901,43.62986
7.41059,43.73446;0;2817;2004;2244
7.15376,43.72189;2794;0;839;1453
7.15092,43.66244;2048;813;0;722
7.12901,43.62986;2167;1444;646;0
```

The values depend to the optimization criteria (see `criterias` parameter for more details).

* `FASTEST`: first value is duration (in seconds) of calculated route.
* `SHORTEST`: first value is length (in meters) of calculated route.
* `ECO_ENERGY`: first value is consumption (in kWh) of calculated route.



A matrix 4 x 4 (n x n) with MATRIX_COMPLEMENT option:

```csv
"";7.41059,43.73446;7.15376,43.72189;7.15092,43.66244;7.12901,43.62986
7.41059,43.73446;0:0;2817:268435455;2004:268435455;2244:268435455
7.15376,43.72189;2794:268435455;0:0;839:8722;1453:268435455
7.15092,43.66244;2048:268435455;813:8558;0:0;722:268435455
7.12901,43.62986;2167:268435455;1444:268435455;646:4784;0:0
```

The complement value are separated by the `:` colon character. the values depend to the optimization criteria (see `criterias` parameter for more details).

* `FASTEST`: first value is duration (in seconds) and second is length (in meters) of calculated route.
* `SHORTEST`: first value is length (in meters) and second is duration (in seconds) of calculated route.
* `ECO_ENERGY`: first value is consumption (in kWh) and second is duration (in seconds) of calculated route.



A matrix 1 x 3 (n x p):

```csv
"";7.15376,43.72189;ViaNotMatchException;7.12901,43.62986
7.41059,43.73446;2817:268435455;268435455:268435455;2244:268435455
```
