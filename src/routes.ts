import express from 'express'
// rutas esenciales en shared folder
import authRoutes from './shared/endpoints/auth/auth.routes'
import navRoutes from './shared/endpoints/nav/nav.routes'
import connection from './shared/db/connection'
// Endpoints del proyecto
import permisoRoutes from './permisos/permiso.routes'

const router = express.Router()

// Endpoint para probar el servidor
router.get('/', async (req, res) => {
  const conexion = await connection.query('SELECT 1 + 1 AS solution')
  console.log(conexion)
  res.json({ message: 'Servidor funcionando correctamente' })
})

// Endpoints de carpeta shared
router.use('/auth', authRoutes)
router.use('/nav', navRoutes)
// Endpoints del proyecto
router.use('/permisos', permisoRoutes)

export default router
