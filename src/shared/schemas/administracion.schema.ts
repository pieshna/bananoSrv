import { z } from 'zod'

export const administacionSchema = z.object({
  administracion_id: z.string().uuid().optional(),
  nombre: z.string().max(50),
  descripcion: z.string().max(255).optional(),
  tiempo: z.number()
})
