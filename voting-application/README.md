# Vote
Simplistic solution for voting.

## Running
1. Start Azurite:`docker-compose up -d`
2. Start application, e.g. by running in IDE or `dotnet run --project vote`

## Exploring
Swagger is found here:
* https://localhost:7240/swagger/index.html
* http://localhost:5135/swagger/index.html

## Using the API:
* First add some `participants`
* These can these can now be added to a `poll`

* You can now add your votes. The `/Vote` endpoint requires Login and this is done by posting to `/auth/token`:

```yaml 
{ "username": "NDC_USER",  "password": "NDC_PASSWORD"  }
```
* You can get results for a `poll` by using `/admin/votes/voteCounts/{id}` where the `id` is the `id` from `poll`-response into 