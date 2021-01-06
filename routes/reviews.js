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
    const review = await db.Review.findOne({
        where:{
            userId:req.session.auth.userId,
            movieId:req.params.id
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
        // res.json({ currentRating })
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

    res.json({review})
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
        res.json({currentRating})
    }
    
}))

module.exports = router;