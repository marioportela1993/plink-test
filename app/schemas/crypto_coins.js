const errors = require('../constants/errors');

exports.addCryptoSchema = {
  id: {
    in: ['params'],
    isEmpty: {
      negated: true,
      errorMessage: errors.REQUIRED_CRYPTO_COIN_ID_ERROR
    },
    trim: true,
    isString: true
  }
};
