import { createTemplateSchema } from '@griffin/schemas'
import { createZodDto } from 'nestjs-zod'

export class CreateTemplateDto extends createZodDto(createTemplateSchema) {}