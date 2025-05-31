declare namespace Cypress {
  interface Chainable {
    drag(subject: string, target: string, options?: { force?: boolean }): Chainable<Element>;
    waitForApp(): Chainable<Element>;
    forceClick(): Chainable<Element>;
  }
} 