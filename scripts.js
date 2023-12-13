module.exports = {
  dev: 'nodemon --watch "*.ts" --exec "ts-node" -r tsconfig-paths/register ./src/index.ts',
  build: 'tsc',
  start: 'node -r ts-node/register -r tsconfig-paths/register ./dist/src/index.js',
  lint: 'eslint src/**/*.ts',
  lintFix: 'eslint src/**/*.ts --fix',
  generate: 'prisma generate',
  migrate: 'prisma migrate dev',
  migrateDeploy: 'prisma migrate deploy',
  test: 'jest',
}
