import {
  FastifyBaseLogger,
  FastifyInstance,
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerDefault,
} from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'

/**
 * Type definition for a Fastify instance configured with Zod type provider
 *
 * This type was created to provide strong typing for Fastify instances that use
 * the Zod schema validation library. It allows for end-to-end type safety when:
 * - Defining route schemas with Zod
 * - Validating request bodies, query parameters, and route parameters
 * - Working with the response types throughout the application
 *
 * Use this type instead of the default FastifyInstance when working with
 * Zod-enabled Fastify routes and plugins.
 */
export type FastifyTypedInstance = FastifyInstance<
  RawServerDefault,
  RawRequestDefaultExpression,
  RawReplyDefaultExpression,
  FastifyBaseLogger,
  ZodTypeProvider
>
