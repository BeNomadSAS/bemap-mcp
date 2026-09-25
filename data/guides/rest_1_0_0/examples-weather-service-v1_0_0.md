# Weather

Provide the current weather and forecast.



## Sample
For more details, see the documentation API for [Weather](index.html#subpage-rest_1_0_0-weather-service.md).

<style>
#responseContainer {
 background-color: #F5F5F5;
 height: 500px;
 overflow: auto;
 overflow-x: hidden;
 padding-left: 1em;
}
.city-header {
 margin-top: 1em;
 font-size: 1.2em;
}
.city-name {
 margin-top: 1em;
 font-size: 1.6em;
}
.currentWeather {
 margin-top: 1em;
 font-size: 1.3em;
}
.forecast {
 margin-top: 1.5em;
 font-size: 1.3em;
}
.datetimeTxt {
 margin-top: 1em;
 font-size: 1.2em;
}
.weather-header {
 margin-top: 0.5em;
 font-size: 0.8em;
}
</style>

<form class="form-horizontal" role="form">
  <div class="panel panel-default">
    <div class="panel-heading"></div>
      <div class="panel-body">
        <div class="row">
          <div class="col-md-3">
            <label for="provider" class="control-label">Provider</label>
            <input type="text" class="form-control" id="provider" value="owm" placeholder="owm" disabled/>
          </div>
          <div class="col-md-3">
            <label class="control-label">
              <input type="checkbox" id="current" placeholder="Current weather" checked/>
              Current weather
            </label>
            : Returns the current weather condition in the response.
          </div>
          <div class="col-md-3">
            <label class="control-label">
              <input type="checkbox" id="forecast" placeholder="Forecast" checked/>
              Forecast
            </label>
            : Returns the forecast condition in the response.
          </div>
          <div class="col-md-3">
            <label class="control-label">
              <input type="checkbox" id="enableDtFilter" placeholder="Enable date and time filter"/>
              Date and time filter
            </label>
            <input type="text" id="dtFilter" value="" title="Date and time filter" class="form-control" />
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
            <p>&nbsp;</p>
            <ul id="searchByTabs" class="nav nav-tabs">
              <li class="nav-item active"><a class="nav-link" data-toggle="tab" data-v="coordinateTab" href="#coordinateTab">Search by coordinate</a></li>
              <li class="nav-item"><a class="nav-link" data-toggle="tab" data-v="cityTab" href="#cityTab">Search by city</a></li>
              <li class="nav-item"><a class="nav-link" data-toggle="tab" data-v="postalCodeTab" href="#postalCodeTab">Search by postal code</a></li>
              <li class="nav-item"><a class="nav-link" data-toggle="tab" data-v="cityIdTab" href="#cityIdTab">Search by city id</a></li>
            </ul>
            <div class="tab-content">
              <div id="coordinateTab" class="tab-pane fade in active">
                <p>Search the weather for a city by coordinates in the city area.</p>
                <div class="row">
                  <div class="col-md-6">
                    <label for="longitude" class="control-label">Longitude</label>
                    <input type="number" class="form-control" id="longitude" value="2.3412" placeholder="Longitude"/>
                  </div>
                  <div class="col-md-6">
                    <label for="latitude" class="control-label">Latitude</label>
                    <input type="number" class="form-control" id="latitude" value="48.85693" placeholder="Latitude"/>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-6">
                    <label class="control-label">
                      <input type="checkbox" id="enableCacheRadius" placeholder="Enable the cache radius parameter"/>
                      Enable the cache radius parameter:
                    </label>
                    <input type="number" class="form-control" id="cacheRadius" value="10000" placeholder="Cache radius parameter in meters. E.i. 10000 for 10 km."/>
                    <p><i>Cache radius parameter in meters (e.g., 10000 for 10 km).</i></p>
                  </div>
                </div>
              </div>
              <div id="cityTab" class="tab-pane fade">
                <p>Search for the weather in a city by its name.</p>
                <p>
                  <label for="cityName" class="control-label">City name</label>
                  <input type="text" class="form-control" id="cityName" placeholder="City name or city name,country code e.i: Paris,FR"/>
                </p>
                <p><i>City name or city name,country code e.i: Paris,FR</i></p>
              </div>
              <div id="postalCodeTab" class="tab-pane fade">
                <p>Search for the weather by postal code.</p>
                <p>
                  <label for="postalCode" class="control-label">Postal code</label>
                  <input type="text" class="form-control" id="postalCode" placeholder="Postal code or postal code,country code e.i.: 06000,FR"/>
                </p>
                <p><i>Postal code or postal code,country code e.i: 06000,FR</i></p>
              </div>
              <div id="cityIdTab" class="tab-pane fade">
                <p>Search for the weather in a city by its ID. To use this, the ID must be known. Searching by city name is also available.</p>
                <p>
                  <label for="cityId" class="control-label">City ID</label>
                  <input type="text" class="form-control" id="cityId" placeholder="ID of city"/>
                </p>
              </div>
            </div>
            <hr/>
          </div>
        </div>
        <div class="row form-group">
          <div class="col-md-12">
            <button type="button" class="btn btn-primary" id="find"><span></span> Find</button>
          </div>
        </div>
        <div class="row">
          <div class="col-md-8">
```
{"bemap":{"language":"javascript","mapid":"map1","run":true,"hide":true, "src":"rest_1_0_0/examples-weather-service-v1_0_0.js"}}
```
          </div>
          <div class="col-md-4">
            <div id="responseContainer"></div>
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

<span id="responseBottom"></span>

See the [authentication page](index.html#page-authentication.md) for the login, password process.
