exports.userMapper = user => ({
  name: user.name,
  lastname: user.lastname,
  username: user.username,
  password: user.password,
  preferredCurrency: user.preferred_currency
});
