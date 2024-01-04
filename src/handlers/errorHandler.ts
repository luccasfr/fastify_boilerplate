import ApiError from '@/errors/apiError'
import { FastifyError, FastifyReply, FastifyRequest } from 'fastify'
import { ZodError } from 'zod'

const errorHandler = (
  error: FastifyError | ZodError | ApiError | Error,
  _request: FastifyRequest | null,
  reply: FastifyReply,
) => {
  if (error instanceof ZodError) {
    reply.status(400)
    reply.send({ statusCode: 400, error: 'Bad Request', issues: error.issues })
  } else if (error instanceof ApiError) {
    reply.status(error.statusCode)
    reply.send({
      statusCode: error.statusCode,
      error: error.statusMessage,
      message: error.message,
    })
  } else if (error) {
    reply.status(500)
    reply.send(error)
  }
}

export default errorHandler
