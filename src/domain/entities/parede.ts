import { LataTintaEnum, LitrosPorMetroQuadradoEnum } from '../enums/lata-tinta-enum'
import { ParedeEnum } from '../enums/parede-enum'
import { ICalculoQuantidadeTinta, IParede } from '../interfaces/parede'

export class Parede {
  static calculaAreaParede(altura: number, largura: number): number {
    const areaTotal = altura * largura

    if (areaTotal < ParedeEnum.AREA_MINIMA || areaTotal > ParedeEnum.AREA_MAXIMA) {
      throw new Error(`A área total da parede deve estar entre 1 e 50m², área atual (${areaTotal}m²).`)
    }

    return areaTotal
  }

  static calculaAreaTotalParedes(paredes: IParede[]) {
    const areas = []

    for (const parede of paredes) {
      const area = Parede.calculaAreaParede(parede.altura, parede.largura)
      areas.push(area)
    }

    const areaTotal = areas.reduce((total, area) => total + area, 0)
    return areaTotal
  }

  static calculaAreaJanela(quantidadeJanela: number): number {
    const areaJanela = ParedeEnum.ALTURA_JANELA * ParedeEnum.LARGURA_JANELA
    return quantidadeJanela * areaJanela
  }

  static calcularAreaTotalJanelas(paredes: IParede[]) {
    const areas = []

    for (const parede of paredes) {
      if (parede.quantidadeJanela) {
        const area = Parede.calculaAreaJanela(parede.quantidadeJanela)
        areas.push(area)
      }
    }

    const areaTotal = areas.reduce((total, area) => total + area, 0)
    return areaTotal
  }

  static calculaAreaPorta(quantidadePorta: number): number {
    const areaPorta = ParedeEnum.ALTURA_PORTA * ParedeEnum.LARGURA_PORTA
    return quantidadePorta * areaPorta
  }

  static calcularAreaTotalPortas(paredes: IParede[]) {
    const areas = []

    for (const parede of paredes) {
      if (parede.quantidadePorta) {
        const area = Parede.calculaAreaPorta(parede.quantidadePorta)
        areas.push(area)
      }
    }

    const areaTotal = areas.reduce((total, area) => total + area, 0)
    return areaTotal
  }

  static verificaAreaTotalJanelaComPorta(areaTotalJenela: number, areaTotalPorta: number, areaTotalParede: number): void {
    const areaTotalJanelaComPorta = areaTotalJenela + areaTotalPorta
    const areaMaximaParede = areaTotalParede / 2

    if (areaTotalJanelaComPorta > areaMaximaParede) {
      throw new Error('A área total das portas e janelas não pode ser superior a 50% da área total da parede')
    }
  }

  static verificaAlturaMinimaParedeComPorta(alturaParede: number): void {
    const alturaMinimaParede = ParedeEnum.ALTURA_PORTA + ParedeEnum.DIFERENCA_MINIMA_ALTURA

    if (alturaParede < alturaMinimaParede) {
      throw new Error('As paredes que possuem portas devem ser no mínimo 30cm maiores que a altura da porta')
    }
  }

  static calculaQuantidadeTinta(area: number): ICalculoQuantidadeTinta {
    const TAMANHOS_LATA = Object.keys(LataTintaEnum)
      .map((x) => Number(x))
      .filter((x) => !isNaN(x))

    const litrosTotaisNecessarios = area / LitrosPorMetroQuadradoEnum.LITROS_POR_METRO_QUADRADO

    let litrosNecessarios = litrosTotaisNecessarios
    const latasNecessarias: Array<{ tamanho: number, quantidade: number }> = []

    for (const tamanho of TAMANHOS_LATA) {
      const quantidade = Math.floor(litrosNecessarios / tamanho)
      for (let i = 0; i < quantidade; i++) {
        latasNecessarias.push({ tamanho, quantidade: 1 })
      }
      litrosNecessarios %= tamanho
    }

    if (litrosNecessarios > 0 &&
      litrosNecessarios <= TAMANHOS_LATA[TAMANHOS_LATA.length - 1] +
      LitrosPorMetroQuadradoEnum.MARGEM_ERRO
    ) {
      latasNecessarias.push({
        tamanho: TAMANHOS_LATA[TAMANHOS_LATA.length - 1],
        quantidade: 1,
      })
    }

    return {
      area,
      litrosNecessarios: litrosTotaisNecessarios,
      latasNecessarias: TAMANHOS_LATA.map((tamanho) => ({
        tamanho,
        quantidade: latasNecessarias.filter((lata) => lata.tamanho === tamanho)
          .length,
      })),
    }
  }
}

