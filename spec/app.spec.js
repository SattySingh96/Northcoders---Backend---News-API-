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
    describe('/topics', () => {
      describe('GET', () => {
        it('status 200: gets all topics, and returns array of length 3, with each object having expected keys', () => {
          return request(app)
            .get('/api/topics')
            .expect(200)
            .then(({ body: { topics } }) => {
              console.log(topics);
              expect(topics).to.be.an('array');
              expect(topics.length).to.equal(3);
              expect(topics[0]).keys("slug", "description");
            });
        });
        it('status 404: Invalid path/url', () => {
          return request(app)
            .get('/api/topicz')
            .expect(404)
            .then(({ body: { topics } }) => {
              expect()
            });
        });
      });
    });
  });
});