import { z } from 'zod'

export const exampleSchema = z
  .object({
    name: z.string().max(32).describe('Some description for name'),
    age: z.number().positive().describe('Some description for age'),
  })
  .describe('Body should be an object with name and age')

export const exampleParamsSchema = z
  .object({
    id: z
      .string()
      .refine((v) => {
        return !Number.isNaN(Number(v))
      })
      .describe('Some description for id'),
  })
  .describe('Params should be an object with id')

export const exampleResponseSchema = exampleSchema
  .extend({
    id: z.number().positive().describe('Some description for id'),
  })
  .describe('Response should be an object with name, age and id')
