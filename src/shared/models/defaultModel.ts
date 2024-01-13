import connection from '../db/connection'
import { addCreatedAt, addUpdatedAt } from '../tools/datesTools'

export class DefaultModel {
  constructor(private readonly table: string) {}

  private async query(sql: string, params?: any[]) {
    try {
      const [rows] = await connection.query(sql, params)
      return JSON.parse(JSON.stringify(rows))
    } catch (e: any) {
      if (e.code === 'PROTOCOL_CONNECTION_LOST') {
        connection.getConnection()
      }
      throw e
    }
  }

  protected async findAll() {
    return this.query(`SELECT * FROM ${this.table}`)
  }

  protected async findById(id: number) {
    return this.query(`SELECT * FROM ${this.table} WHERE id = ?`, [id])
  }

  protected async findByUUID(id: string) {
    return this.query(`SELECT * FROM ${this.table} WHERE id = uuid_to_bin(?)`, [
      id
    ])
  }

  protected async findByUUIDCustom(idName: string, id: string) {
    return this.query(
      `SELECT * FROM ${this.table} WHERE ${idName} = uuid_to_bin(?) `,
      [id]
    )
  }

  protected async create(json: unknown) {
    const data = addCreatedAt(json)
    return this.query(`INSERT INTO ${this.table} SET ?`, [data])
  }

  protected async createMany(data: any[], table = this.table, ids?: string[]) {
    const conCreatedAt = data.map((item) => addCreatedAt(item))
    const values = conCreatedAt.map((item) => Object.values(item))
    const columns = Object.keys(conCreatedAt[0]).join(',')
    const placeholders = Array(conCreatedAt.length)
      .fill(
        `(${values[0]
          .map((valor) => {
            if (ids?.includes(columns.split(',')[values[0].indexOf(valor)])) {
              return 'uuid_to_bin(?)'
            }
            return '?'
          })
          .join(',')})`
      )
      .join(',')
    const sql = `INSERT INTO ${table} (${columns}) VALUES ${placeholders}`
    const flattenedValues = values.reduce((acc, val) => acc.concat(val), [])

    return this.query(sql, flattenedValues)
  }

  protected async updateWithId(id: number, json: unknown) {
    const { ...data } = addUpdatedAt(json)
    return this.query(`UPDATE ${this.table} SET ? WHERE id = ?`, [data, id])
  }

  protected async updateWithUUID(idName: string, uuid: string, json: unknown) {
    const { ...data } = addUpdatedAt(json)
    return this.query(
      `UPDATE ${this.table} SET ? WHERE ${idName} = uuid_to_bin(?)`,
      [data, uuid]
    )
  }

  protected async deleteWithId(id: number) {
    return this.query(`DELETE FROM ${this.table} WHERE id = ?`, [id])
  }

  protected async deleteWithUUID(idName: string, uuid: string) {
    return this.query(
      `DELETE FROM ${this.table} WHERE ${idName} = uuid_to_bin(?)`,
      [uuid]
    )
  }

  protected async deleteAll() {
    return this.query(`DELETE FROM ${this.table}`)
  }

  protected async count() {
    const rows: any = await this.query(
      `SELECT COUNT(*) as counter FROM ${this.table}`
    )
    return rows[0].counter
  }

  protected async countByField(field: string, value: string) {
    const rows: any = await this.query(
      `SELECT COUNT(*) as counter FROM ${this.table} WHERE ${field} = ?`,
      [value]
    )
    return rows[0].counter
  }

  protected async findWithForeignKey(
    tableToJoin: string,
    fields: string[],
    fieldToJoin: string,
    params?: string
  ) {
    const fieldsToSelect = fields.join(', ')
    const sql = `SELECT ${fieldsToSelect} FROM ${this.table} INNER JOIN ${tableToJoin} ON ${this.table}.${fieldToJoin} = ${tableToJoin}.id ${params}`
    return this.query(sql)
  }

  protected async findByFields(fields: string[], values: string[]) {
    const fieldsToSelect = fields.join(', ')
    const sql = `SELECT ${fieldsToSelect} FROM ${this.table} WHERE ${fields[0]} = ? AND ${fields[1]} = ?`
    return this.query(sql, values)
  }

  protected async findByField(field: string, value: string | number) {
    const sql = `SELECT * FROM ${this.table} WHERE ${field} = ?`
    const rows = await this.query(sql, [value])
    return rows
  }

  protected async findByFieldOnlyOne(field: string, value: string | number) {
    const sql = `SELECT * FROM ${this.table} WHERE ${field} = ?`
    const rows = await this.query(sql, [value])
    return rows[0]
  }

  protected async findByFieldIfIsNull(field: string) {
    const sql = `SELECT * FROM ${this.table} WHERE ${field} IS NULL`
    const rows = await this.query(sql)
    return rows
  }

  protected async findByQuery(query: string, params?: any[]) {
    return this.query(query, params)
  }
}
