const router = require('express').Router();
const express = require('express');
const { celebrate, Joi } = require('celebrate');
const {
  login,
  createUser,
} = require('../controllers/user');
const userRoutes = require('./user');
const movieRoutes = require('./movie');

router.post('/signin', express.json(), celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

router.post('/signup', express.json(), celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi
      .string()
      .regex(/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), createUser);

router.use(userRoutes);
router.use(movieRoutes);
