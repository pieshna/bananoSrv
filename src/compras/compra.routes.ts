import { Router } from 'express'
import {
  createCompra,
  getCompra,
  getCompras,
  deleteCompra,
  updateCompra,
  getCompraByDates,
  getQuintalesByDays
} from './compra.controller'
import { compraSchema, compraSchemaArray } from './compra.schema'
import { schemaValidation } from '../shared/middleware/schema'

const router = Router()

router.get('/', getCompras)
router.get('/quintales/:days', getQuintalesByDays)
router.get('/:id', getCompra)
router.post('/', schemaValidation(compraSchema), createCompra)
router.post('/bydates', getCompraByDates)
router.put('/:id', schemaValidation(compraSchema), updateCompra)
router.delete('/:id', deleteCompra)

export default router
