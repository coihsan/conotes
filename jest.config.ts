module.exports = {
    preset: ['ts-jest, vite-jest'],
    testEnvironment: 'jsdom',
    roots: ['<rootDir>/src', '<rootDir>/tests/unit'],
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
    moduleNameMapper: {
      '@/(.*)$': '<rootDir>/src/$1',
    },
  };
  