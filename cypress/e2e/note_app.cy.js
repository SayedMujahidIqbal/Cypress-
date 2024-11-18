describe('Note', () => {
  beforeEach(() => {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      name: 'Munjeete',
      username: 'superuser',
      password: 'root'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
    cy.visit('')
  })

  it('front page can be opened', () => {
    cy.contains('Notes')
    cy.contains('Note app, Department of Computer Science, University of Helsinki 2024')
  })

  it('login form can be opened', () => {
    cy.contains('login').click()
  })

  it('can login', () => {
    cy.contains('login').click()
    cy.get('#username').type('superuser')
    cy.get('#password').type('root')
    cy.get('#login-button').click()

    cy.contains('Munjeete logged-in')
  })

  it('login fails with wrong password', () => {
    cy.contains('login').click()
    cy.get('#username').type('superuser')
    cy.get('#username').type('root')
    cy.get('#login-button').click()

    cy.get('.error').should('contain', 'Wrong credentials')

    cy.get('html').should('not.contain', 'Munjeete logged-in')
    /// OR ////
    cy.contains('Munjeete logged-in').should('not.exist')
  })

  describe('when logged in', () => {
    describe('and several notes exist', () => {
      beforeEach(() => {
        // cy.contains('login').click()
        // cy.get('#username').type('superuser')
        // cy.get('#password').type('root')
        // cy.get('#login-button').click()   
        
        /////// By passing the UI /////////////
        cy.login({ username: 'superuser', password: 'root' })
        cy.createNote({ content: 'first note', important: false })
        cy.createNote({ content: 'second note', important: false })
        cy.createNote({ content: 'third note', important: false })
      })

      it('one of those can be made important', () => {
        cy.contains('second note').parent().find('button').as('theButton')
          cy.get('@theButton').click()

        cy.get('@theButton')
          .should('contain', 'make not important')
      })

      it('then example', () => {
        cy.get('button').then(buttons => {
          console.log('number of buttons', buttons.length)
          cy.wrap(buttons[0]).click()
        })
      })
    })
  })
  
})