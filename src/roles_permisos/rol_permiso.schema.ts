import { z } from 'zod'

export const rolPermisoSchema = z.object({
  rol_permiso_id: z.string().uuid().optional(),
  rol_id: z.string().uuid(),
  permiso_id: z.string().uuid()
})
