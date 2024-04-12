import { Prisma } from '@prisma/client'
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
    return await this.prisma.example.update({ data, where })
  }

  public async delete(where: Prisma.exampleWhereUniqueInput) {
    return await this.prisma.example.delete({ where })
  }
}
