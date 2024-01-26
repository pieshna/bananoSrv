import { ModelWithUUID } from '../shared/models/modelWithUUID'

class PrecioModel extends ModelWithUUID {
  constructor() {
    super('precios', 'precio_id')
  }
}

export default new PrecioModel()
