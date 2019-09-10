const errors = require('../constants/errors');
/* eslint-disable no-undef */
exports.userSignUpSchema = {
  name: {
    in: ['body'],
    isEmpty: {
      negated: true,
      errorMessage: errors.REQUIRED_NAME_ERROR
    },
    trim: true,
    isString: true
  },
  lastname: {
    in: ['body'],
    isEmpty: {
      negated: true,
      errorMessage: errors.REQUIRED_LASTNAME_ERROR
    },
    trim: true,
    isString: true
  },
  username: {
    in: ['body'],
    isEmpty: {
      negated: true,
      errorMessage: errors.REQUIRED_USERNAME_ERROR
    },
    trim: true,
    isString: true,
    errorMessage: errors.INVALID_USERNAME_ERROR
  },
  password: {
    in: ['body'],
    isEmpty: {
      negated: true,
      errorMessage: errors.REQUIRED_PASSWORD_ERROR
    },
    isLength: {
      options: { min: 8, max: 30 },
      errorMessage: errors.INVALID_PASSWORD_LENGTH_ERROR
    },
    isAlphanumeric: true,
    errorMessage: errors.INVALID_PASSWORD_ERROR
  },
  preferredCurrency: {
    in: ['body'],
    isEmpty: {
      negated: true,
      errorMessage: errors.REQUIRED_PREFERRED_CURRENCY
    },
    matches: {
      options: /^(COP|USD|EUR)$/i,
      errorMessage: errors.INVALID_PREFERRED_CURRENCY
    }
  }
};

exports.userLogInSchema = {
  username: {
    in: ['body'],
    isEmpty: {
      negated: true,
      errorMessage: errors.REQUIRED_USERNAME_ERROR
    },
    trim: true,
    isString: true,
    errorMessage: errors.INVALID_USERNAME_ERROR
  },
  password: {
    in: ['body'],
    isEmpty: {
      negated: true,
      errorMessage: errors.REQUIRED_PASSWORD_ERROR
    },
    isLength: {
      options: { min: 8, max: 30 },
      errorMessage: errors.INVALID_PASSWORD_LENGTH_ERROR
    },
    isAlphanumeric: true,
    errorMessage: errors.INVALID_PASSWORD_ERROR
  }
};
