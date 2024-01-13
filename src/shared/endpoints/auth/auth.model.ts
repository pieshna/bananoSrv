import { ModelWithUUID } from '../../models/modelWithUUID'
import { binToUUID, uuidToBin } from '../../tools/uuidTools'

class Auth extends ModelWithUUID {
  constructor() {
    super('usuarios', 'usuario_id')
  }

  async findByFieldOnlyOne(field: string, value: string): Promise<any> {
    const result = await super.findByField(field, value)
    if (result[0]) {
      const userId = result[0].usuario_id
      const rol = await this.findByQuery(
        `SELECT r.nombre as nombre, bin_to_uuid(r.rol_id) as rol_id FROM roles as r left join usuarios_roles as ur
        on r.rol_id = ur.rol_id where bin_to_uuid(ur.usuario_id) = '${userId}'`
      )
      result[0].usuario_id = binToUUID(result[0].usuario_id)
      result[0].rol_id = rol[0].rol_id
      result[0].rol = rol[0].nombre
    }
    return result[0]
  }
}

export default new Auth()
