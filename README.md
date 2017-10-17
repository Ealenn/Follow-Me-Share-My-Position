# Follow Me

> Smart Object : Follow Me - Share my position

## Schema

![Principle](https://raw.githubusercontent.com/Ealenn/Follow-Me-Share-My-Position/master/.pictures/principle.png)

# Documentation

- [Position Web Service](https://github.com/Ealenn/Follow-Me-Share-My-Position/tree/master/PositionService)

```sh
# Start
docker run -d --name FollowMeServicePositionDoc -p 8081:8080 -e SWAGGER_JSON=/foo/swagger.json -v $(pwd)/PositionService/api:/foo swaggerapi/swagger-ui && open http://localhost:8081
# Stop
docker rm FollowMeServicePositionDoc -f
```

# Database schema

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
### Users

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

---

# Author
- [Marchandise Rudy](https://www.linkedin.com/in/rudymarchandise)
- [Godart Orélien](https://www.linkedin.com/in/orelien-godart)
