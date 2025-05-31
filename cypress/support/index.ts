import '@4tw/cypress-drag-drop';

// Команда для ожидания загрузки приложения
Cypress.Commands.add('waitForApp', () => {
  cy.get('[data-cy="burger-ingredients"]', { timeout: 15000 }).should('be.visible');
});

// Команда для принудительного клика с обходом overlay
Cypress.Commands.add('forceClick', { prevSubject: 'element' }, (subject) => {
  cy.wrap(subject).click({ force: true });
}); 