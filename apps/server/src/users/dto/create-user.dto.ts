import { createUserSchema } from '@griffin/schemas'
import { createZodDto } from 'nestjs-zod'

export class CreateUserDto extends createZodDto(createUserSchema) {}
