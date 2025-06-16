import { z } from 'zod'

/**
 * Schema for querying users
 * @description Defines optional parameters that can be used when searching for users
 */
export const userQuerySchema = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  email: z.string().email().optional(),
})

/**
 * Schema for creating or updating users
 * @description Defines the required fields when creating a new user or updating an existing one
 */
export const userInputSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email format'),
})

/**
 * Schema for user output data
 * @description Defines the structure of user data returned from the API
 */
export const userOutputSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})
