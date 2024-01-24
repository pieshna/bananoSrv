import { ModelWithUUID } from '../shared/models/modelWithUUID'

class RolModel extends ModelWithUUID {
  constructor() {
    super('roles', 'rol_id')
  }

  async getRolesWithSuperAdmin() {
    const sql = `
    SELECT
    bin_to_uuid(r.rol_id) as rol_id,
    r.nombre,
    r.created_at,
    r.updated_at
    from roles as r
    where r.nombre != 'SUPERUSUARIO'
    `
    const result = await super.findByQuery(sql)
    return result
  }
}

export default new RolModel()
