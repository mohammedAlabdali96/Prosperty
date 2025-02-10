module.exports = {
  preset: "ts-jest",
  testEnvironment: "jest-environment-jsdom",
  transform: {
    "^.+\\.vue$": "@vue/vue3-jest",
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^/src/(.*)$": "<rootDir>/src/$1",
  },
  moduleFileExtensions: ["js", "ts", "json", "vue"],
  testEnvironmentOptions: {
    customExportConditions: ["node", "node-addons"],
  },
};
