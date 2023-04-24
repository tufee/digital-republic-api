export interface IParede {
  altura: number
  largura: number
  quantidadeJanela?: number
  quantidadePorta?: number
}

export interface ICalculoQuantidadeTinta {
  area: number
  litrosNecessarios: number
  latasNecessarias: Array<{ tamanho: number; quantidade: number }>
}
