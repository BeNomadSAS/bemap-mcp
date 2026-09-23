# Trace Route service
Performs a road-matching of GPS coordinates and routing process for a specified type of vehicle. Road-matching consists in correcting uncertainties related to GPS measurements by repositioning a vehicle on the most accurate segment of neighboring roads. This service assumes that an input position corresponds to a chronological sequence of positions of a given vehicle driving on the road network.

## Sample
For more details see the documentation API of [Trace Route](index.html#subpage-rest_1_0_0-traceroute-service.md).

<form class="form-horizontal" role="form">
  <div class="panel panel-default">
    <div class="panel-heading">Click on the map move it</div>
      <div class="panel-body">
        <div class="row">
          <div class="col-md-6">
          
```
{"bemap":{"language":"javascript","mapid":"map1","run":true,"hide":true, "src":"rest_1_0_0/examples-trace-route-service-v1_0_0.js"}}
```
  </div>
          <div class="col-md-6">
            <h3>Below the GPS coordinates</h3>
            <p>
              Thoses lines are analysed by the trace-route service to get the route information.
            </p>
            <div class="row form-group">
              <div class="col-md-4">
                <label class="btn btn-default btn-file">
                  Load CSV
                  <input type="file" id="csvUploadedFile" accept=".csv" onchange="bemap.sample.csvData()" style="display:none;" />
                </label>
              </div>
              <div class="col-md-2 col-md-offset-6">
                <button type="button" class="btn btn-primary" id="run"><span></span> Search</button>
              </div>
            </div>
            <div class="row form-group">
              <div class="col-md-12">
                <textarea id="csvDataTextarea" rows="15" style="font-family:'Courier New';" class="form-control"></textarea>
              </div>
            </div>
            <h4>Options</h4>
            <div id="options" class="row form-group">
              <div class="col-md-4">
                <label class="label-custom"><input type="checkbox" name="options" value="POLYLINE" checked="true"/> Polyline</label>
              </div>
              <div id="options" class="col-md-4">
                <label class="label-custom"><input type="checkbox" name="options" value="EVT_ENCODED_POLYLINE" data-event="EVENT" /> Encoded Polyline</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</form>

__Request__

<span id="requestComment"></span>
<textarea id="request"></textarea>
<button id="runDirectRequest" class="btn secondary">Run request</button>

__Response__

<span id="responseTime"></span>
<textarea id="response"></textarea><br/>
<pre id="responseSimpleView"></pre>


See the [authentication page](index.html#page-authentication.md) for the login, password process.
