const express = require('express');
const csrf = require('csurf');
const {Op} = require('sequelize')
// const { search } = require("../../routes/search");
const { Movie, Review } = require('../db/models')

const router = express.Router();
const csrfProtection = csrf({ cookie: true });

const asyncHandler = (handler) => (req, res, next) => handler(req, res, next).catch(next);

router.get('/', asyncHandler( async (req,res,next) => {
    res.render('search')
}))

router.post('/results', asyncHandler( async (req,res,next) => {
    const search = req.body
    const moviesTop = await Movie.findAll({
        where:{
            title:{
                [Op.startsWith]: search.value
            }
        },
        limit:10,
        offset:0
    })
    res.json({moviesTop, search})
}))
module.exports = router;