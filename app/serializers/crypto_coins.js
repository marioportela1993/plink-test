exports.coinSerializer = coin => ({
  coin_id: coin.coinId,
  coin_name: coin.coinName,
  user_id: coin.userId,
  source: coin.source
});
