import { Router } from 'express'
import {
  createPrecio,
  deletePrecio,
  getPrecio,
  getPrecioByAplicacion,
  getPrecios,
  updatePrecio
} from './precio.controller'
import { precioSchemaCreate, precioSchemaUpdate } from './precio.schema'
import { schemaValidation } from '../shared/middleware/schema'

const router = Router()

router.get('/', getPrecios)
router.get('/aplicacion/:id', getPrecioByAplicacion)
router.get('/:id', getPrecio)
router.post('/', schemaValidation(precioSchemaCreate), createPrecio)
router.put('/:id', schemaValidation(precioSchemaUpdate), updatePrecio)
router.delete('/:id', deletePrecio)

export default router
