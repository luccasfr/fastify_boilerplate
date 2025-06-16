import { userOutputSchema } from './user'

/**
 * Collection of schema definitions used throughout the application
 * @description Central repository of Zod schemas
 *
 * These schemas are registered with the Swagger generator to provide
 * comprehensive API documentation for all data models used in the application.
 */
export const schemas = {
  User: userOutputSchema,
  // Add other schemas here as needed
  // Example: Product: productOutputSchema,
}

export default schemas
