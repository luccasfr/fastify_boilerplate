import fastifyCors from '@fastify/cors'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUI from '@fastify/swagger-ui'
import fastifyJWT from '@fastify/jwt'
import 'dotenv/config'
import Fastify from 'fastify'
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'
import { AddressInfo } from 'net'
import errorHandler from './handlers/errorHandler'
import Routes from './routes'

const fastify = Fastify({
  logger: true,
})
fastify.setValidatorCompiler(validatorCompiler)
fastify.setSerializerCompiler(serializerCompiler)

fastify.setErrorHandler(errorHandler)

fastify.register(fastifyCors, {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
})

fastify.register(fastifyJWT, {
  secret: process.env.JWT_SECRET as string,
  sign: {
    expiresIn: '12h',
  },
})

fastify.addHook('onRequest', async (request, reply) => {
  try {
    if (request.url.startsWith('/docs')) return
    // Uncomment to enable JWT authentication
    // await request.jwtVerify()
  } catch (err) {
    reply.send(err)
  }
})

fastify.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Fastify Boilerplate API',
      description: 'Sample backend service',
      version: '1.0.0',
    },
    servers: [],
  },
  transform: jsonSchemaTransform,
})

fastify.register(fastifySwaggerUI, {
  routePrefix: '/docs',
})

fastify.register(Routes, { prefix: '/api' })

async function run() {
  await fastify.ready()

  await fastify.listen({
    port: Number(process.env.PORT) || 5000,
  })
  const addressInfo = fastify.server.address() as AddressInfo

  fastify.log.info(`Documentation running at http://${addressInfo.address}/docs`)
  if (addressInfo.address === '::1')
    fastify.log.info(`Documentation running at http://127.0.0.1:${addressInfo.port}/docs`)
}

run()
