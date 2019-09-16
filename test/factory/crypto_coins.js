const { factory } = require('factory-girl');

const { factoryByModel } = require('./factory_by_models');
const { crypto, cryptoList } = require('../fixtures/crypto_coins');

const modelName = 'cryptoCoin';

factoryByModel(modelName);

module.exports = {
  create: () => factory.create(modelName, crypto),
  createMany: () => factory.createMany(modelName, cryptoList),
  build: () => factory.build(modelName, crypto),
  attributes: () => factory.attrs(modelName, crypto)
};
