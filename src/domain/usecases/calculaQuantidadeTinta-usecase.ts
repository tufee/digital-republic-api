import { Parede } from '../entities/parede'
import { ICalculoQuantidadeTinta, IParede } from '../interfaces/parede'

export class CalculaQuantidadeTintaUseCase {
  calculaQuantidade(paredes: IParede[]): ICalculoQuantidadeTinta {
    const areaTotalParedes = Parede.calculaAreaTotalParedes(paredes)
    const areaTotalJanelas = Parede.calcularAreaTotalJanelas(paredes)
    const areaTotalPortas = Parede.calcularAreaTotalPortas(paredes)

    Parede.verificaAreaTotalJanelaComPorta(areaTotalJanelas, areaTotalPortas, areaTotalParedes)

    for (const parede of paredes) {
      if (parede.quantidadePorta) {
        Parede.verificaAlturaMinimaParedeComPorta(parede.altura)
      }
    }

    const areaTotalParaPintar = areaTotalParedes - areaTotalJanelas - areaTotalPortas
    const resultado = Parede.calculaQuantidadeTinta(areaTotalParaPintar)

    return resultado
  }
}
