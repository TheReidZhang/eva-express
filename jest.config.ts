import type { Config } from 'jest';

const config: Config = {
  verbose: true,
  rootDir: './',
  setupFiles: ['<rootDir>/jest/setupEnv.ts'],
  setupFilesAfterEnv: ['<rootDir>/jest/setupAfterEnv.ts', 'jest-extended/all'],
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
  moduleFileExtensions: ['js', 'jsx', 'ts', 'json', 'node'],
  preset: 'ts-jest',
  reporters: ['default', 'jest-junit', 'jest-html-reporters'],
  moduleDirectories: ['node_modules', 'src'],
  testTimeout: 20000,
};

export default config;
