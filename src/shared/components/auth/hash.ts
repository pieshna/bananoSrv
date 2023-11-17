import bcrypt from 'bcrypt'
import { envToConst } from '../../envToConst'

export const hashString = async (string: string): Promise<string> => {
  const saltos = parseInt(envToConst.SALTOS as string)
  const hash = await bcrypt.hash(string, saltos)
  return hash
}

export const compareHash = async (
  string: string,
  hash: string
): Promise<boolean> => {
  const match = await bcrypt.compare(string, hash)
  return match
}
