import { silentRun } from '@/index'
import { exampleResponseSchema } from '@/model/example'
import { Server } from 'node:http'
import request from 'supertest'

describe('Example Router Tests', () => {
  let server: Server
  let exampleId: number

  beforeAll(async () => {
    const running = await silentRun()
    server = running.server
  })

  afterAll((done) => {
    server.close(() => {
      done()
    })
  })

  it('should create a new example with POST /example/', async () => {
    const exampleData = {
      name: 'John Doe',
      age: 25,
    }

    const response = await request(server).post('/example').send(exampleData)

    if (response.status !== 200) {
      console.error('Error response body:', response.body)
    }

    expect(response.status).toBe(200)
    const validationResult = exampleResponseSchema.safeParse(response.body)
    expect(validationResult.success).toBe(true)

    exampleId = response.body.id
  })

  it('should get all examples with GET /example/', async () => {
    const response = await request(server).get('/example')

    if (response.status !== 200) {
      console.error('Error response body:', response.body)
    }

    expect(response.status).toBe(200)
    const validationResult = exampleResponseSchema.array().safeParse(response.body)
    expect(validationResult.success).toBe(true)
  })

  it('should get a specific example by id with GET /example/:id', async () => {
    const response = await request(server).get(`/example/${exampleId}`)

    if (response.status !== 200) {
      console.error('Error response body:', response.body)
    }

    expect(response.status).toBe(200)
    const validationResult = exampleResponseSchema.safeParse(response.body)
    expect(validationResult.success).toBe(true)
  })

  it('should update an example with PUT /example/:id', async () => {
    const updatedExampleData = {
      name: 'Updated Name',
      age: 30,
    }

    const response = await request(server)
      .put(`/example/${exampleId}`)
      .send(updatedExampleData)

    if (response.status !== 200) {
      console.error('Error response body:', response.body)
    }

    expect(response.status).toBe(200)
    const validationResult = exampleResponseSchema.safeParse(response.body)
    expect(validationResult.success).toBe(true)
  })

  it('should delete an example with DELETE /example/:id', async () => {
    const response = await request(server).delete(`/example/${exampleId}`)

    if (response.status !== 200) {
      console.error('Error response body:', response.body)
    }

    expect(response.status).toBe(200)
    const validationResult = exampleResponseSchema.safeParse(response.body)
    expect(validationResult.success).toBe(true)
  })
})
