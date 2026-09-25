# Routing
Perform route computations through an inter-connected road network.

## Sample
For more details see the documentation API of [Routing](index.html#subpage-rest_1_0_0-routing-service.md).
<style>
.label-custom {
 display: block;
 margin: 0 0 10px;
 padding: 6px 12px;
 border: 1px solid #ccc;
 border-radius: 4px;
}

.label-custom:hover {
 background: #eee;
 cursor: pointer;
}

#response {
 width: 100%;
 height: 500px; 
}

#searchAddressContainer {
 margin-bottom: 1em;
}

#searchAddressContainer .placeHelperBtn {
 color: #b0b0b0;
 padding: 2px 2px 0 6px;
}

#searchAddressContainer .placeHelperBtn:hover {
 color: #337ab7;
}

#searchAddressBox {
 margin-top: 6px;
}

</style>

<form class="form-horizontal" role="form">
  <div class="panel panel-default">
    <div class="panel-heading">Click on the map to add your start and destination.</div>
      <div class="panel-body">
        <div class="row">
          <div class="col-md-6">
```
{"bemap":{"language":"javascript","mapid":"map1","run":true,"hide":true,"src":"rest_1_0_0/examples-routing-service-v1_0_0.js"}}
```
        </div>
        <div class="col-md-6">
          <div id="searchAddressContainer" data-right="ROLE_AUTOCOMPLETE">
            <div class="clearfix">
              <span id="searchAddressIcon" class="fas fa-search-location float-right cursorPointer placeHelperBtn" title="Convenience helper, not part of Routing: it resolves an address through the separate Geocoding (autocomplete) service and adds the result as a waypoint. The Routing service takes coordinates only."></span>
            </div>
            <div id="searchAddressBox" hidden>
              <input type="search" id="searchAddress" class="form-control input-sm" autocomplete="off" placeholder="Address to add as a waypoint" title="Resolved by the Geocoding (autocomplete) service, then added as a waypoint" />
            </div>
          </div>
          <div id="responseContainer" class="row" hidden>
            <table id="myTable" class="table table-hover table-striped">
              <thead>
                <th>City</th>
                <th>Country</th>
                <th>Postal code</th>
                <th>Place</th>
                <th>Longitude</th>
                <th>Latitude</th>
                <th><input type="button" value="Clear" onclick="bemap.sample.resetTable()"></th>
              </thead>
              <tbody></tbody>
            </table>
          </div>
          <div class="panel panel-default">
            <ul class="nav nav-tabs">
              <li class="nav-item active"><a class="nav-link active" data-toggle="tab" role="tab" href="#tab-1">Routing Criterias</a></li>
              <li class="nav-item"><a class="nav-link" data-toggle="tab" role="tab" href="#tab-2">Vehicle Profile</a></li>
              <li class="nav-item"><a class="nav-link" data-toggle="tab" role="tab" href="#tab-3">Options</a></li>
            </ul>
            <div class="tab-content panel-body">
              <div class="tab-pane fade in active" id="tab-1" role="tabpanel">
                <div class="row form-group">
                  <div class="col-md-4">
                    <label class="label-custom"><input type="checkbox" name="criterias" value="AVOID_FERRIES" /> Avoid Ferries</label>
                  </div>
                  <div class="col-md-4">
                    <label class="label-custom"><input type="checkbox" name="criterias" value="AVOID_MOTORWAYS" /> Avoid Motorways</label>
                  </div>
                  <div class="col-md-4">
                    <label class="label-custom"><input type="checkbox" name="criterias" value="AVOID_TOLLS" /> Avoid Tolls</label>
                  </div>
                </div>
                <div class="row form-group">
                  <div class="col-md-4">
                    <label class="label-custom"><input type="checkbox" name="criterias" id="criteriasFASTEST" value="FASTEST" /> Fastest</label>
                  </div>
                  <div class="col-md-4">
                    <label class="label-custom"><input type="checkbox" name="criterias" id="criteriasSHORTEST" value="SHORTEST" /> Shortest</label>
                  </div>
                  <div class="col-md-4">
                    <label class="label-custom"><input type="checkbox" name="criterias" value="AVOID_UNPAVED"/> Avoid Unpaved</label>
                  </div>
                </div>
                <div class="row form-group">
                  <div class="col-md-4">
                    <label class="label-custom"><input type="checkbox" name="criterias" value="AVOID_CROSSING_BORDER" /> Avoid Crossing Border</label>
                  </div>
                  <div class="col-md-4">
                    <label class="label-custom"><input type="checkbox" name="criterias" value="CARPOOL" /> Carpool</label>
                  </div>
                  <div class="col-md-4">
                    <label class="label-custom"><input type="checkbox" name="criterias" value="ECO_ENERGY" /> Eco Energy</label>
                  </div>
                </div>
              </div>
              <div class="tab-pane fade" id="tab-2" role="tabpanel">
                <div class="row">
                  <div class="col-md-12">
                    <label for="inputType" class="control-label">Transport Type</label><br/>
                    <select id="transportType" class="selectpicker" title="Choose one of the following...">
                      <option value="PEDESTRIAN">Pedestrian</option>
                      <option value="BICYCLE">Bicycle</option>
                      <option value="MOTORCYCLE">Motorcycle</option>
                      <option value="CAR" selected>Car</option>
                      <option value="TAXI">Taxi</option>
                      <option value="PUBLIC_BUS">Public Bus</option>
                      <option value="EMERGENCY">Emergency</option>
                      <option value="DELIVERY_TRUCK">Delivery Truck</option>
                      <option value="TRUCK">Truck</option>
                    </select>
                  </div>
                  <div class="col-md-12">
                    <br>
                    <label for="inputType" class="control-label"><input type="checkbox" name="feature" value="TRUCK" /> Enable Vehicle Features</label>
                  </div>
                  <div class="col-md-6">
                    <label for="inputType" class="control-label">Vehicle Height</label>
                    <input type="text" class="form-control" id="height" value="380" placeholder="Parameter chargingPointPower" />
                  </div>
                  <div class="col-md-6">
                    <label for="inputType" class="control-label">Vehicle Width</label>
                    <input type="text" class="form-control" id="width" value="240" placeholder="Parameter chargingPointPower" />
                  </div>
                  <div class="col-md-6">
                    <label for="inputType" class="control-label">Vehicle Length</label>
                    <input type="text" class="form-control" id="length" value="1875" placeholder="Parameter chargingPointPower" />
                  </div>
                  <div class="col-md-6">
                    <label for="inputType" class="control-label">Vehicle Weight</label>
                    <input type="text" class="form-control" id="weight" value="35" placeholder="Parameter chargingPointPower" />
                  </div>
                  <div class="col-md-6">
                    <label for="inputType" class="control-label">Vehicle Axle Weight</label>
                    <input type="text" class="form-control" id="axelWeight" value="10" placeholder="Parameter chargingPointPower" />
                  </div>
                </div>
              </div>
              <div class="tab-pane fade" id="tab-3" role="tabpanel">
                <div class="row form-group">
                  <div class="col-md-4">
                    <label class="label-custom"><input type="checkbox" name="options" value="POLYLINE" checked="true"/> Polyline</label>
                  </div>
                  <div class="col-md-4">
                    <label class="label-custom"><input type="checkbox" name="options" value="EVT_ENCODED_POLYLINE" data-event="EVENT" /> Encoded Polyline</label>
                  </div>
                  <div class="col-md-4">
                    <label class="label-custom"><input type="checkbox" id="optionTraffic" name="options" value="TRAFFIC"/> Real-time Traffic</label>
                  </div>
                  <div class="col-md-4">
                    <label class="label-custom"><input type="checkbox" name="options" value="TRAFFIC_PATTERNS"/> Traffic statistic (patterns)</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-12">
            <button type="button" class="btn btn-primary" id="run"><span></span> Search</button></br>
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
