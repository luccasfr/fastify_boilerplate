# Fastify Boilerplate

![Coverage](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fraw.githubusercontent.com%2Fluccasfr%2Ffastify_boilerplate%2Fmain%2Freports%2Fcoverage-summary.json&query=%24.total.lines.pct&suffix=%25&style=flat&label=code-coverage&color=blue)

## What's included?

- Fastify - API
- Fastify Swagger - OpenAPI Documentation
- Fastify CORS - Cross-origin Resource Sharing Plugin
- Fastify JWT - JsonWebToken Plugin

```ts
// Uncomment the lines below in index.ts to enable authentication verification.
import authHandler from './handlers/authHandler'

fastify.addHook('onRequest', authHandler)
```

- Prisma - ORM
- Zod - IO Validation
- Zod Type Provider - Type Provider
- Error Handler - Error Handling
- JEST - Unit Testing
- Husky - Run unit tests before pushing to the repository

## How to get started?

1. Install all dependencies.

```bash
pnpm install
```

2. Create the database and apply migrations.

```bash
pnpm migrate
```

3. Run the development environment.

```bash
pnpm dev
```
