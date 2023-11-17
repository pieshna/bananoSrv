import { ModelWithUUID } from '../../models/modelWithUUID'
import { binToUUID, uuidToBin } from '../../tools/uuidTools'

class Auth extends ModelWithUUID {
  constructor() {
    super('usuarios', 'usuario_id')
  }

  async findByFieldOnlyOne(field: string, value: string): Promise<any> {
    const result = await super.findByField(field, value)
    if (result[0]?.rol_id) {
      const uuid = binToUUID(result[0].rol_id)
      const rol = await this.findByQuery(
        `SELECT nombre FROM roles WHERE rol_id = uuid_to_bin('${uuid}')`
      )
      result[0].usuario_id = binToUUID(result[0].usuario_id)
      result[0].rol_id = uuid
      result[0].rol = rol[0].nombre
    }
    return result[0]
  }
}

export default new Auth()
