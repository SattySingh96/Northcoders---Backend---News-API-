process.env.NODE_ENV = "test";
const { expect } = chai;
const app = require("../app");
const request = require("supertest");

const connection = require("../db/connection");

describe('app', () => {
  describe('/api', () => {
    describe('/topics', () => {
      describe('GET', () => {
        it('status 200: ', () => {

        }
      });
    });
  });
});