import { z } from 'zod'

export const templateFieldSchema = z.object({
  label: z.string().nonempty('A label is required'),
  type: z.enum(['text', 'password', 'email', 'url']),
})

export type TemplateField = z.infer<typeof templateFieldSchema>

export const templateGroupSchema = z.object({
  header: z.string().nonempty('A header is required'),
  fields: z.array(templateFieldSchema).nonempty('At least one field is required'),
})

export type TemplateGroup = z.infer<typeof templateGroupSchema>

export const credentialFieldSchema = templateFieldSchema.extend({
  content: z.string().nonempty('Content is required'),
})

export type CredentialField = z.infer<typeof credentialFieldSchema>

export const credentialGroupSchema = templateGroupSchema.extend({
  fields: z.array(credentialFieldSchema).nonempty('At least one field is required'),
})

export type CredentialGroup = z.infer<typeof credentialGroupSchema>
