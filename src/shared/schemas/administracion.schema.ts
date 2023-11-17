import { z } from 'zod'

export const administacionSchema = z.object({
  id: z.number().nonnegative(),
  campo: z.string().nonempty(),
  tiempo: z.number().nonnegative()
})
