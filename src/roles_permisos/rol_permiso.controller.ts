import { Request, Response } from 'express'
import rol_permisoModel from './rol_permiso.model'
import { asyncHandler } from '../shared/middleware/contollers'
import { handleDataAndResponse } from '../shared/tools/validateDataToResponse'

export const getRoles_permisos = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await rol_permisoModel.findAll()
    handleDataAndResponse(res, result)
  }
)

export const getRol_permiso = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params
    const result = await rol_permisoModel.findByUUID(id)
    handleDataAndResponse(res, result)
  }
)

export const createRol_permiso = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await rol_permisoModel.create(req.body)
    handleDataAndResponse(res, result, 201)
  }
)

export const updateRol_permiso = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params
    const result = await rol_permisoModel.update(id, req.body)
    handleDataAndResponse(res, result)
  }
)

export const deleteRol_permiso = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params
    const result = await rol_permisoModel.delete(id)
    handleDataAndResponse(res, result)
  }
)
