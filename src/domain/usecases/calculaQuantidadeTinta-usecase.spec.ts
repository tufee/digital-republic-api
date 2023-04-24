import { ICalculoQuantidadeTinta, IParede } from '../interfaces/parede'
import { CalculaQuantidadeTintaUseCase } from './calculaQuantidadeTinta-usecase'

describe('CalculaQuantidadeTintaUseCase', () => {
  const usecase = new CalculaQuantidadeTintaUseCase()
  it('deve retornar a quantidade necessária de tinta para pintar as paredes, sem janelas nem portas', () => {
    const paredes: IParede[] = [
      { altura: 4.0, largura: 4.0, quantidadeJanela: 0, quantidadePorta: 0 },
      { altura: 3.0, largura: 3.0, quantidadeJanela: 0, quantidadePorta: 0 },
      { altura: 3.0, largura: 3.0, quantidadeJanela: 0, quantidadePorta: 0 },
      { altura: 3.0, largura: 3.0, quantidadeJanela: 0, quantidadePorta: 0 },
    ]

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

    const resultado = usecase.calculaQuantidade(paredes)

    expect(resultado).toEqual(resultadoEsperado)
  })

  it('deve retornar a quantidade necessária de tinta para pintar as paredes, com janelas e portas', () => {
    const paredes: IParede[] = [
      { altura: 3.0, largura: 4.0, quantidadeJanela: 1, quantidadePorta: 1 },
      { altura: 3.0, largura: 4.0, quantidadeJanela: 1, quantidadePorta: 0 },
      { altura: 3.0, largura: 4.0, quantidadeJanela: 0, quantidadePorta: 1 },
      { altura: 3.0, largura: 4.0, quantidadeJanela: 1, quantidadePorta: 0 },
    ]

    const resultadoEsperado: ICalculoQuantidadeTinta = {
      area: 37.76,
      litrosNecessarios: 7.552,
      latasNecessarias: [
        { tamanho: 18, quantidade: 0 },
        { tamanho: 3.6, quantidade: 2 },
        { tamanho: 2.5, quantidade: 0 },
        { tamanho: 0.5, quantidade: 1 }
      ]
    }

    const resultado = usecase.calculaQuantidade(paredes)

    expect(resultado).toEqual(resultadoEsperado)
  })

  it('deve lançar um erro caso a área total das janelas e portas seja superior a 50% da área total da parede', () => {
    const paredes: IParede[] = [
      { altura: 3.0, largura: 4.0, quantidadeJanela: 2, quantidadePorta: 2 },
      { altura: 3.0, largura: 4.0, quantidadeJanela: 2, quantidadePorta: 2 },
      { altura: 3.0, largura: 4.0, quantidadeJanela: 2, quantidadePorta: 2 },
      { altura: 3.0, largura: 4.0, quantidadeJanela: 2, quantidadePorta: 2 },
    ]

    expect(() => usecase.calculaQuantidade(paredes)).toThrowError(
      'A área total das portas e janelas não pode ser superior a 50% da área total da parede',
    )
  })

  it('deve lançar um erro caso a altura da parede com porta seja menor que 30cm em relação à altura da porta', () => {
    const paredes: IParede[] = [
      { altura: 2.1, largura: 4, quantidadePorta: 1, quantidadeJanela: 0 },
      { altura: 2.5, largura: 4, quantidadePorta: 0, quantidadeJanela: 2 },
      { altura: 2.5, largura: 4, quantidadePorta: 2, quantidadeJanela: 0 },
      { altura: 2.5, largura: 4, quantidadePorta: 2, quantidadeJanela: 0 },
    ]

    expect(() => usecase.calculaQuantidade(paredes)).toThrow(
      'As paredes que possuem portas devem ser no mínimo 30cm maiores que a altura da porta',
    )
  })
})
