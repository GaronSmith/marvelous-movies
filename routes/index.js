var express = require('express');
var router = express.Router();
const csrf = require('csurf');
const csrfProtection = csrf({cookie: true})
const { Sequelize } = require('sequelize')
const Op = Sequelize.Op

const { User, Movie, Review, sequelize } = require('../db/models')
const asyncHandler = handler => (req, res, next) => handler(req, res, next).catch(next)

/* GET home page. */

router.get('/', asyncHandler(async(req, res, next) => {
  const topMovies = await Movie.findAll({where: { voteRating:{ [Op.gt]: 8 } }, order: Movie.voteRating, limit: 5});
  const recentReviews = await Review.findAll({ include: Movie, order: Review.updatedAt, limit: 5})
  
  res.render('index', {topMovies, recentReviews, title: 'Welcome to Marvelous Movies!' });
}));


module.exports = router;
