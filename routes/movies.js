const express = require('express');
const { csrfProtection, asyncHandler } = require('./utils');

const router = express.Router();

const db = require('../db/models');

router.get('/:id(\\d+)', csrfProtection, asyncHandler(async(req, res) => {
    const movieId = parseInt(req.params.id, 10);
    const movie = await db.Movie.findByPk(movieId);
    const year = movie.releaseDate.getFullYear();
    res.render('movie-profile', { title: 'Movie Profile', movie, year });
}));

router.post('/:id(\\d+)', csrfProtection, asyncHandler(async(req, res) => {
   const { movieId, rating } = req.body;
   const review = await db.Review.create({
       userId: req.session.auth.userId,
       movieId,
       rating,
   })
   res.json({review});
}));

module.exports = router;
