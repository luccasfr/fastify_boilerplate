import {
  exampleParamsSchema,
  exampleResponseSchema,
  exampleSchema,
} from '@/model/example'
import exampleService from '@/services/example-service'
import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

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
    async (request) => await exampleServiceInstance.create(request.body),
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
    async () => await exampleServiceInstance.findMany(),
  )

  fastify.withTypeProvider<ZodTypeProvider>().get(
    '/:id',
    {
      schema: {
        summary: 'Get example by id',
        description: 'Get example by id',
        tags: ['Example'],
        params: exampleParamsSchema,
        response: {
          200: exampleResponseSchema.or(z.null()),
        },
      },
    },
    async (request) =>
      await exampleServiceInstance.findUnique({
        id: Number(request.params.id),
      }),
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
        response: {
          200: exampleResponseSchema,
        },
      },
    },
    async (request) =>
      await exampleServiceInstance.update(request.body, {
        id: Number(request.params.id),
      }),
  )

  fastify.withTypeProvider<ZodTypeProvider>().delete(
    '/:id',
    {
      schema: {
        summary: 'Delete example',
        description: 'Delete example',
        tags: ['Example'],
        params: exampleParamsSchema,
        response: {
          200: exampleResponseSchema,
        },
      },
    },
    async (request) =>
      await exampleServiceInstance.delete({
        id: Number(request.params.id),
      }),
  )
}
