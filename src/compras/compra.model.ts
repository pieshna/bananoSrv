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

const getPagado = (total_pagado: number, total: number) => {
  if (total_pagado == total) return 1
  if (total_pagado == 0) return 0
  return 2
}

class CompraModel extends ModelWithUUID {
  constructor() {
    super('compras', 'compra_id')
  }

  async findAll() {
    const sql = `
    SELECT
    bin_to_uuid(c.compra_id) as compra_id,
    c.fecha_compra,
    concat(cl.nombre, ' ',
    coalesce(cl.apellido, '')
    ) as cliente,
    c.cantidad_quintales,
    c.quintales_porcentaje,
    c.precio_quintal,
    c.total,
    c.total_pagado,
    c.created_at,
    c.updated_at
    from compras as c
    left join clientes_compras as cc on c.compra_id = cc.compra_id
    left join clientes as cl on cc.cliente_id = cl.cliente_id
    order by c.created_at desc
    
    `
    const result = await super.findByQuery(sql)
    return result
  }

  async createMany(data: any) {
    const result = await super.createManyUUID(data)
    return result
  }

  async nuevaCompra(array: any, cliente_id: string) {
    const conn = await super.getConnection
    let resultado = null
    await conn.beginTransaction()
    try {
      resultado = await this.createMany(array)
      const compra_id = resultado.insertId

      const compraObj = array.map((compra: any) => {
        return {
          compra_id,
          pagado: getPagado(compra.total_pagado, compra.total)
        }
      })
      await this.createCompra({ cliente_id, compraObj: compraObj })
      conn.commit()
    } catch (error) {
      conn.rollback()
    } finally {
      conn.destroy()
    }
    return resultado
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

  async update(uuid: string, json: any): Promise<any> {
    const result = await super.update(uuid, json)

    const totalPagado = json['total_pagado'] as number
    const total = json['total'] as number
    let dataAddSQL = ''
    let pagado = 0
    if (totalPagado == total) {
      pagado = 1
      dataAddSQL = ', pagado_at = now(), updated_at = now()'
    }
    if (totalPagado == 0) {
      pagado = 0
      dataAddSQL = ', updated_at = now()'
    }
    if (totalPagado > 0 && totalPagado < total) {
      pagado = 2
      dataAddSQL = ', updated_at = now()'
    }

    const sql = `update clientes_compras set pagado = ? ${dataAddSQL} where compra_id = ?`

    await super.findByQuery(sql, [pagado, uuidToBin(uuid)])
    return result
  }

  async delete(compra_id: string) {
    await super.findByQuery(
      'DELETE FROM clientes_compras WHERE compra_id = ?',
      [compra_id]
    )
    const result = await super.delete(compra_id)
    return result
  }
}

export default new CompraModel()
