import request from 'supertest'
import { app } from '../../../server'

describe('POST /calculaQuantidadeTinta', () => {
  it('Deve receber um payload válido sem portas e janelas', async () => {
    const paredes = [
      { altura: 3, largura: 4 },
      { altura: 3, largura: 3 },
      { altura: 2.5, largura: 2.5 },
      { altura: 2, largura: 4 }
    ]

    const response = await request(app)
      .post('/calculaQuantidadeTinta')
      .send(paredes)

    expect(response.status).toBe(200)
    expect(response.body.litrosNecessarios).toBeGreaterThan(0)
  })

  it('Deve receber um payload válido com portas e janelas', async () => {
    const paredes = [
      { altura: 3, largura: 4, quantidadeJanela: 1, quantidadePorta: 1 },
      { altura: 3, largura: 3, quantidadeJanela: 1, quantidadePorta: 1 },
      { altura: 3, largura: 3, quantidadeJanela: 1, quantidadePorta: 1 },
      { altura: 2, largura: 4, quantidadeJanela: 1, quantidadePorta: 0 },
    ]

    const response = await request(app)
      .post('/calculaQuantidadeTinta')
      .send(paredes)

    expect(response.status).toBe(200)
    expect(response.body.litrosNecessarios).toBeGreaterThan(0)
  })

  it('Deve retornar um erro caso a altura seja igual ou menor que 0', async () => {
    const paredes = [
      { altura: 0, largura: 4, quantidadeJanela: 1, quantidadePorta: 1 },
      { altura: 3, largura: 3, quantidadeJanela: 0, quantidadePorta: 1 },
      { altura: 2.5, largura: 2.5, quantidadeJanela: 1, quantidadePorta: 0 },
      { altura: 2, largura: 4, quantidadeJanela: 0, quantidadePorta: 0 },
    ]

    const response = await request(app)
      .post('/calculaQuantidadeTinta')
      .send(paredes)

    expect(response.status).toBe(400)
    expect(response.body.error).toBe('"[0].altura" must be a positive number')
  })

  it('Deve retornar um erro caso a largura seja igual ou menor que 0', async () => {
    const paredes = [
      { altura: 3, largura: 0, quantidadeJanela: 1, quantidadePorta: 1 },
      { altura: 3, largura: 3, quantidadeJanela: 0, quantidadePorta: 1 },
      { altura: 2.5, largura: 2.5, quantidadeJanela: 1, quantidadePorta: 0 },
      { altura: 2, largura: 4, quantidadeJanela: 0, quantidadePorta: 0 },
    ]

    const response = await request(app)
      .post('/calculaQuantidadeTinta')
      .send(paredes)

    expect(response.status).toBe(400)
    expect(response.body.error).toBe('"[0].largura" must be a positive number')
  })

  it('Deve retornar um erro caso a quantidadeJanela seja menor que 0', async () => {
    const paredes = [
      { altura: 3, largura: 3, quantidadeJanela: -1, quantidadePorta: 1 },
      { altura: 3, largura: 3, quantidadeJanela: 0, quantidadePorta: 1 },
      { altura: 2.5, largura: 2.5, quantidadeJanela: 1, quantidadePorta: 0 },
      { altura: 2, largura: 4, quantidadeJanela: 0, quantidadePorta: 0 },
    ]

    const response = await request(app)
      .post('/calculaQuantidadeTinta')
      .send(paredes)

    expect(response.status).toBe(400)
    expect(response.body.error).toBe('"[0].quantidadeJanela" must be greater than or equal to 0')
  })

  it('Deve retornar um erro caso a quantidadePorta seja menor que 0', async () => {
    const paredes = [
      { altura: 3, largura: 3, quantidadeJanela: 0, quantidadePorta: -1 },
      { altura: 3, largura: 3, quantidadeJanela: 0, quantidadePorta: 1 },
      { altura: 2.5, largura: 2.5, quantidadeJanela: 1, quantidadePorta: 0 },
      { altura: 2, largura: 4, quantidadeJanela: 0, quantidadePorta: 0 },
    ]

    const response = await request(app)
      .post('/calculaQuantidadeTinta')
      .send(paredes)

    expect(response.status).toBe(400)
    expect(response.body.error).toBe('"[0].quantidadePorta" must be greater than or equal to 0')
  })
})

