![Fastify Boilerplate](assets/logo.png)

A modern, feature-rich boilerplate for building APIs with Fastify 5.

## What's new compared to the previous version?
- Upgraded packages to the latest versions (including Fastify 5, ESLint 9, Prisma 6, and preparing for Zod 4)
- Removed JEST and tests (can be added as needed)
- Removed Husky and pre-commit hooks (can be added as needed)
- Switched back to pnpm as the package manager for better stability and broader adoption
- Improved error handling with Prisma's most common errors
- Added JSDoc comments throughout the codebase for better documentation

## Features

This boilerplate includes:

- **Fastify** - High-performance web framework
- **Fastify Swagger** - OpenAPI documentation
- **Fastify CORS** - Cross-Origin Resource Sharing plugin
- **Fastify JWT** - JSON Web Token authentication
- **Pino & Pino Pretty** - High-performance logging
- **Prisma** - Modern database ORM
- **Zod** - Schema validation
- **Zod Type Provider** - TypeScript integration
- **Custom Error Handler** - Comprehensive error handling

## Getting Started

1. Install dependencies:

```bash
pnpm install
```

2. Configure your environment variables by creating a `.env` file in the root directory. You can use the provided `.env.example` as a reference.

```bash
cp .env.example .env
```

3. Create the database and apply migrations:

```bash
pnpm migrate
```

4. Enable JWT authentication (optional):

```ts
// Uncomment these lines in index.ts to enable authentication:
import authHandler from '@/handlers/authHandler'

fastify.addHook('onRequest', authHandler)
```

4. Start the development server:

```bash
pnpm dev
```

## Authors

<table>
  <tbody>
    <tr>
      <td align="center">
        <a href="https://github.com/luccasfr">
          <img src="https://github.com/luccasfr.png?size=100" />
          <p>Lucas Ferreira</p>
        </a>
      </td>
    </tr>
  </tbody>
</table>
