exports.crypto = {
  coinId: 'BTC',
  coinName: 'Bitcoin',
  userId: 1,
  source: 'BraveNewCoin'
};

exports.cryptoList = [
  { ...this.crypto, userId: 1, coinName: 'Bitcoin1', coinId: 'BTC1' },
  { ...this.crypto, userId: 1, coinName: 'Bitcoin2', coinId: 'BTC2' },
  { ...this.crypto, userId: 1, coinName: 'Bitcoin3', coinId: 'BTC3' },
  { ...this.crypto, userId: 1, coinName: 'Bitcoin4', coinId: 'BTC4' },
  { ...this.crypto, userId: 1, coinName: 'Bitcoin5', coinId: 'BTC5' }
];
