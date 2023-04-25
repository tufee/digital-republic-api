import cors from 'cors'
import * as dotenv from 'dotenv'
import express from 'express'
import swaggerJsDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import { pinturaRouter } from './api/rest/pintura-routes'
import logger from './helper/logger'
import { swaggerDoc, swaggerOptions } from './helper/swaggerOptions'
dotenv.config()

const app = express()
const port = process.env.PORT || 3000
const specs = swaggerJsDoc(swaggerOptions)

app.use(express.json())
app.use(cors())
app.use(pinturaRouter)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc, specs))

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => logger.info(`Server started on port ${port}`))
}

export { app }

