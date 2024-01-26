import { z } from 'zod'

export const clienteSchema = z.object({
  cliente_id: z.string().uuid().optional(),
  aplicacion_id: z.string().uuid(),
  nombre: z.string().max(50),
  apellido: z.string().max(50).optional(),
  telefono: z.string().max(50).optional(),
  direccion: z.string().max(255).optional(),
  porcentaje: z.number().optional()
})
