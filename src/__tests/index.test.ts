import Fastify from 'fastify'
import { run } from '@/index'

jest.mock('fastify', () => {
  return jest.fn().mockReturnValue({
    setValidatorCompiler: jest.fn(),
    setSerializerCompiler: jest.fn(),
    setErrorHandler: jest.fn(),
    register: jest.fn(),
    ready: jest.fn().mockResolvedValue(true),
    listen: jest.fn(),
    server: {
      address: jest.fn().mockReturnValue({}),
    },
    log: {
      info: jest.fn(),
    },
  })
})

describe('index', () => {
  it('should listen on the port specified in the environment variable', async () => {
    process.env.PORT = '3000'

    await run()

    expect(Fastify().listen).toHaveBeenCalledWith({
      port: Number(process.env.PORT),
    })
  })

  it('should listen on port 5000 if no port is specified in the environment variable', async () => {
    delete process.env.PORT

    await run()

    expect(Fastify().listen).toHaveBeenCalledWith({
      port: 5000,
    })
  })
})
