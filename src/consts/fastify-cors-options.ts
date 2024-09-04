import { FastifyCorsOptions, FastifyCorsOptionsDelegate } from '@fastify/cors'
import { FastifyRegisterOptions } from 'fastify'

const fastifyCORSOptions:
  | FastifyRegisterOptions<FastifyCorsOptions | FastifyCorsOptionsDelegate>
  | undefined = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}

export default fastifyCORSOptions
