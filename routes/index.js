const router = require('express').Router();
const express = require('express');
const {
  login,
  createUser,
} = require('../controllers/user');
const userRoutes = require('./user');
const movieRoutes = require('./movie');
const {
  validationLogin,
  validationCreateUser,
} = require('../middlewares/validation');
const NotFoundError = require('../errors/not-found-err');

router.post('/signin', express.json(), validationLogin, login);

router.post('/signup', express.json(), validationCreateUser, createUser);

router.use(userRoutes);
router.use(movieRoutes);

router.all('*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

module.exports = router;
