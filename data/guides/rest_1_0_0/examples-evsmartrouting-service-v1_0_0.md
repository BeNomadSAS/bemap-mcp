# EV Smart Routing
Performs a route calculation dedicated to electrical vehicles optimizing overall driving and charging time. If necessary, the resulting route includes charging stations where recharging is required.
Finally, the result includes all related information of these charging stations.

## Sample
For more details see the documentation API of [EV Smart Routing](index.html#subpage-rest_1_0_0-evsmartrouting-service-v1_0_0.md).

<style>
#evTripPanel {
 margin: 1em 0 0 1em;
 position: absolute;
 width: 26em;
 z-index: 50;
}
.viaSettingsPanel {
 background-color: #F5F5F5;
 border: 1px solid #DEDEDE;
 border-radius: 4px;
 margin: 0.5em 0 1em 2em;
 padding: 0.6em;
 width: 18em;
}
.viaCol {
 padding-right: 0;
}
#evTripOption .listContainer {
 overflow-y: scroll;
 scrollbar-width: thin;
 height: 21.25em;
}
.listContainer::-webkit-scrollbar {
  width: 5px;
}
.listContainer::-webkit-scrollbar-track {
  background: #ddd;
}
.listContainer::-webkit-scrollbar-thumb {
  background: #666; 
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
.stepPointTimeSlot div {
 padding-left: 0;
}
.stepPointTimeSlotMinus {
 padding-left: 15px;
}
#run {
 margin-top: 2px;
}
#evTripResult .journey {
 background-color: #BFD5E5;
 box-shadow: 0 0 7px 0 rgba(0, 0, 0, .12);
 padding: 1.0em;
 font-weight: bold;
}
#evTripResult .listContainer {
 background-color: #FFF;
 overflow: scroll;
 height: 18em;
}
#evTripResult .list {
 padding: 1.0em;
 color: #296394;
}
#evTripResult .stepNote {
 border: 1px solid #CED3D8;
 border-radius: 3px;
}
#evTripResult .separatorContainer {
 text-align: center;
 color: #87B1D3;
}
#evTripResult .separator {
 color: #CED3D8;
}
#evTripResult .stepNote .address {
 font-weight: bold;
 text-align: center;
}
#evTripResult .stepNote .arrivalTime, #evTripResult .stepNote .departureTime {
 font-style: italic;
 font-size: 0.75em;
 text-align: center;
}
#evTripResult .stepNote .aBatLvl, #evTripResult .stepNote .chargingPower, #evTripResult .stepNote .chargeTime, #evTripResult .stepNote .dBatLvl, #evTripResult .stepNote .weather, #evTripResult .stepNote .chargingCost {
 text-align: center;
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
.drivingmode-icon-ECO {
 color: #57B157 !important;
}
.drivingmode-icon-NORMAL {
}
.drivingmode-icon-SPORT {
 color: #EA5627 !important;
}
.drivingmode-icon-CUSTOM {
 color: #686868 !important;
}
</style>

<form class="form-horizontal" role="form">
<div id="evTripPanel" class="shadow">
  <div id="evTripOption">
    <h3><span id="destinationsHeaderLabel">Destinations</span><span class="fullPageBtn glyphicon glyphicon-fullscreen"></span></h3>
    <div  class="listContainer">
      <p>
        <input type="checkbox" id="weather" title="Temperature and weather forecast received from Weather Provider" /> Automatic live weather<br/>
      </p>
      <p>
        <div id="temperatureGroup">
          <span class="fas fa-thermometer-half"></span> Outside temperature <span id="temperatureValue"></span> °.
          <div id="temperatureSlider" title="If Automatic weather deactivated, manual temperature to be defined" class="temperature-gradient"></div>
        </div>
      </p>
      <p>
        <span class="fas fa-calendar-alt"></span> Date and time of departure.
        <input type="text" id="departureTime" value="" title="Departure time" class="form-control" />
      </p>
      <div class="row has-feedback">
        <div class="col-md-1">
          <span class="fas fa-home icon-destination"></span>
        </div>
        <div class="col-md-10">
          <input type="search" id="start" placeholder="start" title="Start point" class="form-control" /><span class="glyphicon form-control-feedback"></span>
        </div>
      </div>
      <div class="row has-feedback">
        <div class="col-md-1">
          <span class="fas fa-chevron-down icon-destination"></span>
        </div>
        <div class="col-md-9 viaCol">
          <input type="search" id="via1" placeholder="via 1 (optional)" title="Via 1 (optional)" class="form-control" /><span class="glyphicon form-control-feedback"></span>
        </div>
        <div class="col-md-1">
          <span  id="via1SettingsBtn" class="fas fa-sliders-h icon-destination cursorPointer"></span>
        </div>
      </div>
      <div id="via1SettingsPanel" class="row has-feedback viaSettingsPanel">
        <p>
          <b>Forced charge:</b>
        </p>
        <p>
          <span class="fas fa-stopwatch"></span> Stop duration: <span id="stopDurationMinuteValue">60</span> minutes.
          <div id="stopDurationMinuteSlider"></div>
        </p>
        <p>
          <span class="fas fa-ruler"></span> Maximum distance of charge: <span id="chargeMaxDistValue">1000</span> meters.
          <div id="chargeMaxDistSlider"></div>
        </p>
        <p>
          <input type="checkbox" value="false" class="form-check-input viaAdvancedSettingsBtn" title="Advanced settings"> <b>Advanced settings:</b>
        </p>
        <div class="viaAdvancedSettingsPanel">
          <p>
            <span class="fas fa-tachometer-alt"></span> Maximum speed: <span id="maxSpdValue">0</span> km/h.
            <div id="maxSpdSlider"></div>
          </p>
        </div>
      </div>
      <div class="row has-feedback">
        <div class="col-md-1">
          <span class="fas fa-chevron-down icon-destination"></span>
        </div>
        <div class="col-md-9 viaCol">
          <input type="search" id="via2" placeholder="via 2 (optional)" title="Via 2 (optional)" class="form-control" /><span class="glyphicon form-control-feedback"></span>
        </div>
        <div class="col-md-1">
          <span  id="via2SettingsBtn" class="fas fa-sliders-h icon-destination cursorPointer"></span>
        </div>
      </div>
      <div id="via2SettingsPanel" class="row has-feedback viaSettingsPanel">
      </div>
      <div class="row has-feedback">
        <div class="col-md-1">
          <span class="fas fa-flag icon-destination"></span>
        </div>
        <div class="col-md-10">
          <input type="search" id="stop" placeholder="Stop" title="Stop point" class="form-control" /><span class="glyphicon form-control-feedback"></span>
        </div>
      </div>
      <p>&nbsp;</p>
      <p>
        <div id="stepPointTimeSlotsHeader" class="row">
          <div class="col-sm-10"><span class="fas fa-clock"></span> Step-point time slots</div>
          <div class="col-sm-2"><span class="fas fa-plus cursorPointer stepPointTimeSlotAdd"></span></div>
        </div>
        <div id="stepPointTimeSlotsContainer"></div>
      </p>
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
      <p>
        <span class="fas fa-plug"></span> Overwrite the default vehicle connectors.
        <input type="text" id="connectorTypes" value="" title="Connector types, comma list ei: 1,10,14" class="form-control" />
      </p>
    </div>
    <h3><span id="batteryHeaderLabel">Battery</span></h3>
    <div>
      <p>
        <span class="fas fa-battery-three-quarters"></span> Initial state of charge (SOC): <span id="initBatLvlValue"></span> %.
        <div id="initBatLvlSlider" class="battery-gradient"></div>
      </p>
      <p>
        <span class="fas fa-battery-quarter"></span> Minimum SOC during the trip: <span id="minBatLvlValue"></span> %.
        <div id="minBatLvlSlider" class="battery-gradient"></div>
      </p>
      <p>
        <span class="fas fa-battery-quarter"></span> Minimum SOC at arrival: <span id="minArrivalBatLvlValue"></span> %.
        <div id="minArrivalBatLvlSlider" class="battery-gradient"></div>
      </p>
      <p>&nbsp;</p>
      <p>
        <span class="fas fa-plug"></span> Fixed time at step-point: <span id="stepPointPluggingTimeValue"></span> minutes.
        <div id="stepPointPluggingTimeSlider"></div>
      </p>
    </div>
    <h3><span id="drivingHeaderLabel">Driving style</span></h3>
    <div class="listContainer">
      <p>
        <input type="checkbox" id="allowMaxSpdReco" title="Allow to calculate the maximum speeds to reach destination or step-point"> Allow to calculate the maximum speeds to reach destination or step-point.
      </p>
      <p>&nbsp;</p>
      <p>
        Driving mode: <span id="drivingModeIcon" class="fas fa-leaf"></span>
        <fieldset id="drivingMode" class="radioboxgroup">
          <label for="drivingModeEco" title="Economic mode to extend your autonomy. Reduce the air conditioning/heater, acceleration and speed">Eco.</label><input type="radio" name="drivingMode" id="drivingModeEco" value="ECO" />
          <label for="drivingModeNormal" title="Normal mode, use the predefined setting">Normal</label><input type="radio" name="drivingMode" id="drivingModeNormal" value="NORMAL" checked />
          <label for="drivingModeSport" title="Sport mode to use the maximum of your vehicle. Increase the acceleration and unlock speed">Sport</label><input type="radio" name="drivingMode" id="drivingModeSport" value="SPORT" />
          <label for="drivingModeCustom" title="Custom mode, specify your parameters">Custom</label><input type="radio" name="drivingMode" id="drivingModeCustom" value="CUSTOM" />
        </fieldset>
      </p>
      <div id="customDrivingPanel">
        <p>
          <span class="fas fa-tachometer-alt"></span> <input type="checkbox" id="limitMaxSpeedEnable" title="Limit maximum speed of vehicle used during the routing calculation" /> Limit maximum speed (km/h):
          <div id="limitMaxSpeedPanel">
            <input type="number" id="limitMaxSpeed" min="1" max="120" value="90" title="Limit maximum speed of vehicle used during the routing calculation" class="form-control" /><br/>
            <input type="checkbox" id="allowOverVehSpdLim" title="Allow to use 'limitMaxSpeed' value over speed limit of database vehicle." /> Allow override vehicle speed limit.
          </div>
        </p>
        <p>
          <span class="fas fa-tachometer-alt"></span> Speed ponderations:
          <div class="row">
            <div class="col-sm-4">Level 1</div>
            <div class="col-sm-8"><input type="number" id="spLevel1" min="0.1" max="1.0" step="0.1" value="1.0" title="Speed ponderation factor for the road network level 1. Value range 0.1 to 1.0" class="form-control" /></div>
          </div>
          <div class="row">
            <div class="col-sm-4">Level 2 </div>
            <div class="col-sm-8"><input type="number" id="spLevel2" min="0.1" max="1.0" step="0.1" value="1.0" title="Speed ponderation factor for the road network level 2. Value range 0.1 to 1.0" class="form-control" /></div>
          </div>
          <div class="row">
            <div class="col-sm-4">Level 3 </div>
            <div class="col-sm-8"><input type="number" id="spLevel3" min="0.1" max="1.0" step="0.1" value="1.0" title="Speed ponderation factor for the road network level 3. Value range 0.1 to 1.0" class="form-control" /></div>
          </div>
        </p>
      </div>
      <div>
        <input type="checkbox" id="enableMaxAccMaxDec" title="Enable parameters maxAcc and maxDec."> Enable parameters maxAcc and maxDec:
        <div id="maxAccMaxDecSection">
          <p>
            <span class="fas fa-tachometer-alt"></span> Maximum acceleration (in m/s²):
            <input type="number" id="maxAcc" min="0.1" max="10" step="0.1" value="2" title="Maximum acceleration (> 0.1, in m/s², based on vehicle's acceleration capacity and expected driving behavior)" class="form-control" />
          </p>
          <p>
            <span class="fas fa-tachometer-alt"></span> Maximum deceleration (in m/s²):
            <input type="number" id="maxDec" min="-10" max="-0.1" step="0.1" value="-2" title="Maximum deceleration (> 0.1, in m/s², based on vehicle's acceleration capacity and expected driving behavior)" class="form-control" />
          </p>
        </div>
      </div>
    </div>
    <h3><span id="otherHeaderLabel">Other options</span></h3>
    <div id="otherSection" class="listContainer">
      <p>
        <span class="fas fa-route"></span> Alternative route ID <span id="alRouteValue"></span>.
        <div id="alRouteSlider" title="Select the alternative route"></div>
      </p>
      <p>
        <input type="checkbox" id="restrictedEvse" title="Use restricted charging stations"> Allow private charging stations.
      </p>
      <p>
        <input type="checkbox" id="allowNaStatus" title="Use NA-availability charging stations"> Allow charging stations with unknown availability (NA).
      </p>
      <p>
        <input type="checkbox" id="aroundEvse" title="Display charging stations around step points"> Display charging stations around step points.
      </p>
      <p>
        <input type="checkbox" id="co2emissions" title="Display CO2 emission estimation"> Display CO2 emission estimation.
      </p>
      <p>
        <span class="fas fa-money-bill-alt"></span> Currency
        <select id="currency" title="Select your currency" class="form-control"></select>
      </p>
      <p>
        <input type="checkbox" id="lessExpensive" title="Find the less expensive charging station at step-point"> Find the less expensive charging station at step-point.
      </p>
      <p>
        <input type="checkbox" id="useTraffic" title="Use traffic info in routing calculation."> Traffic info.
      </p>
      <p>
        <input type="checkbox" id="avoidFerries" title="Finds a route without ferry"> Avoid ferry.
      </p>
      <p>
        <input type="checkbox" id="avoidMotorways" title="Finds a route without motorway"> Avoid motorway.
      </p>
      <p>
        <input type="checkbox" id="avoidTolls" title="Finds a route without tolls"> Avoid tolls.
      </p>
      <p>
        <input type="checkbox" id="avoidUnpaved" title="Finds a route without unpaved roads"> Avoid unpaved roads.
      </p>
      <p>
        <input type="checkbox" id="avoidCrossingBorder" title="Finds a route without crossing country border (if departure and arrival in same country)"> Finds a route without crossing country border.
      </p>
      <p>
        <div id="csfsHeader" class="row">
          <div class="col-sm-10"><span class="fas fa-filter"></span> Filter on charging stations &nbsp; &nbsp; &nbsp; <span class="fas fa-question-circle cursorPointer csfsHelp"></span></div>
          <div class="col-sm-2"><span class="fas fa-plus cursorPointer csfsAdd"></span></div>
        </div>
        <div id="csfsContainer"></div>
      </p>
    </div>
  </div>
  <div id="evTripResult" class="ui-accordion ui-widget ui-helper-reset">
    <h3 class="ui-accordion-header ui-corner-top ui-state-default ui-accordion-header-active ui-state-active ui-accordion-icons"><span id="tripResultLabel">Journey</span><span class="fullPageBtn glyphicon glyphicon-fullscreen"></span></h3>
    <div class="journey">
      <div class="row">
        <div class="col-sm-2"><span class="fas fa-ruler-horizontal"></span></div>
        <div class="col-sm-10">Distance: <span class="distance"></span> km</div>
      </div>
      <div class="row">
        <div class="col-sm-2"><span class="fas fa-clock"></span></div>
        <div class="col-sm-10">Driving duration: <span class="duration"></span></div>
      </div>
      <div class="row">
        <div class="col-sm-2"><span class="fas fa-clock"></span></div>
        <div class="col-sm-10">Charging duration: <span class="chargingTime"></span></div>
      </div>
      <div class="row">
        <div class="col-sm-2"><span class="fas fa-clock"></span></div>
        <div class="col-sm-10">Plugging duration: <span class="pluggingDuration"></span></div>
      </div>
      <div class="row">
        <div class="col-sm-2"><span class="fas fa-money-bill-alt"></span></div>
        <div class="col-sm-10">Charging cost: <span class="chargingCost"></span></div>
      </div>
      <div class="row">
        <div class="col-sm-2"><span class="fas fa-charging-station"></span></div>
        <div class="col-sm-10">Number of step point(s): <span class="stepPoints"></span></div>
      </div>
      <div class="row">
        <div class="col-sm-2"><span class="fas fa-battery-half"></span></div>
        <div class="col-sm-10">Battery level: <span class="batteryLevel"></span> %</div>
      </div>
      <div class="row">
        <div class="col-sm-2"><span class="fas fa-bolt"></span></div>
        <div class="col-sm-10">Consumption: <span class="consumption"></span> kWh</div>
      </div>
    </div>
    <div class="listContainer">
      <div class="list">
      </div>
    </div>
  </div>
  <button type="button" id="run" class="btn btn-primary form-control"><span class="fas fa-lg fa-route"></span> &nbsp; <b>Calculate EV trip</b> &nbsp; &nbsp; &nbsp;</button>
  <button type="button" id="back" class="btn btn-primary form-control"><span class="fas fa-lg fa-chevron-left"></span> &nbsp; <b>Back for new trip</b> &nbsp; &nbsp; &nbsp;</button>
</div>
</form>

```
{"bemap":{"language":"javascript","mapid":"map1","run":true,"hide":true,"src":"rest_1_0_0/examples-evsmartrouting-service-v1_0_0.js"}}
```

__Request__

<span id="requestComment"></span>
<textarea id="request"></textarea>
<button id="runDirectRequest" class="btn secondary">Run request</button>

__Response__

<span id="responseTime"></span>
<textarea id="response"></textarea>

See the [authentication page](index.html#page-authentication.md) for the login, password process.
