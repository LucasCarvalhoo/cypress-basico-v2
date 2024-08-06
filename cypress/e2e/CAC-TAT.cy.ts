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
    cy.contains('button', 'Enviar').click()

    cy.get('.success').should('be.visible')
  })

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){
    const longText = 'teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste'

    cy.get('#firstName').type('Lucas')
    cy.get('#lastName').type('Carvalho')
    cy.get('#email').type('lucasgmail.com')
    cy.get('#open-text-area').type(longText, {delay: 0})
    cy.contains('button', 'Enviar').click()

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

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){

    cy.get('#firstName').type('Lucas')
    cy.get('#lastName').type('Carvalho')
    cy.get('#email').type('lucas@gmail.com')
    cy.get('#phone-checkbox').click()
    cy.get('#open-text-area').type('texto')
    cy.contains('button', 'Enviar').click()
    
    cy.get('.error').should('be.visible')
  })

  it('preenche e limpa os campos nome, sobrenome, email e telefone', function(){
    cy.get('#firstName').type('Lucas').should('have.value', 'Lucas')
    cy.get('#firstName').clear().should('have.value', '')

    cy.get('#lastName').type('Carvalho').should('have.value', 'Carvalho')
    cy.get('#lastName').clear().should('have.value', '')

    cy.get('#email').type('lucas@gmail.com').should('have.value', 'lucas@gmail.com')
    cy.get('#email').clear().should('have.value', '')
  })

  it('envia o formuário com sucesso usando um comando customizado', function(){
    cy.fillMandatoryFieldsAndSubmit()

    cy.get('.success').should('be.visible')
  })

  it('seleciona um produto (YouTube) por seu texto', function(){
    cy.get('#product').select('YouTube').should('have.value', 'youtube');
  })

  it('seleciona um produto (Mentoria) por seu valor (value)', function(){
    cy.get('#product').select('Mentoria').should('have.value', 'mentoria')
  })

  it('seleciona um produto (Blog) por seu índice', function(){
    cy.get('#product').select('Blog').should('have.value', 'blog')
  })

  it('marca o tipo de atendimento "Feedback"', function(){
    cy.get('input[type="radio"][value="feedback"]').check()
  }) 

  it('marca cada tipo de atendimento', function(){
    cy.get('input[type="radio"][value="ajuda"]').check().should('be.checked', 'ajuda')
    cy.get('input[type="radio"][value="elogio"]').check().should('be.checked', 'elogio')
    cy.get('input[type="radio"][value="feedback"]').check().should('be.checked', 'feedback')
  }) 

  it('marca o meio de contato preferencial', function(){
    cy.get('input[type="checkbox"][value="email"]').check()
  }) 

  it('marca ambos checkboxes, depois desmarca o último', function(){
    cy.get('input[type="checkbox"][value="email"]').check()
    cy.get('input[type="checkbox"][value="phone"]').check()
    cy.get('input[type="checkbox"][value="phone"]').uncheck().should('not.be.checked')
  }) 

  it.only('seleciona um arquivo da pasta fixtures', function(){
    cy.get('input[type="file"]').selectFile('cypress/fixtures/example.json')
  })
})
