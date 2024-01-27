import { z } from 'zod'

export const compraSchema = z.object({
  compra_id: z.string().uuid().optional(),
  fecha_compra: z.string().optional(),
  cantidad_quintales: z.number().positive().optional(),
  quintales_porcentaje: z.number().positive().optional(),
  precio_quintal: z.number().positive().optional(),
  total_pagado: z.number().optional(),
  total: z.number().optional(),
  cliente_id: z.string().uuid().optional(),
  sucursal_id: z.string().uuid().optional(),
  detalle: z.string().optional()
})

export const compraSchemaArray = z.array(compraSchema)
