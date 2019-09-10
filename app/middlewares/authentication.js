const { authenticationError } = require('../errors');
const logger = require('../logger');
const { header_name } = require('../../config').common.session;
const {
  AUTHENTICATION_ERROR_MSG,
  INVALID_TOKEN_ERROR_MSG,
  TOKEN_EXPIRED_ERROR_MSG
} = require('../constants/errors');
const { validateToken } = require('../helpers/token');
const { findUserByUsername } = require('../services/users');

exports.authenticate = (req, _, next) => {
  const token = req.headers[header_name];
  if (!token) return next(authenticationError(AUTHENTICATION_ERROR_MSG));
  try {
    const decodeToken = validateToken(token);
    return findUserByUsername(decodeToken.user)
      .then(user => {
        if (!user) return next(authenticationError(AUTHENTICATION_ERROR_MSG));
        logger.info(`User ${user.username} authenticated successfully`);
        req.session = { ...user.dataValues };
        return next();
      })
      .catch(next);
  } catch (err) {
    if (err.name === 'TokenExpiredError') return next(authenticationError(TOKEN_EXPIRED_ERROR_MSG));
    return next(authenticationError(INVALID_TOKEN_ERROR_MSG));
  }
};
