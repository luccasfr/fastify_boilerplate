import pino from 'pino'
import pretty from 'pino-pretty'

const stream = pretty({
  colorize: true,
})

const fastifyLogger = pino({ level: 'info' }, stream)

export default fastifyLogger
