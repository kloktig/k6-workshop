# Vote
Simplistic solution for voting.

## Local setup
Run in dev container or:
1. Start Azurite:`docker-compose up -d`
2. Start application, e.g. by running in IDE or `dotnet run --project vote`

## Recommendations
`Microsoft Azure Storage Explorer` is very usefull for looking at the data in the table storage.


## Exploring
Swagger is found here:
* http://localhost:5135/swagger/index.html

## Using the API:
* First add some `participants`
* These can these can now be added to a `poll`

* You can now add your votes. The `/Vote` endpoint requires Login and this is done by posting to `/auth/token`:

```yaml 
{ "username": "NDC_USER",  "password": "NDC_PASSWORD"  }
```
* You can get results for a `poll` by using `/admin/votes/voteCounts/{id}` where the `id` is the `id` from `poll`-response into 


![image](https://user-images.githubusercontent.com/1544931/143069106-f46dfbb4-18b4-439c-8a0d-b0ddb9ad9889.png)


![image](https://user-images.githubusercontent.com/1544931/143068963-dfd6417d-67de-4e49-8fb3-930f4a22d04f.png)
