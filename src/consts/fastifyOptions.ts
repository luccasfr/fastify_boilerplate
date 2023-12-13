import { FastifyBaseLogger, FastifyHttpOptions } from 'fastify'
import { IncomingMessage, Server, ServerResponse } from 'http'

const fastifyOptions:
  | FastifyHttpOptions<
      Server<typeof IncomingMessage, typeof ServerResponse>,
      FastifyBaseLogger
    >
  | undefined = {
  logger: {
    level: 'info',
  },
}

export default fastifyOptions
