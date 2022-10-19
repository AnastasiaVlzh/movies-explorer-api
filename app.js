require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const routes = require('./routes/index');

const {
  NODE_ENV,
  PORT = 4000,
  DB_URL,
} = process.env;

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

app.use(routes);

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
    await mongoose.connect(NODE_ENV === 'production' ? DB_URL : 'mongodb://localhost:27017/bitfilmsdb', {
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
