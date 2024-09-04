import { PrismaClient } from '@prisma/client'
import PrismaService from '../prisma-service'

describe('PrismaService', () => {
  let prismaService: PrismaService
  let prismaInstance: PrismaClient

  beforeAll(() => {
    prismaInstance = new PrismaClient()
    prismaService = new PrismaService(prismaInstance)
  })

  afterAll(async () => {
    await prismaInstance.$disconnect()
  })

  it('should create a new instance of PrismaService', () => {
    expect(prismaService).toBeInstanceOf(PrismaService)
  })

  it('should use the provided PrismaClient instance', () => {
    expect(prismaService['prisma']).toBe(prismaInstance)
  })
})
