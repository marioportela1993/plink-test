const logger = require('../logger');
const { userSerializer } = require('../serializers/user');
const { createUser } = require('../services/user');
const { encryptPassword } = require('../helpers/users');

exports.signUp = (req, res, next) => {
  const newUser = req.body;
  return encryptPassword(newUser.password)
    .then(hash => createUser({ ...newUser, password: hash }))
    .then(createdUser => {
      logger.info(`The user ${createdUser.name} was created successfully`);
      return res.status(200).send({ user: userSerializer(createdUser) });
    })
    .catch(next);
};
