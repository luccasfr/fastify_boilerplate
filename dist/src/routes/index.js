"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const exampleRouter_1 = __importDefault(require("./exampleRouter"));
async function Routes(fastify) {
    fastify.register(exampleRouter_1.default, { prefix: '/example' });
}
exports.default = Routes;
//# sourceMappingURL=index.js.map