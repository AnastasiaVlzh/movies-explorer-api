require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const routes = require('./routes/index');
const { errorsGlobal } = require('./middlewares/errorsGlobal');

const {
  NODE_ENV,
  PORT = 4000,
  DB_URL,
} = process.env;

const app = express();

// const ALLOW_ORIGIN = [
//   'http://localhost:3000',
// ];

app.use(
  cors({
    origin: ['http://localhost:3000'],
    credentials: true,
  }),
);
app.use(helmet());

app.use(cookieParser());

app.use(requestLogger);

app.use(routes);

app.use(errorLogger);

app.use(errors());

app.use(errorsGlobal);

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
