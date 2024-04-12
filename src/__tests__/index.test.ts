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
          address: process.env.HOST ?? '0.0.0.0',
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

  it('should listen on the host specified in the environment variable', async () => {
    process.env.HOST = '127.0.0.1'

    const fastify = await run()

    const actualHost = (fastify.server.address() as AddressInfo).address
    const expectedHost = process.env.HOST

    expect(actualHost).toEqual(expectedHost)
  })

  it('should log the documentation URL', async () => {
    delete process.env.HOST
    process.env.PORT = '3000'

    const fastify = await run()

    expect(fastify.log.info).toHaveBeenCalledWith(
      `Documentation running at http://0.0.0.0:${process.env.PORT}/docs`,
    )
  })
})
