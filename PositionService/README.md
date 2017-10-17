# Server

## Running the server
To run the server, run:

```sh
npm start
```

To view the Swagger UI interface:

```sh
open http://localhost:8080/docs
```

## MongoDB

```sh
# Start mongo server
docker run --name mongodb -p 27017:27017 -d mongo
# Close mongo server
docker rm -f mongodb
```
