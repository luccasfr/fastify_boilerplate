declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production'
    PORT: string
    DATABASE_URL: string
    JWT_SECRET: string
  }
}
