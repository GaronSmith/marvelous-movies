const express = require('express');
const csrf = require('csurf');

const router = express.Router();
const csrfProtection = csrf({ cookie: true });

const db = require('../db/models');

const asyncHandler = (handler) => (req, res, next) => handler(req, res, next).catch(next);

// Movie Profile Page - single movie - retrieve/GET by ID

router.get('/:id(\\d+)', asyncHandler(async(req, res) => {
    // Do we need csrfProtection on this GET route?
    // single movie info pulled from database
    const movieId = parseInt(req.params.id, 10);
    console.log(movieId);
    // include Ratings, Reviews
    const movie = await db.Movie.findByPk(movieId);
    res.render('movie-profile', { title: 'Movie Profile', movie });
}));

module.exports = router;
