module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  setupFilesAfterEnv: ["<rootDir>/src/test/setup.ts"],
  // testMatch: ["<rootDir>/src/controllers/__tests__/*.test.ts"],
};
