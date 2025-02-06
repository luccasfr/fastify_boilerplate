import ApiError from '@/errors/api-error'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { FastifyError, FastifyReply, FastifyRequest } from 'fastify'
import { ZodError } from 'zod'

const handleP2003 = (error: PrismaClientKnownRequestError) => {
  const regex = /[A-Za-z]+_([A-Za-z]+)_[A-Za-z]+/
  const meta = error.meta as { field_name?: string } | undefined
  const fieldName = meta?.field_name
  const match = fieldName?.match(regex)
  const parsedFieldName = match?.[1]

  const message = parsedFieldName
    ? `Foreign key violation in field ${parsedFieldName}`
    : error.message

  return {
    statusCode: 400,
    error: 'Bad Request',
    message,
  }
}

const handleDatabaseError = (error: PrismaClientKnownRequestError) => {
  switch (error.code) {
    case 'P2002': {
      const uniqueFieldMatch = error.message.match(
        /Unique constraint failed on the .* \((.*)\)/,
      )
      return {
        statusCode: 409,
        error: 'Conflict',
        message: uniqueFieldMatch?.[1]
          ? `Unique constraint failed on the field(s): ${uniqueFieldMatch[1]}`
          : 'Unique constraint failed',
      }
    }
    case 'P2025': {
      const message = error.meta?.cause ?? error.message
      return {
        statusCode: 400,
        error: 'Bad Request',
        message,
      }
    }
    case 'P2003': {
      return handleP2003(error)
    }
    default: {
      const message = error.meta?.cause ?? error.message
      return {
        statusCode: 400,
        error: 'Bad Request',
        message,
      }
    }
  }
}

const errorHandler = (
  error: FastifyError | ZodError | ApiError | Error,
  _request: FastifyRequest | null,
  reply: FastifyReply,
) => {
  if (error instanceof ZodError) {
    reply.status(400)
    reply.send({ statusCode: 400, error: 'Bad Request', issues: error.issues })
    return
  }
  if (error instanceof ApiError) {
    reply.status(error.statusCode)
    reply.send({
      statusCode: error.statusCode,
      error: error.statusMessage,
      message: error.message,
    })
    return
  }
  if (error instanceof PrismaClientKnownRequestError) {
    const databaseError = handleDatabaseError(error)
    reply.status(databaseError.statusCode)
    reply.send(databaseError)
    return
  }
  reply.status(500)
  reply.send(error)
  return
}

export default errorHandler
