import { ParedeEnum } from '../enums/parede-enum'
import { IParede } from '../interfaces/parede'
import { Parede } from './parede'

describe('Parede', () => {
  describe('calculaAreaParede', () => {
    it('deve calcular a área correta da parede', () => {
      expect(Parede.calculaAreaParede(2, 4)).toBe(8)
      expect(Parede.calculaAreaParede(3, 5)).toBe(15)
      expect(Parede.calculaAreaParede(4, 4)).toBe(16)
    })

    it('deve lançar um erro se a área total da parede for menor que 1m²', () => {
      expect(() => Parede.calculaAreaParede(0.4, 2)).toThrowError(
        'A área total da parede deve estar entre 1 e 50m², área atual (0.8m²).'
      )
    })

    it('deve lançar um erro se a área total da parede for maior que 50m²', () => {
      expect(() => Parede.calculaAreaParede(10, 10)).toThrowError(
        'A área total da parede deve estar entre 1 e 50m², área atual (100m²).'
      )
    })
  })

  describe('calcularAreaTotalParedes', () => {
    it('deve calcular corretamente a área total das paredes', () => {
      const paredes: IParede[] = [
        { altura: 3, largura: 5 },
        { altura: 3, largura: 4 },
        { altura: 3, largura: 6 },
        { altura: 3, largura: 3 }
      ]

      const areaTotalEsperada = 54

      expect(Parede.calculaAreaTotalParedes(paredes)).toEqual(areaTotalEsperada)
    })
  })

  describe('calculaAreaJanela', () => {
    it('deve calcular a área correta da janela', () => {
      const quantidadeJanela = 3
      const areaJanela = ParedeEnum.ALTURA_JANELA * ParedeEnum.LARGURA_JANELA
      const areaTotalJanela = quantidadeJanela * areaJanela

      expect(Parede.calculaAreaJanela(quantidadeJanela)).toEqual(areaTotalJanela)
    })
  })

  describe('calculaAreaTotalJanelas', () => {
    it('deve retornar 0 quando não houver janelas em nenhuma parede', () => {
      const paredes: IParede[] = [
        { altura: 3, largura: 5, quantidadeJanela: 0 },
        { altura: 3, largura: 4, quantidadeJanela: 0 },
        { altura: 3, largura: 6, quantidadeJanela: 0 },
        { altura: 3, largura: 3, quantidadeJanela: 0 }
      ]

      const areaTotalEsperada = ParedeEnum.ALTURA_JANELA * ParedeEnum.LARGURA_JANELA * 0

      expect(Parede.calcularAreaTotalJanelas(paredes)).toBe(areaTotalEsperada)
    })

    it('deve calcular corretamente a área total de janelas quando houver janelas em todas as paredes', () => {
      const paredes: IParede[] = [
        { altura: 3, largura: 5, quantidadeJanela: 2 },
        { altura: 3, largura: 4, quantidadeJanela: 2 },
        { altura: 3, largura: 6, quantidadeJanela: 2 },
        { altura: 3, largura: 3, quantidadeJanela: 2 }
      ]

      const areaTotalEsperada = ParedeEnum.ALTURA_JANELA * ParedeEnum.LARGURA_JANELA * 8

      expect(Parede.calcularAreaTotalJanelas(paredes)).toEqual(areaTotalEsperada)
    })

    it('deve calcular corretamente a área total de janelas quando houver janelas em algumas paredes', () => {
      const paredes: IParede[] = [
        { altura: 3, largura: 5, quantidadeJanela: 2 },
        { altura: 3, largura: 4, quantidadeJanela: 0 },
        { altura: 3, largura: 6, quantidadeJanela: 1 },
        { altura: 3, largura: 3, quantidadeJanela: 3 }
      ]

      const areaTotalEsperada = ParedeEnum.ALTURA_JANELA * ParedeEnum.LARGURA_JANELA * 6

      expect(Parede.calcularAreaTotalJanelas(paredes)).toBeCloseTo(areaTotalEsperada)
    })
  })

  describe('calculaAreaPorta', () => {
    it('deve calcular a área correta da porta', () => {
      const quantidadePorta = 3
      const areaPorta = ParedeEnum.ALTURA_PORTA * ParedeEnum.LARGURA_PORTA
      const areaTotalPorta = quantidadePorta * areaPorta

      expect(Parede.calculaAreaPorta(quantidadePorta)).toEqual(areaTotalPorta)
    })
  })

  describe('calculaAreaTotalPortas', () => {
    it('deve retornar 0 quando não houver portas em nenhuma parede', () => {
      const paredes: IParede[] = [
        { altura: 3, largura: 5, quantidadePorta: 0 },
        { altura: 3, largura: 4, quantidadePorta: 0 },
        { altura: 3, largura: 6, quantidadePorta: 0 },
        { altura: 3, largura: 3, quantidadePorta: 0 }
      ]

      const areaTotalEsperada = ParedeEnum.ALTURA_PORTA * ParedeEnum.LARGURA_PORTA * 0

      expect(Parede.calcularAreaTotalPortas(paredes)).toBe(areaTotalEsperada)
    })

    it('deve calcular corretamente a área total de portas quando houver portas em todas as paredes', () => {
      const paredes: IParede[] = [
        { altura: 3, largura: 5, quantidadePorta: 2 },
        { altura: 3, largura: 4, quantidadePorta: 2 },
        { altura: 3, largura: 6, quantidadePorta: 2 },
        { altura: 3, largura: 3, quantidadePorta: 2 }
      ]

      const areaTotalEsperada = ParedeEnum.ALTURA_PORTA * ParedeEnum.LARGURA_PORTA * 8

      expect(Parede.calcularAreaTotalPortas(paredes)).toEqual(areaTotalEsperada)
    })

    it('deve calcular corretamente a área total de portas quando houver portas em algumas paredes', () => {
      const paredes: IParede[] = [
        { altura: 3, largura: 5, quantidadePorta: 2 },
        { altura: 3, largura: 4, quantidadePorta: 0 },
        { altura: 3, largura: 6, quantidadePorta: 1 },
        { altura: 3, largura: 3, quantidadePorta: 3 }
      ]

      const areaTotalEsperada = ParedeEnum.ALTURA_PORTA * ParedeEnum.LARGURA_PORTA * 6

      expect(Parede.calcularAreaTotalPortas(paredes)).toBeCloseTo(areaTotalEsperada)
    })
  })

  describe('verificaAreaTotalJanelaComPorta', () => {
    it('deve retornar erro quando a área total das janelas e portas for superior a 50% da área total da parede', () => {
      const areaTotalJanela = 20
      const areaTotalPorta = 15
      const areaTotalParede = 50

      expect(() => Parede.verificaAreaTotalJanelaComPorta(areaTotalJanela, areaTotalPorta, areaTotalParede))
        .toThrow('A área total das portas e janelas não pode ser superior a 50% da área total da parede')
    })

    it('não deve retornar erro quando a área total das janelas e portas for igual a 50% da área total da parede', () => {
      const areaTotalJanela = 12.5
      const areaTotalPorta = 12.5
      const areaTotalParede = 50

      expect(() => Parede.verificaAreaTotalJanelaComPorta(areaTotalJanela, areaTotalPorta, areaTotalParede))
        .not.toThrow()
    })

    it('não deve retornar erro quando a área total das janelas e portas for inferior a 50% da área total da parede', () => {
      const areaTotalJanela = 10
      const areaTotalPorta = 5
      const areaTotalParede = 50

      expect(() => Parede.verificaAreaTotalJanelaComPorta(areaTotalJanela, areaTotalPorta, areaTotalParede))
        .not.toThrow()
    })
  })

  describe('verificaAlturaMinimaParedeComPorta', () => {
    it('não deve lançar erro se a altura da parede for maior ou igual à altura mínima com porta', () => {
      const alturaParede = ParedeEnum.ALTURA_PORTA + ParedeEnum.DIFERENCA_MINIMA_ALTURA
      expect(() => Parede.verificaAlturaMinimaParedeComPorta(alturaParede)).not.toThrow()
    })

    it('deve lançar erro se a altura da parede for menor que a altura mínima com porta', () => {
      const alturaParede = ParedeEnum.ALTURA_PORTA + ParedeEnum.DIFERENCA_MINIMA_ALTURA - 1
      expect(() => Parede.verificaAlturaMinimaParedeComPorta(alturaParede))
        .toThrow(Error('As paredes que possuem portas devem ser no mínimo 30cm maiores que a altura da porta'))
    })
  })

  describe('calculaQuantidadeTinta', () => {
    it('deve retornar a quantidade de tinta necessária para pintar a área total da parede', () => {
      const area = 18
      const resultadoEsperado = {
        area,
        litrosNecessarios: area / 5,
        latasNecessarias: [
          { tamanho: 18, quantidade: 0 },
          { tamanho: 3.6, quantidade: 1 },
          { tamanho: 2.5, quantidade: 0 },
          { tamanho: 0.5, quantidade: 0 },
        ],
      }
      const resultado = Parede.calculaQuantidadeTinta(area)
      expect(resultado).toEqual(resultadoEsperado)
    })

    it('deve retornar a quantidade de tinta necessária para pintar uma parede com margem de erro', () => {
      const area = 23
      const resultadoEsperado = {
        area,
        litrosNecessarios: area / 5,
        latasNecessarias: [
          { tamanho: 18, quantidade: 0 },
          { tamanho: 3.6, quantidade: 1 },
          { tamanho: 2.5, quantidade: 0 },
          { tamanho: 0.5, quantidade: 2 },
        ],
      }
      const resultado = Parede.calculaQuantidadeTinta(area)
      expect(resultado).toEqual(resultadoEsperado)
    })

    it('deve retornar a quantidade de tinta necessária para pintar uma área grande', () => {
      const area = 50
      const resultadoEsperado = {
        area,
        litrosNecessarios: area / 5,
        latasNecessarias: [
          { tamanho: 18, quantidade: 0 },
          { tamanho: 3.6, quantidade: 2 },
          { tamanho: 2.5, quantidade: 1 },
          { tamanho: 0.5, quantidade: 1 },
        ],
      }
      const resultado = Parede.calculaQuantidadeTinta(area)
      expect(resultado).toEqual(resultadoEsperado)
    })
  })
})

