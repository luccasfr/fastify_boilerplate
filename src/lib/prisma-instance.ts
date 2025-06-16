import { PrismaClient } from '@/generated/prisma'

/**
 * Singleton instance of PrismaClient for database operations
 * @type {PrismaClient}
 */
const prismaInstance: PrismaClient = new PrismaClient()

export { prismaInstance }
export default prismaInstance
