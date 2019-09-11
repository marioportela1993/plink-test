exports.userSerializer = user => ({
  name: user.name,
  lastname: user.lastname,
  username: user.username,
  preferred_currency: user.preferredCurrency
});
