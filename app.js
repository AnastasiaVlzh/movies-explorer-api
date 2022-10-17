require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { errors } = require('celebrate');
const {
  logout,
} = require('./controllers/user');
const { auth } = require('./middlewares/auth');
const NotFoundError = require('./errors/not-found-err');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 4000 } = process.env;

const app = express();

const ALLOW_ORIGIN = [
  'http://localhost:4000',
  'http://api.anastasiavlzh-diploma.nomoredomains.icu',
  'https://api.anastasiavlzh-diploma.nomoredomains.icu',
];

app.use(
  cors({
    origin: ALLOW_ORIGIN,
    credentials: true,
  }),
);

app.use(cookieParser());

app.use(requestLogger);

app.get('/logout', logout);

app.use(auth);

app.all('*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

app.use(errorLogger);

app.use(errors());

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = statusCode === 500 ? 'На сервере произошла ошибка' : err.message;

  res.status(statusCode).send({ message });
  next();
});

async function main() {
  try {
    await mongoose.connect('mongodb://localhost:27017/bitfilmsdb', {
      useNewUrlParser: true,
      useUnifiedTopology: false,
    });
    await app.listen(PORT, () => {
      console.log(`App listening on port ${PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
}

main();
