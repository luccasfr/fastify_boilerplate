declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production'
    HOST: string | undefined
    PORT: string | undefined
    DATABASE_URL: string
    JWT_SECRET: string
  }
}
