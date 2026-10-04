import { credentialFieldSchema, credentialGroupSchema } from '@griffin/schemas'
import { createZodDto } from 'nestjs-zod'

export class CredentialFieldDto extends createZodDto(credentialFieldSchema) {}

export class CredentialGroupDto extends createZodDto(credentialGroupSchema) {}