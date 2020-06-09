const { pathsToModuleNameMapper } = require('ts-jest/utils');
const { compilerOptions } = require('./tsconfig');

module.exports = {
  testMatch: ["**/*.spec.ts"],
  roots: ['<rootDir>/src'],
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  collectCoverage: true,
  coverageReporters: ['html'],
  coverageDirectory: 'coverage/letsgetstarted-admin',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  preset: "jest-preset-angular",
  cacheDirectory: '<rootDir>/node_modules/.cache/jest',
  setupFilesAfterEnv: ["<rootDir>/test-setup.ts"],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths || {}, {
    prefix: '<rootDir>/'
  })
};
