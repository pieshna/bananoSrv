import { Request, Response } from 'express'
import navModel from './nav.model'
import { convertToNavbarStructure } from './utilsnavbar'
import { handleError, handleResponse } from '../../tools/fetchResponses'
import { uuidToBin, validarUUID } from '../../tools/uuidTools'

export const listarNavToNavBar = async (req: Request, res: Response) => {
  try {
    const nav = await navModel.findAll()
    const data = convertToNavbarStructure(nav)
    handleResponse(res, data)
  } catch (error) {
    handleError(res, error)
  }
}

export const listarNav = async (req: Request, res: Response) => {
  try {
    const nav = await navModel.findAll()
    handleResponse(res, nav)
  } catch (error) {
    handleError(res, error)
  }
}

export const obtenerNavSinParentId = async (req: Request, res: Response) => {
  try {
    const nav = await navModel.findByFieldIfIsNull('parent_id')
    handleResponse(res, nav)
  } catch (error) {
    handleError(res, error)
  }
}

export const obtenerNav = async (req: Request, res: Response) => {
  try {
    const id = validarUUID(req)
    const nav = await navModel.findByUUID(id)
    handleResponse(res, nav)
  } catch (error) {
    handleError(res, error)
  }
}

export const obtenerNavCustom = async (req: Request, res: Response) => {
  try {
    const nav = await navModel.findAllCustom()
    handleResponse(res, nav)
  } catch (error) {
    handleError(res, error)
  }
}

export const agregarNav = async (req: Request, res: Response) => {
  try {
    if (req.body.parent_id) {
      req.body.parent_id = uuidToBin(req.body.parent_id)
    }
    const nav = await navModel.create(req.body)
    handleResponse(res, nav)
  } catch (error) {
    handleError(res, error)
  }
}

export const editarNav = async (req: Request, res: Response) => {
  try {
    const id = validarUUID(req)
    if (req.body.parent_id && req.body.parent_id !== '') {
      req.body.parent_id = uuidToBin(req.body.parent_id)
    } else {
      req.body.parent_id = null
    }

    const nav = await navModel.update(id, req.body)
    handleResponse(res, nav)
  } catch (error) {
    handleError(res, error)
  }
}

export const eliminarNav = async (req: Request, res: Response) => {
  try {
    const id = validarUUID(req)
    const nav = await navModel.delete(id)
    handleResponse(res, nav)
  } catch (error) {
    handleError(res, error)
  }
}
