import { Router } from 'express'

import {
  getRoles,
  getRol,
  createRol,
  deleteRol,
  updateRol,
  getRolesWithSuperAdmin
} from './rol.controller'
import { schemaValidation } from '../shared/middleware/schema'
import { rolSchema } from './rol.schema'

const router = Router()

router.get('/', getRoles)
router.get('/admin', getRolesWithSuperAdmin)
router.get('/:id', getRol)
router.post('/', schemaValidation(rolSchema), createRol)
router.put('/:id', schemaValidation(rolSchema), updateRol)
router.delete('/:id', deleteRol)

export default router
