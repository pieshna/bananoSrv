import express from 'express'
import cors from 'cors'
import routes from './routes'
import { envToConst } from './shared/envToConst'
import { errorHandler } from './shared/middleware/error'

const app = express()
const port = process.env.PORT || 3000

const corsOptions = {
  origin: envToConst.CORS_ALLOWED,
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions))
app.use(express.json())

app.use(routes)

//midleware para manejo de errores a nivel de toda la app
app.use(errorHandler)

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`)
  console.log('CORS_ALLOWED:', envToConst.CORS_ALLOWED)
})
