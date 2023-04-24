import { NextFunction, Request, Response } from 'express'
import Joi from 'joi'

const paredeSchema = Joi.object({
  altura: Joi.number().positive().required(),
  largura: Joi.number().positive().required(),
  quantidadeJanela: Joi.number().integer().min(0).optional(),
  quantidadePorta: Joi.number().integer().min(0).optional()
})

export const validarParedes = (request: Request, response: Response, next: NextFunction) => {
  const { body } = request

  const { error } = Joi.array().items(paredeSchema).validate(body)

  if (error) {
    return response.status(400).json({ error: error.message })
  }

  next()
}

