import { ModelWithUUID } from '../shared/models/modelWithUUID'
import { binToUUID } from '../shared/tools/uuidTools'

class ClienteModel extends ModelWithUUID {
  constructor() {
    super('clientes', 'cliente_id')
  }

  async findByField(field: string, value: string): Promise<any> {
    const datos = await super.findByField(field, value)
    if (datos) {
      datos.map((dato: any) => {
        dato.cliente_id = binToUUID(dato.cliente_id)
      })
    }
    return datos
  }
}

export default new ClienteModel()
