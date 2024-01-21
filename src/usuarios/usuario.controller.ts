import { Request, Response } from 'express'
import usuarioModel from './usuario.model'
import { asyncHandler } from '../shared/middleware/contollers'
import { handleDataAndResponse } from '../shared/tools/validateDataToResponse'

export const getUsuarios = asyncHandler(async (req: Request, res: Response) => {
  const result = await usuarioModel.findAll()
  handleDataAndResponse(res, result)
})

export const getUsuario = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await usuarioModel.findByUUID(id)
  handleDataAndResponse(res, result)
})

export const getUsuarioByAplicacion = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params
    const result = await usuarioModel.findByAplicacion(id)
    handleDataAndResponse(res, result)
  }
)

export const createUsuario = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await usuarioModel.create(req.body)
    handleDataAndResponse(res, result, 201)
  }
)

export const updateUsuario = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params
    const result = await usuarioModel.update(id, req.body)
    handleDataAndResponse(res, result)
  }
)

export const deleteUsuario = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params
    const result = await usuarioModel.delete(id)
    handleDataAndResponse(res, result)
  }
)
