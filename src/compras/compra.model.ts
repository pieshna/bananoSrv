import { ModelWithUUID } from '../shared/models/modelWithUUID'
import { binToUUID, uuidToBin } from '../shared/tools/uuidTools'

interface Clientes_ComprasInterface {
  cliente_id: string
  compraObj: compra[]
}

interface compra {
  compra_id: string
  pagado: number[]
}

class CompraModel extends ModelWithUUID {
  constructor() {
    super('compras', 'compra_id')
  }

  async findAll() {
    const result = await super.findByQuery('SELECT * FROM compras')
    return result
  }

  async createMany(data: any) {
    const result = await super.createManyUUID(data)
    return result
  }

  async createCompra({ cliente_id, compraObj }: Clientes_ComprasInterface) {
    const data = compraObj.map((compra, index) => {
      const objeto = {
        cliente_id: cliente_id,
        compra_id: compra.compra_id[index],
        pagado: compra.pagado
      }
      return objeto
    })
    const result = await super.createManyUUID(
      data,
      'clientes_compras',
      'cliente_compra_id',
      ['cliente_id', 'compra_id']
    )
    return result
  }
}

export default new CompraModel()
