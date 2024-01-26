import { Response } from 'express'
import { handleResponse } from './fetchResponses'

const validateData = (data: any) => {
  return data.length > 0 ? true : false
}

export const handleDataAndResponse = (
  res: Response,
  result: any,
  code?: number,
  emptyStatusCode = 204
) => {
  validateData(result)
    ? handleResponse(res, result, code)
    : handleResponse(res, result, emptyStatusCode)
}
