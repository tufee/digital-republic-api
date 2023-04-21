import { ParedeEnum } from '../enums/parede-enum'

export class Parede {
  altura: number
  largura: number
  area: number
  quantidadeJanela: number
  quantidadePorta: number

  constructor(altura: number, largura: number, quantidadeJanela: number, quantidadePorta: number) {
    this.altura = altura
    this.largura = largura
    this.quantidadeJanela = quantidadeJanela
    this.quantidadePorta = quantidadePorta
    this.area = this.calcularArea()
  }

  calcularArea(): number {
    const areaTotal = this.altura * this.largura
    const areaJanelas = this.quantidadeJanela * ParedeEnum.AREA_JANELA
    const areaPortas = this.quantidadePorta * ParedeEnum.AREA_PORTA

    return areaTotal - areaJanelas - areaPortas
  }
}

