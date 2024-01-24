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
      r.nombre as rol,
      u.created_at,
      u.updated_at 
      FROM usuarios as u
      join aplicacion as a on a.aplicacion_id = u.aplicacion_id
      join usuarios_roles as ur on ur.usuario_id = u.usuario_id
      join roles as r on r.rol_id = ur.rol_id
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
    const sql =
      ' SELECT bin_to_uuid(rol_id) as rol_id FROM usuarios_roles WHERE usuario_id = uuid_to_bin(?)'
    const roles = await super.findByQuery(sql, [result[0].usuario_id])
    result[0].rol_id = roles[0].rol_id
    return result
  }

  async create(data: any) {
    const { password, aplicacion_id } = data
    const hashedPassword = await hashString(password)
    data.password = hashedPassword
    data.aplicacion_id = uuidToBin(aplicacion_id)
    const rol_id = data.rol_id
    delete data.rol_id
    const con = await super.getConnection
    let result
    await con.beginTransaction()
    const sql =
      'INSERT INTO usuarios_roles (usuario_id, rol_id) VALUES (uuid_to_bin(?), uuid_to_bin(?))'
    try {
      result = await super.create(data)
      await con.query(sql, [result.insertId, rol_id])
      await con.commit()
    } catch (error) {
      await con.rollback()
      throw new Error('Error al crear el usuario')
    }
    return result
  }

  async update(id: string, data: any) {
    const { aplicacion_id } = data
    data.aplicacion_id = uuidToBin(aplicacion_id)
    const rol_id = data.rol_id
    delete data.rol_id
    const con = await super.getConnection
    await con.beginTransaction()
    const sql =
      'UPDATE usuarios_roles SET rol_id = uuid_to_bin(?) WHERE usuario_id = uuid_to_bin(?)'
    try {
      const result = await super.update(id, data)
      await con.query(sql, [rol_id, id])
      await con.commit()
      return result
    } catch (error) {
      await con.rollback()
      throw new Error('Error al actualizar el usuario')
    } finally {
      con.release()
    }
  }

  async delete(id: string) {
    const con = await super.getConnection
    await con.beginTransaction()
    const sql = 'DELETE FROM usuarios_roles WHERE usuario_id = uuid_to_bin(?)'
    try {
      await super.findByQuery(sql, [id])
      const result = await super.delete(id)
      await con.commit()
      return result
    } catch (error) {
      await con.rollback()
      throw new Error('Error al eliminar el usuario')
    } finally {
      con.release()
    }
  }
}

export default new UsuarioModel()
