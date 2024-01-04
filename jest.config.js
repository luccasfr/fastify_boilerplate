/** @type {import('ts-jest').JestConfigWithTsJest} */
// adding
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^prisma/(.*)$': '<rootDir>/prisma/$1',
  },
  coverageReporters: ['text', 'json-summary'],
  coverageDirectory: 'reports'
}
