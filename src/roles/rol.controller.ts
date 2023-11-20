import { Request, Response } from 'express'
import rolModel from './rol.model'
import { asyncHandler } from '../shared/middleware/contollers'
import { handleDataAndResponse } from '../shared/tools/validateDataToResponse'

export const getRoles = asyncHandler(async (req: Request, res: Response) => {
  const result = await rolModel.findAll()
  handleDataAndResponse(res, result)
})

export const getRol = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await rolModel.findByUUID(id)
  handleDataAndResponse(res, result)
})

export const createRol = asyncHandler(async (req: Request, res: Response) => {
  const result = await rolModel.create(req.body)
  handleDataAndResponse(res, result, 201)
})

export const updateRol = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await rolModel.update(id, req.body)
  handleDataAndResponse(res, result)
})

export const deleteRol = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await rolModel.delete(id)
  handleDataAndResponse(res, result)
})
