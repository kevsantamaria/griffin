import { updateTemplateSchema } from '@griffin/schemas'
import { createZodDto } from 'nestjs-zod'

export class UpdateTemplateDto extends createZodDto(updateTemplateSchema) {}
