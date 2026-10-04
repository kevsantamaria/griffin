import { z } from 'zod'

export const paginationSchema = z.object({
  limit: z.coerce.number().nonnegative().optional(),
  offset: z.coerce.number().nonnegative().optional(),
})

export type PaginationDto = z.infer<typeof paginationSchema>
