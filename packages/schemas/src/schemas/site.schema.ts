import { z } from 'zod'

import { credentialGroupSchema } from './credential.schema.js'

export const createSiteSchema = z.object({
  name: z.string().nonempty('Name is required').min(3, 'Name must be at least 3 characters long'),
  url: z.url().nullish(),
  isInternal: z.boolean(),
  notes: z.string().max(400, 'Notes must be at most 400 characters long').nullish(),
  technologyName: z
    .string()
    .nonempty('Technology name is required')
    .min(3, 'Technology name must be at least 3 characters long'),
  credentials: z.array(credentialGroupSchema).nonempty('At least one credential group is required'),
  tagNames: z
    .array(
      z
        .string()
        .min(2, 'Tag name must be at least 2 characters long')
        .max(40, 'Tag name must be at most 40 characters long')
    )
    .optional(),
})

export type CreateSiteDto = z.infer<typeof createSiteSchema>

export const updateSiteSchema = createSiteSchema.partial()

export type UpdateSiteDto = z.infer<typeof updateSiteSchema>
