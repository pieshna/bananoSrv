import { Router } from 'express'
import { schemaValidation } from '../shared/middleware/schema'
import {
  createVenta,
  deleteVenta,
  getDataVentasEmpresa,
  getDataVentasEmpresaByDates,
  getVenta,
  getVentas,
  updateVenta
} from './venta.controller'
import { ventaSchema } from './venta.schema'

const router = Router()

router.get('/', getVentas)
router.get('/empresa/:empresa_id', getDataVentasEmpresa)
router.get('/empresa/dates/:empresa_id', getDataVentasEmpresaByDates)
router.get('/:id', getVenta)
router.post('/', schemaValidation(ventaSchema), createVenta)
router.put('/:id', schemaValidation(ventaSchema), updateVenta)
router.delete('/:id', deleteVenta)

export default router
