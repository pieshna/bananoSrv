import { ModelWithUUID } from '../shared/models/modelWithUUID'

class AplicacionModel extends ModelWithUUID {
  constructor() {
    super('aplicacion', 'aplicacion_id')
  }
}

export default new AplicacionModel()
