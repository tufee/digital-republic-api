import { Parede } from './parede'
import { Sala } from './sala'

describe('Sala', () => {
  describe('calcularAreaTotal', () => {
    it('deve calcular a área total corretamente para uma sala sem portas e janelas', () => {
      const paredes = [
        new Parede(2, 2, 0, 0),
        new Parede(2, 2, 0, 0),
        new Parede(2, 2, 0, 0),
        new Parede(2, 2, 0, 0),
      ]
      const sala = new Sala(paredes)
      expect(sala.calcularAreaTotal()).toBeCloseTo(16, 2)
    })

    it('deve calcular a área total corretamente para uma sala com portas e janelas', () => {
      const paredes = [
        new Parede(3, 5, 1, 0),
        new Parede(3, 5, 2, 0),
        new Parede(3, 5, 0, 1),
        new Parede(3, 5, 0, 2),
      ]
      const sala = new Sala(paredes)
      expect(sala.calcularAreaTotal()).toBeCloseTo(48.24, 2)
    })

    it('deve retornar zero para uma sala sem paredes', () => {
      const paredes = [
        new Parede(0, 0, 0, 0),
        new Parede(0, 0, 0, 0),
        new Parede(0, 0, 0, 0),
        new Parede(0, 0, 0, 0),
      ]
      const sala = new Sala(paredes)
      expect(sala.calcularAreaTotal()).toBe(0)
    })
  })
})

