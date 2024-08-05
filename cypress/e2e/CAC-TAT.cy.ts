// <reference types="Cypress" />

// describe define o suite de teste, e o bloco it, define um caso de teste.
describe('Central de Atendimento ao Cliente TAT', function() {
  beforeEach(() => {
    cy.visit('../../src/index.html')
  })

  // verifica o titulo da pagina
  it('verifica o titulo da aplicacao', function() {
      cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT') 
  })

  it('preenche os campos obrigatoris e envia o formulario', function(){
    const longText = 'teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste'

    cy.get('#firstName').type('Lucas')
    cy.get('#lastName').type('Carvalho')
    cy.get('#email').type('lucas@gmail.com')
    cy.get('#open-text-area').type(longText, {delay: 0})
    cy.get('button[type="submit"]').click()

    cy.get('.success').should('be.visible')
  })

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){
    const longText = 'teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste'

    cy.get('#firstName').type('Lucas')
    cy.get('#lastName').type('Carvalho')
    cy.get('#email').type('lucasgmail.com')
    cy.get('#open-text-area').type(longText, {delay: 0})
    cy.get('button[type="submit"]').click()

    cy.get('.error').should('be.visible')
  })

  it('validar se o que estar sendo digitado no campo telefone é numerico', function(){
    cy.get('#phone').type('88888888')

    cy.get('#phone').invoke('val').then((value: string) => {
      const text = value.toString().trim();
      
      // Verifique se o valor é um número
      if (!isNaN(Number(text)) && text !== '') {
        cy.log('O valor é um número');
      } else {
        cy.log('O valor é um texto');
      }
    })
  })
})
