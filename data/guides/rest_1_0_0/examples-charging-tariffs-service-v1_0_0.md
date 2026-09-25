# Charging Station Tariffs service
Returns the list of tariffs of charging stations.

The list of available charge passes can be get from the [Charge Pass](index.html#subpage-rest_1_0_0-examples-charging-chargepass-service-v1_0_0.md),
See the [API Charge Pass](index.html#subpage-rest_1_0_0-chargingstation-chargepass-service.md).

The IDs of pool, charging station and connector can be get from the [Charging Stations](index.html#subpage-rest_1_0_0-examples-charging-station-service-v1_0_0.md),
see the [API Charging Stations](index.html#subpage-rest_1_0_0-chargingstation-search-service.md).



## Sample
For more details see the documentation API of [Charging Station Tariffs service](index.html#subpage-rest_1_0_0-chargingstation-tariffs-service.md).

<form class="form-horizontal" role="form">
  <div class="panel panel-default">
    <div class="panel-heading">Get tariffs of charging stations</div>
      <div class="panel-body">
        <div class="row form-group">
          <div class="col-md-12">
            <div id="hashIdsHeader" class="row">
              <div class="col-sm-10"><label for="inputType" class="control-label">Charge pass Hash ID(s)</label></div>
              <div class="col-sm-2"><label for="inputType" class="control-label"><span class="fas fa-plus cursorPointer addHashId"></span></label></div>
            </div>
            <div id="hashIdsContainer"></div>
          </div>
        </div>
        <div class="row form-group">
          <div class="col-md-12">
            <div id="linksHeader" class="row">
              <div class="col-sm-10"><label for="inputType" class="control-label">Link(s) to station(s)</label></div>
              <div class="col-sm-2"><label for="inputType" class="control-label"><span class="fas fa-plus cursorPointer addLink"></span></label></div>
            </div>
            <div id="linksContainer"></div>
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

```
{"bemap":{"language":"javascript", "run":true,"hide":true, "src":"rest_1_0_0/examples-charging-tariffs-service-v1_0_0.js"}}
```

__Request__

<span id="requestComment"></span>
<textarea id="request"></textarea>
<button id="runDirectRequest" class="btn secondary">Run request</button>

__Response__

<span id="responseTime"></span>
<textarea id="response"></textarea>

See the [authentication page](index.html#page-authentication.md) for the login, password process.
