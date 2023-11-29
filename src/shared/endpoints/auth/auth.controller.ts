import { Request, Response } from 'express'
import { TokenPayload, generateToken } from '../../components/auth/token'
import { compareHash, hashString } from '../../components/auth/encriptar'
import administracion from '../../components/auth/administracion'
import authModel from './auth.model'
import {
  generateResetToken,
  verifyResetLink
} from '../../components/auth/tokenResetPassword'
import { sendEmailByFunction } from '../../components/email/email.controller'
import { asyncHandler } from '../../middleware/contollers'
import { handleDataAndResponse } from '../../tools/validateDataToResponse'

const tiempoParaToken = async () => {
  return await administracion.getTiempoToken()
}

const getUser = async (correo: string) => {
  const user = await authModel.findByFieldOnlyOne('email', correo)
  const username = await authModel.findByFieldOnlyOne('username', correo)
  if (!user && !username) {
    throw new Error('Usuario no encontrado')
  }
  return user || username
}

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { correo, password } = req.body
  const tiempoToken: any = await tiempoParaToken()

  const user: any = await getUser(correo)

  const isPasswordCorrect = await compareHash(password, user.password)

  if (!isPasswordCorrect) {
    throw new Error('Contraseña incorrecta')
  }

  const payload: TokenPayload = {
    userId: user.usuario_id,
    userName: user.nombre,
    aplicacionId: user.aplicacion_id
  }

  const jwt = generateToken(payload, tiempoToken)

  handleDataAndResponse(res, jwt)
})

export const register = asyncHandler(async (req: Request, res: Response) => {
  const { correo, password, nombre } = req.body
  const tiempoToken = await tiempoParaToken()

  const existingUser = await getUser(correo)
  if (existingUser) {
    throw new Error('El correo electrónico ya existe')
  }

  req.body.password = await hashString(password)

  const user: any = await authModel.create(req.body)

  const payload: TokenPayload = {
    userId: user.insertId,
    userName: nombre,
    aplicacionId: user.aplicacion_id
  }

  const jwt = generateToken(payload, tiempoToken)

  handleDataAndResponse(res, jwt)
})

export const forgotPassword = asyncHandler(
  async (req: Request, res: Response) => {
    const { correo } = req.body
    const origen = req.headers.origin

    const user: any = await getUser(correo)

    if (!user) {
      throw new Error('Usuario no encontrado')
    }

    const token = generateResetToken(user.usuario_id)

    const emailSent = await sendEmailByFunction(
      correo,
      'Restablecer contraseña',
      `<a href="${origen}/reset-password/${token}">Restablecer contraseña</a>`
    )

    if (!emailSent) {
      throw new Error('Error al enviar el correo electrónico')
    }

    handleDataAndResponse(res, { message: 'Correo electrónico enviado' })
  }
)

export const resetPassword = asyncHandler(
  async (req: Request, res: Response) => {
    const { token } = req.params
    const { password } = req.body

    const userId = verifyResetLink(token)

    if (userId === -1) {
      throw new Error('Token inválido')
    }

    const user: any = await authModel.findByFieldOnlyOne('usuario_id', userId)

    if (!user) {
      throw new Error('Usuario no encontrado')
    }

    const hashedPassword = await hashString(password)
    await authModel.update(user.id, { password: hashedPassword })

    handleDataAndResponse(res, { message: 'Contraseña actualizada' })
  }
)

export const verifyTokenValid = asyncHandler(
  async (req: Request, res: Response) => {
    const { token } = req.params

    const userId = verifyResetLink(token)

    if (userId === -1) {
      throw new Error('Token inválido')
    }

    const user: any = await authModel.findByFieldOnlyOne('usuario_id', userId)

    if (!user) {
      throw new Error('Usuario no encontrado')
    }

    handleDataAndResponse(res, { message: 'Token válido' })
  }
)
