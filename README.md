# Fastify Boilerplate

### Dynamic Test Reports

The data below is auto-generated based on pre-commit tests.

![Coverage](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fraw.githubusercontent.com%2Fluccasfr%2Ffastify_boilerplate%2Fmain%2Freports%2Fcoverage-summary.json&query=%24.total.lines.pct&suffix=%25&style=flat&label=code-coverage&color=blue)
![Passed Tests %](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fraw.githubusercontent.com%2Fluccasfr%2Ffastify_boilerplate%2Fmain%2Freports%2Ftest-summary.json&query=%24.pctPassed&suffix=%25&style=flat&label=passed-tests&color=green)

## What's included?

- Fastify - API
- Fastify Swagger - OpenAPI Documentation
- Fastify CORS - Cross-origin Resource Sharing Plugin
- Fastify JWT - JsonWebToken Plugin
- Pino & Pino Pretty - Logs
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
3. The boilerplate has built-in JWT support, in case you want to use it, just do as described below:
```ts
// Uncomment the lines below in index.ts to enable authentication verification.
import authHandler from './handlers/authHandler'

fastify.addHook('onRequest', authHandler)
```

4. Run the development environment.

```bash
pnpm dev
```

## Authors

<table>
  <tbody>
    <td align="center">
      <a href="https://github.com/luccasfr">
        <img src="https://github.com/luccasfr.png?size=100" />
        <p>Lucas Ferreira</p>
      </a>
    </td>
  </tbody>
</table>

