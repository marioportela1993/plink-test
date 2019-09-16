exports.coinSerializer = coin => ({
  coin_id: coin.coinId,
  coin_name: coin.coinName,
  user_id: coin.userId,
  source: coin.source
});

exports.cryptoCoinWithPriceSerializer = coin => ({
  coin_name: coin.coin_name,
  price: coin.last_price,
  source: coin.source
});

exports.cryptoCoinsWithPriceSerializer = coins => coins.map(coin => this.cryptoCoinWithPriceSerializer(coin));
