const express = require('express');

const {asyncHandler, csrfProtection} = require('./utils')
const db = require('../db/models')
const router = express.Router();
const { requireAuth } = require("../auth");

router.use(requireAuth)

router.get('/create/:id(\\d+)', csrfProtection, asyncHandler( async (req, res, next) => {
    const movieId = req.params.id;
    const userId = req.session.auth.userId

    const movie = await db.Movie.findByPk(movieId);
    const review = await db.Review.findOne({
        where:{
            userId: req.session.auth.userId,
            movieId: req.params.id
        }
    })
    res.render('review-create', {
        token: req.csrfToken(),
        movie,
        userId,
        review
    })
}));

router.post('/create', csrfProtection, asyncHandler(async (req,res,next) =>{
    const currentRating = await db.Review.findOne({
        where: {
            userId: req.session.auth.userId,
            movieId: req.body.movieId,
        }
    })

    if (currentRating) {
        await currentRating.update({ comment: req.body.comment })
    }
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

router.post('/rating/:mid(\\d+)', asyncHandler( async (req,res,next) => {
    const {movieId,rating} = req.body
    const review = await db.Review.create({
        userId:req.session.auth.userId,
        movieId,
        rating,
    })

    const movieAvg = await db.Movie.findByPk(movieId)
    const newAvg = (movieAvg.voteRating - (rating*2)/(movieAvg.voteCount + 1))
    await movieAvg.update({voteRating: newAvg.toFixed(2), voteCount: movieAvg.voteCount + 1})

    res.json({review, movieAvg})
}))

router.put('/rating/:mid(\\d+)', asyncHandler( async (req,res,next) => {
    const currentRating = await db.Review.findOne({
        where:{
            userId: req.session.auth.userId,
            movieId: req.params.mid,
        }
    })
    if(currentRating){
        await currentRating.update({rating:req.body.rating})
        res.json({ currentRating })
    }
    
}))

module.exports = router;