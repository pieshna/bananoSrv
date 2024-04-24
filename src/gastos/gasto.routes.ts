import { Router } from 'express'
import { schemaValidation } from '../shared/middleware/schema'
import {
  countTotalByDay,
  createGasto,
  deleteGasto,
  getGasto,
  getGastos,
  getGastosByDay,
  updateGasto
} from './gasto.controller'
import { GastoSchema } from './gasto.schema'

const router = Router()

router.get('/', getGastos)
router.get('/:id', getGasto)
router.get('/total/:day', countTotalByDay)
router.get('/dia/:day', getGastosByDay)
router.post('/', schemaValidation(GastoSchema), createGasto)
router.put('/:id', schemaValidation(GastoSchema), updateGasto)
router.delete('/:id', deleteGasto)

export default router
