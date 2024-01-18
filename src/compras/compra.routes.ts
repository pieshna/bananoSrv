import { Router } from 'express'
import {
  createCompra,
  getCompra,
  getCompras,
  getComprasUltimos30Dias,
  deleteCompra,
  updateCompra
} from './compra.controller'
import { compraSchema, compraSchemaArray } from './compra.schema'
import { schemaValidation } from '../shared/middleware/schema'

const router = Router()

router.get('/', getCompras)
router.get('/ultimos30dias', getComprasUltimos30Dias)
router.get('/:id', getCompra)
router.post('/', schemaValidation(compraSchema), createCompra)
router.put('/:id', schemaValidation(compraSchema), updateCompra)
router.delete('/:id', deleteCompra)

export default router
