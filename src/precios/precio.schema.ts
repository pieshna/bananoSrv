import { z } from 'zod'

export const precioSchemaCreate = z.object({
  precio_id: z.string().uuid().optional(),
  precio_quintal_compra: z.number(),
  precio_quintal_venta: z.number().optional(),
  aplicacion_id: z.string().uuid()
})

export const precioSchemaUpdate = precioSchemaCreate.omit({
  aplicacion_id: true
})
