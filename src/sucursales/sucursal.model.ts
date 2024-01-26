import { ModelWithUUID } from '../shared/models/modelWithUUID'
import { binToUUID, uuidToBin } from '../shared/tools/uuidTools'
class SucursalModel extends ModelWithUUID {
  constructor() {
    super('sucursal', 'sucursal_id')
  }
  async findAll(): Promise<any> {
    const result = await super.findAll()
    result.map((dato: any) => {
      dato.aplicacion_id = binToUUID(dato.aplicacion_id)
    })
    return result
  }

  async findByUUID(id: string): Promise<any> {
    const result = await super.findByUUID(id)
    result[0].aplicacion_id = binToUUID(result[0].aplicacion_id)
    return result
  }

  async create(data: any): Promise<any> {
    data.aplicacion_id = uuidToBin(data.aplicacion_id)
    const result = await super.create(data)
    return result
  }

  async update(id: string, data: any): Promise<any> {
    data.aplicacion_id = uuidToBin(data.aplicacion_id)
    const result = await super.update(id, data)
    return result
  }

  async delete(id: string): Promise<any> {
    const result = await super.delete(id).catch(() => {
      throw new Error(
        'No se puede eliminar la sucursal, ya que tiene datos asociados'
      )
    })
    return result
  }
}

export default new SucursalModel()
