import { z } from 'zod'

export const ventaSchema = z.object({
  venta_id: z.string().uuid().optional(),
  fecha_venta: z.string().optional(),
  empresa_id: z.string().uuid().optional(),
  cantidad_quintales: z.number(),
  precio_quintal: z.number(),
  total: z.number()
})
