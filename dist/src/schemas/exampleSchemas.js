"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exampleResponseSchema = exports.exampleParamsSchema = exports.exampleSchema = void 0;
const zod_1 = require("zod");
exports.exampleSchema = zod_1.z
    .object({
    name: zod_1.z.string().max(32).describe('Some description for name'),
    age: zod_1.z.number().positive().describe('Some description for age'),
})
    .describe('Body should be an object with name and age');
exports.exampleParamsSchema = zod_1.z
    .object({
    id: zod_1.z
        .string()
        .refine((v) => {
        return !isNaN(Number(v));
    })
        .describe('Some description for id'),
})
    .describe('Params should be an object with id');
exports.exampleResponseSchema = exports.exampleSchema
    .extend({
    id: zod_1.z.number().positive().describe('Some description for id'),
})
    .describe('Response should be an object with name, age and id');
//# sourceMappingURL=exampleSchemas.js.map