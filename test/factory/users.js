const { factory } = require('factory-girl');

const { factoryByModel } = require('./factory_by_models');
const { encryptPassword } = require('../../app/helpers/users');
const { user } = require('../fixtures/users');

const modelName = 'user';

const options = {
  afterCreate: model =>
    encryptPassword(model.password).then(password => {
      model.password = password;
      return model.save();
    })
};

factoryByModel(modelName, false, options);

module.exports = {
  create: () => factory.create(modelName, user),
  build: () => factory.build(modelName, user)
};
