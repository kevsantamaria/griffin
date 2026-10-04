import { z } from 'zod'

export const createTagSchema = z.object({
  name: z
    .string()
    .nonempty('Tag name is required')
    .min(2, 'Tag name must be at least 2 characters long')
    .max(40, 'Tag name must be at most 40 characters long'),
})

export type CreateTagDto = z.infer<typeof createTagSchema>

export const updateTagSchema = createTagSchema.partial()

export type UpdateTagDto = z.infer<typeof updateTagSchema>
