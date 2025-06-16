/**
 * @file Defines the ApiError class for standardized API error handling.
 * @module errors/api-error
 */

/**
 * Custom error class for handling API errors with HTTP status codes.
 * @class ApiError
 * @extends {Error}
 */
class ApiError extends Error {
  /**
   * HTTP status code for the error
   * @type {number}
   */
  statusCode: number

  /**
   * HTTP status message corresponding to the status code
   * @type {string}
   */
  statusMessage: string

  /**
   * Creates an instance of ApiError.
   * @param {string} message - Error message describing what went wrong
   * @param {number} statusCode - HTTP status code for the error
   */
  constructor(message: string, statusCode: number) {
    super(message)
    this.statusCode = statusCode

    switch (statusCode) {
      case 400: {
        this.statusMessage = 'Bad Request'
        break
      }
      case 401: {
        this.statusMessage = 'Unauthorized'
        break
      }
      case 403: {
        this.statusMessage = 'Forbidden'
        break
      }
      case 404: {
        this.statusMessage = 'Not Found'
        break
      }
      case 500: {
        this.statusMessage = 'Internal Server Error'
        break
      }
      default: {
        this.statusMessage = 'Internal Server Error'
        break
      }
    }
  }
}

/**
 * Named export of the ApiError class
 */
export { ApiError }

/**
 * Default export of the ApiError class
 */
export default ApiError
