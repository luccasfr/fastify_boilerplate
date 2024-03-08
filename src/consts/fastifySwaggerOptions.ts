import { SwaggerOptions } from '@fastify/swagger'
import { FastifyRegisterOptions } from 'fastify'
import { jsonSchemaTransform } from 'fastify-type-provider-zod'

const fastifySwaggerOptions: FastifyRegisterOptions<SwaggerOptions> | undefined = {
  openapi: {
    info: {
      title: 'Fastify Boilerplate API',
      description: 'Sample backend service',
      version: '1.0.0',
    },
    servers: [],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description:
            'JWT authentication. You must provide a valid JWT token in the header of your request.',
        },
      },
    },
    security: [
      {
        BearerAuth: [],
      },
    ],
  },
  transform: jsonSchemaTransform,
}

export default fastifySwaggerOptions
