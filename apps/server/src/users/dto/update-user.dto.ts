import { updateUserSchema } from '@griffin/schemas'
import { createZodDto } from 'nestjs-zod'

export class UpdateUserDto extends createZodDto(updateUserSchema) {}
