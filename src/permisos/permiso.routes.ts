import { Router } from 'express'
import {
  getPermisos,
  getPermiso,
  createPermiso,
  deletePermiso,
  updatePermiso
} from './permiso.controller'
import { schemaValidation } from '../shared/middleware/schema'
import { permisoSchema } from './permiso.schema'

const router = Router()

router.get('/', getPermisos)
router.get('/:id', getPermiso)
router.post('/', schemaValidation(permisoSchema), createPermiso)
router.put('/:id', schemaValidation(permisoSchema), updatePermiso)
router.delete('/:id', deletePermiso)

export default router
