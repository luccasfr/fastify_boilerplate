const { execSync } = require('child_process')

try {
  console.log('Running tests before push...')
  execSync('npm run test-and-commit', { stdio: 'inherit' })
} catch (error) {
  console.error('Tests failed. Please fix the tests before pushing.')
  process.exit(1)
}
