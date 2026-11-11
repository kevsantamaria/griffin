import { paginationSchema } from '@griffin/schemas'
import { createZodDto } from 'nestjs-zod'

export class PaginationDto extends createZodDto(paginationSchema) {}
