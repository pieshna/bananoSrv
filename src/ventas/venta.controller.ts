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

export const getDataVentasEmpresa = asyncHandler(
  async (req: Request, res: Response) => {
    const { empresa_id } = req.params
    const result = await ventaModel.getDataVentas(empresa_id)
    handleDataAndResponse(res, result)
  }
)

export const getDataVentasEmpresaByDates = asyncHandler(
  async (req: Request, res: Response) => {
    const { empresa_id } = req.params
    const { fecha_inicio, fecha_fin } = req.query
    if (!fecha_inicio || !fecha_fin) {
      throw new Error('Fechas de inicio y fin son requeridas')
    }
    const result = await ventaModel.getDataVentasByDates(
      fecha_inicio as string,
      fecha_fin as string,
      empresa_id
    )
    handleDataAndResponse(res, result)
  }
)

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
