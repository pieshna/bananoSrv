import express from 'express'
// rutas esenciales en shared folder
import authRoutes from './shared/endpoints/auth/auth.routes'
import navRoutes from './shared/endpoints/nav/nav.routes'
import adminRoutes from './shared/endpoints/admin/admin.routes'
import { authMiddleware } from './shared/middleware/auth'
// Endpoints del proyecto
import permisoRoutes from './permisos/permiso.routes'
import rolRoutes from './roles/rol.routes'
import rol_permisoRoutes from './roles_permisos/rol_permiso.routes'
import aplicacionRoutes from './aplicaciones/aplicacion.routes'
import usuariosRoutes from './usuarios/usuario.routes'
import clientesRoutes from './clientes/cliente.routes'
import usuario_rolRoutes from './usuarios_roles/usuario_rol.routes'
import comprasRoutes from './compras/compra.routes'
import empresasRoutes from './empresas/empresa.routes'
import precioRoutes from './precios/precio.routes'
import sucursalRoutes from './sucursales/sucursal.routes'

const router = express.Router()

// Endpoint para probar el servidor
router.get('/', async (req, res) => {
  res.json({ message: 'Servidor funcionando correctamente' })
})

// Endponts para la autenticacion (dentro lleva authMiddleware)
router.use('/auth', authRoutes)
// Midlweware para validar que el usuario este autenticado
router.use(authMiddleware)

// Endpoints de carpeta shared
router.use('/nav', navRoutes)
router.use('/administracion', adminRoutes)
// Endpoints del proyecto
router.use('/aplicaciones', aplicacionRoutes)
router.use('/permisos', permisoRoutes)
router.use('/roles', rolRoutes)
router.use('/roles-permisos', rol_permisoRoutes)
router.use('/usuarios', usuariosRoutes)
router.use('/clientes', clientesRoutes)
router.use('/usuarios-roles', usuario_rolRoutes)
router.use('/compras', comprasRoutes)
router.use('/empresas', empresasRoutes)
router.use('/precios', precioRoutes)
router.use('/sucursales', sucursalRoutes)

export default router
