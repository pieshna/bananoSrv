import { Router } from 'express'
import {
  getSucursales,
  getSucursal,
  createSucursal,
  deleteSucursal,
  updateSucursal
} from './sucursal.controller'
import { schemaValidation } from '../shared/middleware/schema'
import { sucursalSchema } from './sucursal.schema'

const router = Router()

router.get('/', getSucursales)
router.get('/:id', getSucursal)
router.post('/', schemaValidation(sucursalSchema), createSucursal)
router.put('/:id', schemaValidation(sucursalSchema), updateSucursal)
router.delete('/:id', deleteSucursal)

export default router
