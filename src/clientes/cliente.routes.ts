import { Router } from 'express'
import {
  getClientes,
  getCliente,
  createCliente,
  deleteCliente,
  updateCliente,
  getClientesPorAplicacion
} from './cliente.controller'
import { schemaValidation } from '../shared/middleware/schema'
import { clienteSchema } from './cliente.schema'

const router = Router()

router.get('/', getClientes)
router.get('/aplicacion/:id', getClientesPorAplicacion)
router.get('/:id', getCliente)
router.post('/', schemaValidation(clienteSchema), createCliente)
router.put('/:id', schemaValidation(clienteSchema), updateCliente)
router.delete('/:id', deleteCliente)

export default router
