import { Response } from 'express'
import { handleResponse } from './fetchResponses'

const validateData = (data: any) => {
  return data.length > 0 ? true : false
}

export const handleDataAndResponse = (
  res: Response,
  result: any,
  emptyStatusCode = 204
) => {
  validateData(result)
    ? handleResponse(res, result)
    : handleResponse(res, result, emptyStatusCode)
}
