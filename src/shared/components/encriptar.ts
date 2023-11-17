import bcrypt from 'bcrypt'

import { envToConst } from '../envToConst'

const saltos = parseInt(envToConst.SALTOS as string)

export const encriptar = (password: string) => {
  const salt = bcrypt.genSaltSync(saltos)
  return bcrypt.hashSync(password, salt)
}

export const comparar = (password: string, passwordHash: string) => {
  return bcrypt.compareSync(password, passwordHash)
}
