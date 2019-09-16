const request = require('supertest');

const app = require('../../app.js');
const userFactory = require('../factory/users');
const { user: testUser } = require('../fixtures/users');

const VALID_RESPONSE_CODE = 200;
const INVALID_SCHEMA_CODE = 422;
const UNAUTHORIZED_CODE = 401;

describe('controllers', () => {
  describe('users', () => {
    describe('POST /users', () => {
      it('Signing up user successfully', () =>
        request(app)
          .post('/users')
          .send(testUser)
          .then(response => {
            expect(response.statusCode).toBe(VALID_RESPONSE_CODE);
          }));
      it('Signing up with invalid password', () =>
        request(app)
          .post('/users')
          .send({ ...testUser, password: 'abc12.' })
          .then(response => {
            expect(response.statusCode).toBe(INVALID_SCHEMA_CODE);
          }));
      it('Signing up with username that already exist in database', () =>
        userFactory
          .create()
          .then(() =>
            request(app)
              .post('/users')
              .send(testUser)
          )
          .then(response => {
            expect(response.statusCode).toBe(UNAUTHORIZED_CODE);
          }));
      it.each([
        {
          lastname: 'Doe',
          username: 'test.user',
          password: 'abc12345',
          preferred_currency: 'USD'
        },
        {
          name: 'Jonh',
          username: 'test.user',
          password: 'abc12345',
          preferred_currency: 'USD'
        },
        {
          name: 'Jonh',
          lastname: 'Doe',
          password: 'abc12345',
          preferred_currency: 'USD'
        },
        {
          name: 'Jonh',
          lastname: 'Doe',
          username: 'test.user',
          preferred_currency: 'USD'
        },
        {
          name: 'Jonh',
          lastname: 'Doe',
          username: 'test.user',
          password: 'abc12345'
        },
        {}
      ])('Signing up with missing parameter %p', testN =>
        request(app)
          .post('/users')
          .send(testN)
          .then(response => {
            expect(response.statusCode).toBe(INVALID_SCHEMA_CODE);
          })
      );
    });
    describe('POST /users/login', () => {
      it('Login user successfully', () =>
        userFactory
          .create()
          .then(() =>
            request(app)
              .post('/users/login')
              .send({ username: testUser.username, password: testUser.password })
          )
          .then(response => {
            expect(response.statusCode).toBe(VALID_RESPONSE_CODE);
          }));
      it('Login user with no existing username in database', () =>
        request(app)
          .post('/users/login')
          .send({ username: testUser.username, password: testUser.password })
          .then(response => {
            expect(response.statusCode).toBe(UNAUTHORIZED_CODE);
          }));
      it('login with invalid user password', () =>
        userFactory
          .create()
          .then(() =>
            request(app)
              .post('/users/login')
              .send({ username: testUser.username, password: `${testUser.password}0` })
          )
          .then(response => {
            expect(response.statusCode).toBe(UNAUTHORIZED_CODE);
          }));
      it.each([
        {
          username: testUser.username
        },
        {
          password: testUser.password
        },
        {}
      ])('login with with missing parameter %p', testN =>
        request(app)
          .post('/users/login')
          .send(testN)
          .then(response => expect(response.statusCode).toBe(INVALID_SCHEMA_CODE))
      );
    });
  });
});
