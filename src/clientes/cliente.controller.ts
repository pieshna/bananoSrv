import { Request, Response } from 'express'
import { asyncHandler } from '../shared/middleware/contollers'
import { handleDataAndResponse } from '../shared/tools/validateDataToResponse'
import clienteModel from './cliente.model'
import { binToUUID, uuidToBin } from '../shared/tools/uuidTools'

export const getClientes = asyncHandler(async (req: Request, res: Response) => {
  const result = await clienteModel.findAll()
  result.map((dato: any) => {
    dato.aplicacion_id = binToUUID(dato.aplicacion_id)
  })
  handleDataAndResponse(res, result)
})

export const getCliente = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await clienteModel.findByUUID(id)
  result[0].aplicacion_id = binToUUID(result[0].aplicacion_id)
  handleDataAndResponse(res, result)
})

export const createCliente = asyncHandler(
  async (req: Request, res: Response) => {
    req.body.aplicacion_id = uuidToBin(req.body.aplicacion_id)
    const result = await clienteModel.create(req.body)
    handleDataAndResponse(res, result, 201)
  }
)

export const updateCliente = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params
    req.body.aplicacion_id = uuidToBin(req.body.aplicacion_id)
    const result = await clienteModel.update(id, req.body)
    handleDataAndResponse(res, result)
  }
)

export const deleteCliente = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params
    const result = await clienteModel.delete(id)
    handleDataAndResponse(res, result)
  }
)

export const getClientesPorAplicacion = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params
    const result = await clienteModel.findByField('aplicacion_id', id)
    handleDataAndResponse(res, result)
  }
)
