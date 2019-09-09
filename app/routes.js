const { healthCheck } = require('./controllers/healthCheck');
const users = require('./controllers/user');
const schemaValidator = require('./middlewares/schemaValidator');
const { userSignUpSchema } = require('./schemas/user');

exports.init = app => {
  app.get('/health', healthCheck);
  app.post('/users', [schemaValidator(userSignUpSchema)], users.signUp);
};
