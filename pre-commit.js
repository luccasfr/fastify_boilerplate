const { execSync } = require('child_process')

let testPassing = true
let testResults = ''

try {
  testResults = execSync('npm run test', { stdio: 'inherit' })
} catch (error) {
  testPassing = false
  console.error('Tests failed')
}

try {
  execSync('git add reports/test-results.json reports/coverage-summary.json', {
    stdio: 'inherit',
  })
} catch (error) {
  console.error('Failed to add report files')
} finally {
  if (!testPassing) {
    console.error('Tests failed')
    console.log(testResults.toString())
    process.exit(1)
  }
}
