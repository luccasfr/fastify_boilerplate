import { run } from '@/index'
import { AddressInfo } from 'net'

jest.mock('fastify', () => {
  return jest.fn().mockReturnValue({
    setValidatorCompiler: jest.fn(),
    setSerializerCompiler: jest.fn(),
    setErrorHandler: jest.fn(),
    register: jest.fn(),
    ready: jest.fn().mockResolvedValue(true),
    listen: jest.fn(),
    server: {
      address: jest.fn().mockImplementation(() => {
        return {
          port: Number(process.env.PORT || 5000),
        } as AddressInfo
      }),
    },
    log: {
      info: jest.fn(),
    },
  })
})

describe('index', () => {
  it('should listen on the port specified in the environment variable', async () => {
    process.env.PORT = '3000'

    const fastify = await run()

    const actualPort = (fastify.server.address() as AddressInfo).port
    const expectedPort = Number(process.env.PORT)

    expect(actualPort).toEqual(expectedPort)
  })

  it('should listen on port 5000 if no port is specified in the environment variable', async () => {
    delete process.env.PORT

    const fastify = await run()

    const actualPort = (fastify.server.address() as AddressInfo).port

    expect(actualPort).toEqual(5000)
  })
})
