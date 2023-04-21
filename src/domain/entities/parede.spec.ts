import { Parede } from './parede'

describe('Parede', () => {
  describe('calcularArea', () => {
    it('deve calcular a área corretamente quando não há portas ou janelas', () => {
      const parede = new Parede(3, 4, 0, 0)
      expect(parede.calcularArea()).toBe(12)
    })

    it('deve calcular a área corretamente quando há portas e janelas', () => {
      const parede = new Parede(3, 4, 1, 1)
      expect(parede.calcularArea()).toBeCloseTo(8.08, 2)
    })

    it('deve calcular a área corretamente quando há várias portas e janelas', () => {
      const parede = new Parede(3, 4, 2, 3)
      expect(parede.calcularArea()).toBeCloseTo(2.64, 2)
    })
  })
})

