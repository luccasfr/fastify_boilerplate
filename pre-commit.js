const { execSync } = require('child_process');

try {
  execSync('npm run test', { stdio: 'inherit' });
} catch (error) {
  console.error('Tests failed');
}

try {
  execSync('git add reports/test-results.json reports/coverage-summary.json', { stdio: 'inherit' });
} catch (error) {
  console.error('Failed to add report files');
}