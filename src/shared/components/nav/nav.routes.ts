import Router from 'express'
import {
  listarNav,
  agregarNav,
  editarNav,
  eliminarNav,
  listarNavToNavBar,
  obtenerNavSinParentId
} from './nav.controller'
import { authMiddleware } from '../../middleware/auth'
import { schemaValidation } from '../../middleware/schema'
import { navSchema } from '../../schemas/nav.schema'

const router = Router()
const validarSchema = schemaValidation(navSchema)

router.use(authMiddleware)

router.get('/', listarNav)
router.get('/navbar', listarNavToNavBar)
router.get('/sin-parent-id', obtenerNavSinParentId)
router.post('/', validarSchema, agregarNav)
router.put('/:id', validarSchema, editarNav)
router.delete('/:id', eliminarNav)

export default router
