describe('Note app', function () {
	beforeEach(function () {
		cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
		const user = {
			name: 'Nuno Araújo',
			username: 'nuno',
			password: 'nuno',
		}
		cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
		cy.visit('')
	})

	it('front page can be opened', function () {
		cy.contains('Notes')
		cy.contains('Note app, Department of Computer Science, University of Helsinki 2023')
	})

	it('login form can be opened', function () {
		cy.contains('log in').click()
	})

	it('user can login', function () {
		cy.contains('log in').click()
		cy.get('#username').type('nuno')
		cy.get('#password').type('nuno')
		cy.get('#login-button').click()

		cy.contains('Nuno Araújo logged in')
	})

	it('login fails with wrong password', function () {
		cy.contains('log in').click()
		cy.get('#username').type('nuno')
		cy.get('#password').type('wrong')
		cy.get('#login-button').click()

		cy.get('.error').should('contain', 'wrong credentials').and('have.css', 'color', 'rgb(255, 0, 0)').and('have.css', 'border-style', 'solid')
		cy.get('html').should('not.contain', 'Nuno Araújo logged in')
	})

	describe('when logged in', function () {
		describe('and several notes exist', function () {
			beforeEach(function () {
				cy.login({ username: 'nuno', password: 'nuno' })
				cy.createNote({ content: 'first note', important: false })
				cy.createNote({ content: 'second note', important: false })
				cy.createNote({ content: 'third note', important: false })
			})

			it('one of those can be made important', function () {
				cy.contains('second note').parent().find('button').as('theButton')
				cy.get('@theButton').click()
				cy.get('@theButton').should('contain', 'make not important')
			})
		})
	})
})
