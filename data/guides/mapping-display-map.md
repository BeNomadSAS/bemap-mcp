# Add a map browser in your web page

JavaScript source code:
```
{"bemap":{"language":"javascript","mapid":"map1","run":true}}
var map = new bemap.OlMap(bemapMainCtx, 'map1').defaultLayers().move(2.3412, 48.85693, 3);
```


HTML source code:
```
{"bemap":{"language":"xml"}}
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>BeNomad BeMap JavaScript API</title>
    <link rel="stylesheet" href="../dist/ol.css" type="text/css">
    <script language="JavaScript" src="../dist/bemap-js-api.min.js"></script>
    <script language="JavaScript" src="example-01.js"></script>
</head>
<body onload="onLoaded();">
    <div id="map1"></div>
</body>
</html>
```
