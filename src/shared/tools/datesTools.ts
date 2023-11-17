export const addCreatedAt = (json: any) => {
  const date = new Date()
  json.created_at = date
  return json
}

export const addUpdatedAt = (json: any) => {
  const date = new Date()
  json.updated_at = date
  return json
}

export const formateadorFecha = (fecha: string, fullMes?: boolean) => {
  if (!fecha) return ''
  const fechaFormateada = new Date(fecha).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: fullMes ? 'long' : '2-digit',
    day: '2-digit'
  })
  return fechaFormateada
}
