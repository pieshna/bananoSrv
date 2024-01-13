import { addUUID, binToUUID } from '../tools/uuidTools'
import { DefaultModel } from './defaultModel'

export class ModelWithUUID extends DefaultModel {
  constructor(
    private readonly parentTable: string,
    private readonly idName: string
  ) {
    super(parentTable)
  }

  async findByUUID(uuid: string) {
    const datos = await this.findByUUIDCustom(this.idName, uuid)
    if (datos) {
      datos.map((dato: any) => {
        dato[this.idName] = binToUUID(dato[this.idName])
      })
    }
    return datos
  }

  async findAll() {
    const datos = await super.findAll()
    if (datos) {
      datos.map((dato: any) => {
        dato[this.idName] = binToUUID(dato[this.idName])
      })
    }
    return datos
  }

  async create(json: unknown) {
    const addedUUID = await addUUID(json, this.idName)
    const added = await super.create(addedUUID)
    added.insertId = binToUUID(addedUUID[this.idName])
    return added
  }

  async createManyUUID(
    data: any[],
    table = this.parentTable,
    idName = this.idName,
    ids?: string[]
  ) {
    data.map((item) => addUUID(item, idName))
    const added = await super.createMany(data, table, ids)
    const insertedIds = data.map((item) => item[this.idName])
    added.insertId = insertedIds.map((id) => binToUUID(id))
    return added
  }

  async update(uuid: string, json: unknown) {
    return this.updateWithUUID(this.idName, uuid, json)
  }

  async delete(uuid: string) {
    return super.deleteWithUUID(this.idName, uuid)
  }

  async findByField(field: string, value: string) {
    const datos = await super.findByField(field, value)
    if (datos) {
      datos.map((dato: any) => {
        dato[this.idName] = binToUUID(dato[this.idName])
      })
    }
    return datos
  }

  async findByFieldOnlyOne(field: string, value: string) {
    const datos = await super.findByFieldOnlyOne(field, value)
    if (datos) {
      datos[this.idName] = binToUUID(datos[this.idName])
    }
    return datos
  }

  async findByFieldIfIsNull(field: string) {
    const datos = await super.findByFieldIfIsNull(field)
    if (datos) {
      datos.map((dato: any) => {
        dato[this.idName] = binToUUID(dato[this.idName])
      })
    }
    return datos
  }
}
