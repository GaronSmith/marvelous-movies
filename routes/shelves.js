const express = require('express');
const router = express.Router();
const { Movie } = require('../db/models');
const { Op } = require('sequelize');
const csrf = require('csurf');
const csrfProtection = csrf({ cookie: true });
const db = require('../db/models');

const asyncHandler = handler => (req, res, next) => handler(req, res, next).catch(next);

router.get('/status/:uid(\\d+)', asyncHandler(async(req, res) => {
    const wantToWatch = await db.BlockbusterShelf.findAll({
        include: db.Movie,
        where: {
            userId: req.params.uid,
            status: 'Want to Watch',
        }
    });
    const currentlyWatching = await db.BlockbusterShelf.findAll({
        include: db.Movie,
        where: {
            userId: req.params.uid,
            status: 'Currently Watching',
        }
    });
    const watched = await db.BlockbusterShelf.findAll({
        include: db.Movie,
        where: {
            userId: req.params.uid,
            status: 'Watched',
        }
    });
    // res.json({ wantToWatch});
    res.render('blockbuster-shelf', { 
        title: 'Blockbuster Shelves', 
        wantToWatch, 
        currentlyWatching, 
        watched });
}))

router.get('/want/:id', asyncHandler(async(req, res) => {
    const wantToWatch = await db.BlockbusterShelf.findAll({
        include: db.Movie,
        where: {
            userId: req.params.id,
            status: 'Want to Watch',
        }
    })
    res.json({wantToWatch});
}))

POST route - shelves - UID(req.session.auth)
MID 
PUT 
module.exports = router;