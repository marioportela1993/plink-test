const internalError = (message, internalCode) => ({
  message,
  internalCode
});

exports.DATABASE_ERROR = 'database_error';
exports.databaseError = message => internalError(message, exports.DATABASE_ERROR);

exports.DEFAULT_ERROR = 'default_error';
exports.defaultError = message => internalError(message, exports.DEFAULT_ERROR);

exports.USER_SIGNUP_ERROR = 'user_signup_error';
exports.userSignupError = message => internalError(message, exports.USER_SIGNUP_ERROR);

exports.HASH_ERROR = 'hash_error';
exports.hashError = message => internalError(message, exports.HASH_ERROR);

exports.SCHEMA_ERROR = 'schema_error';
exports.schemaError = message => internalError(message, exports.SCHEMA_ERROR);

exports.USER_SIGNIN_ERROR = 'user_signin_error';
exports.userSigninError = message => internalError(message, exports.USER_SIGNIN_ERROR);

exports.AUTHENTICATION_ERROR = 'authentication_error';
exports.authenticationError = message => internalError(message, exports.AUTHENTICATION_ERROR);

exports.BRAVE_API_ERROR = 'brave_api_error';
exports.braveApiError = message => internalError(message, exports.BRAVE_API_ERROR);

exports.ADD_CRYPTO_COIN_ERROR = 'add_crypto_coin_error';
exports.addCryptoCoinError = message => internalError(message, exports.ADD_CRYPTO_COIN_ERROR);
