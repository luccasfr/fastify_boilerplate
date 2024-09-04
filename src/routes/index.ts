import { FastifyInstance } from 'fastify'

export default async function Routes(fastify: FastifyInstance) {
  fastify.register(import('./example-router'), { prefix: '/example' })
}
