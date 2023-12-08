# Fastify Boilerplate

## O que está incluído?

- Fastify - API
- Fastify Swagger - Documentação OpenAPI
- Fastify CORS - Plugin para Cross-origin Resource Sharing
- Fastify JWT - Plugin para utilização de JsonWebToken

```ts
// Necessário remover comentário da linha abaixo no index.ts para iniciar a verificação.
await request.jwtVerify()
```

- Prisma - ORM
- Zod - Validação e provedor de tipos
- Error Handler - Tratativa de Erros

## Como iniciar?

1. Instalar todas dependências

```bash
pnpm install
```

2. Criar banco de dados e aplicar migrations

```bash
pnpm migrate
```

3. Executar ambiente de desenvolvimento.

```bash
pnpm dev
```
