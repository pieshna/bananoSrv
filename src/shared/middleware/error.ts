import { Response, Request, NextFunction } from 'express'
import { handleError } from '../tools/fetchResponses'

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  handleError(res, err)
}
