const express = require('express');
const router = express.Router();
const { Movie }= require('../db/models');
const { Op } = require('sequelize');
const csrf = require('csurf');
const csrfProtection = csrf({ cookie: true });
const db = require('../db/models');

const asyncHandler = handler => (req, res, next) => handler(req, res, next).catch(next);

function toProperCase(word) {
    let letters = word.split('');
    letters[0].toUpperCase();
    return letters.join('');
};

router.get('/genre/:id', asyncHandler(async(req, res)=>{
    const genre = toProperCase(req.params.id);
    const topMovies = await Movie.findAll({ where: {genre}, limit: 25, order: [['voteRating', 'DESC']] });
    res.render('top-movies', { topMovies, genre });
}));

router.get('/:id(\\d+)', asyncHandler(async(req, res) => {
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

router.post()

module.exports = router;
