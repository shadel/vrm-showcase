// jest.config.js
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/jest.setup.ts'],
  moduleNameMapper: {
    '\\.(css|less)$': 'identity-obj-proxy',
    '^@mediapipe/pose$': '<rootDir>/__mocks__/mediapipe.js',
  },
  moduleDirectories: ['node_modules', 'src'],
}