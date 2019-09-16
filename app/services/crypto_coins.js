const request = require('request-promise');

const errors = require('../errors');
const logger = require('../logger');
const config = require('../../config');
const { cryptoCoin } = require('../models');
const { cryptoCoinMapper } = require('../mappers/crypto_coins');

const getCryptoCoin = (coinId, preferredCurrency = 'usd') => {
  const options = {
    method: 'GET',
    uri: `${config.common.braveNewCoinApi.baseUrl}/${config.common.braveNewCoinApi.endpoints.ticker}`,
    qs: {
      coin: coinId,
      show: preferredCurrency
    },
    headers: {
      'x-rapidapi-host': config.common.braveNewCoinApi.headers.xApiHost,
      'x-rapidapi-key': config.common.braveNewCoinApi.headers.xApiKey
    },
    json: true
  };

  logger.info(`Attempting to consume the brave API to get coin with qs: ${JSON.stringify(options.qs)}`);
  return request(options).catch(err => {
    logger.error(err.message);
    throw errors.braveApiError('Error consuming the bravenewcoin API');
  });
};

exports.getCryptoCoinFromBraveApi = getCryptoCoin;

exports.createCryptoCoin = (coinId, userId) =>
  getCryptoCoin(coinId).then(coin => {
    if (!coin.success) throw errors.braveApiError('Crypto Coin not available');
    return cryptoCoin.create({ ...cryptoCoinMapper(coin), userId }).catch(err => {
      logger.error(err.name);
      if (err.name === 'SequelizeUniqueConstraintError')
        throw errors.addCryptoCoinError('The coin was already added to the user');
      throw errors.databaseError('Error creating coin in the database');
    });
  });

exports.findCryptoCoinsBy = params =>
  cryptoCoin
    .findAll({
      where: { ...params }
    })
    .catch(err => {
      logger.error(err.message);
      throw errors.databaseError('Error finding crypto coin in database');
    });
