import { z } from 'zod'

export const userSchemaCreate = z.object({
  name: z.string().min(1, 'Name is required'),
  role: z.enum(['admin', 'driver', 'director']),
  phone: z.string().optional(),
  username: z.string().optional(),
  hashed_password: z.string().optional(),
  email: z.string().optional(),
})

/**
 *         username: '',
        hashed_password: '',
        email: '',
 */

export const userSchema = userSchemaCreate.extend({
  id: z.coerce.number().optional(),
  created_at: z.coerce.date().optional(),
})

export type UserSchema = z.infer<typeof userSchema>
