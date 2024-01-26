import { ModelWithUUID } from '../../models/modelWithUUID'

class AdministracionModel extends ModelWithUUID {
  constructor() {
    super('administracion', 'administracion_id')
  }
}

export default new AdministracionModel()
