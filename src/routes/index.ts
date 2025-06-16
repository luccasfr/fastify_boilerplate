import { userRoutes } from '@/routes/user'
import { FastifyTypedInstance } from '@/types/fastify'

export async function routes(app: FastifyTypedInstance) {
  app.register(userRoutes, { prefix: '/users' })

  // Add more routes here as needed
  // app.register(otherRoutes, { prefix: "/other" });

  return app
}
