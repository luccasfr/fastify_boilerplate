"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const exampleSchemas_1 = require("@/schemas/exampleSchemas");
const exampleService_1 = __importDefault(require("@/services/exampleService"));
const prismaInstance_1 = __importDefault(require("prisma/prismaInstance"));
async function ExampleRouter(fastify) {
    const exampleServiceInstance = new exampleService_1.default(prismaInstance_1.default);
    fastify.withTypeProvider().post('/', {
        schema: {
            summary: 'Create example',
            description: 'Create example',
            tags: ['Example'],
            body: exampleSchemas_1.exampleSchema,
            response: {
                200: exampleSchemas_1.exampleResponseSchema,
            },
        },
    }, async (request) => {
        return exampleServiceInstance.create(request.body);
    });
    fastify.withTypeProvider().get('/', {
        schema: {
            summary: 'Get all examples',
            description: 'Get all examples',
            tags: ['Example'],
            response: {
                200: exampleSchemas_1.exampleResponseSchema.array(),
            },
        },
    }, async () => {
        return exampleServiceInstance.findMany();
    });
    fastify.withTypeProvider().get('/:id', {
        schema: {
            summary: 'Get example by id',
            description: 'Get example by id',
            tags: ['Example'],
            params: exampleSchemas_1.exampleParamsSchema,
        },
    }, async (request) => {
        return exampleServiceInstance.findUnique({
            id: Number(request.params.id),
        });
    });
    fastify.withTypeProvider().put('/:id', {
        schema: {
            summary: 'Update example',
            description: 'Update example',
            tags: ['Example'],
            body: exampleSchemas_1.exampleSchema,
            params: exampleSchemas_1.exampleParamsSchema,
        },
    }, async (request) => {
        return exampleServiceInstance.update(request.body, {
            id: Number(request.params.id),
        });
    });
    fastify.withTypeProvider().delete('/:id', {
        schema: {
            summary: 'Delete example',
            description: 'Delete example',
            tags: ['Example'],
            params: exampleSchemas_1.exampleParamsSchema,
        },
    }, async (request) => {
        return exampleServiceInstance.delete({
            id: Number(request.params.id),
        });
    });
}
exports.default = ExampleRouter;
//# sourceMappingURL=exampleRouter.js.map