import { FastifyInstance } from 'fastify'
import ExampleRouter from './example'

export default async function Routes(fastify: FastifyInstance) {
  fastify.register(ExampleRouter, { prefix: '/example' })
}
