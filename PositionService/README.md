# Server

## Running the server
To run the server, run:

```sh
npm start
```

To view the Swagger UI (Documentation) interface:

```sh
open http://localhost:8080/docs
```

## Flux

- GET /pos/{ean}
  - Return array of position [$Position]
- POST /pos
  - Add position of EAN

> More informations on the documentation

### Data
```json
{
  "ean": "string",
  "lat": "string",
  "lon": "string",
  "acc": "string",
  "datetime": "2017-10-17T11:53:50.045Z"
}
```

## MongoDB

```sh
# Start mongo server
docker run --name mongodb -p 27017:27017 -d mongo
# Close mongo server
docker rm -f mongodb
```
