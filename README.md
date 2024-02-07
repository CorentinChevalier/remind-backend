# Project setup

## Env variables

Create a `.env` file in the root of the project with the following content:
The non-filled variables are the ones that you need to fill with your own values.

```
NODE_ENV=localhost
PORT=3001

POSTGRES_USER=
POSTGRES_PASSWORD=
POSTGRES_DB=
POSTGRES_PORT=5432

PGADMIN_DEFAULT_EMAIL=
PGADMIN_DEFAULT_PASSWORD=
PGADMIN_PORT=5050
```

## Docker

In order to get a database and an admin interface fully containerized, run the following command in the root of the project:

```
npm run docker-compose
```

This will start a PostgreSQL database and a pgAdmin interface.
Make sure ports 5432 and 5050 are available or change the ports in the `.env` file.

## Database

Connect to pgadmin using the credentials you provided in the `.env` file, then create the database server and the database with the provided informations.

### Running migrations

To run the migrations, run the following command:

```
npm run migrate
```

## Work in progress...
