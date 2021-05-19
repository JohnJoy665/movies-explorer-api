const mongoose = require('mongoose');
const validator = require('validator');

const filmShema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
    validate: {
      validator: (v) => {
        const countryRegex = /([а-яёА-Я]|[a-zA-Z])+\s?/g;
        return countryRegex.test(v);
      },
      message: 'не валидное наименование страны',
    },
  },
  director: {
    type: String,
    required: true,
    validate: {
      validator: (v) => {
        const directorRegex = /([а-яёА-Я]|[a-zA-Z])+((\s)|(-))?/g;
        return directorRegex.test(v);
      },
      message: 'не валидное наименование режиссера',
    },
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: (v) => {
        return validator.isURL(v);
      },
      message: 'не валидная ссылка',
    },
  },
  trailer: {
    type: String,
    required: true,
    validate: {
      validator: (v) => {
        return validator.isURL(v);
      },
      message: 'не валидная ссылка',
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: (v) => {
        return validator.isURL(v);
      },
      message: 'не валидная ссылка',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: String,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
    validate: {
      validator: (v) => {
        const directorRegex = /([а-яёА-Я])+((\s)|(-))?/g;
        return directorRegex.test(v);
      },
      message: 'не валидное наименование фильма',
    },
  },
  nameEN: {
    type: String,
    required: true,
    validate: {
      validator: (v) => {
        const directorRegex = /([a-zA-Z])+((\s)|(-))?/g;
        return directorRegex.test(v);
      },
      message: 'не валидное наименование фильма',
    },
  },
});

module.exports = mongoose.model('Movies', filmShema);
