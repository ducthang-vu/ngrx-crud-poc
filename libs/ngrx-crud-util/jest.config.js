module.exports = {
  displayName: 'ngrx-crud-util',
  preset: '../../jest.preset.js',
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  globals: {
    'ts-jest': {
      tsConfig: '<rootDir>/tsconfig.spec.json',
      stringifyContentPathRegex: '\\.(html|svg)$',
      astTransformers: {
        before: [
          'jest-preset-angular/build/InlineFilesTransformer',
          'jest-preset-angular/build/StripStylesTransformer',
        ],
      },
    },
  },
  collectCoverage: true,
  collectCoverageFrom: [
    "**/*.{ts,js,jsx}",
    "!**/*{index,module}.ts",
    "!**/*jest.config.js",
    "!**/node_modules/**",
    "!**/vendor/**"
  ],
  coverageReporters: ["html"],
  coverageDirectory: '../../coverage/libs/ngrx-crud-util',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
