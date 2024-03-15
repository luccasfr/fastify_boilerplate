import {
  exampleParamsSchema,
  exampleResponseSchema,
  exampleSchema,
} from '@/schemas/exampleSchemas'
import exampleService from '@/services/exampleService'
import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'

export default async function ExampleRouter(fastify: FastifyInstance) {
  const exampleServiceInstance = new exampleService()

  fastify.withTypeProvider<ZodTypeProvider>().post(
    '/',
    {
      schema: {
        summary: 'Create example',
        description: 'Create example',
        tags: ['Example'],
        body: exampleSchema,
        response: {
          200: exampleResponseSchema,
        },
      },
    },
    async (request) => {
      return exampleServiceInstance.create(request.body)
    },
  )

  fastify.withTypeProvider<ZodTypeProvider>().get(
    '/',
    {
      schema: {
        summary: 'Get all examples',
        description: 'Get all examples',
        tags: ['Example'],
        response: {
          200: exampleResponseSchema.array(),
        },
      },
    },
    async () => {
      return exampleServiceInstance.findMany()
    },
  )

  fastify.withTypeProvider<ZodTypeProvider>().get(
    '/:id',
    {
      schema: {
        summary: 'Get example by id',
        description: 'Get example by id',
        tags: ['Example'],
        params: exampleParamsSchema,
      },
    },
    async (request) => {
      return exampleServiceInstance.findUnique({
        id: Number(request.params.id),
      })
    },
  )

  fastify.withTypeProvider<ZodTypeProvider>().put(
    '/:id',
    {
      schema: {
        summary: 'Update example',
        description: 'Update example',
        tags: ['Example'],
        body: exampleSchema,
        params: exampleParamsSchema,
      },
    },
    async (request) => {
      return exampleServiceInstance.update(request.body, {
        id: Number(request.params.id),
      })
    },
  )

  fastify.withTypeProvider<ZodTypeProvider>().delete(
    '/:id',
    {
      schema: {
        summary: 'Delete example',
        description: 'Delete example',
        tags: ['Example'],
        params: exampleParamsSchema,
      },
    },
    async (request) => {
      return exampleServiceInstance.delete({
        id: Number(request.params.id),
      })
    },
  )
}
