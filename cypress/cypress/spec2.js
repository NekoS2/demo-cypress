describe('Teste End-to-End', () => {
  it('Teste 1: Visita Página', () => {
    // Abre a página inicial da micro-livraria.
    cy.visit('http://localhost:5000/')
  })

  it('Teste 2: Verifica item na página', () => {
    // Verifica se o livro Design Patterns está no catálogo.
    cy.visit('http://localhost:5000/')
    cy.get('[data-id=3]').should('contain.text', 'Design Patterns')
  })

  it('Teste 3: Calcula Frete', () => {
    cy.visit('http://localhost:5000/')

    // Informa o CEP e solicita o cálculo do frete.
    cy.get('[data-id=3]').within(() => {
      cy.get('input').type('10000-000')
      cy.contains('Calcular Frete').click()
    })

    // Confirma que o sistema exibiu o valor do frete.
    cy.get('.swal-text', { timeout: 10000 })
      .should('contain.text', 'O frete é: R$')

    // Fecha a janela de resultado.
    cy.get('.swal-button').click()
  })

  it('Teste 4: Compra um livro', () => {
    cy.visit('http://localhost:5000/')

    // Seleciona o livro Design Patterns e realiza a compra.
    cy.get('[data-id=3]').within(() => {
      cy.contains('Comprar').click()
    })

    // Verifica a mensagem de confirmação da compra.
    cy.get('.swal-text', { timeout: 10000 })
      .should('contain.text', 'Sua compra foi realizada com sucesso')

    // Fecha a janela de confirmação.
    cy.get('.swal-button').click()
  })
})
