# REST API, BeMap Authentication process



## API end points

The available host environments:

- For Production environment use `https://bemap-prod.benomad.com/bgis/`.
- For Preproduction environment use `https://bemap-preprod.benomad.com/bgis/`. 
- For testing with the latest version of BeMap use `https://bemap-beta.benomad.com/bgis/`.
- If you host BeMap on your own work station use `https://localhost:8380/bgis/`.

The available protocol end points:

- For Service REST API is `https://[environment]/bgis/service`.
- For WMS protocol is `https://[environment]/bgis/wms`.
- For BND protocol is `https://[environment]/bgis/bnd`.



## Authentication

The authentication can be provided by URL encoding with `appid` and `appcode` parameters or by the `Authorization` field of HTTP protocol.

### By HTTP protocol and `Authorization` header

Add the `Authorization` field in the header of your HTTP request with the value "Basic <account:apikey>". The `<account:apikey>` string must be encoded in Base64. 

Example:

1. The `account` is "Aladdin" and the `apykey` is "OpenSesame". These two strings are concatenated with `:` like "Aladdin:OpenSesame".
2. The string "Aladdin:OpenSesame" can now be encoded in Base64. Example "Aladdin:OpenSesame" → Encoding Base64 → "QWxhZGRpbjpPcGVuU2VzYW1l".
3. Now the HTTP header `Authorization` can be added to your request. Example: `Authorization: Basic QWxhZGRpbjpPcGVuU2VzYW1l`.

### By Auth API

1. Perform the authentication by calling the API auth and the HTTP header `Authorization` : `https://[environment url]/bgis/service/acl/1.0/auth`
2. The API returns the HTTP header `X-Auth-ID` in response.
3. Put the HTTP header `X-Auth-ID` with the value (previously obtained) in the request header to call the REST APIs.

### By Form

1. Perform the authentication by calling the API `https://[environment]/bgis/login` in HTTP POST method and the HTTP header `Content-Type` with value `application/x-www-form-urlencoded`.
and the form data `username=<your account>`, `password=<your apikey>` and `submit=Connection`. Example: `username=Aladdin&password=OpenSesame&submit=Connection`
2. Get the cookie `SESSION` value in the reponse.
3. For next requests, set the cookie `SESSION` with the kept value in the HTTP cookie header.

### By request URL

> WARNING: This solution is deprecated, prefer the authentication API above. 

1. Set the value of HTTP header `Content-Type` to `application/x-www-form-urlencoded`.
2. Use the URL: `https://[environment url]/bgis/bnd?appid=[login]&appcode=[password]&[and request parameters...]`.



## Reuse authentication session ID

To avoid the authentication process for next requests, follow the solution below.

### By HTTP header `X-Auth-ID`

To avoid the authentication process for next requests, you can use the HTTP header `X-Auth-ID`.

1. See the process chapter Authentication → By Auth API to get the `X-Auth-ID` value.
2. Put the HTTP header `X-Auth-ID` with the value (previously obtained) in the request header to call the REST APIs.

### By Cookie

To avoid the authentication process for next requests, you can use the cookie `SESSION`.

1. See the process chapter Authentication → By Form to get the cookie `SESSION` value.
2. For next requests, set the cookie `SESSION` with the kept value in the HTTP cookie header.
