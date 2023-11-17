import { z } from 'zod'

export const authSchemaRegister = z.object({
  usuario_id: z.string().uuid().optional(),
  nombre: z.string().nonempty().max(50),
  apellido: z.string().nonempty().max(50),
  correo: z.string().email(),
  usuario: z.string().nonempty().max(20),
  password: z.string().nonempty().max(255),
  foto: z.string().max(255).optional(),
  telefono: z.string().max(15).optional(),
  activo: z.boolean().optional(),
  rol_id: z.string().uuid(),
  created_at: z.date().optional(),
  updated_at: z.date().optional()
})

export const authSchemaLogin = z.object({
  correo: z.string(),
  password: z.string().nonempty().max(255)
})
