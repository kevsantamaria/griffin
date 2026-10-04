import { createSiteSchema } from '@griffin/schemas'
import { createZodDto } from 'nestjs-zod'

export class CreateSiteDto extends createZodDto(createSiteSchema) {}
