import { Request, Response } from 'express'
import { CalculaQuantidadeTintaUseCase } from '../../../domain/usecases/calculaQuantidadeTinta-usecase'
import logger from '../../helper/logger'

export class PinturaController {
  constructor(private readonly calculaQuantidadeTinta: CalculaQuantidadeTintaUseCase) { }

  calculaTinta(request: Request, response: Response): Response {
    try {
      if (!Array.isArray(request.body) || !request.body.length) {
        return response.status(400).json({ error: 'Invalid request body' })
      }

      const quantidaTinta = this.calculaQuantidadeTinta.calculaQuantidade(request.body)

      logger.info({ req: request, res: response })

      return response.json(quantidaTinta)
    } catch (error: any) {
      logger.warn(error)
      return response.status(400).json({ message: error.message })
    }
  }
}
