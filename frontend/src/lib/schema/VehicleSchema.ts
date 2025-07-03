import { z } from 'zod'

export const vehicleSchemaCreate = z.object({
  plate_no: z.string().min(1, 'Plate number is required'),
  model: z.string().optional(),
})

export const vehicleSchema = vehicleSchemaCreate.extend({
  id: z.coerce.number().optional(),
  created_at: z.coerce.date().optional(),
})

export type VehicleSchema = z.infer<typeof vehicleSchema>
