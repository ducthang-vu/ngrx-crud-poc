module.exports = {
  displayName: 'backend',
  preset: '../../jest.preset.js',
  globals: {
    'ts-jest': { tsconfig: '<rootDir>/tsconfig.spec.json' },
  },
  transform: {
    '^.+\\.[tj]s$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'js', 'html'],

  collectCoverage: true,
  collectCoverageFrom: [
    '**/*.{ts,js,jsx}',
    '!**/*{environment,environment.prod,module,main}.{ts,js,jsx}',
    '!**/*mocks.{ts,js,jsx}',
    '!**/*jest.config.js',
    '!**/node_modules/**',
    '!**/vendor/**',
  ],
  coverageReporters: ['html'],
  coverageDirectory: '../../coverage/apps/backend',
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: -10,
    },
  },
};
