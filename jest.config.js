module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    "**/*.{js,jsx}",
    "!**/node_modules/**",
    "!**/vendor/**"
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['kjhtml', 'junit'],
  coverageThreshold: {
    "global": {
      "branches": 80,
      "functions": 80,
      "lines": 80,
      "statements": -10
    }
  },
  projects: [
    '<rootDir>/apps/ngrx-crud-poc',
    '<rootDir>/apps/backend',
    '<rootDir>/libs/core-data',
    '<rootDir>/libs/ngrx-crud-util',
    '<rootDir>/libs/store',
    '<rootDir>/libs/ui',
    '<rootDir>/libs/books',
  ],
  testEnvironment: "node"
};
