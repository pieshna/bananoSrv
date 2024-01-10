import { Router } from 'express'

import {
  getEmpresas,
  getEmpresa,
  createEmpresa,
  deleteEmpresa,
  updateEmpresa
} from './empresa.controller'
import { schemaValidation } from '../shared/middleware/schema'
import { empresaSchemaCreate, empresaSchemaUpdate } from './empresa.schema'

const router = Router()

router.get('/', getEmpresas)
router.get('/:id', getEmpresa)
router.post('/', schemaValidation(empresaSchemaCreate), createEmpresa)
router.put('/:id', schemaValidation(empresaSchemaUpdate), updateEmpresa)
router.delete('/:id', deleteEmpresa)

export default router
