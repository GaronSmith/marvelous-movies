const express = require('express');
const csrf = require('csurf');
const {Op} = require('sequelize')
const { Movie, Review } = require('../db/models')

const router = express.Router();
const csrfProtection = csrf({ cookie: true });

const asyncHandler = (handler) => (req, res, next) => handler(req, res, next).catch(next);

router.get('/', csrfProtection, asyncHandler( async (req,res,next) => {
    res.render('search', { token: req.csrfToken()})
}))

router.post('/results', asyncHandler( async (req,res,next) => {
    const search = req.body
    const moviesTop = await Movie.findAll({
        where:{
            title:{
                [Op.iLike]: `%${search.value}%`
            }
        },
        limit:10,
    })
    res.json({moviesTop})
}))
module.exports = router;