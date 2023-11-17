import * as crypto from 'crypto'

interface ResetLink {
  token: string
  expirationTime: Date
  userId: string
}

const resetLinksDB: { [token: string]: ResetLink } = {}

export function generateResetToken(userId: string): string {
  const token = crypto.randomBytes(32).toString('hex')
  const expirationTime = new Date()
  expirationTime.setMinutes(expirationTime.getMinutes() + 60) // Enlace válido por 1 hora

  resetLinksDB[token] = {
    token,
    expirationTime,
    userId
  }

  return token
}

export function verifyResetLink(token: string) {
  const resetLink = resetLinksDB[token]
  if (resetLink) {
    const now = new Date()
    if (now <= resetLink.expirationTime) {
      return resetLink.userId
    } else {
      return -1
    }
  } else {
    return -1
  }
}
