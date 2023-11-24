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
    const sql = `
    WITH RECURSIVE navbarWithParentTitle AS (
      SELECT
          n.navbar_id,
          n.title,
          n.link,
          n.icon,
          n.parent_id,
          CAST('' AS CHAR(255)) AS parent_title,
          n.created_at,
          n.updated_at
      FROM
          navbar n
      WHERE
          n.parent_id IS NULL
      UNION ALL
      SELECT
          n.navbar_id,
          n.title,
          n.link,
          n.icon,
          n.parent_id,
          nwp.title AS parent_title,
          n.created_at,
          n.updated_at
      FROM
          navbar n
      INNER JOIN navbarWithParentTitle nwp ON
          n.parent_id = nwp.navbar_id
  )
  SELECT BIN_TO_UUID(nwp.navbar_id) AS navbar_id,
      nwp.title,
      nwp.link,
      nwp.icon,
      BIN_TO_UUID(nwp.parent_id) AS parent_id,
      nwp.parent_title,
      nwp.created_at,
      nwp.updated_at
  FROM
      navbarWithParentTitle nwp;
    `
    const result = await super.findByQuery(sql)

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
