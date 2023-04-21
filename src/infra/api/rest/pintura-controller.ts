import { Request, Response } from 'express'

export class PinturaController {
  calculaQuantidadeTinta(request: Request, response: Response): Response {
    return response.json({ message: 'Hello World' })
  }
}

