const express = require('express');
const userRoutes = require('express').Router();
const {
  getUsers,
  getUserMe,
  updateUser,
} = require('../controllers/user');

const { validationUpdateUser } = require('../middlewares/validation');

userRoutes.get('/users', express.json(), getUsers);

userRoutes.get('/users/me', express.json(), getUserMe);

userRoutes.patch('/users/me', express.json(), validationUpdateUser, updateUser);

module.exports = userRoutes;
