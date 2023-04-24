import request from 'supertest'
import { ICalculoQuantidadeTinta } from '../../../domain/interfaces/parede'
import { CalculaQuantidadeTintaUseCase } from '../../../domain/usecases/calculaQuantidadeTinta-usecase'
import logger from '../../helper/logger'
import { app } from '../../server'
import { PinturaController } from './pintura-controller'

describe('PinturaController', () => {
  it('deve retornar 200 e a quantidade de tinta necessária para as paredes', async () => {
    const response = await request(app)
      .post('/calculaQuantidadeTinta')
      .send([
        { altura: 4.0, largura: 4.0 },
        { altura: 3.0, largura: 3.0 },
        { altura: 3.0, largura: 3.0 },
        { altura: 3.0, largura: 3.0 }
      ])

    const resultadoEsperado: ICalculoQuantidadeTinta = {
      area: 43.0,
      litrosNecessarios: 8.6,
      latasNecessarias: [
        { tamanho: 18, quantidade: 0 },
        { tamanho: 3.6, quantidade: 2 },
        { tamanho: 2.5, quantidade: 0 },
        { tamanho: 0.5, quantidade: 3 }
      ],
    }

    expect(response.status).toBe(200)
    expect(response.body).toEqual(resultadoEsperado)
  })

  it('deve retornar 400 e uma mensagem de corpo da requisição inválido', async () => {
    const response = await request(app)
      .post('/calculaQuantidadeTinta')
      .send([
        { altura: 2.7, largura: 4.0 },
        { altura: 2.7, largura: 4.0 }
      ])

    expect(response.status).toBe(400)
    expect(response.body).toEqual({ error: 'Corpo da requisição inválido' })
  })

  it('Deve retornar status 400 e a mensagem de erro quando ocorrer um erro', () => {
    const requestMock = {
      body: [
        { altura: 2, largura: 4 },
        { altura: 2, largura: 4 },
        { altura: 2, largura: 4 },
        { altura: 2, largura: 4 }
      ]
    } as unknown as Request

    const errorMock = new Error('Erro ao calcular quantidade de tinta')

    jest.spyOn(CalculaQuantidadeTintaUseCase.prototype, 'calculaQuantidade').mockImplementation(() => {
      throw errorMock
    })

    const responseMock = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    } as unknown as Response

    const loggerWarnSpy = jest.spyOn(logger, 'warn')

    const pinturaController = new PinturaController(new CalculaQuantidadeTintaUseCase())

    pinturaController.calculaTinta(requestMock as any, responseMock as any)

    expect(responseMock.status).toHaveBeenCalledWith(400)
    expect(responseMock.json).toHaveBeenCalledWith({ message: errorMock.message })
    expect(loggerWarnSpy).toHaveBeenCalledWith(errorMock)
  })
})
