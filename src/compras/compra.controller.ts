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

const getPagado = (total_pagado: number, total: number) => {
  if (total_pagado == total) return 1
  if (total_pagado == 0) return 0
  return 2
}

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
      const resultado = await compraModel.createMany(array)
      const compra_id = resultado.insertId

      const compraObj = array.map((compra: any) => {
        return {
          compra_id,
          pagado: getPagado(compra.total_pagado, compra.total)
        }
      })
      await compraModel.createCompra({ cliente_id, compraObj: compraObj })
      handleDataAndResponse(res, resultado, 201)
    }
  }
)
