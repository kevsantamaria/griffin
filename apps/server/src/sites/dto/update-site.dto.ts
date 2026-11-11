import { updateSiteSchema } from '@griffin/schemas'
import { createZodDto } from 'nestjs-zod'

export class UpdateSiteDto extends createZodDto(updateSiteSchema) {}
