/**
 * Type definitions for environment variables used in the application
 *
 * This module augments the NodeJS.ProcessEnv interface to provide type
 * safety when accessing environment variables throughout the application.
 * It ensures that the required environment variables are properly typed,
 * which helps catch potential errors during development.
 */
declare namespace NodeJS {
  /**
   * Extended ProcessEnv interface with application-specific environment variables
   */
  interface ProcessEnv {
    /**
     * Application environment mode
     * - 'development': For local development environment
     * - 'production': For production deployment
     * - 'test': For running tests
     */
    NODE_ENV: 'development' | 'production' | 'test'
    /**
     * Secret key used for signing and verifying JWT tokens
     * This should be a secure random string in production
     */
    JWT_SECRET: string
    /**
     * URL of the database
     * This should be a valid connection string for the database being used
     */
    DATABASE_URL: string
    /**
     * Port on which the application server will run
     * Defaults to 5000 if not specified
     */
    PORT?: string
    /**
     * Hostname of the application server
     * Defaults to '0.0.0.0' if not specified.
     */
    HOST: string
  }
}
