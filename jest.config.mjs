export default {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^/src/(.*)$': '<rootDir>/src/$1'
  }
};
