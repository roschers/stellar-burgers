import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:4000',
    supportFile: 'cypress/support/index.ts',
    specPattern: 'cypress/integration/**/*.spec.ts',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    // Отключаем overlay и улучшаем стабильность тестов
    chromeWebSecurity: false,
    viewportWidth: 1280,
    viewportHeight: 720,
    video: false,
    screenshotOnRunFailure: false,
    defaultCommandTimeout: 10000,
    requestTimeout: 10000,
    responseTimeout: 10000,
    pageLoadTimeout: 30000,
    // Отключаем проверки на перекрытие элементов
    waitForAnimations: false,
    animationDistanceThreshold: 5,
  },
}); 