import { createTechnologySchema } from '@griffin/schemas'
import { createZodDto } from 'nestjs-zod'

export class CreateTechnologyDto extends createZodDto(createTechnologySchema) {}
