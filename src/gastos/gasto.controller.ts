import { Request, Response } from 'express'
import { asyncHandler } from '../shared/middleware/contollers'
import { uuidToBin } from '../shared/tools/uuidTools'
import { handleDataAndResponse } from '../shared/tools/validateDataToResponse'
import gastoModel from './gasto.model'

export const getGastos = asyncHandler(async (req: Request, res: Response) => {
  const result = await gastoModel.findAll()
  handleDataAndResponse(res, result)
})

export const getGasto = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await gastoModel.findByUUID(id)
  handleDataAndResponse(res, result)
})

export const countTotalByDay = asyncHandler(
  async (req: Request, res: Response) => {
    const { day } = req.params
    const result = await gastoModel.countTotalByDay(day)
    handleDataAndResponse(res, result)
  }
)

export const createGasto = asyncHandler(async (req: Request, res: Response) => {
  req.body.aplicacion_id = uuidToBin(req.body.aplicacion_id)
  req.body.dias = req.body.dias.toString()
  const result = await gastoModel.create(req.body)
  handleDataAndResponse(res, result, 201)
})

export const updateGasto = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params
  req.body.aplicacion_id = uuidToBin(req.body.aplicacion_id)
  req.body.dias = req.body.dias.toString()
  const result = await gastoModel.update(id, req.body)
  handleDataAndResponse(res, result)
})

export const deleteGasto = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await gastoModel.delete(id)
  handleDataAndResponse(res, result)
})

export const getGastosByDay = asyncHandler(
  async (req: Request, res: Response) => {
    const { day } = req.params
    const result = await gastoModel.findByDay(day)
    handleDataAndResponse(res, result)
  }
)
