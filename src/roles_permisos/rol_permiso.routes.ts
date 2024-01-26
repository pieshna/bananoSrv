import { Router } from 'express'
import {
  getRol_permiso,
  createRol_permiso,
  deleteRol_permiso,
  getRoles_permisos,
  updateRol_permiso
} from './rol_permiso.controller'
import { schemaValidation } from '../shared/middleware/schema'
import { rolPermisoSchema } from './rol_permiso.schema'

const router = Router()

router.get('/', getRoles_permisos)
router.get('/:id', getRol_permiso)
router.post('/', schemaValidation(rolPermisoSchema), createRol_permiso)
router.put('/:id', schemaValidation(rolPermisoSchema), updateRol_permiso)
router.delete('/:id', deleteRol_permiso)

export default router
