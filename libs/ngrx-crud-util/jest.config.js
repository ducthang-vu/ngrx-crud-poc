module.exports = {
  displayName: 'ngrx-crud-util',
  preset: '../../jest.preset.js',
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  globals: {
    'ts-jest': {
      stringifyContentPathRegex: '\\.(html|svg)$',
      astTransformers: {
        before: [
          'jest-preset-angular/build/InlineFilesTransformer',
          'jest-preset-angular/build/StripStylesTransformer',
        ],
      },
      tsconfig: '<rootDir>/tsconfig.spec.json',
    },
  },
  collectCoverage: true,
  collectCoverageFrom: [
    '**/*.{ts,js,jsx}',
    '!**/*{index,module}.ts',
    '!**/*jest.config.js',
    '!**/node_modules/**',
    '!**/vendor/**',
  ],
  coverageReporters: ['html'],
  coverageDirectory: '../../coverage/libs/ngrx-crud-util',
  snapshotSerializers: [
    'jest-preset-angular/build/serializers/no-ng-attributes',
    'jest-preset-angular/build/serializers/ng-snapshot',
    'jest-preset-angular/build/serializers/html-comment',
  ],
};
