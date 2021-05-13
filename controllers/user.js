const User = require('../models/user.js');
const BadRequest = require('../errors/BadRequest.js');

const NotFound = require('../errors/NotFound.js');
const Conflict = require('../errors/Conflict.js');

const getUser = (req, res, next) => {
  const userId = req._id;
  User.findById(userId)
    .then((user) => {
      if (!user) {
        throw new NotFound('Пользователь не найден');
      }
      res.status(200).send({
        name: user.name,
        email: user.email,
      });
    })
    .catch(next);
};

const updateUser = (req, res, next) => {
  const userId = req._id;
  const { email, name } = req.body;
  if (!email || !name) {
    next(new BadRequest('Нет необходимых данных'));
  }
  User.findByIdAndUpdate(
    userId,
    {
      name,
      email,
    },
    { new: true },
  )
    .then((user) => {
      if (!user) {
        next(new NotFound('Пользователь не найден'));
      }
      res.status(200).send({ name, email });
    })
    .catch((err) => {
      if (err.codeName === 'DuplicateKey') {
        next(new Conflict('Пользователь с таким email уже существует'));
      }
    });
};

// вывести всех поользователей (временно)
const getUsers = (req, res) => {
  User.find({}).then((users) => {
    res.send(users);
  });
};

module.exports = {
  getUser,
  updateUser,
  getUsers,
};
