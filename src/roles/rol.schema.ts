import { z } from 'zod'

export const rolSchema = z.object({
  rol_id: z.string().uuid().optional(),
  nombre: z.string().max(50)
})
