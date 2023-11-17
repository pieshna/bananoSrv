interface ValidarId {
  isValid: boolean
  parsedId: number
}

export const validarId = (id: string): ValidarId => {
  if (!id) {
    return { isValid: false, parsedId: 0 }
  }
  if (isNaN(parseInt(id))) {
    return { isValid: false, parsedId: 0 }
  }
  return { isValid: true, parsedId: parseInt(id) }
}
