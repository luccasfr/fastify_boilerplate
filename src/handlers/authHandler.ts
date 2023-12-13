import { FastifyReply, FastifyRequest } from 'fastify'

export default async function authHandler(request: FastifyRequest, reply: FastifyReply) {
  try {
    if (request.url.startsWith('/docs')) return
    await request.jwtVerify()
  } catch (err) {
    reply.send(err)
  }
}
