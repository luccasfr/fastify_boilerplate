import { silentRun } from '@/index'
import { exampleResponseSchema } from '@/schemas/exampleSchemas'
import { Server } from 'http'
import request from 'supertest'

describe('Example Router Tests', () => {
  let app: Server
  let exampleId: number

  beforeAll(async () => {
    app = await silentRun()
  })

  afterAll((done) => {
    app.close(() => {
      done()
    })
  })

  it('should create a new example with POST /api/example/', async () => {
    const exampleData = {
      name: 'John Doe',
      age: 25,
    }

    const response = await request(app).post('/api/example').send(exampleData)

    if (response.status !== 200) {
      console.error('Error response body:', response.body)
    }

    expect(response.status).toBe(200)
    const validationResult = exampleResponseSchema.safeParse(response.body)
    expect(validationResult.success).toBe(true)

    exampleId = response.body.id
  })

  it('should get all examples with GET /api/example/', async () => {
    const response = await request(app).get('/api/example')

    if (response.status !== 200) {
      console.error('Error response body:', response.body)
    }

    expect(response.status).toBe(200)
    const validationResult = exampleResponseSchema.array().safeParse(response.body)
    expect(validationResult.success).toBe(true)
  })

  it('should get a specific example by id with GET /api/example/:id', async () => {
    const response = await request(app).get(`/api/example/${exampleId}`)

    if (response.status !== 200) {
      console.error('Error response body:', response.body)
    }

    expect(response.status).toBe(200)
    const validationResult = exampleResponseSchema.safeParse(response.body)
    expect(validationResult.success).toBe(true)
  })

  it('should update an example with PUT /api/example/:id', async () => {
    const updatedExampleData = {
      name: 'Updated Name',
      age: 30,
    }

    const response = await request(app)
      .put(`/api/example/${exampleId}`)
      .send(updatedExampleData)

    if (response.status !== 200) {
      console.error('Error response body:', response.body)
    }

    expect(response.status).toBe(200)
    const validationResult = exampleResponseSchema.safeParse(response.body)
    expect(validationResult.success).toBe(true)
  })

  it('should delete an example with DELETE /api/example/:id', async () => {
    const response = await request(app).delete(`/api/example/${exampleId}`)

    if (response.status !== 200) {
      console.error('Error response body:', response.body)
    }

    expect(response.status).toBe(200)
    const validationResult = exampleResponseSchema.safeParse(response.body)
    expect(validationResult.success).toBe(true)
  })
})
