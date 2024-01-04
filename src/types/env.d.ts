declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production'
    PORT: string | undefined
    DATABASE_URL: string
    JWT_SECRET: string
  }
}
