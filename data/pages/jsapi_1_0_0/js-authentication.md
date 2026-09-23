# BeMap JS API

## Authentication process


#### __JavaScript context :__

```
{"bemap":{"language":"javascript"}}
var bemapMainCtx = new bemap.Context({
  "login": '<your login or set to null if not need>',
  "password": '<your password or set to null if not need>',
  "secure": true,
  "host": '<your host name or IP address>',
  "authInPost": false,
  "geoserver": 'default'
});

```

## __Libraries__

#### __CSS__


Include
* `ol`
* `leaflet`
* `MarkerCluster.Default` if you will use cluster marker method
* `bemap-js-api`


CSS files in the head section of your document
```
{"bemap":{"language":"xml"}}

<link rel="stylesheet" type="text/css" href="../dist/ol.css">
<link rel="stylesheet" type="text/css" href="../dist/leaflet.css">
<link rel="stylesheet" type="text/css" href="../dist/MarkerCluster.Default.css" />
<link rel="stylesheet" type="text/css" href="../dist/bemap-js-api.css">

```
#### __JavaScript__

Include
* `ol`
* `leaflet`
* `leaflet.markercluster` - if you will use cluster marker method
* `bemap-js-api`


JavaScript files after CSS files
```
{"bemap":{"language":"xml"}}

<script language="JavaScript" type="text/javascript" src="../dist/ol.js"></script>
<script language="JavaScript" type="text/javascript" src="../dist/leaflet.js"></script>
<script language="JavaScript" type="text/javascript" src="../dist/leaflet.markercluster.js"></script>
<script language="JavaScript" type="text/javascript" src="../dist/bemap-js-api.js"></script>
```
Include
* `context`

JavaScript files after CSS files
```
{"bemap":{"language":"xml"}}

<script language="JavaScript" type="text/javascript" src="../context.js"></script>
```


## __Working example__
```
{"bemap":{"language":"xml"}}
<!- CSS -->
<link rel="stylesheet" type="text/css" href="../dist/ol.css">
<link rel="stylesheet" type="text/css" href="../dist/leaflet.css">
<link rel="stylesheet" type="text/css" href="../dist/MarkerCluster.Default.css" />
<link rel="stylesheet" type="text/css" href="../dist/bemap-js-api.css">

<!-- JavaScript -->
<script language="JavaScript" type="text/javascript" src="../dist/ol.js"></script>
<script language="JavaScript" type="text/javascript" src="../dist/leaflet.js"></script>
<script language="JavaScript" type="text/javascript" src="../dist/leaflet.markercluster.js"></script>
<script language="JavaScript" type="text/javascript" src="../dist/bemap-js-api.js"></script>
<!-- Context -->
<script language="JavaScript" type="text/javascript" src="../context.js"></script>
```


See the complete feature of [OpenLayers](https://leafletjs.com//).
