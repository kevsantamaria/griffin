import { updateTechnologySchema } from '@griffin/schemas'
import { createZodDto } from 'nestjs-zod'

export class UpdateTechnologyDto extends createZodDto(updateTechnologySchema) {}
