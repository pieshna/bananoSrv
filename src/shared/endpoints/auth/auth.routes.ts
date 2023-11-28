import { Router } from 'express'

import {
  forgotPassword,
  login,
  register,
  resetPassword,
  verifyTokenValid
} from './auth.controller'
import { schemaValidation } from '../../middleware/schema'
import { authSchemaLogin, authSchemaRegister } from '../../schemas/auth.schema'
import { authMiddleware } from '../../middleware/auth'

const router = Router()

router.get('/verify-token-valid/:token', verifyTokenValid)

router.post('/login', schemaValidation(authSchemaLogin), login)
router.post('/forgot-password', forgotPassword)
router.post('/reset-password/:token', resetPassword)
router.use(authMiddleware)
router.post('/register', schemaValidation(authSchemaRegister), register)

export default router
