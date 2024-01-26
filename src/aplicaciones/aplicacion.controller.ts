import { Request, Response } from 'express'
import aplicacionModel from './aplicacion.model'
import { asyncHandler } from '../shared/middleware/contollers'
import { handleDataAndResponse } from '../shared/tools/validateDataToResponse'

export const getAplicaciones = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await aplicacionModel.findAll()
    handleDataAndResponse(res, result)
  }
)

export const getAplicacion = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params
    const result = await aplicacionModel.findByUUID(id)
    handleDataAndResponse(res, result)
  }
)

export const createAplicacion = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await aplicacionModel.create(req.body)
    handleDataAndResponse(res, result, 201)
  }
)

export const updateAplicacion = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params
    const result = await aplicacionModel.update(id, req.body)
    handleDataAndResponse(res, result)
  }
)

export const deleteAplicacion = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params
    const result = await aplicacionModel.delete(id)
    handleDataAndResponse(res, result)
  }
)
