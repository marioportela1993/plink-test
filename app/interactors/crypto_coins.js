const logger = require('../logger');
const { findCryptoCoinsBy, getCryptoCoinFromBraveApi } = require('../services/crypto_coins');

const getCryptosByUserWithPrice = user => {
  const { id: userId, preferredCurrency } = user;
  return findCryptoCoinsBy({ userId })
    .then(userCoins =>
      Promise.all(userCoins.map(coin => getCryptoCoinFromBraveApi(coin.coinId, preferredCurrency)))
    )
    .then(coinsWithPrice => {
      logger.info(`Crypto coins of user ${user.name} obtained successfully`);
      return coinsWithPrice;
    });
};

exports.getCryptoCoinsListByUser = getCryptosByUserWithPrice;
