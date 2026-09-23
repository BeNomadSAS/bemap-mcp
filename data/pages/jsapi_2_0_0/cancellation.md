<span class="bemap-tag">Foundations</span>

# Cancellation

<p class="bemap-tagline">Long-running v2 calls (routing, traceroute, charging-station search, EV routing) cancel two ways. Aborted requests reject with <code>bemap.Error.ABORTED</code>.</p>

## At a glance

<ul class="bemap-glance">
<li>Recommended: <code>AbortSignal</code> via <code>{ signal: ctrl.signal }</code> — standard web API.</li>
<li>Alternative: <code>requestId</code> on the request + <code>service.cancel(id)</code> from anywhere.</li>
<li>Both reject with <code>bemap.Error.ABORTED</code> — branch on <code>err.getCode()</code>.</li>
<li>Composes with <code>fetch</code>, autocomplete's <code>attachToInput</code> debounce, and any other code that speaks <code>AbortSignal</code>.</li>
</ul>

## Usage

### Option 1 — `AbortSignal` (recommended)

```js
var ctrl = new AbortController();

routing.calculate(req, { signal: ctrl.signal })
    .then(draw)
    .catch(function(err) {
        if (err.getCode() === bemap.Error.ABORTED) return;
        throw err;
    });

// Cancel when the user navigates away, typing changes, etc.
ctrl.abort();
```

### Option 2 — `requestId` + `service.cancel(id)`

Use when you don't have an `AbortController` in scope (cancellation triggered from a different module than the call site):

```js
var req = new bemap.RoutingRequest({
    destinations: [a, b],
    requestId: 'my-trip-1'
});

routing.calculate(req).then(draw);

// Later — from anywhere with a reference to the service
routing.cancel('my-trip-1');   // returns true if a matching request was found
```

### Catching cancellation

```js
.catch(function(err) {
    if (err.getCode() === bemap.Error.ABORTED) {
        return;   // user cancelled — usually a silent no-op
    }
    // real error
});
```

## See also

- [Error handling](index.html#subpage-jsapi_2_0_0-error-handling.md)
- [Routing v2](index.html#subpage-jsapi_2_0_0-js-routing-v2.md) — uses both cancellation styles in the demo
