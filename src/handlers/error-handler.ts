import ApiError from '@/errors/api-error'
import { PrismaClientKnownRequestError } from '@/generated/prisma/runtime/library'
import { PrismaClientUnknownRequestError } from '@prisma/client/runtime/library'
import { FastifyError, FastifyReply, FastifyRequest } from 'fastify'
import { ZodError } from 'zod'

/**
 * Type for standardized error responses
 */
type ErrorResponse = {
  statusCode: number
  error: string
  message: string
  issues?: unknown
}

/**
 * Handles Prisma P2003 foreign key violation errors by extracting the field name
 * from the error metadata and providing a more user-friendly error message.
 *
 * @param error - The Prisma client error with code P2003
 * @returns Standardized error response object
 */
const handleP2003 = (error: PrismaClientKnownRequestError): ErrorResponse => {
  const regex = /[A-Za-z]+_([A-Za-z]+)_[A-Za-z]+/
  const meta = error.meta as { field_name?: string } | undefined
  const fieldName = meta?.field_name
  const match = fieldName?.match(regex)
  const parsedFieldName = match?.[1]

  return {
    statusCode: 400,
    error: 'Bad Request',
    message: parsedFieldName
      ? `Foreign key violation in field ${parsedFieldName}`
      : error.message,
  }
}

/**
 * Processes Prisma database errors and converts them to standardized error responses
 * with appropriate status codes and messages.
 *
 * @param error - The Prisma client error to handle
 * @returns Standardized error response object
 */
const handleDatabaseError = (
  error: PrismaClientKnownRequestError
): ErrorResponse => {
  switch (error.code) {
    case 'P2002': {
      const uniqueFieldMatch = error.message.match(
        /Unique constraint failed on the .* \((.*)\)/
      )
      return {
        statusCode: 409,
        error: 'Conflict',
        message: uniqueFieldMatch?.[1]
          ? `Unique constraint failed on the field(s): ${uniqueFieldMatch[1]}`
          : 'Unique constraint failed',
      }
    }
    case 'P2003': {
      return handleP2003(error)
    }
    case 'P2021': {
      return {
        statusCode: 500,
        error: 'Internal Server Error',
        message: `The requested resource was not found ${error.meta?.table}`,
      }
    }
    default: {
      return {
        statusCode: 400,
        error: 'Bad Request',
        message: (error.meta?.cause as string) || error.message,
      }
    }
  }
}

/**
 * Global error handler for the Fastify application. Processes different types of errors
 * and returns standardized responses with appropriate status codes.
 *
 * Handles:
 * - Zod validation errors
 * - Custom API errors
 * - Prisma database errors
 * - Generic errors
 *
 * @param error - The error to be handled
 * @param _ - Fastify request object (unused but required by Fastify)
 * @param reply - Fastify reply object used to send the response
 */
const errorHandler = (
  error: FastifyError | ZodError | ApiError | Error,
  _: FastifyRequest | null,
  reply: FastifyReply
): void => {
  if (error instanceof ZodError) {
    reply.status(400).send({
      statusCode: 400,
      error: 'Bad Request',
      message: 'Validation error',
      issues: error.issues,
    })
    return
  }

  if (error instanceof ApiError) {
    reply.status(error.statusCode).send({
      statusCode: error.statusCode,
      error: error.statusMessage,
      message: error.message,
    })
    return
  }

  if (error instanceof PrismaClientKnownRequestError) {
    const databaseError = handleDatabaseError(error)
    reply.status(databaseError.statusCode).send(databaseError)
    return
  }

  if (error instanceof PrismaClientUnknownRequestError) {
    reply.status(500).send({
      statusCode: 500,
      error: 'Internal Server Error',
      message: error?.cause || 'A database error occurred',
    })
    return
  }

  console.error('❌ Unhandled error:', error)
  reply.status(500).send({
    statusCode: 500,
    error: 'Internal Server Error',
    message:
      process.env.NODE_ENV === 'production'
        ? 'An unexpected error occurred'
        : error.message || 'Unknown error',
  })
}

export default errorHandler
