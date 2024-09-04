import { FastifyJWTOptions } from '@fastify/jwt'
import { FastifyRegisterOptions } from 'fastify'

const fastifyJWTOptions: FastifyRegisterOptions<FastifyJWTOptions> | undefined = {
  secret: process.env.JWT_SECRET as string,
  sign: {
    expiresIn: '12h',
  },
}

export default fastifyJWTOptions
