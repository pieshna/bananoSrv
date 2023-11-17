import mysql from 'mysql2/promise'
import { envToConst } from '../envToConst'

const connection = mysql.createPool({
  host: envToConst.DB_HOST,
  port: parseInt(envToConst.DB_PORT),
  user: envToConst.DB_USER,
  password: envToConst.DB_PASSWORD,
  database: envToConst.DB_NAME,
  waitForConnections: true,
  connectionLimit: 50,
  queueLimit: 0
})

export default connection
