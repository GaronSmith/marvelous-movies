const express = require('express');

const {asyncHandler, csrfProtection} = require('./utils')
const db = require('../db/models')
const router = express.Router();


router.get('/create/:id', csrfProtection, asyncHandler( async (req, res, next) => {
    const movieId = req.params.id;
    const userId = req.session.auth ? req.session.auth.userId : null

    const movie = await db.Movie.findByPk(movieId);
    
    res.render('review-create', {
        token: req.csrfToken(),
        movie,
        userId
    })
}));

router.post('create')

module.exports = router;