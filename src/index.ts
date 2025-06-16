import 'dotenv/config'

import {
  fastifyCorsOptions,
  fastifyJwtOptions,
  fastifyOptions,
  fastifySwaggerOptions,
  fastifySwaggerUiOptions,
} from '@/consts/fastify-options'
// import authHandler from "@/handlers/auth-handler";
import { routes } from '@/routes'
import fastifyCors from '@fastify/cors'
import fastifyJwt from '@fastify/jwt'
import { fastifySwagger } from '@fastify/swagger'
import { fastifySwaggerUi } from '@fastify/swagger-ui'
import { fastify } from 'fastify'
import {
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'
import errorHandler from './handlers/error-handler'

const DEFAULT_PORT = '5000'
const DEFAULT_HOST = '0.0.0.0'

const app = fastify(fastifyOptions)

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(fastifyCors, fastifyCorsOptions)
app.register(fastifyJwt, fastifyJwtOptions)

app.register(fastifySwagger, fastifySwaggerOptions)
app.register(fastifySwaggerUi, fastifySwaggerUiOptions)

// app.addHook("onRequest", authHandler);
app.setErrorHandler(errorHandler)

app.register(routes)

app.listen(
  {
    port: Number.parseInt(process.env.PORT || DEFAULT_PORT),
    host: process.env.HOST || DEFAULT_HOST,
  },
  (err, address) => {
    if (err) throw err
    app.log.info(`Docs available at ${address}/docs`)
  }
)
