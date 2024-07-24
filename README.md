# Purpose

This repository is an example project for my blog post found here: https://aaronboman.com/programming/2024/07/12/per-request-database-transactions-with-nestjs/

This repository demonstrates how to set up Database transactions with NestJS so that the database transaction can be
propagated across multiple function calls while still be able to utilize NestJS's dependency injection system.

## Setup

In order to run this demo, you will need to have a PostgresQL database running and the `psql` command line tool installed.
Start by installing the dependencies:

```bash
npm install
```
or
```bash
yarn install
```

Then run `./setup_db.sh` to create the database and table needed for this demo. If you are using Windows, you can run
the commands in the script manually.

## Running the demo

To run the demo, run the following command:

```bash
npm run start
```
or
```bash
yarn start
```

You should be able to create todos by sending a POST request to `http://localhost:3000/todos`. For example:

```bash
curl -X POST -H "Content-Type: application/json" -d '{"title": "Hello, World!"}' http://localhost:3000/todos
```

You can also view the todos by sending a GET request to `http://localhost:3000/todos`.

```bash
curl http://localhost:3000/todos
```

As you issue requests, note the console output of the running server. Should see the creation command producing output
within a transaction block:

```shell
query: START TRANSACTION
query: SELECT "TodoEntity"."id" AS "TodoEntity_id", "TodoEntity"."title" AS "TodoEntity_title" FROM "todo_entity" "TodoEntity" WHERE (("TodoEntity"."title" = $1)) LIMIT 1 -- PARAMETERS: ["Hello, World!"]
query: INSERT INTO "todo_entity"("title") VALUES ($1) RETURNING "id" -- PARAMETERS: ["Hello, World!"]
query: COMMIT
```

While fetching the todos does not use an explicit transaction:

```shell
query: SELECT "TodoEntity"."id" AS "TodoEntity_id", "TodoEntity"."title" AS "TodoEntity_title" FROM "todo_entity" "TodoEntity"
```