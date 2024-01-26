import { z } from 'zod'

export const aplicacionSchema = z.object({
  aplicacion_id: z.string().uuid().optional(),
  nombre: z.string(),
  descripcion: z.string().optional()
})
