import ApiError from '@/errors/apiError'
import { Prisma } from '@prisma/client'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import PrismaService from './prismaService'

export default class ExampleService extends PrismaService {
  public async create(data: Prisma.exampleCreateInput) {
    return await this.prisma.example.create({ data })
  }

  public async findMany(where?: Prisma.exampleWhereInput) {
    return await this.prisma.example.findMany({ where })
  }

  public async findUnique(where: Prisma.exampleWhereUniqueInput) {
    return await this.prisma.example.findUnique({ where })
  }

  public async update(
    data: Prisma.exampleUpdateInput,
    where: Prisma.exampleWhereUniqueInput,
  ) {
    try {
      return await this.prisma.example.update({ data, where })
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError)
        if (error.code === 'P2025') throw new ApiError('Example not found', 400)
      throw error
    }
  }

  public async delete(where: Prisma.exampleWhereUniqueInput) {
    try {
      return await this.prisma.example.delete({ where })
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError)
        if (error.code === 'P2025') throw new ApiError('Example not found', 400)
      throw error
    }
  }
}
