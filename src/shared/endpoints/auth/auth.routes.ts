import { Router } from 'express'

import {
  login,
  register,
  forgotPassword,
  resetPassword,
  verifyTokenValid
} from './auth.controller'
import { schemaValidation } from '../../middleware/schema'
import { authSchemaLogin, authSchemaRegister } from '../../schemas/auth.schema'

const router = Router()

router.get('/verify-token-valid/:token', verifyTokenValid)

router.post('/login', schemaValidation(authSchemaLogin), login)
router.post('/register', schemaValidation(authSchemaRegister), register)
router.post('/forgot-password', forgotPassword)
router.post('/reset-password/:token', resetPassword)

export default router
