import { ModelWithUUID } from '../shared/models/modelWithUUID'
import { binToUUID } from '../shared/tools/uuidTools'

interface frecuenciaInterface {
  cliente_id: string
  nombre_cliente: string
  frecuencia_compra_max: number
  frecuencia_compra_min: number
}

interface clientesInterface {
  cliente_id: string
  aplicacion_id: string
  nombre: string
  apellido?: any
  telefono?: any
  direccion?: any
  frecuencia_compra_max?: string
  frecuencia_compra_min?: string
  porcentaje: number
  created_at: string
  updated_at: string
}
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

  async findAll(): Promise<any> {
    const datos: clientesInterface[] = await super.findAll()
    const result: frecuenciaInterface[] = await this.getFrecuenciaCompras()
    if (datos) {
      datos.map((dato: clientesInterface) => {
        dato.aplicacion_id = binToUUID(dato.aplicacion_id)
        const frecuencia = result.find(
          (frecuencia) => binToUUID(frecuencia.cliente_id) == dato.cliente_id
        )
        dato.frecuencia_compra_max = frecuencia?.frecuencia_compra_max
          ? frecuencia.frecuencia_compra_max + ' dias'
          : 'no hay datos suficientes'
        dato.frecuencia_compra_min = frecuencia?.frecuencia_compra_min
          ? frecuencia.frecuencia_compra_min + ' dias'
          : 'no hay datos suficientes'
      })
    }

    //ordenar los datos justo como se encuentra en la interfaz
    const datosOrdenados = datos.map((dato) => {
      return {
        cliente_id: dato.cliente_id,
        aplicacion_id: dato.aplicacion_id,
        nombre: dato.nombre,
        apellido: dato.apellido,
        telefono: dato.telefono,
        direccion: dato.direccion,
        frecuencia_compra_max: dato.frecuencia_compra_max,
        porcentaje: dato.porcentaje,
        created_at: dato.created_at,
        updated_at: dato.updated_at
      }
    })

    return datosOrdenados
  }

  async getFrecuenciaCompras() {
    const con = await super.getConnection
    await con.beginTransaction()
    try {
      await super.findByQuery('SET @last_client_id := NULL;')
      await super.findByQuery('SET @last_fecha_compra := NULL;')
      const sql = `
    SELECT 
        cliente_id,
        nombre AS nombre_cliente,
        GREATEST(MAX(diff), 0) AS frecuencia_compra_max,
        GREATEST(MIN(diff), 0) AS frecuencia_compra_min
    FROM (
        SELECT 
            cliente_id,
            nombre,
            fecha_compra,
            DATEDIFF(
                LEAD(fecha_compra) OVER (PARTITION BY cliente_id ORDER BY fecha_compra),
                fecha_compra
            ) AS diff
        FROM (
            SELECT 
                cc.cliente_id,
                cl.nombre,
                c.fecha_compra
            FROM 
                clientes_compras cc
            JOIN compras c ON cc.compra_id = c.compra_id
            JOIN clientes cl ON cc.cliente_id = cl.cliente_id
        ) AS subquery
        WHERE fecha_compra IS NOT NULL
    ) AS diff_query
    GROUP BY 
        cliente_id, nombre;
    `
      const result = await super.findByQuery(sql)
      await con.commit()
      return result
    } catch (error) {
      await con.rollback()
      throw new Error('Error al obtener la frecuencia de compras')
    } finally {
      con.release()
    }
  }
}

export default new ClienteModel()
