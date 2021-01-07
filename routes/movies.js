const express = require('express');
const csrf = require('csurf');

const router = express.Router();
const csrfProtection = csrf({ cookie: true });

const db = require('../db/models');

const asyncHandler = (handler) => (req, res, next) => handler(req, res, next).catch(next);

router.get('/:id(\\d+)', csrfProtection, asyncHandler(async(req, res) => {
    const movieId = parseInt(req.params.id, 10);
    const movie = await db.Movie.findByPk(movieId);
    const year = movie.releaseDate.getFullYear();
    const rating = movie.voteRating / 2;
    res.render('movie-profile', { title: 'Movie Profile', movie, year, rating });
}));

module.exports = router;
