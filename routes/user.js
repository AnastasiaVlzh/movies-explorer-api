const express = require('express');
const { celebrate, Joi } = require('celebrate');
const userRoutes = require('express').Router();
const {
  getUsers,
  getUserMe,
  updateUser,
} = require('../controllers/user');

userRoutes.get('/users', express.json(), getUsers);

userRoutes.get('/users/me', express.json(), getUserMe);

userRoutes.patch('/users/me', express.json(), celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
}), updateUser);

module.exports = userRoutes;
