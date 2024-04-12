import ApiError from '@/errors/apiError'
import errorHandler from '@/handlers/errorHandler'
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

  it('should handle ApiError with custom error code', () => {
    const error = new ApiError('Custom error', 400, 'record/max-reached')
    errorHandler(error, null, reply)

    expect(reply.status).toHaveBeenCalledWith(400)
    expect(reply.send).toHaveBeenCalledWith({
      statusCode: 400,
      error: 'record/max-reached',
      message: 'Custom error',
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
      message: 'Conflict error',
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
      message: error.message,
    })
  })

  it('handles PrismaClientKnownRequestError with code P2025', () => {
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

  it('should handle other errors', () => {
    const error = new Error('Unknown error')
    errorHandler(error, null, reply)

    expect(reply.status).toHaveBeenCalledWith(500)
    expect(reply.send).toHaveBeenCalledWith(error)
  })
})
