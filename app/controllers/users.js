const logger = require('../logger');
const errors = require('../errors');
const { userMapper } = require('../mappers/users');
const { userSerializer } = require('../serializers/users');
const { createUser, findUserByUsername } = require('../services/users');
const { encryptPassword, comparePassword } = require('../helpers/users');
const { generateToken } = require('../helpers/token');

const loginUser = (username, password) =>
  findUserByUsername(username)
    .then(user => {
      if (!user) {
        logger.error('Invalid username');
        throw errors.userSigninError('username or password invalid');
      }
      return comparePassword(password, user.password);
    })
    .then(passwordIsValid => {
      if (!passwordIsValid) {
        logger.error('Invalid password');
        throw errors.userSigninError('Email or password invalid');
      }
      return generateToken({ user: username });
    });

exports.signUp = (req, res, next) => {
  const newUser = userMapper(req.body);
  return encryptPassword(newUser.password)
    .then(hash => createUser({ ...newUser, password: hash }))
    .then(createdUser => {
      logger.info(`The user ${createdUser.name} was created successfully`);
      return res.status(200).send({ user: userSerializer(createdUser) });
    })
    .catch(next);
};

exports.logIn = (req, res, next) => {
  const { username, password } = userMapper(req.body);
  return loginUser(username, password)
    .then(token => {
      logger.info(`User ${username} Logged in in successfully`);
      return res.status(200).send({ token });
    })
    .catch(next);
};
