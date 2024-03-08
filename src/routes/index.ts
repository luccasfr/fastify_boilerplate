import { FastifyInstance } from 'fastify'

export default async function Routes(fastify: FastifyInstance) {
  fastify.register(import('./exampleRouter'), { prefix: '/example' })
}
