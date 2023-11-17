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

export const createPermiso = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await permisoModel.create(req.body)
    handleDataAndResponse(res, result, 201)
  }
)

export const updatePermiso = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params
    const result = await permisoModel.update(id, req.body)
    handleDataAndResponse(res, result)
  }
)

export const deletePermiso = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params
    const result = await permisoModel.delete(id)
    handleDataAndResponse(res, result)
  }
)
