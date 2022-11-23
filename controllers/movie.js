const Movie = require('../models/movie');
const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-req-err');
const ServerError = require('../errors/server-err');
const MovieError = require('../errors/movie-err');

module.exports.createMovie = async (req, res, next) => {
  const owner = req.user._id;
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  try {
    const card = await Movie.create({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      nameRU,
      nameEN,
      thumbnail,
      movieId,
      owner,
    });
    return res.status(200).send(card);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return next(new BadRequestError('Некорректные данные фильма'));
    }
    return next(new ServerError('Произошла ошибка'));
  }
};

module.exports.getMovies = async (req, res, next) => {
  const owner = req.user._id;
  try {
    const movie = await Movie.find({ owner });
    return res.status(200).send(movie);
  } catch (err) {
    return next(new ServerError('Произошла ошибка'));
  }
};

module.exports.deleteMovie = async (req, res, next) => {
  const id = req.user._id;
  try {
    const movie = await Movie.findById(req.params.movieId);
    if (!movie) {
      throw new NotFoundError('Такого фильма нет');
    }
    if (id !== movie.owner.toString()) {
      throw new MovieError('Данный фильм загружен не вами');
    }
    const myMovie = await Movie.findByIdAndDelete(req.params.movieId);
    res.send({ data: myMovie });
  } catch (err) {
    next(err);
  }
};
