import { Router } from 'express'
import {
  getUsuario_rol,
  createUsuario_rol,
  deleteUsuario_rol,
  getUsuarios_roles,
  updateUsuario_rol
} from './usuario_rol.controller'
import { schemaValidation } from '../shared/middleware/schema'
import { usuarioRolSchema } from './usuario_rol.schema'

const router = Router()

router.get('/', getUsuarios_roles)
router.get('/:id', getUsuario_rol)
router.post('/', schemaValidation(usuarioRolSchema), createUsuario_rol)
router.put('/:id', schemaValidation(usuarioRolSchema), updateUsuario_rol)
router.delete('/:id', deleteUsuario_rol)

export default router
