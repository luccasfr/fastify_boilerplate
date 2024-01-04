import ExampleService from '@/services/exampleService'
import { prismaMock } from 'prisma/prismaSingleton'
import ApiError from '@/errors/apiError'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'

describe('exampleService', () => {
  let exampleService: ExampleService

  beforeEach(() => {
    exampleService = new ExampleService(prismaMock)
  })

  it('should throw ApiError on update when PrismaClientKnownRequestError when code P2025 is encountered', async () => {
    const error = new PrismaClientKnownRequestError('Example not found', {
      code: 'P2025',
      clientVersion: '',
    })
    prismaMock.example.update.mockRejectedValue(error)

    await expect(
      exampleService.update(
        {},
        {
          id: 1,
        },
      ),
    ).rejects.toThrow(ApiError)
  })

  it('should throw PrismaClientKnownRequestError on update when PrismaClientKnownRequestError when code P2025 is not encountered', async () => {
    const error = new PrismaClientKnownRequestError('Example not found', {
      code: 'P2002',
      clientVersion: '',
    })

    prismaMock.example.update.mockRejectedValue(error)
    await expect(
      exampleService.update(
        {},
        {
          id: 1,
        },
      ),
    ).rejects.toThrow(PrismaClientKnownRequestError)
  })

  it('should throw ApiError on delete when PrismaClientKnownRequestError when code P2025 is encountered', async () => {
    const error = new PrismaClientKnownRequestError('Example not found', {
      code: 'P2025',
      clientVersion: '',
    })
    prismaMock.example.delete.mockRejectedValue(error)

    await expect(
      exampleService.delete({
        id: 1,
      }),
    ).rejects.toThrow(ApiError)
  })

  it('should throw PrismaClientKnownRequestError on delete when PrismaClientKnownRequestError when code P2025 is not encountered', async () => {
    const error = new PrismaClientKnownRequestError('Example not found', {
      code: 'P2002',
      clientVersion: '',
    })

    prismaMock.example.delete.mockRejectedValue(error)
    await expect(
      exampleService.delete({
        id: 1,
      }),
    ).rejects.toThrow(PrismaClientKnownRequestError)
  })
})
