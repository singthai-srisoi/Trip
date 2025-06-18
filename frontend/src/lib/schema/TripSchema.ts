import { z } from 'zod'

export const tripSchema = z.object({
  vehicle_id: z.coerce.number().min(1),
  driver_id: z.coerce.number().min(1),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format'),
  trip_number: z.number().int().min(1).max(3),
  start_destination_id: z.coerce.number().min(1),
  end_destination_id: z.coerce.number().min(1),
  remark: z.string().optional(),
  is_gantung: z.boolean().optional(),
  is_checked: z.boolean().optional(),
  is_verified: z.boolean().optional(),
  is_double_checked: z.boolean().optional(),
  is_incomplete: z.boolean().optional(),
  created_by: z.coerce.number().optional(),
})

export type TripSchema = z.infer<typeof tripSchema>