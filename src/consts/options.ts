import { FastifyBaseLogger, FastifyHttpOptions } from 'fastify'
import { IncomingMessage, Server, ServerResponse } from 'node:http'
import fastifyLogger from './fastify-logger'

const fastifyOptions:
  | FastifyHttpOptions<
      Server<typeof IncomingMessage, typeof ServerResponse>,
      FastifyBaseLogger
    >
  | undefined = {
  logger: fastifyLogger,
}

export default fastifyOptions
