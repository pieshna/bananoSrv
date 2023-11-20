import { ModelWithUUID } from '../shared/models/modelWithUUID'

class RolPermisoModel extends ModelWithUUID {
  constructor() {
    super('roles_permisos', 'rol_permiso_id')
  }
}

export default new RolPermisoModel()
