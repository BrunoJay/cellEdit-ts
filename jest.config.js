module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/dist/'],
  collectCoverageFrom: [
    'src/app/**/*.ts',
    '!src/app/**/*.spec.ts',
    '!src/app/**/*-model.ts',
    '!src/app/**/*-models.ts',
    '!src/app/**/*-service.ts',
    '!src/app/**/*-services.ts',
    '!src/app/**/*-component.ts',
    '!src/app/**/*-components.ts',
    '!src/app/**/*-directive.ts',
    '!src/app/**/*-directives.ts',
  ],
  coverageReporters: ['text', 'lcov'],
  moduleNameMapper: {
    '@app/(.*)': '<rootDir>/src/app/$1',
    '@assets/(.*)': '<rootDir>/src/assets/$1',
    '@core/(.*)': '<rootDir>/src/app/core/$1',
    '@env': '<rootDir>/src/environments/environment',
    '@shared/(.*)': '<rootDir>/src/app/shared/$1',
  },
};