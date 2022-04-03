/// <reference types='cypress' />

const { isNumber } = require("lodash");

describe('Post, Get, Delete Request', () => {
    let comments = new Array();
    //let idOfPosts = new Array();
    let comment = Math.random().toString(36).substring(1) + Math.random().toString(36).substring(1);
    let randomId = Math.floor(Math.random() * 1000 + 1);
    

    it('Create a new comment', () => {
        cy.request({
            method: 'POST',
            url: 'http://localhost:3000/comments',
            body: {
                body: comment,
                postId: randomId
            }
        }).then(response => {
            expect(response.status).to.eql(201)
        })
       
    })
    it('Locate and assert the new comment', () => {
        cy.request({
            method: 'GET',
            url: 'http://localhost:3000/comments',
            headers: {
              accept: 'application/json'
            }
        }).then(response => {
            let body = JSON.parse(JSON.stringify(response.body))
            body.forEach(function(item) {
                comments.push(item['body'])
            })
           // body.forEach(function(item) {
           //     idOfPosts.push(item[randomId])
           // })
        }).then(() => {
            let latestPost = comments[comments.length -1];
            //let lastPost = idOfPosts[idOfPosts.length -1];
            expect(latestPost).to.eq(comment);
            
            //expect(lastPost).to.eq(randomId);
        })

       
    })
    it('Delete the new comment', () => {
        cy.request({
            method: 'DELETE',
            url: 'http://localhost:3000/comments/' + comments.length
            
        }).then(response => {
            expect(response.status).to.eql(200)
        })
    })
})