import { z } from 'zod'

export const permisoSchema = z.object({
  permiso_id: z.string().uuid().optional(),
  nombre: z.string().max(50)
})
