import { ModelWithUUID } from '../shared/models/modelWithUUID'
import { binToUUID, uuidToBin } from '../shared/tools/uuidTools'

class RolPermisoModel extends ModelWithUUID {
  constructor() {
    super('roles_permisos', 'rol_permiso_id')
  }

  async findAll() {
    const query = `SELECT pr.rol_permiso_id, r.rol_id, r.nombre as rol_nombre, p.permiso_id, p.nombre as permiso_nombre
    FROM roles_permisos as pr 
    INNER JOIN roles as r ON pr.rol_id = r.rol_id 
    INNER JOIN permisos as p ON pr.permiso_id = p.permiso_id`
    const result = await super.findByQuery(query)
    result.map((item: any) => {
      item.rol_permiso_id = binToUUID(item.rol_permiso_id)
      item.rol_id = binToUUID(item.rol_id)
      item.permiso_id = binToUUID(item.permiso_id)
    })
    return result
  }
  async findByUUID(uuid: string) {
    const result = await super.findByUUID(uuid)
    result[0].rol_permiso_id = binToUUID(result[0].rol_permiso_id)
    result[0].rol_id = binToUUID(result[0].rol_id)
    result[0].permiso_id = binToUUID(result[0].permiso_id)
    return result
  }

  async create(data: any) {
    const { rol_id, permiso_id } = data
    data.rol_id = uuidToBin(rol_id)
    data.permiso_id = uuidToBin(permiso_id)
    const result = await super.create(data)
    return result
  }
}

export default new RolPermisoModel()
