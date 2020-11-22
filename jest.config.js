
module.exports = {
  collectCoverage: true,
  coverageReporters: [
    'lcov',
    'text'
  ],
  projects: [
    '<rootDir>/packages/**/jest.config.js'
  ]
}
