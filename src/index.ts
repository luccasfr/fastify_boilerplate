import fastifyCORS from '@fastify/cors'
import fastifyJWT from '@fastify/jwt'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUI from '@fastify/swagger-ui'
import 'dotenv/config'
import Fastify from 'fastify'
import { serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod'
import { AddressInfo } from 'net'
import fastifyCORSOptions from './consts/fastifyCORSOptions'
import fastifyJWTOptions from './consts/fastifyJWTOptions'
import fastifyOptions from './consts/fastifyOptions'
import fastifySwaggerOptions from './consts/fastifySwaggerOptions'
import fastifySwaggerUIOptions from './consts/fastifySwaggerUIOptions'
import errorHandler from './handlers/errorHandler'
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
    port: Number(process.env.PORT) || 5000,
  })
  const addressInfo = fastify.server.address() as AddressInfo

  fastify.log.info(`Documentation running at http://${addressInfo.address}/docs`)
  if (addressInfo.address === '::1')
    fastify.log.info(`Documentation running at http://127.0.0.1:${addressInfo.port}/docs`)

  return fastify.server
}

async function silentRun() {
  fastify.log.level = 'silent'
  return await run()
}

run()

export { run, silentRun }
