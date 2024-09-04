import { FastifySwaggerUiOptions } from '@fastify/swagger-ui'
import { FastifyRegisterOptions } from 'fastify'

const fastifySwaggerUIOptions:
  | FastifyRegisterOptions<FastifySwaggerUiOptions>
  | undefined = {
  routePrefix: '/docs',
}

export default fastifySwaggerUIOptions
