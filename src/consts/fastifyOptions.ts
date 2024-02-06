import { FastifyBaseLogger, FastifyHttpOptions } from 'fastify'
import { IncomingMessage, Server, ServerResponse } from 'http'
import fastifyLogger from './fastifyLogger'

const fastifyOptions:
  | FastifyHttpOptions<
      Server<typeof IncomingMessage, typeof ServerResponse>,
      FastifyBaseLogger
    >
  | undefined = {
  logger: fastifyLogger,
}

export default fastifyOptions
