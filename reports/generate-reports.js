const { execSync } = require('child_process')
const fs = require('fs')

try {
  console.log('Generating reports...')
  // remove old test-results.json
  if (fs.existsSync('reports/test-results.json')) 
    fs.unlinkSync('reports/test-results.json')
  // run tests and generate json report
  execSync('npm run test:json', { stdio: 'inherit' })
  // wait until test-results.json is created
  while (!fs.existsSync('reports/test-results.json')) {}
  
} catch (error) {
  console.error('Tests failed. Please fix the tests before pushing.')
  process.exit(1)
}