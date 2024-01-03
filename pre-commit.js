const { execSync } = require('child_process')
const fs = require('fs')

let testPassing = true
let testResults = ''

function summarizeTest(testResultsJson) {
  const data = JSON.parse(testResultsJson)
  const numPassedTests = data.numPassedTests
  const numFailedTests = data.numFailedTests
  const numTotalTests = data.numTotalTests
  const testSummary = JSON.stringify({
    numPassedTests,
    numFailedTests,
    numTotalTests,
    amountPassed: `${numPassedTests}/${numTotalTests}`,
    pctPassed: (numPassedTests / numTotalTests) * 100,
  })
  fs.writeFileSync('reports/test-summary.json', testSummary)
}

try {
  testResults = execSync('npm run test', { stdio: 'inherit' })
  const testResultsJson = fs.readFileSync('reports/test-results.json')
  summarizeTest(testResultsJson)
} catch (error) {
  testPassing = false
  console.error('Tests failed')
}

try {
  execSync(
    'git add reports/test-results.json reports/coverage-summary.json reports/test-summary.json',
    {
      stdio: 'inherit',
    },
  )
} catch (error) {
  console.error('Failed to add report files')
} finally {
  if (!testPassing) {
    console.error('Tests failed')
    console.log(testResults.toString())
    process.exit(1)
  }
}
