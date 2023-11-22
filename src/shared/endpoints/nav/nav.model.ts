import { ModelWithUUID } from '../../models/modelWithUUID'
import { binToUUID } from '../../tools/uuidTools'

class NavModel extends ModelWithUUID {
  constructor() {
    super('navbar', 'navbar_id')
  }

  async findAll() {
    const result = await super.findAll()
    result.map((dato: any) => {
      dato.id = dato.navbar_id
      delete dato.navbar_id
      if (dato.parent_id) dato.parent_id = binToUUID(dato.parent_id)
    })
    return result
  }
  async findAllCustom() {
    const sql = `WITH RECURSIVE NavbarHierarchy AS (
      SELECT
        n.navbar_id AS id,
        n.title,
        n.link,
        n.icon,
        n.parent_id,
        n.created_at,
        n.updated_at,
        NULL AS parent_title
      FROM
        navbar n
      WHERE
        n.parent_id IS NULL
      UNION ALL
      SELECT
        n.navbar_id AS id,
        n.title,
        n.link,
        n.icon,
        n.parent_id,
        n.created_at,
        n.updated_at,
        p.title AS parent_title
      FROM
        NavbarHierarchy nh
      JOIN
        navbar n ON nh.id = n.parent_id
      LEFT JOIN
        navbar p ON nh.parent_id = p.navbar_id
    )
    SELECT
      nh.id,
      nh.title,
      nh.link,
      nh.icon,
      nh.parent_title,
      nh.created_at,
      nh.updated_at
    FROM
      NavbarHierarchy nh;
    `
    const result = await super.findByQuery(sql)
    result.map((dato: any) => {
      dato.id = binToUUID(dato.id)
      delete dato.navbar_id
      if (dato.parent_id) dato.parent_id = binToUUID(dato.parent_id)
    })
    return result
  }

  async findByUUID(uuid: string): Promise<any> {
    const result = await super.findByUUID(uuid)
    result[0].id = result[0].navbar_id
    delete result[0].navbar_id
    if (result[0].parent_id)
      result[0].parent_id = binToUUID(result[0].parent_id)
    console.log(result[0])
    return result
  }
}

export default new NavModel()
