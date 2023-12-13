// pre-push.js
const { execSync } = require('child_process')
const chalk = require('chalk')

try {
  console.log(chalk.blue('Running tests before push...'))
  execSync('npm run test', { stdio: 'inherit' })
} catch (error) {
  console.error(chalk.red('Tests failed. Please fix the tests before pushing.'))
  process.exit(1)
}
