type ErrorCode = 'record/max-reached' | 'record/not-found'

class ApiError extends Error {
  statusCode: number
  statusMessage: string
  errorCode?: string

  constructor(message: string, statusCode: number, errorCode?: ErrorCode) {
    super(message)
    this.statusCode = statusCode
    this.errorCode = errorCode

    switch (statusCode) {
      case 400:
        this.statusMessage = 'Bad Request'
        break
      case 401:
        this.statusMessage = 'Unauthorized'
        break
      case 403:
        this.statusMessage = 'Forbidden'
        break
      case 404:
        this.statusMessage = 'Not Found'
        break
      case 500:
        this.statusMessage = 'Internal Server Error'
        break
      default:
        this.statusMessage = 'Internal Server Error'
        break
    }
  }
}

export default ApiError
