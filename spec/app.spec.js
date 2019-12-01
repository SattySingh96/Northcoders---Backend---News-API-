process.env.NODE_ENV = "test";
const { expect } = require('chai');
const app = require("../app");
const request = require("supertest");
const connection = require('../db/connection');
const chai = require("chai");
const chaiSorted = require("chai-sorted");
chai.use(chaiSorted);

after(() => {
    connection.destroy();
})

beforeEach(() => {
    return connection.seed.run()
})

describe('app', () => {
    describe('/api', () => {
        it('status 404: Invalid path/url', () => {
            return request(app)
                .get('/not-a-real-path')
                .expect(404)
                .then(({ body: { msg } }) => {
                    expect(msg).to.equal('Invalid path/url')
                });
        });
        describe('/topics', () => {
            it('status 405: methods not allowed, Delete, Patch, Post & Put', () => {
                const methods = ['delete', 'post', 'patch', 'put'].map((method) => {
                    return request(app)[method]('/api/topics')
                        .expect(405)
                        .then(({ body: { msg } }) => {
                            expect(msg).to.equal('method not allowed on this path');
                        });
                });
                return Promise.all(methods);
            });
            describe('GET', () => {
                it('status 200: gets all topics, returns array of length 3, with each object having expected keys', () => {
                    return request(app)
                        .get('/api/topics')
                        .expect(200)
                        .then(({ body: { topics } }) => {
                            expect(topics).to.be.an('array');
                            expect(topics.length).to.equal(3);
                            expect(topics[0]).keys("slug", "description");
                        });
                });
            });
        });
        describe('/users', () => {
            describe('/:username', () => {
                it('status 405: methods not allowed, Delete, Patch, Post & Put', () => {
                    const methods = ['delete', 'post', 'patch', 'put'].map((method) => {
                        return request(app)[method]('/api/users/butter_bridge')
                            .expect(405)
                            .then(({ body: { msg } }) => {
                                expect(msg).to.equal('method not allowed on this path');
                            });
                    });
                    return Promise.all(methods);
                });
                describe('GET', () => {
                    it('status 200: return object, with 3 keys ', () => {
                        return request(app)
                            .get('/api/users/butter_bridge')
                            .expect(200)
                            .then(({ body: { user } }) => {
                                expect(user).keys('username', 'avatar_url', 'name')
                                expect(user).to.be.an('object')
                            })
                    });
                });
            });
        });
        describe('/articles', () => {
            describe('/:article_id', () => {
                it('status 405: methods not allowed, Delete, Put, Post', () => {
                    const methods = ['delete', 'put', 'post'].map((method) => {
                        return request(app)[method]('/api/articles/1')
                            .expect(405)
                            .then(({ body: { msg } }) => {
                                expect(msg).to.equal('method not allowed on this path');
                            });
                    });
                    return Promise.all(methods);
                });
                describe('GET', () => {
                    it('status 200: return object with 8 keys', () => {
                        return request(app)
                            .get('/api/articles/1')
                            .expect(200)
                            .then(({ body: { article } }) => {
                                expect(article).keys('article_id', 'votes', 'body', 'author', 'created_at', 'topic', 'title', 'comment_count');
                                expect
                            });
                    });
                    it('status 200: return object with key of comment-count, that has value of 13', () => {
                        return request(app)
                            .get('/api/articles/1')
                            .expect(200)
                            .then(({ body: { article } }) => {
                                expect(article.comment_count).is.equal('13')
                            });

                    });
                });
                describe('PATCH', () => {
                    it('status 200: return the patched article object', () => {
                        return request(app)
                            .patch('/api/articles/1')
                            .send({ 'inc_votes': 1 })
                            .expect(200)
                            .then(({ body: { votes } }) => {
                                expect(votes.votes).to.equal(101)
                            });
                    });
                    it('status 400: bad request - Incorrect data type in patch body', () => {
                        return request(app)
                            .patch('/api/articles/3')
                            .send({ 'inc_votes': '9' })
                            .expect(400)
                            .then(({ body: { msg } }) => {
                                expect(msg).to.equal('Bad Request')
                            });
                    });
                    it('status 404: Valid but non-existant article_id', () => {
                        return request(app)
                            .patch('/api/articles/20')
                            .send({ 'inc_votes': 1 })
                            .expect(404)
                            .then(({ body: { msg } }) => {
                                expect(msg).to.equal('article not found')
                            });
                    });
                });
            });
            describe('/:article_id/comments', () => {
                it('status 405: methods not allowed, Delete, Put, Patch ', () => {
                    const methods = ['delete', 'put', 'patch'].map((method) => {
                        return request(app)[method]('/api/articles/1/comments')
                            .expect(405)
                            .then(({ body: { msg } }) => {
                                expect(msg).to.equal('method not allowed on this path');
                            });
                    });
                    return Promise.all(methods);
                });
                describe('POST', () => {
                    it('status 201 - returns posted comment object, with 6 keys', () => {
                        return request(app)
                            .post('/api/articles/1/comments')
                            .send({ username: 'butter_bridge', body: 'Test comment' })
                            .expect(201)
                            .then(({ body }) => {
                                expect(body).keys('comment_id', 'author', 'article_id', 'votes', 'created_at', 'body')
                            });
                    });
                    it('status 400 - Number of columns in post body is less than the number of columns in the recipient table', () => {
                        return request(app)
                            .post('/api/articles/1/comments')
                            .send({ username: 'butter_bridge' })
                            .expect(400)
                            .then(({ body: { msg } }) => {
                                expect(msg).to.equal('bad request');
                            });
                    });
                    it('status 400 -Non-existant column included in the post body', () => {
                        return request(app)
                            .post('/api/articles/1/comments')
                            .send({ username: 'butter_bridge', comment_text: 'test-comment' })
                            .expect(400)
                            .then(({ body: { msg } }) => {
                                expect(msg).to.equal('bad request');
                            });
                    });
                    it('status 400 - Data types of column values do not match schema', () => {
                        return request(app)
                            .post('/api/articles/1/comments')
                            .send({ username: 'butter_bridge', comment_text: 14211 })
                            .expect(400)
                            .then(({ body: { msg } }) => {
                                expect(msg).to.equal('bad request');
                            });
                    });
                    it('status 422 - article_id given is valid, but doesn\'t exist yet', () => {
                        return request(app)
                            .post('/api/articles/9999/comments')
                            .send({ username: 'butter_bridge', body: 'test-comment' })
                            .expect(422)
                            .then(({ body: { msg } }) => {
                                expect(msg).to.equal('unprocessable entity')
                            });
                    });
                });
                describe('GET', () => {
                    it('Status 200 - Return array of comment objects, each having 5 keys, if the article exists', () => {
                        return request(app)
                            .get('/api/articles/1/comments')
                            .expect(200)
                            .then(({ body: { comments } }) => {
                                expect(comments[0]).keys('comment_id', 'author', 'votes', 'created_at', 'body')
                                expect(comments.length).to.equal(13)
                            });
                    });
                    it('Status 404 - article_id given is valid, but doesn\'t exist yet', () => {
                        return request(app)
                            .get('/api/articles/99999/comments')
                            .expect(404)
                            .then(({ body: { msg } }) => {
                                expect(msg).to.equal('article not found')
                            })
                    });
                    it('Status 200 - If no sort_by query is given, sort descendingly by "created_at" by default', () => {
                        return request(app)
                            .get('/api/articles/1/comments')
                            .expect(200)
                            .then(({ body: { comments } }) => {
                                expect(comments).to.be.sortedBy('created_at', { descending: true });
                            });
                    });
                    it('Status 200 - If given a sort_by query, sort comments by this criteria', () => {
                        return request(app)
                            .get('/api/articles/1/comments?sort_by=author')
                            .expect(200)
                            .then(({ body: { comments } }) => {
                                expect(comments).to.be.sortedBy('author', { descending: true });
                            });
                    });
                    it('Status 400 - If given an invalid sort_by column query', () => {
                        return request(app)
                            .get('/api/articles/1/comments?sort_by=title')
                            .expect(400)
                            .then(({ body: { msg } }) => {
                                expect(msg).to.equal('bad request')
                            });
                    });
                    it('Status 200 - If given an order query, order by desc by default', () => {
                        return request(app)
                            .get('/api/articles/1/comments?order=desc')
                            .expect(200)
                            .then(({ body: { comments } }) => {
                                expect(comments).to.be.descendingBy('created_at')
                            });
                    });
                    it('Status 200 - If given an order query of asc/desc, order by asc/desc', () => {
                        return request(app)
                            .get('/api/articles/1/comments?order=asc')
                            .expect(200)
                            .then(({ body: { comments } }) => {
                                expect(comments).to.be.ascendingBy('created_at')
                            });
                    });
                });
            });
            describe('/articles', () => {
                it('Status 405: methods not allowed, Delete, Patch, Post & Put', () => {
                    const methods = ['delete', 'patch', 'post', 'put'].map((method) => {
                        return request(app)[method]('/api/articles')
                            .expect(405)
                            .then(({ body: { msg } }) => {
                                expect(msg).to.equal('method not allowed on this path');
                            });
                    });
                    return Promise.all(methods);
                });
                describe('GET', () => {
                    it('Status 200: Return an array of articles objects, each having 8 keys', () => {
                        return request(app)
                            .get('/api/articles')
                            .expect(200)
                            .then(({ body: { articles } }) => {
                                expect(articles[0]).keys('article_id', 'title', 'body', 'votes', 'topic', 'author', 'created_at', 'comment_count')
                            });
                    });
                    it('Status 200: Comment_count key value should be equal to the number of comments refrenced on the article', () => {
                        return request(app)
                            .get('/api/articles')
                            .expect(200)
                            .then(({ body: { articles } }) => {
                                expect(articles[0].comment_count).equals('13')
                            });
                    });
                    describe('/articles?sort_by=', () => {
                        it('Status 200 - If no sort_by query is given, sort descendingly by "created_at" by default', () => {
                            return request(app)
                                .get('/api/articles')
                                .expect(200)
                                .then(({ body: { articles } }) => {
                                    expect(articles).to.be.sortedBy('created_at', { descending: true });
                                });
                        });
                        it('Status 200 - If given a sort_by query, sort comments by this criteria', () => {
                            return request(app)
                                .get('/api/articles?sort_by=author')
                                .expect(200)
                                .then(({ body: { articles } }) => {
                                    expect(articles).to.be.sortedBy('author', {
                                        descending: true
                                    });
                                });
                        });
                        it('Status 400 - If given an invalid sort_by column query', () => {
                            return request(app)
                                .get('/api/articles?sort_by=colour')
                                .expect(400)
                                .then(({ body: { msg } }) => {
                                    expect(msg).to.equal('bad request')
                                });
                        });
                    });
                    describe('/articles?order=', () => {
                        it('Status 200 - If given an order query, order by desc by default', () => {
                            return request(app)
                                .get('/api/articles/1/comments?order=desc')
                                .expect(200)
                                .then(({ body: { comments } }) => {
                                    expect(comments).to.be.descendingBy('created_at')
                                });
                        });
                        it('Status 200 - If given an order query of asc/desc, order by asc/desc', () => {
                            return request(app)
                                .get('/api/articles?order=asc')
                                .expect(200)
                                .then(({ body: { articles } }) => {
                                    expect(articles).to.be.ascendingBy('created_at')
                                });
                        });
                    });
                    describe.only('/articles?author=', () => {
                        it('Status 200 - If given an author query, return articles by that author', () => {
                            return request(app)
                                .get('/api/articles?author=butter_bridge')
                                .expect(200)
                                .then(({body:body}) => {
                                    console.log(body)
                                    expect(body).to.be.descendingBy('created_at')
                                    expect(body[0].author).to.equal('butter_bridge')
                                });
                        });
                        it('status 404 - where author is valid but non-existant at this time', () => {
                            return request(app)
                                .get('/api/articles?author=satnam_singh')
                                .expect(404)
                                .then(({ body: { msg } }) => {
                                    expect(msg).to.equal('No articles found')
                                });
                        });
                    });
                    describe('/articles?topic=', () => {
                        it('Status 200 - If given an topic query, return articles in that topic area', () => {
                            return request(app)
                                .get('/api/articles?topic=mitch')
                                .expect(200)
                                .then(({ body: { articles } }) => {
                                    expect(articles).to.be.descendingBy('created_at')
                                    expect(articles[0].topic).to.equal('mitch')
                                });
                        });
                        it('status 404 - where topic is valid but non-existant at this time', () => {
                            return request(app)
                                .get('/api/articles?topic=satnam')
                                .expect(404)
                                .then(({ body: { msg } }) => {
                                    expect(msg).to.equal('No articles found')
                                });
                        });
                    });
                });
            });
        });
        describe('/comments', () => {
            it('status 405 - Methods not allowed, PUT, POST', () => {
                const methods = ['put', 'post'].map((method) => {
                    return request(app)[method]('/api/comments/1')
                        .expect(405)
                        .then(({ body: { msg } }) => {
                            expect(msg).to.equal('method not allowed on this path');
                        });
                });
                return Promise.all(methods);
            });
            describe('/:comment_id', () => {
                describe('PATCH', () => {
                    it('status 200: return the patched comments object', () => {
                        return request(app)
                            .patch('/api/comments/1')
                            .send({ 'inc_votes': 1 })
                            .expect(200)
                            .then(({ body: { votes } }) => {
                                expect(votes.votes).to.equal(17)
                            });
                    });
                    it('status 400: bad request - Incorrect data type in patch body', () => {
                        return request(app)
                            .patch('/api/comments/3')
                            .send({ 'inc_votes': '9' })
                            .expect(400)
                            .then(({ body: { msg } }) => {
                                expect(msg).to.equal('Bad Request')
                            });
                    });
                    it('status 404:valid but non-existant id passed', () => {
                        return request(app)
                            .patch('/api/comments/20')
                            .send({ 'inc-votes': 1 })
                            .expect(404)
                            .then(({ body: { msg } }) => {
                                expect(msg).to.equal('Comment not found')
                            });
                    });
                });
                describe('DELETE', () => {
                    it('Status 204 ', () => {
                        return request(app)
                            .delete('/api/comments/1')
                            .expect(204)
                    });
                });
            });
        });
    });
});