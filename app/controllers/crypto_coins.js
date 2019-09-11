const { createCryptoCoin } = require('../services/crypto_coins');
const logger = require('../logger');
const { coinSerializer } = require('../serializers/crypto_coins');

exports.addCypto = (req, res, next) => {
  const { id: coinId } = req.params;
  const { id: userId, name } = { ...req.session };
  return createCryptoCoin(coinId, userId)
    .then(coinAdded => {
      logger.info(`Crypto coin ${coinId} added to user ${name}`);
      return res.status(200).send({ crypto_coin: coinSerializer(coinAdded) });
    })
    .catch(next);
};
