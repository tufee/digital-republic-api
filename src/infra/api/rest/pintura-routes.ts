import express, { Request, Response } from 'express'
import { CalculaQuantidadeTintaUseCase } from '../../../domain/usecases/calculaQuantidadeTinta-usecase'
import { PinturaController } from './pintura-controller'

const pinturaRouter = express.Router()

const calculaQuantidadeTintaUseCase = new CalculaQuantidadeTintaUseCase()
const pinturaController = new PinturaController(calculaQuantidadeTintaUseCase)

pinturaRouter.post('/calculaQuantidadeTinta', (request: Request, response: Response) =>
  pinturaController.calculaTinta(request, response)
)

export { pinturaRouter }
