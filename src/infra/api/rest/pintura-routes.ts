import express, { Request, Response } from 'express'
import { PinturaController } from './pintura-controller'

const pinturaRouter = express.Router()

const pinturaController = new PinturaController()

pinturaRouter.get('/calculaQuantidadeTinta', (request: Request, response: Response) =>
  pinturaController.calculaQuantidadeTinta(request, response)
)

export { pinturaRouter }
