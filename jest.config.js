const { pathsToModuleNameMapper } = require('ts-jest/utils');
const { references } = require('./tsconfig.json');

module.exports = {
  testMatch: ["**/*.spec.ts"],
  roots: ['<rootDir>/src'],
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  collectCoverage: true,
  coverageReporters: ['html','lcov'],
  coverageDirectory: 'coverage',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  preset: "jest-preset-angular",
  cacheDirectory: '<rootDir>/node_modules/.cache/jest',
  setupFilesAfterEnv: ["<rootDir>/test-setup.ts"],
  moduleNameMapper: pathsToModuleNameMapper(references.paths || {}, {
    prefix: '<rootDir>/'
  })
};
