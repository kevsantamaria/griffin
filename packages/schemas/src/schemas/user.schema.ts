import { z } from 'zod'

export const createUserSchema = z.object({
  username: z.string().nonempty('Username is required').max(50),
  password: z.string().nonempty('Password is required'),
})

export type CreateUserDto = z.infer<typeof createUserSchema>

export const updateUserSchema = createUserSchema.partial()

export type UpdateUserDto = z.infer<typeof updateUserSchema>
