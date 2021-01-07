const express = require('express');
const router = express.Router();
const { Movie }= require('../db/models');
const { Op } = require('sequelize');

const asyncHandler = handler => (req, res, next) => handler(req, res, next).catch(next);

function toProperCase(word) {
    let letters = word.split('');
    letters[0].toUpperCase();
    return letters.join('');
}

router.get('/genre/:id', asyncHandler(async(req, res)=>{
    const genre = toProperCase(req.params.id);
    const topMovies = await Movie.findAll({ where: {genre}, limit: 25, order: [['voteRating', 'DESC']] });
    res.render('top-movies', { topMovies, genre });
}));

module.exports = router;