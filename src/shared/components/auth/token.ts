import jwt from 'jsonwebtoken'
import { envToConst } from '../../envToConst'

export interface TokenPayload {
  userId: string
  userName: string
  aplicacionId: string
  rolId: string
  rol: string
}

export const generateToken = (payload: TokenPayload, time: number): string => {
  const token = jwt.sign(payload, envToConst.JWT_SECRET, { expiresIn: time })
  return token
}

export const verifyToken = (token: string | undefined): TokenPayload | null => {
  try {
    if (!token) {
      throw new Error('No se proporcionó un token de acceso')
    }
    const payload = jwt.verify(token, envToConst.JWT_SECRET) as TokenPayload
    return payload
  } catch (error) {
    return null
  }
}

export const decodeToken = (token: string): TokenPayload | null => {
  try {
    const payload = jwt.decode(token) as TokenPayload
    return payload
  } catch (error) {
    return null
  }
}
