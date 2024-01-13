import { Router } from 'express'
import { createCompra, getCompra, getCompras } from './compra.controller'
import { compraSchema, compraSchemaArray } from './compra.schema'
import { schemaValidation } from '../shared/middleware/schema'

const router = Router()

router.get('/', getCompras)
router.get('/:id', getCompra)
router.post('/', schemaValidation(compraSchema), createCompra)

export default router
