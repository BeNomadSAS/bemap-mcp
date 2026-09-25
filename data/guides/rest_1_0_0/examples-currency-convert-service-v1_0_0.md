# Currency convert
Service can convert a currency value to another.

_For more details: [Wikipedia](https://en.wikipedia.org/wiki/Exchange_rate)_

## Sample
For more details see the documentation API of [Currency convert](index.html#subpage-rest_1_0_0-currency-convert-service.md).

<form class="form-horizontal" role="form">
  <div class="panel panel-default">
    <div class="panel-heading"></div>
      <div class="panel-body">
        <div class="row">
          <div class="col-md-6">
            <label for="inputType" class="control-label">Amount from</label>
            <input type="number" class="form-control" id="amountFrom" value="1.0" placeholder="Amount from"/>
          </div>
          <div class="col-md-6">
            <label for="inputType" class="control-label">Currency</label><br/>
            <select id="currencyFrom" class="selectpicker" title="Currency from"></select>
          </div>
        </div>
        <div class="row form-group">
          <div class="col-md-6">
            <label for="inputType" class="control-label">Amount to</label>
            <span class="form-control" id="amountTo" value=""></span>
          </div>
          <div class="col-md-6">
            <label for="inputType" class="control-label">Currency</label><br/>
            <select id="currencyTo" class="selectpicker" title="Currency to"></select>
          </div>
        </div>
        <div class="row form-group">
          <div class="col-md-12">
            <button type="button" class="btn btn-primary" id="convert"><span></span> Convert</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</form>
```
{"bemap":{"language":"javascript", "run":true,"hide":true, "src": "rest_1_0_0/examples-currency-convert-service-v1_0_0.js"}}
```

Request:
<textarea id="request"></textarea>
<button id="runDirectRequest" class="btn secondary">Run request</button>

Response:
<textarea id="response"></textarea>

See the [authentication page](index.html#page-authentication.md) for the login, password process.
