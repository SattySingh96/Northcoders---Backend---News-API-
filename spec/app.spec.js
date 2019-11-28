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
          return request(app)
          [method]('/api/topics')
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
              //console.log(topics);
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
            return request(app)
            [method]('/api/users/butter_bridge')
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
            return request(app)
            [method]('/api/articles/1')
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
              .then(({ body: { articles } }) => {
                console.log(articles)
                expect(articles).keys('article_id', 'votes', 'body', 'author', 'created_at', 'topic', 'title', 'comment_count');
                expect
              });
          });
          it('status 200: return object with key of comment-count, that has value of 13', () => {
            return request(app)
              .get('/api/articles/1')
              .expect(200)
              .then(({ body: { articles } }) => {
                expect(articles.comment_count).is.equal('13')
              });

          });
        });
        describe('PATCH', () => {
          it('status 200: return the patched article object', () => {
            return request(app)
              .patch('/api/articles/1')
              .send({ 'inc-votes': 1 })
              .expect(200)
              .then(({ body: { patchedBody } }) => {
                expect(patchedBody.votes).to.equal(101)
              });
          });
          it('status 400: bad request - Incorrect data type in patch body', () => {
            return request(app)
              .patch('/api/articles/3')
              .send({ 'inc-votes': '9' })
              .expect(400)
              .then(() => {
                console.log()
              });
          });
          xit('status 400: bad request - invalid id passed', () => {
            return request(app)
              .patch('/api/articles/20')
              .send({ 'inc-votes': 1 })
              .expect(404)
              .then(({ body: { msg } }) => {
                expect(msg).to.equal('invalid path/url')
              });
          });
        });
      });
      describe('/:article_id/comments', () => {
        it('status 405: methods not allowed, Delete, Put, Patch ', () => {
          const methods = ['delete', 'put', 'patch'].map((method) => {
            return request(app)
            [method]('/api/articles/1/comments')
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
          it('status 422 - article_id given is non-existant', () => {
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
          it('status 200 - return array of comment objects, each having 5 keys', () => {
            return request(app)
              .get('/api/articles/1/comments')
              .expect(200)
              .then(({ body }) => {
                expect(body[0]).keys('comment_id', 'author', 'votes', 'created_at', 'body')
                expect(body.length).to.equal(13)
              });
          });
          it('Status 200 - Sorts_by created_at by default, if no sort_by query is given', () => {
            return request(app)
              .get('/api/articles/1/comments')
              .expect(200)
              .then(({ body }) => {
                expect(body).to.be.sortedBy('created_at')
              });
          });
          it('Status 200 - If given a sort_by query, sort comments by this criteria', () => {

          });
        });
      });
    });
  });
});