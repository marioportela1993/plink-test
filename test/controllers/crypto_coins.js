const request = require('supertest');

const app = require('../../app.js');
const cryptoCoinFactory = require('../factory/crypto_coins');
const userFactory = require('../factory/users');

const { crypto: testCryptoCoin } = require('../fixtures/crypto_coins');
const { user: testUser } = require('../fixtures/users');

const VALID_RESPONSE_CODE = 200;
// const INVALID_SCHEMA_CODE = 422;
const UNAUTHORIZED_CODE = 401;
const DATA_ALREADY_EXIST_CODE = 409;
const INVALID_CRYPTO_ID_CODE = 500;

describe('controllers', () => {
  describe('crypto_coins', () => {
    describe('POST /users/cryptos/:id', () => {
      it('Should add crypto to user user successfully', () =>
        userFactory
          .create()
          .then(() =>
            request(app)
              .post('/users/login')
              .send({ username: testUser.username, password: testUser.password })
          )
          .then(response =>
            request(app)
              .post(`/users/cryptos/${testCryptoCoin.coinId}`)
              .set({ authorization: response.body.token })
          )
          .then(response => {
            expect(response.statusCode).toBe(VALID_RESPONSE_CODE);
          }));
      it('Should no allow to add a crypto already added to a user', () =>
        userFactory
          .create()
          .then(() => cryptoCoinFactory.create())
          .then(() =>
            request(app)
              .post('/users/login')
              .send({ username: testUser.username, password: testUser.password })
          )
          .then(response =>
            request(app)
              .post(`/users/cryptos/${testCryptoCoin.coinId}`)
              .set({ authorization: response.body.token })
          )
          .then(response => {
            expect(response.statusCode).toBe(DATA_ALREADY_EXIST_CODE);
          }));
      it('Should no allow to add a crypto with invalid id', () =>
        userFactory
          .create()
          .then(() =>
            request(app)
              .post('/users/login')
              .send({ username: testUser.username, password: testUser.password })
          )
          .then(response =>
            request(app)
              .post('/users/cryptos/xyxy')
              .set({ authorization: response.body.token })
          )
          .then(response => {
            expect(response.statusCode).toBe(INVALID_CRYPTO_ID_CODE);
          }));
    });
    describe('GET /users/cryptos', () => {
      it('Should get cryptos off a user successfully', () =>
        userFactory
          .create()
          .then(() => cryptoCoinFactory.createMany())
          .then(() =>
            request(app)
              .post('/users/login')
              .send({ username: testUser.username, password: testUser.password })
          )
          .then(response =>
            request(app)
              .get('/users/cryptos')
              .set({ authorization: response.body.token })
          )
          .then(response => {
            expect(response.statusCode).toBe(VALID_RESPONSE_CODE);
            expect(response.body.crypto_coins.length).toBe(5);
          }));
      it('Should not get cryptos off unauthenticated user', () =>
        userFactory
          .create()
          .then(() => cryptoCoinFactory.createMany())
          .then(() => request(app).get('/users/cryptos'))
          .then(response => {
            expect(response.statusCode).toBe(UNAUTHORIZED_CODE);
          }));
    });
    describe('GET /users/top_cryptos', () => {
      it('Should get top 3 of a user successfully', () =>
        userFactory
          .create()
          .then(() => cryptoCoinFactory.createMany())
          .then(() =>
            request(app)
              .post('/users/login')
              .send({ username: testUser.username, password: testUser.password })
          )
          .then(response =>
            request(app)
              .get('/users/top_cryptos')
              .set({ authorization: response.body.token })
          )
          .then(response => {
            expect(response.statusCode).toBe(VALID_RESPONSE_CODE);
            expect(response.body.crypto_coins.length).toBe(3);
          }));
      it('Should not get the top 2 off cryptos off an unauthenticated user', () =>
        userFactory
          .create()
          .then(() => cryptoCoinFactory.createMany())
          .then(() => request(app).get('/users/top_cryptos'))
          .then(response => {
            expect(response.statusCode).toBe(UNAUTHORIZED_CODE);
          }));
    });
  });
});
