# Near POI
Find POI around a coordinate, limited by distance of travel from coordinate to POI.

## Sample
For more details see the documentation API of [Near POI](index.html##subpage-rest_1_0_0-nearpoi-service.md).

<style>
.right {
 float: right;
 margin-top: 0.5em;
}
.colapseTariffs {
 cursor: pointer;
}
#poiInfoContainer {
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
</style>

<form class="form-horizontal" role="form">
  <div class="panel panel-default">
    <div class="panel-heading">Please enter valid address elements: Longitude | Latitude | Distance | Transport Type | Order By.</div>
      <div class="panel-body">
        <div class="row">
          <div class="col-md-6">
            <label for="long" class="control-label">Longitude</label>
            <input type="number" class="form-control" id="long" value="6.9667" placeholder="Longitude"/>
          </div>
          <div class="col-md-6">
            <label for="lat" class="control-label">Latitude</label>
            <input type="number" class="form-control" id="lat" value="43.6167" placeholder="Latitude"/>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <label for="distance" class="control-label">Distance</label>
            <input type="number"  min="1" max="1000"  class="form-control" id="distance" value="1000" placeholder="Distance"/>
          </div>
          <div class="col-md-6">
            <label for="inputType" class="control-label">Transport Type</label><br/>
            <select id="transportType" class="selectpicker" title="Choose one of the following...">
              <option value="PEDESTRIAN" selected>Pedestrian</option>
              <option value="BICYCLE">Bicycle</option>
              <option value="MOTORCYCLE">Motorcycle</option>
              <option value="CAR">Car</option>
              <option value="TAXI">Taxi</option>
              <option value="PUBLIC_BUS">Public Bus</option>
              <option value="EMERGENCY">Emergency</option>
              <option value="DELIVERY_TRUCK">Delivery Truck</option>
              <option value="TRUCK">Truck</option>
            </select>
          </div>
        </div>
        <div class="row form-group">
           <div class="col-md-6">
            <label for="inputType" class="control-label">Order By</label><br/>
            <select id="orderBy" class="selectpicker" title="Choose one of the following...">
              <option value="DISTANCE_ASC">Distance Ascending</option>
              <option value="DISTANCE_DESC" selected>Distance Descending</option>
              <option value="DURATION_ASC">Duration Ascending</option>
              <option value="DURATION_DESC">Duration Descending</option>
            </select>
          </div>
           <div class="col-md-6">
            <label for="inputType" class="control-label">Polyline</label><br/>
            <select id="polyline" class="selectpicker" title="Choose one of the following...">
              <option value="true" selected>True</option>
              <option value="false">False</option>
            </select>
          </div>
          <div class="col-md-6">
            <label for="inputType" class="control-label">Categories</label><br/>
            <select id="serviceCategories" class="selectpicker" title="Choose one or more of the following..." multiple>
              <option value="PETROL_STATION">Petrol station</option>
              <option value="PARKING_GARAGE">Parking garage</option>
              <option value="OPEN_PARKING_AREA">Open parking area</option>
              <option value="HOTEL_MOTEL">Hotel motel</option>
              <option value="RESTAURANT">Restaurant</option>
              <option value="POST_OFFICE">Post office</option>
              <option value="PHARMACY">Pharmacy</option>
              <option value="SHOPPING_CENTRE">Shopping center</option>
              <option value="GROCERY_STORE">Grocery store</option>
              <option value="SHOP">Shop</option>
              <option value="ATM">ATM</option>
            </select>
          </div>
        </div>
        <div class="row form-group">
          <div class="col-md-12">
            <button type="button" class="btn btn-primary" id="find"><span></span> Research</button>
          </div>
        </div>
        <div class="row">
          <div class="col-md-8">

```
{"bemap":{"language":"javascript","mapid":"map1","run":true,"hide":true, "src":"rest_1_0_0/examples-near-poi-service-v1_0_0.js"}}
```
          </div>
          <div class="col-md-4">
            <div id="poiInfoContainer"></div>
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
