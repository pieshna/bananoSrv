import { NextFunction, Request, Response } from 'express'
import { AnyZodObject, ZodError } from 'zod'
import { handleError } from '../tools/fetchResponses'

export const schemaValidation =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = schema.parse(req.body)
      req.body = result
      next()
    } catch (error: any) {
      if (error instanceof ZodError) {
        const resultError = error.issues.map((issue) => {
          return {
            path: issue.path[0],
            message: issue.message
          }
        })
        return handleError(res, resultError, 400)
      }
      return handleError(res, error)
    }
  }
