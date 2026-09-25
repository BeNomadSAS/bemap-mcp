## Roads extractor
Extract the roads information from a specified polygon and a type of vehicle.
Performs a Road-Matching (or Map-Matching) process for a specified type of vehicle within a specified polygon.
This method builds a list of `ExtractedRoadFront` on each road element within the specified polygon.
For road elements which are open in both directions according to the specified type of vehicle, two `ExtractedRoadFront` will be created, one for each direction.
The angle set on each `ExtractedRoadFront` defines the direction this point has to be reached should you use these points to perform a route calculation or trip optimization.

> NOTE: The maximum number of `ExtractedRoadFront` that can be created is limited to 1500.


## Sample
For more details see the documentation API of [Roads extractor](index.html#subpage-rest_1_0_0-roadsextractor-service.md).

<style>
#responseContainer {
 background-color: #F5F5F5;
 height: 500px;
 overflow: auto;
 overflow-x: hidden;
 padding-left: 1em;
}
</style>

<form class="form-horizontal" role="form">
  <div class="panel panel-default">
    <div class="panel-heading">Please enter valid parameters. You can draw the polygon on the map by clicking on "Draw polygon" then clicking on the map.</div>
      <div class="panel-body">
        <div class="row">
          <div class="col-md-6">
            <label for="transportType" class="control-label">Transport type</label>
            <select id="transportType" class="form-control">
              <option value="CAR">CAR</option>
              <option value="TRUCK">TRUCK</option>
              <option value="PEDESTRIAN">PEDESTRIAN</option>
              <option value="BICYCLE">BICYCLE</option>
              <option value="MOTORCYCLE">MOTORCYCLE</option>
              <option value="TAXI">TAXI</option>
              <option value="PUBLIC_BUS">PUBLIC_BUS</option>
              <option value="EMERGENCY">EMERGENCY</option>
            </select>
          </div>
          <div class="col-md-6">
            <label for="classIdFilters" class="control-label">Class ID Filters (comma separated). The class ID must be a road network.</label>
            <input type="text" class="form-control" id="classIdFilters" value="" placeholder="e.g. 4000,4016,4032,4048,4064,4080,4096,4256,4272,4288,4304,4320,4336,4512,4528,4544,4560,4576,4592,4768,4784,4800,4816,4832,4848" />
          </div>
        </div>
        <div class="row form-group">
          <div id="options" class="col-md-6">
            <label class="control-label">Options</label><br>
            <input type="checkbox" id="adminPath"> Admin Path</input>
            &emsp; <input type="checkbox" id="filterElementsHouseNumbers"> Filter Elements House Numbers</input>
            &emsp; <input type="checkbox" id="filterClippedElements"> Filter Clipped Elements</input>
          </div>
          <div class="col-md-6">
            <label for="outputLanguage" class="control-label">Output Language</label>
            <input type="text" class="form-control" id="outputLanguage" value="" placeholder="e.g. en" />
          </div>
        </div>
        <div class="row form-group">
          <div class="col-md-12">
            <button type="button" class="btn btn-primary" id="find"><span></span> Extract roads</button>
            <button type="button" class="btn btn-default" id="drawPolygon">Draw polygon</button>
            <button type="button" class="btn btn-default" id="clearPolygon">Clear polygon</button>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">

```
{"bemap":{"language":"javascript","mapid":"map1" ,"run":true,"hide":true, "src":"rest_1_0_0/examples-roadsextractor-service-v1_0_0.js"}}
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

__Request__

<span id="requestComment"></span>
<textarea id="request"></textarea>
<button id="runDirectRequest" class="btn secondary">Run request</button>

__Response__

<span id="responseTime"></span>
<textarea id="response"></textarea>

See the [authentication page](index.html#page-authentication.md) for the login, password process.
