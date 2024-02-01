import { Request, Response } from 'express'
import { asyncHandler } from '../shared/middleware/contollers'
import { handleDataAndResponse } from '../shared/tools/validateDataToResponse'
import compraModel from './compra.model'

export const getCompras = asyncHandler(async (req: Request, res: Response) => {
  const result = await compraModel.findAll()
  handleDataAndResponse(res, result)
})

export const getCompra = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await compraModel.findByUUID(id)
  handleDataAndResponse(res, result)
})

export const getQuintalesByDays = asyncHandler(
  async (req: Request, res: Response) => {
    const { days } = req.params
    const result = await compraModel.getTotalQuintalesByLastestDays(
      parseInt(days)
    )
    handleDataAndResponse(res, result)
  }
)

export const getCompraByDates = asyncHandler(
  async (req: Request, res: Response) => {
    const { fechaInicio, fechaFinal } = req.body
    const result = await compraModel.findComprasByDates(fechaInicio, fechaFinal)
    handleDataAndResponse(res, result)
  }
)

export const createCompra = asyncHandler(
  async (req: Request, res: Response) => {
    const array = req.body
    if (array.length == 0) {
      throw new Error('Debe enviar al menos una compra')
    }
    const cliente_id = array[0].cliente_id
    if (array.length > 0) {
      array.forEach((compra: any) => {
        delete compra.cliente_id
      })
      const resultado = await compraModel.nuevaCompra(array, cliente_id)
      handleDataAndResponse(res, resultado, 201)
    }
  }
)

export const updateCompra = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params
    const result = await compraModel.update(id, req.body[0])
    handleDataAndResponse(res, result)
  }
)

export const deleteCompra = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params
    const result = await compraModel.delete(id)
    handleDataAndResponse(res, result)
  }
)
