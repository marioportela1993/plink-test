const bcrypt = require('bcryptjs');
const errors = require('../errors');
const logger = require('../logger');

const rounds = 10;

exports.encryptPassword = password =>
  bcrypt.hash(password, rounds).catch(err => {
    logger.error(err.message);
    throw errors.hashError('Error hashing password');
  });
