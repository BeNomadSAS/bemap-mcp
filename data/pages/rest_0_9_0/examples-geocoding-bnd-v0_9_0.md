# Geocoding
Geocoding is the process of converting textual postal address to a geographical longitude and latitude coordinates.

_For more details: [Wikipedia](https://en.wikipedia.org/wiki/Geocoding)_

## Sample
For more details see the documentation API of [Geocoding](index.html#subpage-rest_0_9_0-geocoding-bnd.md).

<form class="form-horizontal" role="form">
  <div class="panel panel-default">
    <div class="panel-heading">Please enter valid address elements: Country | City | Postal Code | Street number.</div>
      <div class="panel-body">
        <div class="row">
          <div class="col-md-6">
            <label for="inputType" class="control-label">Country</label>
            <input type="text" class="form-control" id="country" value="France" placeholder="Country"/>
          </div>
          <div class="col-md-6">
            <label for="inputType" class="control-label">City</label>
            <input type="text" class="form-control" id="city" value="Paris" placeholder="City"/>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <label for="inputType" class="control-label">Postal code</label>
            <input type="text" class="form-control" id="postalCode" value="" placeholder="PostalCode"/>
          </div>
          <div class="col-md-6">
            <label for="inputType" class="control-label">Place (street name or POI)</label>
            <input type="text" class="form-control" id="street" value="Villa des pyrénées" placeholder="Street"/>
          </div>
        </div>
        <div class="row form-group">
          <div class="col-md-6">
            <label for="inputType" class="control-label">Language code (fr/en/es/ru...)</label>
            <input type="text" class="form-control" id="language" value="xx" placeholder="Language: fr/en/es/ru..."/>
          </div>
          <div class="col-md-6">
            <label for="selectType" class="control-label">Search type</label><br/>
            <select id="searchType" class="selectpicker" title="Choose one of the following...">
              <option value="CONTAINS">CONTAINS</option>
              <option value="FUZZY" selected>FUZZY</option>
              <option value="KEY_SEARCH">KEY_SEARCH</option>
              <option value="STRICT">STRICT</option>
              <option value="STRICT_BEGINNING">STRICT_BEGINNING</option>
              <option value="WORD_BEGINNING">WORD_BEGINNING</option>
            </select>
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
{"bemap":{"language":"javascript","mapid":"map1","run":true,"hide":true, "src":"rest_0_9_0/examples-geocoding-bnd-v0_9_0.js"}}
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
