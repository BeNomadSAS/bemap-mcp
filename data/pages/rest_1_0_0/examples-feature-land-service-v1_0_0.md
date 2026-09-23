## Feature of land
Can used to get any information of map data item.
The research can made by geographical are (circle, bounding box, etc.) and filters.
The result is an attributes list for each geographical items.

## Sample
For more details see the documentation API of [Feature of land](index.html##subpage-rest_1_0_0-feature-service.md).

<form class="form-horizontal" role="form">
  <div class="panel panel-default">
    <div class="panel-heading">Please enter valid coordinate: Latitude and longitude.</div>
      <div class="panel-body">
        <div class="row">
          <div class="col-md-6">
            <label for="inputType" class="control-label">Longitude</label>
            <input type="text" class="form-control" id="longitude" value="2.3412" placeholder="Longitude" />
          </div>
          <div class="col-md-6">
            <label for="inputType" class="control-label">Latitude</label>
            <input type="text" class="form-control" id="latitude" value="48.85693" placeholder="Latitude" />
          </div>
        </div>
        <div class="row form-group">
          <div class="col-md-6">
            <label for="inputType" class="control-label">Distance (meters)</label>
            <input type="text" class="form-control" id="radius" value="1000" placeholder="Radius" />
          </div>
          <div class="col-md-6">
            <label for="inputType" class="control-label">Language code (fr/en/es/ru...)</label>
            <input type="text" class="form-control" id="language" value="on" placeholder="Language: fr/en/es/ru..." />
            <i>on = official name, the name used in the country.</i>
          </div>
         <div class="col-md-6">
            <label for="inputType" class="control-label">Layers</label>
            <input type="text" class="form-control" id="layers" value="" placeholder="Layers" />
          </div>
         <div class="col-md-6">
            <label for="inputType" class="control-label">Attributes</label>
            <input type="text" class="form-control" id="attributes" value="" placeholder="HISTORICAL_MONUMENT" />
          </div>
          <div class="col-md-6">
            <label for="inputType" class="control-label">AttCompares</label>
            <input type="text" class="form-control" id="attCompares" value="" placeholder="20306==TOUR EIFFEL" />
          </div>
          <div class="col-md-6">
            <label for="inputType" class="control-label">Maximum results</label>
            <input type="number" min="0" class="form-control" id="maximumResults" value="2" />
          </div>
          <div id="options" class="col-md-12">
            <label for="inputType" class="control-label">Options</label><br>
            <input type="checkbox" class="control-form" id="sortbyneartofarfromcenter" value="SORTBY_NEARTOFAR_FROMCENTER"> Sort By Near To Far From Center</input>
            &emsp; <input type="checkbox" class="control-form" id="polygonsearch" value="POLYGON_SEARCH"> Polygon Search</input>
            &emsp; <input type="checkbox" class="control-form" id="distancefromcenter" value="DISTANCE_FROMCENTER"> Distance From Center</input>
            &emsp; <input type="checkbox" class="control-form" checked=true id="revegeocodingsearch" value="REVGEOCODING_SEARCH"> Reverse Geocoding Search</input>
            &emsp; <input type="checkbox" class="control-form" id="polygon" value="POLYGON"> Polygon</input>
            &emsp; <input type="checkbox" class="control-form" id="filterbyradius" value="FILTERBY_RADIUS"> Filter By Radius</input>
            &emsp; <input type="checkbox" class="control-form" id="rawdata" value="RAWDATA"> Raw data</input>
            &emsp; <input type="checkbox" class="control-form" id="visiblefilter" value="VISIBLE_FILTER"> Visible Filter</input>
            &emsp; <input type="checkbox" class="control-form" id="trafficpredective" value="TRAFFIC_PREDICTIVE"> Traffic Predective</input>
            &emsp; <input type="checkbox" class="control-form" id="traffichistorical" value="TRAFFIC_HISTORICAL" placeholder="(Beta version)"> Traffic Historical</input>
            &emsp; <input type="checkbox" class="control-form" id="othersearch" value="OTHER_SEARCH"> Other Search</input>
            &emsp; <input type="checkbox" class="control-form" id="traffic" value="TRAFFIC"> Traffic</input>
            &emsp; <input type="checkbox" class="control-form" id="svsallclass" value="SVS_ALL_CLASS"> All Class (only SVS output)</input>
            &emsp; <input type="checkbox" class="control-form" id="svsallattribute" value="SVS_ALL_ATTRIBUTE"> All Attribute (only SVS output)</input>
          </div>
        </div>
        <div class="row form-group">
          <div class="col-md-12">
            <button type="button" class="btn btn-primary" id="find"><span></span> Research</button>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">


```
{"bemap":{"language":"javascript","mapid":"map1" ,"run":true,"hide":true, "src":"rest_1_0_0/examples-feature-land-service-v1_0_0.js"}}
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
