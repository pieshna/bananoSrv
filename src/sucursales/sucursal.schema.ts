import { z } from 'zod'

export const sucursalSchema = z.object({
  sucursal_id: z.string().uuid().optional(),
  aplicacion_id: z.string().uuid(),
  nombre: z.string().max(255),
  direccion: z.string().max(255).optional()
})
