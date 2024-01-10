import { ModelWithUUID } from '../shared/models/modelWithUUID'
import { binToUUID, uuidToBin } from '../shared/tools/uuidTools'

const parseDays = (days: string) => {
  const dias = days.split(',')
  const DiasArray = [
    'Lunes',
    'Martes',
    'Miercoles',
    'Jueves',
    'Viernes',
    'Sabado',
    'Domingo'
  ]
  const diasArray: string[] = []
  dias.map((dia: string, index: number) => {
    if (dia === 'true') {
      diasArray.push(DiasArray[index])
    }
  })

  if (diasArray.length > 1) {
    const allButLast = diasArray.slice(0, -1).join(', ')
    const last = diasArray[diasArray.length - 1]
    return `${allButLast} y ${last}`
  } else {
    return diasArray.join(', ')
  }
}
class EmpresaModel extends ModelWithUUID {
  constructor() {
    super('empresas', 'empresa_id')
  }

  async findAll() {
    const sql =
      'select e.empresa_id, e.nombre,e.direccion,e.telefono,ed.dias_venta,ed.precio_quintal from empresas e left join empresas_detalle ed on e.empresa_id = ed.empresa_id'
    const datos = await super.findByQuery(sql)
    if (!datos) {
      throw new Error('No se encontraron datos')
    }

    datos.map((dato: any) => {
      if (dato.empresa_id) dato.empresa_id = binToUUID(dato.empresa_id)
      if (dato.dias_venta) dato.dias_venta = parseDays(dato.dias_venta)
    })

    return datos
  }

  async findByUUID(id: string) {
    const sql =
      'select e.nombre,e.direccion,e.telefono,ed.dias_venta,ed.precio_quintal from empresas e left join empresas_detalle ed on e.empresa_id = ed.empresa_id where e.empresa_id = ?'
    const datos = await super.findByQuery(sql, [uuidToBin(id)])
    if (!datos) {
      throw new Error('No se encontraron datos')
    }

    return datos
  }

  async createEmpresa(aplicacion_id: string, empresa_id: string) {
    const sql =
      'insert into aplicacion_empresa (aplicacion_id, empresa_id) values (?, ?)'
    return super.findByQuery(sql, [
      uuidToBin(aplicacion_id),
      uuidToBin(empresa_id)
    ])
  }

  async createEmpresaDetails(
    empresa_id: string,
    dias: string,
    precio_quintal: number
  ) {
    const sql =
      'insert into empresas_detalle (empresa_id, dias_venta,precio_quintal) values (?, ?, ?)'
    return super.findByQuery(sql, [uuidToBin(empresa_id), dias, precio_quintal])
  }

  async updateEmpresaDetails(
    empresa_id: string,
    dias: string,
    precio_quintal: number
  ) {
    const sql =
      'update empresas_detalle set dias_venta = ?, precio_quintal = ? where empresa_id = ?'
    return super.findByQuery(sql, [dias, precio_quintal, uuidToBin(empresa_id)])
  }

  async deleteEmpresa(empresa_id: string) {
    const sql = 'delete from aplicacion_empresa where empresa_id = ?'
    return super.findByQuery(sql, [uuidToBin(empresa_id)])
  }
}

export default new EmpresaModel()
