# EV Reachable Area
Perform a calculation of reachable area dedicated to electrical vehicle. This service return a geometry of area.

## Sample
For more details see the documentation API of [EV Reachable Area](index.html#subpage-rest_1_0_0-evreachablearea-service.md).

<style>
#evTripPanel {
 margin: 1em 0 0 1em;
 position: absolute;
 width: 25em;
 z-index: 50;
}
#evTripOption .fas {
 color: #337AB7;
}
#evTripOption .ui-slider {
 background-color: #D0E8FF;
}
#evTripOption .icon-destination {
 margin-top: 0.75em;
}
.temperature-gradient {
 background-image: linear-gradient(90deg, #D0E8FF, #D0E8FF, #D5FFD0, #FFD0D0);
}
.battery-gradient {
 background-image: linear-gradient(90deg, #FFD0D0, #D0E8FF, #D0E8FF, #D5FFD0);
}
.commands {
 margin-left: 0 !important;
 margin-right: 0 !important;
}
.commands .command {
 padding-left: 0 !important;
 padding-right: 0 !important;
}
#run {
 margin-top: 2px;
}
.fullPageBtn {
 float: right;
}
.map-fullPage {
 position: fixed !important;
 top: 0 !important;
 left: 0 !important;
 z-index: 10 !important;
 height: 100% !important;
 background-color: #A9CBFE;
}
.evTripPanel-fullPage {
 position: fixed !important;
 top: 0 !important;
 left: 0 !important;
}
</style>

<form class="form-horizontal" role="form">
<div id="evTripPanel" class="shadow">
  <div id="evTripOption">
    <h3><span id="destinationsHeaderLabel">Destinations</span><span class="fullPageBtn glyphicon glyphicon-fullscreen"></span></h3>
    <div>
      <p>
        <input type="checkbox" id="weather" title="Temperature and weather forecast received from Weather Provider"> Automatic live weather<br/>
      </p>
      <p>
        <div id="temperatureGroup">
          <span class="fas fa-thermometer-half"></span> Outside temperature <span id="temperatureValue"></span> °.
          <div id="temperatureSlider" title="If Automatic weather deactivated, manual temperature to be defined" class="temperature-gradient"></div>
        </div>
      </p>
      <div class="row has-feedback">
        <div class="col-md-1">
          <span class="fas fa-home icon-destination"></span>
        </div>
        <div class="col-md-10">
          <input type="search" id="start" placeholder="center or start" title="Center or start point" class="form-control"><span class="glyphicon form-control-feedback"></span>
        </div>
      </div>
      <div id="stopSection" class="row has-feedback">
        <div class="col-md-1">
          <span class="fas fa-flag icon-destination"></span>
        </div>
        <div class="col-md-10">
          <input type="search" id="stop" placeholder="optional stop" title="Optional stop point used for round trip" class="form-control"><span class="glyphicon form-control-feedback"></span>
        </div>
      </div>
    </div>
    <h3><span id="vehicleHeaderLabel">Vehicle</span></h3>
    <div>
      <p>
        <span class="fas fa-car"></span> Brand
        <select id="brand" title="Select your vehicle brand" class="form-control"></select>
      </p>
      <p>
        <span class="fas fa-car"></span> Vehicle model
        <select id="vehicle" title="Select your vehicle model" class="form-control"></select>
      </p>
      <p>
        <span class="fas fa-suitcase"></span> <span id="payloadValue"></span> kg of extra payload (consumables or passengers weight for example).
        <div id="payloadSlider"></div>
      </p>
    </div>
    <h3><span id="batteryHeaderLabel">Battery</span></h3>
    <div>
      <p>
        <span class="fas fa-battery-three-quarters"></span> Initial state of charge (SOC): <span id="initBatLvlValue"></span> %.
        <div id="initBatLvlSlider" class="battery-gradient"></div>
      </p>
    </div>
  </div>
  <div class="row commands">
    <div class="col-xs-6 command">
      <button type="button" id="run" class="btn btn-primary form-control"><span class="fas fa-lg fa-route"></span> &nbsp; <b>Calculate</b> &nbsp; &nbsp; &nbsp;</button>
    </div>
    <div class="col-xs-6 command">
      <button type="button" id="clear" class="btn btn-default form-control"><span class="fas fa-lg fa-eraser"></span> &nbsp; <b>Clear</b> &nbsp; &nbsp; &nbsp;</button>
    </div>
  </div>
</div>
</form>

```
{"bemap":{"language":"javascript","mapid":"map1","run":true,"hide":true,"src":"rest_1_0_0/examples-evreachablearea-service-v1_0_0.js"}}
```

Request:
<textarea id="request"></textarea>
<button id="runDirectRequest" class="btn secondary">Run request</button>
<button id="runDirectRequestKml" class="btn secondary">Run request KML</button>

Response:
<textarea id="response"></textarea>

See the [authentication page](index.html#page-authentication.md) for the login, password process.
