# server

This repo requires three separate environment files:

- `.env.development.local` → Development environment
- `.env` → Production environment
- `.env.test.local` → Test environment

---

## Scripts

### Application

| Script        | Description                                                                                                              |
| ------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `start`       | Run the built application (`node dist/main`). Doesn't specify env-file because it's implied they are passed before this. |
| `start:dev`   | Run NestJS in development mode using `.env.development.local` with watch and SWC builder.                                |
| `start:debug` | Run NestJS in development mode with debugger enabled.                                                                    |
| `start:stage` | Run the built app with `.env.development.local` (staging-like environment).                                              |
| `start:prod`  | Run the built app with `.env`.                                                                                           |

### Docker

| Script          | Description                                                                                                |
| --------------- | ---------------------------------------------------------------------------------------------------------- |
| `docker:db:dev` | Start the Postgres database container in development mode using `.env.development.local`.                  |
| `docker:test`   | Start all containers for testing using `.env.test.local` and the `docker-compose.test.override.yaml` file. |

### Prisma

| Script                | Description                                                                |
| --------------------- | -------------------------------------------------------------------------- |
| `prisma:generate`     | Generate Prisma client based on the schema.                                |
| `prisma:migrate:dev`  | Run migrations in development using `.env.development.local`.              |
| `prisma:push:dev`     | Push the Prisma schema to the dev database using `.env.development.local`. |
| `prisma:migrate:prod` | Apply migrations to production database using `.env`.                      |
