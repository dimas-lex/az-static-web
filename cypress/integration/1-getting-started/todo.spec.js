/// <reference types="cypress" />

// Welcome to Cypress!
//
// This spec file contains a variety of sample tests
// for a todo list app that are designed to demonstrate
// the power of writing tests in Cypress.
//
// To learn more about how Cypress works and
// what makes it such an awesome testing tool,
// please read our getting started guide:
// https://on.cypress.io/introduction-to-cypress

describe('example to-do app', () => {
  beforeEach(() => {
    // Cypress starts out with a blank slate for each test
    // so we must tell it to visit our website with the `cy.visit()` command.
    // Since we want to visit the same URL at the start of all our tests,
    // we include it in our beforeEach function so that it runs before each test
    cy.visit('/')
  })

  it('displays two todo items by default', () => {
    cy.get('.App').should('have.length', 1).should('be.visible');
    cy.get('.weather').should('have.length', 1).should('be.visible');
    cy.get('.weather-title').should('have.length', 1).should('be.visible');
    cy.get('.AppRates').should('have.length', 1).should('be.visible');
    cy.get('.AppRates').should('have.length', 1).should('be.visible');
    cy.get('.cy-rates').should('have.length', 1).should('be.visible');
    cy.get('.cy-rates-table').should('have.length', 1).should('be.visible');
    cy.get('.cy-rate-row').should('have.length', 123).should('be.visible');
    cy.contains('Clear completed').should('not.exist')

  })

  it('can add new todo items', () => {

      cy.contains('Clear completed').should('not.exist')

  })
})
