import type { JestConfigWithTsJest } from "ts-jest";

const jestConfig: JestConfigWithTsJest = {
  extensionsToTreatAsEsm: [".ts"],
  moduleFileExtensions: ["ts", "js"],
  testEnvironment: "node",
  testMatch: ["**/test/**/*.spec.ts", "**/test/**/*.test.ts"],
  preset: "ts-jest",
};

export default jestConfig;
