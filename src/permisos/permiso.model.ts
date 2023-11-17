import { ModelWithUUID } from '../shared/models/modelWithUUID'

class PermisoModel extends ModelWithUUID {
  constructor() {
    super('permisos', 'permiso_id')
  }
}

export default new PermisoModel()
