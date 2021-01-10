const express = require('express');
const { asyncHandler, csrfProtection } = require('./utils')
const db = require('../db/models');
const router = express.Router();
const { requireAuth } = require('../auth');

router.use(requireAuth);

router.get('/', asyncHandler(async(req, res) => {
    const initialStatus = await db.BlockbusterShelf.findOne({
        include: db.Movie,
        where: {
            userId: req.session.auth.userId,
            status: 'Want to Watch',
        }
    });
    res.render('blockbuster-shelf', { 
        title: 'Blockbuster Shelves', 
        initialStatus,
        });
}));

router.post('/', asyncHandler(async(req, res) => {
    const {movieId,status} = req.body;
    const currentStatus = await db.BlockbusterShelf.create({
        userId: req.session.auth.userId,
        movieId,
        status,
    })
    res.json({currentStatus});
}))

router.put('/', asyncHandler(async(req, res) => {
    const {movieId,status} = req.body;
    const statusUpdate = await db.BlockbusterShelf.findOne({
        where: {
            userId: req.session.auth.userId,
            movieId
        }
    })
    await statusUpdate.update({status});
}))
 
module.exports = router;