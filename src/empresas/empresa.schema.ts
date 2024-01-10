import { z } from 'zod'

export const empresaSchemaCreate = z.object({
  empresa_id: z.string().uuid().optional(),
  aplicacion_id: z.string().uuid(),
  nombre: z.string().max(50),
  direccion: z.string().max(255).optional(),
  telefono: z.string().max(50).optional(),
  precio_quintal: z.string().max(50).optional(),
  dias: z.array(z.boolean()).max(7).optional()
})

export const empresaSchemaUpdate = empresaSchemaCreate.omit({
  aplicacion_id: true
})
