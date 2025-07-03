import { z } from 'zod'

export const chatSchemaCreate = z.object({
  trip_id: z.coerce.number().min(1, 'Trip is required'),
  user_id: z.coerce.number().min(1, 'User is required'),
  message: z.string().min(1, 'Message cannot be empty'),
  timestamp: z.coerce.date().optional(), // Optional: usually auto-filled
})

export const chatSchema = chatSchemaCreate.extend({
  id: z.coerce.number().optional(),
})

export type ChatSchema = z.infer<typeof chatSchema>
