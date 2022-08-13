// const auth = require('../../fixtures/auth.json')

// describe('page projects', () => {
//     it('successfully loads', () => {
//         cy.visit('/projects')
//         cy.url().should('include', "/login")
//     })

//     it('projects page', () => {
//         cy.visit('/login')
//         cy.url().should('include', '/login')
//         cy.get('.login_input > input[name=email]').type(auth.email)
//         cy.get('.login_input > input[name=password]').type(auth.password)
//         cy.get('.login_form_reset > button').click()
//         cy.url().should('include', '/projects')

//         cy.get('thead').should('contain', 'Project Name')
//         cy.get('div.pageHeader_userDetails').should('contain', 'INNOCEAN WORLDWIDE')
//         cy.get('div.pageHeader_userDetails').should('contain', 'User FirstName LastName')
//     })

//     it('project table', () => {
//         cy.url().should('include', '/projects')

//         // table header
//         cy.get('thead').should('be.visible')
//         cy.get('thead').should('contain', 'Project Name')
//         cy.get('thead').should('contain', 'Brand')
//         cy.get('thead').should('contain', 'Live Status')
//         cy.get('thead').should('contain', 'Version')
//         cy.get('thead').should('contain', 'Preview')
//         cy.get('thead').should('contain', 'Created')
//         cy.get('thead').should('contain', 'Last Updated')

//         // table body
//         cy.get('tbody').should('be.visible')
//         cy.get('tbody > tr > td > button').should('be.visible')
//         cy.get('tbody > tr > td > p > a').should('be.visible')
//     })

//     it('go to review', () => {
//         cy.url().should('include', '/projects')
//         cy.get('tbody > tr:first > td > button').click()
//         cy.url().should('include', '/review')
//     })

//     it('go to project', () => {
//         cy.go('back')
//         cy.url().should('include', '/projects')
//         cy.get('tbody > tr:first > td > p > a').click()
//     })
// })
