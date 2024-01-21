import { hashString } from '../shared/components/auth/encriptar'
import { ModelWithUUID } from '../shared/models/modelWithUUID'
import { binToUUID, uuidToBin } from '../shared/tools/uuidTools'

class UsuarioModel extends ModelWithUUID {
  constructor() {
    super('usuarios', 'usuario_id')
  }

  async findAll() {
    const result = await super.findByQuery(
      `SELECT 
      u.usuario_id,
      a.nombre as aplicacion,
      u.nombre,
      u.apellido,
      u.email,
      u.username,
      u.created_at,
      u.updated_at 
      FROM usuarios as u
      join aplicacion as a on a.aplicacion_id = u.aplicacion_id
      `
    )
    if (!result) return result
    result.map((usuario: any) => {
      usuario.usuario_id = binToUUID(usuario.usuario_id)
      delete usuario.password
    })
    return result
  }

  async findByAplicacion(id: string) {
    const result = await super.findByQuery(
      `SELECT 
      u.usuario_id,
      a.nombre as aplicacion,
      u.nombre,
      u.apellido,
      u.email,
      u.username,
      u.created_at,
      u.updated_at 
      FROM usuarios as u
      join aplicacion as a on a.aplicacion_id = u.aplicacion_id
      where u.aplicacion_id = ?
      `,
      [uuidToBin(id)]
    )
    if (!result) return result
    result.map((usuario: any) => {
      usuario.usuario_id = binToUUID(usuario.usuario_id)
      delete usuario.password
    })
    return result
  }

  async findByUUID(id: string) {
    const result = await super.findByUUID(id)
    if (!result[0]) return result
    result[0].aplicacion_id = binToUUID(result[0].aplicacion_id)
    delete result[0].password
    return result
  }

  async create(data: any) {
    const { password, aplicacion_id } = data
    const hashedPassword = await hashString(password)
    data.password = hashedPassword
    data.aplicacion_id = uuidToBin(aplicacion_id)

    const result = await super.create(data)
    return result
  }

  async update(id: string, data: any) {
    const { aplicacion_id } = data
    data.aplicacion_id = uuidToBin(aplicacion_id)
    const result = await super.update(id, data)
    return result
  }
}

export default new UsuarioModel()
