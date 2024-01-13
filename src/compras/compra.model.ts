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

interface comprasDB {
  compra_id: string
  fecha_compra: string
  cantidad_quintales: number
  quintales_porcentaje: number
  precio_quintal: number
  total_pagado: number
  total: number
  created_at: string
  updated_at: string
}

class CompraModel extends ModelWithUUID {
  constructor() {
    super('compras', 'compra_id')
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

  async findLast30Days() {
    const result = await super.findByQuery(
      `SELECT 
      bin_to_uuid(compra_id) as compra_id,
      fecha_compra,
      cantidad_quintales,
      quintales_porcentaje,
      precio_quintal,
      total_pagado,
      total
       FROM compras WHERE fecha_compra >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
       order by fecha_compra asc
       `
    )
    const compras: comprasDB[] = result

    compras.forEach((compra) => {
      compra.fecha_compra = compra.fecha_compra
        .split('T')[0]
        .split('-')
        .reverse()
        .join('/')
      compra.cantidad_quintales = parseFloat(
        compra.cantidad_quintales.toString()
      )
      compra.quintales_porcentaje = parseFloat(
        compra.quintales_porcentaje.toString()
      )
      compra.total_pagado = parseFloat(compra.total_pagado.toString())
      compra.total = parseFloat(compra.total.toString())
    })

    //group by fecha_compra and sum values
    const comprasGroup = compras.reduce((r: any, a: any) => {
      if (!r[a.fecha_compra]) {
        r[a.fecha_compra] = {
          cantidad_quintales: 0,
          quintales_porcentaje: 0,
          total_pagado: 0,
          total: 0
        }
      }
      r[a.fecha_compra].cantidad_quintales += a.cantidad_quintales
      r[a.fecha_compra].quintales_porcentaje += a.quintales_porcentaje
      r[a.fecha_compra].total_pagado += a.total_pagado
      r[a.fecha_compra].total += a.total
      return r
    }, {})

    const comprasGroupArray = Object.keys(comprasGroup).map((key) => {
      return {
        fecha_compra: key,
        cantidad_quintales: comprasGroup[key].cantidad_quintales,
        quintales_porcentaje: comprasGroup[key].quintales_porcentaje,
        total_pagado: comprasGroup[key].total_pagado,
        total: comprasGroup[key].total
      }
    })

    return comprasGroupArray
  }
}

export default new CompraModel()
