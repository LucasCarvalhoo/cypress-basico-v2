// <reference types="Cypress" />

// describe define o suite de teste, e o bloco it, define um caso de teste.
describe('Central de Atendimento ao Cliente TAT', function() {
  const THREE_SECONDS_IN_MS = 3000
  beforeEach(() => {
    cy.visit('../../src/index.html')
  })

  // verifica o titulo da pagina
  it('verifica o titulo da aplicacao', function() {
      cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT') 
  })

  it('preenche os campos obrigatoris e envia o formulario', function(){
    const longText = 'teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste'

    cy.clock()

    cy.get('#firstName').type('Lucas')
    cy.get('#lastName').type('Carvalho')
    cy.get('#email').type('lucas@gmail.com')
    cy.get('#open-text-area').type(longText, {delay: 0})
    cy.contains('button', 'Enviar').click()

    cy.get('.success').should('be.visible')

    cy.tick(THREE_SECONDS_IN_MS)

    cy.get('.success').should('not.be.visible')
  })

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){
    const longText = 'teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste'

    cy.clock()

    cy.get('#firstName').type('Lucas')
    cy.get('#lastName').type('Carvalho')
    cy.get('#email').type('lucasgmail.com')
    cy.get('#open-text-area').type(longText, {delay: 0})
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')

    cy.tick(THREE_SECONDS_IN_MS)

    cy.get('.error').should('not.be.visible')
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

    cy.clock()

    cy.get('#firstName').type('Lucas')
    cy.get('#lastName').type('Carvalho')
    cy.get('#email').type('lucas@gmail.com')
    cy.get('#phone-checkbox').click()
    cy.get('#open-text-area').type('texto')
    cy.contains('button', 'Enviar').click()
    
    cy.get('.error').should('be.visible')

    cy.tick(THREE_SECONDS_IN_MS)
    cy.get('.error').should('not.be.visible')
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

  it('seleciona um arquivo da pasta fixtures', function(){
    cy.get('input[type="file"]')
    .should('not.have.value')
    .selectFile('cypress/fixtures/example.json')
    .should(($input) => {
      const inputElement = $input[0] as HTMLInputElement;
      expect(inputElement.files[0].name).to.equal('example.json');
    });
  })

  it('seleciona um arquivo simulando um drag-and-drop', function() {
    cy.get('input[type="file"]')
      .should('not.have.value')
      .selectFile('cypress/fixtures/example.json', { action: 'drag-drop' })
      .should(($input) => {
        const inputElement = $input[0] as HTMLInputElement;
        expect(inputElement.files[0].name).to.equal('example.json');
      });
  });
  

  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function(){
    cy.fixture('example.json').as('sampleFile')
    cy.get('input[type="file"]')
      .selectFile('@sampleFile')
  })

  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function(){
    // Verifica se o link dentro do elemento com id 'privacy' possui o atributo target='_blank'
    cy.get('#privacy a').should('have.attr', 'target', '_blank')
  })

  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function(){
    cy.get('#privacy a').invoke('removeAttr', 'target').click() // remove o atributo target
    cy.contains('Talking About Testing').should('be.visible') // verificar se algum texto está visivel na pagina
  })

  it('testa a página da política de privacidade de forma independente', function(){
    cy.get('#privacy a').invoke('removeAttr', 'target').click() // remove o atributo target

    // testes da pagina de politica de privacidade
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT - Política de privacidade')
  })

  it('exibe mensagem por 3 segundos', function(){
    cy.clock()
    cy.get('.button').click()
    cy.get('.error').should('be.visible')

    cy.tick(3000)
    cy.get('.error').should('not.be.visible')
  })

  Cypress._.times(5, () => {
    it('preenche os campos obrigatoris e envia o formulario', function(){
      const longText = 'teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste'

    cy.clock()

    cy.get('#firstName').type('Lucas')
    cy.get('#lastName').type('Carvalho')
    cy.get('#email').type('lucas@gmail.com')
    cy.get('#open-text-area').type(longText, {delay: 0})
    cy.contains('button', 'Enviar').click()

    cy.get('.success').should('be.visible')

    cy.tick(THREE_SECONDS_IN_MS)

    cy.get('.success').should('not.be.visible')
    })
  })

  it('simulates sending a CTRL+V command to paste a long text on a textarea field', function(){
    const longText = Cypress._.repeat('0123456789', 20) // ctrl+c e ctrl+v 20 vezes

    // aqui ele simula a digitação do texto
    //cy.get('#open-text-area').type(longText, {delay: 0}).should('have.value', longText) 

    // o comando .invoke inseri o texto no campo de uma vez sem a necessidade de um delay
    cy.get('textarea').invoke('val', longText).should('have.value', longText)
  })

  it('exibe e esconde as mensagens de sucesso e erro usando o .invoke', () => {
    cy.get('.success')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
      .and('contain', 'Mensagem enviada com sucesso.')
      .invoke('hide')
      .should('not.be.visible')
    cy.get('.error')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
      .and('contain', 'Valide os campos obrigatórios!')
      .invoke('hide')
      .should('not.be.visible')
  })

  it('preenche a area de texto usando o comando invoke', function(){
    const longText = '123467'

    cy.get('#open-text-area').invoke('val', longText).should('have.value', longText)
  })

  it('faz uma requisição HTTP', function(){
    cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
  })

  it.only('encontre o gato', function(){
    cy.get('#cat').invoke('show').should('be.visible')
  })
})
