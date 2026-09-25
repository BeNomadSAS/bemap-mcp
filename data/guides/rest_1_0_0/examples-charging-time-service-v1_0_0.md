# Charging Time service
Computes an estimated charging time, based on energy vehicle feature (evf), connector power and charge need.

## Sample
For more details see the documentation API of [Charging Time service](index.html#subpage-rest_1_0_0-chargingtime-service.md).

<form class="form-horizontal" role="form">
  <div class="panel panel-default">
    <ul class="nav nav-tabs">
      <li class="nav-item"><a class="nav-link active" data-toggle="tab" role="tab" href="#tab-1">Basic parameters</a></li>
      <li class="nav-item"><a class="nav-link" data-toggle="tab" role="tab" href="#tab-2">Energetic vehicle profile</a></li>
    </ul>
    <div class="tab-content panel-body">
      <div class="tab-pane fade in active" id="tab-1" role="tabpanel">
        <div class="row form-group">
          <div class="col-md-6">
            <label class="control-label">Nominal power of researched station in kW</label>
            <input type="text" class="form-control" id="chargingPointPower" value="55" placeholder="Parameter chargingPointPower" />
          </div>
          <div class="col-md-6">
            <label class="control-label">Desired level of battery after charging (in percent)</label>
            <input type="number" class="form-control checkOption" id="chargingBatteryLevel" value="80" min="1" max="100" placeholder="Parameter chargingBatteryLevel" />
          </div>
        </div>
        <div class="row form-group">
          <div class="col-md-6">
            <label class="control-label">Define the current type of charging point power</label>
            <select id="chargingCurrentType" title="Define the current type of charging point power." class="form-control checkOptionSelect">
              <option value="NA" selected>Not available</option>
              <option value="AC_SINGLE_PHASE">Alternating current (AC), single phase.</option>
              <option value="AC_THREE_PHASES">Alternating current (AC), three phases.</option>
              <option value="DC">Direct current (DC).</option>
            </select>
        </div>
          <div class="col-md-6 col-lg-2">
      			 <label class="control-label">Optimum Battery Charge</label>
      			  <select id="optimumBatteryCharge" title="Optimum Battery Charge." class="form-control checkOptionSelect">
                <option value="ACTIVATE">Activate</option>
                <option value="DESACTIVATE">Deactivate</option>
              </select>
            </div>
        </div>
      </div>
      <div class="tab-pane fade" id="tab-2" role="tabpanel">
        <div class="row">
          <div class="col-md-6">
            <p>
              <label class="control-label">Brand</label>
              <select id="brand" title="Select your vehicle brand" class="form-control">
                <option value="">--NOT SPECIFIED--</option>
              </select>
            </p>
          </div>
          <div class="col-md-6">
            <p>
            <label class="control-label">Vehicle model</label>
              <select id="vehicle" title="Select your vehicle model" class="form-control"></select>
            </p>
          </div>
        </div>
        </br>
        <div class="row">
          <div class="col-md-6">
            <label class="control-label">Scx</label>
            <input type="text" class="form-control" id="scx" value="0.75" placeholder="Product of vehicle's front area and aerodynamic coefficient (in m²)." />
          </div>
          <div class="col-md-6">
            <label class="control-label">Crr</label>
            <input type="text" class="form-control" id="crr" value="0.012" placeholder="Vehicle's tire rolling resistance coefficient (dimension-less, in interval ]0, 1[)." />
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <label class="control-label">Engine efficiency</label>
            <input type="text" class="form-control" id="engineEfficiency" value="0.693" placeholder="Vehicle's efficiency coefficient between engine and gear (dimension-less, in interval ]0, 1[)." />
          </div>
          <div class="col-md-6">
            <label class="control-label">Battery capacity in kWh</label>
            <input type="text" class="form-control checkOption" id="batCapacity" value="22" placeholder="Vehicle's capacity of the battery (in kWh, only if electric vehicle or hybrid re-chargeable, 0 otherwise)." />
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <label class="control-label">Dry weight in kg</label>
            <input type="text" class="form-control" id="dryWeight" value="1468" placeholder=" Vehicle's weight without any consumables or passengers (in kg)." />
          </div>
          <div class="col-md-6">
            <label class="control-label">Payload in kg</label>
            <input type="text" class="form-control" id="payload" value="100" placeholder="Vehicle's extra load (consumables and passengers weight) (in kg)." />
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <label class="control-label">Auxiliary consumption in W</label>
            <input type="text" class="form-control" id="auxConsumption" value="300" placeholder="Vehicle's instantaneous auxiliary equipments consumption (in W)." />
          </div>
          <div class="col-md-6">
            <label class="control-label">Maximum acceleration in m/s²</label>
            <input type="text" class="form-control" id="maxAccel" value="2.1" placeholder="Maximum acceleration (> 0.1, in m/s², based on vehicle's acceleration capacity and expected driving behavior)." />
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <label class="control-label">Maximum deceleration in m/s²</label>
            <input type="text" class="form-control" id="maxDecel" value="-2" placeholder="Maximum deceleration (< -0.1, in m/s², based on vehicle's braking capacity and expected driving behavior)." />
          </div>
          <div class="col-md-6">
             <label class="control-label">Outside temperature in °C</label>
             <input type="text" class="form-control" id="extTemp" value="15" placeholder="Outside temperature (in °C)." />
          </div>
        </div>
        <div class="row form-group">
          <div class="col-md-6">
            <label class="control-label">Vehicle's current energy load in kWh</label>
            <input type="text" class="form-control" id="energyLoad" value="12" placeholder="Vehicle's current energy load, state of charge (in kWh)." />
          </div>
          <div class="col-md-6">
            <label class="control-label">Maximum charge power AC single phase authorized by the vehicle in kW</label>
            <input type="text" class="form-control" id="maxChargePowerAcSinglePhase" value="7" placeholder="Maximum charge power AC single phase authorized by the vehicle (in kW)." />
          </div>
        </div>
        <div class="row form-group">
          <div class="col-md-6">
            <label class="control-label">Defines if the vehicle supports regenerative braking</label>
            <select id="regenerativeBraking" title="Defines if the vehicle supports regenerative braking." class="form-control">
              <option value="true" selected>Enable</option>
              <option value="false">Disable</option>
            </select>
          </div>
          <div class="col-md-6">
            <label class="control-label">Maximum charge power AC three phases authorized by the vehicle (in kW)</label>
            <input type="text" class="form-control" id="maxChargePowerAcThreePhases" value="23" placeholder="Maximum charge power AC three phases authorized by the vehicle (in kW)." />
          </div>
        </div>
        <div class="row form-group">
          <div class="col-md-6">
          </div>
          <div class="col-md-6">
            <label class="control-label">Maximum charge power DC authorized by the vehicle (in kW)</label>
            <input type="text" class="form-control" id="maxChargePowerDc" value="100" placeholder="Maximum charge power DC authorized by the vehicle (in kW)." />
          </div>
        </div>
      </div>
      <div class="row form-group">
        <div class="col-md-12">
          <button type="button" class="btn btn-primary" id="run"><span></span> Search</button>
        </div>
      </div>
    </div>
  </div>
</form>

```
{"bemap":{"language":"javascript", "run":true,"hide":true, "src":"rest_1_0_0/examples-charging-time-service-v1_0_0.js"}}
```

__Request__

<span id="requestComment"></span>
<textarea id="request"></textarea>
<button id="runDirectRequest" class="btn secondary">Run request</button>

__Response__

<span id="responseTime"></span>
<textarea id="response"></textarea>

See the [authentication page](index.html#page-authentication.md) for the login, password process.
