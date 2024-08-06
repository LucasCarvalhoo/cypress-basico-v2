// cypress/support/commands.ts

// Import Cypress types
// <reference types="cypress" />

Cypress.Commands.add('fillMandatoryFieldsAndSubmit', ()=> {
    cy.get('#firstName').type('Lucas')
    cy.get('#lastName').type('Carvalho')
    cy.get('#email').type('lucas@gmail.com')
    cy.get('#open-text-area').type('Texto', {delay: 0})
    cy.contains('button', 'Enviar').click()
})