const express = require('express');

const {asyncHandler, csrfProtection} = require('./utils')
const db = require('../db/models')
const router = express.Router();
// const { requireAuth } = require("../auth");

// router.use(requrieAuth)

router.get('/create/:id(\\d+)', csrfProtection, asyncHandler( async (req, res, next) => {
    const movieId = req.params.id;
    const userId = req.session.auth.userId

    const movie = await db.Movie.findByPk(movieId);
    
    res.render('review-create', {
        token: req.csrfToken(),
        movie,
        userId
    })
}));

router.post('/create', csrfProtection, asyncHandler(async (req,res,next) =>{
    await db.Review.create(req.body)
    res.redirect(`/movies/${req.body.movieId}`)
}))

router.get('/rating/:mid(\\d+)', asyncHandler( async (req,res)=> {
    const rating = await db.Review.findOne({
        where:{
            userId: req.session.auth.userId,
            movieId: req.params.mid,
    }})
    res.json({rating})
}))

module.exports = router;