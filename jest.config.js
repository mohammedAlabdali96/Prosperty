export default {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  transform: {
    '^.+\\.vue$': '@vue/vue3-jest', 
    '^.+\\.(ts|tsx)$': 'ts-jest', 
  },
  moduleFileExtensions: ['js', 'ts', 'json', 'vue'],
  testEnvironmentOptions: {
    customExportConditions: ["node", "node-addons"],
 },
};