import { z } from 'zod'

export const usuarioRolSchema = z.object({
  usuario_rol_id: z.string().uuid().optional(),
  usuario_id: z.string().uuid(),
  rol_id: z.string().uuid()
})
