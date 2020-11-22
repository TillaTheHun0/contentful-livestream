
module.exports = {
  displayName: 'pokemon-healthcheck',
  testPathIgnorePatterns: [
    '/node_modules/',
    '/dist/'
  ],
  transform: {
    '^.+\\.[t|j]sx?$': 'babel-jest'
  },
  moduleFileExtensions: ['js', 'jsx'],
  testEnvironment: 'node',
  testMatch: [
    '<rootDir>/**/*.test.js'
  ]
}
