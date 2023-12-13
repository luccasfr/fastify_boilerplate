"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apiError_1 = __importDefault(require("@/errors/apiError"));
const zod_1 = require("zod");
const errorHandler = (error, _request, reply) => {
    if (error instanceof zod_1.ZodError) {
        reply.status(400);
        reply.send({ statusCode: 400, error: 'Bad Request', issues: error.issues });
    }
    else if (error instanceof apiError_1.default) {
        reply.status(error.statusCode);
        reply.send({
            statusCode: error.statusCode,
            error: error.statusMessage,
            message: error.message,
        });
    }
    else {
        reply.status(error.statusCode || 500);
        reply.send(error);
    }
};
exports.default = errorHandler;
//# sourceMappingURL=errorHandler.js.map