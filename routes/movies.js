const express = require('express');
const csrf = require('csurf');

const router = express.Router();
const csrfProtection = csrf({ cookie: true });

const { Movie } = require('../db/models');

const asyncHandler = (handler) => (req, res, next) => handler(req, res, next).catch(next);

// Movie Profile Page - single movie - retrieve/GET by ID

router.get('/movies/:id(\\d+)', csrfProtection, asyncHandler(async(req, res) => {
    // Do we need csrfProtection on this GET route?
    // single movie info pulled from database
    const movieId = parseInt(req.params.id, 10);
    // include Ratings, Reviews
    const movie = await Movie.findByPk(movieId);
    res.render('movie-profile', { title: 'Movie Profile', movie });
}));


