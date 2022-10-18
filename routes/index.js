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

router.post('/signin', express.json(), validationLogin, login);

router.post('/signup', express.json(), validationCreateUser, createUser);

router.use(userRoutes);
router.use(movieRoutes);
