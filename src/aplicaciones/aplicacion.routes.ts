import { Router } from 'express'
import {
  getAplicaciones,
  getAplicacion,
  createAplicacion,
  updateAplicacion,
  deleteAplicacion
} from './aplicacion.controller'
import { schemaValidation } from '../shared/middleware/schema'
import { aplicacionSchema } from './aplicacion.schema'

const router = Router()

router.get('/', getAplicaciones)
router.get('/:id', getAplicacion)
router.post('/', schemaValidation(aplicacionSchema), createAplicacion)
router.put('/:id', schemaValidation(aplicacionSchema), updateAplicacion)
router.delete('/:id', deleteAplicacion)

export default router
