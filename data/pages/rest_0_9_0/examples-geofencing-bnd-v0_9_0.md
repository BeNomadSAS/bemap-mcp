# Geo-fencing
A geo-fence is a virtual perimeter for a real-world geographic area. A geo-fence could be dynamically generated-as in a radius around a point location, or a geo-fence can be a predefined set of boundaries (such as school zones or neighborhood boundaries).

_For more details: [Wikipedia](https://en.wikipedia.org/wiki/Geo-fence)_

## Sample
For more details see the documentation API of [Geofencing](index.html#subpage-rest_0_9_0-geofencing-bnd.md).

<form class="form-horizontal" role="form">
  <div class="panel panel-default">
    <div class="panel-heading">Simulation of fence</div>
      <div class="panel-body">
        <div class="row form-group">
          <div class="col-md-6">
            <label for="inputType" class="control-label">Geometry type of tested xy (xyType):</label>
            <select id="shape" class="selectpicker">
              <option>CIRCLE</option>
              <option>POLYGON</option>
              <option>POLYLINE</option>
            </select>
          </div>
          <div class="col-md-6">
            <button type="button" class="btn btn-primary" id="run"><span></span> Check the fences</button>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">

```
{"bemap":{"language":"javascript","mapid":"map1","run":true,"hide":true,"src":"rest_0_9_0/examples-geofencing-bnd-v0_9_0.js"}}
```

          </div>
          <div class="col-md-6">
            <div id="responseContainer"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</form>

Request:
<textarea id="request"></textarea>
<button id="runDirectRequest" class="btn secondary">Run request</button>

Response:
<textarea id="response"></textarea>

See the [authentication page](index.html#page-authentication.md) for the login, password process.
