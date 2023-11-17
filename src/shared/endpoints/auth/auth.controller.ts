import { Request, Response } from 'express'
import { generateToken } from '../../components/auth/token'
import { compareHash, hashString } from '../../components/auth/encriptar'
import administracion from '../../components/auth/administracion'
import authModel from './auth.model'
import {
  generateResetToken,
  verifyResetLink
} from '../../components/auth/tokenResetPassword'
import { sendEmailByFunction } from '../../components/email/email.controller'
import { handleError, handleResponse } from '../../tools/fetchResponses'
import { uuidToBin } from '../../tools/uuidTools'

export const login = async (req: Request, res: Response) => {
  try {
    const { correo, password } = req.body

    const user: any = await authModel.findByFieldOnlyOne('correo', correo)
    const tiempoToken: any = await administracion.getTiempoToken()

    const username = await authModel.findByFieldOnlyOne('usuario', correo)

    if (!username && !user) {
      throw new Error('Correo electrónico o usuario incorrectos')
    }

    const passwordMatch = await compareHash(
      password,
      username ? username.password : user.password
    )

    if (!passwordMatch) {
      throw new Error('Correo electrónico o contraseña incorrectos')
    }

    const jwt = generateToken(
      {
        userId: username ? username.usuario_id : user.usuario_id,
        userName: username ? username.nombre : user.nombre,
        userPicture: username ? username.avatar : user.avatar || '',
        userRole: username ? username.rol : user.rol,
        userRoleId: username ? username.rol_id : user.rol_id
      },
      tiempoToken
    )

    handleResponse(res, jwt)
  } catch (error) {
    handleError(res, error)
  }
}

export const register = async (req: Request, res: Response) => {
  try {
    const tiempoToken: any = await administracion.getTiempoToken()

    const { correo, password, nombre } = req.body

    const existingUser: any = await authModel.findByFieldOnlyOne(
      'correo',
      correo
    )
    if (existingUser) {
      throw new Error('El correo electrónico ya existe')
    }

    req.body.rol_id = uuidToBin(req.body.rol_id)

    req.body.password = await hashString(password)

    const user: any = await authModel.create(req.body)

    if (user?.error) {
      throw new Error(user.error || 'Error al crear el usuario')
    }

    const jwt = generateToken(
      {
        userId: user.insertId,
        userName: nombre,
        userPicture: '',
        userRole: req.body.rol || '',
        userRoleId: req.body.rol_id || ''
      },
      tiempoToken
    )

    handleResponse(res, jwt)
  } catch (error) {
    handleError(res, error)
  }
}

export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body
    const origen = req.headers.origin

    const user: any = await authModel.findByFieldOnlyOne('email', email)

    if (!user) {
      throw new Error('Usuario no encontrado')
    }

    const token = generateResetToken(user.id)

    const emailSent = await sendEmailByFunction(
      email,
      'Restablecer contraseña',
      `<a href="${origen}/reset-password/${token}">Restablecer contraseña</a>`
    )

    if (!emailSent) {
      throw new Error('Error al enviar el correo electrónico')
    }

    handleResponse(res, emailSent)
  } catch (error) {
    handleError(res, error)
  }
}

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { token } = req.params
    const { password } = req.body

    const userId = verifyResetLink(token)

    if (userId === -1) {
      throw new Error('Token inválido')
    }

    const user: any = await authModel.findByFieldOnlyOne('id', userId)

    if (!user) {
      throw new Error('Usuario no encontrado')
    }

    const hashedPassword = await hashString(password)
    await authModel.update(user.id, { password: hashedPassword })

    handleResponse(res, { message: 'Contraseña actualizada' })
  } catch (error) {
    handleError(res, error)
  }
}

export const verifyTokenValid = async (req: Request, res: Response) => {
  try {
    const { token } = req.params

    const userId = verifyResetLink(token)

    if (userId === -1) {
      throw new Error('Token inválido')
    }

    const user: any = await authModel.findByFieldOnlyOne('id', userId)

    if (!user) {
      throw new Error('Usuario no encontrado')
    }

    handleResponse(res, { message: 'Token válido' })
  } catch (error) {
    handleError(res, error)
  }
}
