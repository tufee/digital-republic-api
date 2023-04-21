import { Parede } from './parede'

export class Sala {
  paredes: Parede[]

  constructor(paredes: Parede[]) {
    this.paredes = paredes
  }

  calcularAreaTotal(): number {
    let areaTotal = 0
    for (const parede of this.paredes) {
      areaTotal += parede.area
    }
    return areaTotal
  }
}

