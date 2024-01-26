import { Response } from 'express'

// Función para manejar respuestas exitosas
export const handleResponse = <T>(
  res: Response,
  data: T,
  code = 200,
  mensaje?: string
): void => {
  res.status(code == 204 ? 200 : code).json({
    success: true,
    mensaje: mensaje || automaticMessage(code),
    data
  })
}

// Función para manejar errores
export const handleError = (res: Response, error: any, codigo = 500): void => {
  res.status(codigo).json({
    success: false,
    message: error.message || error || automaticMessage(codigo),
    data: []
  })
}

const automaticMessage = (code: number): string => {
  switch (code) {
    case 200:
      return 'Petición exitosa'
    case 201:
      return 'Creado exitosamente'
    case 204:
      return 'Sin contenido'
    case 400:
      return 'Petición incorrecta'
    case 401:
      return 'No autorizado'
    case 403:
      return 'Prohibido'
    case 404:
      return 'No encontrado'
    case 409:
      return 'Conflicto'
    case 500:
      return 'Error interno'
    default:
      return 'Error desconocido'
  }
}
