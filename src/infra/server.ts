import * as dotenv from 'dotenv'
import express, { Request, Response } from 'express'
import logger from './helper/logger'
dotenv.config()

const app = express()
const port = process.env.PORT || 3000

app.get('/', (_request: Request, response: Response) => {
  response.send('hello world')
})

app.listen(port, () => { logger.info(`Server started on port ${port}`) })

