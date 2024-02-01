import { Router } from 'express'
import {
  createVenta,
  deleteVenta,
  getVenta,
  getVentas,
  updateVenta
} from './venta.controller'
import { ventaSchema } from './venta.schema'
import { schemaValidation } from '../shared/middleware/schema'

const router = Router()

router.get('/', getVentas)
router.get('/:id', getVenta)
router.post('/', schemaValidation(ventaSchema), createVenta)
router.put('/:id', schemaValidation(ventaSchema), updateVenta)
router.delete('/:id', deleteVenta)

export default router
