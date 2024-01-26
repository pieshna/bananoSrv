import { ModelWithUUID } from '../shared/models/modelWithUUID'

class AplicacionModel extends ModelWithUUID {
  constructor() {
    super('aplicacion', 'aplicacion_id')
  }

  async create(json: unknown): Promise<any> {
    const added = await super.create(json)
    await super.findByQuery(
      'insert into precios (precio_quintal_compra,aplicacion_id) values (0,uuid_to_bin(?))',
      added.insertId
    )
    return added
  }
}

export default new AplicacionModel()
