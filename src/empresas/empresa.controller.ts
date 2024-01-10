import { Request, Response } from 'express'
import { asyncHandler } from '../shared/middleware/contollers'
import { handleDataAndResponse } from '../shared/tools/validateDataToResponse'
import empresaModel from './empresa.model'

export const getEmpresas = asyncHandler(async (req: Request, res: Response) => {
  const result = await empresaModel.findAll()
  handleDataAndResponse(res, result)
})

export const getEmpresa = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await empresaModel.findByUUID(id)
  handleDataAndResponse(res, result)
})

export const createEmpresa = asyncHandler(
  async (req: Request, res: Response) => {
    const { aplicacion_id, dias, precio_quintal } = req.body
    if (isNaN(precio_quintal)) {
      throw new Error('El precio quintal debe ser un numero')
    }
    parseInt(precio_quintal)
    const diasString = dias.toString()
    delete req.body.aplicacion_id
    delete req.body.dias
    delete req.body.precio_quintal
    const result = await empresaModel.create(req.body)
    await empresaModel.createEmpresaDetails(
      result.insertId,
      diasString,
      precio_quintal
    )
    await empresaModel.createEmpresa(aplicacion_id, result.insertId)

    handleDataAndResponse(res, result, 201)
  }
)

export const updateEmpresa = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params
    const { dias, precio_quintal } = req.body
    if (isNaN(precio_quintal)) {
      throw new Error('El precio quintal debe ser un numero')
    }
    parseInt(precio_quintal)
    const diasString = dias.toString()
    delete req.body.dias
    delete req.body.precio_quintal
    await empresaModel.updateEmpresaDetails(id, diasString, precio_quintal)

    const result = await empresaModel.update(id, req.body)
    handleDataAndResponse(res, result)
  }
)

export const deleteEmpresa = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params
    const deleteForeignKey = await empresaModel.deleteEmpresa(id)
    if (deleteForeignKey.affectedRows === 0) {
      throw new Error('No se pudo eliminar la empresa')
    }
    const result = await empresaModel.delete(id)
    handleDataAndResponse(res, result)
  }
)
