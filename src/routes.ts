import express from 'express'
// rutas esenciales en shared folder
import authRoutes from './shared/auth/auth.routes'
import navRoutes from './shared/components/nav/nav.routes'
// Endpoints del proyecto

const router = express.Router()

// Endpoint para probar el servidor
router.get('/', (req, res) => {
  res.json({ message: 'Servidor funcionando correctamente' })
})

// Endpoints de carpeta shared
router.use('/auth', authRoutes)
router.use('/nav', navRoutes)
// Endpoints del proyecto

export default router
