import { z } from 'zod'

export const usuarioSchema = z.object({
  usuario_id: z.string().uuid().optional(),
  aplicacion_id: z.string().uuid(),
  nombre: z.string(),
  apellido: z.string(),
  email: z.string().email(),
  username: z.string().optional(),
  password: z.string(),
  remember_token: z.string().optional()
})

export const usuarioEditSchema = usuarioSchema.omit({
  password: true
})
