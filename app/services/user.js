const errors = require('../errors');
const { user } = require('../models');
const logger = require('../logger');

exports.createUser = newUser =>
  user.create(newUser).catch(err => {
    logger.error(err.message);
    if (err.message === 'Validation error')
      throw errors.userSignupError('User already exists in the database');
    throw errors.userSignupError('Error creating user in the database');
  });
