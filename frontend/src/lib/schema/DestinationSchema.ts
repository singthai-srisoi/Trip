import { z } from 'zod'

export const destinationSchemaCreate = z.object({
  name: z.string().min(1, 'Destination name is required'),
  address: z.string().optional(),
})

export const destinationSchema = destinationSchemaCreate.extend({
  id: z.coerce.number().optional(),
})

export type DestinationSchema = z.infer<typeof destinationSchema>
