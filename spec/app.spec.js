process.env.NODE_ENV = "test";
const { expect } = require('chai');
const app = require("../app");
const request = require("supertest");
const connection = require('../db/connection');

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
                console.log(user)
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
                console.log(articles);
              });
          });
        });
        //come back to patch
        describe('PATCH', () => {
          it('status 200: return the patched article object', () => {
            return request(app)
              .patch('/api/articles/1')
              .send({})
              .expect(200)
              .then(() => { })

          })

        });
      });
    });
  });
});