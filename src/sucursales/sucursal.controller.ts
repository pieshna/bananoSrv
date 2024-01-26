import { Request, Response } from 'express'
import { asyncHandler } from '../shared/middleware/contollers'
import { handleDataAndResponse } from '../shared/tools/validateDataToResponse'
import sucursalModel from './sucursal.model'
import { binToUUID, uuidToBin } from '../shared/tools/uuidTools'

export const getSucursales = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await sucursalModel.findAll()
    handleDataAndResponse(res, result)
  }
)

export const getSucursal = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await sucursalModel.findByUUID(id)
  handleDataAndResponse(res, result)
})

export const createSucursal = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await sucursalModel.create(req.body)
    handleDataAndResponse(res, result, 201)
  }
)

export const updateSucursal = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params
    const result = await sucursalModel.update(id, req.body)
    handleDataAndResponse(res, result)
  }
)

export const deleteSucursal = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params
    const result = await sucursalModel.delete(id)
    handleDataAndResponse(res, result)
  }
)
