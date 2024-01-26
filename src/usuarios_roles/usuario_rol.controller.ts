import { Request, Response } from 'express'
import usuario_rolModel from './usuario_rol.model'
import { asyncHandler } from '../shared/middleware/contollers'
import { handleDataAndResponse } from '../shared/tools/validateDataToResponse'
import { binToUUID, uuidToBin } from '../shared/tools/uuidTools'

export const getUsuarios_roles = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await usuario_rolModel.findAll()
    handleDataAndResponse(res, result)
  }
)

export const getUsuario_rol = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params
    const result = await usuario_rolModel.findByUUID(id)
    result[0].usuario_id = binToUUID(result[0].usuario_id)
    result[0].rol_id = binToUUID(result[0].rol_id)
    handleDataAndResponse(res, result)
  }
)

export const createUsuario_rol = asyncHandler(
  async (req: Request, res: Response) => {
    req.body.usuario_id = uuidToBin(req.body.usuario_id)
    req.body.rol_id = uuidToBin(req.body.rol_id)
    const result = await usuario_rolModel.create(req.body)
    handleDataAndResponse(res, result, 201)
  }
)

export const updateUsuario_rol = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params
    req.body.usuario_id = uuidToBin(req.body.usuario_id)
    req.body.rol_id = uuidToBin(req.body.rol_id)
    const result = await usuario_rolModel.update(id, req.body)
    handleDataAndResponse(res, result)
  }
)

export const deleteUsuario_rol = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params
    const result = await usuario_rolModel.delete(id)
    handleDataAndResponse(res, result)
  }
)
