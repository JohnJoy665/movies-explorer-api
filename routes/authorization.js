const authorizationRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { createUser, loginUser, signOut } = require('../controllers/authorization.js');

authorizationRouter.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), createUser);
authorizationRouter.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), loginUser);
authorizationRouter.post('/signout', signOut);

module.exports = authorizationRouter;
