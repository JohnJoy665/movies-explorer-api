const Movies = require('../models/movie.js');
const BadRequest = require('../errors/BadRequest.js');
const NotFound = require('../errors/NotFound.js');
const Conflict = require('../errors/Conflict.js');

const getFilms = (req, res, next) => {
  Movies.find()
    .then((films) => {
      res.status(200).send(films);
    })
    .catch(next);
};

const createFilm = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    owner = req._id,
    movieId,
    nameRU,
    nameEN,
  } = req.body;

  Movies.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    owner,
    movieId,
    nameRU,
    nameEN,
  })
    .then((film) => {
      res.status(200).send(film);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest('Данные не валидны'));
      }
    });
};

const deleteFilm = (req, res, next) => {
  const filmId = req.params.movieId;
  Movies.findById(filmId)
    .then((findedMovie) => {
      if (!findedMovie) {
        throw new NotFound('Документ не найден');
      }
      if (req._id === findedMovie.owner.toString()) {
        Movies.findByIdAndDelete(filmId)
          .then((movie) => {
            res.send(movie);
          });
      } else {
        next(new Conflict('Фильм может быть удален только своим владельцем'));
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequest('невалидный ID'));
      }
      return next(err);
    });
};

module.exports = { getFilms, createFilm, deleteFilm };
