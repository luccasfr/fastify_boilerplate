"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("@fastify/cors"));
const swagger_1 = __importDefault(require("@fastify/swagger"));
const swagger_ui_1 = __importDefault(require("@fastify/swagger-ui"));
const jwt_1 = __importDefault(require("@fastify/jwt"));
require("dotenv/config");
const fastify_1 = __importDefault(require("fastify"));
const fastify_type_provider_zod_1 = require("fastify-type-provider-zod");
const errorHandler_1 = __importDefault(require("./handlers/errorHandler"));
const routes_1 = __importDefault(require("./routes"));
const fastify = (0, fastify_1.default)({
    logger: true,
});
fastify.setValidatorCompiler(fastify_type_provider_zod_1.validatorCompiler);
fastify.setSerializerCompiler(fastify_type_provider_zod_1.serializerCompiler);
fastify.setErrorHandler(errorHandler_1.default);
fastify.register(cors_1.default, {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
});
fastify.register(jwt_1.default, {
    secret: process.env.JWT_SECRET,
    sign: {
        expiresIn: '12h',
    },
});
fastify.addHook('onRequest', async (request, reply) => {
    try {
        if (request.url.startsWith('/docs'))
            return;
    }
    catch (err) {
        reply.send(err);
    }
});
fastify.register(swagger_1.default, {
    openapi: {
        info: {
            title: 'Fastify Boilerplate API',
            description: 'Sample backend service',
            version: '1.0.0',
        },
        servers: [],
    },
    transform: fastify_type_provider_zod_1.jsonSchemaTransform,
});
fastify.register(swagger_ui_1.default, {
    routePrefix: '/docs',
});
fastify.register(routes_1.default, { prefix: '/api' });
async function run() {
    await fastify.ready();
    await fastify.listen({
        port: Number(process.env.PORT) || 5000,
    });
    const addressInfo = fastify.server.address();
    fastify.log.info(`Documentation running at http://${addressInfo.address}/docs`);
    if (addressInfo.address === '::1')
        fastify.log.info(`Documentation running at http://127.0.0.1:${addressInfo.port}/docs`);
    return fastify.server;
}
run();
exports.default = run;
//# sourceMappingURL=index.js.map