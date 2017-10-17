# Follow Me

> Smart Object : Follow Me - Share my position

## Documentation : Position Service
Run
```sh
docker run -d --name FollowMeServicePositionDoc -p 8081:8080 -e SWAGGER_JSON=/foo/swagger.json -v $(pwd)/PositionService:/foo swaggerapi/swagger-ui && open http://localhost:8081
```

Stop
```sh
docker rm FollowMeServicePositionDoc -f
```

# Database

## MongoDB
### Position
```json
{
  "ean": "string",
  "lat": "string",
  "lon": "string",
  "acc": "string",
  "datetime": "2017-10-17T06:59:10.079Z"
}
```

## MySQL
### User

| id | mail    | password | phone      | token |
|----|---------|----------|------------|-------|
| 1  | ex1@a.a | hash     | 0600000000 | uhash |
| 2  | ex2@a.a | hash     | 0600000000 | uhash |
| 3  | ex3@a.a | hash     | 0600000000 | uhash |

### EAN

| id | id_user | ean  |
|----|---------|------|
| 1  | 1       | hash |
| 2  | 1       | hash |
| 3  | 2       | hash |
