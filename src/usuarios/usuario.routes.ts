import { Router } from 'express'
import {
  getUsuarios,
  getUsuario,
  createUsuario,
  updateUsuario,
  deleteUsuario
} from './usuario.controller'
import { schemaValidation } from '../shared/middleware/schema'
import { usuarioSchema, usuarioEditSchema } from './usuario.schema'

const router = Router()

router.get('/', getUsuarios)
router.get('/:id', getUsuario)
router.post('/', schemaValidation(usuarioSchema), createUsuario)
router.put('/:id', schemaValidation(usuarioEditSchema), updateUsuario)
router.delete('/:id', deleteUsuario)

export default router
