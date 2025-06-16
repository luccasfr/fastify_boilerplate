import { idSchema } from '@/model/base'
import {
  userInputSchema,
  userOutputSchema,
  userQuerySchema,
} from '@/model/user'
import { UserService } from '@/services/user'
import { FastifyTypedInstance } from '@/types/fastify'

export async function userRoutes(app: FastifyTypedInstance) {
  const userService = new UserService()

  app.post(
    '/',
    {
      schema: {
        tags: ['User'],
        summary: 'Create User',
        description: 'Create a new user',
        body: userInputSchema,
        response: {
          200: userOutputSchema,
        },
      },
    },
    async (request) => await userService.createUser(request.body)
  )

  app.get(
    '/',
    {
      schema: {
        tags: ['User'],
        summary: 'Get Users',
        description: 'Retrieve a list of users',
        querystring: userQuerySchema.partial(),
        response: {
          200: userOutputSchema.array(),
        },
      },
    },
    async (request) => await userService.getUsers(request.query)
  )

  app.get(
    '/:id',
    {
      schema: {
        tags: ['User'],
        summary: 'Get User by ID',
        description: 'Retrieve a user by their ID',
        params: idSchema,
        response: {
          200: userOutputSchema.nullable(),
        },
      },
    },
    async (request) => await userService.getUserById(request.params.id)
  )

  app.put(
    '/:id',
    {
      schema: {
        tags: ['User'],
        summary: 'Update User',
        description: 'Update an existing user by their ID',
        params: idSchema,
        body: userInputSchema,
        response: {
          200: userOutputSchema,
        },
      },
    },
    async (request) =>
      await userService.updateUser(request.params.id, request.body)
  )

  app.delete(
    '/:id',
    {
      schema: {
        tags: ['User'],
        summary: 'Delete User',
        description: 'Delete a user by their ID',
        params: idSchema,
        response: {
          200: userOutputSchema,
        },
      },
    },
    async (request) => await userService.deleteUser(request.params.id)
  )

  return app
}
