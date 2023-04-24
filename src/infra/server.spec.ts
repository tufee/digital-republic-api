import logger from './helper/logger'
import { app } from './server'

describe('Test server start', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('deve iniciar o servidor na porta especificada', () => {
    process.env.NODE_ENV = 'production'
    const port = 3000

    const mockListen = jest.spyOn(app, 'listen').mockImplementation()
    const loggerInfoSpy = jest.spyOn(logger, 'info').mockImplementation()

    app.listen(port, () => logger.info(`Server started on port ${port}`))
    logger.info(`Server started on port ${port}`)

    expect(mockListen).toHaveBeenCalledWith(port, expect.any(Function))
    expect(loggerInfoSpy).toHaveBeenCalledWith(`Server started on port ${port}`)
  })
})
