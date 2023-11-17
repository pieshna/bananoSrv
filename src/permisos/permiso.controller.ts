import { Request, Response } from 'express'
import permisoModel from './permiso.model'
import { asyncHandler } from '../shared/middleware/contollers'
import { handleDataAndResponse } from '../shared/tools/validateDataToResponse'

export const getPermisos = asyncHandler(async (req: Request, res: Response) => {
  const result = await permisoModel.findAll()
  handleDataAndResponse(res, result)
})

export const getPermiso = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await permisoModel.findByUUID(id)
  handleDataAndResponse(res, result)
})
