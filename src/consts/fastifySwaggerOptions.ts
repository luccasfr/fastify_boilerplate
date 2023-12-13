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
  },
  transform: jsonSchemaTransform,
}

export default fastifySwaggerOptions
