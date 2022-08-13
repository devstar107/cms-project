const auth = require('../../fixtures/auth.json')

describe('page index', () => {
  it('successfully loads', () => {
    cy.visit('/')
    cy.url().should('include', "/")
    cy.get('.logo').should('be.visible')
  })

  it('footer', () => {
    cy.get('.login_footer')
    cy.get('.login_footer > .links').contains('Home')
    cy.get('.login_footer > .links').contains('About')
  })

  it('form check', () => {
    cy.get('.login_input').within(() => {
        cy.get('input[name=email]').should('have.attr', 'type', 'text').should('be.visible')
        cy.get('input[name=password]').should('have.attr', 'type', 'password').should('be.visible')
    })
    cy.get('.login_form_reset').contains('Reset password').should('be.visible')
    cy.get('.login_form_reset > button').should('be.visible')
  })

  it('user login', () => {
    cy.visit('/login')
    cy.get('.login_form_reset').contains('Reset password').should('be.visible')
    cy.get('.login_form_reset > button').should('be.visible')

    // verify login form
    cy.get('.login_input > input[name=email]').should('have.attr', 'type', 'text').should('be.visible')
    cy.get('.login_input > input[name=password]').should('have.attr', 'type', 'password').should('be.visible')

    // authenticate user
    cy.get('.login_input > input[name=email]').type(auth.email)
    cy.get('.login_input > input[name=password]').type(auth.password)
    cy.get('.login_form_reset > button').click()
    cy.url().should('include', '/projects')

    // projects page test
    cy.get('thead').should('contain', 'Project Name')
    cy.get('div.pageHeader_userDetails').should('contain', 'INNOCEAN WORLDWIDE')
    cy.get('div.pageHeader_userDetails').should('contain', 'User FirstName LastName')
  })

})
