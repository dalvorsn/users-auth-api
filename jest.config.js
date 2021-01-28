export default {
  // Stop running tests after `n` failures
  bail: true,

  testEnvironment: 'jest-environment-node',
  transform: {},

  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
  ],

  coverageThreshold: {
    './src/domain': {
      lines: 100,
      statements: 100,
      branches: 100,
      functions: 100,
    },
  },
};
