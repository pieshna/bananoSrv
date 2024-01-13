import { z } from 'zod'

export const compraSchema = z.object({
  compra_id: z.string().uuid().optional(),
  fecha_compra: z.string().optional(),
  cantidad: z.number().positive().optional(),
  precio_quintal: z.number().positive().optional(),
  total_pagado: z.number().positive().optional(),
  total: z.number().positive().optional(),
  cliente_id: z.string().uuid().optional()
})

export const compraSchemaArray = z.array(compraSchema)
