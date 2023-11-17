import { Response } from 'express'

// Función para manejar respuestas exitosas
export const handleResponse = <T>(
  res: Response,
  data: T,
  mensaje?: string,
  code = 200
): void => {
  res.status(code).json({
    success: true,
    data,
    mensaje
  })
}

// Función para manejar errores
export const handleError = (res: Response, error: any, codigo = 500): void => {
  res.status(codigo).json({
    success: false,
    error: error.message || error
  })
}
