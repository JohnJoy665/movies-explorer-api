const moviesRouter = require('express').Router();
const validator = require('validator');
const { celebrate, Joi } = require('celebrate');
const { getFilms, createFilm, deleteFilm } = require('../controllers/movies.js');

moviesRouter.get('/', getFilms);
moviesRouter.post('/', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message('Поле image заполненно некорректно');
    }),
    trailer: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message('Поле trailer заполненно некорректно');
    }),
    thumbnail: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message('Поле thumbnail заполненно некорректно');
    }),
    owner: Joi.string().length(24).hex(),
    movieId: Joi.string().required().length(24).hex(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
}), createFilm);
moviesRouter.delete('/:movieId', celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().length(24).hex(),
  }),
}), deleteFilm);

module.exports = moviesRouter;
