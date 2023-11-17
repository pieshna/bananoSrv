import express from 'express'
import cors from 'cors'
import routes from './routes'
import { envToConst } from './shared/envToConst'

const app = express()
const port = process.env.PORT || 3000

const corsOptions = {
  origin: envToConst.CORS_ALLOWED,
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions))
app.use(express.json())

app.use(routes)

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`)
  console.log('CORS_ALLOWED:', envToConst.CORS_ALLOWED)
})
