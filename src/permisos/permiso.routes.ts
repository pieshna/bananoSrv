import { Router } from 'express'
import { getPermisos, getPermiso } from './permiso.controller'
import { schemaValidation } from '../shared/middleware/schema'
import { permisoSchema } from './permiso.schema'

const router = Router()

router.get('/', getPermisos)
router.get('/:id', getPermiso)

export default router
