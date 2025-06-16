import { Prisma, User } from '@/generated/prisma'
import PrismaService from './prisma'

/**
 * Service for user-related database operations
 * @class UserService
 * @extends PrismaService
 */
class UserService extends PrismaService {
  /**
   * Creates a new user in the database
   * @param {Prisma.UserCreateInput} data - User data to create
   * @returns {Promise<User>} The created user
   */
  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    return await this.prisma.user.create({ data })
  }

  /**
   * Retrieves users based on query criteria
   * @param {Prisma.UserFindManyArgs["where"]} query - Query conditions
   * @returns {Promise<User[]>} Array of matching users
   */
  async getUsers(query: Prisma.UserFindManyArgs['where']): Promise<User[]> {
    return await this.prisma.user.findMany({ where: query })
  }

  /**
   * Retrieves a user by their ID
   * @param {string} id - User ID
   * @returns {Promise<User | null>} The found user or null
   */
  async getUserById(id: string): Promise<User | null> {
    return await this.prisma.user.findUnique({ where: { id } })
  }

  /**
   * Updates a user by their ID
   * @param {string} id - User ID
   * @param {Prisma.UserUpdateInput} data - User data to update
   * @returns {Promise<User>} The updated user
   */
  async updateUser(id: string, data: Prisma.UserUpdateInput): Promise<User> {
    return await this.prisma.user.update({
      where: { id },
      data,
    })
  }

  /**
   * Deletes a user by their ID
   * @param {string} id - User ID
   * @returns {Promise<User>} The deleted user
   */
  async deleteUser(id: string): Promise<User> {
    return await this.prisma.user.delete({ where: { id } })
  }
}

export default UserService
export { UserService }
