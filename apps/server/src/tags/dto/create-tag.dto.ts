import { createTagSchema } from '@griffin/schemas'
import { createZodDto } from 'nestjs-zod'

export class CreateTagDto extends createZodDto(createTagSchema) {}
