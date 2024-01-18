import { Request, Response } from 'express'
import precioModel from './precio.model'
import { asyncHandler } from '../shared/middleware/contollers'
import { handleDataAndResponse } from '../shared/tools/validateDataToResponse'
import { binToUUID, uuidToBin } from '../shared/tools/uuidTools'

export const getPrecios = asyncHandler(async (req: Request, res: Response) => {
  const result = await precioModel.findAll()
  handleDataAndResponse(res, result)
})

export const getPrecio = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await precioModel.findByUUID(id)
  handleDataAndResponse(res, result)
})

export const getPrecioByAplicacion = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params
    const result = await precioModel.findByFieldOnlyOne(
      'aplicacion_id',
      uuidToBin(id)
    )
    result.aplicacion_id = binToUUID(result.aplicacion_id)
    handleDataAndResponse(res, result)
  }
)

export const createPrecio = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await precioModel.create(req.body)
    handleDataAndResponse(res, result, 201)
  }
)

export const updatePrecio = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params
    const result = await precioModel.update(id, req.body)
    handleDataAndResponse(res, result)
  }
)

export const deletePrecio = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params
    const result = await precioModel.delete(id)
    handleDataAndResponse(res, result)
  }
)
