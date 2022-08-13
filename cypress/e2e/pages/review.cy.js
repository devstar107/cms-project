// const auth = require('../../fixtures/auth.json')

// describe('page review', () => {
//   it('successfully loads', () => {
//         cy.visit('/review')
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

//     it('go to review', () => {
//         cy.url().should('include', '/projects')
//         cy.get('tbody > tr:first > td > button').click()
//         cy.url().should('include', '/review')
//     })

//     it('review page', () => {
//         cy.url().should('include', '/review')
//         cy.get('.brand-logo img').should('be.visible')

//         // side menu
//         cy.get('.configre').should('be.visible')
//         cy.get('.configre > .configre_header').should('be.visible')
//         cy.get('.configre > .menu').should('be.visible')
//         cy.get('.menu > .exteriorColors').should('be.visible')
//         cy.get('.exteriorColors > .exteriorColors_title').should('be.visible')
//         cy.get('.exteriorColors > .exteriorColors_multiple').should('be.visible')
//         cy.get('.exteriorColors > .exteriorColors_nameColor').should('be.visible')
//         cy.get('.exteriorColors > .interiorColors_title').should('be.visible')
//         cy.get('.exteriorColors > .interiorColors_multiple').should('be.visible')
//         cy.get('.exteriorColors > .interiorColors_nameColor').should('be.visible')
//         cy.get('.configre > .configre_logout').should('be.visible')

//         // top menu
//         cy.get('.car-images').should('be.visible')
//         cy.get('.car-images > .viewport_bar').should('be.visible')
//         cy.get('.car-images > .viewport > .main').should('be.visible')
//         cy.get('.car-images > .viewport > .main > img').should('be.visible')
//     })

//     it('rotate car', () => {
//         cy.url().should('include', '/review')
//         cy.get('.brand-logo img').should('be.visible')

//         // rotate car
//         cy.get('.car-images > .viewport > .main').trigger('mousedown').trigger('mousemove', { clientX: 0, clientY: 0 }).should('be.visible')
//         cy.get('.car-images > .viewport > .main').trigger('mousedown').trigger('mousemove', { clientX: 100, clientY: 0 }).should('be.visible')
//         cy.get('.car-images > .viewport > .main').trigger('mousedown').trigger('mousemove', { clientX: -100, clientY: 0 }).should('be.visible')
//         cy.get('.car-images > .viewport > .main').trigger('mousedown').trigger('mousemove', { clientX: 180, clientY: 0 }).should('be.visible')
//         cy.get('.car-images > .viewport > .main').trigger('mousedown').trigger('mousemove', { clientX: -180, clientY: 0 }).should('be.visible')
//         cy.get('.car-images > .viewport > .main').trigger('mousedown').trigger('mousemove', { clientX: 360, clientY: 0 }).should('be.visible')
//     })

//     it('select trims', () => {
//         cy.url().should('include', '/review')
//         cy.get('.brand-logo img').should('be.visible')

//         cy.get('.configre_trims').click()
//         cy.get('.MuiButtonBase-root').should('be.visible')
//         cy.get('.MuiList-root li').should('be.visible')
//     })

//     // it('select ext color', () => {
//     //     cy.url().should('include', '/review')
//     //     cy.get('.brand-logo img').should('be.visible')
//     // })

//     // it('select int color', () => {
//     //     cy.url().should('include', '/review')
//     //     cy.get('.brand-logo img').should('be.visible')
//     // })

//     it('select cameras', () => {
//         cy.url().should('include', '/review')

//         cy.root().click()
//         cy.get('.configre_cameras .selectWrapper').click()
//         cy.get('.MuiButtonBase-root').should('be.visible')
//         cy.get('.MuiList-root li').should('be.visible')
//     })
// })
