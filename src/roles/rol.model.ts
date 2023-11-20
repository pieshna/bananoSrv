import { ModelWithUUID } from '../shared/models/modelWithUUID'

class RolModel extends ModelWithUUID {
  constructor() {
    super('roles', 'rol_id')
  }
}

export default new RolModel()
