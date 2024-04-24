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

class GastoModel extends ModelWithUUID {
  constructor() {
    super('gastos', 'gasto_id')
  }

  async findAll() {
    const sql = 'select * from gastos'
    const datos = await super.findByQuery(sql)

    if (!datos) {
      throw new Error('No se encontraron datos')
    }

    datos.map((dato: any) => {
      if (dato.gasto_id) dato.gasto_id = binToUUID(dato.gasto_id)
      if (dato.aplicacion_id) dato.aplicacion_id = binToUUID(dato.aplicacion_id)
      if (dato.dias) dato.dias = parseDays(dato.dias)
    })

    return datos
  }

  async findByUUID(id: string) {
    const sql = 'select * from gastos where gasto_id = ?'
    const datos = await super.findByQuery(sql, [uuidToBin(id)])
    if (!datos) {
      throw new Error('No se encontraron datos')
    }

    datos.map((dato: any) => {
      if (dato.gasto_id) dato.gasto_id = binToUUID(dato.gasto_id)
      if (dato.aplicacion_id) dato.aplicacion_id = binToUUID(dato.aplicacion_id)
      //if (dato.dias) dato.dias = parseDays(dato.dias)
    })

    return datos
  }

  async findByDay(day: string) {
    const sql = 'select * from gastos where dias like ?'
    const datos = await super.findByQuery(sql, [`%${day}%`])
    if (!datos) {
      throw new Error('No se encontraron datos')
    }
    return datos
  }

  async countTotalByDay(fecha: string) {
    const datos = await super.findByQuery('select * from gastos')
    if (!datos) {
      throw new Error('No se encontraron datos')
    }
    let total = 0

    const dayOfWeek = new Date(fecha).getDay()

    datos.map((dato: any) => {
      dato.dias = dato.dias.split(',')
      if (
        dato.dias[dayOfWeek] === 'true' ||
        dato.dias[(dayOfWeek - 1) % 7] === 'true' ||
        dato.dias[(dayOfWeek - 2) % 7] === 'true'
      ) {
        total += parseFloat(dato.monto)
      }
    })
    return total
  }
}

export default new GastoModel()
