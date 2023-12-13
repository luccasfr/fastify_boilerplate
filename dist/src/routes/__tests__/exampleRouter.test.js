"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("@/index"));
const exampleSchemas_1 = require("@/schemas/exampleSchemas");
const supertest_1 = __importDefault(require("supertest"));
describe('Example Router Tests', () => {
    let app;
    let exampleId;
    beforeAll(async () => {
        app = await (0, index_1.default)();
    });
    afterAll((done) => {
        app.close(() => {
            done();
        });
    });
    it('should create a new example with POST /api/example/', async () => {
        const exampleData = {
            name: 'John Doe',
            age: 25,
        };
        const response = await (0, supertest_1.default)(app).post('/api/example').send(exampleData);
        expect(response.status).toBe(200);
        const validationResult = exampleSchemas_1.exampleResponseSchema.safeParse(response.body);
        expect(validationResult.success).toBe(true);
        exampleId = response.body.id;
    });
    it('should get all examples with GET /api/example/', async () => {
        const response = await (0, supertest_1.default)(app).get('/api/example');
        expect(response.status).toBe(200);
        const validationResult = exampleSchemas_1.exampleResponseSchema.array().safeParse(response.body);
        expect(validationResult.success).toBe(true);
    });
    it('should get a specific example by id with GET /api/example/:id', async () => {
        const response = await (0, supertest_1.default)(app).get(`/api/example/${exampleId}`);
        expect(response.status).toBe(200);
        const validationResult = exampleSchemas_1.exampleResponseSchema.safeParse(response.body);
        expect(validationResult.success).toBe(true);
    });
    it('should update an example with PUT /api/example/:id', async () => {
        const updatedExampleData = {
            name: 'Updated Name',
            age: 30,
        };
        const response = await (0, supertest_1.default)(app)
            .put(`/api/example/${exampleId}`)
            .send(updatedExampleData);
        expect(response.status).toBe(200);
        const validationResult = exampleSchemas_1.exampleResponseSchema.safeParse(response.body);
        expect(validationResult.success).toBe(true);
    });
    it('should delete an example with DELETE /api/example/:id', async () => {
        const response = await (0, supertest_1.default)(app).delete(`/api/example/${exampleId}`);
        expect(response.status).toBe(200);
        const validationResult = exampleSchemas_1.exampleResponseSchema.safeParse(response.body);
        expect(validationResult.success).toBe(true);
    });
});
//# sourceMappingURL=exampleRouter.test.js.map