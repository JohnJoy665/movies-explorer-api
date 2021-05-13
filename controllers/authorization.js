const { NODE_ENV, JWT_SECRET } = process.env;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.js');
const Unauthorized = require('../errors/Unauthorized.js');
const BadRequest = require('../errors/BadRequest.js');
const Conflict = require('../errors/Conflict.js');

const createUser = (req, res, next) => {
  const {
    name,
    email,
    password,
  } = req.body;

  if (!name || !email || !password) {
    next(new BadRequest('Данные не валидны'));
  }
  User.findOne({ email })
    .then((user) => {
      if (user) {
        res.status(409);
        throw new Conflict('Пользователь с таким email уже существует');
      }
      const salt = bcrypt.genSaltSync(10);
      User.create({
        name,
        email,
        password: bcrypt.hashSync(password, salt),
      })
        .then((createdUser) => {
          res.status(200).send({ name: createdUser.name, email: createdUser.email });
        })
        .catch((err) => {
          if (err.name === 'ValidationError') {
            next(new BadRequest('Данные не валидны'));
          }
        });
    })
    .catch(next);
};

const loginUser = (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    throw new BadRequest('Введены некорректные данные');
  }
  const { email, password } = req.body;
  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new Unauthorized('Неверный логин или пароль');
      }
      const passResult = bcrypt.compareSync(password, user.password);
      if (passResult) {
        const token = jwt.sign({
          userId: user._id,
        },
        NODE_ENV === 'production' ? JWT_SECRET : 'diplom',
        { expiresIn: 60 * 60 * 24 * 7 });
        res
          .cookie('jwt', token, {
            maxAge: 120000,
            httpOnly: true,
            // sameSite: 'None',
            // secure: true,
          })
          .status(200)
          .send('Пользователь зарегистрирован');
      } else {
        throw new Unauthorized('Неверный логин или пароль');
      }
    })
    .catch(next);
};

const signOut = (req, res, next) => {
  res.clearCookie('jwt', {
    httpOnly: true,
    // sameSite: 'None',
    // secure: true,
  });
  res.status(200).send('coockie удален');
  next();
};

module.exports = {
  createUser,
  loginUser,
  signOut,
};
