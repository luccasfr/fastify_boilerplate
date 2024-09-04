import ApiError from '@/errors/api-error'

describe('ApiError', () => {
  it('should set statusMessage to "Unauthorized" for status code 401', () => {
    const error = new ApiError('Unauthorized error', 401)
    expect(error.statusMessage).toBe('Unauthorized')
  })

  it('should set statusMessage to "Forbidden" for status code 403', () => {
    const error = new ApiError('Forbidden error', 403)
    expect(error.statusMessage).toBe('Forbidden')
  })

  it('should set statusMessage to "Not Found" for status code 404', () => {
    const error = new ApiError('Not found error', 404)
    expect(error.statusMessage).toBe('Not Found')
  })

  it('should set statusMessage to "Internal Server Error" for status code 500', () => {
    const error = new ApiError('Internal Server Error', 500)
    expect(error.statusMessage).toBe('Internal Server Error')
  })

  it('should set statusMessage to "Internal Server Error" for status code 501', () => {
    const error = new ApiError('Internal Server Error', 501)
    expect(error.statusMessage).toBe('Internal Server Error')
  })
})
