import type { FastifyReply, FastifyRequest } from 'fastify'

/**
 * Authentication handler middleware for Fastify routes
 *
 * Verifies JWT tokens in requests except for documentation routes.
 * JWT verification uses Fastify's built-in JWT plugin functionality.
 *
 * @param {FastifyRequest} request - The Fastify request object
 * @param {FastifyReply} reply - The Fastify reply object
 * @returns {Promise<void>}
 */
export default async function authHandler(
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> {
  try {
    if (request.url.startsWith('/docs')) return
    await request.jwtVerify()
  } catch (error) {
    reply.status(401).send({
      statusCode: 401,
      error: 'Unauthorized',
      message: error instanceof Error ? error.message : 'Authentication failed',
    })
  }
}
