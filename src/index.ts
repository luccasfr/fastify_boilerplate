import fastifyCORS from '@fastify/cors'
import fastifyJWT from '@fastify/jwt'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUI from '@fastify/swagger-ui'
import 'dotenv/config'
import Fastify from 'fastify'
import { serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod'
import { AddressInfo } from 'node:net'
import fastifyCORSOptions from './consts/fastify-cors-options'
import fastifyJWTOptions from './consts/fastify-jwt-options'
import fastifyOptions from './consts/options'
import fastifySwaggerOptions from './consts/fastify-swagger-options'
import fastifySwaggerUIOptions from './consts/fastify-swagger-ui-options'
import errorHandler from './handlers/error-handler'
import Routes from './routes'
// Uncomment to enable JWT authentication
// import authHandler from './handlers/authHandler'

const fastify = Fastify(fastifyOptions)
fastify.setValidatorCompiler(validatorCompiler)
fastify.setSerializerCompiler(serializerCompiler)
fastify.setErrorHandler(errorHandler)

fastify.register(fastifyCORS, fastifyCORSOptions)
fastify.register(fastifyJWT, fastifyJWTOptions)
// Uncomment to enable JWT authentication
// fastify.addHook('onRequest', authHandler)

fastify.register(fastifySwagger, fastifySwaggerOptions)
fastify.register(fastifySwaggerUI, fastifySwaggerUIOptions)

fastify.register(Routes, { prefix: '/api' })

async function run() {
  await fastify.ready()
  await fastify.listen({
    host: process.env.HOST ?? '0.0.0.0',
    port: Number(process.env.PORT) || 5000,
  })
  const addressInfo = fastify.server.address() as AddressInfo

  fastify.log.info(
    `Documentation running at http://${addressInfo.address}:${addressInfo.port}/docs`,
  )

  return fastify
}

async function silentRun() {
  fastify.log.level = 'silent'
  return await run()
}

run()

export { run, silentRun }
