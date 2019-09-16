const logger = require('../logger');
const { getCryptoCoinsListByUser, getTopCryptosByUser } = require('../interactors/crypto_coins');
const { createCryptoCoin } = require('../services/crypto_coins');
const { coinSerializer, cryptoCoinsWithPriceSerializer } = require('../serializers/crypto_coins');

exports.addCrypto = (req, res, next) => {
  const { id: coinId } = req.params;
  const { id: userId, name } = { ...req.session };
  return createCryptoCoin(coinId, userId)
    .then(coinAdded => {
      logger.info(`Crypto coin ${coinId} added to user ${name}`);
      return res.status(200).send({ crypto_coin: coinSerializer(coinAdded) });
    })
    .catch(next);
};

exports.getCryptos = (req, res, next) => {
  const user = { ...req.session };
  return getCryptoCoinsListByUser(user)
    .then(coins => res.status(200).send({ crypto_coins: cryptoCoinsWithPriceSerializer(coins) }))
    .catch(next);
};

exports.getTopCryptos = (req, res, next) => {
  const user = { ...req.session };
  const { order, top } = req.query;
  return getTopCryptosByUser(user, order, top)
    .then(coins => res.status(200).send({ crypto_coins: cryptoCoinsWithPriceSerializer(coins) }))
    .catch(next);
};
