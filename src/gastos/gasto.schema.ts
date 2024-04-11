import { z } from 'zod'

export const GastoSchema = z.object({
  gasto_id: z.string().uuid().optional(),
  nombre: z.string(),
  monto: z.number(),
  dias: z.array(z.boolean()).max(7),
  recurrente: z.boolean(),
  aplicacion_id: z.string().uuid()
})
