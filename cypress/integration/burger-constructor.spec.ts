/// <reference types="cypress" />
/// <reference types="@4tw/cypress-drag-drop" />

describe('Конструктор бургера', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as('getIngredients');
    cy.intercept('POST', 'https://norma.nomoreparties.space/api/orders', { fixture: 'order.json' }).as('createOrder');
    cy.intercept('GET', 'https://norma.nomoreparties.space/api/auth/user', { fixture: 'user.json' }).as('getUser');
    
    // Устанавливаем токен авторизации
    window.localStorage.setItem('accessToken', 'test-access-token');
    window.localStorage.setItem('refreshToken', 'test-refresh-token');
    
    cy.visit('/');
    cy.wait('@getIngredients');
    cy.waitForApp();
  });

  it('должен добавлять ингредиенты в конструктор', () => {
    // Добавляем булку
    cy.contains('Краторная булка N-200i').parent().find('button').forceClick();
    
    // Добавляем начинку
    cy.contains('Биокотлета из марсианской Магнолии').parent().find('button').forceClick();
    
    // Проверяем, что ингредиенты добавились в конструктор
    cy.get('[data-cy="burger-constructor"]').should('contain', 'Краторная булка N-200i (верх)');
    cy.get('[data-cy="burger-constructor"]').should('contain', 'Биокотлета из марсианской Магнолии');
  });

  it('должен открывать и закрывать модальное окно ингредиента', () => {
    // Кликаем на ингредиент для открытия модального окна
    cy.contains('Краторная булка N-200i').forceClick();
    
    // Проверяем, что модальное окно открылось
    cy.get('[data-cy="modal"]').should('exist');
    cy.get('[data-cy="modal"]').should('contain', 'Краторная булка N-200i');
    
    // Закрываем модальное окно через клик на overlay
    cy.get('[data-cy="modal-overlay"]').forceClick();
    
    // Проверяем, что модальное окно закрылось
    cy.get('[data-cy="modal"]').should('not.exist');
  });

  it('должен создавать заказ', () => {
    // Добавляем булку
    cy.contains('Краторная булка N-200i').parent().find('button').forceClick();
    
    // Добавляем начинку
    cy.contains('Биокотлета из марсианской Магнолии').parent().find('button').forceClick();
    
    // Создаём заказ
    cy.intercept('POST', 'api/orders', { fixture: 'order.json' }).as('createOrder');
    cy.contains('Оформить заказ').forceClick();
    
    // Проверяем, что запрос на создание заказа был отправлен
    cy.wait('@createOrder');
    
    // Проверяем, что модальное окно с номером заказа открылось
    cy.get('[data-cy="modal"]').should('exist');
    cy.get('[data-cy="order-number"]').should('contain', '12345');
  });
}); 