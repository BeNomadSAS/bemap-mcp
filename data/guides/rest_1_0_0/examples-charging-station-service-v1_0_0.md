# Charging Station service
Returns the list of charging station (EVSE) around a coordinate.

## Sample
For more details see the documentation API of [Charging Station service](index.html#subpage-rest_1_0_0-chargingstation-search-service.md).

<style>
.right {
 float: right;
 margin-top: 0.5em;
}
.colapseTariffs {
 cursor: pointer;
}
#poolInfoContainer {
 background-color: #F5F5F5;
 height: 500px;
 overflow: auto;
 padding-left: 1em;
}
.poolInfoPoolTitle {
 color: #337AB7;
}
.poolInfoStationTitle {
 color: #275C8B;
}
.poolInfoChargingPointTitle {
 color: #275C8B;
}
.availabilityStatus-UNSUPPORTED_VALUE {
 color: #413628;
}
.availabilityStatus-NA {
 color: #4C516D;
}
.availabilityStatus-OUT_OF_ORDER {
 color: #C90016;
}
.availabilityStatus-IN_SERVICE, .availabilityStatus-IN_SERVICE_FREE {
 color: #8DB600;
}
.availabilityStatus-IN_SERVICE_BUSY, .availabilityStatus-IN_SERVICE_RESERVED {
 color: #008000;
}
.availabilityStatus-FUTURE {
 color: #A99A86;
}
</style>

<form class="form-horizontal" role="form">
  <div class="panel panel-default">
    <div class="panel-heading">Research of charging station for electrical vehicle</div>
      <div class="panel-body">
        <div class="row form-group">
          <div class="col-md-3">
            <div id="placePannel">
              <label for="inputType" class="control-label">Place search tool</label>
              <input type="search" class="form-control" id="place" placeholder="Place"/>
            </div>
            <label for="inputType" class="control-label">Longitude</label><span class="fas fa-search-location right cursorPointer placeHelperBtn"></span>
            <input type="number" class="form-control" id="longitude" value="2.3412" placeholder="Longitude"/>
            <label for="inputType" class="control-label">Latitude</label><span class="fas fa-search-location right cursorPointer placeHelperBtn"></span>
            <input type="number" class="form-control" id="latitude" value="48.85693" placeholder="Latitude"/>
            <label for="inputType" class="control-label">Radius in meter</label>
            <input type="number" class="form-control" id="radius" value="1000" min="1" max="150000" placeholder="Radius around point"/>
          </div>
          <div class="col-md-3">
            <label for="inputType" class="control-label">Maximum Results</label>
            <input type="number" class="form-control" id="maxProviderResult" value="20" min="1" max="50" placeholder="Maximum providers results"/>
            <label for="inputType" class="control-label">Connectors filter</label>
            <input type="text" class="form-control" id="connectorsFilter" value="" placeholder="Connectors filter; e.i: 31,32,38,47,48"/>
          </div>
          <div class="col-md-3">
            <label for="inputType" class="control-label">Pool ID filter</label>
            <input type="text" class="form-control" id="poolIdFilter" value="" placeholder="Filtration on pool ID"/>
            <label for="inputType" class="control-label">Station ID filter</label>
            <input type="text" class="form-control" id="stationIdFilter" value="" placeholder="Filtration on station ID"/>
            <label for="inputType" class="control-label">Point ID filter</label>
            <input type="text" class="form-control" id="pointIdFilter" value="" placeholder="Filtration on point ID"/>
          </div>
          <div class="col-md-3">
            <label for="selectType" class="control-label">Mode</label></br>
            <select id="mode" class="selectpicker">
              <option value="LOCAL">From local base (LOCAL)</option>
              <option value="REMOTE">From provider (REMOTE)</option>
              <option value="LOCAL_AND_REMOTE">LOCAL_AND_REMOTE</option>
              <option value="LOCAL_OR_REMOTE" selected>LOCAL_OR_REMOTE</option>
              <option value="REMOTE_OR_LOCAL">REMOTE_OR_LOCAL</option>
              <option value="LOCAL_IFNOPOOLS_REMOTE">LOCAL_IFNOPOOLS_REMOTE</option>
              <option value="REMOTE_IFNOPOOLS_LOCAL">REMOTE_IFNOPOOLS_LOCAL</option>
            </select>
            <label for="selectType" class="control-label">Depth of path</label></br>
            <select id="pathDepth" class="selectpicker">
              <!-- <option value="PATH_AUTO">PATH_AUTO</option> -->
              <option value="PATH_POOL_MAP">PATH_POOL_MAP</option>
              <option value="PATH_POINT_MAP">PATH_POINT_MAP</option>
              <option value="PATH_POOL">PATH_POOL</option>
              <option value="PATH_STATION">PATH_STATION</option>
              <option value="PATH_POINT" selected>PATH_POINT</option>
            </select>
            <label for="selectType" class="control-label">Deprecated connector</label></br>
            <select id="deprecatedConnector" class="selectpicker">
              <option value="false" selected>OFF</option>
              <option value="true">ON</option>
            </select>
          </div>
        </div>
        <div class="row form-group">
          <div class="col-md-3">
            <label for="inputType" class="control-label">Filter engine version</label>
            <input type="number" class="form-control" id="csfsVersion" value="2" min="1" max="2" placeholder="Generation of filter engine"/>
          </div>
          <div class="col-md-7">
            <div id="csfsHeader" class="row">
              <div class="col-sm-10"><label for="inputType" class="control-label"><span class="fas fa-question-circle cursorPointer csfsHelp"></span> Filters</label></div>
              <div class="col-sm-2"><label for="inputType" class="control-label"><span class="fas fa-plus cursorPointer csfsAdd"></span></label></div>
            </div>
            <div id="csfsContainer"></div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
            <button type="button" class="btn btn-primary" id="run"><span></span> Search</button> &nbsp; &nbsp; <span id="responseTimeA"></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</form>

<div id="responseContainer" class='row'></div>
<div class="row">
  <div class="col-md-8">
```
{"bemap":{"language":"javascript","mapid":"map1","run":true,"hide":true,"src":"rest_1_0_0/examples-charging-station-service-v1_0_0.js"}}
```
  </div>
  <div class="col-md-4">
    <div id="poolInfoContainer"></div>
  </div>
</div>

__Request__

<textarea id="request"></textarea>
<button id="runDirectRequest" class="btn secondary">Run request</button>

__Response__

<span id="responseTimeB"></span>
<textarea id="response"></textarea></br>
<pre id="responseSimpleView"></pre>


See the [authentication page](index.html#page-authentication.md) for the login, password process.
