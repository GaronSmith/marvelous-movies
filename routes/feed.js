const express = require('express');

const { asyncHandler, csrfProtection } = require('./utils')
const db = require('../db/models')
const router = express.Router();
const { requireAuth } = require("../auth");

router.use(requireAuth)

router.get('/', asyncHandler( async (req,res,next) => {
    res.render('feed-view')
}))

router.get('/content', asyncHandler( async (req,res,next) => {
    const following = await db.BlockbusterShelf.findAll({
        include: [db.User, db.Movie],
        through: {where: {userId: req.session.auth.userId}},
        order:[['updatedAt', 'DESC']],
        limit: 20,
    })
    res.json(following)
}))

module.exports = router