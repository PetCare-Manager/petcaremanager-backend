## Setup

### Quick start

Before all, you need to have ready your database.

Install dependencies

```
npm run install
```

### Environment variables

Now you need to create a .env file and set up this variables.

- _PORT_ : Express port to listen.
- _DB_URI_ : URL to your database.
- _NODE_ENV_ : To set workspace environment.
- _MONGODB_USER_ : User who has access to write in DB from services.
- _MONGODB_PASS_ : Password for user.
- _MONGODB_DB_ : Database name.

### Run server

If you are in development mode:

```
npm run dev
```

## Tests

Run once of the following commands for make tests.

Run all tests

```
npm run test
```

Run test with coverage

```
npm run test:cov
```

## Develpment
### Run dockers
For run docker first you need to install docker on your machine. [Official documentation](https://docs.docker.com/desktop/).

Now you need to run this command from root of project:
```
docker compose up -d
```

if you don't setup mongodb you would see api container broken because it can not connect with mongo.

### Setup MongoDB locally
After wake up container you need to connect to mongo.

Then create your database.

And then run this query:
```
db.createUser(
  {
    user: "your_user",
    pwd: "your_password",
    roles: [ { role: "readWrite", db: "your_database" } ]
  }
)
```
This query creates your user in your database to allow API connection.

Now you can reset your docker container to run. 