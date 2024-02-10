import { Request, Response } from 'express'
import { asyncHandler } from '../shared/middleware/contollers'
import { handleDataAndResponse } from '../shared/tools/validateDataToResponse'
import ventaModel from './venta.model'

export const getVentas = asyncHandler(async (req: Request, res: Response) => {
  const result = await ventaModel.findAll()
  handleDataAndResponse(res, result)
})

export const getVenta = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await ventaModel.findByUUID(id)
  handleDataAndResponse(res, result)
})

export const createVenta = asyncHandler(async (req: Request, res: Response) => {
  const result = await ventaModel.create(req.body)
  handleDataAndResponse(res, result, 201)
})

export const updateVenta = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await ventaModel.update(id, req.body)
  handleDataAndResponse(res, result)
})

export const deleteVenta = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await ventaModel.delete(id)
  handleDataAndResponse(res, result)
})
