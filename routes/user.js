const express = require('express');
const userRoutes = require('express').Router();
const {
  getUsers,
  getUserMe,
  updateUser,
  logout,
} = require('../controllers/user');
const { auth } = require('../middlewares/auth');

const { validationUpdateUser } = require('../middlewares/validation');

userRoutes.use(auth);

userRoutes.get('/users', express.json(), getUsers);

userRoutes.get('/users/me', express.json(), getUserMe);

userRoutes.patch('/users/me', express.json(), validationUpdateUser, updateUser);

userRoutes.get('/logout', logout);

module.exports = userRoutes;
