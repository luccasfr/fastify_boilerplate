import { PrismaClient } from '@prisma/client'
import prismaInstance from 'prisma/prismaInstance'

class PrismaService {
  protected prisma: PrismaClient

  constructor(prisma?: PrismaClient) {
    if (prisma) {
      this.prisma = prisma
      return
    }
    this.prisma = prismaInstance
  }
}

export default PrismaService
