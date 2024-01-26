import { ModelWithUUID } from '../shared/models/modelWithUUID'
import { binToUUID } from '../shared/tools/uuidTools'

class UsuarioRolSchema extends ModelWithUUID {
  constructor() {
    super('usuarios_roles', 'usuario_rol_id')
  }

  async findAll(): Promise<any> {
    const query = `SELECT ur.usuario_rol_id, u.usuario_id, concat(u.nombre, ' ', u.apellido) as usuario_nombre, r.rol_id, r.nombre as rol_nombre
    FROM usuarios_roles as ur 
    INNER JOIN usuarios as u ON ur.usuario_id = u.usuario_id 
    INNER JOIN roles as r ON ur.rol_id = r.rol_id`
    const result = await super.findByQuery(query)
    result.map((item: any) => {
      item.usuario_rol_id = binToUUID(item.usuario_rol_id)
      item.usuario_id = binToUUID(item.usuario_id)
      item.rol_id = binToUUID(item.rol_id)
    })
    return result
  }
}

export default new UsuarioRolSchema()
