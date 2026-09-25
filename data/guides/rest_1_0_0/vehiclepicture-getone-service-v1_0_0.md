# REST API, Service version 1.0.0



## Get one

Returns a picture of the vehicle.

HTTP method `GET`.
URI: `/bgis/service/vehicle/picture/1.0/getone`

Sample: `/bgis/service/vehicle/picture/1.0/getone?vehicleUuidKey=719db9db-db6c-4410-8a48-8fdffd4905d8&pictureView=FRONT`

## Parameters

Mandatory parameters:
* `vehicleUuidKey`: Unique uuid of the vehicle.

Optional parameters:
* `pictureView`: Requested view of the vehicle. Possible values : `FRONT`, `REAR`, `SIDE`, `PERSPECTIVE`, `UP`. If not provided, the API will return the `SIDE` image (or the first one available if not applicable).


## Response

The response is the image itself. The image type is specified as the `content-type` header in the HTTP response.

