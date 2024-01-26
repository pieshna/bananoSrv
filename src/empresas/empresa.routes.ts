import { Router } from 'express'

import {
  getEmpresas,
  getEmpresa,
  createEmpresa,
  deleteEmpresa,
  updateEmpresa,
  getEmpresaByAplicacion
} from './empresa.controller'
import { schemaValidation } from '../shared/middleware/schema'
import { empresaSchemaCreate, empresaSchemaUpdate } from './empresa.schema'

const router = Router()

router.get('/', getEmpresas)
router.get('/aplicacion/:id', getEmpresaByAplicacion)
router.get('/:id', getEmpresa)
router.post('/', schemaValidation(empresaSchemaCreate), createEmpresa)
router.put('/:id', schemaValidation(empresaSchemaUpdate), updateEmpresa)
router.delete('/:id', deleteEmpresa)

export default router
