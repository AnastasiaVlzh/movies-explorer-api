const express = require('express');
const movieRoutes = require('express').Router();
const {
  createMovie,
  getMovies,
  deleteMovie,
} = require('../controllers/movie');
const {
  validationCreateMovie,
  validationDeleteMovie,
} = require('../middlewares/validation');
const { auth } = require('../middlewares/auth');

movieRoutes.use(auth);

movieRoutes.get('/movies', express.json(), getMovies);

movieRoutes.post('/movies', express.json(), validationCreateMovie, createMovie);

movieRoutes.delete('/movies/:movieId', express.json(), validationDeleteMovie, deleteMovie);

module.exports = movieRoutes;
