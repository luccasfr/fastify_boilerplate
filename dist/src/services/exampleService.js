"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apiError_1 = __importDefault(require("@/errors/apiError"));
const client_1 = require("@prisma/client");
class ExampleService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        return await this.prisma.example.create({ data });
    }
    async findMany(where) {
        return await this.prisma.example.findMany({ where });
    }
    async findUnique(where) {
        return await this.prisma.example.findUnique({ where });
    }
    async update(data, where) {
        try {
            return await this.prisma.example.update({ data, where });
        }
        catch (error) {
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError)
                if (error.code === 'P2025')
                    throw new apiError_1.default('Example not found', 400);
            throw error;
        }
    }
    async delete(where) {
        try {
            return await this.prisma.example.delete({ where });
        }
        catch (error) {
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError)
                if (error.code === 'P2025')
                    throw new apiError_1.default('Example not found', 400);
            throw error;
        }
    }
}
exports.default = ExampleService;
//# sourceMappingURL=exampleService.js.map