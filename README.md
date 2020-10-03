# Service Back Web Application

## Description

NestJS Backend + NextJS Frontend. Feel free to spice this up later.

## Installation

```bash
$ yarn
```

## Setting up Environments and DB

1. Get `.env` files from development team and put into `./env` folder

1. Run Postgres Docker Compose file `docker-compose up` OR start Postgres DB locally on port 5432

1. Run Migration and Seeder Scripts

```bash
# run migrations
$ yarn db:migrate:local

# run db seeders
$ yarn db:seed:local
```

## Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn dev

# production mode
$ yarn prod
```

## Test

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```
