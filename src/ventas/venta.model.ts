import { ModelWithUUID } from '../shared/models/modelWithUUID'
import { binToUUID } from '../shared/tools/uuidTools'

class VentaModel extends ModelWithUUID {
  constructor() {
    super('ventas', 'venta_id')
  }

  async findAll(): Promise<any> {
    const sql = `
      SELECT 
        bin_to_uuid(v.venta_id) as venta_id,
        v.fecha_venta,
        bin_to_uuid(e.empresa_id) as empresa_id,
        e.nombre as empresa,
        v.cantidad_quintales,
        v.precio_quintal,
        v.total,
        v.created_at,
        v.updated_at
      FROM ventas as v
        LEFT JOIN empresas_ventas as ev ON v.venta_id = ev.venta_id
        LEFT JOIN empresas as e ON ev.empresa_id = e.empresa_id
        ORDER BY v.created_at DESC
      `
    return await super.findByQuery(sql)
  }

  async findByUUID(uuid: string): Promise<any> {
    const sql = `
          SELECT 
            bin_to_uuid(v.venta_id) as venta_id,
            v.fecha_venta,
            bin_to_uuid(e.empresa_id) as empresa_id,
            e.nombre as empresa,
            v.cantidad_quintales,
            v.precio_quintal,
            v.total
          FROM ventas as v
            LEFT JOIN empresas_ventas as ev ON v.venta_id = ev.venta_id
            LEFT JOIN empresas as e ON ev.empresa_id = e.empresa_id
          WHERE v.venta_id = uuid_to_bin(?)
          `
    return await super.findByQuery(sql, [uuid])
  }

  async create(json: any): Promise<any> {
    const conn = await super.getConnection
    await conn.beginTransaction()
    try {
      const { empresa_id } = json
      delete json.empresa_id
      const result = await super.create(json)
      const sql =
        'INSERT INTO empresas_ventas (empresa_id, venta_id) VALUES (uuid_to_bin(?), uuid_to_bin(?))'
      await super.findByQuery(sql, [empresa_id, result.insertId])
      await conn.commit()
      return result
    } catch (error) {
      await conn.rollback()
      throw new Error('Error al crear la venta')
    }
  }

  async update(uuid: string, json: any): Promise<any> {
    const conn = await super.getConnection
    await conn.beginTransaction()
    try {
      const { empresa_id } = json
      delete json.empresa_id
      const result = await super.update(uuid, json)
      const sql =
        'UPDATE empresas_ventas SET empresa_id = uuid_to_bin(?), updated_at = now() WHERE venta_id = uuid_to_bin(?)'
      await super.findByQuery(sql, [empresa_id, uuid])
      await conn.commit()
      return result
    } catch (error) {
      await conn.rollback()
      throw new Error('Error al actualizar la venta')
    }
  }

  async delete(uuid: string): Promise<any> {
    const conn = await super.getConnection
    await conn.beginTransaction()
    try {
      const sql = 'DELETE FROM empresas_ventas WHERE venta_id = uuid_to_bin(?)'
      await super.findByQuery(sql, [uuid])
      const result = await super.delete(uuid)
      await conn.commit()
      return result
    } catch (error) {
      await conn.rollback()
      throw new Error('Error al eliminar la venta')
    }
  }

  async getDataVentas(uuid: string) {
    const sql = `
    select sum(v.cantidad_quintales) as total_quintales
    from ventas as v
    left join empresas_ventas as ev on v.venta_id = ev.venta_id
    where empresa_id = uuid_to_bin(?)
    `
    const quintales = await super.findByQuery(sql, [uuid])

    const sql2 = `
    select v.*, e.nombre from ventas as v
    left join empresas_ventas as ev on v.venta_id = ev.venta_id
    left join empresas as e on ev.empresa_id = e.empresa_id
    where e.empresa_id = uuid_to_bin(?)
    `
    const ventas = await super.findByQuery(sql2, [uuid])

    ventas.map((venta: any) => {
      venta.venta_id = binToUUID(venta.venta_id)
    })

    return [
      {
        quintales,
        ventas,
        total_ventas: ventas.length,
        empresa: ventas[0].nombre
      }
    ]
  }

  async getDataVentasByDates(
    fechaInicio: string,
    fechaFin: string,
    empresa_id: string
  ) {
    const sql = `
      select sum(v.cantidad_quintales) as total_quintales
      from ventas as v
      left join empresas_ventas as ev on v.venta_id = ev.venta_id
      where empresa_id = uuid_to_bin(?)
      and v.fecha_venta between ? and ?
      `
    const quintales = await super.findByQuery(sql, [
      empresa_id,
      fechaInicio,
      fechaFin
    ])

    const sql2 = `
      select v.*,e.nombre from ventas as v
      left join empresas_ventas as ev on v.venta_id = ev.venta_id
      left join empresas as e on ev.empresa_id = e.empresa_id
      where e.empresa_id = uuid_to_bin(?)
      and v.fecha_venta between ? and ?
      `
    const ventas = await super.findByQuery(sql2, [
      empresa_id,
      fechaInicio,
      fechaFin
    ])

    ventas.map((venta: any) => {
      venta.venta_id = binToUUID(venta.venta_id)
    })

    return [{ quintales, ventas, totalVentas: ventas.length }]
  }
}

export default new VentaModel()
