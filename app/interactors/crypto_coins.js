const logger = require('../logger');
const { orderObjectArrayByField } = require('../helpers/arrays');
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

exports.getTopCryptosByUser = (user, order = 'DESC', top = 3) =>
  getCryptosByUserWithPrice(user).then(coinsWithPrice => {
    if (coinsWithPrice.length === 0) {
      logger.info('User has not added cryptos yet');
      return coinsWithPrice;
    }
    const coinsWithPriceOrdered = orderObjectArrayByField(coinsWithPrice, 'last_price', order);
    return order === 'DESC'
      ? coinsWithPriceOrdered.slice(0, top)
      : coinsWithPriceOrdered.slice(coinsWithPriceOrdered.length - top);
  });
