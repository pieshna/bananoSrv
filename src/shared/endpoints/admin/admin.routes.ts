import { Router } from 'express'
import {
  createAdmin,
  deleteAdmin,
  getAdmin,
  getAdminById,
  updateAdmin
} from './admin.controller'
import { schemaValidation } from '../../middleware/schema'
import { administacionSchema } from '../../schemas/administracion.schema'

const router = Router()

router.get('/', getAdmin)
router.get('/:id', getAdminById)
router.post('/', schemaValidation(administacionSchema), createAdmin)
router.put('/:id', schemaValidation(administacionSchema), updateAdmin)
router.delete('/:id', deleteAdmin)

export default router
