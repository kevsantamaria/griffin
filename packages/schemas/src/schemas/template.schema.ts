import { z } from 'zod'

import { templateGroupSchema } from './credential.schema.js'

export const createTemplateSchema = z.object({
  name: z.string().nonempty('Name is required').min(3, 'Name must be at least 3 characters long'),
  groups: z.array(templateGroupSchema).nonempty('At least one template group is required'),
  technologyName: z
    .string()
    .nonempty('Technology name is required')
    .min(3, 'Technology name must be at least 3 characters long'),
  tagNames: z
    .array(
      z
        .string()
        .min(2, 'Tag name must be at least 2 characters long')
        .max(40, 'Tag name must be at most 40 characters long')
    )
    .optional(),
})

export type CreateTemplateDto = z.infer<typeof createTemplateSchema>

export const updateTemplateSchema = createTemplateSchema.partial()

export type UpdateTemplateDto = z.infer<typeof updateTemplateSchema>
