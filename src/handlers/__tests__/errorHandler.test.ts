import ApiError from '@/errors/apiError'
import errorHandler from '@/handlers/errorHandler'
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

  it('should handle other errors', () => {
    const error = new Error('Unknown error')
    errorHandler(error, null, reply)

    expect(reply.status).toHaveBeenCalledWith(500)
    expect(reply.send).toHaveBeenCalledWith(error)
  })
})
