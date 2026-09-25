# BeMap JS API

## Geocoding with autocomplete
Geocoding with interactive autocomplete, or word completion, is a feature in which an application predicts the rest of a word a user is typing

_For more details: [Wikipedia](https://en.wikipedia.org/wiki/Autocomplete)_

## Sample
<style media="screen">
  /*the container must be positioned relative:*/
  #geoautocomplete-form .autocomplete {
    position: relative;
    display: inline-block;
  }

  #geoautocomplete-form input {
    border: 1px solid transparent;
    background-color: #f1f1f1;
    padding: 10px;
    font-size: 16px;
  }

  #geoautocomplete-form input[type=text] {
    background-color: #f1f1f1;
    width: 100%;
  }

  #geoautocomplete-form input[type=submit] {
    background-color: DodgerBlue;
    color: #fff;
    cursor: pointer;
  }

  #geoautocomplete-form .autocomplete-items {
    position: absolute;
    border: 1px solid #d4d4d4;
    border-bottom: none;
    border-top: none;
    z-index: 99;
    /*position the autocomplete items to be the same width as the container:*/
    /*top: 100%;*/
    margin-right: 16px;
    margin-left: 16px;
    left: 0;
    right: 0;
  }

  #geoautocomplete-form .autocomplete-items div {
    padding: 10px;
    cursor: pointer;
    background-color: #fff;
    border-bottom: 1px solid #d4d4d4;
  }

  /*when hovering an item:*/
  #geoautocomplete-form .autocomplete-items div:hover {
    background-color: #e9e9e9;
  }

  /*when navigating through the items using the arrow keys:*/
  #geoautocomplete-form .autocomplete-active {
    background-color: DodgerBlue !important;
    color: #ffffff;
  }
</style>
<form class="form-horizontal" role="form">
  <div class="panel panel-default">
    <div class="panel-heading">Please enter valid address elements: Country code | City | Street .</div>
    <div class="panel-body" id="geoautocomplete-form">
      <div class="row">
        <div class="col-md-12">
          <label for="inputType" class="control-label">Country code</label>
          <input type="text" class="form-control" id="country" value="FRA" placeholder="Country" />
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <label for="inputType" class="control-label">City</label>
          <input type="text" class="form-control" id="city" value="" placeholder="City" />
        </div>
      </div>
      <div class="row form-group">
        <div class="col-md-12">
          <label for="inputType" class="control-label">Street</label>
          <input type="text" class="form-control" id="street" value="" placeholder="Street" />
        </div>
      </div>
    </div>
  </div>
</form>


```
{"bemap":{"language":"javascript","run":true,"hide":true}}

var bemap = bemap || {};
$('.selectpicker').selectpicker('render');

bemap.miniweb.onChangeGeoserver(function(geoserver) {
  bemapMainCtx.geoserver = geoserver;
});

//call autocomplte class
var auto = new bemap.GeoAutocomplete(bemapMainCtx);

//initialize variables
var countryId = $('#country');
var inputId = $('#city');
//options for city input
var options = {
  inputId: inputId,
  target: "city",
  countryCode: countryId,
  maxResult: 15,
  timer: 1000, //in ms
  searchType : 'CONTAINS'
};

var inputId2 = $('#street');
var city = $('#city');
//options for street input
var options2 = {
  inputId: inputId2,
  target: "street",
  countryCode: countryId,
  city: city,
  maxResult: 15,
  timer: 1000, //in ms
  searchType : 'CONTAINS'
};
//call autocomplete methods
auto.autocomplete(options, function(res) {
  console.log(res);
});
auto.autocomplete(options2, function(res) {
  console.log(res);
});

```

## Code
#### __Class initialization__
Call `bemap.GeoAutocomplete` class and use context `bemapMainCtx`, `options` object (optionally for changing geoserver) like a parameter.

* "geoserver": 'geoserver'

See the context example creation [page](index.html#subpage-jsapi_1_0_0-js-authentication.md).

```
{"bemap":{"language":"javascript","hide":false}}
  var auto = new bemap.GeoAutocomplete(bemapMainCtx);
  //is recomended to put class call into object
  bemap.auto = auto;
```

#### __Autocomplete method__
Call `autocomplete` method and use `options`, `callback` like a parameter.

See below for more details how to create `options` object:

##### __options__ : `options` object
* inputId: JavaScript object with input field id see examples for more details.
* target: Target id to show result of `city` or `street`.
* countryCode: Country ISO code.
* city: JavaScript object or string id of city - mandatory when street searching.
* maxResult: Number of results in autocomplete.
* timer: when stop typing show result after `timer` ms.
* showList: show list of results.
* searchType`:
 * `CONTAINS`: Means that the pattern must be contained in the required strings.
 * `FUZZY`: Means that the pattern will be used to perform a fuzzy search based on the pattern. (Fuzzy searching can be useful when you are searching text that may contain misspelled words).
 * `KEY_SEARCH`: Specifies a search on key ids. This criteria can be used for retrieving an item by its numerical key.
 * `STRICT`: Means that the required string must be strictly equal to the pattern.
 * `STRICT_BEGINNING`: Means that the required strings must begin with the pattern.
 * `WORD_BEGINNING`: Means that one word of required strings must begin with the pattern (characters ' ', '-' and '/' are considered as word separators).


##### __callback__ : callback function to get result in JSON

See the JavaScript console to get examples of responses

```
{"bemap":{"language":"javascript","hide":false}}
//initialize variables
var countryId = $('#country');
var inputId = $('#city');
var searchType = $('#searchType').val();

var options = {
  inputId: inputId,
  target: "city",
  countryCode: countryId,
  city: "warszawa",//mandatory when target is street
  maxResult: 15,
  timer: 1000, //in ms
  searchType : searchType,
  showList: true
};

bemap.auto.autocomplete(options, function(res) {
  console.log(res);
});
```


## Working examples

#### Example using `Autocomplete` method
```
{"bemap":{"language":"javascript","hide":false}}
var auto = new bemap.GeoAutocomplete(bemapMainCtx);
bemap.auto = auto;

var countryId = $('#country');
var inputIdCity = $('#city');
var inputIdStreet = $('#street');
var inputIdStreet = $('#street');
var city = $('#city');
var searchType = $('#searchType').val();

var optionsCity = {
  inputId: inputIdCity,
  target: "city",
  countryCode: countryId,
  maxResult: 15,
  timer: 1000, //in ms
  searchType : searchType,
  //showList: false
};

var optionsStreet = {
  inputId: inputIdStreet,
  target: "street",
  countryCode: countryId,
  city: city,
  maxResult: 15,
  timer: 1000, //in ms
  searchType : searchType,
  //showList: false
};

bemap.auto.autocomplete(optionsCity, function(res) {
  console.log(res);
});
bemap.auto.autocomplete(optionsStreet, function(res) {
  console.log(res);
});
```

#### Example of `CSS code` to personalize autocomplete suggestions list
```
{"bemap":{"language":"css","hide":false}}
/*the container must be positioned relative:*/
.autocomplete {
  position: relative;
  display: inline-block;
}

input {
  border: 1px solid transparent;
  background-color: #f1f1f1;
  padding: 10px;
  font-size: 16px;
}

input[type=text] {
  background-color: #f1f1f1;
  width: 100%;
}

input[type=submit] {
  background-color: DodgerBlue;
  color: #fff;
  cursor: pointer;
}

.autocomplete-items {
  position: absolute;
  border: 1px solid #d4d4d4;
  border-bottom: none;
  border-top: none;
  z-index: 99;
  /*position the autocomplete items to be the same width as the container:*/
  /*top: 100%;*/
  margin-right: 16px;
  margin-left: 16px;
  left: 0;
  right: 0;
}

.autocomplete-items div {
  padding: 10px;
  cursor: pointer;
  background-color: #fff;
  border-bottom: 1px solid #d4d4d4;
}

/*when hovering an item:*/
.autocomplete-items div:hover {
  background-color: #e9e9e9;
}

/*when navigating through the items using the arrow keys:*/
.autocomplete-active {
  background-color: DodgerBlue !important;
  color: #ffffff;
}
```

See the [authentication page](index.html#page-authentication.md) for the login, password process.
