# Reverse geocoding
Reverse geocoding is the process of back (reverse) coding of a point location (latitude, longitude) to a readable address or place name. This permits the identification of nearby street addresses, places, and/or areal subdivisions such as neighbourhoods, county, state, or country. Combined with geocoding and routing services, reverse geocoding is a critical component of mobile location-based services and Enhanced 911 to convert a coordinate obtained by GPS to a readable street address which is easier to understand by the end user.

_For more details: [Wikipedia](https://en.wikipedia.org/wiki/Reverse_geocoding)_

## Sample
For more details see the documentation API of [reverse-geocoding](index.html#subpage-rest_1_0_0-reversegeocoding-service.md).

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
            <label for="inputType" class="control-label">Radius (meters)</label>
            <input type="text" class="form-control" id="radius" value="1000" placeholder="Radius" />
          </div>
          <div class="col-md-6">
            <label for="inputType" class="control-label">Language code (fr/en/es/ru...)</label>
            <input type="text" class="form-control" id="language" value="on" placeholder="Language: fr/en/es/ru..." />
            <i>on = official name, the name used in the country.</i>
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
{"bemap":{"language":"javascript","mapid":"map1","run":true,"hide":true, "src":"rest_1_0_0/examples-reversegeocoding-service-v1_0_0.js"}}
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
