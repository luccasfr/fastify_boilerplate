import ApiError from '@/errors/api-error'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
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
  } else if (error instanceof PrismaClientKnownRequestError) {
    switch (error.code) {
      case 'P2002': {
        reply.status(409)
        reply.send({
          statusCode: 409,
          error: 'Conflict',
          message: error.message,
        })
        break
      }
      case 'P2025': {
        reply.status(400)
        reply.send({
          statusCode: 400,
          error: 'Bad Request',
          message: error.message,
        })
        break
      }
      default: {
        reply.status(400)
        reply.send({
          statusCode: 400,
          error: 'Bad Request',
          message: error.message,
        })
      }
    }
  } else if (error) {
    reply.status(500)
    reply.send(error)
  }
}

export default errorHandler
