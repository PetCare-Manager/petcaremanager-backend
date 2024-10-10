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
- _MONGODB_ROOT_USERNAME_ : Root user. Only for separate root of service user.
- _MONGODB_ROOT_PASSWORD_ : Root password.

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
