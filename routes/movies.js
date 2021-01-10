const express = require('express');
const router = express.Router();
const { Movie }= require('../db/models');
const { Op } = require('sequelize');
const csrf = require('csurf');
const csrfProtection = csrf({ cookie: true });
const db = require('../db/models');
const { requireAuth } = require('../auth');

const asyncHandler = handler => (req, res, next) => handler(req, res, next).catch(next);

router.use(requireAuth);

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
    const status = await db.BlockbusterShelf.findOne({
        where: {
            userId: req.session.auth.userId,
            movieId,  
        }
    })
    const isStatus = status ? 'exists' : null;
    const year = movie.releaseDate.getFullYear();
    const reviews = await db.Review.findAll({
        include: 
        [db.Movie, db.User], 
        order: [['updatedAt', 'DESC']], 
        limit: 4,
    });
    res.render('movie-profile', { title: 'Movie Profile', movie, isStatus, year, reviews });
}));

module.exports = router;
