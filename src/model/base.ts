import { z } from 'zod'

/**
 * Base schema for entities with ID
 * @description Defines the standard ID format using CUID for all entities
 */
export const idSchema = z.object({
  id: z.string().cuid('Invalid ID format (should be CUID)'),
})
