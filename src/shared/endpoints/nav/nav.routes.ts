import Router from 'express'
import {
  listarNav,
  agregarNav,
  editarNav,
  eliminarNav,
  listarNavToNavBar,
  obtenerNavSinParentId,
  obtenerNav,
  obtenerNavCustom
} from './nav.controller'
import { schemaValidation } from '../../middleware/schema'
import { navSchema } from '../../schemas/nav.schema'

const router = Router()
const validarSchema = schemaValidation(navSchema)

router.get('/', listarNav)
router.get('/navbar', listarNavToNavBar)
router.get('/sin-parent-id', obtenerNavSinParentId)
router.get('/custom', obtenerNavCustom)
router.get('/:id', obtenerNav)
router.post('/', validarSchema, agregarNav)
router.put('/:id', validarSchema, editarNav)
router.delete('/:id', eliminarNav)

export default router
