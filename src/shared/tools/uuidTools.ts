import { Request } from 'express'
import crypto from 'crypto'

export const binToUUID = (bin: any) => {
  const hex = bin.data || bin
  const uuid = Buffer.from(hex).toString('hex')
  const uuidFormat = `${uuid.slice(0, 8)}-${uuid.slice(8, 12)}-${uuid.slice(
    12,
    16
  )}-${uuid.slice(16, 20)}-${uuid.slice(20, 32)}`
  return uuidFormat
}

export const newUUID = () => {
  return crypto.randomUUID()
}

export const validarUUID = (req: Request) => {
  const { id } = req.params
  const isValid = validarUUIDFormat(id)
  if (!isValid) {
    throw new Error('El ID es invalido')
  }
  return id
}

const validarUUIDFormat = (uuid: string) => {
  const regex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/gm
  return regex.test(uuid)
}

export const uuidToBin = (uuid: string) => {
  const hex = uuid.replace(/-/g, '')
  const bin = Buffer.from(hex, 'hex')
  return bin
}

export const addUUID = (json: any, idName: string) => {
  const uuid = newUUID()
  const bin = uuidToBin(uuid)
  json[idName] = bin
  return json
}
