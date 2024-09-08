module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
  testMatch: ['**/*.test.ts'], // Match files with .test.ts extension
  transform: {
    '^.+\\.ts$': 'ts-jest', // Use ts-jest for .ts files
  },
};
