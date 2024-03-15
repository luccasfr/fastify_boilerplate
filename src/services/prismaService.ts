import { PrismaClient } from '@prisma/client'
import prismaInstance from 'prisma/prismaInstance'

class PrismaService {
  protected prisma: PrismaClient

  constructor() {
    this.prisma = prismaInstance
  }
}

export default PrismaService
