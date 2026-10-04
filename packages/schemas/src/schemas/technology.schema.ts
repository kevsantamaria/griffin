import { z } from 'zod'

export const createTechnologySchema = z.object({
  name: z
    .string()
    .nonempty('Technology name is required')
    .min(3, 'Technology name must be at least 3 characters long'),
})

export type CreateTechnologyDto = z.infer<typeof createTechnologySchema>

export const updateTechnologySchema = createTechnologySchema.partial()

export type UpdateTechnologyDto = z.infer<typeof updateTechnologySchema>
