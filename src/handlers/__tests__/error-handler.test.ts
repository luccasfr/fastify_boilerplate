import ApiError from '@/errors/api-error'
import errorHandler from '@/handlers/error-handler'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { FastifyReply } from 'fastify'
import { ZodError } from 'zod'

describe('errorHandler', () => {
  let reply: FastifyReply

  beforeEach(() => {
    reply = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis(),
    } as unknown as FastifyReply
  })

  it('should handle ZodError', () => {
    const error = new ZodError([])
    errorHandler(error, null, reply)

    expect(reply.status).toHaveBeenCalledWith(400)
    expect(reply.send).toHaveBeenCalledWith({
      statusCode: 400,
      error: 'Bad Request',
      issues: error.issues,
    })
  })

  it('should handle ApiError', () => {
    const error = new ApiError('Not Found', 404)
    errorHandler(error, null, reply)

    expect(reply.status).toHaveBeenCalledWith(404)
    expect(reply.send).toHaveBeenCalledWith({
      statusCode: 404,
      error: 'Not Found',
      message: 'Not Found',
    })
  })

  it('handles PrismaClientKnownRequestError with code P2003 and valid field_name matching regex', () => {
    const fieldName = 'userId'
    const error = new PrismaClientKnownRequestError('Foreign key violation', {
      code: 'P2003',
      clientVersion: '',
      meta: { field_name: `table_${fieldName}_constraint` },
    })

    errorHandler(error, null, reply)

    expect(reply.status).toHaveBeenCalledWith(400)
    expect(reply.send).toHaveBeenCalledWith({
      statusCode: 400,
      error: 'Bad Request',
      message: `Foreign key violation in field ${fieldName}`,
    })
  })

  it('handles PrismaClientKnownRequestError with code P2003 and undefined field_name', () => {
    const error = new PrismaClientKnownRequestError('Foreign key violation', {
      code: 'P2003',
      clientVersion: '',
      meta: {
        field_name: undefined,
      },
    })

    errorHandler(error, null, reply)

    expect(reply.status).toHaveBeenCalledWith(400)
    expect(reply.send).toHaveBeenCalledWith({
      statusCode: 400,
      error: 'Bad Request',
      message: 'Foreign key violation',
    })
  })

  it('handles PrismaClientKnownRequestError with undefined meta', () => {
    const error = new PrismaClientKnownRequestError('Foreign key violation', {
      code: 'P2003',
      clientVersion: '',
      meta: undefined, // meta não definido
    })

    errorHandler(error, null, reply)

    expect(reply.status).toHaveBeenCalledWith(400)
    expect(reply.send).toHaveBeenCalledWith({
      statusCode: 400,
      error: 'Bad Request',
      message: 'Foreign key violation',
    })
  })

  it('handles PrismaClientKnownRequestError with code P2002', () => {
    const error = new PrismaClientKnownRequestError('Conflict error', {
      code: 'P2002',
      meta: { cause: 'Conflict error' },
      clientVersion: '',
    })

    errorHandler(error, null, reply)

    expect(reply.status).toHaveBeenCalledWith(409)
    expect(reply.send).toHaveBeenCalledWith({
      statusCode: 409,
      error: 'Conflict',
      message: 'Unique constraint failed',
    })
  })

  it('handles PrismaClientKnownRequestError with code P2002 and undefined cause', () => {
    const error = new PrismaClientKnownRequestError('Conflict error', {
      code: 'P2002',
      meta: {},
      clientVersion: '',
    })

    errorHandler(error, null, reply)

    expect(reply.status).toHaveBeenCalledWith(409)
    expect(reply.send).toHaveBeenCalledWith({
      statusCode: 409,
      error: 'Conflict',
      message: 'Unique constraint failed',
    })
  })

  it('handles PrismaClientKnownRequestError with code P2002 and specific unique field', () => {
    const error = new PrismaClientKnownRequestError(
      'Unique constraint failed on the fields: (`email`)',
      {
        code: 'P2002',
        clientVersion: '',
        meta: { cause: 'Conflict error' },
      },
    )

    errorHandler(error, null, reply)

    expect(reply.status).toHaveBeenCalledWith(409)
    expect(reply.send).toHaveBeenCalledWith({
      statusCode: 409,
      error: 'Conflict',
      message: 'Unique constraint failed on the field(s): `email`',
    })
  })

  it('handles PrismaClientKnownRequestError with code P2002 and no fields', () => {
    const error = new PrismaClientKnownRequestError('Unique constraint failed', {
      code: 'P2002',
      clientVersion: '',
      meta: { cause: 'Conflict error' },
    })

    errorHandler(error, null, reply)

    expect(reply.status).toHaveBeenCalledWith(409)
    expect(reply.send).toHaveBeenCalledWith({
      statusCode: 409,
      error: 'Conflict',
      message: 'Unique constraint failed',
    })
  })

  it('handles PrismaClientKnownRequestError with code P2025 with cause', () => {
    const error = new PrismaClientKnownRequestError('Bad Request error', {
      code: 'P2025',
      meta: { cause: 'Bad Request error' },
      clientVersion: '',
    })

    errorHandler(error, null, reply)

    expect(reply.status).toHaveBeenCalledWith(400)
    expect(reply.send).toHaveBeenCalledWith({
      statusCode: 400,
      error: 'Bad Request',
      message: error.meta?.cause ?? error.message,
    })
  })

  it('handles PrismaClientKnownRequestError with code P2025 with undefined meta', () => {
    const error = new PrismaClientKnownRequestError('Bad Request error', {
      code: 'P2025',
      meta: undefined,
      clientVersion: '',
    })

    errorHandler(error, null, reply)

    expect(reply.status).toHaveBeenCalledWith(400)
    expect(reply.send).toHaveBeenCalledWith({
      statusCode: 400,
      error: 'Bad Request',
      message: error.message,
    })
  })

  it('handles PrismaClientKnownRequestError with unknown code', () => {
    const error = new PrismaClientKnownRequestError('Unknown error', {
      code: 'UNKNOWN',
      meta: { cause: 'Unknown error' },
      clientVersion: '',
    })

    errorHandler(error, null, reply)

    expect(reply.status).toHaveBeenCalledWith(400)
    expect(reply.send).toHaveBeenCalledWith({
      statusCode: 400,
      error: 'Bad Request',
      message: error.meta?.cause ?? error.message,
    })
  })

  it('handles PrismaClientKnownRequestError with unknown code and undefined meta', () => {
    const error = new PrismaClientKnownRequestError('Unknown error', {
      code: 'UNKNOWN',
      meta: undefined,
      clientVersion: '',
    })

    errorHandler(error, null, reply)

    expect(reply.status).toHaveBeenCalledWith(400)
    expect(reply.send).toHaveBeenCalledWith({
      statusCode: 400,
      error: 'Bad Request',
      message: error.message,
    })
  })

  it('should handle other errors', () => {
    const error = new Error('Unknown error')
    errorHandler(error, null, reply)

    expect(reply.status).toHaveBeenCalledWith(500)
    expect(reply.send).toHaveBeenCalledWith(error)
  })
})
