module.exports = {
  preset: 'jest-preset-angular',
  globalSetup: 'jest-preset-angular/global-setup',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/dist/',
    '<rootDir>/src/test.ts' // Ignorar arquivo problemático
  ],
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1'
  },
  transformIgnorePatterns: [
    'node_modules/(?!.*\\.mjs$)'
  ],
  testEnvironmentOptions: {
    // Configurações específicas do ambiente
  }
  
};