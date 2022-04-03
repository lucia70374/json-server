/// <reference types='cypress' />

describe('Update Request', () => {
   

    it('Update existing post via the Posts API', () => {
        cy.request({
            method: 'PUT',
            url: 'http://localhost:3000/posts/2',
            body: {
                title: 'Where can I buy apples?',
                author: 'Tom Jones'
            }
        }).then(response => {
            expect(response.status).to.eql(200)
        })
    })
})