const express = require('express');
const { asyncHandler, csrfProtection } = require('./utils')
const db = require('../db/models');
const router = express.Router();
const { requireAuth } = require('../auth');

router.use(requireAuth);

router.get('/', csrfProtection, asyncHandler(async(req, res) => {
    const wantToWatch = await db.BlockbusterShelf.findOne({
        include: db.Movie,
        where: {
            userId: req.session.auth.userId,
            status: 'Want to Watch',
        }
    });
    res.render('wantToWatch', { 
        title: 'Blockbuster Shelf', 
        wantToWatch,
        });

    const currentlyWatch = await db.BlockbusterShelf.findOne({
        include: db.Movie,
        where: {
            userId: req.session.auth.userId,
            status: 'Currently Watching',
        }
    });
    res.render('currentlyWatching', { 
        title: 'Blockbuster Shelf', 
        currentlyWatch,
        });

    const watched = await db.BlockbusterShelf.findOne({
        include: db.Movie,
        where: {
            userId: req.session.auth.userId,
            status: 'Watched',
        }
    });
    res.render('watched', { 
        title: 'Blockbuster Shelf', 
        watched,
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