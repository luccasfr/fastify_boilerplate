import { PrismaClient } from '@/generated/prisma'
import { prismaInstance } from '@/lib/prisma-instance'

/**
 * Base service class that provides access to the Prisma client
 * @class PrismaService
 */
class PrismaService {
  /**
   * The Prisma client instance for database operations
   * @protected
   */
  protected prisma: PrismaClient

  /**
   * Creates a new PrismaService instance
   * @param {PrismaClient} [prisma] - Optional Prisma client instance (useful for testing)
   */
  constructor(prisma?: PrismaClient) {
    if (prisma) {
      this.prisma = prisma
      return
    }
    this.prisma = prismaInstance
  }
}

export default PrismaService
