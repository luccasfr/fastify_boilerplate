class ApiError extends Error {
  statusCode: number
  statusMessage: string

  constructor(message: string, statusCode: number) {
    super(message)
    this.statusCode = statusCode
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
