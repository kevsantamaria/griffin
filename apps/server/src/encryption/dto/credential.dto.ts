import { credentialGroupSchema } from '@griffin/schemas'
import { createZodDto } from 'nestjs-zod'

export class CredentialGroupDto extends createZodDto(credentialGroupSchema) {}
