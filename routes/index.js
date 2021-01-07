var express = require("express");
var router = express.Router();
const csrf = require('csurf');
const csrfProtection = csrf({cookie: true});
const { Sequelize } = require('sequelize');
const Op = Sequelize.Op;

const { User, Movie, Review, sequelize } = require('../db/models');
const asyncHandler = handler => (req, res, next) => handler(req, res, next).catch(next);


router.get('/', csrfProtection, asyncHandler(async(req, res, next) => {
  const topMovies = await Movie.findAll({where: { voteRating:{ [Op.gt]: 8 }, voteCount: { [Op.gt]: 2000 } }, order: [['voteRating', 'DESC']], limit: 5});
  const recentReviews = await Review.findAll({ include: [Movie, User], order: [['updatedAt', 'DESC']], limit: 5});
  function randomNum(max) {
    return Math.floor(Math.random() * Math.floor(max));
  };
  const randomBest = randomNum(880);
  const bestFilm = await Movie.findByPk(randomBest);
  res.render('index', { token: req.csrfToken(), topMovies, recentReviews, bestFilm, title: 'Welcome to Marvelous Movies!' });
}));


module.exports = router;
