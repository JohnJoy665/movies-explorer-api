const usersRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getUser, updateUser, getUsers } = require('../controllers/user.js');

usersRouter.get('/me', getUser);
usersRouter.patch('/me', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    name: Joi.string().min(2).max(30),
  }),
}), updateUser);
usersRouter.get('/all', getUsers);

module.exports = usersRouter;
