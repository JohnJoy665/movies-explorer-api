const jwt = require('jsonwebtoken');
const Unauthorized = require('../errors/Unauthorized');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const coockie = req.cookies.jwt;
  if (!coockie) {
    throw new Unauthorized('Ошибка авторизации');
  }
  const decoded = jwt.verify(
    coockie,
    NODE_ENV === 'production' ? JWT_SECRET : 'diplom',
  );
  req._id = decoded.userId;
  next();
};
