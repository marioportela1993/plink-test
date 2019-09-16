const { healthCheck } = require('./controllers/healthCheck');
const users = require('./controllers/users');
const cryptoCoins = require('./controllers/crypto_coins');
const schemaValidator = require('./middlewares/schemas_validator');
const { authenticate } = require('./middlewares/authentication');
const { userSignUpSchema, userLogInSchema } = require('./schemas/users');
const { addCryptoSchema } = require('./schemas/crypto_coins');

exports.init = app => {
  app.get('/health', healthCheck);
  app.post('/users', [schemaValidator(userSignUpSchema)], users.signUp);
  app.post('/users/login', [schemaValidator(userLogInSchema)], users.logIn);
  app.post('/users/cryptos/:id', [authenticate, schemaValidator(addCryptoSchema)], cryptoCoins.addCrypto);
  app.get('/users/cryptos', [authenticate], cryptoCoins.getCryptos);
};
