const express = require('express');
const { celebrate, Joi } = require('celebrate');
const movieRoutes = require('express').Router();
const {
  createMovie,
  getMovies,
  deleteMovie,
} = require('../controllers/movie');

const url = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;

movieRoutes.get('/movies', express.json(), getMovies);

movieRoutes.post('/movies', express.json(), celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().regex(url),
    trailerLink: Joi.string().required().regex(url),
    thumbnail: Joi.string().required().regex(url),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    movieId: Joi.number().required(),
  }),
}), createMovie);

movieRoutes.delete('/movies/:movieId', express.json(), celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().hex().alphanum().length(24),
  }),
}), deleteMovie);

module.exports = movieRoutes;
