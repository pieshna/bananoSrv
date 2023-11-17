import { DefaultModel } from '../../models/defaultModel'

class Administracion extends DefaultModel {
  constructor() {
    super('administracion')
  }

  getTiempoToken() {
    // eslint-disable-next-line quotes
    const sql = "SELECT tiempo FROM administracion WHERE nombre like '%sesion%'"
    const datos = this.findByQuery(sql).then((res) => {
      return res[0].tiempo
    })
    return datos
  }
}

export default new Administracion()
