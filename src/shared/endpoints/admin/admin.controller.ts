import { Request, Response } from 'express'
import adminModel from './admin.model'
import { asyncHandler } from '../../middleware/contollers'
import { handleDataAndResponse } from '../../tools/validateDataToResponse'

export const getAdmin = asyncHandler(async (req: Request, res: Response) => {
  const result = await adminModel.findAll()
  handleDataAndResponse(res, result)
})

export const getAdminById = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params
    const result = await adminModel.findByUUID(id)
    handleDataAndResponse(res, result)
  }
)

export const createAdmin = asyncHandler(async (req: Request, res: Response) => {
  const result = await adminModel.create(req.body)
  handleDataAndResponse(res, result, 201)
})

export const updateAdmin = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await adminModel.update(id, req.body)
  handleDataAndResponse(res, result)
})

export const deleteAdmin = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await adminModel.delete(id)
  handleDataAndResponse(res, result)
})
